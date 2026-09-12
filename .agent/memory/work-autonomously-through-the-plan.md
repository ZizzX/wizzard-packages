---
name: work-autonomously-through-the-plan
description: Standing permission to pick the next task myself and carry it through to merge without asking "continue?" or "what next?"; npm publishes stay an explicit ask.
metadata:
  node_type: memory
  type: feedback
  modified: 2026-09-05T18:55:00.000Z
---

Granted 2026-09-05, while working the flow-inspector task chain, the owner's instruction
was: from now on, keep going yourself and don't ask "continue?" — just continue and decide
on your own.

Widened 2026-09-06 on resume: decide yourself what is best to do. Do not ask whether to
continue or what to do — keep going if something needs implementing. Weigh the best options.
So choosing _which_ task comes next is also mine — weigh it, state the choice, go. The scope
of the work itself is set by [[rewrite-from-scratch-mandate]].

Once a task list is agreed, run it end to end — branch, implement, open the PR,
wait for CI, merge, clean up, start the next one — and report at the end rather
than at each seam.

**Why:** the per-task confirmations were pure latency. This user answers "do it",
"yes, do it", "decide yourself" every time; the question was not buying a decision.

**How to apply:** applies to the agreed list only. Still stop and ask for
anything that is irreversible or not mine to do:

- publishing to npm (a version cannot be reissued — see
  [[changeset-publish-reports-false-success]])
- anything needing repo-admin rights: branch protection, secrets like `GH_PAT`
- work outside the agreed list, or a task that turns out to mean something
  materially different from what was agreed

Merging into `main` is covered — `main` is unprotected today, so care here is
mine to exercise, not a gate to wait on.
</content>
