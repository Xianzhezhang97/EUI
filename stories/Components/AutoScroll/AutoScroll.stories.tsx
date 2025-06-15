import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AutoScroll } from './AutoScroll';
import { ImagePro } from '../Image/ImagePro';

const meta: Meta<typeof AutoScroll> = {
  title: 'Components/AutoScroll',
  component: AutoScroll,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AutoScroll>;

// Basic example with text
export const Basic: Story = {
  args: {
    children:
      'This is a basic example of auto-scrolling text that repeats infinitely',
    speed: 30,
    className: 'bg-gray-100 py-2 px-4 text-gray-800 rounded',
  },
};

// Example with multiple items
const MultipleItems = () => (
  <AutoScroll
    className='bg-gray-100 py-4 rounded w-[500px]'
    speed={50}
    gap={0}
  >
    <div className='flex gap-4 mx-2'>
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          key={num}
          className='flex items-center justify-center w-20 h-20 bg-white rounded-lg shadow-sm'
        >
          Item {num}
        </div>
      ))}
    </div>
  </AutoScroll>
);

export const WithMultipleItems: Story = {
  render: () => <MultipleItems />,
};

// Example with right-to-left direction
export const RightToLeft: Story = {
  args: {
    children: 'This text scrolls from right to left',
    direction: 'right',
    gap: 20,
    speed: 10,
    className: 'bg-gray-100 py-2 px-4 text-gray-800 ',
  },
};

// Example with hover pause
const HoverPauseDemo = () => (
  <div className='space-y-4'>
    <p className='text-sm text-gray-500'>
      Hover over the text to pause the animation
    </p>
    <AutoScroll
      className='bg-gray-100 py-2 px-4 text-gray-800 rounded'
      speed={50}
      pauseOnHover={true}
    >
      This text will pause when you hover over it
    </AutoScroll>
  </div>
);

export const WithHoverPause: Story = {
  render: () => <HoverPauseDemo />,
};

// Example with delayed start
const DelayedStartDemo = () => (
  <div className='space-y-4'>
    <p className='text-sm text-gray-500'>Animation starts after 1 second</p>
    <AutoScroll
      className='bg-gray-100 py-2 px-4 text-gray-800 rounded'
      speed={50}
      delay={1000}
    >
      This text starts scrolling after a delay
    </AutoScroll>
  </div>
);

export const WithDelayedStart: Story = {
  render: () => <DelayedStartDemo />,
};

// Example with custom styling
const StyledDemo = () => (
  <AutoScroll
    className='bg-gradient-to-r from-blue-500 to-purple-500 py-4 text-white font-bold shadow-lg w-[700px] mx-auto'
    speed={10}
    gradient={true}
    gap={30}
  >
    <div className='flex items-center gap-4'>
      <span>✨ Custom styled scrolling text</span>
      <span>🎨 With gradients and emojis</span>
      <span>🚀 And cool effects</span>
    </div>
  </AutoScroll>
);

export const Styled: Story = {
  render: () => <StyledDemo />,
};

// Example with images
const ImagesDemo = () => (
  <AutoScroll
    className='py-4 w-[70vw] mx-auto'
    speed={10}
  >
    <div className='flex items-center gap-8 mx-4'>
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          key={num}
          className='w-32 h-32 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center'
        >
          <ImagePro
            loading='eager'
            src={`https://picsum.photos/200/300?key=${num}`}
            alt='Image'
            className='w-full h-full object-cover'
          />
        </div>
      ))}
    </div>
  </AutoScroll>
);

export const WithImages: Story = {
  render: () => <ImagesDemo />,
};
