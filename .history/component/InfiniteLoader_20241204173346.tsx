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
      { root: null, threshold: 0.1 },
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
      {isLoading ? (
        <div className='loader'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='dot'
              style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}
            ></div>
          ))}
        </div>
      ) : (
        'Scroll down to load more...'
      )}
    </div>
  );
};

export default InfiniteLoader;
