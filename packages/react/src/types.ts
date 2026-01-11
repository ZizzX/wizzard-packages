import type {
  IWizardState,
  IWizardActions as ICoreActions,
  IWizardContext as ICoreContext,
  IStepConfig,
  IWizardConfig,
} from '@wizzard-packages/core';

/**
 * Re-export core config types for convenience.
 */
export type { IStepConfig, IWizardConfig };

/**
 * Handle returned by components for imperative access to the wizard.
 */
export interface IWizardHandle<T = unknown, StepId extends string = string> {
  state: IWizardState<T, StepId>;
  actions: IWizardActions<StepId>;
}

/**
 * React-specific actions
 */
export interface IWizardActions<StepId extends string = string> extends ICoreActions<StepId> {}

/**
 * Core Wizard Context State
 */
export interface IWizardContext<T = unknown, StepId extends string = string> extends ICoreContext<
  T,
  StepId
> {}
