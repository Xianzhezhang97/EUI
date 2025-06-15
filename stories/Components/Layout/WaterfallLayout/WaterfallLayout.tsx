/** @format */

import { cn } from '@/utils/cn';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

export interface WaterfallLayoutProps {
  children: ReactNode[];
  gap?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
  itemClassName?: string;
  minColumnWidth?:
    | number
    | { sm?: number; md?: number; lg?: number; xl?: number };
  breakpoints?: { sm?: number; md?: number; lg?: number; xl?: number };
}

export const WaterfallLayout: React.FC<WaterfallLayoutProps> = ({
  children,
  gap = { sm: 16, md: 24, lg: 32, xl: 32 },
  className = '',
  itemClassName = '',
  minColumnWidth = { sm: 300, md: 300, lg: 300, xl: 300 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [columnWrapperStyle, setColumnWrapperStyle] =
    useState<React.CSSProperties>({});
  const [itemStyles, setItemStyles] = useState<React.CSSProperties[]>([]);
  const resizeObserverRef = useRef<ResizeObserver>();
  const itemRefs = useRef<HTMLElement[]>([]);
  const itemObserversRef = useRef<ResizeObserver[]>([]);

  // 计算列数和间隙
  const calculateLayout = useMemo(() => {
    return (width: number) => {
      const numericGap =
        typeof gap === 'number'
          ? gap
          : width >= 1280
          ? gap.xl || 32
          : width >= 1024
          ? gap.lg || 24
          : width >= 768
          ? gap.md || 16
          : gap.sm || 8;

      const numericMinWidth =
        typeof minColumnWidth === 'number'
          ? minColumnWidth
          : width >= 1280
          ? minColumnWidth.xl || 300
          : width >= 1024
          ? minColumnWidth.lg || 300
          : width >= 768
          ? minColumnWidth.md || 300
          : minColumnWidth.sm || 300;

      // 计算可用宽度（考虑容器的padding和margin）
      const availableWidth = width;

      // 计算列数（考虑间隙）
      const columnCount = Math.max(
        1,
        Math.floor(
          (availableWidth + numericGap) / (numericMinWidth + numericGap),
        ),
      );

      // 计算实际列宽（考虑间隙）
      const columnWidth =
        (availableWidth - (columnCount - 1) * numericGap) / columnCount;

      return {
        columns: columnCount,
        gap: numericGap,
        columnWidth,
      };
    };
  }, [gap, minColumnWidth]);

  // 瀑布流布局核心算法
  const positionItems = () => {
    if (!containerRef.current) return;

    const { columns, gap, columnWidth } = calculateLayout(
      containerRef.current.offsetWidth,
    );
    setColumns(columns);

    const columnHeights = new Array(columns).fill(0);
    const newItemStyles: React.CSSProperties[] = [];

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const itemHeight = item.offsetHeight;
      const minHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.indexOf(minHeight);

      newItemStyles[index] = {
        position: 'absolute',
        width: `${columnWidth}px`,
        transform: `translate3d(${
          columnIndex * (columnWidth + gap)
        }px, ${minHeight}px, 0)`,
        transition: 'transform 0.3s ease-out', // 使用 transform 来优化性能
      };

      columnHeights[columnIndex] += itemHeight + gap;
    });

    setColumnWrapperStyle({
      position: 'relative',
      height: `${Math.max(...columnHeights)}px`,
      transition: 'height 0.3s ease-out',
    });

    setItemStyles(newItemStyles);
  };

  // 响应式处理
  useEffect(() => {
    if (!containerRef.current) return;

    // 清理旧的 observers
    itemObserversRef.current.forEach((observer) => observer.disconnect());
    itemObserversRef.current = [];

    // 初始化 ResizeObserver 监听容器大小变化
    resizeObserverRef.current = new ResizeObserver(
      debounce(positionItems, 100),
    );
    resizeObserverRef.current.observe(containerRef.current);

    // 为每个子项创建 ResizeObserver
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const observer = new ResizeObserver(debounce(positionItems, 100));
      observer.observe(item);
      itemObserversRef.current[index] = observer;
    });

    // 初始定位
    const timer = setTimeout(positionItems, 0); // 使用 setTimeout 确保在下一个事件循环中执行

    // 监听图片加载完成事件
    const images = containerRef.current.getElementsByTagName('img');
    Array.from(images).forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', positionItems);
      }
    });

    return () => {
      clearTimeout(timer);
      resizeObserverRef.current?.disconnect();
      itemObserversRef.current.forEach((observer) => observer.disconnect());
      Array.from(images).forEach((img) => {
        img.removeEventListener('load', positionItems);
      });
    };
  }, [children]);

  // 子项元素处理
  const itemsWithRef = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return null;

      return React.cloneElement(child as React.ReactElement, {
        style: { ...child.props.style, ...itemStyles[index] },
        ref: (el: HTMLElement) => (itemRefs.current[index] = el),
        className: cn(child.props.className, itemClassName),
      });
    });
  }, [children, itemStyles, itemClassName]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full relative', className)}
      style={columnWrapperStyle}
    >
      {itemsWithRef}
    </div>
  );
};

// 防抖函数
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
