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
  const storeRef = useRef(
    new WizardStore<T, StepId>((initialData || {}) as T, config.middlewares)
  );
  const isInitialized = useRef(false);

  const persistenceAdapter = useMemo<IPersistenceAdapter>(() => {
    return localConfig.persistence?.adapter || new MemoryAdapter();
  }, [localConfig.persistence?.adapter]);

  const persistenceMode = localConfig.persistence?.mode || "onStepChange";
  const META_KEY = "__wizzard_meta__";

  // 3. Reactive Store Values (Subscription)
  const snapshot = useSyncExternalStore(
    (l) => storeRef.current.subscribe(l),
    () => storeRef.current.getSnapshot()
  );

  const {
    activeSteps,
    currentStepId,
    history,
    visitedSteps,
    completedSteps,
    data: wizardData,
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

  // Analytics
  const trackEvent = useCallback<WizardEventHandler<StepId>>(
    (name, payload) => {
      localConfig.analytics?.onEvent(name, payload as any);
    },
    [localConfig.analytics]
  );

  // Persistence Save
  const saveData = useCallback(
    (mode: PersistenceMode, stepId: StepId, data: any) => {
      const {
        stepsMap,
        persistenceAdapter,
        persistenceMode: globalMode,
      } = stateRef.current;
      const stepConfig = stepsMap.get(stepId);
      const adapterToUse = stepConfig?.persistenceAdapter || persistenceAdapter;
      const modeToUse = stepConfig?.persistenceMode || globalMode;

      if (mode === modeToUse || mode === "manual") {
        adapterToUse.saveStep(stepId, data);
      }
    },
    []
  );

  // 6. Action Implementations
  const resolveActiveStepsHelper = useCallback(
    async (data: T): Promise<IStepConfig<T, StepId>[]> => {
      storeRef.current.updateMeta({ isBusy: true });
      try {
        const results = await Promise.all(
          localConfig.steps.map(async (step) => {
            if (!step.condition) return { step, ok: true };

            const nextBusyStart = new Set(
              storeRef.current.getSnapshot().busySteps
            );
            nextBusyStart.add(step.id as StepId);
            storeRef.current.updateMeta({
              busySteps: nextBusyStart,
              isBusy: true,
            });

            try {
              const res = step.condition(
                data || {},
                storeRef.current.getSnapshot()
              );
              const ok = res instanceof Promise ? await res : res;
              return { step, ok };
            } catch (e) {
              console.error(`[Wizard] Condition failed for ${step.id}:`, e);
              return { step, ok: false };
            } finally {
              const currentSnapshot = storeRef.current.getSnapshot();
              const nextBusyEnd = new Set(currentSnapshot.busySteps);
              nextBusyEnd.delete(step.id as StepId);
              storeRef.current.updateMeta({
                busySteps: nextBusyEnd,
                isBusy: nextBusyEnd.size > 0,
              });
            }
          })
        );
        return results.filter((r) => r.ok).map((r) => r.step) as IStepConfig<
          T,
          StepId
        >[];
      } finally {
        const currentSnapshot = storeRef.current.getSnapshot();
        if (currentSnapshot.busySteps.size === 0) {
          storeRef.current.updateMeta({ isBusy: false });
        }
      }
    },
    [localConfig.steps]
  );

  const validateStep = useCallback(
    async (stepId: StepId, data: T): Promise<boolean> => {
      const step = stepsMap.get(stepId);
      if (!step || !step.validationAdapter) return true;

      storeRef.current.dispatch({
        type: "VALIDATE_START",
        payload: { stepId },
      });
      const nextBusy = new Set(storeRef.current.getSnapshot().busySteps);
      nextBusy.add(stepId);
      storeRef.current.updateMeta({ busySteps: nextBusy, isBusy: true });

      try {
        const result = await step.validationAdapter.validate(data);
        if (result.isValid) {
          storeRef.current.setStepErrors(stepId, null);
          const nextErrorSteps = new Set(
            storeRef.current.getSnapshot().errorSteps
          );
          nextErrorSteps.delete(stepId);
          storeRef.current.dispatch({
            type: "SET_ERROR_STEPS",
            payload: { steps: nextErrorSteps },
          });
          return true;
        } else {
          storeRef.current.setStepErrors(stepId, result.errors || null);
          trackEvent("validation_error", {
            stepId,
            errors: result.errors,
            timestamp: Date.now(),
          });
          const nextErrorSteps = new Set(
            storeRef.current.getSnapshot().errorSteps
          );
          nextErrorSteps.add(stepId);
          storeRef.current.dispatch({
            type: "SET_ERROR_STEPS",
            payload: { steps: nextErrorSteps },
          });
          return false;
        }
      } finally {
        const nextBusyAfter = new Set(storeRef.current.getSnapshot().busySteps);
        nextBusyAfter.delete(stepId);
        storeRef.current.updateMeta({
          busySteps: nextBusyAfter,
          isBusy: nextBusyAfter.size > 0,
        });
        storeRef.current.dispatch({
          type: "VALIDATE_END",
          payload: { stepId, result: { isValid: true } } as any,
        });
      }
    },
    [stepsMap, trackEvent]
  );

  const goToStep = useCallback(
    async (
      stepId: StepId,
      providedActiveSteps?: IStepConfig<T, StepId>[]
    ): Promise<boolean> => {
      const {
        currentStepId,
        config,
        persistenceMode,
        persistenceAdapter,
        stepsMap,
      } = stateRef.current;
      const currentData = storeRef.current.getSnapshot().data;

      // Directions & Validation
      const allSteps = config.steps;
      const currentIdx = allSteps.findIndex((s) => s.id === currentStepId);
      const targetIdx = allSteps.findIndex((s) => s.id === stepId);

      if (targetIdx > currentIdx && currentStepId) {
        const step = stepsMap.get(currentStepId as StepId);
        const shouldVal =
          step?.autoValidate ??
          config.autoValidate ??
          !!step?.validationAdapter;
        if (shouldVal) {
          const ok = await validateStep(currentStepId as StepId, currentData);
          if (!ok) return false;
        }
      }

      storeRef.current.updateMeta({ isBusy: true });
      try {
        const resolvedSteps =
          providedActiveSteps || (await resolveActiveStepsHelper(currentData));
        const target = resolvedSteps.find((s) => s.id === stepId);
        if (!target) return false;

        const step = stepsMap.get(currentStepId as StepId);
        if (step?.beforeLeave) {
          const snapshot = storeRef.current.getSnapshot();
          const direction = targetIdx > currentIdx ? "next" : "prev";
          const ok = await step.beforeLeave(currentData, direction, snapshot);
          if (ok === false) return false;
        }

        if (
          currentStepId &&
          (step?.persistenceMode || persistenceMode) === "onStepChange"
        ) {
          saveData("onStepChange", currentStepId as StepId, currentData);
        }

        const currentSnapshot = storeRef.current.getSnapshot();
        const nextVisited = new Set(currentSnapshot.visitedSteps);
        if (currentStepId) nextVisited.add(currentStepId as StepId);
        storeRef.current.dispatch({
          type: "SET_VISITED_STEPS",
          payload: { steps: nextVisited },
        });

        storeRef.current.dispatch({
          type: "SET_CURRENT_STEP_ID",
          payload: { stepId },
        });

        const nextHistory = [...currentSnapshot.history, stepId];
        storeRef.current.dispatch({
          type: "SET_HISTORY",
          payload: { history: nextHistory },
        });

        if (persistenceMode !== "manual") {
          persistenceAdapter.saveStep(META_KEY, {
            currentStepId: stepId,
            visited: Array.from(nextVisited),
            completed: Array.from(currentSnapshot.completedSteps),
            history: nextHistory,
          });
        }

        if (config.onStepChange)
          config.onStepChange(currentStepId || null, stepId, currentData);
        trackEvent("step_change", {
          from: (currentStepId || null) as any,
          to: stepId,
          timestamp: Date.now(),
        });
        window.scrollTo(0, 0);
        return true;
      } finally {
        storeRef.current.updateMeta({ isBusy: false });
      }
    },
    [resolveActiveStepsHelper, validateStep, saveData, trackEvent]
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
      const ok = await validateStep(currentStepId as StepId, currentData);
      if (!ok) return;
    }

    // 2. Resolve active steps ONLY if validation passed
    const resolvedSteps = await resolveActiveStepsHelper(currentData);
    const idx = resolvedSteps.findIndex((s) => s.id === currentStepId);

    if (idx !== -1 && idx < resolvedSteps.length - 1) {
      const nextStepId = resolvedSteps[idx + 1].id;
      const success = await goToStep(nextStepId, resolvedSteps);
      if (success) {
        const nextComp = new Set(storeRef.current.getSnapshot().completedSteps);
        nextComp.add(currentStepId as StepId);
        storeRef.current.dispatch({
          type: "SET_COMPLETED_STEPS",
          payload: { steps: nextComp },
        });
      }
    }
  }, [goToStep, resolveActiveStepsHelper, validateStep, stepsMap]);

  const goToPrevStep = useCallback(() => {
    const { currentStepId, activeSteps, activeStepsIndexMap } =
      stateRef.current;
    const idx = activeStepsIndexMap.get(currentStepId as StepId) ?? -1;
    if (idx > 0) goToStep(activeSteps[idx - 1].id);
  }, [goToStep]);

  const setData = useCallback(
    (path: string, value: any, options?: { debounceValidation?: number }) => {
      const { persistenceMode, stepsMap, currentStepId } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      if (getByPath(prevData, path) === value) return;

      let newData = setByPath(prevData, path, value);

      // Auto-invalidation
      localConfig.steps.forEach((step) => {
        if (
          step.dependsOn?.some((p) => path === p || path.startsWith(p + "."))
        ) {
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
          if (step.clearData) {
            if (typeof step.clearData === "function") {
              newData = { ...newData, ...step.clearData(newData) };
            } else {
              (Array.isArray(step.clearData)
                ? step.clearData
                : [step.clearData]
              ).forEach((p) => {
                newData = setByPath(newData, p as string, undefined);
              });
            }
          }
        }
      });

      storeRef.current.dispatch({
        type: "SET_DATA",
        payload: { path, value, options },
      });

      if (currentStepId) {
        storeRef.current.deleteError(currentStepId, path);
        const step = stepsMap.get(currentStepId as StepId);
        if (
          (step?.validationMode ||
            localConfig.validationMode ||
            "onStepChange") === "onChange"
        ) {
          validateStep(currentStepId as StepId, newData);
        }
        if ((step?.persistenceMode || persistenceMode) === "onChange") {
          saveData("onChange", currentStepId as StepId, newData);
        }
      }
    },
    [localConfig, validateStep, saveData]
  );

  const updateData = useCallback(
    (data: Partial<T>, options?: { replace?: boolean; persist?: boolean }) => {
      const prev = storeRef.current.getSnapshot().data;
      const next = options?.replace ? (data as T) : { ...prev, ...data };
      storeRef.current.update(next, Object.keys(data));
      if (options?.persist) {
        localConfig.steps.forEach((s) => saveData("manual", s.id, next));
      }
    },
    [localConfig.steps, saveData]
  );

  const reset = useCallback(() => {
    storeRef.current.setInitialData(initialData || ({} as T));
    storeRef.current.update((initialData || {}) as T);
    storeRef.current.updateErrors({});
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
      validateStep: (sid: StepId) =>
        validateStep(sid, storeRef.current.getSnapshot().data),
      validateAll: async () => {
        storeRef.current.updateMeta({ isBusy: true });
        const data = storeRef.current.getSnapshot().data;
        const active = await resolveActiveStepsHelper(data);
        const results = await Promise.all(
          active.map((s) => validateStep(s.id, data))
        );
        storeRef.current.updateMeta({ isBusy: false });
        return {
          isValid: results.every(Boolean),
          errors: storeRef.current.getSnapshot().errors,
        };
      },
      save: (ids?: StepId | StepId[] | boolean) => {
        const data = storeRef.current.getSnapshot().data;
        if (ids === true)
          localConfig.steps.forEach((s) =>
            saveData("manual", s.id as StepId, data)
          );
        else if (!ids) {
          if (stateRef.current.currentStepId)
            saveData("manual", stateRef.current.currentStepId as StepId, data);
        } else
          (Array.isArray(ids) ? ids : [ids]).forEach((id) =>
            saveData("manual", id as StepId, data)
          );
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
      saveData,
    ]
  );

  // 8. Lifecycle & Initialization
  useEffect(() => {
    if (!isInitialized.current) {
      storeRef.current.dispatch({
        type: "INIT",
        payload: { data: initialData || ({} as T), config: localConfig },
      });
      isInitialized.current = true;
    } else {
      // Sync config if it changes, but don't reset data
      storeRef.current.updateMeta({ config: localConfig });
    }
  }, [initialData, localConfig]);

  // Handle Dynamic Steps Resolution
  useEffect(() => {
    let isMounted = true;

    const updateSteps = async () => {
      const resolved = await resolveActiveStepsHelper(wizardData);
      if (isMounted) {
        storeRef.current.dispatch({
          type: "SET_ACTIVE_STEPS",
          payload: { steps: resolved },
        });
      }
    };

    updateSteps();

    return () => {
      isMounted = false;
    };
  }, [wizardData, resolveActiveStepsHelper]);

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
  const lastStateRef = useRef<any>(null);
  const lastResultRef = useRef<any>(null);
  const getSnapshot = useCallback(() => {
    const full = store.getSnapshot();
    if (full === lastStateRef.current) return lastResultRef.current;
    const res = selector(full);
    if (
      lastResultRef.current !== null &&
      (options?.isEqual || Object.is)(lastResultRef.current, res)
    ) {
      lastStateRef.current = full;
      return lastResultRef.current;
    }
    lastStateRef.current = full;
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
>(): IWizardContext<T, StepId> & { store: IWizardStore<T, StepId> } {
  const state = useWizardState<T, StepId>();
  const actions = useWizardActions<StepId>();
  const store = useContext(WizardStoreContext) as IWizardStore<T, StepId>;
  const wizardData = useWizardSelector((s: IWizardState<T, StepId>) => s.data);
  const allErrors = useWizardSelector((s: IWizardState<T, StepId>) => s.errors);
  const { data: _d, errors: _e, ...stateProps } = state;
  return useMemo(
    () => ({
      ...stateProps,
      ...actions,
      wizardData,
      allErrors,
      // Backward compatibility aliases
      data: wizardData,
      errors: allErrors,
      store,
    }),
    [stateProps, actions, wizardData, allErrors, store]
  ) as IWizardContext<T, StepId> & {
    store: IWizardStore<T, StepId>;
    data: T;
    errors: Record<string, any>;
  };
}
