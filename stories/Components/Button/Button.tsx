import { HTMLMotionProps, motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import React from 'react';
import { cn } from '@/utils/cn';
import '@/styles/globals.css';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>
{
  variant?:
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'icon'
  | 'link'
  | 'full';
  size?: 'sm' | 'md' | 'lg' | 'noPadding';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  isPadding?: boolean;
  onClick?: ( event: React.MouseEvent<HTMLButtonElement> ) => void;
}

const variantStyles = {
  primary: `
    bg-primary-900 
    text-white 
    hover:bg-primary-700 
    hover:text-white
    active:bg-white
    active:text-primary-700
    rounded-full
  `,

  secondary: `
    bg-[#f2f2f2]
    text-primary-900 
    hover:bg-primary-700 
    hover:text-white
    active:bg-primary-500 
    rounded-full 
    
  `,

  outline: `
    border border-primary-700 
    text-primary-700 
    hover:bg-primary-700
    hover:text-white
    active:bg-primary-600 
    rounded-full 
    
  `,

  ghost: `
    text-primary-900
    hover:bg-white
    group-hover:bg-primary-50
    group-hover:text-white
    active:bg-primary-900
    active:text-white
    rounded-full 
    
  `,

  icon: `
    rounded-full 
    
  `,

  link: `
    text-primary-600 
    underline-offset-4 
    hover:underline 
    hover:text-primary-700 
    
  `,

  full: `
    w-full 
    bg-primary-500 
    text-white 
    hover:bg-primary-600 
    active:bg-primary-700 
    rounded-full 
    
  `,
};

const sizeStyles = {
  sm: `
    px-1 py-1.5 
    text-sm 
    h-8 
    sm:text-sm 
    sm:px-3 sm:py-1
  `,

  md: `
    px-2 py-2 
    text-base
    h-10 
    rounded-full 
    sm:px-4 sm:py-2
  `,
  lg: `
    px-3 py-3 
    text-lg
    h-12
    flex items-center justify-center 
    sm:px-6 sm:py-2.5 
    sm:text-base
  `,
  noPadding: `
    ratio-1/1
    p-2
    text-base
    rounded-full 
  `,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'lg',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      isPadding = true,
      onClick,
      ...props
    },
    ref,
  ) =>
  {
    const handleClick = ( event: React.MouseEvent<HTMLButtonElement> ) =>
    {
      if ( !disabled && !isLoading && onClick )
      {
        onClick( event );
      }
    };

    return (
      <motion.button
        ref={ ref }
        layout
        whileTap={ { scale: 0.99 } }
        whileHover={ { scale: 1.01 } }
        transition={ { duration: 0.3, type: 'spring', stiffness: 100, damping: 10, bounce: 0.2 } }
        className={ cn(
          'flex items-center justify-center font-medium  focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          variantStyles[ variant ],
          fullWidth && 'w-full',
          className,
        ) }
        disabled={ disabled || isLoading }
        onClick={ handleClick }
        { ...props }
      >
        <div className={ cn( 'inline-flex items-center ratio-1/1',
        ) }>
          { isPadding && <div className='p-3'>{ isLoading ? ( <div className='animate-spin'><Loader /></div> ) : leftIcon && <span className=''>{ leftIcon }</span> }</div> }
          <div className={ cn( 'flex items-center justify-center', ( !leftIcon && !rightIcon && !isLoading ) && sizeStyles[ size ] ) }>{ children }</div>
          { isPadding && <div className='p-3'>{ rightIcon && <span className=''>{ rightIcon }</span> }</div> }
        </div>
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
