import { strict as assert } from 'node:assert';

import { createWizard, defineFlow, step, type AsyncRegistry } from '@wizzard-packages/core/v1';
import { devtools, recordSession } from '@wizzard-packages/devtools/headless';

/**
 * `/headless` installed without React.
 *
 * `exports` alone does not split install requirements, so this fixture is the
 * proof: it depends on `core` and `devtools` and on nothing that renders, it
 * imports only the headless entry, and it records the same bundle the panel's
 * Record button produces. If the entry ever reaches back into React, or the
 * React peers stop being optional, this stops compiling or stops running.
 */

const signup = defineFlow({
  id: 'signup',
  order: ['name', 'review'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name', validate: { $ref: 'nameFilled' } }),
    review: step({ label: 'Review' }),
  },
});

const registry: AsyncRegistry = {
  nameFilled: (_args, scope) => {
    const full = (scope.data as { name?: { full?: string } }).name?.full;
    return full?.trim() ? null : { full: 'Your name is required' };
  },
};

const plugin = devtools();
const wizard = createWizard({ flow: signup, registry, plugins: [plugin] });

await wizard.start();

const recorder = recordSession(wizard, { plugin });

const refused = await wizard.next();
assert.equal(refused.ok, false);

wizard.set('name.full', 'Ada');
const advanced = await wizard.next();
assert.equal(advanced.ok, true);

const bundle = recorder.bundle();
recorder.stop();

assert.equal(bundle.version, 1);
assert.equal(bundle.flow.id, 'signup');
assert.ok(bundle.session.frames.length > 0, 'the bundle carries the states it recorded');
assert.equal(bundle.meta.outcomes, 2);
assert.ok(
  bundle.outcomes.some((outcome) => outcome.result?.ok === false),
  'the refusal is in the bundle, which is the reason the plugin exists'
);

wizard.destroy();

console.log(
  `headless bundle: ${bundle.meta.frames} frames, ${bundle.meta.outcomes} outcomes, ${bundle.meta.bytes} bytes`
);
