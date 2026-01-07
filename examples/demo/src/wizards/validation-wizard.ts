import { z } from "zod";
import { ZodAdapter, createWizardFactory } from "wizzard-stepper-react"; // Using local source

// Schemas
export const PersonalInfoSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 chars").max(50),
  email: z.string().email("Invalid email address"),
});

export const AccountInfoSchema = z.object({
  username: z.string().min(4, "Username must be 4+ chars"),
  password: z.string().min(6, "Password must be 6+ chars"),
});

export type ValidationWizardSchema = {
  personal: z.infer<typeof PersonalInfoSchema>;
  account: z.infer<typeof AccountInfoSchema>;
  review: Record<string, never>;
}

type TStep = 'personal' | 'account' | 'review';

// Create Typed Factory
export const {
  WizardProvider,
  useWizard,
  createStep,
  useWizardValue,
  useWizardError,
  useWizardActions,
  useWizardState,
  useWizardSelector,
} = createWizardFactory<ValidationWizardSchema, TStep>();

// Wizard Config
export const wizardConfig = {
  steps: [
    createStep({
      id: "personal",
      label: "Personal Info",
      validationAdapter: new ZodAdapter(z.object({ personal: PersonalInfoSchema })),
    }),
    createStep({
      id: "account",
      label: "Account Info",
      validationAdapter: new ZodAdapter(z.object({ account: AccountInfoSchema })),
    }),
    createStep({
      id: "review",
      label: "Review"
    })
  ],
};