import type { WizardMiddleware } from '@wizzard-packages/core';

/**
 * Simple logger middleware for Wizard actions
 */
export const loggerMiddleware: WizardMiddleware<any, any> = (api) => (next) => (action) => {
  console.warn(`Wizard Action: ${action.type}`);
  console.warn('Action payload:', action.payload);
  console.warn('State before:', api.getSnapshot());

  const result = next(action);

  console.warn('State after:', api.getSnapshot());

  return result;
};
