import { createWizard, type FlowDefinition } from '@wizzard-packages/core/v1';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { persist, type RestoreOutcome, type SyncStorage } from './persist';

const flow: FlowDefinition = {
  id: 'signup',
  order: ['name', 'review'],
  steps: { name: {}, review: {} },
};

/** A storage that can be told to misbehave, which is most of what this tests. */
function fakeStorage(initial: Record<string, string> = {}): SyncStorage & {
  items: Map<string, string>;
  failWrites?: Error;
  failReads?: Error;
  writes: number;
} {
  const items = new Map(Object.entries(initial));
  return {
    items,
    writes: 0,
    getItem(key) {
      if (this.failReads) throw this.failReads;
      return items.get(key) ?? null;
    },
    setItem(key, value) {
      if (this.failWrites) throw this.failWrites;
      this.writes += 1;
      items.set(key, value);
    },
    removeItem: (key) => void items.delete(key),
  };
}

const outcomes: RestoreOutcome[] = [];
const onRestore = (o: RestoreOutcome): void => void outcomes.push(o);

const make = (storage: SyncStorage, extra: Record<string, unknown> = {}) =>
  createWizard({
    flow,
    plugins: [persist({ key: 'signup', storage, onRestore, ...extra })],
  });

beforeEach(() => {
  outcomes.length = 0;
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

/** Writes are coalesced, so the timer has to run before storage is inspected. */
const settle = (): void => void vi.runAllTimers();

describe('persist', () => {
  it('brings a session back across a reload', async () => {
    const storage = fakeStorage();
    const first = make(storage);
    await first.start();
    first.set('name.full', 'Ada');
    await first.next();
    settle();

    const second = make(storage);

    expect(second.getSnapshot().current).toBe('review');
    expect(second.get('name.full')).toBe('Ada');
    expect(outcomes.at(-1)).toEqual({ restored: true });
  });

  it('starts clean and says why when nothing is stored', () => {
    make(fakeStorage());

    expect(outcomes).toEqual([{ restored: false, reason: 'persist/nothing-stored' }]);
  });

  it('does not restore the transient half of a session', async () => {
    const storage = fakeStorage();
    const first = make(storage);
    await first.start();
    first.setErrors('name', { full: 'too short' });
    settle();

    const second = make(storage);

    // Errors describe a validation that happened to data which may since have
    // been edited; a restored wizard must not open holding them.
    expect(second.getState().errors).toEqual({});
    expect(second.getState().busy).toEqual([]);
    // Idle, not init: it has a stack, so it is a wizard in progress rather than
    // one waiting to be started, and `start` will leave it where it is.
    expect(second.getState().status).toBe('idle');
  });

  it('starts clean on a corrupt value and overwrites it on the next commit', async () => {
    const storage = fakeStorage({ signup: '{not json' });

    const w = make(storage);

    expect(outcomes).toEqual([{ restored: false, reason: 'snapshot/unreadable' }]);
    await w.start();
    settle();
    expect(storage.items.get('signup')).toContain('"flow":"signup"');
  });

  it('starts clean when the stored snapshot belongs to another flow', async () => {
    const storage = fakeStorage();
    const other = createWizard({
      flow: { id: 'checkout', order: ['pay'], steps: { pay: {} } },
      plugins: [persist({ key: 'signup', storage })],
    });
    await other.start();
    settle();

    make(storage);

    expect(outcomes.at(-1)).toEqual({ restored: false, reason: 'snapshot/other-flow' });
  });

  it('starts clean when the application version moved', async () => {
    const storage = fakeStorage();
    const first = make(storage, { version: 1 });
    await first.start();
    settle();

    make(storage, { version: 2 });

    expect(outcomes.at(-1)).toEqual({ restored: false, reason: 'snapshot/other-flow' });
  });

  it('runs a migration for a snapshot written by an older format', async () => {
    const storage = fakeStorage();
    const first = make(storage);
    await first.start();
    settle();

    // Age the stored snapshot the way a released format change would.
    const stored = JSON.parse(storage.items.get('signup') ?? '{}') as {
      snapshot: Record<string, unknown>;
    };
    stored.snapshot.v = 0;
    storage.items.set('signup', JSON.stringify(stored));

    make(storage, { migrate: (s: { v: number }) => ({ ...s, v: 1 }) });

    expect(outcomes.at(-1)).toEqual({ restored: true });
  });

  it('keeps working when the browser refuses to read', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const storage = fakeStorage();
    storage.failReads = new DOMException('denied', 'SecurityError');

    const w = make(storage);

    expect(outcomes.at(-1)).toEqual({ restored: false, reason: 'persist/unavailable' });
    expect(() => w.set('name.full', 'Ada')).not.toThrow();
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it('keeps working when the quota is full, and warns once', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const storage = fakeStorage();
    const w = make(storage);
    storage.failWrites = new DOMException('full', 'QuotaExceededError');

    await w.start();
    settle();
    w.set('name.full', 'Ada');
    settle();
    w.set('name.full', 'Grace');
    settle();

    expect(w.get('name.full')).toBe('Grace');
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it('coalesces a burst of edits into one write', () => {
    const storage = fakeStorage();
    const w = make(storage);

    for (const value of ['A', 'Ad', 'Ada']) w.set('name.full', value);
    settle();

    expect(storage.writes).toBe(1);
    expect(storage.items.get('signup')).toContain('Ada');
  });

  it('writes what is pending when the wizard is destroyed', () => {
    const storage = fakeStorage();
    const w = make(storage);

    w.set('name.full', 'Ada');
    w.destroy();

    // No timer ran: closing a tab does not wait for one.
    expect(storage.items.get('signup')).toContain('Ada');
  });

  it('lets the last commit win when two tabs share a key', async () => {
    const storage = fakeStorage();
    const tabOne = make(storage);
    const tabTwo = make(storage);
    await tabOne.start();

    tabOne.set('name.full', 'Ada');
    settle();
    tabTwo.set('name.full', 'Grace');
    settle();

    expect(storage.items.get('signup')).toContain('Grace');
    // Neither tab is broken by the other; they simply disagree until reload.
    expect(tabOne.get('name.full')).toBe('Ada');
  });
});
