import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormDatePicker } from '@/stories/Components/Input/DataPicker/DatePicker';
import { Button } from '@/stories/Components/Button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactElement } from 'react';

const meta: Meta<typeof FormDatePicker> = {
  title: 'Input/DatePicker',
  component: FormDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FormDatePicker>;

const StoryFormProvider = ({
  children,
  schema,
  defaultValues,
}: {
  children: ReactElement;
  schema: any;
  defaultValues?: any;
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      birthDate: null,
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

const schema = yup.object().shape({
  birthDate: yup
    .date()
    .required('Birth date is required')
    .typeError('Please enter a valid date'),
});

export const Default: Story = {
  args: {
    name: 'birthDate',
    label: 'Birth Date',
  },
  decorators: [
    (Story) => (
      <StoryFormProvider schema={schema}>
        <Story />
      </StoryFormProvider>
    ),
  ],
};

export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={schema}
        defaultValues={{ birthDate: new Date('1990-05-15') }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

export const WithError: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: { birthDate: new Date('invalid date') },
      });

      methods.trigger('birthDate');

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
