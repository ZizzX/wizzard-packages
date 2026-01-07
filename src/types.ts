/**
 * @module Types
 */

/**
 * Handle returned by components for imperative access to the wizard.
 */
export interface IWizardHandle<T = unknown, StepId extends string = string> {
    state: IWizardState<T, StepId>;
    actions: IWizardActions<StepId>;
}

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
    currentStepId: StepId | "";
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
}

export interface IWizardStore<T, StepId extends string = string> {
    getSnapshot(): IWizardState<T, StepId>;
    dispatch(action: WizardAction<T, StepId>): void;
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
    subscribeToActions(
        listener: (action: WizardAction<T, StepId>) => void
    ): () => void;
    injectPersistence(adapter: IPersistenceAdapter): void;
    save(stepId?: StepId): void;
    hydrate(): void;
    errorsMap: Map<string, Map<string, string>>;
}

/**
 * Public actions available to control the wizard.
 */
export interface IWizardActions<StepId extends string = string> {
    /**
     * Attempts to move to the next step.
     * Triggers validation and guards if enabled.
     */
    goToNextStep: () => Promise<void>;
    /**
     * Moves to the previous step.
     */
    goToPrevStep: () => Promise<void>;
    /**
     * Navigates directly to a specific step.
     * @param stepId Target step ID
     * @param providedActiveSteps Optional override for active steps
     * @param options Navigation options (e.g. bypass validation)
     */
    goToStep: (
        stepId: StepId,
        providedActiveSteps?: any[],
        options?: { validate?: boolean }
    ) => Promise<boolean>;
    /**
     * Sets experimental bulk data for a step.
     * @internal
     */
    setStepData: (stepId: StepId, data: unknown) => void;
    /**
     * Helper for simple field updates in basic forms.
     */
    handleStepChange: (field: string, value: unknown) => void;
    /**
     * Forces validation for an individual step.
     */
    validateStep: (sid: StepId) => Promise<boolean>;
    /**
     * Forces validation for all active steps.
     */
    validateAll: () => Promise<{
        isValid: boolean;
        errors: Record<string, Record<string, string>>;
    }>;
    /**
     * Persists specific steps to the configured storage.
     */
    save: (stepIds?: StepId | StepId[] | boolean) => void;
    /**
     * Clears all saved data for this wizard from storage.
     */
    clearStorage: () => void;
    /**
     * Resets the entire wizard to its initial state.
     */
    reset: () => void;
    /**
     * Primary method to update specific fields by path.
     * Supports dot notation and debounced validation.
     * @example actions.setData('user.address.zip', '12345')
     */
    setData: (
        path: string,
        value: unknown,
        options?: { debounceValidation?: number }
    ) => void;
    /**
     * Merges a partial data object into the wizard state.
     * @param data Object to merge
     * @param options options.replace will overwrite the entire state
     */
    updateData: (
        data: Partial<any>,
        options?: { replace?: boolean; persist?: boolean }
    ) => void;
    /**
     * Retrieves data value at a specific path.
     */
    getData: (path: string, defaultValue?: unknown) => unknown;
    /**
     * Dynamically updates wizard configuration.
     * Useful for changing steps or modes at runtime.
     */
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
    condition?: (data: TStepData, metadata: Partial<IWizardState<TStepData, StepId>> & { data?: TStepData | undefined; allErrors?: any; }) => boolean | Promise<boolean>;
    /**
     * If true, the step will be visible while its condition is being resolved.
     * Default: false (step is hidden until condition is resolved)
     */
    showWhilePending?: boolean;
    /**
     * Optimization: Array of paths that this step's condition depends on.
     * If provided, the condition will only be re-evaluated when these paths change.
     */
    conditionDependsOn?: string[];
    /**
     * Guard function called before leaving the step.
     * Return false or throw to prevent navigation.
     */
    beforeLeave?: (data: TStepData, direction: StepDirection, metadata: Partial<IWizardState<TStepData, StepId>> & { data?: TStepData | undefined; allErrors?: any; }) => boolean | Promise<boolean>;
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
     * Function receives current data and array of changed field paths that triggered the dependency.
     */
    clearData?: string | string[] | ((data: TStepData, changedFields: string[]) => Partial<TStepData>);
    /**
     * Determines if user can navigate to this step directly.
     * Useful for implementing role-based access control or conditional navigation.
     * @param data - Current wizard data
     * @param metadata - Wizard state (visitedSteps, completedSteps, currentStepId, etc.)
     * @returns true if navigation is allowed, false otherwise
     */
    /**
     * Determines if user can navigate to this step directly.
     * Useful for implementing role-based access control or conditional navigation.
     * @param data - Current wizard data
     * @param metadata - Wizard state (visitedSteps, completedSteps, currentStepId, etc.)
     * @returns true if navigation is allowed, false otherwise
     */
    canNavigateTo?: (data: TStepData, metadata: Partial<IWizardState<TStepData, StepId>> & { data?: TStepData | undefined; allErrors?: any; }) => boolean | Promise<boolean>;
}

/**
 * Global Wizard Configuration.
 * 
 * Defines steps, validation rules, persistence settings and overall behavior.
 */
export interface IWizardConfig<T = unknown, StepId extends string = string> {
    /** List of steps in order. Conditions may dynamically skip some of them. */
    steps: IStepConfig<T, StepId>[];

    /** 
     * @deprecated Use validationMode instead 
     */
    autoValidate?: boolean;

    /** 
     * Default validation trigger for all steps.
     * Can be overridden per-step.
     * Default: 'onStepChange'
     */
    validationMode?: ValidationMode;

    /** 
     * Time (ms) to wait before triggering validation on field change. 
     * Only applies if validationMode is 'onChange'.
     */
    validationDebounceTime?: number;

    /** 
     * Data persistence settings.
     */
    persistence?: {
        /** When to save state to storage */
        mode?: PersistenceMode;
        /** Store implementation (LocalStorageAdapter by default) */
        adapter?: IPersistenceAdapter;
        /** Unique key for storage isolation */
        storageKey?: string;
        /** Throttle/Debounce time for storage operations */
        debounceTime?: number;
    };

    /** 
     * Conflict resolution strategy for persistence hydration.
     */
    onConflict?: 'merge' | 'replace' | 'keep-local';

    /** 
     * Integration with analytics services.
     */
    analytics?: {
        onEvent: WizardEventHandler<StepId>;
    };

    /** 
     * Function chain to intercept or enrich wizard actions.
     */
    middlewares?: WizardMiddleware<T, StepId>[];

    /** 
     * Global navigation rules.
     * - 'sequential': Forward/Back only.
     * - 'visited': Can jump to any previously visited step.
     * - 'free': Full access to all steps at any time.
     */
    navigationMode?: 'sequential' | 'visited' | 'free';

    /**
     * Callback triggered on every successful step transition.
     */
    onStepChange?: (fromStep: StepId | null, toStep: StepId, data: T) => void;
}

/**
 * Middleware Action Types
 */
export type WizardAction<T = any, StepId extends string = string> =
    | { type: 'INIT'; payload: { data: T; config: IWizardConfig<T, StepId> } }
    | { type: 'SET_DATA'; payload: { path: string; value: any; options?: any } }
    | { type: 'UPDATE_DATA'; payload: { data: Partial<T>; options?: any } }
    | { type: 'GO_TO_STEP'; payload: { from: StepId | null; to: StepId } }
    | { type: 'VALIDATE_START'; payload: { stepId: StepId } }
    | { type: 'VALIDATE_END'; payload: { stepId: StepId; result: ValidationResult } }
    | { type: 'SET_STEP_ERRORS'; payload: { stepId: StepId; errors: Record<string, string> | undefined | null } }
    | { type: 'RESET'; payload: { data: T } }
    | { type: 'UPDATE_META'; payload: { meta: Partial<IWizardState<T, StepId>> } }
    | { type: 'SET_CURRENT_STEP_ID'; payload: { stepId: StepId | "" } }
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
    getSnapshot: () => any; // Returns store snapshot
}

/**
 * Middleware Type Definition
 */
export type WizardMiddleware<T = any, StepId extends string = string> = (
    api: MiddlewareAPI<T, StepId>
) => (
    next: (action: WizardAction<T, StepId>) => void
) => (
    action: WizardAction<T, StepId>
) => void;

/**
 * Standardized Event Names
 */
export type WizardEventName = "step_change" | "validation_error" | "wizard_reset";

/**
 * Event Payloads
 */
export type WizardEventPayloads<StepId extends string = string> = {
    step_change: {
        from: StepId | null;
        to: StepId;
        timestamp: number;
    };
    validation_error: {
        stepId: StepId;
        errors: Record<string, string> | undefined;
        timestamp: number;
    };
    wizard_reset: {
        data: any;
        timestamp?: number;
    };
};

/**
 * Generic Event Handler Type
 */
export type WizardEventHandler<StepId extends string = string> = <E extends WizardEventName>(
    name: E,
    payload: WizardEventPayloads<StepId>[E]
) => void;

/**
 * Core Wizard Context State
 */
export interface IWizardContext<T = unknown, StepId extends string = string> {
    config: IWizardConfig<T, StepId>;
    currentStep: IStepConfig<T, StepId> | null;
    currentStepId: StepId | "";
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
     * Wizard form data
     */
    data: T;

    /**
     * Errors keyed by stepId -> field -> message
     */
    allErrors: Record<StepId, Record<string, string>>;

    /**
     * Flattened errors map (field -> message) for convenience.
     * Contains errors from all steps unless shadowed.
     */
    errors: Record<string, string>;

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
    handleStepChange: (field: keyof T, value: unknown) => void; // Helper for simple forms

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

    /**
     * Internal Store Access
     */
    store: IWizardStore<T, StepId>;
}

/**
 * Breadcrumb Status
 */
export type BreadcrumbStatus = 'visited' | 'current' | 'upcoming' | 'completed' | 'error' | 'hidden';

/**
 * Breadcrumb Interface
 */
export interface IBreadcrumb<StepId extends string = string> {
    id: StepId;
    label: string;
    status: BreadcrumbStatus;
}
