# Design: Flow Inspector — the 1.0.0 showcase

Date: 2026-09-03
Branch: ZizzX/main
Repo: ZizzX/wizzard-packages
Status: DRAFT
Mode: Builder

## Problem Statement

The v1 engine works. Core measures 3.88 kB gzip against the 3.9 kB limit `.size-limit.js`
actually enforces (4.0 kB in the `ROADMAP.md` table is the aspirational target, not the gate),
the React binding
906 B and the Vue binding 646 B, both against a shared contract suite. `@wizzard-packages/validate`
covers five Standard Schema libraries in 317 B. What is missing is not engine work — it is a
reason for anyone to look.

Four roadmap phases remain and the order they are built in matters more than their contents.
Built in numerical order, 1.0.0 arrives as one more correct wizard library in a registry that
already has a dozen, and nothing about the architecture is visible from the outside.

A second problem is not engineering at all: the `NPM_TOKEN` repository secret expired, every
Canary run fails with `E404` on every publishable package, and the last successful publish was
2026-01-20. Nothing reaches npm until the owner rotates it, which means any plan whose first
externally visible artefact is an npm release is blocked before it starts.

## What Makes This Cool

A flow is JSON. That is the one architectural decision v1 is built on, and it has a consequence
nobody in this niche has taken advantage of: **the transition graph is a pure function of the
flow definition, and the state is serializable by invariant.**

`FlowDefinition` keys steps by id, holds the linear `order`, and puts every transition in
`on.next` as a `Target` carrying its own `when` expression, with `on.back`, `guards.enter/exit`
and nested `GroupStep.flow` alongside. Turning that into `{nodes, edges}` is a traversal, not a
subsystem. Time travel is an array of snapshots plus one `setState`, because storing derived
values is forbidden and every commit is atomic.

State-machine libraries pay for their visualizers. XState's runtime state holds actor
references, so its inspector has to reconstruct meaning from a live actor tree, and Stately's
free visualizer at `stately.ai/viz` is deprecated — the good editor now sits behind Stately
Studio, a paid product. Meanwhile no stepper or wizard library ships a graph view at all:
`react-step-wizard` (~32K weekly), `react-stepzilla` (~6K), `react-multistep`, VeeValidate and
FormKit have none between them. The niche is fragmented and has no incumbent feature to fight.

So the showcase is a free, embedded, JSON-native flow graph with replay of real serialized
state. It is not catching up to a competitor's feature. It is a category feature arriving in a
category that does not have one, and it costs a traversal because the architecture already paid
for it.

The demo has to lead with **replay of real serialized state**, not with the drawing. A drawn
graph invites "XState does that too". Scrubbing a recorded run backwards through a flow that
came from a JSON file does not.

## Constraints

- No runtime dependencies in core; the graph must not add any to it.
- The main `core/v1` entry stays under the 3.9 kB gzip limit in `.size-limit.js`. Nothing in
  this work belongs in it — the inspector is development-time code and lives behind its own
  entry, the way `validate-flow` already does. (Group traversal is _planned_ to work the same
  way but does not exist yet: `navigate.ts` handles the linear pass only, and `GroupStep` is
  currently types plus the `group()` builder in `define.ts`.)
- `packages/ui` already exists and already deploys to GitHub Pages via
  `.github/workflows/deploy-docs-ui.yml`. `.github/workflows/deploy-demo.yml` documents a known
  collision: both target the `github-pages` environment and only one workflow can own the Pages
  site. Any new page must extend `packages/ui` rather than add a third deploy target.
- `NPM_TOKEN` is dead and only the repository owner can rotate it. No plan may depend on
  publishing before that happens.
- The four 0.x packages (`middleware`, `persistence`, `adapter-zod`, `adapter-yup`) and the
  ESLint legacy quarantine are still in the tree and still cost lint time and review attention.

## Premises

1. **The `compat` package and the migration guide are cut.** Downloads for the window
   2026-07-31 to 2026-08-29, from `api.npmjs.org/downloads/point/last-month/@wizzard-packages/*`:
   52 on `core`, 50 on `react`, 12 on `vue`. That is mirror and scanner traffic, not users. There is
   nobody to protect, and the roadmap currently spends a whole package, `compileLegacyConfig`,
   and a written guide protecting them.
2. **The 0.x packages are deleted, not carefully deprecated.** Same argument. Deleting them
   also collapses the ESLint legacy quarantine block (`eslint.config.js`) and 4 of the 12
   entries in `.size-limit.js`.
3. **The 1.0.0 showcase is devtools — graph and time travel — not a full plugin set.** Plugins
   are written on demand; the graph is written once and sells the architecture.
4. **Rotating `NPM_TOKEN` is the first step, not the last.** It gates every release, it is not
   an engineering task, and it can be done in parallel with all of the work below.
5. **Two engineering tasks block trust in 1.0.0, not five.** `wizzard-13` (type the store
   against a flow — `go()` still takes any string, `get()` returns `unknown`) and `wizzard-14`
   (`"use client"` is stripped by esbuild, so a server component importing a hook fails at
   runtime with a confusing message). `wizzard-12` (group and repeat traversal) and
   `wizzard-10` (Vue demo pages) do not.

## Approaches Considered

### Approach A: Showcase first

Rotate the token, build devtools v1 (graph and time travel), tag 1.0.0-rc. Store typing and the
RSC fixture slip to 1.0.1.

- Effort: M. Risk: Med. Completeness 6/10.
- For: shortest path to a screenshot; the graph is a pure function of an existing type.
- Against: ships with `go()` untyped and `"use client"` broken, which is two bug reports in the
  first week, filed by exactly the people the showcase attracted.

### Approach B: Trust first

`wizzard-13` and `wizzard-14`, then delete the four 0.x packages and their quarantine, then
devtools, then the documentation site, then 1.0.0.

- Effort: L. Risk: Low. Completeness 10/10.
- For: by the time anyone looks, everything is honest; lowest risk of an embarrassing launch.
- Against: a month of work with no external signal. If the graph turns out not to land, that is
  discovered at the end.

### Approach C: Flow Inspector as the site — **chosen**

A route in the existing `packages/ui` site first: paste a flow as JSON, see the graph, scrub a
recorded run forwards and backwards. The same renderer is then embedded in the devtools panel.

- Effort: M. Risk: Med. Completeness 8/10.
- For: collapses three roadmap items — devtools, documentation site, demo — into one artefact;
  ships through the Pages deploy that already exists, so the dead npm token stops blocking the
  showcase; the renderer is
  framework-agnostic by construction because its first consumer was not a React panel.
- Against: the embedded devtools panel and store typing move to the second step; a page without
  the library installed is an architecture demo, not yet a developer tool.

## Recommended Approach

**C.** The deciding argument is the blocked token. Every path whose first visible artefact is an
npm release cannot produce anything until a secret is rotated by hand, and that rotation has no
date on it. A page served from `packages/ui` does not know the token is dead.

That argument is narrower than it first looks, and the document should say so: `packages/ui`
already deploys to Pages, so _documentation_ was never blocked by the token. What C actually
buys is that the **showcase** — the thing that makes 1.0.0 worth looking at — stops depending on
a published package. The inspector is a route inside the existing site, not a new deploy target,
precisely because this repository has already hit the `github-pages` environment collision once.

The second argument is that C is the only option where one artefact discharges three roadmap
obligations. `validateFlow` already exists behind its own entry precisely for the case of a flow
arriving from outside, which is exactly what a paste box is — the validation path for untrusted
input is already written and tested.

The order within C is deliberate: build the graph renderer against `FlowDefinition` alone, with
no store and no framework, so that the devtools panel, the documentation site and the demo are
three consumers of one function rather than three implementations of one idea.

## Open Questions

- Which layout algorithm for the graph? A flow is a DAG with back edges, so a layered
  (Sugiyama-style) layout is the honest default, but hand-rolling one is real work and pulling
  in a layout library contradicts the no-dependency posture of the repository. The library would
  live only in the site bundle, never in a published package — that is probably acceptable, but
  it is a decision, not a given.
- Does the inspector page need to _run_ a flow, or only replay a recorded one? Running requires
  a resolver registry for `$ref` predicates, validators and loaders, which a pasted JSON file
  does not carry. Replay of a recorded session sidesteps this entirely and is the stronger demo.
- Where does the recording come from for the demo? Either a checked-in fixture, or a small
  "record" hook in the devtools that emits a shareable session file.
- Does `wizzard-12` (group and repeat traversal) need to land before the graph, given that
  `GroupStep` nodes are part of `FlowDefinition` and the renderer will have to draw them either
  way? Drawing a group node is not the same as traversing one, so probably not — but the
  renderer must not silently omit them.

## Success Criteria

- A public URL where pasting a `FlowDefinition` renders its graph, with conditional edges
  labelled by their `when` expression and group steps drawn as nested nodes.
- A recorded run replays step by step, forwards and backwards, with the current node highlighted
  and the corresponding serialized state visible at each point.
- The page loads a non-trivial example by default, with no paste required, so the first ten
  seconds need no reading.
- Nothing added to the `core/v1` entry: it still measures under 3.9 kB gzip.
- The graph builder is a pure function of `FlowDefinition` with its own test file, covering at
  minimum: linear order, a conditional `on.next` array, `on.back: 'auto'`, `END`, and a nested
  group.

## Distribution Plan

- The inspector ships as a route inside `packages/ui`, deployed by the existing
  `.github/workflows/deploy-docs-ui.yml` on merge to `main`. No new workflow and no second
  `github-pages` environment owner — that collision is already documented in `deploy-demo.yml`
  and must not be reproduced. No npm involvement, so it is unaffected by the expired token.
- The embedded devtools package publishes to npm as `@wizzard-packages/devtools` once
  `NPM_TOKEN` is rotated, alongside the 1.0.0 release of the other packages.
- Token rotation itself is a manual step for the repository owner: issue a granular automation
  token with publish rights on the `@wizzard-packages` scope, replace the `NPM_TOKEN` secret in
  the `wizzard-packages` environment, and re-run Canary to confirm before trusting a release.
  CI passing is not evidence that publishing works, because CI never publishes.

## Next Steps

1. Rotate `NPM_TOKEN` and re-run Canary until it is green. Owner-only, unblocks everything else,
   and runs in parallel with the rest of this list.
2. Write the graph builder: `FlowDefinition -> {nodes, edges}`, pure, no framework, no layout,
   its own entry, its own test file. **Structure only** — node positions are a separate concern
   that stays in the site, so a layout library never enters a published package. Group nodes and
   steps whose own `when` is false are drawn, not traversed; `deferred` steps draw as stubs.
3. Write the recorded-session fixture by hand and check it in. A record hook in devtools is a
   later convenience, not a prerequisite for the demo.
4. Build the inspector as a route in `packages/ui`: default example, paste box guarded by
   `validateFlow`, replay scrubber over the checked-in session. No URL state encoding in the
   first version — sharing is the page URL plus a checked-in example, not an encoded flow.
5. `wizzard-13` — thread the generics from `defineFlow` through `createWizard` so `go()` takes a
   step id and `get()` returns typed data, gated by a type-performance test on a forty-step
   fixture.
6. `wizzard-14` — make `"use client"` survive the build and prove it with a Next.js App Router
   fixture that imports a binding from a server component.
7. Delete `middleware`, `persistence`, `adapter-zod`, `adapter-yup`, their `.size-limit.js`
   entries and the ESLint legacy quarantine block. Close the `compat` and migration-guide items
   in the roadmap with the download numbers as the reason.
8. Embed the graph renderer in `@wizzard-packages/devtools`, replacing the 416-line 0.x
   `WizardDevTools.tsx`.
9. Tag 1.0.0 and move the packages to the `latest` dist-tag.

## Reviewer Concerns

An independent review of this document (scored 4/10 on its first pass) raised the following.
The factual errors it found are corrected above; these remain open.

- **The `wizzard-N` task ids are not discoverable from the repository.** They live in the
  `.beads` tracker, not in `tasks/`, and `tasks/session-state.md` uses a different, older id
  scheme (`wizzard-stepper-react-NNN`). Anyone implementing from this document cannot look them
  up. Either surface the tracker in `docs/DEV_WORKFLOW.md` or inline each task's acceptance
  criteria here.
- **The six plugin entries in the `ROADMAP.md` package table are left in limbo.** Premise 3 says
  plugins are written on demand, but the table still fully specifies `/persist`, `/analytics`,
  `/logger`, `/autosave`, `/url-sync` and `/http-flow` at 0.8 kB per entry. Say explicitly
  whether they are deferred past 1.0.0 or discarded, otherwise someone will build the table.
- **No `.size-limit.js` entry is proposed for the graph builder or for `devtools`.** Every other
  v1 artefact is ratcheted. These should be too, before the first line is written.
- **Layout for the embedded devtools panel is unbudgeted.** Step 2 keeps layout out of the
  published package, which is right, but step 8 embeds the renderer in `@wizzard-packages/devtools`
  without saying where that panel's node positions come from. Either the panel carries a minimal
  hand-rolled layout, or it accepts positions from its host. Decide before step 8.
