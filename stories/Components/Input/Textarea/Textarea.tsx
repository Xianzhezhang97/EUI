'use client';

import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { AlertCircle, HandHelping } from 'lucide-react';
import { divide } from 'lodash';

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, name, label, ...props }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const error = errors[name];

    return (
      <div className='relative w-full space-y-4'>
        <label
          htmlFor={name}
          className='block text-base font-medium text-gray-700 '
        >
          {label}
        </label>
        <div className='relative'>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <textarea
                  {...field}
                  {...props}
                  id={name}
                  ref={ref}
                  rows={4}
                  className={cn(
                    'block w-full  rounded-md card-lg bg-gray-100  shadow-sm outline-none  border-2  focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-10',
                    error ? 'border-red-500' : 'border-gray-50/0',
                    className,
                  )}
                />
              </div>
            )}
          />
          {error && (
            <div className='pointer-events-none absolute top-3 right-0 flex items-center pr-3'>
              <AlertCircle className='h-5 w-5 text-red-500' />
            </div>
          )}
        </div>
        {error && (
          <p
            className='mt-2 text-sm text-red-600'
            id={`${name}-error`}
          >
            {error.message?.toString()}
          </p>
        )}
      </div>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';

export { FormTextarea };
