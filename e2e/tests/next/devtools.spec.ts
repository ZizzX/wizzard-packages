import { expect, test } from '../../fixtures/base';

/**
 * The diagnosis journey. It is the one thing the panel exists for: a move was
 * refused, and the reason has to be readable without leaving the tab you were
 * on, then exportable to somebody who does not have your application.
 *
 * The `Record` press comes first because a recorder only carries attempts that
 * ended while it was running (`headless/record.ts:95-97`).
 */

const refusal = /next invalid/;

test('a refusal is readable on the graph tab and survives into the bundle', async ({ page }) => {
  await page.goto('/devtools');

  const graph = page.getByRole('tab', { name: 'Graph' });
  await expect(graph).toHaveAttribute('aria-selected', 'true');

  await page.getByRole('button', { name: 'Record' }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  // The strip reports it, and the tab has not changed underneath the reader.
  const strip = page.getByRole('button', { name: refusal });
  await expect(strip).toBeVisible();
  await expect(strip).toHaveText(/full: Your name is required/);
  await expect(graph).toHaveAttribute('aria-selected', 'true');

  // Opening it is what moves to Activity, where the same field is named again.
  await strip.click();
  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await expect(page.getByRole('option', { name: refusal })).toBeVisible();

  await page.getByRole('button', { name: 'Copy JSON' }).click();
  const bundle = await page.getByLabel('Bundle JSON').inputValue();
  expect(bundle).toContain('"reason": "invalid"');
  expect(bundle).toContain('Your name is required');
});

test('the refusal is readable in a 390 px container', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/devtools');

  await expect(page.locator('.wz-panel')).toHaveAttribute('data-narrow', 'true');

  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByRole('button', { name: refusal })).toBeVisible();
});

test('the refusal can be read and opened from the keyboard alone', async ({ page }) => {
  await page.goto('/devtools');

  // Back is disabled on the first step, so the tab order is input → Next →
  // the strip's outcome button.
  await page.getByRole('textbox', { name: 'Your name' }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('button', { name: refusal })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: refusal })).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
});
