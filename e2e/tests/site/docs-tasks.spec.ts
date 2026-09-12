import type { Page } from '@playwright/test';

import { expect, test } from '../../fixtures/base';

/**
 * The four task pages, and the promise that makes them worth writing: a person
 * arrives with a phrase, not with a concept, and the page named after that
 * phrase is the first thing search gives them.
 *
 * The search half is checked against Pagefind's own index rather than through
 * Starlight's dialog: the dialog is Starlight's to test, the ranking is ours.
 * The index cannot be queried from Node - it resolves its shards against the
 * page's origin - so the query runs inside the browser.
 */
const PAGES = [
  ['Block Next until valid', 'docs/block-next-until-valid/'],
  ['Restore after reload', 'docs/restore-after-reload/'],
  ['Clear abandoned branch data', 'docs/clear-abandoned-branch-data/'],
  ['Render field errors', 'docs/render-field-errors/'],
] as const;

/** One binding's island, so nothing reaches into the panel that is hidden. */
const stage = (page: Page, framework: 'react' | 'vue') =>
  page.locator(`[data-example-stage="${framework}"]`);

test.describe('the task pages', () => {
  for (const [name, path] of PAGES) {
    test(`${name} runs its example`, async ({ page }) => {
      await page.goto(path);
      const react = stage(page, 'react');

      // The example sits below the prose, and `client:visible` means what it
      // says: the island mounts when it is on screen.
      await react.scrollIntoViewIfNeeded();
      await expect(react.getByRole('button', { name: 'Next' })).toBeEnabled();
    });
  }

  test('a refused move says which field is wrong', async ({ page }) => {
    await page.goto('docs/block-next-until-valid/');
    const react = stage(page, 'react');
    await react.scrollIntoViewIfNeeded();
    await expect(react.getByRole('button', { name: 'Next' })).toBeEnabled();

    await react.getByRole('button', { name: 'Next' }).click();
    await expect(react.getByRole('alert')).toContainText('Enter your email address');

    await react.getByLabel('Your email').fill('ada@example.com');
    await react.getByRole('button', { name: 'Next' }).click();
    await expect(react.getByText('That address will do.')).toBeVisible();
  });

  test('what a step asked to drop is not in the submission', async ({ page }) => {
    await page.goto('docs/clear-abandoned-branch-data/');
    const react = stage(page, 'react');
    await react.scrollIntoViewIfNeeded();
    await expect(react.getByRole('button', { name: 'Next' })).toBeEnabled();

    await react.getByLabel('Business').check();
    await react.getByRole('button', { name: 'Next' }).click();
    await react.getByLabel('Company name').fill('Acme');
    await react.getByRole('button', { name: 'Next' }).click();
    await react.getByLabel('Coupon code').fill('SPRING');
    await react.getByRole('button', { name: 'Next' }).click();

    const submitted = react.locator('pre');
    await expect(submitted).toContainText('Acme');
    await expect(submitted).not.toContainText('SPRING');
  });

  test('the devtools panel mounts over a running wizard', async ({ page }) => {
    await page.goto('docs/devtools/');
    const react = stage(page, 'react');
    await react.scrollIntoViewIfNeeded();

    // The panel is docked and fills its container, so a zero-height stage reads
    // as "broken" rather than "empty" - which is the mistake the page warns
    // about, and worth catching here rather than in a screenshot.
    await expect(react.getByRole('tab', { name: 'Activity' })).toBeVisible();
    expect((await react.boundingBox())?.height ?? 0).toBeGreaterThan(100);
  });

  test('a server-driven flow takes a patch and refuses the deleting one', async ({ page }) => {
    await page.goto('docs/server-driven/');
    const react = stage(page, 'react');
    await react.scrollIntoViewIfNeeded();
    await expect(react.getByRole('status')).toContainText('Loaded from the server');

    await react.getByRole('button', { name: 'Apply the patch' }).click();
    await expect(react.getByRole('status')).toContainText('applied');

    // The one change a payload must not be able to make.
    await react.getByRole('button', { name: 'Apply a patch that deletes this step' }).click();
    await expect(react.getByRole('status')).toContainText('refused');
  });

  test('force gets past the policy and not past the guard', async ({ page }) => {
    await page.goto('docs/api-behaviour/');
    const react = stage(page, 'react');
    await react.scrollIntoViewIfNeeded();
    await expect(react.getByRole('button', { name: 'Jump to Done' })).toBeEnabled();

    // Both refusals read `blocked`, so this does what the page asks a reader to
    // do: change one thing at a time and watch which refusal stops.
    await react.getByRole('button', { name: 'Jump to Done' }).click();
    await expect(react.getByRole('status')).toContainText('blocked');

    await react.getByRole('button', { name: 'Jump with force' }).click();
    await expect(react.getByRole('status')).toContainText('blocked');

    await react.getByLabel('Your plan').fill('pro');
    await react.getByRole('button', { name: 'Jump with force' }).click();
    await expect(react.getByRole('status')).toContainText('Moved to Done');
  });

  for (const [name, path] of PAGES) {
    test(`searching "${name}" finds its page first`, async ({ page }) => {
      // Any page will do: the index is the site's, not the page's.
      await page.goto('docs/start/');

      // The index sits at the site root, not beside the page: resolving it
      // against `document.baseURI` asks for it under `/docs/<page>/`, which is
      // a 404. The root is taken from the URL rather than written out, so the
      // repository's base path stays in one place.
      const root = `${page.url().split('/docs/')[0]}/pagefind/`;

      const first = await page.evaluate(
        async ({ phrase, base }) => {
          const pagefind = (await import(`${base}pagefind.js`)) as {
            options: (o: Record<string, string>) => Promise<void>;
            search: (q: string) => Promise<{ results: { data: () => Promise<{ url: string }> }[] }>;
          };
          await pagefind.options({ basePath: new URL(base).pathname });
          const found = await pagefind.search(phrase);
          const top = found.results[0];
          return top === undefined ? null : (await top.data()).url;
        },
        { phrase: name, base: root }
      );

      expect(first, `search for "${name}" returned nothing`).not.toBeNull();
      expect(first).toContain(path.replace(/\/$/, ''));
    });
  }
});
