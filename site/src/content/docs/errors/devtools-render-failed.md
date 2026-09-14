---
title: devtools-render-failed
description: The devtools Graph tab could not draw the flow; the rest of the panel keeps working.
---

```
[wizzard] the graph could not be drawn: <message>. A layout override or a flow shape the
renderer has not seen threw; the wizard, the strip, State and Activity are unaffected. Remove
the layout prop to use the built-in layout, or record a session and attach it to an issue.
…/errors/devtools-render-failed
```

Shown by the Graph tab in place of the graph. It is an error boundary around the renderer
alone, so the diagnostic strip, the State tab, the Activity tab and the export keep working;
a graph that cannot be drawn is not a reason to lose the refusal that was being diagnosed.

Two causes, in order of likelihood. A `layout` prop that threw or returned something the
renderer cannot read: the built-in `layoutGraph` is the way to confirm it, since removing the
prop restores the drawing. Or a flow shape the renderer has not met - a node kind, an edge
target or a `when` expression from a newer core than the installed devtools.
