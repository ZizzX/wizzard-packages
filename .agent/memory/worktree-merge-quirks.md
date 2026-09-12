---
name: worktree-merge-quirks
description: 'In the Orca worktree the local branch is ZizzX/main, so gh pr merge --delete-branch reports a git failure after the merge succeeded; the automated review may not re-review a push before merge.'
metadata:
  node_type: memory
  type: project
  originSessionId: eea4509c-c87c-4103-b7f5-5f11e3930909
  modified: 2026-09-06T11:33:18.794Z
---

The Orca worktree at `C:/Users/Aziz/orca/workspaces/wizzard-packages/main` cannot check out
`main` (it is held by `D:/Coding/my-npm/wizzard-packages`); its tracking branch is `ZizzX/main`.
`gh pr merge --squash --delete-branch` therefore prints `fatal: 'main' is already used by
worktree` **after** the merge has already happened, and the `&&` chain after it never runs.
Observed 2026-09-06 on PR #38 (merged as `b707cf4`). The remote branch is not deleted either.

**Why:** `gh` tries to switch the local checkout to the base branch once the head branch is
deleted; the merge itself is a server-side call that completes first.

**How to apply:** after `gh pr merge`, confirm with `gh pr view <n> --json state,mergeCommit`,
then run `git checkout ZizzX/main && git pull origin main` and
`git push origin --delete <branch>` as separate commands. Pass `--subject`/`--body` to the
merge so the squash commit carries no trailers ([[no-assistant-attribution]]). The automated
review ([[automated-review-on-every-pr]]) did not re-review the follow-up push within five minutes; merge
after CI once every first-round finding has a reply.

**Confirmed 2026-09-07 on PRs #43 and #44:** `gh pr merge <n> --squash --subject ... --body ...`
_without_ `--delete-branch` merges cleanly and prints nothing — no git failure, because `gh`
never tries to switch the checkout. Delete the remote branch afterwards with
`git push origin --delete <branch>`, then `git checkout ZizzX/main && git pull origin main`.
Use this form; keep `--delete-branch` off.

A worktree nested under the repo (in the harness's own worktrees directory) is discovered by the
root vitest run and its stale tests fail the pre-commit hook. `vitest.config.ts` now excludes
that directory; removing such a worktree needs `git worktree remove --force` plus `rm -rf`
(Windows fails the delete with "Filename too long" on `node_modules`).
