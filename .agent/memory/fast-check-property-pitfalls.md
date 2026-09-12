---
name: fast-check-property-pitfalls
description: 'Two fast-check traps that made a property test fail on some seeds only (PR #36) — predicate return value and -0 from jsonValue.'
metadata:
  node_type: memory
  type: project
  originSessionId: 6824504c-5a31-4c05-8d7b-015695f0f2ae
  modified: 2026-09-06T09:52:35.221Z
---

Seen 2026-09-06 while writing `expr-builder.test.ts` (PR #36). Both failed only
on some seeds, so a single green run proves nothing.

1. **A predicate must return `undefined`/`true`, or wrap the assertion in braces.**
   `fc.property(arb, (x) => expect(x).toEqual(y))` returns the chai chain; fast-check
   reads a non-`true` return as "property failed by returning false". Use a block body.
2. **`fc.jsonValue()` can yield `-0`.** `JSON.stringify(-0)` is `"0"` and vitest's
   `toEqual` is `Object.is` on primitives, so a round-trip check fails. Canonicalize the
   arbitrary through `JSON.parse(JSON.stringify(v))` when the test compares against JSON.

**Why:** the house style is property tests for core logic ([[wizzard-v1-flow-as-data]]
requires JSON round-trips everywhere), so both traps recur.

**How to apply:** before pushing a new property test, run it several times or with
`{ numRuns: 3000 }` once; a seed-dependent failure that "goes away" is one of these two.
