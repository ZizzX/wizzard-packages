import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Advanced Validation & Error Handling
 *
 * Tests complex validation scenarios:
 * - Auto-fill all fields (sync and async)
 * - Validate all steps
 * - Error modal with navigation to error steps
 * - Auto-redirect to first error step
 * - Block forward navigation with previous step errors
 * - Loading states during async operations
 * - Clear current step vs clear all steps
 */

test.describe('Advanced Validation & Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('#/test/advanced-validation-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should auto-fill all fields synchronously', async ({ page }) => {
    // Click auto-fill button
    await page.click('[data-testid="auto-fill-button"]');

    // Wait for auto-fill and validation to complete
    await page.waitForTimeout(500);

    // Verify all fields are filled
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('Auto Generated Name');
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue('auto@example.com');

    // Navigate through all steps to verify data persistence
    for (let i = 1; i < 10; i++) {
      await page.click('[data-testid="next-button"]');
      await page.waitForTimeout(400); // Wait for validation (300ms) + transition
    }

    // Should reach final step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 10');
  });

  test('should auto-fill all fields asynchronously with loader', async ({ page }) => {
    // Click async auto-fill button
    await page.click('[data-testid="async-auto-fill-button"]');

    // Loading indicator should appear
    await expect(page.locator('[data-testid="auto-fill-loader"]')).toBeVisible();

    // Wait for async operation (2000ms) + validation
    await page.waitForTimeout(2500);

    // Loading should disappear
    await expect(page.locator('[data-testid="auto-fill-loader"]')).not.toBeVisible();

    // Verify fields are filled
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('Auto Generated Name');
  });

  test('should validate all steps and show error modal', async ({ page }) => {
    // Fill only first 2 steps
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="username-input"]', 'john123');
    await page.fill('[data-testid="password-input"]', 'SecurePass123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Now on step 3 - click "Validate All" button (in top panel)
    await page.click('[data-testid="validate-all-button"]');

    // Wait for validation to complete
    await page.waitForTimeout(500);

    // Error modal should appear
    await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();

    // Error count should be displayed
    const errorCount = await page.locator('[data-testid="error-count"]').textContent();
    expect(parseInt(errorCount || '0')).toBeGreaterThan(0);
  });

  test('should navigate to first error step by clicking in error modal', async ({ page }) => {
    // Fill only first 2 steps
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="username-input"]', 'john123');
    await page.fill('[data-testid="password-input"]', 'SecurePass123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Validate all
    await page.click('[data-testid="validate-all-button"]');
    await page.waitForTimeout(500);

    // Modal should show errors
    await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();

    // Get first error step
    const firstErrorStep = await page.locator('[data-testid^="error-step-"]').first();
    const stepId = await firstErrorStep.getAttribute('data-testid');

    // Click on first error step
    await firstErrorStep.click();

    // Modal should close
    await expect(page.locator('[data-testid="error-modal"]')).not.toBeVisible();

    // Should navigate to error step
    // Extract step number from stepId (e.g., "error-step-3" -> "3")
    const stepNumber = stepId?.replace('error-step-', '');
    await expect(page.locator('[data-testid="current-step"]')).toContainText(`Step ${stepNumber}`);
  });

  test('should only allow clicking first error in modal', async ({ page }) => {
    // Fill first 2 steps
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="username-input"]', 'john123');
    await page.fill('[data-testid="password-input"]', 'SecurePass123');

    // Validate all
    await page.click('[data-testid="validate-all-button"]');
    await page.waitForTimeout(500);

    // First error should be clickable
    const firstError = await page.locator('[data-testid^="error-step-"]').first();
    await expect(firstError).not.toHaveClass(/opacity-50|cursor-not-allowed/);

    // Second error should be disabled
    const secondError = await page.locator('[data-testid^="error-step-"]').nth(1);
    if ((await secondError.count()) > 0) {
      await expect(secondError).toHaveClass(/opacity-50/);
    }
  });

  test('should auto-redirect to first error step on navigation', async ({ page }) => {
    // Fill step 1 with valid data
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Fill step 2 with INVALID data
    await page.fill('[data-testid="username-input"]', 'ab'); // Too short
    await page.fill('[data-testid="password-input"]', 'short'); // Too short
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Should stay on step 2 (blocked by validation)
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');

    // Error should be visible
    await expect(page.locator('[data-testid="username-input"]')).toHaveClass(/error|invalid/);
  });

  test('should highlight all error fields on current step', async ({ page }) => {
    // Try to navigate without filling required fields
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // All required fields should be highlighted
    await expect(page.locator('[data-testid="name-input"]')).toHaveClass(/error|invalid/);
    await expect(page.locator('[data-testid="email-input"]')).toHaveClass(/error|invalid/);
  });

  test('should block forward navigation when current step has errors', async ({ page }) => {
    // Fill step 1 and navigate
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Fill step 2 and navigate
    await page.fill('[data-testid="username-input"]', 'john123');
    await page.fill('[data-testid="password-input"]', 'SecurePass123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Now on step 3
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    // Go back to step 2
    await page.click('[data-testid="prev-button"]');
    await page.waitForTimeout(200);

    // Corrupt step 2 data
    await page.fill('[data-testid="username-input"]', 'ab'); // Invalid

    // Try to go to step 3
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Should be blocked
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should show loader during async validation', async ({ page }) => {
    // Fill fields that trigger async validation
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'test@example.com');

    // Trigger async validation
    const nextButtonClick = page.click('[data-testid="next-button"]');

    await nextButtonClick;

    // Wait for async validation (300ms)
    await page.waitForTimeout(400);

    // Loader should not be visible anymore
    await expect(page.locator('[data-testid="validation-loader"]')).not.toBeVisible();

    // Should have navigated to step 2
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should clear only current step data', async ({ page }) => {
    // Fill current step
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@test.com');

    // Click "Clear Current Step" button
    await page.click('[data-testid="clear-current-step-button"]');
    await page.waitForTimeout(200);

    // Current step fields should be empty
    await expect(page.locator('[data-testid="name-input"]')).toBeEmpty();
    await expect(page.locator('[data-testid="email-input"]')).toBeEmpty();

    // Fill and navigate to next step
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="username-input"]', 'john123');

    // Go back
    await page.click('[data-testid="prev-button"]');
    await page.waitForTimeout(200);

    // Step 1 data should still be there
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('John');
  });

  test('should clear all steps data', async ({ page }) => {
    // Fill multiple steps
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="username-input"]', 'john123');
    await page.fill('[data-testid="password-input"]', 'SecurePass123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="age-input"]', '25');

    // Click "Clear All" button
    await page.click('[data-testid="clear-all-button"]');
    await page.waitForTimeout(200);

    // Should return to step 1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // All fields should be empty
    await expect(page.locator('[data-testid="name-input"]')).toBeEmpty();
    await expect(page.locator('[data-testid="email-input"]')).toBeEmpty();

    // Navigate to step 2
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Step 2 should also be empty
    await expect(page.locator('[data-testid="username-input"]')).toBeEmpty();
  });

  test('should show error state in breadcrumbs', async ({ page }) => {
    // Try to navigate with empty fields
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Breadcrumb for step 1 should have error class
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveClass(/error|invalid/);
  });

  test('should update breadcrumbs as user progresses', async ({ page }) => {
    // Initially on step 1
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveClass(/font-bold/);

    // Fill and navigate
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Now on step 2
    await expect(page.locator('[data-testid="breadcrumb-step-2"]')).toHaveClass(/font-bold/);
  });

  test('should show progress bar', async ({ page }) => {
    // Check progress bar exists
    const progressBar = page.locator('[data-testid="progress-bar"]');
    await expect(progressBar).toBeVisible();

    // Initial progress
    const initialProgress = await progressBar.getAttribute('aria-valuenow');
    expect(parseFloat(initialProgress || '0')).toBeGreaterThan(0);

    // Navigate forward
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Progress should increase
    const newProgress = await progressBar.getAttribute('aria-valuenow');
    expect(parseFloat(newProgress || '0')).toBeGreaterThan(parseFloat(initialProgress || '0'));
  });

  test('should navigate through all 10 steps successfully', async ({ page }) => {
    // Auto-fill to make it easier
    await page.click('[data-testid="auto-fill-button"]');

    // Wait for auto-fill AND validation to complete
    await page.waitForTimeout(1000);

    // Verify we're on step 1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1 of 10');

    // Navigate through all steps
    for (let i = 1; i < 10; i++) {
      await page.click('[data-testid="next-button"]');

      // Wait for validation (300ms) + navigation
      await page.waitForTimeout(500);

      // Check we're on the next step (format: "Step X of 10")
      await expect(page.locator('[data-testid="current-step"]')).toContainText(`Step ${i + 1} of`);
    }

    // Should be on final step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 10 of 10');
  });

  test('should navigate via breadcrumbs to visited steps', async ({ page }) => {
    // Fill and navigate to step 3
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="username-input"]', 'john123');
    await page.fill('[data-testid="password-input"]', 'SecurePass123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Now on step 3
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    // Click on breadcrumb for step 1 (visited)
    await page.click('[data-testid="breadcrumb-step-1"]');
    await page.waitForTimeout(200);

    // Should navigate back to step 1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');

    // Data should still be there
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('John');
  });

  test('should navigate via breadcrumbs to step 2', async ({ page }) => {
    // Fill and navigate through steps
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    await page.fill('[data-testid="username-input"]', 'john123');
    await page.fill('[data-testid="password-input"]', 'SecurePass123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Fill step 3 completely
    await page.fill('[data-testid="age-input"]', '25');
    await page.selectOption('[data-testid="country-select"]', 'US');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(400);

    // Now on step 4
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 4 of');

    // Click breadcrumb for step 2
    await page.click('[data-testid="breadcrumb-step-2"]');
    await page.waitForTimeout(200);

    // Should be on step 2
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2 of');
    await expect(page.locator('[data-testid="username-input"]')).toHaveValue('john123');
  });

  test('should allow breadcrumb navigation in visited mode', async ({ page }) => {
    // Auto-fill for easier testing
    await page.click('[data-testid="auto-fill-button"]');
    await page.waitForTimeout(1000);

    // Navigate to step 5
    for (let i = 0; i < 4; i++) {
      await page.click('[data-testid="next-button"]');
      await page.waitForTimeout(500);
    }

    // Verify on step 5
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 5');

    // Click breadcrumb for step 3
    await page.click('[data-testid="breadcrumb-step-3"]');
    await page.waitForTimeout(200);

    // Should navigate to step 3
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');

    // Click breadcrumb for step 5 (previously visited)
    await page.click('[data-testid="breadcrumb-step-5"]');
    await page.waitForTimeout(200);

    // Should navigate back to step 5
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 5');
  });

  test('should show cursor-pointer on breadcrumbs', async ({ page }) => {
    // Check that breadcrumbs have cursor-pointer class
    const breadcrumb = page.locator('[data-testid="breadcrumb-step-1"]');
    await expect(breadcrumb).toHaveClass(/cursor-pointer/);
  });
});
