/** @format */

import { cn } from '@/utils/cn';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { CircularProgress } from '../Progress/CircularProgress';
import { SkeletonImage } from '../Skeleton/Skeleton';

// AspectRatio types
type AspectRatioType =
  | '1:1'
  | '4:3'
  | '16:9'
  | '21:9'
  | '3:4'
  | '9:16'
  | string;

interface ImageProps {
  // Essential props
  src: string;
  alt: string;

  // Sizing options
  width?: number | string;
  height?: number | string;
  aspectRatio?: AspectRatioType;

  // Loading behavior
  lazy?: boolean;
  priority?: boolean; // For critical above-the-fold images

  // Placeholder behavior
  withSkeleton?: boolean;
  placeholder?: string; // URL for placeholder image
  blurhash?: string; // BlurHash string for placeholder
  dominantColor?: string; // Background color while loading

  // Error handling
  fallback?: string; // URL for fallback image
  onError?: () => void; // Custom error handler

  // Visual options
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  rounded?: boolean | string; // true for default rounding, string for custom (sm, md, lg, full)

  // Animation and effects
  fadeIn?: boolean;
  fadeInDuration?: number;
  zoomOnHover?: boolean;

  // Progress indicator
  showProgress?: boolean;

  // Accessibility
  loading?: 'eager' | 'lazy';

  // Styling
  className?: string;
  style?: CSSProperties;
  imgClassName?: string;

  // Advanced options
  srcSet?: string;
  sizes?: string;
  onClick?: () => void;
}

export const ImagePro = ({
  // Essential props
  src,
  alt,

  // Sizing options
  width,
  height,
  aspectRatio,

  // Loading behavior
  lazy = true,
  priority = false,

  // Placeholder behavior
  withSkeleton = true,
  placeholder,
  blurhash,
  dominantColor,

  // Error handling
  fallback,
  onError,

  // Visual options
  objectFit = 'cover',
  objectPosition = 'center',
  rounded = false,

  // Animation and effects
  fadeIn = true,
  fadeInDuration = 500,
  zoomOnHover = false,

  // Progress indicator
  showProgress = false,

  // Styling
  className = '',
  style = {},
  imgClassName = '',

  // Advanced options
  srcSet,
  sizes,
  onClick,

  // Rest props
  ...rest
}: ImageProps) => {
  // States
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(!lazy || priority);

  // Refs
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate container styles
  const getContainerStyle = (): CSSProperties => {
    const containerStyle: CSSProperties = { ...style };

    // Handle width and height
    if (width !== undefined) {
      containerStyle.width = typeof width === 'number' ? `${width}px` : width;
    }

    if (height !== undefined) {
      containerStyle.height =
        typeof height === 'number' ? `${height}px` : height;
    }

    // Handle aspect ratio
    if (aspectRatio) {
      const [width, height] = aspectRatio.split(':').map(Number);
      if (!Number.isNaN(width) && !Number.isNaN(height)) {
        containerStyle.position = 'relative';
        containerStyle.paddingBottom = `${(height / width) * 100}%`;
        containerStyle.width = containerStyle.width || '100%';
        containerStyle.height = containerStyle.height || 'auto';
      }
    }

    // Handle dominant color as background
    if (dominantColor && !isLoaded) {
      containerStyle.backgroundColor = dominantColor;
    }

    return containerStyle;
  };

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Load images 200px before they come into view
        threshold: 0.01,
      },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Use XMLHttpRequest to track real loading progress
  useEffect(() => {
    if (!showProgress || isLoaded || hasError || !isInView) return;

    // Only track progress for remote URLs
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      setProgress(0);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const newProgress = Math.round((event.loaded / event.total) * 100);
        setProgress(newProgress);
      }
    };

    xhr.onload = () => {
      setProgress(100);
      // Don't set isLoaded here - we'll rely on the image's onLoad event
    };

    xhr.onerror = () => {
      // If XHR fails, we'll rely on the image's onError
    };

    xhr.send();

    return () => {
      xhr.abort();
    };
  }, [showProgress, isLoaded, hasError, isInView, src]);

  // Event handlers
  const handleLoad = () => {
    setProgress(100);
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // Generate class names
  const containerClasses = `relative overflow-hidden w-full h-full  flex justify-center items-center ${className} `;

  const imageClasses = `
    w-full h-full object-${objectFit} absolute top-0 left-0 bottom-0 right-0
    ${fadeIn ? `transition-opacity duration-${fadeInDuration}` : ''}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    ${zoomOnHover ? 'transition-transform duration-300 hover:scale-110' : ''}
    ${imgClassName}
  `;

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={getContainerStyle()}
      onClick={onClick}
    >
      {/* Placeholder image - shown while loading */}
      {!isLoaded && !hasError && placeholder && (
        <img
          src={placeholder}
          alt='placeholder'
          className='absolute inset-0 w-full h-full object-cover blur-md scale-110'
        />
      )}
      {isLoaded}
      {/* Main content area with skeleton or image */}

      <SkeletonImage
        aspectRatio='landscape'
        variant='image'
        className='w-full  h-full rounded-[20px] absolute top-0 left-0 bottom-0 right-0 object-cover flex justify-center items-center'
      />

      {/* Fallback image - shown on error */}
      {fallback && (
        <img src={fallback} alt={alt} className='w-full h-full object-cover' />
      )}

      {/* Error message - shown on error with no fallback */}
      {hasError && fallback && (
        <div className='absolute inset-0 h-full w-full flex items-center justify-center bg-gray-100 text-gray-500'>
          <span>Image failed to load</span>
        </div>
      )}

      {/* Progress indicator - shown while loading if showProgress is true */}
      {showProgress && !isLoaded && !hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75'>
          <CircularProgress
            value={progress}
            thickness={12}
            color='primary'
            size='xl'
            duration={0}
          />
        </div>
      )}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={typeof width === 'number' ? width : 4}
          height={typeof height === 'number' ? height : 3}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            imageClasses,
            'absolute top-0 left-0 bottom-0 right-0 z-50',
          )}
          style={{ objectPosition }}
          loading={priority ? 'eager' : 'lazy'}
          srcSet={srcSet}
          sizes={sizes}
          {...rest}
        />
      )}
    </div>
  );
};
