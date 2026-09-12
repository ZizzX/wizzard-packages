---
name: two-signals-for-a-finished-wizard
description: '"The flow is finished" has two different correct answers depending on whether the wizard is persisted, and neither is a flag in the component.'
metadata:
  node_type: memory
  type: project
  originSessionId: 4448c375-cda1-46af-adc4-28626b6f55b5
  modified: 2026-09-08T19:00:30.375Z
---

Reaching the end does not move the wizard: the engine stays on the last step and
answers `to: '@end'`. So a rendering has to derive "finished" from state, and
both obvious choices are wrong half the time. Found on 2026-09-08 building R-B
and R-C; both were review findings on PRs #55 and #56.

- **`status === 'done'`** is exact, and `toSnapshot` deliberately does not carry
  it. A persisted wizard that reached the end and was reloaded comes back `idle`,
  so R-B cannot use it — and a boolean in the component is worse, because it comes
  back `false` and puts the visitor round the last step again.
- **`completed.includes(lastStepId)`** is in the snapshot and survives a reload,
  which is why R-B uses it. But the final commit adds the step a **forward move
  leaves**, and `go` counts as forward: R-C's "Edit this passenger" jumps away
  from Review, which would mark Review completed and call the trip booked while
  somebody was still changing a seat. So R-C uses `status`.

**How to apply:** persisted wizard → `completed`; not persisted → `status`; never
a flag in the component. If a flow both persists and offers a jump away from its
last step, neither works and the host needs its own durable marker in `ctx`,
which the snapshot does carry.

Related: [[reference-apps-are-the-sites-examples]], [[wizzard-v1-flow-as-data]].
