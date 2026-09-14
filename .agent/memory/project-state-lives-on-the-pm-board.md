---
name: project-state-lives-on-the-pm-board
description: Since 2026-09-14 the state of wizzard-packages lives on the owner's pm board; the two setups it replaced, and what carried over from each.
metadata:
  type: project
---

**2026-09-14: tracking moved to the owner's `pm` board** (pm D-001, task T-033). It replaced
`docs/PLAN.md`, the GitHub project board projects/2 (archived) and `scripts/session-brief.mjs`.
Those three places were kept in sync by hand - moving a card was written down as part of the
work - and the brief made every session start wait on `gh` and on a token with the `project`
scope. The board sits outside the repository, keyed by the main checkout's path, so every
worktree on the machine shares it; another machine sees it only through `pm sync`.

Epics are the old plan's tracks: `L`, `S`, `D`, `R`, `post-1.0`. The 22 issues open at the move
stayed open: each carried-over task links its issue, which holds the spec, and nothing was
copied. The release epic #66 became five tasks in the order of its chain - D3 phase two, R0,
S6, R1, R2 - and R0 depends on every other 1.0.0 task, so `pm ready` cannot offer it early.
Branches are `<type>/T-NNN/<slug>` (pm D-002).

**Before that (2026-09-11, #81):** PLAN.md + projects/2 + the issue, which replaced beads. When
the owner writes **"bd" they mean beads, not the Russian abbreviation for "database"** - that
misread once cost a whole tracker migration. `agentmemory` is a search index over past
sessions, never the truth.

**How to apply:** the rules are `AGENTS.md` "Issue tracking" and "Starting a session". The old
plan's legacy id map moved to `docs/designs/legacy-ids.md`. Related:
[[docs-follow-every-change]], [[no-assistant-attribution]].
