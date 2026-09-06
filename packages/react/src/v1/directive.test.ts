import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * The `'use client'` at the top of `index.tsx` only matters in `dist`: that is
 * what a React Server Components bundler reads. A build step once dropped it
 * silently, so this reads the built files rather than trusting the source.
 * Run `pnpm build` first; CI does.
 */
describe('use client directive', () => {
  it.each(['index.js', 'index.cjs'])('opens dist/v1/%s', (file) => {
    const code = readFileSync(resolve(__dirname, '../../dist/v1', file), 'utf8');
    // A directive prologue may hold several directives; CJS output opens with
    // 'use strict'. Anything else before 'use client' would end the prologue.
    const prologue = code.split('\n').slice(0, 2);
    expect(prologue).toContain('"use client";');
  });
});
