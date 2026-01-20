import {
  type IPersistenceAdapter,
  type IStepConfig,
  type IWizardActions,
  type IWizardConfig,
  type IWizardContext,
  type IWizardState,
  type IWizardStore,
  type Path,
  type PathValue,
  type WizardEventHandler,
  type WizardEventName,
  WizardStore,
  getByPath,
  setByPath,
} from '@wizzard-packages/core';
import { MemoryAdapter } from '@wizzard-packages/persistence';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { applyStepDependencies } from '../internal/dependencies';

const UNSET = Symbol('wizard_unset');

const shallowEqual = (a: Record<string, any> | null, b: Record<string, any> | null) => {
  if (a === b) return true;
  if (!a || !b) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (!Object.is(a[key], b[key])) return false;
  }
  return true;
};

const WizardStateContext = createContext<IWizardState<any, any> | undefined>(undefined);
const WizardActionsContext = createContext<IWizardActions<any> | undefined>(undefined);
const WizardStoreContext = createContext<IWizardStore<any, any> | undefined>(undefined);

/**
 * Props for WizardProvider.
 */
export interface WizardProviderProps<T, StepId extends string> {
  config: IWizardConfig<T, StepId>;
  initialData?: T;
  initialStepId?: StepId;
  children: React.ReactNode;
}

/**
 * Component that provides the wizard context to its children.
 */
export function WizardProvider<T extends Record<string, any>, StepId extends string = string>({
  config,
  initialData,
  initialStepId,
  children,
}: WizardProviderProps<T, StepId>) {
  const [localConfig, setLocalConfig] = useState<IWizardConfig<T, StepId>>(config);

  const storeRef = useRef<IWizardStore<T, StepId>>(null as unknown as IWizardStore<T, StepId>);

  if (!storeRef.current) {
    storeRef.current = new WizardStore<T, StepId>((initialData || {}) as T, config.middlewares);
  }

  const isInitialized = useRef(false);

  const persistenceAdapter = useMemo<IPersistenceAdapter>(() => {
    return localConfig.persistence?.adapter || new MemoryAdapter();
  }, [localConfig.persistence?.adapter]);

  const persistenceMode = localConfig.persistence?.mode || 'onStepChange';
  const META_KEY = '__wizzard_meta__';

  const snapshot = useSyncExternalStore<IWizardState<T, StepId>>(
    storeRef.current.subscribe,
    storeRef.current.getSnapshot,
    storeRef.current.getSnapshot
  );

  const {
    activeSteps,
    currentStepId,
    history,
    visitedSteps,
    completedSteps,
    data,
    errors: _errors,
  } = snapshot;

  const stepsMap = useMemo(() => {
    const map = new Map<StepId, IStepConfig<T, StepId>>();
    localConfig.steps.forEach((step: IStepConfig<T, StepId>) => map.set(step.id, step));
    return map;
  }, [localConfig.steps]);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const activeStepsIndexMap = useMemo(() => {
    const map = new Map<StepId, number>();
    activeSteps.forEach((s: IStepConfig<T, StepId>, i: number) => map.set(s.id, i));
    return map;
  }, [activeSteps]);

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

  const validationDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    return () => {
      if (validationDebounceRef.current) {
        clearTimeout(validationDebounceRef.current);
      }
    };
  }, []);

  const trackEvent = useCallback<WizardEventHandler<StepId>>(
    (name: WizardEventName, payload: any) => {
      localConfig.analytics?.onEvent(name as any, payload);
    },
    [localConfig.analytics]
  );

  const resolveActiveStepsHelper = useCallback(
    (data: T) => storeRef.current.resolveActiveSteps(data),
    []
  );

  const validateStep = useCallback((stepId: StepId) => storeRef.current.validateStep(stepId), []);

  const goToStep = useCallback(
    async (
      stepId: StepId,
      providedActiveSteps?: IStepConfig<T, StepId>[],
      options: { validate?: boolean } = { validate: true }
    ): Promise<boolean> => {
      return storeRef.current.goToStep(stepId, {
        validate: options.validate,
        providedActiveSteps: providedActiveSteps as any,
      });
    },
    []
  );

  const goToNextStep = useCallback(async () => {
    const { currentStepId } = stateRef.current;
    if (!currentStepId) return;

    const currentData = storeRef.current.getSnapshot().data;
    const step = stepsMap.get(currentStepId as StepId);

    const shouldVal = step?.autoValidate ?? localConfig.autoValidate ?? !!step?.validationAdapter;

    if (shouldVal) {
      const ok = await validateStep(currentStepId as StepId);
      if (!ok) return;
    }

    const resolvedSteps = await resolveActiveStepsHelper(currentData);
    const idx = resolvedSteps.findIndex((s: IStepConfig<T, StepId>) => s.id === currentStepId);

    if (idx !== -1 && idx < resolvedSteps.length - 1) {
      const nextStepId = resolvedSteps[idx + 1].id;
      const success = await goToStep(nextStepId as any, resolvedSteps as any, {
        validate: false,
      });
      if (success) {
        const currentSnapshot = storeRef.current.getSnapshot();
        if (!currentSnapshot.errorSteps.has(currentStepId as StepId)) {
          const nextComp = new Set(currentSnapshot.completedSteps);
          nextComp.add(currentStepId as StepId);
          storeRef.current.dispatch({
            type: 'SET_COMPLETED_STEPS',
            payload: { steps: nextComp },
          });
        }
      }
    }
  }, [goToStep, resolveActiveStepsHelper, validateStep, stepsMap, localConfig]);

  const goToPrevStep = useCallback(async () => {
    const { currentStepId, activeSteps, activeStepsIndexMap } = stateRef.current;
    const idx = activeStepsIndexMap.get(currentStepId as StepId) ?? -1;
    if (idx > 0) await goToStep(activeSteps[idx - 1].id as any);
  }, [goToStep]);

  const setData = useCallback(
    (path: string, value: any, options?: { debounceValidation?: number }) => {
      const { stepsMap, currentStepId } = stateRef.current;
      const prevData = storeRef.current.getSnapshot().data;
      if (getByPath(prevData, path) === value) return;

      const baseData = setByPath(prevData, path, value);
      const { newData, hasClearing, statusChanged, nextCompletedSteps, nextVisitedSteps } =
        applyStepDependencies(localConfig, storeRef.current, baseData, [path]);

      if (statusChanged) {
        storeRef.current.dispatch({
          type: 'SET_COMPLETED_STEPS',
          payload: { steps: nextCompletedSteps },
        });
        storeRef.current.dispatch({
          type: 'SET_VISITED_STEPS',
          payload: { steps: nextVisitedSteps },
        });
      }

      if (!hasClearing) {
        storeRef.current.dispatch({
          type: 'SET_DATA',
          payload: {
            path,
            value,
            options: { ...options, __from_set_data__: true },
          },
        });
      } else {
        storeRef.current.dispatch({
          type: 'UPDATE_DATA',
          payload: {
            data: newData,
            options: { replace: true, __from_set_data__: true, path },
          },
        });
      }

      if (currentStepId) {
        storeRef.current.deleteError(currentStepId as StepId, path);
        const step = stepsMap.get(currentStepId as StepId);
        const mode = step?.validationMode || localConfig.validationMode || 'onStepChange';

        if (mode === 'onChange') {
          const debounceMs =
            options?.debounceValidation ?? localConfig.validationDebounceTime ?? 300;
          if (validationDebounceRef.current) {
            clearTimeout(validationDebounceRef.current);
          }
          validationDebounceRef.current = setTimeout(() => {
            validateStep(currentStepId as StepId);
          }, debounceMs);
        }
      }
    },
    [localConfig, validateStep]
  );

  const updateData = useCallback(
    (data: Partial<T>, options?: { replace?: boolean; persist?: boolean }) => {
      const prev = storeRef.current.getSnapshot().data;
      const baseData = (options?.replace ? (data as T) : { ...prev, ...data }) as T;

      const { newData, statusChanged, nextCompletedSteps, nextVisitedSteps } =
        applyStepDependencies(localConfig, storeRef.current, baseData, Object.keys(data));

      if (statusChanged) {
        storeRef.current.dispatch({
          type: 'SET_COMPLETED_STEPS',
          payload: { steps: nextCompletedSteps },
        });
        storeRef.current.dispatch({
          type: 'SET_VISITED_STEPS',
          payload: { steps: nextVisitedSteps },
        });
      }

      storeRef.current.update(newData as T, Object.keys(data));
      if (options?.persist) {
        if (storeRef.current.save) {
          storeRef.current.save(storeRef.current.getSnapshot().currentStepId as StepId);
        }
      }
    },
    [localConfig]
  );

  const reset = useCallback(() => {
    storeRef.current.setInitialData(initialData || ({} as T));
    storeRef.current.update((initialData || {}) as T);
    storeRef.current.updateErrors({} as Record<StepId, Record<string, string>>);
    storeRef.current.dispatch({
      type: 'SET_VISITED_STEPS',
      payload: { steps: new Set() },
    });
    storeRef.current.dispatch({
      type: 'SET_COMPLETED_STEPS',
      payload: { steps: new Set() },
    });
    storeRef.current.dispatch({
      type: 'SET_ERROR_STEPS',
      payload: { steps: new Set() },
    });
    if (activeSteps.length > 0) {
      const startId = activeSteps[0].id;
      storeRef.current.dispatch({
        type: 'SET_CURRENT_STEP_ID',
        payload: { stepId: startId as StepId },
      });
      storeRef.current.dispatch({
        type: 'SET_HISTORY',
        payload: { history: [startId as StepId] },
      });
    } else {
      storeRef.current.dispatch({
        type: 'SET_CURRENT_STEP_ID',
        payload: { stepId: '' as StepId },
      });
      storeRef.current.dispatch({
        type: 'SET_HISTORY',
        payload: { history: [] },
      });
    }
    persistenceAdapter.clear();
    trackEvent('wizard_reset', { data: initialData } as any);
  }, [initialData, activeSteps, persistenceAdapter, trackEvent]);

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
      goToStep: (sid: StepId, optionsOrUndefined?: any, thirdArg?: any) => {
        // Handle both signatures:
        // 1. goToStep(id, options)
        // 2. goToStep(id, undefined, options) - mistakenly used by user but likely legacy or internal leak

        let finalOptions = optionsOrUndefined;
        if (thirdArg && optionsOrUndefined === undefined) {
          finalOptions = thirdArg;
        }

        return goToStep(sid, undefined, finalOptions);
      },
      setStepData: (_stepId: StepId, data: any) => {
        const next = { ...storeRef.current.getSnapshot().data, ...data };
        storeRef.current.update(next as T, Object.keys(data));
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
          active.map((s: IStepConfig<T, StepId>) => validateStep(s.id as StepId))
        );
        storeRef.current.updateMeta({ isBusy: false });
        return {
          isValid: results.every(Boolean),
          errors: storeRef.current.getSnapshot().errors,
        };
      },
      save: (ids?: StepId | StepId[] | boolean) => {
        if (ids === true) {
          localConfig.steps.forEach((s: IStepConfig<T, StepId>) =>
            storeRef.current.save(s.id as StepId)
          );
        } else if (!ids) {
          storeRef.current.save();
        } else {
          (Array.isArray(ids) ? ids : [ids]).forEach((id) => storeRef.current.save(id as StepId));
        }
      },
      clearStorage: () => persistenceAdapter.clear(),
      reset,
      setData,
      updateData,
      getData: (p: string, d?: any) => getByPath(storeRef.current.getSnapshot().data, p, d),
      updateConfig: (nc: any) => {
        setLocalConfig((prev: IWizardConfig<T, StepId>) => ({ ...prev, ...nc }));
      },
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
      localConfig,
      resolveActiveStepsHelper,
    ]
  );

  useEffect(() => {
    if (!isInitialized.current) {
      storeRef.current.injectPersistence(persistenceAdapter);
      storeRef.current.dispatch({
        type: 'INIT',
        payload: { data: initialData || ({} as T), config: localConfig as any },
      });
      storeRef.current.hydrate();
      isInitialized.current = true;
    } else {
      storeRef.current.updateMeta({ config: localConfig as any });
    }
  }, [initialData, localConfig, persistenceAdapter]);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(async () => {
      const resolved = await resolveActiveStepsHelper(data);
      if (isMounted) {
        storeRef.current.dispatch({
          type: 'SET_ACTIVE_STEPS',
          payload: { steps: resolved as any },
        });
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [data, resolveActiveStepsHelper]);

  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (hasHydratedRef.current) return;
    hasHydratedRef.current = true;

    const meta = persistenceAdapter.getStep<{
      currentStepId: string;
      visited: string[];
      completed: string[];
      history: string[];
    }>(META_KEY);
    if (meta) {
      if (meta.currentStepId) {
        storeRef.current.dispatch({
          type: 'SET_CURRENT_STEP_ID',
          payload: { stepId: meta.currentStepId as StepId },
        });
      }
      if (meta.visited)
        storeRef.current.dispatch({
          type: 'SET_VISITED_STEPS',
          payload: { steps: new Set(meta.visited as StepId[]) },
        });
      if (meta.completed)
        storeRef.current.dispatch({
          type: 'SET_COMPLETED_STEPS',
          payload: { steps: new Set(meta.completed as StepId[]) },
        });
      if (meta.history) {
        storeRef.current.dispatch({
          type: 'SET_HISTORY',
          payload: { history: meta.history as StepId[] },
        });
      }
    }

    const currentSnapshot = storeRef.current.getSnapshot();
    const currentActiveSteps = currentSnapshot.activeSteps;

    if (!currentSnapshot.currentStepId && currentActiveSteps.length > 0) {
      const startId =
        initialStepId &&
        currentActiveSteps.some((s: IStepConfig<T, StepId>) => s.id === initialStepId)
          ? initialStepId
          : currentActiveSteps[0].id;

      storeRef.current.dispatch({
        type: 'SET_CURRENT_STEP_ID',
        payload: { stepId: startId as StepId },
      });

      if (currentSnapshot.history.length === 0) {
        storeRef.current.dispatch({
          type: 'SET_HISTORY',
          payload: { history: [startId as StepId] },
        });
      }

      const currentVisited = new Set(currentSnapshot.visitedSteps);
      if (!currentVisited.has(startId as StepId)) {
        currentVisited.add(startId as StepId);
        storeRef.current.dispatch({
          type: 'SET_VISITED_STEPS',
          payload: { steps: currentVisited },
        });
      }
    }

    if (currentActiveSteps.length > 0 && currentSnapshot.isLoading) {
      storeRef.current.updateMeta({ isLoading: false });
    }
  }, [activeSteps, initialStepId, persistenceAdapter]);

  return (
    <WizardStoreContext.Provider value={storeRef.current as any}>
      <WizardStateContext.Provider value={stateValue}>
        <WizardActionsContext.Provider value={actionsValue}>
          {children}
        </WizardActionsContext.Provider>
      </WizardStateContext.Provider>
    </WizardStoreContext.Provider>
  );
}

/**
 * Reads the full wizard state.
 */
export function useWizardState<T = unknown, StepId extends string = string>(): IWizardState<
  T,
  StepId
> {
  const context = useContext(WizardStateContext);
  if (!context) throw new Error('useWizardState must be used within a WizardProvider');
  return context as IWizardState<T, StepId>;
}

/**
 * Subscribes to a specific data value by path.
 */
export function useWizardValue<TValue = any>(
  path: string,
  options?: { isEqual?: (a: TValue, b: TValue) => boolean } | ((a: TValue, b: TValue) => boolean)
): TValue {
  const store = useContext(WizardStoreContext);
  if (!store) throw new Error('useWizardValue must be used within a WizardProvider');

  const lastStateRef = useRef<any>(UNSET);
  const lastValueRef = useRef<any>(UNSET);

  const isEqual = typeof options === 'function' ? options : options?.isEqual;
  const isEqualRef = useRef(isEqual);
  isEqualRef.current = isEqual;

  const getSnapshot = useCallback(() => {
    const data = store.getSnapshot().data;
    if (data === lastStateRef.current && lastValueRef.current !== UNSET) {
      return lastValueRef.current;
    }

    const value = getByPath(data, path) as TValue;
    if (
      lastValueRef.current !== UNSET &&
      (isEqualRef.current || Object.is)(lastValueRef.current, value)
    ) {
      lastStateRef.current = data;
      return lastValueRef.current;
    }

    lastStateRef.current = data;
    lastValueRef.current = value;
    return value;
  }, [store, path]);

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

/**
 * Returns a value and setter for a path (useState-like API).
 */
export function useWizardField<T, P extends Path<T>>(
  path: P,
  options?: { isEqual?: (a: PathValue<T, P>, b: PathValue<T, P>) => boolean }
): [PathValue<T, P>, (value: PathValue<T, P>) => void] {
  const value = useWizardValue<PathValue<T, P>>(path as string, options);
  const { setData } = useWizardActions();
  const setValue = useCallback(
    (next: PathValue<T, P>) => {
      setData(path as string, next);
    },
    [setData, path]
  );

  return [value, setValue];
}

/**
 * Returns the first error message for a path across all steps.
 */
export function useWizardError(path: string): string | undefined {
  const store = useContext(WizardStoreContext);
  if (!store) throw new Error('useWizardError must be used within a WizardProvider');
  const getSnapshot = useCallback(() => {
    const errors = store.getSnapshot().errors;
    for (const [_, stepErrors] of Object.entries(errors)) {
      const typed = stepErrors as Record<string, string>;
      if (typed[path]) return typed[path];
    }
    return undefined;
  }, [store, path]);
  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

/**
 * Selects a derived value from the wizard state with optional equality check.
 */
export function useWizardSelector<TSelected = any>(
  selector: (state: any) => TSelected,
  options?:
    | { isEqual?: (a: TSelected, b: TSelected) => boolean }
    | ((a: TSelected, b: TSelected) => boolean)
): TSelected {
  const store = useContext(WizardStoreContext);
  if (!store) throw new Error('useWizardSelector must be used within a WizardProvider');

  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const isEqual = typeof options === 'function' ? options : options?.isEqual;
  const isEqualRef = useRef(isEqual);
  isEqualRef.current = isEqual;

  const lastStateRef = useRef<any>(UNSET);
  const lastResultRef = useRef<TSelected | typeof UNSET>(UNSET);

  const getSnapshot = useCallback(() => {
    const full = store.getSnapshot();

    // If state hasn't changed and we have a cached result, return it
    if (full === lastStateRef.current && lastResultRef.current !== UNSET) {
      return lastResultRef.current as TSelected;
    }

    const res = selectorRef.current(full);

    // If result is equal to cached result, return cached result to maintain reference stability
    if (
      lastResultRef.current !== UNSET &&
      (isEqualRef.current || Object.is)(lastResultRef.current as TSelected, res)
    ) {
      lastStateRef.current = full;
      return lastResultRef.current as TSelected;
    }

    lastStateRef.current = full;
    lastResultRef.current = res;
    return res;
  }, [store]);

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

/**
 * Returns the wizard actions API.
 */
export function useWizardActions<StepId extends string = string>(): IWizardActions<StepId> {
  const context = useContext(WizardActionsContext);
  if (!context) throw new Error('useWizardActions must be used within a WizardProvider');
  return context as IWizardActions<StepId>;
}

/**
 * Returns combined wizard state, actions, and derived errors.
 */
export function useWizardContext<T = any, StepId extends string = string>(): IWizardContext<
  T,
  StepId
> {
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

  const { data: _d, errors: _e, ...stateProps } = state as any;
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

/**
 * Returns current step config.
 */
export function useWizardCurrentStep<T = any, StepId extends string = string>() {
  return useWizardSelector((s: IWizardState<T, StepId>) => s.currentStep);
}

/**
 * Returns active steps list.
 */
export function useWizardSteps<T = any, StepId extends string = string>() {
  return useWizardSelector((s: IWizardState<T, StepId>) => s.activeSteps);
}

/**
 * Returns frequently-used meta state with shallow equality.
 */
export function useWizardMeta<T = any, StepId extends string = string>() {
  return useWizardSelector(
    (s: IWizardState<T, StepId>) => ({
      currentStepId: s.currentStepId,
      currentStepIndex: s.currentStepIndex,
      isFirstStep: s.isFirstStep,
      isLastStep: s.isLastStep,
      isLoading: s.isLoading,
      isBusy: s.isBusy,
      isDirty: s.isDirty,
      progress: s.progress,
      activeStepsCount: s.activeStepsCount,
      goToStepResult: s.goToStepResult,
    }),
    { isEqual: shallowEqual }
  );
}

/**
 * Returns all errors by step (shallow-equal).
 */
export function useWizardAllErrors<T = any, StepId extends string = string>() {
  return useWizardSelector((s: IWizardState<T, StepId>) => s.errors, {
    isEqual: shallowEqual,
  });
}

/**
 * Returns flattened errors map (path -> message).
 */
export function useWizardFlatErrors<T = any, StepId extends string = string>() {
  const allErrors = useWizardAllErrors<T, StepId>();
  return useMemo(() => {
    const flat: Record<string, string> = {};
    Object.values(allErrors).forEach((stepErrors) => {
      Object.assign(flat, stepErrors as Record<string, string>);
    });
    return flat;
  }, [allErrors]);
}
