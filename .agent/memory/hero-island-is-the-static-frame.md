---
name: hero-island-is-the-static-frame
description: The site has one graph painter — FlowGraph.tsx — and it is a picture or an instrument depending on whether the caller passes onSelect.
metadata:
  node_type: memory
  type: project
  originSessionId: 62836594-b292-4a7b-b2fa-1c3c70d9cb97
  modified: 2026-09-08T10:02:56.124Z
---

`site/src/components/FlowGraph.tsx` is the only component that paints a flow graph.
`HeroFlow.tsx` owns the engine and the controls and hands it a `GraphView`; the feature rows
hand it a resting one. The earlier `FlowGraph.astro` was deleted on 2026-09-08, not kept as a
fallback: Astro renders an island's SSR output as the pre-hydration frame, and a React
component with **no** client directive is a pure static graph with zero JavaScript.

**Two lives, decided by one prop.** Passing `onSelect` is what makes the drawing interactive —
one focus stop, arrows between nodes, Escape to clear, `aria-activedescendant` naming the
selected node. Without it there is no `tabIndex` and no handler, so a page that only wants a
picture ships no JavaScript for it. Keep that branch: it is what lets the homepage and the
inspector share a painter without the homepage paying for the inspector.

Consequences worth remembering before editing it:

- Before `start()` runs there is no current step, so the SSR frame would paint every node
  upcoming. The component computes `standing = current ?? active[0]` for exactly this.
- Reaching the end does **not** null `current` — the engine stays on the last step and says
  `to: '@end'` in the `NavResult`. `ended` is component state, never derived from a snapshot.
- Conditions are drawn under the node, never on an edge: an `order` edge is a fall-through
  and carries no `when`.
- `layoutGraph` routes an incoming edge to the top of the target's box, so the end node's
  circle is drawn at `placed.y + 11`, not centred in its 40-unit box.
- A node absent from the breadcrumbs is `skipped` — off the route. So a mode with no engine
  (the inspector's Preview) must supply breadcrumbs of status `upcoming`, or every node in a
  pasted flow draws dashed as though its `when` were false.

Related: [[core-v1-entries-are-budget-boundaries]], [[v1-showcase-is-the-flow-graph]],
[[svg-graphs-never-scale-up]].
