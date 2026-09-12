import { empty, get, not } from '@wizzard-packages/core/expr';
import { defineFlow, step } from '@wizzard-packages/core/v1';

/**
 * Three steps and one guard, arranged so that the three things people expect to
 * be one switch can be told apart.
 *
 * The flow keeps the default `sequential` policy, so jumping from `plan` to
 * `done` skips a step and the policy refuses the move. `force` skips that
 * check - and then meets the guard on `done`, which is a different rule with no
 * switch of its own. Choosing a plan is what finally opens the step, because
 * the guard was never about the policy.
 */
export const signup = defineFlow({
  id: 'guards-and-force',
  order: ['plan', 'review', 'done'],
  steps: {
    plan: step<{ choice: string }>({ label: 'Choose a plan' }),

    review: step({ label: 'Review' }),

    done: step({
      label: 'Done',
      // A guard is an expression, evaluated against the state of the moment.
      // This one says the step cannot be entered until a plan exists.
      guards: { enter: not(empty(get('data.plan.choice'))) },
    }),
  },
});
