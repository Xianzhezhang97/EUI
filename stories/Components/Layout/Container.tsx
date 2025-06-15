import { cn } from '@/utils/cn';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  padded?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  centered = true,
  padded = true,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        sizeStyles[size],
        centered && 'mx-auto',
        padded && 'px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
