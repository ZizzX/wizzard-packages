import { createWizard } from '@wizzard-packages/core/v1';
import { describe, expect, it } from 'vitest';

import { dataA, flowA, registryA } from '../../../../contract/fixtures';
import { devtools } from './plugin';

const slow = {
  ...registryA,
  slow: async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return null;
  },
};

describe('devtools()', () => {
  it('records a refused next() with its reason, after the engine start it marks as such', async () => {
    const dt = devtools();
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    await w.start();
    await w.next();

    expect(dt.outcomes.map((o) => [o.id, o.source, o.result?.ok])).toEqual([
      [1, 'start', true],
      [2, 'call', false],
    ]);
    expect(dt.outcomes[1]?.result).toEqual({
      ok: false,
      reason: 'invalid',
      by: 'details',
      errors: { email: 'required' },
    });
    expect(dt.pending).toBeNull();
  });

  it('shows the pending attempt while it is in flight and clears it by id', async () => {
    const dt = devtools();
    const flow = {
      ...flowA,
      steps: { ...flowA.steps, details: { label: 'Details', validate: { $ref: 'slow' } } },
    };
    const w = createWizard({ flow, registry: slow, data: dataA, plugins: [dt] });
    await w.start();

    const first = w.next();
    expect(dt.pending).toEqual({ id: 2, intent: { type: 'next' }, source: 'call' });
    const second = w.next();
    expect(dt.pending?.id).toBe(3);
    await Promise.all([first, second]);

    expect(dt.pending).toBeNull();
    expect(dt.outcomes.map((o) => [o.id, o.result?.ok])).toEqual([
      [1, true],
      [2, false],
      [3, true],
    ]);
  });

  it('stores a thrown error as data, never the Error itself', async () => {
    const dt = devtools();
    const flow = {
      ...flowA,
      steps: { ...flowA.steps, details: { label: 'Details', validate: { $ref: 'boom' } } },
    };
    const registry = {
      boom: () => {
        throw new TypeError('resolver exploded');
      },
    };
    const w = createWizard({ flow, registry, data: dataA, plugins: [dt] });
    await w.start();
    await expect(w.next()).rejects.toThrow('resolver exploded');

    const last = dt.outcomes[dt.outcomes.length - 1];
    expect(last?.error).toMatchObject({ name: 'TypeError', message: 'resolver exploded' });
    expect(JSON.parse(JSON.stringify(last)).error.message).toBe('resolver exploded');
  });

  it('keeps at most `outcomes` ended attempts, oldest dropped', async () => {
    const dt = devtools({ outcomes: 3 });
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    await w.start();
    for (let i = 0; i < 5; i++) await w.next();

    expect(dt.outcomes.map((o) => o.id)).toEqual([4, 5, 6]);
  });

  it('is attached between init and destroy, notifies on both, and tracks the last commit', () => {
    const dt = devtools();
    let notified = 0;
    dt.subscribe(() => {
      notified += 1;
    });
    expect(dt.attached).toBe(false);

    const w = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    expect(dt.attached).toBe(true);
    expect(notified).toBe(1);

    w.set('email', 'a@b');
    expect(dt.lastRev).toBe(w.getState().rev);

    w.destroy();
    expect(dt.attached).toBe(false);
    expect(notified).toBe(2);
  });

  it('follows the newest wizard when init runs again and starts its rings over', async () => {
    const dt = devtools();
    const first = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    await first.start();
    await first.next();
    expect(dt.outcomes).toHaveLength(2);

    first.destroy();
    const second = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    expect(dt.outcomes).toHaveLength(0);
    expect(dt.attached).toBe(true);
    await second.start();
    expect(dt.outcomes.map((o) => o.id)).toEqual([1]);
  });

  it('lags behind the wizard when it is not the installed instance', () => {
    const installed = devtools();
    const other = devtools();
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [installed] });
    w.set('email', 'a@b');

    expect(installed.lastRev).toBe(w.getState().rev);
    expect(other.attached).toBe(false);
    expect(other.lastRev).toBeLessThan(w.getState().rev);
  });

  it('survives a throwing subscriber: the failure is recorded, the engine never disables it', async () => {
    const dt = devtools();
    dt.subscribe(() => {
      throw new Error('panel bug');
    });
    const w = createWizard({ flow: flowA, registry: registryA, data: dataA, plugins: [dt] });
    await w.start();
    await w.next();

    expect(dt.failure).toMatchObject({ message: 'panel bug' });
    expect(dt.outcomes).toHaveLength(2);
    expect(dt.attached).toBe(true);
  });
});
