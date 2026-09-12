---
name: core-v1-entries-are-budget-boundaries
description: validate-flow and graph are separate core entries on purpose; re-exporting either from v1/index.ts would silently blow the 3.9 kB engine budget.
metadata:
  node_type: memory
  type: project
  modified: 2026-09-05T19:31:46.932Z
  originSessionId: 9ca8b8b0-62d1-4061-837f-b75c6e9eb951
---

`packages/core/src/v1/index.ts` deliberately does **not** re-export
`validate-flow.ts` or `graph.ts`. Each is its own tsup entry, its own
`exports` key (`./validate-flow`, `./graph`) and its own `.size-limit.js`
ratchet.

**Why:** the `core-v1` entry is budgeted at 3.9 kB gzip and measured 3.88 kB
after the graph builder landed — 20 bytes of headroom. Both modules are
development and inspection concerns: a wizard that never validates a
server-sent flow, or never draws itself, should carry neither. Adding a line
to `index.ts` looks like tidying an oversight and would blow the budget in
one commit. The size-limit entry is the tripwire, but only if nobody
"helpfully" adds the re-export first.

Group and repeat traversal is reserved for the same treatment, for the same
reason.

`session.ts` (`RecordedSession` / `checkSession`, landed in #25) is the third
such module. It was unwired for a while and that read like an oversight; it is
now a full entry like the others — `./session` in `exports`, its own 1.2 kB
size-limit line. Do not re-export it either.

**How to apply:** a new core module that is not needed to _run_ a wizard gets
its own entry, not a line in `index.ts` — and its own size-limit entry in the
same PR, per the design review's E1. Consumers import
`@wizzard-packages/core/graph`, never `@wizzard-packages/core/v1`. Related:
[[v1-showcase-is-the-flow-graph]], [[wizzard-v1-flow-as-data]].

**Update 2026-09-08:** the published sub-entries are now `./v1`,
`./validate-flow`, `./graph`, `./groups`, `./session`, `./snapshot` and
`./expr` — seven, not the three this note was written about. Read
`packages/core/package.json` for the current list rather than this file.

**Update 2026-09-06 (L9, #40):** `groups` joined the sub-entries (`@wizzard-packages/core/groups`,
~3 kB, own line). The seam that installs it is inside `core-v1` and cost 478 B measured, not
the ~200 B the design note estimated: the mandated four-clause message with a 101-character
docs URL alone is 156 B, and no wording trick recovers it. `core-v1` sits at 4.96 kB under a
5.0 kB limit with ~40 B of headroom, so the next change to the main entry raises the budget
again; say so in the PR rather than trimming behaviour. Never re-export `groups` either.
