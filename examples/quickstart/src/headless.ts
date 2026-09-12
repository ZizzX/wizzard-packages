import { createWizard } from '@wizzard-packages/core/v1';

import { signup } from './flow';

/**
 * The same flow with no framework at all: the engine is a plain object, and
 * this file drives it the way a component would.
 *
 * Nothing here is a test helper. `start` enters the first step, `set` writes a
 * value at a path, `next` and `back` move, and `get` reads - the same four
 * calls the React and Vue bindings make on your behalf.
 */
const wizard = createWizard({ flow: signup });

await wizard.start();
console.log(`step: ${String(wizard.getSnapshot().current)}`);

wizard.set('name.full', 'Ada');
await wizard.next();
console.log(`step: ${String(wizard.getSnapshot().current)}`);
console.log(`name: ${String(wizard.get('name.full'))}`);

// The point of the whole example: going back does not discard what was typed.
await wizard.back();
console.log(`step: ${String(wizard.getSnapshot().current)}`);
console.log(`name after Back: ${String(wizard.get('name.full'))}`);
