import { beforeEach, describe, expect, it, vi } from 'vitest';

import { END, type FlowDefinition } from './flow';
import { pageFor } from './diagnostic';
import { runNav, type Hooks, type NavContext, type NavHost } from './navigate';
import { createSelector } from './select';
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
      code: 'nav-invalid',
      url: pageFor('nav-invalid'),
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

    expect(result).toEqual({
      ok: false,
      reason: 'blocked',
      code: 'nav-blocked',
      url: pageFor('nav-blocked'),
      by: 'trip',
    });
    expect(host.read().stack[0]?.step).toBe('trip');
  });

  // The exit guard runs before the target is resolved, so it guards the way
  // out of a step rather than the way forward. 0.x passed its guards a
  // direction and let them wave `back` through; this does not.
  it('refuses back() too, from the step being left', async () => {
    const guarded: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, payment: { guards: { exit: false } } },
    };
    const host = makeHost({ ...on('payment'), visited: ['trip', 'payment'] });

    const result = await runNav({ flow: guarded }, host, { type: 'back' });

    expect(result).toEqual({
      ok: false,
      reason: 'blocked',
      code: 'nav-blocked',
      url: pageFor('nav-blocked'),
      by: 'payment',
    });
    expect(host.read().stack[0]?.step).toBe('payment');
  });

  it('names the step whose enter guard refused', async () => {
    const guarded: FlowDefinition = {
      ...flow,
      steps: { ...flow.steps, payment: { guards: { enter: false } } },
    };
    const host = makeHost(on('trip'));

    const result = await runNav({ flow: guarded }, host, { type: 'next' });

    expect(result).toEqual({
      ok: false,
      reason: 'blocked',
      code: 'nav-blocked',
      url: pageFor('nav-blocked'),
      by: 'payment',
    });
  });

  it('reports not-reachable rather than moving somewhere invisible', async () => {
    const host = makeHost(on('trip'));
    const result = await runNav(base, host, { type: 'go', to: 'company', force: true });

    expect(result).toEqual({
      ok: false,
      reason: 'not-reachable',
      code: 'nav-not-reachable',
      url: pageFor('nav-not-reachable'),
      by: 'company',
    });
  });

  // `order` is the walk next() and back() take, not the list of steps that
  // exist: a step left out of it is a branch, entered by name.
  describe('a step outside order', () => {
    const branched: FlowDefinition = {
      id: 'booking',
      order: ['trip', 'payment'],
      steps: {
        trip: { on: { next: 'company' } },
        payment: {},
        company: {},
        closed: { when: false },
      },
    };
    const ctx: NavContext = { flow: branched };

    it('is entered by the on.next that names it', async () => {
      const host = makeHost(on('trip'));
      expect(await runNav(ctx, host, { type: 'next' })).toEqual({
        ok: true,
        from: 'trip',
        to: 'company',
      });
    });

    it('is entered by go()', async () => {
      const host = makeHost(on('trip'));
      expect(await runNav(ctx, host, { type: 'go', to: 'company', force: true })).toEqual({
        ok: true,
        from: 'trip',
        to: 'company',
      });
    });

    // Without `force`, a jump still answers to the policy: `free` lets it in,
    // and `sequential` has no place for a branch the wizard has not taken yet.
    it('is entered by an unforced go() the policy allows, and only then', async () => {
      const free: NavContext = { flow: { ...branched, policy: 'free' } };
      expect(await runNav(free, makeHost(on('trip')), { type: 'go', to: 'company' })).toEqual({
        ok: true,
        from: 'trip',
        to: 'company',
      });
      const sequential: NavContext = { flow: { ...branched, policy: 'sequential' } };
      expect(
        await runNav(sequential, makeHost(on('trip')), { type: 'go', to: 'company' })
      ).toMatchObject({ ok: false, reason: 'blocked', by: 'company' });
    });

    // It has no neighbours in `order`, so leaving it is its own transitions' job.
    it('finishes on next() and has nowhere to go back to, without transitions', async () => {
      expect(await runNav(ctx, makeHost(on('company')), { type: 'next' })).toMatchObject({
        ok: true,
        to: END,
      });
      expect(await runNav(ctx, makeHost(on('company')), { type: 'back' })).toMatchObject({
        ok: false,
        reason: 'no-target',
      });
    });

    // Selectors place it where the path put it, after the step it was entered
    // from, rather than reading -1, 0% and no breadcrumb.
    describe('in the derived values', () => {
      const long: FlowDefinition = {
        id: 'booking',
        order: ['trip', 'payment'],
        steps: {
          trip: { on: { next: 'company' } },
          company: { on: { next: 'vat', back: 'trip' } },
          vat: { on: { next: 'payment' } },
          payment: {},
        },
      };
      const walk = async (moves: number) => {
        const host = makeHost(on('trip'));
        for (let i = 0; i < moves; i++) await runNav({ flow: long }, host, { type: 'next' });
        return host;
      };
      const derived = (host: TestHost) => createSelector(() => long)(host.read());

      it('counts the branch it stands on after the step that led to it', async () => {
        const d = derived(await walk(1));
        expect(d.active).toEqual(['trip', 'company', 'payment']);
        expect(d).toMatchObject({ index: 1, progress: 33, isFirst: false, isLast: false });
        expect(d.breadcrumbs.map((b) => [b.id, b.status])).toEqual([
          ['trip', 'completed'],
          ['company', 'current'],
          ['payment', 'upcoming'],
        ]);
      });

      it('keeps every step of the branch taken, in the order it was taken', async () => {
        expect(derived(await walk(2)).active).toEqual(['trip', 'company', 'vat', 'payment']);
        expect(derived(await walk(3))).toMatchObject({
          active: ['trip', 'company', 'vat', 'payment'],
          index: 3,
          isLast: true,
        });
      });

      // isLast answers whether next() finishes, not where the step sits: a
      // branch with no on.next ends the wizard with steps of order still drawn.
      it('reads isLast on a branch whose next() finishes', async () => {
        const open: FlowDefinition = {
          ...long,
          steps: { ...long.steps, company: { on: { back: 'trip' } } },
        };
        const host = makeHost(on('trip'));
        await runNav({ flow: open }, host, { type: 'next' });
        expect(createSelector(() => open)(host.read())).toMatchObject({
          active: ['trip', 'company', 'payment'],
          index: 1,
          isLast: true,
        });
        expect(await runNav({ flow: open }, host, { type: 'next' })).toMatchObject({
          ok: true,
          to: END,
        });
      });

      it('reads isLast on a step of order sent to @end', () => {
        const ending: FlowDefinition = {
          ...long,
          steps: { ...long.steps, trip: { on: { next: END } } },
        };
        expect(createSelector(() => ending)({ ...initialState(), ...on('trip') })).toMatchObject({
          index: 0,
          isLast: true,
        });
      });

      it('drops a branch backed out of', async () => {
        const host = await walk(1);
        await runNav({ flow: long }, host, { type: 'back' });
        expect(derived(host)).toMatchObject({ active: ['trip', 'payment'], index: 0 });
      });

      // go() is a forward move and grows history; coming back to a step erases
      // the loop, so the branch it passed no longer claims a place ahead.
      it('forgets a branch left by go() back to a step before it', async () => {
        const host = await walk(3);
        await runNav({ flow: { ...long, policy: 'free' } }, host, { type: 'go', to: 'trip' });
        expect(derived(host)).toMatchObject({ active: ['trip', 'payment'], index: 0 });
      });

      // The policy counts neighbours on the same list the breadcrumbs draw.
      it('gives sequential the same neighbours the breadcrumbs show', async () => {
        const sequential: NavContext = { flow: { ...long, policy: 'sequential' } };
        expect(
          await runNav(sequential, await walk(1), { type: 'go', to: 'payment' })
        ).toMatchObject({ ok: true, to: 'payment' });
        expect(await runNav(sequential, await walk(1), { type: 'go', to: 'vat' })).toMatchObject({
          ok: false,
          reason: 'blocked',
        });
      });

      // A record of another flow at the same depth - a sub-flow step, with the
      // item since removed - is not this flow's path, whatever its step is named.
      it('reads only history of the flow it derives', () => {
        const named: FlowDefinition = { ...long, steps: { ...long.steps, extra: {} } };
        const state: WizardState = {
          ...initialState(),
          ...on('trip'),
          history: [[{ flow: 'passenger', step: 'extra' }]],
        };
        expect(createSelector(() => named)(state).active).toEqual(['trip', 'payment']);
      });

      // As for a step of `order`: -1 is how a binding sees the route closed under it.
      it('leaves out a branch whose when closed while it is stood on', async () => {
        const host = await walk(1);
        const closing: FlowDefinition = {
          ...long,
          steps: { ...long.steps, company: { ...long.steps.company, when: { $get: 'data.open' } } },
        };
        const state = { ...host.read(), data: { open: false } };
        expect(createSelector(() => closing)(state)).toMatchObject({
          active: ['trip', 'payment'],
          index: -1,
        });
      });
    });

    it('is still refused while its when is false', async () => {
      const host = makeHost(on('trip'));
      expect(await runNav(ctx, host, { type: 'go', to: 'closed', force: true })).toMatchObject({
        ok: false,
        reason: 'not-reachable',
        by: 'closed',
      });
    });
  });

  it('refuses a next() whose on.next names only closed steps, and stays put', async () => {
    const closed: FlowDefinition = {
      id: 'booking',
      order: ['trip', 'company', 'payment'],
      steps: { trip: { on: { next: 'company' } }, company: { when: false }, payment: {} },
    };
    const host = makeHost(on('trip'));

    expect(await runNav({ flow: closed }, host, { type: 'next' })).toEqual({
      ok: false,
      reason: 'not-reachable',
      code: 'nav-not-reachable',
      url: pageFor('nav-not-reachable'),
      by: 'company',
    });
    expect(host.read().stack[0]?.step).toBe('trip');
    expect(host.read().status).toBe('idle');
  });

  it('refuses a next() whose on.next has no transition that applies, and stays put', async () => {
    const guarded: FlowDefinition = {
      id: 'booking',
      order: ['trip', 'payment'],
      steps: {
        trip: { on: { next: [{ to: 'payment', when: { $eq: [{ $get: 'data.payer' }, 'x'] } }] } },
        payment: {},
      },
    };
    const host = makeHost(on('trip'));

    expect(await runNav({ flow: guarded }, host, { type: 'next' })).toEqual({
      ok: false,
      reason: 'no-target',
      code: 'nav-no-target',
      url: pageFor('nav-no-target'),
    });
    expect(host.read().stack[0]?.step).toBe('trip');
    expect(host.read().status).toBe('idle');
  });

  it('reports no-target for a step that is not in the flow', async () => {
    const host = makeHost(on('trip'));
    const result = await runNav(base, host, { type: 'go', to: 'ghost' });

    expect(result).toEqual({
      ok: false,
      reason: 'no-target',
      code: 'nav-no-target',
      url: pageFor('nav-no-target'),
    });
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
      code: 'nav-blocked',
      url: pageFor('nav-blocked'),
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

    expect(result).toEqual({
      ok: false,
      reason: 'blocked',
      code: 'nav-blocked',
      url: pageFor('nav-blocked'),
      by: 'paywall',
    });
  });

  it('lets a plugin name a different blocker', async () => {
    const host = makeHost(on('trip'));
    const hooks: Hooks[] = [{ name: 'p', beforeNavigate: () => ({ block: 'quota' }) }];

    expect(await runNav({ flow, hooks }, host, { type: 'next' })).toEqual({
      ok: false,
      reason: 'blocked',
      code: 'nav-blocked',
      url: pageFor('nav-blocked'),
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

  it('finishes the flow when a plugin throws in afterNavigate on the exit', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const host = makeHost(on('trip'));
    const last: FlowDefinition = { id: 'last', order: ['trip'], steps: { trip: {} } };
    const hooks: Hooks[] = [
      {
        name: 'analytics',
        afterNavigate: () => {
          throw new Error('boom');
        },
      },
    ];

    const result = await runNav({ flow: last, hooks }, host, { type: 'next' });

    expect(result).toEqual({ ok: true, from: 'trip', to: END });
    expect(host.read().status).toBe('done');
    expect(String(spy.mock.calls[0]?.[0])).toContain('/errors/after-navigate-threw');
    spy.mockRestore();
  });

  it('reports an async afterNavigate that rejects instead of leaving it unhandled', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const host = makeHost(on('trip'));
    const hooks = [
      { name: 'analytics', afterNavigate: () => Promise.reject(new Error('boom')) },
    ] as unknown as Hooks[];

    const result = await runNav({ flow, hooks }, host, { type: 'next' });
    await Promise.resolve();

    expect(result.ok).toBe(true);
    expect(String(spy.mock.calls[0]?.[0])).toContain('/errors/after-navigate-threw');
    spy.mockRestore();
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
    expect(spy).toHaveBeenCalledOnce();
    const [message, cause] = spy.mock.calls[0] ?? [];
    expect(message).toMatch(/^\[wizzard\] plugin "analytics" threw in afterNavigate\. .+\. .+\. /);
    expect(message).toContain(
      'https://zizzx.github.io/wizzard-packages/errors/after-navigate-threw'
    );
    expect(cause).toBeInstanceOf(Error);
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
    expect(await first).toEqual({
      ok: false,
      reason: 'superseded',
      code: 'nav-superseded',
      url: pageFor('nav-superseded'),
    });
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
    expect(await first).toEqual({
      ok: false,
      reason: 'superseded',
      code: 'nav-superseded',
      url: pageFor('nav-superseded'),
    });
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

    expect(await running).toEqual({
      ok: false,
      reason: 'aborted',
      code: 'nav-aborted',
      url: pageFor('nav-aborted'),
    });
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

// wizzard-17: history grew on a backward move too, so `canBack` stayed true at
// the first step while `back()` answered `no-target`.
describe('runNav — the back stack', () => {
  const flat: FlowDefinition = {
    id: 'booking',
    order: ['trip', 'payment'],
    steps: { trip: {}, payment: {} },
  };
  const ctx: NavContext = { flow: flat };

  it('pushes going forward and pops going back, ending empty', async () => {
    const host = makeHost(on('trip'));
    await runNav(ctx, host, { type: 'next' });
    expect(host.read().history).toHaveLength(1);

    await runNav(ctx, host, { type: 'back' });
    expect(host.read().history).toEqual([]);
    expect(host.read().stack).toEqual([{ flow: 'booking', step: 'trip' }]);
  });

  it('grows again after a back, rather than staying popped', async () => {
    const host = makeHost(on('trip'));
    await runNav(ctx, host, { type: 'next' });
    await runNav(ctx, host, { type: 'back' });
    await runNav(ctx, host, { type: 'next' });

    expect(host.read().history).toEqual([[{ flow: 'booking', step: 'trip' }]]);
  });

  it('refuses a back at the first step, with nothing left to pop', async () => {
    const host = makeHost(on('trip'));
    await runNav(ctx, host, { type: 'next' });
    await runNav(ctx, host, { type: 'back' });

    expect(await runNav(ctx, host, { type: 'back' })).toMatchObject({
      reason: 'no-target',
      code: 'nav-no-target',
      url: pageFor('nav-no-target'),
    });
    expect(host.read().history).toEqual([]);
  });

  // `back()` walks `order`, so it can jump over a record. Popping one record
  // then leaves a stale one behind, and `canBack` goes on offering it.
  it('drops the records of steps that stopped being reachable', async () => {
    const branchy: FlowDefinition = {
      id: 'booking',
      order: ['a', 'b', 'c'],
      steps: { a: {}, b: { when: { $get: 'data.viaB' } }, c: {} },
    };
    const ctxB: NavContext = { flow: branchy };
    const host = makeHost({ ...on('a'), data: { viaB: true } });

    await runNav(ctxB, host, { type: 'next' });
    await runNav(ctxB, host, { type: 'next' });
    expect(host.read().stack).toEqual([{ flow: 'booking', step: 'c' }]);
    expect(host.read().history).toHaveLength(2);

    host.write({ ...host.read(), data: { viaB: false } });
    await runNav(ctxB, host, { type: 'back' });

    expect(host.read().stack).toEqual([{ flow: 'booking', step: 'a' }]);
    expect(host.read().history).toEqual([]);
    expect(createSelector(() => branchy)(host.read()).canBack).toBe(false);
  });

  it('leaves history alone when there was nowhere to come from', async () => {
    const host = makeHost();
    await runNav(ctx, host, { type: 'next' });
    expect(host.read().history).toEqual([]);
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
