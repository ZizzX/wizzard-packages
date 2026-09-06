import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { isGroup, type FlowDefinition } from './flow';
import { groups, walk } from './groups';
import { createWizard, type Wizard } from './store';

import type { AsyncRegistry } from './expr';
import type { Frame, WizardState } from './state';

/**
 * Structural change during a pending navigation.
 *
 * The hazard is precise and it comes from `commit.ts`: `store.set` bumps `rev`
 * and not `nav`, so mutating the item list while a navigation is in flight does
 * not supersede it. Phase 4 then resolves against data that changed after phase
 * 2 read it, or — worse — phase 9 commits a stack that phase 4 computed before
 * a `set()` in phase 6 or 7 removed its item.
 *
 * So the window is picked at random rather than fixed: a deferred phase-2
 * `validate`, a deferred phase-6 `load`, or a deferred phase-7 enter guard. The
 * phase-2 one is the easy case, because phase 4 has not run yet; the other two
 * are what the phase-8 recheck exists for, and a suite that opens only one of
 * the three proves nothing about the other two.
 */

const ITEMS = ['a', 'b', 'c', 'd'] as const;

type Window = 'validate' | 'load' | 'enter';
type Mutation =
  | { type: 'remove'; at: number }
  | { type: 'add'; id: string }
  | { type: 'reorder'; at: number };

const arbItems: fc.Arbitrary<string[]> = fc
  .subarray([...ITEMS], { minLength: 1 })
  .map((ids) => [...ids]);

const arbWindow: fc.Arbitrary<Window> = fc.constantFrom<Window>('validate', 'load', 'enter');

const arbMutation: fc.Arbitrary<Mutation> = fc.oneof(
  fc.record({ type: fc.constant('remove' as const), at: fc.integer({ min: 0, max: 3 }) }),
  fc.record({ type: fc.constant('add' as const), id: fc.constantFrom('x', 'y', 'z') }),
  fc.record({ type: fc.constant('reorder' as const), at: fc.integer({ min: 0, max: 3 }) })
);

/** How many navigations the generated session makes. */
const arbSteps: fc.Arbitrary<number> = fc.integer({ min: 1, max: 8 });

const child: FlowDefinition = {
  id: 'child',
  order: ['one', 'two'],
  steps: {
    one: {
      validate: { $ref: 'validate' },
      load: { $ref: 'load' },
      guards: { enter: { $ref: 'enter' } },
    },
    two: {},
  },
};

const root: FlowDefinition = {
  id: 'root',
  order: ['start', 'each', 'done'],
  steps: {
    start: {},
    each: { flow: child, repeat: { over: { $get: 'data.items' }, keyBy: 'id' } },
    done: {},
  },
};

const listOf = (ids: readonly string[]): { id: string }[] => ids.map((id) => ({ id }));

const apply = (ids: readonly string[], m: Mutation): { id: string }[] => {
  if (m.type === 'add') return listOf([...ids, m.id]);
  if (m.type === 'remove')
    return listOf(ids.filter((_, i) => i !== m.at % Math.max(ids.length, 1)));
  const at = m.at % Math.max(ids.length, 1);
  const moved = [...ids];
  const [taken] = moved.splice(at, 1);
  return listOf(taken === undefined ? moved : [taken, ...moved]);
};

const keysOf = (stack: readonly Frame[]): readonly string[] =>
  stack.map((f) => f.key).filter((k): k is string => k !== undefined);

const currentIds = (state: WizardState): readonly string[] =>
  ((state.data.items ?? []) as { id?: unknown }[]).map((i) => String(i.id));

/**
 * A committed stack never stands on a group.
 *
 * Phase 9 writes what `step()` returned, and `step()` resolves past a group
 * before it lands - into it, or over it when there is nothing to enter - so the
 * frame a binding is asked to render is always an atom. A stack whose walk is
 * shorter than itself has a dead frame in it, which is 4.2's documented window
 * between a `set()` and the navigation that prunes it, not a group at the top.
 */
function standsOnAGroup(
  root: FlowDefinition,
  state: WizardState,
  subFlows?: Record<string, FlowDefinition>
): boolean {
  const levels = walk(root, state, undefined, subFlows);
  if (levels.length !== state.stack.length) return false;
  const top = levels[levels.length - 1];
  const frame = top?.frame;
  const step = top === undefined || frame === undefined ? undefined : top.flow.steps[frame.step];
  return step !== undefined && isGroup(step);
}

/**
 * A wizard whose three deferred resolvers all yield, and exactly one of which
 * writes the item list while it is yielded. The write goes through `set`, which
 * is the only way a host has of changing a list mid-navigation and the reason
 * this hazard exists at all.
 */
function harness(ids: readonly string[], when: Window, mutation: Mutation): Wizard {
  // A box rather than a forward `let`: the resolvers close over the engine they
  // are registered on, so the reference has to exist before `createWizard` runs.
  const built: { wizard?: Wizard } = {};
  let fired = 0;

  const window = async <T>(which: Window, answer: T): Promise<T> => {
    await Promise.resolve();
    const wizard = built.wizard;
    if (which === when && fired === 0 && wizard !== undefined) {
      fired++;
      wizard.set('items', apply(currentIds(wizard.getState()), mutation));
    }
    await Promise.resolve();
    return answer;
  };

  const registry: AsyncRegistry = {
    validate: () => window('validate', null),
    load: () => window('load', undefined),
    enter: () => window('enter', true),
  };

  built.wizard = createWizard({ flow: root, groups, registry, data: { items: listOf(ids) } });
  return built.wizard;
}

describe('a navigation with the item list changing under it', () => {
  it('commits no key the final item list does not have', async () => {
    await fc.assert(
      fc.asyncProperty(arbItems, arbWindow, arbMutation, arbSteps, async (ids, when, m, n) => {
        const wizard = harness(ids, when, m);
        await wizard.start();
        for (let i = 0; i < n; i++) {
          const result = await wizard.next();
          expect(standsOnAGroup(root, wizard.getState())).toBe(false);
          if (!result.ok) continue;
          const state = wizard.getState();
          const live = currentIds(state);
          for (const key of keysOf(state.stack)) expect(live).toContain(key);
        }
        return true;
      }),
      { numRuns: 120 }
    );
  });

  it('completes exactly once, and moves the stack in exactly one commit', async () => {
    await fc.assert(
      fc.asyncProperty(arbItems, arbWindow, arbMutation, async (ids, when, m) => {
        let stackWrites = 0;
        const wizard = harness(ids, when, m);
        // `subscribe` fires once per commit, which is the one funnel every write
        // goes through, so counting stack identity changes counts stack writes.
        let previous = wizard.getState();
        wizard.subscribe(() => {
          const now = wizard.getState();
          if (now.stack !== previous.stack) stackWrites++;
          previous = now;
        });

        await wizard.start();
        stackWrites = 0;
        previous = wizard.getState();

        const before = wizard.getState().rev;
        const result = await wizard.next();
        const after = wizard.getState().rev;

        expect(after).toBeGreaterThanOrEqual(before);
        // A navigation that lands writes the stack once. One that is superseded
        // or refused writes it not at all.
        expect(stackWrites).toBe(result.ok && result.to !== '@end' ? 1 : 0);
        return true;
      }),
      { numRuns: 120 }
    );
  });

  it('never throws and never commits a dead frame when the active item vanishes', async () => {
    await fc.assert(
      fc.asyncProperty(arbItems, arbWindow, arbSteps, async (ids, when, n) => {
        const wizard = harness(ids, when, { type: 'remove', at: 0 });
        await wizard.start();
        for (let i = 0; i < n; i++) {
          const result = await wizard.next();
          expect(typeof result.ok).toBe('boolean');
          expect(standsOnAGroup(root, wizard.getState())).toBe(false);
          if (!result.ok) {
            expect(['superseded', 'no-target', 'blocked', 'invalid', 'not-reachable']).toContain(
              result.reason
            );
            continue;
          }
          const state = wizard.getState();
          const live = currentIds(state);
          for (const key of keysOf(state.stack)) expect(live).toContain(key);
          // And the selector answers on whatever was committed.
          expect(typeof wizard.getSnapshot().progress).toBe('number');
        }
        return true;
      }),
      { numRuns: 120 }
    );
  });
});

describe('nesting', () => {
  /** A chain of `depth` distinct flows, each entering the next through a group. */
  const chainOf = (
    depth: number
  ): { root: FlowDefinition; subFlows: Record<string, FlowDefinition> } => {
    const subFlows: Record<string, FlowDefinition> = {};
    for (let i = depth - 1; i >= 0; i--) {
      subFlows[`f${i}`] = {
        id: `f${i}`,
        order: ['s', 'down'],
        steps: {
          s: {},
          ...(i < depth - 1 && {
            down: { flow: `f${i + 1}`, repeat: { over: { $get: 'data.items' }, keyBy: 'id' } },
          }),
        },
      };
    }
    return { root: subFlows.f0 as FlowDefinition, subFlows };
  };

  it('never exceeds a depth of 32', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 40 }),
        fc.integer({ min: 1, max: 3 }),
        async (depth, items) => {
          const { root: flow, subFlows } = chainOf(depth);
          const wizard = createWizard({
            flow,
            groups,
            subFlows,
            data: { items: listOf(ITEMS.slice(0, items)) },
          });
          await wizard.start();
          for (let i = 0; i < 40; i++) {
            await wizard.next();
            expect(wizard.getState().stack.length).toBeLessThanOrEqual(32);
            expect(standsOnAGroup(flow, wizard.getState(), subFlows)).toBe(false);
          }
          return true;
        }
      ),
      { numRuns: 40 }
    );
  });
});

describe('duplicate keys', () => {
  it('refuses every move into or inside the group, and leaves the selectors working', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...ITEMS),
        fc.integer({ min: 1, max: 4 }),
        async (dup, extra) => {
          const items = listOf([dup, ...ITEMS.slice(0, extra), dup]);
          const wizard = createWizard({
            flow: root,
            groups,
            registry: {
              validate: () => null,
              load: () => undefined,
              enter: () => true,
            },
            data: { items },
          });

          await wizard.start();
          expect(wizard.getSnapshot().current).toBe('start');

          for (const move of [
            (): Promise<unknown> => wizard.next(),
            (): Promise<unknown> => wizard.go('each', { force: true }),
          ]) {
            const result = (await move()) as {
              ok: boolean;
              reason?: string;
              by?: string;
              errors?: Record<string, string>;
            };
            expect(result.ok).toBe(false);
            expect(result.reason).toBe('invalid');
            expect(result.by).toBe('each');
            expect(result.errors?.id).toContain('repeat keys collide');
            // Nothing moved, and the screen still has something to draw.
            expect(wizard.getState().stack).toHaveLength(1);
            expect(wizard.getSnapshot().breadcrumbs.length).toBeGreaterThan(0);
          }
          return true;
        }
      ),
      { numRuns: 60 }
    );
  });
});
