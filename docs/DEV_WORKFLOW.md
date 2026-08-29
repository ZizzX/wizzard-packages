# Development workflow

This repository is trunk-based: **one long-lived branch, `main`**. There is no `dev` and no
`stage` branch. Environments come from npm dist-tags and preview deploys, not from branches.

## Branching

1. Branch from `main`. Keep the branch short-lived — under two days is the target.
2. Open a PR into `main`. CI validates it.
3. Squash-merge. Delete the branch.

An unfinished feature ships behind a config flag rather than waiting on a branch.

## Channels

| Channel     | npm dist-tag | Published when                                                  |
| ----------- | ------------ | --------------------------------------------------------------- |
| Canary      | `canary`     | every merge to `main` that touches `packages/` or `.changeset/` |
| Pre-release | `next`       | while a changesets pre-release mode is active                   |
| Stable      | `latest`     | when the release PR is merged                                   |

Trying an unreleased change means installing it, not checking out a branch:

```bash
pnpm add @wizzard-packages/core@canary
```

The documentation site deploys a preview for every PR, which serves the purpose a `stage`
branch used to.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on every PR, across Node 20 and 22:

- `pnpm lint`, `pnpm format:check`, `pnpm type-check`
- `pnpm build`
- `pnpm test:coverage` — coverage thresholds are enforced
- `pnpm publint`, `pnpm attw`, `pnpm size` — packaging and bundle budgets, once per run
- `pnpm test:e2e` — Playwright against the React and Vue demos, on PRs as well as `main`

Release steps are in [`RELEASE.md`](RELEASE.md); contributor rules are in
[`../AGENTS.md`](../AGENTS.md).
