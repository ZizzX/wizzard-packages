---
name: two-signals-for-a-finished-wizard
description: '"The flow is finished" is `status === ''done''`, persisted or not, since the snapshot carries `done` (T-084); `completed` was the old workaround and is wrong when a flow jumps away from its last step.'
metadata:
  node_type: memory
  type: project
  originSessionId: 4448c375-cda1-46af-adc4-28626b6f55b5
  modified: 2026-10-16T00:00:00.000Z
---

Reaching the end does not move the wizard: the engine stays on the last step and
answers `to: '@end'`. So a rendering has to derive "finished" from state, never
from a flag in the component, which comes back `false` after a reload and puts
the visitor round the last step again.

Until 2026-10-16 there were two answers, both review findings on PRs #55 and #56:

- **`status === 'done'`** was exact, but `toSnapshot` did not carry it, so a
  persisted wizard came back `idle` on its last step and `start()` ran that
  step's `load` again. R-B (reload) could not use it.
- **`completed.includes(lastStepId)`** survived a reload, so R-B used it. But the
  final commit adds the step a **forward move leaves**, and `go` counts as
  forward: R-C's "Edit this passenger" jumps away from Review, which would mark
  Review completed and call the trip booked while somebody was still changing a
  seat. So R-C used `status`.

T-084 (D-036) made the snapshot carry `done: true` for a finished wizard, and
`decodeSnapshot` restores it as `status: 'done'`. The format stayed `v: 1`: the
field is optional, and a snapshot written before it restores `idle` as it did.

**How to apply:** `status === 'done'` everywhere, persisted or not. Do not reach
for `completed` as a "finished" signal. A host that keeps its own durable marker
in `ctx` no longer needs to for this reason.

Related: [[reference-apps-are-the-sites-examples]], [[wizzard-v1-flow-as-data]],
[[two-versions-in-a-snapshot]].
