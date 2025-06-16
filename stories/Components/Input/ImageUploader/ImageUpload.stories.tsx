import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactElement, useEffect } from 'react';

import { FormImageUpload } from './ImageUpload';
import { Button } from '../../ui/button';

const meta: Meta<typeof FormImageUpload> = {
  title: 'Input/ImageUpload',
  component: FormImageUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: false,
      description: 'The name of the field, used by react-hook-form.',
    },
    label: {
      control: 'text',
      description: 'The label displayed above the upload component.',
    },
    aspect: {
      control: 'number',
      description:
        'The aspect ratio for cropping (e.g., 1 for square, 16/9 for widescreen). Pass `undefined` for freeform cropping.',
    },
    maxShortSide: {
      control: 'number',
      description:
        'The maximum pixel dimension for the shorter side of an uploaded image. Images larger than this are automatically compressed before cropping.',
    },
    previewMaxWidth: {
      control: 'text',
      description:
        'The CSS `max-width` for the image preview box (e.g., "150px").',
    },
    maxFileSize: {
      control: 'number',
      description:
        'Used only to display a recommendation message (e.g., "up to 5MB"). It no longer performs hard validation; large files are compressed instead of rejected.',
    },
    recommendations: {
      control: 'object',
      description: 'An array of strings to display as usage recommendations.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to provide react-hook-form context to stories
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
    console.log('Form Submitted Data:', data);
    alert('Form submitted successfully! Check the browser console for data.');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='space-y-4 w-96 flex flex-col items-center'
      >
        <div className='w-full'>{children}</div>
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
};

// Base validation schema used across stories
const baseSchema = (fieldName: string) =>
  yup.object().shape({
    [fieldName]: yup
      .mixed<File | string>()
      .required('An image is required for this field.')
      .test(
        'is-file-or-string',
        'A valid image file or URL is required.',
        (value) => {
          // .required() already handles null/undefined/empty strings.
          // This test ensures that if a value exists, it's of the correct type.
          if (!value) return true;
          return value instanceof File || typeof value === 'string';
        },
      ),
  });

/**
 * The default configuration, ideal for a user avatar.
 * It enforces a 1:1 aspect ratio for a square image.
 */
export const Default: Story = {
  name: 'Default (Avatar)',
  args: {
    name: 'avatar',
    label: 'User Avatar',
    aspect: 1,
    previewMaxWidth: "300px",
    recommendations: ['A square aspect ratio (1:1) is recommended.'],
    maxShortSide: 300,
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={baseSchema('avatar')}
        defaultValues={{ avatar: '' }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

/**
 * This story demonstrates the component's full power.
 * It's configured for a 16:9 widescreen cover photo and will automatically compress
 * large images so their shorter side does not exceed 1080px.
 */
export const CoverPhoto: Story = {
  name: 'Cover Photo (With Compression)',
  args: {
    name: 'coverImage',
    label: 'Article Cover Photo',
    aspect: 16 / 9,
    previewMaxWidth: "400px",
    maxShortSide: 1080,
    recommendations: [
      'Aspect Ratio: 16:9.',
      'Images will be compressed to max 1080px on their shorter side.',
    ],
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={baseSchema('coverImage')}
        defaultValues={{ coverImage: '' }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

/**
 * This demonstrates how the component behaves in an "edit" form scenario where an image URL is already present.
 * The component loads the initial image, and the user can click on it to upload a new one.
 */
export const WithInitialValue: Story = {
  name: 'With Initial Value (Edit Mode)',
  args: {
    name: 'profilePic',
    label: 'Profile Picture',
    aspect: 1,
    previewMaxWidth: '150px',
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={baseSchema('profilePic')}
        defaultValues={{
          profilePic:
            'https://img.picgo.net/2024/12/06/profile26fe37ccfe6ad6d7.png',
        }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

/**
 * By setting `aspect` to `undefined`, the cropping tool becomes freeform, allowing the user to select any aspect ratio they wish.
 */
export const FreeformCrop: Story = {
  name: 'Freeform Crop',
  args: {
    name: 'freeformImage',
    label: 'Upload Any Shape',
    aspect: 1.5,
    previewMaxWidth: "500px",
    recommendations: ['You can select any crop aspect ratio you like.'],
  },
  decorators: [
    (Story) => (
      <StoryFormProvider
        schema={baseSchema('freeformImage')}
        defaultValues={{ freeformImage: '' }}
      >
        <Story />
      </StoryFormProvider>
    ),
  ],
};

/**
 * This story shows how the validation error appears when the field is required but left empty.
 * The error is triggered on load for demonstration purposes.
 */
export const ValidationError: Story = {
  name: 'With Validation Error',
  args: {
    ...Default.args,
    name: 'errorAvatar',
    label: 'Upload (Required)',
  },
  decorators: [
    (Story) => {
      const methods = useForm({
        resolver: yupResolver(baseSchema('errorAvatar')),
        mode: 'onTouched',
        defaultValues: { errorAvatar: '' },
      });

      // Trigger validation on mount to show the error state
      useEffect(() => {
        methods.trigger('errorAvatar');
      }, [methods]);

      return (
        <FormProvider {...methods}>
          <form className='space-y-4 w-96 flex flex-col items-center'>
            <div className='w-full'>
              <Story />
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </FormProvider>
      );
    },
  ],
};
