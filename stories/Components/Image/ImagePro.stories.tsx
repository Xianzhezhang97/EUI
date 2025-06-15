// src/components/ImagePro.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ImagePro } from './ImagePro';

const meta: Meta<typeof ImagePro> = {
  title: 'Components/ImagePro',
  component: ImagePro,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // 展示居中更清晰
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    src: { control: 'text', description: 'Image source URL' },
    alt: { control: 'text', description: 'Alternative text' },
    width: { control: 'text', description: 'Image width (px or %)' },
    height: { control: 'text', description: 'Image height (px or %)' },
    aspectRatio: {
      control: 'text',
      description: 'Aspect ratio (e.g., 16:9)',
    },
    lazy: { control: 'boolean', description: 'Enable lazy loading' },
    withSkeleton: {
      control: 'boolean',
      description: 'Show skeleton while loading',
    },
    placeholder: { control: 'text', description: 'Placeholder image URL' },
    fallback: { control: 'text', description: 'Fallback image URL' },
    showProgress: {
      control: 'boolean',
      description: 'Show loading progress bar',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
    fadeIn: { control: 'boolean' },
    fadeInDuration: { control: 'number' },
    zoomOnHover: { control: 'boolean' },
    zoomOnClick: { control: 'boolean', description: 'Enable zoom on click' },
  },
  decorators: [
    (Story) => (
      <div className='flex items-center justify-center w-full h-[300px] bg-gray-50 p-4 rounded-xl border'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImagePro>;

// ---------- 🔽 Demo assets ----------
const demoImage = 'https://picsum.photos/600/400';
const brokenImage = 'https://not-exist-domain.com/image.jpg';
const blurPlaceholder = 'https://picsum.photos/id/237/10?blur';

// ---------- ✅ Story variants ----------

export const Default: Story = {
  name: '🎯 Default Image',
  args: {
    src: demoImage,
    alt: 'Default image',
  },
};

export const LazyAndSkeleton: Story = {
  name: '🕒 Lazy + Skeleton',
  args: {
    src: demoImage,
    alt: 'Lazy image with skeleton',
    lazy: true,
    withSkeleton: true,
  },
};

export const WithPlaceholder: Story = {
  name: '🔍 Blur Placeholder',
  args: {
    src: demoImage,
    alt: 'Image with blurred placeholder',
    placeholder: blurPlaceholder,
    lazy: true,
    withSkeleton: false,
  },
};

export const InteractiveImage: Story = {
  name: '✨ Interactive (Hover & Click)',
  args: {
    src: demoImage,
    alt: 'Interactive image with hover and click zoom',
    width: 300,
    aspectRatio: '9:16',
    zoomOnHover: true,
    zoomOnClick: true,
    fadeIn: true,
  },
};

export const WithFallback: Story = {
  name: '❌ Fallback on Error',
  args: {
    src: brokenImage,
    alt: 'Broken image with fallback',
    fallback: '/fallback.png',
    showProgress: true,
    lazy: true,
  },
};

export const WithProgressBar: Story = {
  name: '📈 With Progress Indicator',
  args: {
    src: demoImage,
    alt: 'Image with progress tracking',
    showProgress: true,
    lazy: true,
  },
};

export const WithAspectRatio: Story = {
  name: '📐 Aspect Ratio (16:9)',
  args: {
    src: demoImage,
    alt: 'Image with aspect ratio',
    aspectRatio: '16:9',
    width: '100%',
    withSkeleton: true,
  },
};

export const FixedHeight: Story = {
  name: '📏 Fixed Height (150px)',
  args: {
    src: demoImage,
    alt: 'Image with fixed height',
    height: 150,
    width: '100%',
    aspectRatio: undefined, // Explicitly remove aspect ratio to use fixed height
  },
};

// ---------- 🖼️ Gallery Story ----------
const galleryImages = [
  { id: 10, author: 'Paul Jarvis' },
  { id: 20, author: 'Alejandro Escamilla' },
  { id: 30, author: 'Paul Jarvis' },
  { id: 40, author: 'Ryan McGuire' },
  { id: 50, author: 'NASA' },
  { id: 60, author: 'Christian Bardenhorst' },
];

export const Gallery: Story = {
  name: '🖼️ Gallery Grid',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  // This story uses its own decorator to provide a better viewing experience
  decorators: [
    (Story) => (
      <div className='p-4 sm:p-8 bg-gray-50'>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className='grid grid-cols-3 gap-4'>
      {galleryImages.map(({ id, author }) => (
        <ImagePro
          key={id}
          src={`https://picsum.photos/id/${id}/500/500`}
          alt={`Photo by ${author}`}
          aspectRatio='1:1'
          lazy
          withSkeleton
          zoomOnClick
          zoomOnHover
          fadeIn
        />
      ))}
    </div>
  ),
};
