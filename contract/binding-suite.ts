import { groups } from '@wizzard-packages/core/groups';
import { describe, expect, it } from 'vitest';

import type { FlowDefinition, SubFlows, Traversal } from '@wizzard-packages/core/v1';

/**
 * The contract every framework binding owes.
 *
 * This exists because of what happened without it. In 0.x, navigation lived in
 * the React layer and again in the Vue layer, and the two copies drifted: Vue
 * silently dropped middleware, never called hydrate, ignored dependsOn and
 * clearData, and inverted the default for validation. Every one of those was
 * invisible until someone used both.
 *
 * So the assertions live here, once, and each binding supplies a harness that
 * mounts a probe exposing the same handful of test ids. A binding that skips a
 * behaviour fails the same test its sibling passes.
 */

export interface Probe {
  /** Text content of an element by test id. */
  text: (testId: string) => string;
  click: (testId: string) => Promise<void>;
  fill: (testId: string, value: string) => Promise<void>;
  /** How many times the probe component has rendered. */
  renders: () => number;
  unmount: () => void;
}

export interface BindingHarness {
  name: string;
  mount: (setup: {
    flow: FlowDefinition;
    registry?: Record<string, (args: unknown, scope: { data: Record<string, unknown> }) => unknown>;
    data?: Record<string, unknown>;
    /** `@wizzard-packages/core/groups`, forwarded to `createWizard` untouched. */
    groups?: Traversal;
    /** Sub-flow definitions a string `GroupStep.flow` names. */
    subFlows?: SubFlows;
  }) => Promise<Probe>;
}

/**
 * Test ids a probe must render:
 *   step, progress, can-back, busy, errors, renders
 *   name-input (bound to the `name` field), next, back
 *
 * And, for the repeat group below - all of it read from the engine, never kept
 * beside it, because a binding that remembers which item it is on is the 0.x
 * bug this suite exists to prevent:
 *   item-key    the `key` of the deepest stack frame that carries one, or ''
 *   item-index  that key's position in `data.passengers`, or '' with no key
 *   item-name   `passengers[item-index].name`
 *   item-input  writes that same path
 *   add-item    appends `{ id: 'p<n+1>' }` to `data.passengers`
 *   remove-item drops `data.passengers[0]`
 */

const flow: FlowDefinition = {
  id: 'contract',
  order: ['one', 'two', 'three'],
  steps: {
    one: { label: 'One', validate: { $ref: 'needsName' } },
    two: { label: 'Two', when: { $eq: [{ $get: 'data.wantsTwo' }, true] } },
    three: { label: 'Three' },
  },
  policy: 'free',
};

const registry = {
  needsName: (_args: unknown, scope: { data: Record<string, unknown> }) =>
    scope.data.name ? null : { name: 'required' },
};

/** The same flow with a validator that takes its time, for the busy case. */
const slowFlow: FlowDefinition = {
  ...flow,
  steps: { ...flow.steps, one: { label: 'One', validate: { $ref: 'slow' } } },
};

const slowRegistry = {
  slow: async (_args: unknown, _scope: { data: Record<string, unknown> }) => {
    await new Promise((resolve) => setTimeout(resolve, 20));
    return null;
  },
};

/** One turn of the event loop, which both frameworks flush within. */
const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Polls instead of sleeping for a fixed span: a fixed wait is either flaky on a
 * loaded runner or slower than it needs to be on an idle one.
 */
const until = async (predicate: () => boolean, what: string): Promise<void> => {
  for (let i = 0; i < 100; i++) {
    if (predicate()) return;
    await settle();
  }
  throw new Error(`timed out waiting for ${what}`);
};

/**
 * R-C, small enough to assert on: a repeat group over passengers, a two-step
 * sub-flow for each, and a step after the group to leave it for.
 *
 * JSON, like every flow. The group names its sub-flow by string, so the
 * registry is what resolves it - the same pair a host passes `createWizard`.
 */
const passengerFlow: FlowDefinition = {
  id: 'passenger',
  order: ['seat', 'meal'],
  steps: { seat: { label: 'Seat' }, meal: { label: 'Meal' } },
  policy: 'free',
};

const tripFlow: FlowDefinition = {
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

const people = (...ids: string[]): Record<string, unknown> => ({
  passengers: ids.map((id) => ({ id })),
});

export function describeBindingContract(harness: BindingHarness): void {
  const mount = (data: Record<string, unknown> = { name: 'Ann' }): Promise<Probe> =>
    harness.mount({ flow, registry, data });

  describe(`binding contract: ${harness.name}`, () => {
    it('is on the first step as soon as it mounts', async () => {
      // No click. A binding starts the engine when it mounts, so the first
      // paint already has a current step; a wizard that renders nothing until
      // the user presses Next is the bug this case exists to catch.
      const probe = await mount();

      expect(probe.text('step')).toBe('one');
      probe.unmount();
    });

    it('skips a step whose condition is false', async () => {
      const probe = await mount({ name: 'Ann', wantsTwo: false });
      await probe.click('next');

      expect(probe.text('step')).toBe('three');
      probe.unmount();
    });

    it('includes a step once its condition becomes true, without a reload', async () => {
      const probe = await mount({ name: 'Ann', wantsTwo: true });
      await probe.click('next');

      expect(probe.text('step')).toBe('two');
      probe.unmount();
    });

    it('reports progress over the reachable steps only', async () => {
      const probe = await mount({ name: 'Ann', wantsTwo: false });
      expect(probe.text('progress')).toBe('0');

      await probe.click('next');
      expect(probe.text('progress')).toBe('50');
      probe.unmount();
    });

    it('goes back, and says so before you try', async () => {
      const probe = await mount({ name: 'Ann', wantsTwo: false });
      expect(probe.text('can-back')).toBe('no');

      await probe.click('next');
      expect(probe.text('can-back')).toBe('yes');

      await probe.click('back');
      expect(probe.text('step')).toBe('one');
      probe.unmount();
    });

    it('blocks a forward move on invalid data and surfaces the errors', async () => {
      const probe = await mount({});
      await probe.click('next');

      expect(probe.text('step')).toBe('one');
      expect(probe.text('errors')).toBe('name: required');
      probe.unmount();
    });

    it('clears the block once the field is filled', async () => {
      const probe = await mount({});
      await probe.click('next');
      await probe.fill('name-input', 'Ann');
      await probe.click('next');

      expect(probe.text('step')).toBe('three');
      probe.unmount();
    });

    it('reflects a field edit immediately', async () => {
      const probe = await mount({ name: 'Ann' });
      await probe.fill('name-input', 'Bo');

      expect(probe.text('name-value')).toBe('Bo');
      probe.unmount();
    });

    it('shows the wizard as busy while a slow step is validating', async () => {
      // The point of a status the engine keeps: a UI can draw it. Before the
      // lock carried a revision this read 'no' for the whole navigation, so a
      // spinner drawn from isBusy never appeared in either framework.
      const probe = await harness.mount({
        flow: slowFlow,
        registry: slowRegistry,
        data: { name: 'Ann' },
      });
      // Mounting starts the engine, and starting is itself a navigation; let it
      // land before asking whether the wizard is busy with the next one.
      await until(() => probe.text('busy') === 'no', 'the start navigation to land');

      const moving = probe.click('next');
      await settle();
      expect(probe.text('busy')).toBe('yes');

      await moving;
      await until(() => probe.text('busy') === 'no', 'the wizard to stop being busy');
      expect(probe.text('step')).toBe('three');
      probe.unmount();
    });

    it('never renders more often than the engine commits', async () => {
      // The 0.x store notified twice for one change and both bindings carried
      // guards to hide the second render. Neither should need one now.
      //
      // A navigation is two commits: it marks itself busy, then it lands, and
      // those are two different things to draw - the second render is the
      // spinner going away. How many renders that becomes is the framework's
      // business: React paints both, Vue coalesces them into one flush. The
      // contract is the ceiling, not the count. More than two would mean a
      // binding is notifying itself, which is the bug this case exists for.
      const probe = await mount({ name: 'Ann' });
      const before = probe.renders();

      await probe.click('next');

      const rendered = probe.renders() - before;
      expect(rendered).toBeGreaterThanOrEqual(1);
      expect(rendered).toBeLessThanOrEqual(2);
      probe.unmount();
    });

    it('does not re-render when a write changes nothing', async () => {
      const probe = await mount({ name: 'Ann' });
      const before = probe.renders();

      await probe.fill('name-input', 'Ann');

      expect(probe.renders()).toBe(before);
      probe.unmount();
    });
  });

  describe(`binding contract, repeat groups: ${harness.name}`, () => {
    const enter = (...ids: string[]): Promise<Probe> =>
      harness.mount({
        flow: tripFlow,
        data: people(...ids),
        groups,
        subFlows: { passenger: passengerFlow },
      });

    it('gains an item when one is added, and reaches it', async () => {
      // The list is data, so adding to it is a `set()` and nothing else. The
      // proof that the group saw it is where the second Next lands: with one
      // passenger it leaves the group for `review`.
      const probe = await enter('p1');
      expect(probe.text('item-key')).toBe('p1');
      expect(probe.text('item-index')).toBe('0');

      await probe.click('add-item');
      await probe.click('next');
      await probe.click('next');

      expect(probe.text('step')).toBe('seat');
      expect(probe.text('item-key')).toBe('p2');
      expect(probe.text('item-index')).toBe('1');
      probe.unmount();
    });

    it('stays on the current item when another one is removed', async () => {
      const probe = await enter('p1', 'p2', 'p3');
      await probe.click('next');
      await probe.click('next');
      expect(probe.text('item-key')).toBe('p2');
      expect(probe.text('item-index')).toBe('1');

      // p1 goes. The frame names the key, not the position, so the person does
      // not move - only the position they are at does.
      await probe.click('remove-item');

      expect(probe.text('step')).toBe('seat');
      expect(probe.text('item-key')).toBe('p2');
      expect(probe.text('item-index')).toBe('0');
      probe.unmount();
    });

    it('still has the second passenger’s answers after the third is reached', async () => {
      const probe = await enter('p1', 'p2', 'p3');
      await probe.click('next');
      await probe.click('next');
      await probe.fill('item-input', 'Bo');
      expect(probe.text('item-name')).toBe('Bo');

      await probe.click('next');
      await probe.click('next');
      expect(probe.text('item-key')).toBe('p3');

      await probe.click('back');

      expect(probe.text('item-key')).toBe('p2');
      expect(probe.text('item-name')).toBe('Bo');
      probe.unmount();
    });

    it('lands on a surviving item when the current one is removed mid-edit', async () => {
      const probe = await enter('p1', 'p2');
      await probe.fill('item-input', 'Ann');
      expect(probe.text('item-key')).toBe('p1');

      await probe.click('remove-item');
      await probe.click('next');

      // The dead frame is dropped with everything above it and the group is
      // re-entered at its first surviving item - never a crash, never a frame
      // naming a passenger that is gone.
      expect(probe.text('item-key')).toBe('p2');
      expect(probe.text('step')).toBe('seat');
      probe.unmount();
    });
  });
}
