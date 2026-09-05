import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import type { Expr, Scope } from './expr';
import { END, type FlowDefinition, type StepDef } from './flow';
import { reachable, resolveBack, resolveNext } from './resolve';
import { beginNav } from './commit';
import { initialState, type WizardState } from './state';
import { createWizard } from './store';

/**
 * Example-based tests check the cases someone thought of. These check the
 * properties that have to hold for every flow, including the ones nobody
 * thought of — which is the class of bug a hand-rolled state machine hides:
 * a branch that loops, a back that skips a step it should not, a target that
 * is reported reachable and then is not.
 *
 * Flows are generated over a deliberately tiny data space, because collisions
 * are what make branches interesting. Wide random values would mostly produce
 * flows where every predicate is false.
 */

const DATA_KEYS = ['a', 'b', 'c'] as const;
const VALUES = [0, 1, 'x', 'y', true, false, null] as const;

const arbValue = fc.constantFrom(...VALUES);

const arbData = fc.dictionary(fc.constantFrom(...DATA_KEYS), arbValue, {
  minKeys: 0,
  maxKeys: 3,
});

/** Predicates over `data`, plus the constants, which are the interesting extremes. */
const arbExpr: fc.Arbitrary<Expr> = fc.letrec<{ expr: Expr }>((tie) => ({
  expr: fc.oneof(
    { maxDepth: 3, depthSize: 'small' },
    fc.constant(true),
    fc.constant(false),
    fc.record({ $get: fc.constantFrom(...DATA_KEYS).map((k) => `data.${k}`) }),
    fc.record({
      $eq: fc.tuple(
        fc.constantFrom(...DATA_KEYS).map((k) => ({ $get: `data.${k}` }) as Expr),
        arbValue as fc.Arbitrary<Expr>
      ),
    }),
    fc.record({ $not: tie('expr') }),
    fc.record({ $and: fc.array(tie('expr'), { minLength: 1, maxLength: 3 }) }),
    fc.record({ $or: fc.array(tie('expr'), { minLength: 1, maxLength: 3 }) }),
    fc.record({ $empty: tie('expr') })
  ),
})).expr;

interface GeneratedFlow {
  flow: FlowDefinition;
  scope: Scope;
}

/** A flow with `order`, optional `when` on each step, and no explicit branching. */
const arbLinearFlow: fc.Arbitrary<GeneratedFlow> = fc
  .tuple(
    fc.uniqueArray(fc.string({ minLength: 1, maxLength: 3, unit: 'grapheme-ascii' }), {
      minLength: 1,
      maxLength: 8,
    }),
    fc.array(fc.option(arbExpr, { nil: undefined }), { minLength: 8, maxLength: 8 }),
    arbData
  )
  .map(([ids, whens, data]) => {
    const steps: Record<string, StepDef> = {};
    ids.forEach((id, i) => {
      steps[id] = whens[i] === undefined ? {} : { when: whens[i] };
    });
    return {
      flow: { id: 'gen', order: ids, steps },
      scope: { data: data as Record<string, unknown>, ctx: {} },
    };
  });

/** Adds explicit `on.next` edges pointing anywhere in the flow, including backwards. */
const arbBranchingFlow: fc.Arbitrary<GeneratedFlow> = arbLinearFlow.chain(({ flow, scope }) => {
  const ids = flow.order ?? [];
  return fc
    .array(fc.option(fc.constantFrom(...ids, END), { nil: undefined }), {
      minLength: ids.length,
      maxLength: ids.length,
    })
    .map((targets) => {
      const steps: Record<string, StepDef> = {};
      ids.forEach((id, i) => {
        const base = flow.steps[id] ?? {};
        const to = targets[i];
        steps[id] = to === undefined ? base : { ...base, on: { next: to } };
      });
      return { flow: { ...flow, steps }, scope };
    });
});

const stateAt = (step: string | null): WizardState => ({
  ...initialState(),
  stack: step === null ? [] : [{ flow: 'gen', step }],
});

describe('the generators themselves', () => {
  // A property test that only ever sees trivial input proves nothing. This
  // asserts the generator actually produces flows where predicates fire.
  it('produces flows where some steps are hidden and some are not', () => {
    let partial = 0;
    let total = 0;
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const order = flow.order ?? [];
        const active = reachable(flow, scope);
        total++;
        if (active.length > 0 && active.length < order.length) partial++;
        return true;
      }),
      { numRuns: 400 }
    );
    // At least a fifth of generated flows must have a hidden step, or the
    // properties below are being checked against nothing interesting.
    expect(partial / total).toBeGreaterThan(0.2);
  });
});

describe('resolveNext — properties', () => {
  it('always returns END, null, or a step that is reachable right now', () => {
    fc.assert(
      fc.property(arbBranchingFlow, ({ flow, scope }) => {
        const active = reachable(flow, scope);
        for (const start of [null, ...(flow.order ?? [])]) {
          const target = resolveNext(flow, stateAt(start), scope);
          if (target === END || target === null) continue;
          expect(active).toContain(target);
        }
      }),
      { numRuns: 300 }
    );
  });

  it('is deterministic — the same flow and data always resolve the same way', () => {
    fc.assert(
      fc.property(arbBranchingFlow, ({ flow, scope }) => {
        for (const start of flow.order ?? []) {
          const a = resolveNext(flow, stateAt(start), scope);
          const b = resolveNext(flow, stateAt(start), scope);
          expect(a).toEqual(b);
        }
      }),
      { numRuns: 200 }
    );
  });

  it('never moves backwards in a flow without explicit targets', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const order = flow.order ?? [];
        order.forEach((id, i) => {
          const target = resolveNext(flow, stateAt(id), scope);
          if (target === END || target === null) return;
          expect(order.indexOf(target)).toBeGreaterThan(i);
        });
      }),
      { numRuns: 300 }
    );
  });

  it('terminates: repeated next reaches END within the number of steps', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const limit = (flow.order ?? []).length + 1;
        let current = resolveNext(flow, stateAt(null), scope);
        let hops = 0;
        while (current !== END && current !== null && hops <= limit) {
          current = resolveNext(flow, stateAt(current), scope);
          hops++;
        }
        // A loop would blow the budget rather than settling on END.
        expect(hops).toBeLessThanOrEqual(limit);
      }),
      { numRuns: 300 }
    );
  });

  it('reaches every reachable step when walked from the start', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const active = reachable(flow, scope);
        const walked: string[] = [];
        let current = resolveNext(flow, stateAt(null), scope);
        while (current !== END && current !== null && walked.length <= active.length) {
          walked.push(current);
          current = resolveNext(flow, stateAt(current), scope);
        }
        // Without branching, walking forward visits exactly the reachable set,
        // in order. Anything else means a step is unreachable in practice while
        // breadcrumbs and progress claim otherwise.
        expect(walked).toEqual(active);
      }),
      { numRuns: 300 }
    );
  });
});

describe('resolveBack — properties', () => {
  it('always returns null or a step that is reachable right now', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const active = reachable(flow, scope);
        for (const start of flow.order ?? []) {
          const target = resolveBack(flow, stateAt(start), scope);
          if (target === null) continue;
          expect(active).toContain(target);
        }
      }),
      { numRuns: 300 }
    );
  });

  it('undoes next in a flow without explicit targets', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        for (const start of reachable(flow, scope)) {
          const forward = resolveNext(flow, stateAt(start), scope);
          if (forward === END || forward === null) continue;
          expect(resolveBack(flow, stateAt(forward), scope)).toBe(start);
        }
      }),
      { numRuns: 300 }
    );
  });

  it('never moves forwards', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const order = flow.order ?? [];
        order.forEach((id, i) => {
          const target = resolveBack(flow, stateAt(id), scope);
          if (target === null) return;
          expect(order.indexOf(target)).toBeLessThan(i);
        });
      }),
      { numRuns: 300 }
    );
  });
});

describe('reachable — properties', () => {
  it('is always a subsequence of `order`, never a reordering', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const order = flow.order ?? [];
        const active = reachable(flow, scope);
        let cursor = -1;
        for (const id of active) {
          const at = order.indexOf(id);
          expect(at).toBeGreaterThan(cursor);
          cursor = at;
        }
      }),
      { numRuns: 300 }
    );
  });

  it('depends only on the data, never on where the user currently stands', () => {
    fc.assert(
      fc.property(arbLinearFlow, ({ flow, scope }) => {
        const fromStart = reachable(flow, scope);
        for (const id of flow.order ?? []) {
          expect(reachable(flow, scope)).toEqual(fromStart);
          void id;
        }
      }),
      { numRuns: 100 }
    );
  });
});

describe('start', () => {
  /**
   * `start` is `next` from an empty stack, so whatever holds for the resolver
   * holds for it. These are the two properties a binding depends on: it lands
   * where the flow says the first step is, and calling it again is not a move.
   */
  it('lands on the first reachable step, or finishes when there is none', async () => {
    await fc.assert(
      fc.asyncProperty(arbLinearFlow, async ({ flow, scope }) => {
        const w = createWizard({ flow, data: scope.data as Record<string, unknown> });
        const active = reachable(flow, scope);

        await w.start();

        const current = w.getSnapshot().current;
        if (active.length === 0) {
          expect(current).toBeNull();
          expect(w.getState().status).toBe('done');
        } else {
          expect(current).toBe(active[0]);
        }
      })
    );
  });

  it('is idempotent for any flow: a second call commits nothing', async () => {
    await fc.assert(
      fc.asyncProperty(arbBranchingFlow, async ({ flow, scope }) => {
        const w = createWizard({ flow, data: scope.data as Record<string, unknown> });
        await w.start();
        const { rev, stack } = w.getState();

        await w.start();

        expect(w.getState().rev).toBe(rev);
        expect(w.getState().stack).toEqual(stack);
      })
    );
  });
});

describe('beginNav', () => {
  /**
   * The lock is a commit, and the whole engine memoizes on `rev`. A lock that
   * moved `status` without moving `rev` is why `isBusy` was invisible, so the
   * property is checked over arbitrary states rather than one fixture.
   */
  const arbState: fc.Arbitrary<WizardState> = fc
    .tuple(
      arbData,
      fc.nat({ max: 50 }),
      fc.nat({ max: 50 }),
      fc.array(fc.string(), { maxLength: 4 })
    )
    .map(([data, rev, nav, visited]) => ({
      ...initialState(data as Record<string, unknown>),
      rev,
      nav,
      visited,
      status: 'idle' as const,
    }));

  it('always advances both counters and says it is busy', () => {
    fc.assert(
      fc.property(arbState, (state) => {
        const { state: locked, token } = beginNav(state);

        expect(locked.rev).toBe(state.rev + 1);
        expect(locked.nav).toBe(state.nav + 1);
        expect(token).toBe(locked.nav);
        expect(locked.status).toBe('busy');
      })
    );
  });

  it('changes nothing else', () => {
    fc.assert(
      fc.property(arbState, (state) => {
        const { state: locked } = beginNav(state);
        const ignore = { rev: 0, nav: 0, status: 'idle' as const };

        expect({ ...locked, ...ignore }).toEqual({ ...state, ...ignore });
      })
    );
  });

  it('is monotonic: locking twice never repeats a revision', () => {
    fc.assert(
      fc.property(arbState, (state) => {
        const first = beginNav(state);
        const second = beginNav(first.state);

        expect(second.state.rev).toBeGreaterThan(first.state.rev);
        expect(second.token).toBeGreaterThan(first.token);
      })
    );
  });
});
