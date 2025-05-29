/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import { clearTimeout } from 'timers';

const Counter: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    setStatus('Component has rendered!');
    const aa = setTimeout(() => setStatus(''), 3000);
    const interval = setInterval(() => {
      setTimer((prv) => prv + 0.001);
    }, 1);
    return () => {
      clearTimeout(aa);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>Counter</h1>
        <p>Practise useEffect. </p>
        <h2>Status(useState):{status}</h2>
        <h2>Timer: {timer.toFixed(3)}</h2>
      </div>
    </div>
  );
};

export default Counter;
