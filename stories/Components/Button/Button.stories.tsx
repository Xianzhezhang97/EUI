/** @format */

import { EUI } from '@/stories/decorators/EUI';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/stories/Components/Button/Button';
// import doc from '@/stories/Components/Button/Button.mdx';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    // docs: {
    //   description: {
    //     component: doc.toString(),
    //   },
    // },
  },
  decorators: [EUI],

  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'full'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
  parameters: {
    viewMode: 'docs',
    header: 'Primary',
    docs: {
      description: {
        story: 'Primary button variant',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
  parameters: {
    viewMode: 'docs',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
    isPadding: false,
    size: 'noPadding',
  },
};

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg',
  },
};

export const IconWithPrimary: Story = {
  args: {
    children: (
      <Plus
        width={30}
        height={30}
      />
    ),
    variant: 'primary',
    isPadding: false,
    size: 'noPadding',
  },
};

export const IconWithSecondary: Story = {
  args: {
    children: (
      <Plus
        width={30}
        height={30}
      />
    ),
    variant: 'secondary',
    isPadding: false,
    size: 'noPadding',
  },
};

export const IconWithOutline: Story = {
  args: {
    children: (
      <Plus
        width={30}
        height={30}
      />
    ),
    variant: 'outline',
    isPadding: false,
    size: 'noPadding',
  },
};

export const IconWithGhost: Story = {
  args: {
    children: (
      <Plus
        width={30}
        height={30}
      />
    ),
    variant: 'ghost',
    isPadding: false,
    size: 'noPadding',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Add Item',
    leftIcon: <Plus />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    rightIcon: <ChevronRight />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    size: 'lg',
    children: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    size: 'lg',
    children: 'Full Width Button',
    fullWidth: true,
  },
};
