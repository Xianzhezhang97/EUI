/** @format */

import { Alert } from '@/stories/Components/Alert/Alert';
import { ImagePro } from '@/stories/Components/Image/ImagePro';
import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  imageMaxHeight?: string;
  imageMaxWidth?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  imageRatio?:
    | '1/1'
    | '2/1'
    | '4/3'
    | '16/9'
    | '21/9'
    | '21/9'
    | '9/16'
    | '3/4'
    | '1/2';
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  imgClassName?: string;
}

const variantStyles = {
  primary:
    'bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-700 dark:text-white',
  secondary: 'bg-white dark:bg-gray-900 dark:text-white',
  tertiary: 'bg-gray-100 dark:bg-gray-800 dark:text-white',
};

const sizeStyles = {
  sm: {
    rounded: 'rd-md',
    padding: 'pd-md',
  },
  md: {
    rounded: 'rd-lg',
    padding: 'pd-lg',
  },
  lg: {
    rounded: 'rd-xl',
    padding: 'pd-xl',
  },
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'lg',
      children,
      imagePosition = 'top',
      imageRatio = '1/1',
      imgClassName,
      src,
      alt,
      width = 'auto',
      height = 'auto',
      minWidth = 'auto',
      minHeight = 'auto',
      maxWidth = 'auto',
      maxHeight = 'auto',
      imageMaxHeight = 'auto',
      imageMaxWidth = 'auto',
      ...props
    },
    ref,
  ) => {
    const { rounded, padding } = sizeStyles[size];

    return (
      <motion.div
        ref={ref}
        className={cn(
          variantStyles[variant],
          rounded,
          'overflow-hidden flex relative ',
          imagePosition === 'top' && 'flex-col',
          imagePosition === 'bottom' && 'flex-col-reverse',
          imagePosition === 'left' && 'flex-row',
          imagePosition === 'right' && 'flex-row-reverse',
          className,
        )}
        style={{
          width,
          height,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
        }}
        {...props}
      >
        {src && (
          <div
            style={{
              maxHeight: imageMaxHeight,
              maxWidth: imageMaxWidth,
            }}
            className='w-full h-full flex'
          >
            <ImagePro
              src={src}
              alt={alt || 'image'}
              className={cn(
                'flex w-full',
                imgClassName,
                imageRatio === '1/1' && 'aspect-square',
                imageRatio === '4/3' && 'aspect-[4/3]',
                imageRatio === '16/9' && 'aspect-[16/9]',
                imageRatio === '2/1' && 'aspect-[2/1]',
                imageRatio === '21/9' && 'aspect-[21/9]',
                imageRatio === '1/2' && 'aspect-[1/2]',
                imageRatio === '3/4' && 'aspect-[3/4]',
                imageRatio === '9/16' && 'aspect-[9/16]',
              )}
              withSkeleton
              objectFit='contain'
              rounded='lg'
            />
            {!alt && (
              <Alert
                variant='warning'
                description='You need to provide alt text for the image'
                className='absolute top-4 right-4'
              />
            )}
          </div>
        )}
        <div className={cn(padding, 'w-full flex flex-col')}>{children}</div>
      </motion.div>
    );
  },
);

Card.displayName = 'Card';
