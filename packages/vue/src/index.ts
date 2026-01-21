import {
  type IWizardConfig,
  type IWizardState,
  type Path,
  type PathValue,
  WizardStore,
  getByPath,
} from '@wizzard-packages/core';
import {
  type InjectionKey,
  type Ref,
  inject,
  onScopeDispose,
  provide,
  ref,
  shallowRef,
  watch,
} from 'vue';

/**
 * Injection key for the WizardStore
 */
export const WIZARD_STORE_KEY: InjectionKey<WizardStore<any, any>> = Symbol('WIZARD_STORE');

/**
 * Creates and provides a WizardStore to the Vue application.
 * Similar to WizardProvider in React.
 */
export function useProvideWizard<
  TSchema extends Record<string, any>,
  StepId extends string = string,
>(options: {
  config: IWizardConfig<TSchema, StepId>;
  initialData?: TSchema;
  initialStepId?: StepId;
}) {
  const store = new WizardStore<TSchema, StepId>(options.initialData || ({} as TSchema));

  // Initialize store
  store.dispatch({
    type: 'INIT',
    payload: {
      config: options.config,
      data: options.initialData || ({} as TSchema),
    },
  });

  // Set initial step
  const startId = options.initialStepId || options.config.steps[0]?.id;
  if (startId) {
    store.dispatch({
      type: 'SET_CURRENT_STEP_ID',
      payload: { stepId: startId },
    });
  }

  provide(WIZARD_STORE_KEY, store);

  // Watch for data changes and resolve active steps (similar to React's useEffect)
  const state = shallowRef(store.getSnapshot());
  const unsubscribe = store.subscribe(() => {
    state.value = store.getSnapshot();
  });

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let isInitialRun = true;

  watch(
    () => state.value.data,
    async (newData) => {
      if (debounceTimer) clearTimeout(debounceTimer);

      // Run immediately on initial load, debounce subsequent changes
      if (isInitialRun) {
        isInitialRun = false;
        const resolved = await store.resolveActiveSteps(newData);
        store.dispatch({
          type: 'SET_ACTIVE_STEPS',
          payload: { steps: resolved as any },
        });
      } else {
        debounceTimer = setTimeout(async () => {
          const resolved = await store.resolveActiveSteps(newData);
          store.dispatch({
            type: 'SET_ACTIVE_STEPS',
            payload: { steps: resolved as any },
          });
        }, 200);
      }
    },
    { deep: true, immediate: true }
  );

  onScopeDispose(() => {
    unsubscribe();
    if (debounceTimer) clearTimeout(debounceTimer);
  });

  return store;
}

/**
 * Injects the WizardStore. Throws if not provided.
 */
export function useWizardStore<
  TSchema extends Record<string, any> = any,
  StepId extends string = string,
>() {
  const store = inject(WIZARD_STORE_KEY) as WizardStore<TSchema, StepId>;
  if (!store) {
    throw new Error('useWizardStore must be used after useProvideWizard');
  }
  return store;
}

/**
 * Reactive state of the wizard.
 */
export function useWizardState<
  TSchema extends Record<string, any> = any,
  StepId extends string = string,
>() {
  const store = useWizardStore<TSchema, StepId>();
  const state = shallowRef(store.getSnapshot());

  const unsubscribe = store.subscribe(() => {
    state.value = store.getSnapshot();
  });

  onScopeDispose(unsubscribe);

  return state;
}

/**
 * Reactive value at a specific path.
 */
export function useWizardValue<TSchema extends Record<string, any>, P extends Path<TSchema>>(
  path: P
): Ref<PathValue<TSchema, P>> {
  const store = useWizardStore<TSchema>();
  const snapshot = ref(getByPath(store.getSnapshot().data, path as string));

  const unsubscribe = store.subscribe(() => {
    const newValue = getByPath(store.getSnapshot().data, path as string);
    if (snapshot.value !== newValue) {
      snapshot.value = newValue;
    }
  });

  onScopeDispose(unsubscribe);

  return snapshot as Ref<PathValue<TSchema, P>>;
}

/**
 * Reactive value and setter for a specific path.
 */
export function useWizardField<TSchema extends Record<string, any>, P extends Path<TSchema>>(
  path: P
) {
  const value = useWizardValue(path);
  const store = useWizardStore<TSchema>();

  const setValue = (val: PathValue<TSchema, P>) => {
    store.dispatch({
      type: 'SET_DATA',
      payload: { path: path as string, value: val },
    });
  };

  return [value, setValue] as const;
}

/**
 * Reactive error for a specific path.
 */
export function useWizardError(path: string): Ref<string | undefined> {
  const store = useWizardStore();
  const error = ref<string | undefined>();

  const unsubscribe = store.subscribe(() => {
    const errors = store.getSnapshot().errors;
    let foundError: string | undefined;

    for (const stepErrors of Object.values(errors)) {
      if ((stepErrors as any)[path]) {
        foundError = (stepErrors as any)[path];
        break;
      }
    }

    if (error.value !== foundError) {
      error.value = foundError;
    }
  });

  onScopeDispose(unsubscribe);

  return error;
}

/**
 * Reactive selector for derived state.
 */
export function useWizardSelector<TSelected>(
  selector: (state: IWizardState<any, any>) => TSelected
): Ref<TSelected> {
  const store = useWizardStore();
  const selected = ref(selector(store.getSnapshot()));

  const unsubscribe = store.subscribe(() => {
    const nextValue = selector(store.getSnapshot());
    if (selected.value !== nextValue) {
      selected.value = nextValue;
    }
  });

  onScopeDispose(unsubscribe);

  return selected as Ref<TSelected>;
}

/**
 * Direct access to wizard actions.
 */
export function useWizardActions<
  TSchema extends Record<string, any> = any,
  StepId extends string = string,
>() {
  const store = useWizardStore<TSchema, StepId>();

  const nextStep = async (options: { validate?: boolean } = { validate: true }) => {
    const snapshot = store.getSnapshot();
    const currentStepId = snapshot.currentStepId;
    if (!currentStepId) return false;

    const step = snapshot.config.steps.find((s) => (s as any).id === currentStepId);
    const shouldVal =
      options.validate ??
      step?.autoValidate ??
      snapshot.config.autoValidate ??
      !!step?.validationAdapter;

    if (shouldVal) {
      const ok = await store.validateStep(currentStepId);
      if (!ok) return false;
    }

    const resolvedSteps = await store.resolveActiveSteps(snapshot.data);
    const idx = resolvedSteps.findIndex((s) => s.id === currentStepId);

    if (idx !== -1 && idx < resolvedSteps.length - 1) {
      const nextStepId = resolvedSteps[idx + 1].id;
      const success = await store.goToStep(nextStepId as StepId, {
        validate: false,
        providedActiveSteps: resolvedSteps,
      });

      if (success) {
        if (!store.getSnapshot().errorSteps.has(currentStepId)) {
          const nextComp = new Set(store.getSnapshot().completedSteps);
          nextComp.add(currentStepId);
          store.dispatch({
            type: 'SET_COMPLETED_STEPS',
            payload: { steps: nextComp },
          });
        }
      }
      return success;
    }
    return false;
  };

  const prevStep = async () => {
    const snapshot = store.getSnapshot();
    const currentStepId = snapshot.currentStepId;
    if (!currentStepId) return false;

    const resolvedSteps = await store.resolveActiveSteps(snapshot.data);
    const idx = resolvedSteps.findIndex((s) => s.id === currentStepId);

    if (idx > 0) {
      const prevStepId = resolvedSteps[idx - 1].id;
      return await store.goToStep(prevStepId as StepId);
    }
    return false;
  };

  return {
    goToStep: store.goToStep.bind(store),
    nextStep,
    prevStep,
    setData: (path: string, value: any, options?: { replace?: boolean }) =>
      store.dispatch({
        type: 'SET_DATA',
        payload: { path, value, options },
      }),
    updateData: (updates: Partial<TSchema>) => {
      Object.entries(updates).forEach(([key, value]) => {
        store.dispatch({
          type: 'SET_DATA',
          payload: { path: key, value },
        });
      });
    },
    getData: <P extends string>(path: P, defaultValue?: any) => {
      const snapshot = store.getSnapshot();
      const value = getByPath(snapshot.data, path);
      return value !== undefined ? value : defaultValue;
    },
    setErrors: store.setStepErrors.bind(store),
    reset: (data?: any) => {
      const resetData = data || ({} as TSchema);
      store.dispatch({ type: 'RESET', payload: { data: resetData } });
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
      const activeSteps = snapshot.activeSteps;

      if (activeSteps.length > 0) {
        const startId = activeSteps[0].id;
        store.dispatch({
          type: 'SET_CURRENT_STEP_ID',
          payload: { stepId: startId as StepId },
        });
        store.dispatch({
          type: 'SET_HISTORY',
          payload: { history: [] },
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
    },
    validateStep: store.validateStep.bind(store),
    validateAll: store.validateAll.bind(store),
  };
}

/**
 * Helper to create a typed wizard factory for Vue (similar to React factory)
 */
export function createWizardFactory<
  TSchema extends Record<string, any>,
  StepId extends string = string,
>() {
  return {
    useProvideWizard: (options: {
      config: IWizardConfig<TSchema, StepId>;
      initialData?: TSchema;
      initialStepId?: StepId;
    }) => useProvideWizard<TSchema, StepId>(options),
    useWizardStore: () => useWizardStore<TSchema, StepId>(),
    useWizardState: () => useWizardState<TSchema, StepId>(),
    useWizardValue: <P extends Path<TSchema>>(path: P) => useWizardValue<TSchema, P>(path),
    useWizardField: <P extends Path<TSchema>>(path: P) => useWizardField<TSchema, P>(path),
    useWizardError: (path: string) => useWizardError(path),
    useWizardSelector: <TSelected>(selector: (state: IWizardState<TSchema, StepId>) => TSelected) =>
      useWizardSelector<TSelected>(selector),
    useWizardActions: () => useWizardActions<TSchema, StepId>(),
  };
}
