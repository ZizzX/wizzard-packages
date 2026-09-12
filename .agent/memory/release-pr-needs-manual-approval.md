---
name: release-pr-needs-manual-approval
description: CI on the changesets release PR sits in action_required until a run is approved by hand.
metadata:
  node_type: memory
  type: project
  originSessionId: 3a980c57-43ec-4331-9be0-0adeccdf1e41
  modified: 2026-08-29T21:13:52.949Z
---

The `Version Packages` PR (branch `changeset-release/main`) is pushed by
`github-actions[bot]`, and this repo requires approval for workflow runs from
that actor. Every regeneration therefore lands its CI run in `action_required`
and `gh pr checks 15` reports "no checks reported on the branch" — which looks
like a broken pipeline and is not one.

Approve it without leaving the terminal:

```sh
RID=$(gh run list --branch changeset-release/main --limit 1 --json databaseId -q '.[0].databaseId')
gh api -X POST "repos/ZizzX/wizzard-packages/actions/runs/$RID/approve"
```

**Why:** the release PR looks stalled or red at a glance, and the reflex is to
re-push or re-run `changeset version`, neither of which changes anything.

**How to apply:** before diagnosing a red or missing release-PR check, look at
the run's conclusion. `action_required` means approve it; only a real `failure`
is worth debugging. Separate from [[npm-token-rotation-blocks-publishing]].
