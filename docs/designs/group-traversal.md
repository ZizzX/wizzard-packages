# Design: group and repeat traversal

Date: 2026-09-06
Branch: `docs/group-traversal-design` at `b3366b9`
Task: `wizzard-12` · Plan of record: [`v1-launch.md`](v1-launch.md) row **L9** (gate)
Status: implemented in #39, #40, #41

## 1. Why a note lands first

L9 is a gate, not a feature row. Three things make it one.

**Premise 6 of the plan** -- the inspector draws only what the engine runs. `graph.ts` already
draws group nodes with a repeat badge and an `opaque` reason (`graph.ts:44-57`, `133-150`), and
S2 renders that graph on the site's first screen. If the engine cannot execute a `GroupStep`,
the site is showing a picture of software that does not exist, and Premise 6 then obliges
`validateFlow` to reject the construct outright.

**R-C depends on it.** "Editable repeated section -- one block of steps per passenger, add and
remove passengers, edit the second one after finishing the third" is one of the three reference
applications that replace the fifteen 0.x Playwright specs as the behavioural evidence for
1.0.0. Deferring L9 deletes a third of the release evidence.

**The invariants interact, and one of them freezes a format.** A snapshot written inside a
group contains group frames. L4a shipped the snapshot format in #33 with `v: 1` on it. Deciding
frame identity after that format is published is a migration; deciding it now is a field.

The eng review said the same thing in its own words (`v1-launch.md:1907-1913`): "Groups are a
release gate, not a local navigation patch [...] Define the invariants before freezing the
snapshot format."

## 2. The model

Group and repeat are one construct. `flow.ts:57-68` already says so, and the type is already
written:

```ts
export interface GroupStep extends StepBase {
  flow: string | FlowDefinition;
  repeat?: { over: Expr; keyBy?: string };
  input?: Readonly<Record<string, Expr>>;
}
```

A group is a sub-flow. `repeat` makes it a loop by entering that sub-flow once per item in
`over`. Iteration state lives in the runtime frame, never in the definition, so the flow stays
static and diffable -- the same object serves ten passengers and zero.

What already exists in the tree, beyond the type:

| Fact                                                          | Where                                    |
| ------------------------------------------------------------- | ---------------------------------------- |
| `isGroup(step)` narrows on `'flow' in s`                      | `flow.ts:72`                             |
| `Frame` carries `i`, "the iteration index inside a `repeat`"  | `state.ts:11-16`                         |
| The stack is frames, the history is whole stacks              | `state.ts:22-25`                         |
| `checkSession` validates group frames against the definition  | `session.ts:166-207`                     |
| `buildGraph` draws groups, repeat badges and `opaque` reasons | `graph.ts:44-57`, `133-150`              |
| `Scope.loop` is `{ index: number; item: unknown }`            | `expr.ts:36-42`, read at `expr.ts:63-64` |
| `$get: 'loop.…'` is an accepted root                          | `validate-flow.ts:20`                    |
| `group<T>()` authoring helper                                 | `define.ts:30-32`                        |

Four modules already describe this feature. Nothing populates `scope.loop`, and no frame is
ever pushed: `navigate.ts:265` replaces the top of the stack with `{ flow: flow.id, step:
target }` and always names the root flow. L9 is the module that makes the other four true.

### What the types need changed

One field swapped for another, and it is the whole identity decision.

**Proposal.** `Frame` loses `i` and gains `key` (`state.ts:11-16`):

```ts
export interface Frame {
  flow: string;
  step: string;
  /** The item's identity under `keyBy`. Stable across reorder and removal. */
  key?: string;
}
```

`i` cannot be the identity: it moves when the list is reordered and dangles when an item is
removed. It cannot be a cache either. A host that inserts, removes or reorders items with
`set()` and renders before the next navigation would read a stale index from the frame, and
hard rule 4 forbids storing a derived value for exactly that reason. So the frame stores
identity only: `key`, computed once when the frame is pushed. The index is derived from `key`
against the current items wherever the repeat scope is built (5.2, `here()`), which is code in
the `groups` entry, not the main one. `i` is removed rather than left optional: nothing has ever
written it, so no `v: 1` snapshot carries it and no migration is needed; `session.ts:201-205`,
which validates it today, validates `key` instead.

**Proposal.** `Scope.loop` gains `key: string` (`expr.ts:36-42`), so a flow can address its own
item's data: `{ $get: 'loop.key' }`. Without it, an author inside a repeat can name the item and
its index but not the slot the answers are stored in.

Nothing else changes in `flow.ts`. `over`, `keyBy` and `input` are as defined today.

Deliberately **not** proposed: engine-owned data namespacing. `slice` is read in exactly one
place today -- `leave()` at `navigate.ts:117-123`, for `clearOnLeave` -- and `store.set(path,
value)` writes the literal path the host gives it. The host decides where an item's answers
live and uses `loop.key` to build the path. Adding a second, engine-owned convention would be a
new writer beside `commit.ts`.

## 3. The frame model

Today the stack is one deep in practice. `currentOf` reads the last frame's `step`
(`navigate.ts:114`), `resolve.ts:23` and `resolve.ts:84` do the same, and phase 9 rewrites the
top frame. `stack.slice(0, -1)` at `navigate.ts:265` carries anything below it through untouched
-- which is the single-level pass the header comment describes at `navigate.ts:24-26`.

The layout for a group is not open: `checkSession` already fixes it (`session.ts:184-199`). A
frame that encloses another must be a group, and the group's resolved sub-flow id must equal the
enclosed frame's `flow`. So, for a group `G` in flow `P` over sub-flow `C`:

```
stack = [ { flow: 'P', step: 'G', key: 'p2' },   <- the group, and which item
          { flow: 'C', step: 'seat' } ]           <- the current step, inside it
```

| Field  | On a flat frame | On a group frame         | On the child frame |
| ------ | --------------- | ------------------------ | ------------------ |
| `flow` | root id         | the flow the group is in | the sub-flow id    |
| `step` | the step id     | the group step id        | the child step id  |
| `key`  | absent          | present with `repeat`    | absent             |

**Stack vs history.** The stack is where you are; the history is where you were, as whole stacks
(`state.ts:24-25`). Phase 9 appends `before.stack` to `history` on every move
(`navigate.ts:266`). Two things follow that are true today and matter to L9:

- `resolveBack` never reads `history` -- it walks `order` backwards (`resolve.ts:78-100`). The
  comment at `state.ts:24` ("a real back stack, so leaving a sub-flow returns correctly")
  describes the intent, not the code. L9 is what makes it read.
- History grows on a backward move too, because phase 9 does not branch on direction. Flat flows
  never noticed, because `resolveBack` is order-driven. A history-driven `back()` inside a group
  would oscillate between two items. **Required in L9:** phase 9 appends to `history` only when
  `forward` is true, and `back()` pops. It has one observable symptom today: `canBack`
  (`select.ts:79`) is true at the first step after a `back()`, while `back()` answers
  `no-target`.

## 4. Invariants

Each is a rule with an outcome someone can watch. `key(item)` means
`String(read(item, keyBy))`, read with the same walker `$get` uses (`expr.ts:53-78`); with no
`keyBy`, `key` is `String(index)` and identity is positional -- stated plainly, because that is
the ceiling an author accepts by omitting `keyBy`.

### 4.1 Stable item identity

**Rule.** `key` is computed once, when the frame is pushed, and never recomputed. The index is
never stored: it is derived from `key` against the current items every time the repeat scope is
built -- in phase 0.5 of a navigation and in the selector, which recomputes on every `rev`.

**Outcome.** Standing on passenger `p2` at index 1, write `data.passengers` in a different
order: the very next render reads `loop.index` as 0 and `loop.item` as the same passenger
object, before any navigation. Press Next: the frame's `key` is still `p2`. Nothing about the
answers already given moves.

### 4.1b Keys are unique

**Rule.** Within one evaluation of `over`, keys are unique after `String()`. Numeric `1` and
string `'1'` are one key. An item whose `keyBy` reads `undefined`, `null` or `''` has no
identity. Either condition is a data error, refused deterministically rather than resolved
silently: `here()` binds a colliding `key` to the first item that carries it, so selectors and
guards never throw, and `step()` refuses every move that would enter, advance or resolve inside
that group with

```ts
{ ok: false, reason: 'invalid', by: 'G',
  errors: { G: { [keyBy]: '[wizzard] repeat keys collide: "1" at 0 and 2. …' } } }
```

in the `AGENTS.md` message shape, naming the group, the field and the positions. The existing
`invalid` result already carries `errors` keyed by step and field (`navigate.ts:178`), so the
bindings display it with no new surface. Without `keyBy` there is nothing to collide.

**Outcome.** Two passengers with the same id: the group cannot be entered, the result names the
positions, and fixing either id makes the same `next()` succeed. No silent fallback to the index,
because that fallback is the stale-position bug 4.1 exists to remove.

### 4.2 Removal of the active item

**Rule.** A frame whose `key` is absent from the current items is dead. Dead frames are pruned
at the start of phase 4 (see 4.9), and the navigation resolves from the deepest surviving frame.
A dead frame is never committed and never throws.

**Outcome.** Remove the passenger being edited, then `next()`: the wizard lands on the passenger
that took that position, or leaves the group if none survive. Between the `set()` and the
navigation the stack still names the dead item -- `store.set` bumps `rev` only, and no selector
recomputes the stack. Selectors do not throw on it: `here()` finds no item for the `key` and
hands back the scope of the deepest surviving frame, the same answer pruning will commit.
R-C's remove button therefore removes and navigates in the same turn; the pruning rule is the
guarantee for every host that does not.

### 4.3 Reordering

**Rule.** Reordering changes `i`, never `key`. Reordering never changes which step is current.

**Outcome.** Move passenger B from index 1 to index 0 while inside B, press Next through the end
of the sub-flow: the group advances to whatever now follows B, not to whatever was at index 2.

### 4.4 Nested groups

**Rule.** Stack depth is capped at 32 -- the same `MAX_DEPTH` `session.ts:23` and `graph.ts:82`
already enforce. Exiting a completed sub-flow pops exactly one frame. A sub-flow that resolves,
by id, to a flow already on the stack is refused at entry rather than entered, matching
`graph.ts:146`, which draws that case as `opaque: 'cycle'`.

**Outcome.** A group inside a repeat group inside the root gives a three-frame stack;
`checkSession` reports zero problems on a recording of that run. Finishing the innermost
sub-flow advances the innermost group to its next item; the outer group's `key` does not move.

### 4.5 An empty `over`

**Rule.** A repeat group whose `over` evaluates to an empty array, or to anything that is not an
array, pushes no frame: `next()` walks past it exactly as it walks past a step whose `when` is
false.

**Outcome.** In `order: [a, G, b]` with `over: []`, `next()` from `a` lands on `b`, and `G` never
enters `visited`.

**The half this does not fix.** `reachable` reads `when` and nothing else (`resolve.ts:103-113`),
so `G` is still in `active` and still draws a breadcrumb for a section with nothing in it.
Teaching `reachable` about `over` puts group code in the budgeted entry for every flat flow, so
the fix belongs to authoring: guard the group with
`when: { $not: { $empty: <the same expression as over> } }`.

**Proposal.** `validateFlow` reports a `repeat` group whose `when` is absent -- one line, in an
entry that costs a runtime bundle nothing (`validate-flow.ts`, 887 B of a 1 kB budget).

### 4.6 `back()` across a group boundary

**Rule.** `back()` is history-driven once the stack is deeper than one frame: it pops `history`
and restores the recorded stack, skipping any recorded stack whose top frame is dead by 4.2.
Order-walking cannot answer this, because the step before "passenger 3, seat" is "passenger 2,
meal", and `order` does not know which item you came from. Flat flows keep the order-driven path
in `resolve.ts` unchanged.

**Outcome.** From the first step of passenger 3, `back()` lands on the last step passenger 2
actually reached -- including a branch inside the sub-flow -- not on the sub-flow's last
_ordered_ step. From the first step of the first item, `back()` leaves the group and lands on
the step before it in the parent.

### 4.7 `go()` into a group, and out of one

`go` accepts `StepIdOf<F>` (`store.ts:73-76`), the keys of the root flow's `steps`. A step inside
a sub-flow has no such id, and inventing a compound target would put a new addressing scheme in
the public API for one feature.

**Rule.** `go(id)` resolves `id` against the active flow first, then outward through the
enclosing flows -- innermost wins on a collision.

| `id` names                          | Result                                                           |
| ----------------------------------- | ---------------------------------------------------------------- |
| a step of the active flow           | moves within it; stack depth unchanged                           |
| a group in the active flow          | enters it at the first surviving item, first reachable step      |
| a step of an enclosing flow         | pops every frame above that flow and lands there; `data` is kept |
| a step inside a group, from outside | not addressable -- `go` the group, then `go` the step            |
| nothing                             | `no-target`, exactly as `navigate.ts:215` answers today          |

**Outcome.** `go('review')` from inside passenger 2 leaves the group, leaves the stack one frame
deep, and leaves every passenger's answers in `data`. `go('seat')` from inside passenger 2 stays
two frames deep on passenger 2.

**Policy.** `allowedByPolicy` compares against `active` (`resolve.ts:116-130`), which phase 5
computes as `reachable(flow, …)` on the root flow (`navigate.ts:217`). Inside a group that set
is wrong: it must be the active flow's. Threading the active flow (5.1) fixes `visited` and
`sequential` in one place rather than teaching the policy about frames.

### 4.8 Completion of a group, and of the flow

Phase 4 treats `END` as the wizard finishing: it commits `status: 'done'` and returns
(`navigate.ts:202-211`). Inside a group that is wrong -- the _sub-flow_ finished.

**Rule.** `END` ends the frame's flow. If the stack has a parent, the traversal advances the
group's `i` to the next surviving item, or pops the group frame and resolves `next` from the
group step in the parent. Only `END` in the root flow sets `status: 'done'`.

**Outcome.** Finishing the last passenger's sub-flow in `order: [G, review]` lands on `review`
with `status: 'idle'`. Finishing it in `order: [G]` sets `status: 'done'` once, with the group
step in `completed`.

**Decided limitation.** `visited` and `completed` are `readonly string[]` of step ids
(`state.ts:29-30`) and both are read by id in `select.ts:53-56`. Under a repeat, "seat is
completed" is therefore true for the group, not per passenger, so breadcrumbs inside a repeat
show the furthest item's progress. Keying them as `key + '/' + step` would round-trip fine
(still strings, so `snapshot.ts` and `session.ts` accept them) but would break every
`includes(id)` read in `select.ts` and every host that reads `visited`. Ceiling documented, not
crossed, in 1.0.0.

### 4.9 Pruning of dead frames

**Rule.** At the start of phase 4, walk the stack from the root down. The first frame that is
dead -- its `key` is gone from the current items, its flow no longer resolves, or its step no
longer exists -- is dropped together with every frame above it. Pruning is pure and its result
is committed only by phase 9, like everything else.

**Outcome.** With `stack = [P/G(key: 'p2'), C/seat]` and `p2` removed from `data.passengers`,
`next()` resolves as if from `G` in `P`. History is not repaired -- walking every recorded stack
on every navigation is not worth it -- but `back()` skips a recorded stack whose top frame is
dead (4.6), so a dead item is never restored.

### 4.10 A snapshot containing group frames (L4a)

`toSnapshot` copies frames with a spread (`snapshot.ts:94-95`), so `key` rides along with no
change. The decoder is where the work is.

**What the decoder does today.** It validates every frame's shape with `isStackEntry`
(`snapshot.ts:228-229`, imported from `session.ts:62`) and then checks only the frames whose
`flow` equals the root's id (`snapshot.ts:174-179`), with a comment saying a frame naming a
sub-flow "is checked by whoever can resolve that sub-flow". So group frames decode unchecked.

**This contradicts L4a as written.** Row L4a says the decoder validates that "every frame in
`stack`/`history` names a step of the flow -- reusing `session.ts`'s frame checker, not a second
copy -- nesting is legal, repeat keys resolve". Today it reuses `isStackEntry` and nothing else,
and `isStackEntry` checks only that `flow` and `step` are strings: `{ flow: 'a', step: 'b', i:
'x' }` decodes clean. `checkSession` does check `i` (`session.ts:201-205`), but that block is
not shared with the decoder. (L4a also specifies `{ state, diagnostics } | { reset, reason }`;
the shipped decoder returns `{ restored, state } | { restored, reason }`. Naming it here so the
row and the code can be reconciled in one pass.)

**Rules.**

| Case                                  | Rule                                                                                                                                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isStackEntry` and `key`              | `key`, when present, is a string. One line in `isStackEntry`, which both decoders already share; the `session.ts:201-205` block then checks `key` only on repeat groups, as it checks `i` today.                                            |
| Frames naming a sub-flow              | `decodeSnapshot` takes the same optional `subFlows` registry `checkSession` takes (`session.ts:102-106`) and applies the same walk. Absent, behaviour is unchanged -- permissive -- and the frame is pruned by 4.9 on the first navigation. |
| Items changed since the snapshot      | Cannot happen in isolation: `data` is restored from the same snapshot, so keys and items move together. A host that mutates `data` after decode is case 4.2.                                                                                |
| The key is no longer present          | 4.9 prunes it. **No new `RestoreReason`** -- the existing set stays as shipped.                                                                                                                                                             |
| `keyBy` changed between flow versions | `snapshot/other-flow` catches it when both sides stamped `version` (`snapshot.ts:166-172`), and nothing catches it when they did not.                                                                                                       |

**Proposal.** `validateFlow` reports a flow that contains a `repeat` group and no `version`: a
repeat group is the one construct whose stored state depends on a field of the definition, so an
unstamped one has no way to refuse a stale snapshot.

## 5. Where it slots

### 5.1 The pipeline today, and the honest correction

`wizzard-12` says traversal "slots into navigate phases 4 and 9". Read against the code, that is
short by five phases. Every phase that looks a step up reads the **root** flow:

| Phase | What it does today                                                                            | Reads the root flow?    |
| ----- | --------------------------------------------------------------------------------------------- | ----------------------- |
| 0     | `beginNav` bumps the epoch and writes the lock (`navigate.ts:136-138`)                        | no                      |
| 1     | `beforeNavigate` hooks; veto or redirect                                                      | no                      |
| 2     | validates the step being left through `ctx.validate` (`navigate.ts:171-180`)                  | yes, via `store.ts:193` |
| 3     | exit guard: `flow.steps[from]?.guards?.exit` (`navigate.ts:184`)                              | **yes**                 |
| 4     | resolves the target; `END` short-circuits to `status: 'done'` (`navigate.ts:190-211`)         | **yes**                 |
| 5     | `flow.steps[target]`, `reachable`, `allowedByPolicy` (`navigate.ts:214-222`)                  | **yes**                 |
| 6     | load: `deferred`, `load`, the `busy` list (`navigate.ts:225-250`)                             | via the step from 5     |
| 7     | enter guard (`navigate.ts:253`)                                                               | via the step from 5     |
| 8     | last abort check                                                                              | no                      |
| 9     | the one commit; top frame replaced with `{ flow: flow.id, step: target }` (`navigate.ts:265`) | **yes**                 |
| 10    | `afterNavigate`, which cannot fail the navigation                                             | no                      |

And every phase that evaluates an expression builds its scope with `scopeOf` (`navigate.ts:113`,
`store.ts:180`), which is `{ data, ctx }` and nothing else. A child step whose `validate`, exit
guard, enter guard or `input`-fed expression reads `loop.item` sees `undefined` in phases 2, 3
and 7, and so does every selector.

So there are four injection points, not two:

- **0.5 -- the owning flow and the active scope.** One lookup after the lock: the flow that owns
  the current top frame, and the scope at that frame -- `data`, `ctx`, and `loop` derived from
  the frame's `key` against the current items (4.1). Phases 2, 3, 5, 6, 7 then read that flow
  instead of `flow`, which is a rename at six sites, and phases 2, 3 and 7 read that scope
  instead of `scopeOf`. `store.ts` needs the same pair: `validateStep` (`store.ts:192-197`) and
  the `load` callback (`store.ts:207-210`) both read `flow.steps[stepId]` from the root, and
  `resolverFor` (`store.ts:182-190`) hands every resolver `scopeOf()`. `createSelector`
  (`store.ts:116`) already takes a _getter_, so passing one that returns the active flow and
  scope costs `select.ts` nothing and gives breadcrumbs and progress inside a group -- today
  `derive` computes `index: -1` and `progress: 0` for every child step, because a child step id
  is not in the root's `order` (`select.ts:59-73`). The memo stays sound: the stack and the items
  only change on a commit, and a commit moves `rev`.
- **4 -- resolution.** The traversal answers the whole intent, including prune, enter, advance,
  pop, and what `END` means at this depth. The flat path is untouched when no traversal is
  installed.
- **8 -- the recheck.** Phases 6 and 7 await. `store.set` during that wait bumps `rev` but not
  `nav` (`store.ts:314-320`, `commit.ts:14-16`), so the stale check passes and phase 9 would
  commit a stack computed from a list that no longer exists. For a group move, phase 8 compares
  `rev` with the value phase 4 read; if it moved, `step()` runs again on the fresh state, and a
  different stack means `superseded`. A structural write during a group navigation therefore
  supersedes it, like a newer navigation would. Flat moves skip the recheck: their target is a
  step id, and a `set()` cannot move it.
- **9 -- the commit.** The stack the move produced replaces the `slice(0, -1)` expression.
  Nothing else about phase 9 changes: it is still one write, computed from a pure function, which
  is what keeps hard rule 2 intact.

### 5.2 The seam (proposal)

A new entry `packages/core/src/v1/groups.ts`, exported as `@wizzard-packages/core/groups`,
exporting one object with two pure functions. Handed to `createWizard` as `groups`, beside a
`subFlows` registry -- the same `Readonly<Record<string, FlowDefinition>>` that `checkSession`
takes (`session.ts:102-106`) and that 4.10 gives `decodeSnapshot` -- and threaded to
`NavContext` beside `registry` and `hooks`. Both functions take `subFlows`, because a
`GroupStep.flow` that is a string names a sub-flow nothing else can resolve: the expression
`Registry` holds resolver functions, not definitions.

```ts
// proposal -- groups.ts
export interface Traversal {
  /** Phase 0.5: the flow that owns the top frame, and the scope at that frame. */
  here: (
    root: FlowDefinition,
    state: WizardState,
    registry?: Registry,
    subFlows?: SubFlows
  ) => { flow: FlowDefinition; scope: Scope };
  /** Phase 4: the whole move, pure. `null` means no target. */
  step: (
    root: FlowDefinition,
    state: WizardState,
    intent: NavIntent,
    registry?: Registry,
    subFlows?: SubFlows
  ) =>
    | { stack: readonly Frame[]; to: string | typeof END; flow: FlowDefinition; scope: Scope }
    | { ok: false; reason: 'invalid'; by: string; errors: Readonly<Record<string, string>> }
    | null;
}
```

`step().flow` was added while this was implemented, and it is the one deviation
from the signature above as first written. It is the flow that owns the **new**
top frame, which is not always the one `here()` named: a move that enters or
leaves a group changes which flow phases 5 to 7 have to look the target up in,
and without it phase 5 looks a child step up in the root and answers
`no-target`. `here()` still answers for the frame the wizard is standing on, and
that is what phases 2 and 3 read.

`here().scope` is what phases 2, 3 and 7 evaluate against and what the selector and
`resolverFor` are given. `step().scope` is the scope _after_ the move -- the next item's
`loop` -- which the phase-7 enter guard of the target needs before anything is committed. It is
transient by design: after the commit the next `here()` rebuilds the same value from the
committed stack, so nothing is lost and nothing derived is stored.

```ts
// proposal -- the whole of the seam inside navigate.ts
const at = ctx.groups?.here(flow, locked, ctx.registry, ctx.subFlows)
  ?? { flow, scope: scopeOf(locked) };                              // phases 2,3,5,6,7 read `at`
const move = ctx.groups?.step(flow, state, intent, ctx.registry, ctx.subFlows);
if (move && 'ok' in move) return fail(move);                        // 4.1b
const target = move ? move.to : /* the three-way resolution as today */;
// phase 8, group moves only:
if (move && host.read().rev !== state.rev) { /* re-run step(); different stack -> superseded */ }
// phase 9:
stack: move ? move.stack : [...before.stack.slice(0, -1), { flow: at.flow.id, step: target }],
```

Plus one check the flat path needs whether or not traversal is installed. Without it, a flow
containing a `GroupStep` and no traversal fails silently and expensively: phase 5 finds the step,
`reachable` includes it, phase 9 makes it current, and the binding is asked to render a step
whose type has no `view` field. That is a configuration error, not a navigation outcome, so it
is refused where `resolverFor` refuses an unknown resolver (`store.ts:188`): by throwing. The
check runs in `createWizard` and again in `patchFlow` (`store.ts:373`), which is the only other
place a flow arrives, so it fails before the first render rather than on the first `next()`:

```
[wizzard] step "G" is a group, but no traversal is installed. The main entry walks flat flows
only. Pass `groups` from @wizzard-packages/core/groups to createWizard. <docs>#groups-not-installed
```

No new `NavReason`: `'groups-unsupported'` was considered and dropped, because a returned code
with the explanation on a page is the single-clause failure the `AGENTS.md` template forbids.

Rule 2 holds: `step` returns a stack, phase 9 commits it. Rule 4 holds: nothing derived is
stored; `key` is identity, and the index is rebuilt from it on every read.

### 5.3 The size decision

`pnpm size` at `b3366b9`, 2026-09-06:

| Entry                   | Measured | Limit  | Headroom |
| ----------------------- | -------- | ------ | -------- |
| `core-v1`               | 4.43 kB  | 4.5 kB | ~70 B    |
| `core-v1 session`       | 1.03 kB  | 1.1 kB | ~70 B    |
| `core-v1 snapshot`      | 1.04 kB  | 1.1 kB | ~60 B    |
| `core-v1 graph`         | 754 B    | 800 B  | 46 B     |
| `core-v1 validate-flow` | 887 B    | 1 kB   | ~110 B   |

Two options were on the table.

**(a) Traversal behind `@wizzard-packages/core/groups`, phase 9 falling back to flat traversal.**
The estimate for the seam itself, which is what a flat flow pays:

| Piece                                                                    | Estimate (gzip) |
| ------------------------------------------------------------------------ | --------------- |
| `here()` call, the rename at six sites, the scope threaded into `store`  | 25-40 B         |
| the `move` binding, the `invalid` return, two ternaries (phases 4, 9)    | 40-60 B         |
| the phase-8 `rev` recheck                                                | 25-40 B         |
| `isGroup` scan at `createWizard` and `patchFlow`, with its message       | 50-70 B         |
| `groups` and `subFlows` threaded through `WizardOptions` -> `navContext` | 15-25 B         |
| **total**                                                                | **155-235 B**   |

Types are free; the identifiers repeat, and gzip is kind to that. Call it ~200 B, and it must be
**measured before the budget line is written, not guessed**. Against 70 B of headroom, the
honest expectation is that `core-v1` moves to 4.6 kB, and 4.7 kB is not out of the question.
The message is the largest single piece; it is also the one the `AGENTS.md` template does not
allow to be shortened.

**(b) Traversal in the main entry, budget raised deliberately.** The traversal itself -- evaluate
`over`, build and compare keys, push, advance, pop, prune, resolve `END` by depth, pipe `input`
-- is 500-900 B. `core-v1` becomes roughly 5.1-5.3 kB, which is the outcome `ROADMAP.md` already
examined and rejected: "The alternatives were raising the budget to 5 kB for everyone, or
dropping `repeat`."

**Measured.** `pnpm size` after #40, 2026-09-06: `core-v1` moved 4.48 kB -> 4.96 kB against a
limit raised 4.5 -> 5.0 kB, and the seam is the 478 B the estimate above called ~200 B. Taken
by removing each piece and re-measuring: **278 B** the seam itself -- phase 0.5's `here`, phase
4's `step`, the flow and scope phases 5 to 7 read, the phase-8 recheck, phase 9's stack and the
active flow the store hands the selector; **156 B** the message a flow with a group and no
traversal is refused with; **44 B** the scan that finds the group and throws it. The estimate
was low on the seam and right that the message would be the largest single piece. The traversal
itself is `core-v1 groups` at 2.98 kB against a 3.0 kB limit -- more than the 500-900 B option
(b) estimated, because it calls `resolveNext`, `resolveBack` and the expression evaluator rather
than reimplementing them, and so pulls `resolve`, `expr` and `path` in behind it. A flat flow
still carries none of it, which was the whole argument for (a).

This PR adds to two more entries, both of them development or persistence concerns rather than
runtime ones: `core-v1 snapshot` 1.05 -> 1.38 kB against a limit raised 1.1 -> 1.4 kB, for the
shared frame walk of 4.10; `core-v1 session` 1.01 -> 1.13 kB against 1.1 -> 1.2 kB, because the
sentences a bad frame is reported with live there rather than in the shared walk, which is
120 B the decoder would otherwise carry to print nothing; and `core-v1 validate-flow` 887 B ->
1.21 kB against 1 -> 1.3 kB, for the two reports proposed in 4.5 and 4.10 and the walk that
finds a repeat inside an inline sub-flow. `core-v1` did not move.

**Recommendation: (a), and the comment at `.size-limit.js:24-26` is corrected anyway.** The seam
keeps 500-900 B out of every flat bundle, which is the whole argument, and it is the only option
that leaves the per-entry packaging model that `validate-flow`, `graph`, `session`, `snapshot`
and `expr` already follow (hard rule 6). But the comment as written -- group traversal "is not in
this entry and never will be", so a flat flow "pays nothing" -- is false under (a) too, because
`navigate.ts` phase 9 is one synchronous function inside the budgeted entry and the branch to
skip it has to live there. The eng review named exactly this (`v1-launch.md`, F3). The comment
should read: the traversal is not in this entry; the seam that installs it is, at N bytes
measured, and the flat path is unchanged.

## 6. Gate recommendation

**Include group traversal in 1.0.0.**

The plan's own recommendation, and the code agrees with it more strongly than the plan does. The
group model is already ratified in four shipped modules -- the `GroupStep` type and `isGroup`
(`flow.ts`), the `i` field and the stack contract (`state.ts`), the frame checker
(`session.ts:166-207`), the drawing (`graph.ts:133-150`) -- plus a scope root that
`validate-flow.ts:20` accepts and `expr.ts:63` reads but nothing ever populates. Deferring leaves
five modules describing a feature the engine refuses, and Premise 6 then requires
`validateFlow` to reject the construct those modules exist to handle.

**Cost of including it:** the `groups.ts` entry (500-900 B, its own budget, its own
`.size-limit.js` line, tsup entry and `exports` key, per hard rule 6); ~200 B of seam and a
`core-v1` budget raise to 4.6 kB with the reason stated in the PR; the phase-9 history fix (3.
above); `Frame.i` replaced by `key` in `state.ts` and `session.ts`; `decodeSnapshot` taking
`subFlows` and `isStackEntry` learning one field; the `navigate.ts:24-26` header comment
updated; contract tests on both bindings.

**Cost of deferring:** R-C is replaced as release evidence, and the plan's "three demanding
reference applications" become two. `validateFlow` grows a `flow/groups-unsupported` problem, the
inspector labels group nodes "drawn, not executable", `graph.ts`'s group rendering and
`session.ts`'s group frame checks become code no shipped flow can reach, and the format decision
in 4.10 is deferred past a published `v: 1` snapshot -- which makes it a migration later instead
of a field now.

## 7. Test plan

**The regression guard.** `resolve.property.test.ts` passes unchanged. It builds flat flows,
puts a single frame on the stack (`stateAt`, line 98-101) and calls `resolveNext`, `resolveBack`
and `reachable` directly. The seam guarantees this by construction: the traversal _calls_ those
functions for a single level, it does not replace them, so their signatures do not move. If that
file needs an edit, the seam is in the wrong place.

**New property tests -- structural change during a pending navigation.** The hazard is precise
and comes from `commit.ts`: `store.set` bumps `rev` but not `nav` (`store.ts:314-320`,
`commit.ts:14-16`), so mutating the item list while a navigation is in flight does **not**
supersede it, and phase 4 resolves against data that changed after phase 2 read it -- or, worse,
phase 9 commits a stack that phase 4 computed before a `set()` in phase 6 or 7 removed its item.
Generate an item list and a sub-flow, start a navigation, and pick the window at random: a
deferred phase-2 `validate`, a deferred phase-6 `load`, or a deferred phase-7 async enter guard.
Add / remove / reorder items while the window is open, then resolve. The phase-2 window is the
easy one, because phase 4 has not run yet; the phase-6 and phase-7 windows are the ones the
phase-8 recheck exists for, and the test is only worth having if it opens all three. Properties:

1. The committed stack never names a `key` absent from the final item list.
2. A navigation completes exactly once, and `rev` moves exactly once for it.
3. A navigation whose active item vanished mid-flight resolves to `superseded`, or lands on a
   surviving item -- never throws, never commits a dead frame.
4. Depth never exceeds 32 for any generated nesting.
5. With duplicate keys generated into the list, no move into or inside the group succeeds, the
   result is `invalid` naming the group, and selectors still produce a value.

**One test per invariant:**

| §    | Test                                                                                    |
| ---- | --------------------------------------------------------------------------------------- |
| 4.1  | reorder while inside an item; `key` fixed, `loop.index` moved before any navigation     |
| 4.1b | two items with one key: entry refused as `invalid`; `1` and `'1'` collide; `''` refused |
| 4.2  | remove the active item, then navigate; land on its successor or leave the group         |
| 4.3  | reorder mid-group; Next follows the moved item, not the old index                       |
| 4.4  | three-frame nesting; `checkSession` clean; inner item advances, outer `key` fixed       |
| 4.4  | a sub-flow naming an ancestor by id is refused at entry, not entered                    |
| 4.5  | `over: []` walks past; `G` never in `visited`                                           |
| 4.6  | `back()` from the first step of item 3 lands where item 2 actually stopped              |
| 4.6  | `back()` twice does not oscillate -- the phase-9 history fix                            |
| 4.7  | `go` a step of an ancestor pops frames and keeps `data`; `go` a sibling stays           |
| 4.7  | `sequential` policy inside a group compares against the sub-flow's `active`             |
| 4.8  | child `END` with a following step lands there, `status: 'idle'`                         |
| 4.8  | child `END` as the last step sets `status: 'done'` once                                 |
| 4.9  | dead frame plus everything above it dropped; history skips a dead recorded stack        |
| 4.10 | round-trip a snapshot taken inside a group; frames and `key` survive                    |
| 4.10 | decode with `subFlows` and a deleted child step -> `snapshot/unknown-step`              |
| 4.10 | decode without `subFlows` -> restored, then pruned on the first navigation              |
| 4.10 | `isStackEntry` rejects `key: 3`; `checkSession` reports `key` on a non-repeat step      |
| 5.1  | a child `validate`, exit guard and enter guard each read `loop.item` and see it         |
| 5.1  | a child step with `load` runs its resolver; the child id is absent from the root        |
| 5.1  | a string `GroupStep.flow` resolves through `subFlows` on entry and on decode            |
| 5.2  | `createWizard` and `patchFlow` throw the template message on a group without `groups`   |

**Contract tests on both bindings, driven by R-C.** In `contract/binding-suite.ts`, which each
binding runs against its own harness. New probe test ids: `add-item`, `remove-item`,
`item-key`, `item-index`. Four cases, the ones R-C names: add a passenger; remove a
non-current passenger; finish passenger 3 then revisit passenger 2 and see the answers still
there; remove the current passenger mid-edit and land somewhere sane. A binding that skips one
fails the test its sibling passes -- which is the whole reason that file exists.

## 8. Open questions

| #   | Question                                                                                                                                                           | Default if nobody decides                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1  | Is `keyBy` an item-relative path or an `Expr`?                                                                                                                     | Item-relative dotted path. The type is already `string`, not `Expr` (`flow.ts:65`); read with `expr.ts`'s walker.                                  |
| Q2  | Non-string keys -- numeric ids, objects                                                                                                                            | `String(value)`, so `1` and `'1'` collide and `[object Object]` collides with every other object. `undefined`, `null` and `''` are refused (4.1b). |
| Q3  | `visited` / `completed` per item                                                                                                                                   | No. Per step id, ceiling documented (4.8). Revisit only if R-C's UI cannot be built without it.                                                    |
| Q4  | Where does `GroupStep.input` land? Nothing reads it today.                                                                                                         | Evaluated on entry and merged into the `Scope.ctx` the traversal hands the child frames. `state.ctx` is untouched -- derived, not stored.          |
| Q5  | `go` id collision between a child flow and an ancestor                                                                                                             | Innermost wins (4.7).                                                                                                                              |
| Q6  | `validate-flow.ts:20` accepts a `step` root that `Scope` does not have and `expr.ts:53-78` cannot read -- `$get: 'step.x'` validates and evaluates to `undefined`. | Out of L9's scope. File it separately, per the `AGENTS.md` Scope rule.                                                                             |
| Q7  | Breadcrumbs inside a group: the child's steps or the parent's?                                                                                                     | The child's, via the active-flow getter in 5.1 -- "step 2 of 3 for this passenger". A site that wants both composes them from `getState().stack`.  |

## 9. What the code says that the plan does not

Collected so the rows can be corrected in one pass rather than rediscovered per PR.

| Finding                                                                                                                                                                                | Where                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `wizzard-12` and row L9 say "phases 4 and 9"; phases 2, 3, 5, 6, 7 all read the root flow, and so do `store.ts:193`, `store.ts:207-210` and `store.ts:116`.                            | 5.1                                    |
| Every expression in a navigation and every selector is evaluated against `{ data, ctx }`; nothing builds a `loop` scope, so a child step's guards and `validate` cannot read its item. | 5.1, `navigate.ts:113`, `store.ts:180` |
| A `set()` during phase 6 or 7 bumps `rev`, not `nav`; the stale check does not see it, so a move computed in phase 4 commits against data that changed after it.                       | 5.1, `commit.ts:14-16`                 |
| L4a says the decoder reuses `session.ts`'s frame checker; it reuses only `isStackEntry`, and group frames decode unchecked.                                                            | 4.10, `snapshot.ts:174-179`            |
| L4a specifies `{ state, diagnostics } \| { reset, reason }`; the shipped decoder returns `{ restored, … }`.                                                                            | 4.10, `snapshot.ts:52-54`              |
| `state.ts:24` calls `history` "a real back stack"; `resolveBack` never reads it, and phase 9 appends on a backward move too.                                                           | 3, 4.6                                 |
| `canBack` is true at the first step after a `back()`, while `back()` answers `no-target`.                                                                                              | 3, `select.ts:79`                      |
| `.size-limit.js:24-26` says a flat flow "pays nothing"; the seam lives in the budgeted entry either way.                                                                               | 5.3                                    |
| `Scope.loop` and the `loop` root ship in two modules and are populated by nothing.                                                                                                     | 2                                      |
| `isStackEntry` validates only `flow` and `step`, so `{ flow, step, i: 'x' }` decodes clean; the `i` check at `session.ts:201-205` is reachable from `checkSession` only.               | 4.10, `session.ts:62-66`               |
| `Frame.i` is a stored derived value (hard rule 4) that nothing writes; it goes, `key` replaces it.                                                                                     | 2, `state.ts:11-16`                    |
