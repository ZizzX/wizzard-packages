import {
  END,
  isGroup,
  type FlowDefinition,
  type GroupStep,
  type StepDef,
  type Target,
} from './flow';

import type { Expr } from './expr';

/**
 * A flow's transition graph.
 *
 * Structure only, deliberately: no coordinates, no sizes, no layout. A flow is
 * already a pure JSON value, so its graph can be one too, and keeping positions
 * out is what lets this ship inside a published package while the site that
 * draws it is free to pull in a layout library the package never pays for.
 *
 * It is also why this is its own entry. A wizard that never draws itself should
 * not carry the code that would.
 */
export interface FlowGraph {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
}

export interface GraphNode {
  id: string;
  kind: 'step' | 'group' | 'end';
  label?: string;
  /** The step's own reachability predicate, verbatim, for the renderer to label. */
  when?: Expr;
  /** The body arrives later from the host, so there is nothing to draw inside yet. */
  deferred?: boolean;
  /**
   * The step is absent from a declared `order`, so nothing falls through to it
   * and it is reachable only via an explicit `on.next`.
   */
  offOrder?: boolean;
  group?: GroupNode;
}

export interface GroupNode {
  /** The sub-flow's id, whether it was inlined or named by reference. */
  flowId: string;
  /** Present with `repeat`: the group runs once per item in this expression. */
  repeat?: Expr;
  /** The sub-flow drawn in place. Absent exactly when `opaque` says why. */
  graph?: FlowGraph;
  /**
   * Why the sub-flow could not be drawn. A group with no nested graph and no
   * reason would render as an ordinary box and read as working software, so
   * the reason is part of the data and the renderer is expected to show it.
   */
  opaque?: 'unresolved' | 'cycle' | 'too-deep';
}

export interface GraphEdge {
  from: string;
  /** A step id, or `END`. */
  to: string;
  /**
   * `next`/`back` come from an explicit `on`; `order` is the default
   * fall-through the resolver uses when a step declares no `on.next`.
   */
  kind: 'next' | 'back' | 'order';
  /** The condition under which this edge is taken. Absent means unconditional. */
  when?: Expr;
  /** `to` names neither a step in this flow nor `END`. */
  dangling?: boolean;
}

/**
 * How deep sub-flows are followed.
 *
 * A flow can arrive as pasted, untrusted JSON. The cycle guard in `toGroup`
 * catches a sub-flow that names an ancestor, but a chain of thirty-two
 * *distinct* ones has no cycle in it and would still walk the stack down.
 * Nothing legitimate nests that far.
 */
const MAX_DEPTH = 32;

/**
 * Builds the graph of `flow`.
 *
 * `subFlows` resolves `GroupStep.flow` when it is given by id, mirroring
 * `validateFlow(flow, registry?)`. Without it, referenced sub-flows are still
 * drawn -- as opaque nodes that say so.
 */
export function buildGraph(
  flow: FlowDefinition,
  subFlows?: Readonly<Record<string, FlowDefinition>>
): FlowGraph {
  return build(flow, subFlows, [flow.id]);
}

function build(
  flow: FlowDefinition,
  subFlows: Readonly<Record<string, FlowDefinition>> | undefined,
  drawing: readonly string[]
): FlowGraph {
  const entries = Object.entries(flow.steps);
  const nodes: GraphNode[] = entries.map(([id, step]) =>
    toNode(id, step, flow.order, subFlows, drawing)
  );
  const edges = [...explicitEdges(entries, flow), ...fallThroughEdges(flow)];

  // One terminal node, and only when something actually reaches it.
  if (edges.some((e) => e.to === END)) nodes.push({ id: END, kind: 'end' });

  return { nodes, edges };
}

function toNode(
  id: string,
  step: StepDef,
  order: readonly string[] | undefined,
  subFlows: Readonly<Record<string, FlowDefinition>> | undefined,
  drawing: readonly string[]
): GraphNode {
  return {
    id,
    kind: isGroup(step) ? 'group' : 'step',
    ...(step.label !== undefined && { label: step.label }),
    ...(step.when !== undefined && { when: step.when }),
    ...(step.deferred === true && { deferred: true }),
    ...(order !== undefined && !order.includes(id) && { offOrder: true }),
    ...(isGroup(step) && { group: toGroup(step, subFlows, drawing) }),
  };
}

function toGroup(
  step: GroupStep,
  subFlows: Readonly<Record<string, FlowDefinition>> | undefined,
  drawing: readonly string[]
): GroupNode {
  // `flow` is either the definition itself or its id, and both cases need the
  // id, so the narrowing is written out twice rather than cast once.
  const flowId = typeof step.flow === 'string' ? step.flow : step.flow.id;
  const sub = typeof step.flow === 'string' ? subFlows?.[step.flow] : step.flow;
  const repeat = step.repeat === undefined ? {} : { repeat: step.repeat.over };

  if (sub === undefined) return { flowId, ...repeat, opaque: 'unresolved' };
  // A sub-flow that names an ancestor by id would otherwise recurse forever.
  if (drawing.includes(flowId)) return { flowId, ...repeat, opaque: 'cycle' };
  if (drawing.length >= MAX_DEPTH) return { flowId, ...repeat, opaque: 'too-deep' };

  return { flowId, ...repeat, graph: build(sub, subFlows, [...drawing, flowId]) };
}

function explicitEdges(
  entries: readonly (readonly [string, StepDef])[],
  flow: FlowDefinition
): GraphEdge[] {
  const edges: GraphEdge[] = [];
  for (const [id, step] of entries) {
    const next = step.on?.next;
    if (next !== undefined) {
      const targets: readonly Target[] = Array.isArray(next) ? next : [next as Target];
      for (const t of targets) edges.push(toEdge(id, t, 'next', flow));
    }

    const back = step.on?.back;
    // `auto` is the resolver walking `order` backwards at run time against the
    // state of the moment. There is no fixed target, and drawing a guess would
    // be worse than drawing nothing.
    if (back !== undefined && back !== 'auto') edges.push(toEdge(id, back, 'back', flow));
  }
  return edges;
}

/**
 * The default path: a step with no `on.next` falls through to the next entry in
 * `order` whose `when` passes.
 *
 * Which is why one edge per pair is not enough. Statically we cannot know which
 * `when` holds, so every step up to and including the first unconditional one
 * is genuinely reachable from here, and a lone edge to the immediate neighbour
 * would hide the skip that `when` exists to express.
 */
function fallThroughEdges(flow: FlowDefinition): GraphEdge[] {
  const walk = flow.order ?? Object.keys(flow.steps);
  const edges: GraphEdge[] = [];

  for (let i = 0; i < walk.length; i++) {
    const from = walk[i];
    if (from === undefined || flow.steps[from]?.on?.next !== undefined) continue;

    for (let j = i + 1; j < walk.length; j++) {
      const to = walk[j];
      if (to === undefined) continue;
      const target = flow.steps[to];
      if (target === undefined) continue;

      edges.push({
        from,
        to,
        kind: 'order',
        ...(target.when !== undefined && { when: target.when }),
      });
      if (target.when === undefined) break;
    }
  }
  return edges;
}

function toEdge(from: string, t: Target, kind: 'next' | 'back', flow: FlowDefinition): GraphEdge {
  const to = typeof t === 'string' ? t : t.to;
  const when = typeof t === 'string' ? undefined : t.when;
  return {
    from,
    to,
    kind,
    ...(when !== undefined && { when }),
    // A branch pointing at nothing is a flow bug. It stays on the graph so it
    // can be seen, rather than vanishing into a step that has one fewer arrow.
    ...(to !== END && !(to in flow.steps) && { dangling: true }),
  };
}
