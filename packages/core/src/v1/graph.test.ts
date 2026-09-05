import { describe, expect, it } from 'vitest';

import type { Scope } from './expr';
import { END, type FlowDefinition } from './flow';
import { buildGraph, type FlowGraph } from './graph';
import { resolveNext } from './resolve';
import { initialState, type WizardState } from './state';

const flow: FlowDefinition = {
  id: 'booking',
  order: ['trip', 'company', 'payment', 'review'],
  steps: {
    trip: { on: { back: 'auto' } },
    company: { when: { $eq: [{ $get: 'data.trip.payer' }, 'business'] } },
    payment: {
      on: {
        next: [
          { to: 'review', when: { $eq: [{ $get: 'data.payment.ok' }, true] } },
          'retry',
          { to: END },
        ],
      },
    },
    review: { on: { back: 'payment' } },
    // Deliberately outside `order`: reachable only through payment's branch.
    retry: { label: 'Try another card' },
  },
};

const ids = (g: FlowGraph): string[] => g.nodes.map((n) => n.id);
const node = (g: FlowGraph, id: string) => g.nodes.find((n) => n.id === id);
const from = (g: FlowGraph, id: string) => g.edges.filter((e) => e.from === id);

describe('nodes', () => {
  it('draws every step, including one left out of `order`', () => {
    // The whole point: `order` is the default path, not the set of steps. A
    // graph built from `order` would hide the branch a reader came to find.
    expect(ids(buildGraph(flow))).toEqual(
      expect.arrayContaining(['trip', 'company', 'payment', 'review', 'retry'])
    );
  });

  it('marks the off-order step, so the renderer can say why nothing falls into it', () => {
    expect(node(buildGraph(flow), 'retry')?.offOrder).toBe(true);
    expect(node(buildGraph(flow), 'trip')?.offOrder).toBeUndefined();
  });

  it('carries `when` verbatim for the renderer to label', () => {
    expect(node(buildGraph(flow), 'company')?.when).toEqual({
      $eq: [{ $get: 'data.trip.payer' }, 'business'],
    });
  });

  it('falls back to the insertion order of `steps` when `order` is absent', () => {
    const g = buildGraph({ id: 'f', steps: { a: {}, b: {} } });
    expect(ids(g)).toEqual(['a', 'b', END]);
    expect(from(g, 'a')).toEqual([{ from: 'a', to: 'b', kind: 'order' }]);
    // Nothing is off-order when there is no order to be off.
    expect(node(g, 'a')?.offOrder).toBeUndefined();
  });

  it('draws a deferred step as a stub', () => {
    const g = buildGraph({ id: 'f', steps: { a: { deferred: true } } });
    expect(node(g, 'a')?.deferred).toBe(true);
  });
});

describe('fall-through edges', () => {
  it('connects consecutive steps that declare no `on.next`', () => {
    expect(from(buildGraph(flow), 'trip')).toContainEqual({
      from: 'trip',
      to: 'company',
      kind: 'order',
      when: { $eq: [{ $get: 'data.trip.payer' }, 'business'] },
    });
  });

  it('keeps the skip edge past a conditional step', () => {
    // company may be false at run time, in which case trip goes straight to
    // payment. One edge per pair would hide exactly what `when` is for.
    const g = buildGraph(flow);
    expect(from(g, 'trip').map((e) => e.to)).toEqual(['company', 'payment']);
    expect(from(g, 'trip')[0]?.when).toBeDefined();
    expect(from(g, 'trip')[1]?.when).toBeUndefined();
  });

  it('stops at the first unconditional step', () => {
    expect(from(buildGraph(flow), 'company').map((e) => e.to)).toEqual(['payment']);
  });

  it('yields to an explicit `on.next`', () => {
    expect(from(buildGraph(flow), 'payment').every((e) => e.kind !== 'order')).toBe(true);
  });
});

describe('explicit edges', () => {
  it('draws one edge per target in an `on.next` array, labelled by its guard', () => {
    const next = from(buildGraph(flow), 'payment').filter((e) => e.kind === 'next');
    expect(next.map((e) => e.to)).toEqual(['review', 'retry', END]);
    expect(next[0]?.when).toEqual({ $eq: [{ $get: 'data.payment.ok' }, true] });
    expect(next[1]?.when).toBeUndefined();
  });

  it('draws an explicit back target but not `auto`', () => {
    const g = buildGraph(flow);
    expect(from(g, 'review')).toContainEqual({ from: 'review', to: 'payment', kind: 'back' });
    // `auto` is resolved against the state of the moment; there is no fixed
    // target, and a guessed arrow would be worse than none.
    expect(from(g, 'trip').some((e) => e.kind === 'back')).toBe(false);
  });

  it('adds one terminal node, only when something reaches it', () => {
    expect(node(buildGraph(flow), END)?.kind).toBe('end');
    expect(ids(buildGraph(flow)).filter((id) => id === END)).toHaveLength(1);
    // A flow whose every step routes explicitly, in a loop, never ends.
    const cycle = buildGraph({
      id: 'f',
      steps: { a: { on: { next: 'b' } }, b: { on: { next: 'a' } } },
    });
    expect(node(cycle, END)).toBeUndefined();
  });

  it('keeps a target that names nothing, and flags it', () => {
    const g = buildGraph({ id: 'f', steps: { a: { on: { next: 'ghost' } } } });
    expect(from(g, 'a')).toEqual([{ from: 'a', to: 'ghost', kind: 'next', dangling: true }]);
  });
});

describe('the synthesized end', () => {
  it('ends the flow after the last ordered step', () => {
    expect(from(buildGraph(flow), 'review')).toContainEqual({
      from: 'review',
      to: END,
      kind: 'order',
    });
  });

  it('ends the flow from a step that is not in `order` at all', () => {
    // resolveNext returns END when indexOf(current) is -1. Drawing nothing
    // here left retry looking like a dead end on a graph whose job is to
    // show where a flow goes.
    expect(from(buildGraph(flow), 'retry')).toEqual([{ from: 'retry', to: END, kind: 'order' }]);
  });

  it('ends the flow when every remaining step is conditional', () => {
    // b and c can both be false, so a really can be the last step run.
    const g = buildGraph({
      id: 'f',
      order: ['a', 'b', 'c'],
      steps: { a: {}, b: { when: { $get: 'data.b' } }, c: { when: { $get: 'data.c' } } },
    });
    expect(from(g, 'a').map((e) => e.to)).toEqual(['b', 'c', END]);
  });

  it('leaves the end edge unlabelled rather than synthesizing a negation', () => {
    const end = from(buildGraph(flow), 'review').find((e) => e.to === END);
    expect(end?.when).toBeUndefined();
  });

  it('does not end a step that routes explicitly', () => {
    expect(from(buildGraph(flow), 'payment').some((e) => e.kind === 'order')).toBe(false);
  });

  it('agrees with the resolver about where every step can go', () => {
    // The claim this whole module rests on. Case-by-case tests say the builder
    // does what was written down; this says what was written down matches the
    // engine -- which is how the missing end edges were found in the first
    // place.
    const g = buildGraph(flow);
    const at = (step: string): WizardState => ({
      ...initialState(),
      stack: [{ flow: 'booking', step }],
    });

    for (const payer of ['business', 'private']) {
      for (const ok of [true, false]) {
        const scope: Scope = { data: { trip: { payer }, payment: { ok } }, ctx: {} };
        for (const step of Object.keys(flow.steps)) {
          const target = resolveNext(flow, at(step), scope);
          expect(from(g, step).map((e) => e.to)).toContain(target);
        }
      }
    }
  });
});

describe('groups', () => {
  const child: FlowDefinition = { id: 'address', steps: { line1: {}, city: {} } };

  it('draws an inline sub-flow in place', () => {
    const g = buildGraph({ id: 'f', steps: { addr: { flow: child } } });
    const group = node(g, 'addr')?.group;
    expect(node(g, 'addr')?.kind).toBe('group');
    expect(group?.flowId).toBe('address');
    expect(group?.graph && ids(group.graph)).toEqual(['line1', 'city', END]);
  });

  it('resolves a sub-flow named by id against the registry', () => {
    const g = buildGraph({ id: 'f', steps: { addr: { flow: 'address' } } }, { address: child });
    const nested = node(g, 'addr')?.group?.graph;
    expect(nested && ids(nested)).toEqual(['line1', 'city', END]);
  });

  it('says so when a reference cannot be resolved, rather than drawing a plain box', () => {
    const g = buildGraph({ id: 'f', steps: { addr: { flow: 'address' } } });
    expect(node(g, 'addr')?.group).toEqual({ flowId: 'address', opaque: 'unresolved' });
  });

  it('stops at a sub-flow that references an ancestor instead of recursing forever', () => {
    const looper: FlowDefinition = { id: 'loop', steps: { again: { flow: 'loop' } } };
    const g = buildGraph(looper, { loop: looper });
    expect(node(g, 'again')?.group).toEqual({ flowId: 'loop', opaque: 'cycle' });
  });

  it('stops at a depth cap, so pasted JSON cannot walk the stack down', () => {
    // Thirty-three distinct sub-flows: no cycle to catch it, and a flow can
    // arrive from a paste box.
    const deep: Record<string, FlowDefinition> = {};
    for (let i = 0; i < 40; i++) {
      deep[`f${i}`] = { id: `f${i}`, steps: { down: { flow: `f${i + 1}` } } };
    }
    let g = buildGraph(deep.f0 as FlowDefinition, deep);
    let depth = 0;
    while (g.nodes[0]?.group?.graph) {
      g = g.nodes[0].group.graph;
      depth++;
    }
    expect(g.nodes[0]?.group?.opaque).toBe('too-deep');
    expect(depth).toBeLessThan(40);
  });

  it('carries the repeat expression, which the definition has and the run time varies', () => {
    const g = buildGraph({
      id: 'f',
      steps: { each: { flow: child, repeat: { over: { $get: 'data.items' } } } },
    });
    expect(node(g, 'each')?.group?.repeat).toEqual({ $get: 'data.items' });
  });
});

describe('the graph is data', () => {
  it('round-trips through JSON', () => {
    // The architecture rests on this: a flow is JSON, so its graph is too, and
    // it can be posted, cached or diffed like any other value.
    const g = buildGraph(flow);
    expect(JSON.parse(JSON.stringify(g))).toEqual(g);
  });

  it('carries no positions', () => {
    // Layout belongs to the renderer. If a coordinate ever lands here, a layout
    // library is one commit away from a published package.
    const text = JSON.stringify(buildGraph(flow));
    for (const key of ['"x"', '"y"', 'width', 'height', 'position']) {
      expect(text).not.toContain(key);
    }
  });
});
