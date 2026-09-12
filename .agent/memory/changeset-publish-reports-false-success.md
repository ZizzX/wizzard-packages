---
name: changeset-publish-reports-false-success
description: changeset publish lists E409-failed packages as published and exits 0; and npm replication is per-package, vue takes minutes while its siblings appear at once.
metadata:
  node_type: memory
  type: project
  modified: 2026-09-05T18:35:00.000Z
---

`changeset publish` prints every package it attempted under
`success packages published successfully:` — including ones the registry
rejected or silently dropped — and the workflow can still exit 0.

Two runs of Canary `33275701272` show both shapes:

- **attempt 5** (2026-09-04): four packages failed with
  `E409 Failed to save packument`, all four were listed as published. The
  E409 message names the cause: nine packages publish concurrently while
  `@wizzard-packages/validate` is a brand-new name creating a new packument
  in the scope.
  **A second, separate trap: npm replication is per-package.**
  `@wizzard-packages/vue` takes _minutes_ to become visible while every sibling
  published in the same batch appears at once — so a sibling looks like a valid
  control and is not. Three canary runs called vue missing; all three versions
  (`...174051`, `...180404`, `...180629`) are in the registry now. Do not
  conclude a package was dropped without waiting minutes and re-checking.
  The first real Release (`33984087217`, 2026-09-05) spent ~61s inside
  verification before all nine passed — the original 30s window would have
  failed a release that was completely fine.

**Why:** a partial publish burns versions that cannot be reissued, and on the
real Release nothing else would catch it. Never read a green publish job, or
the changesets success list, as evidence that a package shipped — query
`https://registry.npmjs.org/<name>` and look for the version.

**How to apply:** `scripts/verify-published.mjs` (PR #19, window widened to
10 x 30s in PR #20) does exactly that and is wired into both Canary and
Release. It **detects**, it does not prevent: `changesets/action` creates a
GitHub Release per package during its own publish step, and that creates the
git tag — so tags already exist by the time verification runs, and the later
explicit `Tag release` step is redundant. The signal is the red job, not an
ungated tag. A red verification means an E409
class failure; re-run the workflow, `changeset publish` is idempotent and
skips what landed — that is how attempt 6 healed attempt 5's four failures.
A red verification on vue alone is more likely the replication lag above. Distinct from
[[npm-token-rotation-blocks-publishing]], which was an auth problem and is
now resolved.

**2026-09-08, the other direction: a red release job that published everything.**
Run 34217478846 on `11f7858` ended in failure and all ten packages were on
`latest`. Order: `changeset publish` wrote the registry, `changesets/action`
pushed the version tags, the husky **pre-push** hook fired inside the runner,
ran the whole suite on a machine busy publishing, two timing-sensitive tests
missed, the push was refused, the step exited non-zero — and
`Verify the registry has them` is `if: published == 'true'`, so the one check
that would have told the truth was skipped.

Left behind: npm complete, **zero tags**, job red. Re-running the workflow does
not repair it — the versions exist, so changesets finds nothing to publish and
creates no tags. The repair is ten `gh api .../git/refs` calls at the merge
commit, then `node scripts/verify-published.mjs` by hand.

**So: the job's colour is not the release.** Green can mean packages the
registry never saved; red can mean a complete release with no tags. After any
release, check three things separately — `npm view <pkg> dist-tags`,
`git ls-remote --tags`, and the verify script — and believe those.

The hook is guarded now (`CI` set means exit 0, `.husky/pre-push`), so this
particular cause is gone. Related: [[layout-perf-test-flakes-on-ci]] and
[[release-pr-needs-manual-approval]].
