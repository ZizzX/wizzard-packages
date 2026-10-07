# Development workflow

This repository is trunk-based: **one long-lived branch, `main`**. There is no `dev` and no
`stage` branch. Environments come from npm dist-tags, not from branches.

## Where work is tracked

Planned work lives on the maintainer's task board, which is kept outside the repository: one task
is one branch and one pull request. GitHub issues are where anyone reports a bug or proposes a
change. A bug report uses the template, which asks for a recorded session because it replays here
without your application. A pull request that finishes an issue says `Closes #N`.

## Branching

1. Branch from `main`. Keep the branch short-lived — under two days is the target. A
   maintainer's branch is named after its board task, `<type>/T-NNN/<slug>`.
2. Open a PR into `main`. CI validates it, and an automated review runs when it is opened.
3. Squash-merge. Delete the branch.

An unfinished feature ships behind a config flag rather than waiting on a branch.

The git hooks run on your machine: commitlint holds every commit message to Conventional
Commits, `pre-commit` runs ESLint and Prettier over the staged files, and `pre-push` builds and
runs the unit tests.

## Channels

| Channel     | npm dist-tag | Published when                                                    |
| ----------- | ------------ | ----------------------------------------------------------------- |
| Canary      | `canary`     | every merge to `main` that touches `packages/` or `.changeset/`   |
| Pre-release | `next`       | while a changesets pre-release mode is active                     |
| Stable      | `latest`     | when the release PR, opened by running Release by hand, is merged |

Trying an unreleased change means installing it, not checking out a branch:

```bash
pnpm add @wizzard-packages/core@canary
```

The documentation site is deployed from `main` on every merge.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on every PR, as four jobs:

- `static`: `pnpm lint`, `pnpm format:check`, `pnpm examples:check` (the README snippets match
  the files they are generated from) and `pnpm links:check` (no link points at a file or a site
  page that is not there)
- `packaging`: `pnpm build`, then `pnpm publint`, `pnpm attw` and `pnpm size` — packaging and
  bundle budgets
- `build-test`, on Node 20 and 22: `pnpm type-check`, `pnpm build` and `pnpm test:coverage`,
  whose coverage thresholds are enforced. The site sits out the Node 20 leg, because Astro needs
  Node 22.12 or newer
- `e2e`: `pnpm test:e2e` in four shards — Playwright against the built documentation site and
  the Next.js app

`pnpm verify` runs lint, type-check and the unit tests, and is the command to run before opening
a PR.

Release steps are in [`RELEASE.md`](RELEASE.md); contributor rules are in
[`../AGENTS.md`](../AGENTS.md).
