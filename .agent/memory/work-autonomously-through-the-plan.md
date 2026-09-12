---
name: work-autonomously-through-the-plan
description: Standing permission to pick the next task myself and carry it through to merge without asking "continue?" or "what next?"; npm publishes stay an explicit ask.
metadata:
  node_type: memory
  type: feedback
  modified: 2026-09-05T18:55:00.000Z
---

Granted 2026-09-05, while working the flow-inspector task chain: "далее можешь
продолжать сам и не спрашивать меня «продолжить?» сам продолжай и решай".

Widened 2026-09-06 on resume: "как считаешь сам лучше что сделать? не спрашивай
продолжить и что делать, можешь продолжать дальше если что-то необходимо
реализовать. взвешивай лучшие решения". So choosing _which_ task comes next is
also mine — weigh it, state the choice, go. The scope of the work itself is set
by [[rewrite-from-scratch-mandate]].

Once a task list is agreed, run it end to end — branch, implement, open the PR,
wait for CI, merge, clean up, start the next one — and report at the end rather
than at each seam.

**Why:** the per-task confirmations were pure latency. This user answers "делай",
"да, делай", "реши сам" every time; the question was not buying a decision.

**How to apply:** applies to the agreed list only. Still stop and ask for
anything that is irreversible or not mine to do:

- publishing to npm (a version cannot be reissued — see
  [[changeset-publish-reports-false-success]])
- anything needing repo-admin rights: branch protection, secrets like `GH_PAT`
- work outside the agreed list, or a task that turns out to mean something
  materially different from what was agreed

Merging into `main` is covered — `main` is unprotected today, so care here is
mine to exercise, not a gate to wait on.
