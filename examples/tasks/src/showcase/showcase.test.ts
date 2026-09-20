import { describe, expect, it, vi } from 'vitest';

import expectedOutput from './headless.out.txt?raw';

/**
 * The showcase page prints a run of the flow beside its definition. The run is
 * a script and its output is a file, and this is what keeps the two the same:
 * a change to the engine that moves any line of the walk fails here, not in a
 * reader's terminal.
 */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

describe('the showcase flow', () => {
  it('walks the way the page says it does', async () => {
    const lines: unknown[] = [];
    vi.spyOn(console, 'log').mockImplementation((line: unknown) => {
      lines.push(line);
    });

    await import('./headless');

    expect(`${lines.join('\n')}\n`).toBe(lf(expectedOutput));
    vi.restoreAllMocks();
  });
});
