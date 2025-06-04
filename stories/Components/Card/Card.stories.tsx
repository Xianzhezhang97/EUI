/** @format */

import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { EUI } from '@/stories/decorators/EUI';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [EUI],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    imageMaxHeight: { control: 'text' },
    imageMaxWidth: { control: 'text' },
    imagePosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    imageRatio: {
      control: 'radio',
      options: [
        '1/1',
        '2/1',
        '4/3',
        '16/9',
        '21/9',
        '21/9',
        '9/16',
        '3/4',
        '1/2',
      ],
    },
    width: { control: 'text' },
    maxWidth: { control: 'text' },
    minWidth: { control: 'text' },
    height: { control: 'text' },
    maxHeight: { control: 'text' },
    minHeight: { control: 'text' },
    children: { control: 'text' },
    className: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

const DefaultCardContent = (
  <>
    <p>
      This is the card content developed by Scott Cheung. Here is Child Prop
      Area. Here is Child Prop Area. Here is Child Prop Area. Here is Child Prop
      Area. Here is Child Prop Area. Here is Child Prop Area. Here is Child Prop
      Area. Here is Child Prop Area.
    </p>
  </>
);

export const Primary: Story = {
  args: {
    variant: 'primary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',
    children: DefaultCardContent,
    className: 'flex flex-col ',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',
    children: DefaultCardContent,
    className: 'flex flex-col ',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',
    children: DefaultCardContent,
    className: 'flex flex-col ',
  },
};

export const PrimaryWithImageTop: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
    variant: 'primary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',
    alt: 'image',
    imagePosition: 'top',
    imageRatio: '21/9',
    children: <>{DefaultCardContent}</>,
  },
};

export const PrimaryWithImageBottom: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
    variant: 'primary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    size: 'lg',
    height: '100%',
    alt: 'image',
    imagePosition: 'bottom',
    imageRatio: '2/1',
    children: <>{DefaultCardContent}</>,
  },
};

export const PrimaryWithImageLeft: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
    variant: 'primary',
    width: '100%',
    height: '100%',
    size: 'lg',
    alt: 'image',
    imagePosition: 'left',
    imageRatio: '1/1',
    children: <>{DefaultCardContent}</>,
  },
};

export const PrimaryWithImageRight: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
    variant: 'primary',
    imageMaxHeight: '200px',
    imageMaxWidth: '200px',
    width: '100%',
    height: '100%',
    size: 'lg',
    alt: 'image',
    imagePosition: 'right',
    imageRatio: '1/1',
    children: <>{DefaultCardContent}</>,
  },
};

export const Smallsize: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',
    children: DefaultCardContent,
    className: 'flex flex-col ',
  },
};
export const Mediumsize: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',
    children: DefaultCardContent,
    className: 'flex flex-col ',
  },
};

export const Largesize: Story = {
  args: {
    size: 'lg',
    variant: 'primary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',
    children: DefaultCardContent,
    className: 'flex flex-col ',
  },
};

export const WithImage: Story = {
  args: {
    size: 'lg',
    variant: 'primary',
    width: '100%',
    maxWidth: '320px',
    minWidth: '220px',
    height: '100%',

    className: 'flex flex-col',
    children: (
      <>
        <img
          src='https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80'
          alt='Card cover'
          className='h-48 w-full object-cover md:rounded-md '
        />
        <div className='mt-lg'>{DefaultCardContent}</div>
      </>
    ),
  },
};
