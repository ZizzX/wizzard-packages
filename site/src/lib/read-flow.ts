/**
 * A flow arriving from a paste box, read into something the page can draw.
 *
 * Every failure is a value, never a throw: the inspector keeps the last valid
 * graph on screen and lists what is wrong underneath the box, so a reader who
 * pasted the wrong buffer still sees the picture they had a moment ago.
 *
 * The order of the checks is the order of the things that can be wrong, from
 * cheapest to most specific — size, JSON, shape, size again in steps, then the
 * flow rules. The shape check is not politeness: `validateFlow` is typed for a
 * `FlowDefinition` and reads its fields without guarding them, so five ordinary
 * malformed pastes throw out of it. They are enumerated in `read-flow.test.ts`.
 */
import { validateFlow, type FlowProblem } from '@wizzard-packages/core/validate-flow';

import type { FlowDefinition } from '@wizzard-packages/core/v1';

/**
 * Characters, not bytes: the box holds a string and this gate exists to stop a
 * generated file from being parsed at all. It is the cheap gate, not the real
 * one — `MAX_STEPS` is what bounds the work.
 */
export const MAX_CHARS = 1_000_000;

/**
 * The ceiling the design system already states: `--graph-max-nodes` in
 * `tokens.css`, declared there and until now enforced nowhere.
 *
 * A character count does not bound the work. The builder emits a fall-through
 * edge from every conditional step to every later one, so edges grow as n²:
 * measured here, 200 steps is 20 100 edges and 800 steps is 320 400, which is a
 * DOM no browser draws. Forty steps is 780 edges at worst, and a graph past
 * forty nodes has stopped being readable long before it stops rendering.
 *
 * Counted across inline sub-flows too: `buildGraph` walks into a group whose
 * `flow` is a definition, so a root with three steps can carry a thousand.
 */
export const MAX_STEPS = 40;

/**
 * Transitions a flow may declare, which is the other half of the same bound and
 * the one the step count does not reach.
 *
 * `on.next` takes a list, and the list is not bounded by anything the step count
 * sees: two steps whose `a.on.next` repeats a valid target a hundred thousand
 * times is 400 kB of legal JSON, passes both gates above, and builds 100 001
 * edges — measured. So the declared transitions are counted as well, and the two
 * ceilings together put a real bound on the drawing: at worst 780 fall-through
 * edges plus this.
 */
export const MAX_TARGETS = 200;

const DOCS = 'https://github.com/ZizzX/wizzard-packages/blob/main/docs/errors.md#inspector-paste';

export interface ReadResult {
  /** Non-null only when `problems` is empty: a flow is drawn or it is not. */
  flow: FlowDefinition | null;
  problems: readonly FlowProblem[];
  /** No text at all, which is the empty state rather than a failure. */
  empty: boolean;
}

/** One failure, in the shape every message in this repository has. */
const problem = (path: string, what: string, why: string, fix: string): ReadResult => ({
  flow: null,
  problems: [{ path, message: `[wizzard] ${what}. ${why}. ${fix}. ${DOCS}` }],
  empty: false,
});

const count = (n: number): string => n.toLocaleString('en');

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
function shapeProblem(flow: { id: string; steps: Record<string, unknown> }): ReadResult | null {
  const { order } = flow as { order?: unknown };
  if (
    order !== undefined &&
    (!Array.isArray(order) || order.some((id) => typeof id !== 'string'))
  ) {
    return problem(
      'order',
      'order is not a list of step ids',
      'It names the sequence the flow walks, and everything that reads it walks it as a list of strings',
      'Give it an array of step ids, or leave it out and the steps run in the order they are written'
    );
  }

  for (const [id, step] of Object.entries(flow.steps)) {
    if (!isPlainObject(step)) {
      return problem(
        `steps.${id}`,
        `step "${id}" is ${JSON.stringify(step) ?? 'undefined'}, not an object`,
        'Every entry in steps describes one step, and the validator reads fields off it',
        `Give it an object, empty if the step has nothing to say: "${id}": {}`
      );
    }
    // The builder copies `label` onto the node and the painter renders it as a
    // React child, which throws "Objects are not valid as a React child" and
    // takes the island down. `validateFlow` has no opinion on it: a label is
    // the host's business everywhere except here, where the host is a stranger.
    const { label } = step as { label?: unknown };
    if (label !== undefined && typeof label !== 'string') {
      return problem(
        `steps.${id}.label`,
        `step "${id}" has a label that is ${JSON.stringify(label) ?? 'undefined'}, not a string`,
        'A label is drawn inside the node and read out in the table beside it, so it has to be text',
        'Use a string, or leave the label out and the step is drawn under its id'
      );
    }

    const group = step as { flow?: unknown };
    if (group.flow !== undefined && typeof group.flow !== 'string' && !isPlainObject(group.flow)) {
      return problem(
        `steps.${id}.flow`,
        `group "${id}" names its sub-flow as ${JSON.stringify(group.flow) ?? 'undefined'}`,
        'A group carries either a definition or the name of one, and nothing else can be walked',
        'Use the sub-flow object itself, or a string naming a registered flow'
      );
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
  if (text.trim() === '') return { flow: null, problems: [], empty: true };

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

  const size = weigh(parsed);
  if (size.steps > MAX_STEPS) {
    return problem(
      'steps',
      `this flow has ${count(size.steps)} steps and the inspector draws up to ${count(MAX_STEPS)}`,
      'Every conditional step adds a fall-through edge to every later one, so the drawing grows as the square of the count',
      'Draw a smaller flow here, or use the devtools panel, which docks beside a running wizard'
    );
  }
  if (size.targets > MAX_TARGETS) {
    return problem(
      'steps',
      `this flow declares ${count(size.targets)} transitions and the inspector draws up to ${count(MAX_TARGETS)}`,
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

  if (problems.length > 0) return { flow: null, problems, empty: false };
  return { flow: parsed as FlowDefinition, problems: [], empty: false };
}
