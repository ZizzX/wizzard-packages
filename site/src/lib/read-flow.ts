/**
 * A flow arriving from a paste box, read into something the page can draw.
 *
 * Every failure is a value, never a throw: the inspector keeps the last valid
 * graph on screen and lists what is wrong underneath the box, so a reader who
 * pasted the wrong buffer still sees the picture they had a moment ago.
 *
 * The order of the checks is the order of the things that can be wrong, from
 * cheapest to most specific — size, JSON, shape, the work the drawing implies,
 * the flow rules, and finally the drawing itself. The shape check is not
 * politeness: `validateFlow` is typed for a `FlowDefinition` and reads its
 * fields without guarding them, so five ordinary malformed pastes throw out of
 * it. They are enumerated in `read-flow.test.ts`.
 *
 * **This function builds the graph, and that is the point.** Guarding one field
 * at a time is a game nobody wins: `label` was guarded, and then `when` reached
 * `formatExpr` and `repeat: null` reached `buildGraph`, each taking the island
 * down the same way. So the read ends by building what the page will draw,
 * inside the same `try`. A flow that cannot be built is not a flow this page
 * accepts, whatever field turns out to be the reason.
 */
import { buildGraph, type FlowGraph } from '@wizzard-packages/core/graph';
import { END, type FlowDefinition } from '@wizzard-packages/core/v1';
import { validateFlow, type FlowProblem } from '@wizzard-packages/core/validate-flow';
import { layoutGraph } from '@wizzard-packages/devtools/headless';

/**
 * Characters, not bytes: the box holds a string and this gate exists to stop a
 * generated file from being parsed at all. It is the cheap gate, not the real
 * one — the ceilings below are what bound the work and the drawing.
 */
export const MAX_CHARS = 1_000_000;

/**
 * Nodes the page will draw, which is the ceiling the design system already
 * states: `--graph-max-nodes` in `tokens.css`, declared there and until now
 * enforced nowhere.
 *
 * Checked against the built graph rather than guessed from the paste. The
 * difference is not academic: `layoutGraph` draws the root's nodes and does not
 * descend into a group's nested graph, so a root of five steps carrying a
 * forty-step sub-flow draws six nodes. Counting the paste rejected that flow and
 * told the reader it had forty-five steps to draw, which was false.
 */
export const MAX_NODES = 40;

/**
 * Edges the page will draw. Also counted on the built graph.
 *
 * At forty nodes the fall-through walk alone can emit 780, and declared
 * transitions add to it, so this is the number that decides whether the drawing
 * is a drawing.
 */
export const MAX_EDGES = 1_000;

/**
 * Steps anywhere in the paste, including inline sub-flows. This one bounds the
 * *work*, not the drawing: `buildGraph` walks into a group whose `flow` is a
 * definition, so a small root can make it build something large that is then
 * never drawn. Generous, because being large is not the same as being wrong.
 */
export const MAX_TOTAL_STEPS = 400;

/**
 * Transitions a flow may declare, checked before anything is built.
 *
 * `on.next` takes a list, and its length is not bounded by any step count: two
 * steps whose `a.on.next` repeats a valid target a hundred thousand times is
 * 400 kB of legal JSON and 100 001 edges — measured. This is the gate that
 * stops the builder ever seeing it.
 */
export const MAX_TARGETS = 200;

const DOCS = 'https://github.com/ZizzX/wizzard-packages/blob/main/docs/errors.md#inspector-paste';

export interface ReadResult {
  /** Non-null only when `problems` is empty: a flow is drawn or it is not. */
  flow: FlowDefinition | null;
  /**
   * The graph of that flow, built here so that building it cannot fail later.
   * The caller draws this rather than building its own.
   */
  graph: FlowGraph | null;
  problems: readonly FlowProblem[];
  /** No text at all, which is the empty state rather than a failure. */
  empty: boolean;
}

/** One failure, in the shape every message in this repository has. */
const problem = (path: string, what: string, why: string, fix: string): ReadResult => ({
  flow: null,
  graph: null,
  problems: [{ path, message: `[wizzard] ${what}. ${why}. ${fix}. ${DOCS}` }],
  empty: false,
});

const count = (n: number): string => n.toLocaleString('en');

/** A value as it reads in a message. `undefined` has no JSON of its own. */
const asJson = (value: unknown): string => JSON.stringify(value) ?? 'undefined';

/**
 * `Unexpected token } in JSON at position 42` says where, in the one unit a
 * reader cannot use. The position is turned into a line and a column against
 * the text they are looking at; when the engine gives no position the message
 * stands on its own rather than being decorated with a guess.
 */
function whereInText(text: string, message: string): string {
  const at = /at position (\d+)/.exec(message);
  if (at === null) return message;
  const position = Math.min(Number(at[1]), text.length);
  const before = text.slice(0, position);
  const line = before.split('\n').length;
  const column = position - before.lastIndexOf('\n');
  return `${message} (line ${line}, column ${column})`;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** What `validateFlow` assumes it was handed. Anything else is not a flow yet. */
function outerShape(value: unknown): value is { id: string; steps: Record<string, unknown> } {
  if (!isPlainObject(value)) return false;
  return typeof value.id === 'string' && isPlainObject(value.steps);
}

/**
 * The fields `validateFlow` dereferences without guarding, checked here so a
 * malformed paste is a sentence rather than a stack trace.
 *
 * Deliberately not a mirror of the whole `FlowDefinition` type: this covers
 * what actually throws, and `readFlow` catches anything past it. Making the
 * core validator total for untrusted input is the deeper fix and belongs to
 * L6, not to a site route.
 */
function shapeProblem(
  flow: { steps: Record<string, unknown> },
  at = 'steps',
  depth = 0
): ReadResult | null {
  const { order } = flow as { order?: unknown };
  if (
    order !== undefined &&
    (!Array.isArray(order) || order.some((id) => typeof id !== 'string'))
  ) {
    return problem(
      at === 'steps' ? 'order' : `${at.slice(0, -6)}order`,
      'order is not a list of step ids',
      'It names the sequence the flow walks, and everything that reads it walks it as a list of strings',
      'Give it an array of step ids, or leave it out and the steps run in the order they are written'
    );
  }

  for (const [id, step] of Object.entries(flow.steps)) {
    // `@end` is the builder's own terminal, added to every graph. A step that
    // takes the name gives the drawing two nodes under one id, which React
    // answers by keeping one and dropping the other — so the step vanishes from
    // the picture while remaining in the flow.
    if (id === END) {
      return problem(
        `${at}.${id}`,
        `a step is named "${END}", which is the name of the end of a flow`,
        'The builder adds a node under that id to every graph, so the drawing would hold two nodes with one name and show one of them',
        'Rename the step; the end is drawn for you and needs no step of its own'
      );
    }

    if (!isPlainObject(step)) {
      return problem(
        `${at}.${id}`,
        `step "${id}" is ${asJson(step)}, not an object`,
        'Every entry in steps describes one step, and the validator reads fields off it',
        `Give it an object, empty if the step has nothing to say: "${id}": {}`
      );
    }

    // The builder copies `label` onto the node and the painter renders it as a
    // React child. `validateFlow` has no opinion on it: a label is the host's
    // business everywhere except here, where the host is a stranger.
    const { label } = step as { label?: unknown };
    if (label !== undefined && typeof label !== 'string') {
      return problem(
        `${at}.${id}.label`,
        `step "${id}" has a label that is ${asJson(label)}, not a string`,
        'A label is drawn inside the node and read out in the table beside it, so it has to be text',
        'Use a string, or leave the label out and the step is drawn under its id'
      );
    }

    const group = step as { flow?: unknown };
    if (group.flow !== undefined && typeof group.flow !== 'string' && !isPlainObject(group.flow)) {
      return problem(
        `${at}.${id}.flow`,
        `group "${id}" names its sub-flow as ${asJson(group.flow)}`,
        'A group carries either a definition or the name of one, and nothing else can be walked',
        'Use the sub-flow object itself, or a string naming a registered flow'
      );
    }

    // Into inline sub-flows, at the same depth the engine walks. They are not
    // drawn today — `layoutGraph` does not descend into a group's nested graph
    // — so this is latent, and it stops being latent the day the inspector
    // expands a group.
    if (isPlainObject(group.flow) && depth < 32) {
      const inner = group.flow as { steps?: unknown };
      if (isPlainObject(inner.steps)) {
        const nested = shapeProblem(
          inner as { steps: Record<string, unknown> },
          `${at}.${id}.flow.steps`,
          depth + 1
        );
        if (nested !== null) return nested;
      }
    }
  }

  return null;
}

/**
 * What the builder will have to draw, counted before it draws it.
 *
 * Both numbers are taken across inline sub-flows, because `buildGraph` walks
 * into a group whose `flow` is a definition rather than a name. A string
 * reference is not followed: that flow is not in the paste, and the inspector
 * has no registry to resolve it against.
 *
 * Depth is guarded at the same 32 the engine uses, and a definition is weighed
 * once, so a flow that refers to itself is counted rather than followed.
 */
function weigh(flow: Record<string, unknown>): { steps: number; targets: number } {
  let steps = 0;
  let targets = 0;
  const seen = new Set<unknown>();

  const walk = (f: Record<string, unknown>, depth: number): void => {
    if (depth > 32 || seen.has(f)) return;
    seen.add(f);
    const table = f.steps;
    if (!isPlainObject(table)) return;

    for (const step of Object.values(table)) {
      if (!isPlainObject(step)) continue;
      steps += 1;

      const on = step.on;
      if (isPlainObject(on)) {
        targets += Array.isArray(on.next) ? on.next.length : on.next === undefined ? 0 : 1;
        if (on.back !== undefined) targets += 1;
      }

      if (isPlainObject(step.flow)) walk(step.flow, depth + 1);
    }
  };

  walk(flow, 0);
  return { steps, targets };
}

/**
 * Read a pasted flow.
 *
 * Note for whoever adds a registry here later: `validateFlow`'s `$ref` check is
 * a no-op without one, so an unknown `$ref` in a pasted flow passes silently
 * today. That is harmless while nothing is evaluated — the inspector draws a
 * pasted flow and never runs it — and stops being harmless the moment this page
 * grows a registry.
 */
export function readFlow(text: string): ReadResult {
  if (text.trim() === '') return { flow: null, graph: null, problems: [], empty: true };

  if (text.length > MAX_CHARS) {
    return problem(
      'flow',
      `this flow is ${count(text.length)} characters and the inspector reads up to ${count(MAX_CHARS)}`,
      'Past that the text is parsed before anything could stop it',
      'Trim the flow, or open it in the devtools panel, which loads it from your own application'
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return problem(
      'flow',
      `this is not JSON: ${whereInText(text, (error as Error).message)}`,
      'A flow is a JSON object, so the text has to parse before anything can read it',
      'Fix the syntax at that position and draw it again'
    );
  }

  if (!outerShape(parsed)) {
    return problem(
      'flow',
      'this is valid JSON but not a flow definition',
      'A flow is an object with a string id and a steps object, and both are read before anything else',
      'Wrap the steps: { "id": "signup", "steps": { … } }'
    );
  }

  // The work gates, before anything is built. They bound what `buildGraph` is
  // asked to do; the drawing gates below bound what the page is asked to draw.
  const size = weigh(parsed);
  if (size.steps > MAX_TOTAL_STEPS) {
    return problem(
      'steps',
      `this flow has ${count(size.steps)} steps, counting its sub-flows, and the inspector reads up to ${count(MAX_TOTAL_STEPS)}`,
      'The builder walks into every sub-flow written out in the paste, whether or not the drawing shows it',
      'Draw a smaller flow here, or use the devtools panel, which docks beside a running wizard'
    );
  }
  if (size.targets > MAX_TARGETS) {
    return problem(
      'steps',
      `this flow declares ${count(size.targets)} transitions and the inspector reads up to ${count(MAX_TARGETS)}`,
      'An on.next list is a branch per entry and a drawn edge per branch, and a short flow can declare thousands of them',
      'Draw a smaller flow here, or use the devtools panel, which docks beside a running wizard'
    );
  }

  const shaped = shapeProblem(parsed);
  if (shaped !== null) return shaped;

  // The net. `validateFlow` is typed for a definition it trusts, so a shape
  // this file has not learned about yet lands here as a sentence rather than
  // as a crashed island.
  let problems: FlowProblem[];
  try {
    problems = validateFlow(parsed as FlowDefinition);
  } catch (error) {
    return problem(
      'flow',
      `this flow could not be checked: ${(error as Error).message}`,
      'It is malformed in a way this page does not name yet, and the validator reads a field that is not there',
      'Compare it against the example flow, which the Load example button puts in the box'
    );
  }

  if (problems.length > 0) return { flow: null, graph: null, problems, empty: false };

  // Build it here, inside the same `try` discipline. Guarding one field at a
  // time is a game nobody wins — `label`, then `when`, then `repeat` — so the
  // read ends by doing what the page would do, and a flow that cannot be built
  // is simply not one this page accepts.
  const flow = parsed as FlowDefinition;
  let graph: FlowGraph;
  let drawn: number;
  try {
    graph = buildGraph(flow);
    // Laid out as well as built, because the drawing gate below has to count
    // what is drawn and the layout is where the count changes: a transition to
    // a target the flow never declares becomes a placeholder node, born after
    // every gate that reads the paste. A graph of three nodes drew sixty-three.
    drawn = layoutGraph(graph).nodes.length;
  } catch (error) {
    return problem(
      'flow',
      `this flow could not be drawn: ${(error as Error).message}`,
      'The builder or the layout reads a field whose shape it did not expect, and neither is written to survive one',
      'Compare it against the example flow, which the Load example button puts in the box'
    );
  }

  // The drawing gates, on what was actually built rather than on what the paste
  // seemed to promise. `layoutGraph` draws the root's nodes and does not descend
  // into a group's nested graph, so counting the paste rejected flows that would
  // have drawn six nodes and told the reader they had forty-five.
  if (drawn > MAX_NODES) {
    return problem(
      'steps',
      `this flow draws ${count(drawn)} nodes and the inspector draws up to ${count(MAX_NODES)}`,
      'A graph past forty nodes has stopped being readable well before it stops rendering',
      'Draw a smaller flow here, or use the devtools panel, which docks beside a running wizard'
    );
  }
  if (graph.edges.length > MAX_EDGES) {
    return problem(
      'steps',
      `this flow draws ${count(graph.edges.length)} edges and the inspector draws up to ${count(MAX_EDGES)}`,
      'Every conditional step adds a fall-through edge to every later one, so the edges grow as the square of the nodes',
      'Draw a smaller flow here, or use the devtools panel, which docks beside a running wizard'
    );
  }

  return { flow, graph, problems: [], empty: false };
}
