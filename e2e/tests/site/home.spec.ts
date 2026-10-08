import { expect, test, type Page } from '@playwright/test';

/**
 * The route walk on the homepage's first feature row
 * (docs/designs/home-route-walk.md). The engine records it at build time and
 * CSS plays it on the row's view timeline, so these read computed styles: what
 * the graph draws before the row arrives, where it settles, and that reduced
 * motion gets the settled picture with nothing playing.
 */

const frame = (page: Page) => page.locator('.flow-row').first().locator('.frame');

/** The four pieces of the walk that change most, as the browser computes them now. */
const look = (page: Page) =>
  frame(page).evaluate((el) => {
    const style = (selector: string) => getComputedStyle(el.querySelector(selector) as Element);
    return {
      details: style('.node.walked > rect:not(.halo)').stroke,
      company: style('.node.dropped > rect').strokeDasharray,
      end: style('.node.end > circle:not(.ring)').fill,
      hot: style('.edge.run > polyline.hot').strokeDashoffset,
    };
  });

for (const [width, height] of [
  [1280, 900],
  [390, 844],
] as const) {
  test.describe(`the route walk at ${width} wide`, () => {
    test.use({ viewport: { width, height } });

    test('waits below the fold, settles in view, and rewinds on the way back', async ({ page }) => {
      await page.goto('');
      const top = await frame(page).evaluate((el) => el.getBoundingClientRect().top);
      expect(top).toBeGreaterThan(height);

      // A view timeline goes live on the first frame after layout. Until then the
      // graph draws its markup, which is the end frame, so wait for the start.
      await expect.poll(async () => (await look(page)).hot).toBe('100px');
      const before = await look(page);
      expect(before.company).toBe('4px, 0px');

      await frame(page).evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await expect.poll(async () => (await look(page)).hot).toBe('0px');
      const after = await look(page);
      expect(after.company).toBe('4px, 4px');
      expect(after.details).not.toBe(before.details);
      expect(after.end).not.toBe(before.end);

      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(async () => (await look(page)).hot).toBe('100px');
    });

    test('does not widen the page', async ({ page }) => {
      await page.goto('');
      const [scroll, client] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
      ]);
      expect(scroll).toBeLessThanOrEqual(client as number);
    });
  });
}

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`the route walk under reduced motion, ${colorScheme}`, () => {
    test('is drawn at its end frame, with nothing playing', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme });
      await page.goto('');
      const atRest = await look(page);
      expect(atRest.company).toBe('4px, 4px');
      expect(atRest.hot).toBe('0px');
      expect(await frame(page).evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(
        0
      );
    });
  });
}
