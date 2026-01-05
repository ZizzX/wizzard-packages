import { createWizardFactory } from "wizzard-stepper-react";

export interface BasicNavigationSchema {
  step1?: string;
  step2?: string;
  step3?: string;
}

export const {
  WizardProvider,
  useWizard,
  useWizardActions,
  useWizardValue,
  useWizardSelector,
  useWizardError,
  useWizardState,
  createStep,
} = createWizardFactory<BasicNavigationSchema>();
