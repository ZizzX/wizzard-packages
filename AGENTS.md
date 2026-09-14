# Agent instructions

Single source of truth for every automated contributor. `.github/copilot-instructions.md`
and `.agent/rules/rule-wizard.md` point here and add nothing — if a rule is not in this
file, it is not a rule.

## What this repository is

A headless, framework-agnostic engine for multi-step wizards and flows, published as
`@wizzard-packages/*`. The 0.x line is in maintenance. All new work targets **v1**, whose
architecture is described in [`ROADMAP.md`](ROADMAP.md).

The one decision everything else follows from: **a flow is data.** A wizard is a
JSON-serializable `FlowDefinition` plus a registry of named resolvers for the parts that
cannot be serialized — predicates, validators, loaders, views. The same object is produced
by `defineFlow()`, by a backend, or by a generator. If a change makes a flow unserializable,
it is the wrong change.

## Where things live

The tree carries two libraries at once until 0.x is deleted. Everything under a `v1`
directory is the new engine; everything beside it is the line being retired.

```
packages/core/src/v1/   the engine: expr, resolve, navigate, commit, select, store, state, path
                        plus its own entries - validate-flow, graph, groups, session,
                        snapshot, expr
packages/core/src/      0.x. Being deleted; do not build on it
packages/react/src/v1/  the React binding, ~200 lines. packages/react/src/* is 0.x
packages/vue/src/v1/    the Vue binding, same shape
packages/validate/      one Standard Schema adapter for five validation libraries
contract/               one suite, run against both bindings, so they cannot drift apart
examples/quickstart/    the example the README embeds and CI runs
docs/designs/           the plan of record: v1-launch.md, flow-inspector.md
```

## Language

- Conversation, plans and task descriptions: **Russian**.
- Everything committed to the repository — code, comments, docs, commit messages, changesets:
  **English**.

## Hard rules

1. **Never name an assistant, model, or vendor** in code, comments, commit messages, PR
   descriptions, changesets, docs or release notes. No co-author trailers, no attribution.
2. **All state mutation lives in one place.** In v1 that is `commit.ts`. Writing to state
   anywhere else reintroduces the race conditions v1 exists to remove.
3. **No dependency in `@wizzard-packages/core`.** Ever. Framework packages depend on core;
   core depends on nothing.
4. **Derived values are computed, not stored.** `activeSteps`, `progress`, `breadcrumbs`,
   `canNext` are selectors. Storing them is what made 0.x drift out of sync.
5. **Logic belongs in core, not in a binding.** If React and Vue both need it, it is a core
   concern. 0.x has `next`/`prev` implemented three times and the copies disagree; that class
   of bug is not allowed back.
6. **Every `core` sub-entry is its own budget.** `validate-flow`, `graph`, `groups`,
   `session`, `snapshot` and `expr` are separate entries so a runtime bundle never carries them; re-exporting one from
   `v1/index.ts` silently moves it into everyone's bundle. Adding an entry means a tsup
   entry, an `exports` key and a `.size-limit.js` line in the same PR. Budgets are ratchets
   set just above what a thing measures once it is correct - raise one with a stated reason
   in the PR, never trim behaviour to fit one.

## Working agreement

**Git.** Branch from `main`, keep the branch short-lived, open a PR. Direct commits to `main`
and force-pushes to a shared branch are not allowed. Commit and push your own work — do not
leave it staged for someone else. Conventional Commits are enforced by commitlint.

A branch carries one task and is named after it: `<type>/T-NNN/<slug>`, where the type is
`feature`, `fix`, `chore`, `docs`, `refactor`, `test` or `hotfix`, `T-NNN` is the task's id on
the board, and the slug says in a few kebab-case words what the branch does -
`feature/T-009/diagnostic-contract`.

**Trunk-based.** There is no `dev` or `stage` branch. An unfinished feature ships behind a
config flag and is tried from the `canary` dist-tag, published on every merge to `main`.

**Scope.** Do the task that was asked. If you find a real problem outside it, say so and add
a task for it rather than widening the change.

**Every block ships with its check.** Core logic gets property tests; anything a binding
exposes gets a contract test that runs against both React and Vue.

**Every failure says what to do next.** One shape, for messages that are thrown and for
problems that are returned:

```
[wizzard] <what went wrong>. <why>. <the fix>. https://zizzx.github.io/wizzard-packages/errors/<code>
```

Single-clause messages are the thing this replaces: `unknown resolver: x` names the symptom
and leaves the reader to find the cause. The code is a kebab-case slug, and it is the page:
`site/src/content/docs/errors/<code>.md` is written in the same change as the message.

**The automated review is a second gate.** A review runs when a PR is opened, when a draft
is marked ready, and when it is asked for by comment - not on every push, so a branch that
was reviewed and then pushed to has not been reviewed again. Its comments are only reachable
through the API - `gh api
repos/ZizzX/wizzard-packages/pulls/<n>/comments`, not `gh pr view`. Read it before merging
and answer every finding: fix it, or say why it is wrong with the evidence. It has been
right far more often than not, and it has also blamed the wrong file, so verify each one
against the code rather than applying it on faith. Green CI is necessary and not sufficient.

**Done, for a PR.** Tests for the new behaviour; `pnpm verify` green; a changeset only when
a published package changes in a way a user would notice (v1 is unreleased, so v1 work needs
none until 1.0.0); and if a size budget moved, the reason is in the PR body and in the
comment beside the budget.

**The bindings are idiomatic first.** `WizardProvider` is a React component and
`provideWizard` is a Vue function on purpose - each is what its framework expects. The hook
names are identical across both and stay that way; the asymmetry above them is not a bug to
fix.

**The React binding is a client module.** `react/src/v1/index.tsx` opens with `'use client'`
and the built `dist/v1/index.js` and `.cjs` must too: a React Server Components bundler reads
the directive from `dist`, and without it a server component importing the binding fails at
build time. `examples/next-app` is the proof, built on every `pnpm build` and driven by e2e.
Outside RSC - Vite, Remix, plain bundlers, Node - the directive is inert. Keep the react
`tsup` config on esbuild only; the rollup pass drops directives.

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

## Quality gates

These run in CI and must pass locally before a PR:

```bash
pnpm verify        # lint + type-check + test:run, the pre-PR command
```

Each gate on its own, and each of them narrowed while you work - the whole-repo run is a
slow way to learn one file is wrong:

```bash
pnpm lint          # eslint, type-aware on packages/*/src
pnpm format:check  # prettier
pnpm type-check    # tsc --noEmit, all packages
pnpm build         # turbo, all packages
pnpm test:coverage # vitest with coverage thresholds
pnpm publint       # package manifest correctness
pnpm attw          # type resolution across node10/node16/bundler
pnpm size          # bundle budgets
pnpm test:e2e      # playwright, react + vue demos
```

Narrowed forms, in the order they are usually needed:

```bash
pnpm -F @wizzard-packages/core test:run -- session   # one package, one file
pnpm -F @wizzard-packages/core type-check            # one package
pnpm test:run -- quickstart                          # one suite, whole repo
pnpm -F @wizzard-packages/core build                 # rebuild what the bindings import
```

The bindings import core's `dist`, not its source, so a core change is invisible to their
tests until `build` runs.

**Supported versions.** Node >= 20.11, pnpm 10, TypeScript >= 5, React >= 18, Vue >= 3.3.

`pnpm size` budgets are a ratchet: they sit just above current size, so any growth fails the
build. Raise a budget only with a stated reason in the PR.

The ESLint config has a **legacy quarantine** block listing 0.x source paths that are held to
a lower standard. Remove an entry when its v1 replacement lands. Never add one.

## Issue tracking

Work is tracked on one board, the owner's `pm` board, and nothing else is a source of truth. It
is a directory of markdown files kept outside the repository's branches and shared by every
worktree on the machine; its CLI is `pm`, and `pm help` lists the commands.

- `PLAN.md` - the goal, the milestones (`1.0.0`, `after-1.0`) and one focus line per epic. The
  epics are the tracks: `L` the library, `S` the site, `D` the docs, `R` the release, and
  `post-1.0`.
- `tasks/T-NNN.md` - one task, one branch, one PR. Status is one of `todo`, `in_progress`,
  `waiting`, `done` and `dropped`; order and dependencies decide what `pm ready` offers next;
  the log says what was done and what comes next.
- `decisions.md` - why the plan is the way it is, one entry per decision.

`docs/designs/v1-launch.md` stays the frozen record of why 1.0.0 is shaped as it is. A task
carried over from GitHub links its issue, which still holds the spec, and the PR that finishes it
says `Closes #N`. New work gets a task, not an issue; GitHub issues stay open for reports from
outside.

Updating the board is part of the work: taking a task is `pm claim T-NNN`, stopping part-way is
`pm log T-NNN --did "..." --next "..."`, and the merge is `pm set T-NNN status=done`. Work found
along the way becomes a new task, rather than silently widening the one at hand. `TODOS.md` is
work deliberately deferred out of 1.0.0, not the tracker.

The `wizzard-N` ids in `docs/designs/` and in a few test comments come from the beads tracker
this repository used until 2026-09-11. `docs/designs/legacy-ids.md` maps every id still
referenced to where it went; the full history is in git.

### What earlier sessions learned

`.agent/memory/` holds what working on this repository taught, where the code cannot say it: why
a decision went the way it did, which green result is not proof, what a tool does that its
documentation does not. One file per fact, linked to related ones with `[[slug]]`, and
`MEMORY.md` beside them is the index - one line each. A session reads that index first, so it
knows what exists without reading forty files, and opens the ones it needs.

It sits beside the board and is not a tracker: it carries knowledge, never status. Add a file when something durable and non-obvious is learned; delete one
that turns out to be wrong. Do not record what the repository already states - structure, git
history, and the rules in this file are not memory. Rule 1 applies here as everywhere.

### Starting a session

When a session begins and the owner's first message does not already name the work - a
greeting, "continue", a bare question - open with where the project stands in three or four
lines: what is in progress, what is waiting and on what, and what `pm ready` offers next. Then
ask one question with three answers: continue the task on top (name it), take another one from
the board, or start something new. Starting something new means adding a task for it first.

Continuing a task means reading its task file before touching code - the understanding, the
checklist, the last log entry, and the issue it links if it has one - and saying in two lines
where it stopped and what comes next.

Claude Code sessions are handed the board's summary by the `pm` plugin before the owner types
anything, and `CLAUDE.md` imports the memory index. Any other agent runs `pm summary` and reads
`.agent/memory/MEMORY.md` itself. If the board cannot be reached, say so and ask the owner where
the work stands.

## Coding Tasks

When spawning external coding sessions, tell the session to use gstack skills.
Include the appropriate instruction in the session prompt:

- Security audit: "Load gstack. Run /cso"
- Code review: "Load gstack. Run /review"
- QA test a URL: "Load gstack. Run /qa https://..."
- Build a feature end-to-end: "Load gstack. Run /autoplan, implement the plan, then run /ship"
- Plan before building: "Load gstack. Run /office-hours then /autoplan. Save the plan, don't implement."

## Deprecated

`docs/legacy/` holds the 0.x guides, the old roadmap and the pre-split migration notes. They
describe how the library used to work. Read them for context; do not follow them.
