import { buildGraph } from '@wizzard-packages/core/graph';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { denseFlow, flowA, flowB, flowC, subFlowsC } from '../../../../contract/fixtures';
import { layoutGraph, NODE_H, NODE_W, REPEAT_H } from './layout';

import type { FlowGraph, GraphEdge } from '@wizzard-packages/core/graph';
import type { Positioned, PositionedGraph } from './layout';

const overlaps = (a: Positioned, b: Positioned): boolean =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/** Random graphs: nodes s0..sN, forward/back/order edges anywhere, a few dangling. */
const graphs = fc
  .integer({ min: 0, max: 60 })
  .chain((n) => {
    const ids = Array.from({ length: n }, (_, i) => `s${i}`);
    const edge = fc.record({
      from: fc.constantFrom(...(ids.length ? ids : ['s0'])),
      to: fc.constantFrom(...(ids.length ? ids : ['s0']), '@end', 'nowhere'),
      kind: fc.constantFrom<GraphEdge['kind']>('next', 'order', 'back'),
    });
    return fc.record({
      nodes: fc.constant(ids),
      edges: fc.array(edge, { maxLength: n * 3 }),
    });
  })
  .map(({ nodes, edges }): FlowGraph => {
    const known = new Set(nodes);
    const list: GraphEdge[] = edges
      .filter((e) => known.has(e.from))
      .map((e) => ({ ...e, ...(known.has(e.to) || e.to === '@end' ? {} : { dangling: true }) }));
    const end = list.some((e) => e.to === '@end');
    return {
      nodes: [
        ...nodes.map((id) => ({ id, kind: 'step' as const })),
        ...(end ? [{ id: '@end', kind: 'end' as const }] : []),
      ],
      edges: list,
    };
  });

describe('layoutGraph', () => {
  it('lays out the three reference flows with one rectangle per node', () => {
    for (const [flow, subFlows] of [
      [flowA, undefined],
      [flowB, undefined],
      [flowC, subFlowsC],
    ] as const) {
      const graph = buildGraph(flow, subFlows);
      const laid = layoutGraph(graph);
      expect(laid.nodes.filter((n) => !n.ghost).map((n) => n.id)).toEqual(
        graph.nodes.map((n) => n.id)
      );
      expect(laid.edges).toHaveLength(graph.edges.length);
    }
  });

  it('sizes a repeat group taller and every other node 160 by 40', () => {
    const laid = layoutGraph(buildGraph(flowC, subFlowsC));
    const byId = Object.fromEntries(laid.nodes.map((n) => [n.id, n]));
    expect(byId.passengers).toMatchObject({ w: NODE_W, h: REPEAT_H });
    expect(byId.review).toMatchObject({ w: NODE_W, h: NODE_H });
  });

  it('puts END on the last layer and a dangling target on a ghost one layer down', () => {
    const graph: FlowGraph = {
      nodes: [
        { id: 'a', kind: 'step' },
        { id: 'b', kind: 'step' },
        { id: '@end', kind: 'end' },
      ],
      edges: [
        { from: 'a', to: '@end', kind: 'next' },
        { from: 'a', to: 'b', kind: 'order' },
        { from: 'b', to: 'missing', kind: 'next', dangling: true },
      ],
    };
    const laid = layoutGraph(graph);
    const y = Object.fromEntries(laid.nodes.map((n) => [n.id, n.y]));
    expect(y['@end']).toBe(y.b);
    expect(laid.nodes.find((n) => n.id === 'missing')).toMatchObject({ ghost: true });
    expect(y.missing).toBeGreaterThan(y.b);
    expect(laid.edges.find((e) => e.to === 'missing')?.points).toHaveLength(2);
  });

  it('keeps a dangling back edge: its target is a ghost and the edge is drawn', () => {
    const graph: FlowGraph = {
      nodes: [
        { id: 'a', kind: 'step' },
        { id: 'b', kind: 'step' },
      ],
      edges: [
        { from: 'a', to: 'b', kind: 'next' },
        { from: 'b', to: 'gone', kind: 'back', dangling: true },
      ],
    };
    const laid = layoutGraph(graph);
    const y = Object.fromEntries(laid.nodes.map((n) => [n.id, n.y]));
    expect(laid.nodes.find((n) => n.id === 'gone')).toMatchObject({ ghost: true });
    expect(y.gone).toBeGreaterThan(y.b);
    expect(laid.edges.find((e) => e.to === 'gone')).toMatchObject({ kind: 'back', dangling: true });
  });

  it('property: no two rectangles overlap and every edge endpoint is laid out', () => {
    fc.assert(
      fc.property(graphs, (graph) => {
        const laid = layoutGraph(graph, {});
        const ids = new Set(laid.nodes.map((n) => n.id));
        for (let i = 0; i < laid.nodes.length; i++) {
          for (let j = i + 1; j < laid.nodes.length; j++) {
            const a = laid.nodes[i] as Positioned;
            const b = laid.nodes[j] as Positioned;
            if (overlaps(a, b)) return false;
          }
        }
        return laid.edges.every((e) => ids.has(e.from) && ids.has(e.to));
      })
    );
  });

  it('property: on an acyclic graph every forward edge points down', () => {
    const dags = graphs.map((g) => ({
      ...g,
      edges: g.edges.filter((e) => {
        if (e.kind === 'back' || e.to === '@end' || e.dangling) return true;
        return Number(e.from.slice(1)) < Number(e.to.slice(1));
      }),
    }));
    fc.assert(
      fc.property(dags, (graph) => {
        const laid = layoutGraph(graph, {});
        const y = new Map(laid.nodes.map((n) => [n.id, n.y]));
        return laid.edges
          .filter((e) => e.kind !== 'back')
          .every((e) => (y.get(e.to) ?? 0) > (y.get(e.from) ?? 0));
      })
    );
  });

  it('property: terminates on cycles, is deterministic, and back edges move no flow node', () => {
    // A dangling back edge adds a ghost, so only the flow's own nodes are compared.
    const own = (laid: PositionedGraph) => JSON.stringify(laid.nodes.filter((n) => !n.ghost));
    fc.assert(
      fc.property(graphs, (graph) => {
        const a = layoutGraph(graph, {});
        const b = layoutGraph({ ...graph, edges: [...graph.edges] }, {});
        const without = layoutGraph(
          { ...graph, edges: graph.edges.filter((e) => e.kind !== 'back') },
          {}
        );
        return JSON.stringify(a) === JSON.stringify(b) && own(a) === own(without);
      })
    );
  });

  it('memoises by graph identity for the default options', () => {
    const graph = buildGraph(flowA);
    expect(layoutGraph(graph)).toBe(layoutGraph(graph));
    expect(layoutGraph(buildGraph(flowA))).not.toBe(layoutGraph(graph));
  });

  it('lays out the dense fixture (about twenty thousand edges) under 100 ms', () => {
    const graph = buildGraph(denseFlow(200));
    expect(graph.edges.length).toBeGreaterThan(19_000);
    const times: number[] = [];
    for (let i = 0; i < 3; i++) {
      const started = performance.now();
      layoutGraph({ ...graph });
      times.push(performance.now() - started);
    }
    times.sort((a, b) => a - b);
    expect(times[1]).toBeLessThan(100);
  });

  it('ratchet: the reference flows draw no more crossings than today', () => {
    const crossings = (graph: FlowGraph): number => {
      const laid = layoutGraph(graph, {});
      const segs = laid.edges
        .filter((e) => e.kind !== 'back')
        .map((e) => [
          e.points[0] as readonly [number, number],
          e.points[1] as readonly [number, number],
        ]);
      let count = 0;
      for (let i = 0; i < segs.length; i++) {
        for (let j = i + 1; j < segs.length; j++) {
          const [[ax, ay], [bx, by]] = segs[i] as [
            readonly [number, number],
            readonly [number, number],
          ];
          const [[cx, cy], [dx, dy]] = segs[j] as [
            readonly [number, number],
            readonly [number, number],
          ];
          if (ay !== cy || by !== dy) continue; // same layer pair only
          if ((ax - cx) * (bx - dx) < 0) count += 1;
        }
      }
      return count;
    };
    expect(crossings(buildGraph(flowA))).toBe(0);
    expect(crossings(buildGraph(flowB))).toBe(0);
    expect(crossings(buildGraph(flowC, subFlowsC))).toBe(0);
  });
});
