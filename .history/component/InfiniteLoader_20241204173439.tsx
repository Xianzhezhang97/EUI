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
          onLoadMore();
        }
      },
      { root: null, threshold: 0.1 }, // 10% 可见时触发
    );

    const currentLoaderRef = loaderRef.current;

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [isLoading, onLoadMore]);

  return (
    <div
      ref={loaderRef}
      className='py-4 p-4 h-48 flex justify-center items-center'
    >
      {loader}
      ) : (
        'Scroll down to load more...'
      )}
    </div>
  );
};

export default InfiniteLoader;
