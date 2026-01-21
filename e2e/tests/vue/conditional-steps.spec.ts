import { test, expect } from '@playwright/test';

test.describe('Vue Conditional Steps E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/test/conditional-demo', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();
  });

  test('should hide step when condition is false', async ({ page }) => {
    // Initially, business and individual steps should not be visible in breadcrumbs
    const breadcrumbs = page.locator('[data-testid^="breadcrumb-"]');
    const count = await breadcrumbs.count();

    // Should have step-1 and step-4 only (2 steps visible)
    expect(count).toBe(2);

    // Active step count should be 2
    await expect(page.getByTestId('active-step-count')).toContainText('Active Steps: 2');
  });

  test('should show step when condition becomes true', async ({ page }) => {
    // Select business type
    await page.getByTestId('radio-business').click();

    // Now business step should be visible in breadcrumbs
    await expect(page.getByTestId('breadcrumb-step-2-business')).toBeVisible();

    // Active step count should increase to 3
    await expect(page.getByTestId('active-step-count')).toContainText('Active Steps: 3');

    // Individual step should still be hidden
    const individualBreadcrumb = page.getByTestId('breadcrumb-step-3-individual');
    await expect(individualBreadcrumb).not.toBeVisible();
  });

  test('should skip hidden step when navigating', async ({ page }) => {
    // Select individual type
    await page.getByTestId('radio-individual').click();

    // Navigate next
    await page.getByTestId('next-button').click();

    // Should land on individual step (step-3-individual), skipping business step
    await expect(page.getByTestId('individual-step')).toBeVisible();
    await expect(page.getByTestId('current-step')).toContainText('step-3-individual');

    // Business step should not be visible
    await expect(page.getByTestId('business-step')).not.toBeVisible();
  });

  test('should update progress based on active steps', async ({ page }) => {
    // Initially 2 steps active, on step 1 -> 50% progress
    await expect(page.getByTestId('progress')).toContainText('50%');

    // Select business type (3 steps active now)
    await page.getByTestId('radio-business').click();

    // Progress should update to ~33%
    await expect(page.getByTestId('progress')).toContainText('33%');

    // Navigate to step 2
    await page.getByTestId('next-button').click();

    // Progress should be ~67%
    await expect(page.getByTestId('progress')).toContainText('67%');
  });

  test('should remove current step when condition becomes false', async ({ page }) => {
    // Select business type
    await page.getByTestId('radio-business').click();

    // Navigate to business step
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('business-step')).toBeVisible();

    // Go back to step 1
    await page.getByTestId('prev-button').click();

    // Change to individual type
    await page.getByTestId('radio-individual').click();

    // Business step should disappear from breadcrumbs
    const businessBreadcrumb = page.getByTestId('breadcrumb-step-2-business');
    await expect(businessBreadcrumb).not.toBeVisible();

    // Individual step should appear
    await expect(page.getByTestId('breadcrumb-step-3-individual')).toBeVisible();
  });

  test('should handle business flow correctly', async ({ page }) => {
    // Select business type
    await page.getByTestId('radio-business').click();

    // Navigate to business step
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('business-step')).toBeVisible();

    // Fill business info
    await page.getByTestId('company-input').fill('Acme Corp');
    await page.getByTestId('taxid-input').fill('12-3456789');

    // Navigate to contact step
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('current-step')).toContainText('step-4');

    // Fill contact
    await page.getByTestId('email-input').fill('contact@acme.com');

    // Verify we reached the final step
    await expect(page.getByTestId('next-button')).toBeDisabled();
  });

  test('should handle individual flow correctly', async ({ page }) => {
    // Select individual type
    await page.getByTestId('radio-individual').click();

    // Navigate to individual step
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('individual-step')).toBeVisible();

    // Fill personal info
    await page.getByTestId('name-input').fill('John Doe');

    // Navigate to contact step
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('current-step')).toContainText('step-4');

    // Fill contact
    await page.getByTestId('email-input').fill('john@example.com');

    // Verify we reached the final step
    await expect(page.getByTestId('next-button')).toBeDisabled();
  });

  test('should switch between business and individual types', async ({ page }) => {
    // Select business
    await page.getByTestId('radio-business').click();
    await expect(page.getByTestId('breadcrumb-step-2-business')).toBeVisible();

    // Switch to individual
    await page.getByTestId('radio-individual').click();
    await expect(page.getByTestId('breadcrumb-step-2-business')).not.toBeVisible();
    await expect(page.getByTestId('breadcrumb-step-3-individual')).toBeVisible();

    // Switch back to business
    await page.getByTestId('radio-business').click();
    await expect(page.getByTestId('breadcrumb-step-2-business')).toBeVisible();
    await expect(page.getByTestId('breadcrumb-step-3-individual')).not.toBeVisible();
  });

  test('should maintain data when switching back to visible step', async ({ page }) => {
    // Select business and fill data
    await page.getByTestId('radio-business').click();
    await page.getByTestId('next-button').click();
    await page.getByTestId('company-input').fill('Tech Corp');

    // Go back and switch type
    await page.getByTestId('prev-button').click();
    await page.getByTestId('radio-individual').click();

    // Navigate forward (should go to individual step)
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('individual-step')).toBeVisible();

    // Go back and switch to business again
    await page.getByTestId('prev-button').click();
    await page.getByTestId('radio-business').click();
    await page.getByTestId('next-button').click();

    // Company data should still be there
    await expect(page.getByTestId('company-input')).toHaveValue('Tech Corp');
  });

  test('should update breadcrumbs dynamically', async ({ page }) => {
    // Start with 2 breadcrumbs
    let breadcrumbs = page.locator('[data-testid^="breadcrumb-"]');
    expect(await breadcrumbs.count()).toBe(2);

    // Select business -> 3 breadcrumbs
    await page.getByTestId('radio-business').click();
    expect(await breadcrumbs.count()).toBe(3);
    await expect(page.getByTestId('breadcrumb-step-2-business')).toContainText('Business Info');

    // Select individual -> 3 breadcrumbs (different middle step)
    await page.getByTestId('radio-individual').click();
    expect(await breadcrumbs.count()).toBe(3);
    await expect(page.getByTestId('breadcrumb-step-3-individual')).toContainText('Personal Info');
  });
});
