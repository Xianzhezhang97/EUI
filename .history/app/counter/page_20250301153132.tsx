/** @format */
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Counter: React.FC = () => {
  const [counters, setCounters] = useState(0);
  const increment = () => {
    setCounters(counters + 1);
  };
  const decrement = () => {
    setCounters(counters - 1);
  };
  const reset = () => {
    setCounters(0);
  };
  return (
    <div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>Counter</h1>
        <p>Use useState to build a Counter. There will generate 10 counters.</p>
        <h2>Single Counter</h2>
        <div>
          <div className='flex gap-x-4 mt-2 items-center'>
            <button className='btn-1th' onClick={() => increment()}>
              +
            </button>
            <motion.h3
              layout
              key={counters['sdsd']}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className=''
            >
              {counters['sdsd'] || 0}
            </motion.h3>
            <button className='btn-1th' onClick={() => decrement()}>
              -
            </button>
            <button className='two-btn' onClick={() => reset()}>
              Reset
            </button>
          </div>
        </div>

        {/* <h2 className='mt-10'>10 Counters</h2>
        {Array.from({ length: 10 }, (_, i) => `item${i + 1}`).map((index) => (
          <div key={index}>
            <motion.h3
              layout
              key={counters[index]}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className='mt-5'
            >
              Counter: {counters[index] || 0}
            </motion.h3>

            <div className='flex gap-x-4 mt-2'>
              <button className='btn-1th' onClick={() => increment(index)}>
                Increase
              </button>
              <button className='btn-1th' onClick={() => decrement(index)}>
                Decrease
              </button>
              <button className='two-btn' onClick={() => reset(index)}>
                Reset
              </button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Counter;
