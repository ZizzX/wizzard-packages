import { useCallback, useRef, useSyncExternalStore } from 'react';
import {
  type IWizardConfig,
  type IPersistenceAdapter,
  type IWizardState,
  type IWizardStore,
  type IStepConfig,
  type Path,
  type PathValue,
  WizardStore,
  getByPath,
  setByPath,
} from '@wizzard-packages/core';
import { MemoryAdapter } from '@wizzard-packages/persistence';
import type { IWizardActionsTyped } from './types';

const UNSET = Symbol('wizard_store_unset');
const META_KEY = '__wizzard_meta__';

export interface CreateWizardStoreOptions<T, StepId extends string = string> {
  config: IWizardConfig<T, StepId>;
  initialData?: T;
  initialStepId?: StepId;
}

export interface WizardStoreBundle<T, StepId extends string = string> {
  store: IWizardStore<T, StepId>;
  actions: IWizardActionsTyped<T, StepId>;
}

const applyStoredMeta = <T, StepId extends string>(
  store: IWizardStore<T, StepId>,
  adapter: IPersistenceAdapter
) => {
  const meta = adapter.getStep<{
    currentStepId: string;
    visited: string[];
    completed: string[];
    history: string[];
  }>(META_KEY);

  if (!meta) return;

  if (meta.currentStepId) {
    store.dispatch({
      type: 'SET_CURRENT_STEP_ID',
      payload: { stepId: meta.currentStepId as StepId },
    });
  }
  if (meta.visited) {
    store.dispatch({
      type: 'SET_VISITED_STEPS',
      payload: { steps: new Set(meta.visited as StepId[]) },
    });
  }
  if (meta.completed) {
    store.dispatch({
      type: 'SET_COMPLETED_STEPS',
      payload: { steps: new Set(meta.completed as StepId[]) },
    });
  }
  if (meta.history) {
    store.dispatch({
      type: 'SET_HISTORY',
      payload: { history: meta.history as StepId[] },
    });
  }
};

const ensureInitialStep = <T, StepId extends string>(
  store: IWizardStore<T, StepId>,
  activeSteps: IStepConfig<T, StepId>[],
  initialStepId?: StepId
) => {
  const snapshot = store.getSnapshot();
  if (snapshot.currentStepId || activeSteps.length === 0) return;

  const startId =
    initialStepId && activeSteps.some((s) => s.id === initialStepId)
      ? initialStepId
      : activeSteps[0].id;

  store.dispatch({
    type: 'SET_CURRENT_STEP_ID',
    payload: { stepId: startId as StepId },
  });

  if (snapshot.history.length === 0) {
    store.dispatch({
      type: 'SET_HISTORY',
      payload: { history: [startId as StepId] },
    });
  }

  const currentVisited = new Set(snapshot.visitedSteps);
  if (!currentVisited.has(startId as StepId)) {
    currentVisited.add(startId as StepId);
    store.dispatch({
      type: 'SET_VISITED_STEPS',
      payload: { steps: currentVisited },
    });
  }
};

const resolveAndSetActiveSteps = async <T, StepId extends string>(
  store: IWizardStore<T, StepId>,
  data: T,
  initialStepId?: StepId
) => {
  const resolved = await store.resolveActiveSteps(data);
  store.dispatch({
    type: 'SET_ACTIVE_STEPS',
    payload: { steps: resolved as any },
  });
  ensureInitialStep(store, resolved, initialStepId);

  const snapshot = store.getSnapshot();
  if (resolved.length > 0 && snapshot.isLoading) {
    store.updateMeta({ isLoading: false });
  }
};

const createWizardActions = <T extends Record<string, any>, StepId extends string>(
  store: IWizardStore<T, StepId>,
  config: IWizardConfig<T, StepId>,
  persistenceAdapter: IPersistenceAdapter,
  initialData: T
): IWizardActionsTyped<T, StepId> => {
  let currentConfig = config;
  const validationDebounceRef = { current: null as ReturnType<typeof setTimeout> | null };
  const stepsMap = new Map<StepId, IStepConfig<T, StepId>>();
  currentConfig.steps.forEach((step) => stepsMap.set(step.id as StepId, step));

  const resolveActiveStepsHelper = (data: T) => store.resolveActiveSteps(data);
  const validateStep = (stepId: StepId) => store.validateStep(stepId);

  const handleStepDependencies = (paths: string[], baseData: T) => {
    let currentData = { ...baseData };
    const allClearedPaths = new Set<string>();
    const { completedSteps, visitedSteps } = store.getSnapshot();
    const nextComp = new Set(completedSteps);
    const nextVis = new Set(visitedSteps);
    let statusChanged = false;

    const processDependencies = (changedPaths: string[]) => {
      const newlyClearedPaths: string[] = [];

      currentConfig.steps.forEach((step) => {
        const isDependent = step.dependsOn?.some((p) =>
          changedPaths.some(
            (path) => path === p || p.startsWith(path + '.') || path.startsWith(p + '.')
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
            if (typeof step.clearData === 'function') {
              const patch = step.clearData(currentData, changedPaths);
              Object.keys(patch).forEach((key) => {
                if ((currentData as any)[key] !== (patch as any)[key]) {
                  (currentData as any)[key] = (patch as any)[key];
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
      store.dispatch({
        type: 'SET_COMPLETED_STEPS',
        payload: { steps: nextComp },
      });
      store.dispatch({
        type: 'SET_VISITED_STEPS',
        payload: { steps: nextVis },
      });
    }

    return {
      newData: currentData,
      hasClearing: allClearedPaths.size > 0,
      clearedPaths: Array.from(allClearedPaths),
    };
  };

  const setData = <P extends Path<T>>(
    path: P,
    value: PathValue<T, P>,
    options?: { debounceValidation?: number }
  ) => {
    const prevData = store.getSnapshot().data;
    if (getByPath(prevData, path as string) === value) return;

    const baseData = setByPath(prevData, path as string, value);
    const { newData, hasClearing } = handleStepDependencies([path as string], baseData);

    if (!hasClearing) {
      store.dispatch({
        type: 'SET_DATA',
        payload: {
          path: path as string,
          value,
          options: { ...options, __from_set_data__: true },
        },
      });
    } else {
      store.dispatch({
        type: 'UPDATE_DATA',
        payload: {
          data: newData,
          options: { replace: true, __from_set_data__: true, path },
        },
      });
    }

    const snapshot = store.getSnapshot();
    const currentStepId = snapshot.currentStepId as StepId;
    if (currentStepId) {
      store.deleteError(currentStepId, path as string);
      const step = stepsMap.get(currentStepId);
      const mode = step?.validationMode || currentConfig.validationMode || 'onStepChange';

      if (mode === 'onChange') {
        const debounceMs =
          options?.debounceValidation ?? currentConfig.validationDebounceTime ?? 300;
        if (validationDebounceRef.current) {
          clearTimeout(validationDebounceRef.current);
        }
        validationDebounceRef.current = setTimeout(() => {
          void validateStep(currentStepId);
        }, debounceMs);
      }
    }
  };

  const updateData = (data: Partial<T>, options?: { replace?: boolean; persist?: boolean }) => {
    const prev = store.getSnapshot().data;
    const baseData = (options?.replace ? (data as T) : { ...prev, ...data }) as T;
    const { newData } = handleStepDependencies(Object.keys(data), baseData);

    store.update(newData as T, Object.keys(data));
    if (options?.persist) {
      store.save(store.getSnapshot().currentStepId as StepId);
    }
  };

  const reset = () => {
    store.setInitialData(initialData || ({} as T));
    store.update((initialData || ({} as T)) as T);
    store.updateErrors({} as Record<StepId, Record<string, string>>);
    store.dispatch({
      type: 'SET_VISITED_STEPS',
      payload: { steps: new Set() },
    });
    store.dispatch({
      type: 'SET_COMPLETED_STEPS',
      payload: { steps: new Set() },
    });
    store.dispatch({
      type: 'SET_ERROR_STEPS',
      payload: { steps: new Set() },
    });

    const snapshot = store.getSnapshot();
    if (snapshot.activeSteps.length > 0) {
      const startId = snapshot.activeSteps[0].id;
      store.dispatch({
        type: 'SET_CURRENT_STEP_ID',
        payload: { stepId: startId as StepId },
      });
      store.dispatch({
        type: 'SET_HISTORY',
        payload: { history: [startId as StepId] },
      });
    } else {
      store.dispatch({
        type: 'SET_CURRENT_STEP_ID',
        payload: { stepId: '' as StepId },
      });
      store.dispatch({
        type: 'SET_HISTORY',
        payload: { history: [] },
      });
    }

    persistenceAdapter.clear();
    currentConfig.analytics?.onEvent('wizard_reset', { data: initialData } as any);
  };

  const goToStep = (
    stepId: StepId,
    providedActiveSteps?: any[],
    options?: { validate?: boolean }
  ) => {
    return store.goToStep(stepId, {
      validate: options?.validate ?? true,
      providedActiveSteps: providedActiveSteps as any,
    });
  };

  const goToNextStep = async () => {
    const snapshot = store.getSnapshot();
    const currentStepId = snapshot.currentStepId as StepId;
    if (!currentStepId) return;

    const step = stepsMap.get(currentStepId);
    const shouldVal = step?.autoValidate ?? currentConfig.autoValidate ?? !!step?.validationAdapter;

    if (shouldVal) {
      const ok = await validateStep(currentStepId);
      if (!ok) return;
    }

    const resolvedSteps = await resolveActiveStepsHelper(snapshot.data);
    const idx = resolvedSteps.findIndex((s) => s.id === currentStepId);

    if (idx !== -1 && idx < resolvedSteps.length - 1) {
      const nextStepId = resolvedSteps[idx + 1].id;
      const success = await goToStep(nextStepId as StepId, resolvedSteps as any, {
        validate: false,
      });
      if (success) {
        const currentSnapshot = store.getSnapshot();
        if (!currentSnapshot.errorSteps.has(currentStepId)) {
          const nextComp = new Set(currentSnapshot.completedSteps);
          nextComp.add(currentStepId);
          store.dispatch({
            type: 'SET_COMPLETED_STEPS',
            payload: { steps: nextComp },
          });
        }
      }
    }
  };

  const goToPrevStep = async () => {
    const snapshot = store.getSnapshot();
    const idx = snapshot.activeSteps.findIndex((s) => s.id === snapshot.currentStepId);
    if (idx > 0) {
      await goToStep(snapshot.activeSteps[idx - 1].id as StepId);
    }
  };

  const setStepData = (_stepId: StepId, data: any) => {
    const next = { ...store.getSnapshot().data, ...data };
    store.update(next as T, Object.keys(data));
  };

  const handleStepChange = (field: string, value: any) => {
    if (store.getSnapshot().currentStepId) {
      setData(field as Path<T>, value as any);
    }
  };

  const validateAll = async () => {
    const result = await store.validateAll();
    return result;
  };

  const save = (ids?: StepId | StepId[] | boolean) => {
    if (ids === true) {
      currentConfig.steps.forEach((s) => store.save(s.id as StepId));
    } else if (!ids) {
      store.save();
    } else {
      (Array.isArray(ids) ? ids : [ids]).forEach((id) => store.save(id as StepId));
    }
  };

  const clearStorage = () => persistenceAdapter.clear();

  const getData = <P extends Path<T>>(path: P, defaultValue?: PathValue<T, P>) => {
    return getByPath(store.getSnapshot().data, path as string, defaultValue) as PathValue<T, P>;
  };

  const updateConfig = (nextConfig: Partial<IWizardConfig<any, StepId>>) => {
    currentConfig = { ...currentConfig, ...nextConfig } as IWizardConfig<T, StepId>;
    stepsMap.clear();
    currentConfig.steps.forEach((step) => stepsMap.set(step.id as StepId, step));
    store.updateMeta({ config: currentConfig as any });
  };

  return {
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
  };
};

/**
 * Create a standalone store + actions bundle without React Context.
 */
export const createWizardStore = <T extends Record<string, any>, StepId extends string = string>(
  options: CreateWizardStoreOptions<T, StepId>
): WizardStoreBundle<T, StepId> => {
  const initialData = (options.initialData || ({} as T)) as T;
  const store = new WizardStore<T, StepId>(initialData, options.config.middlewares);
  const persistenceAdapter = options.config.persistence?.adapter || new MemoryAdapter();

  store.injectPersistence(persistenceAdapter);
  store.dispatch({
    type: 'INIT',
    payload: { data: initialData, config: options.config as any },
  });
  store.hydrate();
  applyStoredMeta(store, persistenceAdapter);
  void resolveAndSetActiveSteps(store, initialData, options.initialStepId);

  return {
    store,
    actions: createWizardActions(store, options.config, persistenceAdapter, initialData),
  };
};

/**
 * Hook: read the full store snapshot without React Context.
 */
export const useWizardStoreState = <T, StepId extends string = string>(
  store: IWizardStore<T, StepId>
): IWizardState<T, StepId> => {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
};

/**
 * Hook: subscribe to a value path without React Context.
 */
export const useWizardStoreValue = <T, P extends Path<T>>(
  store: IWizardStore<T, any>,
  path: P,
  options?: { isEqual?: (a: PathValue<T, P>, b: PathValue<T, P>) => boolean }
): PathValue<T, P> => {
  const lastStateRef = useRef<any>(UNSET);
  const lastValueRef = useRef<any>(UNSET);

  const getSnapshot = useCallback(() => {
    const data = store.getSnapshot().data;
    if (data === lastStateRef.current && lastValueRef.current !== UNSET) {
      return lastValueRef.current;
    }

    const value = getByPath(data, path as string) as PathValue<T, P>;
    if (
      lastValueRef.current !== UNSET &&
      (options?.isEqual || Object.is)(lastValueRef.current, value)
    ) {
      lastStateRef.current = data;
      return lastValueRef.current;
    }

    lastStateRef.current = data;
    lastValueRef.current = value;
    return value;
  }, [store, path, options?.isEqual]);

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
};

/**
 * Hook: read the first error for a path without React Context.
 */
export const useWizardStoreError = (
  store: IWizardStore<any, any>,
  path: string
): string | undefined => {
  const getSnapshot = useCallback(() => {
    const errors = store.getSnapshot().errors;
    for (const [_, stepErrors] of Object.entries(errors)) {
      const typed = stepErrors as Record<string, string>;
      if (typed[path]) return typed[path];
    }
    return undefined;
  }, [store, path]);

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
};

/**
 * Hook: select derived state without React Context.
 */
export const useWizardStoreSelector = <TSelected>(
  store: IWizardStore<any, any>,
  selector: (state: any) => TSelected,
  options?: { isEqual?: (a: TSelected, b: TSelected) => boolean }
): TSelected => {
  const lastResultRef = useRef<TSelected | typeof UNSET>(UNSET);

  const getSnapshot = useCallback(() => {
    const full = store.getSnapshot();
    const res = selector(full);

    if (
      lastResultRef.current !== UNSET &&
      (options?.isEqual || Object.is)(lastResultRef.current, res)
    ) {
      return lastResultRef.current;
    }

    lastResultRef.current = res;
    return res;
  }, [store, selector, options?.isEqual]);

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
};

/**
 * Helper: build store-bound hooks for a single store instance.
 */
export const createWizardHooks = <T, StepId extends string = string>(
  store: IWizardStore<T, StepId>
) => ({
  useWizardState: () => useWizardStoreState<T, StepId>(store),
  useWizardValue: <P extends Path<T>>(
    path: P,
    options?: { isEqual?: (a: PathValue<T, P>, b: PathValue<T, P>) => boolean }
  ) => useWizardStoreValue<T, P>(store, path, options),
  useWizardError: (path: string) => useWizardStoreError(store, path),
  useWizardSelector: <TSelected>(
    selector: (state: IWizardState<T, StepId>) => TSelected,
    options?: { isEqual?: (a: TSelected, b: TSelected) => boolean }
  ) => useWizardStoreSelector<TSelected>(store, selector, options),
});
