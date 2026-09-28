import { afterEach, describe, expect, it, vi } from 'vitest';

import firstSteps from './01-first-steps/run.out.txt?raw';
import validation from './02-validation/run.out.txt?raw';
import branch from './03-branch/run.out.txt?raw';
import repeat from './04-repeat/run.out.txt?raw';
import load from './05-load/run.out.txt?raw';
import save from './06-save/run.out.txt?raw';
import plugin from './07-plugin/run.out.txt?raw';

/**
 * The tutorial prints, after every step, what that step made work. Each run is
 * a script and its output is a file, and this is what keeps the two the same:
 * a change to the engine that moves any line fails here, not on the page.
 */
const STEPS: readonly (readonly [string, () => Promise<unknown>, string])[] = [
  ['01-first-steps', () => import('./01-first-steps/run'), firstSteps],
  ['02-validation', () => import('./02-validation/run'), validation],
  ['03-branch', () => import('./03-branch/run'), branch],
  ['04-repeat', () => import('./04-repeat/run'), repeat],
  ['05-load', () => import('./05-load/run'), load],
  ['06-save', () => import('./06-save/run'), save],
  ['07-plugin', () => import('./07-plugin/run'), plugin],
];

const lf = (s: string): string => s.replace(/\r\n/g, '\n');

afterEach(() => {
  vi.restoreAllMocks();
});

describe('the tutorial', () => {
  it.each(STEPS)('%s prints what the page says it does', async (_name, run, expected) => {
    const lines: unknown[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: unknown) => {
      lines.push(line);
    });

    await run();

    expect(`${lines.join('\n')}\n`).toBe(lf(expected));
  });
});
