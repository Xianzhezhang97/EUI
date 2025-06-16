'use client';

import React from 'react';
import { FormInput } from '@/stories/Components/Input';
import { User, Mail } from 'lucide-react';
import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

const Step1 = () => {
  return (
    <div className='space-y-6'>
      <FormInput
        name='fullName'
        label='Full Name'
        placeholder='Your full name'
        icon={<User />}
        required
      />
      <FormInput
        name='email'
        label='Email Address'
        type='email'
        placeholder='your@email.com'
        icon={<Mail />}
        required
      />
    </div>
  );
};

export default Step1;
