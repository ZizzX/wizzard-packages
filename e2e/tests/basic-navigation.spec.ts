import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Basic Navigation
 * 
 * Tests core wizard navigation functionality:
 * - Moving to next step
 * - Moving to previous step
 * - Direct step navigation
 * - First/last step boundaries
 */

test.describe('Basic Wizard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo wizard
    await page.goto('/#/test-basic');
    
    // Wait for wizard to be ready
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should navigate to next step', async ({ page }) => {
    // Check we're on first step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
    
    // Click next button
    await page.click('[data-testid="next-button"]');
    
    // Verify we moved to step 2
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
  });

  test('should navigate to previous step', async ({ page }) => {
    // Move to step 2
    await page.click('[data-testid="next-button"]');
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 2');
    
    // Click previous button
    await page.click('[data-testid="prev-button"]');
    
    // Verify we're back at step 1
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
  });

  test('should disable previous button on first step', async ({ page }) => {
    // Check previous button is disabled on first step
    await expect(page.locator('[data-testid="prev-button"]')).toBeDisabled();
  });

  test('should disable next button on last step', async ({ page }) => {
    // Navigate to last step
    await page.click('[data-testid="next-button"]');
    await page.click('[data-testid="next-button"]');
    
    // Should be on last step (step 3)
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');
    
    // Check submit button exists and next button is gone
    await expect(page.locator('[data-testid="submit-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="next-button"]')).toHaveCount(0);
  });

  test('should navigate directly to specific step', async ({ page }) => {
    // Click on step 3 indicator (if breadcrumbs are clickable)
    const step3Breadcrumb = page.locator('[data-testid="breadcrumb-step-3"]');
    
    if (await step3Breadcrumb.isVisible()) {
      await step3Breadcrumb.click();
      await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 3');
    }
  });

  test('should track navigation history', async ({ page }) => {
    // Navigate through steps
    await page.click('[data-testid="next-button"]'); // Step 2
    await page.click('[data-testid="next-button"]'); // Step 3
    await page.click('[data-testid="prev-button"]'); // Back to Step 2
    
    // Check history is maintained
    const historyElement = page.locator('[data-testid="wizard-history"]');
    if (await historyElement.isVisible()) {
      const historyText = await historyElement.textContent();
      expect(historyText).toContain('1');
      expect(historyText).toContain('2');
      expect(historyText).toContain('3');
    }
  });

  test('should update progress indicator', async ({ page }) => {
    // Get initial progress
    const initialProgress = await page.locator('[data-testid="progress-bar"]').getAttribute('aria-valuenow');
    
    // Move to next step
    await page.click('[data-testid="next-button"]');
    
    // Check progress increased
    const newProgress = await page.locator('[data-testid="progress-bar"]').getAttribute('aria-valuenow');
    expect(Number(newProgress)).toBeGreaterThan(Number(initialProgress));
  });

  test('should scroll to top on step change', async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Navigate to next step
    await page.click('[data-testid="next-button"]');
    
    // Check we're at top
    await page.waitForTimeout(100); // Wait for scroll animation
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });
});
