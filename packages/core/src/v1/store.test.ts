import { describe, expect, it, vi } from 'vitest';

import type { FlowDefinition } from './flow';
import type { WizardState } from './state';
import { createWizard } from './store';

const flow: FlowDefinition = {
  id: 'booking',
  order: ['trip', 'company', 'payment'],
  steps: {
    trip: { label: 'Trip', validate: { $ref: 'tripRules' } },
    company: { label: 'Company', when: { $eq: [{ $get: 'data.payer' }, 'business'] } },
    payment: { label: 'Payment' },
  },
  policy: 'free',
};

const registry = {
  tripRules: (_args: unknown, scope: { data: Record<string, unknown> }) =>
    scope.data.name ? null : { name: 'required' },
};

const make = (data: Record<string, unknown> = { payer: 'private', name: 'Ann' }) =>
  createWizard({ flow, registry, data });

describe('snapshots', () => {
  it('returns the identical object until something commits', () => {
    const w = make();
    expect(w.getSnapshot()).toBe(w.getSnapshot());

    const before = w.getSnapshot();
    w.set('name', 'Bo');
    expect(w.getSnapshot()).not.toBe(before);
  });

  it('carries derived values that are computed, never stored', () => {
    const w = make({ payer: 'private' });
    expect(w.getSnapshot().active).toEqual(['trip', 'payment']);
    expect(w.getState()).not.toHaveProperty('active');

    w.set('payer', 'business');
    expect(w.getSnapshot().active).toEqual(['trip', 'company', 'payment']);
  });

  it('labels breadcrumbs from the flow and statuses from the state', async () => {
    const w = make({ payer: 'private', name: 'Ann' });
    await w.next();

    expect(w.getSnapshot().breadcrumbs).toEqual([
      { id: 'trip', label: 'Trip', status: 'current' },
      { id: 'payment', label: 'Payment', status: 'upcoming' },
    ]);
  });

  it('reports progress over the reachable steps, not over all of them', async () => {
    const w = make({ payer: 'private', name: 'Ann' });
    await w.next();
    expect(w.getSnapshot().progress).toBe(0);

    await w.next();
    expect(w.getSnapshot().progress).toBe(50);
  });
});

describe('subscriptions', () => {
  it('notifies once per change', () => {
    const w = make();
    const listener = vi.fn();
    w.subscribe(listener);

    w.set('name', 'Bo');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('does not notify when a write changes nothing', () => {
    const w = make();
    const listener = vi.fn();
    w.subscribe(listener);

    w.set('name', 'Ann');
    expect(listener).not.toHaveBeenCalled();
  });

  it('notifies once for a batch, however many writes it contains', () => {
    const w = make();
    const listener = vi.fn();
    w.subscribe(listener);

    w.batch(() => {
      w.set('name', 'Bo');
      w.set('payer', 'business');
      w.set('extra', 1);
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stops notifying after unsubscribe', () => {
    const w = make();
    const listener = vi.fn();
    const off = w.subscribe(listener);
    off();

    w.set('name', 'Bo');
    expect(listener).not.toHaveBeenCalled();
  });

  it('calls a selector subscriber only when the selected value changes', () => {
    const w = make();
    const listener = vi.fn();
    w.select((s) => s.current, listener);

    w.set('name', 'Bo');
    expect(listener).not.toHaveBeenCalled();

    return w.next().then(() => {
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith('trip');
    });
  });

  it('calls a path watcher only when that path changes', () => {
    const w = make();
    const listener = vi.fn();
    w.watch('payer', listener);

    w.set('name', 'Bo');
    expect(listener).not.toHaveBeenCalled();

    w.set('payer', 'business');
    expect(listener).toHaveBeenCalledWith('business');
  });

  it('drops every listener on destroy', () => {
    const w = make();
    const listener = vi.fn();
    w.subscribe(listener);
    w.destroy();

    w.set('name', 'Bo');
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('data', () => {
  it('writes and reads nested paths immutably', () => {
    const w = make({});
    const before = w.getState().data;

    w.set('passengers.0.name', 'Ann');

    expect(w.get('passengers.0.name')).toBe('Ann');
    expect(w.getState().data).not.toBe(before);
    expect(before).toEqual({});
  });

  it('records which paths were touched', () => {
    const w = make({});
    w.set('a', 1);
    w.set('b.c', 2);
    w.set('a', 3);

    expect(w.getState().dirty).toEqual(['a', 'b.c']);
  });

  it('resets data while keeping ctx and the revision moving forward', () => {
    const w = createWizard({ flow, registry, data: { name: 'Ann' }, ctx: { role: 'admin' } });
    // Several commits first: resetting from rev 0 passes whatever the counters
    // do, which is how a reset that restarted `rev` at 1 went unnoticed.
    w.set('name', 'Cy');
    w.set('name', 'Di');
    w.set('name', 'Ed');
    const { rev, nav } = w.getState();
    expect(rev).toBeGreaterThan(1);

    w.reset({ name: 'Bo' });

    expect(w.getState().data).toEqual({ name: 'Bo' });
    expect(w.getState().ctx).toEqual({ role: 'admin' });
    // `rev` is every selector's memoization key, so a reset that replayed an
    // earlier revision could serve a snapshot cached before it.
    expect(w.getState().rev).toBeGreaterThan(rev);
    // `nav` moves forward too, so a navigation in flight when the reset lands
    // finds its token superseded rather than current again.
    expect(w.getState().nav).toBeGreaterThan(nav);
  });
});

describe('validation', () => {
  it('stores the errors a step reports and clears them once it passes', async () => {
    const w = make({ payer: 'private' });
    await w.next();

    expect(await w.validate('trip')).toBe(false);
    expect(w.getState().errors).toEqual({ trip: { name: 'required' } });
    expect(w.getSnapshot().hasErrors).toBe(true);

    w.set('name', 'Ann');
    expect(await w.validate('trip')).toBe(true);
    expect(w.getState().errors).toEqual({});
  });

  it('blocks a forward move on invalid data and names the step', async () => {
    const w = make({ payer: 'private' });
    await w.next();

    const result = await w.next();

    expect(result).toEqual({
      ok: false,
      reason: 'invalid',
      by: 'trip',
      errors: { name: 'required' },
    });
    expect(w.getSnapshot().current).toBe('trip');
  });

  it('lets errors be set and cleared directly', () => {
    const w = make();
    w.setErrors('trip', { name: 'nope' });
    expect(w.getState().errors.trip).toEqual({ name: 'nope' });

    w.setErrors('trip', null);
    expect(w.getState().errors).toEqual({});
  });
});

describe('navigation through the store', () => {
  it('walks the reachable steps and back again', async () => {
    const w = make({ payer: 'private', name: 'Ann' });

    expect((await w.next()).ok).toBe(true);
    expect(w.getSnapshot().current).toBe('trip');
    expect(w.getSnapshot().isFirst).toBe(true);

    expect((await w.next()).ok).toBe(true);
    expect(w.getSnapshot().current).toBe('payment');
    expect(w.getSnapshot().isLast).toBe(true);

    expect((await w.back()).ok).toBe(true);
    expect(w.getSnapshot().current).toBe('trip');
  });

  it('jumps directly when the policy allows it', async () => {
    const w = make({ payer: 'private', name: 'Ann' });
    await w.next();

    expect((await w.go('payment')).ok).toBe(true);
    expect(w.getSnapshot().current).toBe('payment');
  });
});

describe('patchFlow', () => {
  it('adds and replaces steps by id', async () => {
    const w = make({ payer: 'private', name: 'Ann' });
    await w.next();

    const applied = w.patchFlow({
      order: ['trip', 'extra', 'payment'],
      steps: { extra: { label: 'Extra' } },
    });

    expect(applied).toBe(true);
    expect(w.getSnapshot().active).toEqual(['trip', 'extra', 'payment']);
  });

  it('refuses a patch that would delete the step the user is standing on', async () => {
    const w = make({ payer: 'private', name: 'Ann' });
    await w.next();

    // Silently relocating the user would lose a half-filled form, and a backend
    // sending this has a bug worth surfacing.
    const applied = w.patchFlow({ steps: { trip: undefined } as never });

    expect(applied).toBe(false);
    expect(w.getSnapshot().current).toBe('trip');
  });
});

describe('start', () => {
  it('enters the first reachable step, which a fresh wizard is not on', () => {
    const w = make();
    expect(w.getSnapshot().current).toBeNull();

    return w.start().then((r) => {
      expect(r).toEqual({ ok: true, from: null, to: 'trip' });
      expect(w.getSnapshot().current).toBe('trip');
    });
  });

  it('is idempotent: a second call navigates nowhere', async () => {
    const w = make();
    await w.start();
    const rev = w.getState().rev;

    const again = await w.start();

    expect(again).toEqual({ ok: true, from: 'trip', to: 'trip' });
    expect(w.getState().rev).toBe(rev);
  });

  it('skips a step whose condition is false, like any other move', async () => {
    const w = make({ payer: 'business', name: 'Ann' });
    await w.start();
    expect(w.getSnapshot().current).toBe('trip');
  });

  it('does not validate on the way in', async () => {
    // Starting is not a step forward: an empty form must not open with errors
    // on a field nobody has touched yet.
    const w = make({});
    await w.start();

    expect(w.getSnapshot().current).toBe('trip');
    expect(w.getSnapshot().errors).toEqual({});
  });
});

describe('start under concurrency', () => {
  it('runs the pipeline once when two mounts race', async () => {
    let entered = 0;
    const w = createWizard({
      flow,
      registry,
      data: { payer: 'private', name: 'Ann' },
      plugins: [
        {
          name: 'count',
          beforeNavigate: () => {
            entered += 1;
          },
        },
      ],
    });

    const [a, b] = await Promise.all([w.start(), w.start()]);

    expect(entered).toBe(1);
    expect(a).toEqual(b);
    expect(w.getSnapshot().current).toBe('trip');
  });
});

describe('the plugin lifecycle', () => {
  const recorder = () => {
    const seen: { step: string | null; rev: number }[] = [];
    return {
      seen,
      plugin: {
        name: 'recorder',
        onCommit: (s: WizardState) => {
          seen.push({ step: s.stack[s.stack.length - 1]?.step ?? null, rev: s.rev });
        },
      },
    };
  };

  it('reports every write, not only the navigations', async () => {
    const { seen, plugin } = recorder();
    const w = createWizard({ flow, registry, data: { payer: 'private' }, plugins: [plugin] });

    await w.start();
    w.set('name', 'Ann');
    w.patch({ payer: 'business' });
    w.setCtx({ role: 'admin' });
    await w.next();

    // The direct edits are the point: before the lifecycle existed they were
    // invisible to a plugin, so nothing could persist a field as it was typed.
    //
    // Seven, not five: a navigation writes twice - once to mark itself busy,
    // once to land - and `start` and `next` are both navigations. Only the
    // landing writes carry a new `rev`, which is what a plugin should key on.
    expect(seen.length).toBe(7);
    expect(seen.map((s) => s.rev)).toEqual([0, 1, 2, 3, 4, 4, 5]);
  });

  it('hands init the state and lets it restore through one commit', () => {
    const w = createWizard({
      flow,
      registry,
      plugins: [
        {
          name: 'restore',
          init: (host) => {
            expect(host.getFlow().id).toBe(flow.id);
            host.commit({ data: { payer: 'business', name: 'Ann' } });
          },
        },
      ],
    });

    expect(w.getState().data).toEqual({ payer: 'business', name: 'Ann' });
  });

  it('does not report a restoring commit back to the plugins', () => {
    const { seen, plugin } = recorder();
    createWizard({
      flow,
      registry,
      plugins: [
        plugin,
        { name: 'restore', init: (host) => host.commit({ data: { payer: 'business' } }) },
      ],
    });

    expect(seen).toEqual([]);
  });

  it('disables a plugin that throws instead of failing the write', async () => {
    const errors: unknown[] = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args));
    const { seen, plugin } = recorder();
    let calls = 0;
    const w = createWizard({
      flow,
      registry,
      data: { payer: 'private' },
      plugins: [
        {
          name: 'broken',
          onCommit: () => {
            calls += 1;
            throw new Error('nope');
          },
        },
        plugin,
      ],
    });

    await w.start();
    w.set('name', 'Ann');

    expect(calls).toBe(1);
    expect(seen.length).toBe(3);
    expect(w.getSnapshot().data.name).toBe('Ann');
    expect(errors.length).toBe(1);
    spy.mockRestore();
  });

  it('runs what init returned when the wizard is destroyed', () => {
    let torn = 0;
    const w = createWizard({
      flow,
      registry,
      plugins: [{ name: 'cleanup', init: () => () => (torn += 1) }],
    });

    w.destroy();
    w.destroy();

    expect(torn).toBe(1);
  });
});
