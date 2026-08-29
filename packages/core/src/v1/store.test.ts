import { describe, expect, it, vi } from 'vitest';

import type { FlowDefinition } from './flow';
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
    const rev = w.getState().rev;

    w.reset({ name: 'Bo' });

    expect(w.getState().data).toEqual({ name: 'Bo' });
    expect(w.getState().ctx).toEqual({ role: 'admin' });
    expect(w.getState().rev).toBeGreaterThan(rev);
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
