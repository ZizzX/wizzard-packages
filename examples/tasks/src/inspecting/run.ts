import { createSelector, createWizard, type WizardState } from '@wizzard-packages/core';
import { buildGraph } from '@wizzard-packages/core/graph';
import { groups } from '@wizzard-packages/core/groups';
import { checkSession, type RecordedSession } from '@wizzard-packages/core/session';

// The conference registration the Tutorial builds: a group of guests, run
// once per guest by the `guest` sub-flow, and a step that loads.
import { guest, registration } from '../tutorial/07-plugin/flow';
import { registry } from '../tutorial/07-plugin/registry';

// The graph. `subFlows` lets the group be expanded into the sub-flow it runs.
const { nodes, edges } = buildGraph(registration, { guest });
const box = nodes.find((n) => n.kind === 'group');
console.log(`graph: ${nodes.length} nodes, ${edges.length} edges`);
console.log(
  `group ${box?.id} runs ${box?.group?.flowId}: ${box?.group?.graph?.nodes.length} nodes inside`
);
console.log(
  `without subFlows: ${buildGraph(registration).nodes.find((n) => n.kind === 'group')?.group?.opaque}`
);

// A session to inspect: every state a running wizard settles in. `devtools`
// records the same thing with `recordSession`; here `subscribe` is enough.
const wizard = createWizard({ flow: registration, registry, groups, subFlows: { guest } });
const frames: WizardState[] = [];
wizard.subscribe(() => {
  frames.push(wizard.getState());
});
await wizard.start();
wizard.set('attendee', { name: 'Ada', email: 'ada@example.com' });
await wizard.next();

// The derived values, from a state and no wizard: what a replay draws.
const select = createSelector(() => registration, registry);
const state = wizard.getState();
const { current, progress, canBack } = select(state);
console.log(`replayed: on ${current}, ${progress}% done, can go back: ${canBack}`);
console.log(`same object between commits: ${select(state) === select(state)}`);

// The session checked against the definition it was taken from, and against
// one that has changed since.
const session: RecordedSession = {
  flow: registration.id,
  version: registration.version,
  frames,
};
console.log(
  `session against its flow: ${checkSession(session, registration, { guest }).length} problems`
);
const changed = { ...registration, version: 2 };
const [problem] = checkSession(session, changed, { guest });
console.log(`session against version 2: ${problem?.code}`);

wizard.destroy();
