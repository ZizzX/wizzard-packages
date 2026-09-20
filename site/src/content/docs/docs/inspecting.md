---
title: Inspecting a flow
description: A flow as a graph, and a recorded session checked against the definition it was taken from.
---

Two entry points exist for looking at a flow rather than running one: `core/graph` turns a
definition into nodes and edges, and `core/session` checks that a recorded session still matches
the definition. Both are their own entry, so a wizard that only runs a flow never carries them.

## The graph

```ts
import { buildGraph } from '@wizzard-packages/core/graph';

const { nodes, edges } = buildGraph(trip, { passenger });
```

The result is structure, not a picture: there are no coordinates in it, and laying it out is the
caller's job. That is the division that lets the devtools panel and this site's diagrams draw
the same flow in different ways.

A node is a step, a group or the end:

| Field      | Meaning                                                                  |
| ---------- | ------------------------------------------------------------------------ |
| `id`       | the step's key, or `END`                                                 |
| `kind`     | `step`, `group` or `end`                                                 |
| `label`    | the step's label, when it has one                                        |
| `when`     | the condition that includes it, unevaluated                              |
| `deferred` | the step's body arrives later                                            |
| `offOrder` | the step exists but `order` does not list it                             |
| `group`    | for a group: its `flowId`, its `repeat` expression, and the nested graph |

A nested graph is there when the sub-flow could be expanded. When it could not, `group.opaque`
says why: `unresolved` for a name no `subFlows` holds, `cycle` for a sub-flow that contains
itself, `too-deep` past 32 levels. Drawing a box that says which of the three happened is more
useful than drawing nothing.

An edge carries `from`, `to`, and `kind`: `next` and `back` for the transitions a step declares,
`order` for the ones the order implies. `when` is the condition on that transition, and
`dangling` marks an edge whose target does not exist - which `validateFlow` reports as an error
and a drawing can show as a loose end.

Expressions are handed over unevaluated on purpose. A graph is the shape of a definition, not
the path one person took through it.

## A recorded session

`core/session` answers a narrower question: is this stack of frames still consistent with this
definition?

```ts
import { checkSession } from '@wizzard-packages/core/session';

const problems = checkSession(recording, trip, { passenger });
if (problems.length > 0) refuse(problems[0].message);
```

A session is `{ flow, version?, frames }` - the id and version it was taken against, and the
states it passed through. `checkSession` returns problems and never throws, each one carrying
`path`, `message`, `code`, `fix` and `url`, the same shape `validateFlow` returns.

What it catches: a recording of a different flow or version
([`session-flow-mismatch`](../../errors/session-flow-mismatch/)), no frames at all
([`session-no-frames`](../../errors/session-no-frames/)), a frame that is not a state
([`session-frame-corrupt`](../../errors/session-frame-corrupt/)), frames whose revisions run
backwards ([`session-frames-reordered`](../../errors/session-frames-reordered/)), and a stack
naming a flow or a step the definition no longer has
([`session-unknown-flow`](../../errors/session-unknown-flow/),
[`session-frame-mismatch`](../../errors/session-frame-mismatch/)).

That is what this site's flow inspector runs before it replays the bundled recording against a
flow you paste, and what devtools runs over a redacted export before handing it on. Frames a
definition can no longer explain would draw a past that never happened, so both refuse with the
problem instead of rendering it.

Two smaller functions come with it. `knownFlows(flow, subFlows)` collects every definition
reachable from a root - inline sub-flows and named ones - into a map, which is what any check
over a stack needs first. Its second argument is not optional: pass `undefined` when there is no
registry of named sub-flows. `checkFrames(stack, known, report)` is that walk on its own, reporting
`unknown-flow`, `unknown-step`, `not-a-group`, `wrong-flow` or `key` for the frame it is on. It
is exported because restoring a snapshot needs the same walk that checking a session does;
[Persistence](../persistence/) is where it runs for you.
