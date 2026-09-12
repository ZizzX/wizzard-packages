---
name: npm-token-rotation-blocks-publishing
description: RESOLVED 2026-09-04 - the Automation-token rotation fixed npm auth; kept for the E404 -> EOTP -> working diagnosis chain.
metadata:
  node_type: memory
  type: project
  originSessionId: 3a980c57-43ec-4331-9be0-0adeccdf1e41
  modified: 2026-09-04T18:00:00.000Z
---

**RESOLVED on 2026-09-04.** A third rotation, this time to a token that
bypasses OTP, fixed it: attempt 5 of run `33275701272` signed provenance and
landed four packages, attempt 6 landed all nine. What follows is the
diagnosis chain, kept because the error codes are the whole story.

Every merge to `main` runs the Canary workflow and every run has failed on all
eight packages. The error changed once, and the change is the whole point:

- Until 2026-08-29: `E404 Not Found - PUT https://registry.npmjs.org/@wizzard-packages%2freact`.
  npm answers 404, not 403, when a token lacks publish rights.
- Run `33275701272` (2026-09-01): `EOTP This operation requires a one-time
password from your authenticator.`
- The secret was rotated on **2026-09-01 06:42Z**. Attempt 4 of the same run,
  re-run on 2026-09-03, failed with **EOTP again** on all eight packages. So the
  rotation replaced one wrong-type token with another wrong-type token. The
  `404 for npm info @wizzard-packages/validate` line in that log is unrelated —
  `validate` has simply never been published.

EOTP is progress, not a regression. The token now authenticates; npm is asking
for 2FA at publish time. That is what a classic **Publish** token does on a
2FA-enabled account. CI needs a classic **Automation** token or a **granular
access token** — both bypass the OTP prompt.

Filed as `wizzard-15`. The same `NPM_TOKEN` secret in the `wizzard-packages`
environment gates the release publish, so nothing ships until it is right.

**Why:** eight identical failures read like eight packaging bugs and invite
edits to `exports` maps. It is one secret. And a second rotation that produces
the same EOTP means the token type is wrong, not that the token is dead.

**Where the secret lives:** the `wizzard-packages` GitHub _environment_, not
repo secrets. `gh secret list` and `gh api repos/.../actions/secrets` both
return empty, which reads like a missing secret and is not. Check it with
`gh api repos/ZizzX/wizzard-packages/environments/wizzard-packages/secrets` —
`updated_at` confirms a rotation before spending a workflow re-run on it.

**How to apply:** the agent cannot rotate a repository secret. `canary.yml` has
no `workflow_dispatch` and is path-filtered to `packages/**` and `.changeset/**`,
so a docs-only push will not retest it — re-run the failed run instead
(`gh run rerun 33275701272`), which re-reads the secret. Never treat a green CI
as proof that publishing works; CI never publishes. `canary.yml` already grants
`id-token: write` and sets `NPM_CONFIG_PROVENANCE`, so npm trusted publishing
(OIDC, no token at all) is the standing alternative if tokens keep failing.
Distinct from [[release-pr-needs-manual-approval]].
