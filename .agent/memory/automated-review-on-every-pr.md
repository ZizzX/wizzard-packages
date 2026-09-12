---
name: automated-review-on-every-pr
description: 'The automated review gate: what triggers it (not every push), how to read it, how accurate it has been, and what to do when its quota runs out.'
metadata:
  node_type: memory
  type: project
  originSessionId: 9ca8b8b0-62d1-4061-837f-b75c6e9eb951
  modified: 2026-09-05T20:04:14.754Z
---

Opening a PR here triggers an automated review that leaves inline
comments. Read them with
`gh api repos/ZizzX/wizzard-packages/pulls/<n>/comments`; they do not show up
in `gh pr view`.

**It does NOT re-review on every push** (corrected 2026-09-08, measured on PR #50):
it runs when a PR is opened, when a draft is marked ready, and when it is asked for
by a review-request comment. A branch that was reviewed and then had four rounds of
fixes pushed to it has been reviewed once. `AGENTS.md` said otherwise and was fixed in
PR #53.

**The quota is finite and it ran out** (2026-09-08, PR #50): the review tool reported
that its usage limit for code reviews had been reached. When that happens the second
gate is simply absent, and CI going green is the only signal left. On the owner's
approval the gate was substituted by rounds of independent fresh-context adversarial
review, each asked to prove findings by running the code. It took six rounds before
one came back empty, and rounds 1-5 each found a real defect - so one substitute round
is not a gate.

**Why:** across PRs #25 and #26 it was 6-for-6 correct, including a real crash
(`stack: [null]` reaching a checker that promised never to throw) and a
structural rule violation the ESLint rule could not catch. It cites
`AGENTS.md` line ranges, and those citations held up.

**How to apply:** verify each finding against the code before implementing —
one of the six blamed the checker for what was an engine bug in `store.ts`, so
the correct fix landed in a different file than suggested. CI passing is not
the signal that a PR is ready; the review comments are a second gate. Related:
[[work-autonomously-through-the-plan]], [[no-assistant-attribution]].

**Standing instruction (2026-09-06, user):** always take the automated code review on
GitHub into account. Every PR: fetch the review before merging, work through each
finding, and say in the PR or the reply what was fixed and what was rejected with the
evidence. It is a gate, not a suggestion box.

Verified again on PRs #27 and #28: of the six findings across them, five were real and
two changed the engine — a start that two mounts could run twice, and an idempotence
guard that read the stack when it had to read `status`. One was wrong (it claimed the
commits carried vendor attribution; author and committer are the repository owner), so
verify each finding against the code before acting on it.
