import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Advanced Validation & Error Handling
 * 
 * Tests complex validation scenarios:
 * - Auto-fill all fields (sync and async)
 * - Validate all steps from step 3
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
    
    // Wait for auto-fill to complete
    await page.waitForTimeout(300);
    
    // Verify all fields are filled
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('Auto Generated Name');
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue('auto@example.com');
    
    // Navigate through all steps to verify data persistence
    for (let i = 1; i < 10; i++) {
      await page.click('[data-testid="next-button"]');
      await page.waitForTimeout(200);
    }
    
    // Should reach final step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 10');
  });

  test('should auto-fill all fields asynchronously with loader', async ({ page }) => {
    // Click async auto-fill button
    await page.click('[data-testid="async-auto-fill-button"]');
    
    // Loading indicator should appear
    await expect(page.locator('[data-testid="auto-fill-loader"]')).toBeVisible();
    
    // Wait for async operation
    await page.waitForTimeout(2000);
    
    // Loading should disappear
    await expect(page.locator('[data-testid="auto-fill-loader"]')).not.toBeVisible();
    
    // Verify fields are filled
    await expect(page.locator('[data-testid="name-input"]')).not.toBeEmpty();
  });

  test('should validate all steps from step 3 and show error modal', async ({ page }) => {
    // Navigate to step 3
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(200);
    
    await page.fill('[data-testid="username-input"]', 'john123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(200);
    
    // Now on step 3 - click "Validate All" button
    await page.click('[data-testid="validate-all-button"]');
    
    // Wait for validation to complete
    await page.waitForTimeout(500);
    
    // Error modal should appear
    await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();
    
    // Modal should list all steps with errors
    await expect(page.locator('[data-testid="error-step-4"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-step-7"]')).toBeVisible();
    
    // Error count should be displayed
    const errorCount = await page.locator('[data-testid="error-count"]').textContent();
    expect(parseInt(errorCount || '0')).toBeGreaterThan(0);
  });

  test('should navigate to error step by clicking in error modal', async ({ page }) => {
    // Navigate to step 3 and trigger validation
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(200);
    
    await page.fill('[data-testid="username-input"]', 'john123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(200);
    
    // Validate all
    await page.click('[data-testid="validate-all-button"]');
    await page.waitForTimeout(500);
    
    // Click on error step 5 in modal
    await page.click('[data-testid="error-step-5"]');
    
    // Should navigate to step 5
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 5');
    
    // Modal should close
    await expect(page.locator('[data-testid="error-modal"]')).not.toBeVisible();
    
    // Error fields should be highlighted
    await expect(page.locator('[data-testid="address-input"]')).toHaveClass(/error|invalid/);
  });

  test('should re-show error modal after fixing some errors', async ({ page }) => {
    // Navigate to step 3 and validate all
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(200);
    
    await page.fill('[data-testid="username-input"]', 'john123');
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(200);
    
    await page.click('[data-testid="validate-all-button"]');
    await page.waitForTimeout(500);
    
    // Get initial error count
    const initialErrorCount = await page.locator('[data-testid="error-count"]').textContent();
    
    // Navigate to error step and fix it
    await page.click('[data-testid="error-step-4"]');
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    
    // Validate all again
    await page.click('[data-testid="validate-all-button"]');
    await page.waitForTimeout(500);
    
    // Modal should appear again if there are still errors
    const newErrorCount = await page.locator('[data-testid="error-count"]').textContent();
    expect(parseInt(newErrorCount || '0')).toBeLessThan(parseInt(initialErrorCount || '0'));
    
    // If all errors fixed, modal should not appear
    // This depends on implementation
  });

  test('should auto-redirect to first error step', async ({ page }) => {
    // Fill step 1 with valid data
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    // Fill step 2 with INVALID data
    await page.fill('[data-testid="username-input"]', 'ab'); // Too short
    await page.click('[data-testid="next-button"]');
    
    // Should stay on step 2 (blocked by validation)
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
    
    // Error should be highlighted
    await expect(page.locator('[data-testid="username-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="username-input"]')).toHaveClass(/error|invalid/);
  });

  test('should highlight all error fields on current step', async ({ page }) => {
    // Try to navigate without filling required fields
    await page.click('[data-testid="next-button"]');
    
    // All required fields should be highlighted
    await expect(page.locator('[data-testid="name-input"]')).toHaveClass(/error|invalid/);
    await expect(page.locator('[data-testid="email-input"]')).toHaveClass(/error|invalid/);
    
    // Error messages should be visible
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  });

  test('should block forward navigation when previous step has errors', async ({ page }) => {
    // Fill step 1 and navigate
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    // Fill step 2 and navigate
    await page.fill('[data-testid="username-input"]', 'john123');
    await page.click('[data-testid="next-button"]');
    
    // Now on step 3
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');
    
    // Go back to step 2
    await page.click('[data-testid="prev-button"]');
    
    // Corrupt step 2 data
    await page.fill('[data-testid="username-input"]', 'ab'); // Invalid
    
    // Try to go to step 3
    await page.click('[data-testid="next-button"]');
    
    // Should be blocked
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
    await expect(page.locator('[data-testid="username-error"]')).toBeVisible();
  });

  test('should show error message when trying to skip step with errors', async ({ page }) => {
    // Fill step 1
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    // Fill step 2 with invalid data
    await page.fill('[data-testid="username-input"]', 'ab');
    
    // Try to navigate to step 4 via breadcrumb (if allowed)
    // This should show error message
    await page.click('[data-testid="breadcrumb-step-4"]');
    
    // Error toast/modal should appear
    await expect(page.locator('[data-testid="navigation-error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="navigation-error-message"]')).toContainText(/previous step|fix errors/i);
    
    // Should stay on step 2
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should show loader during async validation', async ({ page }) => {
    // Fill fields that trigger async validation
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    
    // Trigger async validation (e.g., check if email exists)
    await page.click('[data-testid="next-button"]');
    
    // Loader should appear
    await expect(page.locator('[data-testid="validation-loader"]')).toBeVisible();
    
    // Wait for async validation
    await page.waitForTimeout(1500);
    
    // Loader should disappear
    await expect(page.locator('[data-testid="validation-loader"]')).not.toBeVisible();
  });

  test('should show loader during async condition evaluation', async ({ page }) => {
    // Navigate to step with async condition
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    // Select option that triggers async condition
    await page.selectOption('[data-testid="country-select"]', 'US');
    
    // Step loader should appear while condition is being evaluated
    await expect(page.locator('[data-testid="step-condition-loader"]')).toBeVisible();
    
    // Wait for condition resolution
    await page.waitForTimeout(1000);
    
    // Loader should disappear
    await expect(page.locator('[data-testid="step-condition-loader"]')).not.toBeVisible();
    
    // Conditional step should appear in breadcrumbs
    const stepCount = await page.locator('[data-testid="step-indicator"]').count();
    expect(stepCount).toBeGreaterThan(3);
  });

  test('should clear only current step data', async ({ page }) => {
    // Fill current step
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    
    // Click "Clear Current Step" button
    await page.click('[data-testid="clear-current-step-button"]');
    
    // Current step fields should be empty
    await expect(page.locator('[data-testid="name-input"]')).toBeEmpty();
    await expect(page.locator('[data-testid="email-input"]')).toBeEmpty();
    
    // Navigate to next step and verify it's not affected
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    await page.fill('[data-testid="username-input"]', 'john123');
    
    // Go back
    await page.click('[data-testid="prev-button"]');
    
    // Step 1 data should still be there
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('John');
  });

  test('should clear all steps data', async ({ page }) => {
    // Fill multiple steps
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    await page.fill('[data-testid="username-input"]', 'john123');
    await page.click('[data-testid="next-button"]');
    
    await page.fill('[data-testid="address-input"]', '123 Main St');
    
    // Click "Clear All" button
    await page.click('[data-testid="clear-all-button"]');
    
    // Should return to step 1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
    
    // All fields should be empty
    await expect(page.locator('[data-testid="name-input"]')).toBeEmpty();
    await expect(page.locator('[data-testid="email-input"]')).toBeEmpty();
    
    // Navigate to step 2
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    // Step 2 should also be empty
    await expect(page.locator('[data-testid="username-input"]')).toBeEmpty();
  });

  test('should not show conditional step until async condition resolves', async ({ page }) => {
    // Initial step count
    const initialStepCount = await page.locator('[data-testid="step-indicator"]').count();
    
    // Trigger async condition
    await page.selectOption('[data-testid="account-type-select"]', 'premium');
    
    // Step should NOT appear immediately (showWhilePending: false)
    await page.waitForTimeout(300);
    let pendingStepCount = await page.locator('[data-testid="step-indicator"]').count();
    expect(pendingStepCount).toBe(initialStepCount);
    
    // Wait for async condition to resolve
    await page.waitForTimeout(1500);
    
    // Now step should appear
    const finalStepCount = await page.locator('[data-testid="step-indicator"]').count();
    expect(finalStepCount).toBeGreaterThan(initialStepCount);
  });

  test('should allow navigation to future steps if no errors on current', async ({ page }) => {
    // Fill step 1 correctly
    await page.fill('[data-testid="name-input"]', 'John');
    await page.fill('[data-testid="email-input"]', 'john@test.com');
    await page.click('[data-testid="next-button"]');
    
    // Fill step 2 correctly
    await page.fill('[data-testid="username-input"]', 'john123');
    await page.click('[data-testid="next-button"]');
    
    // On step 3 - try to jump to step 5 via breadcrumb
    await page.click('[data-testid="breadcrumb-step-5"]');
    
    // Should allow navigation (no errors on previous steps)
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 5');
  });
});
