import AxeBuilder from '@axe-core/playwright';

import type { Page } from '@playwright/test';

import { expect, test } from '../../fixtures/base';

/**
 * Getting started, which is the page the whole site points at: the quickstart
 * runs on it, on the binding the reader picked, and the source beside it is the
 * file that is running.
 *
 * Three things a browser can get wrong that a unit test cannot see: what the
 * page draws before anything hydrates, which runtime it downloads, and whether
 * the binding a reader picked here is the one they get everywhere else.
 *
 * Every locator below is scoped, because this page holds more than one of
 * everything. Starlight renders each tab panel and hides the inactive ones, so
 * an unscoped `getByLabel('Your name')` finds the React field and the Vue one;
 * and the page has three synced tab groups - install, new app, the example - so
 * an unscoped tab by name finds three.
 */
// Relative, so the repository's base path stays on the URL.
const START = 'docs/start/';

/** The tab group around the running example, rather than the install ones. */
const exampleTabs = (page: Page) =>
  page.locator('starlight-tabs').filter({ has: page.locator('[data-example-stage]') });

const tab = (page: Page, name: string) => exampleTabs(page).getByRole('tab', { name, exact: true });

/** One binding's island, so nothing reaches into the panel that is hidden. */
const stage = (page: Page, framework: 'react' | 'vue') =>
  page.locator(`[data-example-stage="${framework}"]`);

/** Every script the page fetched, concatenated. */
function collectScripts(page: Page): { text: () => Promise<string> } {
  const bodies: Promise<string>[] = [];
  page.on('response', (response) => {
    if (response.url().endsWith('.js')) bodies.push(response.text().catch(() => ''));
  });
  return { text: async () => (await Promise.all(bodies)).join('') };
}

/**
 * Expressive Code gives an overflowing code block `tabindex` from a script,
 * debounced and then deferred, so a scan that starts at `networkidle` arrives
 * first and reports every wide snippet as a scrollable region without keyboard
 * access. Waiting for the attribute is the difference between testing the page
 * and testing the race. A hidden panel has no width to overflow, so this has to
 * run again after a switch.
 */
const settled = async (page: Page): Promise<void> => {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.expressive-code pre')].every(
      (pre) => pre.scrollWidth <= pre.clientWidth || pre.hasAttribute('tabindex')
    )
  );
};

test.describe('Getting started', () => {
  test('draws the first step before it hydrates, with Next disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const still = await context.newPage();
    await still.goto(START);
    const react = stage(still, 'react');

    // The step is drawn, not a spinner, and every control says it is not ready
    // - the field included, or a visitor types into a frame the engine has not
    // seen and loses it at the first commit.
    await expect(react.getByLabel('Your name')).toBeVisible();
    await expect(react.getByLabel('Your name')).toBeDisabled();
    await expect(react.getByRole('button', { name: 'Next' })).toBeDisabled();
    // And the source is there without any JavaScript at all.
    await expect(still.getByText('defineFlow', { exact: false }).first()).toBeVisible();

    await context.close();
  });

  test('runs the React quickstart: the value survives Back', async ({ page }) => {
    await page.goto(START);
    const react = stage(page, 'react');

    // The example sits below the install sections, and `client:visible` means
    // what it says: the island mounts when it is on screen, not when the page
    // loads. Scrolling to it is what a reader does and what the directive is
    // waiting for.
    await react.scrollIntoViewIfNeeded();
    await expect(react.getByRole('button', { name: 'Next' })).toBeEnabled();

    await react.getByLabel('Your name').fill('Ada');
    await react.getByRole('button', { name: 'Next' }).click();
    await expect(react.getByText('Hello, Ada.')).toBeVisible();

    await react.getByRole('button', { name: 'Back' }).click();
    await expect(react.getByLabel('Your name')).toHaveValue('Ada');
  });

  test('hydrates the Vue example when its tab is opened, and runs the same flow', async ({
    page,
  }) => {
    await page.goto(START);
    await tab(page, 'Vue').click();
    const vue = stage(page, 'vue');

    await expect(vue.getByRole('button', { name: 'Next' })).toBeEnabled();
    await vue.getByLabel('Your name').fill('Ada');
    await vue.getByRole('button', { name: 'Next' }).click();
    await expect(vue.getByText('Hello, Ada.')).toBeVisible();

    await vue.getByRole('button', { name: 'Back' }).click();
    await expect(vue.getByLabel('Your name')).toHaveValue('Ada');
  });

  test('downloads one runtime: Vue only once its tab is opened', async ({ page }) => {
    const scripts = collectScripts(page);
    await page.goto(START);
    await stage(page, 'react').scrollIntoViewIfNeeded();
    await expect(stage(page, 'react').getByRole('button', { name: 'Next' })).toBeEnabled();

    const beforeSwitch = await scripts.text();
    expect(beforeSwitch).toContain('__reactContainer$');
    // The Vue panel is in the HTML, hidden - so `client:visible` has not
    // mounted it, and the binding it needs is still not on the wire.
    expect(beforeSwitch).not.toContain('__vue_app__');

    await tab(page, 'Vue').click();
    await expect(stage(page, 'vue').getByRole('button', { name: 'Next' })).toBeEnabled();
    expect(await scripts.text()).toContain('__vue_app__');
  });

  test('remembers the binding across a reload and out to the examples', async ({ page }) => {
    await page.goto(START);
    await tab(page, 'Vue').click();

    await page.reload();
    await expect(tab(page, 'Vue')).toHaveAttribute('aria-selected', 'true');

    // The same answer, read by a page that is not Starlight's.
    await page.goto('examples/');
    await expect(page.locator('a[data-example="onboarding"]')).toHaveAttribute(
      'href',
      /\/examples\/onboarding\/vue\/$/
    );
  });

  test('keeps Headless when a reference application is opened, since none is headless', async ({
    page,
  }) => {
    await page.goto(START);
    await tab(page, 'Headless').click();

    // R-A renders with React. Arriving there is not an answer to a question the
    // reader already answered with Headless.
    await page.goto('examples/onboarding/');
    await page.goto(START);

    await expect(tab(page, 'Headless')).toHaveAttribute('aria-selected', 'true');
  });

  for (const theme of ['dark', 'light'] as const) {
    test(`has no accessibility violations in ${theme}, on either tab`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.addInitScript((value) => {
        localStorage.setItem('starlight-theme', value);
      }, theme);

      await page.goto(START);
      await settled(page);
      const first = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(first.violations).toEqual([]);

      await tab(page, 'Vue').click();
      await settled(page);
      const second = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(second.violations).toEqual([]);
    });
  }
});
