import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test, type Page } from '@playwright/test';

/**
 * The route walk on the homepage's first feature row
 * (docs/designs/home-route-walk.md). The engine records it at build time and
 * CSS plays it on the row's view timeline, so these read computed styles: what
 * the graph draws before the row arrives, where it settles, and that reduced
 * motion gets the settled picture with nothing playing.
 */

const frame = (page: Page) => page.locator('.flow-row').first().locator('.frame');

/** The drawing the row displays: it holds one per direction and shows one. */
const graph = (page: Page) => frame(page).locator('svg:visible');

/** A colour token as the browser resolves it under the theme in force now. */
const token = (page: Page, name: string) =>
  page.evaluate((name) => {
    const probe = document.createElement('span');
    probe.style.color = `var(${name})`;
    document.body.append(probe);
    const colour = getComputedStyle(probe).color;
    probe.remove();
    return colour;
  }, name);

const visited = (page: Page) => token(page, '--st-visited');

/** The pieces of the walk that change most, as the browser computes them now. */
const look = (page: Page) =>
  graph(page).evaluate((el) => {
    const style = (selector: string) => getComputedStyle(el.querySelector(selector) as Element);
    return {
      details: style('.node.walked > rect:not(.halo)').stroke,
      company: style('.node.dropped > rect').strokeDasharray,
      condition: style('.node.dropped > text.node-when').fill,
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
      // Before the break Company reads as a step still ahead, condition and all.
      expect(before.condition).toBe(await token(page, '--fg-muted'));

      await frame(page).evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await expect.poll(async () => (await look(page)).hot).toBe('0px');
      const after = await look(page);
      expect(after.company).toBe('4px, 4px');
      expect(after.condition).toBe(await token(page, '--st-skipped'));
      expect(after.details).not.toBe(before.details);
      expect(after.end).not.toBe(before.end);

      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(async () => (await look(page)).hot).toBe('100px');
    });

    test('follows a theme switched after it settled', async ({ page }) => {
      await page.goto('');
      await frame(page).evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await expect.poll(async () => (await look(page)).hot).toBe('0px');
      expect((await look(page)).details).toBe(await visited(page));
      const theme = await page.evaluate(() => document.documentElement.dataset.theme);
      const other = theme === 'dark' ? 'light' : 'dark';

      await page.evaluate((other) => {
        document.documentElement.dataset.theme = other;
      }, other);
      // The end frame is held by keyframes, and their colours must still be the
      // tokens: Details draws the switched theme's visited stroke, not the old one.
      expect((await look(page)).details).toBe(await visited(page));
    });

    test('does not widen the page', async ({ page }) => {
      await page.goto('');
      const [scroll, client] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
      ]);
      expect(scroll).toBeLessThanOrEqual(client as number);
    });

    test(`lays every row's graph ${width > 900 ? 'across' : 'down'}, whole inside its frame`, async ({
      page,
    }) => {
      await page.goto('');
      // Laid across on a phone, the first row's route is 788 units: the frame
      // scrolled, and its second half, where the walk ends, was out of sight.
      const shown = width > 900 ? '.graph-row' : '.graph-column';
      const rows = page.locator('.flow-row');
      await expect(rows).toHaveCount(3);
      for (const row of await rows.all()) {
        await expect(row.locator('svg:visible')).toHaveCount(1);
        await expect(row.locator(`${shown} svg`)).toBeVisible();
        const fits = await row.locator('.frame').evaluate((el) => el.scrollWidth <= el.clientWidth);
        expect(fits).toBe(true);
        // A straight edge runs along the axis between two box centres. Across,
        // a 40-unit step beside a 48-unit repeat group was top-aligned, and the
        // edge between them slanted by 4 units.
        const slanted = await row.locator(`${shown} svg .edge polyline`).evaluateAll((lines) =>
          lines
            .map((l) =>
              (l.getAttribute('points') ?? '').split(' ').map((p) => p.split(',').map(Number))
            )
            .filter((pts) => pts.length === 2)
            .filter(([a, b]) => a?.[0] !== b?.[0] && a?.[1] !== b?.[1])
        );
        expect(slanted).toEqual([]);
      }
    });
  });
}

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`the route walk under reduced motion, ${colorScheme}`, () => {
    test('is drawn at its end frame, with nothing playing', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme });
      await page.goto('');
      expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe(colorScheme);
      const atRest = await look(page);
      expect(atRest.details).toBe(await visited(page));
      expect(atRest.company).toBe('4px, 4px');
      expect(atRest.hot).toBe('0px');
      expect(await frame(page).evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(
        0
      );
    });
  });
}

/**
 * The evidence under the rows (site/src/components/Evidence.astro). Its sizes
 * are measured when the site is built, so this measures again and compares: a
 * bar drawn from a stale number, or out of scale with its neighbours, fails.
 */
test.describe('the evidence', () => {
  // The formatting and the arithmetic are written out again here rather than
  // imported from site/src/lib/evidence.ts, so the test does not trust the code
  // it checks.
  const bytes = (size: number) =>
    size < 1000 ? `${size} B` : `${(Math.round(size / 10) / 100).toFixed(2)} kB`;
  const root = fileURLToPath(new URL('../../../', import.meta.url));

  /** size-limit's measurements now, by entry name. Over a budget it exits 1 and still prints them. */
  function measure(): Map<string, number> {
    const bin = join(
      dirname(createRequire(join(root, 'package.json')).resolve('size-limit/package.json')),
      'bin.js'
    );
    let stdout: string;
    try {
      stdout = execFileSync(process.execPath, [bin, '--json'], { cwd: root, encoding: 'utf8' });
    } catch (error) {
      stdout = (error as { stdout?: string }).stdout ?? '';
    }
    let entries: unknown;
    try {
      entries = JSON.parse(stdout);
    } catch {
      entries = undefined;
    }
    if (!Array.isArray(entries)) {
      throw new Error(
        `size-limit gave the evidence test no measurements: ${stdout.slice(0, 200) || 'it printed nothing'}. The test compares the size card with them. Run pnpm exec size-limit --json from the repository root and fix what it reports.`
      );
    }
    return new Map(
      (entries as { name: string; size: number }[]).map((entry) => [entry.name, entry.size])
    );
  }

  test('draws what each import adds to core, as size-limit measures it now', async ({ page }) => {
    const measured = measure();
    const engine = measured.get('homepage createWizard') ?? Number.NaN;
    const added = (entry: string) => (measured.get(entry) ?? Number.NaN) - engine;
    const expected = new Map([
      ['core', engine],
      ['react', added('homepage + react')],
      ['vue', added('homepage + vue')],
      ['validate', added('homepage + validate')],
      ['groups', added('homepage + groups')],
      ['snapshot', added('homepage + snapshot')],
      ['persist', added('homepage + persist')],
    ]);

    await page.goto('');
    const bars = await page.locator('.bars li').evaluateAll((items) =>
      items.map((item) => ({
        name: item.querySelector('.bar-name')?.textContent ?? '',
        value: item.querySelector('.bar-value')?.textContent,
        width: item.querySelector('.bar')?.getBoundingClientRect().width ?? 0,
      }))
    );

    expect(bars.map((bar) => bar.name).sort()).toEqual([...expected.keys()].sort());
    for (const bar of bars) expect(bar.value).toBe(bytes(expected.get(bar.name) ?? Number.NaN));

    // Largest first, and every bar to one scale: its length is its share of core's,
    // compared in pixels so a short bar is held as tightly as a long one.
    const widths = bars.map((bar) => bar.width);
    expect(widths).toEqual([...widths].sort((a, b) => b - a));
    const core = bars.find((bar) => bar.name === 'core')?.width ?? Number.NaN;
    for (const bar of bars) {
      expect(bar.width).toBeCloseTo((core * (expected.get(bar.name) ?? Number.NaN)) / engine, 0);
    }
  });

  test('quotes the tested files and the engine, not compiled code', async ({ page }) => {
    await page.goto('');
    const cards = page.locator('.card');
    // Both bindings quote the same two lines; the Vue one is read from a .vue file.
    const hooks = cards.filter({ hasText: 'The same hooks' }).locator('.card-code');
    await expect(hooks).toHaveCount(2);
    for (const block of await hooks.all()) {
      await expect(block).toContainText('const { current, isLast } = useStep();');
      await expect(block).toContainText('const { next, back, canBack } = useNavigation();');
    }
    await expect(
      cards.filter({ hasText: 'caught before it runs' }).locator('.card-output')
    ).toHaveText(/^\[wizzard\] \$get "account\.type" does not start with data, ctx, loop\./);
  });

  test('states the versions the packages declare', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('.evidence-strip dd')).toHaveText([
      'React >= 18',
      'Vue >= 3.5',
      'Node >= 20.11',
    ]);
  });
});
