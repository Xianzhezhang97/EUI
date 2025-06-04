/** @format */

import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { EUI } from '@/stories/decorators/EUI';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    header: 'The strongest Alert component',
    grid: {
      gridOn: true,
      columns: 2,
      gap: '16px',
      padding: '16px',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    closable: {
      control: 'boolean',
    },
  },
  decorators: [EUI],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    title: 'Information',
    description: 'This is an informational message.',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    title: 'Success',
    description: 'Your changes have been saved successfully.',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'Please review your changes before proceeding.',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    variant: 'error',
  },
};

export const Closable: Story = {
  args: {
    title: 'Closable Alert',
    description: 'This alert can be closed.',
    closable: true,
  },
};
