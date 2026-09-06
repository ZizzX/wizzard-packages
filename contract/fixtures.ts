import type { FlowDefinition, SubFlows } from '@wizzard-packages/core/v1';

/**
 * The three reference flows of `docs/designs/v1-launch.md` (R-A, R-B, R-C) as
 * JSON literals, plus the fault planted in each one. Shared by the devtools
 * tests, the binding contract and, later, the site, so a fixture is written
 * once and every consumer asserts against the same shape.
 *
 * Each fault is the kind of thing the devtools panel exists to explain: a
 * validator that refuses a field, a `when` that hides the next step under the
 * data at hand, and a repeat key that collides.
 */

// ---------------------------------------------------------------------------
// R-A: a `when` branch, a `back` override, and a validator on the first step.

export const flowA: FlowDefinition = {
  id: 'signup',
  version: 1,
  order: ['details', 'company', 'payment'],
  steps: {
    details: { label: 'Details', validate: { $ref: 'needsEmail' } },
    company: { label: 'Company', when: { $eq: [{ $get: 'data.payer' }, 'business'] } },
    payment: { label: 'Payment', on: { back: 'details' } },
  },
  policy: 'free',
};

/** The planted fault: with `dataA`, the first `next()` is refused on `email`. */
export const registryA = {
  needsEmail: (_args: unknown, scope: { data: Record<string, unknown> }) =>
    scope.data.email ? null : { email: 'required' },
};

export const dataA: Record<string, unknown> = { payer: 'business' };

// ---------------------------------------------------------------------------
// R-B: a deferred step, a validator, and a `when` that `dataB` leaves false.

export const flowB: FlowDefinition = {
  id: 'upgrade',
  version: 1,
  order: ['plan', 'addons', 'confirm'],
  steps: {
    plan: { label: 'Plan', validate: { $ref: 'needsPlan' } },
    addons: { label: 'Add-ons', when: { $eq: [{ $get: 'data.plan' }, 'pro'] } },
    confirm: { label: 'Confirm', deferred: true },
  },
  policy: 'free',
};

export const registryB = {
  needsPlan: (_args: unknown, scope: { data: Record<string, unknown> }) =>
    scope.data.plan ? null : { plan: 'required' },
};

/** The planted fault: `addons` is hidden, so `next()` from `plan` lands on `confirm`. */
export const dataB: Record<string, unknown> = { plan: 'basic' };

// ---------------------------------------------------------------------------
// R-C: a repeat group over passengers, a two-step sub-flow for each, and a
// step after the group to leave it for. The group names its sub-flow by
// string, so the registry is what resolves it - the same pair a host passes
// `createWizard`.

export const passengerFlow: FlowDefinition = {
  id: 'passenger',
  order: ['seat', 'meal'],
  steps: { seat: { label: 'Seat' }, meal: { label: 'Meal' } },
  policy: 'free',
};

export const flowC: FlowDefinition = {
  id: 'trip',
  version: 1,
  order: ['passengers', 'review'],
  steps: {
    passengers: {
      flow: 'passenger',
      when: { $not: { $empty: { $get: 'data.passengers' } } },
      repeat: { over: { $get: 'data.passengers' }, keyBy: 'id' },
    },
    review: { label: 'Review' },
  },
  policy: 'free',
};

export const subFlowsC: SubFlows = { passenger: passengerFlow };

/** Passengers by id, the shape `flowC.steps.passengers.repeat` iterates. */
export const dataC = (...ids: string[]): Record<string, unknown> => ({
  passengers: ids.map((id) => ({ id })),
});

/** The planted fault: two items share a key, so entering the group is refused. */
export const faultyDataC: Record<string, unknown> = dataC('p1', 'p1');

// ---------------------------------------------------------------------------
// Density. Every step carries a `when`, so the graph builder's fall-through
// walk emits an `order` edge from each step to every later one: n steps give
// n(n-1)/2 edges, about twenty thousand at 200. A chain of 200 proves nothing
// about a layout; this does.

export function denseFlow(n = 200): FlowDefinition {
  const ids = Array.from({ length: n }, (_, i) => `s${i}`);
  const steps: Record<string, FlowDefinition['steps'][string]> = {};
  ids.forEach((id, i) => {
    steps[id] = { label: id, when: { $eq: [{ $get: 'data.k' }, i] } };
  });
  return { id: 'dense', order: ids, steps, policy: 'free' };
}
