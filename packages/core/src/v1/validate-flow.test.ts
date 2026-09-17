import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { defineFlow, step } from './define';
import { MAX_EXPR_DEPTH } from './diagnostic';
import { evaluate, type Expr } from './expr';
import type { FlowDefinition } from './flow';
import { assertFlow, validateFlow, type FlowProblem } from './validate-flow';

const good = defineFlow({
  id: 'booking',
  order: ['trip', 'company'],
  steps: {
    trip: step<{ payer: string }>({ label: 'Trip' }),
    company: step<{ vat: string }>({
      when: { $eq: [{ $get: 'data.trip.payer' }, 'business'] },
    }),
  },
});

/** The first sentence of a problem's message - what went wrong - under its path. */
const what = (p: FlowProblem): string =>
  `${p.path}: ${p.message.slice('[wizzard] '.length, p.message.indexOf('. '))}`;

const problems = (flow: FlowDefinition, registry?: Record<string, unknown>): string[] =>
  validateFlow(flow, registry).map(what);

describe('validateFlow', () => {
  it('passes a well-formed flow', () => {
    expect(validateFlow(good)).toEqual([]);
  });

  it('catches a target that does not exist', () => {
    const flow: FlowDefinition = {
      id: 'f',
      order: ['a'],
      steps: { a: { on: { next: 'nowhere' } } },
    };
    expect(problems(flow)).toContain('steps.a.on.next: unknown target "nowhere"');
  });

  it('accepts @end as a target', () => {
    const flow: FlowDefinition = { id: 'f', order: ['a'], steps: { a: { on: { next: '@end' } } } };
    expect(validateFlow(flow)).toEqual([]);
  });

  it('catches a $get that addresses nothing the engine knows', () => {
    const flow: FlowDefinition = {
      id: 'f',
      order: ['a'],
      steps: { a: { when: { $get: 'user.name' } } },
    };
    expect(problems(flow)[0]).toMatch(
      /\$get "user.name" does not start with data, ctx, loop, step/
    );
  });

  it('catches a resolver the registry does not define', () => {
    const flow: FlowDefinition = {
      id: 'f',
      order: ['a'],
      steps: { a: { when: { $ref: 'isVip' } } },
    };
    expect(problems(flow, {})).toContain('steps.a.when: no resolver is registered as "isVip"');
    expect(validateFlow(flow, { isVip: () => true })).toEqual([]);
  });

  it('does not check resolvers when no registry is supplied', () => {
    const flow: FlowDefinition = {
      id: 'f',
      order: ['a'],
      steps: { a: { when: { $ref: 'isVip' } } },
    };
    expect(validateFlow(flow)).toEqual([]);
  });

  it('catches a function anywhere in the flow', () => {
    // This is the check the whole design rests on: a function means
    // JSON.stringify would drop it and the flow would stop round-tripping.
    const flow = {
      id: 'f',
      order: ['a'],
      steps: { a: { when: (() => true) as never } },
    } as unknown as FlowDefinition;

    expect(problems(flow)[0]).toBe('steps.a.when: steps.a.when is a function');
  });

  it('catches a clearOnLeave that is neither true nor a list of paths', () => {
    const withClear = (clearOnLeave: unknown): FlowDefinition => ({
      ...good,
      steps: { ...good.steps, company: { clearOnLeave: clearOnLeave as never } },
    });
    for (const bad of ['company', false, ['vat', 1]]) {
      expect(problems(withClear(bad))).toEqual([
        'steps.company.clearOnLeave: clearOnLeave of step "company" is neither true nor a list of data paths',
      ]);
    }
    expect(problems(withClear(true))).toEqual([]);
    expect(problems(withClear(['vat']))).toEqual([]);
  });

  it('catches order problems', () => {
    expect(problems({ id: 'f', order: ['a', 'ghost'], steps: { a: {} } })).toContain(
      'order: order names "ghost", which is not a step'
    );
    expect(
      problems({ id: 'f', order: ['a', 'a', 'b', 'b', 'a'], steps: { a: {}, b: {} } })
    ).toEqual(['order: order names "a" more than once', 'order: order names "b" more than once']);
    expect(problems({ id: 'f', order: ['a'], steps: { a: {}, b: {} } })).toContain(
      'steps.b: step "b" is not in order'
    );
  });

  it('warns when both branching mechanisms are used on one step', () => {
    const flow: FlowDefinition = {
      id: 'f',
      order: ['a', 'b'],
      steps: { a: { when: true, on: { next: 'b' } }, b: {} },
    };
    expect(problems(flow)[0]).toBe('steps.a: step "a" has both when and on.next');
  });

  it('reports an empty flow', () => {
    expect(problems({ id: 'f', steps: {} })).toContain('steps: flow "f" has no steps');
  });
});

describe('validateFlow, on a repeat group', () => {
  const repeat = { over: { $get: 'data.passengers' }, keyBy: 'id' } as const;

  const grouped = (extra: Record<string, unknown> = {}): FlowDefinition => ({
    id: 'booking',
    version: 3,
    order: ['trip', 'review'],
    steps: {
      trip: { flow: 'passenger', repeat, ...extra },
      review: {},
    },
  });

  it('asks a repeat group to say when it is there at all', () => {
    // Reachability reads `when`, never `over`, so an unguarded repeat over an
    // empty list draws a breadcrumb for a section with nothing in it.
    expect(problems(grouped())).toContain('steps.trip: repeat group "trip" has no when');
  });

  it('is satisfied by the guard it suggests', () => {
    expect(
      validateFlow(grouped({ when: { $not: { $empty: { $get: 'data.passengers' } } } }))
    ).toEqual([]);
  });

  it('says nothing about a plain group, which has no items to be empty of', () => {
    const flow: FlowDefinition = {
      id: 'booking',
      order: ['trip'],
      steps: { trip: { flow: 'passenger' } },
    };
    expect(validateFlow(flow)).toEqual([]);
  });

  it('asks a flow with a repeat group to stamp a version', () => {
    const flow = grouped({ when: { $not: { $empty: { $get: 'data.passengers' } } } });
    expect(problems({ ...flow, version: undefined })).toEqual([
      'version: flow "booking" has a repeat group but no version',
    ]);
  });

  it('leaves an unversioned flat flow alone', () => {
    expect(validateFlow(good)).toEqual([]);
  });

  // An inline sub-flow definition is carried inside this flow, so a repeat two
  // levels down is still this flow's to stamp: `toSnapshot` writes the root's
  // version and no other.
  const nested = (version?: number): FlowDefinition => ({
    id: 'booking',
    ...(version === undefined ? {} : { version }),
    order: ['trip'],
    steps: {
      trip: {
        flow: {
          id: 'leg',
          order: ['seats'],
          steps: {
            seats: {
              flow: 'seat',
              when: { $not: { $empty: { $get: 'data.passengers' } } },
              repeat,
            },
          },
        },
      },
    },
  });

  it('asks for a version when the repeat is two levels down an inline sub-flow', () => {
    expect(problems(nested())).toEqual([
      'version: flow "booking" has a repeat group but no version',
    ]);
  });

  it('is satisfied once the root that carries it is versioned', () => {
    expect(validateFlow(nested(4))).toEqual([]);
  });

  it('names the nesting when the buried repeat has no when', () => {
    const bare = nested(4);
    const leg = (bare.steps.trip as { flow: FlowDefinition }).flow;
    const unguarded: FlowDefinition = {
      ...bare,
      steps: { trip: { flow: { ...leg, steps: { seats: { flow: 'seat', repeat } } } } },
    };

    expect(problems(unguarded)[0]).toBe(
      'steps.trip.flow.steps.seats: repeat group "seats" has no when'
    );
  });

  it('checks the steps of an inline sub-flow the way it checks the root', () => {
    const flow: FlowDefinition = {
      id: 'booking',
      order: ['trip'],
      steps: {
        trip: {
          flow: {
            id: 'leg',
            order: ['from', 'to'],
            steps: {
              from: {
                when: { $get: 'data.go' },
                on: { next: 'nowhere', back: 'trip' },
                clearOnLeave: 'data.x' as unknown as true,
              },
              to: { on: { next: '@end' } },
            },
          },
        },
      },
    };
    expect(problems(flow)).toEqual([
      'steps.trip.flow.steps.from.on.next: unknown target "nowhere"',
      'steps.trip.flow.steps.from.on.back: unknown target "trip"',
      'steps.trip.flow.steps.from.clearOnLeave: clearOnLeave of step "from" is neither true nor a list of data paths',
      'steps.trip.flow.steps.from: step "from" has both when and on.next',
    ]);
  });

  it('checks the order of an inline sub-flow, which next() walks on its own', () => {
    const flow: FlowDefinition = {
      id: 'booking',
      order: ['trip'],
      steps: {
        trip: {
          flow: { id: 'leg', order: ['ghost', 'seat', 'seat'], steps: { seat: {}, meal: {} } },
        },
        empty: { flow: { id: 'none', steps: {} } },
      },
    };
    expect(problems(flow)).toEqual([
      'steps.empty: step "empty" is not in order',
      'steps.trip.flow.order: order names "ghost", which is not a step',
      'steps.trip.flow.steps.meal: step "meal" is not in order',
      'steps.trip.flow.order: order names "seat" more than once',
      'steps.empty.flow.steps: flow "none" has no steps',
    ]);
  });

  it('cannot see inside a sub-flow named by reference, and does not pretend to', () => {
    // The definition behind a string lives wherever it was written, and is
    // validated there. Reporting this flow for it would be a guess.
    const byRef: FlowDefinition = {
      id: 'booking',
      order: ['trip'],
      steps: { trip: { flow: 'leg' } },
    };
    expect(validateFlow(byRef)).toEqual([]);
  });
});

describe('validateFlow, on an operator the evaluator does not have', () => {
  const at = (steps: FlowDefinition['steps']): string[] =>
    validateFlow({ id: 'f', steps })
      .filter((p) => p.code === 'expr-unknown-operator')
      .map(what);

  it('reports a typo in a when, at the object that would throw', () => {
    expect(at({ a: { when: { $equals: [1, 1] } as never } })).toEqual([
      'steps.a.when: "$equals" is not an operator',
    ]);
  });

  it('follows operators down to a nested argument', () => {
    const when = { $and: [true, { $not: { eq: [1, 1] } }] } as never;
    expect(at({ a: { when } })).toEqual(['steps.a.when.$and[1].$not: "eq" is not an operator']);
  });

  it('reads every place an expression is evaluated', () => {
    const bad = { $regex: 'x' } as never;
    expect(
      at({
        a: {
          guards: { enter: bad, exit: bad },
          on: { next: [{ to: 'b', when: bad }, 'b'], back: { to: 'b', when: bad } },
        },
        b: { flow: 'leg', repeat: { over: bad }, input: { who: bad } },
      })
    ).toEqual([
      'steps.a.guards.enter: "$regex" is not an operator',
      'steps.a.guards.exit: "$regex" is not an operator',
      'steps.a.on.next[0].when: "$regex" is not an operator',
      'steps.a.on.back.when: "$regex" is not an operator',
      'steps.b.repeat.over: "$regex" is not an operator',
      'steps.b.input.who: "$regex" is not an operator',
    ]);
  });

  it('reads the when of a single transition, not only of a list', () => {
    const bad = { $regex: 'x' } as never;
    expect(at({ a: { on: { next: { to: 'b', when: bad } } }, b: {} })).toEqual([
      'steps.a.on.next.when: "$regex" is not an operator',
    ]);
  });

  it('reads the expressions of an inline sub-flow', () => {
    const leg: FlowDefinition = { id: 'leg', steps: { seat: { when: { $exists: 'x' } as never } } };
    expect(at({ a: { flow: leg } })).toEqual([
      'steps.a.flow.steps.seat.when: "$exists" is not an operator',
    ]);
  });

  it('follows every operator of an object that has several, since the evaluators disagree on which runs', () => {
    // `evaluate` tests `$empty` before `$eq`, and would descend into the typo.
    const when = { $eq: [1, 1], $empty: { typo: true } } as never;
    expect(at({ a: { when } })).toEqual(['steps.a.when.$empty: "typo" is not an operator']);
  });

  it('reports an empty object, which names no operation at all', () => {
    expect(at({ a: { when: {} as never } })).toEqual(['steps.a.when: "{}" is not an operator']);
  });

  it('says what the evaluator says when it throws on the same object', () => {
    for (const e of [{}, { $equals: [1, 1] }]) {
      const [problem] = validateFlow({ id: 'f', steps: { a: { when: e as never } } });
      expect(() => evaluate(e as never, { data: {}, ctx: {} })).toThrow(problem?.message);
    }
  });

  it('accepts every operator the evaluator has, and a key beside one', () => {
    const when = {
      $and: [
        { $eq: [{ $get: 'data.a' }, 1] },
        { $ne: [1, 2], note: 'ignored, as the evaluator ignores it' },
        { $or: [{ $gt: [2, 1] }, { $gte: [2, 2] }, { $lt: [1, 2] }, { $lte: [1, 1] }] },
        { $in: ['a', 'abc'] },
        { $not: { $empty: { $get: 'data.list' } } },
      ],
    } as never;
    expect(at({ a: { when } })).toEqual([]);
  });

  it('does not read the args of a $ref, or the host ui, as expressions', () => {
    expect(
      at({
        a: {
          when: { $ref: 'isVip', args: { $anything: true } },
          ui: { $schema: 'https://json-schema.org/draft/2020-12/schema' },
        },
      })
    ).toEqual([]);
  });
});

describe('validateFlow codes', () => {
  // One flow per code, each with exactly that problem. A code is the slug of
  // the page that explains it, so each one must have that page.
  const ROOT = join(__dirname, '..', '..', '..', '..');
  const SITE = 'https://zizzx.github.io/wizzard-packages/errors/';
  const fixtures: Record<string, [FlowDefinition, Record<string, unknown>?]> = {
    'flow-no-steps': [{ id: 'f', steps: {} }],
    'order-unknown-step': [{ id: 'f', order: ['a', 'ghost'], steps: { a: {} } }],
    'step-not-in-order': [{ id: 'f', order: ['a'], steps: { a: {}, b: { when: false } } }],
    'order-duplicate': [{ id: 'f', order: ['a', 'a'], steps: { a: {} } }],
    'get-unknown-root': [{ id: 'f', steps: { a: { when: { $get: 'user.name' } } } }],
    'resolver-not-registered': [{ id: 'f', steps: { a: { when: { $ref: 'isVip' } } } }, {}],
    'flow-not-serializable': [
      { id: 'f', steps: { a: { when: (() => true) as never } } } as unknown as FlowDefinition,
    ],
    'target-unknown-step': [{ id: 'f', steps: { a: { on: { back: 'nowhere' } } } }],
    'clear-on-leave-invalid': [{ id: 'f', steps: { a: { clearOnLeave: 'a' as never } } }],
    'when-with-next': [{ id: 'f', steps: { a: { when: true, on: { next: '@end' } } } }],
    'repeat-without-when': [
      { id: 'f', version: 1, steps: { a: { flow: 'leg', repeat: { over: [] } } } },
    ],
    'repeat-without-version': [
      { id: 'f', steps: { a: { flow: 'leg', when: true, repeat: { over: [] } } } },
    ],
    'expr-unknown-operator': [{ id: 'f', steps: { a: { when: { $equals: [1, 1] } as never } } }],
    'expr-too-deep': [
      {
        id: 'f',
        steps: {
          a: { when: JSON.parse('['.repeat(MAX_EXPR_DEPTH + 1) + ']'.repeat(MAX_EXPR_DEPTH + 1)) },
        },
      },
    ],
  };

  for (const [code, [flow, registry]] of Object.entries(fixtures)) {
    it(code, () => {
      const found = validateFlow(flow, registry);
      expect(found.map((p) => p.code)).toEqual([code]);
      const [problem] = found as [FlowProblem];
      expect(problem.url).toBe(SITE + code);
      expect(problem.fix).toBeTruthy();
      // The template every failure uses, thrown or returned.
      expect(problem.message.startsWith('[wizzard] ')).toBe(true);
      expect(problem.message).toContain(`. ${problem.fix ?? ''}. `);
      expect(problem.message.endsWith(` ${SITE}${code}`)).toBe(true);
      const page = join(ROOT, 'site', 'src', 'content', 'docs', 'errors', `${code}.md`);
      expect(existsSync(page), `${code} has no page`).toBe(true);
    });
  }
});

describe('validateFlow and a deeply nested expression', () => {
  const nested = (levels: number): Expr => {
    let e: Expr = true;
    for (let i = 0; i < levels; i++) e = i % 3 === 2 ? [e] : { $not: e };
    return e;
  };
  const flowWith = (when: Expr, ui?: unknown): FlowDefinition => ({
    id: 'f',
    steps: { a: { when, ...(ui === undefined ? {} : { ui }) } as never },
  });

  // A leaf wrapped in `$not`s, so the leaf's own shape lands on every level
  // around the limit: an operand list of literals, a literal list, an empty one.
  const leaves: Expr[] = [
    true,
    [1],
    { $and: [true] },
    { $or: [] },
    { $eq: [1, 1] },
    { $in: [1, [1]] },
    { $not: [true] },
  ];
  const wrapped = (leaf: Expr, levels: number): Expr => {
    let e = leaf;
    for (let i = 0; i < levels; i++) e = { $not: e };
    return e;
  };

  it('reports where the evaluator refuses, counting levels the same way', () => {
    const shapes = [
      ...Array.from({ length: 7 }, (_, i) => nested(MAX_EXPR_DEPTH - 3 + i)),
      ...leaves.flatMap((leaf) =>
        Array.from({ length: 5 }, (_, i) => wrapped(leaf, MAX_EXPR_DEPTH - 4 + i))
      ),
    ];
    for (const when of shapes) {
      let refused = false;
      try {
        evaluate(when, { data: {}, ctx: {} });
      } catch {
        refused = true;
      }
      const codes = validateFlow(flowWith(when)).map((p) => p.code);
      expect(codes, JSON.stringify(when).slice(-40)).toEqual(refused ? ['expr-too-deep'] : []);
    }
  });

  it('returns a problem for a pasted document instead of overflowing the stack', () => {
    const found = validateFlow(flowWith(nested(100_000)));
    expect(found.map((p) => p.code)).toEqual(['expr-too-deep']);
    expect(found[0]?.path.startsWith('steps.a.when')).toBe(true);
  });

  it('finds a function nested past the limit in ui, and does not overflow', () => {
    let ui: unknown = { render: () => null };
    for (let i = 0; i < 100_000; i++) ui = i % 2 ? { child: ui } : [ui];
    const found = validateFlow(flowWith(true, ui));
    expect(found.map((p) => p.code)).toEqual(['flow-not-serializable']);
    expect(found[0]?.path.endsWith('.render')).toBe(true);
  });

  it('reports a cycle instead of looping or overflowing', () => {
    const ui: { self?: unknown; shared: unknown[]; again: unknown[] } = { shared: [], again: [] };
    ui.self = ui;
    ui.again = ui.shared;
    expect(problems(flowWith(true, ui))).toEqual([
      'steps.a.ui.self: steps.a.ui.self contains itself',
    ]);
  });

  it('reports a cycle in an expression once, not also as too deep', () => {
    const when: { $not?: unknown } = {};
    when.$not = when;
    expect(validateFlow(flowWith(when as Expr)).map(what)).toEqual([
      'steps.a.when.$not: steps.a.when.$not contains itself',
    ]);
  });
});

describe('assertFlow', () => {
  it('says nothing about a valid flow', () => {
    expect(() => {
      assertFlow(good);
    }).not.toThrow();
  });

  it('lists every problem at once rather than one per run', () => {
    const flow: FlowDefinition = {
      id: 'broken',
      order: ['a', 'ghost'],
      steps: { a: { on: { next: 'nowhere' } } },
    };
    expect(() => {
      assertFlow(flow);
    }).toThrow(/order: \[wizzard\] order names "ghost"[\s\S]*unknown target "nowhere"/);
  });
});

describe('round-tripping', () => {
  it('survives JSON.stringify unchanged', () => {
    expect(JSON.parse(JSON.stringify(good))).toEqual(good);
  });
});
