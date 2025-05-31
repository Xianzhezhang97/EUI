/** @format */

import { cn } from '@/utils/cn';
import { motion, Variants } from 'framer-motion';
import React from 'react';

export type AnimationType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'bounce'
  | 'flip'
  | 'rotate'
  | 'scale'
  | 'none';

export type AnimationTiming =
  | 'ease'
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out';

interface AnimateProps {
  children: React.ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: AnimationTiming;
  className?: string;
  once?: boolean;
}

const baseVariants: Record<AnimationType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  'slide-down': {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  'slide-left': {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  'slide-right': {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  bounce: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  },
  flip: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
  },
  none: {
    initial: {},
    animate: {},
  },
};

export const Animate: React.FC<AnimateProps> = ({
  children,
  type = 'fade',
  duration = 0.5,
  delay = 0,
  ease = 'easeInOut',
  className,
  once = false,
}) => {
  const variants = baseVariants[type];

  return (
    <motion.div
      className={cn('', className)}
      initial='initial'
      animate='animate'
      variants={variants}
      transition={{ duration, delay, ease }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};
