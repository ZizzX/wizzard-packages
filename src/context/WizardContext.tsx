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
  IPersistenceAdapter,
  IStepConfig,
  IWizardContext,
  IWizardState,
  IWizardActions,
  IWizardStore,
  WizardEventHandler,
} from "../types";
import { WizardStore } from "../store/WizardStore";
import { MemoryAdapter } from "../adapters/persistence/MemoryAdapter";
import { getByPath, setByPath } from "../utils/data";

const WizardStateContext = createContext<IWizardState<any, any> | undefined>(
  undefined
);
const WizardActionsContext = createContext<IWizardActions<any> | undefined>(
  undefined
);
const WizardStoreContext = createContext<IWizardStore<any, any> | undefined>(
  undefined
);

interface WizardProviderProps<T, StepId extends string> {
  config: IWizardConfig<T, StepId>;
  initialData?: T;
  initialStepId?: StepId;
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
  // 1. Core State & Config
  const [localConfig, setLocalConfig] =
    useState<IWizardConfig<T, StepId>>(config);

  // 2. Store & Persistence
  const storeRef = useRef<WizardStore<T, StepId>>(
    null as unknown as WizardStore<T, StepId>
  );

  // Initialize store with persisted data if available
  if (!storeRef.current) {
    storeRef.current = new WizardStore<T, StepId>(
      (initialData || {}) as T,
      config.middlewares
    );
  }

  const isInitialized = useRef(false);

  const persistenceAdapter = useMemo<IPersistenceAdapter>(() => {
    // Use explicitly provided adapter or fallback to MemoryAdapter
    return localConfig.persistence?.adapter || new MemoryAdapter();
  }, [localConfig.persistence?.adapter]);

  const persistenceMode = localConfig.persistence?.mode || "onStepChange";
  const META_KEY = "__wizzard_meta__";

  // 3. Reactive Store Values (Subscription)
  const snapshot = useSyncExternalStore(
    storeRef.current.subscribe,
    storeRef.current.getSnapshot
  );

  const {
    activeSteps,
    currentStepId,
    history,
    visitedSteps,
    completedSteps,
    data,
    errors: {},
  } = snapshot;

  // 4. Stable Helpers (Mapping)
  const stepsMap = useMemo(() => {
    const map = new Map<StepId, IStepConfig<T, StepId>>();
    localConfig.steps.forEach((step: IStepConfig<T, StepId>) =>
      map.set(step.id, step)
    );
    return map;
  }, [localConfig.steps]);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  // Directional navigation requires some indexes
  const activeStepsIndexMap = useMemo(() => {
    const map = new Map<StepId, number>();
    activeSteps.forEach((s: IStepConfig<T, StepId>, i: number) =>
      map.set(s.id, i)
    );
    return map;
  }, [activeSteps]);

  // 5. Actions Reference (Stable)
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

  // Validation Debounce Ref
  const validationDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
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
  });

  // Cleanup Debounce
  useEffect(() => {
    return () => {
      if (validationDebounceRef.current) {
        clearTimeout(validationDebounceRef.current);
      }
    };
  }, []);

  // Analytics
  const trackEvent = useCallback<WizardEventHandler<StepId>>(
    (name, payload) => {
      localConfig.analytics?.onEvent(name, payload as any);
    },
    [localConfig.analytics]
  );

  // Helper wrapper for store method
  const resolveActiveStepsHelper = useCallback(
    (data: T) => storeRef.current.resolveActiveSteps(data),
    []
  );

  const validateStep = useCallback(
    (stepId: StepId) => storeRef.current.validateStep(stepId),
    []
  );

  const goToStep = useCallback(
    async (
      stepId: StepId,
      providedActiveSteps?: IStepConfig<T, StepId>[],
      options: { validate?: boolean } = { validate: true }
    ): Promise<boolean> => {
      return storeRef.current.goToStep(stepId, {
        validate: options.validate,
        providedActiveSteps,
      });
    },
    []
  );

  const goToNextStep = useCallback(async () => {
    const { currentStepId } = stateRef.current;
    if (!currentStepId) return;

    const currentData = storeRef.current.getSnapshot().data;
    const step = stepsMap.get(currentStepId as StepId);

    // 1. Validate CURRENT step first
    const shouldVal =
      step?.autoValidate ??
      localConfig.autoValidate ??
      !!step?.validationAdapter;

    if (shouldVal) {
      const ok = await validateStep(currentStepId as StepId);
      if (!ok) return;
    }

    // 2. Resolve active steps ONLY if validation passed
    const resolvedSteps = await resolveActiveStepsHelper(currentData);
    const idx = resolvedSteps.findIndex((s) => s.id === currentStepId);

    if (idx !== -1 && idx < resolvedSteps.length - 1) {
      const nextStepId = resolvedSteps[idx + 1].id;
      // Pass { validate: false } because we ALREADY validated above
      const success = await goToStep(nextStepId, resolvedSteps, {
        validate: false,
      });
      if (success) {
        // Logic: Mark as completed ONLY if validation passed (already checked above)
        // AND no current errors for this step.
        const currentSnapshot = storeRef.current.getSnapshot();
        if (!currentSnapshot.errorSteps.has(currentStepId as StepId)) {
          const nextComp = new Set(currentSnapshot.completedSteps);
          nextComp.add(currentStepId as StepId);
          storeRef.current.dispatch({
            type: "SET_COMPLETED_STEPS",
            payload: { steps: nextComp },
          });
        }
      }
    }
  }, [goToStep, resolveActiveStepsHelper, validateStep, stepsMap]);

  const goToPrevStep = useCallback(async () => {
    const { currentStepId, activeSteps, activeStepsIndexMap } =
      stateRef.current;
    const idx = activeStepsIndexMap.get(currentStepId as StepId) ?? -1;
    if (idx > 0) await goToStep(activeSteps[idx - 1].id);
  }, [goToStep]);

  const handleStepDependencies = useCallback(
    (paths: string[], initialData: any) => {
      let currentData = { ...initialData };
      let allClearedPaths = new Set<string>();
      const { completedSteps, visitedSteps } = storeRef.current.getSnapshot();
      let nextComp = new Set(completedSteps);
      let nextVis = new Set(visitedSteps);
      let statusChanged = false;

      const processDependencies = (changedPaths: string[]) => {
        let newlyClearedPaths: string[] = [];

        localConfig.steps.forEach((step) => {
          const isDependent = step.dependsOn?.some((p) =>
            changedPaths.some(
              (path) =>
                path === p ||
                p.startsWith(path + ".") ||
                path.startsWith(p + ".")
            )
          );

          if (isDependent) {
            if (nextComp.delete(step.id as StepId)) {
              statusChanged = true;
            }
            if (nextVis.delete(step.id as StepId)) {
              statusChanged = true;
            }

            if (step.clearData) {
              if (typeof step.clearData === "function") {
                const patch = step.clearData(currentData, changedPaths);
                Object.keys(patch).forEach((key) => {
                  if (currentData[key] !== patch[key]) {
                    currentData[key] = patch[key];
                    newlyClearedPaths.push(key);
                    allClearedPaths.add(key);
                  }
                });
              } else {
                const pathsToClear = Array.isArray(step.clearData)
                  ? step.clearData
                  : [step.clearData];
                pathsToClear.forEach((p) => {
                  const val = getByPath(currentData, p);
                  if (val !== undefined) {
                    currentData = setByPath(currentData, p, undefined);
                    newlyClearedPaths.push(p);
                    allClearedPaths.add(p);
                  }
                });
              }
            }
          }
        });

        if (newlyClearedPaths.length > 0) {
          processDependencies(newlyClearedPaths);
        }
      };

      processDependencies(paths);

      if (statusChanged) {
        storeRef.current.dispatch({
          type: "SET_COMPLETED_STEPS",
          payload: { steps: nextComp },
        });
        storeRef.current.dispatch({
          type: "SET_VISITED_STEPS",
          payload: { steps: nextVis },
        });
      }

      return {
        newData: currentData,
        hasClearing: allClearedPaths.size > 0,
        clearedPaths: Array.from(allClearedPaths),
      };
    },
    [localConfig.steps]
  );

  const setData = useCallback(
    (path: keyof T, value: any, options?: { debounceValidation?: number }) => {
      const { stepsMap, currentStepId } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      if (getByPath(prevData, path as string) === value) return;

      const baseData = setByPath(prevData, path as string, value);
      const { newData, hasClearing } = handleStepDependencies(
        [path as string],
        baseData
      );

      if (!hasClearing) {
        storeRef.current.dispatch({
          type: "SET_DATA",
          payload: {
            path: path as string,
            value,
            options: { ...options, __from_set_data__: true },
          },
        });
      } else {
        storeRef.current.dispatch({
          type: "UPDATE_DATA",
          payload: {
            data: newData,
            options: { replace: true, __from_set_data__: true, path },
          },
        });
      }

      if (currentStepId) {
        storeRef.current.deleteError(currentStepId, path as string);
        const step = stepsMap.get(currentStepId as StepId);
        if (
          (step?.validationMode ||
            localConfig.validationMode ||
            "onStepChange") === "onChange"
        ) {
          const debounceMs =
            options?.debounceValidation ??
            localConfig.validationDebounceTime ??
            300;
          if (validationDebounceRef.current) {
            clearTimeout(validationDebounceRef.current);
          }
          validationDebounceRef.current = setTimeout(() => {
            validateStep(currentStepId as StepId);
          }, debounceMs);
        }
      }
    },
    [localConfig, validateStep, handleStepDependencies]
  );

  const updateData = useCallback(
    (data: Partial<T>, options?: { replace?: boolean; persist?: boolean }) => {
      const prev = storeRef.current.getSnapshot().data;
      const baseData = options?.replace ? (data as T) : { ...prev, ...data };

      const { newData } = handleStepDependencies(Object.keys(data), baseData);

      storeRef.current.update(newData, Object.keys(data));
      if (options?.persist) {
        if (storeRef.current.save) {
          storeRef.current.save(
            storeRef.current.getSnapshot().currentStepId as StepId
          );
        }
      }
    },
    [handleStepDependencies]
  );

  const reset = useCallback(() => {
    storeRef.current.setInitialData(initialData || ({} as T));
    storeRef.current.update((initialData || {}) as T);
    storeRef.current.updateErrors({} as Record<StepId, Record<string, string>>);
    storeRef.current.dispatch({
      type: "SET_VISITED_STEPS",
      payload: { steps: new Set() },
    });
    storeRef.current.dispatch({
      type: "SET_COMPLETED_STEPS",
      payload: { steps: new Set() },
    });
    storeRef.current.dispatch({
      type: "SET_ERROR_STEPS",
      payload: { steps: new Set() },
    });
    if (activeSteps.length > 0) {
      const startId = activeSteps[0].id;
      storeRef.current.dispatch({
        type: "SET_CURRENT_STEP_ID",
        payload: { stepId: startId },
      });
      storeRef.current.dispatch({
        type: "SET_HISTORY",
        payload: { history: [startId] },
      });
    } else {
      storeRef.current.dispatch({
        type: "SET_CURRENT_STEP_ID",
        payload: { stepId: "" },
      });
      storeRef.current.dispatch({
        type: "SET_HISTORY",
        payload: { history: [] },
      });
    }
    persistenceAdapter.clear();
    trackEvent("wizard_reset", { data: initialData } as any);
  }, [initialData, activeSteps, persistenceAdapter, trackEvent]);

  // 7. Context Values
  const stateValue = useMemo<IWizardState<T, StepId>>(
    () => ({
      ...snapshot,
      config: localConfig,
    }),
    [snapshot, localConfig]
  );

  const actionsValue = useMemo<IWizardActions<StepId>>(
    () => ({
      goToNextStep,
      goToPrevStep,
      goToStep,
      setStepData: (_stepId: StepId, data: any) => {
        const next = { ...storeRef.current.getSnapshot().data, ...data };
        storeRef.current.update(next, Object.keys(data));
      },
      handleStepChange: (f: keyof T, v: any) => {
        if (stateRef.current.currentStepId) setData(f, v);
      },
      validateStep: (sid: StepId) => validateStep(sid),
      validateAll: async () => {
        storeRef.current.updateMeta({ isBusy: true });
        const data = storeRef.current.getSnapshot().data;
        const active = await resolveActiveStepsHelper(data);
        const results = await Promise.all(
          active.map((s) => validateStep(s.id))
        );
        storeRef.current.updateMeta({ isBusy: false });
        return {
          isValid: results.every(Boolean),
          errors: storeRef.current.getSnapshot().errors,
        };
      },
      save: (ids?: StepId | StepId[] | boolean) => {
        if (ids === true) {
          // Save all active steps? Or just current?
          // Store.save() without args saves current.
          // If true, maybe save all?
          // For now, let's map to existing behavior if possible, or just support current step.
          // The original expected saving ALL steps?
          // "localConfig.steps.forEach((s) => saveData("manual", s.id as StepId, data))"
          // We can iterate and call store.save(id)
          localConfig.steps.forEach((s) =>
            storeRef.current.save(s.id as StepId)
          );
        } else if (!ids) {
          storeRef.current.save();
        } else {
          (Array.isArray(ids) ? ids : [ids]).forEach((id) =>
            storeRef.current.save(id as StepId)
          );
        }
      },
      clearStorage: () => persistenceAdapter.clear(),
      reset,
      setData,
      updateData,
      getData: (p: string, d?: any) =>
        getByPath(storeRef.current.getSnapshot().data, p, d),
      updateConfig: (nc: any) => setLocalConfig((prev) => ({ ...prev, ...nc })),
    }),
    [
      goToNextStep,
      goToPrevStep,
      goToStep,
      validateStep,
      reset,
      setData,
      updateData,
      persistenceAdapter,
      localConfig.steps,
    ]
  );

  // 8. Lifecycle & Initialization
  useEffect(() => {
    if (!isInitialized.current) {
      storeRef.current.injectPersistence(persistenceAdapter);
      storeRef.current.dispatch({
        type: "INIT",
        payload: { data: initialData || ({} as T), config: localConfig },
      });
      storeRef.current.hydrate();
      isInitialized.current = true;
    } else {
      // Sync config if it changes, but don't reset data
      storeRef.current.updateMeta({ config: localConfig });
    }
  }, [initialData, localConfig]);

  // Handle Dynamic Steps Resolution (Debounced)
  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(async () => {
      const resolved = await resolveActiveStepsHelper(data);
      if (isMounted) {
        storeRef.current.dispatch({
          type: "SET_ACTIVE_STEPS",
          payload: { steps: resolved },
        });
      }
    }, 200); // 200ms debounce

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [data, resolveActiveStepsHelper]);

  const hasHydratedRef = useRef(false);

  // Initial Step Selection and Hydration
  useEffect(() => {
    if (hasHydratedRef.current) return;
    hasHydratedRef.current = true;

    // Basic Hydration from storage
    const meta = persistenceAdapter.getStep<{
      currentStepId: string;
      visited: string[];
      completed: string[];
      history: string[];
    }>(META_KEY);
    if (meta) {
      if (meta.currentStepId) {
        storeRef.current.dispatch({
          type: "SET_CURRENT_STEP_ID",
          payload: { stepId: meta.currentStepId as StepId },
        });
      }
      if (meta.visited)
        storeRef.current.dispatch({
          type: "SET_VISITED_STEPS",
          payload: { steps: new Set(meta.visited as StepId[]) },
        });
      if (meta.completed)
        storeRef.current.dispatch({
          type: "SET_COMPLETED_STEPS",
          payload: { steps: new Set(meta.completed as StepId[]) },
        });
      if (meta.history) {
        storeRef.current.dispatch({
          type: "SET_HISTORY",
          payload: { history: meta.history as StepId[] },
        });
      }
    }

    const currentSnapshot = storeRef.current.getSnapshot();
    const currentActiveSteps = currentSnapshot.activeSteps;

    if (!currentSnapshot.currentStepId && currentActiveSteps.length > 0) {
      const startId =
        initialStepId && currentActiveSteps.some((s) => s.id === initialStepId)
          ? initialStepId
          : currentActiveSteps[0].id;

      storeRef.current.dispatch({
        type: "SET_CURRENT_STEP_ID",
        payload: { stepId: startId },
      });

      if (currentSnapshot.history.length === 0) {
        storeRef.current.dispatch({
          type: "SET_HISTORY",
          payload: { history: [startId] },
        });
      }

      // Mark initial step as visited
      const currentVisited = new Set(currentSnapshot.visitedSteps);
      if (!currentVisited.has(startId)) {
        currentVisited.add(startId);
        storeRef.current.dispatch({
          type: "SET_VISITED_STEPS",
          payload: { steps: currentVisited },
        });
      }
    }

    // Always reset isLoading once activeSteps are resolved
    if (currentActiveSteps.length > 0 && currentSnapshot.isLoading) {
      storeRef.current.updateMeta({ isLoading: false });
    }
  }, [activeSteps, initialStepId, persistenceAdapter]); // Removed currentStepId dependency as we use snapshot inside

  return (
    <WizardStoreContext.Provider value={storeRef.current}>
      <WizardStateContext.Provider value={stateValue}>
        <WizardActionsContext.Provider value={actionsValue}>
          {children}
        </WizardActionsContext.Provider>
      </WizardStateContext.Provider>
    </WizardStoreContext.Provider>
  );
}

export function useWizardState<
  T = unknown,
  StepId extends string = string,
>(): IWizardState<T, StepId> {
  const context = useContext(WizardStateContext);
  if (!context)
    throw new Error("useWizardState must be used within a WizardProvider");
  return context as IWizardState<T, StepId>;
}

export function useWizardValue<TValue = any>(
  path: string,
  options?: { isEqual?: (a: TValue, b: TValue) => boolean }
): TValue {
  const store = useContext(WizardStoreContext);
  if (!store)
    throw new Error("useWizardValue must be used within a WizardProvider");
  const lastStateRef = useRef<any>(null);
  const lastValueRef = useRef<any>(null);
  const getSnapshot = useCallback(() => {
    const data = store.getSnapshot().data;
    if (data === lastStateRef.current) return lastValueRef.current;
    const value = getByPath(data, path) as TValue;
    if (
      lastValueRef.current !== undefined &&
      (options?.isEqual || Object.is)(lastValueRef.current, value)
    ) {
      lastStateRef.current = data;
      return lastValueRef.current;
    }
    lastStateRef.current = data;
    lastValueRef.current = value;
    return value;
  }, [store, path, options?.isEqual]);
  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardError(path: string): string | undefined {
  const store = useContext(WizardStoreContext);
  if (!store)
    throw new Error("useWizardError must be used within a WizardProvider");
  const getSnapshot = useCallback(() => {
    const errors = store.getSnapshot().errors;
    for (const [stepId, stepErrors] of Object.entries(errors)) {
      const typed = stepErrors as Record<string, string>;
      if (typed[path]) return typed[path];
      if (path.startsWith(stepId + ".") && typed[stepId]) return typed[stepId];
      const last = path.split(".").pop();
      if (last && typed[last]) return typed[last];
    }
    return undefined;
  }, [store, path]);
  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardSelector<TSelected = any>(
  selector: (state: any) => TSelected,
  options?: { isEqual?: (a: TSelected, b: TSelected) => boolean }
): TSelected {
  const store = useContext(WizardStoreContext);
  if (!store)
    throw new Error("useWizardSelector must be used within a WizardProvider");

  // Only cache the result, not the selector or state
  const lastResultRef = useRef<TSelected | null>(null);

  const getSnapshot = useCallback(() => {
    const full = store.getSnapshot();
    const res = selector(full);

    // Check if result is the same using custom equality or Object.is
    if (
      lastResultRef.current !== null &&
      (options?.isEqual || Object.is)(lastResultRef.current, res)
    ) {
      // Result is the same, return cached result to maintain reference equality
      return lastResultRef.current;
    }

    // Update ref with new value
    lastResultRef.current = res;
    return res;
  }, [store, selector, options?.isEqual]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
}

export function useWizardActions<
  StepId extends string = string,
>(): IWizardActions<StepId> {
  const context = useContext(WizardActionsContext);
  if (!context)
    throw new Error("useWizardActions must be used within a WizardProvider");
  return context as IWizardActions<StepId>;
}

export function useWizardContext<
  T = any,
  StepId extends string = string,
>(): IWizardContext<T, StepId> {
  const state = useWizardState<T, StepId>();
  const actions = useWizardActions<StepId>();
  const store = useContext(WizardStoreContext) as IWizardStore<T, StepId>;
  const data = useWizardSelector((s: IWizardState<T, StepId>) => s.data);
  const allErrors = useWizardSelector((s: IWizardState<T, StepId>) => s.errors);
  const errors = useMemo(() => {
    const flat: Record<string, string> = {};
    Object.values(allErrors).forEach((stepErrors) => {
      Object.assign(flat, stepErrors as Record<string, string>);
    });
    return flat;
  }, [allErrors]);

  const { data: _d, errors: _e, ...stateProps } = state;
  return useMemo(
    () => ({
      ...stateProps,
      ...actions,
      data,
      allErrors,
      errors,
      store,
    }),
    [stateProps, actions, data, allErrors, errors, store]
  ) as IWizardContext<T, StepId>;
}
