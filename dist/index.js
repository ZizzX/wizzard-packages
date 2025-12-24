var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/context/WizardContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useSyncExternalStore,
  useRef,
  useTransition
} from "react";

// src/adapters/persistence/MemoryAdapter.ts
var MemoryAdapter = class {
  constructor() {
    __publicField(this, "storage", {});
  }
  saveStep(stepId, data) {
    this.storage[stepId] = data;
  }
  getStep(stepId) {
    return this.storage[stepId];
  }
  clear() {
    this.storage = {};
  }
};

// src/utils/data.ts
function getByPath(obj, path, defaultValue) {
  if (!path) return obj;
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let result = obj;
  for (const key of keys) {
    if (result === void 0 || result === null) return defaultValue;
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function setByPath(obj, path, value) {
  if (!path) return value;
  if (!path.includes(".") && !path.includes("[") && !path.includes("]")) {
    return { ...obj, [path]: value };
  }
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  const update = (current, index) => {
    if (index === keys.length) return value;
    const key = keys[index];
    const isKeyNumeric = !isNaN(Number(key)) && key.trim() !== "";
    let nextLevel = current;
    if (!nextLevel || typeof nextLevel !== "object") {
      nextLevel = isKeyNumeric ? [] : {};
    } else {
      nextLevel = Array.isArray(nextLevel) ? [...nextLevel] : { ...nextLevel };
    }
    const nextKey = isKeyNumeric ? Number(key) : key;
    nextLevel[nextKey] = update(nextLevel[nextKey], index + 1);
    return nextLevel;
  };
  return update(obj, 0);
}

// src/context/WizardContext.tsx
import { jsx } from "react/jsx-runtime";
var WizardStateContext = createContext(void 0);
var WizardActionsContext = createContext(void 0);
var WizardStore = class {
  constructor(initialData) {
    __publicField(this, "state");
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "getSnapshot", () => this.state);
    __publicField(this, "subscribe", (listener) => {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    });
    this.state = { data: initialData, errors: {} };
  }
  update(newData) {
    this.state = { ...this.state, data: newData };
    this.notify();
  }
  updateErrors(newErrors) {
    this.state = { ...this.state, errors: newErrors };
    this.notify();
  }
  notify() {
    this.listeners.forEach((l) => l());
  }
};
function WizardProvider({
  config,
  initialData,
  children
}) {
  const [currentStepId, setCurrentStepId] = useState("");
  const [visitedSteps, setVisitedSteps] = useState(/* @__PURE__ */ new Set());
  const [completedSteps, setCompletedSteps] = useState(/* @__PURE__ */ new Set());
  const [errorSteps, setErrorSteps] = useState(/* @__PURE__ */ new Set());
  const [, setAllErrorsState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const storeRef = useRef(new WizardStore(initialData || {}));
  const [wizardData, setWizardData] = useState(initialData || {});
  const persistenceAdapter = useMemo(() => {
    return config.persistence?.adapter || new MemoryAdapter();
  }, [config.persistence?.adapter]);
  const persistenceMode = config.persistence?.mode || "onStepChange";
  const [activeSteps, setActiveSteps] = useState(
    () => config.steps.filter((s) => !s.condition || s.condition(wizardData))
  );
  useEffect(() => {
    const nextActiveSteps = config.steps.filter((step) => {
      if (step.condition) {
        return step.condition(wizardData);
      }
      return true;
    });
    const currentIds = activeSteps.map((s) => s.id).join(",");
    const nextIds = nextActiveSteps.map((s) => s.id).join(",");
    if (currentIds !== nextIds) {
      setActiveSteps(nextActiveSteps);
    }
  }, [config.steps, wizardData, activeSteps]);
  useEffect(() => {
    if (!currentStepId && activeSteps.length > 0) {
      setCurrentStepId(activeSteps[0].id);
      setIsLoading(false);
    }
  }, [activeSteps, currentStepId]);
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
  const META_KEY = "__wizzard_meta__";
  const hydrate = useCallback(() => {
    setIsLoading(true);
    const metaFn = persistenceAdapter.getStep(META_KEY);
    if (metaFn) {
      if (metaFn.currentStepId) setCurrentStepId(metaFn.currentStepId);
      if (metaFn.visited) setVisitedSteps(new Set(metaFn.visited));
      if (metaFn.completed) setCompletedSteps(new Set(metaFn.completed));
    }
    const loadedData = {};
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
  }, [config.steps, persistenceAdapter]);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  const saveData = useCallback(
    (mode, stepId, data) => {
      if (mode === persistenceMode || mode === "manual") {
        persistenceAdapter.saveStep(stepId, data);
      }
    },
    [persistenceAdapter, persistenceMode]
  );
  const validationTimeoutRef = useRef(
    null
  );
  const validateStep = useCallback(
    async (stepId, data) => {
      const step = config.steps.find((s) => s.id === stepId);
      if (!step || !step.validationAdapter) return true;
      const result = await step.validationAdapter.validate(data);
      if (!result.isValid) {
        const newAllErrors = {
          ...storeRef.current.getSnapshot().errors,
          [stepId]: result.errors || {}
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
    [config.steps]
  );
  const setStepData = useCallback(
    (stepId, data) => {
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
    [persistenceMode, saveData]
  );
  const setData = useCallback(
    (path, value, options) => {
      const prevData = storeRef.current.getSnapshot().data;
      const newData = setByPath(prevData, path, value);
      storeRef.current.update(newData);
      startTransition(() => {
        setWizardData(newData);
      });
      if (options?.debounceValidation) {
        if (validationTimeoutRef.current)
          clearTimeout(validationTimeoutRef.current);
        validationTimeoutRef.current = setTimeout(() => {
          validateStep(currentStepId, newData);
        }, options.debounceValidation);
      } else {
        validateStep(currentStepId, newData);
      }
      if (persistenceMode === "onChange") {
        saveData("onChange", currentStepId, newData);
      }
    },
    [persistenceMode, saveData, currentStepId, validateStep]
  );
  const getData = useCallback((path, defaultValue) => {
    return getByPath(storeRef.current.getSnapshot().data, path, defaultValue);
  }, []);
  const handleStepChange = useCallback(
    (field, value) => {
      if (!currentStepId) return;
      setData(field, value);
    },
    [setData, currentStepId]
  );
  const validateAll = useCallback(async () => {
    let isValid = true;
    const currentData = storeRef.current.getSnapshot().data;
    for (const step of activeSteps) {
      const stepValid = await validateStep(step.id, currentData);
      if (!stepValid) isValid = false;
    }
    return isValid;
  }, [activeSteps, validateStep]);
  const goToStep = useCallback(
    async (stepId) => {
      const targetIndex = activeSteps.findIndex((s) => s.id === stepId);
      if (targetIndex === -1) return false;
      const currentData = storeRef.current.getSnapshot().data;
      if (targetIndex > currentStepIndex) {
        const shouldValidate = currentStep?.autoValidate ?? config.autoValidate ?? true;
        if (shouldValidate) {
          const isValid = await validateStep(currentStepId, currentData);
          if (!isValid) return false;
        }
      }
      if (persistenceMode === "onStepChange" && currentStep) {
        saveData("onStepChange", currentStepId, currentData);
      }
      const nextVisited = new Set(visitedSteps).add(currentStepId);
      setVisitedSteps(nextVisited);
      setCurrentStepId(stepId);
      if (persistenceMode !== "manual") {
        persistenceAdapter.saveStep(META_KEY, {
          currentStepId: stepId,
          visited: Array.from(nextVisited),
          completed: Array.from(completedSteps)
        });
      }
      window.scrollTo(0, 0);
      return true;
    },
    [
      activeSteps,
      currentStepId,
      currentStep,
      currentStepIndex,
      config.autoValidate,
      persistenceMode,
      saveData,
      validateStep,
      visitedSteps,
      completedSteps,
      persistenceAdapter
    ]
  );
  const goToNextStep = useCallback(async () => {
    if (isLastStep) return;
    const nextStep = activeSteps[currentStepIndex + 1];
    if (nextStep) {
      const success = await goToStep(nextStep.id);
      if (success) {
        const nextCompleted = new Set(completedSteps).add(currentStepId);
        setCompletedSteps(nextCompleted);
        if (persistenceMode !== "manual") {
          persistenceAdapter.saveStep(META_KEY, {
            currentStepId: nextStep.id,
            visited: Array.from(new Set(visitedSteps).add(currentStepId)),
            completed: Array.from(nextCompleted)
          });
        }
      }
    }
  }, [
    activeSteps,
    currentStepIndex,
    isLastStep,
    currentStepId,
    goToStep,
    visitedSteps,
    completedSteps,
    persistenceMode,
    persistenceAdapter
  ]);
  const goToPrevStep = useCallback(() => {
    if (isFirstStep) return;
    const prevStep = activeSteps[currentStepIndex - 1];
    if (prevStep) {
      goToStep(prevStep.id);
    }
  }, [activeSteps, currentStepIndex, isFirstStep, goToStep]);
  const clearStorage = useCallback(
    () => persistenceAdapter.clear(),
    [persistenceAdapter]
  );
  const save = useCallback(
    () => saveData("manual", currentStepId, storeRef.current.getSnapshot().data),
    [saveData, currentStepId]
  );
  const stateValue = useMemo(
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
      store: storeRef.current
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
      errorSteps
    ]
  );
  const actionsValue = useMemo(
    () => ({
      goToNextStep,
      goToPrevStep,
      goToStep,
      setStepData,
      handleStepChange,
      validateStep: (sid) => validateStep(sid, storeRef.current.getSnapshot().data),
      validateAll,
      save,
      clearStorage,
      setData,
      getData
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
      getData
    ]
  );
  return /* @__PURE__ */ jsx(WizardStateContext.Provider, { value: stateValue, children: /* @__PURE__ */ jsx(WizardActionsContext.Provider, { value: actionsValue, children }) });
}
function useWizardState() {
  const context = useContext(WizardStateContext);
  if (!context) {
    throw new Error("useWizardState must be used within a WizardProvider");
  }
  return context;
}
function useWizardValue(path) {
  const { store } = useWizardState();
  const lastStateRef = useRef(null);
  const lastValueRef = useRef(null);
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
function useWizardError(path) {
  const { store } = useWizardState();
  const lastStateRef = useRef(null);
  const lastValueRef = useRef(null);
  const getSnapshot = useCallback(() => {
    const fullState = store.getSnapshot();
    const errors = fullState.errors;
    if (errors === lastStateRef.current) {
      return lastValueRef.current;
    }
    let foundError;
    Object.values(errors).forEach((stepErrors) => {
      const typedStepErrors = stepErrors;
      if (typedStepErrors[path]) foundError = typedStepErrors[path];
    });
    lastStateRef.current = errors;
    lastValueRef.current = foundError;
    return foundError;
  }, [store, path]);
  return useSyncExternalStore(store.subscribe, getSnapshot);
}
function useWizardSelector(selector) {
  const { store } = useWizardState();
  const lastStateRef = useRef(null);
  const lastResultRef = useRef(null);
  const getSnapshot = useCallback(() => {
    const fullState = store.getSnapshot();
    if (fullState === lastStateRef.current) {
      return lastResultRef.current;
    }
    const result = selector(fullState.data);
    lastStateRef.current = fullState;
    lastResultRef.current = result;
    return result;
  }, [store, selector]);
  return useSyncExternalStore(store.subscribe, getSnapshot);
}
function useWizardActions() {
  const context = useContext(WizardActionsContext);
  if (!context) {
    throw new Error("useWizardActions must be used within a WizardProvider");
  }
  return context;
}
function useWizardContext() {
  const state = useWizardState();
  const actions = useWizardActions();
  const wizardData = useWizardSelector((s) => s);
  const fullState = state.store.getSnapshot();
  return useMemo(
    () => ({
      ...state,
      ...actions,
      wizardData,
      allErrors: fullState.errors
    }),
    [state, actions, wizardData, fullState.errors]
  );
}

// src/hooks/useWizard.ts
var useWizard = () => {
  return useWizardContext();
};

// src/adapters/persistence/LocalStorageAdapter.ts
var LocalStorageAdapter = class {
  constructor(prefix = "wizard_") {
    __publicField(this, "prefix");
    this.prefix = prefix;
  }
  getKey(stepId) {
    return `${this.prefix}${stepId}`;
  }
  saveStep(stepId, data) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.getKey(stepId), JSON.stringify(data));
    } catch (error) {
      console.warn("LocalStorageAdapter: Failed to save step", error);
    }
  }
  getStep(stepId) {
    if (typeof window === "undefined") return void 0;
    try {
      const item = localStorage.getItem(this.getKey(stepId));
      return item ? JSON.parse(item) : void 0;
    } catch (error) {
      console.warn("LocalStorageAdapter: Failed to get step", error);
      return void 0;
    }
  }
  clear() {
    if (typeof window === "undefined") return;
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
};

// src/adapters/validation/ZodAdapter.ts
var ZodAdapter = class {
  constructor(schema) {
    __publicField(this, "schema");
    this.schema = schema;
  }
  async validate(data) {
    const result = await this.schema.safeParseAsync(data);
    if (result.success) {
      return { isValid: true };
    }
    const errors = {};
    if (result.error) {
      result.error.issues.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
    }
    return { isValid: false, errors };
  }
};

// src/adapters/validation/YupAdapter.ts
var YupAdapter = class {
  constructor(schema) {
    __publicField(this, "schema");
    this.schema = schema;
  }
  async validate(data) {
    try {
      await this.schema.validate(data, { abortEarly: false });
      return { isValid: true };
    } catch (err) {
      if (err && typeof err === "object" && "inner" in err) {
        const yupError = err;
        const errors = {};
        yupError.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        return { isValid: false, errors };
      }
      throw err;
    }
  }
};
export {
  LocalStorageAdapter,
  MemoryAdapter,
  WizardProvider,
  YupAdapter,
  ZodAdapter,
  getByPath,
  setByPath,
  useWizard,
  useWizardActions,
  useWizardContext,
  useWizardError,
  useWizardSelector,
  useWizardState,
  useWizardValue
};
//# sourceMappingURL=index.js.map