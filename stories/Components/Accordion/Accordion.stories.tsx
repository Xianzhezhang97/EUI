/** @format */

import { EUI } from '@/stories/decorators/EUI';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { Settings, X } from 'lucide-react';
import { Accordion } from './Accordion';
import doc from './Accordion.md';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    header: 'Accordion',
    // docs: {
    //   description: {
    //     component: doc.toString(),
    //   },
    // },
  },
  tags: ['autodocs'],

  decorators: [EUI],

  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the accordion header',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the accordion is open by default',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    onChange: {
      action: 'toggled',
      description: 'Callback when the open state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    quickOpenClose: {
      control: 'boolean',
      description:
        'Whether clicking anywhere on the card toggles the accordion',
    },
    duration: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Animation duration in seconds',
    },
    headerClassName: {
      control: 'text',
      description: 'Custom class for the header',
    },
    contentClassName: {
      control: 'text',
      description: 'Custom class for the content',
    },
    iconContainerClassName: {
      control: 'text',
      description: 'Custom class for the icon container',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children:
      'This is the content of the accordion. It can contain any valid React node.',
  },
  parameters: {
    header: 'Default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const header = await canvas.getByText('Accordion Title');
    await userEvent.click(header);
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: 'Accordion with Custom Icon',
    icon: <Settings className='h-5 w-5 text-gray-500' />,
    children: 'This accordion has a custom settings icon.',
  },
  parameters: {
    header: 'Custom Icon',
  },
};

export const WithCustomDuration: Story = {
  args: {
    title: 'Slow Animation',
    duration: 1,
    children: 'This accordion has a slower animation duration.',
  },
  parameters: {
    header: 'Custom Duration',
  },
};

export const WithCustomStyling: Story = {
  args: {
    title: 'Custom Styled Accordion',
    headerClassName:
      'bg-primary-700 text-white flex w-full items-center justify-between px-md py-sm',
    contentClassName: 'bg-gray-50 rounded-b-lg ',
    iconContainerClassName: 'bg-primary-100 rounded-full',
    children:
      'This accordion has custom styling applied to its header, content, and icon container.',
  },
  parameters: {
    header: 'Custom Styling',
    description:
      'This accordion has custom styling applied to its header, content, and icon container.',
  },
};

export const WithLongContent: Story = {
  args: {
    title: 'Long Content Accordion',
    children: (
      <div className='space-y-4'>
        <p>Scott Cheung is a software engineer.</p>
        <p>He made this component.</p>
        <p>How does it work?</p>
        <p>It is a component that can be used to create an accordion.</p>
      </div>
    ),
  },
  parameters: {
    header: 'Long Content',
  },
};

export const WithQuickOpenClose: Story = {
  args: {
    title: 'Quick Open/Close',
    quickOpenClose: true,
    children: (
      <div className='space-y-4'>
        <p>Click anywhere on this card to toggle the accordion.</p>
        <p>Scott Cheung is a software engineer.</p>
        <p>He made this component.</p>
        <p>How does it work?</p>
        <p>It is a component that can be used to create an accordion.</p>
      </div>
    ),
  },
  parameters: {
    header: 'Quick Open/Close',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    disabled: true,
    children: 'This accordion is disabled and cannot be toggled.',
  },
  parameters: {
    header: 'Disabled',
    description: 'This accordion is disabled and cannot be toggled.',
  },
};

export const Controlled: Story = {
  args: {
    title: 'Controlled by React State',
    isOpen: true,
    onChange: (isOpen) =>
      console.log(`Accordion is now ${isOpen ? 'open' : 'closed'}`),
    children:
      'The parent component controls this accordion. So you can use the parent component to manage the state, like you can put a few Accordion components, and only allow the user to open one at once.',
  },
  parameters: {
    header: 'Controlled',
    description: 'This accordion is controlled by the parent component.',
  },
};

export const WithMultipleSections: Story = {
  render: () => (
    <div className='space-y-4 w-full max-w-md'>
      <Accordion title='First Section'>
        <p>Content for the first section.</p>
      </Accordion>
      <Accordion
        title='Second Section'
        defaultOpen
      >
        <p>Content for the second section.</p>
      </Accordion>
      <Accordion
        title='Third Section with Custom Icon'
        icon={<X className='h-5 w-5 text-gray-500' />}
      >
        <p>This section has a custom info icon.</p>
      </Accordion>
    </div>
  ),
  parameters: {
    header: 'Multiple Sections',
    description: 'This accordion has multiple sections.',
  },
};

export const WithReducedMotion: Story = {
  args: {
    title: 'Reduced Motion',
    children: 'This accordion respects the reduced motion preference.',
  },
  parameters: {
    header: 'Reduced Motion',
    description: 'This accordion respects the reduced motion preference.',
  },
};
