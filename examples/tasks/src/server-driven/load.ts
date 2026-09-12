import type { AsyncRegistry, FlowDefinition } from '@wizzard-packages/core/v1';
import { validateFlow, type FlowProblem } from '@wizzard-packages/core/validate-flow';

/**
 * Reading a flow that arrived from somewhere else.
 *
 * The order of the checks is the order of what can be wrong, cheapest first:
 * size, then JSON, then the shape `validateFlow` assumes, then the flow rules
 * themselves. The shape check is not politeness - `validateFlow` is typed for a
 * `FlowDefinition` and reads fields off it without guarding them, so an
 * ordinary malformed payload throws out of it rather than being reported.
 *
 * Every failure is a value. A definition from a backend is untrusted input like
 * any other, and a page that renders a list of problems is more use than a
 * stack trace.
 */
export type LoadResult =
  | { ok: true; flow: FlowDefinition }
  | { ok: false; problems: readonly FlowProblem[] };

/** Characters, not bytes: the cheap gate that stops a generated file being parsed at all. */
const MAX_CHARS = 100_000;

const fail = (path: string, message: string): LoadResult => ({
  ok: false,
  problems: [{ path, message }],
});

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function loadFlow(text: string, registry: AsyncRegistry): LoadResult {
  if (text.length > MAX_CHARS) {
    return fail('', `the payload is ${text.length} characters, past the ${MAX_CHARS} limit`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return fail('', `the payload is not JSON (${(error as Error).message})`);
  }

  // What `validateFlow` assumes it was handed. Anything else is not a flow yet.
  if (!isObject(parsed) || typeof parsed['id'] !== 'string' || !isObject(parsed['steps'])) {
    return fail('', 'a flow needs a string `id` and an object of `steps`');
  }

  const flow = parsed as unknown as FlowDefinition;
  const problems = validateFlow(flow, registry);
  return problems.length > 0 ? { ok: false, problems } : { ok: true, flow };
}
