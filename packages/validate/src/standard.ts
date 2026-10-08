/**
 * The Standard Schema interface, declared here rather than imported.
 *
 * The spec is structural: a schema is anything carrying a `~standard` property
 * of this shape. Declaring it locally costs twenty lines of types that vanish
 * at build time, and buys a self-contained `.d.ts` — no dependency for a
 * consumer to resolve, nothing for `attw` to trip over.
 *
 * @see https://standardschema.dev
 */
export interface StandardSchemaV1<Output = unknown> {
  readonly '~standard': {
    readonly version: 1;
    readonly vendor: string;
    /** Checks a value against the schema, returning the result or a promise of it. */
    readonly validate: (value: unknown) => StandardResult<Output> | Promise<StandardResult<Output>>;
  };
}

/** What `validate` returns: the parsed `value`, or the `issues` that rejected the input. */
export type StandardResult<Output> =
  | { readonly value: Output; readonly issues?: undefined }
  | { readonly issues: readonly StandardIssue[] };

/** One problem a schema reported: its message and the path to the value it is about. */
export interface StandardIssue {
  readonly message: string;
  /** Absent or empty for an error about the value as a whole. */
  readonly path?: readonly (PropertyKey | { readonly key: PropertyKey })[];
}
