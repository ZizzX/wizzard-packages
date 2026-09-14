# wizzard-packages

@AGENTS.md

@.agent/memory/MEMORY.md

`AGENTS.md`, imported above, is the rulebook for every contributor, this one included: the hard
rules, documentation, issue tracking and how a session starts all live there. The memory index
is imported beside it. This file adds only what is specific to Claude Code.

## Claude Code specifics

- The `pm` plugin's SessionStart hook hands every session the board's summary, which "Starting a
  session" in `AGENTS.md` refers to. Keep each epic's focus line in the board's `PLAN.md` short
  and true - it is the first thing every session reads.
- `.claude/settings.json` empties `attribution`, so no commit or PR carries an assistant trailer.
  That is rule 1 of `AGENTS.md`, held by configuration because a reminder at the top of every
  session says otherwise.

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
- What's next, save progress, hand off → invoke /project-memory:pm
- Author a backlog-ready spec/issue → invoke /spec
