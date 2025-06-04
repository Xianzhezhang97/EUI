/** @format */

// Avatar.stories.tsx
import { EUI } from '@/stories/decorators/EUI';
import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import doc from './Avatar.md';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [EUI],
  parameters: {
    layout: 'centered',
    header: 'The strongest Avatar component',
    // docs: {
    //   description: {
    //     component: doc.toString(),
    //   },
    // },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
      description: 'Size variant of the avatar',
      table: {
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    status: {
      options: ['online', 'offline', 'away', 'busy', undefined],
      control: { type: 'select' },
      description: 'User status indicator',
      table: {
        category: 'Status',
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Add white border around avatar',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    ring: {
      control: 'boolean',
      description: 'Add colored ring around avatar',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    customSize: {
      control: 'text',
      description:
        'Custom size of the avatar use Tailwind, Like h-12 w-12 or w-[25px] h-[25px]',
      table: {
        category: 'Appearance',
      },
    },
    ringColor: {
      control: 'color',
      description: 'Custom color for the ring effect',
      table: {
        defaultValue: { summary: 'ring-primary-500' },
        category: 'Appearance',
      },
    },
    borderColor: {
      control: 'color',
      description: 'Custom color for the border',
      table: {
        defaultValue: { summary: 'border-gray-400' },
        category: 'Appearance',
      },
    },
    name: {
      control: 'text',
      description: 'Name used for initials and alt text',
      table: {
        category: 'Content',
      },
    },
    bgColor: {
      control: 'color',
      description: 'Custom background color',
      table: {
        category: 'Appearance',
      },
      if: {
        arg: 'src',
        truthy: false,
      },
    },
    src: {
      control: 'text',
      description: 'Image source URL',
      table: {
        category: 'Content',
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for image',
      table: {
        category: 'Content',
      },
    },
    message: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
      description: 'Message count to display',
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default avatar without any info will display default icon.',
      },
    },
  },
};
export const WithAutoBackground: Story = {
  args: {
    name: '张贤哲',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default avatar with generated initials and automatic background color based on name.',
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI',
    name: '',
    bordered: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with profile image and optional white border.',
      },
    },
  },
};
export const WithMessage: Story = {
  args: {
    src: 'https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI',
    name: '',
    bordered: false,
    message: 62,
  },

  parameters: {
    docs: {
      description: {
        story: 'Avatar with profile image and optional white border.',
      },
    },
  },
};

export const WithStatus: Story = {
  args: {
    src: 'https://img.picgo.net/2025/03/17/Aesthetic-Attitude0c7ee64b7da66172.png',
    name: 'Scott Cheung',
    bordered: true,
    status: 'online',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with profile image and status indicator.',
      },
    },
  },
};
export const WithRingEffect: Story = {
  args: {
    name: 'Xianzhe Zhang',
    ring: true,
    ringColor: 'ring-blue-500',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with custom colored ring effect for emphasis.',
      },
    },
  },
};

export const DifferentSizeAvatar: Story = {
  render: () => (
    <div className='center gap-16'>
      <Avatar
        name='XS'
        size='sm'
      />
      <Avatar
        name='MD'
        size='md'
      />
      <Avatar
        name='LG'
        size='lg'
      />
      <Avatar
        name='XL'
        size='xl'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size variants from small (sm) to extra large (xl).',
      },
    },
  },
};

export const AvatarWithDifferentMessage: Story = {
  render: () => (
    <div className='center gap-16'>
      <div className='flex flex-col items-center gap-4'>
        <Avatar
          name='Online User'
          message={1}
        />
        <p>Online</p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Avatar message={29} />
        <p>Offline</p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Avatar
          name='Away User'
          status='away'
          message={2}
        />
        <p>Away</p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Avatar
          name='Busy User'
          status='busy'
          message={125}
        />
        <p>Busy</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various status indicator styles for different user states.',
      },
    },
  },
};

export const AvatarWithDifferentStatuses: Story = {
  render: () => (
    <div className='center gap-16'>
      <div className='flex flex-col items-center gap-4'>
        <Avatar
          name='Online User'
          src='https://media.licdn.com/dms/image/v2/D5603AQECYxBqcxprfg/profile-displayphoto-shrink_400_400/B56ZaMQ34xHsAs-/0/1746109957382?e=1753315200&v=beta&t=X6tvS6aIbFJSt-15Daub1EVkCOS18ijYkCIjj6nZ5XI'
          status='online'
        />
        <p>Online</p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Avatar
          name='Offline User'
          src=' https://img.picgo.net/2024/12/06/avatar16e4aacd08d86884.jpg'
          status='offline'
        />
        <p>Offline</p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Avatar
          name='Away User'
          src='https://img.picgo.net/2025/03/17/Aesthetic-Attitude0c7ee64b7da66172.png'
          status='away'
        />
        <p>Away</p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Avatar
          name='Busy User'
          src='https://img.picgo.net/2025/03/17/Learning-Ability760866a761496ab2.png'
          status='busy'
        />
        <p>Busy</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various status indicator styles for different user states.',
      },
    },
  },
};
