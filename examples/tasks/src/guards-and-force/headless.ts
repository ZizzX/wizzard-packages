import { createWizard } from '@wizzard-packages/core/v1';

import { signup } from './flow';

/**
 * Four attempts, because two of them look identical and are not.
 *
 * The policy and the guard both refuse with `blocked`, so the reason alone
 * cannot tell them apart. What tells them apart is what makes each one stop
 * refusing: `force` for the policy, and the data for the guard.
 */
const wizard = createWizard({ flow: signup });

const say = (label: string, result: { ok: boolean; reason?: string; by?: string }): void => {
  console.log(`${label}: ${result.ok ? 'ok' : `${result.reason} by ${result.by}`}`);
};

await wizard.start();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

// 1. The policy refuses: this flow's default is `visited`, and nobody has been
//    to `done`.
say('go', await wizard.go('done'));

// 2. `force` skips the policy. The guard is still there, and the plan is empty.
say('go force', await wizard.go('done', { force: true }));

wizard.set('plan.choice', 'pro');

// 3. The guard is satisfied now - and the policy still is not, because `done`
//    is still a step nobody has visited.
say('go after choosing', await wizard.go('done'));

// 4. Both answered: the policy by `force`, the guard by the data.
say('go force after choosing', await wizard.go('done', { force: true }));
console.log(`step: ${String(wizard.getSnapshot().current)}`);
