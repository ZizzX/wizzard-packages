import { describe, expect, it } from 'vitest';

import { defineFlow, step } from './define';
import type { FlowDefinition } from './flow';
import { assertFlow, validateFlow } from './validate-flow';

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

const problems = (flow: FlowDefinition, registry?: Record<string, unknown>): string[] =>
  validateFlow(flow, registry).map((p) => `${p.path}: ${p.message}`);

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
    expect(problems(flow)).toContain('steps.a.on.next: unknown target: nowhere');
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
    expect(problems(flow)[0]).toMatch(/\$get must start with data, ctx, loop, step/);
  });

  it('catches a resolver the registry does not define', () => {
    const flow: FlowDefinition = {
      id: 'f',
      order: ['a'],
      steps: { a: { when: { $ref: 'isVip' } } },
    };
    expect(problems(flow, {})).toContain('steps.a.when: unknown resolver: isVip');
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

    expect(problems(flow)[0]).toMatch(/cannot be serialized/);
  });

  it('catches a clearOnLeave that is neither true nor a list of paths', () => {
    const withClear = (clearOnLeave: unknown): FlowDefinition => ({
      ...good,
      steps: { ...good.steps, company: { clearOnLeave: clearOnLeave as never } },
    });
    for (const bad of ['company', false, ['vat', 1]]) {
      expect(problems(withClear(bad))).toEqual([
        'steps.company.clearOnLeave: must be true or a list of data paths',
      ]);
    }
    expect(problems(withClear(true))).toEqual([]);
    expect(problems(withClear(['vat']))).toEqual([]);
  });

  it('catches order problems', () => {
    expect(problems({ id: 'f', order: ['a', 'ghost'], steps: { a: {} } })).toContain(
      'order: unknown step: ghost'
    );
    expect(problems({ id: 'f', order: ['a', 'a'], steps: { a: {} } })).toContain(
      'order: contains a duplicate'
    );
    expect(problems({ id: 'f', order: ['a'], steps: { a: {}, b: {} } })).toContain(
      'steps.b: not in order, so it is reachable only via on.next'
    );
  });

  it('warns when both branching mechanisms are used on one step', () => {
    const flow: FlowDefinition = {
      id: 'f',
      order: ['a', 'b'],
      steps: { a: { when: true, on: { next: 'b' } }, b: {} },
    };
    expect(problems(flow)[0]).toMatch(/on\.next wins, and when is ignored/);
  });

  it('reports an empty flow', () => {
    expect(problems({ id: 'f', steps: {} })).toContain('steps: flow has no steps');
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
    expect(problems(grouped())).toContain(
      'steps.trip: is a repeat group with no when — an empty over is walked past, but the group ' +
        'still draws a breadcrumb and counts towards progress; guard it with ' +
        '{ $not: { $empty: <the same expression as over> } }'
    );
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
      'version: flow has a repeat group but no version, so a snapshot taken inside it cannot be ' +
        'refused when keyBy changes — stamp a version and bump it with the shape',
    ]);
  });

  it('leaves an unversioned flat flow alone', () => {
    expect(validateFlow(good)).toEqual([]);
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
    }).toThrow(/order: unknown step: ghost[\s\S]*unknown target: nowhere/);
  });
});

describe('round-tripping', () => {
  it('survives JSON.stringify unchanged', () => {
    expect(JSON.parse(JSON.stringify(good))).toEqual(good);
  });
});
