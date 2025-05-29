/** @format */
'use client';
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className='center flex flex-col justify-center items-center '>
      <h1>Count: {count}</h1>
      <div className='flex gap-x-4'>
        {' '}
        <button
          className='btn-1th'
          onClick={() => {
            setCount(count + 1);
            setCount(count + 1);
            setCount(count + 1);
          }}
        >
          Increase
        </button>
        <button className='btn-1th' onClick={() => setCount(count - 1)}>
          Decrease
        </button>
        <button className='two-btn' onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
