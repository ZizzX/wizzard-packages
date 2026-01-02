import type { WizardMiddleware } from "../types";

/**
 * Helper to sanitize data for Redux DevTools.
 * - Converts Sets to Arrays
 * - Converts Maps to Objects
 * - Strips functions
 * - Simplifies complex objects like 'config'
 */
const serializeForDevTools = (data: any): any => {
  if (data instanceof Set) {
    return Array.from(data);
  }
  if (data instanceof Map) {
    return Object.fromEntries(data);
  }
  if (typeof data === "function") {
    return "[Function]";
  }
  if (Array.isArray(data)) {
    return data.map(serializeForDevTools);
  }
  if (typeof data === "object" && data !== null) {
    // Special handling for 'config' to avoid clutter and function issues
    if ("steps" in data && Array.isArray(data.steps) && "persistence" in data) {
         return {
             ...data,
             steps: data.steps.map((s: any) => ({
                 id: s.id,
                 label: s.label,
                 condition: s.condition ? "[Function]" : undefined,
                 component: s.component ? "[Component]" : undefined,
                 // Include other safe props
                 ...s
             }))
         };
    }

    const result: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === "config") {
            // Simplify config in the root state
            result[key] = serializeForDevTools(data[key]);
        } else {
            result[key] = serializeForDevTools(data[key]);
        }
      }
    }
    return result;
  }
  return data;
};

/**
 * Middleware for Redux DevTools integration
 */
export const devToolsMiddleware: WizardMiddleware<any, any> = (api) => {
  if (typeof window === "undefined" || !(window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    return (next) => (action) => next(action);
  }

  const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({
    name: "Wizard Stepper React",
    features: {
        pause: true, // start/pause recording of dispatched actions
        lock: true, // lock/unlock dispatching actions and side effects    
        persist: true, // persist states on page reloading
        export: true, // export history of actions in a file
        import: 'custom', // import history of actions from a file
        jump: true, // jump back and forth (time travelling)
        skip: true, // skip (cancel) actions
        reorder: true, // drag and drop actions in the history list 
        dispatch: true, // dispatch custom actions or action creators
        test: true // generate tests for the selected actions
    }
  });

  // Init with sanitized state
  devTools.init(serializeForDevTools(api.getSnapshot()));

  return (next) => (action) => {
    const result = next(action);
    const snapshot = api.getSnapshot();
    
    const serializedSnapshot = serializeForDevTools(snapshot);
    const serializedAction = serializeForDevTools(action);

    devTools.send(serializedAction, serializedSnapshot);
    return result;
  };
};
