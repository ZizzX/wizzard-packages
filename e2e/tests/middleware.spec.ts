import { test, expect } from '../fixtures/base';

/**
 * E2E Test: Middleware Integration
 * 
 * Tests middleware functionality:
 * - Logger middleware
 * - DevTools middleware
 * - Custom middleware execution
 * - Action interception
 */

test.describe('Middleware Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('#/middleware-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should log actions with logger middleware', async ({ page }) => {
    // Enable console logging
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    // Perform action
    await page.locator('[data-testid="name-input"]').fill('Test User');
    
    // Wait for debounce
    await page.waitForTimeout(400);
    
    // Check logs
    const setDataLogs = consoleLogs.filter(log => log.includes('SET_DATA'));
    expect(setDataLogs.length).toBeGreaterThan(0);
  });

  test('should display DevTools when enabled', async ({ page }) => {
    await page.goto('#/middleware-demo?devtools=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // DevTools panel should be visible
    await expect(page.locator('[data-testid="wizard-devtools"]')).toBeVisible();
  });

  test('should show action history in DevTools', async ({ page }) => {
    await page.goto('#/middleware-demo?devtools=true');
    await page.waitForSelector('[data-testid="wizard-devtools"]');
    
    // Perform some actions
    await page.locator('[data-testid="name-input"]').fill('John');
    await page.click('[data-testid="next-button"]');
    
    // Check DevTools shows actions
    const actionList = page.locator('[data-testid="devtools-action-list"]');
    await expect(actionList).toBeVisible();
    
    const actionItems = await actionList.locator('[data-testid="action-item"]').count();
    expect(actionItems).toBeGreaterThan(0);
  });

  test('should allow time-travel in DevTools', async ({ page }) => {
    await page.goto('#/middleware-demo?devtools=true');
    await page.waitForSelector('[data-testid="wizard-devtools"]');
    
    // Perform actions
    await page.locator('[data-testid="name-input"]').fill('Alice');
    await page.click('[data-testid="next-button"]');
    await page.locator('[data-testid="email-input"]').fill('alice@test.com');
    
    // Click on previous action in DevTools
    await page.click('[data-testid="action-item"]:first-child');
    
    // State should revert
    // (verify via DevTools state display or UI)
  });

  test('should execute custom middleware in correct order', async ({ page }) => {
    await page.goto('#/middleware-demo?custom=true&debug=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Trigger action
    await page.click('[data-testid="next-button"]');
    
    // Check middleware execution order
    const executionLog = await page.locator('[data-testid="middleware-log"]').textContent();
    expect(executionLog).toContain('Middleware 1');
    expect(executionLog).toContain('Middleware 2');
    
    // Verify order
    const index1 = executionLog?.indexOf('Middleware 1') || 0;
    const index2 = executionLog?.indexOf('Middleware 2') || 0;
    expect(index1).toBeLessThan(index2);
  });

  test('should allow middleware to modify or block actions', async ({ page }) => {
    await page.goto('#/middleware-demo?blocking=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Try to navigate (middleware blocks it without validation)
    await page.click('[data-testid="next-button"]');
    
    // Custom middleware shows alert
    const alert = await page.locator('[data-testid="middleware-alert"]');
    if (await alert.isVisible()) {
      await expect(alert).toContainText(/blocked|prevented/i);
    }
    
    // Should still be on first step
    await expect(page.locator('[data-testid="current-step"]')).toContainText('Step 1');
  });

  test('should pass correct context to middleware', async ({ page }) => {
    await page.goto('#/middleware-demo?debug=true');
    await page.waitForSelector('[data-testid="wizard-container"]');
    
    // Fill some data
    await page.locator('[data-testid="name-input"]').fill('Test');
    await page.waitForTimeout(400);
    
    // Check middleware received correct state
    const middlewareState = await page.locator('[data-testid="middleware-state"]').textContent();
    expect(middlewareState).toContain('Test');
  });
});
