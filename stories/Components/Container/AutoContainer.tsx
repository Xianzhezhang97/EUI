import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion, useReducedMotion } from 'framer-motion';
import React, { useRef } from 'react';

export interface AutoContainerProps
  extends Omit<HTMLMotionProps<'div'>, 'transition' | 'animate' | 'initial'> {
  /** The content to be displayed */
  children: React.ReactNode;
  /** Custom transition duration in seconds */
  duration?: number;
  /** Whether to animate width changes as well */
  animateWidth?: boolean;
  /** Whether to animate opacity changes */
  animateOpacity?: boolean;
  /** Custom easing function */
  ease?: number[];
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
}

export const AutoContainer = React.forwardRef<
  HTMLDivElement,
  AutoContainerProps
>(
  (
    {
      children,
      className,
      duration = 0.3,
      animateWidth = true,
      animateOpacity = true,
      ease = [0.22, 1, 0.36, 1],
      onAnimationComplete,
      style,
      ...props
    },
    ref,
  ) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const animationDuration = shouldReduceMotion ? 0 : duration;

    return (
      <motion.div
        ref={ref}
        className={cn('overflow-hidden', className)}
        {...props}
      >
        <motion.div
          ref={contentRef}
          layout
          style={{
            width: animateWidth ? 'auto' : style?.width || '100%',
            height: 'auto',
            ...style,
          }}
          transition={{
            layout: {
              duration: animationDuration,
              ease,
            },
            opacity: animateOpacity
              ? {
                  duration: animationDuration * 0.5,
                }
              : undefined,
          }}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  },
);

AutoContainer.displayName = 'AutoContainer';
