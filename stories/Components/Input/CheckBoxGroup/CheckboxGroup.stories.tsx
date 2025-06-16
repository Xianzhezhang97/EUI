import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormCheckboxGroup } from '@/stories/Components/Input/CheckBoxGroup/CheckboxGroup';
import { Button } from '@/stories/Components/Button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactElement, useEffect } from 'react';
import { Briefcase, Code, BarChart } from 'lucide-react';

const meta: Meta<typeof FormCheckboxGroup> = {
  title: 'Input/CheckboxGroup',
  component: FormCheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { label: 'Engineering', value: 'eng' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'mktg' },
];

const sampleOptionsWithIcons = [
  { label: 'Engineering', value: 'eng', icon: <Code /> },
  { label: 'Design', value: 'design', icon: <Briefcase /> },
  { label: 'Marketing', value: 'mktg', icon: <BarChart /> },
];

const StoryFormProvider = ({
  children,
  schema,
  defaultValues = {},
}: {
  children: ReactElement;
  schema: any;
  defaultValues?: Record<string, any>;
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='space-y-4 w-96'
      >
        {children}
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
};

const defaultSchema = yup.object().shape({
  interests: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Please select at least one interest.'),
});

export const Default: Story = {
  args: {
    name: 'interests',
    label: 'Select Your Interests',
    options: sampleOptions,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={defaultSchema}
        defaultValues={{ interests: [] }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

export const WithIcons: Story = {
  args: {
    ...Default.args,
    label: 'Select Your Department',
    options: sampleOptionsWithIcons,
  },
  decorators: [...(Default.decorators as any)],
};

export const Preselected: Story = {
  args: {
    ...WithIcons.args,
    label: 'Your Pre-selected Departments',
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={defaultSchema}
        defaultValues={{ interests: ['eng', 'mktg'] }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

const requiredSchema = yup.object().shape({
  departments: yup
    .array()
    .of(yup.string().required())
    .min(2, 'Please select at least two departments.')
    .required('This field is required.'),
});

export const WithError: Story = {
  args: {
    name: 'departments',
    label: 'Select at least two departments',
    options: sampleOptionsWithIcons,
  },
  decorators: [
    (Story, context) => {
      const methods = useForm({
        resolver: yupResolver(requiredSchema),
        mode: 'onTouched',
        defaultValues: { departments: ['design'] }, // Start with one to show error for min(2)
      });

      useEffect(() => {
        methods.trigger('departments');
      }, [methods]);

      return (
        <FormProvider {...methods}>
          <form className='space-y-4 w-96'>
            <Story {...context.args} />
          </form>
        </FormProvider>
      );
    },
  ],
};
