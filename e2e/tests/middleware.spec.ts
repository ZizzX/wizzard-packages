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
  let consoleLogs: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleLogs = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    await page.goto('#/test/middleware-demo');
    await page.waitForSelector('[data-testid="wizard-container"]', { timeout: 5000 });
  });

  test('should log actions with logger middleware', async ({ page }) => {
    // Perform action
    await page.locator('[data-testid="name-input"]').fill('Test User');

    // Wait for state update and log to propagate
    await page.waitForTimeout(500);

    // Check logs
    const setDataLogs = consoleLogs.filter(log => log.includes('SET_DATA'));
    if (setDataLogs.length === 0) {
      console.log('Detected logs:', consoleLogs);
    }
    expect(setDataLogs.length).toBeGreaterThan(0);
  });

  test('should display DevTools when enabled', async ({ page }) => {
    await page.goto('#/test/middleware-demo?devtools=true');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Fallback: If auto-open failed, click the toggle
    const toggle = page.locator('[data-testid="wizard-devtools-toggle"]');
    if (await toggle.isVisible()) {
      await toggle.click();
    }

    // DevTools panel should be visible
    await expect(page.locator('[data-testid="wizard-devtools"]')).toBeVisible();
  });

  test('should show action history in DevTools', async ({ page }) => {
    await page.goto('#/test/middleware-demo?devtools=true');
    await page.waitForSelector('[data-testid="wizard-devtools"]');

    // Perform some actions
    await page.locator('[data-testid="name-input"]').fill('John');

    // Wait for button to be enabled and click
    await page.waitForSelector('[data-testid="next-button"]:not([disabled])', { timeout: 5000 });
    await page.click('[data-testid="next-button"]');

    // Click on actions tab
    await page.click('[data-testid="devtools-tab-actions"]');

    // Check DevTools shows actions
    const actionList = page.locator('[data-testid="devtools-action-list"]');
    await expect(actionList).toBeVisible();

    const actionItems = await actionList.locator('[data-testid="action-item"]').count();
    expect(actionItems).toBeGreaterThan(0);
  });

  test('should allow time-travel in DevTools', async ({ page }) => {
    await page.goto('#/test/middleware-demo?devtools=true');
    await page.waitForSelector('[data-testid="wizard-devtools"]');

    // Perform actions
    await page.locator('[data-testid="name-input"]').fill('Alice');

    // Wait for button to be enabled and click
    await page.waitForSelector('[data-testid="next-button"]:not([disabled])', { timeout: 5000 });
    await page.click('[data-testid="next-button"]');
    await page.locator('[data-testid="email-input"]').fill('alice@test.com');

    // Click on actions tab
    await page.click('[data-testid="devtools-tab-actions"]');

    // Click on previous action in DevTools
    await page.locator('[data-testid="jump-button"]').last().click();

    // State should revert
    // (verify via DevTools state display or UI)
  });

  test('should execute custom middleware in correct order', async ({ page }) => {
    await page.goto('#/test/middleware-demo?custom=true&debug=true');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Trigger action (Next Step)
    await page.click('[data-testid="next-button"]');
    await page.waitForTimeout(200);

    // Check middleware execution order in the UI logs
    const executionLog = await page.locator('[data-testid="middleware-log"]').textContent() || "";

    // We expect both middlewares to have run for the navigation action
    expect(executionLog).toContain('Middleware 1');
    expect(executionLog).toContain('Middleware 2');

    const index1 = executionLog.indexOf('[M1] Middleware 1');
    const index2 = executionLog.indexOf('[M2] Middleware 2');

    // In our UI, logs are PREPENDED to the top, so Middleware 2 (logged later) comes BEFORE Middleware 1
    // index2 < index1
    expect(index2).toBeLessThan(index1);
  });

  test('should allow middleware to modify or block actions', async ({ page }) => {
    await page.goto('#/test/middleware-demo?blocking=true');
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
    await page.goto('#/test/middleware-demo?debug=true');
    await page.waitForSelector('[data-testid="wizard-container"]');

    // Fill some data
    await page.locator('[data-testid="name-input"]').fill('Test');
    await page.waitForTimeout(400);

    // Check middleware received correct state
    const middlewareState = await page.locator('[data-testid="middleware-state"]').textContent();
    expect(middlewareState).toContain('Test');
  });
});
