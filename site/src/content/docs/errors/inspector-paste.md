---
title: inspector-paste
description: The text pasted into the flow inspector is not a flow the inspector can check and draw.
---

```
[wizzard] this is not JSON: <parser message> (line <l>, column <c>). A flow is a JSON object,
so the text has to parse before anything can read it. Fix the syntax at that position and draw
it again. …/errors/inspector-paste

[wizzard] this is valid JSON but not a flow definition. A flow is an object with a string id
and a steps object, and both are read before anything else. Wrap the steps: { "id": "signup",
"steps": { … } }. …/errors/inspector-paste

[wizzard] step "<id>" is <value>, not an object. Every entry in steps describes one step, and
the validator reads fields off it. Give it an object, empty if the step has nothing to say.
…/errors/inspector-paste

[wizzard] this flow has <n> steps and the inspector draws up to 40. …/errors/inspector-paste

[wizzard] this flow could not be checked: <message>. …/errors/inspector-paste
```

Returned, never thrown: these come from the documentation site's inspector, where the flow is
a stranger's text pasted into a box. The page lists them under the box and keeps the graph it
already had, so a bad paste costs a reader the picture they were about to see and not the one
they were looking at.

**Why the read builds the graph.** Guarding one field at a time is a game nobody wins.
`validateFlow` is typed for a `FlowDefinition` and reads `step.on`, `flow.order` and a group's
`flow.steps` without guarding them, so a step that is `null`, a number or a string, an `order`
that is not a list, and a group whose `flow` is neither an object nor a string each throw out
of it. Those five were guarded - and then `when: {"$and": 1}` threw out of the expression
printer, and `repeat: null` threw out of `buildGraph` at `step.repeat.over`, each taking the
page down the same way.

So the read now ends by building the graph the page will draw, inside the same `try`. A flow
that cannot be built is not a flow this page accepts, whatever field turns out to be the
reason, and the caller draws the graph it is handed rather than building a second one that
could fail where the first did not. The expression printer is wrapped for the same reason and
falls back to the raw JSON, and the drawing sits behind an error boundary for what none of
this has met yet.

Making the validator total for untrusted input is the deeper fix, and it belongs to the
diagnostic pass over the engine rather than to a site route.

**Why the drawing coerces.** Building the graph is not drawing it, and the difference is
where the last of these bugs lived. `validateFlow` checks a transition target with `to in
flow.steps`, and `in` stringifies its left operand, so `{"to": {}}` passes against a step
named `[object Object]`. The builder keeps the object, `layoutGraph` makes a placeholder node
whose id is that object, and the painter puts an id into a text node. Same crash as the
pasted `label`, four steps further downstream.

So every value that came from the paste and reaches a text node is coerced first - and so is
every value that reaches a React `key`, which is the half the first attempt at this missed. A
placeholder node carries whatever was in `edge.to`, so two of them, or one of them and a real
step, can stringify to one name; React answers a duplicate key by dropping siblings, and the
drawing shows a flow that is not the one in the box. That closes the family at the one place
all of them pass, rather than at each place one of them starts - which is the third approach
tried here, after guarding fields and after proving the graph builds. `@end` is refused as a
step id for a neighbouring reason: the builder adds a terminal under that name to every graph,
so a step taking it gives the drawing two nodes with one name and React keeps one.

**The four ceilings, and what each one bounds.**

| ceiling                   | value      | bounds                                        |
| ------------------------- | ---------- | --------------------------------------------- |
| characters                | 1 000 000  | whether the text is parsed at all             |
| steps, counting sub-flows | 400        | the work `buildGraph` is asked to do          |
| declared transitions      | 200        | the same, and the one a step count cannot see |
| drawn nodes / drawn edges | 40 / 1 000 | what reaches the DOM                          |

An edge is two elements, a `g` and a `polyline`, so the edge ceiling is about two thousand of
them rather than one: forty conditional steps draw 780 edges and around 1 800 SVG elements,
measured, in about 120 ms.

The first three are checked on the paste, the last on the graph once it has been laid out -
not merely built. The layout is where a transition to a target the flow never declares becomes
a node of its own, so a graph of three nodes can draw sixty-three, all of them born after every
gate that reads the paste. That split is not tidiness. `on.next` takes a list, and its length
is invisible to any step count: two steps whose `a.on.next` repeats a valid target a hundred
thousand times is 400 kB of legal JSON and 100 001 edges. And in the other direction,
`layoutGraph` draws the root's nodes and does not descend into a group's nested graph, so
counting the paste rejected a flow that would have drawn six nodes while telling the reader it
had forty-five - fail-safe, and false. Forty is `--graph-max-nodes` from the site's design
tokens; a graph past it has stopped being readable well before it stops rendering. A flow
larger than that is what the devtools panel is for: it docks beside a running wizard instead of
drawing the whole definition at once.
