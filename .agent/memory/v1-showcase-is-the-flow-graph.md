---
name: v1-showcase-is-the-flow-graph
description: 'The 1.0.0 plan was reordered around a flow-graph inspector, and the compat layer was cut on download numbers.'
metadata:
  node_type: memory
  type: project
  originSessionId: e02fbbde-ae72-4ccb-8015-0beda5d90a71
  modified: 2026-09-03T15:46:25.798Z
---

Decided 2026-09-03. 1.0.0 is no longer built in roadmap-phase order. The showcase is a flow
graph plus time-travel replay, shipped first as a route inside the existing `packages/ui` site,
and only then embedded in `@wizzard-packages/devtools`. Full reasoning, premises and the ordered
step list: `docs/designs/flow-inspector.md`.

Two measurements drove it, neither recoverable from the repository:

- Downloads 2026-07-31..2026-08-29 — core 52, react 50, vue 12. Mirror and scanner traffic,
  not users. The `compat` package, `compileLegacyConfig` and the migration guide were cut on
  this, along with careful deprecation of the four 0.x packages.
- No stepper or wizard library ships a graph view (checked react-step-wizard, react-stepzilla,
  react-multistep, VeeValidate, FormKit). Graph visualizers exist only for state-machine
  libraries, and Stately's free one is deprecated in favour of a paid product. The gap is real.

**Why:** the roadmap's phase numbering implies an order that spends months before anything is
visible, and it budgets a whole package for compatibility with users that the registry says do
not exist.

**How to apply:** check the download numbers again before re-arguing the compat cut — the
premise is a measurement, not a preference. Related: [[wizzard-v1-flow-as-data]],
[[npm-token-rotation-blocks-publishing]].
