'use client';

import React from 'react';
import { FormTextarea } from '@/stories/Components/Input';
import * as yup from 'yup';

export const commentsSchema = yup.object().shape({
  comments: yup.string().optional(),
});

const Step3 = () => {
  return (
    <div className='space-y-6'>
      <FormTextarea
        name='comments'
        label='Additional Comments (Optional)'
        placeholder="Any other information you'd like to share?"
      />
    </div>
  );
};

export default Step3;
