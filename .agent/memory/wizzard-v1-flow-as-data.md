---
name: wizzard-v1-flow-as-data
description: The single architectural decision behind wizzard-packages v1 — a wizard is serializable data plus a resolver registry.
metadata:
  type: project
---

v1 replaces the 0.x engine wholesale. A wizard is a JSON-serializable `FlowDefinition` plus a
registry of named resolvers for the parts that cannot be serialized — predicates, validators,
loaders, views. The same object is produced by `defineFlow()`, by a backend, or by a
generator, and all three feed one engine.

Three invariants follow, and each removes a class of 0.x bug by construction:
nothing non-serializable in flow or state; derived values computed by memoized selectors, never
stored; every async path is read → compute → one atomic commit in `commit.ts`, with the
navigation epoch re-checked after each `await`.

**Why:** it is the one decision that simultaneously unlocks server-driven flows, generated
flows, graph visualization and reliable persistence — otherwise four separate features.

**How to apply:** reject any change that makes a flow unserializable or stores a derived value.
The full plan is a local design note, mirrored for contributors
in the repository's `ROADMAP.md`. Related: [[wizzard-0x-duplication-diagnosis]],
[[npm-scope-wizzard-unavailable]].
