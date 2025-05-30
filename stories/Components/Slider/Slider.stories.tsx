/** @format */

import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { withAnimation } from '@/stories/decorators/animation';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [withAnimation],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Current value of the slider',
      table: {
        category: 'Value',
      },
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 100, default: 50 },
      description: 'Default value of the slider',
      table: {
        category: 'Value',
      },
    },
    min: {
      control: 'number',
      description: 'Minimum value of the slider',
      table: {
        defaultValue: { summary: '0' },
        category: 'Range',
      },
    },
    max: {
      control: 'number',
      description: 'Maximum value of the slider',
      table: {
        defaultValue: { summary: '100' },
        category: 'Range',
      },
    },
    step: {
      control: 'number',
      description: 'Step value for the slider',
      table: {
        defaultValue: { summary: '1' },
        category: 'Range',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
      table: {
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    trackColor: {
      control: 'color',
      description: 'Color of the slider track',
      table: {
        defaultValue: { summary: 'bg-gray-200' },
        category: 'Appearance',
      },
    },
    filledTrackColorFrom: {
      control: 'color',
      description: 'Starting color of the filled track gradient',
      table: {
        defaultValue: { summary: 'primary-400' },
        category: 'Appearance',
      },
    },
    filledTrackColorTo: {
      control: 'color',
      description: 'Ending color of the filled track gradient',
      table: {
        defaultValue: { summary: 'primary-600' },
        category: 'Appearance',
      },
    },
    thumbColor: {
      control: 'color',
      description: 'Color of the slider thumb',
      table: {
        defaultValue: { summary: 'bg-primary-50' },
        category: 'Appearance',
      },
    },
    thumbBorderColor: {
      control: 'color',
      description: 'Border color of the slider thumb',
      table: {
        defaultValue: { summary: 'border-primary-500' },
        category: 'Appearance',
      },
    },
    thumbHoverColor: {
      control: 'color',
      description: 'Hover color of the slider thumb',
      table: {
        defaultValue: { summary: 'hover:bg-white' },
        category: 'Appearance',
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
};

export const WithCustomRange: Story = {
  args: {
    min: -50,
    max: 500,
    defaultValue: 0,
  },
};

export const WithSteps: Story = {
  args: {
    step: 10,
    defaultValue: 30,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 70,
    disabled: true,
  },
};

export const CustomColors: Story = {
  args: {
    defaultValue: 60,
    trackColor: "#b3b3b3",
    filledTrackColorFrom: "#00e1cf",
    filledTrackColorTo: "#00c8ff",
    thumbColor: "#0aa7ff",
    thumbBorderColor: "#ffffff",
    thumbHoverColor: "#ffffff",
  },
};

export const MultipleSliders: Story = {
  render: () => (
    <div className='flex flex-col gap-8 w-[300px]'>
      <Slider defaultValue={25} />
      <Slider
        defaultValue={50}
        filledTrackColorFrom='rose-400'
        filledTrackColorTo='rose-600'
        thumbColor='bg-rose-50'
        thumbBorderColor='border-rose-500'
      />
      <Slider
        defaultValue={75}
        filledTrackColorFrom='emerald-400'
        filledTrackColorTo='emerald-600'
        thumbColor='bg-emerald-50'
        thumbBorderColor='border-emerald-500'
      />
    </div>
  ),
};
