import { expect, test } from '@playwright/test';

/**
 * The site had two top bars (D-015): the hand-written pages carried Examples
 * and Inspector with no search or theme, the documentation the other way round,
 * and the wordmark was drawn differently in each. One component draws both
 * now, and these tests hold every page to it.
 */

const PAGES = [
  ['', undefined],
  ['examples/', 'Examples'],
  ['inspector/', 'Inspector'],
  ['docs/start/', 'Docs'],
  ['errors/nav-blocked/', 'Docs'],
] as const;

test.describe('the top bar', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const [path, current] of PAGES) {
    test(`is the same bar on /${path}`, async ({ page }) => {
      await page.goto(path);
      const bar = page.locator('.site-header');

      await expect(bar.locator('.wordmark')).toHaveText('wizzard');
      await expect(bar.locator('.site-nav a')).toHaveText([
        'Examples',
        'Inspector',
        'Docs',
        'GitHub',
      ]);
      await expect(bar.locator('button[data-open-modal]')).toBeVisible();
      await expect(bar.locator('starlight-theme-select select')).toBeVisible();

      const marked = bar.locator('.site-nav a[aria-current="page"]');
      if (current) await expect(marked).toHaveText(current);
      else await expect(marked).toHaveCount(0);
    });
  }

  test('search opens from a page outside the documentation', async ({ page }) => {
    await page.goto('');
    await page.locator('.site-header button[data-open-modal]').click();
    await page.keyboard.type('persist');
    await expect(page.locator('.pagefind-ui__result').first()).toBeVisible();
  });

  test('a theme chosen in the documentation is the one the other pages open in', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('docs/start/');
    await page.locator('.site-header starlight-theme-select select').selectOption('light');

    await page.goto('inspector/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('.site-header starlight-theme-select select')).toHaveValue('light');
  });
});

test.describe('the top bar on a touch screen', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  /**
   * The documentation's GitHub icon was 34px wide beside a 44px floor, and the
   * height check in `docs.spec.ts` cannot see a width.
   */
  for (const path of ['', 'docs/start/']) {
    test(`every link in the bar on /${path} is at least 44px wide`, async ({ page }) => {
      await page.goto(path);
      const menu = page.locator('.sl-menu-button');
      if (await menu.isVisible()) await menu.click();

      const narrow = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('.site-nav a, .site-header button')]
          .filter((node) => {
            const box = node.getBoundingClientRect();
            return box.width > 0 && box.width < 44;
          })
          .map((node) => node.textContent?.trim())
      );
      expect(narrow).toEqual([]);
    });
  }

  test('the documentation keeps its fixed bar to one row and opens the links with its menu', async ({
    page,
  }) => {
    await page.goto('docs/start/');
    await expect(page.locator('.header .site-nav')).toBeHidden();

    await page.locator('.sl-menu-button').click();
    await expect(page.locator('.sidebar-content .site-nav a')).toHaveText([
      'Examples',
      'Inspector',
      'Docs',
      'GitHub',
    ]);
  });
});
