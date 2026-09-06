import { evaluate, type Registry, type Scope } from './expr';
import { END, isGroup, type FlowDefinition, type GroupStep } from './flow';
import { getPath } from './path';
import { resolveBack, resolveNext } from './resolve';

import type { NavIntent, SubFlows, Traversal } from './navigate';
import type { Frame, WizardState } from './state';

/**
 * Group and repeat traversal.
 *
 * Its own entry, and installed rather than imported: the machinery that walks
 * sub-flows is five hundred bytes a flat flow would carry for nothing. The main
 * entry holds the seam and the types; everything that pushes, advances, pops or
 * prunes a frame is here.
 *
 * Two pure functions, because the pipeline is what does the writing. `here`
 * answers where the wizard is standing, and `step` answers the whole move as a
 * stack the commit in phase 9 writes verbatim. Neither stores anything: a frame
 * carries the item's `key` and nothing else, and the index is rebuilt from that
 * key against the current items on every read, so a host that reorders the list
 * between two navigations reads the new position immediately.
 */

/** Same cap as `session.ts` and `graph.ts`. Thirty-two frames deep is not nesting. */
const MAX_DEPTH = 32;

const DOCS = 'https://github.com/ZizzX/wizzard-packages/blob/main/docs/errors.md';

/**
 * One frame's worth of context: the flow the frame belongs to, the scope its
 * steps are evaluated against, and the frame itself.
 *
 * The scope is the parent's for a group frame and the child's for what the
 * group encloses, which is the whole of how `loop` and `input` reach a
 * sub-flow's expressions.
 */
export interface Level {
  flow: FlowDefinition;
  scope: Scope;
  /** Absent only at the root of a stack nobody has entered yet. */
  frame?: Frame;
}

export type Invalid = {
  ok: false;
  reason: 'invalid';
  by: string;
  errors: Readonly<Record<string, string>>;
};

export type Move = {
  stack: readonly Frame[];
  to: string | typeof END;
  flow: FlowDefinition;
  scope: Scope;
};

/** The items of a `repeat` and the key each one is addressed by. */
export interface Items {
  items: readonly unknown[];
  keys: readonly string[];
}

const rootScope = (state: WizardState): Scope => ({ data: state.data, ctx: state.ctx });

/** `resolveNext` and `resolveBack` read the top frame, so they get a stack of one. */
const stateAt = (state: WizardState, frame: Frame | undefined): WizardState => ({
  ...state,
  stack: frame === undefined ? [] : [frame],
});

const subFlowOf = (step: GroupStep, subFlows: SubFlows | undefined): FlowDefinition | undefined =>
  typeof step.flow === 'string' ? subFlows?.[step.flow] : step.flow;

/**
 * The items of a repeat group, with their keys.
 *
 * `null` means there is nothing to enter — an empty list, or an `over` that did
 * not evaluate to an array — and the group is walked past like a step whose
 * `when` is false. A string is a data error (4.1b): two items answering with
 * one key, or an item with no identity at all. Neither is resolved silently,
 * because the silent resolution is the stale-position bug `key` exists to
 * remove.
 */
export function itemsOf(
  id: string,
  repeat: NonNullable<GroupStep['repeat']>,
  scope: Scope,
  registry?: Registry
): Items | string | null {
  let raw: unknown;
  try {
    raw = evaluate(repeat.over, scope, registry);
  } catch {
    return null;
  }
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const keyBy = repeat.keyBy;
  // Without `keyBy` the key is the position, which is the ceiling an author
  // accepts by omitting it: positions cannot collide and cannot be empty.
  if (keyBy === undefined) {
    return { items: raw, keys: raw.map((_, i) => String(i)) };
  }

  const keys: string[] = [];
  const seen = new Map<string, number>();

  for (let i = 0; i < raw.length; i++) {
    const value = getPath(raw[i], keyBy);
    if (value === undefined || value === null || value === '') {
      return (
        `[wizzard] item ${i} of repeat group "${id}" has no key at "${keyBy}". ` +
        `A repeat frame stores the item's key and nothing else, and undefined, null and "" name no item. ` +
        `Give item ${i} a "${keyBy}", or drop keyBy to identify items by position. ` +
        `${DOCS}#repeat-keys`
      );
    }
    const key = String(value);
    const first = seen.get(key);
    if (first !== undefined) {
      return (
        `[wizzard] repeat keys collide in group "${id}": "${key}" at ${first} and ${i}. ` +
        `Keys are compared as strings, so 1 and "1" are one key, and a frame naming "${key}" could mean either item. ` +
        `Make "${keyBy}" unique across the items, or drop keyBy to identify items by position. ` +
        `${DOCS}#repeat-keys`
      );
    }
    seen.set(key, i);
    keys.push(key);
  }

  return { items: raw, keys };
}

/**
 * The `loop` scope for one key, or `undefined` when the item is gone.
 *
 * A colliding key never reaches here — `itemsOf` refuses the whole evaluation —
 * so `indexOf` binding to the first match is only ever the exact match.
 */
const loopAt = (items: Items, key: string): Scope['loop'] | undefined => {
  const index = items.keys.indexOf(key);
  return index === -1 ? undefined : { index, item: items.items[index], key };
};

/**
 * The scope a group hands its children: the parent's `data`, the parent's `ctx`
 * with `input` evaluated on top of it, and `loop`.
 *
 * `state.ctx` is never touched. `input` is derived on every read from the
 * parent's scope with the entering group's own `loop` already on it, so a
 * repeat can pipe `{ $get: 'loop.key' }` into its children and a value that
 * changes upstream is seen without a navigation. A plain group inside a repeat
 * inherits the enclosing `loop`, which is what lets a nested section still
 * address the item it sits in.
 */
function childScope(
  parent: Scope,
  step: GroupStep,
  loop: Scope['loop'],
  registry?: Registry
): Scope {
  const inherited = loop ?? parent.loop;
  const base: Scope =
    inherited === undefined ? parent : { data: parent.data, ctx: parent.ctx, loop: inherited };

  let ctx = parent.ctx;
  if (step.input !== undefined) {
    ctx = { ...ctx };
    for (const [name, expr] of Object.entries(step.input)) {
      try {
        ctx[name] = evaluate(expr, base, registry);
      } catch {
        // An `input` naming a resolver the registry does not have is one absent
        // value, not a failed navigation: `$get` of a missing key is undefined
        // everywhere else too.
        ctx[name] = undefined;
      }
    }
  }

  return inherited === undefined
    ? { data: parent.data, ctx }
    : { data: parent.data, ctx, loop: inherited };
}

/**
 * The live part of a stack, with the context at every level.
 *
 * This is the pruning of 4.9 as a read rather than a write: the walk stops at
 * the first frame that no longer resolves — its flow is not the one enclosing
 * it, its step is gone, its sub-flow cannot be found, or the item its `key`
 * named has been removed — and everything above that frame is simply not
 * returned. A repeat frame whose item vanished survives as the group step it
 * sits on, without the key, which is the "deepest surviving frame" the
 * navigation then resolves from.
 */
export function walk(
  root: FlowDefinition,
  state: WizardState,
  registry?: Registry,
  subFlows?: SubFlows
): Level[] {
  const levels: Level[] = [];
  let flow = root;
  let scope = rootScope(state);

  for (const frame of state.stack) {
    if (frame.flow !== flow.id) break;
    const step = flow.steps[frame.step];
    if (step === undefined) break;

    if (!isGroup(step)) {
      // An atom step encloses nothing, so anything recorded above it is a stack
      // the engine could not have built.
      levels.push({ flow, scope, frame });
      break;
    }

    let loop: Scope['loop'];
    if (step.repeat !== undefined) {
      const items = itemsOf(frame.step, step.repeat, scope, registry);
      loop =
        items === null || typeof items === 'string' || frame.key === undefined
          ? undefined
          : loopAt(items, frame.key);
      if (loop === undefined) {
        levels.push({ flow, scope, frame: { flow: frame.flow, step: frame.step } });
        break;
      }
    }

    levels.push({ flow, scope, frame });

    const sub = subFlowOf(step, subFlows);
    if (sub === undefined) break;
    scope = childScope(scope, step, loop, registry);
    flow = sub;
  }

  return levels;
}

/**
 * Phase 0.5: the flow owning the top frame, and the scope there.
 *
 * Never throws, and that is load-bearing rather than polite: the selector calls
 * it on every `rev`, so a host that removes the item somebody is standing on
 * and renders before navigating has to get an answer, not an exception.
 */
export function here(
  root: FlowDefinition,
  state: WizardState,
  registry?: Registry,
  subFlows?: SubFlows
): { flow: FlowDefinition; scope: Scope } {
  try {
    const top = walk(root, state, registry, subFlows).pop();
    return top === undefined
      ? { flow: root, scope: rootScope(state) }
      : { flow: top.flow, scope: top.scope };
  } catch {
    return { flow: root, scope: rootScope(state) };
  }
}

const framesOf = (levels: readonly Level[]): readonly Frame[] =>
  levels.map((l) => l.frame).filter((f): f is Frame => f !== undefined);

const landed = (levels: readonly Level[], to: string | typeof END, level: Level): Move => ({
  stack: framesOf(levels),
  to,
  flow: level.flow,
  scope: level.scope,
});

const invalid = (id: string, step: GroupStep, message: string): Invalid => ({
  ok: false,
  reason: 'invalid',
  by: id,
  // Keyed by the field the author can fix. `repeat` when there is no `keyBy`,
  // which is the only case where the group itself is what went wrong.
  errors: { [step.repeat?.keyBy ?? 'repeat']: message },
});

type Enter =
  | { kind: 'in'; to: string | typeof END | null }
  | { kind: 'past' }
  | { kind: 'refused' }
  | { kind: 'invalid'; message: string };

/**
 * Steps into a group, at its first surviving item.
 *
 * `past` is 4.5 — nothing to enter, so the group is walked past exactly as a
 * false `when` is. `refused` is 4.4 — a sub-flow already on the stack would
 * recurse forever, the case `graph.ts` draws as `opaque: 'cycle'`, and a stack
 * past the depth cap is the same answer for the same reason.
 */
function enter(
  levels: Level[],
  id: string,
  step: GroupStep,
  state: WizardState,
  registry?: Registry,
  subFlows?: SubFlows
): Enter {
  const level = levels[levels.length - 1];
  if (level === undefined) return { kind: 'past' };

  const sub = subFlowOf(step, subFlows);
  if (sub === undefined) return { kind: 'past' };
  if (levels.some((l) => l.flow.id === sub.id)) return { kind: 'refused' };
  if (levels.length >= MAX_DEPTH) return { kind: 'refused' };

  let loop: Scope['loop'];
  let key: string | undefined;
  if (step.repeat !== undefined) {
    const items = itemsOf(id, step.repeat, level.scope, registry);
    if (items === null) return { kind: 'past' };
    if (typeof items === 'string') return { kind: 'invalid', message: items };
    key = items.keys[0];
    loop = key === undefined ? undefined : loopAt(items, key);
  }

  level.frame =
    key === undefined ? { flow: level.flow.id, step: id } : { flow: level.flow.id, step: id, key };

  const scope = childScope(level.scope, step, loop, registry);
  levels.push({ flow: sub, scope });
  return { kind: 'in', to: resolveNext(sub, stateAt(state, undefined), scope, registry) };
}

type Advance =
  | { kind: 'item'; to: string | typeof END | null }
  | { kind: 'out' }
  | { kind: 'invalid'; message: string };

/**
 * Moves a repeat group onto the next surviving item, once its sub-flow ended.
 *
 * A key that is no longer in the list lands on the first item rather than
 * nowhere, which is 4.2 read forwards: the item that took the removed one's
 * place is the one to go to.
 */
function advance(
  levels: Level[],
  id: string,
  step: GroupStep,
  state: WizardState,
  registry?: Registry,
  subFlows?: SubFlows
): Advance {
  const level = levels[levels.length - 1];
  if (level === undefined || step.repeat === undefined) return { kind: 'out' };

  const items = itemsOf(id, step.repeat, level.scope, registry);
  if (items === null) return { kind: 'out' };
  if (typeof items === 'string') return { kind: 'invalid', message: items };

  const key = level.frame?.key;
  const at = key === undefined ? -1 : items.keys.indexOf(key);
  const next = items.keys[at + 1];
  if (next === undefined) return { kind: 'out' };

  const sub = subFlowOf(step, subFlows);
  if (sub === undefined) return { kind: 'out' };

  level.frame = { flow: level.flow.id, step: id, key: next };
  const scope = childScope(level.scope, step, loopAt(items, next), registry);
  levels.push({ flow: sub, scope });
  return { kind: 'item', to: resolveNext(sub, stateAt(state, undefined), scope, registry) };
}

/**
 * Follows a resolved target until it is somewhere a wizard can stand.
 *
 * A target can be a group, which is entered; the end of a sub-flow, which
 * advances the group above it or pops out of it; and either of those can lead
 * straight into another. So it is a loop rather than four call sites, and the
 * bound is the depth cap: every turn either descends a frame, ascends one, or
 * lands.
 */
function settle(
  levels: Level[],
  from: string | typeof END | null,
  state: WizardState,
  registry?: Registry,
  subFlows?: SubFlows
): Move | Invalid | null {
  let to = from;

  for (let turn = 0; turn <= MAX_DEPTH * 2; turn++) {
    const level = levels[levels.length - 1];
    // `resolveNext` answers `null` for a step the flow no longer has, which is
    // the same nowhere-to-go a flat navigation reports as `no-target`.
    if (level === undefined || to === null) return null;

    if (to === END) {
      // 4.8: `END` ends the frame's flow, not the wizard. Only the root's does
      // both, and only then does phase 4 commit `status: 'done'`.
      if (levels.length === 1) return landed(levels, END, level);

      levels.pop();
      const parent = levels[levels.length - 1];
      const id = parent?.frame?.step;
      const group = parent === undefined || id === undefined ? undefined : parent.flow.steps[id];
      if (parent === undefined || id === undefined || group === undefined || !isGroup(group)) {
        return null;
      }

      const moved = advance(levels, id, group, state, registry, subFlows);
      if (moved.kind === 'invalid') return invalid(id, group, moved.message);
      to =
        moved.kind === 'item'
          ? moved.to
          : resolveNext(parent.flow, stateAt(state, parent.frame), parent.scope, registry);
      continue;
    }

    const step = level.flow.steps[to];
    if (step === undefined) return null;

    if (isGroup(step)) {
      const entered = enter(levels, to, step, state, registry, subFlows);
      if (entered.kind === 'invalid') return invalid(to, step, entered.message);
      if (entered.kind === 'refused') return null;
      if (entered.kind === 'in') {
        to = entered.to;
        continue;
      }
      // Nothing to enter. The group is stepped over without being made current,
      // so it never reaches `visited` either.
      to = resolveNext(
        level.flow,
        stateAt(state, { flow: level.flow.id, step: to }),
        level.scope,
        registry
      );
      continue;
    }

    level.frame = { flow: level.flow.id, step: to };
    return landed(levels, to, level);
  }

  return null;
}

/** `next()`. A group frame at the top means its child was pruned: re-enter it. */
function forward(
  levels: Level[],
  state: WizardState,
  registry?: Registry,
  subFlows?: SubFlows
): Move | Invalid | null {
  const level = levels[levels.length - 1];
  if (level === undefined) return null;

  const frame = level.frame;
  const step = frame === undefined ? undefined : level.flow.steps[frame.step];
  // Standing on a group without being inside it: the item was removed under us,
  // or a snapshot was restored at the boundary. Either way the section is where
  // the person is, so it is entered rather than walked past.
  if (frame !== undefined && step !== undefined && isGroup(step)) {
    return settle(levels, frame.step, state, registry, subFlows);
  }

  return settle(
    levels,
    resolveNext(level.flow, stateAt(state, frame), level.scope, registry),
    state,
    registry,
    subFlows
  );
}

/**
 * `back()`. History-driven once the stack is deeper than one frame (4.6).
 *
 * `order` cannot answer this: the step before "passenger 3, seat" is
 * "passenger 2, meal", and `order` does not know which item you came from.
 * A recorded stack whose top frame is dead is skipped rather than restored,
 * because 4.9 does not repair history and a dead item must never come back.
 */
function retreat(
  levels: Level[],
  root: FlowDefinition,
  state: WizardState,
  registry?: Registry,
  subFlows?: SubFlows
): Move | Invalid | null {
  if (levels.length > 1 || state.stack.length > 1) {
    for (let i = state.history.length - 1; i >= 0; i--) {
      const recorded = state.history[i];
      if (recorded === undefined || recorded.length === 0) continue;

      const alive = walk(root, { ...state, stack: recorded }, registry, subFlows);
      if (alive.length !== recorded.length) continue;

      const top = alive[alive.length - 1];
      const frame = top?.frame;
      if (top === undefined || frame === undefined) continue;
      const step = top.flow.steps[frame.step];
      if (step === undefined || isGroup(step)) continue;

      return { stack: framesOf(alive), to: frame.step, flow: top.flow, scope: top.scope };
    }

    // Nothing usable recorded — a restored snapshot, most likely. Leave the
    // innermost sub-flow and resolve backwards from the group step in its
    // parent, which is what 4.6 says happens at the first item's first step.
    const out = levels.slice(0, -1);
    const parent = out[out.length - 1];
    if (parent === undefined) return null;
    const to = resolveBack(parent.flow, stateAt(state, parent.frame), parent.scope, registry);
    return to === null ? null : settle(out, to, state, registry, subFlows);
  }

  const level = levels[levels.length - 1];
  if (level === undefined) return null;
  const to = resolveBack(level.flow, stateAt(state, level.frame), level.scope, registry);
  return to === null ? null : settle(levels, to, state, registry, subFlows);
}

/**
 * `go(id)`. Innermost first, then outward through the enclosing flows (4.7).
 *
 * A step inside a sub-flow has no id in the root, so a compound address would
 * be a second naming scheme in the public API for one feature. Resolving
 * outwards instead means `go('review')` from inside a group pops the frames
 * above `review`'s flow and keeps every item's answers in `data`.
 */
function jump(
  levels: Level[],
  state: WizardState,
  to: string,
  registry?: Registry,
  subFlows?: SubFlows
): Move | Invalid | null {
  if (to === END) {
    const level = levels[levels.length - 1];
    return level === undefined ? null : landed(levels, END, level);
  }

  for (let i = levels.length - 1; i >= 0; i--) {
    if (levels[i]?.flow.steps[to] === undefined) continue;
    return settle(levels.slice(0, i + 1), to, state, registry, subFlows);
  }
  return null;
}

/** Phase 4: the whole move, pure. `null` means no target. */
export function step(
  root: FlowDefinition,
  state: WizardState,
  intent: NavIntent,
  registry?: Registry,
  subFlows?: SubFlows
): Move | Invalid | null {
  const levels = walk(root, state, registry, subFlows);
  if (levels.length === 0) levels.push({ flow: root, scope: rootScope(state) });

  if (intent.type === 'go') return jump(levels, state, intent.to, registry, subFlows);
  if (intent.type === 'back') return retreat(levels, root, state, registry, subFlows);
  return forward(levels, state, registry, subFlows);
}

/**
 * What `createWizard` is handed as `groups`.
 *
 * One object, because installing traversal is one decision: a flow either has
 * sub-flows or it does not, and half of the pair would leave the pipeline
 * looking a child step up in the root flow.
 */
export const groups: Traversal = { here, step };
