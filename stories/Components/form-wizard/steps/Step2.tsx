'use client';

import React from 'react';
import { FormSelect, FormCheckboxGroup } from '@/stories/Components/Input';
import { Briefcase, Code, Brush, Megaphone } from 'lucide-react';
import * as yup from 'yup';

export const accountDetailsSchema = yup.object().shape({
  department: yup.string().required('Please select a department'),
  interests: yup.array().min(1, 'Select at least one interest').required(),
});

const departmentOptions = [
  { label: 'Engineering', value: 'eng' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'mktg' },
  { label: 'Product', value: 'prod' },
];

const interestOptions = [
  { label: 'Frontend', value: 'frontend', icon: <Code /> },
  { label: 'UI/UX', value: 'uiux', icon: <Brush /> },
  { label: 'SEO', value: 'seo', icon: <Megaphone /> },
];

const Step2 = () => {
  return (
    <div className='space-y-8'>
      <FormSelect
        name='department'
        label='Department'
        placeholder='Select your department'
        options={departmentOptions}
        icon={<Briefcase />}
        // required
      />
      <FormCheckboxGroup
        name='interests'
        label='What are your interests?'
        options={interestOptions}
      />
    </div>
  );
};

export default Step2;
