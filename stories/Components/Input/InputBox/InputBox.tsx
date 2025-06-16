'use client';

import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SVGAnimation } from '../../SVGanimation/StatusSVG';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon?: React.ReactNode;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type = 'text', name, label, icon, ...props }, ref) => {
    const {
      control,
      formState: { errors, touchedFields },
      watch,
    } = useFormContext();
    const [isFocused, setIsFocused] = React.useState(false);

    const error = errors[name];
    const value = watch(name);
    const isTouched = touchedFields[name];

    const showValidationIcon = isTouched && !isFocused;
    const isValid = !error && value;

    return (
      <div className='relative w-full group'>
        <label
          htmlFor={name}
          className='block text-base font-medium text-gray-700 mb-4'
        >
          {label}
        </label>
        <div className='relative rounded-md shadow-sm'>
          {icon && (
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              {React.cloneElement(icon as React.ReactElement, {
                className:
                  'h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-primary-500 group-focus-within:scale-[1.2]',
              })}
            </div>
          )}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                {...props}
                id={name}
                type={type}
                ref={ref}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  field.onBlur();
                  setIsFocused(false);
                }}
                className={cn(
                  'block w-full h-12 rounded-md bg-gray-50 border-2 transition-all duration-300 outline-none focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
                  icon ? 'pl-10' : 'pl-4',
                  showValidationIcon && error
                    ? 'border-red-500'
                    : showValidationIcon && isValid
                    ? 'border-success-500'
                    : 'border-gray-300',
                  className,
                )}
              />
            )}
          />
          <AnimatePresence>
            {showValidationIcon &&
              (error ? (
                <motion.div
                  key='error'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'
                >
                  <AlertCircle className='h-5 w-5 text-red-500' />
                </motion.div>
              ) : isValid ? (
                <motion.div
                  key='success'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'
                >
                  <CheckCircle className='h-5 w-5 text-success-500' />
                  {/* <SVGAnimation
                    icon='success'
                    message='Payment Successful!'
                    withMessage
                  /> */}
                </motion.div>
              ) : null)}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='mt-2 text-sm text-red-600 overflow-hidden'
              id={`${name}-error`}
            >
              {error.message?.toString()}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export { FormInput };
