/** @format */
'use client';
import { motion as m } from 'framer-motion';
import { useCounter } from '@/hook/useCounter';

const Counter: React.FC = () => {
  const Items = Array.from({ length: 2000 }, (_, i) => `item${i + 1}`);
  const { counters, increment, decrement, reset } = useCounter();

  return (
    <m.div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>Counter</h1>
        <p>
          Use useState to build a Counter. There will generate 2000 counters.
        </p>
        <h2>Single Counter</h2>
        <div key={'sdsd'}>
          <m.div layout className='flex gap-x-4 mt-2 items-center'>
            <button
              className='btn-1th transition-all'
              onClick={() => increment('sdsd')}
            >
              +
            </button>
            <m.p
              layout
              key={counters['sdsd']}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className='transition-all duration-1000 w-auto'
            >
              {counters['sdsd'] || 0}
            </m.p>
            <button
              className='btn-1th transition-all'
              onClick={() => decrement('sdsd')}
            >
              -
            </button>
            <button
              className='two-btn transition-all'
              onClick={() => reset('sdsd')}
            >
              Reset
            </button>
          </m.div>
        </div>

        <h2 className='mt-10'>2000 Counters</h2>
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
    </m.div>
  );
};

export default Counter;
