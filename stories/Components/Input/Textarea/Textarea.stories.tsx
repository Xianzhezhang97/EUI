import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormTextarea } from './Textarea';
import { Button } from '@/stories/Components/Button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactElement } from 'react';

const meta: Meta<typeof FormTextarea> = {
  title: 'Input/Textarea',
  component: FormTextarea,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FormTextarea>;

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
      bio: '',
      invalidBio: 'Too short',
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
  bio: yup
    .string()
    .required('Bio is required')
    .min(10, 'Bio must be at least 10 characters'),
});

const errorSchema = yup.object().shape({
  invalidBio: yup
    .string()
    .required()
    .min(20, 'Bio must be at least 20 characters'),
});

export const Default: Story = {
  args: {
    name: 'bio',
    label: 'Your Biography',
    placeholder: 'Tell us something about yourself...',
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

export const WithError: Story = {
  args: {
    name: 'invalidBio',
    label: 'Field with Error',
    placeholder: 'This will have an error',
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        resolver: yupResolver(errorSchema),
        mode: 'onChange',
        defaultValues: {
          invalidBio: 'Too short',
        },
      });

      return (
        <FormProvider {...methods}>
          <form className='space-y-4 w-80'>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    name: 'bio',
    label: 'Disabled Textarea',
    placeholder: 'You cannot edit this',
    disabled: true,
    defaultValue: 'Some pre-filled text that cannot be changed.',
  },
  decorators: [
    (Story) => (
      <StoryFormProvider schema={defaultSchema}>
        <Story />
      </StoryFormProvider>
    ),
  ],
};
