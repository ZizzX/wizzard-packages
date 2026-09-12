---
name: eslint-legacy-quarantine
description: How the wizzard-packages repo adopts a strict lint standard without breaking CI on legacy code.
metadata:
  type: project
---

`eslint.config.js` ends with a LEGACY QUARANTINE block listing the 0.x source paths and
downgrading the strict type-aware rules there (`no-explicit-any` to warn, and off for
`no-unnecessary-condition`, `consistent-type-imports`, `switch-exhaustiveness-check`,
`import-x/order` and the react-hooks rules the old context trips). New v1 code gets the full
strict-type-checked standard. Result: 0 errors, ~231 warnings, all inside the quarantine.

Same pattern for the other gates: `.size-limit.js` budgets and the `vitest` coverage
thresholds are set just past current measurements, so they can only ratchet up.

**Why:** the alternative is weakening the standard globally or failing CI on ~250 violations in
code scheduled for deletion. The quarantine list makes the debt visible and shrinks measurably.

**How to apply:** delete a quarantine entry the moment its v1 replacement lands; never add one.
Related: [[wizzard-0x-duplication-diagnosis]].
