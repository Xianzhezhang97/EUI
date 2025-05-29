/** @format */
'use client';
import React, { useEffect, useState, useRef } from 'react';

const Counter: React.FC = () => {
  const [status, setSatus] = useState<string>('Loading...');
  const [timer, setTimer] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null); // 存储requestAnimationFrame的ID

  useEffect(() => {}, []);

  return (
    <div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>UseEffect</h1>
        <p>Practise useEffect. </p>
        <h2>Timer: {timer.toFixed(2)}</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Counter;
