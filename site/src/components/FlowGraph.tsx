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
import { layoutGraph, type Direction } from '@wizzard-packages/devtools/headless';

import { asText, printExpr } from '../lib/print-expr';
import { polylineLength, SCOUT_MS, type Beat, type Scout, type Walk } from '../lib/walk';

import type { Breadcrumb } from '@wizzard-packages/core';
import type { FlowGraph as Graph, GraphNode } from '@wizzard-packages/core/graph';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';

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
  /**
   * The route walk, recorded by the engine (`lib/walk.ts`). Supplying it adds the
   * decorations the walk plays and hands them their beats as custom properties;
   * the stylesheet does the rest on the frame's view timeline. Without it the
   * markup is exactly the picture or the instrument above.
   */
  walk?: Walk;
  /**
   * The hero's scout over a route that just changed (`lib/walk.ts`). Like the
   * walk, it adds decorations and beats and leaves the drawing as the engine's
   * frame; its beats are shares of `SCOUT_MS` on the page clock.
   */
  scout?: Scout | null;
  /**
   * Changing this starts the scout over: its decorations remount, and CSS plays
   * them from the beginning. The graph itself is kept, so nothing is redrawn.
   */
  scoutKey?: number;
}

export function FlowGraph({
  graph,
  active,
  view,
  direction = 'row',
  label,
  selected = null,
  onSelect,
  walk,
  scout = null,
  scoutKey = 0,
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

  // A row draws one graph per direction and shows one (`FlowRow`), so the id
  // carries the direction: a `url(#id)` resolves to the first element with
  // that id, and the first would be the drawing that is not displayed.
  const blur = `walk-blur-${direction}`;

  /** A beat as the pair of custom properties the stylesheet maps onto the timeline. */
  const at = (name: string, beat: Beat): Record<string, string> => ({
    [`--${name}0`]: beat.from.toFixed(4),
    [`--${name}1`]: beat.to.toFixed(4),
  });

  /** A dash running the whole edge, with a blurred copy under it for the glow. */
  const comet = (points: string, length: number): ReactNode => (
    <g
      key={`comet-${scoutKey}`}
      className="comet"
      aria-hidden="true"
      style={{ '--len': length.toFixed(1) } as CSSProperties}
    >
      <polyline className="comet-halo" points={points} filter={`url(#${blur})`} />
      <polyline className="comet-core" points={points} />
    </g>
  );

  const classes = [interactive && 'interactive', walk && 'walk', scout && 'scout']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <svg
        {...(interactive
          ? {
              tabIndex: 0,
              onKeyDown,
              ...(selected === null ? {} : { 'aria-activedescendant': `node-${selected}` }),
            }
          : {})}
        {...(classes !== '' && { className: classes })}
        {...(scout !== null && { style: { '--scout-ms': `${SCOUT_MS}ms` } as CSSProperties })}
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
        {(walk !== undefined || scout !== null) && (
          <defs>
            <filter id={blur} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
        )}

        {laid.edges.map((edge, index) => {
          const points = edge.points.map(([x, y]) => `${x},${y}`).join(' ');
          const forward = edge.kind !== 'back';
          // A graph carries a walk or a scout, never both, so each is read once.
          const run = forward
            ? (walk?.runs[`${edge.from}->${edge.to}`] ?? scout?.runs[`${edge.from}->${edge.to}`])
            : undefined;
          const probed = forward ? (walk?.dropped[edge.to] ?? scout?.probes[edge.to]) : undefined;
          // The comet probes a step that breaks; a step that heals is run into.
          const heals = scout?.probes[edge.to]?.heals === true;
          const probe =
            probed !== undefined && probed.from === edge.from && !heals ? probed : undefined;
          const flips =
            scout !== null && edgeLive(edge, scout.before, endId) !== edgeLive(edge, active, endId);
          const plays = {
            ...(run !== undefined && at('r', run)),
            ...(probe !== undefined && at('p', probe.beat)),
            ...(flips && at('x', scout.flip)),
          };
          return (
            <g
              // The index is in the key because a repeated target in `on.next` is
              // legal input: `from`, `to` and `kind` alone collide, and React
              // answers a duplicate key by dropping siblings and warning per clash.
              key={`${edge.from}-${edge.to}-${edge.kind}-${index}`}
              className={`edge ${edge.kind} ${edgeLive(edge, active, endId) ? 'live' : 'dim'}${run !== undefined ? ' run' : ''}${probe !== undefined ? ' probe' : ''}${flips ? ' flip' : ''}`}
              {...(Object.keys(plays).length > 0 && { style: plays as CSSProperties })}
            >
              <polyline
                points={points}
                pathLength={100}
                {...(walk !== undefined && { className: 'base' })}
              />
              {walk !== undefined && run !== undefined && (
                <polyline className="hot" points={points} pathLength={100} aria-hidden="true" />
              )}
              {(run ?? probe) !== undefined && comet(points, polylineLength(edge.points))}
            </g>
          );
        })}

        {laid.nodes.map((placed, index) => {
          const node = nodeById.get(placed.id);
          const kind = node?.kind ?? 'step';
          const state = nodeState(placed.id, kind, view);
          // The condition belongs to the step, not to the edge into it: an
          // `order` edge is a fall-through and carries no `when` of its own.
          // 26 characters at 9px mono is the widest line that stays inside a
          // 160-unit node, which is why this is not the printer's default 32.
          const when = node?.when === undefined ? undefined : printExpr(node.when, 26);
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
          const walked = walk?.steps[placed.id];
          const glow = scout?.glows[placed.id];
          const probed = walk?.dropped[placed.id] ?? scout?.probes[placed.id];
          const heals = scout?.probes[placed.id]?.heals === true;
          const role =
            walk !== undefined
              ? `${walked !== undefined ? ' walked' : ''}${probed !== undefined ? ' dropped' : ''}`
              : `${glow !== undefined ? ' glows' : ''}${probed !== undefined ? ' probed' : ''}${heals ? ' heals' : ''}`;
          const plays = {
            ...(walked !== undefined && { ...at('on', walked.on), ...at('off', walked.off) }),
            ...(glow !== undefined && at('l', glow)),
            ...(probed !== undefined && at('p', probed.beat)),
          };

          if (kind === 'end') {
            // The circle sits where the edge arrives: the box's left middle when
            // the layers run across, its top centre when they run down.
            const [cx, cy] =
              direction === 'row'
                ? [placed.x + 11, placed.y + placed.h / 2]
                : [placed.x + placed.w / 2, placed.y + 11];
            return (
              <g
                key={`${index}:${asText(placed.id)}`}
                className={`node end ${state}`}
                {...(walk !== undefined && {
                  style: { ...at('f', walk.finish), ...at('g', walk.ring) } as CSSProperties,
                })}
                {...(scout !== null && { style: at('g', scout.ring) as CSSProperties })}
              >
                {(walk !== undefined || scout !== null) && (
                  <circle
                    key={`ring-${scoutKey}`}
                    className="ring"
                    cx={cx}
                    cy={cy}
                    r="11"
                    aria-hidden="true"
                  />
                )}
                <circle cx={cx} cy={cy} r="11" />
              </g>
            );
          }
          return (
            // The index leads the key for the same reason it leads an edge's:
            // a placeholder node carries whatever was in `edge.to`, so two of
            // them - or one of them and a real step - can stringify to one
            // name, and React answers a duplicate key by dropping siblings.
            <g
              key={`${index}:${asText(placed.id)}`}
              className={`node ${kind} ${state}${ring}${role}`}
              {...pick}
              {...(Object.keys(plays).length > 0 && { style: plays as CSSProperties })}
            >
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
              {(walked !== undefined || glow !== undefined) && (
                <rect
                  // Each decoration has its own name in the key: a halo and a
                  // condition share a node, and one key on two siblings leaves
                  // a halo behind when the scout is gone.
                  key={`halo-${scoutKey}`}
                  className="halo"
                  x={placed.x}
                  y={placed.y}
                  width={placed.w}
                  height={placed.h}
                  rx="4"
                  filter={`url(#${blur})`}
                  aria-hidden="true"
                />
              )}
              <rect x={placed.x} y={placed.y} width={placed.w} height={placed.h} rx="4" />
              <text x={placed.x + 12} y={placed.y + placed.h / 2 + (when === undefined ? 4 : -2)}>
                {asText(node?.label ?? placed.id)}
              </text>
              {when !== undefined && (
                <text className="node-when" x={placed.x + 12} y={placed.y + placed.h / 2 + 12}>
                  {when.short}
                  <title>{when.full}</title>
                </text>
              )}
              {probed !== undefined && probed.reason !== null && (
                <text
                  key={`eval-${scoutKey}`}
                  className="walk-eval"
                  x={placed.x + 12}
                  y={placed.y + placed.h / 2 + 12}
                  aria-hidden="true"
                >
                  {probed.reason}
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
                <th scope="row">{asText(node.label ?? node.id)}</th>
                <td>{node.kind}</td>
                <td>{nodeState(node.id, node.kind, view)}</td>
                <td>{node.when === undefined ? 'always' : printExpr(node.when).full}</td>
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
