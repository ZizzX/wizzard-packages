import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * The panel entry carries `'use client'`, and `/headless` must not: a Node or
 * Vue host imports the headless entry, and a client directive there would pull
 * it into a bundler's client graph for no reason.
 *
 * Both are checked in `dist`, not in the source, because that is what a bundler
 * reads and because a build step has dropped the directive before. Run
 * `pnpm build` first; CI does.
 */
describe('use client directive', () => {
  it.each(['index.js', 'index.cjs'])('opens dist/%s', (file) => {
    const code = readFileSync(resolve(__dirname, '../dist', file), 'utf8');
    /* A directive prologue may hold several directives; CJS output opens with
       'use strict'. Anything else before 'use client' would end the prologue. */
    const prologue = code.split('\n').slice(0, 2);
    expect(prologue).toContain('"use client";');
  });

  it.each(['index.js', 'index.cjs'])('leaves dist/headless/%s free of it', (file) => {
    const code = readFileSync(resolve(__dirname, '../dist/headless', file), 'utf8');
    expect(code).not.toContain('use client');
  });
});
