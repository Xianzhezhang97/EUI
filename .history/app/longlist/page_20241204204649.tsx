/** @format */
'use client';

import { useState } from 'react';
import { motion as m } from 'framer-motion';
import { useCounter } from '@/hook/useCounter';
import InfiniteLoader from '@/component/InfiniteLoader';

const LongList: React.FC = () => {
  const { counters, increment, decrement, reset } = useCounter();
  const [isLoading, setIsLoading] = useState(false);
  // 初始列表，默认加载 20 个
  const [items, setItems] = useState<string[]>(
    Array.from({ length: 40 }, (_, i) => `item${i + 1}`),
  );

  const loadMoreItems = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextItems = Array.from(
        { length: 40 },
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
          There will generate 20000 counters. You should optimize the
          performance of the list. Has loaded: {items.length}
        </p>
        <h2 className='mt-10 w-full lg:fixed lg:right-12 right-2 lg:top-1/2 -translate-Y-1/2 '>
          {items.length} Counters
        </h2>
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
              {index} ——— Counter: {counters[id] || 0}
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
        <InfiniteLoader
          isLoading={isLoading}
          loader={
            <div className='flex flex-col items-center gap-6 py-12'>
              <div className='loader'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className='dot'
                    style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}
                  ></div>
                ))}
              </div>
              <p>Loading...</p>
            </div>
          }
          onLoadMore={loadMoreItems}
        />
        <div className='my-24 bg-sky-200 h-48 card-rounded'></div>
      </div>
    </m.div>
  );
};

export default LongList;
