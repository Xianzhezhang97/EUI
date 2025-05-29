/** @format */
'use client';
import { motion as m } from 'framer-motion';
import { useCounter } from '@/hook/useCounter';

const LongList: React.FC = () => {
  const Items = Array.from({ length: 200 }, (_, i) => `item${i + 1}`);
  const { counters, increment, decrement, reset } = useCounter();

  return (
    <m.div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>LongList</h1>
        <p>
          There will generate 200 counters. You should optimize the performance
          of the list.
        </p>
        <h2 className='mt-10'>20000 Counters</h2>
        {Items.map((index) => (
          <m.div key={index}>
            <m.h3
              layout
              key={counters[index]}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className='mt-5'
            >
              Counter: {counters[index] || 0}
            </m.h3>

            <m.div layout className='flex gap-x-4 mt-2'>
              <button className='btn-1th' onClick={() => increment(index)}>
                Increase
              </button>
              <button className='btn-1th' onClick={() => decrement(index)}>
                Decrease
              </button>
              <button className='two-btn' onClick={() => reset(index)}>
                Reset
              </button>
            </m.div>
          </m.div>
        ))}
      </div>
      <div>Loading...</div>
    </m.div>
  );
};

export default LongList;
