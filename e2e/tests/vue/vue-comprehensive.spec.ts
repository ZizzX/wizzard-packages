import { test, expect } from '@playwright/test';

test.describe('Vue Wizard Comprehensive E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/comprehensive', { waitUntil: 'networkidle' });
    // Wait for the app to be mounted and visible
    await expect(page.locator('#app')).toBeVisible();
    // Wait for wizard to be fully rendered
    await expect(page.getByTestId('current-step')).toBeVisible();
    await expect(page.getByTestId('progress')).toBeVisible();
  });

  test('should handle basic navigation and validation flow', async ({ page }) => {
    // 1. Check initial state
    const currentStep = page.getByTestId('current-step');
    await expect(currentStep).toHaveText('personal');

    await expect(page.getByTestId('progress')).toHaveText('33%');
    await expect(page.getByTestId('btn-prev')).toBeDisabled();

    // 2. Try to navigate without data (should trigger validation)
    await page.getByTestId('btn-next').click();

    const nameError = page.getByTestId('error-name');
    await expect(nameError).toBeVisible();
    await expect(nameError).toHaveText('Name too short');
    await expect(page.getByTestId('error-email')).toHaveText('Invalid email');
    await expect(currentStep).toHaveText('personal');

    // 3. Fill personal info
    await page.getByTestId('input-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');

    // Proceed to next step
    await page.getByTestId('btn-next').click();

    // 4. Verify step 2 (Details)
    await expect(currentStep).toHaveText('details');
    await expect(page.getByTestId('progress')).toHaveText('67%');
    await expect(page.getByTestId('completed-personal')).toBeVisible();

    // 5. Fill details with invalid data
    await page.getByTestId('input-age').fill('16');
    await page.getByTestId('input-bio').fill('Short');
    await page.getByTestId('btn-next').click();

    const ageError = page.getByTestId('error-age');
    await expect(ageError).toBeVisible();
    await expect(ageError).toHaveText('Must be at least 18');
    await expect(page.getByTestId('error-bio')).toHaveText('Bio too short');

    // 6. Fix details
    await page.getByTestId('input-age').fill('25');
    await page
      .getByTestId('input-bio')
      .fill('This is a sufficiently long bio for testing purposes.');
    await page.getByTestId('btn-next').click();

    // 7. Review Step
    await expect(currentStep).toHaveText('review');
    await expect(page.getByTestId('progress')).toHaveText('100%');

    const summary = page.getByTestId('data-summary');
    await expect(summary).toContainText('"name": "John Doe"');
    await expect(summary).toContainText('"age": 25');

    await expect(page.getByTestId('btn-submit')).toBeVisible();
  });

  test('should support breadcrumb navigation for visited steps', async ({ page }) => {
    const currentStep = page.getByTestId('current-step');

    // Ensure we're on the first step
    await expect(currentStep).toHaveText('personal');

    // Fill first step
    await page.getByTestId('input-name').fill('John Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('btn-next').click();

    // Now on step 2, click breadcrumb to go back
    await expect(currentStep).toHaveText('details');

    const crumb1 = page.getByTestId('crumb-personal');
    await expect(crumb1).toHaveClass(/completed/);
    await crumb1.click();

    await expect(currentStep).toHaveText('personal');
    await expect(page.getByTestId('input-name')).toHaveValue('John Doe');

    // Go forward again using breadcrumb (since it's visited/completed)
    await page.getByTestId('crumb-details').click();
    await expect(currentStep).toHaveText('details');
  });

  test('should handle reactive field updates correctly', async ({ page }) => {
    // Ensure wizard is ready
    await expect(page.getByTestId('current-step')).toHaveText('personal');

    const input = page.getByTestId('input-name');
    await input.fill('Alice');

    // Validation check
    await input.fill('');
    await page.getByTestId('btn-next').click();

    // Should still be on personal step because of validation (min 2 chars)
    await expect(page.getByTestId('current-step')).toHaveText('personal');
    await expect(page.getByTestId('error-name')).toBeVisible();
  });

  test('should respect navigationMode: visited', async ({ page }) => {
    // Ensure wizard is ready
    await expect(page.getByTestId('current-step')).toHaveText('personal');

    // Try to click step 3 breadcrumb immediately
    const reviewCrumb = page.getByTestId('crumb-review');
    await expect(reviewCrumb).toBeVisible();
    await reviewCrumb.click();

    // Should NOT navigate because it's not visited and not adjacent
    await expect(page.getByTestId('current-step')).toHaveText('personal');
  });
});
