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

  const setData = useCallback(
    (path: string, value: any, options?: { debounceValidation?: number }) => {
      const { stepsMap, currentStepId } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      if (getByPath(prevData, path) === value) return;

      let newData = setByPath(prevData, path, value);

      // 2. Clear Dependent Data (accumulate changes)
      const dataToUpdate: Record<string, any> = {};

      // Auto-invalidation & Clearing
      localConfig.steps.forEach((step) => {
        if (
          step.dependsOn?.some((p) => path === p || path.startsWith(p + "."))
        ) {
          // Status Reset
          const nextComp = new Set(
            storeRef.current.getSnapshot().completedSteps
          );
          if (nextComp.delete(step.id as StepId)) {
            storeRef.current.dispatch({
              type: "SET_COMPLETED_STEPS",
              payload: { steps: nextComp },
            });
          }
          const nextVis = new Set(storeRef.current.getSnapshot().visitedSteps);
          if (nextVis.delete(step.id as StepId)) {
            storeRef.current.dispatch({
              type: "SET_VISITED_STEPS",
              payload: { steps: nextVis },
            });
          }

          // Data Clearing
          if (step.clearData) {
            if (typeof step.clearData === "function") {
              const patch = step.clearData(newData);
              Object.assign(dataToUpdate, patch);
              newData = { ...newData, ...patch };
            } else {
              const pathsToClear = Array.isArray(step.clearData)
                ? step.clearData
                : [step.clearData];

              pathsToClear.forEach((p) => {
                // Use setByPath to correctly handle nested paths like 'billing.address'
                // We set to undefined in newData for local consistency
                newData = setByPath(newData, p, undefined);
                // We assume clearData paths are root-level or flat for the bulk update partial?
                // Wait, UPDATE_DATA expects Partial<T>.
                // If p is 'nested.prop', { nested: { prop: undefined } } is needed.
                // Simpler approach: Dispatch UPDATE_DATA with the FULL cloned/modified newData
                // But that might be expensive.
                // Let's use setByPath on a partial object? No, setByPath works on objects.
                // Re-strategy: We already have 'newData' which is the FULL updated state.
                // Efficiency: UPDATE_DATA with { replace: true }?
                // Or let UPDATE_DATA handle the merge.
                // 'newData' contains the primary change AND the cleared fields.
                // So we can just dispatch UPDATE_DATA with newData and replace: true?
                // Or better, let's just use the `store.update` method directly or dispatch UPDATE_DATA with the full object derived from newData?
                //
                // Optimization: 'newData' is already the next state.
                // We should use that.
              });
            }
          }
        }
      });

      // 3. atomic dispatch
      // If we cleared data, we must do a full update or smart partial.
      // Since 'newData' has everything correct (primary value + cleared values),
      // we can simply use that unless we want to avoid deep cloning everything again.
      // Given 'newData' was derived from 'prevData' via valid setByPath mutations (which clone path),
      // it's safe to use as the next state.

      // However, WizardStore.UPDATE_DATA payload.data is Partial<T>.
      // We can pass the whole newData and say options: { replace: true } ?
      // Looking at WizardStore.ts:
      // case 'UPDATE_DATA': this.updateBulkData(action.payload.data, action.payload.options);
      // updateBulkData(data, options) -> is replace is true, new data IS data.

      storeRef.current.dispatch({
        type: "UPDATE_DATA",
        payload: {
          data: newData,
          options: { replace: true }, // Important: we already merged everything in newData
        },
      });

      if (currentStepId) {
        storeRef.current.deleteError(currentStepId, path);
        const step = stepsMap.get(currentStepId as StepId);
        // Validation logic
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
        // Persistence handled by store checkAutoSave
      }
    },
    [localConfig, validateStep]
  );

  const updateData = useCallback(
    // updateData logic
    (data: Partial<T>, options?: { replace?: boolean; persist?: boolean }) => {
      console.log("updateData", data);
      const prev = storeRef.current.getSnapshot().data;
      const next = options?.replace ? (data as T) : { ...prev, ...data };
      console.log("updateData next", next);
      storeRef.current.update(next, Object.keys(data));
      if (options?.persist) {
        // Manual persist trigger
        if (storeRef.current.save) {
          storeRef.current.save(
            storeRef.current.getSnapshot().currentStepId as StepId
          );
        }
      }
    },
    [localConfig.steps]
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
      handleStepChange: (f: string, v: any) => {
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

  // Initial Step Selection and Hydration
  useEffect(() => {
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

    if (!currentStepId && currentActiveSteps.length > 0) {
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
      const currentVisited = new Set(
        storeRef.current.getSnapshot().visitedSteps
      );
      if (!currentVisited.has(startId)) {
        currentVisited.add(startId);
        storeRef.current.dispatch({
          type: "SET_VISITED_STEPS",
          payload: { steps: currentVisited },
        });
      }

      storeRef.current.updateMeta({ isLoading: false });
    }
  }, [activeSteps, initialStepId, currentStepId, persistenceAdapter]);

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
