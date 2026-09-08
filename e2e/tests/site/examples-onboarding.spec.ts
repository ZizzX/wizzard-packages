import AxeBuilder from '@axe-core/playwright';

import type { Page } from '@playwright/test';

import { expect, test } from '../../fixtures/base';

/**
 * R-A, in a browser, on both bindings.
 *
 * The unit suite already drives the application. What a browser adds is the
 * three things a page can get wrong on its own: what it draws before anything
 * hydrates, what it can be operated with instead of a mouse, and which runtime
 * it actually downloaded.
 */
// Relative, so the repository's base path stays on the URL: a leading slash
// would replace it and every page here would be a 404.
const REACT = 'examples/onboarding/';
const VUE = 'examples/onboarding/vue/';

/** Walks Tab until the named field has focus, then types into it. */
async function tabTo(page: Page, id: string): Promise<void> {
  for (let i = 0; i < 20; i++) {
    if (await page.locator(`#${id}`).evaluate((el) => el === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  throw new Error(`never reached #${id} with the keyboard`);
}

/** Every script the page fetched, concatenated. */
function collectScripts(page: Page): { text: () => Promise<string> } {
  const bodies: Promise<string>[] = [];
  page.on('response', (response) => {
    if (response.url().endsWith('.js')) bodies.push(response.text().catch(() => ''));
  });
  return { text: async () => (await Promise.all(bodies)).join('') };
}

test.describe('R-A onboarding', () => {
  test('draws the first step before it hydrates, with the controls disabled', async ({
    page,
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const still = await context.newPage();
    await still.goto(REACT);

    // The step is drawn, not a spinner, and the buttons say they are not ready.
    await expect(still.getByRole('heading', { name: 'Your details' })).toBeVisible();
    await expect(still.getByLabel('Email')).toBeVisible();
    await expect(still.getByRole('button', { name: 'Next' })).toBeDisabled();
    await expect(still.getByRole('status')).toHaveText('Starting.');
    // And the source is there without any JavaScript at all.
    await expect(still.getByText('defineFlow', { exact: false }).first()).toBeVisible();
    await context.close();

    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  test('routes a business payer through Company and submits neither the code nor the branch', async ({
    page,
  }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Business' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
    await page.getByLabel('Six-digit code').fill('123456');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Company details' })).toBeVisible();
    await page.getByLabel('Company name').fill('Acme');
    await page.getByLabel('VAT number').fill('GB123');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
    await page.getByLabel('Card number').fill('4242424242424242');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Review' })).toBeVisible();
    const body = await page.locator('.app-data').innerText();
    expect(body).toContain('"company"');
    // The one-time code was dropped the moment the step was left.
    expect(body).not.toContain('"verify"');
    expect(body).not.toContain('123456');
  });

  test('can be walked without a mouse, and says where it went', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

    await tabTo(page, 'email');
    await page.keyboard.type('ada@example.com');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // The second segmented button is Business; Enter presses it.
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Business' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
    // Focus went with the flow, and the live region said so.
    await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeFocused();
    await expect(page.getByRole('status')).toHaveText('Verify your email. Step 2 of 5.');
  });

  test('refuses the first move and names the field', async ({ page }) => {
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('heading', { name: 'Your details' })).toBeVisible();
    await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByRole('status')).toContainText('Enter your email address.');
  });

  test('the Vue page runs the same flow', async ({ page }) => {
    await page.goto(VUE);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Business' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeFocused();
    await expect(page.locator('.app-state')).toContainText(
      'details → verify → company → payment → review'
    );
  });

  test('each page downloads one runtime and not the other', async ({ page }) => {
    const react = collectScripts(page);
    await page.goto(REACT);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    const reactScripts = await react.text();
    expect(reactScripts).toContain('__reactContainer$');
    expect(reactScripts).not.toContain('__vue_app__');

    const vue = collectScripts(page);
    await page.goto(VUE);
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    const vueScripts = await vue.text();
    expect(vueScripts).toContain('__vue_app__');
    expect(vueScripts).not.toContain('__reactContainer$');
  });

  test('the framework toggle is a link, and the index remembers the answer', async ({ page }) => {
    await page.goto(REACT);
    await page.getByRole('link', { name: 'Vue' }).click();
    await expect(page).toHaveURL(/\/examples\/onboarding\/vue\/$/);
    await expect(page.getByRole('link', { name: 'Vue' })).toHaveAttribute('aria-current', 'page');

    // The index links where the visitor last was, without changing what any
    // page renders.
    await page.goto('examples/');
    await expect(page.locator('a[data-example="onboarding"]')).toHaveAttribute(
      'href',
      /\/examples\/onboarding\/vue\/$/
    );
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
