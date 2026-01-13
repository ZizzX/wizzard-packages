# Release Guide

This document describes the release workflow for `@wizzard-packages/*`.

## Key Facts

- Releases are performed by CI/CD on push to `main` via `.github/workflows/publish.yml`.
- Versioning is managed by Changesets with a fixed group for all `@wizzard-packages/*`.
- Release artifacts include npm publish, git tag `vX.Y.Z`, and a GitHub release.

## Preconditions

1. You have a clean `dev` branch with all intended changes merged.
2. A valid npm token is set in GitHub Actions secrets as `NPM_TOKEN`.
3. The workflow environment `wizzard-packages` is configured in GitHub.
4. All required checks pass (see Quality Gates).

## Standard Release Flow (CI/CD)

1. Work on feature branches and merge to `dev`.
2. Add a changeset for each user-facing change:
   ```bash
   pnpm changeset
   ```
3. Run quality gates locally (see below).
4. Promote `dev` to `main` (PR or fast-forward merge).
5. Push to `main`.
6. CI/CD runs `.github/workflows/publish.yml`:
   - Installs dependencies
   - Builds all packages
   - Runs `changesets/action`
   - Either opens a release PR or publishes to npm
7. Verify release outputs (tags, GitHub release, npm versions).

## Manual Release Trigger (CI/CD)

If you need to rerun without a new push:
1. Open the GitHub Actions "Release" workflow.
2. Use `workflow_dispatch`.
3. Confirm the run finishes with `changeset publish` success.

## Quality Gates

Run these before promoting `dev` to `main`:

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

Release by pushing to `main`. CI/CD will publish with the `next` tag.
Exit prerelease mode after the final `next` release:

```bash
pnpm changeset pre exit
```

## Troubleshooting

- **E404/E403 from npm**: confirm `NPM_TOKEN` is valid and has publish rights.
- **No publish happens**: ensure there is at least one changeset in `.changeset/`.
- **Build fails in CI**: reproduce locally with `pnpm -r build`.
- **Release PR only**: merge the release PR to trigger publish.

## Verification Checklist

- GitHub Actions "Release" workflow succeeded on `main`.
- Git tag `vX.Y.Z` exists.
- GitHub release notes published.
- npm registry shows updated versions for all `@wizzard-packages/*`.
