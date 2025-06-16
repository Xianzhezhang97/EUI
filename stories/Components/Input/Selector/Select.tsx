'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { AlertCircle, Check, ChevronDown, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type SelectOption = {
  label: string;
  value: string;
};

export interface FormSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  placeholder?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  maxSelections?: number;
  isCreatable?: boolean;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  icon,
  placeholder = 'Select an option',
  isSearchable = false,
  isMulti = false,
  maxSelections,
  isCreatable = false,
  className,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [internalOptions, setInternalOptions] =
    React.useState<SelectOption[]>(options);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setInternalOptions(options);
  }, [options]);

  const selectedValue = watch(name);
  const error = errors[name];

  const handleSelect = (option: SelectOption) => {
    if (isMulti) {
      const currentValues: string[] = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      const isSelected = currentValues.includes(option.value);

      let newValue: string[];
      if (isSelected) {
        newValue = currentValues.filter((v) => v !== option.value);
      } else {
        if (maxSelections && currentValues.length >= maxSelections) {
          return;
        }
        newValue = [...currentValues, option.value];
      }
      setValue(name, newValue, { shouldValidate: true });
    } else {
      setValue(name, option.value, { shouldValidate: true });
      setIsOpen(false);
    }
    setSearchTerm('');
  };

  const handleCreateAndSelect = () => {
    if (!isCreatable || !searchTerm) return;

    const newOption: SelectOption = {
      label: searchTerm,
      value: searchTerm.toLowerCase().replace(/\s+/g, '-'), // Create a simple value
    };

    if (!internalOptions.some((o) => o.value === newOption.value)) {
      setInternalOptions((prev) => [...prev, newOption]);
    }

    handleSelect(newOption);
  };

  const handleDeselect = (e: React.MouseEvent, valueToDeselect: string) => {
    e.stopPropagation();
    if (isMulti) {
      const currentValues: string[] = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      const newValue = currentValues.filter((v) => v !== valueToDeselect);
      setValue(name, newValue, { shouldValidate: true });
    }
  };

  const selectedOptions = React.useMemo(() => {
    if (isMulti) {
      const currentValues: string[] = Array.isArray(selectedValue)
        ? selectedValue
        : [];
      return internalOptions.filter((opt) => currentValues.includes(opt.value));
    }
    return internalOptions.find((option) => option.value === selectedValue);
  }, [internalOptions, selectedValue, isMulti]);

  const filteredOptions = React.useMemo(
    () =>
      internalOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [internalOptions, searchTerm],
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayValue = isMulti
    ? (selectedOptions as SelectOption[]) || []
    : (selectedOptions as SelectOption | undefined);

  return (
    <div
      ref={selectRef}
      className={cn('relative w-full', className)}
    >
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-700 mb-1'
      >
        {label}
      </label>
      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'relative w-full min-h-[3rem] flex items-center rounded-md bg-gray-50 border-2 transition-all duration-300 outline-none focus:border-primary-500 sm:text-sm text-left',
            icon ? 'pl-10' : 'pl-4',
            'pr-10 py-2',
            error ? 'border-red-500' : 'border-gray-300',
          )}
        >
          {icon && (
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              {React.cloneElement(icon as React.ReactElement, {
                className: 'h-5 w-5 text-gray-400',
              })}
            </div>
          )}
          <div className='flex flex-wrap gap-2 flex-1'>
            {isMulti &&
            Array.isArray(displayValue) &&
            displayValue.length > 0 ? (
              displayValue.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={(e) => handleDeselect(e, option.value)}
                  className='bg-primary-100 text-primary-700 text-sm font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5'
                >
                  {option.label}
                  <div className='text-primary-500 hover:text-primary-700 focus:outline-none'>
                    <X className='h-3.5 w-3.5' />
                  </div>
                </button>
              ))
            ) : !isMulti && displayValue ? (
              <span className='text-gray-900'>
                {(displayValue as SelectOption).label}
              </span>
            ) : (
              <span className='text-gray-400'>{placeholder}</span>
            )}
          </div>
        </button>

        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          {error ? (
            <AlertCircle className='h-5 w-5 text-red-500' />
          ) : (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className='h-5 w-5 text-gray-400' />
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200'
          >
            {isSearchable && (
              <div className='relative p-2'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full h-10 pl-8 pr-4 rounded-md bg-gray-100 border-transparent  transition-all duration-500 outline-none focus:border-primary-500 focus:border-2'
                />
              </div>
            )}
            <ul className='max-h-60 overflow-auto py-1'>
              {filteredOptions.length > 0
                ? filteredOptions.map((option) => {
                    const isSelected = isMulti
                      ? Array.isArray(selectedValue) &&
                        selectedValue.includes(option.value)
                      : selectedValue === option.value;
                    return (
                      <li
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className='relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-gray-100'
                      >
                        <span
                          className={cn(
                            'block truncate',
                            isSelected ? 'font-semibold' : 'font-normal',
                          )}
                        >
                          {option.label}
                        </span>
                        {isSelected && (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600'>
                            <Check className='h-5 w-5' />
                          </span>
                        )}
                      </li>
                    );
                  })
                : isCreatable &&
                  searchTerm && (
                    <li
                      key='creatable'
                      onClick={handleCreateAndSelect}
                      className='relative cursor-pointer select-none py-2 px-4 text-gray-900 hover:bg-gray-100'
                    >
                      Create "<strong>{searchTerm}</strong>"
                    </li>
                  )}
              {!filteredOptions.length && (
                <li className='relative cursor-default select-none py-2 px-4 text-gray-500'>
                  No options found.
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <p
          className='mt-2 text-sm text-red-600'
          id={`${name}-error`}
        >
          {typeof error.message === 'string' && error.message}
        </p>
      )}
    </div>
  );
};
