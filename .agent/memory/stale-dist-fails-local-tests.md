---
name: stale-dist-fails-local-tests
description: 'Package tests resolve workspace imports through dist, so a stale local build fails tests that pass in CI; run pnpm build first.'
metadata:
  node_type: memory
  type: project
---

Tests import `@wizzard-packages/core/v1` through the workspace link, which points at
`packages/core/dist`. `pnpm test:run` has no build step, so after pulling work that changed
core the local suite fails on the _old_ build while CI is green - CI's `build-test` job builds
first. Seen 2026-09-07 right after merging L5 PR 1: 11 devtools tests failed locally against a
`dist` built before the `onAttempt` hook existed.

**Why:** turbo's `test` task declares `dependsOn: ["^build"]`, but the root `test:run` script
calls vitest directly and bypasses turbo.

**A fresh worktree needs two builds, not one.** `pnpm build` restores most packages from
turbo's cache, but the `build` task declares `outputs: ["dist/**"]` and `examples/next-app`
writes `.next`. Nothing in that directory is cached or restored, so `next start` fails with
"Could not find a production build in the '.next' directory" — and because Playwright starts
every `webServer` in the config regardless of which `--project` is selected, that failure
stops a run of the site specs too. Run `pnpm --filter @examples/next-app build` once after
`pnpm install` in a new worktree. Seen 2026-09-08 setting up the `inspector` worktree.

**How to apply:** run `pnpm build` before believing a local failure that mentions a missing
export or a hook that never fires. `.husky/pre-push` now runs `pnpm build && pnpm test:run`
for the same reason. Related: [[run-tests-from-repo-root]], [[worktree-is-shared-by-sessions]].
