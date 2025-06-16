import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from './InputBox';
import { Mail } from 'lucide-react';
import { Button } from '@/stories/Components/Button/Button'; // Assuming a button component exists
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactElement } from 'react';

const meta: Meta<typeof FormInput> = {
  title: 'Input/InputBox',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FormInput>;

// Mock Form provider for stories
const StoryFormProvider = ({
  children,
  schema,
}: {
  children: ReactElement;
  schema: any;
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      testInput: '',
      errorInput: 'invalid value',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='space-y-4 w-80'
      >
        {children}
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
};

const defaultSchema = yup.object().shape({
  testInput: yup.string().required('This field is required'),
});

const emailSchema = yup.object().shape({
  testInput: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
});

const errorSchema = yup.object().shape({
  errorInput: yup.string().min(20, 'This value is too short!'),
});

export const Default: Story = {
  args: {
    name: 'testInput',
    label: 'Your Name',
    placeholder: 'Scott Cheung',
    required: true,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider schema={defaultSchema}>
        <Story />
      </StoryFormProvider>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    name: 'testInput',
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    icon: <Mail />,
    required: true,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider schema={emailSchema}>
        <Story />
      </StoryFormProvider>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    name: 'testInput',
    label: 'Disabled Input',
    placeholder: 'You cannot edit this',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider schema={defaultSchema}>
        <Story />
      </StoryFormProvider>
    ),
  ],
};
