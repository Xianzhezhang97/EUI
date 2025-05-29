/** @format */
'use client';
import React, { useEffect, useState } from 'react';

const Counter: React.FC = () => {
  const [status, setSatus] = useState<string>('Loading...');
  const [time, setTime] = useState<number>(0);
  // const animationFrameRef = useRef<number | null>(null); // 存储requestAnimationFrame的ID

  useEffect(() => {
    const Fetch = setTimeout(() => {
      setSatus('Total 300 lists!');
    }, 3000);
    const Timer = setInterval(() => setTime((prv) => prv + 0.01), 10);

    return () => {
      clearTimeout(Fetch);
      clearInterval(Timer);
    };
  }, []);

  return (
    <div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>useContext</h1>
        <p>Practise useContext. </p>
        <h2>useContext: {time.toFixed(2)}</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Counter;
