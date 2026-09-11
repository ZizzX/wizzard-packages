# wizzard-packages

## Documentation is part of the change

Every feature, fix or behaviour change updates the README section that describes
that surface **and** the docs page that teaches it, in the same change. Never a
follow-up PR, never a tracked "docs debt" issue.

Before opening a PR, name the README section and the `/docs/` page that describe
what you changed, and edit both:

- a new public option, prop or return value → the API behaviour table, plus the
  guide page that owns the concept
- a new error → its `/errors/<code>` page
- a changed default → every snippet that relied on the old one
- a snippet that is generated (`scripts/embed-examples.mjs`) or `?raw`-imported →
  edit the source file and let the mechanism carry it; do not hand-write a copy

Docs voice: plain prose, no emoji, no icon bullets, no decorative badges.

The docs site is versioned per release, starting at 1.0.0. 0.x is not archived
as an older version: it is torn down, not supported.

## Work tracking

Three places, one job each. Nothing else is a source of truth for the state of the project.

- **The plan** - `docs/PLAN.md`: what is being built, in what order, and where each track
  stands. Its "Now" section is what every new session is handed. Change it in the same PR that
  changes a status. `docs/designs/v1-launch.md` is the frozen record of _why_; status is never
  tracked there.
- **The board** - <https://github.com/users/ZizzX/projects/2>, over this repository's issues.
  Status is the column: Backlog, Ready, In progress, In review, Blocked, Done. Order is the
  position in Ready: the top card is next. An epic is a parent issue with native sub-issues, and
  a dependency is a native "blocked by" link, never a sentence in a comment.
- **The issue itself** - the body is the spec and its acceptance criteria. Comments carry what
  was learned, the decisions taken, and a handoff note whenever work stops part-way ("stopped
  here, next is ..."). The PR that finishes it says `Closes #N`.

Moving a card is part of the work, not a report on it: taking a task moves it to In progress,
opening its PR moves it to In review, and the merge moves it to Done and updates the plan's row.
Open an issue when work is identified, and re-file rather than silently widening one already
open. Labels carry priority (`P0`-`P3`) and kind (`epic`, `story`, `task`, `bug`, `design`,
`documentation`); status is the board's job, never a label's. `TODOS.md` stays what it is: work
deliberately deferred out of 1.0.0.

**The session brief.** `.claude/settings.json` runs `scripts/session-brief.mjs` when a session
starts. It prints the plan's "Now" section, the board's In progress, In review and Blocked
columns with the top of Ready, the last merged PRs, and any uncommitted work. Keep "Now" short
and true: it is the first thing every session reads. The same settings file sets `attribution`
to empty, so no commit or PR from this repository carries an assistant trailer - rule 1 of
`AGENTS.md`, enforced by configuration rather than by memory.

## Starting a session

The session brief arrives before the owner says anything, so the first reply carries it. When
the owner's first message does not already name the work - a greeting, "continue", a bare
question - open with where the project stands in three or four lines: what is in progress, what
is blocked and by what, and what is next on the board. Then ask one question with three
answers: continue the task on top (name it), take another one from the board, or start
something new. Starting something new means opening an issue for it first.

Continuing a task means reading its issue before touching code - the spec in the body and the
last handoff comment - and saying in two lines where it stopped and what comes next. If the
brief could not reach GitHub, read `docs/PLAN.md` and say that the board was not available.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:

- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
