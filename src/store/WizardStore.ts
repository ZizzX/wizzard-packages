import { getByPath, setByPath } from "../utils/data";
import type { 
  IWizardStore, 
  IWizardState, 
  WizardAction, 
  WizardMiddleware, 
  MiddlewareAPI,
  IPersistenceAdapter
} from "../types";

export class WizardStore<
  T,
  StepId extends string = string,
> implements IWizardStore<T, StepId> {
  private initialData: T;
  private dirtyFields = new Set<string>();
  private state: IWizardState<T, StepId>;
  private listeners = new Set<() => void>();
  private actionListeners = new Set<(action: WizardAction<T, StepId>) => void>();
  errorsMap = new Map<StepId, Map<string, string>>();
  private middlewareChain: (action: WizardAction<T, StepId>) => void;
  private persistenceAdapter?: IPersistenceAdapter;
  private persistenceDebounceTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private stepsMap = new Map<string, any>(); // Cache for O(1) step lookup

  subscribeToActions(listener: (action: WizardAction<T, StepId>) => void) {
    this.actionListeners.add(listener);
    return () => this.actionListeners.delete(listener);
  }

  private notifyActions(action: WizardAction<T, StepId>) {
    this.actionListeners.forEach((l) => l(action));
  }

  constructor(initialData: T, middlewares: WizardMiddleware<T, StepId>[] = []) {
    this.initialData = typeof structuredClone === 'function' 
      ? structuredClone(initialData) 
      : JSON.parse(JSON.stringify(initialData));

    this.state = {
      data: initialData,
      errors: {} as Record<StepId, Record<string, string>>,
      isDirty: false,
      dirtyFields: this.dirtyFields,
      visitedSteps: new Set(),
      completedSteps: new Set(),
      errorSteps: new Set(),
      currentStep: null,
      currentStepId: "",
      currentStepIndex: 0,
      isFirstStep: true,
      isLastStep: false,
      isLoading: true,
      isPending: false,
      isBusy: false,
      activeSteps: [],
      history: [],
      busySteps: new Set(),
      progress: 0,
      activeStepsCount: 0,
      breadcrumbs: [],
      config: {} as any, 
    };
    
    // Initialize middleware chain
    this.middlewareChain = this.setupMiddlewares(middlewares);
  }

  private setupMiddlewares(middlewares: WizardMiddleware<T, StepId>[]) {
    const middlewareAPI: MiddlewareAPI<T, StepId> = {
      getState: () => this.state.data,
      getSnapshot: () => this.getSnapshot(),
      dispatch: (action: WizardAction<T, StepId>) => this.dispatch(action),
    };

    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    
    // Compose middleware chain
    // Equivalent to redux compose: m1(m2(m3(internalDispatch)))
    return chain.reduceRight(
      (next, middleware) => middleware(next),
      this.internalDispatch.bind(this)
    );
  }

  /**
   * Public dispatch method to trigger actions through middleware
   */
  dispatch(action: WizardAction<T, StepId>) {
    this.middlewareChain(action);
  }

  /**
   * Internal dispatch that actually performs the state updates
   */
  private internalDispatch(action: WizardAction<T, StepId>) {
    this.notifyActions(action);
    switch (action.type) {
      case 'INIT':
        this.initialData = typeof structuredClone === 'function' ? structuredClone(action.payload.data) : JSON.parse(JSON.stringify(action.payload.data));
        const initialActiveSteps = action.payload.config.steps.filter((s: any) => !s.condition);
        
        // Build the fast lookup map
        this.stepsMap.clear();
        action.payload.config.steps.forEach((step: any) => {
             this.stepsMap.set(step.id, step);
        });

        this.state = {
          ...this.state,
          data: action.payload.data,
          config: action.payload.config,
          activeSteps: initialActiveSteps,
          activeStepsCount: initialActiveSteps.length,
        };
        this.notify();
        break;
      case 'SET_CURRENT_STEP_ID':
        // Trigger persistence for the step we are leaving
        if (this.state.currentStepId) {
            this.handleStepChangePersistence(this.state.currentStepId);
        }
        
        this.state = {
          ...this.state,
          currentStepId: action.payload.stepId,
        };
        this.notify();
        break;
      case 'SET_HISTORY':
        this.state = {
          ...this.state,
          history: action.payload.history,
        };
        this.notify();
        break;
      case 'SET_ACTIVE_STEPS':
        this.state = {
          ...this.state,
          activeSteps: action.payload.steps,
          activeStepsCount: action.payload.steps.length,
        };
        this.notify();
        break;
      case 'SET_DATA':
        this.updateDataByPath(action.payload.path, action.payload.value, action.payload.options);
        break;
      case 'UPDATE_DATA':
        this.updateBulkData(action.payload.data, action.payload.options);
        break;
      case 'GO_TO_STEP':
        this.state = {
          ...this.state,
          currentStepId: action.payload.to,
        };
        break;
      case 'VALIDATE_START':
        this.state.busySteps.add(action.payload.stepId);
        this.state = {
          ...this.state,
          busySteps: new Set(this.state.busySteps),
        };
        break;
      case 'VALIDATE_END':
        this.state.busySteps.delete(action.payload.stepId);
        this.state = {
            ...this.state,
            busySteps: new Set(this.state.busySteps)
        };
        if (action.payload.result.errors) {
            this.setStepErrors(action.payload.stepId, action.payload.result.errors);
        }
        break;
      case 'SET_STEP_ERRORS':
        this.setStepErrors(action.payload.stepId, action.payload.errors);
        break;
      case 'RESET':
        this.setInitialData(action.payload.data);
        break;
      case 'SET_ERROR_STEPS':
        this.state = { ...this.state, errorSteps: action.payload.steps };
        break;
      case 'SET_VISITED_STEPS':
        this.state = { ...this.state, visitedSteps: action.payload.steps };
        break;
      case 'SET_COMPLETED_STEPS':
        this.state = { ...this.state, completedSteps: action.payload.steps };
        break;
    }
    this.syncDerivedState();
    this.notify();
  }

  // Refactor update methods to be called from internalDispatch
  private updateDataByPath(path: string, value: any, _options?: { debounceValidation?: number }) {
    const newData = setByPath(this.state.data as any, path, value);
    if (newData === this.state.data) return;
    this.update(newData as T, path);
  }

  private updateBulkData(data: Partial<T>, options?: { replace?: boolean }) {
    let newData: T;
    if (options?.replace) {
      newData = data as T;
    } else {
      // Deep clone current data
      newData = JSON.parse(JSON.stringify(this.state.data));
      // Deep merge the updates (not shallow assign)
      Object.keys(data).forEach((key) => {
        (newData as any)[key] = (data as any)[key];
      });
    }
    this.update(newData, Object.keys(data));
  }

  getSnapshot = () => {
    return this.state;
  };

  update(newData: T, changedPath?: string | string[]) {
    if (changedPath) {
      const paths = Array.isArray(changedPath) ? changedPath : [changedPath];
      paths.forEach((path) => {
        const initialValue = getByPath(this.initialData, path);
        const newValue = getByPath(newData, path);

        if (JSON.stringify(initialValue) !== JSON.stringify(newValue)) {
          this.dirtyFields.add(path);
        } else {
          this.dirtyFields.delete(path);
        }
      });
    }

    this.state = {
      ...this.state,
      data: newData,
      isDirty: this.dirtyFields.size > 0,
      dirtyFields: new Set(this.dirtyFields),
    };
    
    // Check for auto-save
    if (changedPath) {
        const paths = Array.isArray(changedPath) ? changedPath : [changedPath];
        this.checkAutoSave(paths);
    } else {
        // Bulk update
        this.checkAutoSave(Object.keys(newData as object));
    }

    this.notify();
  }

  updateMeta(newMeta: Partial<IWizardState<T, StepId>>) {
    this.state = {
      ...this.state,
      ...newMeta,
    };
    this.syncDerivedState();
    this.notify();
  }

  private syncDerivedState() {
    const { activeSteps, currentStepId, visitedSteps, completedSteps, errorSteps } = this.state;
    const currentStepIndex = Math.max(0, activeSteps.findIndex((s) => s.id === currentStepId));
    const currentStep = activeSteps[currentStepIndex] || null;

    const breadcrumbs = activeSteps.map((step) => {
      let status: "visited" | "completed" | "error" | "current" | "upcoming" = "upcoming";
      if (step.id === currentStepId) status = "current";
      else if (errorSteps.has(step.id)) status = "error";
      else if (completedSteps.has(step.id)) status = "completed";
      else if (visitedSteps.has(step.id)) status = "visited";

      return {
        id: step.id,
        label: step.label,
        status,
      };
    });

    this.state = {
      ...this.state,
      currentStep,
      currentStepIndex,
      isFirstStep: currentStepIndex === 0,
      isLastStep: activeSteps.length > 0 && currentStepIndex === activeSteps.length - 1,
      progress: activeSteps.length > 0 
        ? Math.round(((currentStepIndex + 1) / activeSteps.length) * 100) 
        : 0,
      breadcrumbs,
    };
  }

  setInitialData(data: T) {
    this.initialData = typeof structuredClone === 'function' 
      ? structuredClone(data) 
      : JSON.parse(JSON.stringify(data));
    this.dirtyFields.clear();
    this.state = {
      ...this.state,
      data,
      isDirty: false,
      dirtyFields: new Set(),
    };
    this.notify();
  }

  private syncErrors() {
    const newErrorsObj: Record<StepId, Record<string, string>> = {} as unknown as Record<StepId, Record<string, string>>;
    for (const [stepId, fieldErrors] of this.errorsMap.entries()) {
      if (fieldErrors.size > 0) {
        newErrorsObj[stepId] = Object.fromEntries(fieldErrors);
      }
    }
    this.state = { ...this.state, errors: newErrorsObj };
    this.notify();
  }

  updateErrors(newErrors: Record<StepId, Record<string, string>>) {
    this.errorsMap.clear();
    for (const [stepId, fieldErrors] of Object.entries(newErrors)) {
      const stepMap = new Map<string, string>();
      for (const [field, msg] of Object.entries(fieldErrors as Record<string, string>)) {
        stepMap.set(field, msg);
      }
      if (stepMap.size > 0) this.errorsMap.set(stepId as StepId, stepMap);
    }
    this.state = { ...this.state, errors: newErrors };
    this.notify();
  }

  setStepErrors(
    stepId: StepId,
    errors: Record<string, string> | undefined | null
  ) {
    if (!errors || Object.keys(errors).length === 0) {
      if (this.errorsMap.has(stepId)) {
        this.errorsMap.delete(stepId);
        this.syncErrors();
        return true;
      }
      return false;
    }

    const stepMap = new Map<string, string>();
    for (const [field, msg] of Object.entries(errors)) {
      stepMap.set(field, msg);
    }
    this.errorsMap.set(stepId, stepMap);

    this.syncErrors();
    return true;
  }

  deleteError(stepId: StepId, path: string): boolean {
    const stepErrors = this.errorsMap.get(stepId);
    if (!stepErrors) return false;

    if (stepErrors.has(path)) {
      stepErrors.delete(path);
      if (stepErrors.size === 0) {
        this.errorsMap.delete(stepId);
      }
      this.syncErrors();
      return true;
    }
    return false;
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  injectPersistence(adapter: IPersistenceAdapter) {
    this.persistenceAdapter = adapter;
  }

  hydrate() {
    if (!this.persistenceAdapter) return;
    
    console.log("[WizardStore] 🔄 Hydrating data from persistence...");
    
    let latestTimestamp = -1;
    let latestData: T | null = null;
    let hasHydrated = false;
    
    const config = this.state.config;

    // Iterate all steps to find the latest snapshot
    config.steps.forEach(step => {
        const adapter = step.persistenceAdapter || this.persistenceAdapter;
        if (!adapter) return;

        try {
            // Use getStepWithMeta if available, otherwise fallback
            let candidateData: T | undefined;
            let candidateTimestamp = 0;

            if (adapter.getStepWithMeta) {
                const result = adapter.getStepWithMeta<T>(step.id);
                if (result) {
                    candidateData = result.data;
                    candidateTimestamp = result.timestamp;
                }
            } else {
                // Fallback for adapters not implementing getStepWithMeta
                candidateData = adapter.getStep<T>(step.id);
                // If we found data but no timestamp, we treat it as "old" (0) or maybe ignore?
                // We'll treat it as 0. 
            }

            if (candidateData) {
                if (candidateTimestamp >= latestTimestamp) {
                    latestTimestamp = candidateTimestamp;
                    latestData = candidateData;
                    hasHydrated = true;
                }
            }
        } catch (e) {
            console.warn(`[WizardStore] ⚠️ Failed to hydrate step ${step.id}:`, e);
        }
    });

    if (hasHydrated && latestData) {
        console.log(`[WizardStore] 📦 Final hydrated data (from ts: ${latestTimestamp}):`, latestData);
        // Replace current data with the latest snapshot
        this.updateBulkData(latestData, { replace: true });
    }
  }

  clearStepStorage(stepId: string) {
      const step = this.stepsMap.get(stepId) || this.state.config.steps.find(s => s.id === stepId);
      const adapter = step?.persistenceAdapter || this.persistenceAdapter;
      if (adapter && adapter.clearStep) {
          adapter.clearStep(stepId);
      }
  }

  save(stepId?: StepId) {
    // If specific step requested
    if (stepId) {
        this.saveStepData(stepId);
        return;
    }

    // If no stepId, save current step
    if (this.state.currentStepId) {
        this.saveStepData(this.state.currentStepId);
    }
  }

  private saveStepData(stepId: string) {
      const step = this.stepsMap.get(stepId) || this.state.config.steps.find(s => s.id === stepId);
      if (!step) return;

      const adapter = step.persistenceAdapter || this.persistenceAdapter;
      if (!adapter) return; // No adapter configured

      // Check mode
      // Priority: Step Config -> Global Config -> Default 'onStepChange'
      const mode = step.persistenceMode || this.state.config.persistence?.mode || 'onStepChange';
       // We only save here if explicitly called (manual force) OR called by internal logic that checked mode
      
      console.log(`[WizardStore] 💾 Saving data for step ${stepId} (mode: ${mode})`, this.state.data);
      adapter.saveStep(stepId, this.state.data);
  }

  private handleStepChangePersistence(stepId: string) {
      const step = this.stepsMap.get(stepId) || this.state.config.steps.find(s => s.id === stepId);
      if (!step) return;

      const mode = step.persistenceMode || this.state.config.persistence?.mode || 'onStepChange';
      if (mode === 'onStepChange') {
          this.saveStepData(stepId);
      }
  }

  // Internal helper to handle auto-save on data change
  private checkAutoSave(_changedPaths: string[]) {
      const { config, currentStepId } = this.state;
      if (!currentStepId) return;

      const step = this.stepsMap.get(currentStepId) || config.steps.find(s => s.id === currentStepId);
      if (!step) return;

      const mode = step.persistenceMode || config.persistence?.mode || 'onStepChange';
      if (mode !== 'onChange') return;

      // Debounce logic
      const debounceTime = config.persistence?.debounceTime ?? 300;
      
      const timerKey = currentStepId;
      if (this.persistenceDebounceTimers.has(timerKey)) {
          clearTimeout(this.persistenceDebounceTimers.get(timerKey));
      }

      this.persistenceDebounceTimers.set(timerKey, setTimeout(() => {
          this.saveStepData(currentStepId);
      }, debounceTime));
  }
}
