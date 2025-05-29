/** @format */
'use client';
import { useState } from 'react';

export const useConter = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return { count, increment, decrement, setCount };
};
