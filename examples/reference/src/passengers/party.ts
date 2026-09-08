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

/**
 * A fresh id, unused by anyone in the list and by anyone who has answered.
 *
 * The second half is what makes it correct. A key is a data path, and removing
 * the last passenger frees `p3` in the list while `answers.p3` is still sitting
 * there - so an id chosen from the list alone would hand the next passenger
 * somebody else's seat. The host clears the answers on removal too, and this
 * looks at both, because either alone is one refactor away from the same bug.
 */
export const nextId = (
  list: readonly Passenger[],
  answers: Readonly<Record<string, unknown>> = {}
): string => {
  let n = list.length + 1;
  while (list.some((p) => p.id === `p${n}`) || `p${n}` in answers) n += 1;
  return `p${n}`;
};

/** Everyone's answers, keyed by passenger. */
export const answersOf = (
  data: Readonly<Record<string, unknown>>
): Readonly<Record<string, { seat?: string; meal?: string }>> =>
  (data['answers'] as Record<string, { seat?: string; meal?: string }> | undefined) ?? {};

/** The same, without one passenger. Removing a person removes their answers. */
export const withoutAnswers = (
  data: Readonly<Record<string, unknown>>,
  id: string
): Record<string, { seat?: string; meal?: string }> => {
  const rest = { ...answersOf(data) };
  delete rest[id];
  return rest;
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
