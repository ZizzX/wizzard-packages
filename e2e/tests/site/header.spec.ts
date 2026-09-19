import { expect, test } from '@playwright/test';

/**
 * The site had two top bars (D-015): the hand-written pages carried Examples
 * and Inspector with no search or theme, the documentation the other way round,
 * and the wordmark was drawn differently in each. One component draws both
 * now, and these tests hold every page to it.
 */

const LINKS = ['Examples', 'Inspector', 'Docs', 'GitHub'];

/**
 * The entry that is marked, and how: `page` when the link is the page being
 * read, `true` when the page is inside that entry's section.
 */
const PAGES = [
  ['', undefined],
  ['examples/', ['Examples', 'page']],
  ['examples/onboarding/', ['Examples', 'true']],
  ['inspector/', ['Inspector', 'page']],
  ['docs/start/', ['Docs', 'page']],
  ['docs/flow/', ['Docs', 'true']],
  ['errors/nav-blocked/', ['Docs', 'true']],
  ['404', undefined],
] as const;

test.describe('the top bar', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const [path, current] of PAGES) {
    test(`is the same bar on /${path}`, async ({ page }) => {
      await page.goto(path);
      const bar = page.locator('.site-header');

      await expect(bar.locator('.wordmark')).toHaveText('wizzard');
      await expect(bar.locator('.site-nav a')).toHaveText(LINKS);
      await expect(bar.locator('.site-nav')).toBeVisible();
      await expect(bar.locator('button[data-open-modal]')).toBeVisible();
      await expect(bar.locator('starlight-theme-select select')).toBeVisible();

      const marked = bar.locator('.site-nav a[aria-current]');
      if (current) {
        await expect(marked).toHaveText(current[0]);
        await expect(marked).toHaveAttribute('aria-current', current[1]);
      } else {
        await expect(marked).toHaveCount(0);
      }
    });
  }

  /**
   * The pages' own bar sat in the 1120px column and scrolled away, so at 1440
   * the wordmark moved 160px sideways between the site and the documentation
   * and was gone as soon as the page moved (D-016).
   */
  test('stands where the documentation puts it, and stays on scroll', async ({ page }) => {
    await page.goto('docs/start/');
    const docs = await page.locator('.site-header .wordmark').boundingBox();

    await page.goto('');
    const mark = page.locator('.site-header .wordmark');
    const home = await mark.boundingBox();
    expect(home!.x).toBeCloseTo(docs!.x, 0);
    expect(home!.y).toBeCloseTo(docs!.y, 0);

    await page.mouse.wheel(0, 1200);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(600);
    expect((await mark.boundingBox())!.y).toBeCloseTo(home!.y, 0);
  });

  test('the menu copy of the links stays out of the documentation sidebar', async ({ page }) => {
    await page.goto('docs/start/');
    await expect(page.locator('.sidebar-content .site-nav')).toBeHidden();
    await expect(page.locator('nav[aria-label="Site"]')).toHaveCount(1);
  });

  test('search opens from a page outside the documentation', async ({ page }) => {
    await page.goto('');
    await page.locator('.site-header button[data-open-modal]').click();
    // Pagefind builds its field on an idle callback after load: `fill` waits
    // for it, where typing at once would land in the empty dialog.
    await page.locator('.pagefind-ui__search-input').fill('persist');
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

  test('a theme chosen on the other pages is the one the documentation opens in', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('inspector/');
    await page.locator('.site-header starlight-theme-select select').selectOption('dark');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.goto('docs/start/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
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
    const bar = await page.locator('.page > .header').boundingBox();
    const mark = await page.locator('.header .wordmark').boundingBox();
    expect(mark!.y + mark!.height).toBeLessThanOrEqual(bar!.y + bar!.height);

    await page.locator('.sl-menu-button').click();
    const links = page.locator('.sidebar-content .site-nav a');
    await expect(links).toHaveText(LINKS);
    for (const link of await links.all()) await expect(link).toBeVisible();
  });

  /** Two rows held on screen would cost a phone a sixth of its height. */
  test('the bar on the pages outside the documentation scrolls away', async ({ page }) => {
    await page.goto('');
    await page.evaluate(() => scrollTo(0, 1200));
    const bar = await page.locator('.topbar').boundingBox();
    expect(bar!.y + bar!.height).toBeLessThanOrEqual(0);
  });

  /** The not-found page is Starlight's but has no menu to open the links with. */
  test('the not-found page keeps the links in the bar', async ({ page }) => {
    await page.goto('404');
    for (const link of await page.locator('.header .site-nav a').all()) {
      await expect(link).toBeVisible();
    }
    const bar = await page.locator('.page > .header').boundingBox();
    const nav = await page.locator('.header .site-nav').boundingBox();
    expect(nav!.y + nav!.height).toBeLessThanOrEqual(bar!.y + bar!.height);
  });
});
