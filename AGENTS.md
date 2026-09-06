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
                        plus its own entries - validate-flow, graph, session, snapshot, expr
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
6. **Every `core` sub-entry is its own budget.** `validate-flow`, `graph`, `session`,
   `snapshot` and `expr` are separate entries so a runtime bundle never carries them; re-exporting one from
   `v1/index.ts` silently moves it into everyone's bundle. Adding an entry means a tsup
   entry, an `exports` key and a `.size-limit.js` line in the same PR. Budgets are ratchets
   set just above what a thing measures once it is correct - raise one with a stated reason
   in the PR, never trim behaviour to fit one.

## Working agreement

**Git.** Branch from `main`, keep the branch short-lived, open a PR. Direct commits to `main`
and force-pushes to a shared branch are not allowed. Commit and push your own work — do not
leave it staged for someone else. Conventional Commits are enforced by commitlint.

**Trunk-based.** There is no `dev` or `stage` branch. An unfinished feature ships behind a
config flag and is tried from the `canary` dist-tag, published on every merge to `main`.

**Scope.** Do the task that was asked. If you find a real problem outside it, say so and file
an issue rather than widening the change.

**Every block ships with its check.** Core logic gets property tests; anything a binding
exposes gets a contract test that runs against both React and Vue.

**Every failure says what to do next.** One shape, for messages that are thrown and for
problems that are returned:

```
[wizzard] <what went wrong>. <why>. <the fix>. <docs url>#<code>
```

Single-clause messages are the thing this replaces: `unknown resolver: x` names the symptom
and leaves the reader to find the cause.

**The automated review is a second gate.** A review runs on every PR and on every push to
one. Its comments are only reachable through the API - `gh api
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

Issues live in `.beads/issues.jsonl` under the `wizzard-N` scheme, and the design documents
in `docs/designs/` refer to them by that id. `tasks/session-state.md` uses an older scheme
and is not maintained.

`bd` (beads), prefix `wizzard-`:

```bash
bd ready                             # available work
bd show <id>                         # details
bd update <id> --status in_progress  # claim
bd close <id>                        # complete
```

Do not run `bd sync` — it rewrites project files.

## Deprecated

`docs/legacy/` holds the 0.x guides, the old roadmap and the pre-split migration notes. They
describe how the library used to work. Read them for context; do not follow them.
