<!-- /autoplan restore point: ~/.gstack/projects/ZizzX-wizzard-packages/ZizzX-main-autoplan-restore-20260903-205503.md -->

# Design: Flow Inspector — the 1.0.0 showcase

Date: 2026-09-03
Branch: ZizzX/main
Repo: ZizzX/wizzard-packages
Status: APPROVED (/autoplan, 2026-09-03)
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

---

# GSTACK REVIEW — Phase 1: CEO (strategy & scope)

Mode: SELECTIVE EXPANSION. Run via `/autoplan`, 2026-09-03. Base branch `main`.

## Step 0A. Premise Challenge

The document states five premises. It rests on a sixth it never states, and that
one is load-bearing.

**Premise 0 (unstated): "Nobody uses this because there is nothing impressive to
look at."** This is the assumption the whole plan is built on, and the evidence in
the document contradicts it. 52 / 50 / 12 monthly downloads described as "mirror and
scanner traffic" is a _discovery_ number, not a _conversion_ number. You cannot fail
to convert traffic you never received. A showcase raises conversion. Nothing in the
plan raises discovery. Both outside voices reached this independently and it is the
single highest-severity finding in this review.

This is queued as a **User Challenge** for the Final Gate rather than auto-decided,
because it argues against the user's stated direction and the user holds context the
models do not: the prior session explicitly settled that this is an **open-source
library, not a startup**, and ran the conversation on architecture and DX rather than
demand. A distribution critique aimed at an OSS side project partly re-litigates that
settled call. The sequencing defect below does not depend on that framing and stands
either way.

| #   | Premise                                    | Verdict                      | Evidence                                                                                                          |
| --- | ------------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 0   | Nothing to look at is the bottleneck       | **CHALLENGED**               | Downloads measure discovery, not conversion. Queued to gate.                                                      |
| 1   | `compat` + migration guide are cut         | **VALID**                    | 52/50/12 downloads. Nobody to protect. Accept.                                                                    |
| 2   | The four 0.x packages are deleted          | **VALID**                    | Same evidence. Collapses the ESLint quarantine (`eslint.config.js:162-199`) and 4 of 12 `.size-limit.js` entries. |
| 3   | Showcase is devtools, not a plugin set     | **CHALLENGED — new finding** | See "the persistence hole" below.                                                                                 |
| 4   | Rotate `NPM_TOKEN` first                   | **VALID, and now stale**     | See "token status" below.                                                                                         |
| 5   | Only `wizzard-13`/`wizzard-14` block trust | **CHALLENGED**               | `wizzard-11` is a direct dependency of this plan. See below.                                                      |

### The persistence hole (new — neither outside voice framed this precisely)

Premise 2 deletes `packages/persistence`. Premise 3 defers the `/persist` plugin
(`ROADMAP.md:48`) past 1.0.0. Together they mean **1.0.0 ships with no persistence
story at all**: refresh the page mid-wizard and the run is gone. For a multi-step
form library that is not a missing nicety, it is a missing requirement — it is the
first thing a real integrator hits on day one. The document never names this, because
each premise is defended alone and their intersection is never checked.

Codex reached an adjacent version of this ("declaring plugins unnecessary without
determining whether persistence, URL synchronization or analytics are the actual
adoption wedges") without connecting it to the deletion in Premise 2.

### `wizzard-11` is a dependency this plan does not cite

`.beads/issues.jsonl` carries `wizzard-11` — "Decide the core size budget before group
traversal lands." Reviewer Concern #3 in this document asks for exactly that budget,
for the graph builder and devtools. They are the same question, filed twice, and the
plan cites neither. Premise 5's claim that only 13 and 14 matter is wrong on this one
count: `wizzard-11` gates step 2.

### Where Codex is wrong

Codex claims the plan is "deleting all legacy conversion capability just before
launching a paste-based importer." This conflates two unrelated things. The `compat`
layer converts _0.x configs_ to v1 flows. `adapter-zod`/`adapter-yup` are _schema_
adapters, already superseded by `@wizzard-packages/validate` (317 B, five Standard
Schema libraries). The paste box consumes a v1 `FlowDefinition` and validates it with
`validateFlow`. Nothing the importer needs is being deleted. **Rejected.**

### Token status — the plan's description is now out of date

The document says Canary fails with `E404`. The last real run (`33275701272`,
2026-09-01) fails with `EOTP — This operation requires a one-time password from your
authenticator` on all eight packages. That is a different diagnosis with a different
fix: the token authenticates but is a classic _Publish_ token on a 2FA account. CI
needs a classic _Automation_ token or a granular access token. Update the Constraints
and Distribution Plan sections; a second rotation to the same token type will fail the
same way.

`canary.yml` has no `workflow_dispatch` and is path-filtered to `packages/**` and
`.changeset/**`, so a docs-only merge will not retest it. Re-run the failed run.

## Step 0B. Existing Code Leverage

| Sub-problem                                             | Existing code                                                                                                              | Verdict                                                                        |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Parse/trust a pasted flow                               | `validateFlow`, `packages/core/src/v1/validate-flow.ts:22`, own subpath export                                             | **Reuse.** Already the untrusted-input path.                                   |
| New optional entry that stays out of the runtime bundle | `./validate-flow` export pattern, `package.json:47-56` + `tsup.config.ts:7`                                                | **Copy the pattern exactly.** Established convention.                          |
| Render `when` on an edge                                | `Expr` is a closed JSON tagged union, `expr.ts:16-34`; functions are rejected by `validate-flow.ts:48-52`                  | **Free.** Edge labels stringify directly. The plan's central bet is confirmed. |
| Time travel                                             | `WizardState` is JSON-primitive by invariant, `state.ts:20-37`; derived values are selectors memoized on `rev`, not stored | **Free.** Snapshots + `setState`. Confirmed.                                   |
| A site to host it                                       | `packages/ui`, Vite + React Router v6, 4 routes in `src/App.tsx:8-19`, already on Pages                                    | **Reuse.** A 5th route, no new deploy target.                                  |
| Graph traversal                                         | `resolve.ts` walks `flow.order` / `on.next` / `on.back` for a single flow                                                  | **Partial.** Single-level only; see the `GroupStep` gap below.                 |
| Layout                                                  | Nothing. No graph library anywhere in the workspace.                                                                       | **Build or add a dep.** The one genuinely unscoped piece.                      |

**Rebuilding check:** the plan rebuilds nothing. `WizardDevTools.tsx` (416 lines) is
replaced, and that replacement is justified — it is quarantined legacy
(`eslint.config.js:162-199`).

## Step 0C. Dream State

```
  CURRENT STATE                    THIS PLAN                      12-MONTH IDEAL
  ─────────────                    ─────────                      ──────────────
  v1 engine complete,      --->    + graph builder (pure fn) --->  flows authored, run,
  3.88/0.9/0.65/0.32 kB            + inspector route in ui         inspected and replayed
  0 real users                     + typed store (13)              as data, across React
  8 packages, 4 dead               + RSC fixture (14)              and Vue, with a
  nothing published since          - 4 dead packages               persistence story and
  2026-01-20                       = 1.0.0 tagged                  a reason people arrive
```

**Delta:** the plan moves the architecture decisively toward the ideal and moves
adoption not at all. It closes the "is it honest" gap (13, 14, deletions) and the "is
it visible once you arrive" gap (inspector). It leaves the "does anyone arrive" gap
and the persistence gap wide open. Both are named in Deferred / NOT in scope below.

## Step 0C-bis. Implementation Alternatives

The document scores three. All three are orderings of the same build-more-devtools
work. Both outside voices independently flagged that a fourth was never scored, so it
is added here.

```
APPROACH A: Showcase first            (in doc)
  Effort M / Risk Med / Completeness 6/10
  Rejected by the doc: ships with go() untyped and "use client" broken.

APPROACH B: Trust first               (in doc)
  Effort L / Risk Low / Completeness 10/10
  Rejected by the doc: a month with no external signal.

APPROACH C: Flow Inspector as the site   (in doc, chosen)
  Effort M / Risk Med / Completeness 8/10
  Collapses devtools + docs site + demo into one artefact, ships via existing Pages.

APPROACH D: Trust + one signal, then decide   (NOT in doc — added by this review)
  Summary: rotate the token, land wizzard-13 and wizzard-14, delete the four 0.x
           packages, tag 1.0.0, publish one honest "a flow is data" writeup with a
           30-line code sample. Then decide whether the inspector is worth M effort
           based on what that produces.
  Effort:  S-M   (human: ~4 days / CC: ~2-3 hours)
  Risk:    Low
  Pros:    - Ships a correct, publishable 1.0.0 in a fraction of the time.
           - Buys the one thing no approach here buys: a real signal.
           - The graph builder stays available and cheaper later, not foreclosed.
  Cons:    - 1.0.0 ships with nothing visually distinctive; the category gap the
             document correctly identified stays unclaimed for another cycle.
           - "Write a post" is not an engineering task and may simply not happen.
  Reuses:  everything C reuses, minus the renderer.
```

**Recommendation: C, amended** — auto-decided under P1 (completeness) and P6 (bias to
action). C is the only option where one artefact discharges three roadmap
obligations, and the architectural claim underneath it is now _verified_ rather than
asserted: `Expr` is serializable, state is snapshot-clean, and the graph really is a
traversal. D's advantage is a signal, and D's cost is that the distinctive thing never
gets built. The amendment is to take D's cheap half — the ordering fix in Section 1
below puts trust work before the page goes public, which is most of what D buys.

**TASTE DECISION** — C vs D is genuinely close, and D is what both outside voices
would pick. Surfaced at the gate.

## Step 0D. SELECTIVE EXPANSION analysis

**Complexity check.** The plan touches `packages/core` (new entry), `packages/ui` (new
route), `packages/devtools` (rewrite), plus deletions across four packages,
`.size-limit.js` and `eslint.config.js`. That is above the 8-file smell threshold, but
the deletions are mechanical and the three build items are independent. Not a smell;
it is one plan doing three separable things. No challenge raised.

**Minimum set that achieves the goal:** steps 2, 3, 4 (graph builder, fixture,
inspector route). Steps 5-6 are correctness work the showcase makes urgent rather
than work the showcase needs. Step 7 (deletions) and step 8 (devtools embed) are
independent of the showcase entirely and could ship on any schedule.

**Expansion scan — candidates, not scope.** Auto-decided per P2 (blast radius,
< 1 day CC) and P3 (defer the rest):

| #   | Opportunity                                                         | Effort         | Decision                   | Principle                                                           |
| --- | ------------------------------------------------------------------- | -------------- | -------------------------- | ------------------------------------------------------------------- |
| E1  | Size-limit entries for the graph builder + devtools before line one | S (CC ~10 min) | **ACCEPT into scope**      | P2 — in blast radius, resolves Reviewer Concern #3 and `wizzard-11` |
| E2  | Name the `GroupStep.flow: string` resolution gap and decide it      | S (CC ~15 min) | **ACCEPT into scope**      | P1 — a correctness hole in step 2, not an extra                     |
| E3  | Gate the public link on `wizzard-13`/`wizzard-14`                   | S (CC ~5 min)  | **ACCEPT into scope**      | P1 — fixes the plan's own internal contradiction                    |
| E4  | Decide the persistence story for 1.0.0                              | M              | **DEFER to `.beads`**      | P3 — real, but outside this plan's radius                           |
| E5  | One distribution artefact (writeup + sample)                        | S-M            | **DEFER, surface at gate** | Not an engineering task; user's call                                |
| E6  | "Record session" hook in devtools                                   | M              | **DEFER**                  | The doc already defers it correctly                                 |
| E7  | URL-encoded flow sharing on the inspector route                     | M              | **DEFER**                  | The doc already defers it correctly                                 |

## Step 0E. Temporal Interrogation

- **Hour 1:** graph builder against `FlowDefinition`. Types are already exact, so this
  is typing out a traversal. Highest-confidence hour in the plan.
- **Hour 2-3:** the fixture, by hand. Boring, and the doc is right that it beats
  building a record hook first.
- **Hour 4-6:** the inspector route. Layout is where this stops being predictable —
  it is the only piece with no existing type to lean on.
- **Hour 6+:** the failure mode is layout polish eating the week while `wizzard-13`
  and `wizzard-14` sit unstarted, and the page going public in that state. That is
  exactly the scenario the document rejected Approach A for. Section 1 below fixes it.

## Step 0F. Mode Confirmation

**SELECTIVE EXPANSION**, per `/autoplan` override. Baseline scope held and hardened;
E1-E3 accepted into scope as in-radius corrections; E4-E7 deferred with reasons.

## Step 0.5. Dual Voices

Both voices ran. Codex CLI 0.153.0 (`gpt-5.6-sol`) needed the plan piped over stdin —
its Windows sandbox rejects shell file reads, so the first invocation returned nothing
usable. Claude subagent ran independently with no sight of the Codex output.

### CODEX SAYS (CEO — strategy challenge)

Note: the first third of the Codex response was lost to output truncation on capture;
items 15-18 and its conclusions are recorded verbatim in substance below.

- **No target user is named.** Feature priority is being driven by what the
  architecture makes elegant rather than what an adopter needs.
- **There is no distribution plan, only a deployment plan.** A public URL is not
  distribution. Missing: audience, channels, message, outreach, conversion events,
  feedback cadence.
- **The success criteria measure construction, not success.** Every criterion in the
  document passes with zero visitors and zero installs.
- **The highest-leverage alternative was never considered:** validate positioning
  before building the inspector.
- **Possible reframing: "portable workflow runtime", not "better wizard library."**
  "Wizard" anchors expectations at simple UI steppers, where graph inspection reads as
  excessive.
- **Will look foolish in six months:** building nested graph visualization before
  nested execution works; calling hand-authored snapshots "real replay"; building
  bespoke layout before proving anyone values the inspector; shipping a showcase
  before fixing known type and packaging failures; measuring launch readiness entirely
  through bundle size and test coverage.
- Its closing line: "the plan assumes the architecture's most visually impressive
  consequence is also the market's most valuable problem. No evidence presented
  supports that assumption."

### CLAUDE SUBAGENT (CEO — strategic independence)

1. **CRITICAL — no stated objective function.** The document never says what 1.0.0 is
   _for_. Every prioritization call is downstream of that unstated goal.
2. **CRITICAL — the showcase does not fix the actual bottleneck.** 52/50/12 is a
   "nobody found this" problem, not a "what they found underwhelmed them" problem.
   A feature gap is not evidence of demand.
3. **CRITICAL — internal contradiction: the plan reproduces the exact sequencing flaw
   it uses to reject Approach A.** The page goes live at step 4; `wizzard-13` and
   `wizzard-14` land at steps 5-6. If the showcase works, installers hit the same two
   bugs the document worried about for Approach A. The label changed, the risk did not.
4. **HIGH — the competitive thesis is asserted, not validated.** "No incumbent has
   this feature" carries the whole document and has no evidence behind it.
5. **HIGH — the cheaper alternative was never scored** (Approach D above).
6. **MEDIUM — layout is the highest-risk, least-scoped part of an "M" estimate.**
7. **MEDIUM — the download number justifies two non-equivalent conclusions.** It is
   read as "nobody to protect" for the deletions but not as "nobody is coming to see
   the coming attraction" for the showcase.

Its competitive-risk call: **low**, and it says the plan is right not to overclaim
urgency there — nobody is watching this repo closely enough to race a copy.

### CEO DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════
  Dimension                            Claude   Codex   Consensus
  ──────────────────────────────────── ──────── ─────── ─────────
  1. Premises valid?                   NO       NO      CONFIRMED
  2. Right problem to solve?           NO       NO      CONFIRMED
  3. Scope calibration correct?        NO       NO      CONFIRMED
  4. Alternatives sufficiently explored? NO     NO      CONFIRMED
  5. Competitive/market risks covered? PARTIAL  NO      CONFIRMED
  6. 6-month trajectory sound?         NO       NO      CONFIRMED
═══════════════════════════════════════════════════════════════
6/6 confirmed. 0 disagreements.
```

Dimension 5 is recorded CONFIRMED on the substance rather than the label: Claude rates
_competitive_ risk low and correctly so, while both voices rate _market/distribution_
risk unaddressed. They agree on the gap and differ only on which word covers it.

A 6/6 confirmation with zero disagreement is unusual and is itself the signal. Both
models, with no sight of each other, concluded the plan builds the right artefact in
the wrong order for the wrong bottleneck. That is queued as the Final Gate's User
Challenge. Their shared blind spot: neither was told this is an OSS library rather
than a venture, so both applied market discipline the user already, deliberately,
declined.

## Review Sections 1-10

### Section 1: Architecture Review

**Finding 1.1 — CRITICAL — the ordering contradicts the document's own rejection of
Approach A.** Steps 4, 5, 6 put the public inspector before the typed store and the
RSC fix. The document rejects Approach A on precisely this ground. Both voices caught
it independently.
**Auto-decided (P1 completeness):** reorder to 5, 6, then 4 — or, if the page is wanted
early as a working surface, keep the order and gate _promotion_ of the URL on 13 and 14
landing. Recommend the reorder; it costs nothing and removes the contradiction.

**Finding 1.2 — HIGH — `GroupStep.flow` can be a `string` and the graph builder cannot
resolve it.** `flow.ts:55-60` types it `flow: string | FlowDefinition`. The string case
is a reference by flow id. A pure `FlowDefinition -> {nodes, edges}` function has no
registry to resolve that against, so a group whose sub-flow is a ref can only be drawn
as an opaque box. The plan says group nodes are "drawn, not traversed" without noticing
that half of them cannot even be described.
**Auto-decided (P5 explicit over clever):** the builder takes an optional second
argument, a `Record<string, FlowDefinition>` registry, mirroring `validateFlow(flow,
registry?)` which already has exactly this shape (`validate-flow.ts:22`). Unresolved
refs render as an explicit "unresolved sub-flow" node, never silently omitted.

**Finding 1.3 — MEDIUM — `repeat` has no representation in a static graph.**
`GroupStep.repeat.over` is an `Expr` and iteration state lives in the runtime frame
stack (`state.ts:15`), not the definition. So a repeat group is one node structurally
but N visits in a replay. The plan's replay scrubber will walk a recorded session
whose stack has frames the static graph has no nodes for.
**Auto-decided (P5):** the fixture must contain a repeat, and the node carries an
iteration badge driven by the frame stack. Cheaper to decide now than to discover
while wiring the scrubber.

**Finding 1.4 — architecture that is sound.** The core claim survives scrutiny.
`Expr` is a closed JSON union with no function member, and `validateFlow` actively
rejects functions, so edge labels are serializable by construction. `WizardState` is
JSON-primitive with derived values held as selectors memoized on `rev`, so time travel
really is snapshots plus `setState`. Examined `flow.ts`, `expr.ts`, `state.ts`,
`navigate.ts`, `resolve.ts` and `validate-flow.ts`; nothing else flagged.

**Dependency graph:**

```
  packages/core/src/v1/flow.ts  (FlowDefinition, Expr, GroupStep)
        |
        |  pure, no runtime dep
        v
  core/src/v1/graph.ts  ---- new ---- exported as @wizzard-packages/core/graph
        |   FlowDefinition (+ registry?) -> {nodes, edges}
        |   structure only, NO positions
        |
        +------------------------------+
        |                              |
        v                              v
  packages/ui  (new /inspector route)  packages/devtools (2.0.0)
    - owns layout                        - owns layout OR takes positions
    - owns SVG rendering                 - embeds the same renderer
    - replay scrubber over fixture       - step 8
        |
        v
  deploy-docs-ui.yml -> github-pages   (existing; do NOT add a 3rd owner)
```

### Section 2: Error & Rescue Map

The inspector accepts pasted, untrusted JSON. Every path below is user-visible.

| #   | Error                           | Trigger                                                 | Caught by                              | User sees                                        | Tested?                    |
| --- | ------------------------------- | ------------------------------------------------------- | -------------------------------------- | ------------------------------------------------ | -------------------------- |
| E1  | Malformed JSON                  | Paste box, bad syntax                                   | `JSON.parse` try/catch at the boundary | Line/column of the syntax error                  | **Must add**               |
| E2  | Valid JSON, invalid flow        | Missing `steps`, bad `order`                            | `validateFlow` -> `FlowProblem[]`      | The problem list, not a stack trace              | **Must add**               |
| E3  | Unresolved `GroupStep.flow` ref | Sub-flow by id, no registry                             | Graph builder                          | Explicit "unresolved sub-flow" node              | **Must add** (Finding 1.2) |
| E4  | Unresolved `$ref` in a `when`   | Predicate names a resolver the page has no registry for | Edge labeller                          | Edge labelled with the ref key, not blank        | **Must add**               |
| E5  | Cyclic flow                     | `on.next` loops back                                    | Layout cycle-breaking                  | Back edge drawn distinctly, no hang              | **Must add**               |
| E6  | Fixture/graph drift             | Session recorded against an older flow                  | Replay loader                          | "This recording does not match this flow", named | **Must add**               |
| E7  | Huge flow                       | 500+ steps pasted                                       | Render budget                          | Degrades or warns; does not freeze the tab       | Nice to have               |

**Prime Directive 1 check:** E3, E4 and E6 are the silent-failure candidates. A group
drawn as a plain box, an edge with a blank label, and a replay that quietly desyncs all
look like working software. Each must name itself on screen. E6 is the nastiest: a
scrubber stepping through a stale recording renders a plausible lie.

### Section 3: Security & Threat Model

The inspector executes nothing. `Expr` is data, `validateFlow` rejects functions, and
replay is `setState` over recorded snapshots — there is no `eval`, no dynamic import,
no resolver invocation on the page. The realistic threats are XSS through rendered
content and DoS through pathological input.

| Threat                              | Vector                                   | Mitigation                                                                                                                                                                                  |
| ----------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XSS via step labels/titles          | Pasted flow contains markup in a `title` | React escapes text nodes by default. **Never** `dangerouslySetInnerHTML` on flow-derived strings. `packages/ui` already depends on `react-markdown` — do not route flow content through it. |
| XSS via `$ref` key in an edge label | Same, through the label path             | Same rule; labels are text.                                                                                                                                                                 |
| DoS via deep nesting                | Nested `GroupStep` chain                 | Depth cap in the builder, explicit error past it.                                                                                                                                           |
| DoS via huge flow                   | 10k steps                                | Node-count cap with a named message (E7).                                                                                                                                                   |
| Exfiltration                        | None                                     | Page is static, no network calls, no storage of pasted content. Keep it that way — do not add an upload or share-by-POST feature without revisiting this.                                   |

Nothing here is high severity. It is a static page with no secrets and no backend. The
one rule that matters is the `react-markdown` one: the dependency is already present in
`packages/ui/package.json`, which makes the mistake easy to make.

### Section 4: Data Flow & Interaction Edge Cases

```
  paste / default example
        |
        v
  JSON.parse ------ fail --> E1 syntax error, position shown
        |
        v
  validateFlow ---- problems --> E2 problem list, graph not drawn
        |
        v
  buildGraph(flow, registry?) --- unresolved ref --> E3 explicit node
        |
        v
  layout(nodes, edges)  [site-owned, not in the published package]
        |
        v
  <svg> render  <--- replay scrubber <--- recorded session fixture
                          |
                          +-- mismatch --> E6 named, scrubber disabled
```

Shadow paths for the main flow: **nil** — no flow pasted yet, so the page must show
the default example, never an empty canvas. **Empty** — a flow with `steps: {}` is
valid JSON and passes some checks; it must render "this flow has no steps", not a blank
box. **Upstream error** — the fixture fails to load; the graph still renders and only
the scrubber disables.

Interaction edge cases: scrubbing to an index past the recording's end (clamp);
pasting a new flow mid-replay (reset the scrubber, do not leave it pointing at a dead
index); browser back after paste (nothing is in the URL by design, so back leaves the
page — acceptable and worth a note); double-click on the paste button (idempotent,
parse is pure).

### Section 5: Code Quality Review

DRY holds: the graph builder has exactly one implementation with three consumers, which
is the plan's stated reason for building it framework-free first. That is the right
call and it is already argued in the document.

The one duplication risk is layout. Step 2 keeps layout out of the package; step 8
embeds the renderer in devtools without saying where positions come from
(the plan's own Reviewer Concern #4). If unresolved, layout gets written twice — once
in `packages/ui`, once in `packages/devtools`. See Section 10.

`WizardDevTools.tsx` at 416 lines being replaced is a net quality gain: it is currently
under the ESLint legacy quarantine (`eslint.config.js:162-199`), so its replacement
moves that surface to strict rules.

### Section 6: Test Review

The document specifies the graph builder's test cases well — linear order, conditional
`on.next` array, `on.back: 'auto'`, `END`, nested group. That list is good and it is
already there. Gaps against the errors in Section 2:

| Codepath                                               | Covered by the doc? | Gap                                |
| ------------------------------------------------------ | ------------------- | ---------------------------------- |
| `buildGraph` linear / conditional / back / END / group | Yes                 | —                                  |
| Unresolved `GroupStep.flow` string ref                 | **No**              | E3                                 |
| Unresolved `$ref` in `when`                            | **No**              | E4                                 |
| Cycle / back edge in layout                            | **No**              | E5                                 |
| `repeat` group                                         | **No**              | Finding 1.3                        |
| Empty `steps: {}`                                      | **No**              | Section 4                          |
| Recording/flow mismatch                                | **No**              | E6                                 |
| Inspector route renders default example                | **No**              | E2E, `playwright.config.ts` exists |

**Auto-decided (P1):** the five unit gaps join the builder's test file — they are the
same file and the same hour. The E2E case joins the existing Playwright suite. Note
`wizzard-9` ("Replace hard waitForTimeout calls in the E2E suite") is open; do not add
new `waitForTimeout` calls to that suite.

### Section 7: Performance Review

Wizard flows are 5-40 nodes. At that size layout cost is irrelevant and any correct
algorithm is fast enough. Two real considerations:

- **Bundle**, not runtime, is the constraint that bites. `elkjs` at roughly half a
  megabyte would be absurd here; `@dagrejs/dagre` at roughly 40-50 kB is defensible in
  a site-only bundle but is 12x the entire core package, which reads badly on a page
  whose pitch is 3.88 kB. A hand-rolled layered layout is ~150-250 lines. **Recommend
  hand-rolled**, and see Section 10 for why that also settles Reviewer Concern #4.
- **Replay** is `setState` over an array. Non-issue.

Nothing added to the `core/v1` entry, so the 3.9 kB ratchet is untouched by
construction — the graph builder is its own entry.

### Section 8: Observability & Debuggability Review

This is a static page with no backend, so "observability" means: when the inspector
draws something wrong, can you tell? Two mechanisms, both cheap:

- The graph builder returns problems alongside the graph rather than throwing, the
  same shape `validateFlow` already uses (`FlowProblem[]`). Unresolved refs, capped
  depth and dropped nodes all surface as data the page can render.
- The rendered graph is inspectable as JSON on the page — a "show graph JSON" toggle
  next to the diagram. Costs nothing, and makes every bug reportable by copy-paste
  instead of screenshot.

**Auto-decided (P2):** both accepted into scope. In blast radius, minutes of work.

### Section 9: Deployment & Rollout Review

The deployment story is the plan's strongest part and it is correct as written: a route
inside `packages/ui`, shipped by `deploy-docs-ui.yml`, no second `github-pages`
environment owner. `deploy-demo.yml` documents that collision and the plan explicitly
refuses to reproduce it.

Two additions:

- **Version coherence, unflagged by the plan.** `@wizzard-packages/devtools` is
  already at **2.0.0** and published. The plan calls it "the 416-line 0.x
  `WizardDevTools.tsx`" — the line count is right, the version is not. Tagging a
  1.0.0 release across the family while devtools sits at 2.0.0 needs a stated answer:
  either devtools goes to 2.1.0 and is documented as intentionally ahead, or it is
  renumbered. Decide before step 9, not during it.
- **Rollback.** Deleting four packages (step 7) is the only irreversible act in the
  plan. Unpublishing is not available after 72 hours on npm. Deprecate first with a
  pointer, then stop maintaining; do not `npm unpublish`.

### Section 10: Long-Term Trajectory Review

**The devtools layout question (Reviewer Concern #4) resolves cleanly.** The renderer
takes positions as a prop and ships a `layout()` helper alongside it, in the same
optional entry, that either consumer may call. `packages/ui` calls it; the devtools
panel calls it too. That is one implementation, no layout in the runtime package, and
no duplication. It also removes the reason to add a layout dependency at all — an
external library cannot live in the published devtools package, so hand-rolling is the
only option that serves both consumers. **Auto-decided (P4 DRY + P5 explicit).**

**Six-month risk:** the plan leaves 1.0.0 with no persistence story (0A) and no
discovery mechanism (both voices). Neither is fatal; both are the kind of gap that gets
noticed only when someone finally does arrive. Written down here so they are not
rediscovered as surprises.

## Required Outputs

### NOT in scope

| Item                                      | Why                                                                                                        | Where it goes            |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------ |
| Distribution / writeup / outreach         | Not an engineering task; user's call and the user has already framed this as an OSS library, not a venture | Final Gate (E5)          |
| Persistence story for 1.0.0               | Real gap, outside this plan's blast radius                                                                 | `.beads`, new issue (E4) |
| "Record session" hook in devtools         | Correctly deferred by the document already                                                                 | Post-1.0.0 (E6)          |
| URL-encoded flow sharing                  | Correctly deferred by the document already                                                                 | Post-1.0.0 (E7)          |
| The six plugin entries in `ROADMAP.md:48` | Reviewer Concern #2; see Section 10                                                                        | Resolved at the gate     |
| Group/repeat _traversal_ (`wizzard-12`)   | Drawing is not traversing; the plan is right                                                               | Stays deferred           |
| Vue demo pages (`wizzard-10`)             | Does not block trust in 1.0.0; the plan is right                                                           | Stays deferred           |

### What already exists

Full map in Step 0B. Headline: `validateFlow` already is the untrusted-input path, the
`./validate-flow` subpath export already is the pattern for an optional entry, `Expr`
already is serializable so edge labels are free, `WizardState` already is snapshot-clean
so time travel is free, and `packages/ui` already is a deployed React Router site
needing only a 5th route. The only thing with no existing foundation is layout.

### Failure Modes Registry

| #   | Failure mode                                          | Severity     | Visible?                    | Mitigation                             | Status            |
| --- | ----------------------------------------------------- | ------------ | --------------------------- | -------------------------------------- | ----------------- |
| F1  | Page ships public before `wizzard-13`/`14`            | **Critical** | Yes, as bug reports         | Reorder steps, or gate promotion       | **Fix in plan**   |
| F2  | Group sub-flow ref unresolvable, drawn as a plain box | High         | **No — silent**             | Registry arg + explicit node           | **Fix in plan**   |
| F3  | Replay desyncs from a stale recording                 | High         | **No — silent**             | Fingerprint check, E6                  | **Fix in plan**   |
| F4  | Layout written twice (ui + devtools)                  | Medium       | Yes, at review time         | Shared `layout()` helper, Section 10   | **Fix in plan**   |
| F5  | Layout dependency inflates the site bundle            | Medium       | Yes, size-limit             | Hand-roll; add size-limit entries      | **Fix in plan**   |
| F6  | 1.0.0 tagged while devtools is 2.0.0                  | Medium       | Yes, at publish             | Decide numbering before step 9         | **Fix in plan**   |
| F7  | Second token rotation fails the same way              | Medium       | Yes, in CI                  | Automation/granular token, not Publish | **Fix in plan**   |
| F8  | 1.0.0 has no persistence story                        | Medium       | Only on real adoption       | Deferred, written down                 | **Deferred (E4)** |
| F9  | Nobody arrives to see any of it                       | High         | **No — looks like success** | Deferred to the gate                   | **Gate (E5)**     |

**Critical gap assessment:** F2 and F3 are the dangerous pair, because both render
plausible-looking output while being wrong. F9 is the strategic one and is the User
Challenge. F1 is the plan's own stated fear, reintroduced by its own step ordering.

### Dream state delta

See Step 0C. The plan closes the honesty gap and the visibility-once-you-arrive gap,
and closes neither the discovery gap nor the persistence gap.

## Phase 1 Completion Summary

| Item                   | Result                                                                     |
| ---------------------- | -------------------------------------------------------------------------- |
| Premises assessed      | 6 (5 stated + 1 unstated). 2 valid, 3 challenged, 1 valid-but-stale        |
| Findings               | 4 architecture, 7 error paths, 5 threat rows, 8 test gaps, 9 failure modes |
| Auto-decided           | 11 (logged in the audit trail)                                             |
| Accepted into scope    | E1, E2, E3 + Section 8 observability pair                                  |
| Deferred               | E4, E5, E6, E7                                                             |
| Taste decisions        | 1 (Approach C vs D)                                                        |
| User challenges        | 1 (Premise 0 — discovery vs conversion)                                    |
| Dual voices            | Codex + Claude subagent, both ran                                          |
| Consensus              | 6/6 confirmed, 0 disagreements                                             |
| Corrections to the doc | 3 (E404 -> EOTP, devtools is 2.0.0 not 0.x, `wizzard-11` is a dependency)  |
| Codex claims rejected  | 1 (compat/adapter conflation)                                              |

---

# GSTACK REVIEW — Phase 2: Design

UI scope detected in Phase 0 (panel x7, layout x7, route x4, component x2). Classifier:
**HYBRID** — the inspector route is App UI (data-dense, task-focused), sitting inside a
site whose job is marketing the library.

## Step 0: Design Scope Assessment

**0A. Initial design rating: 3/10.** The plan names components — "paste box", "graph",
"scrubber", "state visible", "nested nodes", "current node highlighted" — and specifies
almost no behaviour, no hierarchy, no states and no visual vocabulary. It is a feature
list, not a design.

**0B. DESIGN.md status: absent.** But `packages/ui/src/index.css` carries a real, de
facto design system the plan never references:

```
  --bg-base      --surface         --ink-strong    --accent-warm
  --bg-wash      --surface-strong  --ink-soft      --accent-warm-dark
  --line         --shadow                          --accent-cool
                                                   --accent-cool-dark
  display: 'Fraunces' (serif)      body: 'Space Grotesk'
```

Two real typefaces, a warm/cool accent pair, a soft/strong ink pair. This is not a
default stack and it is not AI slop. **Finding D5.1 (HIGH):** the plan never mentions
it, so an implementer building a graph renderer will invent a second visual language —
new greys, a new accent, probably a blue-for-nodes default. The node/edge palette must
be drawn from these tokens, and the two accents are the natural encoding for the
warm/cool distinction the graph needs anyway (taken path vs untaken branch).

**0C. Existing design leverage:** `packages/ui` has 4 routes with an established
`RootLayout`. The inspector is a 5th route inside that shell — nav, footer and type
scale come free.

**0D. Focus areas:** all 7 passes. Pass 2 (states) and Pass 6 (responsive/a11y) are
where the plan is emptiest.

## Step 0.5: Dual Voices

### CODEX SAYS (design — UX challenge)

- **There is no responsive strategy.** "A graph, JSON editor, timeline and state
  inspector cannot simply collapse into a generic vertical stack. Their relationships
  are the experience." Demands explicit desktop / tablet / mobile modes, minimum graph
  dimensions, panel priorities, overflow ownership, and a decision on whether mobile
  edits or only views. A read-only mobile showcase would be a valid choice; "pretending
  the full inspector naturally becomes responsive is not."
- **Accessibility is aspirational because no requirements exist.** The graph cannot be
  the sole representation of the flow — SVG nodes are not meaningful to keyboard or
  screen-reader users. Requires a semantic step list or transition table equivalent to
  the visual graph, defined focus order, accessible names for nodes/conditions/groups,
  replay controls as real buttons with announced state changes, no color-alone
  encoding, 44x44 touch targets, reduced-motion behaviour. Its line: **"'Current node
  highlighted' is not an accessibility requirement. It is merely a visual intention."**
- **The UI decisions are generic patterns, not a designed interaction.**
- **Use a proven layout dependency in the site and devtools package.** "The
  no-dependency rule applies to core, not every UI bundle. Hand-rolling graph layout is
  an unjustified product risk." One shared layout adapter feeds both consumers.
- **Graph semantics are incoherent as written.** The plan says steps whose `when` is
  false are drawn — "but a static `FlowDefinition` has no runtime data with which to
  evaluate that predicate."
- **Graph stability:** node positions must stay fixed while scrubbing; re-layout
  between snapshots destroys spatial memory and makes replay unusable.
- **State presentation:** full serialized JSON is poor replay UX. Default to a diff.
- **Groups:** "nested nodes" hides expanded-by-default vs collapsible vs compound-node,
  and how transitions across group boundaries route. Decide before choosing a layout
  engine.
- **Editing model:** continuous parsing of a large JSON document generates noisy errors
  while typing and causes graph churn. Submission-based validation for v1.
- **Trust sequencing:** develop the page early, do not promote it until 13 and 14 land.

### CLAUDE SUBAGENT (design — independent review)

1. **CRITICAL — conditional edge labels are specified as raw expression JSON with no
   legibility plan.** Success Criteria requires edges "labelled by their `when`
   expression", but `{"$eq":[{"$get":"data.plan"},"pro"]}` as a label is unreadable, and
   Open Questions never raises it. Fix: an infix pretty-printer (`data.plan == "pro"`)
   with the raw JSON behind a tooltip, in scope for step 2.
2. **CRITICAL — paste and replay are incompatible for every flow except the default,
   and nothing says what happens.** The scrubber replays one checked-in session tied to
   the fixture; step 4 lets the user paste an arbitrary flow. There is no recording for
   a pasted flow and the plan never states what the scrubber does then.
3. **CRITICAL — layout direction and branch-reading convention unpinned.** Top-down vs
   left-right, how back edges route so they do not cross the main flow, how sibling
   conditional branches are separated so a reader can tell "alternatives" from
   "sequence". For a DAG with back edges this is the actual UX, not an implementation
   detail.
4. **HIGH — no error/invalid-paste state.** Message placement, whether the last-good
   graph stays rendered, whether the textarea content survives.
5. **HIGH — no on-page narrative or CTA.** The pitch lives only in the internal doc.
   A showcase that never tells the visitor what they just saw, or what to do next, is a
   toy demo rather than the 1.0.0 showcase the title claims.
6. **HIGH — page-level information hierarchy never described.** The doc's own thesis
   says graph+replay is the point and paste is secondary, but nothing enforces it.
7. **MEDIUM — "serialized state visible" doesn't say what visible means.** Diff, not a
   full re-dump, especially against a forty-step fixture.
8. **MEDIUM — scrubber interaction model unspecified.** Pin prev/next + arrow keys + a
   draggable indicator; defer auto-play.
9. **MEDIUM — no visual convention for node kinds.** Step, group, deferred stub, END
   each get different prose treatment and no shape/color rule.
10. **MEDIUM — no plan for large graphs.** Pan/zoom/minimap never mentioned as in scope
    or explicitly deferred.

It also names what the plan gets right: leading with a pre-loaded default example so
paste is not the forced first action, and picking replay over run for good reasons.

### DESIGN LITMUS SCORECARD — CONSENSUS

```
═══════════════════════════════════════════════════════════════════
  Dimension                                Claude   Codex   Consensus
  ──────────────────────────────────────── ──────── ─────── ─────────
  1. Information hierarchy specified?      NO       NO      CONFIRMED
  2. Interaction states specified?         NO       NO      CONFIRMED
  3. Edge/graph semantics legible?         NO       NO      CONFIRMED
  4. Replay interaction model defined?     NO       NO      CONFIRMED
  5. Responsive strategy intentional?      N/A      NO      FLAGGED (Codex only)
  6. Accessibility specified?              N/A      NO      FLAGGED (Codex only)
  7. Specific UI vs generic patterns?      NO       NO      CONFIRMED
═══════════════════════════════════════════════════════════════════
5/7 CONFIRMED. 2 single-voice critical findings (both Codex, both flagged).
1 DISAGREE against Phase 1 — layout library. See Pass 7.
```

## Pass 1: Information Architecture — 2/10

The plan never states fold order. Its own thesis ("the demo has to lead with replay of
real serialized state, not with the drawing") implies one, and nothing in Success
Criteria enforces it. Both voices flagged this independently. **Auto-decided (P5
explicit, structural not aesthetic):**

```
  ┌──────────────────────────────────────────────────────────┐
  │  Fraunces headline: one line stating the thesis          │  <- above fold
  │  "A flow is data. Watch one replay itself."              │
  ├────────────────────────────────┬─────────────────────────┤
  │                                │  state panel            │
  │   GRAPH  (default example       │  diff-highlighted       │
  │   pre-loaded, current node      │  changed keys only      │
  │   highlighted)                  │                         │
  │                                │                         │
  ├────────────────────────────────┴─────────────────────────┤
  │  ◀ ▶  ──────●────────────  step 4 of 12                   │  <- scrubber
  ├──────────────────────────────────────────────────────────┤
  │  ▸ Paste your own flow            (collapsed drawer)      │  <- secondary
  ├──────────────────────────────────────────────────────────┤
  │  npm i @wizzard-packages/core        Read the docs →      │  <- CTA
  └──────────────────────────────────────────────────────────┘
```

Constraint worship — if only three things: **the graph, the scrubber, the state
diff.** Paste is fourth and belongs in a drawer. The CTA is the thing the plan omits
entirely and the reason the page exists.

## Pass 2: Interaction State Coverage — 1/10

The single emptiest area. The plan specifies exactly one state (default example
loaded). **Auto-decided (P1 completeness):**

| Feature     | LOADING                                       | EMPTY                                                                        | ERROR                                                                          | SUCCESS                                          | PARTIAL                                                             |
| ----------- | --------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------- |
| Graph       | Skeleton at fixed dimensions, no layout shift | `steps: {}` -> "This flow has no steps"                                      | Parse fail -> last-good graph stays, banner above                              | Nodes drawn, current node highlighted            | Unresolved sub-flow ref -> explicit dashed "unresolved" node        |
| Paste box   | n/a (local parse)                             | Placeholder shows a 6-line minimal flow, not "paste JSON here"               | Inline banner under box, input preserved and editable, error cites line/column | Drawer collapses, graph swaps                    | Valid JSON, invalid flow -> `FlowProblem[]` list, graph not swapped |
| Scrubber    | Disabled until fixture loads                  | No recording -> **disabled with "replay is available for the example flow"** | Recording/flow mismatch -> disabled, named reason                              | Position indicator moves, node highlight follows | Clamped at either end, buttons disable rather than vanish           |
| State panel | Empty frame at fixed height                   | "No state at this step"                                                      | n/a                                                                            | Diff of changed keys                             | Full snapshot behind a toggle                                       |

The scrubber's EMPTY state is Claude's critical #2 and is the one an implementer would
otherwise discover at integration time.

## Pass 3: User Journey & Emotional Arc — 3/10

| Step | User does                  | User feels                             | Plan specifies?                                               |
| ---- | -------------------------- | -------------------------------------- | ------------------------------------------------------------- |
| 1    | Lands on `/inspector`      | "What am I looking at?"                | **No** — no headline, no thesis copy                          |
| 2    | Sees a graph already drawn | "Oh, it did something without me"      | Yes — pre-loaded example is the plan's best call              |
| 3    | Reads an edge label        | _"`{"$eq":[{"$get":...` — what?"_      | **No** — raw JSON labels, Claude critical #1                  |
| 4    | Drags the scrubber         | "It's replaying. That's real state."   | Partially — the moment exists, the interaction is unspecified |
| 5    | Watches state change       | "I can see exactly what each step did" | **No** — full dump buries the delta                           |
| 6    | Wants to try their own     | "Where do I paste?"                    | Yes, but hierarchy unstated                                   |
| 7    | Pastes; scrubber dies      | **"Is it broken?"**                    | **No** — the arc's actual break point                         |
| 8    | Decides whether to install | —                                      | **No** — no CTA exists                                        |

**The arc breaks at step 7** and the plan does not know it. 5-second visceral: a graph
that drew itself. 5-minute behavioral: scrub, understand, paste. 5-year reflective:
"that library where a flow is just data." Steps 3, 5 and 7 each undercut that.

## Pass 4: AI Slop Risk — 7/10

Better than most plans, because the artefact is inherently specific — a node graph of a
real flow is not a 3-column feature grid. Against the blacklist: no purple gradients
proposed, no icon-in-circle grid, no centered-everything, the existing site already
uses two real typefaces rather than system-ui. Genuinely low risk.

Two live risks. **Slop risk 1:** the "generic hero copy" trap on the headline — "Unlock
the power of your flows" is exactly what gets written when no copy is specified. The
headline should state the mechanism, not the benefit. **Slop risk 2:** the state panel
becomes a decorative card grid of key-value tiles instead of a dense monospace diff.
The App UI rules apply here — utility language, minimal chrome, cards only when the
card is the interaction.

Hard rejection criteria: none apply. Litmus 3 ("understandable by scanning headlines
only") currently fails only because there are no headlines.

## Pass 5: Design System Alignment — 2/10

No DESIGN.md, but a real token set exists (0B) and the plan ignores it.
**Auto-decided (P4 DRY, fix is obvious):** the graph palette derives from the existing
variables rather than inventing one.

| Graph element         | Token                | Why                                                      |
| --------------------- | -------------------- | -------------------------------------------------------- |
| Node fill             | `--surface`          | Matches every other panel on the site                    |
| Node border           | `--line`             | Same 1px vocabulary                                      |
| Node label            | `--ink-strong`       | Body contrast already set                                |
| Edge, unconditional   | `--ink-soft`         | Recedes; structure not focus                             |
| Edge, conditional     | `--accent-cool`      | The warm/cool pair already exists — use cool for "maybe" |
| Current node          | `--accent-warm`      | Warm reads as "here, now" against cool branches          |
| Visited path          | `--accent-warm-dark` | Trail behind the current node                            |
| Unresolved / deferred | `--line` dashed      | Absence encoded as dash, never as color alone            |

New components entering the vocabulary: node, edge, scrubber, state-diff. Four is
reasonable for a route of this kind. **Recommend `/design-consultation` before step 4**
to write the DESIGN.md this repo is missing, since the inspector doubles the site's
component count.

## Pass 6: Responsive & Accessibility — 0/10

Neither word appears in the plan. Codex is right that this is the difference between a
screenshot and a product. **Auto-decided (P1 completeness):**

**Responsive.** Not "it stacks".

- Desktop (>=1024px): graph and state side by side, scrubber persistent below.
- Tablet (640-1023px): graph full width, state panel becomes a collapsible sheet under
  the scrubber.
- Mobile (<640px): **read-only.** Graph pans/zooms, scrubber becomes prev/next buttons
  with a "4 of 12" indicator, paste drawer hidden entirely. A read-only mobile showcase
  is a legitimate decision; a cramped JSON textarea on a phone is not.
- Minimum graph viewport: 320x240 before pan/zoom becomes mandatory.

**Accessibility.** The graph must not be the only representation.

- A `<table>` of steps and transitions, visually hidden but always in the DOM, carrying
  the same information as the graph. This is the single highest-value a11y item and it
  is nearly free, because the graph builder already produces `{nodes, edges}` — the
  table is a second render of the same data.
- Roving-tabindex keyboard navigation between nodes; visible focus ring using
  `--accent-warm`.
- Scrubber as real `<button>` elements plus a labelled `<input type="range">`; step
  changes announced via `aria-live="polite"`.
- Current/visited/conditional/deferred never encoded by color alone — pair every color
  with a shape, dash pattern or icon.
- 44x44 CSS px minimum on all scrubber controls.
- Contrast >=4.5:1 for node labels and edge labels against `--surface`.
- `prefers-reduced-motion` honored if any transition is added.

## Pass 7: Unresolved Design Decisions

| Decision needed                                | If deferred, what happens                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Edge label format                              | Implementer ships raw `{"$eq":[...]}` and the graph is unreadable                           |
| Scrubber state for a pasted flow               | It silently points at a stale recording, or throws                                          |
| Layout direction + back-edge routing           | Left-right vs top-down decided by whoever writes it first; back edges cross the main column |
| Node positions stable while scrubbing?         | Re-layout per snapshot; spatial memory destroyed; replay unusable                           |
| Group node: expanded, collapsible or compound? | Ad-hoc choice that the layout engine then cannot change cheaply                             |
| State panel: diff or full dump?                | Full dump; the delta the demo exists to show gets buried                                    |
| Parse on keystroke or on submit?               | Parse-on-keystroke; error noise and graph churn while typing                                |
| Pan/zoom in scope?                             | Absent, and the forty-step fixture overflows the viewport                                   |
| Which design tokens?                           | A second visual language inside the same site                                               |

**Auto-decided (P5 explicit over clever), all nine:** infix pretty-printer with raw
JSON on hover; scrubber disabled with a named reason on a pasted flow; **top-to-bottom**
layout with back edges as dashed curves routed outside the main column; **positions
frozen for the lifetime of a flow**, never recomputed per snapshot; groups as compound
nodes, collapsed by default, expandable; state as a diff with the full snapshot behind
a toggle; **parse on submit**, not on keystroke; pan/zoom in scope for step 4 with the
node-count ceiling stated; tokens from `index.css` per Pass 5.

**TASTE DECISION — layout library vs hand-rolled.** Codex disagrees with the Phase 1
auto-decision (#15) with a valid reason, so this is surfaced rather than settled. Phase
1 argued hand-rolled because an external library "cannot live in the published devtools
package" — on inspection that assertion was not evidenced. `@wizzard-packages/devtools`
is a development-time package; a 40-50 kB layout dependency there is far more
defensible than the same weight in `core`. Both options are live and the choice changes
who owns roughly 150-250 lines of graph math forever.

## Required Outputs

### NOT in scope (design)

| Item                          | Why                                                      |
| ----------------------------- | -------------------------------------------------------- |
| Auto-play / animated replay   | Prev/next + scrub covers the demo; motion is polish      |
| Minimap                       | Pan/zoom is enough at 5-40 nodes                         |
| Editing the flow in the graph | The inspector inspects; authoring is a different product |
| Dark mode                     | Site-wide concern, not this route's                      |
| Mobile editing                | Explicitly cut — read-only below 640px                   |

### What already exists (design)

`RootLayout` and the 4-route shell; the 12-token palette and the Fraunces/Space Grotesk
pairing in `index.css`; `react-markdown` (present, and deliberately NOT to be used on
flow-derived content per Phase 1 Section 3).

## Phase 2 Completion Summary

| Pass                        | Score | Headline                                                    |
| --------------------------- | ----- | ----------------------------------------------------------- |
| 1. Information architecture | 2/10  | No fold order; ASCII hierarchy added                        |
| 2. Interaction states       | 1/10  | 4x5 state table added; scrubber-on-pasted-flow was the hole |
| 3. User journey             | 3/10  | Arc breaks at step 7 and the plan doesn't know              |
| 4. AI slop risk             | 7/10  | Genuinely low; two named risks                              |
| 5. Design system            | 2/10  | Real tokens exist and are ignored; mapping added            |
| 6. Responsive & a11y        | 0/10  | Absent; specs added, hidden table is the key item           |
| 7. Unresolved decisions     | —     | 9 resolved, 1 surfaced as taste                             |

**Initial 3/10 -> 8/10 with the above applied.** Not 10 because responsive and a11y are
specified but unvalidated, and the layout decision is still open.

---

# GSTACK REVIEW — Phase 2.5: Developer Experience

DX scope detected in Phase 0 (package x9, entry x7, npm x6, library x6) and the product
_is_ a developer tool. Mode: DX POLISH. Persona: **a React developer with a 5-step
signup or onboarding flow, currently using react-hook-form plus hand-rolled step state,
evaluating alternatives for an afternoon.** Competitive tier: react-hook-form, Formik,
XState.

## Step 0: DX Scope Assessment

**Initial DX rating: 2/10.** Not because the engine is bad — the engine is the best part
of this repo — but because none of it is reachable. See TTHW below.

### TTHW assessment — the finding that reframes this phase

**TTHW for v1 is undefined, not slow.** There is no v1 getting-started path anywhere in
the repository. Verified independently by both voices and by direct grep:

- `README.md` mentions `v1` **0 times** and `validate` **0 times**.
- `defineFlow` appears only in `packages/core/src/v1/define.ts`, its own test,
  `.beads/issues.jsonl`, `ROADMAP.md`, and this design document. It appears in **no
  README, no example, no docs page**.
- `README.md:54-168` and `packages/core/README.md:22-43` are the only quickstarts, and
  both document the **0.x** class API (`WizardStore`, `IWizardConfig`,
  `createWizardFactory`).

So a visitor who arrives at the flow inspector, is impressed, and asks "how do I build
one?" has nowhere to go. The inspector would be the **only** place the v1 API is
visible anywhere, and the plan's Success Criteria never require the page to show or
link setup code. Steps 1-9 never assign "write the v1 quickstart" to anyone.

|           | Current                          | Target       |
| --------- | -------------------------------- | ------------ |
| TTHW, 0.x | ~4 min (README quickstart works) | — deprecated |
| TTHW, v1  | **∞ — no path exists**           | **< 5 min**  |

**TTHW > 10 min is a blocking issue** by this skill's own rule. Infinity qualifies.

### Product type and journey

Open-source library, npm-distributed, docs-site-supported. Nine-stage journey:

| #   | Stage           | Today                                                       | After the plan as written                |
| --- | --------------- | ----------------------------------------------------------- | ---------------------------------------- |
| 1   | Discover        | GitHub / npm search. 52 downloads/mo.                       | Unchanged — see CEO Phase user challenge |
| 2   | Evaluate        | README shows 0.x API                                        | **Inspector page — genuinely strong**    |
| 3   | Install         | `pnpm add @wizzard-packages/react`                          | Blocked until `NPM_TOKEN` is fixed       |
| 4   | Hello world     | 0.x path works; **v1 path does not exist**                  | **Still does not exist**                 |
| 5   | First real flow | Hand-author JSON with no autocomplete                       | Unchanged                                |
| 6   | Debug           | `[wizzard] unknown resolver: x` — no cause, no fix, no link | Unchanged                                |
| 7   | Integrate       | `"use client"` broken in RSC                                | Fixed at step 6 — after launch           |
| 8   | Ship            | No persistence story                                        | **Worse — persistence package deleted**  |
| 9   | Upgrade         | Migration guide cut by Premise 1                            | **Worse**                                |

The plan improves stage 2 dramatically and leaves or worsens 4, 5, 6, 8 and 9.

## Step 0.5: Dual Voices

### CODEX SAYS (DX — developer experience challenge)

- **The migration guide must not be cut, even if `compat` is.** "A compatibility runtime
  can be expensive to maintain. A concise migration guide is cheap and establishes
  trust." Its line: **"'No users' is not a migration strategy. It is an argument for
  keeping the guide short."** Wants a 0.x -> 1.0 guide, a mapping from every removed
  package to its replacement or "no replacement", before/after examples, removed APIs,
  guidance for persisted 0.x state, a version-support policy, and npm deprecation
  notices.
- **Deleting persistence is particularly risky** — the guide must say what existing
  users do with both their integration code and their already-stored data.
- **Define a persistence story for 1.0.** A documented low-level recipe is the minimum;
  an official `/persist` entry is preferable.
- **Add a five-minute quick start with a CI-tested React example and a CI-tested Vue
  example.** A Next.js App Router example matters especially given the `"use client"`
  defect: "a private fixture proves packaging; a public guide prevents users from
  rediscovering the boundary."
- **Specify structured diagnostics** for flow validation, resolver lookup, navigation
  and replay compatibility — location, cause, corrective action.
- **Raw JSON harms discoverability.** The inspector needs progressive disclosure:
  readable labels by default, raw expression on demand, search, node selection, mapping
  between graph elements and source JSON. "Without this, the showcase is legible mainly
  to its authors."
- **Move 13 and 14 ahead of the public launch.** Develop the page earlier; do not
  promote it until the installation path is sound.
- Its bottom line: **"The plan answers 'Why should I look at this?' but not 'Can I
  safely use this?' That is a good discovery strategy and a weak 1.0 strategy."**

### CLAUDE SUBAGENT (DX — independent review)

1. **CRITICAL — no v1 getting-started documentation exists anywhere.** TTHW undefined.
   Detailed above; this was reached independently, by grepping for `defineFlow`.
2. **CRITICAL — `wizzard-13` is sequenced after the showcase, reproducing the exact
   failure Approach A was rejected for.** Confirmed in code: `store.ts:55`
   `go: (to: string, ...)`, `store.ts:59` `get: (path: string) => unknown`,
   `react/src/v1/index.tsx:152` `useField<T>(path: string)` with zero inference. It adds
   the argument the CEO phase did not have: **the token rationale does not justify this
   ordering, because typing is a source-level TypeScript fix with no publish
   dependency.** It could ship before or alongside the inspector.
3. **HIGH — the JSON expression language has no authoring tool.** `expr.ts:129` throws
   `unknown operator` only at evaluation time; a typo'd `$eeq` survives `validateFlow`.
   No builder helper, no JSON Schema, no autocomplete on `data.plan` against the real
   data shape. "Materially worse DX than XState's typed guards or react-hook-form's
   typed field paths." Fix: a small typed builder, `eq(get('data.plan'), 'pro')`,
   compiling to the same JSON.
4. **HIGH — error messages have no cause, fix or docs link.** Every throw site read:
   `store.ts:120`, `expr.ts:123`, `expr.ts:129`, `react/src/v1/index.tsx:53` — all
   single-clause. `validate-flow.ts` is the best of them and still has no link.
   Fix: standardize `[wizzard] <problem>. Cause: <x>. Fix: <y>. Docs: <link>` and put it
   in 13/14's acceptance criteria rather than "make it work."
5. **HIGH — step 7 deletes four packages with no assigned README cleanup.**
   `README.md:13-24`, `:103-109`, `:183-193` all document them. Step 7's scope lists the
   packages, `.size-limit.js` and the ESLint block, and not the docs. The doc's own
   Reviewer Concerns flag the ROADMAP table and miss the README, "worse, since it's the
   first thing a new visitor reads."
6. **HIGH — `wizzard-N` ids undiscoverable.** Confirms the doc's own Reviewer Concern #1
   is real and blocks anyone picking up 13 or 14.
7. **MEDIUM — `WizardProvider` name collision.** `README.md:69` (0.x) and
   `react/src/v1/index.tsx:43` (v1) both export `WizardProvider` with different props and
   no version marker. A developer following the README's only example is silently on the
   0.x path.
8. **MEDIUM — the showcase never demonstrates the `$ref` registry escape hatch.**
   Choosing replay over run is the right scope call, but it means the central escape
   hatch for non-trivial flows never appears in the flagship demo.
9. **MEDIUM — `useField<T>(path)` has zero inference**, so the typing gap propagates
   through every binding, not just `go`/`get`. Name it in 13's acceptance criteria.

**Positive, from the subagent:** `registry` (`store.ts:29`) and `patchFlow`
(`store.ts:71,251-265`) are real, working escape hatches, and `patchFlow` explicitly
refuses a patch that would strand the user on a deleted current step. Good defensive
default; no plan change needed.

### DX DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════
  Dimension                            Claude   Codex   Consensus
  ──────────────────────────────────── ──────── ─────── ─────────
  1. Getting started < 5 min?          NO       NO      CONFIRMED
  2. API/CLI naming guessable?         NO       NO      CONFIRMED
  3. Error messages actionable?        NO       NO      CONFIRMED
  4. Docs findable & complete?         NO       NO      CONFIRMED
  5. Upgrade path safe?                NO       NO      CONFIRMED
  6. Dev environment friction-free?    PARTIAL  PARTIAL CONFIRMED
═══════════════════════════════════════════════════════════════
6/6 confirmed. 0 disagreements.
```

Second phase running with unanimous cross-model agreement.

## Pass 1: Getting Started — 0/10

Covered above. **Auto-decided (P1 completeness + P5 simpler over clever):** rewriting
`README.md` Quick Start and `packages/core/README.md` for the v1 `defineFlow` /
`createWizard` API becomes a **blocking step before the inspector goes public**, not a
follow-up. The inspector page carries a "copy this code" panel beside the graph, so the
showcase and the quickstart are the same artefact — which is the cheapest possible way
to close this, and turns the page from a demo into an on-ramp.

### The StackBlitz blast radius — new finding, neither voice caught it

Both voices found the README problem. Neither checked `.stackblitz/`. The README's
"Interactive Playground" section links templates that step 7 breaks:

| Template         | Depends on                              | Survives step 7? |
| ---------------- | --------------------------------------- | ---------------- |
| `advanced-flow`  | react, **adapter-zod**, **persistence** | **BREAKS**       |
| `basic`          | react                                   | ok               |
| `core-engine`    | core                                    | ok               |
| `custom-adapter` | core, react                             | ok               |
| `middleware`     | core, react, **middleware**             | **BREAKS**       |
| `persistence`    | react, **persistence**                  | **BREAKS**       |
| `validation`     | react, **adapter-zod**                  | **BREAKS**       |
| `vue-core`       | core                                    | ok               |

**Half the interactive playground dies at step 7**, and three of the four broken ones
are linked directly from the README as the primary "try it in the browser" surface.
`examples/demo` is also affected across seven files. **Auto-decided (P2, in blast
radius):** step 7's scope expands to the README, the per-package READMEs, the four
StackBlitz templates (rewrite on v1 or delete with the packages) and `examples/demo`.
This is the difference between "delete four packages" being a 1-hour job and a
half-day job, and the plan currently budgets neither.

## Pass 2: API/CLI Design — 4/10

`defineFlow` / `step` / `group` / `createWizard` / `go` / `get` are guessable and
consistent, and `patchFlow`'s refusal to strand the user is a genuinely thoughtful
default. Two real problems.

**The expression language has no typed authoring path** (subagent #3). A developer
writes `{"$eq":[{"$get":"data.plan"},"pro"]}` by hand, gets no autocomplete against
their data shape, and learns about a typo'd operator at runtime because `validateFlow`
does not check the operator vocabulary. **Auto-decided (P1 + P5):** ship a typed builder
in the same optional-entry style as `validate-flow` — `eq(get('data.plan'), 'pro')`
compiling to identical JSON, raw JSON still accepted. Also extend `validateFlow` to
reject unknown operators, which is a few lines against a closed 10-operator union and
converts a runtime throw into a validation problem.

**`WizardProvider` collides across 0.x and v1** (subagent #7). Resolves itself at step 7
when the 0.x surface goes, provided the README is rewritten in the same step. Tracked
there.

## Pass 3: Error Messages & Debugging — 2/10

Every throw site was read. All single-clause, none with cause, fix or link:

```
  store.ts:120              [wizzard] unknown resolver: ${ref.$ref}
  expr.ts:123               unknown resolver: ${e.$ref}
  expr.ts:129               unknown operator: ...
  react/v1/index.tsx:53     [wizzard] useWizard must be used inside a WizardProvider
```

`validate-flow.ts` is the exception and the model to copy — `"has both when and on.next
— on.next wins, and when is ignored here"` explains the consequence, not just the fact.

**Auto-decided (P1 completeness):** adopt one template repo-wide —
`[wizzard] <problem>. Cause: <cause>. Fix: <action>. Docs: <url>` — and make it an
acceptance criterion on `wizzard-13` and `wizzard-14` rather than an aspiration. This
matters most for `wizzard-14`: the plan's own problem statement is "fails at runtime
with a confusing message," and the acceptance criterion only proves the Next.js case
works. It never specifies what message ships for the build tools it does not fix.

## Pass 4: Documentation & Learning — 1/10

The docs describe a library that has been replaced. Beyond Pass 1: `packages/ui` has
`/api/*` (typedoc-generated), `/examples` and `/learn` routes that presumably describe
0.x as well, and the plan adds a 5th route without auditing the 4 that exist.
**Auto-decided (P2):** the README rewrite in Pass 1 covers the entry point; auditing
`/learn` and `/examples` for 0.x content is **deferred** — outside blast radius, and
the typedoc `/api` route regenerates from source automatically.

## Pass 5: Upgrade & Migration Path — 1/10

This is where Codex is at its sharpest and where the plan has a real, separable defect.

**Premise 1 bundles two decisions that have different costs and different evidence.**
Cutting the `compat` package — a runtime, `compileLegacyConfig`, ongoing maintenance —
is well justified by 52/50/12 downloads. Cutting the _migration guide_ is not justified
by the same number, because a guide costs an afternoon once and is read by prospective
users deciding whether this project treats upgrades responsibly, not only by existing
0.x users. Those are different audiences and the download count only measures one.

**Auto-decided (P1 completeness, P3 pragmatic):** keep `compat` cut; **restore a short
migration guide** as a step-7 deliverable. Scope: a table mapping each removed package
to its replacement or an explicit "no replacement", before/after snippets for the
common case, and `npm deprecate` notices on the four packages pointing at it. That is
an afternoon, not a package.

`npm deprecate` also matters for a reason Phase 1 already flagged: unpublishing is
unavailable after 72 hours, so deprecation is the only lever that reaches someone who
already installed one of these.

## Pass 6: Developer Environment & Tooling — 6/10

The repo's own tooling is good and mostly not this plan's business: pnpm workspaces,
turbo, vitest, playwright, changesets, 12 ratcheted size limits, an ESLint quarantine
that keeps v1 strict while legacy stays loose. Two frictions inside this plan's radius:

- **No CI-tested quickstart.** Codex's ask for a CI-tested React example and a
  CI-tested Vue example is the mechanism that stops Pass 1 regressing the next time the
  API moves. **Auto-decided (P1):** accept — the examples are the quickstart, compiled.
- **`wizzard-9` is open** ("Replace hard `waitForTimeout` calls in the E2E suite"). The
  inspector adds E2E surface. **Auto-decided (P6):** do not add new `waitForTimeout`
  calls; do not expand `wizzard-9`'s scope here.

## Pass 7: Community & Ecosystem — 3/10

`wizzard-N` ids live only in `.beads/issues.jsonl` and `docs/DEV_WORKFLOW.md` never
names the tracker (**Reviewer Concern #1, confirmed by both voices**). A drive-by
contributor cannot find the issue list. **Auto-decided (P5 explicit):** add one
paragraph to `docs/DEV_WORKFLOW.md` naming `.beads/issues.jsonl` as the tracker with
the `wizzard-N` scheme, and note that `tasks/session-state.md` uses an older scheme and
is historical. One paragraph closes a concern the doc has been carrying open.

The `/persist`, `/analytics`, `/logger`, `/autosave`, `/url-sync`, `/http-flow` rows at
`ROADMAP.md:48` are **Reviewer Concern #2**. **Auto-decided (P3 + P1):** mark the table
`deferred past 1.0.0`, with `/persist` promoted out of the deferred set into a named
1.0.0 blocker, because of the persistence hole the CEO phase found and Codex
independently confirmed here. Deferred is not discarded; the table stops contradicting
the release plan either way.

## Pass 8: DX Measurement & Feedback Loops — 2/10

Nothing is instrumented and there is no feedback channel. The site is static with no
analytics, which is a defensible privacy posture for an OSS project and worth stating
rather than leaving as an accident. **Auto-decided (P3):** out of scope, one line in the
plan recording that the choice is deliberate. The one cheap feedback mechanism worth
having is the "show graph JSON" toggle accepted in Phase 1 Section 8 — it makes any bug
reportable by copy-paste instead of screenshot.

## DX Scorecard

| #   | Dimension             | Score    | Blocking?                                  |
| --- | --------------------- | -------- | ------------------------------------------ |
| 1   | Getting started       | **0/10** | **YES — TTHW undefined**                   |
| 2   | API/CLI design        | 4/10     | No                                         |
| 3   | Error messages        | 2/10     | No                                         |
| 4   | Documentation         | 1/10     | **YES — docs describe a replaced library** |
| 5   | Upgrade & migration   | 1/10     | **YES — no guide, no deprecation notices** |
| 6   | Dev environment       | 6/10     | No                                         |
| 7   | Community & ecosystem | 3/10     | No                                         |
| 8   | Measurement           | 2/10     | No                                         |

**Overall: 2/10 -> 7/10 with the decisions above applied.** Not higher, because the
expression-authoring gap (Pass 2) and the error-message template (Pass 3) are real work
that lands after 1.0.0 on any realistic schedule.

## DX Implementation Checklist

- [ ] Rewrite `README.md` Quick Start for v1 `defineFlow`/`createWizard` — **blocks the
      public inspector**
- [ ] Rewrite `packages/core/README.md` quickstart for v1
- [ ] Add `@wizzard-packages/validate` to the README package table
- [ ] "Copy this code" panel on the inspector route beside the graph
- [ ] CI-tested React quickstart example
- [ ] CI-tested Vue quickstart example
- [ ] Next.js App Router example, public (not only the `wizzard-14` fixture)
- [ ] Typed expression builder — `eq(get('data.plan'), 'pro')` — own entry
- [ ] `validateFlow` rejects unknown operators
- [ ] Error template `[wizzard] <problem>. Cause. Fix. Docs.` in 13/14 acceptance criteria
- [ ] Step 7 expands: README, per-package READMEs, 4 StackBlitz templates, `examples/demo`
- [ ] Short 0.x -> 1.0 migration guide (guide restored; `compat` stays cut)
- [ ] `npm deprecate` on the four removed packages, pointing at the guide
- [ ] `docs/DEV_WORKFLOW.md` names `.beads/issues.jsonl` and the `wizzard-N` scheme
- [ ] `ROADMAP.md:48` plugin table marked deferred; `/persist` promoted to a 1.0.0 blocker
- [ ] One line recording that no analytics is a deliberate choice

## Developer empathy narrative

I have a five-step onboarding flow. Today it is react-hook-form plus a `useState` step
counter and a switch statement I am tired of. Someone links me a page where a wizard
flow draws itself as a graph and replays backwards. That is genuinely the first
interesting thing I have seen in this category. I want it.

I click through to the repo. The README shows me `WizardStore`, `IWizardConfig`,
`createWizardFactory` — none of which appear on the page I just came from. I look for
`defineFlow`, the thing the graph was built from. It is not in the README. It is not in
the examples. I open the StackBlitz "Persistence" playground because persistence is
exactly my problem, and it fails to install. I try `pnpm add @wizzard-packages/core`
and get a version from January.

I go back to XState. Not because it is better, but because I could tell what to type.

That is the gap. The plan builds a magnificent front door onto a house with no
hallway, and both models said so in different words. Everything in the checklist above
is the hallway.

## Phase 2.5 Completion Summary

| Item                       | Result                                                     |
| -------------------------- | ---------------------------------------------------------- |
| Product type               | Open-source npm library, docs-site-supported               |
| Persona                    | React dev with a 5-step flow, evaluating for an afternoon  |
| TTHW current               | **undefined — no v1 path exists**                          |
| TTHW target                | < 5 min                                                    |
| Initial DX                 | 2/10                                                       |
| Post-review DX             | 7/10                                                       |
| Blocking dimensions        | 3 (getting started, documentation, upgrade path)           |
| Codex concerns             | 10 required changes                                        |
| Claude subagent issues     | 9 (2 critical, 4 high, 3 medium)                           |
| Consensus                  | 6/6 confirmed, 0 disagreements                             |
| New finding, neither voice | StackBlitz blast radius — 4 of 8 templates break at step 7 |

---

# GSTACK REVIEW — Phase 3: Engineering

Runs last, reviewing the plan as amended by Phases 1, 2 and 2.5.

## Step 0: Scope Challenge

Scope is **not reduced** (P2). It is expanded in three places the earlier phases
established: step 2 gains build wiring and a registry argument, step 7 gains the
documentation and playground blast radius, and step 4 gains interaction states.

Complexity check against actual code. Each sub-problem mapped to what exists:

| Sub-problem                                  | Existing code                                                | Real difficulty                              |
| -------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| `FlowDefinition -> {nodes, edges}`           | `resolve.ts` walks the same structures                       | **Harder than "a traversal"** — see 1.2, 1.6 |
| Optional entry that stays out of the runtime | `./validate-flow`: `tsup.config.ts:7` + `package.json:37-56` | Mechanical, but **unmentioned in the plan**  |
| Trust a pasted flow                          | `validateFlow`                                               | **Weaker than assumed** — see 3.2            |
| Replay                                       | `WizardState` is JSON-clean                                  | **Format is undefined** — see 1.4            |
| Layout                                       | Nothing exists                                               | Genuinely unscoped; taste decision at gate   |

## Step 0.5: Dual Voices

### CODEX SAYS (eng — architecture challenge)

- **"Layout stays in the site" is incompatible with later embedding the renderer in the
  published package.** Proposes a `LayoutAdapter` interface —
  `layout(graph: StructuralGraph, measurements: NodeMeasurements, options: LayoutOptions)
-> PositionedGraph` — consumed identically by the site and by published devtools.
- **Removing four legacy size entries while adding none for their replacements weakens
  the ratchet precisely during the largest packaging change.** Wants separate budgets
  for: the structural graph entry, devtools excluding optional layout deps, the complete
  devtools bundle including layout, devtools CSS/icons/fonts, the inspector route's
  initial JS, and any lazy-loaded graph chunk. Plus: verify the size tool follows package
  exports and counts transitive deps as consumers receive them — "a small source entry
  can still publish a large dependency tree."
- **The new entry needs ordinary publication checks** — build output, exports, `publint`,
  type-resolution tests, tree-shaking, and a check that it never leaks into the main core
  entry. "Merely remeasuring `core/v1` does not prove the new entry is correctly isolated."
- **The test plan is far below repository standards.** The repo requires property tests
  for core logic; five example cases do not meet it. Lists twelve graph properties and
  eleven session-playback cases.
- **Three state domains must be distinguished:** persisted authoritative state, derived
  selector output, and ephemeral execution state (pending loaders, abort signals, errors,
  failed transition attempts). "If recordings contain only domain 1, the UI cannot
  faithfully explain why domain 2 changed or why a transition did not commit."
- **The recording boundary should be the commit protocol, not a generic store
  subscription** — otherwise rapid failed or superseded attempts vanish from the
  recording.
- Sequencing: specify contracts -> budgets and fixtures -> **13 and 14** -> graph
  extraction and detached playback -> public inspector -> recording at the commit
  boundary -> devtools integration -> publish.

### CLAUDE SUBAGENT (eng — independent review)

1. **CRITICAL — `GroupStep.flow` can be a `string`** (`flow.ts:56`). Independently
   confirms Phase 1 Finding 1.2. Fix: `(flow, resolveGroup?: (ref) => FlowDefinition |
undefined) => {nodes, edges}`; unresolved ref renders as an opaque stub with the same
   treatment as `deferred`.
2. **HIGH — naive traversal drops steps or infinite-loops on cycles.** Building nodes
   from `flow.order` silently omits steps reachable only via `on.next` — a shape
   `validate-flow.ts:38-42` treats as valid and only warns about. And `on.next`/`on.back`
   can cycle (A->B->A is a normal "edit and return" wizard); a recursive walk
   stack-overflows. **Fix: nodes = `Object.keys(flow.steps)`, never `order`; edges = one
   flat pass over each step's own `on.next`/`on.back`, not a walk — inherently
   cycle-safe; recurse only into inline `GroupStep.flow` objects with a visited-set
   guard.**
3. **HIGH — build wiring is missing from the plan, not just the size budget.**
   `tsup.config.ts:7`'s `entry` array and `package.json`'s `exports` map are mentioned
   nowhere in Next Steps. Without both, `dist/v1/graph.*` is never emitted and the
   `packages/ui` import fails at build time, not merely at CI-budget time.
4. **HIGH — the recorded-session format is unspecified and unvalidated.** `WizardState`
   (`state.ts:20-37`) needs `stack`/`history`/`visited`/`completed`/`rev`/`nav` mutually
   consistent for `select.ts` to make sense. A hand-authored fixture with the current
   step missing from `visited`, or a non-monotonic `rev`, will silently mis-highlight
   during the flagship demo. Fix: define `RecordedSession { flow; frames: WizardState[] }`
   plus a pure checker in the shape of `validateFlow`.
5. **MEDIUM — "framework-agnostic renderer" is oversold.** Only the _builder_ is
   agnostic. `packages/ui/src/App.tsx` is a React Router SPA, so the renderer is React by
   construction, and step 8 presumes devtools is React too.
6. **MEDIUM — implicit fallthrough to `END` is not drawable from `on.next` alone.**
   `resolve.ts:29-42`: when every target in an explicit `on.next` array fails its `when`,
   the runtime falls through to `END` with no literal `'@end'` entry. A one-edge-per-
   `Target` builder never draws it, so **the picture disagrees with the engine**. Fix:
   synthesize a step->`END` edge labelled "no branch matched" for any step with an
   explicit `on.next` array.
7. **MEDIUM — `effectiveOrder` is already inlined four times.** `resolve.ts:44,57,81,98`
   each carry `flow.order ?? Object.keys(flow.steps)` with no exported helper. The graph
   builder needs the identical fallback to agree with the engine, and would be a fifth
   copy — "precisely the duplication `navigate.ts:14-16`'s own docstring calls out as the
   bug class v1 was built to kill."
8. **MEDIUM — paste-box validation is weaker than it looks.** `validate-flow.ts:68-72`'s
   `$ref` check short-circuits to a no-op when no registry is passed, and a replay-only
   page has no registry, so unknown `$ref`s pass silently. Acceptable (nothing is
   evaluated), but it must be stated. Also: the plan never says labels render as **text,
   not markup**, on a public paste box for third-party JSON.
9. **MEDIUM — no ceiling on pasted flow size or depth is the actual 10x failure mode.**
   Single-tab client load, not concurrency.
10. **MEDIUM — test matrix omits `repeat` groups and the non-array `on.next` form.**
    `Target | readonly Target[]` (`flow.ts:33`) makes a bare-string `on.next` a distinct
    code path from a conditional array.

### ENG DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════
  Dimension                            Claude   Codex   Consensus
  ──────────────────────────────────── ──────── ─────── ─────────
  1. Architecture sound?               NO       NO      CONFIRMED
  2. Test coverage sufficient?         NO       NO      CONFIRMED
  3. Performance risks addressed?      NO       NO      CONFIRMED
  4. Security threats covered?         PARTIAL  PARTIAL CONFIRMED
  5. Error paths handled?              NO       NO      CONFIRMED
  6. Deployment risk manageable?       NO       NO      CONFIRMED
═══════════════════════════════════════════════════════════════
6/6 confirmed. 0 disagreements.
```

Third phase running with unanimous cross-model agreement (CEO 6/6, DX 6/6, Eng 6/6;
Design 5/7 plus 2 single-voice criticals).

## Section 1: Architecture

**Auto-decided (P5 explicit over clever), the builder contract:**

```ts
// packages/core/src/v1/graph.ts — new subpath export @wizzard-packages/core/graph
export interface FlowGraph {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  problems: readonly FlowProblem[]; // never throws — Phase 1 Section 8
}
export function buildGraph(
  flow: FlowDefinition,
  resolveGroup?: (ref: string) => FlowDefinition | undefined
): FlowGraph;
```

Rules, each traceable to a finding:

- `nodes = Object.keys(flow.steps)` — **never** `flow.order` (subagent 2).
- `edges` = one flat pass per step over its own `on.next` / `on.back`. Not a walk.
  Cycle-safety falls out of the shape rather than a guard (subagent 2).
- Recurse only into **inline** `GroupStep.flow` objects, with a visited set. A `string`
  ref goes through `resolveGroup`, and an unresolved one becomes an explicit stub node
  plus a `problem` (subagent 1, Phase 1 Finding 1.2).
- Synthesize a `-> END` edge labelled "no branch matched" for any step with an explicit
  `on.next` array (subagent 6). Without this the drawing contradicts `resolve.ts:29-42`.
- Import a newly extracted `effectiveOrder(flow)` rather than inlining the fallback a
  fifth time (subagent 7). **P4 DRY.**

```
   packages/core/src/v1/
   ┌────────────────────────────────────────────────────────┐
   │  flow.ts     FlowDefinition, GroupStep, Target, END     │
   │  expr.ts     Expr (closed JSON union)                   │
   │  state.ts    WizardState (JSON-clean by invariant)      │
   └───────┬─────────────────────────┬──────────────────────┘
           │                         │
   ┌───────▼─────────┐       ┌───────▼──────────────────────┐
   │ effectiveOrder  │◀──────│ resolve.ts  (4 inlined copies │
   │  NEW, extracted │ dedupe│  today: :44 :57 :81 :98)      │
   └───────┬─────────┘       └──────────────────────────────┘
           │
   ┌───────▼──────────────────────────────────────────────┐
   │  graph.ts   NEW      buildGraph(flow, resolveGroup?)  │
   │  + session.ts NEW    RecordedSession + checkSession   │
   │  structure only, no positions, never throws           │
   └───────┬──────────────────────────────────────────────┘
           │  new tsup entry + new package.json export
           │  + new .size-limit.js budget   ← all three, same PR
           │
     ┌─────┴───────────────────────┐
     │                             │
┌────▼──────────────┐   ┌──────────▼────────────────────┐
│ packages/ui       │   │ packages/devtools (2.0.0)      │
│  /inspector route │   │  embeds the same renderer      │
│  React renderer   │   │  React renderer                │
└────┬──────────────┘   └──────────┬────────────────────┘
     │                             │
     └────────────┬────────────────┘
                  ▼
        LayoutAdapter (Codex)
        layout(graph, measurements, options) -> PositionedGraph
        ONE implementation, both consumers
```

**Coupling verdict:** the builder depends only on types and `effectiveOrder`; the
renderer depends on the builder; layout is an interface behind both. No cycles, and the
one real coupling risk (layout implemented twice) is closed by the adapter.

**Auto-decided (P5):** the plan's "framework-agnostic renderer" claim is corrected to
"framework-agnostic _builder_, React renderer" (subagent 5). The current wording promises
something step 8 cannot deliver.

## Section 2: Code Quality

The `effectiveOrder` duplication (subagent 7) is the one genuine DRY violation, and it
is pre-existing: `resolve.ts:44,57,81,98`. **Auto-decided (P4):** extract it as part of
step 2, and refactor the four existing call sites in the same PR. That is a four-line
change to existing code, fully covered by `resolve.test.ts` and
`resolve.property.test.ts`, and it prevents the graph from silently disagreeing with the
engine about which steps exist. Fixing it once where all callers route through is
cheaper than a fifth copy.

Naming: `buildGraph`, `FlowGraph`, `GraphNode`, `GraphEdge`, `RecordedSession`,
`checkSession` all match the repo's existing `validateFlow` / `FlowProblem` register.
No issues.

## Section 3: Test Review — the repo standard is property tests

Verified: `fast-check@^4.9.0` is a devDependency (`package.json:88`) and
`packages/core/src/v1/resolve.property.test.ts` exists. Codex is right that five example
cases fall below the bar for a module sitting directly beside `resolve.ts`.

### Test diagram — every codepath to its coverage

| #   | Codepath / branch                                                              | Type     | Exists?     | Decision              |
| --- | ------------------------------------------------------------------------------ | -------- | ----------- | --------------------- |
| 1   | Linear `order`                                                                 | unit     | plan has it | keep                  |
| 2   | Conditional `on.next` **array**                                                | unit     | plan has it | keep                  |
| 3   | `on.next` **bare string** (distinct path, `flow.ts:33`)                        | unit     | **gap**     | **add** (subagent 10) |
| 4   | `on.back: 'auto'`                                                              | unit     | plan has it | keep                  |
| 5   | `END` literal                                                                  | unit     | plan has it | keep                  |
| 6   | **Implicit fallthrough to `END`** (`resolve.ts:29-42`)                         | unit     | **gap**     | **add** (subagent 6)  |
| 7   | Nested **inline** group                                                        | unit     | plan has it | keep                  |
| 8   | Group by **string ref**, resolved                                              | unit     | **gap**     | **add**               |
| 9   | Group by **string ref**, unresolved -> stub + problem                          | unit     | **gap**     | **add**               |
| 10  | `repeat` group, no infinite expansion                                          | unit     | **gap**     | **add** (subagent 10) |
| 11  | Step in `steps` but absent from `order`                                        | unit     | **gap**     | **add** (subagent 2)  |
| 12  | Back-edge cycle A->B->A, no stack overflow                                     | unit     | **gap**     | **add** (subagent 2)  |
| 13  | Empty `steps: {}`                                                              | unit     | **gap**     | **add**               |
| 14  | `deferred` step draws as stub                                                  | unit     | **gap**     | **add**               |
| 15  | Unknown `$ref` in `when`, no registry                                          | unit     | **gap**     | **add** (subagent 8)  |
| 16  | **Property: determinism** across repeated calls                                | property | **gap**     | **add**               |
| 17  | **Property: input never mutated** (deep-frozen input)                          | property | **gap**     | **add**               |
| 18  | **Property: every step in `steps` yields exactly one node**                    | property | **gap**     | **add**               |
| 19  | **Property: every `Target` resolves to a node or a problem** — no silent drops | property | **gap**     | **add**               |
| 20  | **Property: conditional target order preserved**                               | property | **gap**     | **add**               |
| 21  | `checkSession` rejects non-monotonic `rev`                                     | unit     | **gap**     | **add** (subagent 4)  |
| 22  | `checkSession` rejects a frame whose `stack[].step` is not in `flow.steps`     | unit     | **gap**     | **add** (subagent 4)  |
| 23  | `checkSession` rejects a recording made against a different flow               | unit     | **gap**     | **add** (F3)          |
| 24  | Empty and single-frame sessions                                                | unit     | **gap**     | **add**               |
| 25  | Truncated / corrupt recording                                                  | unit     | **gap**     | **add**               |
| 26  | Inspector renders the default example on load                                  | E2E      | **gap**     | **add**               |
| 27  | Paste malformed JSON -> error, last-good graph survives                        | E2E      | **gap**     | **add**               |
| 28  | Scrubber disabled with a named reason on a pasted flow                         | E2E      | **gap**     | **add**               |
| 29  | Keyboard scrubbing + focus preserved across re-render                          | E2E      | **gap**     | **add**               |
| 30  | Oversized flow hits the ceiling with a friendly message                        | unit     | **gap**     | **add** (subagent 9)  |

**Auto-decided (P1 completeness):** all 25 gaps accepted. Items 16-20 are the property
suite the repo standard requires; they live in `graph.property.test.ts` beside
`resolve.property.test.ts`. Items 26-29 join the Playwright suite **without new
`waitForTimeout` calls** (`wizzard-9` is open).

**What breaks at 2am Friday:** item 19. A `Target` that silently resolves to nothing
produces a graph missing an edge, which looks like a correct picture of a different
flow. Nobody notices until someone trusts the drawing over the code. The property test
is the only thing that catches it, because no hand-written example will enumerate the
target shapes that do it.

## Section 4: Performance

- **Bundle, not runtime.** At 5-40 nodes every layout algorithm is instant. The ratchet
  is what matters, and Codex is right that deleting four size entries while adding none
  weakens it during the biggest packaging change this repo has made.
  **Auto-decided (P1):** add budgets for the graph entry, the inspector route's initial
  JS, and devtools with and without layout — before the first line, per `wizzard-11`.
- **Input ceiling** (subagent 9): the real 10x failure is one tab rendering a
  generator-produced flow. **Auto-decided (P5):** cap node count and nesting depth in the
  builder with a named problem, not a thrown error.
- **`core/v1` untouched:** the graph is its own entry, so the 3.9 kB ratchet is
  unaffected by construction — but per Codex this must be _proved_ with `publint`, a
  type-resolution test, and a check that nothing leaked into the main entry. Not assumed.

## Section 5: Security

Confirms and extends Phase 1 Section 3. The page evaluates nothing: `Expr` is data,
`validateFlow` rejects functions, replay is `setState` over recorded frames.

Two additions from this phase:

- **`validateFlow`'s `$ref` check is a no-op without a registry** (`validate-flow.ts:68-72`),
  and the inspector has no registry. Unknown `$ref`s therefore pass silently. Harmless
  because nothing is evaluated, but the plan must **say so**, or a later change that adds
  a registry will assume validation it never had.
- **Labels render as text nodes only.** This is a public paste box for arbitrary
  third-party JSON on GitHub Pages. `react-markdown` is already a dependency of
  `packages/ui`, which makes routing a step title through it a plausible mistake.
  **Auto-decided (P1):** state it in Success Criteria, and add it to the E2E suite.

## Failure Modes Registry — final, all phases

| #       | Failure mode                                              | Sev          | Silent?                      | Mitigation                          | Status      |
| ------- | --------------------------------------------------------- | ------------ | ---------------------------- | ----------------------------------- | ----------- |
| F1      | Public page before 13/14                                  | Critical     | No                           | Reorder / gate promotion            | Fix in plan |
| F2      | Group `string` ref unresolvable                           | High         | **Yes**                      | `resolveGroup` + stub + problem     | Fix in plan |
| F3      | Replay desyncs from a stale recording                     | High         | **Yes**                      | `checkSession` fingerprint          | Fix in plan |
| F4      | Layout implemented twice                                  | Medium       | No                           | `LayoutAdapter`                     | Fix in plan |
| F5      | Layout dep inflates the bundle                            | Medium       | No                           | Budgets + taste decision            | **Gate**    |
| F6      | devtools 2.0.0 vs a 1.0.0 family                          | Medium       | No                           | Decide before step 9                | Fix in plan |
| F7      | Second token rotation fails identically                   | Medium       | No                           | Automation/granular, not Publish    | Fix in plan |
| F8      | 1.0.0 has no persistence story                            | Medium       | On adoption                  | `/persist` promoted to blocker      | Fix in plan |
| F9      | Nobody arrives                                            | High         | **Looks like success**       | —                                   | **Gate**    |
| **F10** | **Nodes built from `order`, steps silently dropped**      | **High**     | **Yes**                      | `Object.keys(flow.steps)`           | Fix in plan |
| **F11** | **Recursive walk stack-overflows on a cycle**             | **High**     | No                           | Flat edge pass                      | Fix in plan |
| **F12** | **Build wiring missing; `dist/v1/graph.*` never emitted** | **High**     | No                           | tsup + exports + size-limit, one PR | Fix in plan |
| **F13** | **Graph omits implicit `END` fallthrough**                | **Medium**   | **Yes**                      | Synthesized edge                    | Fix in plan |
| **F14** | **Fifth `effectiveOrder` copy drifts from the engine**    | **Medium**   | **Yes**                      | Extract once                        | Fix in plan |
| **F15** | **Oversized pasted flow freezes the tab**                 | **Medium**   | No                           | Node/depth ceiling                  | Fix in plan |
| **F16** | **Half the StackBlitz playground dies at step 7**         | **High**     | No                           | Step 7 scope expansion              | Fix in plan |
| **F17** | **No v1 quickstart; TTHW undefined**                      | **Critical** | **Looks fine to the author** | README rewrite blocks launch        | Fix in plan |

**Critical gap assessment.** Seven failure modes are silent: F2, F3, F10, F13, F14 render
plausible output that is wrong; F9 and F17 look like success to the person who built
them. F17 is the one that decides whether any of this matters — a perfect inspector
above a README documenting a replaced API converts nobody.

## Phase 3 Completion Summary

| Item                         | Result                                                                   |
| ---------------------------- | ------------------------------------------------------------------------ |
| Scope                        | Not reduced; expanded in 3 places                                        |
| Architecture findings        | 7 (1 critical, 3 high, 3 medium)                                         |
| Test gaps                    | 25 of 30 codepaths uncovered; 5 property tests required by repo standard |
| Performance                  | Bundle-bound, not runtime-bound; ratchet weakened by deletions           |
| Security                     | No new evaluation surface; 2 statements required                         |
| New failure modes this phase | 6 (F10-F15), 4 of them silent                                            |
| Dual voices                  | Codex + Claude subagent, both ran                                        |
| Consensus                    | 6/6 confirmed, 0 disagreements                                           |
| DRY violations               | 1, pre-existing (`resolve.ts:44,57,81,98`)                               |

<!-- AUTONOMOUS DECISION LOG -->

## Decision Audit Trail

| #   | Phase  | Decision                                                                               | Classification | Principle          | Rationale                                                                          | Rejected                               |
| --- | ------ | -------------------------------------------------------------------------------------- | -------------- | ------------------ | ---------------------------------------------------------------------------------- | -------------------------------------- |
| 1   | CEO    | Mode = SELECTIVE EXPANSION                                                             | Mechanical     | autoplan override  | Baseline held, expansions surfaced individually                                    | EXPANSION, HOLD, REDUCTION             |
| 2   | CEO    | Premise 1 (cut `compat`) accepted                                                      | Mechanical     | P6                 | 52/50/12 downloads; nobody to protect                                              | Challenging it                         |
| 3   | CEO    | Premise 2 (delete four 0.x packages) accepted                                          | Mechanical     | P6                 | Same evidence; collapses quarantine + 4 size entries                               | Careful deprecation                    |
| 4   | CEO    | Premise 0 (showcase fixes the bottleneck) → **User Challenge**                         | User Challenge | never auto-decided | Both voices agree the direction should change                                      | Auto-deciding it either way            |
| 5   | CEO    | Approach C over D                                                                      | **Taste**      | P1 + P6            | C is the only option discharging 3 roadmap items; architecture claim now verified  | D (trust + one signal)                 |
| 6   | CEO    | E1 size-limit entries for graph builder + devtools → into scope                        | Mechanical     | P2                 | In blast radius, ~10 min CC, resolves Concern #3 and `wizzard-11`                  | Deferring                              |
| 7   | CEO    | E2 `GroupStep.flow: string` gap → into scope                                           | Mechanical     | P1                 | Correctness hole in step 2, not an extra                                           | Deferring                              |
| 8   | CEO    | E3 gate public link on `wizzard-13`/`14` → into scope                                  | Mechanical     | P1                 | Fixes the plan's own internal contradiction                                        | Leaving the ordering as-is             |
| 9   | CEO    | E4 persistence story → defer to `.beads`                                               | Mechanical     | P3                 | Real gap, outside blast radius                                                     | Adding to this plan                    |
| 10  | CEO    | E5 distribution artefact → defer, surface at gate                                      | Mechanical     | P3                 | Not an engineering task; user framed this as OSS not venture                       | Auto-adding it                         |
| 11  | CEO    | E6/E7 record hook + URL sharing → defer                                                | Mechanical     | P3                 | Document already defers them correctly                                             | Pulling them forward                   |
| 12  | CEO    | Graph builder takes optional flow registry (Finding 1.2)                               | Mechanical     | P5                 | Mirrors `validateFlow(flow, registry?)`, already the convention                    | Opaque box, silent omission            |
| 13  | CEO    | `repeat` gets an iteration badge + fixture coverage (1.3)                              | Mechanical     | P5                 | Cheaper decided now than discovered while wiring the scrubber                      | Ignoring repeat                        |
| 14  | CEO    | Reorder steps 4/5/6, or gate promotion of the URL                                      | Mechanical     | P1                 | Removes the Approach-A contradiction the doc itself named                          | Shipping the page first                |
| 15  | CEO    | Hand-rolled layered layout over a dependency                                           | Mechanical     | P4 + P5            | An external lib cannot live in published devtools; hand-roll serves both consumers | dagre (~40-50 kB), elkjs (~500 kB+)    |
| 16  | CEO    | Renderer takes positions as a prop; shared `layout()` helper                           | Mechanical     | P4                 | Resolves Concern #4 with one implementation, no duplication                        | Layout twice, or layout in the package |
| 17  | CEO    | 5 unit test gaps + 1 E2E case into the builder's test file                             | Mechanical     | P1                 | Same file, same hour                                                               | Happy-path-only tests                  |
| 18  | CEO    | Graph builder returns problems as data, not throws                                     | Mechanical     | P5                 | Matches `FlowProblem[]`; makes silent failures visible                             | Throwing                               |
| 19  | CEO    | "Show graph JSON" toggle on the page                                                   | Mechanical     | P2                 | Minutes of work; makes every bug reportable by copy-paste                          | Skipping it                            |
| 20  | CEO    | Deprecate the four packages, never `npm unpublish`                                     | Mechanical     | P6                 | Unpublish is unavailable after 72h and breaks consumers                            | Unpublishing                           |
| 21  | CEO    | Codex "deleting legacy conversion before a paste importer" → rejected                  | Mechanical     | evidence           | Conflates `compat` with schema adapters; `validate` already superseded them        | Accepting the claim                    |
| 22  | Design | Fold order pinned: graph + scrubber above fold, paste in a drawer, CTA below           | Mechanical     | P5                 | Structural, not aesthetic; plan's own thesis implied it                            | Paste-first layout                     |
| 23  | Design | 4x5 interaction state table specified                                                  | Mechanical     | P1                 | Pass 2 scored 1/10; states are features                                            | Leaving states to the implementer      |
| 24  | Design | Infix pretty-printer for `when`; raw JSON on hover                                     | Mechanical     | P1                 | Raw `{"$eq":[...]}` labels are unreadable                                          | Raw JSON labels                        |
| 25  | Design | Scrubber disabled with a named reason on a pasted flow                                 | Mechanical     | P1                 | The arc's actual break point                                                       | Silent/stale scrubber                  |
| 26  | Design | Layout top-to-bottom; back edges dashed, routed outside the main column                | Mechanical     | P5                 | Reader must tell alternatives from sequence                                        | Left-right, undecided                  |
| 27  | Design | Node positions frozen per flow, never recomputed per snapshot                          | Mechanical     | P5                 | Re-layout destroys spatial memory; replay unusable                                 | Re-layout per frame                    |
| 28  | Design | Groups as compound nodes, collapsed by default                                         | Mechanical     | P5                 | Decide before choosing a layout engine                                             | Ad-hoc mid-implementation              |
| 29  | Design | State panel shows a diff; full snapshot behind a toggle                                | Mechanical     | P1                 | Full dump buries the delta the demo exists to show                                 | Full JSON dump                         |
| 30  | Design | Parse on submit, not on keystroke                                                      | Mechanical     | P5                 | Keystroke parsing = error noise + graph churn                                      | Parse-on-keystroke                     |
| 31  | Design | Pan/zoom in scope for step 4, with a node-count ceiling stated                         | Mechanical     | P1                 | 40-step fixture overflows the viewport                                             | Silent gap                             |
| 32  | Design | Graph palette derives from existing `index.css` tokens                                 | Mechanical     | P4                 | A real design system exists and the plan ignored it                                | Inventing a second visual language     |
| 33  | Design | Responsive: desktop split / tablet sheet / mobile read-only <640px                     | Mechanical     | P1                 | Pass 6 scored 0/10                                                                 | "It stacks"                            |
| 34  | Design | Hidden step/transition table mirroring the graph, always in the DOM                    | Mechanical     | P1                 | Graph cannot be the sole representation; nearly free from `{nodes,edges}`          | Visual-only graph                      |
| 35  | Design | Layout: hand-rolled vs dependency → **TASTE**, surfaced                                | **Taste**      | —                  | Codex disagreed with CEO #15 with a valid, evidenced reason                        | Auto-deciding it                       |
| 36  | DX     | README + `packages/core/README.md` rewritten for v1 — **blocks the public page**       | Mechanical     | P1                 | TTHW for v1 is undefined; `defineFlow` is in no README                             | Treating docs as follow-up             |
| 37  | DX     | "Copy this code" panel on the inspector beside the graph                               | Mechanical     | P3                 | Makes the showcase and the quickstart one artefact                                 | Separate docs page                     |
| 38  | DX     | Step 7 expands to README, per-package READMEs, 4 StackBlitz templates, `examples/demo` | Mechanical     | P2                 | Half the interactive playground breaks at step 7                                   | Deleting packages only                 |
| 39  | DX     | Keep `compat` cut; **restore a short migration guide**                                 | Mechanical     | P1 + P3            | Premise 1 bundled two decisions with different costs and audiences                 | Cutting both                           |
| 40  | DX     | `npm deprecate` the four packages, pointing at the guide                               | Mechanical     | P6                 | Unpublish is unavailable after 72h                                                 | Silent removal                         |
| 41  | DX     | Typed expression builder `eq(get('data.plan'),'pro')`, own entry                       | Mechanical     | P1 + P5            | No autocomplete, no compile-time operator check                                    | Raw JSON only                          |
| 42  | DX     | `validateFlow` rejects unknown operators                                               | Mechanical     | P1                 | `expr.ts:129` throws only at evaluation time                                       | Runtime-only discovery                 |
| 43  | DX     | Error template `[wizzard] problem. Cause. Fix. Docs.` in 13/14 acceptance criteria     | Mechanical     | P1                 | Every throw site is single-clause                                                  | "Make it work"                         |
| 44  | DX     | CI-tested React + Vue quickstarts, public Next.js App Router example                   | Mechanical     | P1                 | Stops Pass 1 regressing; `wizzard-14` fixture is private                           | Fixture only                           |
| 45  | DX     | `docs/DEV_WORKFLOW.md` names `.beads/issues.jsonl` and the `wizzard-N` scheme          | Mechanical     | P5                 | Reviewer Concern #1, confirmed by both voices                                      | Leaving it open                        |
| 46  | DX     | `ROADMAP.md:48` plugin table marked deferred; `/persist` promoted to a 1.0.0 blocker   | Mechanical     | P3 + P1            | Reviewer Concern #2 + the persistence hole                                         | Leaving the table in limbo             |
| 47  | DX     | Auditing `/learn` and `/examples` for 0.x content → deferred                           | Mechanical     | P3                 | Outside blast radius; `/api` regenerates from source                               | Expanding scope                        |
| 48  | DX     | No analytics recorded as a deliberate choice                                           | Mechanical     | P3                 | Defensible OSS privacy posture; state it                                           | Leaving it accidental                  |
| 49  | Eng    | `nodes = Object.keys(flow.steps)`, never `flow.order`                                  | Mechanical     | P1                 | `validate-flow.ts:38-42` treats order-absent steps as valid                        | Building from `order` (F10)            |
| 50  | Eng    | Edges = flat per-step pass, not a graph walk                                           | Mechanical     | P5                 | Cycle-safety falls out of the shape, no guard needed                               | Recursive walk (F11)                   |
| 51  | Eng    | `buildGraph(flow, resolveGroup?)` signature                                            | Mechanical     | P5                 | Mirrors `validateFlow(flow, registry?)`                                            | Pure single-arg (F2)                   |
| 52  | Eng    | Synthesize a `-> END` edge labelled "no branch matched"                                | Mechanical     | P1                 | `resolve.ts:29-42` falls through; graph would contradict the engine                | Omitting it (F13)                      |
| 53  | Eng    | Extract `effectiveOrder(flow)`; refactor the 4 existing call sites                     | Mechanical     | P4                 | `resolve.ts:44,57,81,98` already duplicate it; graph would be a 5th                | A fifth copy (F14)                     |
| 54  | Eng    | Build wiring in the same PR: tsup entry + exports + size-limit                         | Mechanical     | P1                 | Without it `dist/v1/graph.*` never emits (F12)                                     | Size-limit alone                       |
| 55  | Eng    | Define `RecordedSession` + `checkSession` before the fixture is written                | Mechanical     | P1                 | A hand-authored inconsistent fixture mis-highlights silently (F3)                  | Hand-wave the format                   |
| 56  | Eng    | `LayoutAdapter` interface consumed by both site and published devtools                 | Mechanical     | P4                 | "Layout stays in the site" is incompatible with step 8                             | Two implementations (F4)               |
| 57  | Eng    | Node-count and depth ceiling in the builder, as a problem not a throw                  | Mechanical     | P5                 | The real 10x failure is one tab, not concurrency (F15)                             | No ceiling                             |
| 58  | Eng    | 25 test gaps accepted, incl. 5 property tests                                          | Mechanical     | P1                 | `fast-check` + `resolve.property.test.ts` set the repo standard                    | Five example cases                     |
| 59  | Eng    | Correct "framework-agnostic renderer" to "agnostic builder, React renderer"            | Mechanical     | P5                 | `packages/ui` is React; step 8 presumes React devtools                             | Overselling it                         |
| 60  | Eng    | State that labels render as text nodes only                                            | Mechanical     | P1                 | Public paste box; `react-markdown` is already a ui dependency                      | Leaving it implicit                    |
| 61  | Eng    | State that `validateFlow`'s `$ref` check is a no-op without a registry                 | Mechanical     | P5                 | `validate-flow.ts:68-72`; a later change would assume validation it never had      | Silence                                |
| 62  | Eng    | `publint` + type-resolution + no-leak checks on the new entry                          | Mechanical     | P1                 | Remeasuring `core/v1` does not prove the entry is isolated                         | Assuming isolation                     |

---

## Cross-Phase Themes

Concerns that surfaced independently in two or more phases' outside voices. Eight
separate model runs with no sight of each other, so repetition here is signal rather
than an echo.

**Theme 1: sequencing — the public page ships before the trust fixes.**
Flagged in **Phase 1 (CEO), Phase 2 (Design), Phase 2.5 (DX) and Phase 3 (Eng)** — all
four phases, by both voices in three of them. The plan rejects Approach A because it
"ships with `go()` untyped and `"use client"` broken, which is two bug reports in the
first week, filed by exactly the people the showcase attracted", then puts the inspector
at step 4 and `wizzard-13`/`wizzard-14` at steps 5-6. The DX subagent added the argument
that closes it: the npm-token rationale does not justify this ordering, **because typing
is a source-level TypeScript fix with no publish dependency at all.** It can ship before
or beside the inspector. Highest-confidence finding in the review.

**Theme 2: the graph builder is not the pure `FlowDefinition -> {nodes, edges}` the plan
assumes.** Flagged in **Phase 1 and Phase 3**, reached twice independently.
`GroupStep.flow` is `string | FlowDefinition` (`flow.ts:56`), and the string case is a
reference the builder has nothing to resolve against. Phase 3 then found three more
holes in the same function: nodes built from `order` silently drop steps, a recursive
walk overflows on a normal edit-and-return cycle, and the implicit `END` fallthrough at
`resolve.ts:29-42` is invisible to a one-edge-per-`Target` builder. "A traversal, not a
subsystem" is true of the shape and false of the difficulty.

**Theme 3: raw JSON is not a user interface.** Flagged in **Phase 2 and Phase 2.5**.
The design subagent named `{"$eq":[{"$get":"data.plan"},"pro"]}` as an edge label the
single biggest legibility risk; Codex's DX pass independently concluded "without
progressive disclosure the showcase is legible mainly to its authors." The DX subagent
extended it upstream: there is no typed authoring path for these expressions either, so
the same JSON is both unreadable on the page and unwritable in an editor.

**Theme 4: the docs describe a library that no longer exists.** Flagged in **Phase 2.5
by both voices**, and confirmed independently by direct grep. `defineFlow` appears in no
README; `README.md` mentions `v1` zero times and `validate` zero times. Step 7 then
deletes four packages the README still documents, and takes half the StackBlitz
playground with it. A showcase above this is a front door onto a house with no hallway.

**Theme 5: budgets and ratchets are being loosened during the largest packaging change.**
Flagged in **Phase 1, Phase 2.5 and Phase 3**. Four `.size-limit.js` entries are deleted,
none added, and the new core entry, the devtools bundle and the inspector route all
arrive unbudgeted. `wizzard-11` already exists for exactly this question and the plan
cites it nowhere.

**Theme 6: the persistence hole.** Flagged in **Phase 1 and Phase 2.5**, reached
independently. Premise 2 deletes `packages/persistence`; Premise 3 defers the `/persist`
plugin. Each premise is defended alone and their intersection is never checked, so 1.0.0
would ship with no persistence story at all. Codex's DX pass added the sharper edge:
the migration guide must then also say what existing users do with **already-stored
0.x data**, not just with their integration code.

**Theme 7: discovery, not conversion.** Flagged in **Phase 1 by both voices** and echoed
in **Phase 2.5** ("a good discovery strategy and a weak 1.0 strategy"). This is the
User Challenge and the one theme that is genuinely contested — see the Final Gate. All
four models share a blind spot on it: none was told this is an open-source library
rather than a venture, so all four applied market discipline the user has already,
deliberately, declined.

## GSTACK REVIEW REPORT

Reviewed by `/autoplan` 2026-09-03: CEO, Design, DX and Eng phases, dual voices in each
(Codex 0.153.0 `gpt-5.6-sol` + an independent Claude subagent, 8 model runs total).
Consensus: CEO 6/6, Design 5/7 + 2 single-voice criticals, DX 6/6, Eng 6/6.
62 decisions auto-decided, 2 taste decisions and 1 user challenge surfaced at the gate.
Restore point: `~/.gstack/projects/ZizzX-wizzard-packages/ZizzX-main-autoplan-restore-20260903-205503.md`
Test plan: `~/.gstack/projects/ZizzX-wizzard-packages/ZizzX-main-test-plan-20260903-210000.md`
