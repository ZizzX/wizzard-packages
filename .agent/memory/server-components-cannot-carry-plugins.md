---
name: server-components-cannot-carry-plugins
description: Why examples/next-app has two routes — a plugin or a registry cannot cross the RSC boundary, so the devtools route is a client component.
metadata:
  type: project
---

`WizardProvider` takes `plugins` and `registry`, and both are functions. A React Server
Component can only hand serializable props to a client component, so a server component can
create a wizard from a `flow` (JSON) and nothing more. Any wizard carrying a plugin — devtools,
persist, url-sync — has to be created on the client side.

That is why `examples/next-app` has two routes since 2026-09-07 (PR #47): `/` stays a server
component importing `WizardProvider` straight from the built package, which is the only thing
that proves the `'use client'` directive survived the build; `/devtools` is a client route,
because the devtools panel needs the same plugin object the engine was given.

**How to apply:** do not "fix" the split by moving the panel onto `/` — that would delete the
directive proof, not simplify it. A future example that needs a plugin gets its own client
route for the same reason. Related: [[tsup-treeshake-drops-directives]],
[[core-v1-entries-are-budget-boundaries]].
