/** @format */

import { cn } from '@/utils/cn';
import { HTMLMotionProps, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

export interface AccordionProps
  extends Omit<HTMLMotionProps<'div'>, 'children' | 'onChange'> {
  /** The title of the accordion header */
  title: string;
  /** The content to be displayed when expanded */
  children: React.ReactNode;
  /** Whether the accordion is open by default */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when the open state changes */
  onChange?: (isOpen: boolean) => void;
  /** Whether the accordion is disabled */
  disabled?: boolean;
  /** Custom icon to replace the default chevron */
  icon?: React.ReactNode;
  /** Whether clicking anywhere on the card toggles the accordion */
  quickOpenClose?: boolean;
  /** Custom transition duration in seconds */
  duration?: number;
  /** Custom class for the header */
  headerClassName?: string;
  /** Custom class for the content */
  contentClassName?: string;
  /** Custom class for the icon container */
  iconContainerClassName?: string;
  /** The range of angles for the icon */
  angleRange?: [number, number];
}

// Animation variants for better performance
const contentVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { ease: [0.22, 1, 0.36, 1] },
      opacity: { ease: 'easeIn' },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { ease: [0.22, 1, 0.36, 1] },
      opacity: { ease: 'easeOut' },
    },
  },
};

// Icon animation variants
const iconVariants = (angleRange: number[]) => ({
  open: { rotate: angleRange[0] },
  closed: { rotate: angleRange[1] },
});

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      title,
      children,
      defaultOpen = false,
      isOpen: controlledIsOpen,
      onChange,
      disabled = false,
      quickOpenClose = false,
      icon,
      duration = 0.7,
      headerClassName,
      contentClassName,
      iconContainerClassName,
      angleRange = [180, 0],
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledIsOpen !== undefined;
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
    const contentRef = useRef<HTMLDivElement>(null);
    const headerId = useId();
    const contentId = useId();
    const shouldReduceMotion = useReducedMotion();
    const animationDuration = shouldReduceMotion ? 0 : duration;

    // Toggle the accordion open/close state
    const toggleOpen = useCallback(() => {
      if (disabled) return;

      const newValue = !isOpen;
      if (!isControlled) {
        setUncontrolledIsOpen(newValue);
      }
      onChange?.(newValue);
    }, [disabled, isOpen, isControlled, onChange]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen();
        }
      },
      [toggleOpen],
    );

    // Update content height when open state changes
    useEffect(() => {
      if (isOpen && contentRef.current) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      }
    }, [isOpen]);

    // Update animation variants with dynamic duration
    const getContentVariants = useCallback(
      () => ({
        ...contentVariants,
        open: {
          ...contentVariants.open,
          transition: {
            height: {
              duration: animationDuration,
              ...contentVariants.open.transition.height,
            },
            opacity: {
              duration: animationDuration * 0.5,
              ...contentVariants.open.transition.opacity,
            },
          },
        },
        closed: {
          ...contentVariants.closed,
          transition: {
            height: {
              duration: animationDuration,
              ...contentVariants.closed.transition.height,
            },
            opacity: {
              duration: animationDuration * 0.3,
              ...contentVariants.closed.transition.opacity,
            },
          },
        },
      }),
      [animationDuration],
    );

    // Calculate header classes
    const headerClasses = cn(
      !quickOpenClose && !disabled && 'cursor-pointer group',
      disabled && 'cursor-not-allowed',
      !headerClassName && [
        'flex w-full items-center justify-between gap-8',
        'px-lg py-md md:text-md lg:text-lg text-base font-medium text-gray-900',
        'hover:bg-gray-50',
      ],
      headerClassName,
    );

    // Calculate container classes
    const containerClasses = cn(
      'border border-gray-200 overflow-hidden bg-white  rd-lg will-change-[height,opacity]',
      quickOpenClose && !disabled && 'cursor-pointer group',
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    );

    // Calculate icon container classes
    const iconContainerClasses = cn(
      'group-hover:invert z-30 bg-gray-100 rounded-full p-2 -mr-3',
      'transition-colors duration-200',
      iconContainerClassName,
    );

    // Calculate content classes
    const contentContainerClasses = cn(
      'overflow-hidden will-change-[height,opacity] ',
      contentClassName,
    );

    return (
      <div
        ref={ref}
        onClick={quickOpenClose ? toggleOpen : undefined}
        className={containerClasses}
        role='region'
        aria-labelledby={headerId}
        // {...props}
      >
        <div
          id={headerId}
          role='button'
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isOpen}
          aria-controls={contentId}
          aria-disabled={disabled}
          onClick={quickOpenClose ? undefined : toggleOpen}
          onKeyDown={handleKeyDown}
          className={headerClasses}
        >
          <span className={cn('', headerClassName)}>{title}</span>
          <motion.div
            aria-hidden='true'
            variants={iconVariants(angleRange)}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            transition={{
              duration: animationDuration,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={iconContainerClasses}
          >
            {icon || <ChevronDown className='text-gray-500' />}
          </motion.div>
        </div>

        <motion.div
          id={contentId}
          ref={contentRef}
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={getContentVariants()}
          className={contentContainerClasses}
          style={{ overflow: 'hidden' }}
        >
          <div className='text-sm text-gray-500  card-lg'>{children}</div>
        </motion.div>
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';
