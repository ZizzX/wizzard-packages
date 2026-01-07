import { getByPath, setByPath } from "../utils/data";
import type {
  IWizardStore,
  IWizardState,
  WizardAction,
  WizardMiddleware,
  MiddlewareAPI,
  IPersistenceAdapter
} from "../types";

/**
 * Core event-driven store for managing wizard state, data, and navigation.
 * 
 * @template T Type of the global wizard data object
 * @template StepId String union of valid step IDs
 */
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
   * Processes an action through the middleware chain and updates the state.
   * This is the primary way to trigger any state change in the wizard.
   * 
   * @param action The action to perform
   */
  dispatch(action: WizardAction<T, StepId>) {
    this.middlewareChain(action);
  }

  /**
   * Internal dispatch that actually performs the state updates
   */
  private internalDispatch(action: WizardAction<T, StepId>) {
    console.log(`[WizardStore] ⚡ Action: ${action.type}`, (action as any).payload?.steps ? `Steps: ${Array.from((action as any).payload.steps)}` : "");
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
        this.saveMeta();
        break;
      case 'SET_COMPLETED_STEPS':
        this.state = { ...this.state, completedSteps: action.payload.steps };
        this.saveMeta();
        break;
      case 'RESTORE_SNAPSHOT':
        this.state = { ...action.payload.snapshot };
        this.saveMeta();
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

  /**
   * Returns the current immutable snapshot of the wizard state.
   */
  getSnapshot = () => {
    return this.state;
  };

  /**
   * Performs a granular data update at a specific path.
   * Automatically calculates dirty fields and triggers auto-save if configured.
   * 
   * @param newData Full new data object
   * @param changedPath Path(s) that were modified
   */
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

  /**
   * Sets the initial data for the wizard.
   * Resets dirty tracking based on this new data.
   */
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

  /**
   * Restores wizard state from persistence storage.
   * Implements "latest wins" conflict resolution based on step timestamps.
   */
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

  private saveMeta() {
    const config = this.state.config;
    const persistenceMode = config.persistence?.mode || 'onStepChange';
    if (persistenceMode !== "manual" && this.persistenceAdapter) {
      this.persistenceAdapter.saveStep("__wizzard_meta__", {
        currentStepId: this.state.currentStepId,
        visited: Array.from(this.state.visitedSteps),
        completed: Array.from(this.state.completedSteps),
        history: this.state.history,
      });
    }
  }

  clearStepStorage(stepId: string) {
    const step = this.stepsMap.get(stepId) || this.state.config.steps.find(s => s.id === stepId);
    const adapter = step?.persistenceAdapter || this.persistenceAdapter;
    if (adapter && adapter.clearStep) {
      adapter.clearStep(stepId);
    }
  }

  /**
   * Manually triggers data persistence for specific steps or the current step.
   * 
   * @param stepId Optional ID of step to save. If omitted, saves current step.
   */
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

  // Caching for condition resolution
  private conditionCache = new Map<StepId, { result: boolean; depsValues: any[] }>();

  /**
   * Evaluates visibility conditions for all steps and returns only those that should be active.
   * Uses memoization to avoid redundant async calls if dependencies haven't changed.
   * 
   * @param data Optional data override for evaluation
   */
  async resolveActiveSteps(data?: T): Promise<import("../types").IStepConfig<T, StepId>[]> {
    const currentData = data || this.state.data;
    const config = this.state.config;

    this.updateMeta({ isBusy: true });
    try {
      const steps = config.steps || [];
      const results = await Promise.all(
        steps.map(async (step) => {
          if (!step.condition) return { step, ok: true };

          // Optimization: Memoized Condition Resolution
          if (step.conditionDependsOn) {
            const currentDepsValues = step.conditionDependsOn.map((path) =>
              getByPath(currentData, path)
            );
            const cached = this.conditionCache.get(step.id);

            if (
              cached &&
              cached.depsValues.length === currentDepsValues.length &&
              cached.depsValues.every(
                (val, idx) => val === currentDepsValues[idx]
              )
            ) {
              return { step, ok: cached.result };
            }

            // If not cached or deps changed, resolve and cache
            try {
              const res = step.condition(
                currentData || ({} as T),
                this.getSnapshot()
              );
              const ok = res instanceof Promise ? await res : res;
              this.conditionCache.set(step.id, {
                result: ok,
                depsValues: currentDepsValues,
              });
              return { step, ok };
            } catch (e) {
              console.error(`[Wizard] Condition failed for ${step.id}:`, e);
              return { step, ok: false };
            }
          }

          // Fallback: Default behavior (always resolve if no deps specified)
          const nextBusyStart = new Set(this.state.busySteps);
          nextBusyStart.add(step.id as StepId);
          this.updateMeta({
            busySteps: nextBusyStart,
            isBusy: true,
          });

          try {
            const res = step.condition(
              currentData || ({} as T),
              this.getSnapshot()
            );
            const ok = res instanceof Promise ? await res : res;
            return { step, ok };
          } catch (e) {
            console.error(`[Wizard] Condition failed for ${step.id}:`, e);
            return { step, ok: false };
          } finally {
            const currentSnapshot = this.getSnapshot();
            const nextBusyEnd = new Set(currentSnapshot.busySteps);
            nextBusyEnd.delete(step.id as StepId);
            this.updateMeta({
              busySteps: nextBusyEnd,
              isBusy: nextBusyEnd.size > 0,
            });
          }
        })
      );
      return results.filter((r) => r.ok).map((r) => r.step);
    } finally {
      const currentSnapshot = this.getSnapshot();
      if (currentSnapshot.busySteps.size === 0) {
        this.updateMeta({ isBusy: false });
      }
    }
  }
  async validateStep(stepId: StepId): Promise<boolean> {
    const steps = this.state.config.steps || [];
    const step = this.stepsMap.get(stepId) || steps.find((s: any) => s.id === stepId);
    if (!step || !step.validationAdapter) return true;

    this.dispatch({ type: "VALIDATE_START", payload: { stepId } });

    let isValid = true;
    try {
      const result = await step.validationAdapter.validate(this.state.data);
      isValid = result.isValid;

      if (result.isValid) {
        this.setStepErrors(stepId, null);
        const nextErrorSteps = new Set(this.state.errorSteps);
        nextErrorSteps.delete(stepId);
        this.dispatch({
          type: "SET_ERROR_STEPS",
          payload: { steps: nextErrorSteps },
        });
        return true;
      } else {
        this.setStepErrors(stepId, result.errors || null);

        if (this.state.config.analytics?.onEvent) {
          this.state.config.analytics.onEvent("validation_error", {
            stepId,
            errors: result.errors,
            timestamp: Date.now(),
          } as any);
        }

        const nextErrorSteps = new Set(this.state.errorSteps);
        nextErrorSteps.add(stepId);
        this.dispatch({
          type: "SET_ERROR_STEPS",
          payload: { steps: nextErrorSteps },
        });

        // Ensure it's removed from completed if it has errors
        const nextCompleted = new Set(this.state.completedSteps);
        if (nextCompleted.has(stepId)) {
          nextCompleted.delete(stepId);
          this.dispatch({
            type: "SET_COMPLETED_STEPS",
            payload: { steps: nextCompleted },
          });
        }

        return false;
      }
    } finally {
      this.dispatch({
        type: "VALIDATE_END",
        payload: { stepId, result: { isValid } } as any,
      });
    }
  }
  async goToStep(
    stepId: StepId,
    options: { validate?: boolean; providedActiveSteps?: import("../types").IStepConfig<T, StepId>[] } = { validate: true }
  ): Promise<boolean> {
    const {
      currentStepId,
      config,
      data: currentData
    } = this.state;

    const allSteps = config.steps || [];
    const currentIdx = allSteps.findIndex((s: any) => s.id === currentStepId);
    const targetIdx = allSteps.findIndex((s: any) => s.id === stepId);

    // 1. Validate Current Step if moving forward
    if (targetIdx > currentIdx && currentStepId && options.validate) {
      const step = this.stepsMap.get(currentStepId) || allSteps.find((s: any) => s.id === currentStepId);
      const shouldVal =
        step?.autoValidate ??
        config.autoValidate ??
        !!step?.validationAdapter;

      if (shouldVal) {
        const ok = await this.validateStep(currentStepId);
        if (!ok) return false;
      }
    }

    this.updateMeta({ isBusy: true });
    try {
      // 2. Resolve Active Steps
      const resolvedSteps =
        options.providedActiveSteps || (await this.resolveActiveSteps(currentData));
      const target = resolvedSteps.find((s) => s.id === stepId);
      if (!target) return false;

      // 3. Check Navigation Permissions
      // Priority: Step-level canNavigateTo > Global navigationMode
      if (target.canNavigateTo) {
        const snapshot = this.getSnapshot();
        const canNavigate = await target.canNavigateTo(currentData, snapshot);
        if (!canNavigate) {
          console.warn(`[WizardStore] Navigation to step "${stepId}" blocked by canNavigateTo function`);
          return false;
        }
      } else {
        // Fallback to global navigationMode
        const navigationMode = config.navigationMode || 'visited';
        const currentSnapshot = this.getSnapshot();
        const currentIndex = resolvedSteps.findIndex(s => s.id === currentStepId);
        const targetIndex = resolvedSteps.findIndex(s => s.id === stepId);
        const isAdjacent = Math.abs(targetIndex - currentIndex) === 1;

        // Check navigation permissions based on mode
        if (stepId !== currentStepId) {
          switch (navigationMode) {
            case 'sequential':
              // Sequential: ONLY adjacent steps (strict linear flow)
              if (!isAdjacent) {
                console.warn(`[WizardStore] Navigation to step "${stepId}" blocked: sequential mode allows only adjacent steps`);
                return false;
              }
              break;

            case 'visited':
              // Visited: adjacent steps OR visited/completed steps
              const isVisitedOrCompleted =
                currentSnapshot.visitedSteps.has(stepId) ||
                currentSnapshot.completedSteps.has(stepId);

              if (!isAdjacent && !isVisitedOrCompleted) {
                console.warn(`[WizardStore] Navigation to step "${stepId}" blocked: step not visited or completed`);
                return false;
              }
              break;

            case 'free':
              // Free mode: allow navigation to any step
              break;
          }
        }
      }

      // 4. Guards (beforeLeave)
      const step = this.stepsMap.get(currentStepId) || allSteps.find((s: any) => s.id === currentStepId);
      if (step?.beforeLeave) {
        const snapshot = this.getSnapshot();
        const direction = targetIdx > currentIdx ? "next" : "prev";
        const ok = await step.beforeLeave(currentData, direction, snapshot);
        if (ok === false) return false;
      }

      const currentSnapshot = this.getSnapshot();
      const nextVisited = new Set(currentSnapshot.visitedSteps);
      // Mark previous step as visited
      if (currentStepId) nextVisited.add(currentStepId);
      // Mark new step as visited (on entry)
      nextVisited.add(stepId);

      this.dispatch({
        type: "SET_VISITED_STEPS",
        payload: { steps: nextVisited },
      });

      this.dispatch({
        type: "SET_CURRENT_STEP_ID",
        payload: { stepId },
      });

      const nextHistory = [...currentSnapshot.history, stepId];
      this.dispatch({
        type: "SET_HISTORY",
        payload: { history: nextHistory },
      });

      // Meta persistence
      this.saveMeta();

      if (config.onStepChange) {
        config.onStepChange(currentStepId || null, stepId, currentData);
      }

      if (config.analytics?.onEvent) {
        config.analytics.onEvent("step_change", {
          from: (currentStepId || null) as any,
          to: stepId,
          timestamp: Date.now(),
        } as any);
      }

      return true;
    } finally {
      this.updateMeta({ isBusy: false });
    }
  }
}
