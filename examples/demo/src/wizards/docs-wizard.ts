import { createWizardFactory } from '@wizzard/react';

export interface TechWizardSchema {
  userName?: string;
  knowsReact?: boolean;
  interests?: string[];
  feedback?: string;
}

export const {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardValue,
  useWizardSelector,
  useWizardError,
  createStep,
} = createWizardFactory<TechWizardSchema>();
