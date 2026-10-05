import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../fixtures/base';

/**
 * The inspector is the page a stranger is sent to, so the things asserted here
 * are the ones that make it a page rather than a screenshot: it draws before
 * anything hydrates, it can be walked without a mouse, it survives a hostile
 * paste, and it is usable at the three widths the design names.
 *
 * The unit suite already covers what each mode computes. This covers what a
 * browser does with it.
 */

test.describe('the inspector', () => {
  test('draws the example before it hydrates, with its controls disabled', async ({
    page,
    browser,
  }) => {
    // A page with JavaScript switched off is the pre-hydration frame, frozen.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const still = await context.newPage();
    await still.goto('inspector/');

    await expect(still.locator('.node').first()).toBeVisible();
    await expect(still.getByRole('button', { name: 'Next' })).toBeDisabled();
    await expect(still.locator('.stage-status')).toHaveText('starting');
    await context.close();

    // And with it on, the same graph is there and the controls come alive.
    await page.goto('inspector/');
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  test('can be walked and read without a mouse', async ({ page }) => {
    await page.goto('inspector/');
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

    const graph = page.locator('svg.interactive');
    await graph.focus();

    // One focus stop for the whole graph: the arrows move inside it, and the
    // node being read is named by `aria-activedescendant`.
    await page.keyboard.press('ArrowDown');
    await expect(graph).toHaveAttribute('aria-activedescendant', 'node-details');
    await page.keyboard.press('ArrowDown');
    await expect(graph).toHaveAttribute('aria-activedescendant', 'node-company');

    await expect(page.getByRole('heading', { name: 'Company' })).toBeVisible();
    // The condition is on the node, in the mirror table and in the card. The
    // card is the one a reader came to read.
    await expect(page.locator('.node-card').getByText('data.payer == "business"')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(graph).not.toHaveAttribute('aria-activedescendant', /./);

    // Tab leaves the graph rather than walking it node by node.
    await page.keyboard.press('Tab');
    await expect(graph).not.toBeFocused();
  });

  test('takes Company off the route when the payer changes, and walks the new route', async ({
    page,
  }) => {
    await page.goto('inspector/');
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

    const company = page.locator('#node-company');
    const state = page.locator('.mirror tr', { hasText: 'Company' }).locator('td').nth(1);
    await expect(company).not.toHaveClass(/\bskipped\b/);
    await expect(state).not.toHaveText('skipped');

    await page.getByRole('button', { name: 'Personal' }).click();
    await expect(company).toHaveClass(/\bskipped\b/);
    await expect(state).toHaveText('skipped');

    // The graph is not a picture of the route, it is the route: Next from the
    // first step now lands on payment.
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByLabel('Card number')).toBeVisible();
    await expect(page.locator('#node-payment')).toHaveClass(/\bactive\b/);

    await page.getByRole('button', { name: 'Business' }).click();
    await expect(company).not.toHaveClass(/\bskipped\b/);
  });

  test('scrubs a recorded run with the keyboard', async ({ page }) => {
    await page.goto('inspector/');
    await page.getByRole('button', { name: 'Replay' }).click();

    await expect(page.locator('.stage-status')).toHaveText(/frame 9 of 9/);

    const scrubber = page.getByLabel('Frame of the recorded run');
    await scrubber.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.stage-status')).toHaveText(/frame 8 of 9/);

    await expect(page.getByRole('table', { name: /what this step changed/i })).toBeVisible();
  });

  test('keeps the graph it had when a paste cannot be read', async ({ page }) => {
    await page.goto('inspector/');
    const nodes = page.locator('.node');
    await expect(nodes.first()).toBeVisible();
    const before = await nodes.count();

    await page.getByText('Paste your own flow').click();
    await page.getByLabel(/A flow is JSON/).fill('{ "id": "a", "steps": {,');
    await page.getByRole('button', { name: 'Draw this flow' }).click();

    await expect(page.getByRole('alert')).toContainText(/line \d+, column \d+/);
    expect(await nodes.count()).toBe(before);
  });

  test('refuses a paste past a million characters before it reads it', async ({ page }) => {
    await page.goto('inspector/');
    const nodes = page.locator('.node');
    await expect(nodes.first()).toBeVisible();
    const before = await nodes.count();

    // Valid JSON, and a flow the preview would draw at any smaller size: what
    // refuses it is the length, not the parser or the flow rules.
    const big = JSON.stringify({
      id: 'big',
      order: ['one'],
      steps: { one: { label: 'x'.repeat(1_000_000) } },
    });
    await page.getByText('Paste your own flow').click();
    await page.getByLabel(/A flow is JSON/).fill(big);
    await page.getByRole('button', { name: 'Draw this flow' }).click();

    await expect(page.getByRole('alert')).toContainText('reads up to');
    await expect(page.getByText(/structure preview/)).toBeHidden();
    expect(await nodes.count()).toBe(before);
  });

  test('renders a pasted label as text, never as markup', async ({ page }) => {
    await page.goto('inspector/');
    await page.getByText('Paste your own flow').click();
    await page.getByLabel(/A flow is JSON/).fill(
      JSON.stringify({
        id: 'hostile',
        order: ['one'],
        steps: { one: { label: '<img src=x onerror="window.__x=1">' } },
      })
    );
    await page.getByRole('button', { name: 'Draw this flow' }).click();

    await expect(page.getByText(/structure preview/)).toBeVisible();
    expect(await page.locator('svg img').count()).toBe(0);
    expect(await page.evaluate(() => (window as { __x?: number }).__x)).toBeUndefined();
  });

  // The widths the design names: two columns, one column, and a phone.
  for (const [name, width, height] of [
    ['desktop', 1280, 900],
    ['tablet', 900, 900],
    ['phone', 390, 844],
  ] as const) {
    test(`is usable and has no accessibility violations at ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('inspector/');
      await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

      // The form is what stays usable at every width: a reader on a phone can
      // still drive the flow, even where the graph has to be opened for.
      await expect(page.getByLabel('Email')).toBeVisible();

      // Nothing pushes the page sideways. A graph that does not fit scrolls
      // inside its own frame instead.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflow).toBe(false);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('opens the graph full screen on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('inspector/');

    const open = page.getByRole('button', { name: 'View graph' });
    await expect(open).toBeVisible();
    await open.click();

    await expect(page.getByRole('button', { name: 'Close graph' })).toBeVisible();
    // Full screen means the frame fills the viewport, and panning it is the
    // scroll it already has.
    const box = await page.locator('.stage-full .stage-graph').boundingBox();
    expect(box?.height).toBeGreaterThan(700);
  });
});
