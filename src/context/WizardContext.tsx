import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useSyncExternalStore,
  useRef,
} from "react";
import type {
  IWizardConfig,
  PersistenceMode,
  IPersistenceAdapter,
  IStepConfig,
  IWizardContext,
  IBreadcrumb,
  BreadcrumbStatus,
} from "../types";
import { MemoryAdapter } from "../adapters/persistence/MemoryAdapter";
import { getByPath, setByPath } from "../utils/data";

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
  store: WizardStore<T, StepId>;
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

const WizardStateContext = createContext<IWizardState<any, any> | undefined>(
  undefined
);
const WizardActionsContext = createContext<IWizardActions<any> | undefined>(
  undefined
);

// Advanced: Store for granular subscriptions
export class WizardStore<T, StepId extends string = string> {
  private initialData: T;
  private dirtyFields = new Set<string>();
  private state: {
    data: T;
    errors: Record<string, Record<string, string>>;
    isDirty: boolean;
    dirtyFields: Set<string>;
    meta: Partial<IWizardState<T, StepId>> & {
      wizardData?: T;
      allErrors?: any;
    }; // Combined view support
  };
  private listeners = new Set<() => void>();
  errorsMap = new Map<string, Map<string, string>>();

  constructor(initialData: T) {
    this.initialData = JSON.parse(JSON.stringify(initialData)); // Deep copy
    this.state = {
      data: initialData,
      errors: {},
      isDirty: false,
      dirtyFields: this.dirtyFields,
      meta: {},
    };
  }

  getSnapshot() {
    return this.state;
  }

  update(newData: T, changedPath?: string) {
    if (changedPath) {
      const initialValue = getByPath(this.initialData, changedPath);
      const newValue = getByPath(newData, changedPath);

      if (JSON.stringify(initialValue) !== JSON.stringify(newValue)) {
        this.dirtyFields.add(changedPath);
      } else {
        this.dirtyFields.delete(changedPath);
      }
    }

    this.state = {
      ...this.state,
      data: newData,
      isDirty: this.dirtyFields.size > 0,
      dirtyFields: new Set(this.dirtyFields),
      meta: this.state.meta, // Preserve meta
    };
    this.updateCombinedState();
    this.notify();
  }

  updateMeta(newMeta: Partial<IWizardState<T, StepId>>) {
    this.state = {
      ...this.state,
      meta: { ...this.state.meta, ...newMeta },
    };
    this.updateCombinedState();
    this.notify();
  }

  // Helper to ensure 'meta' contains everything for selectors
  private updateCombinedState() {
    // We inject data and errors into "meta" so it looks like IWizardContext
    // This allows selectors to grab everything.
    // We mutate the existing meta object or create new one?
    // For Referencing stability, we create new reference for 'meta' only if needed.
    Object.assign(this.state.meta, {
      wizardData: this.state.data,
      allErrors: this.state.errors,
      isDirty: this.state.isDirty,
      dirtyFields: this.state.dirtyFields,
    });
  }

  // Set initial data (e.g. after hydration or successful save)
  setInitialData(data: T) {
    this.initialData = JSON.parse(JSON.stringify(data));
    this.dirtyFields.clear();
    this.state = {
      ...this.state,
      data,
      isDirty: false,
      dirtyFields: new Set(),
      meta: this.state.meta,
    };
    this.updateCombinedState();
    this.notify();
  }

  // Sync internal Map to external Object (for backward compat)
  private syncErrors() {
    const newErrorsObj: Record<string, Record<string, string>> = {};
    for (const [stepId, fieldErrors] of this.errorsMap.entries()) {
      if (fieldErrors.size > 0) {
        newErrorsObj[stepId] = Object.fromEntries(fieldErrors);
      }
    }
    this.state = { ...this.state, errors: newErrorsObj };
    this.updateCombinedState();
    this.notify();
  }

  // Update from Object (Legacy/State setter)
  updateErrors(newErrors: Record<string, Record<string, string>>) {
    // Re-build Map to stay in sync
    this.errorsMap.clear();
    for (const [stepId, fieldErrors] of Object.entries(newErrors)) {
      const stepMap = new Map<string, string>();
      for (const [field, msg] of Object.entries(fieldErrors)) {
        stepMap.set(field, msg);
      }
      if (stepMap.size > 0) this.errorsMap.set(stepId, stepMap);
    }
    this.state = { ...this.state, errors: newErrors };
    this.updateCombinedState();
    this.notify();
  }

  // Optimize: Update Step Errors directly (O(1) Map updated, then Sync)
  setStepErrors(
    stepId: string,
    errors: Record<string, string> | undefined | null
  ) {
    if (!errors || Object.keys(errors).length === 0) {
      if (this.errorsMap.has(stepId)) {
        this.errorsMap.delete(stepId);
        this.syncErrors();
        return true; // changed
      }
      return false;
    }

    // Update Map
    const stepMap = new Map<string, string>();
    for (const [field, msg] of Object.entries(errors)) {
      stepMap.set(field, msg);
    }
    this.errorsMap.set(stepId, stepMap);

    this.syncErrors();
    return true;
  }

  // Fast Delete (O(1))
  deleteError(stepId: string, path: string): boolean {
    const stepErrors = this.errorsMap.get(stepId);
    if (!stepErrors) return false;

    if (stepErrors.has(path)) {
      stepErrors.delete(path);
      if (stepErrors.size === 0) {
        this.errorsMap.delete(stepId);
      }
      // Sync to object for public state
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
}

interface WizardProviderProps<T, StepId extends string> {
  config: IWizardConfig<T, StepId>;
  initialData?: T;
  initialStepId?: StepId; // New: Start from any step
  children: React.ReactNode;
}

export function WizardProvider<
  T extends Record<string, any>,
  StepId extends string = string,
>({
  config,
  initialData,
  initialStepId,
  children,
}: WizardProviderProps<T, StepId>) {
  const [localConfig, setLocalConfig] =
    useState<IWizardConfig<T, StepId>>(config);
  const [currentStepId, setCurrentStepId] = useState<StepId | "">("");
  // Optimize: Keep ref to currentStepId to avoid recreating setData on every step change
  const currentStepIdRef = useRef<StepId | "">(currentStepId);
  useEffect(() => {
    currentStepIdRef.current = currentStepId;
  }, [currentStepId]);

  // Store for granular data and errors
  const storeRef = useRef(new WizardStore<T, StepId>((initialData || {}) as T));

  const [visitedSteps, setVisitedSteps] = useState<Set<StepId>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<StepId>>(new Set());
  const [errorSteps, setErrorSteps] = useState<Set<StepId>>(new Set());
  const allErrors = useSyncExternalStore(
    storeRef.current.subscribe,
    () => storeRef.current.getSnapshot().errors
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [busySteps, setBusySteps] = useState<Set<StepId>>(new Set());

  const isDirty = useSyncExternalStore(
    storeRef.current.subscribe,
    () => storeRef.current.getSnapshot().isDirty
  );

  const dirtyFields = useSyncExternalStore(
    storeRef.current.subscribe,
    () => storeRef.current.getSnapshot().dirtyFields
  );

  const [history, setHistory] = useState<StepId[]>([]);

  // Initialize history with the first step
  useEffect(() => {
    if (currentStepId && history.length === 0) {
      setHistory([currentStepId]);
    }
  }, [currentStepId, history.length]);

  // Persistence Setup
  const persistenceAdapter = useMemo<IPersistenceAdapter>(() => {
    return localConfig.persistence?.adapter || new MemoryAdapter();
  }, [localConfig.persistence?.adapter]);

  const persistenceMode = localConfig.persistence?.mode || "onStepChange";

  const currentSnapshotData = useSyncExternalStore(
    storeRef.current.subscribe,
    () => storeRef.current.getSnapshot().data
  );

  // --- Optimization: Static Step Map ---
  const stepsMap = useMemo(() => {
    const map = new Map<StepId, IStepConfig<T, StepId>>();
    localConfig.steps.forEach((step: IStepConfig<T, StepId>) =>
      map.set(step.id, step)
    );
    return map;
  }, [localConfig.steps]);

  // We use a ref to track the last calculated steps to ensure referential strictness

  // Optimized: Calculate Active Steps reactively from the store
  const [asyncActiveSteps, setAsyncActiveSteps] = useState<
    IStepConfig<T, StepId>[]
  >(() => {
    // Initial sync filter to avoid empty steps flash during hydration/initial render
    return localConfig.steps.filter((step) => {
      if (!step.condition) return true;
      try {
        const res = step.condition((initialData || {}) as T);
        return res === true; // Only include if explicitly true (synchronously)
      } catch {
        return false;
      }
    }) as IStepConfig<T, StepId>[];
  });

  // Helper for actual active steps calculation (used in effects and actions)
  const resolveActiveStepsHelper = useCallback(
    async (data: T): Promise<IStepConfig<T, StepId>[]> => {
      setIsBusy(true);
      try {
        const results = await Promise.all(
          localConfig.steps.map(async (step) => {
            if (!step.condition) return { step, ok: true, pending: false };

            // Mark as busy for granular tracking
            setBusySteps((prev) => new Set(prev).add(step.id as StepId));

            try {
              const conditionResult = step.condition(data || {});

              if (conditionResult instanceof Promise) {
                // If it's a promise and showWhilePending is true, we might want to return it as visible but pending
                if (step.showWhilePending) {
                  const ok = await conditionResult;
                  return { step, ok, pending: false };
                } else {
                  // Default: hide while pending
                  const ok = await conditionResult;
                  return { step, ok, pending: false };
                }
              }

              return { step, ok: conditionResult, pending: false };
            } catch (e) {
              console.error(
                `[Wizard] Condition failed for step ${step.id}:`,
                e
              );
              return { step, ok: false, pending: false };
            } finally {
              setBusySteps((prev) => {
                const next = new Set(prev);
                next.delete(step.id as StepId);
                return next;
              });
            }
          })
        );

        return results.filter((r) => r.ok).map((r) => r.step) as IStepConfig<
          T,
          StepId
        >[];
      } finally {
        setIsBusy(false);
      }
    },
    [localConfig.steps]
  );

  useEffect(() => {
    let active = true;

    const resolveActiveSteps = async () => {
      const filtered = await resolveActiveStepsHelper(currentSnapshotData);

      if (active) {
        // Stability check
        const nextIds = filtered.map((s) => s.id).join(".");
        const prevIds = asyncActiveSteps.map((s) => s.id).join(".");
        if (nextIds !== prevIds) {
          setAsyncActiveSteps(filtered);
        }
      }
    };

    resolveActiveSteps();
    return () => {
      active = false;
    };
  }, [resolveActiveStepsHelper, currentSnapshotData]); // Removed asyncActiveSteps from deps to avoid loop

  const activeSteps = asyncActiveSteps;

  const activeStepsIndexMap = useMemo(() => {
    const map = new Map<StepId, number>();
    activeSteps.forEach((s: IStepConfig<T, StepId>, i: number) =>
      map.set(s.id, i)
    );
    return map;
  }, [activeSteps]);

  // Set initial step if not set (with optional initialStepId)
  useEffect(() => {
    if (!currentStepId && activeSteps.length > 0) {
      if (initialStepId) {
        // Validation: verify initialStepId exists in active steps
        const target = activeSteps.find(
          (s: IStepConfig<T, StepId>) => s.id === initialStepId
        );
        if (target) {
          setCurrentStepId(target.id);
        } else {
          // Fallback if initial is invalid/hidden
          setCurrentStepId(activeSteps[0].id);
        }
      } else {
        setCurrentStepId(activeSteps[0].id);
      }
      setIsLoading(false);
    }
  }, [activeSteps, currentStepId, initialStepId]);

  // --- Optimization: Stable State Reference ---
  // We hold all "changing" values in a ref so actions can remain stable
  const stateRef = useRef({
    config: localConfig,
    stepsMap,
    activeSteps,
    activeStepsIndexMap,
    visitedSteps,
    completedSteps,
    persistenceMode,
    persistenceAdapter,
    currentStepId,
    history,
  });

  // Update ref on every render - this is fast
  stateRef.current = {
    config: localConfig,
    stepsMap,
    activeSteps,
    activeStepsIndexMap,
    visitedSteps,
    completedSteps,
    persistenceMode,
    persistenceAdapter,
    currentStepId,
    history,
  };

  // Breadcrumbs
  const breadcrumbs = useMemo<IBreadcrumb<StepId>[]>(() => {
    return activeSteps.map((step) => {
      let status: BreadcrumbStatus = "future";
      if (step.id === currentStepId) {
        status = "current";
      } else if (completedSteps.has(step.id)) {
        status = "visited";
      } else if (visitedSteps.has(step.id)) {
        status = "visited";
      }
      return { id: step.id, label: step.label, status };
    });
  }, [activeSteps, currentStepId, visitedSteps, completedSteps]);

  // --- Optimization: Sync UI State to Store for Selectors ---
  useEffect(() => {
    storeRef.current.updateMeta({
      config: localConfig,
      currentStep: stepsMap.get(currentStepId as StepId) || null,
      currentStepIndex: activeStepsIndexMap.get(currentStepId as StepId) ?? -1,
      isFirstStep: activeStepsIndexMap.get(currentStepId as StepId) === 0,
      isLastStep:
        activeStepsIndexMap.get(currentStepId as StepId) ===
        activeSteps.length - 1,
      isLoading,
      isPending: false,
      activeSteps,
      visitedSteps,
      completedSteps,
      errorSteps,
      history,
      busySteps,
      isBusy,
      breadcrumbs, // Derived
      activeStepsCount: activeSteps.length,
    });
  }, [
    localConfig,
    currentStepId,
    isLoading,
    activeSteps,
    visitedSteps,
    completedSteps,
    errorSteps,
    history,
    busySteps,
    isBusy,
    stepsMap,
    activeStepsIndexMap,
    breadcrumbs,
  ]);

  // Derived state
  const currentStep = useMemo(
    () => stepsMap.get(currentStepId as StepId) || null,
    [stepsMap, currentStepId]
  );
  const currentStepIndex = useMemo(
    () => activeStepsIndexMap.get(currentStepId as StepId) ?? -1,
    [activeStepsIndexMap, currentStepId]
  );
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === activeSteps.length - 1;

  // Analytics helper
  const trackEvent = useCallback(
    (name: string, payload: any) => {
      localConfig.analytics?.onEvent(name, payload);
    },
    [localConfig.analytics]
  );

  // Constants
  const META_KEY = "__wizzard_meta__";

  // Hydration Helper
  const hydrate = useCallback(() => {
    setIsLoading(true);
    const { persistenceAdapter } = stateRef.current;

    const metaFn = persistenceAdapter.getStep<{
      currentStepId: string;
      visited: string[];
      completed: string[];
      history: string[];
    }>(META_KEY);

    if (metaFn) {
      if (metaFn.currentStepId)
        setCurrentStepId(metaFn.currentStepId as StepId);
      if (metaFn.visited) setVisitedSteps(new Set(metaFn.visited as StepId[]));
      if (metaFn.completed)
        setCompletedSteps(new Set(metaFn.completed as StepId[]));
      if (metaFn.history) setHistory(metaFn.history as StepId[]);
    }

    const loadedData: Partial<T> = {};
    localConfig.steps.forEach((step) => {
      const stepData = persistenceAdapter.getStep(step.id);
      if (stepData) {
        Object.assign(loadedData, stepData);
      }
    });

    if (Object.keys(loadedData).length > 0) {
      const { onConflict } = localConfig;
      const initial = (initialData || {}) as T;

      let finalData: T;
      if (onConflict === "replace") {
        finalData = initial;
      } else if (onConflict === "keep-local") {
        finalData = { ...initial, ...loadedData } as T;
      } else {
        // Default: merge
        finalData = { ...initial, ...loadedData } as T;
      }

      storeRef.current.setInitialData(initial);
      storeRef.current.update(finalData);
    }
    setIsLoading(false);
  }, [localConfig, initialData]);

  useEffect(() => {
    hydrate();
    return () => {
      if (validationTimeoutRef.current)
        clearTimeout(validationTimeoutRef.current);
      if (persistenceTimeoutRef.current)
        clearTimeout(persistenceTimeoutRef.current);
    };
  }, [hydrate]);

  // Save logic stabilized
  const saveData = useCallback(
    (mode: PersistenceMode, stepId: StepId, data: any) => {
      const {
        stepsMap,
        persistenceAdapter,
        persistenceMode: globalMode,
      } = stateRef.current;
      const stepConfig = stepsMap.get(stepId);
      const stepAdapter = stepConfig?.persistenceAdapter;
      const stepMode = stepConfig?.persistenceMode;
      const adapterToUse = stepAdapter || persistenceAdapter;
      const modeToUse = stepMode || globalMode;

      if (mode === modeToUse || mode === "manual") {
        adapterToUse.saveStep(stepId, data);
      }
    },
    []
  );

  // Debounce timeout for validation and persistence
  const validationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const persistenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const validateStep = useCallback(
    async (stepId: StepId, data: T): Promise<boolean> => {
      const { stepsMap } = stateRef.current;
      const step = stepsMap.get(stepId);
      if (!step || !step.validationAdapter) {
        return true;
      }

      setBusySteps((prev) => new Set(prev).add(stepId));
      try {
        const result = await step.validationAdapter.validate(data);

        if (result.isValid) {
          // Clear errors for this step
          const changed = storeRef.current.setStepErrors(stepId, null);

          if (changed) {
            setErrorSteps((prev) => {
              const next = new Set(prev);
              next.delete(stepId);
              return next;
            });
          }
          return true;
        } else {
          // Set errors for this step
          storeRef.current.setStepErrors(stepId, result.errors || null);

          setErrorSteps((prev) => {
            const next = new Set(prev);
            next.add(stepId);
            return next;
          });
          return false;
        }
      } finally {
        setBusySteps((prev) => {
          const next = new Set(prev);
          next.delete(stepId);
          return next;
        });
      }
    },
    [setErrorSteps, setBusySteps]
  );

  // Actions stabilized with useCallback
  const setStepData = useCallback(
    (stepId: StepId, data: any) => {
      const { persistenceMode } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      const newData = { ...prevData, ...data };

      storeRef.current.update(newData);

      const stepConfig = stateRef.current.stepsMap.get(stepId as StepId);
      const effectiveMode = stepConfig?.persistenceMode || persistenceMode;

      if (effectiveMode === "onChange") {
        saveData("onChange", stepId, newData);
      }
    },
    [saveData]
  );

  const setData = useCallback(
    (path: string, value: any, options?: { debounceValidation?: number }) => {
      const { persistenceMode, stepsMap } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;

      const currentValue = getByPath(prevData, path);
      if (currentValue === value) return;

      let newData = setByPath(prevData, path, value);

      // Auto-Invalidation Logic
      localConfig.steps.forEach((step) => {
        if (
          step.dependsOn?.some(
            (depPath) => path === depPath || path.startsWith(depPath + ".")
          )
        ) {
          // Clear step data and visited/completed status
          setCompletedSteps((prev) => {
            const next = new Set(prev);
            next.delete(step.id as StepId);
            return next;
          });
          setVisitedSteps((prev) => {
            const next = new Set(prev);
            next.delete(step.id as StepId);
            return next;
          });

          if (step.clearData) {
            if (typeof step.clearData === "function") {
              const patch = step.clearData(newData);
              newData = { ...newData, ...patch };
            } else {
              const pathsToClear = Array.isArray(step.clearData)
                ? step.clearData
                : [step.clearData];

              pathsToClear.forEach((p) => {
                newData = setByPath(newData, p, undefined);
              });
            }
          }
        }
      });

      storeRef.current.update(newData, path);

      const activeStepId = stateRef.current.currentStepId;
      const stepConfig = stepsMap.get(activeStepId as StepId);

      // 4. Clear Error on Input (UX Improvement + Optimization)
      if (activeStepId) {
        const wasDeleted = storeRef.current.deleteError(activeStepId, path);
        if (wasDeleted) {
          // Check if step is now clean to update errorSteps
          if (!storeRef.current.errorsMap.has(activeStepId)) {
            setErrorSteps((prev) => {
              const next = new Set(prev);
              next.delete(activeStepId);
              return next;
            });
          }
        }
      }

      // Sync React state last - only for errors to update errorSteps
      if (activeStepId && storeRef.current.getSnapshot().errors[activeStepId]) {
        // Error case handled above via store.setStepErrors
      }

      // Determine Validation Mode
      const { config } = stateRef.current;
      const mode =
        stepConfig?.validationMode ?? config.validationMode ?? "onStepChange";

      // 3. Conditional Validation Logic
      if (mode === "onChange") {
        if (options?.debounceValidation) {
          if (validationTimeoutRef.current)
            clearTimeout(validationTimeoutRef.current);
          validationTimeoutRef.current = setTimeout(() => {
            try {
              if (activeStepId) {
                validateStep(activeStepId as StepId, newData).catch((err) => {
                  console.error("[Wizard] Debounced validation failed:", err);
                });
              }
            } catch (e) {
              console.error("[Wizard] Error starting validation:", e);
            }
          }, options.debounceValidation);
        } else {
          if (activeStepId) validateStep(activeStepId as StepId, newData);
        }
      }

      const effectivePersistenceMode =
        stepConfig?.persistenceMode ?? persistenceMode;
      if (effectivePersistenceMode === "onChange" && activeStepId) {
        const debounceTime = config.persistence?.debounceTime ?? 0;

        if (debounceTime > 0) {
          if (persistenceTimeoutRef.current)
            clearTimeout(persistenceTimeoutRef.current);
          persistenceTimeoutRef.current = setTimeout(() => {
            saveData("onChange", activeStepId as StepId, newData);
          }, debounceTime);
        } else {
          saveData("onChange", activeStepId as StepId, newData);
        }
      }
    },
    [saveData, validateStep]
  );

  const updateData = useCallback(
    (data: Partial<T>, options?: { replace?: boolean; persist?: boolean }) => {
      const { config } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      const newData = options?.replace ? (data as T) : { ...prevData, ...data };

      storeRef.current.update(newData);

      if (options?.persist) {
        config.steps.forEach((step) => {
          saveData("manual", step.id, newData);
        });
      }
    },
    [saveData]
  );

  const getData = useCallback((path: string, defaultValue?: any) => {
    return getByPath(storeRef.current.getSnapshot().data, path, defaultValue);
  }, []);

  // Action: Handle specific field change (helper)
  const handleStepChange = useCallback(
    (field: string, value: any) => {
      const { currentStepId } = stateRef.current;
      if (!currentStepId) return;
      setData(field, value);
    },
    [setData]
  );

  const validateAll = useCallback(async (): Promise<{
    isValid: boolean;
    errors: Record<string, Record<string, string>>;
  }> => {
    setIsBusy(true);
    try {
      // CRITICAL: We MUST resolve ACTUAL active steps here because stateRef might be stale
      // if validateAll is called immediately after updateData/setData
      const currentData = storeRef.current.getSnapshot().data;
      const actualActiveSteps = await resolveActiveStepsHelper(currentData);

      // Optimization: Parallel validation
      const validationResults = await Promise.all(
        actualActiveSteps.map((step: IStepConfig<T, StepId>) =>
          validateStep(step.id, currentData)
        )
      );

      const isValid = validationResults.every(Boolean);
      const finalErrors = storeRef.current.getSnapshot().errors;
      return { isValid, errors: finalErrors };
    } finally {
      setIsBusy(false);
    }
  }, [resolveActiveStepsHelper, validateStep]);

  const goToStep = useCallback(
    async (
      stepId: StepId,
      providedActiveSteps?: IStepConfig<T, StepId>[]
    ): Promise<boolean> => {
      const {
        currentStepId,
        config,
        persistenceMode,
        visitedSteps,
        completedSteps,
        persistenceAdapter,
        stepsMap,
      } = stateRef.current;

      const currentData = storeRef.current.getSnapshot().data;

      // 1. Determine direction and validate CURRENT step if going forward
      const allSteps = config.steps;
      const currentIndexInConfig = allSteps.findIndex(
        (s) => s.id === currentStepId
      );
      const targetIndexInConfig = allSteps.findIndex((s) => s.id === stepId);
      const isForward = targetIndexInConfig > currentIndexInConfig;

      if (isForward && currentStepId) {
        const currentStep = stepsMap.get(currentStepId as StepId);
        const shouldValidate =
          currentStep?.autoValidate ?? config.autoValidate ?? false;
        const mode =
          currentStep?.validationMode ??
          config.validationMode ??
          "onStepChange";

        if (
          (shouldValidate || mode === "onStepChange" || mode === "onChange") &&
          currentStepId
        ) {
          const isValid = await validateStep(
            currentStepId as StepId,
            currentData
          );
          if (!isValid) return false;
        }
      }

      setIsBusy(true);
      try {
        // CRITICAL: Resolve actual active steps if not provided
        const actualActiveSteps =
          providedActiveSteps || (await resolveActiveStepsHelper(currentData));

        const targetIndex = actualActiveSteps.findIndex((s) => s.id === stepId);
        if (targetIndex === -1) return false;

        const currentStepIndex = actualActiveSteps.findIndex(
          (s) => s.id === currentStepId
        );
        const currentStep = stepsMap.get(currentStepId as StepId);

        if (targetIndex > currentStepIndex) {
          // --- Guard: beforeLeave ('next') ---
          if (currentStep?.beforeLeave) {
            setBusySteps((prev) => new Set(prev).add(currentStepId as StepId));
            try {
              const canLeave = await currentStep.beforeLeave(
                currentData,
                "next"
              );
              if (canLeave === false) return false;
            } catch (e) {
              console.error("[Wizard] beforeLeave guard failed:", e);
              return false;
            } finally {
              setBusySteps((prev) => {
                const next = new Set(prev);
                next.delete(currentStepId as StepId);
                return next;
              });
            }
          }
        } else if (targetIndex < currentStepIndex) {
          // --- Guard: beforeLeave ('prev') ---
          if (currentStep?.beforeLeave) {
            setBusySteps((prev) => new Set(prev).add(currentStepId as StepId));
            try {
              const canLeave = await currentStep.beforeLeave(
                currentData,
                "prev"
              );
              if (canLeave === false) return false;
            } catch (e) {
              console.error("[Wizard] beforeLeave guard failed:", e);
              return false;
            } finally {
              setBusySteps((prev) => {
                const next = new Set(prev);
                next.delete(currentStepId as StepId);
                return next;
              });
            }
          }
        }
        if (currentStep && currentStepId) {
          const effectivePersistenceMode =
            currentStep.persistenceMode ?? persistenceMode;
          if (effectivePersistenceMode === "onStepChange") {
            saveData("onStepChange", currentStepId as StepId, currentData);
          }
        }

        const nextVisited = new Set(visitedSteps);
        if (currentStepId) nextVisited.add(currentStepId as StepId);

        setVisitedSteps(nextVisited);
        setCurrentStepId(stepId);

        // Use functional update for history to prevent race conditions
        setHistory((prev) => {
          const nextHistory = [...prev, stepId];

          // Persistence move inside state update logic or use a separate effect?
          // For history stability, we calculate it here.
          if (persistenceMode !== "manual") {
            persistenceAdapter.saveStep(META_KEY, {
              currentStepId: stepId,
              visited: Array.from(nextVisited),
              completed: Array.from(completedSteps),
              history: nextHistory,
            });
          }
          return nextHistory;
        });

        // Lifecycle Callback
        if (config.onStepChange) {
          config.onStepChange(currentStepId || null, stepId, currentData); // Call hook
        }

        window.scrollTo(0, 0);
        return true;
      } finally {
        setIsBusy(false);
      }
    },
    [resolveActiveStepsHelper, saveData, validateStep]
  );

  const goToNextStep = useCallback(async () => {
    setIsBusy(true);
    try {
      const {
        currentStepId,
        config,
        persistenceMode,
        visitedSteps,
        completedSteps,
        persistenceAdapter,
        stepsMap,
      } = stateRef.current;

      if (!currentStepId) return;

      const currentData = storeRef.current.getSnapshot().data;
      const currentStep = stepsMap.get(currentStepId as StepId);

      // 1. Validate CURRENT step before doing anything else (async conditions etc)
      const shouldValidate =
        currentStep?.autoValidate ?? config.autoValidate ?? false;
      const mode =
        currentStep?.validationMode ?? config.validationMode ?? "onStepChange";

      if (
        (shouldValidate || mode === "onStepChange" || mode === "onChange") &&
        currentStepId
      ) {
        // validateStep handles its own isBusy internally, but we want to keep the outer isBusy true
        // throughout the whole transition to prevent flickering.
        // However, validateStep sets isBusy(false) at the end.
        // This is tricky. If validateStep sets isBusy(false), it might hide our loader.
        // BUT: since we set isBusy(true) here, if validateStep ALSO sets isBusy(true/false),
        // we might have a conflict or flicker if validateStep finishes before we act.

        // Actually, since we are in a single React render cycle context,
        // if validateStep sets isBusy(false) inside its finally block, it WILL turn off the spinner
        // momentarily.

        // FIX: We should rely on a "global operation" lock or ensure validateStep doesn't turn off
        // isBusy if we are performing a larger operation?

        // Simpler approach: calls to setIsBusy trigger updates.
        // If we call setIsBusy(true) here.
        // Then await validateStep().
        //   Inside validateStep: setIsBusy(true) (no-op if already true?), then finally setIsBusy(false).
        // This setIsBusy(false) WILL turn off the spinner.

        // To fix this properly, we need to AVOID validateStep resetting the flag if we are in a transition.
        // Or we just accept that validateStep is the validation part.

        // Wait, validateStep implementation:
        // const validateStep = useCallback(async ... { setIsBusy(true); try { ... } finally { setIsBusy(false); } })

        // If we call it here, it will turn off busy.
        // Then we proceed to resolvesActiveSteps.
        // Then we call goToStep(next) -> which sets busy(true) again.

        // The "freeze" happens between validateStep completion and goToStep start.

        // Refactor: We need a way to validate WITHOUT touching isBusy, OR we re-assert isBusy(true) immediately.

        const isValid = await validateStep(
          currentStepId as StepId,
          currentData
        );
        if (!isValid) return; // Returns, finally block executes setIsBusy(false)

        // Re-assert busy in case validateStep turned it off
        setIsBusy(true);
      }

      // 2. Resolve actual active steps to handle immediate transitions
      const actualActiveSteps = await resolveActiveStepsHelper(currentData);

      const currentStepIndex = actualActiveSteps.findIndex(
        (s) => s.id === currentStepId
      );

      if (
        currentStepIndex === -1 ||
        currentStepIndex === actualActiveSteps.length - 1
      )
        return;

      const nextStep = actualActiveSteps[currentStepIndex + 1];
      if (nextStep) {
        // goToStep also manages isBusy.
        const success = await goToStep(nextStep.id, actualActiveSteps);
        if (success) {
          const nextCompleted = new Set(completedSteps).add(
            currentStepId as StepId
          );
          setCompletedSteps(nextCompleted);

          if (persistenceMode !== "manual") {
            persistenceAdapter.saveStep(META_KEY, {
              currentStepId: nextStep.id,
              visited: Array.from(
                new Set(visitedSteps).add(currentStepId as StepId)
              ),
              completed: Array.from(nextCompleted),
            });
          }
        }
      }
    } finally {
      setIsBusy(false);
    }
  }, [goToStep, validateStep, resolveActiveStepsHelper]);

  const goToPrevStep = useCallback(() => {
    const { activeSteps, activeStepsIndexMap, currentStepId } =
      stateRef.current;
    const currentStepIndex =
      activeStepsIndexMap.get(currentStepId as StepId) ?? -1;
    if (currentStepIndex <= 0) return;
    const prevStep = activeSteps[currentStepIndex - 1];
    if (prevStep) {
      goToStep(prevStep.id);
    }
  }, [goToStep]);

  const clearStorage = useCallback(() => {
    stateRef.current.persistenceAdapter.clear();
  }, []);

  const reset = useCallback(() => {
    const { persistenceAdapter } = stateRef.current;

    // Clear Store
    storeRef.current.setInitialData(initialData || ({} as T));
    storeRef.current.update((initialData || {}) as T);
    storeRef.current.updateErrors({});

    // Clear Local State
    setVisitedSteps(new Set());
    setCompletedSteps(new Set());
    setErrorSteps(new Set());
    setHistory([]);

    // Reset to first step
    if (activeSteps.length > 0) {
      setCurrentStepId(activeSteps[0].id);
    }

    // Clear Storage
    persistenceAdapter.clear();

    trackEvent("wizard_reset", { data: initialData });
  }, [activeSteps, initialData, trackEvent]);

  const updateConfig = useCallback(
    (newConfig: Partial<IWizardConfig<T, StepId>>) => {
      setLocalConfig((prev) => ({ ...prev, ...newConfig }));
    },
    []
  );

  const save = useCallback(
    (stepIds?: StepId | StepId[] | boolean) => {
      const { config, currentStepId } = stateRef.current;
      const data = storeRef.current.getSnapshot().data;

      if (stepIds === true) {
        config.steps.forEach((step) => {
          saveData("manual", step.id, data);
        });
        return;
      }

      if (!stepIds) {
        if (currentStepId) {
          saveData("manual", currentStepId as StepId, data);
        }
        return;
      }

      const ids = Array.isArray(stepIds) ? stepIds : [stepIds];
      ids.forEach((id) => {
        saveData("manual", id, data);
      });
    },
    [saveData]
  );

  // Split values
  const stateValue = useMemo<IWizardState<T, StepId>>(
    () => ({
      config: localConfig,
      currentStep,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      isLoading,
      isPending: false, // isPending removed
      activeSteps,
      visitedSteps,
      completedSteps,
      errorSteps,
      history,
      busySteps,
      isBusy,
      allErrors,
      isDirty,
      dirtyFields,
      breadcrumbs,
      progress:
        activeSteps.length > 0
          ? Math.round(((currentStepIndex + 1) / activeSteps.length) * 100)
          : 0,
      activeStepsCount: activeSteps.length,
      store: storeRef.current,
    }),
    [
      currentStep,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      isLoading,
      activeSteps,
      visitedSteps,
      completedSteps,
      errorSteps,
      history,
      busySteps,
      isBusy,
      localConfig,
      allErrors,
      isDirty,
      dirtyFields,
      breadcrumbs,
    ]
  );

  const actionsValue = useMemo<IWizardActions<StepId>>(
    () => ({
      goToNextStep,
      goToPrevStep,
      goToStep,
      setStepData: setStepData as (stepId: StepId, data: unknown) => void,
      handleStepChange,
      validateStep: (sid: StepId) =>
        validateStep(sid, storeRef.current.getSnapshot().data),
      validateAll,
      save,
      clearStorage,
      reset,
      setData,
      updateData,
      getData,
      updateConfig,
    }),
    [
      goToNextStep,
      goToPrevStep,
      goToStep,
      setStepData,
      handleStepChange,
      validateStep,
      validateAll,
      save,
      clearStorage,
      reset,
      setData,
      updateData,
      getData,
      updateConfig,
    ]
  );

  return (
    <WizardStateContext.Provider value={stateValue}>
      <WizardActionsContext.Provider value={actionsValue}>
        {children}
      </WizardActionsContext.Provider>
    </WizardStateContext.Provider>
  );
}

export function useWizardState<
  T = unknown,
  StepId extends string = string,
>(): IWizardState<T, StepId> {
  const context = useContext(WizardStateContext);
  if (!context) {
    throw new Error("useWizardState must be used within a WizardProvider");
  }
  return context as IWizardState<T, StepId>;
}

export function useWizardValue<TValue = any>(
  path: string,
  options?: { isEqual?: (a: TValue, b: TValue) => boolean }
): TValue {
  const { store } = useWizardState();
  const lastStateRef = useRef<any>(null);
  const lastValueRef = useRef<any>(null);
  const isEqual = options?.isEqual || Object.is;

  const getSnapshot = useCallback(() => {
    const fullState = store.getSnapshot();
    const data = fullState.data;
    if (data === lastStateRef.current) {
      return lastValueRef.current;
    }
    const value = getByPath(data, path) as TValue;

    // Memoization with custom equality
    if (
      lastValueRef.current !== undefined &&
      isEqual(lastValueRef.current, value)
    ) {
      lastStateRef.current = data;
      return lastValueRef.current;
    }

    lastStateRef.current = data;
    lastValueRef.current = value;
    return value;
  }, [store, path, isEqual]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardError(path: string): string | undefined {
  const { store } = useWizardState();
  const lastStateRef = useRef<any>(null);
  const lastValueRef = useRef<any>(null);

  const getSnapshot = useCallback(() => {
    const fullState = store.getSnapshot();
    const errors = fullState.errors;
    if (errors === lastStateRef.current) {
      return lastValueRef.current;
    }

    // Fast lookup for the path in all steps
    let foundError: string | undefined;

    for (const [stepId, stepErrors] of Object.entries(errors)) {
      const typedStepErrors = stepErrors as Record<string, string>;

      // 1. Exact match (e.g. "security.password")
      if (typedStepErrors[path]) {
        foundError = typedStepErrors[path];
        break;
      }

      // 2. Structural match (e.g. "security.password" matches "security" error in "security" step)
      if (path.startsWith(stepId + ".") && typedStepErrors[stepId]) {
        foundError = typedStepErrors[stepId];
        break;
      }

      // 3. Relative match (e.g. "password" matches "password" error in any step)
      const lastPart = path.split(".").pop();
      if (lastPart && typedStepErrors[lastPart]) {
        foundError = typedStepErrors[lastPart];
        break;
      }
    }

    lastStateRef.current = errors;
    lastValueRef.current = foundError;
    return foundError;
  }, [store, path]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardSelector<TSelected = any>(
  selector: (state: any) => TSelected,
  options?: { isEqual?: (a: TSelected, b: TSelected) => boolean }
): TSelected {
  const { store } = useWizardState();
  const lastStateRef = useRef<any>(null);
  const lastResultRef = useRef<any>(null);
  const isEqual = options?.isEqual || Object.is;

  const getSnapshot = useCallback(() => {
    const fullState = store.getSnapshot();
    if (fullState === lastStateRef.current) {
      return lastResultRef.current;
    }

    // Pass the 'meta' which acts as the Combined State (matches IWizardContext shape minus actions)
    // We cast it to 'any' to allow generic selection, but the factory types will enforce TSchema
    const stateToSelect = fullState.meta || fullState.data;
    const result = selector(stateToSelect);

    // Memoization with custom equality
    if (
      lastResultRef.current !== null &&
      isEqual(lastResultRef.current, result)
    ) {
      lastStateRef.current = fullState;
      return lastResultRef.current;
    }

    lastStateRef.current = fullState;
    lastResultRef.current = result;
    return result;
  }, [store, selector, isEqual]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardActions<
  StepId extends string = string,
>(): IWizardActions<StepId> {
  const context = useContext(WizardActionsContext);
  if (!context) {
    throw new Error("useWizardActions must be used within a WizardProvider");
  }
  return context as IWizardActions<StepId>;
}

export function useWizardContext<
  T = any,
  StepId extends string = string,
>(): IWizardContext<T, StepId> & {
  store: WizardStore<T, StepId>;
} {
  const state = useWizardState<T, StepId>();
  const actions = useWizardActions<StepId>();

  // Backward compatibility: subscribe to everything
  const wizardData = useWizardSelector<T>((s) => s as T);
  const allErrors = useSyncExternalStore(
    state.store.subscribe,
    () => state.store.getSnapshot().errors
  );

  return useMemo(
    () => ({
      ...state,
      ...actions,
      wizardData,
      allErrors,
    }),
    [state, actions, wizardData, allErrors]
  ) as IWizardContext<T, StepId> & { store: WizardStore<T, StepId> };
}
