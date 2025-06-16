'use client';

import { FormWizard } from '@/stories/Components/form-wizard/FormWizard';
import Step1, {
  personalInfoSchema,
} from '@/stories/Components/form-wizard/steps/Step1';
import Step2, {
  accountDetailsSchema,
} from '@/stories/Components/form-wizard/steps/Step2';
import Step3, {
  commentsSchema,
} from '@/stories/Components/form-wizard/steps/Step3';
import Step4, {
  profileSchema,
} from '@/stories/Components/form-wizard/steps/Step4';

const steps = [
  {
    title: 'Personal Information',
    component: Step1,
    validationSchema: personalInfoSchema,
  },
  {
    title: 'Account Details',
    component: Step2,
    validationSchema: accountDetailsSchema,
  },
  {
    title: 'Final Comments',
    component: Step3,
    validationSchema: commentsSchema,
  },
  {
    title: 'Profile Picture',
    component: Step4,
    validationSchema: profileSchema,
  },
];

export default function Home() {
  const handleFormSubmit = (data: any) => {
    // In a real app, you would send this data to a server.
    console.log('Final form data submitted:', data);
    alert(
      'Form submitted successfully! Check the console to see the collected data.',
    );
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-8'>
      <div className='w-full max-w-2xl'>
        <FormWizard
          title='New Account Registration'
          steps={steps}
          onSubmit={handleFormSubmit}
        />
      </div>
    </main>
  );
}
