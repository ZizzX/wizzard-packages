import { test, type Registry, type Scope } from './expr';
import { END, type FlowDefinition, type Target } from './flow';

import type { WizardState } from './state';

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
    for (const t of targets) {
      const to = typeof t === 'string' ? t : t.to;
      const guard = typeof t === 'string' ? undefined : t.when;
      if (!test(guard, scope, registry)) continue;
      if (to === END) return END;
      // An explicit target still has to be reachable; a branch pointing at a
      // step whose own `when` is false is a flow bug, not a silent skip.
      if (flow.steps[to] && test(flow.steps[to].when, scope, registry)) return to;
    }
    return END;
  }

  const order = flow.order ?? Object.keys(flow.steps);
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
  const order = flow.order ?? Object.keys(flow.steps);
  for (let i = from; i < order.length; i++) {
    const id = order[i];
    if (id === undefined) continue;
    const step = flow.steps[id];
    if (step && test(step.when, scope, registry)) return id;
  }
  return END;
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

  const order = flow.order ?? Object.keys(flow.steps);
  const at = current ? order.indexOf(current) : order.length;
  for (let i = at - 1; i >= 0; i--) {
    const id = order[i];
    if (id === undefined) continue;
    const step = flow.steps[id];
    if (step && test(step.when, scope, registry)) return id;
  }
  return null;
}

/** Steps currently reachable, in order. The basis of progress and breadcrumbs. */
export function reachable(
  flow: FlowDefinition,
  scope: Scope,
  registry?: Registry
): readonly string[] {
  const order = flow.order ?? Object.keys(flow.steps);
  return order.filter((id) => {
    const step = flow.steps[id];
    return step !== undefined && test(step.when, scope, registry);
  });
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
