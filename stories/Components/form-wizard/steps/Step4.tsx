'use client';

import React from 'react';
import { FormDatePicker, FormImageUpload } from '@/stories/Components/Input';
import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  birthDate: yup
    .date()
    .required('Birth date is required')
    .typeError('Please select a valid date'),
  avatar: yup.string().required('Please upload an avatar image'),
});

const Step4 = () => {
  return (
    <div className='space-y-8'>
      <FormDatePicker
        name='birthDate'
        label='Your Birth Date'
      />
      <FormImageUpload
        name='avatar'
        label='Upload Your Avatar'
        aspect={1}
      />
    </div>
  );
};

export default Step4;
