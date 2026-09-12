---
name: zero-external-dependents
description: No public repository depends on any @wizzard-packages/* package, measured 2026-09-08 — which is what makes breaking changes cheap and the compat package unnecessary.
metadata:
  type: project
---

A GitHub code search on **2026-09-08** for `@wizzard-packages/` returned **157 files, all 157
inside `ZizzX/wizzard-packages` itself**. Restricted to `package.json`, it returns exactly one
repository: this one. **No public repository declares a dependency on any package in this
scope.**

npm reports downloads over the month to 2026-09-06 — core 1 296, react 926, vue 830 — and with
zero dependents those are mirrors and registry crawlers, not applications.

**Why:** every "will this break someone" question in this project has the same answer, and it
is not a guess. The compat package was cut on the download numbers alone; the dependents check
is the one that actually settles it, and it had never been run until this. It is recorded in
`docs/MIGRATION.md` with its date so a reader can re-run it rather than trust it.

**How to apply:** breaking changes here are cheap — the 0.x deletion (L8), the root-export
flip at 1.0.0, dropping an export. Do not spend effort on shims, deprecation cycles or
compatibility layers for a population that does not exist. Re-run the search before any
decision that leans on it; it is two `gh api search/code` calls and the number can change.
See [[rewrite-from-scratch-mandate]] and [[v1-readme-still-documents-0x]].
