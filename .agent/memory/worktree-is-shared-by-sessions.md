---
name: worktree-is-shared-by-sessions
description: 'More than one agent session works in the graysby worktree at once, so it has one HEAD between them — never stage by wildcard.'
metadata:
  node_type: memory
  type: project
  originSessionId: 74a62900-a259-434b-94f2-c118d2ec9441
  modified: 2026-09-08T10:03:09.274Z
---

`C:/Users/Aziz/orca/workspaces/wizzard-packages/graysby` is worked in by more than one session
at the same time. It is one checkout, not a copy per session: one HEAD, one index, one working
tree, one `git status`.

**Why it matters:** on 2026-09-08 two sessions ran in it — one on S2 (the inspector), one on
the migration guide. Files each had never opened showed as modified in the other's
`git status`, and the second session ran `git reset --hard origin/main` while the first had
unsaved work in the tree. Nothing was lost that time by luck of timing.

**How to apply:**

- Never `git add -A`, `git add .` or `git commit -a`. Stage by explicit path, every time.
- Never `reset --hard`, `checkout -- .` or `stash` without asking the other session first;
  the stash stack is shared too.
- A branch switch moves the tree for everybody, so say before branching and say when done.
  Uncommitted work carries across a switch untouched, so a peer's files reverting after their
  `checkout -b` is expected, not a loss — check `origin` for your own pushed commit before
  believing anything vanished.
- Announce your file set early. `ListAgents` finds the peer; a message costs nothing next to
  an hour of untangling.

**Resolved the same day, and this is the fix to reach for first:** the second session ran
`git worktree add` and moved to
`C:/Users/Aziz/orca/workspaces/wizzard-packages/inspector`. One HEAD each, no serialising, no
handing the tree back and forth. What stays shared after that is only the object store and
refs, the stash stack and the remote — so a branch name or a `git fetch --prune` is still
worth a word, and nothing else is. The rules above apply while two sessions really are in one
tree; they are not a reason to stay that way.

Related: [[work-autonomously-through-the-plan]], [[worktree-merge-quirks]].
