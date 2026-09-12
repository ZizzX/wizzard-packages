---
name: v1-readme-still-documents-0x
description: The getting-started surfaces are now all on v1 — site, root README and the core/react/vue package READMEs — and what still teaches 0.x is only what L8 deletes; the blast radius of the 0.x deletion is the remaining part.
metadata:
  node_type: memory
  type: project
  originSessionId: b9877435-edc2-4c73-808e-b08f8e53f76c
  modified: 2026-09-08T00:00:00.000Z
---

**Updated 2026-09-08 (PR #49).** The "two getting-started paths" problem is closed.
The site, `README.md` and `packages/{core,react,vue}/README.md` all teach
`defineFlow` and the `/v1` entries. `packages/{validate,devtools,plugins}`
were already v1. Nothing a new reader lands on teaches the class API any more.

The quickstart blocks in those READMEs are generated from
`examples/quickstart` by `scripts/embed-examples.mjs`, whose `DOCUMENTS` list
now carries the three package documents. Adding a fourth costs one line there;
writing a hand-maintained snippet instead is what the script exists to prevent.

**What still teaches 0.x, and why it is fine:** `.stackblitz/*` (all eight),
`examples/demo`, `examples/vue-demo`, `examples/shadcn-ui-connector`,
`docs/API_REFERENCE.md`, `docs/legacy/*`, `docs/api/*` (typedoc-generated), and
the four 0.x-only package READMEs. Every one of those is deleted or regenerated
by **L8 + D6**, so rewriting any of them now is work with a known expiry date.
The exception the plan calls out: `shadcn-ui-connector` becomes a site page
rather than being deleted.

**Still missing, and not deletions:** `docs/MIGRATION.md` (D2) does not exist,
and `ROADMAP.md`'s `## Compatibility` section still describes
`@wizzard-packages/compat` as a live plan although it was cancelled 2026-09-03
in favour of that MIGRATION file. `CONTRIBUTING.md` (D6) does not exist either.

**How to apply:** the docs blast radius of the 0.x deletion is now only the
list above, and it lands in one change with L8. Do not budget a README rewrite
into it — that is done. See [[v1-showcase-is-the-flow-graph]] and
[[wizzard-v1-flow-as-data]].
