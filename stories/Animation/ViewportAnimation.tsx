import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

interface ViewportAnimationProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export const ViewportAnimation = React.memo<ViewportAnimationProps>(
  ({ children, className, once = true, ...props }) => {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          margin: '25% 0px -25% 0px',
          once: once,
          amount: 0.25,
        }}
        transition={{
          opacity: {
            ease: [0.455, 0.03, 0.515, 0.955],
            duration: 0.9,
          },
          y: {
            ease: [0.455, 0.03, 0.515, 0.955],
            duration: 0.7,
          },

        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

ViewportAnimation.displayName = 'ViewportAnimation';
