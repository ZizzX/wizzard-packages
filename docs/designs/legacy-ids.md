# Legacy ids

The `wizzard-N` ids cited in `docs/designs/` and in two test comments come from the beads tracker
this repository used until 2026-09-11. Where each one went:

| Id         | What                                               | Where it went                                                |
| ---------- | -------------------------------------------------- | ------------------------------------------------------------ |
| wizzard-9  | Replace the hard sleeps in the e2e suite           | L7, #63                                                      |
| wizzard-10 | The missing Vue demo pages                         | Dropped: `examples/vue-demo` is 0.x, and L8 (#64) deletes it |
| wizzard-11 | Decide the core size budget before group traversal | Done before L9                                               |
| wizzard-12 | Group and repeat traversal                         | L9, #38, #40, #41                                            |
| wizzard-13 | Type the store against a flow                      | L2, #36                                                      |
| wizzard-14 | `"use client"` survives the build                  | L3, #37                                                      |
| wizzard-17 | `canBack` stayed true after a backward move        | Fixed in #39                                                 |
| wizzard-18 | `validate-flow` accepts a `step` root              | #83                                                          |

The whole tracker, closed items included, is in git: `git show 1c6323c:.beads/issues.jsonl`.
