import { explain } from './diagnostic';
import { test, type Registry, type Scope } from './expr';
import { END, type FlowDefinition, type StepDef, type Target } from './flow';

import type { WizardState } from './state';

/**
 * Whether a `when` holds, with one that throws read as `false`.
 *
 * Reachability runs over every step of `order` on every move and on every
 * snapshot, so a `when` that throws - a hostile flow, a resolver that is not
 * there - would otherwise stop every navigation and throw again on each read,
 * which in React is a render that cannot recover. The engine already reads a
 * `repeat.over` that throws as no items and an `input` that throws as
 * `undefined`; a step whose `when` throws is simply not there.
 */
const reported = new WeakMap<FlowDefinition, Set<string>>();
const holds = (
  flow: FlowDefinition,
  when: StepDef['when'],
  scope: Scope,
  registry: Registry | undefined,
  at: string
): boolean => {
  try {
    return test(when, scope, registry);
  } catch (error) {
    // Once for each flow, place and error: reachability runs on every commit,
    // and a line for each keystroke would bury the first one. Kept against the
    // flow object rather than in one set for the process, so a second wizard, a
    // patched flow or another request reports its own - and a later, different
    // error in the same place is not swallowed as a repeat.
    const seen = reported.get(flow) ?? new Set<string>();
    reported.set(flow, seen);
    const once = `${at}\n${String(error)}`;
    if (!seen.has(once)) {
      seen.add(once);
      console.error(
        explain('when-threw', [
          `the when of ${at} threw, so it is read as false`,
          'A when says whether a step is there, and one that throws would otherwise stop every move',
          'Fix the expression, or run validateFlow on the flow before the wizard is created',
        ]),
        error
      );
    }
    return false;
  }
};

/**
 * Where does `next()` go?
 *
 * A pure function of the flow and the current state, deliberately: it is the
 * part of a wizard that quietly breaks, so it has to be testable without a
 * store, a component, or a clock.
 *
 * Two mechanisms, in order. An explicit `on.next` wins — that is a real branch.
 * Otherwise the next entry in `order` whose `when` passes, which covers the
 * ninety percent case of "skip this step unless the user is a company".
 */
export function resolveNext(
  flow: FlowDefinition,
  state: WizardState,
  scope: Scope,
  registry?: Registry
): string | typeof END | null {
  const current = state.stack[state.stack.length - 1]?.step;
  if (current === undefined) return firstReachable(flow, scope, registry, 0);

  const step = flow.steps[current];
  if (!step) return null;

  const explicit = step.on?.next;
  if (explicit !== undefined) {
    const targets: readonly Target[] = Array.isArray(explicit) ? explicit : [explicit as Target];
    let closed: string | undefined;
    for (const t of targets) {
      const to = typeof t === 'string' ? t : t.to;
      const guard = typeof t === 'string' ? undefined : t.when;
      if (!holds(flow, guard, scope, registry, `the transition of step "${current}" to "${to}"`))
        continue;
      if (to === END) return END;
      if (flow.steps[to] && holds(flow, flow.steps[to].when, scope, registry, `step "${to}"`))
        return to;
      closed ??= to;
    }
    // A transition that names only steps whose own `when` is false is a flow
    // bug, not a silent skip: the first one named is answered, and the move
    // refuses it as `not-reachable`. One where no entry applies at all has
    // nowhere to go, `no-target`. Neither finishes the wizard past every step
    // still ahead; finishing is `'@end'`, written out.
    return closed ?? null;
  }

  const order = effectiveOrder(flow);
  const at = order.indexOf(current);
  if (at === -1) return END;
  return firstReachable(flow, scope, registry, at + 1);
}

/** Walks `order` forward from `from`, returning the first reachable step. */
function firstReachable(
  flow: FlowDefinition,
  scope: Scope,
  registry: Registry | undefined,
  from: number
): string | typeof END {
  const order = effectiveOrder(flow);
  for (let i = from; i < order.length; i++) {
    const id = order[i];
    if (id === undefined) continue;
    const step = flow.steps[id];
    if (step && holds(flow, step.when, scope, registry, `step "${id}"`)) return id;
  }
  return END;
}

/**
 * The order the resolver walks. `order` is optional; a flow that omits it
 * falls back to the insertion order of `steps`, which is how a hand-written
 * flow object reads — top to bottom. Declaring `order` is what makes a step
 * skippable: one missing from it is reachable only via `on.next`.
 */
function effectiveOrder(flow: FlowDefinition): readonly string[] {
  return flow.order ?? Object.keys(flow.steps);
}

/** Walks `order` backward, so `back()` skips steps that are no longer reachable. */
export function resolveBack(
  flow: FlowDefinition,
  state: WizardState,
  scope: Scope,
  registry?: Registry
): string | null {
  const current = state.stack[state.stack.length - 1]?.step;
  const explicit = current ? flow.steps[current]?.on?.back : undefined;
  if (explicit !== undefined && explicit !== 'auto') {
    const to = typeof explicit === 'string' ? explicit : explicit.to;
    return flow.steps[to] ? to : null;
  }

  const order = effectiveOrder(flow);
  const at = current ? order.indexOf(current) : order.length;
  for (let i = at - 1; i >= 0; i--) {
    const id = order[i];
    if (id === undefined) continue;
    const step = flow.steps[id];
    if (step && holds(flow, step.when, scope, registry, `step "${id}"`)) return id;
  }
  return null;
}

/** Steps currently reachable, in order. The basis of progress and breadcrumbs. */
export function reachable(
  flow: FlowDefinition,
  scope: Scope,
  registry?: Registry
): readonly string[] {
  const order = effectiveOrder(flow);
  return order.filter((id) => enterable(flow, id, scope, registry));
}

/**
 * `reachable`, with each branch the wizard took placed right after the step it
 * was entered from. The basis of `active`, and of the `sequential` policy, so a
 * breadcrumb and a jump agree on who is a neighbour.
 *
 * A step outside `order` has no position of its own; without this, standing on
 * one read as index -1, 0% and no breadcrumb. A step of `order` that is not
 * reachable stays out even when it is the current one: `index` of -1 is how a
 * binding sees the route closed under it.
 */
export function reachableOnPath(
  flow: FlowDefinition,
  state: WizardState,
  scope: Scope,
  registry?: Registry
): readonly string[] {
  const { stack } = state;
  // The route at this level - this flow, the same enclosing frames - with its
  // loops erased: a step met again means the wizard came back to it, by go()
  // or by a cycle, and what followed its first visit is no longer the way on.
  // `back()` needs no such care; it pops `history`.
  const level = JSON.stringify(stack.slice(0, -1));
  const route: string[] = [];
  for (const frames of [...state.history, stack]) {
    const top = frames[frames.length - 1];
    if (top?.flow !== flow.id || JSON.stringify(frames.slice(0, -1)) !== level) continue;
    const seen = route.indexOf(top.step);
    if (seen === -1) route.push(top.step);
    else route.length = seen + 1;
  }

  const order = effectiveOrder(flow);
  const placed = [...reachable(flow, scope, registry)];
  let at = -1;
  for (const id of route) {
    if (!order.includes(id) && !placed.includes(id) && enterable(flow, id, scope, registry))
      placed.splice(at + 1, 0, id);
    const i = placed.indexOf(id);
    if (i !== -1) at = i;
  }
  return placed;
}

/**
 * Whether a move may land on `id`: the step exists and its `when` holds.
 * Unlike `reachable`, not limited to `order` - a step outside it is a branch
 * that `on.next` or `go()` enters by name.
 */
export function enterable(
  flow: FlowDefinition,
  id: string,
  scope: Scope,
  registry?: Registry
): boolean {
  const step = flow.steps[id];
  return step !== undefined && holds(flow, step.when, scope, registry, `step "${id}"`);
}

/** Whether `policy` permits jumping straight to `to`. */
export function allowedByPolicy(
  flow: FlowDefinition,
  state: WizardState,
  to: string,
  active: readonly string[]
): boolean {
  const policy = flow.policy ?? 'visited';
  if (policy === 'free') return true;
  if (policy === 'visited') return state.visited.includes(to);

  const current = state.stack[state.stack.length - 1]?.step;
  const from = current ? active.indexOf(current) : -1;
  const target = active.indexOf(to);
  return target !== -1 && Math.abs(target - from) <= 1;
}
