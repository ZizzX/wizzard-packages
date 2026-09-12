import type { AsyncRegistry, FlowDefinition } from '@wizzard-packages/core/v1';
import { validateFlow, type FlowProblem } from '@wizzard-packages/core/validate-flow';

/**
 * Reading a flow that arrived from somewhere else.
 *
 * The order of the checks is the order of what can be wrong, cheapest first:
 * size, then JSON, then the shape `validateFlow` assumes, then the flow rules
 * themselves.
 *
 * The shape check is not politeness. `validateFlow` is typed for a
 * `FlowDefinition` and reads fields off it without guarding them: `order: 1`
 * reaches `for (const id of flow.order)` and throws, and a step of `null`
 * reaches a property read. Both are ordinary things for a broken service to
 * send, and a thrown `TypeError` is not a list of problems anyone can act on.
 *
 * The `try` around the validator is the belt to that pair of braces: this file
 * enumerates what is known to throw today, and a payload is exactly the input
 * that finds what it missed.
 */
export type LoadResult =
  | { ok: true; flow: FlowDefinition }
  | { ok: false; problems: readonly FlowProblem[] };

/** Characters, not bytes: the cheap gate that stops a generated file being parsed at all. */
const MAX_CHARS = 100_000;

const DOCS = 'https://zizzx.github.io/wizzard-packages/docs/server-driven/';

/** Problem, cause, fix, link - the shape every message in this library takes. */
const fail = (path: string, what: string, why: string, fix: string): LoadResult => ({
  ok: false,
  problems: [{ path, message: `[wizzard] ${what}. ${why}. ${fix}. ${DOCS}` }],
});

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** The fields the validator dereferences without checking them first. */
function shapeProblem(value: Record<string, unknown>): LoadResult | null {
  const { order, steps } = value;

  if (
    order !== undefined &&
    (!Array.isArray(order) || order.some((id) => typeof id !== 'string'))
  ) {
    return fail(
      'order',
      'order is not a list of step ids',
      'It names the sequence the flow walks, and everything that reads it walks it as a list of strings',
      'Send an array of step ids, or leave it out and the steps run in the order they are written'
    );
  }

  if (steps !== undefined) {
    if (!isObject(steps)) {
      return fail(
        'steps',
        'steps is not an object',
        'Every flow is a map of step ids to the steps themselves',
        'Send an object keyed by step id'
      );
    }
    for (const [id, step] of Object.entries(steps)) {
      if (!isObject(step)) {
        return fail(
          `steps.${id}`,
          `step "${id}" is ${step === null ? 'null' : typeof step}, not an object`,
          'Each entry describes one step, and the validator reads fields off it',
          `Send an object, empty if the step has nothing to say: "${id}": {}`
        );
      }
    }
  }

  return null;
}

/** Runs the validator without letting an unguarded read escape as an exception. */
function problemsOf(flow: FlowDefinition, registry: AsyncRegistry): LoadResult {
  try {
    const problems = validateFlow(flow, registry);
    return problems.length > 0 ? { ok: false, problems } : { ok: true, flow };
  } catch (error) {
    return fail(
      '',
      'the definition could not be checked',
      `the validator failed on it (${(error as Error).message})`,
      'This is a malformed payload rather than a flow with a mistake in it; check what the service sent'
    );
  }
}

export function loadFlow(text: string, registry: AsyncRegistry): LoadResult {
  if (text.length > MAX_CHARS) {
    return fail(
      '',
      `the payload is ${text.length} characters`,
      `Anything past ${MAX_CHARS} is not a flow someone wrote`,
      'Check that the service is sending a definition and not a page of something else'
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return fail(
      '',
      'the payload is not JSON',
      `parsing it failed (${(error as Error).message})`,
      'Check the response is the definition itself rather than an envelope around it'
    );
  }

  if (!isObject(parsed) || typeof parsed['id'] !== 'string' || !isObject(parsed['steps'])) {
    return fail(
      '',
      'the payload is not a flow',
      'A flow is an object with a string `id` and an object of `steps`',
      'Check the service is sending a flow definition'
    );
  }

  const shape = shapeProblem(parsed);
  if (shape !== null) return shape;

  return problemsOf(parsed as unknown as FlowDefinition, registry);
}

/**
 * A patch is a definition too, and `patchFlow` does not check it: it merges by
 * id and installs the result. So the merge happens here first, against the same
 * checks, and the patch is only handed over once the flow it would produce is
 * one the engine can run.
 */
export function checkPatch(
  current: FlowDefinition,
  text: string,
  registry: AsyncRegistry
): { ok: true; patch: Partial<FlowDefinition> } | { ok: false; problems: readonly FlowProblem[] } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return fail(
      '',
      'the patch is not JSON',
      `parsing it failed (${(error as Error).message})`,
      'Check the response is the patch itself rather than an envelope around it'
    ) as { ok: false; problems: readonly FlowProblem[] };
  }

  if (!isObject(parsed)) {
    return fail(
      '',
      'the patch is not an object',
      'A patch is a partial flow: the fields that changed, and nothing else',
      'Send an object with the fields to replace'
    ) as { ok: false; problems: readonly FlowProblem[] };
  }

  const shape = shapeProblem(parsed);
  if (shape !== null) return shape as { ok: false; problems: readonly FlowProblem[] };

  const merged = {
    ...current,
    ...parsed,
    steps: { ...current.steps, ...(parsed['steps'] as Record<string, unknown> | undefined) },
  } as unknown as FlowDefinition;

  const checked = problemsOf(merged, registry);
  return checked.ok
    ? { ok: true, patch: parsed as unknown as Partial<FlowDefinition> }
    : { ok: false, problems: checked.problems };
}
