import type { WizardMiddleware } from "../types";

/**
 * Simple logger middleware for Wizard actions
 */
export const loggerMiddleware: WizardMiddleware<any, any> = (api) => (next) => (action) => {
  console.group(`Wizard Action: ${action.type}`);
  console.log('Action payload:', action.payload);
  console.log('State before:', api.getSnapshot());
  
  const result = next(action);
  
  console.log('State after:', api.getSnapshot());
  console.groupEnd();
  
  return result;
};
