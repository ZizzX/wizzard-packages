import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

import { expect, test } from '../../fixtures/base';

/**
 * R-C, in a browser, on both bindings.
 *
 * The claims are about identity rather than about counting: the second
 * passenger is still the second passenger after the third is finished, and
 * still themselves after the one in front of them is removed.
 */
const REACT = 'examples/passengers/';
const VUE = 'examples/passengers/vue/';

const stack = (page: Page) => page.locator('.app-state dd').first();
const where = (page: Page) => page.locator('.app-where');

/** Names three passengers and enters the block. */
async function party(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Add a passenger' }).click();
  await page.getByRole('button', { name: 'Add a passenger' }).click();
  const names = page.locator('.party input');
  await names.nth(0).fill('Ada');
  await names.nth(1).fill('Grace');
  await names.nth(2).fill('Alan');
  await page.getByRole('button', { name: 'Next' }).click();
}

/** Answers the passenger on screen and moves on. */
async function answer(page: Page, seat: string, meal: string): Promise<void> {
  await page.getByRole('button', { name: seat, exact: true }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: meal, exact: true }).click();
  await page.getByRole('button', { name: 'Next' }).click();
}

test.describe('R-C passengers', () => {
  test('draws the list before it hydrates, with the controls disabled', async ({
    page,
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const still = await context.newPage();
    await still.goto(REACT);

    await expect(still.getByRole('heading', { name: 'Who is travelling' })).toBeVisible();
    await expect(still.getByRole('button', { name: 'Next' })).toBeDisabled();
    await expect(still.getByRole('status')).toHaveText('Starting.');
    await context.close();

    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  test('runs the block once per passenger and reviews them all', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await party(page);

    await expect(where(page)).toContainText('Passenger 1 of 3, Ada');
    // Two frames deep inside a group: the one that names the item, and the
    // child step it is standing on.
    await expect(stack(page)).toHaveText('trip.people[p1] / passenger.seat');

    await answer(page, 'Window', 'Standard');
    await expect(where(page)).toContainText('Passenger 2 of 3, Grace');
    await answer(page, 'Aisle', 'Vegetarian');
    await expect(where(page)).toContainText('Passenger 3 of 3, Alan');
    await answer(page, 'Window', 'None');

    await expect(page.getByRole('heading', { name: 'Review' })).toBeVisible();
    await expect(page.getByRole('row', { name: /Grace/ })).toContainText('Vegetarian');
  });

  test('goes back into the second passenger after the third is finished', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await party(page);
    await answer(page, 'Window', 'Standard');
    await answer(page, 'Aisle', 'Vegetarian');
    await answer(page, 'Window', 'None');

    await page.getByRole('button', { name: 'Edit Grace' }).click();
    await expect(where(page)).toContainText('Passenger 2 of 3, Grace');
    await expect(stack(page)).toHaveText('trip.people[p2] / passenger.seat');
    // The answer is where it was left, addressed by key rather than by index.
    await expect(page.getByRole('button', { name: 'Aisle', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  test('keeps a passenger themselves when the one in front is removed', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await party(page);
    await answer(page, 'Window', 'Standard');
    await answer(page, 'Aisle', 'Vegetarian');
    await answer(page, 'Window', 'None');

    await page.getByRole('button', { name: 'Change who is travelling' }).click();
    await expect(page.getByRole('heading', { name: 'Who is travelling' })).toBeVisible();
    await page.getByRole('button', { name: 'Remove' }).first().click();

    await page.getByRole('button', { name: 'Next' }).click();
    // Grace is first now, and still Grace: the index moved, the key did not.
    await expect(where(page)).toContainText('Passenger 1 of 2, Grace');
    await expect(stack(page)).toHaveText('trip.people[p2] / passenger.seat');
  });

  test('the Vue page runs the same block', async ({ page }) => {
    await page.goto(VUE);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await party(page);

    await expect(where(page)).toContainText('Passenger 1 of 3, Ada');
    await expect(stack(page)).toHaveText('trip.people[p1] / passenger.seat');
  });

  test('each page downloads one runtime and not the other', async ({ page }) => {
    const bodies: Promise<string>[] = [];
    page.on('response', (response) => {
      if (response.url().endsWith('.js')) bodies.push(response.text().catch(() => ''));
    });

    await page.goto(VUE);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    const scripts = (await Promise.all(bodies)).join('');
    expect(scripts).toContain('__vue_app__');
    expect(scripts).not.toContain('__reactContainer$');
  });

  for (const [name, path] of [
    ['React', REACT],
    ['Vue', VUE],
  ] as const) {
    test(`the ${name} page has no accessibility violations`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
