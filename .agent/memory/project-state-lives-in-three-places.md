---
name: project-state-lives-in-three-places
description: Where the state of wizzard-packages lives since 2026-09-11 — plan, board, issue — and the SessionStart brief that hands it to every new session; checkpoints and agentmemory are no longer sources of truth.
metadata:
  type: project
---

Decided with the owner 2026-09-11 (#81). Before this, a new session knew only
the lessons in `MEMORY.md`; what was in progress lived in prose checkpoints
restored by hand, and eight places held pieces of the state with none named the
source of truth.

**Three places, one job each:**

1. **`docs/PLAN.md`** — tracks, order, a status per item, and a short "Now"
   section. Updated in the same PR that changes a status. `docs/designs/v1-launch.md`
   stays the frozen record of _why_ and never tracks status.
2. **The board, https://github.com/users/ZizzX/projects/2** — status is the column
   (Backlog, Ready, In progress, In review, Blocked, Done); order is the position
   in Ready. Epics are parents of **native sub-issues**, dependencies are **native
   "blocked by" links** (both work on the plain `repo` scope; the board itself
   needs `project`).
3. **The issue itself** — body is the spec; comments carry what was learned,
   decisions, and a handoff note when work stops part-way.

**How a session "remembers":** the repository's checked-in harness settings file runs
`scripts/session-brief.mjs` at SessionStart. It prints PLAN.md's "Now", the
board's live columns (falling back to open stories by priority when the board
cannot be read), the last merged PRs and uncommitted work. It exits 0 on every
failure by design.

**Beads is retired (2026-09-11).** `AGENTS.md` used to send every agent to
`.beads/issues.jsonl` via `bd`; it had been dead since 2026-09-06. Removed on
#82, its 26 live items triaged on #81, two carried over (#83, #84), and every
`wizzard-N` id still cited in `docs/designs/` or tests mapped under "Legacy ids"
in `docs/PLAN.md`; the full tracker is `git show 1c6323c:.beads/issues.jsonl`.
When the owner writes **"bd" they mean beads, not "БД" (a database)** — that
misread once cost a whole tracker migration.

**Demoted, by the owner's choice:** `agentmemory` is a search index over past
sessions — write only a short digest there, never treat it as the truth. gstack
checkpoints are optional now; the handoff belongs in the issue.

**How to apply:** at the start of work, read the brief, then the issue. Taking a
task moves its card; opening the PR moves it to In review; the merge moves it to
Done and edits PLAN.md's row in the same PR. Keep "Now" short and true — it is
the first thing every session reads. Rules live in `AGENTS.md` under "Issue
tracking" and its "Starting a session" subsection; the project's agent
instructions file imports `AGENTS.md` with `@AGENTS.md` (#85). Until then agent
sessions never loaded `AGENTS.md` at all - the root cause of missing its
attribution rule and its beads section. A rule that exists only in that file
is not a rule here.
Related: [[docs-follow-every-change]], [[no-assistant-attribution]].
