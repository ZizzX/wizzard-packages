# Release Guide

This document describes the release workflow for `@wizzard-packages/*`.

## Key Facts

- Releases are started by hand: `.github/workflows/publish.yml` runs on `workflow_dispatch` only.
  Nothing on `main` opens a release PR or publishes to `latest` by itself.
- Versioning is managed by Changesets with a fixed group for all `@wizzard-packages/*`.
- CI creates git tags (`vX.Y.Z`) and GitHub releases after publish.
- Every merge to `main` also publishes a snapshot under the `canary` dist-tag.

## Preconditions

1. `main` is green and contains all intended changes.
2. A valid npm token is set in GitHub Actions secrets as `NPM_TOKEN`.
3. The workflow environment `wizzard-packages` is configured in GitHub.
4. All required checks pass (see Quality Gates).

## Standard Release Flow (CI/CD)

1. Work on short-lived feature branches and merge them into `main` via PR.
2. Add a changeset for each user-facing change:
   ```bash
   pnpm changeset
   ```
3. Run quality gates locally (see below).
4. When a release is due, run the "Release" workflow from GitHub Actions (`workflow_dispatch`),
   or `gh workflow run publish.yml --ref main`. With changesets on `main` it opens or updates the
   release PR, `Version Packages`, and publishes nothing.
5. Review and merge the release PR. Merging publishes nothing either.
6. Run the workflow a second time. With no changesets left it publishes to npm, tags the release
   (`vX.Y.Z`) and pushes the tags.
7. Verify release outputs (tags, GitHub release, npm versions).

The two runs are the point: a stable release is never one click away from a merge.

## Quality Gates

Run these before opening a PR into `main`:

```bash
pnpm -r build
pnpm lint
pnpm test:run
```

Optional (when E2E changes are involved):

```bash
pnpm test:e2e
```

## Pre-releases (next tag)

When you need a preview build:

```bash
pnpm changeset pre enter next
pnpm changeset
```

Release with the same two runs of the workflow. While pre mode is active the release PR carries
`-next.N` versions and the publish goes out under the `next` tag.
Exit prerelease mode after the final `next` release:

```bash
pnpm changeset pre exit
```

## Troubleshooting

- **E404/E403 from npm**: confirm `NPM_TOKEN` is valid and has publish rights.
- **No publish happens**: ensure there is at least one changeset in `.changeset/`.
- **Build fails in CI**: reproduce locally with `pnpm -r build`.
- **Release PR merged, nothing published**: expected - run the workflow again to publish.

## Verification Checklist

- GitHub Actions "Release" workflow succeeded on `main`.
- Git tag `vX.Y.Z` exists.
- GitHub release notes published.
- npm registry shows updated versions for all `@wizzard-packages/*`.
