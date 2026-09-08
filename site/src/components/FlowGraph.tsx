/**
 * The one painter. Everything on the site that draws a flow draws it here.
 *
 * It decides nothing: the geometry comes from `layoutGraph`, the structure from
 * `buildGraph`, and which node is where in its life comes from the `view` the
 * caller read off a real engine. That is what lets the hero paint a wizard the
 * visitor is driving and a feature row paint a fixed moment of a different
 * flow, with no second implementation to drift.
 *
 * With no client directive it renders as static HTML and ships no JavaScript,
 * which is how the feature rows use it.
 */
import { formatExpr, layoutGraph, type Direction } from '@wizzard-packages/devtools/headless';

import type { FlowGraph as Graph, GraphNode } from '@wizzard-packages/core/graph';
import type { Breadcrumb } from '@wizzard-packages/core/v1';
import type { KeyboardEvent, ReactNode } from 'react';

export type NodeState = 'active' | 'error' | 'visited' | 'skipped' | 'done' | 'rest';

export interface GraphView {
  /**
   * The step the flow is standing on. `current` once the engine has started,
   * and before that the first reachable step - which is where it is about to
   * stand, and what the frame rendered on the server should show.
   */
  standing: string | null;
  breadcrumbs: readonly Breadcrumb[];
  /** The current step was refused, so its node is drawn as blocked, not active. */
  refused: boolean;
  /**
   * The flow reached its end.
   *
   * Not a snapshot property: reaching `@end` leaves the engine standing on the
   * last step and says so in the `NavResult` instead, so whoever made the call
   * is the one who knows.
   */
  ended: boolean;
}

/**
 * What one node is doing right now.
 *
 * A step absent from the breadcrumbs is one whose `when` is false under the
 * data at hand: not upcoming, not skipped over, simply not on the route. That
 * is the distinction the graph exists to show, so it gets its own state.
 */
export function nodeState(id: string, kind: GraphNode['kind'], view: GraphView): NodeState {
  if (kind === 'end') return view.ended ? 'done' : 'rest';
  const crumb = view.breadcrumbs.find((entry) => entry.id === id);
  if (crumb === undefined) return 'skipped';
  if (id === view.standing) {
    if (view.ended) return 'visited';
    return view.refused ? 'error' : 'active';
  }
  switch (crumb.status) {
    case 'error':
      return 'error';
    case 'completed':
    case 'visited':
      return 'visited';
    default:
      return 'rest';
  }
}

/**
 * Whether an edge is the one the flow would take next from `from`.
 *
 * The builder emits a fall-through edge from every step to every later step it
 * could land on, because a `when` in between may be false. Exactly one of them
 * is live under the data at hand: the one reaching the next reachable step.
 */
export function edgeLive(
  edge: { from: string; to: string; kind: string },
  active: readonly string[],
  end: string
): boolean {
  if (edge.kind === 'back') return false;
  const at = active.indexOf(edge.from);
  if (at === -1) return false;
  return edge.to === (active[at + 1] ?? end);
}

export interface FlowGraphProps {
  graph: Graph;
  /** The steps whose `when` passes right now, in order. Decides which edge is live. */
  active: readonly string[];
  view: GraphView;
  /** `row` on a page that has width; `column` in a docked panel. */
  direction?: Direction;
  /** What the mirror table is a table of. */
  label: string;
  /**
   * Changing this remounts the edges, which restarts their draw animation.
   * The hero's Rebuild control is the only caller that needs it.
   */
  drawKey?: number;
  /**
   * The node being read about, drawn with a ring. Independent of which node the
   * flow is standing on: inspecting a step is not navigating to it.
   */
  selected?: string | null;
  /**
   * Supplying this is what makes the graph interactive. Without it the drawing
   * is inert markup with no focus stop and no handlers, which is how a page
   * that only wants a picture ships no JavaScript for it.
   */
  onSelect?: (id: string | null) => void;
}

export function FlowGraph({
  graph,
  active,
  view,
  direction = 'row',
  label,
  drawKey = 0,
  selected = null,
  onSelect,
}: FlowGraphProps): ReactNode {
  const laid = layoutGraph(graph, { direction });
  const nodeById = new Map<string, GraphNode>(graph.nodes.map((node) => [node.id, node]));
  const endId = graph.nodes.find((node) => node.kind === 'end')?.id ?? '@end';

  /**
   * What the arrow keys walk: laid-out order, skipping the placeholders the
   * layout adds for an edge whose target the flow never declares, and skipping
   * the end marker.
   *
   * The end is drawn and is not a step. Walking onto it would point
   * `aria-activedescendant` at `node-@end`, which the end branch never renders
   * an id for, so the reference would dangle and the panel would offer a step
   * that does not exist to inspect.
   */
  const walkable = laid.nodes.filter((placed) => {
    const kind = nodeById.get(placed.id)?.kind;
    return kind !== undefined && kind !== 'end';
  });

  const move = (delta: number): void => {
    if (walkable.length === 0) return;
    const at = walkable.findIndex((placed) => placed.id === selected);
    const next = at === -1 ? 0 : Math.min(walkable.length - 1, Math.max(0, at + delta));
    onSelect?.(walkable[next]?.id ?? null);
  };

  // One focus stop for the whole graph, and the arrows move inside it. Tab
  // walking node by node would put a forty-step flow between a reader and the
  // rest of the page.
  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>): void => {
    const moves: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    if (event.key in moves) {
      event.preventDefault();
      move(moves[event.key] as number);
      return;
    }
    if (event.key === 'Escape' && selected !== null) {
      event.preventDefault();
      onSelect?.(null);
    }
  };

  const interactive = onSelect !== undefined;

  return (
    <>
      <svg
        {...(interactive
          ? {
              tabIndex: 0,
              onKeyDown,
              className: 'interactive',
              ...(selected === null ? {} : { 'aria-activedescendant': `node-${selected}` }),
            }
          : {})}
        // Two units of bleed on every side: an edge routed along the graph's own
        // border loses the outer half of its stroke to the viewBox otherwise,
        // and reads as orphaned dashes.
        viewBox={`-2 -2 ${laid.width + 4} ${laid.height + 4}`}
        width={laid.width + 4}
        height={laid.height + 4}
        role={interactive ? 'application' : 'img'}
        {...(interactive ? { 'aria-roledescription': 'flow graph' } : {})}
        aria-label={
          interactive
            ? `Flow graph of ${label}. Arrow keys move between steps, Escape clears the selection. The same information is in the table below.`
            : `Flow graph of ${label}. The same information is in the table below.`
        }
      >
        {laid.edges.map((edge) => (
          <g
            key={`${edge.from}-${edge.to}-${edge.kind}-${drawKey}`}
            className={`edge ${edge.kind} ${edgeLive(edge, active, endId) ? 'live' : 'dim'}`}
          >
            <polyline
              points={edge.points.map(([x, y]) => `${x},${y}`).join(' ')}
              pathLength={100}
            />
          </g>
        ))}

        {laid.nodes.map((placed) => {
          const node = nodeById.get(placed.id);
          const kind = node?.kind ?? 'step';
          const state = nodeState(placed.id, kind, view);
          // The condition belongs to the step, not to the edge into it: an
          // `order` edge is a fall-through and carries no `when` of its own.
          // 26 characters at 9px mono is the widest line that stays inside a
          // 160-unit node, which is why this is not `formatExpr`'s default 32.
          const when = node?.when === undefined ? undefined : formatExpr(node.when, 26);
          // Only where there is something to read about: a click on the end
          // marker selects nothing, because a flow's end has no step to show.
          const pick =
            interactive && node !== undefined
              ? {
                  id: `node-${placed.id}`,
                  onClick: () => {
                    onSelect?.(selected === placed.id ? null : placed.id);
                  },
                }
              : {};
          const ring = selected === placed.id ? ' selected' : '';

          if (kind === 'end') {
            return (
              <g key={placed.id} className={`node end ${state}`}>
                <circle cx={placed.x + 11} cy={placed.y + placed.h / 2} r="11" />
              </g>
            );
          }
          return (
            <g key={placed.id} className={`node ${kind} ${state}${ring}`} {...pick}>
              {kind === 'group' && (
                <rect
                  className="inner"
                  x={placed.x + 3}
                  y={placed.y + 3}
                  width={placed.w - 6}
                  height={placed.h - 6}
                  rx="4"
                />
              )}
              <rect x={placed.x} y={placed.y} width={placed.w} height={placed.h} rx="4" />
              <text x={placed.x + 12} y={placed.y + placed.h / 2 + (when === undefined ? 4 : -2)}>
                {node?.label ?? placed.id}
              </text>
              {when !== undefined && (
                <text className="node-when" x={placed.x + 12} y={placed.y + placed.h / 2 + 12}>
                  {when.short}
                  <title>{when.full}</title>
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* The screen reader's path through the graph, and the visitor's if an
          interactive graph never hydrates.

          The wrapper is not decoration: `overflow: hidden` does not apply to a
          `display: table` box, so a bare hidden table keeps its intrinsic width
          and pushes the page sideways on a narrow screen. The block clips it. */}
      <div className="mirror">
        <table>
          <caption>Steps of {label}</caption>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Kind</th>
              <th scope="col">State</th>
              <th scope="col">Condition</th>
            </tr>
          </thead>
          <tbody>
            {graph.nodes.map((node) => (
              <tr key={node.id}>
                <th scope="row">{node.label ?? node.id}</th>
                <td>{node.kind}</td>
                <td>{nodeState(node.id, node.kind, view)}</td>
                <td>{node.when === undefined ? 'always' : formatExpr(node.when).full}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/**
 * The view of a flow nobody has walked yet: standing on its first reachable
 * step, nothing visited, nothing refused. What a feature row shows.
 */
export function restingView(
  active: readonly string[],
  breadcrumbs: readonly Breadcrumb[]
): GraphView {
  return { standing: active[0] ?? null, breadcrumbs, refused: false, ended: false };
}
