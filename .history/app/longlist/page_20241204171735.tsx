/** @format */
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion as m } from 'framer-motion';
import { useCounter } from '@/hook/useCounter';

const LongList: React.FC = () => {
  const { counters, increment, decrement, reset } = useCounter();

  // 初始列表，默认加载 20 个
  const [items, setItems] = useState<string[]>(
    Array.from({ length: 20 }, (_, i) => `item${i + 1}`),
  );
  const [isLoading, setIsLoading] = useState(false);

  // 用于监听的 div 的 ref
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer 逻辑
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // 如果加载指示器进入视口，加载更多条目
          loadMoreItems();
        }
      },
      { root: null, threshold: 0.1 }, // 10% 可见即触发
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  // 加载更多条目
  const loadMoreItems = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextItems = Array.from(
        { length: 20 },
        (_, i) => `item${items.length + i + 1}`,
      );
      setItems((prev) => [...prev, ...nextItems]);
      setIsLoading(false);
    }, 1000); // 模拟网络请求延迟
  };

  return (
    <m.div className='center  flex flex-col justify-center items-center page-padding'>
      <div className='w-full  flex flex-col text-gap'>
        <h1>LongList</h1>
        <p>
          There will generate counters. You should optimize the performance of
          the list.
        </p>
        <h2 className='mt-10'>{items.length} Counters</h2>
        {items.map((id, index) => (
          <m.div key={id}>
            <m.h3
              layout
              key={counters[id]}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className='mt-5'
            >
              {index}~~Counter: {counters[id] || 0}
            </m.h3>

            <m.div layout className='flex gap-x-4 mt-2'>
              <button className='btn-1th' onClick={() => increment(id)}>
                Increase
              </button>
              <button className='btn-1th' onClick={() => decrement(id)}>
                Decrease
              </button>
              <button className='two-btn' onClick={() => reset(id)}>
                Reset
              </button>
            </m.div>
          </m.div>
        ))}
        <script
          src='https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs'
          type='module'
        ></script>
        <dotlottie-player
          src='https://lottie.host/4e3b79b1-9af0-46e5-99a1-b1f6390e43e0/C0snuoWA0E.lottie'
          background='transparent'
          speed='1'
          style='width: 300px; height: 300px'
          loop
          autoplay
        ></dotlottie-player>

        <div
          // ref={loaderRef}
          className='py-4  p-4 h-48 flex justify-center items-center'
        >
          {/* {isLoading ? ( */}
          <div className='loader'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='dot'
                style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
              ></div>
            ))}
          </div>
          {/* ) : (
            'Scroll down to load more...'
          )} */}
        </div>
      </div>
    </m.div>
  );
};

export default LongList;
