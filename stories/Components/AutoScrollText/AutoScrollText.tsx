/** @format */

import { motion } from 'framer-motion';
import React from 'react';

const AutoScrollText = ({
  children,
  className,
  speed = 50, // px per second，默认速度
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) => {
  // 假设一屏宽度内滚动
  const marqueeVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: 100 / speed, // 按速度换算 duration
        },
      },
    },
  };

  return (
    <div className={`relative overflow-hidden w-full ${className} `}>
      <motion.div
        className='flex whitespace-nowrap'
        variants={marqueeVariants}
        animate='animate'
      >
        <div className='flex-shrink-0'>{children}</div>
        <div className='flex-shrink-0'>{children}</div>
      </motion.div>
    </div>
  );
};

export default AutoScrollText;
