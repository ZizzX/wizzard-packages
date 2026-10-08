/**
 * Every module a user can import, as typedoc reads it: one entry point per
 * `exports` key, and each file's `@module` tag is the import path the API
 * reference shows. The site's build renders them; `scripts/check-api-docs.mjs`
 * fails when an export in them has no TSDoc. Paths are relative to this
 * directory.
 */
export const entryPoints = [
  '../packages/core/src/v1/index.ts',
  '../packages/core/src/v1/validate-flow.ts',
  '../packages/core/src/v1/graph.ts',
  '../packages/core/src/v1/groups.ts',
  '../packages/core/src/v1/session.ts',
  '../packages/core/src/v1/snapshot.ts',
  '../packages/core/src/v1/expr-builder.ts',
  '../packages/react/src/v1/index.tsx',
  '../packages/vue/src/v1/index.ts',
  '../packages/validate/src/index.ts',
  '../packages/plugins/src/persist.ts',
  '../packages/devtools/src/index.ts',
  '../packages/devtools/src/headless/index.ts',
];
