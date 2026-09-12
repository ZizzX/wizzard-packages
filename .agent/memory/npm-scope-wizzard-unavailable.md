---
name: npm-scope-wizzard-unavailable
description: The @wizzard npm scope cannot be registered; packages stay on @wizzard-packages/*.
metadata:
  type: project
---

Verified 2026-08-29: the npm org `wizzard` cannot be created because an unscoped package named
`wizzard` already exists on the registry (`https://registry.npmjs.org/wizzard` returns 200),
and npm rejects org names that collide with an existing package name. `wzrd` is taken too.
Free at the time of checking: `wizzardjs`, `wizzard-js`, `wizzardry`, `wizzard-flow`,
`wizzardkit`.

The owner chose to stay on the scope they already own, **`@wizzard-packages/*`**.

**Why:** it removes a whole workstream — no dual-scope publishing, no re-export shims in the
old scope, no `npm deprecate` on old names. v1.0.0 is still a clean break, just inside the
same names, so consumers never rewrite an import.

**How to apply:** never plan around `@wizzard/*`. A 404 on `@scope/pkg` does not mean a scope
is free — check whether an unscoped package of that name exists. Related:
[[wizzard-v1-flow-as-data]].
