/**
 * One validation adapter, not one per library.
 *
 * 0.x shipped `adapter-zod` and `adapter-yup`, two packages that differed only
 * in how they spelled "list the failures". Standard Schema makes that
 * difference disappear: Zod 3.24+, Zod 4, Valibot, ArkType, Effect and Yup 1.5+
 * all expose the same `~standard` property, so one function covers every one of
 * them and every library that adopts the spec later, without a release here.
 *
 * The output is what the engine's validator contract asks for: a flat map from
 * dot-path to message, or `null` when the value is good.
 */

import { getPath, type AsyncResolver } from '@wizzard-packages/core/v1';

import type { StandardIssue, StandardSchemaV1 } from './standard';

export type { StandardIssue, StandardResult, StandardSchemaV1 } from './standard';

/** Dot-path to message. The empty key holds an error about the value as a whole. */
export type FieldErrors = Readonly<Record<string, string>>;

const segment = (s: PropertyKey | { readonly key: PropertyKey }): string =>
  String(typeof s === 'object' ? s.key : s);

/**
 * Flattens Standard Schema issues into the engine's error map.
 *
 * First issue per path wins. Schemas report in declaration order, so the first
 * is the failure the author wrote first; letting a later cross-field refinement
 * overwrite it hides the obvious problem behind the subtle one.
 */
export function issuesToErrors(issues: readonly StandardIssue[]): FieldErrors {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path?.map(segment).join('.') ?? '';
    if (!(key in errors)) errors[key] = issue.message;
  }
  return errors;
}

/**
 * Turns a Standard Schema into a resolver, for the registry a flow's
 * `validate: { $ref }` looks names up in.
 *
 * ```ts
 * createWizard({
 *   flow,
 *   registry: { tripRules: schema(z.object({ name: z.string().min(1) })) },
 * });
 * ```
 *
 * `at` is a path into the same scope the flow's expressions address, so it uses
 * the vocabulary already in the definition: `data`, `data.trip`, `ctx.user`.
 * It defaults to `data`, the whole form, because most schemas describe the
 * fields of the step being left and object schemas ignore keys they do not
 * mention.
 */
export function schema(s: StandardSchemaV1, opts?: { at?: string }): AsyncResolver {
  const at = opts?.at ?? 'data';
  return async (_args, scope) => {
    const result = await s['~standard'].validate(getPath(scope, at));
    const issues = result.issues;
    return issues && issues.length > 0 ? issuesToErrors(issues) : null;
  };
}
