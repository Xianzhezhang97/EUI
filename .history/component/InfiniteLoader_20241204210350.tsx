/** @format */

import { useEffect, useRef, useMemo, useCallback } from 'react';

interface InfiniteLoaderProps {
  isLoading: boolean;
  onLoadMore: () => void;
  loader?: React.ReactNode;
}
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const InfiniteLoader: React.FC<InfiniteLoaderProps> = ({
  isLoading,
  onLoadMore,
  loader,
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading) {
        
        debounce(onLoadMore, 500),
      }
    },
    [isLoading, onLoadMore],
  );

  const observer = useMemo(
    () =>
      new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.25,
        rootMargin: '100px',
      }),
    [handleIntersection],
  );

  useEffect(() => {
    const currentLoaderRef = loaderRef.current;

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [observer]);

  return (
    <div ref={loaderRef} className='min-h-48 flex justify-center items-center'>
      {loader ? loader : 'Scroll down to load more...'}
    </div>
  );
};

export default InfiniteLoader;
