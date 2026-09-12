---
name: yup-speaks-standard-schema
description: 'Yup 1.5+ implements Standard Schema, so the planned Yup shim was never built.'
metadata:
  node_type: memory
  type: project
  originSessionId: 3a980c57-43ec-4331-9be0-0adeccdf1e41
  modified: 2026-08-29T21:13:42.316Z
---

Yup has implemented Standard Schema since 1.5 and returns issues in the same
shape as Zod — `{ message, path: PropertyKey[] }`. Verified against yup 1.7.1 on
2026-08-30 by probing `schema['~standard'].validate()` directly.

The v1 plan and the old `ROADMAP.md` table both promised a "Yup shim (~20 lines)"
next to the Standard Schema adapter, written when Yup was assumed not to support
the spec. It was never needed and was never built:
`@wizzard-packages/validate` has one code path and no vendor branches, and its
test suite runs identical assertions against Zod 4 and Yup 1.7.

**Why:** anyone reading the plan will look for the missing shim and think it was
forgotten. It was cut on evidence, not skipped.

**How to apply:** a Standard Schema vendor needs no adapter of its own here. If a
library genuinely lacks `~standard`, wrap it in a hand-written object of that
shape rather than adding a branch to `schema()`. Do not re-add the shim without
re-probing the version in question. See [[wizzard-v1-flow-as-data]].
