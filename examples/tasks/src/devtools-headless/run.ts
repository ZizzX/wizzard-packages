import { createWizard } from '@wizzard-packages/core';
import { devtools, recordSession } from '@wizzard-packages/devtools/headless';

import { trip } from '../hooks/flow';
import { registry } from '../hooks/registry';

// One `devtools()` object, given to the engine as a plugin and to the
// recording: the engine writes the attempts to it, and the recording reads
// them back. Two calls would make two objects, and the recording would read
// the one nothing writes to.
const dt = devtools();
const wizard = createWizard({ flow: trip, registry, plugins: [dt] });
const recording = recordSession(wizard, { plugin: dt });

await wizard.start();
// Refused by the validator: a refusal writes nothing, so only the plugin sees it.
await wizard.next();
wizard.set('details', { name: 'Lisbon' });
await wizard.next();

recording.stop();
const bundle = recording.bundle();
// In an application: `writeFileSync('bundle.json', JSON.stringify(bundle))`,
// or attach it to a bug report. The site's inspector opens the same file.
console.log(`frames: ${bundle.meta.frames}, outcomes: ${bundle.meta.outcomes}`);
for (const outcome of bundle.outcomes) {
  const { result } = outcome;
  console.log(
    `${outcome.intent.type} (${outcome.source}): ` +
      (result === undefined ? 'threw' : result.ok ? `reached ${String(result.to)}` : result.reason)
  );
}

// The application created the wizard, so it destroys it. That drops every
// listener, a recording's included: one still running records nothing after.
wizard.destroy();
