import { motion, Variants } from 'framer-motion';
import React from 'react';

interface VibrantAnimationProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.9,
      },
      y: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.7,
      },
    },
  },
};

export const VibrantAnimation: React.FC<VibrantAnimationProps> = ({
  children,
  className,
  once = true,
}) => {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial='hidden'
      whileInView='show'
      viewport={{
        margin: '25% 0px -25% 0px',
        once,
        amount: 0.25,
      }}
    >
      {children}
    </motion.div>
  );
};
