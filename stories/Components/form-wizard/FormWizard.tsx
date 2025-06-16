'use client';

import React, { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/stories/Components/Button/Button';
import { ProgressBar } from '../Progress/ProgressBar';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormWizardProps {
  steps: {
    title: string;
    component: React.ComponentType<any>;
    validationSchema: yup.ObjectSchema<any>;
  }[];
  onSubmit: (data: any) => void;
  title: string;
}

export const FormWizard: React.FC<FormWizardProps> = ({
  steps,
  onSubmit,
  title,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const mergedSchema = useMemo(() => {
    return steps.reduce(
      (schema, step) => schema.concat(step.validationSchema),
      yup.object(),
    );
  }, [steps]);

  const methods = useForm({
    resolver: yupResolver(mergedSchema),
    mode: 'onBlur',
  });

  const { trigger, handleSubmit } = methods;
  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = async () => {
    const fieldsToValidate = Object.keys(
      steps[currentStep].validationSchema.fields,
    );
    const isValid = await trigger(fieldsToValidate as [any]);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === steps.length - 1;

  const onFinalSubmit = async (data: any) => {
    event?.preventDefault();
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        layout
        onSubmit={handleSubmit(onFinalSubmit)}
        className='card-xl bg-white max-w-2xl mx-auto relative'
      >
        <h2 className='text-2xl font-bold mb-2'>{title}</h2>
        <ProgressBar
          value={currentStep + 1}
          max={steps.length}
          size='lg'
          label={`${steps[currentStep].title} ( Step ${currentStep + 1} of ${
            steps.length
          })`}
          color='success'
          className='w-full text-gray-600 mb-6'
          showValue
        />

        <div className='mb-8 min-h-[250px]'>
          <CurrentStepComponent />
        </div>

        <div className='flex justify-between mt-8 gap-4'>
          <Button
            type='button'
            variant='secondary'
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          {isLastStep ? (
            <Button
              type='submit'
              variant='full'
            >
              Submit
            </Button>
          ) : (
            <Button
              type='button'
              variant='full'
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </motion.form>
    </FormProvider>
  );
};
