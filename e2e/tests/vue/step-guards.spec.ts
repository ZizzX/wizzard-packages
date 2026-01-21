import { test, expect } from '@playwright/test';

test.describe('Vue Step Guards E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/test/guards-demo', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();
  });

  test('should block navigation when guard returns false', async ({ page }) => {
    // Fill content without saving
    await page.getByTestId('content-input').fill('Unsaved content');

    // Try to navigate next
    await page.getByTestId('next-button').click();

    // Dialog should appear
    await expect(page.getByTestId('guard-dialog')).toBeVisible();
    await expect(page.getByTestId('guard-dialog')).toContainText('Unsaved Changes');

    // Cancel navigation
    await page.getByTestId('dialog-cancel').click();

    // Should still be on step 1
    await expect(page.getByTestId('wizard-container')).toBeVisible();
    await expect(page.getByTestId('content-input')).toBeVisible();
    await expect(page.getByTestId('content-input')).toHaveValue('Unsaved content');
  });

  test('should allow navigation when guard returns true', async ({ page }) => {
    // Fill and save content
    await page.getByTestId('content-input').fill('Saved content');
    await page.getByTestId('save-button').click();

    // Navigate next (should not show dialog)
    await page.getByTestId('next-button').click();

    // Should be on step 2
    await expect(page.locator('h2')).toContainText('Step 2: Safe Zone');
  });

  test('should allow navigation after confirming in guard dialog', async ({ page }) => {
    // Fill content without saving
    await page.getByTestId('content-input').fill('Will leave anyway');

    // Try to navigate next
    await page.getByTestId('next-button').click();

    // Dialog appears
    await expect(page.getByTestId('guard-dialog')).toBeVisible();

    // Confirm leaving
    await page.getByTestId('dialog-confirm').click();

    // Should navigate to step 2
    await expect(page.locator('h2')).toContainText('Step 2: Safe Zone');
  });

  test('should call guard with correct direction', async ({ page }) => {
    // Enable debug mode
    await page.goto('/#/test/guards-demo?debug=true', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();

    // Navigate forward
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('next-button').click();

    // Check guard log shows "next" direction
    await expect(page.getByTestId('guard-log')).toContainText('direction: next');

    // Navigate back
    await page.getByTestId('prev-button').click();

    // Check guard log shows "prev" direction
    await expect(page.getByTestId('guard-log')).toContainText('direction: prev');
  });

  test('should handle async guard delays', async ({ page }) => {
    // Enable async mode
    await page.goto('/#/test/guards-demo?async=true', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();

    // Fill and save to pass guard
    await page.getByTestId('content-input').fill('Content');
    await page.getByTestId('save-button').click();

    // Start navigation
    await page.getByTestId('next-button').click();

    // Loading indicator should appear
    await expect(page.getByTestId('guard-loading')).toBeVisible();
    await expect(page.getByTestId('guard-loading')).toContainText('Loading guard');

    // Wait for async guard to complete (5s timeout in component)
    await page.waitForTimeout(5500);

    // Should navigate to step 2
    await expect(page.locator('h2')).toContainText('Step 2: Safe Zone');
  });

  test('should not call guard when navigating to previous steps', async ({ page }) => {
    // Navigate to step 2 first
    await page.getByTestId('content-input').fill('Content');
    await page.getByTestId('save-button').click();
    await page.getByTestId('next-button').click();

    await expect(page.locator('h2')).toContainText('Step 2: Safe Zone');

    // Navigate back (should not trigger guard for "prev" by default logic)
    await page.getByTestId('prev-button').click();

    // Should be back on step 1 without dialog
    await expect(page.getByTestId('content-input')).toBeVisible();
  });

  test('should preserve data when navigation is cancelled', async ({ page }) => {
    // Fill content and email
    await page.getByTestId('content-input').fill('Important content');
    await page.getByTestId('email-input').fill('user@example.com');

    // Try to navigate
    await page.getByTestId('next-button').click();

    // Cancel dialog
    await expect(page.getByTestId('guard-dialog')).toBeVisible();
    await page.getByTestId('dialog-cancel').click();

    // Data should be preserved
    await expect(page.getByTestId('content-input')).toHaveValue('Important content');
    await expect(page.getByTestId('email-input')).toHaveValue('user@example.com');
  });

  test('should clear saved state when modifying content after save', async ({ page }) => {
    // Fill and save
    await page.getByTestId('content-input').fill('Original');
    await page.getByTestId('save-button').click();

    // Navigate should succeed
    await page.getByTestId('next-button').click();
    await expect(page.locator('h2')).toContainText('Step 2: Safe Zone');

    // Go back
    await page.getByTestId('prev-button').click();

    // Modify content
    await page.getByTestId('content-input').fill('Modified');

    // Try to navigate again - should show dialog
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('guard-dialog')).toBeVisible();
  });
});
