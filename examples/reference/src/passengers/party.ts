import type { Frame, Wizard } from '@wizzard-packages/core/v1';

/** One row of `data.passengers`. `id` is what `keyBy` reads. */
export interface Passenger {
  id: string;
  name: string;
}

export const listOf = (data: Readonly<Record<string, unknown>>): readonly Passenger[] =>
  (data['passengers'] as Passenger[] | undefined) ?? [];

/**
 * The key of the repeat frame the wizard is standing in, or null outside one.
 *
 * The stack is the enclosing frames with the current step last, and only a
 * repeat frame carries a key - which is how a rendering knows whose answers it
 * is showing without counting anything itself.
 */
export const keyOf = (stack: readonly Frame[]): string | null =>
  stack.find((frame) => frame.key !== undefined)?.key ?? null;

/** A fresh id. Short, because it ends up in a data path a person may read. */
export const nextId = (list: readonly Passenger[]): string => {
  let n = list.length + 1;
  while (list.some((p) => p.id === `p${n}`)) n += 1;
  return `p${n}`;
};

/**
 * Walks into the group until the frame names `key`.
 *
 * **A finding, not a pattern.** `go` addresses a step, never an item: entering
 * a repeat group always lands on the first one, because `enter` takes
 * `items.keys[0]` and there is no way to say which. So revisiting the second
 * passenger after finishing the third means entering and advancing until the
 * frame's key matches, which is fine here - every step it passes was already
 * answered - and would not be fine in a flow with validators between.
 *
 * What the engine is missing is a target that can name an item, and this
 * application is the argument for it. Filed in `TODOS.md`.
 */
export async function goToPassenger(wizard: Wizard, key: string): Promise<boolean> {
  const entered = await wizard.go('people');
  if (!entered.ok) return false;

  // Two steps per passenger, plus the one the entry already used.
  const hops = listOf(wizard.getState().data).length * 2 + 1;
  for (let hop = 0; hop < hops; hop++) {
    if (keyOf(wizard.getState().stack) === key) return true;
    const moved = await wizard.next();
    if (!moved.ok || moved.to === '@end') return false;
  }
  return false;
}
