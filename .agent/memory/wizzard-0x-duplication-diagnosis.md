---
name: wizzard-0x-duplication-diagnosis
description: Why 0.x cannot be fixed incrementally — navigation is implemented three times and the copies disagree.
metadata:
  type: project
---

`next`/`prev` and the active-step debounce live in three places in 0.x — `react/context/
WizardContext.tsx`, `react/store.ts` and `vue/index.ts` — not in core. The copies have drifted:
Vue silently drops `config.middlewares`, never calls `injectPersistence`/`hydrate()`, ignores
`dependsOn`/`clearData`, and has an inverted validate default in `nextStep`.

Measured 2026-08-29 with size-limit (gzip): core 4.09 kB, react 8.43 kB, vue 5.07 kB. The
framework layer is twice the engine it wraps. Coverage across `packages/*/src` is 38% of
statements, because the standalone React store path has no tests at all.

**Why:** these numbers are the argument for the v1 budgets (react 1.5 kB) and for the shared
contract-test package — a review that only reads code tends to conclude the duplication is
harmless.

**How to apply:** cite the ratio when justifying rewrite scope. Related:
[[wizzard-v1-flow-as-data]], [[eslint-legacy-quarantine]].
