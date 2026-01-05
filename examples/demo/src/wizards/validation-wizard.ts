import { z } from "zod";
import { ZodAdapter, createWizardFactory } from "wizzard-stepper-react"; // Using local source
import type { IWizardConfig } from "wizzard-stepper-react";

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

// Wizard Config
export const wizardConfig: IWizardConfig<ValidationWizardSchema> = {
  steps: [
    {
      id: "personal",
      label: "Personal Info",
      validationAdapter: new ZodAdapter(PersonalInfoSchema),
    },
    {
      id: "account",
      label: "Account Info",
      validationAdapter: new ZodAdapter(AccountInfoSchema),
    },
    {
       id: "review",
       label: "Review"
    }
  ],
};

// Create Typed Factory
export const {
  WizardProvider,
  useWizard,
  // useWizardStep, // Not available in factory
  useWizardValue,
  useWizardError,
  useWizardActions,
  useWizardState, 
} = createWizardFactory<ValidationWizardSchema>();