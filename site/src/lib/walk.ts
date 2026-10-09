/**
 * The route walk: the homepage's one authored motion (site/DESIGN.md, Motion;
 * docs/designs/home-route-walk.md).
 *
 * The engine writes it and the stylesheet performs it. `recordWalk` runs a real
 * wizard from `start()` to its end and keeps a view of every position.
 * `walkBeats` turns those positions into beats - shares of the walk from 0 to 1 -
 * which `FlowGraph` hands to CSS as custom properties. Nothing here knows what
 * the walk looks like, and nothing in the stylesheet knows which steps exist.
 *
 * The beats cover a flat route, on purpose: a group step would need beats for
 * its children, and the one walk on the site has none.
 *
 * What this throws stops the site's build, and only whoever edits the homepage
 * meets it - never a library user. So it carries no `[wizzard]` prefix and no
 * `errors/<code>` page, which are for messages the packages throw; it keeps the
 * rest of their shape: what went wrong, why, and the fix.
 */
import {
  createWizard,
  END,
  evaluate,
  getPath,
  type AsyncRegistry,
  type Expr,
  type FlowDefinition,
  type Scope,
} from '@wizzard-packages/core';

import { printExpr } from './print-expr';

import type { GraphView } from '../components/FlowGraph';
import type { FlowGraph as Graph } from '@wizzard-packages/core/graph';

/** Where a beat starts and ends, as shares of the whole walk. */
export interface Beat {
  readonly from: number;
  readonly to: number;
}

export interface Walk {
  /** The frame the walk settles on, which is also what the graph draws without motion. */
  readonly view: GraphView;
  /** Each step on the route: when it lights up, and when it settles to visited. */
  readonly steps: Readonly<Record<string, { readonly on: Beat; readonly off: Beat }>>;
  /**
   * Each step the route passed over: the beat in which it is probed and breaks,
   * the route step it was probed from, and its condition with the data in it.
   */
  readonly dropped: Readonly<
    Record<string, { readonly beat: Beat; readonly from: string; readonly reason: string | null }>
  >;
  /** Each edge the route runs along, keyed `from->to`. */
  readonly runs: Readonly<Record<string, Beat>>;
  /** The end marker filling. */
  readonly finish: Beat;
  /** The ring spreading from it. */
  readonly ring: Beat;
}

/**
 * Every position of a real walk through `flow`, from the first step to the end.
 *
 * The data has to carry the flow all the way: a validator that refuses stops
 * the build with the step and the fields it asked for, rather than drawing a
 * walk the engine would not take.
 */
export async function recordWalk(
  flow: FlowDefinition,
  data: Record<string, unknown>,
  registry?: AsyncRegistry
): Promise<readonly GraphView[]> {
  const wizard = createWizard({ flow, data, ...(registry !== undefined && { registry }) });
  const view = (ended: boolean): GraphView => {
    const snapshot = wizard.getSnapshot();
    return { standing: snapshot.current, breadcrumbs: snapshot.breadcrumbs, refused: false, ended };
  };
  // One move per step and one more for the end. A walk longer than that is going round.
  const limit = Object.keys(flow.steps).length + 1;
  try {
    const frames: GraphView[] = [];
    let result = await wizard.start();
    for (let moves = 0; moves < limit; moves += 1) {
      if (!result.ok) {
        const at = wizard.getSnapshot().current ?? 'its first step';
        throw new Error(
          `route walk: ${flow.id} was refused on ${at} (${result.code}). The walk runs the real engine, so the data has to let every step pass. Give it what the step asked for: ${JSON.stringify(result.errors ?? {})}.`
        );
      }
      if (result.to === END) {
        frames.push(view(true));
        return frames;
      }
      frames.push(view(false));
      result = await wizard.next();
    }
    throw new Error(
      `route walk: ${flow.id} did not reach its end in ${limit} moves. A walk is a straight run from the first step to the end, so the flow is going round. Check its \`on.next\` targets.`
    );
  } finally {
    wizard.destroy();
  }
}

/**
 * A condition with the data put in, so the reader sees why it failed:
 * `data.payer == "business"` under `payer: personal` reads
 * `"personal" != "business"`. Only a top-level `$eq` that failed is turned
 * round; anything else is printed as substituted.
 */
export function reason(when: Expr | undefined, data: Record<string, unknown>): string | null {
  if (when === undefined) return null;
  const scope: Scope = { data, ctx: {} };
  const fill = (expr: unknown): unknown => {
    if (Array.isArray(expr)) return expr.map(fill);
    if (expr === null || typeof expr !== 'object') return expr;
    if ('$get' in expr) return getPath(scope, String(expr.$get)) ?? null;
    return Object.fromEntries(Object.entries(expr).map(([key, value]) => [key, fill(value)]));
  };
  const shown = fill(when);
  const turned =
    shown !== null && typeof shown === 'object' && '$eq' in shown && evaluate(when, scope) === false
      ? { $ne: shown.$eq }
      : shown;
  return printExpr(turned, 26).short;
}

/** The drawn length of a polyline, which the comet needs to run its whole edge. */
export function polylineLength(points: readonly (readonly [number, number])[]): number {
  return points.slice(1).reduce((sum, [x, y], index) => {
    const [px, py] = points[index] as readonly [number, number];
    return sum + Math.hypot(x - px, y - py);
  }, 0);
}

// Relative weights of the beats, tuned by eye against the prototype the owner chose.
const ON = 1;
const GAP = 0.5;
const PROBE = 3.5;
const RUN = 3;
const SETTLE = 0.25;
const FINISH = 1;
const RING = 1.5;

/**
 * The beats of a recorded walk, in walk order: the first step lights; then for
 * each move, every step passed over is probed and breaks, the comet runs the
 * edge to the next step while the one it left settles, and the next step lights
 * - or, at the end, the end fills and sends out its ring.
 */
export function walkBeats(
  frames: readonly GraphView[],
  graph: Graph,
  data: Record<string, unknown>
): Walk {
  const last = frames.at(-1);
  const route = frames.filter((frame) => !frame.ended).flatMap((frame) => frame.standing ?? []);
  const first = route[0];
  if (last === undefined || first === undefined) {
    throw new Error(
      'route walk: there are no frames to beat. recordWalk returns at least the first step and the end; pass what it returned.'
    );
  }
  const end = graph.nodes.find((node) => node.kind === 'end')?.id ?? END;
  const order = graph.nodes.filter((node) => node.kind !== 'end').map((node) => node.id);
  const onRoute = new Set(last.breadcrumbs.map((crumb) => crumb.id));

  let clock = 0;
  const span = (weight: number): Beat => {
    const beat = { from: clock, to: clock + weight };
    clock += weight;
    return beat;
  };

  const lit: Record<string, Beat> = { [first]: span(ON) };
  clock += GAP;
  const steps: Record<string, { on: Beat; off: Beat }> = {};
  const dropped: Record<string, { beat: Beat; from: string; reason: string | null }> = {};
  const runs: Record<string, Beat> = {};
  let finish: Beat = { from: 0, to: 0 };
  let ring: Beat = { from: 0, to: 0 };

  route.forEach((id, index) => {
    const next = route[index + 1] ?? end;
    const passed = order
      .slice(order.indexOf(id) + 1, next === end ? undefined : order.indexOf(next))
      .filter((step) => !onRoute.has(step));
    for (const step of passed) {
      const node = graph.nodes.find((candidate) => candidate.id === step);
      dropped[step] = { beat: span(PROBE), from: id, reason: reason(node?.when, data) };
    }
    const run = span(RUN);
    runs[`${id}->${next}`] = run;
    steps[id] = { on: lit[id] ?? run, off: { from: run.to - RUN * SETTLE, to: run.to } };
    if (next === end) {
      finish = span(FINISH);
      ring = { from: finish.from + FINISH / 2, to: finish.from + FINISH / 2 + RING };
      clock = ring.to;
    } else {
      lit[next] = span(ON);
      clock += GAP;
    }
  });

  const share = (beat: Beat): Beat => ({ from: beat.from / clock, to: beat.to / clock });
  const each = <T>(record: Record<string, T>, map: (value: T) => T): Record<string, T> =>
    Object.fromEntries(Object.entries(record).map(([key, value]) => [key, map(value)]));

  return {
    view: last,
    steps: each(steps, (step) => ({ on: share(step.on), off: share(step.off) })),
    dropped: each(dropped, (step) => ({ ...step, beat: share(step.beat) })),
    runs: each(runs, share),
    finish: share(finish),
    ring: share(ring),
  };
}
