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
const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..');
// Port 0 lets the system choose, and the server reports what it bound. A fixed
// port is taken by a retry whose previous server is still shutting down, and
// Vite then moves to the next free port without saying so.
const START = `
  import { dev } from 'astro';
  const { address } = await dev({ root: process.cwd(), server: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
  console.log('listening on ' + address.port);
`;

let server: ChildProcess | undefined;
let base = '';

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
        const port = /listening on (\d+)/.exec(output)?.[1];
        if (!port) return;
        base = `http://127.0.0.1:${port}/wizzard-packages/`;
        done();
      };
      child.stdout.on('data', read);
      child.stderr.on('data', read);
      child.on('exit', (code) => fail(new Error(`astro dev exited with ${code}:\n${output}`)));
    });
  });

  test.afterAll(async () => {
    if (!server || server.exitCode !== null) return;
    const exited = new Promise((done) => server?.once('exit', done));
    server.kill();
    await exited;
  });

  for (const example of ['onboarding', 'passengers', 'reload']) {
    test(`renders the Vue ${example} page`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(`${base}examples/${example}/vue/`);
      expect(response?.status()).toBe(200);
      expect(errors).toEqual([]);
    });
  }

  test('keeps Fast Refresh for React and out of Vue', async ({ request }) => {
    // `/@fs/C:/...` on Windows, `/@fs/home/...` elsewhere.
    const root = ROOT.replace(/\\/g, '/').replace(/^\//, '');
    const source = `${base}@fs/${root}/examples/reference/src/onboarding/`;
    // Each module is checked for being the compiled component first, so a 404 or
    // an error page cannot pass the negative assertion by containing nothing.
    const compiled = async (file: string): Promise<string> => {
      const response = await request.get(`${source}${file}`);
      expect(response.status(), file).toBe(200);
      const text = await response.text();
      expect(text, file).toContain('export default');
      return text;
    };
    expect(await compiled('App.tsx')).toContain('$RefreshReg$');
    const vue = await compiled('Onboarding.vue');
    expect(vue).toContain('_sfc_main');
    expect(vue).not.toContain('$RefreshSig$');
  });
});
