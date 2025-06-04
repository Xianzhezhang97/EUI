/** @format */

import { Button } from '@/stories/Components/Button/Button';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import React from 'react';
import '@/styles/globals.css';

interface AnimationDecoratorProps {
  children: React.ReactNode;
  sourceCode?: string;
}

export const AnimationDecorator: React.FC<AnimationDecoratorProps> = ({
  children,
  sourceCode,
}) => {
  return (
    <div className='flex justify-center items-center border border-[#dae0e7] overflow-hidden rounded-xl m-xl'>
      <div className='w-[800px] h-[600px]  bg-[#f8fafd] flex justify-center   relative items-center card-xl shadow-xl border-white/20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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
          className='flex flex-col gap-6 items-center justify-center p-xl  '
        >
          {children}
        </motion.div>
        <Button
          variant='secondary'
          isPadding={false}
          size='noPadding'
          className='absolute top-[28px] right-[28px]'
        >
          <Moon />
        </Button>
      </div>
    </div>
  );
};

import type { Decorator } from '@storybook/react';

export const EUI: Decorator = (Story, context) => {
  return (
    <AnimationDecorator sourceCode={context.args.sourceCode as string}>
      <Story />
    </AnimationDecorator>
  );
};
