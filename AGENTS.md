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

## Quality gates

These run in CI and must pass locally before a PR:

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

`pnpm size` budgets are a ratchet: they sit just above current size, so any growth fails the
build. Raise a budget only with a stated reason in the PR.

The ESLint config has a **legacy quarantine** block listing 0.x source paths that are held to
a lower standard. Remove an entry when its v1 replacement lands. Never add one.

## Issue tracking

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
