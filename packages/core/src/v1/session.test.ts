import { describe, expect, it } from 'vitest';

import type { FlowDefinition } from './flow';
import { checkSession, isStackEntry, type RecordedSession } from './session';
import { initialState, type WizardState } from './state';
import type { FlowProblem } from './validate-flow';

const passenger: FlowDefinition = {
  id: 'passenger',
  order: ['name', 'age'],
  steps: { name: {}, age: {} },
};

// The fixture carries a `repeat` on purpose: iteration state lives in the frame
// (`Frame.key`), so a checker that never sees one is a checker the flagship demo
// would walk straight past.
const booking: FlowDefinition = {
  id: 'booking',
  version: 2,
  order: ['who', 'passengers', 'pay'],
  steps: {
    who: {},
    passengers: { flow: passenger, repeat: { over: { $get: 'data.passengers' } } },
    pay: {},
  },
};

const frame = (over: Partial<WizardState>): WizardState => ({
  ...initialState(),
  status: 'idle',
  ...over,
});

const clean: RecordedSession = {
  flow: 'booking',
  version: 2,
  frames: [
    frame({ stack: [{ flow: 'booking', step: 'who' }], visited: ['who'], rev: 1, nav: 1 }),
    frame({
      stack: [
        { flow: 'booking', step: 'passengers', key: 'p1' },
        { flow: 'passenger', step: 'name' },
      ],
      visited: ['who', 'passengers', 'name'],
      rev: 2,
      nav: 2,
    }),
    frame({
      stack: [
        { flow: 'booking', step: 'passengers', key: 'p2' },
        { flow: 'passenger', step: 'name' },
      ],
      visited: ['who', 'passengers', 'name'],
      rev: 3,
      nav: 3,
    }),
    frame({
      stack: [{ flow: 'booking', step: 'pay' }],
      visited: ['who', 'passengers', 'name', 'pay'],
      rev: 4,
      nav: 4,
    }),
  ],
};

/** A session built from `clean` with one frame swapped for a broken one. */
const withFrame = (index: number, over: Partial<WizardState>): RecordedSession => ({
  ...clean,
  frames: clean.frames.map((f, i) => (i === index ? { ...f, ...over } : f)),
});

const messages = (problems: readonly FlowProblem[]): string =>
  problems.map((p) => `${p.path}: ${p.message}`).join('\n');

describe('a recording that still matches its flow', () => {
  it('reports nothing, repeat iterations and sub-flow frames included', () => {
    expect(checkSession(clean, booking)).toEqual([]);
  });

  it('accepts a single-frame recording', () => {
    const one = { ...clean, frames: clean.frames.slice(0, 1) };
    expect(checkSession(one, booking)).toEqual([]);
  });
});

describe('drift (E6)', () => {
  // The failure this whole module exists to prevent: a scrubber stepping
  // through a recording of another flow renders a plausible lie.
  it('names a recording made against a different flow', () => {
    const problems = checkSession({ ...clean, flow: 'checkout' }, booking);
    expect(problems).not.toEqual([]);
    expect(messages(problems)).toContain('this recording does not match this flow');
    expect(messages(problems)).toContain('checkout');
  });

  it('names a recording made against an older version of the same flow', () => {
    const problems = checkSession({ ...clean, version: 1 }, booking);
    expect(messages(problems)).toContain('this recording does not match this flow');
    expect(messages(problems)).toContain('version 1');
  });

  it('stays quiet when either side left the version unstamped', () => {
    expect(checkSession({ ...clean, version: undefined }, booking)).toEqual([]);
    expect(checkSession(clean, { ...booking, version: undefined })).toEqual([]);
  });

  it('rejects a frame whose step is not in the flow it names', () => {
    const problems = checkSession(
      withFrame(0, { stack: [{ flow: 'booking', step: 'seats' }], visited: ['seats'] }),
      booking
    );
    expect(messages(problems)).toContain('seats');
  });

  it('rejects a frame naming a flow nobody supplied', () => {
    const problems = checkSession(
      withFrame(0, { stack: [{ flow: 'loyalty', step: 'tier' }], visited: ['tier'] }),
      booking
    );
    expect(messages(problems)).toContain('unknown flow: loyalty');
  });
});

describe('sub-flows by reference', () => {
  const byRef: FlowDefinition = {
    ...booking,
    steps: {
      ...booking.steps,
      passengers: { flow: 'passenger', repeat: { over: { $get: 'data.passengers' } } },
    },
  };

  it('cannot verify a referenced sub-flow without the registry, and says so', () => {
    expect(messages(checkSession(clean, byRef))).toContain('unknown flow: passenger');
  });

  it('verifies it once the registry supplies it', () => {
    expect(checkSession(clean, byRef, { passenger })).toEqual([]);
  });

  // A registered flow gets walked like any other, so a frame inside its own
  // inline child is not drift. `buildGraph` follows inline children after
  // resolving a reference; a checker that stopped at the reference would call
  // a legitimate grandchild frame unknown.
  it('walks the inline children of a registered flow', () => {
    const seat: FlowDefinition = { id: 'seat', order: ['pick'], steps: { pick: {} } };
    const withInlineChild: FlowDefinition = {
      ...passenger,
      order: ['name', 'age', 'seat'],
      steps: { ...passenger.steps, seat: { flow: seat } },
    };
    const deep: RecordedSession = {
      flow: 'booking',
      version: 2,
      frames: [
        frame({
          stack: [
            { flow: 'booking', step: 'passengers', key: 'p1' },
            { flow: 'passenger', step: 'seat' },
            { flow: 'seat', step: 'pick' },
          ],
          visited: ['passengers', 'seat', 'pick'],
          rev: 1,
          nav: 1,
        }),
      ],
    };

    expect(checkSession(deep, byRef, { passenger: withInlineChild })).toEqual([]);
  });

  // The key a group references and the id the definition carries are allowed
  // to disagree. Frames name the id, so a checker comparing against the key
  // would call a correct recording drift.
  it('resolves a reference whose registry key is not the flow id', () => {
    const renamed: FlowDefinition = { ...passenger, id: 'traveller' };
    const frames = clean.frames.map((f) => ({
      ...f,
      stack: f.stack.map((entry) =>
        entry.flow === 'passenger' ? { ...entry, flow: 'traveller' } : entry
      ),
    }));

    expect(checkSession({ ...clean, frames }, byRef, { passenger: renamed })).toEqual([]);
  });
});

describe('flows that answer to more than one name', () => {
  // `knownFlows` registers a definition under the key it is referenced by and
  // under its own id, so a registry key can collide with another definition's
  // id. The child frame is resolved from the group that encloses it, never by
  // looking its own name up, or the collision would make a correct recording
  // read as drift.
  it('resolves a child frame through its group, not through a colliding id', () => {
    const alias: FlowDefinition = { id: 'traveller', order: ['seat'], steps: { seat: {} } };
    const other: FlowDefinition = { id: 'traveller', order: ['other'], steps: { other: {} } };
    const viaAlias: FlowDefinition = {
      ...booking,
      steps: {
        ...booking.steps,
        passengers: { flow: 'alias', repeat: { over: { $get: 'data.p' } } },
      },
    };
    const recorded: RecordedSession = {
      flow: 'booking',
      version: 2,
      frames: [
        frame({
          stack: [
            { flow: 'booking', step: 'passengers', key: 'p1' },
            { flow: 'traveller', step: 'seat' },
          ],
          visited: ['passengers', 'seat'],
          rev: 1,
          nav: 1,
        }),
      ],
    };

    expect(checkSession(recorded, viaAlias, { alias, traveller: other })).toEqual([]);

    const emptied: FlowDefinition = { ...alias, order: [], steps: {} };
    expect(
      messages(checkSession(recorded, viaAlias, { alias: emptied, traveller: other }))
    ).toContain('does not have: seat');
  });
});

describe('stacks the engine could not have built', () => {
  // `state.ts`: the last entry is the current step, the ones before it enclose
  // it. An atom cannot enclose anything.
  it('rejects a parent frame that is not a group', () => {
    const problems = checkSession(
      withFrame(1, {
        stack: [
          { flow: 'booking', step: 'who' },
          { flow: 'passenger', step: 'name' },
        ],
        visited: ['who', 'name'],
      }),
      booking
    );
    expect(messages(problems)).toContain('is not a group');
  });

  it('rejects a group whose child frame is in a different flow', () => {
    const problems = checkSession(
      withFrame(1, {
        stack: [
          { flow: 'booking', step: 'passengers', key: 'p1' },
          { flow: 'seat', step: 'pick' },
        ],
        visited: ['passengers', 'pick'],
      }),
      booking
    );
    expect(messages(problems)).toContain('group into passenger');
  });

  it('still allows a group as the current step, with nothing below it', () => {
    const problems = checkSession(
      withFrame(1, {
        stack: [{ flow: 'booking', step: 'passengers', key: 'p1' }],
        visited: ['who', 'passengers'],
      }),
      booking
    );
    expect(problems).toEqual([]);
  });
});

describe('frames that could not have come from the engine', () => {
  it('rejects a rev that moves backwards', () => {
    expect(messages(checkSession(withFrame(2, { rev: 1 }), booking))).toContain('frames[2].rev');
  });

  it('rejects a nav that moves backwards', () => {
    expect(messages(checkSession(withFrame(2, { nav: 1 }), booking))).toContain('frames[2].nav');
  });

  it('allows a rev that stands still between frames', () => {
    expect(checkSession(withFrame(2, { rev: 2, nav: 2 }), booking)).toEqual([]);
  });

  // `visited` is what `select.ts` reads to colour a breadcrumb. A current step
  // missing from it mis-highlights every frame after it.
  it('rejects a current step missing from visited', () => {
    expect(messages(checkSession(withFrame(3, { visited: ['who'] }), booking))).toContain(
      'current step'
    );
  });

  it('rejects an empty stack outside init', () => {
    expect(messages(checkSession(withFrame(1, { stack: [], visited: [] }), booking))).toContain(
      'stack'
    );
  });

  it('accepts an empty stack while the wizard is still initialising', () => {
    const boot: RecordedSession = {
      flow: 'booking',
      version: 2,
      frames: [initialState(), ...clean.frames],
    };
    expect(checkSession(boot, booking)).toEqual([]);
  });

  it('rejects an item key on a step that is not a repeat group', () => {
    const problems = checkSession(
      withFrame(0, { stack: [{ flow: 'booking', step: 'who', key: 'p1' }], visited: ['who'] }),
      booking
    );
    expect(messages(problems)).toContain('not a repeat group');
  });

  it('accepts an item key on a repeat group', () => {
    const problems = checkSession(
      withFrame(0, {
        stack: [{ flow: 'booking', step: 'passengers', key: 'p1' }],
        visited: ['who', 'passengers'],
      }),
      booking
    );
    expect(problems).toEqual([]);
  });
});

describe('recordings that are not recordings', () => {
  it('reports an empty recording rather than replaying nothing', () => {
    expect(messages(checkSession({ ...clean, frames: [] }, booking))).toContain('no frames');
  });

  // A recording is JSON off a disk or a wire. It gets to be any shape at all.
  it('survives a truncated frame and names it', () => {
    const truncated = {
      ...clean,
      frames: [clean.frames[0], { stack: [{ flow: 'booking', step: 'who' }] }],
    } as unknown as RecordedSession;
    const problems = checkSession(truncated, booking);
    expect(messages(problems)).toContain('frames[1]');
    expect(messages(problems)).toContain('corrupt');
  });

  it('survives frames that are not objects at all', () => {
    const junk = { ...clean, frames: [null, 'nope', 7] } as unknown as RecordedSession;
    expect(() => checkSession(junk, booking)).not.toThrow();
    expect(checkSession(junk, booking)).toHaveLength(3);
  });

  // The top-level fields can all be present and the stack still be junk. This
  // is the shape that used to reach `entry.flow` and throw out of a checker
  // that promises it never throws.
  it('survives a stack holding something that is not a frame', () => {
    for (const junk of [null, 7, 'who', {}, { flow: 'booking' }]) {
      const broken = withFrame(0, { stack: [junk] as never, visited: ['who'] });
      expect(() => checkSession(broken, booking)).not.toThrow();
      expect(messages(checkSession(broken, booking))).toContain('corrupt');
    }
  });
});

// Shared with the snapshot decoder, so a hole here is a hole in what stored
// JSON is allowed to become.
describe('isStackEntry', () => {
  it('accepts a frame with no key, and one with a string key', () => {
    expect(isStackEntry({ flow: 'booking', step: 'who' })).toBe(true);
    expect(isStackEntry({ flow: 'booking', step: 'passengers', key: 'p1' })).toBe(true);
  });

  it('rejects a key that is not a string', () => {
    expect(isStackEntry({ flow: 'booking', step: 'passengers', key: 3 })).toBe(false);
    expect(isStackEntry({ flow: 'booking', step: 'passengers', key: null })).toBe(false);
  });
});
