/** @format */
'use client';
import React, { useEffect, useState, useRef } from 'react';

const Counter: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null); // 存储requestAnimationFrame的ID

  useEffect(() => {
    setStatus('Component has rendered!');

    // 使用 requestAnimationFrame 代替 setInterval
    const updateTimer = () => {
      setTimer((prev) => prev + 0.01); // 更新计时器
      animationFrameRef.current = requestAnimationFrame(updateTimer); // 继续下一帧
    };

    // 启动计时器
    animationFrameRef.current = requestAnimationFrame(updateTimer);

    // 清理定时器
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current); // 停止动画
        animationFrameRef.current = null; // 清除引用
      }
    };
  }, []);

  return (
    <div className='center flex flex-col justify-center items-center page-padding'>
      <div className='w-full flex flex-col text-gap'>
        <h1>Counter</h1>
        <p>Practise useEffect. </p>
        <h2>Timer: {timer.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Counter;
