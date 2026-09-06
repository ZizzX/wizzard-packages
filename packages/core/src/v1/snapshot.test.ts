import { describe, expect, it } from 'vitest';

import { groups } from './groups';
import { decodeSnapshot, toSnapshot, type Snapshot } from './snapshot';
import { initialState } from './state';
import { createWizard } from './store';

import type { FlowDefinition } from './flow';
import type { WizardState } from './state';

const flow: FlowDefinition = {
  id: 'signup',
  version: 2,
  order: ['name', 'review'],
  steps: { name: {}, review: {} },
};

const live = () => ({
  ...initialState({ name: { full: 'Ada' } }, { role: 'admin' }),
  status: 'busy' as const,
  stack: [{ flow: 'signup', step: 'name' }],
  history: [[{ flow: 'signup', step: 'name' }]],
  visited: ['name'],
  completed: ['name'],
  dirty: ['name.full'],
  errors: { name: { full: 'too short' } },
  busy: ['name'],
  rev: 7,
  nav: 3,
});

const roundTrip = (state = live()) =>
  decodeSnapshot(flow, JSON.parse(JSON.stringify(toSnapshot(state, flow))) as unknown);

describe('toSnapshot', () => {
  it('keeps the session and drops what only described a moment', () => {
    const snapshot = toSnapshot(live(), flow);

    expect(snapshot).toEqual({
      v: 1,
      flow: 'signup',
      version: 2,
      stack: [{ flow: 'signup', step: 'name' }],
      history: [[{ flow: 'signup', step: 'name' }]],
      data: { name: { full: 'Ada' } },
      ctx: { role: 'admin' },
      visited: ['name'],
      completed: ['name'],
      dirty: ['name.full'],
      nav: 3,
    });
    expect(snapshot).not.toHaveProperty('status');
    expect(snapshot).not.toHaveProperty('errors');
    expect(snapshot).not.toHaveProperty('busy');
    expect(snapshot).not.toHaveProperty('rev');
  });

  it('hands out a detached copy, not a window into live state', () => {
    const state = live();
    const snapshot = toSnapshot(state, flow);

    expect(snapshot.stack).not.toBe(state.stack);
    expect(snapshot.stack[0]).not.toBe(state.stack[0]);
    expect(snapshot.data).not.toBe(state.data);
  });

  it('omits the version when the flow carries none', () => {
    expect(toSnapshot(live(), { ...flow, version: undefined })).not.toHaveProperty('version');
  });
});

describe('decodeSnapshot', () => {
  it('restores a session and resets everything transient', () => {
    const result = roundTrip();

    expect(result.restored).toBe(true);
    if (!result.restored) return;
    expect(result.state.status).toBe('idle');
    expect(result.state.busy).toEqual([]);
    expect(result.state.errors).toEqual({});
    expect(result.state.rev).toBe(0);
    // The epoch lands above the stored one, which is what makes a navigation
    // begun before the restore resolve as superseded instead of overwriting it.
    expect(result.state.nav).toBe(4);
    expect(result.state.data).toEqual({ name: { full: 'Ada' } });
  });

  it.each([
    ['not an object', 'null', null],
    ['a string', 'a string', 'nope'],
    ['no version field', 'no v', { flow: 'signup', stack: [] }],
    ['a stack that is not frames', 'bad stack', { v: 1, flow: 'signup', stack: [null] }],
  ])('refuses %s', (_label, _name, input) => {
    expect(decodeSnapshot(flow, input)).toEqual({
      restored: false,
      reason: 'snapshot/unreadable',
    });
  });

  it('refuses a snapshot of another flow', () => {
    const snapshot = { ...toSnapshot(live(), flow), flow: 'checkout' };
    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/other-flow',
    });
  });

  it('refuses a snapshot of an older version of this flow', () => {
    const snapshot = { ...toSnapshot(live(), flow), version: 1 };
    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/other-flow',
    });
  });

  it('accepts one when either side never stamped a version', () => {
    const unstamped = { ...flow, version: undefined };
    const snapshot = toSnapshot(live(), unstamped);

    expect(decodeSnapshot(unstamped, snapshot).restored).toBe(true);
    expect(decodeSnapshot(flow, snapshot).restored).toBe(true);
  });

  it('refuses a frame naming a step the flow no longer has', () => {
    const snapshot = {
      ...toSnapshot(live(), flow),
      stack: [{ flow: 'signup', step: 'gone' }],
    };
    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/unknown-step',
    });
  });

  it('checks the history the same way as the stack', () => {
    const snapshot = {
      ...toSnapshot(live(), flow),
      history: [[{ flow: 'signup', step: 'gone' }]],
    };
    expect(decodeSnapshot(flow, snapshot).restored).toBe(false);
  });

  it.each([
    ['a value JSON cannot round-trip', { at: new Date() }],
    ['a number that is not finite', { at: Number.POSITIVE_INFINITY }],
    ['a key that reaches the prototype', JSON.parse('{"__proto__": {"admin": true}}')],
  ])('refuses %s in data', (_label, data) => {
    const snapshot = { ...toSnapshot(live(), flow), data };
    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/unstorable',
    });
  });

  it('refuses a cycle rather than following it', () => {
    const data: Record<string, unknown> = {};
    data.self = data;
    const snapshot = { ...toSnapshot(live(), flow), data };

    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/unstorable',
    });
  });

  it('refuses something too deep to be worth reading', () => {
    let deep: Record<string, unknown> = { end: true };
    for (let i = 0; i < 40; i++) deep = { deep };
    const snapshot = { ...toSnapshot(live(), flow), data: deep };

    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/too-large',
    });
  });

  it('refuses something too large', () => {
    const snapshot = { ...toSnapshot(live(), flow), data: { blob: 'x'.repeat(1_000_001) } };
    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/too-large',
    });
  });
});

describe('migration', () => {
  const older = { ...toSnapshot(live(), flow), v: 0 } as unknown as Snapshot;

  it('refuses an unknown version when no migration is offered', () => {
    expect(decodeSnapshot(flow, older)).toEqual({ restored: false, reason: 'snapshot/version' });
  });

  it('runs the migration and restores what it produced', () => {
    const result = decodeSnapshot(flow, older, {
      migrate: (s) => ({ ...s, v: 1 }),
    });

    expect(result.restored).toBe(true);
  });

  it('walks a chain one hop at a time', () => {
    const ancient = { ...toSnapshot(live(), flow), v: -2 } as unknown as Snapshot;
    const hops: number[] = [];

    const result = decodeSnapshot(flow, ancient, {
      migrate: (s) => {
        hops.push(s.v);
        return { ...s, v: s.v + 1 };
      },
    });

    expect(hops).toEqual([-2, -1, 0]);
    expect(result.restored).toBe(true);
  });

  it('gives up rather than looping when a migration stands still', () => {
    let calls = 0;
    const result = decodeSnapshot(flow, older, {
      migrate: (s) => {
        calls += 1;
        return { ...s };
      },
    });

    expect(result).toEqual({ restored: false, reason: 'snapshot/version' });
    expect(calls).toBeLessThanOrEqual(16);
  });

  it('validates what the migration returned, not what it was given', () => {
    // A host's migrate is ordinary code. Trusting its output is how a corrupt
    // snapshot becomes a corrupt session.
    const result = decodeSnapshot(flow, older, {
      migrate: () => ({ v: 1, flow: 'signup', stack: 'not frames' }),
    });

    expect(result).toEqual({ restored: false, reason: 'snapshot/unreadable' });
  });
});

describe('the epoch and the frames it restores', () => {
  it('lands above a live navigation that is already in flight', () => {
    const snapshot = toSnapshot(live(), flow);

    // A wizard that has navigated nine times while this snapshot sat in storage.
    const result = decodeSnapshot(flow, snapshot, { epoch: 9 });

    expect(result.restored).toBe(true);
    if (!result.restored) return;
    expect(result.state.nav).toBe(10);
  });

  it('refuses a frame enclosed by a step that is not a group', () => {
    // A stack the engine could not have built: only a group encloses anything,
    // so this is drift or a hand-written snapshot, not a session.
    const snapshot = {
      ...toSnapshot(live(), flow),
      stack: [
        { flow: 'signup', step: 'name' },
        { flow: 'passenger', step: 'seat' },
      ],
    };

    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/unknown-step',
    });
  });

  it('still refuses a runaway stack, not only runaway data', () => {
    const snapshot = {
      ...toSnapshot(live(), flow),
      stack: [{ flow: 'signup', step: 'name', base: 'x'.repeat(1_000_001) }],
    };

    expect(decodeSnapshot(flow, snapshot)).toEqual({
      restored: false,
      reason: 'snapshot/too-large',
    });
  });

  it('copies nested data rather than sharing it with live state', () => {
    const state = live();
    const snapshot = toSnapshot(state, flow);

    (snapshot.data.name as { full: string }).full = 'Grace';

    expect((state.data.name as { full: string }).full).toBe('Ada');
  });
});

/**
 * A booking with a repeat group over its passengers, and the sub-flow each one
 * runs. The group is referenced by name, so a decoder only resolves it when the
 * host hands over the registry - which is the whole of 4.10.
 */
const passenger: FlowDefinition = {
  id: 'passenger',
  order: ['seat', 'meal'],
  steps: { seat: {}, meal: {} },
  policy: 'free',
};

const booking: FlowDefinition = {
  id: 'booking',
  version: 1,
  order: ['who', 'trip', 'review'],
  steps: {
    who: {},
    trip: {
      flow: 'passenger',
      repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' },
    },
    review: {},
  },
  policy: 'free',
};

/** Standing on the second passenger's last step, two frames deep. */
const inGroup = (): WizardState => ({
  ...initialState({ passengers: [{ id: 'p1' }, { id: 'p2' }] }),
  status: 'idle',
  stack: [
    { flow: 'booking', step: 'trip', key: 'p2' },
    { flow: 'passenger', step: 'meal' },
  ],
  history: [[{ flow: 'booking', step: 'who' }]],
  visited: ['who', 'trip', 'seat', 'meal'],
  rev: 4,
  nav: 2,
});

const stored = (state = inGroup()): unknown =>
  JSON.parse(JSON.stringify(toSnapshot(state, booking)));

describe('decodeSnapshot, inside a group', () => {
  it('round-trips a snapshot taken inside a group and resumes on the same item', async () => {
    const result = decodeSnapshot(booking, stored(), { subFlows: { passenger } });

    expect(result).toEqual({
      restored: true,
      state: expect.objectContaining({
        stack: [
          { flow: 'booking', step: 'trip', key: 'p2' },
          { flow: 'passenger', step: 'meal' },
        ],
      }) as unknown,
    });
    if (!result.restored) return;

    const wizard = createWizard({
      flow: booking,
      state: result.state,
      groups,
      subFlows: { passenger },
    });
    await wizard.start();

    expect(wizard.getSnapshot().current).toBe('meal');
    expect(wizard.getState().stack[0]?.key).toBe('p2');

    // p2 is the last passenger, so finishing its sub-flow leaves the group
    // rather than advancing it - which is the proof that the restored frame
    // was the second item and not the first.
    await wizard.next();
    expect(wizard.getSnapshot().current).toBe('review');
    wizard.destroy();
  });

  it('refuses a child frame naming a step the sub-flow no longer has', () => {
    const trimmed: FlowDefinition = { ...passenger, order: ['seat'], steps: { seat: {} } };

    expect(decodeSnapshot(booking, stored(), { subFlows: { passenger: trimmed } })).toEqual({
      restored: false,
      reason: 'snapshot/unknown-step',
    });
  });

  it('restores the same snapshot without the registry, and prunes it on the first move', async () => {
    // Permissive by design: without `subFlows` nothing here can resolve
    // `passenger`, and refusing would throw away every snapshot taken inside a
    // group whose definitions live somewhere else.
    const result = decodeSnapshot(booking, stored());
    expect(result.restored).toBe(true);
    if (!result.restored) return;

    const wizard = createWizard({ flow: booking, state: result.state, groups });
    await wizard.start();
    await wizard.next();

    // The dead child frame is gone with everything above it, and the move
    // resolved from the group step in the root.
    expect(wizard.getState().stack).toEqual([{ flow: 'booking', step: 'review' }]);
    wizard.destroy();
  });

  it('refuses a key that is not a string, at the shape check', () => {
    const snapshot = {
      ...(stored() as Snapshot),
      stack: [{ flow: 'booking', step: 'trip', key: 3 }],
    };

    expect(decodeSnapshot(booking, snapshot, { subFlows: { passenger } })).toEqual({
      restored: false,
      reason: 'snapshot/unreadable',
    });
  });

  it('refuses an item key on a step that is not a repeat group', () => {
    const snapshot = {
      ...(stored() as Snapshot),
      stack: [{ flow: 'booking', step: 'who', key: 'p1' }],
    };

    expect(decodeSnapshot(booking, snapshot, { subFlows: { passenger } })).toEqual({
      restored: false,
      reason: 'snapshot/unknown-step',
    });
  });

  it('resolves a child frame through its group, not through a colliding id', () => {
    // `knownFlows` registers a definition under its reference key and its own
    // id at once, so `alias` and `traveller` both answer here. Resolving the
    // child by name would pick the wrong one and refuse a valid snapshot.
    const viaAlias: FlowDefinition = {
      ...booking,
      steps: {
        ...booking.steps,
        trip: { flow: 'alias', repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' } },
      },
    };
    const alias: FlowDefinition = { id: 'traveller', order: ['seat'], steps: { seat: {} } };
    const other: FlowDefinition = { id: 'traveller', order: ['other'], steps: { other: {} } };
    const state: WizardState = {
      ...inGroup(),
      stack: [
        { flow: 'booking', step: 'trip', key: 'p2' },
        { flow: 'traveller', step: 'seat' },
      ],
    };
    const snapshot = JSON.parse(JSON.stringify(toSnapshot(state, viaAlias))) as unknown;

    expect(
      decodeSnapshot(viaAlias, snapshot, { subFlows: { alias, traveller: other } }).restored
    ).toBe(true);

    const emptied: FlowDefinition = { ...alias, order: [], steps: {} };
    expect(
      decodeSnapshot(viaAlias, snapshot, { subFlows: { alias: emptied, traveller: other } })
    ).toEqual({ restored: false, reason: 'snapshot/unknown-step' });
  });

  it('checks the history of a group run the same way as the stack', () => {
    const state = inGroup();
    const snapshot = {
      ...(stored(state) as Snapshot),
      history: [
        [
          { flow: 'booking', step: 'trip', key: 'p1' },
          { flow: 'passenger', step: 'gone' },
        ],
      ],
    };

    expect(decodeSnapshot(booking, snapshot, { subFlows: { passenger } })).toEqual({
      restored: false,
      reason: 'snapshot/unknown-step',
    });
  });
});
