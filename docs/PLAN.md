# Plan

The living plan for 1.0.0 and what comes after it: what is being built, in what order, and where
each piece stands. Why each decision was made lives in
[`docs/designs/v1-launch.md`](designs/v1-launch.md), the frozen design record. This file tracks
that plan; it does not argue it.

It is documentation like any other, so it changes in the same PR that changes a status (see
`CLAUDE.md`). Task-level truth - who is on what, what is blocked by what - is the project board;
this file is the view one level above it.

## Now

<!-- The session brief hands this section to every new session. Keep it short and true; the
brief shows the board and the last merged PRs live, so they are not repeated here. -->

- **In progress:** S4, the documentation pages (#57). S4-1 (#71) landed in #87 - the
  runnable-example mechanism and Getting started - and S4-2 (#72) in #89 - the four task pages,
  each with a runnable example on that mechanism. S4-3 and S4-4 (#73, #74) are next.
- **Next after S4:** L6, the diagnostic contract (#59), which also owns the `/errors/` pages.
- **Waiting on the owner:** R3 (#80), because `main` has no branch protection.

## Tracks

Status is one of: **done**, **in progress**, **next**, **todo**, **blocked**, and **owner** for work
only the owner can do.

### L - the library

| Id      | What                                           | Status | Where              |
| ------- | ---------------------------------------------- | ------ | ------------------ |
| L0      | Plugin lifecycle in the engine                 | done   | #31                |
| L1      | Build wiring for `session.ts`                  | done   | #27                |
| L2, L2b | The wizard typed by its flow, the expr builder | done   | #36                |
| L3      | `"use client"` survives the build              | done   | #37                |
| L4a     | Durable snapshot contract                      | done   | #33                |
| L4b     | `/persist` on the snapshot contract            | done   | #34                |
| L5      | Devtools on the v1 engine                      | done   | #42, #43, #45, #47 |
| L6      | Diagnostic contract and the `/errors/` pages   | next   | #59                |
| L7      | Test-gap audit                                 | todo   | #63                |
| L8      | 0.x teardown and the root export flip          | todo   | #64                |
| L9      | Group and repeat traversal                     | done   | #38, #40, #41      |
| L10     | `clearOnLeave`                                 | done   | #35                |

### S - the site

| Id  | What                                  | Status      | Where                                            |
| --- | ------------------------------------- | ----------- | ------------------------------------------------ |
| S1  | Site shell and the hero               | done        | #48                                              |
| S2  | The flow inspector                    | done        | #50                                              |
| S3  | The three reference applications      | done        | #54, #55, #56; the StackBlitz button waits on R0 |
| S4  | The documentation pages               | in progress | #57                                              |
| S5  | API reference from typedoc            | blocked     | #62, by S4                                       |
| S6  | Deploy switch                         | todo        | #66                                              |
| -   | A flat ground and surfaces            | in progress | #58; #75 done, #76 open                          |
| -   | Versioned documentation               | todo        | #60                                              |
| -   | The home page scroll-driven animation | todo        | #61                                              |

### D - the docs

| Id  | What                        | Status      | Where                                                     |
| --- | --------------------------- | ----------- | --------------------------------------------------------- |
| D1  | `AGENTS.md` amendments      | done        | #30                                                       |
| D2  | The migration guide         | done        | #51                                                       |
| D3  | The README                  | done        | #29; phase two, root imports and `@latest`, is in #66     |
| D4  | Per-package READMEs         | in progress | #49 did core, react and vue; devtools is over budget, #65 |
| D5  | `ROADMAP.md` compat section | done        | #51                                                       |
| D6  | The contributor documents   | todo        | #65                                                       |

### R - the release

| Id  | What                                           | Status  | Where      |
| --- | ---------------------------------------------- | ------- | ---------- |
| R3  | Branch protection on `main`, the release token | owner   | #80        |
| R0  | Release candidate on the `next` tag            | blocked | #66, by L8 |
| R1  | Promote that exact version to `latest`         | todo    | #66        |
| R2  | Deprecate the 0.x-only packages                | todo    | #66        |

## Order

The critical path, from `docs/designs/v1-launch.md`'s dependency table and its decision log:

S4 -> L6 -> S5 -> L7 -> L8 -> D3 phase two -> R0 -> S6 -> R1 -> R2

Alongside it, and finished before R0 because they ship with the first release: D4's leftovers and
D6 (#65), the rest of the browser pass (#76), versioned documentation (#60) and the home page
animation (#61). R3 can happen at any time and should happen first.

## After 1.0.0

In the order the owner needs them. None of it is 1.0.0 scope; all of it constrains 1.0.0 not to
close the door. The constraint over all four: the library never binds to its own UI components.

| What                                        | Where |
| ------------------------------------------- | ----- |
| The step builder - the owner needs it first | #67   |
| Server-driven UI and server-rendered steps  | #68   |
| An MCP server, and agent rules on the site  | #69   |
| Prompt to graph                             | #70   |

## Legacy ids

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
