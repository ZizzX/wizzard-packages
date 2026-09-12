---
name: merging-a-pull-request
description: 'gh pr merge --squash without --delete-branch merges cleanly with no git error; a worktree nested inside the repo needs excluding from the root vitest run.'
metadata:
  type: project
---

`gh pr merge <n> --squash --subject ... --body ...` **without** `--delete-branch` merges
cleanly and prints nothing. Passing `--subject`/`--body` keeps the squash commit free of
default trailers ([[no-assistant-attribution]]).

**Why leave `--delete-branch` off:** `gh` uses it to also switch the local checkout to the
base branch once the head branch is deleted. If that checkout cannot switch to the base
branch — for instance because it is checked out by another worktree — the resulting git
error prints **after** the merge has already succeeded server-side, so it reads as a failed
merge when it is not. Confirm the real state with `gh pr view <n> --json state,mergeCommit`
rather than trusting the exit output, then delete the remote branch as its own step with
`git push origin --delete <branch>`.

**Nested worktrees and the test runner:** a worktree created inside the repository itself
(for example, under a harness's own worktrees directory) is picked up by a root-level
`vitest` run, and its stale or unrelated tests fail the pre-commit hook. Exclude that
directory in `vitest.config.ts`. Removing such a worktree needs `git worktree remove --force`
plus a manual recursive delete; on Windows this can fail with "Filename too long" under
`node_modules`, and needs a long-path-aware removal instead.
</content>
