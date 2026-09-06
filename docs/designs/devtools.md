<!-- /autoplan restore point: /c/Users/Aziz/.gstack/projects/ZizzX-wizzard-packages/docs-devtools-design-autoplan-restore-20260906-223325.md -->

# Design: devtools on the v1 engine

Date: 2026-09-06
Branch: `docs/devtools-design` at `814dc8c`
Task: L5 · Plan of record: [`v1-launch.md`](v1-launch.md) row **L5** (absorbs T6, T15, T33, E4)
Status: approved 2026-09-06 (`/autoplan`, four phases; gate decisions in the review report at the end)

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

## 13. Amendments from the Phase 2.5 developer-experience review (2026-09-06)

These paragraphs override §3.7, §5.1, §5.2, §11 (X2, X3) and §12.5–§12.7 where they differ.
They exist because both DX voices found the same thing: the note describes the panel well
and the developer's path to it badly. §5.1's prop list was stale against §11/§12, `record`
and `recordSession` both appeared, `RecordedSession` and `SessionBundle` were used for the
same value, the refusal plugin was reachable from React only, and the one error message with
an anchor pointed at a section nobody had written.

**13.1 One authoritative surface.** This block replaces every earlier signature. Anything
not listed here is not exported.

```ts
// @wizzard-packages/devtools            ('use client'; React peers)
export function WizardDevtools(props: WizardDevtoolsProps): ReactNode;
export function FlowGraphView(props: FlowGraphViewProps): ReactNode;
export { devtools, recordSession } from './headless'; // same objects, one import for React hosts

export interface WizardDevtoolsProps {
  wizard?: WizardLike;          // default: WizardContext; with neither, the one-line message (13.2)
  plugin?: DevtoolsPlugin;      // the object passed to createWizard({ plugins: [dt] }); absent → no refusal rows
  subFlows?: SubFlows;          // resolves string groups, as in createWizard
  layout?: (graph: FlowGraph) => PositionedGraph;     // default: layoutGraph
  redact?: (bundle: SessionBundle) => SessionBundle;  // runs once, at export; default: identity
  onRecord?: (bundle: SessionBundle) => void;         // receives the redacted bundle
  defaultTab?: 'graph' | 'state' | 'activity';        // default: 'graph'
  limits?: { activity?: number; frames?: number; diffRows?: number }; // defaults 500, 2000, 200
}

// @wizzard-packages/devtools/headless   (no directive, no React; Node, Vue and tests)
export function devtools(): DevtoolsPlugin;
export function recordSession(wizard: WizardLike, options?: RecordOptions): Recorder;
export function diffState(previous: WizardState, next: WizardState, cap?: number): Change[];
export function layoutGraph(graph: FlowGraph, opts?: { gapX?: number; gapY?: number }): PositionedGraph;
export function formatExpr(expr: Expr, max?: number): { short: string; full: string };

export type WizardLike = Pick<Wizard, 'subscribe' | 'getState' | 'getFlow'> &
  Partial<Pick<Wizard, 'isDestroyed'>>;

export interface DevtoolsPlugin extends Hooks {
  readonly name: 'devtools';
  readonly outcomes: readonly Outcome[];   // ring of `limits.activity`; newest last
  readonly pending: { from: string | null; to: string | typeof END | null } | null;
  subscribe(listener: () => void): () => void; // fires on every outcome and pending change
}
export interface Outcome { afterRev: number; intent: NavIntent; result: NavResult }

export interface RecordOptions {
  plugin?: DevtoolsPlugin;   // outcomes come from here; [] without it
  subFlows?: SubFlows;       // copied into the bundle so it replays alone
  redact?: (bundle: SessionBundle) => SessionBundle;
  limit?: number;            // frames; default 2000
}
export interface Recorder {
  bundle(): SessionBundle;   // applies redact, computes meta, returns; never mutates the frames
  stop(): void;              // idempotent; unsubscribes from the wizard and the plugin
  readonly frames: number;
  readonly capped: boolean;
}
export interface SessionBundle {
  version: 1;                // the format; a reader rejects any other number (13.2)
  flow: FlowDefinition;
  subFlows?: SubFlows;
  session: RecordedSession;  // core's format, unchanged
  outcomes: readonly Outcome[];
  meta: { frames: number; outcomes: number; redacted: boolean; capped: boolean; bytes: number };
}
```

What changed and why, one line each:

- `session()` → `bundle()`; there is one exported value and it has one name. `RecordedSession`
  survives inside it as core's format.
- `redact` takes the whole bundle, once, at export — not one frame at a time as X2 said.
  Outcome error messages and flow literals can carry values too (Codex 5), and one hook over
  one object is what a host can reason about. Frames in memory are unredacted until export;
  the README says so in the redaction recipe. §12.7's "frames dropped by redact" row is
  replaced: `meta` is computed after `redact` ran, so the preview's counts are the counts of
  what leaves. If the hook throws, nothing is copied and the preview shows 13.2's message.
- `devtools()` lives in `/headless` and is re-exported by the client entry, so a Vue or Node
  host captures refusals with the same object a React host does (Codex 3).
- `plugin` is a prop. The panel reads `plugin.outcomes` for Activity rows and `plugin.pending`
  for the strip's `… → payment pending` segment. The plugin fills `pending` from
  `beforeNavigate` (`from`, `to`) and clears it in `afterResult`; `status: 'busy'` alone never
  names a target, which is what Codex 2 caught. Without the plugin the strip shows `… pending`
  from `status` and the Activity header shows 13.2's `devtools-no-plugin` line.
- `limits` and `RecordOptions.limit` make the three caps overridable; the defaults stay.
- Stability: `WizardDevtools`, `FlowGraphView`, `devtools`, `recordSession`, `SessionBundle`
  and the types above are the public API under semver. `layoutGraph`, `formatExpr`,
  `diffState`, `PositionedGraph`, `Positioned` and `Change` are exported for the docs site and
  documented as "may change in a minor" — the note is narrowed from the whole headless entry
  (X3 said the entry) to those three functions, so the recorder is a stable API for bug reports.
- `activity` replaces `commits` as the tab value everywhere (§12.2 renamed the tab and §5.1
  still said `'commits'`).

**13.2 Every message follows the template and has a section.** `docs/errors.md` gains five
sections in PR 2, each with the message, the cause paragraph and the fix, in the shape
`[wizzard] <what went wrong>. <why>. <the fix>. <url>#<code>` (AGENTS.md). Drafted here so
the implementer copies rather than invents:

| Code                         | Message (the fix clause names both halves where two exist)                                                                                                                                                                                  | Where it shows                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `devtools-no-wizard`         | `[wizzard] devtools has no wizard to watch. It reads WizardContext or the wizard prop, and neither is set. Render <WizardDevtools/> inside <WizardProvider>, or pass wizard={wizard}. …#devtools-no-wizard`                                  | the whole panel, one line                                                  |
| `devtools-no-plugin`         | `[wizzard] refusals are not captured. The wizard was created without the devtools plugin, so a refused next() never reaches this panel. const dt = devtools(); createWizard({ flow, plugins: [dt] }); <WizardDevtools plugin={dt}/>. …#devtools-no-plugin` | Activity header; export preview line `refusals: not captured`              |
| `devtools-render-failed`     | `[wizzard] the graph could not be drawn: <message>. A layout override or a flow shape the renderer has not seen threw; the wizard, the strip, State and Activity are unaffected. Remove the layout prop to use the built-in layout, or record a session and attach it to an issue. …#devtools-render-failed` | the Graph tab only (§12.7)                                                 |
| `devtools-redact-failed`     | `[wizzard] export stopped: redact threw <message>. Nothing was copied. The hook must return a SessionBundle; fix it, or remove it to export development data unredacted. …#devtools-redact-failed`                                            | the export preview, in place of the JSON                                   |
| `devtools-bundle-unsupported`| `[wizzard] this bundle is version <n>; this reader understands version 1. Export it again with a matching @wizzard-packages/devtools, or upgrade the reader. …#devtools-bundle-unsupported`                                                   | S2's replay loader; the section is written now because the format is born here |

Refusal rows print what the engine gives and say when it gives less: `✗ next blocked · by
<plugin> · <reason>` when `by` is set; `✗ next invalid · details · email: required` from
`errors`; and when a result carries a reason and nothing else, `✗ next <reason> · the engine
reported no field or plugin` — the panel never guesses a cause. A test asserts that every
string beginning `[wizzard]` under `packages/devtools/src` matches the template regex and
that its anchor exists as a heading in `docs/errors.md` (the same check `groups.test.ts`
does by hand for one message, made general).

**13.3 The README is the getting-started path.** D4's 60-line cap is replaced by a shape:
under 150 lines, and the first screen is the path. Order: one line of what it is; a
compatibility matrix (`devtools 3.x ↔ core 1.x, react 1.x ↔ React ≥ 18`); the three steps
below; then five recipes as `##` sections, each one copy-paste-complete: **refusal
diagnosis** (the strip → Activity → inspector, with the planted-fault fixture), **headless
recording** (Node or Vue, `recordSession` with the plugin, `bundle()` to a file), **redaction**
(a `redact` that drops `data.card`, and the sentence that frames are unredacted in memory until
export), **placement** (Next.js: a client component under the form, `'use client'` in the
host file, dev gating with `process.env.NODE_ENV !== 'production'`; Vite: `import.meta.env.DEV`),
and **migration from 0.x** (13.4). The limitation Codex 4 asked for sits beside the export
example: a bundle replays states and outcomes; it does not re-run resolvers.

The three steps, with the first result named so the person knows it worked:

```bash
pnpm add -D @wizzard-packages/devtools   # peers: @wizzard-packages/core ^1, @wizzard-packages/react ^1, react >= 18
```

```tsx
import { createWizard } from '@wizzard-packages/core/v1';
import { WizardProvider } from '@wizzard-packages/react/v1';
import { WizardDevtools, devtools } from '@wizzard-packages/devtools';
import { flow } from './flow';

const dt = devtools();
const wizard = createWizard({ flow, plugins: [dt] });

export function App() {
  return (
    <WizardProvider wizard={wizard}>
      <MyForm />
      <div style={{ height: 360 }}>
        <WizardDevtools plugin={dt} />
      </div>
    </WizardProvider>
  );
}
```

Step 3 is a sentence: "Click Next with the email field empty. The strip reads
`✗ next blocked · details · email: required`; open it to see the refused intent and the
state it was refused in." The snippet is not typed into the README: it lives in
`examples/quickstart/src/Devtools.tsx`, is type-checked by the existing `type-check`
script and embedded by the `<!-- example:quickstart-devtools -->` marker the root README
already uses for the other quickstart files. No new starter package: `examples/next-app` is
the runnable one (§5.6, §12.12) and the README links it; the "outside the monorepo" proof is
R0's consumer fixture (E-M5/E-M6), which gains devtools' two entries as §9 of the Phase 1
review already states.

**13.4 Upgrading is a table, not a search.** The `major` changeset body and the README's
last recipe carry the same table:

| 0.x                                          | 3.0                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `import { WizardDevTools }`                  | `import { WizardDevtools }` — one identifier; TypeScript reports the missing export at build |
| `?devtools=true` in the URL                  | removed; render the panel where you want it, gate it yourself (13.3 placement)               |
| floating overlay, `position: fixed`          | docked; fills its container, so the container needs a height                                 |
| Actions tab (`subscribeToActions`)           | Activity: commits and refusals; refusals need `devtools()` in `plugins`                      |
| Jump (`RESTORE_SNAPSHOT`)                    | removed; rebuild a wizard from a state with `createWizard({ state })`                        |
| `@wizzard-packages/react` as a dependency    | peer `^1.0.0`; install it beside devtools                                                    |
| no recording                                 | `Record` → `Copy JSON`, or `recordSession()`; the file is a `SessionBundle` `version: 1`     |

No codemod: the migration is one renamed import and two deletions, and a codemod for one
identifier is ceremony. No alias for the old name (§5.7 stands): the compile error is the
deprecation warning, and it names the fix in the README's first recipe. Peer ranges are
written out in `package.json`: `@wizzard-packages/core ^1.0.0`, `@wizzard-packages/react
^1.0.0`, `react` and `react-dom` `>=18`. A 0.x host that installs 3.0 sees the peer warning
before the compile error.

**13.5 Entries stay unversioned** — `@wizzard-packages/devtools` and `/headless`, not
`/v1`. Devtools' own major is its version; `core/v1` and `react/v1` are the transition
aliases L8 flips to the root export, not a convention to copy into a package that has no 0.x
API to keep alive. Single-voice finding; carried to the gate as TASTE T3 because it is a
naming decision the next rewrite inherits.

**13.6 Tests added by this review.** The template-and-anchor test (13.2); `Devtools.tsx` in
quickstart type-checks; the migration table's seven rows are each a sentence in the changeset
(reviewed, not tested); `recordSession` from `/headless` in a Node test with no DOM produces a
bundle whose `outcomes` has the planted refusal (the Codex release gate's "same capture from
Node without React"); `bundle()` with a throwing `redact` returns nothing and the preview
shows `devtools-redact-failed`; `limits` are honoured (a 3-row activity ring). The Phase 2
e2e "diagnosis journey" already measures the getting-started claim end to end: it is the
TTHW test.

## 14. Amendments from the Phase 3 engineering review (2026-09-06)

These paragraphs override §3.7, §4.2, §4.3, §10, §11 (X1), §12.7, §13.1, §13.2 and §13.4
where they differ. Every one of them was checked against the engine's source before it was
written; the line numbers are from `main` `814dc8c`.

**14.1 One attempt hook replaces `afterResult`.** The store's wrapper (`store.ts:292-298`)
is the single place all four callers (`next`, `back`, `go`, and `start()` at `store.ts:378`)
enter `runNav`. Three facts made `afterResult(intent, result)` insufficient:
`beforeNavigate` receives `to: null` for `next` and `back` (`navigate.ts:238`), so a plugin
cannot name a pending target from it; `runNav` re-throws when a resolver or validator throws
(`navigate.ts:420-422`), so an attempt that ends in an exception would never reach a
"result" hook and a pending row would stay forever; and a superseded attempt's late result
would clear a newer attempt's pending state unless attempts carry an identity
(`navigate.ts:243`). Core therefore gains one optional hook, fired only from the wrapper:

```ts
// core — navigate.ts Hooks (replaces the §11 afterResult proposal)
onAttempt?: (e: Attempt) => void;

export type Attempt =
  | { id: number; intent: NavIntent; source: 'call' | 'start'; phase: 'start'; rev: number }
  | { id: number; intent: NavIntent; source: 'call' | 'start'; phase: 'end'; result: NavResult; rev: number }
  | { id: number; intent: NavIntent; source: 'call' | 'start'; phase: 'error'; error: unknown; rev: number };
```

`id` is a counter in the wrapper; `rev` is `getState().rev` at the moment of the event;
`source: 'start'` marks the engine's own first move so the Activity tab shows it as
`▶ start → details`, not as a click nobody made. The wrapper fires `start`, then awaits
`runNav` in a try/catch/finally: `end` with the result, or `error` with the thrown value
(which is then re-thrown to the caller unchanged). The call goes through the same
`disabled`/`destroyed` filter and the same `fail()` helper that `write()` uses for `onCommit`
(`store.ts:214-240`) — one helper, both call sites, so a plugin disabled for throwing in one
hook receives neither. `cancel()` still fires nothing of its own; the aborted attempt ends
with `{ ok: false, reason: 'aborted' }` through `end`. Cost: measured in PR 1; the honest
estimate is 100–150 B gzip, so the `core-v1` line moves 5.0 → 5.2 kB with this paragraph as
its reason (TASTE T2 at the gate carries the new number). The `store.ts:19-31` header gains
one sentence naming the hook.

The plugin: `devtools()` keeps `pending` per attempt id and clears it only for the matching
id; `outcomes` gains `{ id, intent, source, result | error, rev }`; an `error` phase is an
Activity row `✗ next threw · <message>` and the strip says the same. §13.1's
`pending: { from, to }` becomes `pending: { id: number; intent: NavIntent } | null`; the strip
prints the verb and, for `go`, the target: `… next pending`, `… go(payment) pending`.

**14.2 Recorded frames are settled states.** `beginNav` bumps `rev` and sets
`status: 'busy'` (`commit.ts:38`) and that write notifies subscribers (`store.ts:201-206`),
so every navigation produces at least two notifications, and the very first one after
`start()` has an empty stack with `status: 'busy'`, which `checkSession` rejects
(`session.ts:258-260`). §4.3's "one notification, one commit row" is wrong as stated.
Amended: the recorder stores a frame only when `status !== 'busy'`; the Activity tab lists
settled commits and uses the busy notifications for the pending segment alone; §4.3 reads
"one settled commit, one row". The property test in §4.6 stands unchanged, because it is
exactly what this rule protects.

**14.3 A flow change ends the recording.** `patchFlow` replaces the definition and keeps the
accumulated history (`store.ts:458-482`); a bundle carries one `flow`. When the panel sees
`getFlow()` return a different object, the recorder stops with `meta.stopped: 'flow-changed'`
and the preview says so; a new recording starts against the new flow. Each Activity row keeps
a reference to the flow object it was observed under, so a pinned row is drawn with its own
definition, not the current one (the layout memo already keys on that object, §12.3/1.2).

**14.4 The redactor gets a copy.** `WizardState` is `Readonly` one level deep
(`state.ts:28-29`); frames are the live objects `getState()` returned, and a `redact` that
deletes `bundle.session.frames[0].data.card` would edit the wizard's state without a
commit. `bundle()` runs `structuredClone` on the assembled artefact and hands the copy to
`redact`; if the clone fails (a function or a DOM node inside `data`), the export stops with
the message below. `devtools-redact-failed` is renamed **`devtools-export-failed`** and
covers both causes: `[wizzard] export stopped: <clone | redact> failed: <message>. Nothing was
copied. Recorded data must be structured-cloneable and redact must return a SessionBundle;
fix the value or the hook, or remove the hook to export development data unredacted.
…#devtools-export-failed`. A test asserts, deeply, that a mutating redactor leaves the
wizard's state and the recorder's frames untouched.

**14.5 Nothing devtools does reaches the host.** `notify()` calls listeners bare
(`store.ts:201-206`): a throwing devtools subscriber would surface inside the host's `set()`
or navigation. Every callback devtools registers — the store subscription, the plugin's
`onAttempt`/`onCommit`/`init` bodies, `onRecord`, the `sessionStorage` legend read — runs
under its own try/catch. On a failure the panel unsubscribes, keeps what it has, and the
strip shows a sixth message: `[wizzard] diagnostics stopped: <message>. A devtools listener
threw; the wizard is unaffected and this panel no longer updates. Reload the page, and
record a session and attach it to an issue if it happens again. …#devtools-stopped`. The
plugin catches inside its own hooks for the same reason, so core's `fail()` never has to
disable it for a devtools bug. §4.2 now reads "devtools never throws into the host, from a
render or from a callback", and the §4.1 test drives every control with a throwing
`onRecord` and a throwing `layout` and asserts the host's next `set()` still commits.

**14.6 Every ring has an owner.** The plugin is created before the panel and lives without
it, so its cap is its own: `devtools({ outcomes?: number })`, default 500. The recorder takes
`limits?: { frames?: number; outcomes?: number }` (defaults 2000 and 500) in place of
`limit`; when either cap is reached both subscriptions stop together and `meta.capped` names
which (`'frames' | 'outcomes' | false`), so a bundle never carries outcomes for frames it
does not have. The panel's `limits.activity` caps the commit rows it displays; refusal rows
are bounded by the plugin. A byte cap is still not added (Phase 1 §7); `meta.bytes` in the
preview is the number the person sees.

**14.7 The inspected flow is resolved through the stack, not by id.** `known` in
`session.ts` is keyed by registry key and by definition id, and the file says why resolving
a frame by name alone can pick the wrong definition (`session.ts:122-127`); `checkFrames`
walks parents for that reason. The panel does the same: the root frame resolves by name,
every frame above it through the group step of the frame below. Highlights and the inferred
edge are keyed on `(flow, step, key)`, so two sub-flows with the same step ids, or two repeat
items, never share a highlight.

**14.8 Density is edges, not nodes.** `graph.ts:204-222` emits an `order` edge from a step
to every later conditional step until an unconditional one; 200 steps that all carry `when`
produce ~20 000 edges. The perf fixture is that graph, not a chain; `layoutGraph` must
finish it under 100 ms and the memoised result must be shared. The renderer draws at most
**1 500** edges and then shows `N of M edges drawn (dense graph)` in the toolbar while the
mirror table stays complete. Dangling edges are placed against a ghost endpoint in the next
layer (drawn as the struck-through target §3.2 already describes), so the layout property
reads "every edge endpoint is a laid-out node or a ghost".

**14.9 Attachment, StrictMode and destroy.** `WizardProvider` re-creates an owned engine
under StrictMode (`react/v1/index.tsx:83-99`) and Fast Refresh can evaluate a module twice,
so one plugin object may meet two wizards in sequence, and a second `devtools()` instance may
be passed to the panel by mistake. Rules: `init` records its host and returns a cleanup;
`init` while attached replaces the attachment and clears the rings; the cleanup (run by core
on `destroy`, `store.ts:303-317`) notifies the plugin's subscribers, which is how the panel
learns of a destroy without polling `isDestroyed`. The plugin exposes `attached: boolean` and
`lastRev: number`. The panel shows the `devtools-no-plugin` message with a second form when
`plugin` is given but either `attached` is false or `lastRev` stays behind the wizard's `rev`
after a commit: "…the plugin object passed to the panel is not the one installed on this
wizard; pass the same instance to both." One test mounts the panel under
`<React.StrictMode>` and asserts one commit row per commit and one `init` attachment.

**14.10 One snapshot.** The panel subscribes to the wizard and to the plugin, and reads both
inside one `getSnapshot` for one `useSyncExternalStore` call, so a render never pairs a new
commit with a stale outcome list (the binding uses one store per hook,
`react/v1/index.tsx:143,149`; two hooks would tear).

**14.11 Headless means installable without React.** `exports` alone does not split install
requirements. `package.json` marks `react`, `react-dom` and `@wizzard-packages/react` as
optional peers (`peerDependenciesMeta`), the client entry documents that it needs them, and
R0's consumer fixtures gain a React-free Node project that imports `/headless`, records a
bundle, and type-checks.

**14.12 No broken package between PRs.** Every merge to `main` publishes to the `canary`
tag (`canary.yml`), so §10's order (delete the 0.x panel in PR 1, add the new one in PR 2)
would publish a devtools with no panel. Amended: PR 1 adds the headless entry, the fixtures,
the core hook and the tests **beside** the 0.x panel; PR 2 replaces the panel and carries the
`major` changeset; PR 3 is unchanged. The changeset's body is the 13.4 table.

**14.13 Tests corrected and added.** The §4.5 XSS test asserted `queryByRole('img')` is
null, which §12.10's `role="img"` on every node contradicts; it now asserts no `<img>`
element exists and the hostile id is present as text. Added: the attempt hook fires
`start`/`end` once per call and `error` for a throwing validator, with `source: 'start'` for
the engine's first move; a superseded attempt does not clear a newer pending; settled-only
recording (14.2); flow change stops the recording (14.3); deep immutability under a mutating
redactor (14.4); a throwing listener never reaches the host (14.5); both caps (14.6); same
step ids in two sub-flows (14.7); the dense fixture and the draw cap (14.8); StrictMode and
the wrong-instance message (14.9); one-snapshot tearing test with a commit and an outcome in
one tick (14.10); a React-free install of `/headless` (14.11); the chaos property test
interleaves Record/Stop with navigation. TTHW is a hypothesis until a person installs from
the tarball: Pass 8 says so, and R0's checklist gains that line.

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

---

<!-- /autoplan Phase 2.5: developer-experience review (DX POLISH, all 8 passes, auto-decided). Appended 2026-09-06. -->

## Step 0: DX Scope Assessment

**Product type: Library/SDK** — a React component plus a React-free API, installed from npm,
imported into an existing app. Secondary: Documentation (the README is the only entry point
until S3 exists). Not a CLI, not a platform. Prior DX reviews on this project: none logged
(`gstack-review-read` has no `plan-devex-review` rows), so every score below has no trend.

**Pre-review audit, what the developer meets today.** `packages/devtools/README.md` (39 lines)
teaches `WizardDevTools` and `?devtools=true`, both removed by this plan; `package.json` says
`2.0.1`, depends on `@wizzard-packages/react` and peers `core`; `CHANGELOG.md` last entry is
the 2.0.1 types fix; `docs/errors.md` has two sections (`groups-not-installed`,
`repeat-keys`) and the plan named one more (`devtools-no-wizard`) without drafting it;
`examples/quickstart` is type-check only, `examples/next-app` runs under Playwright;
`react/v1` exports `useWizard` but not `WizardContext` (added by §11); `Hooks` has
`beforeNavigate`/`afterNavigate` and no `afterResult` (added by §11). `jq` is installed on
this machine now, so the tasks JSONL below is written with it.

**0A. Persona** (auto-selected, P6: the most common developer for a React panel is the one
who already has a wizard and cannot see why it stalled):

```
TARGET DEVELOPER PERSONA
========================
Who:       React application developer with a v1 wizard already mounted; TypeScript; pnpm or npm
Context:   a step will not advance and the form shows nothing; they install devtools to see why
Tolerance: ~5 minutes and one README screen; a second config decision ("where does it mount,
           how big, how do I gate it") is where they close the tab
Expects:   one install, one component, the answer visible without reading a second page;
           types that autocomplete the props; nothing that ships to production by accident
```

Second persona, weighted lower: a Vue or Node user who wants the same bug-report file
without React (the headless entry exists for them; the persona shapes recipes 2 and 3).

**0B. Empathy narrative** (the path as the note stood at `3069ddf`, before §13):

I have a wizard that stops on step two and I do not know why. I search the package, find
`@wizzard-packages/devtools`, and the README on npm shows `import { WizardDevTools }` and a
URL flag. I install 3.0.0 and the import does not exist; nothing tells me the new name. I open
the design note instead of a README, because that is what there is. §5.1 gives me props:
`wizard`, `subFlows`, `layout`, `onRecord`, `defaultTab`. I mount `<WizardDevtools />` under my
form and see a graph and a state tab; the strip says `— no navigation yet`, then after a click
`… pending`, then nothing. My refusal is not there. Somewhere in §11 there is a `devtools()`
plugin that I must pass to `createWizard` **and** to the panel as `plugin`, but §5.1 does not
have a `plugin` prop and the in-panel hint tells me half of it. I get it working on the third
try, about twelve minutes in. Then I want to send the recording to a colleague: `onRecord`
gives me a `RecordedSession` in one section and a `SessionBundle` in another, and `record` and
`recordSession` are both names for the thing. I copy the JSON, and only then wonder whether my
users' card numbers are in it. The tool is good once it is on; the road to "on" is where I
nearly stopped.

**0C. Competitive benchmark.** Search was not run in this pipeline (P3: the four closest
tools' setups are stated in their own READMEs and have not changed this year); reference
values:

```
COMPETITIVE DX BENCHMARK
=========================
Tool                          | TTHW    | Notable DX choice                                    | Source
TanStack Query Devtools       | ~1 min  | one component, mounts itself, dev-only build by default | package README
React Hook Form DevTool       | ~1 min  | <DevTool control={control} />; one prop                 | package README
Redux DevTools                | ~3 min  | browser extension + composeWithDevTools; time travel    | extension docs
XState / Stately inspector    | ~3 min  | createBrowserInspector(); the graph view is now hosted, paid tier | @statelyai/inspect README
THIS PLAN (before §13)        | ~7 min  | bare panel 4 steps; diagnostics needs 2 unsignposted steps | note §5.1/§11
THIS PLAN (after §13)         | ~4 min  | 3 steps; plugin named in the same snippet; first result named | §13.3
```

Target tier: **Competitive (2–5 min)** for the diagnostic path, not the bare panel — the
bare panel is not the product's value (Phase 1, both voices). Champion (< 2 min) would need
the panel to self-install into `createWizard`, which crosses the "devtools never mutates the
wizard" invariant (§4.1) and is not taken.

**0D. Magical moment.** The strip reading `✗ next blocked · details · email: required` the
first time the person clicks Next with a bad field — the question they installed the tool to
answer, answered on the default tab without a tab switch (§12.1). Delivery vehicle: **copy-paste
snippet with the first result named** (option B in the skill's terms; P5, lowest effort that
reaches the tier), backed by the runnable `examples/next-app` and its diagnosis-journey e2e
(§12.12). No playground: there is no site yet (S3), and a hosted sandbox for a dev panel is
out of proportion.

**0E. Mode: DX POLISH** (override; enhancement of an existing published package). No scope
additions beyond what a finding requires; every touchpoint made exact.

**0F. Journey map** (9 stages; friction points auto-decided, each one's fix cited):

| Stage           | Developer does                                        | Friction found (evidence)                                                                                          | Status            |
| --------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------- |
| 1. Discover     | npm search / the root README's Packages table         | the npm README describes 0.x; `2.0.1` is `latest`                                                                  | fixed (13.3, 13.4; version D1 at gate) |
| 2. Evaluate     | reads the README's first screen                       | no compatibility matrix; "≤ 60 lines" had no content plan (Codex 4, Claude MEDIUM)                                 | fixed (13.3)      |
| 3. Install      | `pnpm add -D @wizzard-packages/devtools`              | peer range for `@wizzard-packages/react` unspecified (Claude MEDIUM)                                               | fixed (13.4)      |
| 4. Hello world  | mounts `<WizardDevtools/>`                            | container needs a height; nobody said so; dev gating undecided (Codex 1)                                           | fixed (13.3 snippet + placement recipe) |
| 5. Integrate    | wants refusals                                        | two connections (`plugins: [dt]` and `plugin={dt}`), §5.1 had no `plugin` prop, the hint stated half (both voices) | fixed (13.1, 13.2 `devtools-no-plugin`) |
| 6. Debug        | reads a refusal row / an error line                   | `blocked` without `by` had no wording; boundary text said "file an issue" with no link (both voices)               | fixed (13.2)      |
| 7. Upgrade      | 2.0.1 → 3.0.0                                         | no migration contract: rename, URL flag, Jump, placement, exports, format (both voices)                            | fixed (13.4)      |
| 8. Scale        | long sessions, big states                             | caps fixed at 500/2000/200 (Claude MEDIUM)                                                                         | fixed (13.1 `limits`) |
| 9. Migrate away | stops using devtools                                  | nothing to undo: no runtime coupling; the core hook is optional and inert                                          | ok                |

**0G. First-time developer confusion report** (annotated with the fix):

```
FIRST-TIME DEVELOPER REPORT
============================
Persona: React app developer, wizard stuck on step two
Attempting: install devtools, see why Next does nothing

CONFUSION LOG:
T+0:00  npm page shows WizardDevTools + ?devtools=true. Installs 3.0.0. Import fails.        → 13.4 table, README first recipe
T+0:45  Finds WizardDevtools in the .d.ts. Mounts it. Sees nothing: container has no height. → 13.3 snippet wraps it in a sized div
T+1:30  Panel visible. Clicks Next. Strip says "… pending" then "— no navigation yet" again.  → 13.1 pending from the plugin; 13.2 no-plugin line
T+3:00  Reads Activity header: "pass devtools() to createWizard". Does that. Still no row.    → 13.2 message names both halves (plugins: [dt] AND plugin={dt})
T+5:30  Finds `plugin` in §11 prose. Adds the prop. Refusal row appears with the field.       → 13.1 `plugin` in the props type; autocomplete shows it
T+7:00  Wants to share. onRecord gives RecordedSession? SessionBundle? record or recordSession? → 13.1 one name, one type
T+8:00  Copies JSON; wonders about PII; finds `redact` mentioned per frame, then per bundle. → 13.1 one hook at export; 13.3 redaction recipe
T+9:00  Succeeded, annoyed. Would not have finished without the design note open.           → 13.3 the README is the path; TTHW target 4 min
```

All eight confusion points are addressed in §13 (P1: fix every one; none is a taste call).

## Step 0.5: Dual Voices (DX)

Both voices ran against the plan at `3069ddf` (§1–12 plus the Phase 1/2 appendix). Verbatim
transcripts are in the session log; condensed here with their numbering kept.

### CODEX SAYS (DX — developer experience challenge)

Verdict: a promising diagnostic UI that does not yet meet the five-minute setup or the
confident-upgrade target. Five findings, High unless noted:

1. **Hello-world path missing.** About seven steps (app, install + peers, flow, provider +
   form, a stable plugin instance, connecting the plugin to the engine and to the panel,
   navigate); dev-only mounting and container sizing add decisions. The 0.x README teaches the
   old component; `examples/quickstart` is type-check only. Required: one runnable starter and
   one copy-paste-complete example (versions, imports, plugin lifetime, provider wiring, panel
   dimensions, dev gating, expected first result), tested from the published package outside
   the monorepo.
2. **Errors.** `blocked`, `by`, `errors` do not always say why a guard refused or what to
   change; the plugin-absent hint omits the `plugins: [dt]` shape and the `plugin={dt}`
   connection; `docs/errors.md` covers groups only; the renderer fallback has no docs link;
   redaction failures need a visible recovery instruction. When the engine cannot distinguish
   causes, say so. Contract gap: `afterResult` runs after resolution, yet the UI promises
   pending action names; `status: 'busy'` cannot supply them.
3. **API.** `devtools()` is exported from the React entry only — a Vue/Node user has no
   React-free route to refusal capture. Unresolved: how `recordSession` receives the plugin
   and `subFlows`; whether `session()` returns `RecordedSession` or `SessionBundle`; where
   `plugin` and redaction appear in the final props; `'commits'` vs `'activity'`; how redaction
   "drops frames" when it returns a state. Required: one authoritative export list with
   complete signatures; export the plugin from `/headless`; show reduced capability without it.
4. **Docs (Medium).** "≤ 60 lines" has no findability criteria. Required: a short README with a
   compatibility matrix at the top linking five recipes (install, refusal diagnosis, headless
   recording, redaction, migration); complete React and headless examples; Next.js placement;
   the "inspects recorded states, does not re-execute resolvers" limitation beside the export.
5. **Upgrade.** 3.0.0 is understandable; the migration contract is missing (capitalisation,
   URL activation, placement, Jump, split exports, recording format). "/headless may change in
   a minor" while it is the recording API makes upgrades unpredictable: stabilise the recorder,
   isolate the renderer helpers. Add a bundle-format version and reject unsupported recordings
   with an actionable message. Redaction must cover the whole artefact.

Release gate proposed: a fresh install diagnoses a refusal and exports a redacted bundle in
under five minutes; the same capture from Node without React; a tested migration recipe.

### CLAUDE SUBAGENT (DX — independent review)

- **Getting started:** 4 steps for the bare panel (plausibly under 5 min). MEDIUM: no
  copy-paste snippet anywhere; the 60-line README is unproven. HIGH: the product's own value
  needs two unsignposted steps (plugin into `createWizard` and `plugin={dt}`); the in-panel
  hint states only half.
- **API:** CRITICAL: `WizardDevtoolsProps` (§5.1) is stale against §11/§12 — no `plugin`
  prop; `onRecord` typed with `RecordedSession` while §11/§12 say `SessionBundle`. HIGH:
  `record` vs `recordSession` inconsistent across the document. HIGH: no bridge from
  `WizardDevTools` to `WizardDevtools` plus the 3.0.0 jump. MEDIUM: entries unversioned while
  the family uses `/v1`. MEDIUM: caps not configurable.
- **Errors:** HIGH: boundary text has no docs link ("file an issue" is not a fix); HIGH: the
  plugin-absent header lacks the `[wizzard]` prefix, a link and half the fix; the
  `devtools-no-wizard` section was never drafted; no anchors planned for the other messages.
- **Docs:** MEDIUM: no information architecture or example content beyond "≤ 60 lines".
- **Escape hatches:** caps and truncation lengths not overridable; MEDIUM: the peer range for
  `@wizzard-packages/react` is unspecified.
- Verdict: getting started YES (bare) / NO (diagnostics); naming NO; errors NO; docs NO;
  upgrade NO; dev environment YES (peer-range caveat).

### DX DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════════════
  Dimension                           Claude      Codex   Consensus
  ──────────────────────────────────── ─────────── ─────── ────────────────────────────────
  1. Getting started < 5 min?          YES* / NO   NO      CONFIRMED NO for the diagnostic path
                                                           (* bare panel only) → 13.3
  2. API/CLI naming guessable?         NO          NO      CONFIRMED NO → 13.1
  3. Error messages actionable?        NO          NO      CONFIRMED NO → 13.2
  4. Docs findable & complete?         NO          NO (M)  CONFIRMED NO → 13.3
  5. Upgrade path safe?                NO          NO      CONFIRMED NO → 13.4, 13.1 (version: 1,
                                                           stable recorder)
  6. Dev environment friction-free?    YES         YES†    CONFIRMED YES († implicit: no finding)
═══════════════════════════════════════════════════════════════════════════════════════
```

5/6 confirmed as gaps and fixed in §13; 1/6 confirmed sound; **0 DISAGREE rows**. Single-voice
items: unversioned entries (Claude, MEDIUM) → **TASTE T3** at the gate with "keep unversioned"
recommended (13.5); configurable caps (Claude) → `limits` (13.1, P1, cheap); pending-intent
capture (Codex 2) → `plugin.pending` from `beforeNavigate` (13.1); redaction over the whole
artefact (Codex 5) → one bundle hook at export (13.1). Codex's release gate is adopted as the
tests in 13.6 plus the Phase 2 e2e. Not a User Challenge: neither voice asked to change the
owner's direction (publish, docked panel, no time travel); both asked for the path to it.

## Pass 1: Getting Started Experience — 4/10 → 8/10

Was a 4: the bare panel took four steps and produced a graph with no story; the diagnostic
path took about seven, two of them discoverable only from §11 prose; container height and dev
gating were left to the person (0F rows 4–5, 0G T+0:45–T+5:30). Competitors mount in one line
(0C), but none of them has to be told about a plugin, so the fair comparison is the three-step
snippet in 13.3, which names the plugin in the same file and names the first result. TTHW
estimate after §13: ~4 minutes (install 1, paste 1, click and read 1, one wrong turn budgeted)
— Competitive tier, the tier chosen in 0C. Magical moment (0D) is in the plan: the strip's
refusal on the default tab, with the e2e as its proof. Stripe test: yes, one terminal and one
editor session, no second page. What keeps it from 10: the peers must be installed by hand
(the family is separate packages by design, §5.2), and the panel needs a sized container —
both stated in the snippet, neither removed. Auto-decided (P5): no auto-mount, no
self-installing plugin (§4.1).

## Pass 2: API/CLI/SDK Design — 3/10 → 9/10

Was a 3, and both voices said so: the props type in §5.1 contradicted §11 and §12
(no `plugin`, `onRecord(RecordedSession)`, `'commits'`), two names for the recorder, two
types for its output, the plugin reachable from React only, and caps with no override. The
"one example" test failed: a person who read §5.1 could not reach the refusal log. 13.1 is
the fix: one surface, one name per thing, the same object exported from both entries, every
prop with a default, `limits` as the escape hatch, stability stated per export. Consistency
with the family: `recordSession` and `diffState` follow `buildGraph`/`checkSession`
(verb-noun); `devtools()` returns a `Hooks` object like `persist()` and `groups`, so
`plugins: [dt]` is the shape a v1 user already knows; `WizardLike` is the `Pick` the invariant
§4.1 already required. Progressive disclosure: `<WizardDevtools/>` alone shows the graph and
state; `plugin` adds refusals; `redact`/`limits`/`layout` are the third layer. What keeps it
from 10: the two-object handshake (`plugins: [dt]` and `plugin={dt}`) is inherent to "devtools
never mutates the wizard" and cannot be one step without the engine knowing about devtools
(rejected, hard rule 3 spirit); it is now one snippet and one error message. Auto-decided
(P5): `bundle()` over `session()`; `plugin` prop over a global registry; `activity` everywhere.

## Pass 3: Error Messages & Debugging — 3/10 → 9/10

Three error paths traced, before and after:

| Path                              | The developer saw (before §13)                                                        | Sees now (13.2)                                                                         | Tier   |
| --------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------ |
| panel mounted, plugin missing     | "refusals are not captured — pass `devtools()` to `createWizard`" (half the fix, no prefix, no link) | `[wizzard] refusals are not captured. … const dt = devtools(); createWizard({…, plugins: [dt] }); <WizardDevtools plugin={dt}/>. …#devtools-no-plugin` | Tier 2 |
| renderer throws                   | "failed to render: <message>. … Record a session and file an issue." (no link, no fix) | `[wizzard] the graph could not be drawn: … Remove the layout prop …, or record a session … …#devtools-render-failed`; Graph tab only | Tier 2 |
| `redact` throws at export         | "frame dropped, console.error once" (Phase 1 §2) — the person copies a partial bundle unaware | `[wizzard] export stopped: redact threw … Nothing was copied. … …#devtools-redact-failed` in the preview | Tier 2 |

Every message now has what happened, why, the fix and the anchor; the anchor sections are
drafted, not promised; a test enforces the template and the anchor's existence (13.2). The
refusal rows print the engine's `reason`, `by` and `errors` and say when the engine gave
less, instead of inferring a cause. Blast radius is stated in each message ("the wizard … is
unaffected"). Debug mode: none needed; the panel is the debug mode, and its own failures are
visible in it (Phase 1 §8). Stack traces: the boundary shows `<message>` only; the full error
goes to `console.error` once, which a developer tool may do. What keeps it from 10: Tier 1
(Elm-style, pointing at the line of the host's code) is not reachable from a runtime panel.
Auto-decided (P1): five anchors, not one; the template test.

## Pass 4: Documentation & Learning — 2/10 → 8/10

Was a 2: a 39-line README about a product this plan deletes, and a line budget in place of a
plan for the new one. 13.3 gives the README a shape (matrix → three steps → five recipes), a
first screen that is the path, copy-paste-complete recipes that are type-checked from
`examples/quickstart` and embedded by the marker the root README already uses (reuse, P4),
the runnable `examples/next-app` linked, and the replay limitation beside the export example.
Versioning: the matrix row is the version story (D1 at the gate). Tutorial vs reference: the
recipes are the tutorial; the `.d.ts` with doc comments is the reference until S5 renders it.
Interactive: none until S3 (out of scope, stated). What keeps it from 10: no site, no search,
no live example — S1–S5 own those. Auto-decided (P5, P4): README under 150 lines with the
shape above rather than a `docs/devtools/` tree; the snippet lives in quickstart, not typed twice.

## Pass 5: Upgrade & Migration Path — 2/10 → 8/10

Was a 2: a breaking major with the version question open, no migration text, the recorder on
an entry labelled unstable, an unversioned file format. 13.4 writes the seven-row migration
table into the changeset and the README; 13.1 versions the bundle (`version: 1`) and moves
the stability line from the entry to the three renderer helpers so `recordSession` is under
semver; 13.2 gives the reader of a future bundle a message; peer ranges are explicit. No
codemod (one identifier; P5) and no alias (§5.7): TypeScript's missing-export error is the
deprecation warning and the README's first recipe names the fix. Semver is followed: 3.0.0
above 2.0.1 for a breaking change (D1, gate). What keeps it from 10: the number does not
match the family's, which is the User Challenge the gate decides, and there is no deprecation
period — 2.x cannot warn about 3.x because 2.x is the dead 0.x panel.

## Pass 6: Developer Environment & Tooling — 7/10 → 9/10

Both voices: sound. Types ship (`.d.ts` and `.d.cts`, publint and attw in `check:pack`);
autocomplete shows `plugin` now that it is in the props type; CI needs nothing special (the
e2e runs in the existing Playwright `next` project); the directive test guards RSC; Windows,
mac and Linux are the same code (no native deps); testing support is `recordSession` from
`/headless` in any Node test with no DOM, plus `contract/fixtures.ts` with the planted faults
(X8) as ready-made cases; observability is the panel itself and the bundle. The peer range
was the one gap (13.4). What keeps it from 10: no watch-mode story for the panel's own
development beyond `tsup --watch` (fine for a package this size) and the build-before-test
order the worktree learning records (`pnpm build` before cross-package tests).

## Pass 7: Community & Ecosystem — 5/10 → 6/10

MIT, public repository, issues open, `CONTRIBUTING`-level guidance in `AGENTS.md`;
`examples/next-app` is a real-usage example once it mounts the panel; extension points are
the `layout` prop and the `redact` hook, both documented. No community channel exists and
none is created here (out of scope; a channel for a package with bot-level downloads is
noise). The bundle format is the ecosystem hook: an issue template that asks for a
`SessionBundle` is one file in `.github/` and is added to PR 3 (P2: in blast radius, ten
lines). Ceiling accepted at 6 until there are users.

## Pass 8: DX Measurement & Feedback Loops — 4/10 → 7/10

TTHW is measured by the diagnosis-journey e2e (§12.12): its step count and its wall time are
the instrument, run on every PR; the README's three steps are asserted by the quickstart
type-check and the embed marker. Journey analytics: none — a development tool sends nothing
(Phase 1 §8), and that is a feature. Feedback mechanism: the issue template with the bundle
(Pass 7). Friction audit: `/devex-review` against the built package after PR 3, logged with
this review as the baseline (the review log below carries `tthw_current` and `tthw_target`).
What keeps it from 10: no telemetry by decision, so real-world TTHW stays anecdotal.

## Required Outputs (DX)

### Developer persona card, empathy narrative, benchmark, magical moment, journey map, confusion report

Above, in Step 0 (0A–0G), each grounded in the files named in the pre-review audit.

### NOT in scope (DX)

- A hosted playground or sandbox — no site yet (S3); a panel does not need one.
- A codemod — one renamed import.
- An alias for `WizardDevTools` — decided against in §5.7; the compile error is the notice.
- Auto-mounting or a self-installing plugin — crosses "devtools never mutates the wizard".
- A community channel — nothing to moderate yet.
- Telemetry or usage analytics — a development tool sends nothing.
- `/v1`-versioned entries — TASTE T3 at the gate; recommendation is no.

### What already exists (DX)

The A4 message template and `docs/errors.md` with two worked sections; `groups.test.ts`'s
anchor assertion as the model for the template test; the root README's `<!-- example:… -->`
embed markers and `examples/quickstart`'s "one source, three consumers" pattern; the
`plugins: [...]` shape from `persist()` and `groups`; `examples/next-app` with its Playwright
project; `check:pack` (publint, attw) for the entries; the fast-check and worktree-build
learnings.

### TODOS.md updates (DX)

None proposed: every gap is fixed in §13 rather than deferred. The one deferrable item
(issue template) is small enough to land in PR 3.

### DX Scorecard

```
+====================================================================+
|              DX PLAN REVIEW — SCORECARD                             |
+====================================================================+
| Dimension            | Score  | Prior  | Trend  |
|----------------------|--------|--------|--------|
| Getting Started      |  8/10  |  4/10  | +4 ↑   |
| API/CLI/SDK          |  9/10  |  3/10  | +6 ↑   |
| Error Messages       |  9/10  |  3/10  | +6 ↑   |
| Documentation        |  8/10  |  2/10  | +6 ↑   |
| Upgrade Path         |  8/10  |  2/10  | +6 ↑   |
| Dev Environment      |  9/10  |  7/10  | +2 ↑   |
| Community            |  6/10  |  5/10  | +1 ↑   |
| DX Measurement       |  7/10  |  4/10  | +3 ↑   |
+--------------------------------------------------------------------+
| TTHW                 | ~4 min | ~7 min | -3 ↑   |  (diagnostic path; bare panel ~2 min)
| Competitive Rank     | Competitive (2-5 min)                        |
| Magical Moment       | designed via copy-paste snippet + next-app e2e |
| Product Type         | Library/SDK (React component + headless API) |
| Mode                 | POLISH                                       |
| Overall DX           |  8/10  |  4/10  | +4 ↑   |
+====================================================================+
| DX PRINCIPLE COVERAGE                                               |
| Zero Friction      | covered (3 steps, first result named)          |
| Learn by Doing     | covered (quickstart file, next-app, fixtures)  |
| Fight Uncertainty  | covered (5 anchors, template test, honest rows)|
| Opinionated + Escape Hatches | covered (defaults + limits/layout/redact) |
| Code in Context    | covered (placement recipe: Next.js and Vite)   |
| Magical Moments    | covered (the strip on the default tab)         |
+====================================================================+
```

"Prior" is the plan at `3069ddf`, not an earlier review (none exists). No dimension is below
6; nothing is flagged as critical DX debt. TTHW is under 5 minutes: not blocking.

### DX Implementation Checklist

```
DX IMPLEMENTATION CHECKLIST
============================
[x] Time to hello world < 5 min (diagnostic path ~4 min; asserted by the diagnosis-journey e2e)
[x] Installation is one command (peers listed on the same line)
[x] First run produces meaningful output (the strip's refusal; named in step 3)
[x] Magical moment delivered via copy-paste snippet + runnable example
[x] Every error message has: problem + cause + fix + docs link (five anchors, template test)
[x] API naming is guessable without docs (verb-noun; plugins: [dt]; one name per thing)
[x] Every parameter has a sensible default (13.1 lists each)
[x] Docs have copy-paste examples that actually work (type-checked in quickstart; embedded)
[x] Examples show real use cases (planted-fault fixtures; next-app journey)
[x] Upgrade path documented with migration guide (13.4 table in changeset + README)
[~] Breaking changes have deprecation warnings + codemods (compile error as the warning; no codemod by decision)
[x] TypeScript types included (.d.ts + .d.cts; publint/attw)
[x] Works in CI/CD without special configuration (existing Playwright project)
[x] Free tier available (MIT)
[x] Changelog exists and is maintained (changesets)
[ ] Search works in documentation (no site yet — S3)
[ ] Community channel exists and is monitored (none; out of scope)
```

## Implementation Tasks (DX)

Synthesized from this review's findings. Each task derives from a specific finding above.

- [ ] **T1 (P1, human: ~3h / CC: ~25min)** — devtools — Rewrite the public surface to §13.1: `WizardDevtoolsProps` with `plugin`, `redact`, `limits`, `onRecord(bundle)`, `defaultTab` incl. `'activity'`; `DevtoolsPlugin` with `outcomes`, `pending`, `subscribe`; `Recorder.bundle()`; `SessionBundle` `version: 1`; `devtools`/`recordSession` on `/headless`, re-exported by the client entry
  - Surfaced by: Pass 2 — both voices: §5.1 stale, two names, React-only plugin
  - Files: `packages/devtools/src/index.ts`, `packages/devtools/src/headless/index.ts`, `packages/devtools/src/headless/record.ts`, `packages/devtools/src/headless/plugin.ts`, `packages/devtools/src/WizardDevtools.tsx`
  - Verify: `pnpm --filter @wizzard-packages/devtools type-check`; a type-level test that the export list equals 13.1
- [ ] **T2 (P1, human: ~1h / CC: ~10min)** — devtools — `devtools()` implements `beforeNavigate` to set `pending {from,to}` and `afterResult` to push the outcome and clear it; the strip reads `… → <to> pending` from the plugin, `… pending` from `status` without it
  - Surfaced by: Step 0.5 — Codex 2: `afterResult` cannot supply pending names
  - Files: `packages/devtools/src/headless/plugin.ts`, `packages/devtools/src/Strip.tsx`
  - Verify: unit — a slow `beforeNavigate` guard leaves the strip at `… → payment pending`, then `✓ next → payment`
- [ ] **T3 (P1, human: ~2h / CC: ~20min)** — devtools + docs — Five `docs/errors.md` sections from the 13.2 table, the messages in code, refusal-row wording incl. "the engine reported no field or plugin", and the template-and-anchor test over `packages/devtools/src`
  - Surfaced by: Pass 3 — both voices: half-fixes, no links, undrafted anchor
  - Files: `docs/errors.md`, `packages/devtools/src/messages.ts`, `packages/devtools/src/messages.test.ts`, `packages/devtools/src/boundary.tsx`, `packages/devtools/src/Activity.tsx`
  - Verify: `pnpm --filter @wizzard-packages/devtools test:run` — the template test fails on any `[wizzard]` string without a heading
- [ ] **T4 (P1, human: ~1.5h / CC: ~15min)** — devtools — `redact` applied once in `bundle()`; `meta` computed after it; a throwing hook aborts the export and the preview shows `devtools-redact-failed`; the preview's counts are post-redaction; `limits`/`limit` honoured for the three caps
  - Surfaced by: Step 0.5 — Codex 5 (whole-artefact redaction), Claude (caps not configurable)
  - Files: `packages/devtools/src/headless/record.ts`, `packages/devtools/src/ExportPreview.tsx`, `packages/devtools/src/Activity.tsx`
  - Verify: unit — `bundle()` with a redact that drops `data.card` yields a bundle without it and `meta.redacted: true`; a throwing redact copies nothing; a 3-row activity ring
- [ ] **T5 (P1, human: ~3h / CC: ~30min)** — docs + examples — README per 13.3 (matrix, three steps, five recipes, replay limitation, under 150 lines); `examples/quickstart/src/Devtools.tsx` type-checked and embedded via `<!-- example:quickstart-devtools -->`; the next-app link
  - Surfaced by: Pass 1, Pass 4 — both voices: no hello-world path, no README plan
  - Files: `packages/devtools/README.md`, `examples/quickstart/src/Devtools.tsx`, `examples/quickstart/package.json` (devtools dep), the README embed script
  - Verify: `pnpm --filter @examples/quickstart type-check`; the embed check the root README already runs
- [ ] **T6 (P1, human: ~1h / CC: ~10min)** — devtools — Migration table 13.4 in the `major` changeset body and the README's last recipe; `package.json` peers `@wizzard-packages/core ^1.0.0`, `@wizzard-packages/react ^1.0.0`, `react`/`react-dom` `>=18`; `exports` for `.` and `./headless` with split types; stability note narrowed to the three helpers
  - Surfaced by: Pass 5 — both voices: no migration contract; Claude: peer range unspecified
  - Files: `.changeset/*.md`, `packages/devtools/package.json`, `packages/devtools/README.md`
  - Verify: `pnpm check:pack` clean; `pnpm changeset status` lists devtools as major
- [ ] **T7 (P2, human: ~1h / CC: ~10min)** — devtools — Headless Node test: `recordSession(wizard, { plugin: dt })` with no DOM produces a bundle whose `outcomes` carries the planted `flowA` refusal and passes `checkSession`
  - Surfaced by: Step 0.5 — Codex release gate: "same capture from Node without React"
  - Files: `packages/devtools/src/headless/record.test.ts`, `contract/fixtures.ts`
  - Verify: `pnpm --filter @wizzard-packages/devtools test:run` under the node environment
- [ ] **T8 (P2, human: ~30min / CC: ~5min)** — repo — Issue template asking for a `SessionBundle` (how to record it, the redaction sentence); `devtools-bundle-unsupported` section reserved for S2's loader
  - Surfaced by: Pass 7, Pass 8 — feedback loop is the bundle
  - Files: `.github/ISSUE_TEMPLATE/bug-report.md`, `docs/errors.md`
  - Verify: the template renders on the "New issue" page

_No new tasks from Pass 6 (peer range is in T6)._

### Phase 2.5 Completion Summary

```
  +====================================================================+
  |          DEVEX PLAN REVIEW — COMPLETION SUMMARY                    |
  +====================================================================+
  | Product type         | Library/SDK; mode POLISH; persona: React dev |
  | Step 0               | 4/10 initial; TTHW ~7 min → ~4 min (target <5) |
  | Pass 1  (Start)      | 4/10 → 8/10                                 |
  | Pass 2  (API)        | 3/10 → 9/10                                 |
  | Pass 3  (Errors)     | 3/10 → 9/10                                 |
  | Pass 4  (Docs)       | 2/10 → 8/10                                 |
  | Pass 5  (Upgrade)    | 2/10 → 8/10                                 |
  | Pass 6  (Env)        | 7/10 → 9/10                                 |
  | Pass 7  (Community)  | 5/10 → 6/10 (ceiling until users)           |
  | Pass 8  (Measure)    | 4/10 → 7/10                                 |
  +--------------------------------------------------------------------+
  | NOT in scope         | written (7 items)                           |
  | What already exists  | written                                     |
  | TODOS.md updates     | 0 items proposed                            |
  | Decisions made       | 6 amendments (§13.1–13.6), 8 tasks          |
  | Taste at the gate    | 1 (T3 unversioned entries)                  |
  | Dual voices          | ran (codex + claude subagent)               |
  | Overall DX score     | 4/10 → 8/10                                 |
  +====================================================================+
```

> **Phase 2.5 complete.** DX overall: 8/10. TTHW: ~7 min → ~4 min (target < 5).
> Codex: 5 concerns. Claude subagent: 11 issues.
> Consensus: 5/6 confirmed as gaps (fixed in §13), 1/6 confirmed sound, 0 disagreements;
> 1 single-voice taste item (T3) → surfaced at gate.
> Passing to Phase 3 (Eng Review — the required gate reviews the final amended plan).

---

<!-- /autoplan Phase 3: engineering review (all four sections, dual voices, auto-decided). Appended 2026-09-06. -->

## Step 0: Scope Challenge (Eng)

Read for this step, at `main` `814dc8c`: `packages/core/src/v1/store.ts` (the wrapper at
292–298, `write` and `fail()` at 213–240, plugin `init` at 303–317, `patchFlow` at 458–482,
`getFlow` at 323), `navigate.ts` (`runNav` 208–424, `Hooks` 59–87, `NavResult` 41–49),
`commit.ts:32-40`, `session.ts:118-130, 250-264`, `graph.ts:200-224`, `react/v1/index.tsx`
(context at 40, `useWizard` throw at 107, StrictMode handling 83–99, directive at 3),
`packages/devtools/src/*` (one 416-line file importing `useWizardContext`,
`subscribeToActions`, `RESTORE_SNAPSHOT` — all 0.x, none in v1), `.size-limit.js` (no
devtools line; `core-v1` 5.0 kB at 83; `react-v1` 1.1 kB at 207), `examples/next-app`
(`page.tsx` is a server component; `steps.tsx` is the client boundary), `playwright.config.ts`
(project `next` at 69–76, web server at 101–110), `scripts/embed-examples.mjs`, `ci.yml`
(build → unit → publint/attw/size on Node 22; a second `e2e` job), `canary.yml`,
`.husky/pre-push` (`pnpm test:run`).

1. **Existing code per sub-problem** — unchanged from Phase 1 Step 0B, with two corrections
   from reading: `evaluate` lives on the `core-v1` main entry (`index.ts:3` re-exports
   `expr.ts`), not on `/expr`, so the panel's live `when` costs no new entry; `WizardContext`
   exists (`index.tsx:40`) and is simply not exported — a one-word change.
2. **Minimum set** — the four pure modules, the fixtures, the panel, the size line. Everything
   else is evidence for the product's value (X1, X2, X8) or a hard rule (A3, A4). Nothing is
   deferred (override: never reduce).
3. **Complexity check** — triggers (eleven source files plus fixtures, one core hook, one
   example edit, one CI fixture). Proceed: each file is one module with one test, and the
   count comes from a rewrite, not from abstraction (P5, P2). No AskUserQuestion mid-run.
4. **Search check** — no live search in this pipeline (P3). Patterns and their layer:
   layered graph layout **[Layer 3]** (nothing in React or the DOM lays out a DAG; dagre/elk
   are the Layer 1 answers and the `layout` prop admits them); `useSyncExternalStore` with
   two sources **[Layer 1, footgun]** — one hook per store tears; merged in 14.10;
   `structuredClone` **[Layer 1]** — Node ≥ 17 and every current browser; the failure mode
   (functions, DOM nodes) is a message, 14.4; `ResizeObserver` **[Layer 1]**; error
   boundaries as a class **[Layer 1]** (React has no hook form); an attempt id carried through
   an async pipeline **[Layer 3]** — the engine already uses `nav` tokens for the same problem
   (`commit.ts:33`), and 14.1 copies the idea rather than the token.
5. **TODOS cross-reference** — `TODOS.md` holds `url-sync` (P2), the bindings' a11y contract
   (P2) and inspector URL state (P3); none blocks L5, none is bundled. This plan adds two
   items (below).
6. **Completeness** — the plan proposes the complete version at every fork (Lake Score
   below). One shortcut was found and removed: `afterResult` was the minimal hook; the
   complete one (14.1) is the same call site with three phases.
7. **Distribution** — `publish.yml` and `canary.yml` exist; changesets publish; the two
   entries are declared in `exports` with split types and checked by publint and attw in CI;
   the consumer fixture (R0) now includes a React-free import. Nothing deferred.

Scope: **accepted as amended** (no reduction; §14 adds correctness, not surface).

## Step 0.5: Dual Voices (Eng)

Both voices ran against the plan at `42a38bf` (§1–13 plus the appendix). Codex replied in
Russian; the content is used, the transcript is in the session log.

### CODEX SAYS (eng — architecture challenge)

Fourteen findings, every one checked against the source before acceptance:

1. **(high)** `pending` cannot be built from `beforeNavigate`: `to: null` for `next`/`back`
   (`navigate.ts:238`), and hooks run in order, so a slow or blocking earlier plugin delays or
   prevents the call. — **verified; fixed 14.1.**
2. **(high)** Concurrent attempts have no identity; a late `superseded` result clears the
   newer pending. — **verified (`navigate.ts:243`); fixed 14.1.**
3. **(high)** Exceptions escape the contract: `runNav` re-throws (`navigate.ts:420-422`), so
   no result hook fires and pending stays. — **verified; fixed 14.1 (`phase: 'error'`).**
4. **(high)** "A refusal never commits" is false: `beginNav` writes a busy state that
   notifies; the first frame after `start()` has an empty stack with `status: 'busy'`, which
   `checkSession` rejects. — **verified (`commit.ts:38`, `session.ts:258-260`); fixed 14.2.**
5. **(high)** One flow definition cannot describe a recording across `patchFlow`. —
   **verified (`store.ts:458-482`); fixed 14.3.**
6. **(high)** A redactor can mutate the live wizard through shared references. — **verified
   (`state.ts:28-29`, frames are `getState()` objects); fixed 14.4.**
7. **(high)** The Graph boundary does not isolate subscription-time errors; `notify()` is
   bare. — **verified (`store.ts:201-206`); fixed 14.5.**
8. **(high)** The frame cap does not bound outcomes; the plugin's cap belongs to the plugin.
   — **accepted; fixed 14.6.**
9. **(medium)** Resolving a sub-flow by `frame.flow` alone can pick another definition. —
   **verified (`session.ts:122-127`); fixed 14.7.**
10. **(medium)** Performance is measured in nodes while the load is edges (~20 000 for 200
    conditional steps); dangling edges contradict "every endpoint is a node". — **verified
    (`graph.ts:204-222`); fixed 14.8.**
11. **(medium)** Plugin and recorder lifecycle: destroy clears listeners without a final
    notification; one plugin on two wizards; StrictMode. — **verified
    (`store.ts:488-491`, `index.tsx:83-99`); fixed 14.9.**
12. **(medium)** The headless entry does not make the install React-free. — **accepted;
    fixed 14.11.**
13. **(medium)** PR 1 deletes the panel and PR 2 adds the new one while `canary.yml`
    publishes every merge. — **verified; fixed 14.12.**
14. **(medium)** Tests: the `role="img"` contradiction between §4.5 and §12.10; TTHW measured
    by an e2e is not a human install. — **verified; fixed 14.13.**

Verdict: CONCERN on all six dimensions; "not ready to implement" before amendments.

### CLAUDE SUBAGENT (eng — independent review)

- **Two-store tearing (medium):** `wizard` and `plugin` are separately subscribable; two
  `useSyncExternalStore` calls can pair a new commit with stale outcomes. — **fixed 14.10.**
- **`start()` indistinguishable through the hook (low/medium):** the engine's own first move
  goes through the same wrapper (`store.ts:378`). — **fixed 14.1 (`source: 'start'`).**
- **No stated filtering parity for the new hook (medium):** `write()` filters `disabled`/
  `destroyed` and wraps in `fail()` (`store.ts:214-240`); the note did not require the new
  call site to share it. — **fixed 14.1 (one helper, both call sites).**
- **`plugin` prop vs. installed plugin is an unchecked identity (medium):** a second
  `devtools()` instance shows `[]` forever. — **fixed 14.9 (`attached`, `lastRev`,
  the second form of `devtools-no-plugin`).**
- **StrictMode double-subscribe untested (medium).** — **fixed 14.9.**
- **Byte cap consciously rejected (low):** accepted debt; make the README's ceiling loud. —
  **kept as debt; TODOS.md item 10.**
- **Security note:** `redact` protects the export only; a live tab shows unredacted data. —
  **README's redaction recipe gains the sentence; no runtime guard (Phase 1 §3).**
- **Hidden complexity:** cycle-breaking determinism in the layout; the property tests must
  not be trimmed. — **kept; the §7 property rows are P1 tasks.**

Verdicts: architecture CONCERN, tests CONCERN, performance SOUND, security SOUND, error
paths SOUND, deployment SOUND.

### ENG DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════════════
  Dimension                           Claude    Codex     Consensus
  ──────────────────────────────────── ───────── ───────── ────────────────────────────────
  1. Architecture sound?               CONCERN   CONCERN   CONFIRMED (concern) — the hook contract
                                                           (Codex 1-3, Claude start/parity), the
                                                           two-object handshake (Claude identity,
                                                           Codex 11) → 14.1, 14.9, 14.10
  2. Test coverage sufficient?         CONCERN   CONCERN   CONFIRMED (concern) → 14.13
  3. Performance risks addressed?      SOUND     CONCERN   DISAGREE — settled by code: graph.ts
                                                           fans out order edges → 14.8 (T4 at gate:
                                                           the 1 500-edge draw cap is a number)
  4. Security threats covered?         SOUND     CONCERN   DISAGREE — settled by code: shared
                                                           references reach the redactor → 14.4;
                                                           Claude's export-only note → README
  5. Error paths handled?              SOUND     CONCERN   DISAGREE — settled by code: bare
                                                           notify(), re-thrown attempts → 14.1, 14.5
  6. Deployment risk manageable?       SOUND     CONCERN   DISAGREE — settled by code: canary on
                                                           every merge → 14.12 (T5 at gate: PR order)
═══════════════════════════════════════════════════════════════════════════════════════
```

2/6 confirmed as concerns and amended; 4/6 DISAGREE, each resolved by reading the line
Codex cited rather than by preference — the amendments are recorded, and two of them carry a
number or an order the owner may prefer differently (T4 draw cap, T5 PR order), so they are
listed at the gate. **Not a User Challenge:** neither voice asked to change the owner's
direction; both asked for the contract under it.

## Section 1: Architecture Review

Dependency graph after §13–§14 (arrows = imports; `*` = new; `†` = changed):

```
  @wizzard-packages/devtools*
    ├── index.ts ('use client')            ──▶ react/v1† (peer, optional-for-headless: WizardContext export)
    │     WizardDevtools, FlowGraphView     ──▶ ./headless (devtools, recordSession re-exported)
    │     one useSyncExternalStore over {wizard state, plugin rings}          (14.10)
    └── headless/index.ts* (no directive)  ──▶ core/graph (buildGraph)
          devtools(), recordSession,        ──▶ core/session (knownFlows, checkSession as test oracle)
          diffState, layoutGraph, formatExpr──▶ core/v1 (types, evaluate)
  core†: Hooks.onAttempt?(Attempt) — ONE call site: the store wrapper, through write()'s fail() helper (14.1)
  contract/fixtures.ts* ◀── devtools tests, binding-suite (R-C moved), the dense perf fixture (14.8)
  examples/quickstart/src/Devtools.tsx* ◀── README embed (13.3)
  examples/next-app/app/steps.tsx† ──▶ devtools (client boundary; page.tsx stays a server component)
  R0 consumer fixtures†: + a React-free Node project importing /headless (14.11)
```

Data flows with their nil / empty / error paths:

```
  attempt flow*   next()/back()/go()/start() ──▶ wrapper: onAttempt{start} ──▶ runNav ──▶ onAttempt{end|error} ──▶ plugin rings ──▶ strip + Activity
    nil:   no plugin                       → strip `… pending` from status; Activity header devtools-no-plugin
    empty: result ok                       → `✓ next → payment`; the settled commit row follows
    error: runNav throws                   → onAttempt{error}; row `✗ next threw · msg`; rethrown to the caller unchanged
    race:  superseded                      → end{superseded} for id A; pending for id B untouched (14.1)
  commit flow     subscribe ──▶ getState() ──▶ status busy? skip : diffState(prev, next) ──▶ rows ──▶ one snapshot ──▶ render
    nil:   no wizard                       → one-line message; nothing subscribed
    empty: flow.steps = {}                 → "flow has no steps"; diff works
    error: listener body throws            → caught; unsubscribe; strip devtools-stopped; host's set() unaffected (14.5)
  record flow     recordSession(w, {plugin, limits, redact}) ──▶ settled frames + plugin outcomes ──▶ bundle(): clone → redact → meta
    nil:   no redact                       → identity; README sentence
    empty: stopped before any commit       → one frame (the mount state); checkSession passes
    error: clone or redact throws          → devtools-export-failed; nothing copied (14.4)
    change: getFlow() identity changes     → stop; meta.stopped = 'flow-changed' (14.3)
    cap:   frames or outcomes              → both subscriptions stop; meta.capped names which (14.6)
  layout flow     buildGraph ──▶ layoutGraph | layout prop ──▶ validate finite, dedupe, ghost dangling ──▶ ≤ 1 500 edges drawn
    nil:   layout prop misses a node       → drawn known, mirror lists missing, no throw
    dense: 20 000 edges                    → layout < 100 ms; `1 500 of 20 000 edges drawn`; mirror complete (14.8)
    error: layout prop throws              → Graph-tab boundary; strip, State, Activity, export keep working
  attach flow*    devtools() ──▶ createWizard({ plugins }) ──▶ init(host) ──▶ attached, cleanup registered ──▶ destroy → cleanup → notify
    nil:   plugin never installed          → attached false → second form of devtools-no-plugin
    wrong: another instance installed      → lastRev lags rev after a commit → same message (14.9)
    twice: StrictMode / Fast Refresh       → re-init replaces the attachment, rings cleared
```

Coupling: core → devtools stays absent (an optional hook and a type); devtools → core is on
three entries; devtools → react is a peer and optional for headless installs. Scaling: rings
are bounded (500/2 000/500), layout is O(V+E) once per flow object, the draw cap bounds the
DOM, diff is O(keys) per settled commit only. SPOF: none. Realistic production failures per
new codepath: a resolver that throws on the third step (→ `error` row, promise rejects as
before); a host that passes a plugin created in a hot-reloaded module (→ the wrong-instance
message); a `data` with a `File` object (→ `devtools-export-failed`, states still visible).
Distribution: two entries in `exports`, split types, publint + attw + size in CI, changesets
publish, canary on merge, the consumer fixtures at R0 — all existing machinery; nothing new
to build.

Findings (each auto-decided; confidence per the calibration table):

- **1.1** `[P1] (9/10) navigate.ts:238` `to: intent.type === 'go' ? intent.to : null` — a
  plugin cannot name a pending target from `beforeNavigate`. Decided: 14.1 (P1).
- **1.2** `[P1] (9/10) navigate.ts:420-422` `catch (error) { …; throw error; }` — an attempt
  can end without a result. Decided: 14.1 `phase: 'error'` (P1).
- **1.3** `[P1] (9/10) store.ts:201-206` `for (const l of listeners) l();` — devtools can
  throw into the host. Decided: 14.5 (P1).
- **1.4** `[P1] (9/10) commit.ts:38` `status: 'busy', rev: state.rev + 1` — busy states
  notify; recorded frames must be settled. Decided: 14.2 (P5).
- **1.5** `[P2] (8/10)` two `useSyncExternalStore` calls tear. Decided: 14.10 (P5).
- **1.6** `[P2] (9/10) store.ts:378` `start()` uses the wrapper. Decided: `source: 'start'`
  (P5, explicit over inferred).
- **1.7** `[P2] (7/10)` plugin identity unverifiable. Decided: 14.9 `attached` + `lastRev`
  (P1); rejected: a registry keyed by wizard (clever, a global).

## Section 2: Code Quality Review

- **2.1 DRY — the hook call site.** `write()` already owns the filter and `fail()`
  (`store.ts:214-240`); the wrapper calls the same helper. Decided: extract `dispatch(hook,
  at, fn)` used by both, so the two paths cannot drift (P4).
- **2.2 Naming.** `onAttempt` beside `onCommit`, `beforeNavigate`, `afterNavigate`: a verb
  or a preposition plus a noun, one word each — consistent. `Attempt.phase` values are the
  words the strip prints. `limits` is the one plural on the surface; kept because it holds
  three numbers (P5).
- **2.3 Stale diagram.** `store.ts:19-31` is prose, not a diagram, and lists what the store
  owns; it gains one sentence for `onAttempt` in the same commit. `navigate.ts`'s numbered
  phases (0–10) are untouched by design: the hook lives outside `runNav`.
- **2.4 Error handling.** Six messages, one template, one test (13.2, 14.4, 14.5). The plugin
  catches inside its hooks so a devtools bug never consumes core's `fail()` path (14.5).
- **2.5 Over-engineering check.** `Attempt` has three variants because there are three ways
  an attempt ends; an `id` because two can overlap; nothing else. The ghost node for
  dangling edges is a `Positioned` with a flag, not a class. The edge draw cap is one
  constant and one line of toolbar text.
- **2.6 Under-engineering check.** Index-based array diff (Phase 1 5.4) stays documented; the
  byte cap stays a TODO. Both are stated ceilings, not surprises.
- **2.7 Debt hotspot.** `WizardDevtools.tsx` is the glue that touches every module; the
  puzzle map keeps it thin (one snapshot, one reducer of view state, no rendering of its own).

## Section 3: Test Review

Framework: vitest (root `vitest.config.ts`, `environment: 'jsdom'`, React and Vue plugins),
fast-check for properties, testing-library, Playwright (`playwright.config.ts`, project
`next` on port 3100). Devtools has no test file today; every module below gets one.

```
CODE PATHS                                                         USER FLOWS
[+] core/store.ts wrapper                                          [+] Diagnosis journey (§12.12)          [→E2E]
  ├── [GAP→T] onAttempt start/end once per call                      ├── [GAP→T] refusal read on the default tab
  ├── [GAP→T] phase error on throwing validator; rethrow unchanged   ├── [GAP→T] open refusal → inspector → export with outcome
  ├── [GAP→T] source 'start' for the engine's first move             ├── [GAP→T] narrow container (390 px) variant
  ├── [GAP→T] superseded end does not clear newer pending            └── [GAP→T] keyboard-only variant
  ├── [GAP→T] aborted via cancel() ends with reason aborted        [+] Getting started (§13.3)
  └── [GAP→T] disabled plugin receives neither hook (shared helper)  ├── [GAP→T] quickstart Devtools.tsx type-checks; embed check
[+] devtools/headless/plugin.ts                                      └── [GAP→T] README states the first result (embed marker)
  ├── [GAP→T] pending per id; outcomes ring at cap                 [+] Attach / detach
  ├── [GAP→T] init twice → re-attach, rings cleared (StrictMode)     ├── [GAP→T] StrictMode: one row per commit
  ├── [GAP→T] cleanup on destroy notifies subscribers                ├── [GAP→T] wrong instance → second no-plugin form
  └── [GAP→T] hook body throws → caught, plugin not disabled         └── [GAP→T] wizard prop replaced → log cleared, note
[+] devtools/headless/record.ts                                    [+] Record / export
  ├── [GAP→T] settled frames only; checkSession passes (property)    ├── [GAP→T] preview counts post-redaction
  ├── [GAP→T] flow change → stopped 'flow-changed'                   ├── [GAP→T] clone failure → export-failed, nothing copied
  ├── [GAP→T] caps: frames | outcomes, both subscriptions stop       ├── [GAP→T] clipboard rejected → textarea focused
  ├── [GAP→T] clone → redact → meta; deep immutability               └── [GAP→T] Record/Stop interleaved with navigation (chaos)
  └── [GAP→T] React-free Node import of /headless                  [+] Graph
[+] devtools/headless/layout.ts                                      ├── [GAP→T] dense fixture: `1 500 of N edges drawn`
  ├── [GAP→T] no overlap; y(to) > y(from); deterministic; cycles     ├── [GAP→T] keyboard: arrows/Enter/Escape/Tab; Table toggle
  ├── [GAP→T] dense 20 000-edge fixture < 100 ms; memo by identity   ├── [GAP→T] hostile id: no <img> element, text present
  ├── [GAP→T] ghost endpoint for dangling edges                      └── [GAP→T] drill in/out; Open sub-flow preview; same ids twice
  └── [GAP→T] crossing-count ratchet on the three fixtures         [+] Error states
[+] devtools/headless/format.ts, diff.ts — table + caps (§7)         ├── [GAP→T] layout throws → Graph boundary only
[+] devtools/WizardDevtools.tsx                                      ├── [GAP→T] listener throws → devtools-stopped; host set() commits
  ├── [GAP→T] one snapshot: commit + outcome in one tick, no tear    └── [GAP→T] every [wizzard] string matches template + anchor
  ├── [GAP→T] three concepts independent (§12.12)
  ├── [GAP→T] pinned row past the ring keeps its snapshot + flow
  └── [GAP→T] drives every control with throwing onRecord/layout; getState identity unchanged
[+] build: directive in dist (client), absent in /headless; size lines; check:pack

COVERAGE: 0/47 today (the package has no tests) → 47/47 planned   |  E2E: 4 (one spec, three variants)  |  EVAL: none (no LLM)
QUALITY target: ★★★ on every row (each names its failure and edge case above)
```

Regression rule: the diff modifies existing behaviour in one place — the store wrapper
(`store.ts:292-298`) gains the hook calls. **CRITICAL regression tests:** `next`/`back`/`go`/
`start` return the same `NavResult`s and reject with the same errors as before with no
plugin installed and with a throwing plugin installed (core `store.test.ts`), and the
`core-v1` size line is re-measured. Test plan artifact written to
`~/.gstack/projects/ZizzX-wizzard-packages/Aziz-docs-devtools-design-eng-review-test-plan-20260906-235500.md`.

## Section 4: Performance Review

- Layout: O(V+E) once per flow object; the dense fixture (~20 000 edges) under 100 ms is
  asserted; the memo is a `WeakMap` on the definition.
- Render: the draw cap (1 500 edges) bounds the SVG; 500 rows and 200 nodes are within DOM
  comfort; no virtualisation (P5).
- Diff: runs on settled commits only (14.2 halves the work per navigation); 10k-key walk cap.
- Memory: rings 500/2 000/500; `structuredClone` at export doubles the recording transiently
  — stated in the preview's `bytes`; a byte cap is TODOS.md item 10.
- `evaluate` runs on inspect, not on render; `structuredClone` runs on export, not on record.
- No N+1, no network, no caching beyond the two memos.

## Required Outputs (Eng)

### NOT in scope (eng)

- Crossing minimisation (X5) — TODOS.md item 9; the ratchet test lands now.
- A byte cap on the recorder — TODOS.md item 10; count and `bytes` are shown.
- A runtime production guard — documented; ESM bundles make `NODE_ENV` a false comfort.
- Time travel, theme presets, compound nodes, a Vue panel, a layout dependency — Phase 1.
- A codemod, an alias, a hosted playground, telemetry — Phase 2.5.
- A second core hook for `cancel()` — the aborted attempt already ends through `end`.

### What already exists (eng)

`nav` tokens in `commit.ts` (the idea behind attempt ids); `write()`'s filter and `fail()`
(the shared dispatch helper); `checkFrames`' parent-walk (the resolution rule in 14.7);
`react/v1`'s StrictMode handling (the reason 14.9 exists); `useSyncExternalStore` in the
binding (one store per hook); `embed-examples.mjs`; the Playwright `next` project; CI's
publint/attw/size steps; `canary.yml`; the fast-check seed memory.

### Failure modes registry (eng)

```
  CODEPATH                 | FAILURE MODE                           | RESCUED? | TEST? | USER SEES?                          | LOGGED?
  -------------------------|----------------------------------------|----------|-------|-------------------------------------|--------
  store wrapper onAttempt  | plugin throws in the hook              | Y (core) | Y     | nothing; plugin disabled            | console (core)
  store wrapper onAttempt  | runNav throws                          | Y        | Y     | ✗ next threw · msg; app sees reject | n/a
  plugin pending           | superseded late result                 | Y        | Y     | newer pending intact                | n/a
  plugin attach            | second instance / never installed      | Y        | Y     | no-plugin second form               | n/a
  plugin attach            | StrictMode double init                 | Y        | Y     | one row per commit                  | n/a
  recorder                 | busy frame                             | Y        | Y     | not recorded                        | n/a
  recorder                 | patchFlow                              | Y        | Y     | stopped: flow changed               | n/a
  recorder                 | cap (frames | outcomes)                | Y        | Y     | capped: which                       | n/a
  bundle()                 | clone fails / redact throws / mutates  | Y        | Y     | export-failed; nothing copied       | n/a
  panel subscription       | listener throws                        | Y        | Y     | devtools-stopped in the strip       | console once
  panel snapshot           | commit + outcome in one tick           | Y        | Y     | consistent render                   | n/a
  layout                   | dense graph / dangling / NaN / dup ids | Y        | Y     | draw cap note / ghost / fallback    | n/a
  flow resolution          | same ids in two sub-flows              | Y        | Y     | correct child drawn                 | n/a
  install                  | /headless without React                | Y        | Y     | works; client entry documents peers | n/a
  release                  | canary between PR 1 and PR 2           | Y        | —     | old panel still present             | n/a
```

No row is RESCUED=N / TEST=N / silent. **0 CRITICAL GAPS.** (The release row has no test
by nature; the PR order is the control.)

### Diagrams

Architecture and data flows (Section 1), the test diagram (Section 3), the attach flow
(Section 1). Inline diagram candidates for the implementation: `headless/plugin.ts` (the
attempt state per id: start → end | error, with supersede), `headless/record.ts` (settled
frame filter → rings → bundle pipeline), `WizardDevtools.tsx` (the one-snapshot reducer of
observed time / inspected flow / selected node). Stale-diagram audit: `store.ts:19-31` prose
gains one sentence (2.3); nothing else in touched files carries a diagram.

### Worktree parallelization strategy

| Step                                        | Modules touched                                   | Depends on |
| ------------------------------------------- | ------------------------------------------------- | ---------- |
| A. core hook + shared dispatch helper       | `packages/core/src/v1/` (store, navigate, tests)  | —          |
| B. fixtures + headless pure modules         | `contract/`, `packages/devtools/src/headless/`    | —          |
| C. plugin + recorder                        | `packages/devtools/src/headless/`                 | A, B       |
| D. renderer + panel + messages + errors.md  | `packages/devtools/src/`, `docs/`                 | B, C       |
| E. README + quickstart + changeset + peers  | `packages/devtools/`, `examples/quickstart/`      | D          |
| F. next-app mount + e2e + consumer fixture  | `examples/next-app/`, `e2e/`, R0 fixtures         | D          |

Lanes: **Lane 1:** A (independent). **Lane 2:** B (independent). Then **C** (needs both).
Then **D**. Then **E ∥ F** in two worktrees (no shared module). Execution: launch A and B in
parallel worktrees; merge; C; D; then E and F in parallel; merge. Conflict flag: A and C both
add tests under `packages/core/src/v1/` if C adds a core-side plugin test — keep the plugin's
core-facing test in `packages/devtools`. This maps onto §10's PRs as PR 1 = A + B + C,
PR 2 = D + E, PR 3 = F (14.12).

### TODOS.md (collected from all phases)

Two items, written to `TODOS.md` under P3 in this commit: **9. Crossing-minimisation pass in
devtools' `layoutGraph`** (Phase 1 X5) and **10. Byte cap on the devtools session recorder**
(Phase 3, accepted debt). No other phase deferred anything.

## Implementation Tasks (Eng)

Synthesized from this review's findings. Each task derives from a specific finding above.

- [ ] **T1 (P1, human: ~3h / CC: ~25min)** — core — `Hooks.onAttempt` with `Attempt` (start / end / error, `id`, `source`, `rev`) fired from the store wrapper through a shared `dispatch` helper with `onCommit`; `store.ts` header sentence; `core-v1` line re-measured (5.0 → ~5.2 kB with the reason)
  - Surfaced by: Section 1 — 1.1, 1.2, 1.6; Section 2 — 2.1
  - Files: `packages/core/src/v1/navigate.ts`, `packages/core/src/v1/store.ts`, `packages/core/src/v1/store.test.ts`, `.size-limit.js`
  - Verify: `pnpm --filter @wizzard-packages/core test:run`; `pnpm size`; the regression rows (same results and rejections without a plugin and with a throwing one)
- [ ] **T2 (P1, human: ~2h / CC: ~20min)** — devtools — `devtools({ outcomes })` plugin: pending per attempt id, outcomes ring, `attached`/`lastRev`, re-init replaces the attachment, cleanup notifies subscribers, hook bodies catch internally
  - Surfaced by: Step 0.5 — Codex 1, 2, 8, 11; Claude identity, StrictMode
  - Files: `packages/devtools/src/headless/plugin.ts`, `packages/devtools/src/headless/plugin.test.ts`
  - Verify: unit rows in the test diagram under `plugin.ts`
- [ ] **T3 (P1, human: ~2h / CC: ~20min)** — devtools — `recordSession` records settled frames only, stops on flow change, `limits` for frames and outcomes with both subscriptions stopping together, `bundle()` = clone → redact → meta, `devtools-export-failed`
  - Surfaced by: Step 0.5 — Codex 4, 5, 6, 8
  - Files: `packages/devtools/src/headless/record.ts`, `packages/devtools/src/headless/record.test.ts`, `docs/errors.md`
  - Verify: the property test against `checkSession` on every fixture; the deep-immutability test with a mutating redactor
- [ ] **T4 (P1, human: ~2h / CC: ~15min)** — devtools — Panel: one `useSyncExternalStore` snapshot over wizard state and plugin rings; every callback under try/catch with `devtools-stopped`; flow resolved through the stack; per-row flow reference for pinned rows
  - Surfaced by: Section 1 — 1.3, 1.5; Step 0.5 — Codex 7, 9
  - Files: `packages/devtools/src/WizardDevtools.tsx`, `packages/devtools/src/useObserved.ts`, `packages/devtools/src/messages.ts`
  - Verify: the tearing test (commit + outcome in one tick); the throwing-listener test asserts the host's next `set()` commits
- [ ] **T5 (P1, human: ~1.5h / CC: ~15min)** — devtools — Layout and renderer: dense 20 000-edge fixture under 100 ms, 1 500-edge draw cap with toolbar text, ghost endpoint for dangling edges, crossing-count ratchet
  - Surfaced by: Step 0.5 — Codex 10; Phase 1 X5
  - Files: `packages/devtools/src/headless/layout.ts`, `packages/devtools/src/FlowGraphView.tsx`, `contract/fixtures.ts`
  - Verify: `layout.test.ts` property rows; the dense fixture timing under vitest's `bench` or a plain timer assertion
- [ ] **T6 (P1, human: ~1h / CC: ~10min)** — devtools + repo — `peerDependenciesMeta` optional for react peers; PR order per 14.12 (0.x panel kept in PR 1, deleted in PR 2 with the `major` changeset); React-free Node consumer fixture for `/headless` in R0's list
  - Surfaced by: Step 0.5 — Codex 12, 13
  - Files: `packages/devtools/package.json`, `docs/designs/v1-launch.md` (R0 row), the consumer fixture list
  - Verify: `pnpm check:pack`; the fixture imports `/headless` with no React in `node_modules`
- [ ] **T7 (P1, human: ~1h / CC: ~10min)** — devtools — Tests corrected: XSS asserts no `<img>` and text present; StrictMode mount; wrong-instance message; chaos test interleaves Record/Stop with navigation; `source: 'start'` row
  - Surfaced by: Step 0.5 — Codex 14; Claude tests
  - Files: `packages/devtools/src/FlowGraphView.test.tsx`, `packages/devtools/src/WizardDevtools.test.tsx`
  - Verify: `pnpm --filter @wizzard-packages/devtools test:run`
- [ ] **T8 (P2, human: ~20min / CC: ~5min)** — docs — README redaction recipe: "redact protects the export; a live tab shows unredacted data; do not ship devtools to production"; R0 checklist line for a human install from the tarball
  - Surfaced by: Step 0.5 — Claude security note; Codex 14 (TTHW is a hypothesis)
  - Files: `packages/devtools/README.md`, `docs/designs/v1-launch.md`
  - Verify: review

_No new tasks from Section 4 (performance rows are inside T5)._

### Completion Summary (Eng)

```
  +====================================================================+
  |            ENG PLAN REVIEW — COMPLETION SUMMARY                    |
  +====================================================================+
  | Step 0: Scope Challenge | accepted as amended (no reduction)       |
  | Architecture Review     | 7 issues found, all decided (§14)       |
  | Code Quality Review     | 7 items, 1 DRY extraction (dispatch)    |
  | Test Review             | diagram produced, 47 paths, 47 planned; |
  |                         | 2 CRITICAL regression rows added        |
  | Performance Review      | 0 open issues (6 bounds stated)         |
  | NOT in scope            | written (6 items)                       |
  | What already exists     | written                                 |
  | TODOS.md updates        | 2 items written (crossing pass, byte cap)|
  | Failure modes           | 15 rows, 0 critical gaps                |
  | Outside voice           | ran (codex + claude subagent)           |
  | Parallelization         | 6 steps, 2 parallel pairs, 4 sequential |
  | Lake Score              | 7/7 recommendations chose complete option|
  | Amendments              | 13 (§14.1–14.13), 8 tasks               |
  | Gate items added        | T4 draw cap, T5 PR order; T2 renumbered |
  +====================================================================+
```

> **Phase 3 complete.** Codex: 14 concerns (all verified in code). Claude subagent: 9 issues.
> Consensus: 2/6 confirmed as concerns, 4/6 disagreements settled by the cited source lines
> (two carry a number or an order → T4, T5 at the gate). Passing to Phase 4 (Final Gate).

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
| 32  | DX     | Mode DX POLISH; persona React app developer with a stalled wizard               | mechanical     | override  | enhancement of an existing package; most common developer for a React panel | EXPANSION; Vue/Node as primary  |
| 33  | DX     | One authoritative surface (§13.1); `bundle()` replaces `session()`; `activity` everywhere | mechanical | P5   | both voices: §5.1 stale, two names for the recorder, two types for its output | keep §5.1 + prose amendments   |
| 34  | DX     | `redact(bundle)` once at export; frames unredacted in memory, README says so     | mechanical     | P1, P5    | outcomes and flow literals carry values too (Codex 5); one hook over one object | per-frame `redact(state)` (X2)  |
| 35  | DX     | `devtools()` on `/headless`, re-exported by the client entry                    | mechanical     | P1        | Vue/Node hosts capture refusals with the same object (Codex 3)          | React-only export                  |
| 36  | DX     | `plugin.pending` from `beforeNavigate`; strip shows `… → <to> pending`          | mechanical     | P1        | `status: 'busy'` cannot name a target (Codex 2)                          | infer from status only             |
| 37  | DX     | `limits` prop and `RecordOptions.limit`; defaults 500/2000/200 unchanged        | mechanical     | P1        | escape hatch for the three caps (Claude); ten lines                      | fixed caps                         |
| 38  | DX     | Stability note narrowed to `layoutGraph`/`formatExpr`/`diffState`; recorder under semver | mechanical | P1   | the recording API is what bug reports depend on (Codex 5)                | whole headless entry "may change"  |
| 39  | DX     | Five `docs/errors.md` anchors drafted in the note; template-and-anchor test     | mechanical     | P1        | one anchor was named and none drafted; both voices                       | `devtools-no-wizard` only          |
| 40  | DX     | Refusal rows say when the engine gave no field or plugin                        | mechanical     | P5        | never guess a cause (Codex 2)                                            | infer a cause                      |
| 41  | DX     | README shape: matrix → 3 steps → 5 recipes, < 150 lines; snippet in quickstart, embedded | mechanical | P4, P5 | D4's 60-line cap had no content plan (both voices); reuse the embed marker | `docs/devtools/` tree; typed twice |
| 42  | DX     | No new starter package; `examples/next-app` + R0 consumer fixture are the proofs | mechanical    | P4        | Codex 1 asked for a starter; the runnable one exists and the fixture is planned | new `examples/devtools-starter` |
| 43  | DX     | Migration table 13.4 in changeset + README; no codemod; no alias                 | mechanical     | P5        | one renamed import; §5.7 stands; the compile error is the notice         | codemod; `WizardDevTools` alias    |
| 44  | DX     | Peer ranges written: core ^1.0.0, react ^1.0.0, react/react-dom >=18            | mechanical     | P1        | unspecified range (Claude); a 0.x host sees the warning first            | `workspace:*` only                 |
| 45  | DX     | Bundle `version: 1`; `devtools-bundle-unsupported` reserved for S2's loader     | mechanical     | P1        | reject unsupported recordings with a message (Codex 5)                   | unversioned format                 |
| 46  | DX     | Entries stay unversioned (`/headless`, not `/v1`)                               | taste (T3)     | P5        | devtools' own major is the version; `/v1` is L8's transition alias        | `/v1` entries (Claude MEDIUM)      |
| 47  | DX     | Competitive tier target (2–5 min) for the diagnostic path; no auto-mount        | mechanical     | P5        | Champion needs the engine to know devtools (§4.1)                        | self-installing plugin             |
| 48  | DX     | Issue template asking for a `SessionBundle` in PR 3                             | mechanical     | P2        | the bundle is the feedback loop; ten lines, in blast radius              | defer to TODOS.md                  |
| 49  | Eng    | Scope accepted as amended; complexity check proceeds                            | mechanical     | override  | rewrite; one module per file; never reduce                               | reduction                          |
| 50  | Eng    | `onAttempt(Attempt)` with start/end/error and an id replaces `afterResult`      | taste (T2)     | P1, P5    | `to: null` in beforeNavigate; runNav re-throws; supersede needs identity | `afterResult` + `beforeAttempt`    |
| 51  | Eng    | `source: 'start'` marks the engine's first move                                 | mechanical     | P5        | start() uses the same wrapper (store.ts:378)                             | skip the hook for start()          |
| 52  | Eng    | Both hook call sites share `write()`'s filter and `fail()` via one helper       | mechanical     | P4        | disabled/destroyed parity cannot drift                                   | duplicated guard                   |
| 53  | Eng    | Recorder stores settled frames only; §4.3 → one settled commit, one row         | mechanical     | P5        | busy states notify and fail checkSession                                 | record everything                  |
| 54  | Eng    | Flow change stops the recording; rows keep their flow object                    | mechanical     | P1        | one flow per bundle; pinned rows must draw with their own definition     | versioned flows in the bundle      |
| 55  | Eng    | `bundle()` clones before redact; `devtools-export-failed` covers clone + redact | mechanical     | P1        | shared references reach the redactor (state.ts:28-29)                    | document "do not mutate"           |
| 56  | Eng    | Every devtools callback caught; `devtools-stopped`; plugin catches internally  | mechanical     | P1        | notify() is bare (store.ts:201-206)                                      | whole-panel boundary only          |
| 57  | Eng    | Caps owned per ring: plugin `outcomes`, recorder `limits`; stop together        | mechanical     | P1        | the plugin outlives the panel; a bundle must be self-consistent          | one frame cap                      |
| 58  | Eng    | Inspected flow resolved through the stack; highlights keyed (flow, step, key)   | mechanical     | P1        | session.ts:122-127 names the collision                                   | id lookup                          |
| 59  | Eng    | Dense fixture (~20 000 edges); 1 500-edge draw cap; ghost endpoints             | taste (T4)     | P1        | graph.ts:204-222 fans out; the cap is a number the owner may move        | no cap; nodes-only perf test       |
| 60  | Eng    | Plugin attaches to one wizard; re-init replaces; cleanup notifies; `attached`/`lastRev` | mechanical | P1   | StrictMode and Fast Refresh; the wrong-instance case was silent          | global registry                    |
| 61  | Eng    | One `useSyncExternalStore` snapshot over both sources                           | mechanical     | P5        | two hooks tear                                                           | two hooks                          |
| 62  | Eng    | React peers optional; React-free consumer fixture for `/headless`               | mechanical     | P1        | exports do not split installs                                            | required peers                     |
| 63  | Eng    | PR 1 keeps the 0.x panel; PR 2 replaces it with the `major` changeset           | taste (T5)     | P1, P6    | canary publishes every merge                                             | §10 order                          |
| 64  | Eng    | XSS test asserts no `<img>`; StrictMode, chaos, start-row tests added           | mechanical     | P1        | §4.5 contradicted §12.10                                                 | keep `queryByRole('img')`          |
| 65  | Eng    | Byte cap stays a TODO; README states redact protects exports only               | mechanical     | P3        | count is what the person sees; a live tab is unredacted by design        | byte cap now                       |

## Cross-Phase Themes

**Theme: the engine reports outcomes, not intents** — flagged in Phase 1 (Codex 1: the
panel shows consequences, not causes), Phase 2.5 (Codex 2: `status: 'busy'` cannot name a
pending action) and Phase 3 (Codex 1–3, Claude start/parity). Three independent runs
converged on the same missing contract; §11 answered it partially and §14.1 completes it.
High-confidence signal.

**Theme: a recording is only a bug report if it is self-contained and safe to hand over** —
Phase 1 (Codex 2, 3: format and redaction), Phase 2 (Codex 3: outcomes and the export
preview), Phase 2.5 (Codex 5: whole-artefact redaction, a format version), Phase 3 (Codex 6:
the redactor can mutate the wizard). Every phase added one layer: bundle → outcomes →
version → clone.

**Theme: the two-object handshake is the product's one real DX cost** — Phase 2.5 (both
voices: two unsignposted steps) and Phase 3 (Claude: identity unverifiable; Codex 11:
lifecycle). Accepted as inherent to "devtools never mutates the wizard"; made one snippet, one
message, and one `attached` flag.

**Theme: React is the panel, not the product** — Phase 1 (Codex 4: headless entry), Phase 2.5
(Codex 3: the plugin from `/headless`), Phase 3 (Codex 12: optional peers). Each phase moved
one more piece out of the React-only path.

No theme contradicts an owner decision; all four are contract completions under the direction
set on 2026-09-06.

## GSTACK REVIEW REPORT

| Review        | Trigger               | Why                             | Runs | Status                                        | Findings                                                                 |
| ------------- | --------------------- | ------------------------------- | ---- | --------------------------------------------- | ------------------------------------------------------------------------ |
| CEO Review    | `/plan-ceo-review`    | Scope & strategy                | 1    | CLEAR (via /autoplan)                         | 8 proposals, 5 accepted, 1 deferred, 2 skipped; 0 critical gaps          |
| Design Review | `/plan-design-review` | UI/UX gaps                      | 1    | CLEAR (via /autoplan)                         | score 5/10 → 8/10, 20 amendments (§12)                                   |
| DX Review     | `/plan-devex-review`  | Developer experience gaps       | 1    | CLEAR (via /autoplan)                         | score 4/10 → 8/10, TTHW ~7 min → ~4 min, 6 amendments (§13)              |
| Eng Review    | `/plan-eng-review`    | Architecture & tests (required) | 1    | CLEAR (via /autoplan)                         | 7 issues, 0 critical gaps, 13 amendments (§14), 14 Codex findings verified |
| Outside Voice | dual voices           | Independent 2nd opinion         | 8    | issues_found                                  | 7 + 6, 7 + 9, 5 + 11, 14 + 9 concerns across the four phases             |

**CROSS-MODEL:** eight runs, no shared context. Agreement on: the refusal contract (the
attempt hook), the self-contained redactable bundle, the headless path, the two-object
handshake as the DX cost, and the diagnosis journey as the release gate. Disagreements: the
publish decision (Phase 1, T1: carried with the owner's direction as default) and four Phase 3
rows where one voice read the source and the other did not; each was settled by the cited
line, and the two that carry a tunable number or order are gate items T4 and T5.

**VERDICT:** CEO + DESIGN + DX + ENG CLEARED — ready to implement. Eng review required:
satisfied by this run.

**GATE DECISIONS (owner, 2026-09-06) — all six resolved as recommended:**

- **D1 — version:** `@wizzard-packages/devtools` ships as **`3.0.0`** with the family's
  1.0.0; outside the changeset `fixed` group; the README's compatibility row
  (`devtools 3.x ↔ core 1.x`) is the alignment T6 asked for.
- **T1 — publish:** devtools is published in the 1.0.0 release (direction of 2026-09-05 kept).
- **T2 — core hook:** `Hooks.onAttempt(Attempt)` lands in core from the store wrapper; the
  `core-v1` budget moves 5.0 → ~5.2 kB, the exact number measured in PR 1 and written beside
  the line with §14.1 as the reason.
- **T3 — entries:** `@wizzard-packages/devtools` and `/headless`, unversioned.
- **T4 — draw cap:** 1 500 edges, toolbar text names the total.
- **T5 — PR order:** PR 1 keeps the 0.x panel beside the new headless entry; PR 2 replaces
  the panel and carries the `major` changeset; PR 3 is the consumer proof.

NO UNRESOLVED DECISIONS
