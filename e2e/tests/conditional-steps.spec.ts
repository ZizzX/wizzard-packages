import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Conditional Steps
 * 
 * Tests dynamic step visibility based on data:
 * - Step condition evaluation
 * - showWhilePending behavior
 * - conditionDependsOn optimization
 * - Dynamic step count changes
 */

test.describe('Conditional Steps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/conditional-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should hide step when condition is false', async ({ page }) => {
    // Initially, conditional step should not be visible
    const stepCount = await page.locator('[data-testid="step-indicator"]').count();
    const initialCount = stepCount;
    
    // Select option that enables conditional step
    await page.selectOption('[data-testid="user-type-select"]', 'business');
    
    // Wait for step re-evaluation
    await page.waitForTimeout(300);
    
    // Step count should increase
    const newStepCount = await page.locator('[data-testid="step-indicator"]').count();
    expect(newStepCount).toBeGreaterThan(initialCount);
  });

  test('should show step when condition becomes true', async ({ page }) => {
    // Select option that reveals conditional step
    await page.selectOption('[data-testid="user-type-select"]', 'business');
    
    // Move to next step
    await page.click('[data-testid="next-button"]');
    
    // Conditional "Business Info" step should be visible
    await expect(page.locator('[data-testid="current-step"]')).toContainText(/Business|Company/i);
  });

  test('should skip hidden step when navigating', async ({ page }) => {
    // Keep user type as "personal" (business step hidden)
    await page.selectOption('[data-testid="user-type-select"]', 'personal');
    
    // Navigate forward
    await page.click('[data-testid="next-button"]');
    
    // Should skip the hidden business step
    await expect(page.locator('[data-testid="current-step"]')).not.toContainText(/Business/i);
  });

  test('should update progress based on active steps', async ({ page }) => {
    // Get initial progress
    const initialProgress = await page.locator('[data-testid="progress-bar"]').getAttribute('aria-valuenow');
    
    // Enable conditional step (more total steps)
    await page.selectOption('[data-testid="user-type-select"]', 'business');
    await page.waitForTimeout(300);
    
    // Progress percentage should change (same position, different total)
    const newProgress = await page.locator('[data-testid="progress-bar"]').getAttribute('aria-valuenow');
    expect(newProgress).not.toBe(initialProgress);
  });

  test('should memoize condition with conditionDependsOn', async ({ page }) => {
    // This test verifies that condition is not re-evaluated unnecessarily
    // by checking that unrelated data changes don't trigger re-evaluation
    
    await page.goto('/conditional-demo?debug=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Get condition evaluation count (if exposed via dev tools)
    const getEvalCount = async () => {
      const debugInfo = await page.locator('[data-testid="debug-eval-count"]').textContent();
      return parseInt(debugInfo || '0');
    };
    
    const initialCount = await getEvalCount();
    
    // Change unrelated field
    await page.locator('[data-testid="name-input"]').fill('Test');
    await page.waitForTimeout(300);
    
    // Eval count should not increase (condition depends only on user-type)
    const newCount = await getEvalCount();
    expect(newCount).toBe(initialCount);
    
    // Change dependent field
    await page.selectOption('[data-testid="user-type-select"]', 'business');
    await page.waitForTimeout(300);
    
    // Eval count should increase
    const finalCount = await getEvalCount();
    expect(finalCount).toBeGreaterThan(initialCount);
  });

  test('should handle async condition evaluation', async ({ page }) => {
    await page.goto('/conditional-demo?async=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Select option that triggers async condition
    await page.selectOption('[data-testid="country-select"]', 'US');
    
    // Loading state should appear
    await expect(page.locator('[data-testid="step-loading"]')).toBeVisible();
    
    // Wait for async condition to resolve
    await page.waitForTimeout(1000);
    
    // Loading should disappear
    await expect(page.locator('[data-testid="step-loading"]')).not.toBeVisible();
    
    // Conditional step should appear
    const stepCount = await page.locator('[data-testid="step-indicator"]').count();
    expect(stepCount).toBeGreaterThan(3);
  });

  test('should hide step while pending if showWhilePending is false', async ({ page }) => {
    await page.goto('/conditional-demo?async=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    const initialStepCount = await page.locator('[data-testid="step-indicator"]').count();
    
    // Trigger async condition
    await page.selectOption('[data-testid="country-select"]', 'UK');
    
    // Step should be hidden while condition is pending
    const pendingStepCount = await page.locator('[data-testid="step-indicator"]').count();
    expect(pendingStepCount).toBe(initialStepCount);
    
    // After resolution, step appears
    await page.waitForTimeout(1000);
    const finalStepCount = await page.locator('[data-testid="step-indicator"]').count();
    expect(finalStepCount).toBeGreaterThan(initialStepCount);
  });

  test('should remove current step when condition becomes false', async ({ page }) => {
    // Enable and navigate to conditional step
    await page.selectOption('[data-testid="user-type-select"]', 'business');
    await page.click('[data-testid="next-button"]');
    
    // We should be on business step
    await expect(page.locator('[data-testid="current-step"]')).toContainText(/Business/i);
    
    // Disable the condition (navigate back first)
    await page.click('[data-testid="prev-button"]');
    await page.selectOption('[data-testid="user-type-select"]', 'personal');
    
    // Navigate forward - should skip the now-hidden step
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).not.toContainText(/Business/i);
  });
});
