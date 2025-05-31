import { CSSProperties, useEffect, useRef, useState } from "react";
import { CircularProgress } from "../Progress/CircularProgress";
import { Skeleton } from "../Skeleton/Skeleton";

// AspectRatio types
type AspectRatioType = "1:1" | "4:3" | "16:9" | "21:9" | "3:4" | "9:16" | string;

interface ImagineProps {
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
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  rounded?: boolean | string; // true for default rounding, string for custom (sm, md, lg, full)
  
  // Animation and effects
  fadeIn?: boolean;
  fadeInDuration?: number;
  zoomOnHover?: boolean;
  
  // Progress indicator
  showProgress?: boolean;
  
  // Accessibility
  loading?: "eager" | "lazy";
  
  // Styling
  className?: string;
  style?: CSSProperties;
  imgClassName?: string;
  
  // Advanced options
  srcSet?: string;
  sizes?: string;
  onClick?: () => void;
}

export const Imagine = ({
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
  objectFit = "cover",
  objectPosition = "center",
  rounded = false,
  
  // Animation and effects
  fadeIn = true,
  fadeInDuration = 500,
  zoomOnHover = false,
  
  // Progress indicator
  showProgress = false,
  
  // Styling
  className = "",
  style = {},
  imgClassName = "",
  
  // Advanced options
  srcSet,
  sizes,
  onClick,
  
  // Rest props
  ...rest
}: ImagineProps) => {
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
      containerStyle.height = typeof height === 'number' ? `${height}px` : height;
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
  
  // Calculate rounding classes
  const getRoundedClass = () => {
    if (!rounded) return "";
    
    if (rounded === true) return "rounded-md";
    
    switch (rounded) {
      case "sm": return "rounded-sm";
      case "md": return "rounded-md";
      case "lg": return "rounded-lg";
      case "xl": return "rounded-xl";
      case "2xl": return "rounded-2xl";
      case "3xl": return "rounded-3xl";
      case "full": return "rounded-full";
      default: return `rounded-${rounded}`;
    }
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
        rootMargin: "200px", // Load images 200px before they come into view
        threshold: 0.01 
      }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [lazy, priority]);
  
  // Simulated loading progress
  useEffect(() => {
    if (!showProgress || isLoaded || hasError) return;
    
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const nextProgress = prevProgress + (100 - prevProgress) / 10;
        return nextProgress > 95 ? 95 : nextProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [showProgress, isLoaded, hasError]);
  
  // Event handlers
  const handleLoad = () => {
    setIsLoaded(true);
    setProgress(100);
  };
  
  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };
  
  // Generate class names
  const containerClasses = `relative overflow-hidden ${className} ${getRoundedClass()}`;
  
  const imageClasses = `
    w-full h-full object-${objectFit}
    ${fadeIn ? `transition-opacity duration-${fadeInDuration}` : ""}
    ${isLoaded ? "opacity-100" : "opacity-0"}
    ${zoomOnHover ? "transition-transform duration-300 hover:scale-110" : ""}
    ${imgClassName}
  `;
  
  return (
    <div 
      ref={containerRef} 
      className={containerClasses} 
      style={getContainerStyle()}
      onClick={onClick}
      >
          
      {/* Skeleton loader */}
      {!isLoaded && withSkeleton && (
        <Skeleton className="w-full h-full" />
      )}
      
      {/* Placeholder image */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt="placeholder"
          className="absolute inset-0 w-full h-full bg-gray-200 min-h-[100px] min-w-[100px] object-cover blur-md"
        />
      )}
      
      {/* Main image - only render when in view */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          onLoad={handleLoad}
          onError={handleError}
          className={imageClasses}
          style={{ objectPosition }}
          loading={priority ? "eager" : "lazy"}
          srcSet={srcSet}
          sizes={sizes}
          {...rest}
        />
      )}
      
      {/* Fallback image */}
      {hasError && fallback && (
        <img
          src={fallback}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
      
      {/* Error message when no fallback */}
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <span>Image failed to load</span>
        </div>
      )}
      
      {/* Progress bar */}
      {showProgress && !isLoaded && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 h-full flex items-center justify-center rounded-lg border bg-gray-200 overflow-hidden">
            {/* <Skeleton className="w-full h-full" /> */}
               <CircularProgress value={progress} thickness={12} color="success" size='xl' className="absolute inset-0" duration={0} />
        </div>
      )}
    </div>
  );
};