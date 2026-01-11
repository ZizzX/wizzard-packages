import { z } from 'zod';
import { createWizardFactory } from '@wizzard-packages/react';
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { LocalStorageAdapter, MemoryAdapter } from '@wizzard-packages/persistence';

// 1. Schema
const demoSchema = z.object({
  personal: z.object({
    firstName: z.string().min(2, 'Name is too short'),
    lastName: z.string().min(2),
    email: z.string().email(),
  }),
  security: z
    .object({
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    newsletter: z.boolean(),
  }),
});

export type DemoData = z.infer<typeof demoSchema>;

// 2. Factory
export const {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardValue,
  useWizardError,
  createStep,
} = createWizardFactory<DemoData>();

// 3. Adapters
const personalAdapter = new ZodAdapter(demoSchema.pick({ personal: true }));
const securityAdapter = new ZodAdapter(demoSchema.pick({ security: true }));
const memoryStore = new MemoryAdapter(); // Explicit RAM store
const localStore = new LocalStorageAdapter('adv_demo_');

// 4. Config
export const advancedConfig = {
  persistence: {
    adapter: localStore, // Default: LocalStorage
    mode: 'onChange' as const,
  },
  onStepChange: (from: string | null, to: string, data: DemoData) => {
    console.log(`[Routing] Navigating from ${from} to ${to}`, data);
  },
  steps: [
    {
      id: 'personal',
      label: 'Identity',
      validationAdapter: personalAdapter,
      beforeLeave: async (_data: DemoData, direction: string) => {
        if (direction === 'next') {
          console.log('[Guard] Checking before leaving Personal step...');
          await new Promise((r) => setTimeout(r, 800)); // Simulate async check
        }
        return true;
      },
    },
    {
      id: 'security',
      label: 'Security (RAM)',
      validationAdapter: securityAdapter,
      persistenceAdapter: memoryStore, // Override: Keep secrets in RAM only!
      condition: async (data: DemoData) => {
        // Simulate async permission check
        await new Promise((r) => setTimeout(r, 1000));
        return data.personal.email.includes('@'); // Only show security if email is valid-ish
      },
    },
    {
      id: 'preferences',
      label: 'Preferences',
      condition: async (data: DemoData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return !!data.personal?.email;
      },
      // No validation
    },
    {
      id: 'complete',
      label: 'Done',
    },
  ],
};
