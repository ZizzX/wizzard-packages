import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

import { expect, test } from '../../fixtures/base';

/**
 * R-B, in a browser, where a reload is a real reload.
 *
 * The unit suite unmounts and mounts a component with the same storage behind
 * it, which is the same event as far as the engine is concerned. What only a
 * browser can do is press F5 while a check is in the air, and prove that what
 * comes back is a wizard rather than a wizard stuck saying "Checking".
 */
const REACT = 'examples/reload/';
const VUE = 'examples/reload/vue/';

const restoreLine = (page: Page) => page.locator('.app-restore');

/** Fills the first step and continues, leaving the wizard on the workspace step. */
async function reachWorkspace(page: Page): Promise<void> {
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('heading', { name: 'Name your workspace' })).toBeVisible();
}

test.describe('R-B reload', () => {
  test('draws the first step before it hydrates, and says nothing is saved yet', async ({
    page,
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const still = await context.newPage();
    await still.goto(REACT);

    await expect(still.getByRole('heading', { name: 'Your account' })).toBeVisible();
    await expect(still.getByRole('button', { name: 'Next' })).toBeDisabled();
    await expect(restoreLine(still)).toHaveText('Starting.');
    await context.close();

    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await expect(restoreLine(page)).toHaveText(
      'Nothing saved yet. This one will be, from the first answer.'
    );
  });

  test('comes back where it was left after a reload', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await reachWorkspace(page);

    await page.reload();
    await expect(restoreLine(page)).toHaveText('Restored. You are back where you left off.');
    await expect(page.getByRole('heading', { name: 'Name your workspace' })).toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByLabel('Email')).toHaveValue('ada@example.com');
  });

  test('is not corrupted by a reload in the middle of the check', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await reachWorkspace(page);

    await page.getByLabel('Workspace name').fill('ada-ltd');
    await page.getByRole('button', { name: 'Next' }).click();
    // The lookup is in the air, and the button says so rather than spinning.
    await expect(page.getByRole('button', { name: 'Checking…' })).toBeDisabled();

    await page.reload();

    // What was stored is the durable snapshot: no navigation in flight, no
    // busy list, so the restored wizard is idle and can be driven on.
    await expect(restoreLine(page)).toHaveText('Restored. You are back where you left off.');
    await expect(page.getByRole('heading', { name: 'Name your workspace' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await expect(page.locator('.app-state')).toContainText('idle');
  });

  test('Back throws away an answer that is still in the air', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await reachWorkspace(page);

    await page.getByLabel('Workspace name').fill('acme');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('button', { name: 'Checking…' })).toBeDisabled();

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByRole('heading', { name: 'Your account' })).toBeVisible();

    // "acme" is taken, so the answer still in the air is a refusal. Rather than
    // wait a fixed time for it to not appear, walk on with a name that is free:
    // the stale refusal lands during the second check, and if it were written
    // the wizard would be sitting on Workspace with an error instead of here.
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('heading', { name: 'Name your workspace' })).toBeVisible();
    await page.getByLabel('Workspace name').fill('ada-ltd');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Confirm' })).toBeVisible();
    await expect(page.locator('.field-error')).toHaveCount(0);
  });

  test('refuses a session written by an older version, and says which', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await reachWorkspace(page);

    await page.getByRole('button', { name: 'Ship version 2 and reload' }).click();

    await expect(restoreLine(page)).toHaveText(
      'Reset: the saved session was written by an older version of this application.'
    );
    await expect(page.getByRole('heading', { name: 'Your account' })).toBeVisible();
    await expect(page.getByLabel('Email')).toHaveValue('');
  });

  test('the Vue page restores what the React page saved', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await reachWorkspace(page);

    await page.goto(VUE);
    await expect(restoreLine(page)).toHaveText('Restored. You are back where you left off.');
    await expect(page.getByRole('heading', { name: 'Name your workspace' })).toBeVisible();
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
