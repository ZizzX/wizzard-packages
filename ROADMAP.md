# Roadmap — v1

Supersedes `docs/legacy/IMPROVEMENT_ROADMAP.md`.

## Why a v1 rewrite

An audit of the 0.x sources found problems that cannot be fixed incrementally, because they
follow from the shape of the state rather than from any single bug:

- **State is not serializable.** `IWizardState` stores the config (with functions), whole step
  objects, and four `Set` instances. That rules out server-driven flows, reliable persistence,
  time-travel and graph visualization — all at once.
- **There is no transition graph.** Branching is a filter over a flat list. No sub-flows, no
  loops, no working back-stack (`history` only grows and is never read backwards).
- **Navigation is implemented three times** — in the React context, in the standalone React
  store, and again in Vue — and the copies have drifted apart. Vue silently drops
  `config.middlewares`, never calls `hydrate()`, and ignores `dependsOn`/`clearData`.
- **Derived values are stored**, so they go stale. Conditional steps visibly flash on first
  paint because `INIT` seeds `activeSteps` with unconditional steps only.

## The decision everything follows from

A flow is data.

```
defineFlow({...})  ──compiles to──►  FlowDefinition (JSON)  ──►  createWizard(flow, registry)
backend            ──serves──────►   FlowDefinition (JSON)  ──►  the same engine
generator          ──emits───────►   FlowDefinition (JSON)  ──►  the same engine
```

Three consequences, each of which removes a class of bug by construction:

1. Everything non-serializable lives in a registry, not in the flow and not in the state.
2. Derived values are computed by memoized selectors, never stored.
3. Any async work is _read → compute → one atomic commit_, with the navigation epoch
   re-checked after every `await`.

## Packages

Dependencies point one way — into core. Core has no runtime dependencies.

| Package                      | Role                                                                                                                | Budget (gzip)    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `@wizzard-packages/core`     | flow types, expression evaluator, engine, navigation pipeline, selectors, `defineFlow`, `patchFlow`, `validateFlow` | 4.0 kB           |
| `@wizzard-packages/react`    | provider, hooks, `useSyncExternalStore` bridge                                                                      | 1.5 kB           |
| `@wizzard-packages/vue`      | `provideWizard`, composables, `shallowRef` bridge                                                                   | 1.5 kB           |
| `@wizzard-packages/validate` | one Standard Schema adapter — Zod, Valibot, ArkType, Effect, Yup                                                    | **317 B**        |
| `@wizzard-packages/plugins`  | `/persist`, `/analytics`, `/logger`, `/autosave`, `/url-sync`, `/http-flow`                                         | 0.8 kB per entry |
| `@wizzard-packages/devtools` | inspector, flow graph, time travel                                                                                  | —                |
| `@wizzard-packages/compat`   | the 0.x API on top of the v1 engine                                                                                 | —                |

Removed in v1: `middleware` (replaced by plugins), `adapter-zod` and `adapter-yup` (one
Standard Schema adapter covers four validation libraries), `persistence` (a plugin).

The Yup shim the table used to promise is not needed: Yup has implemented Standard
Schema since 1.5, verified against 1.7.1, and returns issues in the same shape as Zod.
One adapter, no vendor branches, five libraries.

For reference, 0.x measures 4.09 kB for core against 8.43 kB for react — the framework layer
is twice the size of the engine it wraps. That ratio is the duplication being removed.

## Size budget

Measured 2026-08-29, gzip, cumulative by module:

| Module                      | Size    |
| --------------------------- | ------- |
| `path`                      | 279 B   |
| `expr`                      | 929 B   |
| `resolve`                   | 1.07 kB |
| `navigate`                  | 2.44 kB |
| `store`, `select`, `define` | 3.88 kB |

The pipeline is the expensive part, at roughly 1.4 kB of its own. That is fair:
it is the eleven phases everything else delegates to, and it is the reason the
bindings can be 250 lines.

Group and repeat traversal is deliberately **not** in the main entry. It goes
behind its own export, so a flow with no sub-flows pays nothing for the
machinery that walks them. The alternatives were raising the budget to 5 kB for
everyone, or dropping `repeat` — which the plan named as the first feature to
cut. Neither was necessary: per-entry exports were already the packaging model,
so the feature survives and the flat case stays inside 4 kB.

`validateFlow` sits behind its own export for the same reason. It is for
development and for the moment a flow arrives from a backend; a browser bundle
should never carry it, and a separate entry makes that hard to do by accident.

## Phases

**0 — Foundation.** Pinned toolchain, one code style, packaging and size gates in CI,
trunk-based flow with canary publishing, consolidated contributor docs.

**1 — Core.** Expression evaluator, `resolveNext`, the navigation pipeline and `commit`,
selectors, `defineFlow` and the type machinery. Property tests over randomly generated flows;
a deterministic scheduler for the race matrix. A size spike comes first: if the skeleton
exceeds 2 kB, features are cut before any binding is written.

Measured once the bindings existed: **react 906 B, vue 646 B**, against 8.43 kB
and 5.07 kB for their 0.x equivalents. Nothing was optimised to get there. The
logic simply moved into the engine, which is the entire argument for the
rewrite, stated as a number.

**2 — Bindings.** React and Vue, roughly 250 lines each, from the same bridge shape, plus a
shared contract-test package run against both. That suite is what keeps them from drifting
apart again.

**3 — Periphery.** `validate`, `plugins`, `devtools` with the flow graph, `compat` and the
migration guide.

**4 — Site and release.** Documentation site with live examples and an interactive flow graph;
`1.0.0` to `latest`.

**5 — Differentiators.** Server-driven flows (`http-flow`, flow patches, deferred steps),
flow generation from a prompt, an MCP server, a CLI, Svelte and Solid bindings.

**6 — Adoption.** Honest positioning against the alternatives, articles, templates.

## Compatibility

`@wizzard-packages/compat` re-implements the 0.x surface on the new engine, and
`compileLegacyConfig` maps old configs onto a flow: `condition` → `when`, `canNavigateTo` →
`guards.enter`, `beforeLeave` → `guards.exit`, `validationAdapter` → the validator registry,
`component` → the view registry (identity preserved), `persistenceAdapter` → the persist
plugin, `middlewares` → one plugin each.

Data needs no migration: 0.x stores a flat dot-path object and v1 stores dot-path slices —
the same shape, with slices as top-level keys.

What deliberately does not carry over is listed in the migration guide, including the
`goToStepResult: 'init'` probe protocol, the leaked `errorsMap`, the two-phase render of
conditional steps, and a handful of 0.x behaviours that were bugs rather than features.
