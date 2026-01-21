import { test, expect } from '../../fixtures/base';

/**
 * E2E Test: Basic Navigation
 *
 * Tests core navigation functionality of the wizard:
 * - Next/Previous button navigation
 * - Step direct navigation (breadcrumbs)
 * - IsFirst/IsLast step states
 * - Progress tracking
 * - History tracking
 */

test.describe('Basic Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('#/test/basic-navigation');
    await page.waitForSelector('[data-testid="wizard-container"]');
  });

  test('should render initial state correctly', async ({ page }) => {
    // Should start at step 1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
    await expect(page.locator('h2')).toContainText('Step 1');

    // Prev button should be disabled
    await expect(page.locator('[data-testid="prev-button"]')).toBeDisabled();

    // Next button should be enabled
    await expect(page.locator('[data-testid="next-button"]')).toBeEnabled();

    // Progress should be 0 or small (depending on implementation, here usually 1/3 or 0)
    // Checking visual indicators
    await expect(page.locator('[data-testid="step-indicator"]').nth(0)).toHaveClass(
      /bg-indigo-600/
    );
    await expect(page.locator('[data-testid="step-indicator"]').nth(1)).not.toHaveClass(
      /bg-indigo-600/
    );
  });

  test('should navigate to next step', async ({ page }) => {
    await page.click('[data-testid="next-button"]');

    // Should be on step 2
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
    await expect(page.locator('h2')).toContainText('Step 2');

    // Url should update (if configured, but mostly just state here)
    // History should update
    const history = await page.locator('[data-testid="wizard-history"]').textContent();
    expect(history).toContain('step1 → step2');
  });

  test('should navigate back to previous step', async ({ page }) => {
    // Go to step 2 first
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('h2')).toContainText('Step 2');

    // Click previous
    await page.click('[data-testid="prev-button"]');

    // Should be back at step 1
    await expect(page.locator('h2')).toContainText('Step 1');
    await expect(page.locator('[data-testid="prev-button"]')).toBeDisabled();
  });

  test('should navigate via breadcrumbs', async ({ page }) => {
    // Navigate to step 3
    await page.click('[data-testid="next-button"]');
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('h2')).toContainText('Step 3');

    // Click on Step 1 breadcrumb
    await page.click('[data-testid="breadcrumb-step-1"]');

    // Should be on Step 1
    await expect(page.locator('h2')).toContainText('Step 1');

    // Step 1 should be clickable (as it's visited)
    // Step 3 is now "visited" too in some implementations, or lost.
    // In this implementation history keeps track.
  });

  test('should handle last step correctly', async ({ page }) => {
    // Go to last step (Step 3)
    await page.click('[data-testid="next-button"]');
    await page.click('[data-testid="next-button"]');

    // Check button changes to "Complete" or "Submit" (data-testid="submit-button")
    await expect(page.locator('[data-testid="submit-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="submit-button"]')).toHaveText('Complete');

    // Try to click complete
    await page.click('[data-testid="submit-button"]');

    // Check for completion message
    await expect(page.locator('[data-testid="complete-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="complete-message"]')).toHaveText('Wizard Completed!');
  });

  test('should track navigation history', async ({ page }) => {
    // 1 -> 2
    await page.click('[data-testid="next-button"]');

    // 2 -> 3
    await page.click('[data-testid="next-button"]');

    // 3 -> 1 (via breadcrumb)
    await page.click('[data-testid="breadcrumb-step-1"]');

    // Check history text
    await expect(page.locator('[data-testid="wizard-history"]')).toContainText(
      'step1 → step2 → step3 → step1'
    );
  });
});
