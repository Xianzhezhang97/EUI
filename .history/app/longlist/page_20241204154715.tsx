/** @format */
'use client';
import { motion } from 'framer-motion';
import { useCounter } from '@/hook/useCounter';

const Counter: React.FC = () => {
  const Items = Array.from({ length: 2000000000 }, (_, i) => `item${i + 1}`);
  const { counters, increment, decrement, reset } = useCounter();

  return (
    <div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>Counter</h1>
        <p>
          Use useState to build a Counter. There will generate 2000 counters.
        </p>

        {Items.map((inex) => (
          <div key={inex}>
            <motion.h3
              layout
              key={counters[inex]}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className='mt-5'
            >
              Count: {counters[inex]}
            </motion.h3>

            <div className='flex gap-x-4 mt-2'>
              <button className='btn-1th' onClick={() => increment(inex)}>
                Increase
              </button>
              <button className='btn-1th' onClick={() => decrement(inex)}>
                Decrease
              </button>
              <button className='two-btn' onClick={() => reset(inex)}>
                Reset
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
