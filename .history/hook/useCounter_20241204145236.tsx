/** @format */

import { useState } from 'react';

export const useConter = (initialValue: number) => {
  const [count, setCount] = useState<number>(initialValue);

  return { count, setCount };
};
