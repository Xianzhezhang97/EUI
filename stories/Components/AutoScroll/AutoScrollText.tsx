/** @format */

import { motion } from 'framer-motion';
import React from 'react';

const AutoScroll = ({
  children,
  className,
  speed = 10, // px per second，默认速度
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) => {
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
    <div
      className={`relative overflow-hidden w-full ${className}`}
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div className='flex'>
        <motion.div
          className='flex whitespace-nowrap'
          variants={marqueeVariants}
          animate='animate'
        >
          <div className='flex-shrink-0'>{children}</div>
          <div className='flex-shrink-0'>{children}</div>
        </motion.div>
        <motion.div
          className='flex whitespace-nowrap'
          variants={marqueeVariants}
          animate='animate'
        >
          <div className='flex-shrink-0'>{children}</div>
          <div className='flex-shrink-0'>{children}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default AutoScroll;
