'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/utils/cn';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

export interface FormDatePickerProps {
  name: string;
  label: string;
  className?: string;
}

export function FormDatePicker({
  name,
  label,
  className,
}: FormDatePickerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className={cn('w-full', className)}>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-700 mb-1'
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground',
                  error ? 'border-red-500' : 'border-gray-300',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {field.value ? (
                  format(new Date(field.value), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <DayPicker
                mode='single'
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
}
