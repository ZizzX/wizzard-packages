import { WizardMiddleware } from "../types";

/**
 * Middleware for Redux DevTools integration
 */
export const devToolsMiddleware: WizardMiddleware<any, any> = (api) => {
  if (typeof window === "undefined" || !(window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    return (next) => (action) => next(action);
  }

  const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({
    name: "Wizard Stepper React",
  });

  devTools.init(api.getSnapshot());

  return (next) => (action) => {
    const result = next(action);
    devTools.send(action, api.getSnapshot());
    return result;
  };
};
