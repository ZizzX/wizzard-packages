import { test as base } from '@playwright/test';

/**
 * Extend Playwright test with custom fixtures for wizard testing
 */
export const test = base.extend({
  // Add custom fixtures here if needed
});

export { expect } from '@playwright/test';
