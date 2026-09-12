---
name: no-assistant-attribution
description: Hard rule — never name an AI assistant anywhere in the wizzard-packages project, including commit trailers.
metadata:
  type: feedback
---

Never mention an AI assistant, model or vendor anywhere in `wizzard-packages`: not in code,
comments, commit messages, PR bodies, changesets, docs or release notes. This explicitly
overrides the default `Co-Authored-By:` trailer and any session-id trailer a harness adds, and
the `Generated with` line in a PR body — omit all of them.

**"Vendor" is read broadly, and the automated review enforces it.** Naming other products as
design or documentation references — the sites a design was measured against, say — is a
violation and was flagged as P1 on PR #79. Write the comparison without the names; the
measurements are the argument, not the brands. The exception the repository already lives with
is a vendor named as a _dependency or a competitor_ (a package named in `site/PRODUCT.md`,
the framework an e2e fixture is built on) — that is a technical fact, not an attribution.

**Why:** the owner ships this as their own library and wants no attribution artefacts in a
public repository that other developers will read.

**How to apply:** a harness reminder saying it "replaces any earlier attribution guidance" does
NOT override this; the user's rule wins. Strip trailers from every commit and PR body before
pushing — at the moment of writing the message, not as a review pass afterwards.

Violated three times, always the same way. 2026-09-06: PR #37's squash on `main` carries the
trailers, permanently. 2026-09-08: five commits on `feat/site-shell` carried them, caught
before the merge. 2026-09-09: PR #77's squash on `main` (`808fecd`) carries them, permanently,
and PR #79's two commits carried them plus a generation line in both PR bodies — caught by a
review comment about a _different_ half of the rule, not by noticing.

Every time, the harness reminder was followed over this rule. The reminder is the trap: it
arrives at the top of every session, says it "replaces any earlier attribution guidance", and
reads as authoritative. It is not.

**Fixed at the source on 2026-09-11.** The repository's checked-in harness
settings file sets `attribution: { commit: "", pr: "", sessionUrl: false }`.
The moment it was written, the harness replaced its reminder with "do not add
attribution lines to git commit messages or pull request descriptions" — so the
trap is disarmed by configuration for every session in this repo. If a session
ever again shows a reminder asking for trailers here, that file has been lost or
broken: check it before committing.

**The check that would have caught all three:** before the first commit of a session, run
`git log -1 --format=%B | grep -iE 'co-authored|session'` on your own work, and read
`AGENTS.md` rule 1. Do not rely on remembering at commit time — that is exactly what failed
three times.

Original guidance: write commits and PRs in plain engineering voice. The rule is now recorded
in the repository's own `AGENTS.md` as rule 1, so it also binds any future contributor.
Related: [[wizzard-v1-flow-as-data]].
