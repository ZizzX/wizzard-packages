import { describe, expect, it, vi } from 'vitest';

import { groups, here, itemsOf, step, walk } from './groups';
import { checkSession } from './session';
import { createWizard } from './store';
import { initialState } from './state';

import type { AsyncRegistry } from './expr';
import type { FlowDefinition } from './flow';
import type { SubFlows } from './navigate';
import type { Frame, WizardState } from './state';

/**
 * One test per invariant of `docs/designs/group-traversal.md`, section 7.
 *
 * Most of them are driven through `createWizard`, because the invariant is
 * about what somebody standing in a wizard sees. The ones about a stack that
 * the engine would never build - a restored snapshot, a frame naming an item
 * that is already gone - go through the pure functions, which is the only way
 * to hand the traversal a state nothing produced.
 */

/** One passenger's sub-flow: two steps, both reading the item they belong to. */
const passenger: FlowDefinition = {
  id: 'passenger',
  order: ['seat', 'meal'],
  steps: {
    seat: { label: 'Seat' },
    meal: { label: 'Meal' },
  },
};

const booking = (over: unknown = { $get: 'data.passengers' }): FlowDefinition => ({
  id: 'booking',
  order: ['who', 'each', 'review'],
  steps: {
    who: {},
    each: { flow: passenger, repeat: { over: over as never, keyBy: 'id' } },
    review: {},
  },
});

const passengers = [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }];

const build = (
  flow: FlowDefinition,
  data: Record<string, unknown> = { passengers },
  extra: { subFlows?: SubFlows; registry?: AsyncRegistry } = {}
): ReturnType<typeof createWizard> => createWizard({ flow, groups, data, ...extra });

const at = (w: { getState: () => WizardState }): readonly Frame[] => w.getState().stack;
const keyOf = (w: { getState: () => WizardState }): string | undefined =>
  w.getState().stack[0]?.key;
const stepOf = (w: { getState: () => WizardState }): string | undefined => {
  const stack = w.getState().stack;
  return stack[stack.length - 1]?.step;
};

/** Walks into the group and stops on the first step of the first item. */
async function enterGroup(
  flow: FlowDefinition = booking(),
  data: Record<string, unknown> = { passengers }
): Promise<ReturnType<typeof createWizard>> {
  const wizard = build(flow, data);
  await wizard.start();
  await wizard.next();
  return wizard;
}

describe('4.1 stable item identity', () => {
  it('keeps `key` fixed and moves `loop.index` before any navigation', async () => {
    const wizard = await enterGroup();
    await wizard.next();
    await wizard.next(); // p1 done, now on p2/seat

    expect(keyOf(wizard)).toBe('p2');
    const before = here(wizard.getFlow(), wizard.getState());
    expect(before.scope.loop).toEqual({ index: 1, item: { id: 'p2' }, key: 'p2' });

    // A reorder through `set`, with no navigation of any kind.
    wizard.set('passengers', [{ id: 'p2' }, { id: 'p1' }, { id: 'p3' }]);

    expect(keyOf(wizard)).toBe('p2');
    const after = here(wizard.getFlow(), wizard.getState());
    expect(after.scope.loop).toEqual({ index: 0, item: { id: 'p2' }, key: 'p2' });

    await wizard.next();
    expect(keyOf(wizard)).toBe('p2');
  });
});

describe('4.1b keys are unique', () => {
  /** Standing on `who`, so `next()` is the move that would enter the group. */
  const atWho = (list: unknown[]): WizardState => ({
    ...initialState({ passengers: list }),
    stack: [{ flow: 'booking', step: 'who' }],
  });
  const collide = (list: unknown[]): ReturnType<typeof step> =>
    step(booking(), atWho(list), { type: 'next' });

  it('refuses entry as `invalid`, naming the group, the field and the positions', async () => {
    const wizard = build(booking(), { passengers: [{ id: 'dup' }, { id: 'x' }, { id: 'dup' }] });
    await wizard.start();
    const result = await wizard.next();

    expect(result).toMatchObject({ ok: false, reason: 'invalid', by: 'each' });
    const message = (result as { errors: Record<string, string> }).errors.id;
    expect(message).toContain('[wizzard] repeat keys collide in group "each": "dup" at 0 and 2.');
    expect(message).toContain('docs/errors.md#repeat-keys');
    expect(stepOf(wizard)).toBe('who');
  });

  it('collides 1 with "1", because keys are compared as strings', () => {
    const result = collide([{ id: 1 }, { id: '1' }]);
    expect(result).toMatchObject({ ok: false, reason: 'invalid', by: 'each' });
  });

  it('refuses an empty, null or undefined key', () => {
    for (const bad of [{ id: '' }, { id: null }, {}]) {
      const result = collide([{ id: 'ok' }, bad]);
      expect(result).toMatchObject({ ok: false, reason: 'invalid' });
      expect((result as { errors: Record<string, string> }).errors.id).toContain('has no key');
    }
  });

  it('has nothing to collide without keyBy', () => {
    const flow: FlowDefinition = {
      ...booking(),
      steps: {
        ...booking().steps,
        each: { flow: passenger, repeat: { over: { $get: 'data.p' } } },
      },
    };
    const result = step(
      flow,
      { ...atWho([]), data: { p: [{ id: 'same' }, { id: 'same' }] } },
      { type: 'next' }
    );
    expect(result).toMatchObject({ to: 'seat' });
  });
});

describe('4.2 removal of the active item', () => {
  it('lands on a surviving item rather than a dead frame', async () => {
    const wizard = await enterGroup();
    await wizard.next();
    await wizard.next(); // on p2/seat

    wizard.set('passengers', [{ id: 'p1' }, { id: 'p3' }]);
    // The stack still names p2 - `set` bumps `rev` and nothing else.
    expect(keyOf(wizard)).toBe('p2');
    // And the selector answers rather than throwing.
    expect(wizard.getSnapshot().current).toBe('seat');

    await wizard.next();
    expect(keyOf(wizard)).not.toBe('p2');
    expect(['p1', 'p3']).toContain(keyOf(wizard));
  });

  it('leaves the group when nothing survives', async () => {
    const wizard = await enterGroup();
    wizard.set('passengers', []);
    await wizard.next();
    expect(stepOf(wizard)).toBe('review');
    expect(at(wizard)).toHaveLength(1);
  });
});

describe('4.3 reordering', () => {
  it('follows the moved item, not the position it left', async () => {
    const wizard = await enterGroup();
    await wizard.next();
    await wizard.next(); // p2/seat

    // p2 moves to the front, so what follows it is now p1.
    wizard.set('passengers', [{ id: 'p3' }, { id: 'p2' }, { id: 'p1' }]);
    await wizard.next(); // p2/meal
    expect(stepOf(wizard)).toBe('meal');
    await wizard.next(); // p2 finished -> the item after p2 is p1
    expect(keyOf(wizard)).toBe('p1');
  });
});

describe('4.4 nested groups', () => {
  const bags: FlowDefinition = { id: 'bags', order: ['size'], steps: { size: {} } };
  const nested: FlowDefinition = {
    id: 'passenger',
    order: ['seat', 'eachBag'],
    steps: {
      seat: {},
      eachBag: { flow: bags, repeat: { over: { $get: 'data.bags' }, keyBy: 'id' } },
    },
  };

  it('builds a three-frame stack that `checkSession` reports nothing about', async () => {
    const flow: FlowDefinition = {
      ...booking(),
      steps: { ...booking().steps, each: { ...booking().steps.each, flow: nested } as never },
    };
    const wizard = build(flow, { passengers, bags: [{ id: 'b1' }, { id: 'b2' }] });
    await wizard.start();
    await wizard.next(); // p1/seat
    await wizard.next(); // p1/b1/size

    expect(at(wizard)).toEqual([
      { flow: 'booking', step: 'each', key: 'p1' },
      { flow: 'passenger', step: 'eachBag', key: 'b1' },
      { flow: 'bags', step: 'size' },
    ]);
    expect(
      checkSession({ flow: 'booking', frames: [wizard.getState()] }, flow, {
        passenger: nested,
        bags,
      })
    ).toEqual([]);

    // The inner group advances; the outer key does not move.
    await wizard.next();
    expect(at(wizard)[1]?.key).toBe('b2');
    expect(at(wizard)[0]?.key).toBe('p1');
  });

  it('refuses a sub-flow that names an ancestor by id, rather than entering it', () => {
    const loop: FlowDefinition = {
      id: 'loop',
      order: ['a', 'again'],
      steps: { a: {}, again: { flow: 'loop' } },
    };
    const state: WizardState = {
      ...initialState(),
      stack: [{ flow: 'loop', step: 'a' }],
    };
    expect(step(loop, state, { type: 'next' }, undefined, { loop })).toBeNull();
  });

  it('refuses to nest past the depth cap', () => {
    // A chain of 40 distinct flows: no cycle, so only the cap can stop it.
    const chain: Record<string, FlowDefinition> = {};
    for (let i = 39; i >= 0; i--) {
      chain[`f${i}`] = {
        id: `f${i}`,
        order: ['s', 'down'],
        steps: { s: {}, ...(i < 39 && { down: { flow: `f${i + 1}` } }) },
      };
    }
    const root = chain.f0 as FlowDefinition;
    const wizard = createWizard({ flow: root, groups, subFlows: chain });
    void wizard.start();
    expect(wizard.getState().stack.length).toBeLessThanOrEqual(32);

    let state: WizardState = { ...initialState(), stack: [{ flow: 'f0', step: 's' }] };
    for (let i = 0; i < 60; i++) {
      const move = step(root, state, { type: 'next' }, undefined, chain);
      if (move === null || 'ok' in move) break;
      state = { ...state, stack: move.stack };
      expect(state.stack.length).toBeLessThanOrEqual(32);
    }
  });
});

describe('4.5 an empty `over`', () => {
  it('walks past the group, which never reaches `visited`', async () => {
    const wizard = build(booking(), { passengers: [] });
    await wizard.start();
    expect(stepOf(wizard)).toBe('who');
    await wizard.next();
    expect(stepOf(wizard)).toBe('review');
    expect(wizard.getState().visited).not.toContain('each');
  });

  it('walks past an `over` that is not an array at all', async () => {
    const wizard = build(booking(), { passengers: 'not a list' });
    await wizard.start();
    await wizard.next();
    expect(stepOf(wizard)).toBe('review');
  });
});

describe('4.6 back() across a group boundary', () => {
  it('lands where the previous item actually stopped', async () => {
    const wizard = await enterGroup();
    await wizard.next(); // p1/meal
    await wizard.next(); // p2/seat
    expect(keyOf(wizard)).toBe('p2');

    await wizard.back();
    expect(stepOf(wizard)).toBe('meal');
    expect(keyOf(wizard)).toBe('p1');
  });

  it('does not oscillate: back() twice keeps going back', async () => {
    const wizard = await enterGroup();
    await wizard.next(); // p1/meal
    await wizard.next(); // p2/seat

    await wizard.back(); // p1/meal
    await wizard.back(); // p1/seat
    expect(stepOf(wizard)).toBe('seat');
    expect(keyOf(wizard)).toBe('p1');

    await wizard.back(); // out of the group, onto `who`
    expect(stepOf(wizard)).toBe('who');
    expect(at(wizard)).toHaveLength(1);
  });

  it('leaves the group from the first step of the first item without history', () => {
    const state: WizardState = {
      ...initialState({ passengers }),
      stack: [
        { flow: 'booking', step: 'each', key: 'p1' },
        { flow: 'passenger', step: 'seat' },
      ],
    };
    const move = step(booking(), state, { type: 'back' });
    expect(move).toMatchObject({ to: 'who' });
    expect((move as { stack: readonly Frame[] }).stack).toEqual([{ flow: 'booking', step: 'who' }]);
  });
});

describe('4.7 go() into a group, and out of one', () => {
  it('pops frames to reach an ancestor step and keeps `data`', async () => {
    const wizard = await enterGroup();
    wizard.set('note', 'kept');
    await wizard.next();
    await wizard.next(); // p2/seat

    const result = await wizard.go('review', { force: true });
    expect(result.ok).toBe(true);
    expect(at(wizard)).toEqual([{ flow: 'booking', step: 'review' }]);
    expect(wizard.get('note')).toBe('kept');
    expect(wizard.get('passengers')).toEqual(passengers);
  });

  it('resolves innermost first, staying inside the item', async () => {
    const wizard = await enterGroup();
    await wizard.next();
    await wizard.next(); // p2/seat

    await wizard.go('meal', { force: true });
    expect(at(wizard)).toEqual([
      { flow: 'booking', step: 'each', key: 'p2' },
      { flow: 'passenger', step: 'meal' },
    ]);
  });

  it('compares a `sequential` policy against the sub-flow`s active steps', async () => {
    const strict: FlowDefinition = { ...passenger, policy: 'sequential' };
    const flow: FlowDefinition = {
      ...booking(),
      policy: 'sequential',
      steps: {
        ...booking().steps,
        each: { flow: strict, repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' } },
      },
    };
    const wizard = build(flow);
    await wizard.start();
    await wizard.next(); // p1/seat

    // `meal` is the neighbour of `seat` in the sub-flow's order, so sequential
    // allows it. Against the root's `active` it is not there at all.
    expect((await wizard.go('meal')).ok).toBe(true);
  });
});

describe('4.8 completion of a group, and of the flow', () => {
  it('lands on the step after the group, still idle', async () => {
    const wizard = await enterGroup();
    for (let i = 0; i < 6; i++) await wizard.next();
    expect(stepOf(wizard)).toBe('review');
    expect(wizard.getState().status).toBe('idle');
  });

  it('sets `done` once when the group is the last step', async () => {
    const flow: FlowDefinition = { ...booking(), order: ['who', 'each'] };
    const wizard = build(flow);
    await wizard.start();
    await wizard.next();
    let last = await wizard.next();
    for (let i = 0; i < 8 && last.ok && last.to !== '@end'; i++) last = await wizard.next();

    expect(last).toEqual({ ok: true, from: 'meal', to: '@end' });
    expect(wizard.getState().status).toBe('done');
    expect(wizard.getState().completed).toContain('meal');
  });
});

describe('4.9 pruning of dead frames', () => {
  it('drops a dead frame and everything above it', () => {
    const state: WizardState = {
      ...initialState({ passengers: [{ id: 'p1' }, { id: 'p3' }] }),
      stack: [
        { flow: 'booking', step: 'each', key: 'p2' },
        { flow: 'passenger', step: 'seat' },
      ],
    };
    const levels = walk(booking(), state);
    expect(levels).toHaveLength(1);
    expect(levels[0]?.frame).toEqual({ flow: 'booking', step: 'each' });
    // And `here` hands back the surviving frame's flow rather than throwing.
    expect(here(booking(), state).flow.id).toBe('booking');
    expect(here(booking(), state).scope.loop).toBeUndefined();
  });

  it('skips a recorded stack whose top frame is dead', () => {
    const state: WizardState = {
      ...initialState({ passengers: [{ id: 'p1' }, { id: 'p3' }] }),
      stack: [
        { flow: 'booking', step: 'each', key: 'p3' },
        { flow: 'passenger', step: 'seat' },
      ],
      history: [
        [{ flow: 'booking', step: 'who' }],
        [
          { flow: 'booking', step: 'each', key: 'p2' },
          { flow: 'passenger', step: 'meal' },
        ],
      ],
    };
    const move = step(booking(), state, { type: 'back' });
    expect(move).toMatchObject({ to: 'who' });
  });
});

describe('5.1 the active flow and scope', () => {
  it('gives a child validate, exit guard and enter guard the item', async () => {
    const seen: unknown[] = [];
    const registry: AsyncRegistry = {
      check: (_args, scope) => {
        seen.push(['validate', scope.loop?.key]);
        return null;
      },
      canLeave: (_args, scope) => {
        seen.push(['exit', scope.loop?.key]);
        return true;
      },
      canEnter: (_args, scope) => {
        seen.push(['enter', scope.loop?.key]);
        return true;
      },
    };
    const guarded: FlowDefinition = {
      id: 'passenger',
      order: ['seat', 'meal'],
      steps: {
        seat: { validate: { $ref: 'check' }, guards: { exit: { $ref: 'canLeave' } } },
        meal: { guards: { enter: { $ref: 'canEnter' } } },
      },
    };
    const flow: FlowDefinition = {
      ...booking(),
      steps: {
        ...booking().steps,
        each: { flow: guarded, repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' } },
      },
    };
    const wizard = build(flow, { passengers }, { registry });
    await wizard.start();
    await wizard.next(); // p1/seat
    await wizard.next(); // p1/meal

    expect(seen).toContainEqual(['validate', 'p1']);
    expect(seen).toContainEqual(['exit', 'p1']);
    expect(seen).toContainEqual(['enter', 'p1']);
  });

  it('runs a child step`s `load`, though its id is absent from the root', async () => {
    let args: unknown;
    const load = vi.fn((a: unknown) => {
      args = a;
      return undefined;
    });
    const deferred: FlowDefinition = {
      id: 'passenger',
      order: ['seat'],
      steps: { seat: { load: { $ref: 'fetchSeats', args: { n: 1 } } } },
    };
    const flow: FlowDefinition = {
      ...booking(),
      steps: {
        ...booking().steps,
        each: { flow: deferred, repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' } },
      },
    };
    const wizard = build(flow, { passengers }, { registry: { fetchSeats: load } });
    await wizard.start();
    await wizard.next();

    expect(load).toHaveBeenCalledTimes(1);
    expect(args).toEqual({ n: 1 });
    expect(flow.steps.seat).toBeUndefined();
  });

  it('resolves a string `GroupStep.flow` through `subFlows`, by the definition`s own id', async () => {
    const flow: FlowDefinition = {
      ...booking(),
      steps: {
        ...booking().steps,
        each: { flow: 'perPassenger', repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' } },
      },
    };
    // Registered under a key that differs from the definition's id, which is
    // what `session.ts` says a producer is free to do.
    const wizard = createWizard({
      flow,
      groups,
      data: { passengers },
      subFlows: { perPassenger: passenger },
    });
    await wizard.start();
    await wizard.next();

    expect(at(wizard)).toEqual([
      { flow: 'booking', step: 'each', key: 'p1' },
      { flow: 'passenger', step: 'seat' },
    ]);
  });

  it('merges `input` into the child`s ctx and leaves `state.ctx` alone', async () => {
    const flow: FlowDefinition = {
      ...booking(),
      steps: {
        ...booking().steps,
        each: {
          flow: passenger,
          repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' },
          input: { who: { $get: 'loop.key' } },
        },
      },
    };
    const wizard = build(flow);
    await wizard.start();
    await wizard.next();

    expect(here(wizard.getFlow(), wizard.getState()).scope.ctx.who).toBe('p1');
    expect(wizard.getState().ctx.who).toBeUndefined();
  });

  it('derives breadcrumbs, index and progress from the sub-flow', async () => {
    const wizard = await enterGroup();
    const snapshot = wizard.getSnapshot();
    expect(snapshot.active).toEqual(['seat', 'meal']);
    expect(snapshot.index).toBe(0);
    expect(snapshot.progress).toBe(0);
    expect(snapshot.breadcrumbs.map((b) => b.id)).toEqual(['seat', 'meal']);
    expect(snapshot.canBack).toBe(true);
  });
});

describe('5.2 the guard', () => {
  const message =
    '[wizzard] step "each" is a group, but no traversal is installed. ' +
    'The main entry walks flat flows only. ' +
    'Pass `groups` from @wizzard-packages/core/groups to createWizard. ' +
    'https://github.com/ZizzX/wizzard-packages/blob/main/docs/errors.md#groups-not-installed';

  it('throws from createWizard when a flow has a group and nothing walks it', () => {
    expect(() => createWizard({ flow: booking() })).toThrow(message);
  });

  it('throws from patchFlow, the other place a flow arrives', () => {
    const wizard = createWizard({ flow: { id: 'flat', order: ['a'], steps: { a: {} } } });
    expect(() => wizard.patchFlow({ steps: { each: { flow: passenger } } })).toThrow(
      '[wizzard] step "each" is a group'
    );
  });

  it('does not throw once `groups` is installed', () => {
    expect(() => build(booking())).not.toThrow();
  });
});

describe('itemsOf', () => {
  it('keys by position without `keyBy`, which can neither collide nor be empty', () => {
    const result = itemsOf(
      'g',
      { over: { $get: 'data.xs' } },
      { data: { xs: [0, 0, 0] }, ctx: {} }
    );
    expect(result).toEqual({ items: [0, 0, 0], keys: ['0', '1', '2'] });
  });

  it('walks past an `over` whose resolver the registry does not have', () => {
    expect(itemsOf('g', { over: { $ref: 'missing' } }, { data: {}, ctx: {} })).toBeNull();
  });
});
