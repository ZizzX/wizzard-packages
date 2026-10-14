import { afterEach, describe, expect, it, vi } from 'vitest';

import expected from './run.out.txt?raw';

/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

afterEach(() => {
  vi.restoreAllMocks();
});

describe('writing a plugin', () => {
  it('prints what the page says it does', async () => {
    const lines: unknown[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: unknown) => {
      lines.push(line);
    });

    await import('./run');

    expect(`${lines.join('\n')}\n`).toBe(lf(expected));
  });
});
