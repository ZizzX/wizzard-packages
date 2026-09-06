<!-- /autoplan restore point: /c/Users/Aziz/.gstack/projects/ZizzX-wizzard-packages/docs-devtools-design-autoplan-restore-20260906-223325.md -->

# Design: devtools on the v1 engine

Date: 2026-09-06
Branch: `docs/devtools-design` at `814dc8c`
Task: L5 · Plan of record: [`v1-launch.md`](v1-launch.md) row **L5** (absorbs T6, T15, T33, E4)
Status: proposal, review pending

## 1. Why a note lands first

L5 is the first row of track L that ships a user interface, and the plan wrote it against a
site that does not exist. Three facts from the tree make the note worth its cost.

**The renderer has no home yet.** The plan's dependency table says `L5 | packages/devtools |
L2b, S2's graph component` (`v1-launch.md:2200`) and the eng review resolved the duplication
risk with "one component consumed twice" (`v1-launch.md:2055`). There is no `site/`, no
`apps/`, and nothing in the repository calls `buildGraph()` or draws an SVG. The graph
renderer, the layout, the `when` pretty-printer and the four node shapes all get written for
the first time in this task. Whoever writes them first owns them; the site imports them later.
The plan had the arrow pointing the other way.

**The engine does not hand out what the panel shows.** `commit.ts` is a spread:
`{ ...state, ...patch, rev: state.rev + 1 }`. `onCommit(state, previous)` gives a plugin two
whole states, never a delta. The "per-commit diff" in the L5 row is computed by the panel or
not at all. Likewise nothing in the tree emits a `RecordedSession`; `checkSession` validates
one, `contract/binding-suite.ts` hand-writes one, and E4's record hook is the first producer.

**The version row is impossible as written.** T6 says "version aligned with the family". The
family launches at 1.0.0. `npm view @wizzard-packages/devtools versions` lists `1.0.0`,
`2.0.0` and `2.0.1`, with `latest` on `2.0.1`. A version cannot be republished, and a
rewrite that removes `WizardDevTools` is a breaking change on top of `2.0.1`. Section 6
decides this; it is the one decision in the note that is the owner's, not the code's.

## 2. What already exists

| Fact                                                                                          | Where                                                      |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `buildGraph(flow, subFlows?)` returns `{ nodes, edges }`, never throws                        | `packages/core/src/v1/graph.ts`, entry `core/graph`, 800 B |
| `GraphNode.kind` is `'step' \| 'group' \| 'end'`; a group carries `repeat`, `graph`, `opaque` | `graph.ts`                                                 |
| `GraphEdge.kind` is `'next' \| 'back' \| 'order'`, with `when` and `dangling`                 | `graph.ts`                                                 |
| `Wizard.subscribe(listener)` fires once per commit; `batch` fires once at the end             | `store.ts:28`, `store.ts:201-206`, `store.ts:404-412`      |
| `Wizard.getState()` is the plain state; `getSnapshot()` memoised on `rev`                     | `store.ts:243-245`                                         |
| `WizardState.stack` is frames `{ flow, step, key? }`; `history` holds whole stacks            | `state.ts`                                                 |
| `RecordedSession { flow, version?, frames: WizardState[] }` and `checkSession`                | `session.ts`, entry `core/session`                         |
| `knownFlows(root, subFlows)` maps every reachable flow id to its definition                   | `session.ts`, exported                                     |
| `useWizard()` returns the `Wizard` from `WizardProvider`; throws outside one                  | `packages/react/src/v1/index.tsx`                          |
| `'use client'` survives the react build only with `treeshake: false`, proven by a test        | `packages/react/tsup.config.ts`, `directive.test.ts`       |
| R-C as a flow literal (passengers, two-step sub-flow, a step after the group)                 | `contract/binding-suite.ts:101-107`                        |
| The 0.x panel: 416 lines, three tabs, `subscribeToActions` and `dispatch`                     | `packages/devtools/src/WizardDevTools.tsx`                 |

Everything in the first eight rows is reused as is. The 0.x panel is replaced: its data source
(`IWizardStore.subscribeToActions`, a Redux-style action log) has no v1 counterpart, its "Jump"
button dispatches `RESTORE_SNAPSHOT` into a store that no longer has a reducer, and its footer
prints a hard-coded `v2.1.0` against a `package.json` that says `2.0.1`.

Not in the tree, and therefore written here: a layout, a `when` pretty-printer, a state diff,
a session recorder, an SVG renderer, and the R-A and R-B fixtures the L5 acceptance row names.

## 3. The model

Devtools is a docked React panel that watches one `Wizard` and draws three things about it:
the graph of the flow it is standing in, the state it committed last, and the list of commits
it has made since the panel mounted. It never navigates, never writes, and never throws into
the host. Everything it shows is derived from `getState()` at each `subscribe` notification.

```
  host app                                   @wizzard-packages/devtools
  ┌────────────────────────┐                 ┌───────────────────────────────────────────┐
  │ <WizardProvider>       │   useWizard()   │ <WizardDevtools wizard? subFlows? layout?> │
  │   <MyForm/>            │ ──────────────▶ │   subscribe ─▶ getState() ─▶ commits[]     │
  │   <WizardDevtools/>    │   or `wizard=`  │                                            │
  └────────────────────────┘                 │   ┌─────────┐ ┌───────────┐ ┌──────────┐  │
                                             │   │ Graph   │ │ State     │ │ Commits  │  │
     @wizzard-packages/core                  │   │ tab     │ │ tab       │ │ tab      │  │
     ┌──────────┐ ┌──────────┐               │   └────┬────┘ └─────┬─────┘ └────┬─────┘  │
     │ graph    │ │ session  │ ◀── imports ──┤        │            │            │        │
     │ buildGraph knownFlows │               │  FlowGraphView   diff()     record()      │
     │          │ checkSession               │  layoutGraph()   (pure)     (pure)        │
     └──────────┘ └──────────┘               │  formatExpr()                              │
                                             └───────────────────────────────────────────┘
```

### 3.1 Which graph

The panel draws the flow that owns the top frame, not always the root. Inside a repeat group
the top frame's `flow` names the sub-flow; `knownFlows(root, subFlows)` resolves the id. A
breadcrumb above the graph shows the stack: `root › passengers[key=p2] › details`. Clicking a
crumb draws that flow instead (drill out); the panel returns to the top frame's flow on the next
commit. This is what makes group frames legible without compound nodes: the parent graph shows
the group as one double-bordered box, the child graph shows the steps. Section 8 records the
compound alternative.

Highlighting, all from `WizardState`:

- **active**: the top frame's `step`, filled accent.
- **visited**: ids in `state.visited`, solid outline; unvisited, dashed outline.
- **taken edge**: the edge from the previous commit's top step to the current one, if the
  graph has one; drawn thick. A `go()` that jumped over no edge highlights no edge.
- **selected**: the node the person inspected (keyboard or click). Inspecting never navigates.

### 3.2 The four shapes

| `kind`                   | Shape                           | Extra                                                  |
| ------------------------ | ------------------------------- | ------------------------------------------------------ |
| `step`                   | rounded rect                    | `deferred` adds a small clock glyph as text            |
| `group` without `repeat` | double-bordered rect            | label `flowId`, `N steps`                              |
| `group` with `repeat`    | stacked rect (two offset rects) | label `flowId`, `over: <formatExpr>`                   |
| `end`                    | filled circle                   |                                                        |
| `group` with `opaque`    | dashed rect                     | label is the reason: `unresolved`, `cycle`, `too deep` |

The same table drives the site's inspector later (`v1-launch.md:1415`). Labels are SVG `<text>`
nodes with the label as a text child; no `innerHTML` anywhere in the package. A label longer
than 24 characters is cut with an ellipsis and carried whole in `<title>` and in the table
mirror.

Edges: `next` solid, `order` solid grey, `back` dashed and routed to the right of the column,
`dangling` red with the target id struck through. An edge with `when` carries
`formatExpr(when)` as its label, cut at 32 characters, full text in `<title>` and in the mirror.

### 3.3 Layout (proposal)

```ts
// proposal — packages/devtools/src/layout.ts
export interface Positioned {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface PositionedGraph {
  nodes: readonly Positioned[];
  edges: readonly (GraphEdge & { points: readonly [number, number][] })[];
  width: number;
  height: number;
}
export function layoutGraph(
  graph: FlowGraph,
  opts?: { gapX?: number; gapY?: number }
): PositionedGraph;
```

A layered layout, top to bottom, with three rules and nothing else:

1. **Layer** = longest path from a source over `next` and `order` edges. `back` edges are
   ignored for layering. A cycle among `next` edges (a `when`-gated loop) is broken at the
   edge that closes it during the DFS, so layering always terminates.
2. **Column** within a layer = order of first appearance in `graph.nodes`, which is
   `Object.keys(flow.steps)`, which is the author's declaration order. No barycenter pass.
3. **Size**: every node is `w = 160, h = 40` in user units; the SVG uses a `viewBox`, so the
   host scales it by CSS. A repeat node is `h = 48` for the second rect.

`END` sits on the last layer. Positions are a pure function of the graph, so they are frozen
per flow by memoising on the `FlowGraph` identity; a commit never moves a node. A host that
wants dagre or elk passes `layout={(graph) => positioned}` and the renderer draws its answer.
The plan called this `LayoutAdapter`; it is a prop, not a type the host implements.

Ceiling, stated: no edge crossing minimisation. A flow whose branches fan out and rejoin will
draw crossings. The upgrade is a barycenter ordering pass inside rule 2; it is ~40 lines and
lands when a real flow looks wrong, not before.

### 3.4 `formatExpr` (proposal)

```ts
// proposal — packages/devtools/src/format.ts
export function formatExpr(expr: Expr, max = 32): { short: string; full: string };
```

Infix, one operator per node: `{ $get: 'data.plan' }` → `data.plan`; `{ $eq: [a, b] }` →
`a == b`; `$ne`, `$gt`, `$gte`, `$lt`, `$lte` likewise; `$and` joins with `&&`, `$or` with
`||`, `$not` prefixes `!`; `$in` → `a in [..]`; string literals quoted; anything the printer
does not know falls back to `JSON.stringify` of that node. `full` is the untruncated text,
`short` is `full` cut at `max` with an ellipsis. The plan places this in `core/expr`; that
entry is the expression builder at a 200 B budget, and the printer would triple it for every
bundle that imports the builder. Devtools owns the printer and exports it; the site imports it
from devtools. Section 8, Q2.

### 3.5 The state panel

Three regions, top to bottom:

1. **Frame line**: `status`, the breadcrumb, `rev`, `nav`. One line.
2. **Diff**: what the selected commit changed against the one before it, as rows
   `path | before | after`. `data` and `ctx` are diffed by path, recursively through plain
   objects, arrays compared by index; `errors`, `visited`, `completed`, `dirty`, `busy` by
   value; `stack` and `history` as frame lists. Capped at 200 rows with a final "… N more" row.
   The first commit shows against the state the panel mounted with.
3. **Full state**: the selected commit's `WizardState` as pre-formatted JSON, collapsed by
   default behind a `<details>`.

```ts
// proposal — packages/devtools/src/diff.ts
export interface Change {
  path: string;
  before: unknown;
  after: unknown;
}
export function diffState(previous: WizardState, next: WizardState, cap = 200): Change[];
```

### 3.6 The commit log

One row per `subscribe` notification: `#rev`, the top step after the commit, and the count of
changes. Selecting a row pins the State tab and the graph highlight to that commit; the panel
stays pinned until the person clicks "live" or the row for the newest commit. The log is
capped at 500 entries; older ones are dropped from the front. A `batch()` is one row, because
the store notifies once (`store.ts:404-412`).

This replaces the 0.x Actions tab. It does not replace "Jump": v1 has no `RESTORE_SNAPSHOT`,
and the S2 principle "inspecting never navigates" applies to devtools too. A host that wants
to restore a state builds a wizard from `state` (`WizardOptions.state`), which is what the
site's replay mode does.

### 3.7 The record hook (E4)

```ts
// proposal — packages/devtools/src/record.ts
export interface Recorder {
  session: () => RecordedSession;
  stop: () => void;
}
export function recordSession(wizard: Wizard): Recorder;
```

`recordSession` pushes `getState()` at subscription and after every notification, and `session()`
returns `{ flow: getFlow().id, version: getFlow().version, frames }`. It is pure over the
`Wizard` interface, so a test or an e2e spec can call it without React, and its output passes
`checkSession` by construction (monotonic `rev` and `nav`, current step in `visited`) — a test
asserts that, not the author. The panel exposes it as a "Record" toggle and, once stopped,
"Copy JSON" (clipboard) and an `onRecord(session)` prop for hosts that want the file elsewhere.
Frames are whole states; a 1000-commit session with a 10 kB `data` is 10 MB in memory. The
recorder caps at 2000 frames and the panel says so on the button.

### 3.8 Chrome

A docked panel the host places; no floating button, no portal, no `position: fixed`
(`v1-launch.md:1414`). It fills its container, minimum width 320 px. Colours come from six CSS
custom properties on the root element with defaults that meet 4.5:1 on their default
background: `--wz-bg`, `--wz-fg`, `--wz-muted`, `--wz-accent`, `--wz-line`, `--wz-danger`.
Body text 14 px, never below 12 px in the mirror table. No typeface is set; it inherits.

Tabs are `<button role="tab">` in a `<div role="tablist">`; the graph is one focus stop
(`tabindex=0` on the `<svg>`), arrow keys move the selection between nodes in layout order,
Enter inspects, Escape clears; Tab leaves the graph. A visually hidden `<table>` mirrors nodes
and edges with their full labels, so a screen reader reads the flow as rows. Zoom is two
buttons (`+`, `−`) that change the viewBox; panning is the container's scrollbars. Motion:
none, so `prefers-reduced-motion` has nothing to honour.

States the panel can be in, and what each shows:

| State                               | Graph tab                                                                                                                      | State tab        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| no wizard (no provider, no prop)    | one line: `[wizzard] devtools needs a wizard. Render inside WizardProvider or pass wizard=. docs/errors.md#devtools-no-wizard` | same             |
| `status: 'init'` (before `start()`) | graph drawn, no active node                                                                                                    | "no commits yet" |
| empty flow (`steps: {}`)            | "flow has no steps"                                                                                                            | frame line only  |
| opaque group                        | dashed node with reason                                                                                                        | n/a              |
| 200 nodes                           | draws; scrollable; layout under 50 ms                                                                                          | n/a              |
| renderer throws                     | the boundary: `[wizzard] devtools failed to render: <message>. The wizard is unaffected. Record a session and file an issue.`  | same             |
| wizard destroyed                    | last state stays; frame line says `destroyed`                                                                                  | same             |

## 4. Invariants

### 4.1 Devtools never mutates the wizard

The panel calls `subscribe`, `getState`, `getFlow` and nothing else. A test mounts the panel,
drives every control, and asserts `getState()` is the same object before and after. The prop
types make this structural: the panel takes `Pick<Wizard, 'subscribe' | 'getState' | 'getFlow'>`.

### 4.2 Devtools never throws into the host

Every render path sits under one error boundary that renders the message in 3.8. A layout
override that throws, an `Expr` shape the printer has never seen, a `stack` naming a flow that
`knownFlows` cannot find — all land in the boundary or in a fallback (the printer's
`JSON.stringify`, the breadcrumb's `unknown flow "x"`), never in the host's tree.

### 4.3 One notification, one commit row

`rev` moves once per change and listeners fire once (`store.ts:28`). The log length equals the
number of notifications received; a `batch` of three `set` calls is one row, and its diff shows
three paths.

### 4.4 Positions are a function of the graph

Same `FlowGraph` object, same positions, across commits and re-renders. A different flow (after
`patchFlow`) is a different object and gets a fresh layout. Tested by identity on the
memoised result.

### 4.5 Labels are text

No string from a flow reaches the DOM except as a text node or an attribute value React
escapes. A step id of `<img src=x onerror=alert(1)>` renders as those characters. One test.

### 4.6 A recorded session validates

For any sequence of `next`/`back`/`go`/`set`/`patch` on any of the three fixtures,
`checkSession(record(w).session(), flow, subFlows)` returns `[]`. Property test.

### 4.7 Inside a group, the panel shows the child

With R-C at `passengers[key=p2] › details`, the graph tab draws the sub-flow with `details`
active, the breadcrumb has three crumbs, and the parent crumb draws the root with
`passengers` active.

## 5. Where it slots

### 5.1 Package shape

```
packages/devtools/
  src/
    index.ts            'use client'; exports below
    WizardDevtools.tsx  the docked panel (glue)
    FlowGraphView.tsx   SVG renderer: shapes, highlight, keyboard, mirror table
    StatePanel.tsx      frame line, diff rows, full state
    CommitLog.tsx       the list, pin/live
    layout.ts           layoutGraph (pure)
    format.ts           formatExpr (pure)
    diff.ts             diffState (pure)
    record.ts           record (pure over Wizard)
    boundary.tsx        the error boundary
    *.test.ts(x)        one file per module, plus directive.test.ts
  tsup.config.ts        treeshake: false (the react lesson), external react/react-dom/core/react
  package.json          see 5.2
  README.md             ≤ 60 lines (D4)
```

Public surface, all named exports: `WizardDevtools`, `FlowGraphView`, `layoutGraph`,
`formatExpr`, `diffState`, `record`, and the types `WizardDevtoolsProps`, `PositionedGraph`,
`Positioned`, `Change`, `Recorder`. The site later imports `FlowGraphView`, `layoutGraph` and
`formatExpr` from here; that is the "one component, two consumers" of `v1-launch.md:2055`,
with the component living in the package that ships first.

```ts
// proposal — WizardDevtoolsProps
export interface WizardDevtoolsProps {
  wizard?: Pick<Wizard, 'subscribe' | 'getState' | 'getFlow'>; // default: useWizard()
  subFlows?: SubFlows; // to resolve string groups
  layout?: (graph: FlowGraph) => PositionedGraph; // default: layoutGraph
  onRecord?: (session: RecordedSession) => void;
  defaultTab?: 'graph' | 'state' | 'commits';
}
```

### 5.2 Dependencies

`@wizzard-packages/react` moves from `dependencies` to `peerDependencies`. As a dependency, a
host with a different installed copy of the react binding would give devtools a different
`WizardContext` object, and `useWizard()` inside the panel would throw "must be used inside a
WizardProvider" while standing inside one. Peers are resolved once. `react` and `react-dom`
stay peers at `>=18`; `useSyncExternalStore` is the floor. Core imports are the subentries
`@wizzard-packages/core/graph` and `@wizzard-packages/core/session` plus types; nothing from
the main entry, so devtools does not pull the engine twice.

### 5.3 Budget

A new line in `.size-limit.js`:

```js
{ name: 'devtools', path: 'packages/devtools/src/index.ts', limit: '<measured + 10 %>', gzip: true,
  ignore: ['react', 'react-dom', '@wizzard-packages/react', '@wizzard-packages/core/graph', '@wizzard-packages/core/session'] },
```

The limit is written from a measurement in PR 2, not guessed here, per the L9 rule. The honest
expectation is 5–7 kB gzip for the whole panel: the renderer and the panel are most of it, the
pure modules under 1.5 kB together. Devtools is a development-time dependency, so the budget
exists to catch accidental growth (a JSON viewer, a theme system), not to fight for bytes. The
`core-v1 graph` and `core-v1 session` lines do not move: nothing in core changes.

### 5.4 Build

`'use client'` at the top of `index.ts`, `treeshake: false` in `tsup.config.ts`, and a copy of
`packages/react/src/v1/directive.test.ts` that opens `dist/index.js` and `dist/index.cjs`. The
memory that motivated it: rollup drops the directive, esbuild keeps it, and the Next.js example
is the regression guard. That example gains the panel (5.6) so the guard covers devtools too.

### 5.5 Fixtures

`contract/fixtures.ts` exports `flowA`, `flowB`, `flowC` (and `subFlowsC`), the R-A / R-B /
R-C flows the plan describes at `v1-launch.md:37-41`, as JSON literals: A with a `when` branch
and a `back` override; B with a `deferred` step and a `validate` expression; C moved from
`contract/binding-suite.ts:101-107`, which then imports it. The site (S3) and the inspector
(S2) consume the same file later. Three flows, one file, no app.

### 5.6 The e2e

`examples/next-app` mounts `<WizardDevtools />` under its form. The existing Playwright
project `next` (port 3100) gets one spec: click Next, assert the SVG's `aria-current` node
changed and the commit log has one more row. This is the "one e2e" of `v1-launch.md:793` and
the second consumer of the `'use client'` guard.

### 5.7 Version and changeset

See section 6. The changeset is `major` for `@wizzard-packages/devtools` regardless of the
number chosen; the 0.x `WizardDevTools` export is removed, not aliased.

## 6. Decisions for the gate

**D1 — the version.** T6 cannot be met literally. Options:

- (a) **`3.0.0`**, released with the family's 1.0.0 and documented in the README support
  matrix as "devtools 3.x ↔ core 1.x". Semver-correct: a breaking change above `2.0.1`.
  `npm install @wizzard-packages/devtools` resolves to it. Cost: the number does not match.
- (b) **`1.0.0` republished** — impossible; npm refuses.
- (c) **Skip to `10.0.0`** so that every future family major can be `10 + N` — a convention
  nobody will guess.

Recommendation: (a), and add devtools to the changeset `fixed` group only if the group is
willing to move to the higher number, which it is not. It stays outside `fixed`; its major bumps
are manual and mirror core's. The README row is the alignment.

**D2 — where the renderer lives.** In devtools, exported, imported by the site later. The
alternative (a `packages/graph-react` package) adds a publish target for one consumer pair;
rejected on hard rule 6's own logic — entries and packages exist for a size boundary, and the
site is not a bundle that pays for devtools' extra bytes.

**D3 — the printer lives in devtools, not `core/expr`.** Q2 in section 8.

**D4 — no time travel.** The 0.x "Jump" is dropped; the panel inspects and never navigates.

**D5 — the record hook is in (E4).** It is 30 lines and it is the fixture generator for S2's
replay mode and for every bug report.

## 7. Test plan

**Pure modules, unit and property.**

| Module | Test                                                                                        |
| ------ | ------------------------------------------------------------------------------------------- |
| layout | property: no two node rectangles overlap; every edge's endpoints are laid-out nodes         |
| layout | property: for every `next`/`order` edge not closing a cycle, `y(to) > y(from)`              |
| layout | property: terminates and is deterministic on random graphs with cycles, 0..200 nodes        |
| layout | `back` edges do not change any node position (same graph with back edges removed)           |
| layout | 200-node chain under 50 ms; memoised result is identical by reference                       |
| format | table: each operator, nested and/or, string and number literals, unknown op → JSON          |
| format | `short` is at most `max` chars and ends with `…` when cut; `full` is untouched              |
| diff   | added, removed, changed paths in `data`; arrays by index; `stack` as frames; cap at 200     |
| diff   | identical states → `[]`; first commit against the mount state                               |
| record | property (4.6): any op sequence on A/B/C → `checkSession` returns `[]`; `stop` unsubscribes |
| record | cap at 2000 frames keeps the newest                                                         |

**Renderer, unit (jsdom, testing-library).**

| §   | Test                                                                                                |
| --- | --------------------------------------------------------------------------------------------------- |
| 3.2 | R-A, R-B, R-C each render; node count equals `graph.nodes.length`; shape per `kind`                 |
| 3.2 | an opaque group draws the dashed rect with its reason                                               |
| 3.2 | a dangling edge is drawn and marked; a `when` edge carries the formatted label                      |
| 3.8 | keyboard: focus the svg, ArrowDown selects the next node, Enter inspects, Escape clears; Tab leaves |
| 3.8 | the mirror table lists every node and edge with full labels                                         |
| 4.5 | a hostile step id renders as text (`queryByRole('img')` is null)                                    |
| 3.3 | a `layout` prop is called with the graph and its positions are used                                 |

**Panel, unit.**

| §   | Test                                                                                  |
| --- | ------------------------------------------------------------------------------------- |
| 3   | inside `WizardProvider`: after `next()`, the active node and the frame line update    |
| 3   | with `wizard=` and no provider: same                                                  |
| 3.8 | with neither: the one-line message, and nothing throws                                |
| 4.7 | R-C inside `passengers[p2]`: child graph drawn, three crumbs, parent crumb drills out |
| 3.6 | three `set` calls in `batch` → one commit row with three diff rows                    |
| 3.6 | selecting an older row pins the state; "live" unpins                                  |
| 4.1 | drive every control; `getState()` identity unchanged                                  |
| 4.2 | a throwing `layout` prop renders the boundary message; the host tree still renders    |
| 3.7 | Record → Stop → `onRecord` receives a session that passes `checkSession`              |
| 5.4 | `'use client'` in the first two lines of both dist files                              |

**e2e.** One Playwright spec in project `next` (5.6).

**Size.** The `devtools` line in `.size-limit.js`, `pnpm check:pack` clean (publint, attw).

## 8. Open questions

| #   | Question                                                      | Default if nobody decides                                                                                                                     |
| --- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1  | Compound (nested) group nodes instead of drill-in?            | Drill-in (3.1). Compound needs recursive layout inside a fixed box; revisit if the site's inspector cannot show a group's inside at a glance. |
| Q2  | `formatExpr` in `core/expr` as the plan says, or in devtools? | Devtools. `core/expr` is the builder at 200 B; the printer is a rendering concern.                                                            |
| Q3  | Should the panel render on the server?                        | No. It is `'use client'`; a server component that imports it gets the directive boundary, as the react binding does.                          |
| Q4  | Theme: dark default, light default, or inherit?               | Inherit via the six custom properties; defaults are light-on-dark with 4.5:1 contrast.                                                        |
| Q5  | Does `record` belong in `core/session` beside `checkSession`? | No. It is 30 lines over the `Wizard` interface and it would add to a budgeted entry; devtools exports it.                                     |
| Q6  | The site later wants a Vue graph?                             | Out of scope; `layoutGraph` and `formatExpr` are framework-free and can move to a shared package then.                                        |

## 9. What the code says that the plan does not

| Finding                                                                                                              | Where                         |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| No `site/` exists; `L5` depends on "S2's graph component" that was never written. The renderer is born here.         | 1, `v1-launch.md:2200`        |
| `onCommit` and `subscribe` give whole states; the per-commit diff is the panel's to compute.                         | 1, `commit.ts`                |
| `@wizzard-packages/devtools@1.0.0` and `2.0.1` are on npm; "aligned with the family" cannot be `1.0.0`.              | 1, 6                          |
| `@wizzard-packages/react` is a `dependency` of devtools; as a peer it would share the provider's context.            | 5.2                           |
| The plan's infix printer "from `core/expr`" does not exist; `core/expr` is the builder at 200 B.                     | 3.4, `.size-limit.js:162-164` |
| `LayoutAdapter` appears only in design docs; it becomes the `layout` prop.                                           | 3.3                           |
| `graph.ts` has no `problems` array (the inspector note's draft); `opaque` and `dangling` carry the reports.          | 2, `graph.ts`                 |
| `flow-inspector.md` leans to compound, collapsible groups; `v1-launch.md:1415` fixes a flat double border.           | 3.1, Q1                       |
| The 0.x panel's "Jump" dispatches `RESTORE_SNAPSHOT`; v1 has no such path and S2 forbids navigation from inspection. | 3.6                           |
| The 0.x panel prints a hard-coded `v2.1.0`; `package.json` says `2.0.1`.                                             | 2                             |
| R-A and R-B exist only as prose; R-C is a literal inside a test file.                                                | 5.5                           |

## 10. Puzzle map

Contracts first, blocks second, glue last. Each block is one file, one test file, verifiable
alone.

```
  CONTRACTS (types, no code)
    PositionedGraph / Positioned      layout.ts
    Change                            diff.ts
    Recorder                          record.ts
    FlowGraphViewProps                FlowGraphView.tsx
    WizardDevtoolsProps               WizardDevtools.tsx

  BLOCKS (pure, or one component)              verified by
    layoutGraph(graph)                          layout.test.ts (property)
    formatExpr(expr)                            format.test.ts (table)
    diffState(prev, next)                       diff.test.ts
    recordSession(wizard)                              record.test.ts (property vs checkSession)
    FlowGraphView                               FlowGraphView.test.tsx
    StatePanel, CommitLog                       panel tests
    fixtures flowA/B/C                          used by every test above

  GLUE
    WizardDevtools                              WizardDevtools.test.tsx, next-app e2e
```

Three PRs, in order:

1. **Pure modules and fixtures.** `contract/fixtures.ts`; `layout.ts`, `format.ts`, `diff.ts`,
   `record.ts` with their tests; the 0.x `WizardDevTools.tsx` deleted and `index.ts` exporting
   the four functions; `package.json` peers; `tsup` `treeshake: false`. No UI yet. The package
   builds, `check:pack` passes, the size line is measured and written.
2. **Renderer and panel.** `FlowGraphView`, `StatePanel`, `CommitLog`, `boundary`,
   `WizardDevtools`, their tests, `directive.test.ts`, the README, `docs/errors.md#devtools-no-wizard`,
   the size line re-measured.
3. **Consumer proof.** `examples/next-app` mounts the panel; the Playwright spec; the
   `major` changeset with the version from D1; the L5 row in `v1-launch.md` amended with what
   changed (renderer home, version, printer home).

## 11. Amendments from the Phase 1 review (2026-09-06)

The review below amended the proposal. These paragraphs override the sections they name.

**§3.6, §3.7 — the refusal log (X1).** A navigation that is refused never commits, so
`subscribe` cannot report it. Core gains one optional hook:

```ts
// core — navigate.ts Hooks (addition)
afterResult?: (intent: NavIntent, result: NavResult) => void;
```

fired from the store's single navigation wrapper after `next`/`back`/`go` resolve, for every
outcome including `superseded`; never from `navigate.ts`, never for `cancel()`. Cost ~50 B in
`core-v1`; the budget line moves 5.0 → 5.1 kB with this reason. Devtools exports
`devtools(): Hooks & { refusals: readonly Refusal[] }`; a host passes it to `createWizard` and
to the panel (`plugin={dt}`), and the Commits tab lists `✗ next: invalid (email) by details`
rows between commits. Without the plugin the tab says what to install.

**§3.7 — the export is self-contained and redactable (X2).** `record` is renamed
`recordSession(wizard, { redact? })`; `redact(state) => state` runs on every frame before it
is stored (E-M7). "Copy JSON" and `onRecord` hand over a bundle:

```ts
export interface SessionBundle {
  flow: FlowDefinition;
  subFlows?: SubFlows;
  session: RecordedSession;
}
```

which is what S2's replay mode loads. A bug report is one file.

**§5.1 — two entries (X3).** `@wizzard-packages/devtools` (client directive; `WizardDevtools`,
`FlowGraphView`, `devtools`) and `@wizzard-packages/devtools/headless` (no directive, no React;
`recordSession`, `diffState`, `layoutGraph`, `formatExpr`, `checkSession` re-exported for
convenience is **not** done — import it from core). The headless exports are documented as
"used by the docs site; may change in a minor". Each entry has its own `.size-limit.js` line.

**§3.1 — live `when` values (X4).** Inspecting a node shows `formatExpr(when).full` and, when
`stack.length === 1`, `evaluate(when, { data, ctx })` as `→ true` / `→ false`; inside a group
the value is replaced by "value needs the group's loop scope". `ExprError` is shown inline.

**§7 — diagnosis scenarios (X8).** Three planted faults in `contract/fixtures.ts`: `flowA`
with a `validate` that fails on `email`; `flowB` with a `when` that hides the next step under
the fixture's data; `flowC` with a duplicate `keyBy` value. One test per fault asserts the
panel's text names the cause: the refusal row's field, the node's `→ false`, the
`repeat-keys` refusal.

**§5.2 — `WizardContext` is exported from `react/v1`** so the panel can read it with
`useContext` and render a message instead of letting `useWizard()` throw.

**§1 — competitive note.** Stately discontinued its free graph inspector for a paid product.
This project is MIT with no hosted service, so the graph view stays free; the same fact means
it must stay cheap, which is what the headless entry, the `layout` prop and the deferred
crossing pass are for.

**§6 — decisions restated.** D1 unchanged (owner's call at the gate). D2 unchanged. D3
confirmed. D4 unchanged. D5 confirmed and widened by X2.

## 12. Amendments from the Phase 2 design review (2026-09-06)

These paragraphs override §3.1, §3.5–§3.8 and §7 where they differ.

**12.1 The diagnostic strip.** A one-line strip sits above the tabs and is always visible:
`location · time · outcome`. Location is the breadcrumb (`root › passengers[p2] › details`).
Time is `live` or `pinned #rev (+N new)`. Outcome is the latest navigation result:
`✓ next → payment`, `✗ next blocked · details · email: required`, `… next pending`, or
`— no navigation yet`. A refusal is therefore visible on the default Graph tab without a tab
switch; the outcome text is a button that opens the refusal in the Activity tab. Tabs never
switch on their own. The strip's outcome segment is the `aria-live="polite"` region; it
announces outcomes and mode changes only, never every commit.

**12.2 Activity, not Commits.** The third tab is **Activity**: one ordered list of commits
(`#rev · step · N changes`) and refusals (`✗ next · from details · invalid · email`) and
pending intents (`… go(payment)`, replaced by its outcome). A refusal row opens a detail
with: the attempted action, the originating step, the reason and `by`, the `errors` map, and
the state observed at the time (`#rev` it happened after). Selecting a refusal pins the panel
to that state. Rows are keyboard-activatable (`role="listbox"`, arrow keys, Enter).

**12.3 Three independent concepts.**

| Concept        | Set by                             | Reset by                                                                                 |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| observed time  | selecting an Activity row → pinned | "Return to live"; selecting the newest row                                               |
| inspected flow | a breadcrumb crumb                 | "Follow current flow" (a button that appears once a crumb was chosen); never by a commit |
| selected node  | click / arrows on the graph        | Escape; changing the inspected flow                                                      |

A pinned row that leaves the 500-entry ring keeps its snapshot in the pin itself and is
labelled `outside retained history`; the panel never silently shows a different state.

**12.4 "Taken edge" is inferred.** The thick edge is drawn only when exactly one edge joins
the previous commit's top step to the current one, and its `<title>` and the mirror row say
`inferred from consecutive states`. Zero or several candidates: no edge is emphasised.

**12.5 Recording carries outcomes.** The bundle grows two fields:

```ts
export interface SessionBundle {
  flow: FlowDefinition;
  subFlows?: SubFlows;
  session: RecordedSession; // core format, unchanged
  outcomes: readonly { afterRev: number; intent: NavIntent; result: NavResult }[]; // from the plugin; [] without it
  meta: { frames: number; outcomes: number; redacted: boolean; capped: boolean; bytes: number };
}
```

`recordSession` stops at the cap (2000 frames), marks `capped: true`, and keeps the recording
until the person starts a new one; the §7 test "cap keeps the newest" is replaced by "cap
stops and marks". Named resolvers are not in the bundle; the README says a bundle replays
structure and data, not resolver behaviour.

**12.6 Export preview.** "Copy JSON" opens a preview first: frame and outcome counts, size in
kB, `redaction hook: ran / not configured`, `refusals: captured / plugin not installed`, and
the JSON itself in a read-only `<textarea>` (which is also the fallback when the clipboard
call is rejected: the text is selected and focus moves into it). Buttons: Copy, Close. Copy
states: idle → copying (button disabled) → copied (2 s label) or failed (label + the textarea
stays focused). The word "safe" appears nowhere.

**12.7 More states.**

| Situation                             | The person sees                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| navigation pending (`status: 'busy'`) | strip outcome `… next pending`; Activity row `… next` until replaced                         |
| no row selected on the State tab      | "select an activity row, or stay live" (live shows the latest commit)                        |
| selected commit changed nothing       | "no changes in this commit"                                                                  |
| diff walk capped / rows capped        | a final row `… N paths not shown (cap)` with a "show all" button that lifts the row cap once |
| frames dropped by redact              | strip note `⚠ N frames dropped by redact`; bundle `meta.dropped`                             |
| plugin absent                         | Activity header: "refusals are not captured — pass `devtools()` to `createWizard`"           |
| `when` value withheld inside a group  | inspector shows `Not evaluated (needs the group's loop scope)`, never `false`                |
| renderer error                        | the Graph tab alone shows the boundary text; strip, State, Activity and export keep working  |

**12.8 Responsive by container width** (`ResizeObserver` on the panel root; no viewport
queries). Wide (≥ 720 px): graph left, inspector right (280 px), strip full width. Narrow
(< 720 px): stacked — strip, tabs, content; the inspector is a bottom sheet inside the panel
(not a portal) that returns focus to the node on close; diff rows render as `path` then two
labelled lines `before` / `after`. Height: the panel fills its container; the content area is
the single scrolling surface (the graph scrolls inside it). The initial zoom is "Fit graph"
(whole graph visible) unless that makes labels smaller than 11 px, in which case it is 1×
with the active step centred. Buttons: `+`, `−`, `Fit`, `Center` (44 px targets). Zoom anchors
on the centre of the visible area.

**12.9 The inspector.** Opens on Enter or click; lives in the right column (wide) or the bottom
sheet (narrow); content order: id and kind; flow context (crumb); status (`active`, `visited`,
`unvisited`); `when` printed, then `→ true` / `→ false` / `Not evaluated`; `deferred`; edges
in and out with their `when`; for a group node, `flowId`, step count, `repeat.over` printed.
Escape closes and returns focus to the node. It persists across commits until closed or the
inspected flow changes.

**12.10 Accessibility contract.** The `<svg>` has `role="application"`,
`aria-roledescription="flow graph"`, `tabindex="0"`, and `aria-activedescendant` naming the
selected node's `<g id>`; each node `<g>` has `role="img"` and `aria-label` `"step details,
active, visited"`. Tabs: roving tabindex, `aria-controls`/`aria-labelledby`. Focus ring: 2 px
solid `--wz-accent` outline with 2 px offset on nodes, rows and buttons. Active vs selected:
active is a fill, selected is the ring; both can apply. Graph strokes and text meet 3:1 and
4.5:1 against `--wz-bg`. The mirror table is reachable: a "Table" toggle beside the zoom
buttons shows it in place of the SVG for sighted keyboard users and high-zoom readers; it is
also always present for assistive technology. Targets ≥ 44 px on every button.

**12.11 Diff presentation.** Rows: `path`, `before`, `after`; an added path shows `—` in
`before`, a removed one `—` in `after`; `null` prints `null`, `undefined` prints `missing`;
strings over 80 characters are cut with a "more" toggle; objects print as compact JSON with
the same toggle. Paths use `getPath` syntax (`data.items[2].name`).

**12.12 Tests added.** An e2e "diagnosis journey" in the Next.js example: start on the Graph
tab, submit an invalid step, read the strip's refusal without changing tabs, open it, inspect
the field, export a bundle and assert it contains the outcome. Variants: narrow container
(390 px) and keyboard-only. Unit: the three concepts in 12.3 are independent (pinning does not
change the inspected flow; a commit does not reset the crumb); a pinned row past the ring keeps
its snapshot; "Not evaluated" appears inside a group; renderer error leaves Activity usable.

**12.13 Default tab is `graph`.** `defaultTab` defaults to `'graph'`; the prop exists for a
host that embeds the panel beside its own graph.

**12.14 Legend.** A `<details>` labelled "Legend" sits at the end of the graph toolbar; open,
it lists the five node shapes, the four edge styles and the three highlights (active, visited,
selected) as the same SVG fragments the graph uses, with one word each. Closed by default;
its state is remembered in `sessionStorage` under `wz-devtools-legend`.

**12.15 Toolbar.** Under the strip, one row of tab-independent controls, left to right:
tabs (Graph / State / Activity) · `Record` / `Stop` (with the frame count while recording) ·
`Copy JSON` (enabled once a recording exists) · on the Graph tab only: `+`, `−`, `Fit`,
`Center`, `Table`, Legend. Every control is a `<button>` with a visible label; icons are not
used.

**12.16 Inspection reads the observed state.** The inspector and the `when` value use the
state the panel is observing: the live state, or the pinned row's snapshot. The inspector's
status line says which (`live` / `pinned #rev`). Pinning does not clear the selected node;
the inspector re-renders against the pinned state.

**12.17 Opening a sub-flow before the wizard visits it.** A group node's inspector has an
"Open sub-flow" button when the group resolves (not `opaque`); it sets the inspected flow to
the child, with a crumb `root › passengers (preview)`; "Follow current flow" returns. No
`loop` scope exists there, so every `when` is `Not evaluated`.

**12.18 Activity tab states.** No wizard: the one-line message. Before the first
notification: "no activity yet". At the 500-row ring: header "showing the last 500". Wizard
destroyed: rows stay, header "wizard destroyed". Plugin absent: the header line from 12.7.

**12.19 Label width.** Truncation stays character-based (24 for nodes, 32 for edges) with the
ceiling named: a host font wider than 8 px per character at 14 px can overflow the 160-unit
box; the text carries `textLength="144"` and `lengthAdjust="spacingAndGlyphs"` as the
backstop so it never crosses the border.

**12.20 Motion.** None, by decision; a commit-to-commit change is signalled by the strip's
outcome text and the live region, not by animation.

---

<!-- /autoplan Phase 1: CEO review (SELECTIVE EXPANSION, auto-decided). Appended 2026-09-06. -->

## Pre-review system audit

- Branch `docs/devtools-design` at `a3f42d2` on top of `main` `814dc8c`; worktree clean.
- `CLAUDE.md` (21 lines) routes skills; `AGENTS.md` (175 lines) carries the hard rules: one
  entry per size boundary (A3: tsup entry + `exports` + `.size-limit.js` in the same PR), the
  error-message template (A4), no assistant attribution. `TODOS.md` holds two P2 items
  (`url-sync`, a11y contract), neither blocking L5.
- Design docs: `v1-launch.md` (plan of record), `group-traversal.md` (L9, shipped),
  `flow-inspector.md` (S2, superseded in parts by `v1-launch.md`).
- UI scope: yes (layout ×25, component ×7, button ×4). DX scope: yes (a published npm
  package with a React API and a headless API).
- Codex: `codex-cli 0.153.0`, auth and model probe OK. Both voices run per phase.

## Step 0A. Premise Challenge

| #   | Premise (from the note)                                  | Verdict                                                                                                                                                        |
| --- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | Devtools ships in 1.0.0 (gate decision of 2026-09-06)    | accepted; settled at the v1-launch gate, not re-litigated                                                                                                      |
| P2  | The renderer must be written here because no site exists | verified: no `site/`, no `buildGraph(` caller outside core tests                                                                                               |
| P3  | The panel can be built on `subscribe` + `getState` alone | **partly wrong.** A refused navigation (`{ ok: false, reason }`) never commits, so the panel cannot say _why_ Next did nothing. Amended in 0D (X1).            |
| P4  | A `RecordedSession` is a usable bug report               | **wrong as stated.** It carries states, not the flow; a reader cannot replay it. Amended in 0D (X2): the export bundles `flow` and `subFlows`.                 |
| P5  | Devtools' bytes do not matter                            | accepted with a bound: a measured budget line exists to catch a JSON viewer or a theme system sneaking in                                                      |
| P6  | Devtools is React                                        | **half wrong.** The panel is React; `record`, `diffState`, `layoutGraph`, `formatExpr` are not, and Vue hosts need `record` for the same bug reports. 0D (X3). |
| P7  | Version alignment (T6) is achievable                     | verified impossible: `1.0.0`, `2.0.0`, `2.0.1` are on npm. Queued for the Final Gate as a User Challenge (the plan's stated direction cannot be followed).     |

Real pain if nothing is done: 0.x devtools imports `useWizardContext` and `subscribeToActions`,
neither of which exist in v1, so the package is dead code the moment L8 flips the root export.
The problem is real, and the shape (graph + state + commits) is the one 0.x users already had.

## Step 0B. Existing Code Leverage

| Sub-problem                 | Existing code                               | Reused?                                      |
| --------------------------- | ------------------------------------------- | -------------------------------------------- |
| structural graph            | `core/graph` `buildGraph`                   | yes, unchanged                               |
| resolve frame → flow        | `core/session` `knownFlows`                 | yes                                          |
| validate a recording        | `core/session` `checkSession`               | yes, as the recorder's test oracle           |
| get the wizard in React     | `react/v1` `useWizard`, `WizardContext`     | yes (peer)                                   |
| `'use client'` survival     | `react/tsup.config.ts`, `directive.test.ts` | copied                                       |
| evaluate `when` for display | `core` `evaluate(expr, scope, registry)`    | **not in the note; added in 0D (X4)**        |
| R-C fixture                 | `contract/binding-suite.ts:101-107`         | moved to `contract/fixtures.ts`              |
| redaction hook requirement  | `v1-launch.md` E-M7                         | **not in the note; added in 0D (X2)**        |
| layout                      | none in tree                                | written                                      |
| infix printer               | none in tree                                | written                                      |
| state diff                  | none in tree                                | written                                      |
| 0.x panel                   | `WizardDevTools.tsx`                        | deleted; nothing salvageable (0.x store API) |

Nothing is rebuilt that exists. `subscribeToActions` is not rebuilt: the commit log replaces it.

## Step 0C. Dream State

```
  CURRENT STATE                       THIS PLAN                             12-MONTH IDEAL
  0.x panel, dead on v1;      --->    docked panel: graph of the      --->  the same panel embedded in the
  no renderer anywhere;               active flow, per-commit diff,         docs site's inspector (S2), replay
  RecordedSession has no              commit log, refusal log, record       from any bug report's bundle,
  producer; bug reports are           to a self-contained bundle;           a Vue host records the same
  prose                               headless entry for Vue hosts          bundle; layout with crossing
                                                                            minimisation when a flow needs it
```

Delta: the plan reaches the ideal's diagnostic core (see a refusal, hand over a replayable
bundle). It leaves crossing minimisation and the site embedding for later, by design.

## Step 0C-bis. Implementation Alternatives

```
APPROACH A: Panel over subscribe only (the note as written)
  Summary: React panel + pure modules; everything derived from getState() per notification.
  Effort:  M (human ~4 days / CC ~2 h)      Risk: Low
  Pros:    zero engine change; no plugin to install; works with any Wizard-shaped object
  Cons:    cannot explain a refused navigation; recorder output not self-contained
  Reuses:  graph, session, react/v1

APPROACH B: A + a devtools plugin for refusals + self-contained export + headless entry
  Summary: A, plus a `devtools()` Hooks object that receives every NavResult through a new
           optional core hook `afterResult(intent, result)` fired from the store's one dispatch
           site; the export bundles flow + subFlows + session through an optional redact();
           the pure modules sit on a second entry without React.
  Effort:  M (human ~5 days / CC ~2.5 h)    Risk: Low-Med (one core hook, ~50 B, budget 5.0 -> 5.1 kB)
  Pros:    answers "why did Next do nothing"; a bug report replays without the sender's app;
           Vue hosts record; the React-free modules never carry the client directive
  Cons:    a core change in a budget with 40 B of headroom; two-step install for the refusal log
  Reuses:  everything in A; the store's single navigation dispatch

APPROACH C: Separate `@wizzard-packages/graph-react` + thin devtools
  Summary: renderer/layout/printer in their own published package, devtools imports it.
  Effort:  L      Risk: Med (a publish target for one consumer pair; version skew)
  Pros:    the site imports a package named for what it is
  Cons:    hard rule 6 says packages exist for size boundaries, and none exists here; more CI
  Reuses:  as A
```

**RECOMMENDATION: B** — completeness (P1) at marginal cost, and the two additions are the
ones the outside voice independently named as the product's actual value. C is rejected on
hard rule 6. Auto-decided; the core hook is surfaced at the Final Gate as a taste item because
it raises the `core-v1` budget.

## Step 0D. SELECTIVE EXPANSION analysis

**Complexity check.** Ten source files in one package plus one fixtures file, one core hook,
one example edit: over the 8-file smell line, but every file is one module with one test, and
the package is a rewrite. Not reducible without merging modules for their own sake.

**Minimum set.** `layoutGraph`, `FlowGraphView`, `StatePanel` with `diffState`, `WizardDevtools`,
fixtures, budget line. Deferrable without blocking the core objective: `CommitLog` pinning,
zoom buttons, the e2e. None deferred (P1).

**Expansion scan and decisions (cherry-picks auto-decided; blast radius + under a day of CC):**

| #   | Opportunity                                                                                                                                                                                     | Felt experience                                                                 | Effort                      | Decision                                                                                                               |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| X1  | **Refusal log.** `devtools()` plugin + core `Hooks.afterResult(intent, result)`; the Commits tab lists refusals as `✗ next: invalid (email) by details` between commits                         | "Why did Next do nothing?" is answered in the panel, with the field             | S (CC ~25 min) + core ~50 B | **ACCEPTED** (P1, P2). Taste at the gate: budget 5.0 -> 5.1 kB with the reason stated in `.size-limit.js`              |
| X2  | **Self-contained export with redaction.** "Copy JSON" emits `{ flow, subFlows, session }`; `record(wizard, { redact })` applies E-M7's hook to every frame before it is stored                  | A bug report is a file anyone can replay; no PII leaves unless the host lets it | S (CC ~15 min)              | **ACCEPTED** (P1)                                                                                                      |
| X3  | **Headless entry** `@wizzard-packages/devtools/headless`: `record`, `diffState`, `layoutGraph`, `formatExpr`, no React, no directive                                                            | A Vue host records bug reports; a test imports the layout without jsdom         | S (CC ~15 min)              | **ACCEPTED** (P2; hard rule A3: entry + exports + size line in the same PR)                                            |
| X4  | **Live `when` values.** Inspecting a node shows `when` printed and, at the root flow, its value under `{ data, ctx }` via `evaluate`                                                            | "Why is this step hidden?" is one click                                         | S (CC ~20 min)              | **ACCEPTED** (P1). Inside a group the value is withheld (no `loop` scope without the traversal), and the panel says so |
| X5  | **Crossing-minimisation pass** (barycenter ordering)                                                                                                                                            | Branch-and-rejoin flows draw cleanly                                            | S (CC ~30 min)              | **DEFERRED to TODOS.md** — the ceiling is stated; a ratchet test on crossing counts for the three fixtures lands now   |
| X6  | **Time travel** (rebuild a wizard from a selected commit)                                                                                                                                       | "Jump" from 0.x                                                                 | M                           | **SKIPPED** — inspection never navigates (S2 principle); the site's replay mode owns it                                |
| X7  | **Theme presets** (light/dark switch inside the panel)                                                                                                                                          | Matches the host at a click                                                     | S                           | **SKIPPED** — six custom properties are the contract; a switch is host UI                                              |
| X8  | **Diagnosis scenarios as tests** — three fixtures with a planted fault (a failing `validate`, a `when` that hides the next step, a wrong `keyBy`) and a test that the panel surfaces each cause | The suite proves the panel diagnoses, not only draws                            | S (CC ~30 min)              | **ACCEPTED** (P1) — the outside voice's finding 5                                                                      |

Platform potential: the headless entry (X3) is the piece other features build on; the site's
inspector, an e2e reporter, and a future Vue panel all consume it.

## Step 0E. Temporal Interrogation

```
  HOUR 1 (foundations):    the fixtures file and the four pure modules; decide `Positioned`
                           units (user units, 160x40) before the first test is written.
  HOUR 2-3 (core logic):   cycle breaking in layering (DFS, mark on-stack); diffState's path
                           syntax (`data.items[2].name`) must match `getPath`'s so a row is
                           copy-pastable into `wizard.get()`.
  HOUR 4-5 (integration):  the plugin/panel pairing (X1) — the panel must render without the
                           plugin and say what is missing; `afterResult` fires from ONE site in
                           store.ts, after next/back/go resolve, including `superseded`.
  HOUR 6+ (polish/tests):  jsdom has no layout, so keyboard tests select by order, not
                           geometry; the directive test needs a build step in CI before
                           vitest (as react's does); the e2e needs a devtools build before
                           `next build`.
```

Human ~6 h per PR becomes CC ~40 min. The decisions above are resolved in the note, not deferred.

## Step 0F. Mode Confirmation

SELECTIVE EXPANSION (feature rewrite on an existing system), approach B. Committed.

## Step 0.5. Dual Voices (CEO)

### CODEX SAYS (CEO — strategy challenge)

Seven findings (verbatim in the session log; condensed here, numbering kept):

1. **The panel shows consequences, not causes.** States from `subscribe` carry no intent, no
   guard results, no resolver reasons; `batch` hides intermediate writes. "Why did Next not
   move me?" can go unanswered with a fully working UI. The stronger goal is _explaining a
   refused transition_; check what the engine can expose and put that scenario in acceptance.
2. **"A record for every bug report" is not backed by the format.** `RecordedSession` has a
   flow id, an optional version and states; no flow definition, sub-flows, resolver versions or
   external results. `checkSession` checks compatibility, not reproducibility. Either give a
   concrete scenario where another developer diagnoses from the file alone, or narrow the claim.
3. **Export is designed before it can be shared safely.** "Copy JSON" dumps `data` and `ctx`
   whole; the API has no redaction, while the plan of record already requires one (E-M7).
4. **A framework-neutral product gets React as the only road to diagnostics.** The pure modules
   and `record` sit on one client entry with React peers; Vue is a supported binding today.
   A separate headless entry, not a new package, is the minimal alternative the note skipped.
5. **Internal examples are dressed as user value.** Tests count nodes and keys; none proves a
   developer found a wrong condition, a stuck transition or a group problem. Test diagnosis
   tasks with a known planted cause.
6. **A future site dictates the public API of an absent product.** `Positioned`, layout, printer
   and diff are exported for a consumer that does not exist; separate the public contract from
   the UI's building blocks.
7. **Maintenance is priced by first-implementation line counts.** "30 lines", "40 lines" ignore
   redaction, recording compatibility across flow versions, large states and custom layouts;
   the 2000-frame cap bounds count, not bytes; a 200-node chain proves nothing about a
   branching graph.

Closing: the decision to ship devtools is settled; it does not justify _this_ feature set.
Prove "failure → explanation → shareable recording → diagnosis by someone else" first, then
fix the graphical surface and public extensions.

### CLAUDE SUBAGENT (CEO — strategic independence)

Six findings:

- **F1 (critical) — wrong-sized bet on unproven demand.** Downloads are bot traffic (memory
  `v1-showcase-is-the-flow-graph`: core 52/month); the same evidence killed the compat package
  and was never applied to devtools. Fix: build the renderer inside `site/` only; extract a
  package when a user asks.
- **F2 (high) — the dependency reversal** (L5 builds what S2 was to own) was done in a design
  note, not flagged back to the plan; publishing first freezes an API before the site iterates.
- **F3 (medium) — D1 is a symptom of committing too early**; no publish, no version puzzle.
- **F4 (medium) — no competitors named**; the one data point on record (Stately deprecated its
  free graph inspector for a paid product) cuts against the plan and is not engaged with.
- **F5 (high) — §8 lists implementation variants, never "do not publish".**
- **F6 (medium) — production-library rigor for a deferrable dev tool.**

6-month regret: a version-mirroring tax and a peer-dependency promise for a package nobody
installs beyond the site.

Verdicts: CONCERN on all six dimensions.

### CEO DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════════════
  Dimension                             Claude    Codex     Consensus
  ───────────────────────────────────── ───────── ───────── ────────────────────────────
  1. Premises valid?                    CONCERN   CONCERN   CONFIRMED (concern) — P3/P4 wrong;
                                                            amended (X1, X2). Claude's "demand"
                                                            premise → TASTE T1 at the gate
  2. Right problem to solve?            CONCERN   CONCERN   DISAGREE in direction — Claude: do not
                                                            publish; Codex: publish, but prove the
                                                            diagnostic chain → TASTE T1; X1/X2/X8
  3. Scope calibration correct?         CONCERN   CONCERN   DISAGREE — smaller (Claude) vs
                                                            re-prioritised (Codex). Resolved by
                                                            adding evidence (X8), not size
  4. Alternatives sufficiently explored? CONCERN  CONCERN   CONFIRMED (concern) — headless entry
                                                            (X3) added; site-only → TASTE T1
  5. Competitive/market risks covered?  CONCERN   —         single voice — flagged; a competitive
                                                            paragraph is added to the note (§1)
  6. 6-month trajectory sound?          CONCERN   CONCERN   CONFIRMED (concern) — the version tax
                                                            (D1) and the public-API freeze (Codex 6)
                                                            → gate items D1 and TASTE T2
═══════════════════════════════════════════════════════════════════════════════════════
```

**Not a User Challenge.** The two voices do not agree on changing the owner's direction
(publish in 1.0.0): Codex accepts it, Claude rejects it. It is carried as **TASTE T1** with the
owner's direction as the default. Amendments applied to the note from the voices: X1 (refusal
log), X2 (self-contained export with redaction), X3 (headless entry), X8 (diagnosis tests),
plus: the public surface is split — `WizardDevtools`, `FlowGraphView`, `recordSession` and the
`devtools()` plugin are the supported API; `layoutGraph`, `formatExpr`, `diffState` on the
headless entry are documented as "used by the docs site; may change in a minor" (Codex 6).
Competitive note added to §1: Stately's free inspector was discontinued for a paid product;
this project's economics differ only in that nothing here is a business (MIT, no hosted
service), which is the reason a graph view can stay free and the reason it must stay cheap.

## Review Sections 1-11

### Section 1: Architecture Review

Dependency graph after the plan (arrows = imports; `*` = new):

```
  @wizzard-packages/devtools*
    ├── index.ts ('use client')  ──▶ react/v1 (peer: useWizard)      ──▶ core
    │     WizardDevtools, FlowGraphView, devtools() plugin*
    │     ──▶ ./headless
    └── headless.ts* (no directive) ──▶ core/graph (buildGraph)
          layoutGraph, formatExpr,   ──▶ core/session (knownFlows, checkSession)
          diffState, recordSession  ──▶ core (types, evaluate)
  core*: Hooks.afterResult?(intent, result) — one call site in store.ts (X1)
  contract/fixtures.ts* ◀── devtools tests, binding-suite (moved R-C)
  examples/next-app ──▶ devtools (e2e consumer)
```

Data flows, four paths each:

```
  commit flow      subscribe ──▶ getState() ──▶ diffState(prev, next) ──▶ commits[] ──▶ render
    nil:   no wizard (no provider, no prop)      → one-line message, nothing subscribed
    empty: flow.steps = {}                       → "flow has no steps"; graph empty; diff works
    error: diffState throws (non-plain value)    → the walker treats non-plain values as leaves;
                                                   cannot throw by construction; boundary anyway
  refusal flow*    next()/back()/go() ──▶ store dispatch ──▶ afterResult(intent, result) ──▶ plugin buffer ──▶ Commits tab
    nil:   plugin not installed                  → tab shows "install devtools() to see refusals"
    empty: result ok                             → a normal commit row follows; no refusal row
    error: plugin listener throws                → store's existing fail(): plugin disabled, console.error
  record flow      recordSession(w, {redact}) ──▶ frames[] ──▶ session() ──▶ bundle {flow, subFlows, session} ──▶ clipboard | onRecord
    nil:   no redact                             → frames stored as is; README PII note
    empty: stopped before any commit             → one frame (the mount state); checkSession passes
    error: redact throws                         → frame dropped, console.error once per recorder;
           clipboard rejected                    → fallback textarea with the JSON selected
  layout flow      buildGraph(flow, subFlows) ──▶ layoutGraph | layout prop ──▶ PositionedGraph ──▶ SVG
    nil:   layout prop returns a graph missing a node → renderer draws known nodes, lists missing ids in the mirror, no throw
    empty: no nodes                              → empty svg with a text child
    error: layout prop throws                    → boundary
```

Panel state machine:

```
  view:     live ──(select older row)──▶ pinned ──(click live | select newest)──▶ live
            pinned + new commit: stays pinned, "live" button shows "+N"
  record:   idle ──(Record)──▶ recording ──(Stop)──▶ stopped ──(Copy | onRecord)──▶ stopped ──(Record)──▶ recording (fresh)
            recording + 2000 frames: button reads "2000 (cap)"; frames stop accumulating
  invalid:  pinned with a row whose step is not in the current flow (after patchFlow) → the
            graph highlights nothing and the frame line says "step X not in flow"; no throw
```

Coupling: new edge core → devtools is **not** created; `afterResult` is an optional hook in
core, devtools depends on core. Site → devtools is deferred to S2. Scaling: layout is
O(V+E) per flow object; diff is O(keys) per commit with a 10k-key walk cap; the commit log
is a 500-entry ring; the recorder holds ≤ 2000 whole states. What breaks first at 10× is
memory in the recorder with large `data`; at 100× it is the same. SPOF: none. Security: 3.
Production failure: a host passes a `layout` that returns NaN coordinates → SVG attributes
NaN → browser draws nothing; the renderer validates finite numbers and falls back to the
built-in layout with a mirror-table note. Rollback: `git revert`, no migration; on npm,
`npm deprecate` + patch.

Findings, auto-decided:

- **1.1** pinned view on a new commit — decided: stay pinned, badge `+N` (P5, explicit).
- **1.2** layout memo key — decided: the `FlowDefinition` object returned by `getFlow()`
  (stable until `patchFlow`), via a `WeakMap` (P3).
- **1.3** `afterResult` must have exactly one call site — decided: the store's navigation
  wrapper, never `navigate.ts` (which has six return sites) (P5).
- **1.4** NaN guard on custom layouts — decided: validate, fall back, note (P1).
- **1.5** `isDestroyed` — decided: optional in the `Pick`; when present and true, the frame line
  reads `destroyed` (P1).

### Section 2: Error & Rescue Map

```
  METHOD/CODEPATH                | WHAT CAN GO WRONG                          | ERROR
  -------------------------------|--------------------------------------------|---------------------------
  layoutGraph                    | cycle among next edges                     | none — broken during DFS
                                 | edge to unknown node                       | none — skipped; dangling already flagged by buildGraph
  formatExpr                     | unknown operator / non-object expr         | none — JSON fallback / String()
  diffState                      | class instance, Map, circular ref in data  | none — non-plain values are leaves; depth cap 32
  recordSession                  | redact throws                              | caught: frame dropped, console.error once
                                 | wizard destroyed while recording           | subscribe returns; stop() idempotent
  evaluate(when) on inspect      | ExprError (unknown op, missing resolver)   | caught: shown as `when: <message>`
  knownFlows lookup              | frame names an unknown flow                | none — breadcrumb "unknown flow x"; graph = root
  clipboard write                | rejected (permission, insecure context)    | caught: fallback textarea
  FlowGraphView render           | layout prop throws / NaN                   | boundary / validated fallback
  devtools() plugin              | listener throws                            | store fail(): plugin disabled, console.error
  useWizard in the panel         | outside a provider, no prop                | caught: one-line message (not the hook's throw)
```

```
  ERROR                          | RESCUED? | RESCUE ACTION                     | USER SEES
  -------------------------------|----------|-----------------------------------|--------------------------------
  ExprError on inspect           | Y        | show message inline               | "when: [wizzard] unknown op $foo"
  redact throws                  | Y        | drop frame, log once              | console line; recording continues
  clipboard rejected             | Y        | textarea fallback                 | JSON to copy by hand
  layout throws                  | Y        | boundary                          | the 3.8 message; host unaffected
  layout NaN                     | Y        | built-in layout + mirror note     | graph drawn; note "custom layout rejected"
  plugin throws                  | Y (core) | disable plugin                    | console.error from core
  useWizard throws               | Y        | try/catch around the hook via context read (useContext, not useWizard) | message
```

No GAP rows remain. Decided: the panel reads `WizardContext` through `useContext` and checks
for `null` itself instead of calling `useWizard()`, so the "outside a provider" case is a
render, not a throw (P5). `WizardContext` must therefore be exported from `react/v1` — a
one-line export, in blast radius.

### Section 3: Security & Threat Model

| Threat                                           | Likelihood | Impact | Mitigated                                                                                                               |
| ------------------------------------------------ | ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| PII leaves the app in a copied bundle            | High       | High   | Y — `redact` hook (X2); README says devtools is a development tool; the Copy button shows a size + "contains data" note |
| XSS via step ids / labels                        | Low        | High   | Y — text nodes only; test 4.5                                                                                           |
| Prototype pollution via diff paths (`__proto__`) | Low        | Med    | Y — diff reads only; paths are strings for display                                                                      |
| A host ships devtools to production              | Med        | Med    | partial — documented; no runtime guard (a `NODE_ENV` check is a false comfort in ESM bundles). Noted in README          |
| Plugin receives `errors` (validation messages)   | Low        | Low    | Y — messages, not values; redact covers `data`                                                                          |
| New dependencies                                 | —          | —      | none added                                                                                                              |

No catch-all handlers anywhere; every rescue names its error above.

### Section 4: Data Flow & Interaction Edge Cases

| Interaction            | Edge case                            | Handled | How                                                               |
| ---------------------- | ------------------------------------ | ------- | ----------------------------------------------------------------- |
| commit burst           | 100 commits in one tick              | Y       | subscribe is sync; the ring append is O(1); React batches renders |
| panel unmount          | mid-recording                        | Y       | unsubscribe on unmount; recorder kept if the host holds it        |
| wizard replaced        | `wizard` prop changes                | Y       | effect re-subscribes; log cleared; note "wizard changed"          |
| patchFlow while pinned | pinned step absent from the new flow | Y       | 1 state machine "invalid"                                         |
| zero commits           | panel mounted before `start()`       | Y       | "no commits yet"                                                  |
| 10,000 commits         | long session                         | Y       | 500-row ring; oldest dropped; header says "showing last 500"      |
| huge `data`            | 10k keys                             | Y       | diff walk cap 10k; "… walk capped" row                            |
| keyboard               | ArrowDown at the last node           | Y       | stays; no wrap (predictable)                                      |
| keyboard               | Enter on END                         | Y       | inspects END: "flow ends here"                                    |
| zoom                   | `+` past 4× / `−` below 0.25×        | Y       | clamped                                                           |
| copy                   | double click on Copy                 | Y       | idempotent; button disabled while awaiting clipboard              |

No unhandled edge cases remain; each row is a test in Section 6.

### Section 5: Code Quality Review

- **5.1** Naming: `record` → **`recordSession`** (verb-noun like `buildGraph`, `checkSession`);
  `WizardDevtools` keeps the new casing (breaking release anyway). Decided (P5).
- **5.2** DRY: the directive test is a 15-line copy of react's — decided: keep the copy; a shared
  helper would be a third file for two consumers (P5). Node-shape drawing lives in one
  `shapes.ts` map consumed by the renderer and the mirror table, so the four shapes cannot drift.
- **5.3** `formatExpr` as a switch with ten cases — decided: an operator → template map; the
  function is one lookup plus recursion (cyclomatic ≤ 5) (P5).
- **5.4** Under-engineering: array diff by index reports a shift as N changes — accepted and
  documented in the README ("arrays are compared by position").
- **5.5** Over-engineering check: `CommitLog` pinning and the ring buffer are needed by
  Section 4 rows; the boundary is one class; nothing abstract without a second use.
- **5.6** Existing ASCII diagram in `store.ts` header (lines ~20-30) lists what the store does;
  adding `afterResult` must update it in the same commit (stale-diagram rule).

### Section 6: Test Review

```
  NEW UX FLOWS:
    inspect a node (mouse, keyboard); switch tabs; pin/unpin a commit; record/stop/copy;
    drill in/out of a group via crumbs; zoom
  NEW DATA FLOWS:
    commit → diff → log; refusal → plugin → log; record → redact → bundle → clipboard/onRecord
  NEW CODEPATHS:
    layoutGraph (layering, cycle break, memo); formatExpr (map, truncate); diffState (walk,
    caps); recordSession (cap, redact, stop); FlowGraphView (shapes, highlight, keys, mirror,
    NaN guard); StatePanel; CommitLog (ring, pin); boundary; devtools() plugin;
    core: store afterResult dispatch
  NEW BACKGROUND / ASYNC: clipboard write (promise); nothing else
  NEW INTEGRATIONS: none (peers only)
  NEW ERROR PATHS: the Section 2 table, every row
```

| Item                     | Test type           | In plan?  | Happy                                                            | Failure                  | Edge                                                |
| ------------------------ | ------------------- | --------- | ---------------------------------------------------------------- | ------------------------ | --------------------------------------------------- |
| layoutGraph              | unit + property     | yes       | fixtures lay out                                                 | cycle terminates         | 0 nodes; 200-node branching graph; crossing ratchet |
| formatExpr               | unit table          | yes       | every operator                                                   | unknown op → JSON        | truncation at exactly `max`                         |
| diffState                | unit                | yes       | add/remove/change                                                | non-plain leaf           | 10k-key cap; depth 32                               |
| recordSession            | unit + property     | yes       | checkSession passes                                              | redact throws → dropped  | 2000 cap; destroyed wizard                          |
| FlowGraphView            | unit (jsdom)        | yes       | R-A/B/C shapes                                                   | NaN layout → fallback    | hostile label; opaque; dangling                     |
| keyboard                 | unit                | yes       | arrows/Enter/Escape                                              | —                        | last node; END                                      |
| mirror table             | unit                | yes       | rows = nodes + edges                                             | —                        | full labels when truncated                          |
| StatePanel / CommitLog   | unit                | yes       | live updates                                                     | pinned + patchFlow       | ring at 500; batch = 1 row                          |
| devtools() plugin + core | unit (core + panel) | **added** | refusal row with reason                                          | plugin throws → disabled | superseded; no plugin → hint                        |
| store afterResult        | unit (core)         | **added** | fires once per attempt                                           | —                        | fires for `superseded`; not for `cancel()`          |
| diagnosis scenarios (X8) | unit                | yes       | panel names the planted cause                                    | —                        | three fixtures                                      |
| directive                | build assertion     | yes       | first two lines, both formats                                    | —                        | headless entry has NO directive                     |
| next-app e2e             | e2e                 | yes       | Next → active node moves                                         | —                        | —                                                   |
| size                     | size-limit          | yes       | under limit                                                      | —                        | headless entry has its own line                     |
| chaos                    | property (panel)    | **added** | random ops, mounted panel: no throw; log length == notifications | —                        | seeded (fast-check memory)                          |

2 am test: the directive test plus the e2e. Hostile QA: a `layout` prop returning duplicate
ids — decided: the renderer de-duplicates by first occurrence and notes it (P1). Chaos: the
seeded property test above. Pyramid: many unit, one property per pure module, one e2e.
Flakiness: none time-based; property seeds pinned in CI per the fast-check memory.

### Section 7: Performance Review

- Layout: memoised per flow object; a 200-node branching graph under 50 ms asserted.
- Diff: O(keys) per commit; 10k walk cap; runs only when the panel is mounted.
- Render: 200 SVG nodes and 500 log rows are within DOM comfort; no virtualisation (P5).
- `evaluate` per node runs on inspect, not on render.
- Recorder memory: bounded by frames × state size; the cap is by count, the README states the
  bytes trade-off (Codex 7); a byte cap is not added (P3: count is what the person sees).

### Section 8: Observability & Debuggability Review

The panel is the library's dashboard (`v1-launch.md:825-831`). Its own failure modes are
visible: the boundary text, one `console.error` per recorder for redact failures, core's
existing `console.error` for a disabled plugin, and the mirror table's notes. A bug reported
three weeks later arrives as a bundle that `checkSession` validates and S2 replays. No
telemetry; a development tool sends nothing anywhere.

### Section 9: Deployment & Rollout Review

The deploy is `npm publish` via changesets. Sequence: PR 1 → PR 2 → PR 3 → R0 builds final
artefacts to the `next` tag with devtools' two entries in the consumer fixtures (E-M5/E-M6)
→ R1 promotes. The core hook is additive and optional: an older devtools against a newer core
or the reverse degrades to "no refusal log", never a throw. Feature flag: none needed.
Rollback: `npm deprecate @wizzard-packages/devtools@3.0.0` + a patch; `git revert` in tree.
Post-deploy check: install the tarball in a clean Vite app, mount the panel, click Next.

### Section 10: Long-Term Trajectory Review

Debt introduced: no crossing minimisation (TODO), index-based array diff (documented).
Path dependency: the site will import devtools' headless entry; that is workspace-local and
reversible. Reversibility: 4/5 (delete the package; the core hook stays harmless).
Knowledge: this note plus the README; the four shapes and the keyboard model are written once
here and cited by S2. Ecosystem: React 18+ `useSyncExternalStore`, SVG, no layout dependency.
The 1-year question: a new engineer reads §3 and the Puzzle map and knows which file does
what. Retrospective on the cherry-picks: X1/X2/X8 are load-bearing for the product's value
(both voices); X3 is what makes X2 reachable from Vue; X5 was rightly deferred.

### Section 11: Design & UX Review (CEO-level)

Information architecture: graph → state → commits, as tabs, with the frame line always
visible above the tabs. State coverage: the 3.8 table. Journey: install → mount → see the
graph with the active node → click Next in the app → the node moves and a commit row appears
→ something refuses → the refusal row names the field. Slop risk: low (no cards, no gradient,
no hero); the risk is the opposite, an unstyled table. DESIGN.md: none exists; the six custom
properties are the contract until S1 writes it. Responsive: a host-sized container, min 320 px;
below 480 px the graph scrolls and the tabs stay. A11y: keyboard model, mirror table, 4.5:1,
44 px targets for the zoom and tab buttons, `aria-live="polite"` on the frame line (added, P1).
User flow:

```
  [mount] → Graph tab (active node) ──Next in app──▶ node moves, commit row
      │                                   └──refused──▶ refusal row "invalid (email) by details"
      ├── ArrowDown/Enter → inspect: id, kind, when (+ value at root), deferred
      ├── crumb → child/parent graph
      ├── State tab → frame line, diff rows, full state <details>
      └── Commits tab → rows; select → pinned; live → back
  [Record] → recording → [Stop] → [Copy] / onRecord
```

Phase 2 (design review) runs next with the full seven passes.

## Required Outputs (Phase 1)

### NOT in scope

- Crossing minimisation (X5) — deferred to TODOS.md with a ratchet test in place.
- Time travel (X6) — inspection never navigates; replay is S2's.
- Theme presets (X7) — custom properties are the contract.
- Compound (nested) group nodes (Q1) — drill-in; revisit when S2 needs the inside at a glance.
- A Vue panel — the headless entry makes it possible; nobody has asked.
- A layout dependency (dagre/elk) — the `layout` prop admits one; none is bundled.
- A production-mode guard — documented, not enforced.
- Site embedding — S2.

### What already exists

See Step 0B. Everything reusable is reused; the one engine change is an optional hook.

### Dream state delta

See Step 0C. The plan ships the diagnostic core; the site embedding and crossing
minimisation remain for S2 and a follow-up.

### Error & Rescue Registry

Section 2's two tables; no GAP rows.

### Failure Modes Registry

```
  CODEPATH              | FAILURE MODE                    | RESCUED? | TEST? | USER SEES?                 | LOGGED?
  ----------------------|---------------------------------|----------|-------|----------------------------|--------
  layoutGraph           | cycle                           | Y        | Y     | graph drawn                | n/a
  layout prop           | throws / NaN / dup ids          | Y        | Y     | boundary / fallback + note | n/a
  formatExpr            | unknown op                      | Y        | Y     | JSON text                  | n/a
  diffState             | non-plain / huge / deep         | Y        | Y     | leaf / cap row             | n/a
  recordSession         | redact throws                   | Y        | Y     | recording continues        | console once
  recordSession         | cap reached                     | Y        | Y     | button reads "2000 (cap)"  | n/a
  evaluate on inspect   | ExprError                       | Y        | Y     | message inline             | n/a
  knownFlows            | unknown flow in a frame         | Y        | Y     | "unknown flow"             | n/a
  clipboard             | rejected                        | Y        | Y     | textarea fallback          | n/a
  devtools() plugin     | throws                          | Y (core) | Y     | refusal log stops          | console (core)
  panel                 | no wizard                       | Y        | Y     | one-line message           | n/a
  store afterResult     | listener throws                 | Y (core) | Y     | nothing                    | console (core)
```

No row is RESCUED=N / TEST=N / Silent. **0 CRITICAL GAPS.**

### TODOS.md updates (proposed, auto-decided → written in Phase 3's collection)

1. **Crossing-minimisation pass in `layoutGraph`** — What: barycenter ordering within layers.
   Why: branch-and-rejoin flows draw crossings today. Pros: readable graphs for R-A-like flows.
   Cons: ~40 lines, a second property. Context: `packages/devtools/src/headless/layout.ts`,
   rule 2; the crossing-count ratchet test names the current numbers. Effort: S → S. P3.
   Blocked by: L5 PR 1.

### Scope Expansion Decisions

- Accepted: X1 refusal log (+ core `afterResult`), X2 self-contained export with redaction,
  X3 headless entry, X4 live `when` values, X8 diagnosis scenarios.
- Deferred: X5 crossing minimisation.
- Skipped: X6 time travel, X7 theme presets.

### Diagrams

Architecture (§3 and Section 1), data flow with shadow paths (Section 1), panel state machine
(Section 1), error flow (Section 2), deployment sequence and rollback (Section 9), user flow
(Section 11). Stale-diagram audit: `store.ts` header must gain `afterResult` (5.6);
`navigate.ts`'s phase list is untouched by design (1.3); `graph.ts` comments are untouched.

### CEO plan

Persisted to `~/.gstack/projects/ZizzX-wizzard-packages/ceo-plans/2026-09-06-devtools.md`
(scope decisions X1–X8, vision, deferrals).

### Completion Summary (CEO)

```
  +====================================================================+
  |            MEGA PLAN REVIEW — COMPLETION SUMMARY                   |
  +====================================================================+
  | Mode selected        | SELECTIVE EXPANSION, approach B             |
  | System Audit         | no site; 0.x panel dead on v1; T6 impossible|
  | Step 0               | 7 premises: 3 amended, 1 → gate (D1)        |
  | Section 1  (Arch)    | 5 issues found, all decided                 |
  | Section 2  (Errors)  | 11 error paths mapped, 0 GAPS               |
  | Section 3  (Security)| 5 threats, 1 High (PII) mitigated           |
  | Section 4  (Data/UX) | 12 edge cases mapped, 0 unhandled           |
  | Section 5  (Quality) | 6 issues found, all decided                 |
  | Section 6  (Tests)   | Diagram produced, 3 gaps → added            |
  | Section 7  (Perf)    | 0 issues (5 bounds stated)                  |
  | Section 8  (Observ)  | 0 gaps                                      |
  | Section 9  (Deploy)  | 1 risk (version skew) — additive hook       |
  | Section 10 (Future)  | Reversibility: 4/5, debt items: 2           |
  | Section 11 (Design)  | 1 issue (aria-live) → Phase 2 runs          |
  +--------------------------------------------------------------------+
  | NOT in scope         | written (8 items)                           |
  | What already exists  | written                                     |
  | Dream state delta    | written                                     |
  | Error/rescue registry| 11 paths, 0 CRITICAL GAPS                   |
  | Failure modes        | 12 total, 0 CRITICAL GAPS                   |
  | TODOS.md updates     | 1 item proposed                             |
  | Scope proposals      | 8 proposed, 5 accepted, 1 deferred, 2 skip  |
  | CEO plan             | written                                     |
  | Outside voice        | ran (codex + claude subagent)               |
  | Lake Score           | 5/5 recommendations chose complete option   |
  | Diagrams produced    | 6 (arch, data flow, state, error, deploy, user flow) |
  | Stale diagrams found | 1 (store.ts header, update with X1)         |
  | Unresolved decisions | 3 → Final Gate (D1 version, T1 publish, T2 core hook) |
  +====================================================================+
```

> **Phase 1 complete.** Codex: 7 concerns. Claude subagent: 6 issues.
> Consensus: 3/6 confirmed (as concerns, amended), 2 disagreements → surfaced at gate,
> 1 single-voice flag. Passing to Phase 2.

---

<!-- /autoplan Phase 2: design review (all 7 passes, auto-decided). Appended 2026-09-06. -->

## Step 0: Design Scope Assessment

**0A. Initial rating: 5/10.** Concrete on rendering (four shapes, 160×40 units, custom
properties, keyboard bindings, contrast targets, exact error copy) and vague exactly where a
person meets the tool: no default tab, no legend, no persistent live/pinned cue, no home for
the record controls, an inspector that "opens" nowhere, a Commits tab missing from the state
matrix, responsive rules by viewport instead of container, and a temporal model with two
unreconciled selection axes. A 10 names all of those in one place and puts the refusal
where the eye lands first.

**0B. DESIGN.md: none.** S1 writes it. Until then the six custom properties in §3.8 are the
contract; every colour in the panel is one of them.

**0C. Existing design leverage.** Node shapes and edge styles are the ones S2 will draw
(`v1-launch.md:1415`); the keyboard model is S2's (`v1-launch.md:237`); the mirror table and
the reduced-motion posture come from `flow-inspector.md`. The 0.x panel's dark glass theme is
not reused.

**0D. Focus areas:** all seven passes (P1). Mockups: the gstack designer binary is not part
of this pipeline run (no `DESIGN_READY`); text specification stands in.

## Step 0.5: Dual Voices (design)

### CODEX SAYS (design — UX challenge)

Seven findings, verbatim in the session log; condensed: (1) the hierarchy mirrors the
modules, not the question "why did Next do nothing" — put a persistent diagnostic strip above
the tabs and rename Commits to Activity; (2) the temporal model is ambiguous — separate
observed time, inspected flow and selected node, keep a pinned row's snapshot when it leaves
the buffer, label "taken edge" as inferred; (3) the recording omits refusal events and the
export needs a preview with counts, size, redaction status and omitted evidence; the cap
behaviour contradicts itself between §7 and the appendix; (4) missing states: pending
navigation, empty-diff distinctions, partial evidence, copy states, and a boundary that
takes the whole panel down; (5) responsive by container width, a single scrolling surface,
Fit and Center, readable initial zoom; (6) the a11y contract is unfinished —
`aria-activedescendant`, inspector focus, tab roving, row activation, focus ring, stroke
contrast, a visible text alternative, concise announcements; (7) the inspector's location,
content order and dismissal are unspecified; diff value presentation too. Verdict: hold the
stable release until the diagnosis journey works in the example app; not "never publish".

### CLAUDE SUBAGENT (design — independent review)

Nine findings: default tab unspecified (high); no legend for a 4-shape / 4-edge / 4-highlight
grammar (critical); Commits tab absent from the state matrix (high); no persistent
live/pinned indicator (high); no `aria-live` (medium); Record control has no home (medium);
node selection and commit pin are two unreconciled axes, sharpened by X4's live `when`
(high); no way to preview a group's child before visiting it (unnamed decision); character
truncation vs pixel width (low). Litmus: 1 NO, 2 YES, 3 YES, 4 NO, 5 YES, 6 NO, 7 YES.

### DESIGN LITMUS SCORECARD

```
═══════════════════════════════════════════════════════════════════════════════════
  Litmus check                              Claude   Codex    Consensus
  ───────────────────────────────────────── ──────── ──────── ─────────────────────────
  1. Product unmistakable in first screen?  NO       NO       CONFIRMED NO → 12.1, 12.13, 12.14
  2. One strong visual anchor?              YES      YES      CONFIRMED (graph, default tab)
  3. Understandable by scanning headings?   YES      YES*     CONFIRMED (* after Commits → Activity)
  4. Each section has one job?              NO       NO       CONFIRMED NO → 12.9, 12.15
  5. Cards actually necessary?              YES      —        single voice (no cards used)
  6. Motion improves hierarchy?             NO       —        single voice → 12.20 (none by decision)
  7. Premium without decorative shadows?    YES      —        single voice (no shadows exist)
═══════════════════════════════════════════════════════════════════════════════════
```

No DISAGREE rows: where both voices spoke they agreed. Every confirmed NO is a structural
gap and was auto-fixed (P5) in §12 of the note. No taste decision arises from this phase;
Codex's "hold the stable release until the journey works" is the plan's own PR 3 → R0
sequence, restated.

## Pass 1: Information Architecture — 4/10 → 9/10

Was: three tabs mirroring three modules, no default, the refusal hidden in an inactive tab.
Now (12.1, 12.13, 12.15): strip (`location · time · outcome`) → toolbar → content; the Graph
tab by default; the latest outcome is readable without a tab change. If only three things can
show: the active step, the latest outcome, the graph. Screen structure:

```
  ┌──────────────────────────────────────────────────────────────┐
  │ root › passengers[p2] › details · live · ✗ next blocked · details · email: required │  strip
  ├──────────────────────────────────────────────────────────────┤
  │ [Graph] [State] [Activity]   [Record] [Copy JSON]   [+][−][Fit][Center][Table][Legend ▸] │ toolbar
  ├───────────────────────────────────────────┬──────────────────┤
  │  SVG graph (one scrolling surface)        │ inspector        │  wide ≥ 720 px
  │                                           │ (280 px)         │
  └───────────────────────────────────────────┴──────────────────┘
  narrow < 720: strip / toolbar (wraps) / content; inspector as an in-panel bottom sheet
```

Remaining point: the strip's three segments compete at 320 px; decided: the location segment
truncates from the left (`… › details`) and keeps the last crumb.

## Pass 2: Interaction State Coverage — 5/10 → 9/10

| Feature   | LOADING                   | EMPTY                                                                | ERROR                                | SUCCESS              | PARTIAL                                        |
| --------- | ------------------------- | -------------------------------------------------------------------- | ------------------------------------ | -------------------- | ---------------------------------------------- |
| strip     | `… next pending`          | `— no navigation yet`                                                | `✗ next blocked · step · field: msg` | `✓ next → step`      | `⚠ N frames dropped by redact`                 |
| graph     | n/a (sync)                | "flow has no steps"                                                  | boundary text in the tab only        | active node filled   | opaque group dashed with reason                |
| inspector | n/a                       | "select a node (arrows, Enter)"                                      | `when: [wizzard] …` inline           | fields in 12.9 order | `Not evaluated (needs the group's loop scope)` |
| state tab | n/a                       | "no changes in this commit" / "select an activity row, or stay live" | n/a                                  | diff rows            | `… N paths not shown (cap)` + show all         |
| activity  | `… next` row              | "no activity yet"                                                    | refusal rows                         | commit rows          | "showing the last 500"; plugin-absent header   |
| record    | frame count on the button | Copy disabled                                                        | copy failed → textarea focused       | "copied" 2 s         | `capped: true` label                           |
| no wizard | —                         | one-line message everywhere                                          | —                                    | —                    | —                                              |

Remaining point: none; the two "empty" wordings on the State tab were the only ambiguity
and are now distinct (12.7).

## Pass 3: User Journey & Emotional Arc — 5/10 → 8/10

| Step | User does                    | User feels                    | Plan specifies                                         |
| ---- | ---------------------------- | ----------------------------- | ------------------------------------------------------ |
| 1    | mounts the panel             | "what is this"                | Graph by default, active node filled, legend one click |
| 2    | clicks Next in the app       | "did it work"                 | node moves; strip `✓ next → payment`                   |
| 3    | clicks Next, nothing happens | "why"                         | strip `✗ next blocked · details · email: required`     |
| 4    | opens the refusal            | "show me"                     | Activity detail: action, step, reason, errors, state   |
| 5    | inspects the hidden step     | "is it the condition"         | `when` printed, `→ false`                              |
| 6    | records, reproduces, copies  | "can I hand this over"        | preview with counts, redaction status; one file        |
| 7    | pins an old commit           | "am I looking at now or then" | strip `pinned #12 (+3 new)`; Return to live            |

Five-second: the filled node and the strip. Five-minute: Activity and the inspector.
Five-year: the bundle format is what bug reports look like. Where it still breaks: step 6
for a host without the plugin — the preview says refusals are not captured; that is honest,
not warm. Accepted.

## Pass 4: AI Slop Risk — 8/10 → 9/10

Classifier: APP UI. Hard rejections: none apply (no card mosaics, no gradients, no ornamental
icons; buttons carry words, 12.15). Universal rules: colours are custom properties; no
default typeface is set (inherits — a deliberate non-choice for an embedded panel, which is
the one place `system-ui` is acceptable because the host's stack wins); body 14 px, mirror
12 px minimum; labels are visible text, never placeholders; headings sit with their content.
Remaining point: the panel's own type scale has two sizes (14, 12); fine for a tool.

## Pass 5: Design System Alignment — 3/10 → 6/10

No DESIGN.md exists; S1 owns it. What the panel commits to now so S1 can absorb it: six
custom properties, the four shapes and edge styles as one `shapes.ts` map, 2 px focus ring
with 2 px offset, 44 px targets, a 14/12 type scale. Flagged for S1: when DESIGN.md names
tokens, the six `--wz-*` properties map onto them in one place. `/design-consultation` is the
right next step for the site, not for this panel. Ceiling accepted: 6/10 until S1.

## Pass 6: Responsive & Accessibility — 5/10 → 9/10

Responsive (12.8): container width, two layouts, one scrolling surface, Fit/Center, readable
initial zoom, diff rows restack under 720 px, the inspector becomes an in-panel sheet that
returns focus. A11y (12.10): `role="application"` + `aria-activedescendant`, roving tabs,
listbox rows, focus ring, 3:1 strokes, 4.5:1 text, the Table toggle as a visible alternative,
44 px targets, one polite live region for outcomes only. Reduced motion: nothing to honour
(12.20). Remaining point: `role="application"` traps arrow keys inside the graph by design;
Tab still leaves, and the Table toggle is the escape for screen-reader users who prefer
browse mode. Documented in the README.

## Pass 7: Unresolved Design Decisions

```
  DECISION NEEDED                                  | IF DEFERRED, WHAT HAPPENS                          | DECIDED HERE?
  -------------------------------------------------|----------------------------------------------------|---------------
  Default tab                                      | implementer picks; first impression random         | graph (12.13)
  Where the refusal shows                          | hidden in a tab; the tool fails its own purpose    | the strip (12.1)
  Commits vs Activity                              | refusals filed as commits                          | Activity (12.2)
  Pin vs crumb vs node selection                   | two sources of truth in the implementation         | three concepts (12.3, 12.16)
  Taken edge                                       | presented as execution history                     | inferred, labelled (12.4)
  Refusals in the recording                        | the bug report omits the bug                       | outcomes in the bundle (12.5)
  Cap behaviour                                    | tests and prose disagree                           | stop and mark (12.5)
  Export preview                                   | PII copied without a look                          | preview (12.6)
  Inspector home                                   | a popover, a modal, or nothing                     | right column / bottom sheet (12.9)
  Legend                                           | shapes undecoded                                   | details in the toolbar (12.14)
  Record controls                                  | smeared across tabs                                | toolbar (12.15)
  Group preview before visiting                    | impossible; unnamed                                | Open sub-flow (12.17)
  Motion                                           | ad hoc transitions                                 | none (12.20)
  Typeface                                         | Inter by reflex                                    | inherit (Pass 4)
```

All fourteen decided; none deferred.

## Required Outputs (Design)

### NOT in scope (design)

- A typeface and palette of its own — inherits; S1's DESIGN.md decides.
- Animated transitions — none by decision.
- A floating/overlay chrome — docked only (`v1-launch.md:1414`).
- Virtualised lists — 500 rows is within DOM comfort.
- Mockups — no designer binary in this run; the ASCII structure in Pass 1 stands in.

### What already exists (design)

The four shapes, the keyboard model and the mirror table from S2/`flow-inspector.md`; the
custom-property approach from the panel's own §3.8; nothing from the 0.x theme.

### TODOS.md updates (design)

None proposed: every gap was fixed in §12 rather than deferred.

### Phase 2 Completion Summary

```
  +====================================================================+
  |         DESIGN PLAN REVIEW — COMPLETION SUMMARY                    |
  +====================================================================+
  | System Audit         | no DESIGN.md; UI scope yes                  |
  | Step 0               | 5/10; all 7 passes                          |
  | Pass 1  (Info Arch)  | 4/10 → 9/10 after fixes                     |
  | Pass 2  (States)     | 5/10 → 9/10 after fixes                     |
  | Pass 3  (Journey)    | 5/10 → 8/10 after fixes                     |
  | Pass 4  (AI Slop)    | 8/10 → 9/10 after fixes                     |
  | Pass 5  (Design Sys) | 3/10 → 6/10 (ceiling until S1)              |
  | Pass 6  (Responsive) | 5/10 → 9/10 after fixes                     |
  | Pass 7  (Decisions)  | 14 resolved, 0 deferred                     |
  +--------------------------------------------------------------------+
  | NOT in scope         | written (5 items)                           |
  | What already exists  | written                                     |
  | TODOS.md updates     | 0 items proposed                            |
  | Approved Mockups     | 0 generated, 0 approved                     |
  | Decisions made       | 20 added to plan (§12.1–12.20)              |
  | Decisions deferred   | 0                                           |
  | Overall design score | 5/10 → 8/10                                 |
  +====================================================================+
```

> **Phase 2 complete.** Codex: 7 concerns. Claude subagent: 9 issues.
> Consensus: 4/7 confirmed (3 single-voice), 0 disagreements. Passing to Phase 2.5.

<!-- AUTONOMOUS DECISION LOG -->

## Decision Audit Trail

| #   | Phase  | Decision                                                                        | Classification | Principle | Rationale                                                                | Rejected                           |
| --- | ------ | ------------------------------------------------------------------------------- | -------------- | --------- | ------------------------------------------------------------------------ | ---------------------------------- |
| 1   | CEO    | Mode SELECTIVE EXPANSION                                                        | mechanical     | default   | rewrite of an existing package                                           | HOLD, EXPANSION                    |
| 2   | CEO    | Approach B (A + refusal hook + bundle + headless entry)                         | taste (T2)     | P1, P2    | both voices named the diagnostic chain as the value                      | A (no engine change), C (package)  |
| 3   | CEO    | X1 refusal log with core `afterResult`                                          | taste (T2)     | P1        | "why did Next do nothing" answered; +~50 B, budget 5.0 → 5.1 kB          | infer from beforeNavigate          |
| 4   | CEO    | X2 self-contained bundle + redact                                               | mechanical     | P1        | E-M7 already requires the hook; a session without a flow is unreplayable | raw session                        |
| 5   | CEO    | X3 headless entry                                                               | mechanical     | P2, A3    | Vue hosts record; pure modules carry no directive                        | new package                        |
| 6   | CEO    | X4 live `when` values at root scope only                                        | mechanical     | P1, P5    | `evaluate` exists; loop scope needs the traversal                        | evaluate everywhere (wrong values) |
| 7   | CEO    | X5 crossing pass deferred, ratchet test now                                     | mechanical     | P3        | ceiling stated; no fixture needs it yet                                  | implement now                      |
| 8   | CEO    | X6 time travel skipped                                                          | mechanical     | P5        | inspection never navigates (S2)                                          | rebuild from state                 |
| 9   | CEO    | X7 theme presets skipped                                                        | mechanical     | P5        | custom properties are the contract                                       | switch in panel                    |
| 10  | CEO    | X8 diagnosis scenario tests                                                     | mechanical     | P1        | Codex 5: prove diagnosis, not drawing                                    | rendering tests only               |
| 11  | CEO    | Publish devtools in 1.0.0 (owner's direction kept)                              | taste (T1)     | P6        | voices disagree; owner decided 2026-09-06; code is identical either way  | site-only first (Claude F1)        |
| 12  | CEO    | D1 version → gate as User Challenge                                             | user challenge | —         | plan's direction (aligned 1.0.0) is impossible on npm                    | —                                  |
| 13  | CEO    | `record` → `recordSession`                                                      | mechanical     | P5        | verb-noun like `buildGraph`                                              | `record`                           |
| 14  | CEO    | pinned view stays pinned on new commits, `+N` badge                             | mechanical     | P5        | explicit, predictable                                                    | auto-unpin                         |
| 15  | CEO    | `afterResult` fired from the store wrapper only                                 | mechanical     | P5        | one call site; navigate.ts has six returns                               | per-return in navigate.ts          |
| 16  | CEO    | panel reads `WizardContext` via `useContext`, exported from react/v1            | mechanical     | P5        | render a message instead of a throw                                      | try/catch around useWizard         |
| 17  | CEO    | keep the directive test as a copy                                               | mechanical     | P5        | 15 lines, two consumers                                                  | shared helper                      |
| 18  | CEO    | `formatExpr` as an operator map                                                 | mechanical     | P5        | cyclomatic ≤ 5                                                           | switch                             |
| 19  | CEO    | `aria-live="polite"` on the frame line                                          | mechanical     | P1        | commits are announced                                                    | silent                             |
| 20  | Design | Diagnostic strip above the tabs; refusal visible on the default tab             | mechanical     | P1, P5    | both voices: the refusal was hidden in an inactive tab                   | auto-switch tabs                   |
| 21  | Design | Commits → Activity with refusal and pending rows                                | mechanical     | P5        | refusals are not commits                                                 | keep "Commits"                     |
| 22  | Design | Three independent concepts: observed time, inspected flow, selected node        | mechanical     | P5        | two unreconciled selection axes in the proposal                          | crumb resets on commit             |
| 23  | Design | Taken edge only when unique, labelled inferred                                  | mechanical     | P5        | states do not prove execution history                                    | drop the highlight                 |
| 24  | Design | Bundle carries outcomes + meta; cap stops and marks                             | mechanical     | P1        | the recording omitted the bug; tests and prose disagreed on the cap      | keep newest                        |
| 25  | Design | Export preview with counts, size, redaction status                              | mechanical     | P1        | PII must be looked at before it is copied                                | direct copy                        |
| 26  | Design | Container-width responsive; inspector column / bottom sheet; Fit/Center         | mechanical     | P5        | viewport rules break for a docked panel                                  | viewport queries                   |
| 27  | Design | A11y contract (activedescendant, roving tabs, listbox rows, ring, Table toggle) | mechanical     | P1        | keyboard model without an exposure contract is unimplementable           | hidden table only                  |
| 28  | Design | Default tab graph; legend; toolbar placement of Record/Copy                     | mechanical     | P5        | first-screen ambiguity                                                   | implementer picks                  |
| 29  | Design | Boundary scoped to the Graph tab                                                | mechanical     | P1        | export must stay usable when the renderer fails                          | whole-panel boundary               |
| 30  | Design | Open sub-flow preview from a group's inspector                                  | mechanical     | P1        | previewing a child before visiting it was silently impossible            | crumbs only                        |
| 31  | Design | Typeface inherits; motion none                                                  | mechanical     | P5        | embedded panel; the host's stack wins                                    | Inter + transitions                |
