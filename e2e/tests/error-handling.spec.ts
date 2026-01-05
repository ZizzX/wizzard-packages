import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Error Handling
 * 
 * Tests wizard error handling:
 * - Validation errors display
 * - Error recovery
 * - Multiple errors handling
 * - Error step marking
 */

test.describe('Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/error-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should display validation errors inline', async ({ page }) => {
    // Submit invalid form
    await page.click('[data-testid="next-button"]');
    
    // Errors should be displayed
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  });

  test('should mark step with errors in breadcrumbs', async ({ page }) => {
    // Create error
    await page.click('[data-testid="next-button"]');
    
    // First step should be marked as error
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveClass(/error|invalid/);
  });

  test('should clear error state when fixed', async ({ page }) => {
    // Create error
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveClass(/error/);
    
    // Fix error
    await page.locator('[data-testid="name-input"]').fill('Valid Name');
    await page.locator('[data-testid="email-input"]').fill('valid@email.com');
    
    // Navigate successfully
    await page.click('[data-testid="next-button"]');
    
    // Error state should be cleared
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).not.toHaveClass(/error/);
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).toHaveClass(/completed/);
  });

  test('should show error summary on final submit', async ({ page }) => {
    // Navigate through wizard with errors
    await page.click('[data-testid="skip-validation"]'); // Bypass step validation
    await page.click('[data-testid="skip-validation"]');
    
    // Try to submit
    await page.click('[data-testid="submit-button"]');
    
    // Error summary should appear
    await expect(page.locator('[data-testid="error-summary"]')).toBeVisible();
    
    // Should list all errors
    const errorCount = await page.locator('[data-testid="error-summary"] li').count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should recover from async validation errors', async ({ page }) => {
    await page.goto('/error-demo?async=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Trigger async validation that fails
    await page.locator('[data-testid="username-input"]').fill('taken-username');
    await page.click('[data-testid="next-button"]');
    
    // Wait for async check
    await page.waitForTimeout(1000);
    
    // Error should appear
    await expect(page.locator('[data-testid="username-error"]')).toContainText(/already taken|exists/i);
    
    // Fix it
    await page.locator('[data-testid="username-input"]').fill('available-username');
    await page.click('[data-testid="next-button"]');
    
    // Should succeed
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should prevent completing step with errors', async ({ page }) => {
    // Add errors
    await page.locator('[data-testid="age-input"]').fill('-5'); // Invalid
    await page.click('[data-testid="next-button"]');
    
    // Should not mark as completed
    await expect(page.locator('[data-testid="breadcrumb-step-1"]')).not.toHaveClass(/completed/);
  });
});
