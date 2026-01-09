import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Navigation Control
 *
 * Tests navigation control functionality:
 * - Sequential mode (strict linear flow)
 * - Visited mode (can jump to visited/completed steps)
 * - Free mode (can jump to any step)
 * - Step-level canNavigateTo function
 * - Role-based access control
 */

test.describe('Navigation Control', () => {
  test.beforeEach(async ({ page }) => {
    // Default mode is 'visited'
    await page.goto('#/test/navigation-control');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should allow navigation only to visited steps in visited mode (default)', async ({
    page,
  }) => {
    // Initially on step-1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Try to click on step-3 breadcrumb (not visited yet)
    await page.click('[data-testid="breadcrumb-step-3"]');

    // Should still be on step-1 (navigation blocked)
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Navigate to step-2 using next button
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    // Now can navigate back to step-1 (it's visited)
    await page.click('[data-testid="breadcrumb-step-1"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Can navigate to step-2 (it's visited)
    await page.click('[data-testid="breadcrumb-step-2"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should allow only adjacent steps in sequential mode', async ({ page }) => {
    await page.goto('#/test/navigation-control?mode=sequential');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Initially on step-1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Try to jump to step-3 (not adjacent)
    await page.click('[data-testid="breadcrumb-step-3"]');

    // Should still be on step-1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Navigate to step-2 (adjacent)
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    // Can go back to step-1 (adjacent)
    await page.click('[data-testid="prev-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Try to click step-2 breadcrumb (adjacent, should work)
    await page.click('[data-testid="breadcrumb-step-2"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should allow free navigation in free mode', async ({ page }) => {
    await page.goto('#/test/navigation-control?mode=free');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Can jump directly to any step (except step-4 which has canNavigateTo)
    await page.click('[data-testid="breadcrumb-step-3"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    await page.click('[data-testid="breadcrumb-step-1"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    await page.click('[data-testid="breadcrumb-step-2"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should respect step-level canNavigateTo function', async ({ page }) => {
    // Step-4 has canNavigateTo that requires step1Data to be filled
    await page.goto('#/test/navigation-control?mode=visited&role=user');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Navigate to step-3 first to make it visited
    await page.click('[data-testid="next-button"]'); // step-1 -> step-2
    await page.click('[data-testid="next-button"]'); // step-2 -> step-3
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    // Try to navigate to step-4 without filling step1Data
    await page.click('[data-testid="breadcrumb-step-4"]');

    // Should still be on step-3 (blocked by canNavigateTo - no step1Data)
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    // Go back to step-1 and fill step1Data
    await page.click('[data-testid="breadcrumb-step-1"]');
    await page.fill('[data-testid="step1-input"]', 'John Doe');

    // Navigate back to step-3
    await page.click('[data-testid="breadcrumb-step-3"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    // Now can navigate to step-4 (step1Data is filled and step-3 is visited)
    await page.click('[data-testid="breadcrumb-step-4"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 4');
  });

  test('should allow admin role to bypass navigation restrictions', async ({ page }) => {
    // Admin test - should jump anywhere
    await page.goto('#/test/navigation-control?mode=free&role=admin');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Give a moment for role sync if any
    await page.waitForTimeout(500);

    // Admin can jump to any step in free mode
    await page.click('[data-testid="breadcrumb-step-4"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 4 of 4');

    await page.click('[data-testid="breadcrumb-step-2"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2 of 4');
  });

  test('should block regular user from step-4 in free mode without data', async ({ page }) => {
    // Even in free mode, canNavigateTo should be respected
    await page.goto('#/test/navigation-control?mode=free&role=user');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Try to jump to step-4 (should be blocked by canNavigateTo)
    await page.click('[data-testid="breadcrumb-step-4"]');

    // Should stay on step 1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1 of 4');

    // Fill data
    await page.fill('[data-testid="step1-input"]', 'Regular User');

    // Still blocked from step-4 because step-3 was not visited
    await page.click('[data-testid="breadcrumb-step-4"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1 of 4');

    // Go to step 3 first
    await page.click('[data-testid="breadcrumb-step-3"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3 of 4');

    // Now can go to step 4
    await page.click('[data-testid="breadcrumb-step-4"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 4 of 4');
  });

  test('should update breadcrumb status correctly', async ({ page }) => {
    // Navigate through steps and check breadcrumb statuses
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveAttribute(
      'data-status',
      'current'
    );

    // Navigate to step-2
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    // Now step-1 should be visited and step-2 should be current
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveAttribute(
      'data-status',
      /visited|completed/
    );
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).toHaveAttribute(
      'data-status',
      'current'
    );

    // Navigate to step-3
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    // Now step-2 should be visited and step-3 should be current
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).toHaveAttribute(
      'data-status',
      /visited|completed/
    );
    await expect(page.locator('[data-testid="breadcrumb-step-3"]')).toHaveAttribute(
      'data-status',
      'current'
    );
  });

  test('should work with next/prev buttons in all modes', async ({ page }) => {
    // Test sequential mode
    await page.goto('#/test/navigation-control?mode=sequential');
    await page.waitForSelector('[data-testid="wizard-container"]');

    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    await page.click('[data-testid="prev-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Test visited mode
    await page.goto('#/test/navigation-control?mode=visited');
    await page.waitForSelector('[data-testid="wizard-container"]');

    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    await page.click('[data-testid="prev-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Test free mode
    await page.goto('#/test/navigation-control?mode=free');
    await page.waitForSelector('[data-testid="wizard-container"]');

    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    await page.click('[data-testid="prev-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
  });
});
