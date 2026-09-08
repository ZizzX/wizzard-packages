import type { FlowGraph, GraphEdge } from '@wizzard-packages/core/graph';

/**
 * A layered layout for a flow graph: one layer per step of the longest path
 * from a source, siblings within a layer in declaration order. Three rules and
 * nothing else, so a position is a pure function of the graph and a commit
 * never moves a node.
 *
 * The layering itself has no axis. `direction` only decides which coordinate
 * the layer index drives: `column` runs top to bottom, which is what a docked
 * panel wants, and `row` runs left to right, which is what a page that has
 * width and not height wants. Everything else - the topological order, the
 * cycle break, the column assignment - is shared, so the two directions cannot
 * disagree about the shape of a flow.
 *
 * Ceiling, stated: no crossing minimisation. A flow whose branches fan out and
 * rejoin draws crossings; the upgrade is a barycenter pass inside rule 2
 * (TODOS.md item 9). A host with dagre or elk passes `layout={...}` instead.
 */

export interface Positioned {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /**
   * The target of a dangling edge. It is not a node of the flow, but the edge
   * needs somewhere to point, so it is laid out one layer below its source and
   * the renderer draws it struck through.
   */
  ghost?: boolean;
}

export interface PositionedEdge extends GraphEdge {
  /** A polyline in user units, from the source's border to the target's. */
  points: readonly (readonly [number, number])[];
}

export interface PositionedGraph {
  nodes: readonly Positioned[];
  edges: readonly PositionedEdge[];
  width: number;
  height: number;
}

export interface LayoutOptions {
  gapX?: number;
  gapY?: number;
  /**
   * Which way the layers run. `column` (the default) stacks them downward;
   * `row` runs them rightward. Node boxes keep their own size either way - a
   * step is 160x40 in both, because the direction changes the arrangement and
   * never the thing arranged.
   */
  direction?: Direction;
}

export type Direction = 'column' | 'row';

/** User units; the SVG uses a viewBox, so the host scales them by CSS. */
export const NODE_W = 160;
export const NODE_H = 40;
/** A repeat group draws a second rect behind the first. */
export const REPEAT_H = 48;
const ROW_H = REPEAT_H;

/** One cache per direction, for the default gaps. */
const memo: Record<Direction, WeakMap<FlowGraph, PositionedGraph>> = {
  column: new WeakMap(),
  row: new WeakMap(),
};

/**
 * Memoised on the graph object for the default options, which is how a
 * position stays a function of the graph across renders: `buildGraph` is
 * called once per flow definition and the result is kept by identity.
 */
export function layoutGraph(graph: FlowGraph, opts?: LayoutOptions): PositionedGraph {
  const direction = opts?.direction ?? 'column';
  // Memoised only at the default gaps, which is every call the site and the
  // panel make; a caller tuning the spacing is tuning it per render anyway.
  const cacheable = opts?.gapX === undefined && opts?.gapY === undefined;
  if (cacheable) {
    const hit = memo[direction].get(graph);
    if (hit !== undefined) return hit;
  }
  const result = layout(graph, opts?.gapX ?? 48, opts?.gapY ?? 32, direction);
  if (cacheable) memo[direction].set(graph, result);
  return result;
}

function layout(
  graph: FlowGraph,
  gapX: number,
  gapY: number,
  direction: Direction
): PositionedGraph {
  const ids = graph.nodes.map((n) => n.id);
  const known = new Set(ids);

  // Rule 1's input: forward edges between known nodes. `back` edges never
  // layer; a dangling edge of any kind gets a ghost target after the layering.
  const out = new Map<string, string[]>();
  for (const id of ids) out.set(id, []);
  const ghosts: string[] = [];
  for (const e of graph.edges) {
    if (!known.has(e.from)) continue;
    if (!known.has(e.to)) {
      if (!ghosts.includes(e.to)) ghosts.push(e.to);
      continue;
    }
    if (e.kind !== 'back') out.get(e.from)?.push(e.to);
  }

  // A DFS in declaration order gives a topological order and finds the edges
  // that close a cycle (a target still on the stack); those are left out of
  // the longest-path pass, so layering always terminates and, because the DFS
  // order is the declaration order, always picks the same edge to break.
  const onStack = new Set<string>();
  const done = new Set<string>();
  const closing = new Set<string>();
  const topo: string[] = [];
  const visit = (v: string): void => {
    onStack.add(v);
    for (const w of out.get(v) ?? []) {
      if (onStack.has(w)) closing.add(`${v}${w}`);
      else if (!done.has(w)) visit(w);
    }
    onStack.delete(v);
    done.add(v);
    topo.push(v);
  };
  for (const v of ids) if (!done.has(v)) visit(v);
  topo.reverse();

  const layerOf = new Map<string, number>();
  for (const v of ids) layerOf.set(v, 0);
  for (const v of topo) {
    const base = layerOf.get(v) ?? 0;
    for (const w of out.get(v) ?? []) {
      if (closing.has(`${v}${w}`)) continue;
      if ((layerOf.get(w) ?? 0) < base + 1) layerOf.set(w, base + 1);
    }
  }

  // END sits on the last layer, whatever reached it.
  let last = 0;
  for (const [id, l] of layerOf) if (id !== '@end' && l > last) last = l;
  if (layerOf.has('@end')) layerOf.set('@end', Math.max(last, layerOf.get('@end') ?? 0));

  // Ghosts one layer below the lowest of their sources.
  for (const g of ghosts) {
    let l = 0;
    for (const e of graph.edges) {
      if (e.to === g) l = Math.max(l, (layerOf.get(e.from) ?? 0) + 1);
    }
    layerOf.set(g, l);
  }

  // Rule 2: column = order of first appearance within the layer. Rule 3: size.
  const row = direction === 'row';
  const layerPitch = row ? NODE_W + gapX : ROW_H + gapY;
  const crossPitch = row ? ROW_H + gapY : NODE_W + gapX;
  const nextCol = new Map<number, number>();
  const nodes: Positioned[] = [];
  const at = new Map<string, Positioned>();
  const place = (id: string, h: number, ghost: boolean): void => {
    const layer = layerOf.get(id) ?? 0;
    const col = nextCol.get(layer) ?? 0;
    nextCol.set(layer, col + 1);
    const node: Positioned = {
      id,
      x: row ? layer * layerPitch : col * crossPitch,
      y: row ? col * crossPitch : layer * layerPitch,
      w: NODE_W,
      h,
      ...(ghost && { ghost: true }),
    };
    nodes.push(node);
    at.set(id, node);
  };
  for (const n of graph.nodes)
    place(n.id, n.group?.repeat !== undefined ? REPEAT_H : NODE_H, false);
  for (const g of ghosts) place(g, NODE_H, true);

  let width = 0;
  let height = 0;
  for (const n of nodes) {
    width = Math.max(width, n.x + n.w);
    height = Math.max(height, n.y + n.h);
  }

  // One routing rule. An edge leaves the border its target lies beyond and
  // arrives at the facing one. It may go straight only when its target is
  // exactly one layer on; anything else - a layer skipped, a cycle closed, a
  // back edge - has a node standing on the straight line, so it detours: out
  // into the empty band between two layers, along a lane, and back in through
  // another band. The bands are empty by construction, since a node spans
  // NODE_W of a pitch of NODE_W + gap along the layers and ROW_H of a pitch of
  // ROW_H + gap across them, so a detour never crosses a box.
  //
  // A `back` edge is an override rather than a route, so its lane is the rail
  // clear of the whole graph - to the right of a column, below a row - and it
  // returns to the border it left from. A skipping edge takes the band just
  // past the later of its two ends, which can lie past the last node, so the
  // box is grown before the rail is measured against it.
  const gapAlong = row ? gapX : gapY;
  const gapCross = row ? gapY : gapX;
  const along = (n: Positioned): number => (row ? n.x : n.y);
  const cross = (n: Positioned): number => (row ? n.y : n.x);
  const centre = (n: Positioned): number => cross(n) + (row ? n.h : n.w) / 2;
  const far = (n: Positioned): number => along(n) + (row ? n.w : n.h);
  /** The middle of the band after a node's layer, and of the one before it. */
  const after = (n: Positioned): number => along(n) + (row ? NODE_W : ROW_H) + gapAlong / 2;
  const before = (n: Positioned): number => along(n) - gapAlong / 2;
  const straight = (f: Positioned, t: Positioned): boolean => along(t) - along(f) === layerPitch;
  const lane = (f: Positioned, t: Positioned): number =>
    Math.max(cross(f), cross(t)) + (row ? ROW_H : NODE_W) + gapCross / 2;
  const pt = (a: number, c: number): readonly [number, number] => (row ? [a, c] : [c, a]);

  for (const e of graph.edges) {
    const f = at.get(e.from);
    const t = at.get(e.to);
    if (f === undefined || t === undefined || e.kind === 'back' || straight(f, t)) continue;
    const past = lane(f, t) + gapCross / 2;
    if (row) height = Math.max(height, past);
    else width = Math.max(width, past);
  }

  const rail = (row ? height : width) + gapCross;
  const edges: PositionedEdge[] = [];
  for (const e of graph.edges) {
    const from = at.get(e.from);
    const to = at.get(e.to);
    if (from === undefined || to === undefined) continue;
    const back = e.kind === 'back';
    const detour = back ? rail : straight(from, to) ? undefined : lane(from, to);
    const arrive = back ? after(to) : before(to);
    edges.push({
      ...e,
      points:
        detour === undefined
          ? [pt(far(from), centre(from)), pt(along(to), centre(to))]
          : [
              pt(far(from), centre(from)),
              pt(after(from), centre(from)),
              pt(after(from), detour),
              pt(arrive, detour),
              pt(arrive, centre(to)),
              pt(back ? far(to) : along(to), centre(to)),
            ],
    });
  }
  if (edges.some((e) => e.kind === 'back')) {
    if (row) height = rail;
    else width = rail;
  }

  return { nodes, edges, width, height };
}
