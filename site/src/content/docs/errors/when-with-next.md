---
title: when-with-next
description: A step sets both when and on.next, which answer different questions.
---

```
[wizzard] step "<id>" has both when and on.next. when decides whether the step is on the path, and
on.next only where it leads, so a condition on the step never picks the next one. To pick the next
step, move the condition into a transition's when; if both are meant, leave them.
…/errors/when-with-next
```

Returned by `validateFlow` as a problem with `path: steps.<id>`, and listed in the message of [`flow-invalid`](../flow-invalid/) by `assertFlow`.

`when` and `on.next` answer different questions, and on one step they do not interact. `when`
decides whether the step is on the path at all: while it is false the step is skipped, left out of
progress and breadcrumbs, and a transition that leads to it is not taken. `on.next` decides where
the step goes once someone is on it. A condition written in the step's `when` never chooses the next
step.

The report is there because the two are easy to confuse. If the condition was meant to choose where
to go from here, move it into the transition:

```json
{
  "on": {
    "next": [
      { "to": "company", "when": { "$eq": [{ "$get": "data.payer" }, "business"] } },
      "review"
    ]
  }
}
```

If the step should be hidden under one condition and branch under another, both fields are right,
and the report can be left.

Both are described in [the flow guide](../../docs/flow/#where-a-step-leads).
