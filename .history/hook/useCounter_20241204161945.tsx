/** @format */
'use client';
import { useState } from 'react';

export const useCounter = () => {
  const [counters, setCounters] = useState<Record<string, number>>({});

  const increment = (id: string) =>
    setCounters((prev) => ({ ...prev, [id]: (prev[id] || 0) + 10 }));
  const decrement = (id: string) =>
    setCounters((prev) => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
  const reset = (id: string, initialValue = 0) =>
    setCounters((prev) => ({ ...prev, [id]: initialValue }));

  return { counters, increment, decrement, reset };
};
