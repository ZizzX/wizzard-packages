import { z } from 'zod';
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { createWizardFactory } from '@wizzard-packages/vue';

export interface WizardSchema {
  user: {
    name: string;
    email: string;
  };
  details: {
    age: number;
    bio: string;
  };
}

export type StepId = 'personal' | 'details' | 'review';

export const wizardFactory = createWizardFactory<WizardSchema, StepId>();

export const wizardConfig = {
  steps: [
    {
      id: 'personal' as const,
      label: 'Personal Information',
      validationAdapter: new ZodAdapter(
        z.object({
          user: z.object({
            name: z.string().min(2, 'Name too short'),
            email: z.string().email('Invalid email'),
          }),
        })
      ),
    },
    {
      id: 'details' as const,
      label: 'Additional Details',
      validationAdapter: new ZodAdapter(
        z.object({
          details: z.object({
            age: z.number().min(18, 'Must be at least 18'),
            bio: z.string().min(10, 'Bio too short'),
          }),
        })
      ),
    },
    {
      id: 'review' as const,
      label: 'Review & Submit',
    },
  ],
  navigationMode: 'visited' as const,
};

export const initialData: WizardSchema = {
  user: { name: '', email: '' },
  details: { age: 0, bio: '' },
};
