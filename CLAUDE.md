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

Epics, stories and tasks live in **GitHub Issues** on this repository.

- milestone = epic
- issue with a task checklist = story
- issue = task, closed by its PR via `Closes #N`

Labels carry priority (`P0`–`P3`), kind (`epic`, `story`, `task`, `bug`,
`docs`, `design`) and state (`blocked`). An issue that is blocked names its
blocker in the body. `TODOS.md` stays what it is: work deliberately deferred out
of 1.0.0, with the context to pick it up cold.

Keep it current. Open an issue when work is identified, close it when its PR
merges, and re-file rather than silently widening one that is already open.

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
