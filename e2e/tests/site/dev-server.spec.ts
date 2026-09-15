import { spawn, type ChildProcess } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '../../fixtures/base';

/**
 * The site's development server, which every other spec here skips: they run
 * against the production build, and `site/astro.config.mjs` carries a
 * workaround that only `astro dev` exercises. `@vitejs/plugin-vue` compiles a
 * Vue script with the React plugin's Fast Refresh setting, and without the
 * workaround every page with a Vue island fails to render. This fails if a
 * dependency brings that back, or if the workaround starts switching refresh
 * off for React too.
 *
 * The server is started through Astro's `dev()` API rather than the CLI: the
 * CLI moves itself to the background when it thinks an agent is running it,
 * and a process that returns before its server listens cannot be awaited.
 */
const PORT = 4398;
const BASE = `http://127.0.0.1:${PORT}/wizzard-packages/`;
const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..');
const START = `
  import { dev } from 'astro';
  await dev({ root: process.cwd(), server: { host: '127.0.0.1', port: ${PORT} }, logLevel: 'error' });
  console.log('listening');
`;

let server: ChildProcess | undefined;

test.describe('the site in development', () => {
  test.describe.configure({ mode: 'serial', timeout: 180_000 });

  test.beforeAll(async () => {
    const child = spawn(process.execPath, ['--input-type=module', '-e', START], {
      cwd: resolve(ROOT, 'site'),
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    server = child;
    let output = '';
    await new Promise<void>((done, fail) => {
      const read = (chunk: Buffer): void => {
        output += String(chunk);
        if (output.includes('listening')) done();
      };
      child.stdout.on('data', read);
      child.stderr.on('data', read);
      child.on('exit', (code) => fail(new Error(`astro dev exited with ${code}:\n${output}`)));
    });
  });

  test.afterAll(() => {
    server?.kill();
  });

  for (const example of ['onboarding', 'passengers', 'reload']) {
    test(`renders the Vue ${example} page`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(`${BASE}examples/${example}/vue/`);
      expect(response?.status()).toBe(200);
      expect(errors).toEqual([]);
    });
  }

  test('keeps Fast Refresh for React and out of Vue', async ({ request }) => {
    // `/@fs/C:/...` on Windows, `/@fs/home/...` elsewhere.
    const root = ROOT.replace(/\\/g, '/').replace(/^\//, '');
    const source = `${BASE}@fs/${root}/examples/reference/src/onboarding/`;
    const react = await (await request.get(`${source}App.tsx`)).text();
    const vue = await (await request.get(`${source}Onboarding.vue`)).text();
    expect(react).toContain('$RefreshReg$');
    expect(vue).not.toContain('$RefreshSig$');
  });
});
