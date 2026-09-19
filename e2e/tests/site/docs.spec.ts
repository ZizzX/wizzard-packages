import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

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
  ['Devtools', 'docs/devtools/'],
  ['Server-driven flows', 'docs/server-driven/'],
  // The API reference is generated, one page per export, so it is sampled rather than listed:
  // the index, a module, and one page of each shape typedoc writes.
  ['API reference', 'docs/api/'],
  ['core/v1', 'docs/api/wizzard-packages/core/v1/'],
  ['createWizard', 'docs/api/wizzard-packages/core/v1/functions/createwizard/'],
  ['Wizard', 'docs/api/wizzard-packages/core/v1/interfaces/wizard/'],
  ['WizardError', 'docs/api/wizzard-packages/core/v1/classes/wizarderror/'],
  // One page per error code, read from disk: every code the library gains adds a page, and a
  // hand-kept list here would be the one place that forgets it.
  ...readdirSync(fileURLToPath(new URL('../../../site/src/content/docs/errors/', import.meta.url)))
    .filter((name) => /\.mdx?$/.test(name))
    .map((name) => {
      const code = name.replace(/\.mdx?$/, '');
      return [code, `errors/${code}/`] as const;
    }),
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
      const current = page.locator('#starlight__sidebar ul a[aria-current="page"]');
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

/**
 * `--target-min` is 44px under `pointer: coarse`, and it had been applied to the
 * marketing chrome only: on a phone the documentation's menu button was 32x32,
 * search 29x40, the copy button on every code block 40x40 and the sidebar rows
 * 34px. Measured with real touch emulation, because the rule is keyed on the
 * pointer and a narrow desktop viewport never matches it. Prose links and the
 * heading anchors are left out: they sit inline in text, where the size of a
 * line is the size of the target, and the anchors clear the 24px AA floor.
 */
test.describe('on a touch screen', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  for (const path of ['', 'examples/', 'docs/start/', 'docs/flow/', 'errors/nav-blocked/']) {
    test(`every control on /${path} is at least 44px tall`, async ({ page }) => {
      await page.goto(path);
      const menu = page.locator('.sl-menu-button');
      if (await menu.isVisible()) await menu.click();

      const small = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('a[href], button, summary')]
          .filter((node) => {
            const box = node.getBoundingClientRect();
            if (box.width === 0 || box.height === 0) return false;
            if (getComputedStyle(node).visibility === 'hidden') return false;
            if (node.matches('.sl-skip-link, .sl-anchor-link')) return false;
            if (node.closest('.sl-markdown-content :is(p, li, td), .hero p')) return false;
            return box.height < 44;
          })
          .map((node) => `${node.tagName} "${node.textContent?.trim().slice(0, 30)}"`)
      );
      expect(small).toEqual([]);
    });
  }

  /**
   * Growing a control can move it. The menu button grown by `min-height` sat 6px
   * below the centre of the bar, because Starlight centres it from its own size
   * property; the copy button grown to 44px hung 4px below every one-line code
   * block, because the block was shorter than the button and its spacing.
   */
  test('the grown controls stay where they were drawn', async ({ page }) => {
    await page.goto('docs/start/');
    const layout = await page.evaluate(() => {
      const centre = (selector: string): number => {
        const box = document.querySelector(selector)!.getBoundingClientRect();
        return box.top + box.height / 2;
      };
      const overhang = [...document.querySelectorAll('.expressive-code .frame')].map((frame) => {
        const button = frame.querySelector('.copy button')!.getBoundingClientRect();
        return button.bottom - frame.querySelector('pre')!.getBoundingClientRect().bottom;
      });
      return {
        offCentre: Math.abs(centre('.sl-menu-button') - centre('.header')),
        overhang: Math.max(...overhang),
      };
    });
    expect(layout.offCentre).toBeLessThanOrEqual(1);
    expect(layout.overhang).toBeLessThanOrEqual(0);
  });
});
