import { cn } from '@/utils/cn';
import React from 'react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  autoCols?: boolean;
  autoRows?: boolean;
  flow?: 'row' | 'col' | 'dense';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  responsive?: boolean; // 💡 新增
  minWidth?: number; // 💡 卡片最小宽度
}

const gapStyles = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignStyles = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  gap = 'md',
  autoCols = false,
  autoRows = false,
  flow = 'row',
  align = 'stretch',
  justify = 'start',
  responsive = false,
  minWidth = 200,
  className,
  children,
  ...props
}) => {
  const responsiveClass = responsive
    ? `[grid-template-columns:repeat(auto-fit,minmax(${minWidth}px,1fr))]`
    : `grid-cols-${cols}`;

  return (
    <div
      className={cn(
        'grid',
        responsiveClass,
        gapStyles[gap],
        autoCols && 'auto-cols-auto',
        autoRows && 'auto-rows-auto',
        `grid-flow-${flow}`,
        alignStyles[align],
        justifyStyles[justify],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
