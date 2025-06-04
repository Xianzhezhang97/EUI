import { cn } from '@/utils/cn';
import { motion as m, useInView } from 'framer-motion';
import React, { useRef } from 'react';

interface ChartWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-64',
  md: 'h-80',
  lg: 'h-96',
};

const ChartWrapper = ({
  title,
  size = 'md',
  className,
  children,
  ...props
}: ChartWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30% 0px -30% 0px' });
  return (
    <div
      ref={ref}
      className={cn('w-[400px] h-[300px]', className)}
      // style={{
      //   '--background': 'white',
      //   '--foreground': '#333',
      //   '--muted-foreground': '#666',
      //   '--border': '#e5e7eb',
      // } as React.CSSProperties}
      {...props}
    >
      {/* {title && (
        // <h3 className="text-sm font-medium text-gray-900 mb-4">
        //   {}
        // </h3>
      )} */}
      <div
        className={cn('w-full h-full', sizeStyles[size], 'overflow-hidden')}
        style={{ position: 'relative' }}
      >
        {isInView && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full h-full'
          >
            {children}
          </m.div>
        )}
        {!isInView && (
          <m.div className='flex animate-pulse h-[300px] w-full items-center justify-center bg-gray-200 rounded-xl'></m.div>
        )}
      </div>
    </div>
  );
};

export default ChartWrapper;
