import { expect, test } from '../../fixtures/base';

/**
 * The Next.js App Router fixture mounts `WizardProvider` from a server
 * component. Building it already proves the `'use client'` directive survived
 * the package build; this proves the page also hydrates and navigates.
 */
test('a server component page renders and drives the wizard', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Your name').fill('Ada');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('Hello, Ada.')).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByLabel('Your name')).toHaveValue('Ada');
});
