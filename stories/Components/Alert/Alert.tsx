/** @format */

import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion } from 'framer-motion';
import { BookmarkCheck, CircleAlert, Info, ShieldAlert, X } from 'lucide-react';
import React from 'react';

export interface AlertProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  description: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  closable?: boolean;
  icon?: React.ReactNode;
}

const variantStyles = {
  info: {
    container: 'bg-blue-50 text-blue-800',
    icon: 'text-blue-400',
    close: 'text-blue-500 hover:bg-blue-100',
  },
  success: {
    container: 'bg-green-50 text-green-800',
    icon: 'text-green-400',
    close: 'text-green-500 hover:bg-green-100',
  },
  warning: {
    container: 'bg-yellow-50 text-yellow-800',
    icon: 'text-yellow-400',
    close: 'text-yellow-500 hover:bg-yellow-100',
  },
  error: {
    container: 'bg-red-50 text-red-800',
    icon: 'text-red-400',
    close: 'text-red-500 hover:bg-red-100',
  },
};

const defaultIcons = (size: number) => {
  return {
    info: <Info size={size} />,
    success: <BookmarkCheck size={size} />,
    warning: <CircleAlert size={size} />,
    error: <ShieldAlert size={size} />,
  };
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      title,
      description,
      variant = 'info',
      onClose,
      closable = false,
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        role='alert'
        className={cn(
          variantStyles[variant].container,
          'flex  gap-4 rounded-[14px] p-[14px] md:p-[28px] z-50',
          className,
        )}
        {...props}
      >
        <div className={'flex items-center gap-4'}>
          <div className='flex-shrink-0 '>
            {icon || defaultIcons(26)[variant]}
          </div>
          <div className='flex-1 items-start justify-start'>
            <p
              className={cn(
                'text-[14px] md:text-[16px] lg:text-[18px]',
                variantStyles[variant].container,
              )}
              color='default'
            >
              {description}
            </p>
          </div>
          {closable && (
            <div className='ml-auto flex items-center pl-3'>
              <button
                type='button'
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  variantStyles[variant].close,
                )}
                onClick={onClose}
              >
                <X />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  },
);

Alert.displayName = 'Alert';
