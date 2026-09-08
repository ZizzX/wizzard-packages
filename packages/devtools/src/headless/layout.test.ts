import { buildGraph } from '@wizzard-packages/core/graph';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { denseFlow, flowA, flowB, flowC, subFlowsC } from '../../../../contract/fixtures';
import { layoutGraph, NODE_H, NODE_W, REPEAT_H } from './layout';

import type { FlowGraph, GraphEdge } from '@wizzard-packages/core/graph';
import type { Positioned, PositionedEdge, PositionedGraph } from './layout';

const overlaps = (a: Positioned, b: Positioned): boolean =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/**
 * Does a segment pass through the inside of a box? Liang-Barsky against the
 * open rectangle, so an edge that leaves or lands on a border does not count -
 * every edge does that at its own two ends.
 */
const cuts = (
  [x0, y0]: readonly [number, number],
  [x1, y1]: readonly [number, number],
  b: Positioned
): boolean => {
  let lo = 0;
  let hi = 1;
  const clip = (p: number, q: number): boolean => {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) lo = Math.max(lo, r);
    else hi = Math.min(hi, r);
    return lo < hi;
  };
  const dx = x1 - x0;
  const dy = y1 - y0;
  return (
    clip(-dx, x0 - b.x) &&
    clip(dx, b.x + b.w - x0) &&
    clip(-dy, y0 - b.y) &&
    clip(dy, b.y + b.h - y0) &&
    lo < hi
  );
};

/** Every box an edge's polyline passes through, other than its own two ends. */
const pierced = (laid: PositionedGraph, e: PositionedEdge): string[] =>
  laid.nodes
    .filter(
      (n) =>
        n.id !== e.from &&
        n.id !== e.to &&
        e.points.some((p, i) => i > 0 && cuts(e.points[i - 1] as [number, number], p, n))
    )
    .map((n) => n.id);

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

  // Both directions share every rule but which coordinate the layer drives, so
  // the properties that are not about the axis run over both.
  const DIRECTIONS = ['column', 'row'] as const;

  it.each(DIRECTIONS)(
    'property (%s): no two rectangles overlap and every edge endpoint is laid out',
    (direction) => {
      fc.assert(
        fc.property(graphs, (graph) => {
          const laid = layoutGraph(graph, { direction });
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
    }
  );

  it.each(DIRECTIONS)(
    'property (%s): on an acyclic graph every forward edge advances a layer',
    (direction) => {
      const dags = graphs.map((g) => ({
        ...g,
        edges: g.edges.filter((e) => {
          if (e.kind === 'back' || e.to === '@end' || e.dangling) return true;
          return Number(e.from.slice(1)) < Number(e.to.slice(1));
        }),
      }));
      fc.assert(
        fc.property(dags, (graph) => {
          const laid = layoutGraph(graph, { direction });
          const along = new Map(
            laid.nodes.map((n) => [n.id, direction === 'row' ? n.x : n.y] as const)
          );
          return laid.edges
            .filter((e) => e.kind !== 'back')
            .every((e) => (along.get(e.to) ?? 0) > (along.get(e.from) ?? 0));
        })
      );
    }
  );

  it.each(DIRECTIONS)(
    'property (%s): terminates on cycles, is deterministic, and back edges move no flow node',
    (direction) => {
      // A dangling back edge adds a ghost, so only the flow's own nodes are compared.
      const own = (laid: PositionedGraph) => JSON.stringify(laid.nodes.filter((n) => !n.ghost));
      fc.assert(
        fc.property(graphs, (graph) => {
          const a = layoutGraph(graph, { direction });
          const b = layoutGraph({ ...graph, edges: [...graph.edges] }, { direction });
          const without = layoutGraph(
            { ...graph, edges: graph.edges.filter((e) => e.kind !== 'back') },
            { direction }
          );
          return JSON.stringify(a) === JSON.stringify(b) && own(a) === own(without);
        })
      );
    }
  );

  it.each(DIRECTIONS)(
    'property (%s): no edge is drawn through a node it does not touch',
    (direction) => {
      fc.assert(
        fc.property(graphs, (graph) => {
          const laid = layoutGraph(graph, { direction });
          return laid.edges.every((e) => pierced(laid, e).length === 0);
        })
      );
    }
  );

  it.each(DIRECTIONS)('routes an edge that skips a layer around it (%s)', (direction) => {
    // A flow whose branch is optional: `a -> b -> c` with `a -> c` beside it,
    // which is the shape the site draws when a step falls out of the route.
    const graph: FlowGraph = {
      nodes: [
        { id: 'a', kind: 'step' },
        { id: 'b', kind: 'step' },
        { id: 'c', kind: 'step' },
      ],
      edges: [
        { from: 'a', to: 'b', kind: 'next' },
        { from: 'b', to: 'c', kind: 'next' },
        { from: 'a', to: 'c', kind: 'next' },
      ],
    };
    const laid = layoutGraph(graph, { direction });
    const skip = laid.edges.find((e) => e.from === 'a' && e.to === 'c');
    expect(skip).toBeDefined();
    expect(pierced(laid, skip as PositionedEdge)).toEqual([]);
    // It detours rather than going straight, and stays inside the box.
    expect(skip?.points.length).toBeGreaterThan(2);
    for (const [x, y] of skip?.points ?? []) {
      expect(x).toBeLessThanOrEqual(laid.width);
      expect(y).toBeLessThanOrEqual(laid.height);
    }
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

describe('layoutGraph in row direction', () => {
  it('runs the layers rightward and keeps the boxes their own size', () => {
    const laid = layoutGraph(buildGraph(flowA), { direction: 'row' });
    const at = (id: string) => laid.nodes.find((n) => n.id === id);

    // The same layering, on the other axis: every step advances x and shares y.
    expect(at('details')?.x).toBe(0);
    expect(at('company')?.x).toBe(NODE_W + 48);
    expect(at('payment')?.x).toBe(2 * (NODE_W + 48));
    expect(new Set(laid.nodes.map((n) => n.y))).toEqual(new Set([0]));
    expect(laid.nodes.every((n) => n.w === NODE_W)).toBe(true);
  });

  it('lays out the same flow wide rather than tall', () => {
    const graph = buildGraph(flowA);
    const column = layoutGraph(graph);
    const row = layoutGraph(graph, { direction: 'row' });

    expect(column.height).toBeGreaterThan(column.width);
    expect(row.width).toBeGreaterThan(row.height);
    expect(row.nodes).toHaveLength(column.nodes.length);
    expect(row.edges).toHaveLength(column.edges.length);
  });

  it('routes a forward edge between the facing borders', () => {
    const laid = layoutGraph(buildGraph(flowA), { direction: 'row' });
    const edge = laid.edges.find((e) => e.from === 'details' && e.to === 'company');
    const from = laid.nodes.find((n) => n.id === 'details');
    const to = laid.nodes.find((n) => n.id === 'company');

    expect(edge?.points[0]).toEqual([(from?.x ?? 0) + NODE_W, (from?.y ?? 0) + NODE_H / 2]);
    expect(edge?.points[1]).toEqual([to?.x, (to?.y ?? 0) + NODE_H / 2]);
  });

  it('returns a back edge along a rail below the graph, not beside it', () => {
    const laid = layoutGraph(buildGraph(flowA), { direction: 'row' });
    const back = laid.edges.find((e) => e.kind === 'back');
    expect(back).toBeDefined();

    const railY = Math.max(...(back?.points.map(([, y]) => y) ?? [0]));
    // The rail is clear of every box, and the height grew to contain it.
    expect(railY).toBeGreaterThan(NODE_H);
    expect(laid.height).toBe(railY);
    expect(laid.width).toBeGreaterThan(laid.height);
  });

  it('memoises each direction separately', () => {
    const graph = buildGraph(flowA);
    expect(layoutGraph(graph)).toBe(layoutGraph(graph));
    expect(layoutGraph(graph, { direction: 'row' })).toBe(layoutGraph(graph, { direction: 'row' }));
    expect(layoutGraph(graph, { direction: 'row' })).not.toBe(layoutGraph(graph));
  });
});
