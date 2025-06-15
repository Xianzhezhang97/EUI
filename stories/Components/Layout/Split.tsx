import { cn } from '@/utils/cn';
import React from 'react';

interface SplitProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  ratio?: '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  reverse?: boolean;
}

const ratioStyles = {
  '1/2': 'grid-cols-2',
  '1/3': 'grid-cols-3',
  '2/3': 'grid-cols-3',
  '1/4': 'grid-cols-4',
  '3/4': 'grid-cols-4',
};

const gapStyles = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export const Split: React.FC<SplitProps> = ({
  direction = 'horizontal',
  ratio = '1/2',
  gap = 'md',
  reverse = false,
  className,
  children,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const [first, second] = childrenArray;

  return (
    <div
      className={cn(
        'grid',
        direction === 'horizontal' ? ratioStyles[ratio] : 'grid-rows-2',
        gapStyles[gap],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          ratio === '1/3' && 'col-span-1',
          ratio === '2/3' && 'col-span-2',
          ratio === '1/4' && 'col-span-1',
          ratio === '3/4' && 'col-span-3',
        )}
      >
        {reverse ? second : first}
      </div>
      <div
        className={cn(
          ratio === '1/3' && 'col-span-2',
          ratio === '2/3' && 'col-span-1',
          ratio === '1/4' && 'col-span-3',
          ratio === '3/4' && 'col-span-1',
        )}
      >
        {reverse ? first : second}
      </div>
    </div>
  );
};
