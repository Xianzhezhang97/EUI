/** @format */

'use client';

import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import * as React from 'react';

interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  height?: number;
  width?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  trackColor?: string;
  filledTrackColorFrom?: string;
  filledTrackColorTo?: string;
  thumbColor?: string;
  thumbBorderColor?: string;
  thumbHoverColor?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value: propValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      height = 25,
      width = 200,
      disabled = false,
      onValueChange,
      trackColor = '#dae0e7',
      filledTrackColorFrom = 'var(--primary-400)',
      filledTrackColorTo = 'var(--primary-600)',
      thumbColor = 'var(--primary-500)',
      thumbBorderColor = 'border-white',
      thumbHoverColor = 'hover:bg-white',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isTransition, setIsTransition] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isControlled = typeof propValue !== 'undefined';
    const value = isControlled ? propValue! : internalValue;
    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = (newValue: number) => {
      const clampedValue = Math.min(Math.max(newValue, min), max);
      const steppedValue = Math.round(clampedValue / step) * step;

      if (!isControlled) setInternalValue(steppedValue);
      onValueChange?.(steppedValue);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValueFromEvent(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateValueFromEvent(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsTransition(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          updateValue(value - step);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          updateValue(value + step);
          break;
        case 'Home':
          e.preventDefault();
          updateValue(min);
          break;
        case 'End':
          e.preventDefault();
          updateValue(max);
          break;
      }
    };

    const updateValueFromEvent = (e: MouseEvent | React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newValue =
        min + ((e.clientX - rect.left) / rect.width) * (max - min);
      updateValue(newValue);
    };

    React.useEffect(() => {
      if (!isDragging) return;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging]);

    return (
      <motion.div
        ref={containerRef}
        className={cn(
          'relative w-full touch-none select-none flex items-center mx-3',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        style={{
          height: `${height}px`,
          minWidth: `${width}px`,
        }}
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
      >
        <div
          style={{
            background: `linear-gradient(to right, ${filledTrackColorFrom} -30%, ${filledTrackColorTo} 500%)`,
            maskImage:
              'linear-gradient(to right, rgba(0, 0, 0, 1) 3%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 50%)',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0, 0, 0, 1) 3%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 50%)',
            width: `${height}px`,
            height: `${height}px`,
          }}
          className='absolute -translate-x-1/2 flex rounded-full z-10'
        />
        <div
          style={{
            background: trackColor,
            width: `${height}px`,
            height: `${height}px`,
          }}
          className='absolute translate-x-1/2 rounded-full right-0 top-0 z-0'
        />
        {/* Track */}
        <div
          style={{
            background: trackColor,
            height: `${height}px`,
          }}
          className={cn('relative w-full grow overflow-hidden')}
        >
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${Math.max(0, Math.min(100, percentage))}%`,
            }}
            transition={{
              duration: isTransition ? 1 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              'absolute',
              // isTransition &&
              //   'transition-all duration-500 ease-[cubic-bezier(0.22, 1, 0.36, 1)]',
            )}
            style={{
              background: `linear-gradient(to right, ${filledTrackColorFrom} -20%, ${filledTrackColorTo} 120%)`,
              height: `${height}px`,
            }}
          />
        </div>

        {/* Thumb */}
        <motion.div
          initial={{
            left: 0,
          }}
          animate={{
            left: `${Math.max(0, Math.min(100, percentage))}%`,
          }}
          onMouseEnter={() => setIsTransition(!isDragging)}
          onMouseLeave={() => setIsTransition(!isDragging)}
          transition={{
            duration: isTransition ? 1 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            'absolute -translate-x-1/2 flex rounded-full border-2 border-white z-20',
            thumbBorderColor,
            thumbHoverColor,
            disabled && 'cursor-not-allowed hover:scale-100',
          )}
          style={{
            transform: 'translateX(-50%)',
            backgroundColor: thumbColor,
            width: `${height}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>
    );
  },
);

Slider.displayName = 'Slider';

export { Slider };
