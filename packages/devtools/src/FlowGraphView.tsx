import { useCallback, useEffect, useMemo } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import type { FlowGraph, GraphNode } from '@wizzard-packages/core/graph';
import { formatExpr, layoutGraph, NODE_W } from './headless';
import type { Positioned, PositionedEdge, PositionedGraph } from './headless';

/**
 * The graph, drawn. Everything it shows comes from the `FlowGraph` and the
 * highlight props; it holds no wizard and navigates nothing, which is what
 * makes it usable on its own beside a host's own panel.
 *
 * Labels are `<text>` children, never `innerHTML`: a step id is author data
 * and the panel renders author data as text (§4.5).
 */

/** The edge the wizard is inferred to have taken, drawn thick (§12.4). */
export interface TakenEdge {
  from: string;
  to: string;
}

/** Pan and zoom, owned by the caller so the toolbar can live outside the graph. */
export interface GraphView {
  /** 1 fits the whole graph; larger zooms in. */
  scale: number;
  /** Centre of the visible area, in user units. `null` centres on the graph. */
  cx: number | null;
  cy: number | null;
  /** Show the mirror table in place of the drawing. */
  table: boolean;
}

/** What the caller needs to drive the toolbar: density, and where to centre. */
export interface LayoutInfo {
  drawn: number;
  total: number;
  width: number;
  height: number;
  /** Centre of the active node, for the Center button; null when none is drawn. */
  active: readonly [number, number] | null;
}

export interface FlowGraphViewProps {
  graph: FlowGraph;
  /** Default: the built-in layered layout. */
  layout?: (graph: FlowGraph) => PositionedGraph;
  view: GraphView;
  /** The top frame's step, filled. */
  activeStep?: string | null;
  visited?: readonly string[];
  takenEdge?: TakenEdge | null;
  /** The inspected node; drawn with a ring, independent of `activeStep`. */
  selected?: string | null;
  onSelect?: (id: string | null) => void;
  /** Enter, or a click on an already selected node. */
  onInspect?: (id: string) => void;
  /** Told what was drawn, so the toolbar can report density and centre the view. */
  onLayout?: (info: LayoutInfo) => void;
}

/**
 * A dense flow is dense in edges, not nodes: `graph.ts` emits an `order` edge
 * from a step to every later conditional one, so 200 conditional steps make
 * ~20 000 edges. The layout handles them; the DOM does not, so the drawing
 * stops here and the mirror table stays complete (§14.8).
 */
export const EDGE_DRAW_CAP = 1500;

const LABEL_CHARS = 24;
const EDGE_LABEL_CHARS = 32;

const cut = (text: string, max: number): string =>
  text.length <= max ? text : `${text.slice(0, max - 1)}…`;

const nodeLabel = (node: GraphNode): string => node.label ?? node.id;

/** What a node is, for the mirror table and the accessible name. */
const kindOf = (node: GraphNode): string => {
  if (node.kind === 'end') return 'end';
  if (node.kind !== 'group') return node.deferred ? 'deferred step' : 'step';
  if (node.group?.opaque) return `group (${node.group.opaque})`;
  return node.group?.repeat ? 'repeat group' : 'group';
};

const statusOf = (
  id: string,
  activeStep: string | null | undefined,
  visited: readonly string[]
): string => (id === activeStep ? 'active' : visited.includes(id) ? 'visited' : 'unvisited');

function NodeShape({
  node,
  at,
  active,
  visited,
  selected,
}: {
  node: GraphNode;
  at: Positioned;
  active: boolean;
  visited: boolean;
  selected: boolean;
}): ReactNode {
  const label = nodeLabel(node);
  const short = cut(label, LABEL_CHARS);
  const classes = [
    'wz-node',
    `wz-node-${node.kind}`,
    active && 'wz-active',
    visited ? 'wz-visited' : 'wz-unvisited',
    selected && 'wz-selected',
    node.group?.opaque && 'wz-opaque',
    node.group?.repeat && 'wz-repeat',
  ]
    .filter(Boolean)
    .join(' ');

  const boxH = node.group?.repeat ? at.h - 8 : at.h;

  const text = (line: string, dy: number, className?: string): ReactNode => (
    <text
      x={at.x + at.w / 2}
      y={at.y + boxH / 2 + dy}
      textAnchor="middle"
      dominantBaseline="middle"
      textLength={Math.min(NODE_W - 16, short.length * 8)}
      lengthAdjust="spacingAndGlyphs"
      className={className}
    >
      {line}
    </text>
  );

  const second = node.group?.opaque
    ? node.group.opaque.replace('-', ' ')
    : node.group?.repeat
      ? `over: ${formatExpr(node.group.repeat, LABEL_CHARS).short}`
      : node.group?.graph
        ? `${node.group.graph.nodes.length} steps`
        : null;

  return (
    <g
      id={`wz-node-${node.id}`}
      className={classes}
      role="img"
      aria-label={`${label}, ${kindOf(node)}, ${active ? 'active' : visited ? 'visited' : 'unvisited'}`}
    >
      <title>
        {label}
        {node.when ? ` — when ${formatExpr(node.when, 200).full}` : ''}
      </title>
      {node.kind === 'end' ? (
        <circle cx={at.x + at.w / 2} cy={at.y + at.h / 2} r={12} className="wz-end" />
      ) : (
        <>
          {node.group?.repeat && (
            <rect
              x={at.x + 6}
              y={at.y + 8}
              width={at.w}
              height={boxH}
              rx={6}
              className="wz-stack"
            />
          )}
          <rect x={at.x} y={at.y} width={at.w} height={boxH} rx={6} />
          {node.kind === 'group' && !node.group?.opaque && (
            <rect
              x={at.x + 3}
              y={at.y + 3}
              width={at.w - 6}
              height={boxH - 6}
              rx={4}
              className="wz-inner"
            />
          )}
        </>
      )}
      {node.kind !== 'end' && text(short, second ? -7 : 0)}
      {node.kind !== 'end' && second && text(cut(second, LABEL_CHARS), 9, 'wz-sub')}
      {node.deferred && (
        <text x={at.x + at.w - 10} y={at.y + 12} className="wz-sub" aria-hidden="true">
          ⏱
        </text>
      )}
    </g>
  );
}

function Edge({ edge, taken }: { edge: PositionedEdge; taken: boolean }): ReactNode {
  const points = edge.points.map(([x, y]) => `${x},${y}`).join(' ');
  const label = edge.when ? formatExpr(edge.when, EDGE_LABEL_CHARS) : null;
  const mid = edge.points[Math.floor(edge.points.length / 2)] ?? [0, 0];
  return (
    <g
      className={[
        'wz-edge',
        `wz-edge-${edge.kind}`,
        edge.dangling && 'wz-dangling',
        taken && 'wz-taken',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <title>
        {edge.from} → {edge.dangling ? `${edge.to} (dangling)` : edge.to}
        {label ? ` — when ${label.full}` : ''}
        {taken ? ' — inferred from consecutive states' : ''}
      </title>
      <polyline points={points} fill="none" markerEnd="url(#wz-arrow)" />
      {label && (
        <text x={mid[0] + 4} y={mid[1] - 4} className="wz-edge-label">
          {label.short}
        </text>
      )}
    </g>
  );
}

export function FlowGraphView({
  graph,
  layout,
  view,
  activeStep = null,
  visited = [],
  takenEdge = null,
  selected = null,
  onSelect,
  onInspect,
  onLayout,
}: FlowGraphViewProps): ReactNode {
  const positioned = useMemo(() => (layout ?? layoutGraph)(graph), [graph, layout]);
  const byId = useMemo(() => new Map(graph.nodes.map((n) => [n.id, n])), [graph]);
  /** Layout order: what the arrow keys walk, and what the mirror table lists. */
  const order = useMemo(() => positioned.nodes.filter((n) => !n.ghost), [positioned]);

  const drawn = Math.min(positioned.edges.length, EDGE_DRAW_CAP);
  const active = useMemo(() => {
    const at = positioned.nodes.find((node) => node.id === activeStep);
    return at ? ([at.x + at.w / 2, at.y + at.h / 2] as const) : null;
  }, [positioned, activeStep]);

  /**
   * Reporting during render would set state in the parent mid-render; an
   * effect keyed on what changed reports once per real change instead.
   */
  useEffect(() => {
    onLayout?.({
      drawn,
      total: positioned.edges.length,
      width: positioned.width,
      height: positioned.height,
      active,
    });
  }, [onLayout, drawn, positioned, active]);

  const move = useCallback(
    (delta: number): void => {
      if (order.length === 0) return;
      const at = order.findIndex((n) => n.id === selected);
      const next = at === -1 ? 0 : Math.min(order.length - 1, Math.max(0, at + delta));
      onSelect?.(order[next]?.id ?? null);
    },
    [order, selected, onSelect]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<SVGSVGElement>): void => {
      const keys: Record<string, () => void> = {
        ArrowDown: () => move(1),
        ArrowRight: () => move(1),
        ArrowUp: () => move(-1),
        ArrowLeft: () => move(-1),
        Enter: () => {
          if (selected) onInspect?.(selected);
        },
        Escape: () => onSelect?.(null),
      };
      const handler = keys[event.key];
      if (!handler) return;
      event.preventDefault();
      handler();
    },
    [move, selected, onInspect, onSelect]
  );

  if (graph.nodes.length === 0) {
    return <p className="wz-message">flow has no steps</p>;
  }

  const vw = positioned.width / view.scale;
  const vh = positioned.height / view.scale;
  const cx = view.cx ?? positioned.width / 2;
  const cy = view.cy ?? positioned.height / 2;
  const viewBox = `${cx - vw / 2} ${cy - vh / 2} ${vw} ${vh}`;

  const table = (
    <table className={view.table ? 'wz-mirror' : 'wz-visually-hidden'}>
      <caption>Flow graph as a table</caption>
      <thead>
        <tr>
          <th scope="col">Node</th>
          <th scope="col">Kind</th>
          <th scope="col">Status</th>
          <th scope="col">Edges out</th>
        </tr>
      </thead>
      <tbody>
        {order.map((at) => {
          const node = byId.get(at.id);
          if (!node) return null;
          const out = positioned.edges.filter((e) => e.from === at.id);
          return (
            <tr key={at.id}>
              <th scope="row">{nodeLabel(node)}</th>
              <td>{kindOf(node)}</td>
              <td>{statusOf(at.id, activeStep, visited)}</td>
              <td>
                {out.length === 0
                  ? '—'
                  : out
                      .map(
                        (e) =>
                          `${e.kind} → ${e.to}${e.dangling ? ' (dangling)' : ''}${
                            e.when ? ` when ${formatExpr(e.when, 200).full}` : ''
                          }`
                      )
                      .join('; ')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="wz-graph">
      {!view.table && (
        <svg
          className="wz-svg"
          viewBox={viewBox}
          role="application"
          aria-roledescription="flow graph"
          aria-label="Flow graph. Arrow keys move between steps, Enter inspects, Escape clears."
          tabIndex={0}
          {...(selected ? { 'aria-activedescendant': `wz-node-${selected}` } : {})}
          onKeyDown={onKeyDown}
        >
          <defs>
            <marker
              id="wz-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L8,4 L0,8 z" />
            </marker>
          </defs>
          {positioned.edges.slice(0, EDGE_DRAW_CAP).map((edge, index) => (
            <Edge
              key={`${edge.from}-${edge.to}-${edge.kind}-${index}`}
              edge={edge}
              taken={takenEdge?.from === edge.from && takenEdge.to === edge.to}
            />
          ))}
          {order.map((at) => {
            const node = byId.get(at.id);
            if (!node) return null;
            return (
              <g
                key={at.id}
                onClick={() => (selected === at.id ? onInspect?.(at.id) : onSelect?.(at.id))}
              >
                <NodeShape
                  node={node}
                  at={at}
                  active={at.id === activeStep}
                  visited={visited.includes(at.id)}
                  selected={at.id === selected}
                />
              </g>
            );
          })}
          {positioned.nodes
            .filter((n) => n.ghost)
            .map((at) => (
              <g key={`ghost-${at.id}`} className="wz-ghost" aria-hidden="true">
                <rect x={at.x} y={at.y} width={at.w} height={at.h} rx={6} />
                <text
                  x={at.x + at.w / 2}
                  y={at.y + at.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {cut(at.id, LABEL_CHARS)}
                </text>
                <line
                  x1={at.x + 8}
                  y1={at.y + at.h / 2}
                  x2={at.x + at.w - 8}
                  y2={at.y + at.h / 2}
                />
              </g>
            ))}
        </svg>
      )}
      {table}
    </div>
  );
}
