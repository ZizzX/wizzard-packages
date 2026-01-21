import { test, expect } from '@playwright/test';

test.describe('Vue Persistence E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/test/persistence-demo', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();
  });

  test('should persist data to localStorage on step change', async ({ page }) => {
    // Fill step 1
    await page.getByTestId('name-input').fill('Alice Johnson');
    await page.getByTestId('email-input').fill('alice@example.com');

    // Navigate to step 2
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('current-step')).toHaveText(/Step 2/);

    // Check localStorage
    const storage = await page.evaluate(() => {
      const key = Object.keys(localStorage).find((k) => k.includes('wizard_persistence_test_'));
      return key ? localStorage.getItem(key) : null;
    });

    expect(storage).toBeTruthy();
    expect(storage).toContain('Alice Johnson');
    expect(storage).toContain('alice@example.com');
  });

  test('should restore data on page reload', async ({ page }) => {
    // Fill step 1 data
    await page.getByTestId('name-input').fill('Bob Smith');
    await page.getByTestId('email-input').fill('bob@test.com');

    // Go to step 2
    await page.getByTestId('next-button').click();
    await expect(page.getByTestId('current-step')).toHaveText(/Step 2/);

    // Fill step 2 data
    await page.getByTestId('address-input').fill('123 Main St');

    // Reload page
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();

    // Should restore to step 2 with data
    await expect(page.getByTestId('current-step')).toHaveText(/Step 2/);
    await expect(page.getByTestId('address-input')).toHaveValue('123 Main St');

    // Navigate back to step 1, data should be preserved
    await page.getByTestId('prev-button').click();
    await expect(page.getByTestId('name-input')).toHaveValue('Bob Smith');
    await expect(page.getByTestId('email-input')).toHaveValue('bob@test.com');
  });

  test('should restore current step on reload', async ({ page }) => {
    // Navigate to step 2
    await page.getByTestId('name-input').fill('Charlie');
    await page.getByTestId('email-input').fill('charlie@example.com');
    await page.getByTestId('next-button').click();

    await expect(page.getByTestId('current-step')).toHaveText(/Step 2/);

    // Reload
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();

    // Should still be on step 2
    await expect(page.getByTestId('current-step')).toHaveText(/Step 2/);
  });

  test('should clear storage on reset', async ({ page }) => {
    // Fill some data
    await page.getByTestId('name-input').fill('David Lee');
    await page.getByTestId('email-input').fill('david@example.com');
    await page.getByTestId('next-button').click();

    // Verify storage exists
    let hasStorage = await page.evaluate(() => {
      return Object.keys(localStorage).some((k) => k.includes('wizard_persistence_test_'));
    });
    expect(hasStorage).toBe(true);

    // Reset wizard
    await page.getByTestId('reset-button').click();

    // Check storage is cleared
    hasStorage = await page.evaluate(() => {
      return Object.keys(localStorage).some((k) => k.includes('wizard_persistence_test_'));
    });
    expect(hasStorage).toBe(false);

    // Should be back at step 1 with empty data
    await expect(page.getByTestId('current-step')).toHaveText(/Step 1/);
    await expect(page.getByTestId('name-input')).toHaveValue('');
    await expect(page.getByTestId('email-input')).toHaveValue('');
  });

  test('should restore visited steps state', async ({ page }) => {
    // Visit step 1 and 2
    await page.getByTestId('name-input').fill('Eve');
    await page.getByTestId('email-input').fill('eve@test.com');
    await page.getByTestId('next-button').click();

    await page.getByTestId('address-input').fill('456 Oak Ave');
    await page.getByTestId('next-button').click();

    // Now on step 3
    await expect(page.getByTestId('current-step')).toHaveText(/Step 3/);

    // Check breadcrumbs show visited/completed
    await expect(page.getByTestId('breadcrumb-step-1')).toHaveClass(/visited/);
    await expect(page.getByTestId('breadcrumb-step-1')).toHaveClass(/completed/);
    await expect(page.getByTestId('breadcrumb-step-2')).toHaveClass(/visited/);

    // Reload
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();

    // Should still show visited/completed state
    await expect(page.getByTestId('breadcrumb-step-1')).toHaveClass(/visited/);
    await expect(page.getByTestId('breadcrumb-step-1')).toHaveClass(/completed/);
    await expect(page.getByTestId('breadcrumb-step-2')).toHaveClass(/visited/);
  });

  test('should handle storage key isolation', async ({ page, context }) => {
    // Use custom storage key via query param
    await page.goto('/#/test/persistence-demo?key=test_a', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();

    await page.getByTestId('name-input').fill('User A');
    await page.getByTestId('next-button').click();

    // Open new page with different key
    const page2 = await context.newPage();
    await page2.goto('/test/persistence-demo?key=test_b', { waitUntil: 'networkidle' });
    await expect(page2.getByTestId('wizard-container')).toBeVisible();

    // Should not have data from page 1
    await expect(page2.getByTestId('name-input')).toHaveValue('');

    await page2.getByTestId('name-input').fill('User B');
    await page2.getByTestId('next-button').click();

    // Check both pages have isolated storage
    const storageKeys = await page.evaluate(() => Object.keys(localStorage));
    expect(storageKeys.some((k) => k.includes('test_a_'))).toBe(true);
    expect(storageKeys.some((k) => k.includes('test_b_'))).toBe(true);

    await page2.close();
  });

  test('should persist data onChange mode', async ({ page }) => {
    // Use onChange mode via query param
    await page.goto('/#/test/persistence-demo?mode=onChange', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('wizard-container')).toBeVisible();

    // Type into field
    await page.getByTestId('name-input').fill('Frank');

    // Wait a bit for debounce
    await page.waitForTimeout(200);

    // Check storage without navigating
    const storage = await page.evaluate(() => {
      const key = Object.keys(localStorage).find((k) => k.includes('wizard_persistence_test_'));
      return key ? localStorage.getItem(key) : null;
    });

    expect(storage).toBeTruthy();
    expect(storage).toContain('Frank');
  });
});
