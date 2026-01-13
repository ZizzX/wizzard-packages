import type {
  IWizardState,
  IWizardActions as ICoreActions,
  IWizardContext as ICoreContext,
  IStepConfig,
  IWizardConfig,
  Path,
  PathValue,
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
 * Typed actions for strongly-typed paths.
 */
export type IWizardActionsTyped<T, StepId extends string = string> = Omit<
  ICoreActions<StepId>,
  'setData' | 'updateData' | 'getData'
> & {
  setData: <P extends Path<T>>(
    path: P,
    value: PathValue<T, P>,
    options?: { debounceValidation?: number }
  ) => void;
  updateData: (data: Partial<T>, options?: { replace?: boolean; persist?: boolean }) => void;
  getData: <P extends Path<T>>(path: P, defaultValue?: PathValue<T, P>) => PathValue<T, P>;
};

/**
 * Core Wizard Context State
 */
export interface IWizardContext<T = unknown, StepId extends string = string> extends ICoreContext<
  T,
  StepId
> {}
