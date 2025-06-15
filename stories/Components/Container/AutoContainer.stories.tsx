import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AutoContainer } from './AutoContainer';
import { Button } from '../Button/Button';
import { cn } from '@/utils/cn';

const meta: Meta<typeof AutoContainer> = {
  title: 'Components/Container/AutoContainer',
  component: AutoContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AutoContainer>;

// Demo component with dynamic content
const DemoContent = () => {
  const [content, setContent] = useState<string[]>(['Initial content']);
  const [isLarge, setIsLarge] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  // Auto-play demo
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setContent((prev) => {
        if (prev.length > 5) {
          return prev.slice(1);
        }
        return [...prev, `New content ${prev.length + 1}`];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const addContent = () => {
    setContent([...content, `New content ${content.length + 1}`]);
  };

  const removeContent = () => {
    if (content.length > 1) {
      setContent(content.slice(0, -1));
    }
  };

  const toggleSize = () => {
    setIsLarge(!isLarge);
  };

  return (
    <div className='space-y-4 w-[300px]'>
      <div className='space-x-2 flex flex-wrap gap-2'>
        <Button
          onClick={addContent}
          size='sm'
        >
          Add Content
        </Button>
        <Button
          onClick={removeContent}
          size='sm'
          variant='secondary'
        >
          Remove Content
        </Button>
        <Button
          onClick={toggleSize}
          size='sm'
          variant='outline'
        >
          Toggle Size
        </Button>
        <Button
          onClick={() => setAutoPlay(!autoPlay)}
          size='sm'
          variant={autoPlay ? 'primary' : 'outline'}
        >
          {autoPlay ? 'Stop Auto' : 'Start Auto'}
        </Button>
      </div>

      <AutoContainer
        className='border rounded-lg bg-white p-4'
        duration={0.5}
        animateWidth={true}
      >
        <div className={isLarge ? 'space-y-4' : 'space-y-2'}>
          {content.map((text, index) => (
            <div
              key={`${index}-${text}`}
              className={cn(
                'bg-gray-100 rounded p-4 transition-all duration-300',
                isLarge ? 'text-lg' : 'text-sm',
              )}
            >
              {text}
            </div>
          ))}
        </div>
      </AutoContainer>
    </div>
  );
};

// Basic example
export const Basic: Story = {
  render: () => <DemoContent />,
};

// Example with width animation
export const WithWidthAnimation: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    const [content, setContent] = useState(['Short text', 'Another line']);

    const toggleContent = () => {
      if (content.length <= 2) {
        setContent([
          'This is a much longer text that will cause the container to expand horizontally',
          'Another long line of text to demonstrate the smooth width transition',
          'And one more line just to make it interesting',
        ]);
      } else {
        setContent(['Short text', 'Another line']);
      }
    };

    return (
      <div className='space-y-4'>
        <div className='space-x-2'>
          <Button
            onClick={() => setExpanded(!expanded)}
            size='sm'
          >
            Toggle Width
          </Button>
          <Button
            onClick={toggleContent}
            size='sm'
            variant='secondary'
          >
            Toggle Content
          </Button>
        </div>

        <AutoContainer
          className='border rounded-lg bg-white p-4'
          animateWidth={true}
          style={{ width: expanded ? 500 : 300 }}
          duration={0.5}
        >
          <div className='space-y-2'>
            {content.map((text, index) => (
              <div
                key={`${index}-${text}`}
                className='bg-gray-100 rounded p-4 whitespace-normal'
              >
                {text}
              </div>
            ))}
          </div>
        </AutoContainer>
      </div>
    );
  },
};

// Example with nested animations
export const NestedAnimations: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, expanded: false, content: 'Click me to expand' },
    ]);

    const toggleItem = (id: number) => {
      setItems(
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                expanded: !item.expanded,
                content: item.expanded
                  ? 'Click me to expand'
                  : 'This is expanded content with much more text to show the animation in action. You can click again to collapse this item.',
              }
            : item,
        ),
      );
    };

    const addItem = () => {
      setItems([
        ...items,
        {
          id: items.length + 1,
          expanded: false,
          content: 'Click me to expand',
        },
      ]);
    };

    return (
      <div className='space-y-4 w-[300px]'>
        <Button
          onClick={addItem}
          size='sm'
        >
          Add Item
        </Button>

        <AutoContainer
          className='border rounded-lg bg-white p-4'
          duration={0.5}
          animateWidth={true}
        >
          <div className='space-y-2'>
            {items.map((item) => (
              <AutoContainer
                key={item.id}
                className='bg-gray-100 rounded p-4 cursor-pointer'
                onClick={() => toggleItem(item.id)}
                duration={0.3}
                animateWidth={true}
              >
                <div className='space-y-2'>{item.content}</div>
              </AutoContainer>
            ))}
          </div>
        </AutoContainer>
      </div>
    );
  },
};
