/** @format */

import { useEffect, useRef } from 'react';

interface InfiniteLoaderProps {
  isLoading: boolean;
  onLoadMore: () => void;
  loader?: React.ReactNode;
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
      { root: null, threshold: 0.5 }, // 10% 可见时触发
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
      {loader ? loader : 'Scroll down to load more...'}
    </div>
  );
};

export default InfiniteLoader;
