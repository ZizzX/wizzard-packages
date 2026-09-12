---
name: devtools-panel-measured-twice-the-budget
description: "The v1 devtools panel measures 13.4 kB gzip against the design's 5-7 kB estimate; the limit was written from the measurement, not the estimate."
metadata:
  node_type: memory
  type: project
---

`docs/designs/devtools.md` estimated 5-7 kB gzip for the whole panel. The built panel measured
13 308 B on 2026-09-07 (13.4 kB after the review round), and `.size-limit.js` carries 14.6 kB
with the reason beside it: about a third is the headless layer the panel re-exports, the rest
is five views plus the stylesheet, which ships as a string because a `.css` file would make
every consumer configure a bundler for it and inline styles cannot express a focus ring.

**Why:** the L9 rule is that a budget line is written from a measurement. Rounding the estimate
up would have hidden a doubling; naming it makes the next reader ask the right question.

**How to apply:** devtools is a development-time dependency, so the budget catches accidental
growth rather than fighting for bytes. Do not "fix" the gap by deleting the stylesheet or the
inspector - both are contract, §12.9 and §12.10. Related:
[[core-v1-entries-are-budget-boundaries]].
