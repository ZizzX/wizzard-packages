import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Form Validation
 * 
 * Tests wizard validation functionality:
 * - Zod adapter validation
 * - Yup adapter validation
 * - Validation on step change
 * - Validation on field change
 * - Error display and clearing
 */

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/validation-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should prevent navigation with invalid data', async ({ page }) => {
    // Leave required field empty
    const emailInput = page.locator('[data-testid="email-input"]');
    await emailInput.fill('');
    
    // Try to go to next step
    await page.click('[data-testid="next-button"]');
    
    // Should still be on first step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
    
    // Error should be displayed
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  });

  test('should allow navigation with valid data', async ({ page }) => {
    // Fill valid email
    await page.locator('[data-testid="email-input"]').fill('test@example.com');
    
    // Should be able to go to next step
    await page.click('[data-testid="next-button"]');
    
    // Verify we moved
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should validate on field change (onChange mode)', async ({ page }) => {
    const emailInput = page.locator('[data-testid="email-input"]');
    
    // Type invalid email
    await emailInput.fill('invalid-email');
    
    // Wait for debounced validation
    await page.waitForTimeout(400);
    
    // Error should appear
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toContainText('valid email');
  });

  test('should clear errors when fixed', async ({ page }) => {
    const emailInput = page.locator('[data-testid="email-input"]');
    
    // Type invalid email
    await emailInput.fill('invalid');
    await page.waitForTimeout(400);
    
    // Error should be visible
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    
    // Fix the email
    await emailInput.fill('valid@example.com');
    await page.waitForTimeout(400);
    
    // Error should be cleared
    await expect(page.locator('[data-testid="email-error"]')).not.toBeVisible();
  });

  test('should validate with Zod adapter', async ({ page }) => {
    // Navigate to Zod validation example
    await page.goto('/validation-demo?adapter=zod');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Test Zod-specific validation (e.g., min length)
    const passwordInput = page.locator('[data-testid="password-input"]');
    await passwordInput.fill('123'); // Too short
    
    await page.click('[data-testid="next-button"]');
    
    // Should show Zod error message
    const error = page.locator('[data-testid="password-error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText(/at least|minimum/i);
  });

  test('should validate with Yup adapter', async ({ page }) => {
    // Navigate to Yup validation example
    await page.goto('/validation-demo?adapter=yup');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Test Yup-specific validation
    const ageInput = page.locator('[data-testid="age-input"]');
    await ageInput.fill('17'); // Below minimum age
    
    await page.click('[data-testid="next-button"]');
    
    // Should show Yup error message
    const error = page.locator('[data-testid="age-error"]');
    await expect(error).toBeVisible();
  });

  test('should display multiple field errors', async ({ page }) => {
    // Leave multiple fields invalid
    await page.locator('[data-testid="email-input"]').fill('invalid');
    await page.locator('[data-testid="phone-input"]').fill('123'); // Invalid phone
    
    await page.click('[data-testid="next-button"]');
    
    // Both errors should be visible
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="phone-error"]')).toBeVisible();
  });

  test('should validate all steps on submit', async ({ page }) => {
    // Fill first step with valid data
    await page.locator('[data-testid="email-input"]').fill('test@example.com');
    await page.click('[data-testid="next-button"]');
    
    // Navigate to last step without filling intermediate steps
    await page.click('[data-testid="submit-button"]');
    
    // Should validate all steps
    const validationSummary = page.locator('[data-testid="validation-summary"]');
    await expect(validationSummary).toBeVisible();
    await expect(validationSummary).toContainText(/error|invalid/i);
  });

  test('should mark step as error in breadcrumbs', async ({ page }) => {
    // Try to go next with invalid data
    await page.click('[data-testid="next-button"]');
    
    // First step breadcrumb should show error state
    const step1Breadcrumb = page.locator('[data-testid="breadcrumb-step-1"]');
    await expect(step1Breadcrumb).toHaveClass(/error|invalid/);
  });
});
