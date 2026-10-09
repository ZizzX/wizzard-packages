import { expect, test, type Page } from '@playwright/test';

/**
 * The homepage theater (docs/designs/hero-theater.md), against the production
 * build. The scenario is a real wizard being driven, so these read what a
 * visitor reads - the console, the form, the field's error - and the timeouts
 * are the scenario's length: about twenty seconds from load to the end.
 */

const PLAY = { timeout: 30_000 };

const theater = (page: Page) => page.locator('.theater');
const terminal = (page: Page) => page.locator('.theater-console');
const stop = (page: Page) => page.getByRole('button', { name: 'Stop' });
const unwritten = (page: Page) => page.locator('.theater-source .line.unwritten');
const inert = (page: Page) =>
  page.locator('.theater-form form').evaluate((form) => form.hasAttribute('inert'));

const notWider = async (page: Page) => {
  const [scroll, client] = await page.evaluate(() => [
    document.documentElement.scrollWidth,
    document.documentElement.clientWidth,
  ]);
  expect(scroll).toBeLessThanOrEqual(client as number);
};

for (const [width, height] of [
  [1280, 900],
  [390, 844],
] as const) {
  test.describe(`the hero theater at ${width}`, () => {
    test.use({ viewport: { width, height } });
    test.setTimeout(60_000);

    test('plays to the refusal, shows it under the field, and goes on to the end', async ({
      page,
    }) => {
      await page.goto('');
      await expect(terminal(page)).toContainText(
        "next() -> { ok: false, errors: { passport: 'required' } }",
        PLAY
      );
      const passport = page.getByLabel('Passport');
      await expect(passport).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('.field-error')).toHaveText('required');
      await expect(page.locator('.theater .node.group.error')).toHaveCount(1);

      // Payment shows the same line, so the heading is what says it is booked.
      await expect(page.locator('.theater-where')).toHaveText('Booked', PLAY);
      await expect(page.locator('.theater-booked')).toHaveText('Almaty -> Tbilisi, 2 passengers');
      await expect(terminal(page)).toContainText("next() -> { ok: true, to: '@end' }");
      await expect(stop(page)).toHaveCount(0);
      await notWider(page);
    });

    test('stops on a press in a field, and leaves the form live from that beat', async ({
      page,
    }) => {
      await page.goto('');
      const from = page.getByLabel('From');
      await expect(from).not.toHaveValue('', PLAY);
      await from.click();
      await expect(stop(page)).toHaveCount(0);

      // Nothing moves on its own any more: the form and the console hold the
      // beat the press landed on.
      const reached = await from.inputValue();
      const held = await page.locator('.theater-side').innerText();
      await page.waitForTimeout(1500);
      expect(await page.locator('.theater-side').innerText()).toBe(held);

      // What the visitor does goes to the engine, and the console says so.
      await from.press('End');
      await from.pressSequentially('!');
      await expect(from).toHaveValue(`${reached}!`);
      await page.getByRole('button', { name: 'Next' }).click();
      await expect(terminal(page)).toContainText("next() -> { ok: true, to: 'details' }");
      await expect(page.getByRole('log', { name: 'Console' })).toBeVisible();
    });

    test('stops from the keyboard, with the file finished and the form handed over', async ({
      page,
    }) => {
      await page.goto('');
      await expect(stop(page)).toBeVisible();
      await stop(page).focus();
      await page.keyboard.press('Enter');

      await expect(stop(page)).toHaveCount(0);
      await expect(unwritten(page)).toHaveCount(0);
      expect(await inert(page)).toBe(false);
      await expect(page.getByLabel('From')).toBeFocused();
      await expect(theater(page).locator('svg .node')).toHaveCount(5);

      await page.waitForTimeout(1500);
      await expect(terminal(page)).toHaveText('Calls made on the form, and what they return.');
    });
  });
}

test.describe('the hero theater without the scenario', () => {
  test('is the final frame under reduced motion, live, with nothing playing', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('');
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);

    await expect(stop(page)).toHaveCount(0);
    await expect(unwritten(page)).toHaveCount(0);
    expect(await inert(page)).toBe(false);
    await expect(theater(page).locator('svg .node')).toHaveCount(5);
    // The graph's edges still carry their draw animation, at the 0ms reduced
    // motion sets: finished before the first frame, so nothing is playing.
    const playing = await theater(page).evaluate(
      (el) => el.getAnimations({ subtree: true }).filter((a) => a.playState !== 'finished').length
    );
    expect(playing).toBe(0);

    await page.waitForTimeout(1500);
    await expect(page.getByLabel('From')).toHaveValue('');
    await expect(terminal(page)).toHaveText('Calls made on the form, and what they return.');
  });

  test('shows the final frame by itself when the island never arrives', async ({ page }) => {
    // By path: Astro retries a failed island a second later with an
    // `astro-retry` query, which a glob on the file name lets through.
    await page.route(
      (url) => url.pathname.includes('/_astro/Theater.'),
      (route) => route.abort()
    );
    await page.goto('');
    await expect(page.locator('html')).toHaveClass(/theater-pending/);
    await expect(page.locator('html')).not.toHaveClass(/theater-pending/, { timeout: 8_000 });
    await expect(page.locator('.theater-source .line').first()).toBeVisible();
  });
});
