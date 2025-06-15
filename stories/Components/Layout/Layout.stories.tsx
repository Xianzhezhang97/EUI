import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Container } from './Container';
import { Grid } from './Grid';
import { Split } from './Split';
import { Stack } from './Stack';

const meta: Meta = {
  title: 'Layout/Layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// Toast component for copy notification
const Toast = ({ message }: { message: string }) => (
  <div className='fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-fade-in-up'>
    {message}
  </div>
);

// Helper function to copy code and show toast
const CopyButton = ({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className='relative'>
      <div
        onClick={handleCopy}
        className='cursor-pointer hover:bg-gray-50 transition-colors group'
      >
        {children}
        <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
          <svg
            className='w-5 h-5 text-gray-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
            />
          </svg>
        </div>
      </div>
      {showToast && <Toast message='Code copied to clipboard!' />}
    </div>
  );
};

// Container Stories
export const ContainerSizes: StoryObj<typeof Container> = {
  render: () => (
    <div className='space-y-8'>
      {['sm', 'md', 'lg', 'xl'].map((size) => (
        <CopyButton
          key={size}
          code={`<Container size="${size}">\n  <p>Content</p>\n</Container>`}
        >
          <Container
            size={size as any}
            className='bg-gray-100 p-4'
          >
            <p>{size.toUpperCase()} Container</p>
          </Container>
        </CopyButton>
      ))}
    </div>
  ),
};

export const ContainerCentered: StoryObj<typeof Container> = {
  render: () => (
    <CopyButton
      code={`<Container size="md" centered>\n  <p>Centered Content</p>\n</Container>`}
    >
      <Container
        size='md'
        centered
        className='bg-gray-100 p-4'
      >
        <p>Centered Container</p>
      </Container>
    </CopyButton>
  ),
};

// Grid Stories
export const GridColumns: StoryObj<typeof Grid> = {
  render: () => (
    <div className='space-y-8'>
      {[2, 3, 4].map((cols) => (
        <CopyButton
          key={cols}
          code={`<Grid cols={${cols}} gap="md">\n  ${Array(cols)
            .fill(0)
            .map((_, i) => `  <div>Column ${i + 1}</div>`)
            .join('\n')}\n</Grid>`}
        >
          <Grid
            cols={cols as any}
            gap='md'
            className='bg-gray-100 p-4'
          >
            {Array(cols)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className='bg-white p-4'
                >
                  Column {i + 1}
                </div>
              ))}
          </Grid>
        </CopyButton>
      ))}
      <Grid
        responsive
        minWidth={220}
        gap='md'
      >
        <div className='bg-white p-4 rounded shadow'>卡片1</div>
        <div className='bg-white p-4 rounded shadow'>卡片2</div>
        <div className='bg-white p-4 rounded shadow'>卡片3</div>
        ...
      </Grid>
    </div>
  ),
};

export const GridAlignment: StoryObj<typeof Grid> = {
  render: () => (
    <div className='space-y-8'>
      {['start', 'center', 'end'].map((align) => (
        <CopyButton
          key={align}
          code={`<Grid cols={3} gap="md" align="${align}">\n  <div>Content</div>\n  <div>Content</div>\n  <div>Content</div>\n</Grid>`}
        >
          <Grid
            cols={3}
            gap='md'
            align={align as any}
            className='bg-gray-100 p-4 h-32'
          >
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className='bg-white p-4'
                >
                  {align}
                </div>
              ))}
          </Grid>
        </CopyButton>
      ))}
    </div>
  ),
};

// Stack Stories
export const StackDirections: StoryObj<typeof Stack> = {
  render: () => (
    <div className='space-y-8'>
      {['vertical', 'horizontal'].map((direction) => (
        <CopyButton
          key={direction}
          code={`<Stack direction="${direction}" spacing="md">\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</Stack>`}
        >
          <Stack
            direction={direction as any}
            spacing='md'
            className='bg-gray-100 p-4'
          >
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className='bg-white p-4'
                >
                  Item {i + 1}
                </div>
              ))}
          </Stack>
        </CopyButton>
      ))}
    </div>
  ),
};

export const StackAlignment: StoryObj<typeof Stack> = {
  render: () => (
    <div className='space-y-8'>
      {['start', 'center', 'end'].map((align) => (
        <CopyButton
          key={align}
          code={`<Stack direction="horizontal" spacing="md" align="${align}">\n  <div>Content</div>\n  <div>Content</div>\n  <div>Content</div>\n</Stack>`}
        >
          <Stack
            direction='horizontal'
            spacing='md'
            align={align as any}
            className='bg-gray-100 p-4 h-32'
          >
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className='bg-white p-4'
                >
                  {align}
                </div>
              ))}
          </Stack>
        </CopyButton>
      ))}
    </div>
  ),
};

// Split Stories
export const SplitRatios: StoryObj<typeof Split> = {
  render: () => (
    <div className='space-y-8'>
      {['1/2', '1/3', '2/3'].map((ratio) => (
        <CopyButton
          key={ratio}
          code={`<Split ratio="${ratio}" gap="md">\n  <div>Left</div>\n  <div>Right</div>\n</Split>`}
        >
          <Split
            ratio={ratio as any}
            gap='md'
            className='bg-gray-100 p-4'
          >
            <div className='bg-white p-4'>Left</div>
            <div className='bg-white p-4'>Right</div>
          </Split>
        </CopyButton>
      ))}
    </div>
  ),
};

export const SplitDirections: StoryObj<typeof Split> = {
  render: () => (
    <div className='space-y-8'>
      {['horizontal', 'vertical'].map((direction) => (
        <CopyButton
          key={direction}
          code={`<Split direction="${direction}" gap="md">\n  <div>${
            direction === 'horizontal' ? 'Left' : 'Top'
          }</div>\n  <div>${
            direction === 'horizontal' ? 'Right' : 'Bottom'
          }</div>\n</Split>`}
        >
          <Split
            direction={direction as any}
            gap='md'
            className='bg-gray-100 p-4'
          >
            <div className='bg-white p-4'>
              {direction === 'horizontal' ? 'Left' : 'Top'}
            </div>
            <div className='bg-white p-4'>
              {direction === 'horizontal' ? 'Right' : 'Bottom'}
            </div>
          </Split>
        </CopyButton>
      ))}
    </div>
  ),
};
