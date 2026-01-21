import { test, expect } from '../../fixtures/base';

/**
 * E2E Test: State Persistence
 *
 * Tests wizard persistence functionality:
 * - LocalStorage adapter
 * - Memory adapter
 * - Persistence on step change
 * - Persistence on field change
 * - Data restoration on page reload
 */

test.describe('State Persistence', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should persist data to localStorage on step change', async ({ page }) => {
    await page.goto('#/test/persistence-demo');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Fill some data
    await page.locator('[data-testid="name-input"]').fill('John Doe');
    await page.locator('[data-testid="email-input"]').fill('john@example.com');

    // Move to next step (triggers persistence)
    await page.click('[data-testid="next-button"]');

    // Check localStorage
    const storageData = await page.evaluate(() => {
      const key = Object.keys(localStorage).find((k) => k.includes('wizard'));
      return key ? localStorage.getItem(key) : null;
    });

    expect(storageData).toBeTruthy();
    expect(storageData).toContain('John Doe');
    expect(storageData).toContain('john@example.com');
  });

  test('should restore data on page reload', async ({ page }) => {
    await page.goto('#/test/persistence-demo');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Fill data and navigate
    await page.locator('[data-testid="name-input"]').fill('Jane Smith');
    await page.click('[data-testid="next-button"]');
    await page.locator('[data-testid="address-input"]').fill('123 Main St');

    // Reload page
    await page.reload();
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Should be on step 2 (restored)
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    // Go back to step 1 to check data
    await page.click('[data-testid="prev-button"]');
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('Jane Smith');
  });

  test('should restore current step on reload', async ({ page }) => {
    await page.goto('#/test/persistence-demo');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Navigate to step 3
    await page.locator('[data-testid="email-input"]').fill('test@test.com');
    await page.click('[data-testid="next-button"]'); // Step 2
    await page.click('[data-testid="next-button"]'); // Step 3

    // Reload
    await page.reload();
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Should be on step 3
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');
  });

  test('should persist data onChange mode', async ({ page }) => {
    await page.goto('#/test/persistence-demo?mode=onChange');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Type in field
    await page.locator('[data-testid="name-input"]').fill('Auto Save Test');

    // Wait for debounce
    await page.waitForTimeout(500);

    // Check localStorage immediately (without step change)
    const storageData = await page.evaluate(() => {
      const key = Object.keys(localStorage).find((k) => k.includes('wizard'));
      return key ? localStorage.getItem(key) : null;
    });

    expect(storageData).toContain('Auto Save Test');
  });

  test('should clear storage on reset', async ({ page }) => {
    await page.goto('#/test/persistence-demo');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Add some data
    await page.locator('[data-testid="name-input"]').fill('Test User');
    await page.click('[data-testid="next-button"]');

    // Verify data is in storage
    let keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.includes('wizard'))
    );
    expect(keys.length).toBeGreaterThan(0);

    // Click reset button
    await page.click('[data-testid="reset-button"]');

    // Storage should be cleared
    keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.includes('wizard')));
    expect(keys.length).toBe(0);

    // Form should be reset
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('');
  });

  test('should restore visited steps state', async ({ page }) => {
    await page.goto('#/test/persistence-demo');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Navigate through steps
    await page.locator('[data-testid="email-input"]').fill('test@test.com');
    await page.click('[data-testid="next-button"]');
    await page.click('[data-testid="next-button"]');

    // Reload
    await page.reload();
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Steps 1 and 2 should be marked as visited
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveClass(
      /visited|completed/
    );
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).toHaveClass(
      /visited|completed/
    );
  });

  test('should handle storage key isolation', async ({ page }) => {
    // Create two wizards with different storage keys
    await page.goto('#/test/persistence-demo?key=wizard1');
    await page.waitForSelector('[data-testid="wizard-container"]');

    await page.locator('[data-testid="name-input"]').fill('Wizard 1 Data');
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    // Navigate to second wizard
    await page.goto('#/test/persistence-demo?key=wizard2');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Should be empty (different storage key)
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('');

    // Fill different data
    await page.locator('[data-testid="name-input"]').fill('Wizard 2 Data');
    await page.click('[data-testid="next-button"]');

    // Go back to first wizard
    await page.goto('#/test/persistence-demo?key=wizard1');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // It should have restored Step 2, so go back to Step 1 to check data
    await page.click('[data-testid="prev-button"]');

    // Should have original data
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('Wizard 1 Data');
  });
});
