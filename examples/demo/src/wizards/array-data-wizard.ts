import { createWizardFactory } from 'wizzard-stepper-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
}

export interface ArrayDataSchema {
  products: Product[];
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
} = createWizardFactory<ArrayDataSchema, string>();
