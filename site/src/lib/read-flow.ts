/**
 * A flow arriving from a paste box, read into something the page can draw.
 *
 * Every failure is a value, never a throw: the inspector keeps the last valid
 * graph on screen and lists what is wrong underneath the box, so a reader who
 * pasted the wrong buffer still sees the picture they had a moment ago.
 *
 * The order of the checks is the order of the things that can be wrong, from
 * cheapest to most specific — size, then JSON, then shape, then the flow rules —
 * because `validateFlow` reads `flow.steps` without guarding it and a paste is
 * arbitrary text until proven otherwise.
 */
import { validateFlow, type FlowProblem } from '@wizzard-packages/core/validate-flow';

import type { FlowDefinition } from '@wizzard-packages/core/v1';

/**
 * Characters, not bytes: the box holds a string and the cap exists to stop a
 * generated flow from freezing the tab in `JSON.parse`, which counts the same
 * way. A megabyte of JSON is roughly ten thousand steps.
 */
export const MAX_CHARS = 1_000_000;

export interface ReadResult {
  /** Non-null only when `problems` is empty: a flow is drawn or it is not. */
  flow: FlowDefinition | null;
  problems: readonly FlowProblem[];
  /** No text at all, which is the empty state rather than a failure. */
  empty: boolean;
}

const problem = (path: string, message: string): ReadResult => ({
  flow: null,
  problems: [{ path, message }],
  empty: false,
});

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

/** What `validateFlow` assumes it was handed. Anything else is not a flow yet. */
function isFlowShaped(value: unknown): value is FlowDefinition {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const flow = value as Partial<FlowDefinition>;
  if (typeof flow.id !== 'string') return false;
  return typeof flow.steps === 'object' && flow.steps !== null && !Array.isArray(flow.steps);
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
      `this flow is ${text.length.toLocaleString('en')} characters; the inspector reads up to ${MAX_CHARS.toLocaleString('en')}`
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return problem('flow', whereInText(text, (error as Error).message));
  }

  if (!isFlowShaped(parsed)) {
    return problem(
      'flow',
      'this is valid JSON but not a flow: a flow is an object with a string `id` and a `steps` object'
    );
  }

  const problems = validateFlow(parsed);
  if (problems.length > 0) return { flow: null, problems, empty: false };
  return { flow: parsed, problems: [], empty: false };
}
