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

**Closed 2026-10-05 (T-066):** the last entry, `packages/devtools/src/**`, was removed and the
block with it. Of 97 errors, 75 were import order and duplicate imports (autofix plus merging
into inline `type` imports). The 19 `no-unnecessary-condition` hits were nearly all real guards
on index access, which is typed non-undefined because `noUncheckedIndexedAccess` is off repo-wide:
the fix is `as T | undefined` on the read, never deleting the guard. Two of the three
`set-state-in-effect` hits were prop-change resets, rewritten as render-time adjustment; the
third, reading `sessionStorage` after mount for hydration, carries a line disable with its reason.
Related: [[wizzard-0x-duplication-diagnosis]].
