---
name: layout-perf-test-flakes-on-ci
description: The devtools dense-layout benchmark fails CI at roughly 3% over its 100 ms threshold on a shared runner; the same commit passes on rerun.
metadata:
  node_type: memory
  type: project
  originSessionId: 831efeb7-7607-499c-8d8f-dcfa8600b9d8
  modified: 2026-09-08T08:32:17.092Z
---

`packages/devtools/src/headless/layout.test.ts` — "lays out the dense fixture
(about twenty thousand edges) under 100 ms" — failed `build-test (22)` on
2026-09-08 with `expected 102.82660800000008 to be less than 100`, on a commit
whose identical content had already passed that job twice the same day. A
`gh run rerun --failed` on the same SHA went green.

The test already averages away some noise: it runs the layout three times,
sorts, and asserts on `times[1]` — the median.

**Why:** a median still absorbs scheduler preemption on a shared GitHub runner,
and 100 ms leaves under 3% of headroom. Treat a single failure of this one test
as noise, not as a regression to bisect — but confirm by rerunning the same SHA
rather than by pushing a change.

**How to apply:** rerun first. If it fails twice on one SHA, it is real. The
standing fix, not yet applied, is to assert on `times[0]` (the minimum) instead
of the median: noise can only add time, so the minimum is the stabler estimate
of the true cost and a genuine regression still raises it. That is a one-line
change to a devtools test and does not belong in an unrelated PR.

**Fixed 2026-09-08 (PR #52).** It took the median of three runs; it takes the
minimum now. Noise on a shared runner only ever adds time — a scheduler steal
inflates a sample and nothing deflates one — so the median is a sample that was
interrupted less and the minimum is the closest three samples get to the real
cost. The 100 ms budget is unchanged.

It stopped being a nuisance and became a release hazard first: it read **452 ms**
during the 0.5.0 publish and blocked the tag push. See
[[changeset-publish-reports-false-success]]. If it flakes again, the number to
doubt is the budget, not the estimator.
