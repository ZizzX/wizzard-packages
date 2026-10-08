// `tsc` sees only the DOM here. This brings Node's types into the whole
// example project, for the `util` this file imports.
/// <reference types="node" />
import { format } from 'node:util';

import { afterEach, describe, expect, it, vi } from 'vitest';

import validateOutput from './validate.out.txt?raw';

/**
 * The validate and plugins READMEs embed these files, and the site's
 * validation and persistence pages embed the same ones. Each claim a reader
 * takes from them is checked here, so the code they copy is the code that ran.
 */

/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s: string): string => s.replace(/\r\n/g, '\n');

afterEach(() => {
  vi.restoreAllMocks();
});

describe('the validate README', () => {
  it('prints what next() returns when the schema refuses', async () => {
    const lines: string[] = [];
    // `format` is what Node's console.log prints with, so the checked-in output
    // is what a reader running the file sees.
    vi.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
      lines.push(format(...args));
    });

    await import('./validate');

    expect(`${lines.join('\n')}\n`).toBe(lf(validateOutput));
  });
});

describe('the plugins README', () => {
  it('brings a session back after a reload, from sessionStorage', async () => {
    sessionStorage.clear();
    localStorage.clear();
    const said = vi.spyOn(console, 'info').mockImplementation(() => {});

    const before = (await import('./persist')).wizard;
    await before.start();
    expect(said).toHaveBeenCalledWith('starting fresh:', 'persist/nothing-stored');

    before.set('name.full', 'Ada');
    await before.next();
    // Writes are coalesced to one per frame; tearing the wizard down flushes
    // the pending one, as a browser's `pagehide` does.
    before.destroy();
    expect(sessionStorage.getItem('signup')).not.toBeNull();
    expect(localStorage.length).toBe(0);

    // A reload evaluates the module again over the same storage.
    vi.resetModules();
    said.mockClear();
    const after = (await import('./persist')).wizard;
    await after.start();

    expect(said).not.toHaveBeenCalled();
    expect(after.getSnapshot().current).toBe('plan');
    expect(after.get('name.full')).toBe('Ada');
    after.destroy();
  });
});
