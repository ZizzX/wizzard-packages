/**
 * @module Types (Core)
 */

/**
 * Full state of the wizard.
 */
export interface IWizardState<T = unknown, StepId extends string = string> {
  /** Global wizard data object */
  data: T;
  /** Current errors map by step and field */
  errors: Record<StepId, Record<string, string>>;
  /** Active step configuration (if any) */
  currentStep: IStepConfig<T, StepId> | null;
  /** Numeric index of current step in active steps list */
  currentStepIndex: number;
  /** True if currently on the first active step */
  isFirstStep: boolean;
  /** True if currently on the last active step */
  isLastStep: boolean;
  /** True if the wizard is in an initial loading/hydrating state */
  isLoading: boolean;
  /** True if an async action (like navigation or validation) is in progress */
  isPending: boolean;
  /** List of steps that currently meet their visibility conditions */
  activeSteps: IStepConfig<T, StepId>[];
  /** String ID of the current step */
  currentStepId: StepId | '';
  /** History of visited steps (navigation path) */
  history: StepId[];
  /** Set of step IDs that are currently performing async work */
  busySteps: Set<StepId>;
  /** Set of step IDs that have been visited by the user */
  visitedSteps: Set<StepId>;
  /** Set of step IDs that have passed validation */
  completedSteps: Set<StepId>;
  /** Set of step IDs that currently have active validation errors */
  errorSteps: Set<StepId>;
  /** Current wizard configuration */
  config: IWizardConfig<T, StepId>;
  /** Percentage of completion (0-100) */
  progress: number;
  /** Number of active steps */
  activeStepsCount: number;
  /** Alias for isPending */
  isBusy: boolean;
  /** True if any field has been modified since initialization */
  isDirty: boolean;
  /** Set of paths to fields that have been modified */
  dirtyFields: Set<string>;
  /** Breadcrumb items for navigation UI */
  breadcrumbs: IBreadcrumb<StepId>[];
  /** Result of the last goToStep action */
  goToStepResult?: boolean | null | 'init';
}

/**
 * Store interface for reading state and dispatching actions.
 */
export interface IWizardStore<T, StepId extends string = string> {
  getSnapshot(): IWizardState<T, StepId>;
  dispatch(action: WizardAction<T, StepId>): void;
  update(newData: T, changedPath?: string | string[]): void;
  updateMeta(newMeta: Partial<IWizardState<T, StepId>>): void;
  setInitialData(data: T): void;
  updateErrors(newErrors: Record<string, Record<string, string>>): void;
  setStepErrors(stepId: string, errors: Record<string, string> | undefined | null): boolean;
  deleteError(stepId: string, path: string): boolean;
  subscribe(listener: () => void): () => void;
  subscribeToActions(listener: (action: WizardAction<T, StepId>) => void): () => void;
  injectPersistence(adapter: IPersistenceAdapter): void;
  save(stepId?: StepId): void;
  hydrate(): void;
  errorsMap: Map<string, Map<string, string>>;
  resolveActiveSteps(data?: T): Promise<IStepConfig<T, StepId>[]>;
  goToStep(
    stepId: StepId,
    options?: { validate?: boolean; providedActiveSteps?: IStepConfig<T, StepId>[] }
  ): Promise<boolean>;
  validateStep: (stepId: StepId) => Promise<boolean>;
  validateAll: () => Promise<{
    isValid: boolean;
    errors: Record<string, Record<string, string>>;
  }>;
}

/**
 * Public actions available to control the wizard.
 */
export interface IWizardActions<StepId extends string = string> {
  goToNextStep: () => Promise<void>;
  goToPrevStep: () => Promise<void>;
  goToStep: (
    stepId: StepId,
    providedActiveSteps?: any[],
    options?: { validate?: boolean }
  ) => Promise<boolean>;
  setStepData: (stepId: StepId, data: unknown) => void;
  handleStepChange: (field: string, value: unknown) => void;
  validateStep: (sid: StepId) => Promise<boolean>;
  validateAll: () => Promise<{
    isValid: boolean;
    errors: Record<string, Record<string, string>>;
  }>;
  save: (stepIds?: StepId | StepId[] | boolean) => void;
  clearStorage: () => void;
  reset: () => void;
  setData: (path: string, value: unknown, options?: { debounceValidation?: number }) => void;
  updateData: (data: Partial<any>, options?: { replace?: boolean; persist?: boolean }) => void;
  getData: (path: string, defaultValue?: unknown) => unknown;
  updateConfig: (config: Partial<IWizardConfig<any, StepId>>) => void;
}

/**
 * Validation Result Interface
 */
export type ValidationResult = {
  isValid: boolean;
  errors?: Record<string, string>;
};

/**
 * Validator Adapter Interface
 */
export interface IValidatorAdapter<TData = unknown> {
  validate: (data: TData) => Promise<ValidationResult> | ValidationResult;
}

/**
 * Persistence strategy for step data.
 */
export type PersistenceMode = 'onStepChange' | 'onChange' | 'manual';
/**
 * Validation strategy for step data.
 */
export type ValidationMode = 'onChange' | 'onStepChange' | 'manual';

/**
 * Persistence Adapter Interface
 */
export interface IPersistenceAdapter {
  saveStep: <T>(stepId: string, data: T) => void;
  getStep: <T>(stepId: string) => T | undefined;
  getStepWithMeta?: <T>(stepId: string) => { data: T; timestamp: number } | undefined;
  clearStep: (stepId: string) => void;
  clear: () => void;
}

/**
 * Step Navigation Direction
 */
export type StepDirection = 'next' | 'prev';

/**
 * Step Configuration
 */
export interface IStepConfig<TStepData = unknown, StepId extends string = string> {
  id: StepId;
  label: string;
  condition?: (
    data: TStepData,
    metadata: Partial<IWizardState<TStepData, StepId>> & {
      data?: TStepData | undefined;
      allErrors?: any;
    }
  ) => boolean | Promise<boolean>;
  showWhilePending?: boolean;
  conditionDependsOn?: string[];
  beforeLeave?: (
    data: TStepData,
    direction: StepDirection,
    metadata: Partial<IWizardState<TStepData, StepId>> & {
      data?: TStepData | undefined;
      allErrors?: any;
    }
  ) => boolean | Promise<boolean>;
  validationAdapter?: IValidatorAdapter<TStepData>;
  /** @deprecated Use validationMode instead */
  autoValidate?: boolean;
  validationMode?: ValidationMode;
  component?: any; // Framework agnostic, will be cast to React.ComponentType in @wizzard/react
  persistenceAdapter?: IPersistenceAdapter;
  persistenceMode?: PersistenceMode;
  dependsOn?: string[];
  clearData?:
    | string
    | string[]
    | ((data: TStepData, changedFields: string[]) => Partial<TStepData>);
  canNavigateTo?: (
    data: TStepData,
    metadata: Partial<IWizardState<TStepData, StepId>> & {
      data?: TStepData | undefined;
      allErrors?: any;
    }
  ) => boolean | Promise<boolean>;
}

/**
 * Global Wizard Configuration.
 */
export interface IWizardConfig<T = unknown, StepId extends string = string> {
  steps: IStepConfig<T, StepId>[];
  /** @deprecated Use validationMode instead */
  autoValidate?: boolean;
  validationMode?: ValidationMode;
  validationDebounceTime?: number;
  persistence?: {
    mode?: PersistenceMode;
    adapter?: IPersistenceAdapter;
    storageKey?: string;
    debounceTime?: number;
  };
  onConflict?: 'merge' | 'replace' | 'keep-local';
  analytics?: {
    onEvent: WizardEventHandler<StepId>;
  };
  middlewares?: WizardMiddleware<T, StepId>[];
  navigationMode?: 'sequential' | 'visited' | 'free';
  onStepChange?: (fromStep: StepId | null, toStep: StepId, data: T) => void;
}

/**
 * Action Types
 */
export type WizardAction<T = any, StepId extends string = string> =
  | { type: 'INIT'; payload: { data: T; config: IWizardConfig<T, StepId> } }
  | { type: 'SET_DATA'; payload: { path: string; value: any; options?: any } }
  | { type: 'UPDATE_DATA'; payload: { data: Partial<T>; options?: any } }
  | {
      type: 'GO_TO_STEP';
      payload: {
        from: StepId;
        to: StepId;
        result: boolean | null | 'init';
        nextVisitedSteps?: Set<StepId>;
        nextHistory?: StepId[];
      };
    }
  | { type: 'VALIDATE_START'; payload: { stepId: StepId } }
  | { type: 'VALIDATE_END'; payload: { stepId: StepId; result: ValidationResult } }
  | {
      type: 'SET_STEP_ERRORS';
      payload: { stepId: StepId; errors: Record<string, string> | undefined | null };
    }
  | { type: 'RESET'; payload: { data: T } }
  | { type: 'UPDATE_META'; payload: { meta: Partial<IWizardState<T, StepId>> } }
  | { type: 'SET_CURRENT_STEP_ID'; payload: { stepId: StepId | '' } }
  | { type: 'SET_HISTORY'; payload: { history: StepId[] } }
  | { type: 'SET_ACTIVE_STEPS'; payload: { steps: IStepConfig<T, StepId>[] } }
  | { type: 'SET_VISITED_STEPS'; payload: { steps: Set<StepId> } }
  | { type: 'SET_COMPLETED_STEPS'; payload: { steps: Set<StepId> } }
  | { type: 'SET_ERROR_STEPS'; payload: { steps: Set<StepId> } }
  | { type: 'RESTORE_SNAPSHOT'; payload: { snapshot: any } };

/**
 * Middleware API
 */
export interface MiddlewareAPI<T = any, StepId extends string = string> {
  dispatch: (action: WizardAction<T, StepId>) => void;
  getState: () => T;
  getSnapshot: () => IWizardState<T, StepId>;
}

/**
 * Middleware Type Definition
 */
export type WizardMiddleware<T = any, StepId extends string = string> = (
  api: MiddlewareAPI<T, StepId>
) => (next: (action: WizardAction<T, StepId>) => void) => (action: WizardAction<T, StepId>) => void;

/**
 * Standardized Event Names
 */
export type WizardEventName = 'step_change' | 'validation_error' | 'wizard_reset';

/**
 * Event Payloads
 */
export type WizardEventPayloads<StepId extends string = string> = {
  step_change: { from: StepId | null; to: StepId; timestamp: number };
  validation_error: {
    stepId: StepId;
    errors: Record<string, string> | undefined;
    timestamp: number;
  };
  wizard_reset: { data: any; timestamp?: number };
};

/**
 * Generic Event Handler Type
 */
export type WizardEventHandler<StepId extends string = string> = <E extends WizardEventName>(
  name: E,
  payload: WizardEventPayloads<StepId>[E]
) => void;

/**
 * Breadcrumb Status
 */
export type BreadcrumbStatus =
  | 'visited'
  | 'current'
  | 'upcoming'
  | 'completed'
  | 'error'
  | 'hidden';

/**
 * Breadcrumb Interface
 */
export interface IBreadcrumb<StepId extends string = string> {
  id: StepId;
  label: string;
  status: BreadcrumbStatus;
}

/**
 * High-level context for the wizard, combining state and actions.
 */
export interface IWizardContext<T = unknown, StepId extends string = string>
  extends Omit<IWizardState<T, StepId>, 'errors'>, IWizardActions<StepId> {
  /**
   * The internal store instance.
   */
  store: IWizardStore<T, StepId>;
  /**
   * Combined error map (flat)
   */
  errors: Record<string, string>;
  /**
   * All errors by step and field.
   */
  allErrors: Record<StepId, Record<string, string>>;
}
