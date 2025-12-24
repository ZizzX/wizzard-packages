import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useSyncExternalStore,
  useRef,
  useTransition,
} from "react";
import type {
  IWizardConfig,
  PersistenceMode,
  IPersistenceAdapter,
  IStepConfig,
  IWizardContext,
} from "../types";
import { MemoryAdapter } from "../adapters/persistence/MemoryAdapter";
import { getByPath, setByPath } from "../utils/data";

export interface IWizardState<T = unknown, StepId extends string = string> {
  currentStep: IStepConfig<unknown, T, StepId> | null;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  isPending: boolean;
  activeSteps: IStepConfig<unknown, T, StepId>[];
  visitedSteps: Set<StepId>;
  completedSteps: Set<StepId>;
  errorSteps: Set<StepId>;
  store: WizardStore<T>;
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
  save: () => void;
  clearStorage: () => void;
  setData: (
    path: string,
    value: unknown,
    options?: { debounceValidation?: number }
  ) => void;
  updateData: (data: Partial<any>, options?: { replace?: boolean }) => void;
  getData: (path: string, defaultValue?: unknown) => unknown;
}

const WizardStateContext = createContext<IWizardState<any, any> | undefined>(
  undefined
);
const WizardActionsContext = createContext<IWizardActions<any> | undefined>(
  undefined
);

// Advanced: Store for granular subscriptions
export class WizardStore<T> {
  private state: { data: T; errors: Record<string, Record<string, string>> };
  private listeners: Set<() => void> = new Set();

  constructor(initialData: T) {
    this.state = { data: initialData, errors: {} };
  }

  getSnapshot = () => this.state;

  update(newData: T) {
    this.state = { ...this.state, data: newData };
    this.notify();
  }

  updateErrors(newErrors: Record<string, Record<string, string>>) {
    this.state = { ...this.state, errors: newErrors };
    this.notify();
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

export function WizardProvider<T extends Record<string, any>, StepId extends string = string>({
  config,
  initialData,
  initialStepId,
  children,
}: WizardProviderProps<T, StepId>) {
  const [currentStepId, setCurrentStepId] = useState<StepId | "">("");
  // Optimize: Keep ref to currentStepId to avoid recreating setData on every step change
  const currentStepIdRef = useRef<StepId | "">(currentStepId);
  useEffect(() => {
    currentStepIdRef.current = currentStepId;
  }, [currentStepId]);

  const [visitedSteps, setVisitedSteps] = useState<Set<StepId>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<StepId>>(new Set());
  const [errorSteps, setErrorSteps] = useState<Set<StepId>>(new Set());
  const [, setAllErrorsState] = useState<
    Record<string, Record<string, string>>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  // Store for granular data and errors
  const storeRef = useRef(new WizardStore<T>((initialData || {}) as T));

  // local state for dependencies
  const [wizardData, setWizardData] = useState<T>((initialData || {}) as T);

  // Persistence Setup
  const persistenceAdapter = useMemo<IPersistenceAdapter>(() => {
    return config.persistence?.adapter || new MemoryAdapter();
  }, [config.persistence?.adapter]);

  const persistenceMode = config.persistence?.mode || "onStepChange";

  // Calculate Active Steps (Conditional Logic) - Stabilized to prevent global re-renders
  // --- Optimization: Sync Active Steps Calculation ---
  // We use a ref to track the last calculated steps to ensure referential strictness
  const lastActiveStepsRef = useRef<IStepConfig<unknown, T, StepId>[]>([]);
  
  const activeSteps = useMemo(() => {
    const nextActiveSteps = config.steps.filter((step) => {
      if (step.condition) {
        return step.condition(wizardData);
      }
      return true;
    });

    // Check if structure changed (ids match) - shallow check optimized for step stability
    const prevIds = lastActiveStepsRef.current.map(s => s.id).join('.');
    const nextIds = nextActiveSteps.map(s => s.id).join('.');

    if (prevIds === nextIds && lastActiveStepsRef.current.length > 0) {
       return lastActiveStepsRef.current;
    }

    lastActiveStepsRef.current = nextActiveSteps;
    return nextActiveSteps;
  }, [config.steps, wizardData]);

  // Set initial step if not set (with optional initialStepId)
  useEffect(() => {
    if (!currentStepId && activeSteps.length > 0) {
      if (initialStepId) {
        // Validation: verify initialStepId exists in active steps
        const target = activeSteps.find((s) => s.id === initialStepId);
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
    config,
    activeSteps,
    visitedSteps,
    completedSteps,
    persistenceMode,
    persistenceAdapter,
    currentStepId
  });

  // Update ref on every render - this is fast
  stateRef.current = {
    config,
    activeSteps,
    visitedSteps,
    completedSteps,
    persistenceMode,
    persistenceAdapter,
    currentStepId
  };

  // Derived state
  const currentStep = useMemo(
    () => activeSteps.find((s) => s.id === currentStepId) || null,
    [activeSteps, currentStepId]
  );
  const currentStepIndex = useMemo(
    () => activeSteps.findIndex((s) => s.id === currentStepId),
    [activeSteps, currentStepId]
  );
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === activeSteps.length - 1;

  // Constants
  const META_KEY = "__wizzard_meta__";

  // Hydration Helper
  // Hydration Helper
  const hydrate = useCallback(() => {
    setIsLoading(true);
    const { persistenceAdapter, config } = stateRef.current;

    const metaFn = persistenceAdapter.getStep<{
      currentStepId: string;
      visited: string[];
      completed: string[];
    }>(META_KEY);

    if (metaFn) {
      if (metaFn.currentStepId) setCurrentStepId(metaFn.currentStepId as StepId);
      if (metaFn.visited) setVisitedSteps(new Set(metaFn.visited as StepId[]));
      if (metaFn.completed) setCompletedSteps(new Set(metaFn.completed as StepId[]));
    }

    const loadedData: Partial<T> = {};
    config.steps.forEach((step) => {
      const stepData = persistenceAdapter.getStep(step.id);
      if (stepData) {
        Object.assign(loadedData, stepData);
      }
    });

    if (Object.keys(loadedData).length > 0) {
      setWizardData((prev) => {
        const newData = { ...prev, ...loadedData };
        storeRef.current.update(newData);
        return newData;
      });
    }
    setIsLoading(false);
  }, []); // Empty dependency array!

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Save logic stabilized
  // Save logic stabilized
  const saveData = useCallback(
    (mode: PersistenceMode, stepId: string, data: any) => {
      const { config, persistenceAdapter, persistenceMode } = stateRef.current;
      const stepConfig = config.steps.find((s) => s.id === stepId);
      const stepAdapter = stepConfig?.persistenceAdapter;
      const adapterToUse = stepAdapter || persistenceAdapter;

      if (mode === persistenceMode || mode === "manual") {
        adapterToUse.saveStep(stepId, data);
      }
    },
    [] 
  );

  // Debounce timeout for validation
  const validationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const validateStep = useCallback(
    async (stepId: StepId, data: T): Promise<boolean> => {
      const { config } = stateRef.current;
      const step = config.steps.find((s) => s.id === stepId);
      if (!step || !step.validationAdapter) {
        return true;
      }

      const result = await step.validationAdapter.validate(data);

      if (!result.isValid) {
        const newAllErrors = {
          ...storeRef.current.getSnapshot().errors,
          [stepId]: result.errors || {},
        };
        storeRef.current.updateErrors(newAllErrors);
        setAllErrorsState(newAllErrors);
        setErrorSteps((prev) => {
          const next = new Set(prev);
          next.add(stepId);
          return next;
        });
        return false;
      } else {
        const newAllErrors = { ...storeRef.current.getSnapshot().errors };
        delete newAllErrors[stepId];
        storeRef.current.updateErrors(newAllErrors);
        setAllErrorsState(newAllErrors);
        setErrorSteps((prev) => {
          const next = new Set(prev);
          next.delete(stepId);
          return next;
        });
        return true;
      }
    },
    []
  );

  // Actions stabilized with useCallback
  const setStepData = useCallback(
    (stepId: StepId, data: any) => {
      const { persistenceMode } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      const newData = { ...prevData, ...data };

      storeRef.current.update(newData);
      startTransition(() => {
        setWizardData(newData);
      });

      if (persistenceMode === "onChange") {
        saveData("onChange", stepId, newData);
      }
    },
    [saveData]
  );

  const setData = useCallback(
    (path: string, value: any, options?: { debounceValidation?: number }) => {
      const { persistenceMode } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      
      const currentValue = getByPath(prevData, path);
      if (currentValue === value) return;

      const newData = setByPath(prevData, path, value);

      storeRef.current.update(newData);
      startTransition(() => {
        setWizardData(newData);
      });

      // Stable capture of ID and Config
      const activeStepId = stateRef.current.currentStepId;
      const { config } = stateRef.current;

      // Determine Validation Mode
      // Priority: Step Config > Global Config > 'onChange' (default)
      const stepConfig = config.steps.find(s => s.id === activeStepId);
      const mode = stepConfig?.validationMode ?? config.validationMode ?? 'onChange'; // Default to onChange for backward compat if undefined

      // 3. Conditional Validation Logic
      if (mode === 'onChange') {
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
      // strict check: recursive validation or manual trigger only for other modes

      if (persistenceMode === "onChange" && activeStepId) {
        saveData("onChange", activeStepId as StepId, newData);
      }
    },
    [saveData, validateStep]
  );

  const updateData = useCallback(
    (data: Partial<T>, options?: { replace?: boolean }) => {
      const { config } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      const newData = options?.replace ? (data as T) : { ...prevData, ...data };

      storeRef.current.update(newData);
      startTransition(() => {
        setWizardData(newData);
      });

      config.steps.forEach((step) => {
        saveData("manual", step.id, newData);
      });
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
    const { activeSteps } = stateRef.current;
    
    // Optimization: Parallel validation
    const currentData = storeRef.current.getSnapshot().data;
    const validationResults = await Promise.all(
        activeSteps.map(step => validateStep(step.id, currentData))
    );
    
    const isValid = validationResults.every(Boolean);
    const finalErrors = storeRef.current.getSnapshot().errors;
    return { isValid, errors: finalErrors };
  }, [validateStep]);

  const goToStep = useCallback(
    async (stepId: StepId): Promise<boolean> => {
      const { 
          activeSteps, 
          currentStepId, 
          config, 
          persistenceMode, 
          visitedSteps, 
          completedSteps, 
          persistenceAdapter 
      } = stateRef.current;

      const targetIndex = activeSteps.findIndex((s) => s.id === stepId);
      if (targetIndex === -1) return false;

      const currentData = storeRef.current.getSnapshot().data;
      const currentStepIndex = activeSteps.findIndex(s => s.id === currentStepId);
      const currentStep = activeSteps[currentStepIndex];

      if (targetIndex > currentStepIndex) {
        const shouldValidate =
          currentStep?.autoValidate ?? config.autoValidate ?? true;
        if (shouldValidate && currentStepId) {
          const isValid = await validateStep(currentStepId as StepId, currentData);
          if (!isValid) return false;
        }
      }

      if (persistenceMode === "onStepChange" && currentStep && currentStepId) {
        saveData("onStepChange", currentStepId as StepId, currentData);
      }

      const nextVisited = new Set(visitedSteps);
      if (currentStepId) nextVisited.add(currentStepId as StepId);
      
      setVisitedSteps(nextVisited);
      setCurrentStepId(stepId);

      if (persistenceMode !== "manual") {
        persistenceAdapter.saveStep(META_KEY, {
          currentStepId: stepId,
          visited: Array.from(nextVisited),
          completed: Array.from(completedSteps),
        });
      }

      // Lifecycle Callback
      if (config.onStepChange) {
        config.onStepChange(currentStepId || null, stepId, currentData); // Call hook
      }

      window.scrollTo(0, 0);
      return true;
    },
    [saveData, validateStep]
  );
  
  const goToNextStep = useCallback(async () => {
    const { activeSteps, currentStepId, completedSteps, visitedSteps, persistenceMode, persistenceAdapter } = stateRef.current;
    const currentStepIndex = activeSteps.findIndex(s => s.id === currentStepId);
    
    if (currentStepIndex === -1 || currentStepIndex === activeSteps.length - 1) return;
    
    const nextStep = activeSteps[currentStepIndex + 1];
    if (nextStep) {
      const success = await goToStep(nextStep.id);
      if (success) {
        const nextCompleted = new Set(completedSteps).add(currentStepId as StepId);
        setCompletedSteps(nextCompleted);

        if (persistenceMode !== "manual") {
          persistenceAdapter.saveStep(META_KEY, {
            currentStepId: nextStep.id,
            visited: Array.from(new Set(visitedSteps).add(currentStepId as StepId)),
            completed: Array.from(nextCompleted),
          });
        }
      }
    }
  }, [goToStep]); // Only depends on goToStep (which is stable)

  const goToPrevStep = useCallback(() => {
    const { activeSteps, currentStepId } = stateRef.current;
    const currentStepIndex = activeSteps.findIndex(s => s.id === currentStepId);
    if (currentStepIndex <= 0) return;
    const prevStep = activeSteps[currentStepIndex - 1];
    if (prevStep) {
      goToStep(prevStep.id);
    }
  }, [goToStep]);

  const clearStorage = useCallback(() => {
     stateRef.current.persistenceAdapter.clear();
  }, []);

  const save = useCallback(
    () =>
      saveData("manual", stateRef.current.currentStepId as StepId, storeRef.current.getSnapshot().data),
    [saveData]
  );

  // Split values
  const stateValue = useMemo<IWizardState<T, StepId>>(
    () => ({
      currentStep,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      isLoading,
      isPending,
      activeSteps,
      visitedSteps,
      completedSteps,
      errorSteps,
      store: storeRef.current,
    }),
    [
      currentStep,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      isLoading,
      isPending,
      activeSteps,
      visitedSteps,
      completedSteps,
      errorSteps,
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
      setData,
      updateData,
      getData,
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
      setData,
      updateData,
      getData,
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

export function useWizardState<T = unknown, StepId extends string = string>(): IWizardState<T, StepId> {
  const context = useContext(WizardStateContext);
  if (!context) {
    throw new Error("useWizardState must be used within a WizardProvider");
  }
  return context as IWizardState<T, StepId>;
}

export function useWizardValue<TValue = any>(path: string): TValue {
  const { store } = useWizardState();
  const lastStateRef = useRef<any>(null);
  const lastValueRef = useRef<any>(null);

  const getSnapshot = useCallback(() => {
    const fullState = store.getSnapshot();
    const data = fullState.data;
    if (data === lastStateRef.current) {
      return lastValueRef.current;
    }
    const value = getByPath(data, path);
    lastStateRef.current = data;
    lastValueRef.current = value;
    return value;
  }, [store, path]);

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

    // Flatten errors from all steps or use a specific step?
    // Usually validation results are nested like { children: { "0.name": "error" } }
    // but the adapter flattened them to "children.0.name"
    let foundError: string | undefined;
    Object.values(errors).forEach((stepErrors) => {
      const typedStepErrors = stepErrors as Record<string, string>;
      if (typedStepErrors[path]) foundError = typedStepErrors[path];
    });

    lastStateRef.current = errors;
    lastValueRef.current = foundError;
    return foundError;
  }, [store, path]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardSelector<TSelected = any>(
  selector: (state: any) => TSelected
): TSelected {
  const { store } = useWizardState();
  const lastStateRef = useRef<any>(null);
  const lastResultRef = useRef<any>(null);

  const getSnapshot = useCallback(() => {
    const fullState = store.getSnapshot();
    if (fullState === lastStateRef.current) {
      return lastResultRef.current;
    }
    // We pass only data to the selector for convenience, or the whole store state?
    // Let's pass the whole thing in case they need errors
    const result = selector(fullState.data);
    lastStateRef.current = fullState;
    lastResultRef.current = result;
    return result;
  }, [store, selector]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardActions<StepId extends string = string>(): IWizardActions<StepId> {
  const context = useContext(WizardActionsContext);
  if (!context) {
    throw new Error("useWizardActions must be used within a WizardProvider");
  }
  return context as IWizardActions<StepId>;
}

export function useWizardContext<T = any, StepId extends string = string>(): IWizardContext<T, StepId> & {
  store: WizardStore<T>;
} {
  const state = useWizardState<T, StepId>();
  const actions = useWizardActions<StepId>();

  // Backward compatibility: subscribe to everything
  const wizardData = useWizardSelector<T>((s) => s as T);
  const fullState = state.store.getSnapshot();

  return useMemo(
    () => ({
      ...state,
      ...actions,
      wizardData,
      allErrors: fullState.errors,
    }),
    [state, actions, wizardData, fullState.errors]
  );
}
