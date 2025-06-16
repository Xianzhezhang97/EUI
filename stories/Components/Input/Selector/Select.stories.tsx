import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormSelect } from './Select';
import { Button } from '@/stories/Components/Button/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactElement, useEffect } from 'react';
import { Briefcase } from 'lucide-react';

const meta: Meta<typeof FormSelect> = {
  title: 'Input/Select',
  component: FormSelect,
  tags: ['autodocs'],
  argTypes: {
    name: { control: { disable: true } },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isSearchable: { control: 'boolean' },
    isMulti: { control: 'boolean' },
    maxSelections: { control: 'number' },
    isCreatable: { control: 'boolean' },
    icon: { control: { disable: true } },
  },
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
  { label: 'Product', value: 'prod' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Finance', value: 'finance' },
  { label: 'Legal', value: 'legal' },
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
    mode: 'onTouched',
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

const singleSelectSchema = yup.object().shape({
  department: yup.string().required('Please select a department.'),
});

export const Default: Story = {
  args: {
    name: 'department',
    label: 'Department',
    placeholder: 'Select your department',
    icon: <Briefcase />,
    options: sampleOptions,
    isSearchable: true,
    isMulti: false,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider schema={singleSelectSchema}>
        <Story />
      </StoryFormProvider>
    ),
  ],
};

const multiSelectSchema = yup.object().shape({
  departments: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Please select at least one department.'),
});

export const MultiSelect: Story = {
  args: {
    name: 'departments',
    label: 'Departments',
    placeholder: 'Select your departments',
    options: sampleOptions,
    isSearchable: true,
    isMulti: true,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={multiSelectSchema}
        defaultValues={{ departments: ['eng'] }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

const multiSelectLimitSchema = yup.object().shape({
  departments: yup
    .array()
    .of(yup.string().required())
    .min(2, 'Please select at least 2 departments.')
    .max(3, 'You can select a maximum of 3 departments.'),
});

export const MultiSelectWithLimits: Story = {
  args: {
    ...MultiSelect.args,
    label: 'Select 2 to 3 Departments',
    maxSelections: 3,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={multiSelectLimitSchema}
        defaultValues={{ departments: ['eng'] }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

const creatableSchema = yup.object().shape({
  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Please add at least one tag.'),
});

export const Creatable: Story = {
  args: {
    name: 'tags',
    label: 'Tags',
    placeholder: 'Add tags...',
    options: sampleOptions.slice(0, 3),
    isSearchable: true,
    isMulti: true,
    isCreatable: true,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={creatableSchema}
        defaultValues={{ tags: ['eng'] }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};
