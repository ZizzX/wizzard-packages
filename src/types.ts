
export interface IWizardHandle<T = unknown, StepId extends string = string> {
    state: IWizardState<T, StepId>;
    actions: IWizardActions<StepId>;
}

export interface IWizardState<T = unknown, StepId extends string = string> {
  currentStep: IStepConfig<T, StepId> | null;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  isPending: boolean;
  activeSteps: IStepConfig<T, StepId>[];
  visitedSteps: Set<StepId>;
  completedSteps: Set<StepId>;
  errorSteps: Set<StepId>;
  history: StepId[];
  busySteps: Set<StepId>;
  config: IWizardConfig<T, StepId>;
  progress: number;
  activeStepsCount: number;
  isBusy: boolean;
  isDirty: boolean;
  dirtyFields: Set<string>;
  breadcrumbs: IBreadcrumb<StepId>[];
  allErrors: Record<string, Record<string, string>>;
  store: IWizardStore<T, StepId>;
}

export interface IWizardStore<T, StepId extends string = string> {
  getSnapshot(): {
    data: T;
    errors: Record<string, Record<string, string>>;
    isDirty: boolean;
    dirtyFields: Set<string>;
    meta: Partial<IWizardState<T, StepId>> & {
      wizardData?: T;
      allErrors?: any;
    };
  };
  update(newData: T, changedPath?: string | string[]): void;
  updateMeta(newMeta: Partial<IWizardState<T, StepId>>): void;
  setInitialData(data: T): void;
  updateErrors(newErrors: Record<string, Record<string, string>>): void;
  setStepErrors(
    stepId: string,
    errors: Record<string, string> | undefined | null
  ): boolean;
  deleteError(stepId: string, path: string): boolean;
  subscribe(listener: () => void): () => void;
  errorsMap: Map<string, Map<string, string>>;
}

export interface IWizardActions<StepId extends string = string> {
  goToNextStep: () => Promise<void>;
  goToPrevStep: () => void;
  goToStep: (stepId: StepId) => Promise<boolean>;
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
  setData: (
    path: string,
    value: unknown,
    options?: { debounceValidation?: number }
  ) => void;
  updateData: (
    data: Partial<any>,
    options?: { replace?: boolean; persist?: boolean }
  ) => void;
  getData: (path: string, defaultValue?: unknown) => unknown;
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
 * TData: The type of data this validator expects
 */
export interface IValidatorAdapter<TData = unknown> {
    validate: (data: TData) => Promise<ValidationResult> | ValidationResult;
}

/**
 * Persistence Mode
 * - 'onStepChange': Save when moving between steps (default)
 * - 'onChange': Save on every data change (debounced)
 * - 'manual': Save only when manually triggered
 */
export type PersistenceMode = 'onStepChange' | 'onChange' | 'manual';

/**
 * Validation Mode
 * - 'onChange': Validate on every data change (debounced)
 * - 'onStepChange': Validate only when moving to next step
 * - 'manual': Validate only when manually triggered
 */
export type ValidationMode = 'onChange' | 'onStepChange' | 'manual';

/**
 * Persistence Adapter Interface
 */
export interface IPersistenceAdapter {
    saveStep: <T>(stepId: string, data: T) => void;
    getStep: <T>(stepId: string) => T | undefined;
    clear: () => void;
}

/**
 * Step Navigation Direction
 */
export type StepDirection = 'next' | 'prev';

/**
 * Step Configuration
 * TStepData: Type of data for this step
 * TGlobalContext: Type of the global wizard data
 */
export interface IStepConfig<TStepData = unknown, StepId extends string = string> {
    id: StepId;
    label: string;
    /**
     * Predicate to determine if step should be included/visible.
     * Supports both synchronous and asynchronous predicates.
     */
    condition?: (data: TStepData, metadata: Partial<IWizardState<TStepData, StepId>> & { wizardData?: TStepData | undefined; allErrors?: any; }) => boolean | Promise<boolean>;
    /**
     * If true, the step will be visible while its condition is being resolved.
     * Default: false (step is hidden until condition is resolved)
     */
    showWhilePending?: boolean;
    /**
     * Guard function called before leaving the step.
     * Return false or throw to prevent navigation.
     */
    beforeLeave?: (data: TStepData, direction: StepDirection, metadata: Partial<IWizardState<TStepData, StepId>> & { wizardData?: TStepData | undefined; allErrors?: any; }) => boolean | Promise<boolean>;
    /**
     * Adapter for validation logic
     */
    validationAdapter?: IValidatorAdapter<TStepData>;
    /**
     * Override global auto-validation setting for this step
     * @deprecated Use validationMode instead
     */
    autoValidate?: boolean;
    /**
     * Control when validation occurs for this step.
     * - 'onChange': Validate on every keystroke (debounced)
     * - 'onStepChange': Validate only when attempting to leave the step
     * - 'manual': Only validate when explicitly triggered
     */
    validationMode?: ValidationMode;
    /**
     * Optional React Component to render for this step.
     * Used by the <WizardStepRenderer /> component.
     */
    component?: React.ComponentType<any>;
    /**
     * Override global persistence adapter for this specific step.
     */
    persistenceAdapter?: IPersistenceAdapter;
    /**
     * Control when persistence occurs for this specific step.
     * - 'onStepChange': Save when moving between steps (default)
     * - 'onChange': Save on every data change (debounced)
     * - 'manual': Save only when manually triggered
     */
    persistenceMode?: PersistenceMode;
    /**
     * Dependency Tracking: Reset this step's data/status when these paths change.
     */
    dependsOn?: string[];
    /**
     * Paths to clear when dependencies change.
     * Can be a single path string, an array of paths, or a function returning a data patch to merge.
     */
    clearData?: string | string[] | ((data: TStepData) => Partial<TStepData>);
}

/**
 * Wizard Configuration
 * T: Type of the Global Wizard Data
 */
export interface IWizardConfig<T = unknown, StepId extends string = string> {
    /**
     * Array of step configurations
     */
    steps: IStepConfig<T, StepId>[];
    /**
     * Global auto-validation setting (default: true)
     * @deprecated Use validationMode instead
     */
    autoValidate?: boolean;
    /**
     * Default validation mode for all steps (default: 'onChange')
     */
    validationMode?: ValidationMode;
    /**
     * Persistence configuration
     */
    persistence?: {
        mode?: PersistenceMode;
        adapter?: IPersistenceAdapter;
        /**
         * Storage key prefix (default: 'wizard_')
         */
        storageKey?: string;
        /**
         * Debounce time in ms for 'onChange' persistence (default: 0)
         */
        debounceTime?: number;
    };
    /**
     * Conflict resolution strategy for persistence hydration.
     * - 'merge': Shallow merge local and initial/server data (default)
     * - 'replace': Overwrite local with initial/server data
     * - 'keep-local': Ignore initial/server data if local exists
     */
    onConflict?: 'merge' | 'replace' | 'keep-local';
    /**
     * Analytics integration.
     */
    analytics?: {
        onEvent: (name: string, payload: any) => void;
    };
    /**
     * Callback triggered when step changes.
     * Useful for routing integration or analytics.
     */
    onStepChange?: (fromStep: StepId | null, toStep: StepId, data: T) => void;
}

/**
 * Core Wizard Context State
 */
export interface IWizardContext<T = unknown, StepId extends string = string> {
    config: IWizardConfig<T, StepId>;
    currentStep: IStepConfig<T, StepId> | null;
    currentStepIndex: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    isLoading: boolean;
    isPending?: boolean;
    isBusy: boolean;

    /**
     * Dirty State Tracking
     */
    isDirty: boolean;
    dirtyFields: Set<string>;

    /**
     * Progress and Stats
     */
    progress: number;
    activeStepsCount: number;

    /**
     * Active steps (those meeting conditions)
     */
    activeSteps: IStepConfig<T, StepId>[];

    /**
     * Navigation History
     */
    history: StepId[];

    /**
     * Steps that are currently performing async actions (conditions, validation, guards)
     */
    busySteps: Set<StepId>;

    /**
     * Unified Wizard Data
     */
    wizardData: T;

    /**
     * Errors keyed by stepId -> field -> message
     */
    allErrors: Record<string, Record<string, string>>;

    /**
     * Steps Status
     */
    visitedSteps: Set<StepId>;
    completedSteps: Set<StepId>;
    errorSteps: Set<StepId>;

    /**
     * Breadcrumbs
     */
    breadcrumbs: IBreadcrumb<StepId>[];

    /**
     * Navigation Actions
     */
    goToNextStep: () => Promise<void>;
    goToPrevStep: () => void;
    goToStep: (stepId: StepId) => Promise<boolean>;

    /**
     * Data Actions
     */
    setStepData: (stepId: StepId, data: unknown) => void; // Internal use usually
    handleStepChange: (field: string, value: unknown) => void; // Helper for simple forms

    /**
     * Set data by path (supports dot notation and arrays, e.g., 'user.name' or 'items[0].value')
     */
    setData: (path: string, value: unknown, options?: { debounceValidation?: number }) => void;

    /**
     * Bulk update wizard data.
     * @param data Partial data to merge.
     * @param options.replace If true, replaces entire state instead of merging.
     */
    updateData: (data: Partial<T>, options?: { replace?: boolean }) => void;

    /**
     * Get data by path
     */
    getData: (path: string, defaultValue?: unknown) => unknown;

    /**
     * Validation & Persistence
     */
    validateStep: (sid: StepId) => Promise<boolean>;
    validateAll: () => Promise<{ isValid: boolean; errors: Record<string, Record<string, string>> }>;
    save: (stepIds?: StepId | StepId[] | boolean) => void; // Manual persistence save
    clearStorage: () => void;
    reset: () => void;
    
    /**
     * Dynamic Configuration
     */
    updateConfig: (config: Partial<IWizardConfig<T, StepId>>) => void;
}

/**
 * Breadcrumb Status
 */
export type BreadcrumbStatus = 'visited' | 'current' | 'future' | 'hidden';

/**
 * Breadcrumb Interface
 */
export interface IBreadcrumb<StepId extends string = string> {
    id: StepId;
    label: string;
    status: BreadcrumbStatus;
}
