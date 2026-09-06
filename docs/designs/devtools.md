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
export function record(wizard: Wizard): Recorder;
```

`record` pushes `getState()` at subscription and after every notification, and `session()`
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
    record(wizard)                              record.test.ts (property vs checkSession)
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
