import { beforeEach, describe, expect, it, vi } from 'vitest';

import { END, type FlowDefinition } from './flow';
import { runNav, type Hooks, type NavContext, type NavHost } from './navigate';
import { initialState, type WizardState } from './state';

const flow: FlowDefinition = {
  id: 'booking',
  order: ['trip', 'company', 'payment'],
  steps: {
    trip: {},
    company: { when: { $eq: [{ $get: 'data.payer' }, 'business'] } },
    payment: {},
  },
};

interface TestHost extends NavHost {
  writes: WizardState[];
}

function makeHost(over: Partial<WizardState> = {}): TestHost {
  let state: WizardState = { ...initialState({ payer: 'private' }), ...over };
  const writes: WizardState[] = [];
  return {
    read: () => state,
    write: (next) => {
      state = next;
      writes.push(next);
    },
    writes,
  };
}

const on = (step: string): Partial<WizardState> => ({
  stack: [{ flow: 'booking', step }],
  status: 'idle',
});

/** A promise whose resolution the test controls. */
function deferred<T>(): { promise: Promise<T>; resolve: (v: T) => void } {
  let resolve!: (v: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

const base: NavContext = { flow };

describe('runNav — moving forward', () => {
  it('enters the first step when the stack is empty', async () => {
    const host = makeHost();
    const result = await runNav(base, host, { type: 'next' });

    expect(result).toEqual({ ok: true, from: null, to: 'trip' });
    expect(host.read().stack).toEqual([{ flow: 'booking', step: 'trip' }]);
    expect(host.read().visited).toEqual(['trip']);
    expect(host.read().status).toBe('idle');
  });

  it('skips a step whose `when` is false', async () => {
    const host = makeHost(on('trip'));
    await runNav(base, host, { type: 'next' });
    expect(host.read().stack[0]?.step).toBe('payment');
  });

  it('marks the step it left as completed, and records history', async () => {
    const host = makeHost(on('trip'));
    await runNav(base, host, { type: 'next' });

    expect(host.read().completed).toEqual(['trip']);
    expect(host.read().history).toEqual([[{ flow: 'booking', step: 'trip' }]]);
  });

  it('reports the end of the flow instead of pretending to move', async () => {
    const host = makeHost(on('payment'));
    const result = await runNav(base, host, { type: 'next' });

    expect(result).toEqual({ ok: true, from: 'payment', to: END });
    expect(host.read().status).toBe('done');
  });
});

describe('runNav — refusals carry a reason', () => {
  it('reports invalid, commits the errors, and does not move', async () => {
    const host = makeHost(on('trip'));
    const ctx: NavContext = {
      flow,
      validate: () => Promise.resolve({ email: 'required' }),
    };

    const result = await runNav(ctx, host, { type: 'next' });

    expect(result).toEqual({
      ok: false,
      reason: 'invalid',
      by: 'trip',
      errors: { email: 'required' },
    });
    expect(host.read().errors).toEqual({ trip: { email: 'required' } });
    expect(host.read().stack[0]?.step).toBe('trip');
    expect(host.read().status).toBe('idle');
  });

  it('does not validate on the way back', async () => {
    const validate = vi.fn(() => Promise.resolve({ email: 'required' }));
    const host = makeHost(on('payment'));

    const result = await runNav({ flow, validate }, host, { type: 'back' });

    expect(validate).not.toHaveBeenCalled();
    expect(result).toEqual({ ok: true, from: 'payment', to: 'trip' });
  });

  it('honours `validate: false`', async () => {
    const validate = vi.fn(() => Promise.resolve({ email: 'required' }));
    const host = makeHost(on('trip'));

    const result = await runNav({ flow, validate }, host, { type: 'next' }, { validate: false });

    expect(validate).not.toHaveBeenCalled();
    expect(result.ok).toBe(true);
  });

  it('names the step whose exit guard refused', async () => {
    const guarded: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, trip: { guards: { exit: false } } },
    };
    const host = makeHost(on('trip'));

    const result = await runNav({ flow: guarded }, host, { type: 'next' });

    expect(result).toEqual({ ok: false, reason: 'blocked', by: 'trip' });
    expect(host.read().stack[0]?.step).toBe('trip');
  });

  it('names the step whose enter guard refused', async () => {
    const guarded: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, payment: { guards: { enter: false } } },
    };
    const host = makeHost(on('trip'));

    const result = await runNav({ flow: guarded }, host, { type: 'next' });

    expect(result).toEqual({ ok: false, reason: 'blocked', by: 'payment' });
  });

  it('reports not-reachable rather than moving somewhere invisible', async () => {
    const host = makeHost(on('trip'));
    const result = await runNav(base, host, { type: 'go', to: 'company', force: true });

    expect(result).toEqual({ ok: false, reason: 'not-reachable', by: 'company' });
  });

  it('reports no-target for a step that is not in the flow', async () => {
    const host = makeHost(on('trip'));
    const result = await runNav(base, host, { type: 'go', to: 'ghost' });

    expect(result).toEqual({ ok: false, reason: 'no-target' });
  });

  it('applies the navigation policy to a jump, and `force` overrides it', async () => {
    const sequential: FlowDefinition = { ...flow, policy: 'sequential' };
    const host = makeHost(on('trip'));

    expect(await runNav({ flow: sequential }, host, { type: 'go', to: 'payment' })).toEqual({
      ok: true,
      from: 'trip',
      to: 'payment',
    });

    const far = makeHost({ ...on('trip'), data: { payer: 'business' } });
    expect(await runNav({ flow: sequential }, far, { type: 'go', to: 'payment' })).toEqual({
      ok: false,
      reason: 'blocked',
      by: 'payment',
    });
    expect(
      await runNav({ flow: sequential }, far, { type: 'go', to: 'payment', force: true })
    ).toEqual({ ok: true, from: 'trip', to: 'payment' });
  });
});

describe('runNav — plugins', () => {
  it('lets a plugin veto with a plain false, and names the plugin', async () => {
    const host = makeHost(on('trip'));
    const hooks: Hooks[] = [{ name: 'paywall', beforeNavigate: () => false }];

    const result = await runNav({ flow, hooks }, host, { type: 'next' });

    expect(result).toEqual({ ok: false, reason: 'blocked', by: 'paywall' });
  });

  it('lets a plugin name a different blocker', async () => {
    const host = makeHost(on('trip'));
    const hooks: Hooks[] = [{ name: 'p', beforeNavigate: () => ({ block: 'quota' }) }];

    expect(await runNav({ flow, hooks }, host, { type: 'next' })).toEqual({
      ok: false,
      reason: 'blocked',
      by: 'quota',
    });
  });

  it('lets a plugin redirect', async () => {
    const host = makeHost(on('trip'));
    const hooks: Hooks[] = [{ name: 'p', beforeNavigate: () => ({ redirect: 'payment' }) }];

    expect(await runNav({ flow, hooks }, host, { type: 'next' })).toEqual({
      ok: true,
      from: 'trip',
      to: 'payment',
    });
  });

  it('runs plugins in registration order and stops at the first veto', async () => {
    const order: string[] = [];
    const hooks: Hooks[] = [
      {
        name: 'a',
        beforeNavigate: () => {
          order.push('a');
        },
      },
      {
        name: 'b',
        beforeNavigate: () => {
          order.push('b');
          return false;
        },
      },
      {
        name: 'c',
        beforeNavigate: () => {
          order.push('c');
        },
      },
    ];

    await runNav({ flow, hooks }, makeHost(on('trip')), { type: 'next' });
    expect(order).toEqual(['a', 'b']);
  });

  it('survives a plugin that throws in afterNavigate', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const host = makeHost(on('trip'));
    const hooks: Hooks[] = [
      {
        name: 'analytics',
        afterNavigate: () => {
          throw new Error('boom');
        },
      },
    ];

    // One broken analytics plugin must not break a checkout.
    const result = await runNav({ flow, hooks }, host, { type: 'next' });

    expect(result.ok).toBe(true);
    expect(host.read().stack[0]?.step).toBe('payment');
    spy.mockRestore();
  });
});

describe('runNav — races', () => {
  let host: TestHost;

  beforeEach(() => {
    host = makeHost(on('trip'));
  });

  it('supersedes a navigation that lost the race, leaving no partial write', async () => {
    const gate = deferred<Record<string, string> | null>();
    const ctx: NavContext = { flow, validate: () => gate.promise };

    const first = runNav(ctx, host, { type: 'next' });
    // A second navigation starts while the first is still inside validate.
    const second = await runNav(base, host, { type: 'go', to: 'payment', force: true });
    expect(second).toEqual({ ok: true, from: 'trip', to: 'payment' });

    // The first one now finds errors — which must not reach the state.
    gate.resolve({ email: 'required' });
    expect(await first).toEqual({ ok: false, reason: 'superseded' });
    expect(host.read().errors).toEqual({});
    expect(host.read().stack[0]?.step).toBe('payment');
  });

  it('does not release the lock a newer navigation is holding', async () => {
    const gate = deferred<boolean>();
    const guarded: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, trip: { guards: { exit: { $ref: 'slow' } } } },
    };
    const ctx: NavContext = {
      flow: guarded,
      registry: { slow: () => gate.promise },
    };

    const first = runNav(ctx, host, { type: 'next' });
    const secondToken = host.read().nav;
    await runNav(base, host, { type: 'go', to: 'payment', force: true });

    gate.resolve(false);
    expect(await first).toEqual({ ok: false, reason: 'superseded' });
    // The status belongs to the winner, not to the loser that finished later.
    expect(host.read().status).toBe('idle');
    expect(host.read().nav).toBeGreaterThan(secondToken);
  });

  it('stops on an aborted signal instead of committing', async () => {
    const controller = new AbortController();
    const gate = deferred<void>();
    const deferredFlow: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, payment: { deferred: true } },
    };
    const hooks: Hooks[] = [
      {
        name: 'server',
        loadStep: async () => {
          await gate.promise;
          return undefined;
        },
      },
    ];

    const running = runNav({ flow: deferredFlow, hooks, signal: controller.signal }, host, {
      type: 'next',
    });
    controller.abort();
    gate.resolve();

    expect(await running).toEqual({ ok: false, reason: 'aborted' });
    expect(host.read().stack[0]?.step).toBe('trip');
    expect(host.read().status).toBe('idle');
  });

  it('flags the step busy while it loads, and clears it afterwards', async () => {
    const gate = deferred<void>();
    let busyDuringLoad: readonly string[] = [];
    const deferredFlow: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, payment: { deferred: true } },
    };
    const hooks: Hooks[] = [
      {
        name: 'server',
        loadStep: async () => {
          // Sampled here because this is the only moment the flag is meant to be set.
          busyDuringLoad = host.read().busy;
          await gate.promise;
          return undefined;
        },
      },
    ];

    const running = runNav({ flow: deferredFlow, hooks }, host, { type: 'next' });
    gate.resolve();
    await running;

    expect(busyDuringLoad).toEqual(['payment']);
    expect(host.read().busy).toEqual([]);
  });
});

describe('runNav — bookkeeping', () => {
  it('bumps rev on every write so memoized selectors invalidate', async () => {
    const host = makeHost(on('trip'));
    const before = host.read().rev;
    await runNav(base, host, { type: 'next' });
    expect(host.read().rev).toBeGreaterThan(before);
  });

  it('writes exactly twice on a clean navigation: the lock, then the commit', async () => {
    const host = makeHost(on('trip'));
    await runNav(base, host, { type: 'next' });

    expect(host.writes).toHaveLength(2);
    expect(host.writes[0]?.status).toBe('busy');
    expect(host.writes[1]?.status).toBe('idle');
  });
});

describe('runNav — clearOnLeave', () => {
  const branching: FlowDefinition = {
    id: 'booking',
    order: ['trip', 'company', 'payment'],
    steps: {
      trip: {},
      company: { clearOnLeave: true },
      payment: {},
    },
  };
  const filled = {
    payer: 'business',
    trip: { city: 'Oslo' },
    company: { name: 'Acme', vat: 'NO123' },
  };

  it('keeps the data of a step it leaves, by default', async () => {
    const host = makeHost({ ...on('trip'), data: filled });
    await runNav({ flow: branching }, host, { type: 'next' });
    expect(host.read().data).toBe(filled);
  });

  it('clears the whole slice on `true`, forwards and backwards', async () => {
    const host = makeHost({ ...on('company'), data: filled });
    await runNav({ flow: branching }, host, { type: 'next' });
    expect(host.read().data).toEqual({ payer: 'business', trip: { city: 'Oslo' } });

    const back = makeHost({
      ...on('company'),
      data: filled,
      history: [[{ flow: 'booking', step: 'trip' }]],
    });
    await runNav({ flow: branching }, back, { type: 'back' });
    expect(back.read().stack[0]?.step).toBe('trip');
    expect(back.read().data).toEqual({ payer: 'business', trip: { city: 'Oslo' } });
  });

  it('clears the declared `slice`, not the step id', async () => {
    const flow: FlowDefinition = {
      ...branching,
      steps: { ...branching.steps, company: { slice: 'org', clearOnLeave: true } },
    };
    const host = makeHost({ ...on('company'), data: { ...filled, org: { name: 'Acme' } } });
    await runNav({ flow }, host, { type: 'next' });
    expect(host.read().data).toEqual(filled);
  });

  it('clears only the listed paths on an array, and leaves the rest of the slice', async () => {
    const flow: FlowDefinition = {
      ...branching,
      steps: {
        ...branching.steps,
        company: { clearOnLeave: ['company.vat', 'payer', 'nowhere.x'] },
      },
    };
    const host = makeHost({ ...on('company'), data: filled });
    await runNav({ flow }, host, { type: 'next' });
    expect(host.read().data).toEqual({ trip: { city: 'Oslo' }, company: { name: 'Acme' } });
    // Untouched branches keep their identity, so selectors over them stay memoized.
    expect(host.read().data['trip']).toBe(filled.trip);
  });

  it('keeps everything on completion: the data is what the host submits', async () => {
    const flow: FlowDefinition = {
      ...branching,
      steps: { ...branching.steps, payment: { clearOnLeave: true } },
    };
    const host = makeHost({ ...on('payment'), data: { ...filled, payment: { card: '4242' } } });
    const result = await runNav({ flow }, host, { type: 'next' });
    expect(result).toEqual({ ok: true, from: 'payment', to: END });
    expect(host.read().data['payment']).toEqual({ card: '4242' });
  });

  it('does not clear when the navigation fails', async () => {
    const host = makeHost({ ...on('company'), data: filled });
    const result = await runNav(
      { flow: branching, validate: async () => ({ name: 'required' }) },
      host,
      { type: 'next' }
    );
    expect(result.ok).toBe(false);
    expect(host.read().data).toBe(filled);
  });
});
