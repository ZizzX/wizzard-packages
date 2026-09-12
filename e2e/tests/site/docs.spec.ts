import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/**
 * The documentation pages had no end-to-end coverage at all: the four specs in
 * this directory visit the three example applications and the inspector, and
 * nothing ever loaded a `/docs/` route. S1's acceptance says "axe 0 violations
 * on every page", and "every page" had quietly come to mean the example pages.
 *
 * What that let through: Starlight paints the current sidebar entry as
 * `--sl-color-text-invert` on a `--sl-color-text-accent` fill, and the site's
 * own base rule for `a` - unlayered, and therefore stronger than every layered
 * rule Starlight writes, whatever its specificity - repainted the text in the
 * accent as well. The current page was accent on accent at 1.00:1 on all six
 * documentation pages, in both themes, and no check ran anywhere near it.
 */

/** Every page the sidebar links to, which `sidebar.test.ts` keeps honest. */
const DOCS = [
  ['Getting started', 'docs/start/'],
  ['Block Next until valid', 'docs/block-next-until-valid/'],
  ['Restore after reload', 'docs/restore-after-reload/'],
  ['Clear abandoned branch data', 'docs/clear-abandoned-branch-data/'],
  ['Render field errors', 'docs/render-field-errors/'],
  ['The flow', 'docs/flow/'],
  ['Expressions', 'docs/expressions/'],
  ['Navigation', 'docs/navigation/'],
  ['API behaviour', 'docs/api-behaviour/'],
  ['Validation', 'docs/validation/'],
  ['Persistence', 'docs/persistence/'],
] as const;

/** Starlight reads the theme from this key before it paints. */
const useTheme = (theme: 'dark' | 'light') => ({
  colorScheme: theme,
  storageState: {
    cookies: [],
    origins: [
      {
        origin: 'http://127.0.0.1:4321',
        localStorage: [{ name: 'starlight-theme', value: theme }],
      },
    ],
  },
});

/**
 * Expressive Code makes a code block keyboard-scrollable from a script rather
 * than from the markup: a `ResizeObserver` finds the blocks whose content
 * overflows and gives them `tabindex="0"` and `role="region"`. It is debounced
 * by 250ms and then deferred again to `requestIdleCallback`, so a scan that
 * starts at `networkidle` reliably arrives first and reports every wide snippet
 * as a scrollable region without keyboard access. Waiting for the attribute is
 * the difference between testing the page and testing the race.
 */
const settled = async (page: Page): Promise<void> => {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.expressive-code pre')].every(
      (pre) => pre.scrollWidth <= pre.clientWidth || pre.hasAttribute('tabindex')
    )
  );
};

const contrast = (fg: string, bg: string): number => {
  const luminance = (colour: string): number => {
    const channels = (colour.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const [r, g, b] = channels.map((value) => {
      const s = value / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    }) as [number, number, number];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [lighter, darker] = [luminance(fg), luminance(bg)].sort((a, b) => b - a) as [
    number,
    number,
  ];
  return (lighter + 0.05) / (darker + 0.05);
};

for (const theme of ['dark', 'light'] as const) {
  test.describe(`the documentation pages in ${theme}`, () => {
    test.use(useTheme(theme));

    for (const [name, path] of DOCS) {
      test(`${name} has no accessibility violations`, async ({ page }) => {
        await page.goto(path);
        await expect(page.locator('#starlight__sidebar')).toBeVisible();
        await settled(page);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }

    /**
     * axe skips a colour-contrast check it cannot resolve a background for, so
     * the pairing that actually broke is asserted directly rather than being
     * left to the sweep above.
     */
    test('the current sidebar entry is readable on its fill', async ({ page }) => {
      await page.goto('docs/flow/');
      const current = page.locator('#starlight__sidebar a[aria-current="page"]');
      await expect(current).toHaveText('The flow');

      const { color, background } = await current.evaluate((node) => {
        const style = getComputedStyle(node);
        return { color: style.color, background: style.backgroundColor };
      });
      expect(contrast(color, background)).toBeGreaterThanOrEqual(4.5);
    });

    test('the skip link is readable once it takes focus', async ({ page }) => {
      await page.goto('docs/flow/');
      await page.keyboard.press('Tab');

      const skip = page.getByRole('link', { name: 'Skip to content' });
      const { color, background } = await skip.evaluate((node) => {
        const style = getComputedStyle(node);
        return { color: style.color, background: style.backgroundColor };
      });
      expect(contrast(color, background)).toBeGreaterThanOrEqual(4.5);
    });
  });
}
