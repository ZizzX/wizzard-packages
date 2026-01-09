import { useWizardContext } from '../context/WizardContext';
import type { IWizardContext } from '../types';

/**
 * Alias for useWizardContext.
 */
export const useWizard = <T = any, StepId extends string = string>(): IWizardContext<T, StepId> => {
  return useWizardContext<T, StepId>();
};
