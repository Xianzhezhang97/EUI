import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta = {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
};

export default meta;

// Basic Skeleton Stories
export const Basic: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-4 ">
      <Skeleton variant="text" size="md" className="w-3/4" />
      <Skeleton variant="text" size="md" className="w-1/2" />
      <Skeleton variant="text" size="md" className="w-2/3" />
    </div>
  ),
};

export const Variants: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Text</h3>
        <Skeleton variant="text" size="md" className="w-64" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Circular</h3>
        <Skeleton variant="circular" size="md" className="w-16 h-16" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Rectangular</h3>
        <Skeleton variant="rectangular" size="md" className="w-64" />
      </div>
    </div>
  ),
};

export const Sizes: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Extra Small</h3>
        <Skeleton variant="text" size="xs" className="w-64" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Small</h3>
        <Skeleton variant="text" size="sm" className="w-64" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Medium</h3>
        <Skeleton variant="text" size="md" className="w-64" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Large</h3>
        <Skeleton variant="text" size="lg" className="w-64" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Extra Large</h3>
        <Skeleton variant="text" size="xl" className="w-64" />
      </div>
    </div>
  ),
};

export const Colors: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Default</h3>
        <Skeleton variant="text" size="md" className="w-64" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Blue</h3>
        <Skeleton
          variant="text"
          size="md"
          className="w-64"
          startColor="from-blue-200"
          endColor="to-blue-300"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Green</h3>
        <Skeleton
          variant="text"
          size="md"
          className="w-64"
          startColor="from-green-200"
          endColor="to-green-300"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Purple</h3>
        <Skeleton
          variant="text"
          size="md"
          className="w-64"
          startColor="from-purple-200"
          endColor="to-purple-300"
        />
      </div>
    </div>
  ),
};

export const CardExample: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="max-w-sm rounded-lg border p-4 shadow-sm">
      <div className="space-y-4">
        <Skeleton variant="circular" size="lg" className="w-16 h-16" />
        <div className="space-y-2">
          <Skeleton variant="text" size="lg" className="w-3/4" />
          <Skeleton variant="text" size="md" className="w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton variant="text" size="sm" className="w-full" />
          <Skeleton variant="text" size="sm" className="w-full" />
          <Skeleton variant="text" size="sm" className="w-2/3" />
        </div>
      </div>
    </div>
  ),
};

export const ListExample: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton variant="circular" size="md" className="w-12 h-12" />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" size="md" className="w-3/4" />
            <Skeleton variant="text" size="sm" className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
}; 

export const UserTableWithAvatars: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-2 border rounded-lg p-4">
      <Skeleton variant="text" size="lg" className="w-32" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton variant="circular" size="md" className="w-10 h-10" />
          <Skeleton variant="text" size="md" className="w-1/3" />
          <Skeleton variant="text" size="sm" className="w-1/4" />
          <Skeleton variant="text" size="sm" className="w-1/6" />
        </div>
      ))}
    </div>
  ),
};

export const BasicTable: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-2 border rounded-lg p-4">
      <Skeleton variant="text" size="lg" className="w-32" />
      <div className="space-y-1">
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="rectangular"
                size="sm"
                className="h-6"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};


