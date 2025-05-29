/** @format */

import { useEffect, useRef } from 'react';

interface InfiniteLoaderProps {
  isLoading: boolean; // 是否正在加载
  onLoadMore: () => void; // 加载更多的回调函数
  loader?: React.ReactNode; // 自定义加载动画
}

const InfiniteLoader: React.FC<InfiniteLoaderProps> = ({
  isLoading,
  onLoadMore,
  loader,
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          onLoadMore(); // 调用加载更多回调
        }
      },
      { root: null, threshold: 0.1 }, // 10% 可见时触发
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, onLoadMore]);

  return (
    <div
      ref={loaderRef}
      className='py-4 p-4 h-48 flex justify-center items-center'
    >
      {isLoading ? loader : null}
    </div>
  );
};

export default InfiniteLoader;
