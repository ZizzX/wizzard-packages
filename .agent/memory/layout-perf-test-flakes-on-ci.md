---
name: layout-perf-test-flakes-on-ci
description: The devtools dense-layout benchmark failed CI on a fixed 100 ms budget; it now asserts how time grows with edges, not milliseconds.
metadata:
  type: project
---

`packages/devtools/src/headless/layout.test.ts` lays out `denseFlow(200)`, about twenty
thousand edges. It used to assert the fastest of three runs under 100 ms. That measured the
runner, not the layout: about 8 ms on a laptop, 114-170 ms on a loaded GitHub runner, and on
2026-10-14 it failed three of four CI runs and blocked merges that never touched the layout.

Since T-119 it asserts a ratio instead, and since T-121 the sizes are far apart: the fastest of
five runs at 200 nodes against 50 stays under 40 - about 12 when linear in edges, 64 with one
extra quadratic pass. The first version compared 200 with 100 against a bound of 6 (linear about
3, quadratic about 9) and a CI run read 6.6 the same day: two sizes close together leave no room
between noise and regression. A 2 s absolute ceiling stays for a regression slow at every size.

**Why:** an absolute budget on a shared runner is a test of the runner's load. A ratio taken
in one process on one machine cancels the machine out, and still catches the regression that
matters - a change in complexity.

**How to apply:** for any timing assertion in this repository, compare two sizes measured in
the same run rather than one size against a fixed number of milliseconds, and prove it with a
mutation that changes the complexity. If this test fails again, rerun the SHA once; a second
failure on one SHA is real.
