'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useFormContext, Controller } from 'react-hook-form';
import { UploadCloud, X, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { cn } from '@/utils/cn';

async function resizeImage(
  image: HTMLImageElement,
  fileName: string,
  maxShortSide: number,
  fileType: string,
): Promise<File> {
  const shortSide = Math.min(image.naturalWidth, image.naturalHeight);
  const scale = shortSide > maxShortSide ? maxShortSide / shortSide : 1;
  const targetWidth = image.naturalWidth * scale;
  const targetHeight = image.naturalHeight * scale;

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(new File([blob], fileName, { type: fileType }));
      },
      fileType,
      0.9, // 90% quality for JPEGs
    );
  });
}

async function getCroppedImg(
  image: HTMLImageElement,
  crop: Crop,
  fileName: string,
  fileType: string,
): Promise<{
  file: File | null;
  width: number;
  height: number;
  size: number;
}> {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;
  const ctx = canvas.getContext('2d');

  if (!ctx) return { file: null, width: 0, height: 0, size: 0 };

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve({
            file: null,
            width: 0,
            height: 0,
            size: 0,
          });
          return;
        }
        const file = new File([blob], fileName, { type: fileType });
        resolve({
          file,
          width: canvas.width,
          height: canvas.height,
          size: file.size,
        });
      },
      fileType,
      0.9, // 90% quality for JPEGs
    );
  });
}

export interface FormImageUploadProps {
  name: string;
  label: string;
  aspect?: number;
  maxShortSide?: number;
  previewMaxWidth?: string;
  recommendations?: string | string[];
  maxFileSize?: number; // in MB
}

const MainContent = ({
  status,
  previewUrl,
  previewMaxWidth,
  aspect,
  getRootProps,
  getInputProps,
  isDragActive,
  error,
  maxFileSize,
  handleRemoveImage,
}: any) => {
  if (status === 'compressing') {
    return (
      <div
        className='w-full border-2 border-dashed rounded-lg p-6 text-center flex flex-col justify-center items-center'
        style={{ aspectRatio: aspect }}
      >
        <Loader2 className='h-10 w-10 mb-2 animate-spin text-primary-500' />
        <p className='font-semibold text-gray-600 text-sm'>
          Optimizing image...
        </p>
      </div>
    );
  }

  if (previewUrl) {
    return (
      <div
        {...getRootProps()}
        className='relative group rounded-lg cursor-pointer '
        style={{ aspectRatio: aspect }}
      >
        <input {...getInputProps()} />
        <img
          src={previewUrl}
          alt='Preview'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity'>
          <UploadCloud className='h-6 w-6 mb-1' />
          Change
        </div>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveImage();
          }}
          className='absolute -top-[10px] -right-[10px] bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10'
        >
          <X className='h-[20px] w-[20px] text-gray-600' />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      style={{ aspectRatio: aspect }}
      className={cn(
        'w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors flex flex-col justify-center items-center',
        isDragActive ? 'border-primary-600 bg-primary-50' : 'border-gray-300',
        error ? 'border-red-500' : '',
      )}
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center text-gray-500'>
        <UploadCloud className='h-10 w-10 mb-2' />
        <p className='font-semibold'>
          Click to select, or drag and drop an image
        </p>
        <p className='text-xs mt-1'>
          {maxFileSize ? `(Recommended up to ${maxFileSize}MB)` : ''}
        </p>
      </div>
    </div>
  );
};

export function FormImageUpload({
  name,
  label,
  aspect = 1,
  maxShortSide,
  previewMaxWidth = '150px',
  recommendations,
  maxFileSize, // in MB
}: FormImageUploadProps) {
  const {
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const recommendationList = Array.isArray(recommendations)
    ? recommendations
    : recommendations
    ? [recommendations]
    : [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const [imgSrc, setImgSrc] = useState(''); // For the crop tool
        const [crop, setCrop] = useState<Crop>();
        const [completedCrop, setCompletedCrop] = useState<Crop>();
        const [status, setStatus] = useState<
          'idle' | 'compressing' | 'cropping'
        >('idle');
        const imgRef = useRef<HTMLImageElement>(null);
        const [fileName, setFileName] = useState('');
        const [finalImageInfo, setFinalImageInfo] = useState<{
          width: number;
          height: number;
          size: number | null;
        } | null>(null);
        const [originalFileType, setOriginalFileType] = useState('image/png');
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);

        // Effect to sync form value to preview URL
        useEffect(() => {
          let objectUrl: string | null = null;
          const value = field.value;

          if (value instanceof File) {
            objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);
          } else if (typeof value === 'string' && value) {
            setPreviewUrl(value);
          } else {
            setPreviewUrl(null);
            setFinalImageInfo(null);
          }

          return () => {
            if (objectUrl) {
              URL.revokeObjectURL(objectUrl);
            }
          };
        }, [field.value]);

        // Effect to get dimensions of initial remote images
        useEffect(() => {
          const value = field.value;
          if (
            typeof value === 'string' &&
            value &&
            !value.startsWith('blob:')
          ) {
            const img = new Image();
            img.src = value;
            img.onload = () => {
              setFinalImageInfo({
                width: img.naturalWidth,
                height: img.naturalHeight,
                size: null, // Size is unknown for remote images
              });
            };
            img.onerror = () => {
              setFinalImageInfo(null);
            };
          }
        }, [field.value]);

        const processFile = useCallback(
          async (file: File) => {
            clearErrors(name);
            setOriginalFileType(file.type);

            try {
              const image = new Image();
              const tempUrl = URL.createObjectURL(file);
              image.src = tempUrl;

              await new Promise<void>((resolve, reject) => {
                image.onload = () => resolve();
                image.onerror = (err) => reject(err);
              });

              URL.revokeObjectURL(tempUrl);

              let fileToProcess: File;
              const needsProcessing =
                maxShortSide &&
                Math.min(image.naturalWidth, image.naturalHeight) >
                  maxShortSide;

              if (needsProcessing) {
                setStatus('compressing');
                const minimumDelay = new Promise((resolve) =>
                  setTimeout(resolve, 500),
                );
                const resizePromise = resizeImage(
                  image,
                  file.name,
                  maxShortSide,
                  file.type,
                );

                const [resizedFile] = await Promise.all([
                  resizePromise,
                  minimumDelay,
                ]);
                fileToProcess = resizedFile;
              } else {
                fileToProcess = file;
              }

              setFileName(fileToProcess.name);
              setCrop(undefined);
              const cropUrl = URL.createObjectURL(fileToProcess);
              setImgSrc(cropUrl); // Use a new URL for the crop tool
              setStatus('cropping');
            } catch (e) {
              setError(name, {
                type: 'manual',
                message: 'Could not process the image file.',
              });
              setStatus('idle');
            }
          },
          [clearErrors, name, maxShortSide, setError],
        );

        const onDrop = useCallback(
          (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
              processFile(acceptedFiles[0]);
            }
          },
          [processFile],
        );

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          onDropRejected: (fileRejections) => {
            const rejError = fileRejections[0].errors[0];
            setError(name, { type: 'manual', message: rejError.message });
            setStatus('idle');
          },
          accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
          multiple: false,
        });

        function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
          const { width, height } = e.currentTarget;
          const initialCrop = centerCrop(
            makeAspectCrop({ unit: '%', width: 90 }, aspect, width, height),
            width,
            height,
          );
          setCrop(initialCrop);
        }

        const handleCropComplete = async (event: React.MouseEvent) => {
          event?.stopPropagation();
          event?.preventDefault();
          if (completedCrop && imgRef.current) {
            const { file, width, height, size } = await getCroppedImg(
              imgRef.current,
              completedCrop,
              fileName,
              originalFileType,
            );
            if (file) {
              setValue(name, file, { shouldValidate: true });
              setFinalImageInfo({ width, height, size });
            }
            setStatus('idle');
            URL.revokeObjectURL(imgSrc); // Clean up the crop tool URL
            setImgSrc('');
          }
        };

        const handleCancelCrop = () => {
          setStatus('idle');
          URL.revokeObjectURL(imgSrc); // Clean up the crop tool URL
          setImgSrc('');
        };

        const handleRemoveImage = () => {
          setValue(name, '', { shouldValidate: true });
          setFinalImageInfo(null);
          setStatus('idle');
        };

        const formatBytes = (bytes: number | null, decimals = 2) => {
          if (bytes === null) return 'N/A';
          if (bytes === 0) return '0 Bytes';
          const k = 1024;
          const dm = decimals < 0 ? 0 : decimals;
          const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
          );
        };

        return (
          <div className='w-full'>
            <label className='block text-lg font-medium text-gray-700 mb-1'>
              {label}
            </label>
            {recommendationList.length > 0 && (
              <ul className='text-sm text-gray-500 list-disc list-inside mb-2 space-y-1'>
                {recommendationList.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            )}

            {status === 'cropping' && imgSrc && (
              <div
                onClick={handleCancelCrop}
                className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4'
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white p-6 rounded-lg max-w-xl w-full'
                >
                  <h3 className='text-lg font-medium mb-4'>Crop your image</h3>
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    className='max-h-[60vh] '
                  >
                    <img
                      ref={imgRef}
                      alt='Crop me'
                      src={imgSrc}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                  <div className='flex justify-end gap-2 mt-4'>
                    <Button
                      variant='secondary'
                      onClick={handleCancelCrop}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCropComplete}>Apply Crop</Button>
                  </div>
                </div>
              </div>
            )}

            <div className='flex items-start gap-4 h-full'>
              <div
                className='flex-shrink-0'
                style={{ maxWidth: previewMaxWidth }}
              >
                <MainContent
                  status={status}
                  previewUrl={previewUrl}
                  aspect={aspect}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  isDragActive={isDragActive}
                  error={error}
                  maxFileSize={maxFileSize}
                  handleRemoveImage={handleRemoveImage}
                />
                {previewUrl &&
                  finalImageInfo &&
                  formatBytes(finalImageInfo.size) !== 'N/A' && (
                    <div className=' text-gray-500 mt-1 space-y-0.5'>
                      <p className='text-xs'>
                        Size: {formatBytes(finalImageInfo.size)}
                      </p>
                      <p className='text-xs'>
                        Dimensions: {finalImageInfo.width} x{' '}
                        {finalImageInfo.height}
                        px
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {error && (
              <div className='flex items-center mt-2 text-sm text-red-600'>
                <AlertTriangle className='h-4 w-4 mr-1.5 flex-shrink-0' />
                <p id={`${name}-error`}>{error.message?.toString()}</p>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
