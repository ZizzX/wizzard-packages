# Release Guide

This document describes the release workflow for `@wizzard-packages/*`.

## Key Facts

- Releases are started by hand and published from the reviewed commit. `.github/workflows/publish.yml`
  run by hand opens the release PR; merging that PR publishes its own merge commit, and nothing else
  on `main` opens a release PR or publishes to `latest`.
- Versioning is managed by Changesets. `core` and `react` are a fixed group and always share a
  version; every other package is versioned on its own.
- CI creates git tags (`vX.Y.Z`) and GitHub releases after publish.
- Every merge to `main` that touches `packages/` or `.changeset/` also publishes a snapshot under
  the `canary` dist-tag, as long as a changeset is pending and no pre-release is active.

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
5. Review the release PR and squash-merge it. The workflow asks GitHub whether the pushed commit is the
   merge of a PR from `changeset-release/main`, and when it is, publishes exactly that commit: it tags
   the release (`vX.Y.Z`), pushes the tags and checks the registry. The PR title plays no part.
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
While pre mode is active, the Canary workflow fails on a merge that would publish a snapshot instead
of publishing it: `changeset version --snapshot` refuses to run in pre mode.
Exit prerelease mode after the final `next` release:

```bash
pnpm changeset pre exit
```

## Cutting a docs version

The site is versioned from 1.0.0, and 0.x has no docs version: it was torn down, not archived.
While there is one version, `site/src/components/VersionSelect.astro` lists only it. A release that
changes what the docs teach - a minor or a major - cuts a version first, so readers of the outgoing
one keep its pages; a patch fixes the docs in place.

The steps below were tried against Starlight 0.42 with `starlight-versions` 0.10.1, cutting `1.0`
under a current `1.1`. The plugin refuses to run without an archived version, which is why it is not
installed before the first cut.

1. On the commit whose docs still describe the outgoing version - before the new release's docs
   land - add the plugin: `pnpm -F @wizzard-packages/site add -D starlight-versions`.
2. In `site/src/content.config.ts`, add
   `versions: defineCollection({ loader: docsVersionsLoader() })`, imported from
   `starlight-versions/loader`.
3. In `site/astro.config.mjs`, add it to `plugins` after `starlightTypeDoc(...)`. The order matters:
   it copies what typedoc wrote.

   ```js
   starlightVersions({
     current: { label: '1.1' },
     versions: [{ slug: '1.0', label: '1.0.0' }],
     exclude: ['errors/**'],
   }),
   ```

   `errors/**` stays out. Every message the library prints ends in `/errors/<code>/` with no version
   in it, so one page per code serves every version, and a page stays while any supported release
   still prints its code.

4. Build the site. The first build copies `src/content/docs/` into `src/content/docs/1.0/` and writes
   that version's sidebar to `src/content/versions/1.0.json`. Commit both, including
   `1.0/docs/api/`: the current API reference is generated and gitignored, but the archive cannot be
   regenerated from old sources. `deploy-site.yml` replaces the whole `gh-pages` branch on every
   deploy, so the source tree is the only place an old version lives.
5. Freeze the archive's code. Its `.mdx` pages still import `@examples/*?raw` and the islands from
   the live tree, so an archived page would show the new version's code. Copy the listings they
   import into `site/src/versions/1.0/` and point the archive's imports there. The islands run the
   workspace packages, which are the new version: where an archived example uses an API that
   changed, replace its island with the frozen listing.
6. Swap the select. `SiteHeader.astro` imports Starlight's `Search` and `ThemeSelect` directly, so
   the plugin's overrides do not reach the top bar. They only reach Starlight's phone menu, which
   gets the plugin's select by itself. On Starlight pages, render
   `starlight-versions/components/VersionSelect.astro` instead of the hand-written select, and
   `VersionSearch.astro` instead of `Search`, so search stays inside the version being read.
   Outside Starlight (the home page, examples, the inspector) both read `starlightRoute` and throw,
   so gate them the way `SiteNav.astro` works out `inDocs`: those pages keep Starlight's `Search`
   and show no version, because they have none.
7. Update `e2e/tests/site/header.spec.ts` to the new entries, and assert that
   `/1.0/docs/start/` opens with `1.0.0` selected.

## Troubleshooting

- **E404/E403 from npm**: confirm `NPM_TOKEN` is valid and has publish rights.
- **No publish happens**: ensure there is at least one changeset in `.changeset/`.
- **Build fails in CI**: reproduce locally with `pnpm -r build`.
- **Release PR merged, nothing published**: if a changeset landed first, a new release PR is open
  instead. Otherwise run the workflow by hand while the merge is still the tip of `main`.

## Verification Checklist

- GitHub Actions "Release" workflow succeeded on `main`.
- Git tag `vX.Y.Z` exists.
- GitHub release notes published.
- npm registry shows updated versions for all `@wizzard-packages/*`.
