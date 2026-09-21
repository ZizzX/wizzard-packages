# Release Guide

This document describes the release workflow for `@wizzard-packages/*`.

## Key Facts

- Releases are started by hand and published from the reviewed commit. `.github/workflows/publish.yml`
  run by hand opens the release PR; merging that PR publishes its own merge commit, and nothing else
  on `main` opens a release PR or publishes to `latest`.
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
   or `gh workflow run publish.yml --ref main`. It opens or updates the release PR,
   `Version Packages`, from the changesets on `main`, and publishes nothing.
5. Review the release PR and merge it with its title unchanged. The merge commit starts with
   `Version Packages`, and that push publishes exactly that commit: it tags the release (`vX.Y.Z`),
   pushes the tags and checks the registry.
6. Verify release outputs (tags, GitHub release, npm versions).

A stable release is never one click from an unrelated merge, and what is published is the commit the
release PR showed. Two cases end without a publish, on purpose:

- A changeset reached `main` after the release PR was opened. The merge then versions it into a new
  release PR instead of publishing; review and merge that one.
- The publish failed part-way. Run the workflow by hand again while the release merge is still the tip
  of `main` and it publishes; once anything has merged after it, a manual run only opens a new
  release PR.

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

Release the same way. While pre mode is active the release PR carries `-next.N` versions and its merge
publishes under the `next` tag.
Exit prerelease mode after the final `next` release:

```bash
pnpm changeset pre exit
```

## Troubleshooting

- **E404/E403 from npm**: confirm `NPM_TOKEN` is valid and has publish rights.
- **No publish happens**: ensure there is at least one changeset in `.changeset/`.
- **Build fails in CI**: reproduce locally with `pnpm -r build`.
- **Release PR merged, nothing published**: the merge commit must start with `Version Packages`; if a
  changeset landed first, a new release PR is open instead.

## Verification Checklist

- GitHub Actions "Release" workflow succeeded on `main`.
- Git tag `vX.Y.Z` exists.
- GitHub release notes published.
- npm registry shows updated versions for all `@wizzard-packages/*`.
