import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, useEffect, useId, useRef, useState } from 'react';
import { CircularProgress } from '../Progress/CircularProgress';
import { SkeletonImage } from '../Skeleton/Skeleton';
import { defaultEase } from '@/stories/Animation/animationConfig';

export interface ImageProProps {
  src: string;
  alt: string;

  width?: number | string;
  height?: number | string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '2/9' | '3/4' | '9/16' | string;

  lazy?: boolean;
  priority?: boolean;

  withSkeleton?: boolean;
  placeholder?: string;
  fallback?: string;
  dominantColor?: string;

  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;

  fadeIn?: boolean;
  fadeInDuration?: number;
  zoomOnHover?: boolean;
  zoomOnClick?: boolean;

  showProgress?: boolean;

  loading?: 'eager' | 'lazy';

  className?: string;
  style?: CSSProperties;
  imgClassName?: string;

  srcSet?: string;
  sizes?: string;
  onClick?: () => void;
  onError?: () => void;
}

export const ImagePro = ({
  src,
  alt,

  width = '100%',
  height,
  aspectRatio,
  lazy = false,
  priority = false,

  withSkeleton = true,
  placeholder,
  fallback,
  dominantColor,

  objectFit = 'cover',
  objectPosition = 'center',

  fadeIn = true,
  fadeInDuration = 2000,
  zoomOnHover = false,
  zoomOnClick = false,

  showProgress = false,

  className = '',
  style = {},
  imgClassName = '',

  srcSet,
  sizes,
  onClick,
  onError,
}: ImageProProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  // Style for aspect ratio
  const getContainerStyle = (): CSSProperties => {
    const result: CSSProperties = { ...style };

    // If width is explicitly provided, use it
    if (width) {
      result.width = typeof width === 'number' ? `${width}px` : width;
    }

    // If height is explicitly provided, use it
    if (height) {
      result.height = typeof height === 'number' ? `${height}px` : height;
    }

    // If aspectRatio is provided and no height is set, use aspect-ratio
    if (aspectRatio && !height) {
      const [w, h] = aspectRatio.split('/').map(Number);
      if (!isNaN(w) && !isNaN(h) && w > 0) {
        result.aspectRatio = `${w} / ${h}`;
        // Ensure the container takes full width if no width is specified
        if (!width) {
          result.width = '100%';
        }
      }
    }

    if (dominantColor && !isLoaded) {
      result.backgroundColor = dominantColor;
    }

    return result;
  };

  // Lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.01 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lazy, priority]);

  // Progress tracking
  useEffect(() => {
    if (!showProgress || isLoaded || hasError || !isInView) return;

    if (!src || src.startsWith('data:') || src.startsWith('blob:')) return;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => setProgress(100);
    xhr.onerror = () => setHasError(true);
    xhr.send();

    return () => xhr.abort();
  }, [showProgress, isLoaded, hasError, isInView, src]);

  const handleLoad = () => {
    setProgress(100);
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  const fadeInStyle = fadeIn
    ? { transition: `opacity ${fadeInDuration}ms ease` }
    : {};

  const imageClass = cn(
    'absolute inset-0 w-full h-full',
    `object-${objectFit}`,
    imgClassName,
  );

  return (
    <div className='w-full h-full flex'>
      <motion.div
        layoutId={`image-${uniqueId}`}
        ref={containerRef}
        className={cn(
          'relative overflow-hidden w-full',
          zoomOnClick && isLoaded && !hasError && 'cursor-pointer',
          className,
        )}
        style={getContainerStyle()}
        onClick={
          zoomOnClick && isLoaded && !hasError
            ? () => setIsZoomed(true)
            : onClick
        }
      >
        {/* Placeholder (optional) */}
        {!isLoaded && !hasError && placeholder && (
          <img
            src={placeholder}
            alt='placeholder'
            className='absolute inset-0 w-full h-full object-cover blur-md scale-110'
          />
        )}

        {/* Skeleton */}
        {!isLoaded && !hasError && withSkeleton && (
          <SkeletonImage className='absolute inset-0 w-full h-full' />
        )}

        {/* Progress */}
        {showProgress && !isLoaded && !hasError && (
          <div className='absolute inset-0 w-full h-full flex items-center justify-center bg-white/60'>
            <CircularProgress
              value={progress}
              thickness={12}
              color='primary'
              size='xl'
              duration={0}
            />
          </div>
        )}

        {/* Error fallback */}
        {hasError ? (
          fallback ? (
            <img
              src={fallback}
              alt={alt}
              className='absolute inset-0 w-full h-full object-cover'
            />
          ) : (
            <div className='absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-500'>
              <span>Image failed to load</span>
            </div>
          )
        ) : (
          isInView && (
            <motion.img
              ref={imgRef}
              src={src}
              alt={alt}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                objectPosition,
                ...fadeInStyle,
                opacity: isLoaded ? 1 : 0,
              }}
              className={imageClass}
              loading={priority ? 'eager' : 'lazy'}
              srcSet={srcSet}
              sizes={sizes}
              whileHover={
                zoomOnHover && isLoaded
                  ? { scale: 1.1, transition: { duration: 0.3 } }
                  : {}
              }
            />
          )
        )}
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center'
            onClick={() => setIsZoomed(false)}
          >
            {/* Backdrop */}
            <motion.div
              className='absolute inset-0 w-full h-full bg-black'
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 0.5, backdropFilter: 'blur(10px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{
                duration: 0.7,
                ease: defaultEase,
              }}
            />
            {/* Image */}
            <motion.div
              layoutId={`image-${uniqueId}`}
              transition={{
                duration: 0.7,
                ease: defaultEase,
              }}
              className='relative z-10 max-w-[90vw] max-h-[90vh] w-full h-full'
            >
              <img
                src={src}
                alt={alt}
                className='w-full h-full object-contain'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
