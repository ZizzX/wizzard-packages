import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { commit } from './commit';
import type { FlowDefinition, StepDef } from './flow';
import { runNav, type NavContext } from './navigate';
import { createSelector } from './select';
import { initialState, type WizardState } from './state';

/**
 * `canBack` and `back()` are two answers to the same question, and they used to
 * be computed two different ways: a heuristic over `index` and `history.length`
 * on one side, a walk over `order` on the other. Every disagreement is a Back
 * button that does nothing, and they all come from a step that stopped being
 * reachable partway through a session — the case a hand-written test has to
 * think of first. So the session is generated instead.
 */

const IDS = ['a', 'b', 'c', 'd', 'e', 'f'] as const;
/** Two flags, not six: collisions are what make a `when` interesting. */
const FLAGS = ['p', 'q'] as const;

/** A flat flow of 2-6 steps, some of them shown only while a flag is true. */
const arbFlow: fc.Arbitrary<FlowDefinition> = fc
  .tuple(
    fc.integer({ min: 2, max: IDS.length }),
    fc.array(fc.option(fc.constantFrom(...FLAGS), { nil: undefined }), {
      minLength: IDS.length,
      maxLength: IDS.length,
    })
  )
  .map(([count, flags]) => {
    const order = IDS.slice(0, count);
    const steps: Record<string, StepDef> = {};
    order.forEach((id, i) => {
      const flag = flags[i];
      steps[id] = flag === undefined ? {} : { when: { $get: `data.${flag}` } };
    });
    return { id: 'gen', order: [...order], steps };
  });

type Op = { type: 'next' } | { type: 'back' } | { type: 'set'; flag: string; value: boolean };

const arbOps: fc.Arbitrary<readonly Op[]> = fc.array(
  fc.oneof(
    fc.constant<Op>({ type: 'next' }),
    fc.constant<Op>({ type: 'back' }),
    fc.record({
      type: fc.constant('set' as const),
      flag: fc.constantFrom<string>(...FLAGS),
      value: fc.boolean(),
    })
  ),
  { minLength: 1, maxLength: 12 }
);

/**
 * What `back()` actually answers, without moving the session on. The state is
 * immutable, so a host holding a copy of it throws every write away.
 */
const currentOf = (state: WizardState): string | null =>
  state.stack[state.stack.length - 1]?.step ?? null;

async function backWouldMove(ctx: NavContext, state: WizardState): Promise<boolean> {
  let probe: WizardState = { ...state };
  const result = await runNav(
    ctx,
    {
      read: () => probe,
      write: (next) => {
        probe = next;
      },
    },
    { type: 'back' }
  );
  return result.ok;
}

/**
 * Runs one generated session, calling back on every state it passes through.
 * The session is started first: a wizard nobody has entered is the one state
 * where `canBack` deliberately answers `false` without asking `resolveBack`.
 */
async function walk(
  flow: FlowDefinition,
  ops: readonly Op[],
  at: (state: WizardState) => Promise<void> | void
): Promise<void> {
  const ctx: NavContext = { flow };
  let state = initialState();
  const host = {
    read: () => state,
    write: (next: WizardState) => {
      state = next;
    },
  };

  await runNav(ctx, host, { type: 'next' });
  await at(state);

  for (const op of ops) {
    if (op.type === 'set') {
      state = commit(state, { data: { ...state.data, [op.flag]: op.value } });
    } else {
      await runNav(ctx, host, { type: op.type });
    }
    await at(state);
  }
}

describe('the generated sessions themselves', () => {
  // A property that only ever sees sessions where back() always fails proves
  // nothing about the states where the two answers could disagree.
  it('reach started states where back() moves and started states where it does not', async () => {
    let moved = 0;
    let refused = 0;

    await fc.assert(
      fc.asyncProperty(arbFlow, arbOps, async (flow, ops) => {
        await walk(flow, ops, async (state) => {
          if (currentOf(state) === null) return;
          if (await backWouldMove({ flow }, state)) moved++;
          else refused++;
        });
      }),
      { numRuns: 100 }
    );

    expect(moved).toBeGreaterThan(0);
    expect(refused).toBeGreaterThan(0);
  });
});

describe('canBack', () => {
  it('is the answer back() gives, after every operation of any session', async () => {
    await fc.assert(
      fc.asyncProperty(arbFlow, arbOps, async (flow, ops) => {
        const select = createSelector(() => flow);
        await walk(flow, ops, async (state) => {
          // The one exception is a stack nobody has entered yet: `back()` would
          // land on the last reachable step, and a button offering that before
          // the first step is drawn is the bug this clause exists for.
          const expected = currentOf(state) !== null && (await backWouldMove({ flow }, state));
          expect(select(state).canBack).toBe(expected);
        });
      }),
      { numRuns: 300 }
    );
  });
});
