'use client';

import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

type CheckboxOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export interface FormCheckboxGroupProps {
  name: string;
  label: string;
  options: CheckboxOption[];
  className?: string;
}

export const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  name,
  label,
  options,
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={cn('w-full', className)}>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {options.map((option) => {
              const isSelected = field.value?.includes(option.value);

              return (
                <div
                  key={option.value}
                  onClick={() => {
                    const newValue = isSelected
                      ? field.value.filter((v: string) => v !== option.value)
                      : [...(field.value || []), option.value];
                    field.onChange(newValue);
                  }}
                  className={cn(
                    'relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200',
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 bg-white hover:border-primary-400',
                    error ? 'border-red-500' : '',
                  )}
                >
                  {isSelected && (
                    <div className='absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1'>
                      <Check className='w-3 h-3' />
                    </div>
                  )}
                  {option.icon && (
                    <div
                      className={cn(
                        'mb-2',
                        isSelected ? 'text-primary-600' : 'text-gray-500',
                      )}
                    >
                      {React.cloneElement(option.icon as React.ReactElement, {
                        className: 'w-8 h-8',
                      })}
                    </div>
                  )}
                  <span
                    className={cn(
                      'font-medium text-center',
                      isSelected ? 'text-primary-700' : 'text-gray-800',
                    )}
                  >
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      />
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
};
