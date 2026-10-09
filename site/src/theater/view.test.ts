/**
 * Inside the passenger group the snapshot speaks for the sub-flow, and the
 * theater's graph is of the trip. These pin what the graph reads at each place
 * the scenario takes the wizard, on a bare engine.
 */
import { createWizard, type Wizard } from '@wizzard-packages/core';
import { groups } from '@wizzard-packages/core/groups';
import { describe, expect, it } from 'vitest';

import { flowUpTo, initialData, lineOf, perform, scenario } from './script';
import { registry, subFlows, trip } from './trip.flow';
import { tripView } from './view';

async function playUntil(last: number): Promise<Wizard> {
  const wizard = createWizard({ flow: trip, groups, subFlows, registry, data: initialData() });
  await wizard.start();
  for (const { act } of scenario.slice(0, last + 1)) await perform(wizard, act);
  return wizard;
}

const refusal = scenario.findIndex((cue) => cue.light === lineOf("validate: ref('passport')"));
const intoGroup = scenario.findIndex((cue) => cue.light === lineOf('repeat: {'));

describe('the graph of the trip, read off a running wizard', () => {
  it('stands on Route with Company off the route before anyone ticks Business', async () => {
    const { active, view } = tripView(trip, (await playUntil(-1)).getState());
    expect(active).toEqual(['route', 'people', 'payment']);
    expect(view).toMatchObject({ standing: 'route', refused: false, ended: false });
  });

  it('stands on the group, not the step inside it, once a passenger is asked', async () => {
    const wizard = await playUntil(intoGroup);
    expect(wizard.getSnapshot().active).toEqual(['details']);
    const { active, view } = tripView(trip, wizard.getState());
    expect(active).toEqual(['route', 'people', 'company', 'payment']);
    expect(view.standing).toBe('people');
    expect(view.breadcrumbs.map((crumb) => crumb.status)).toEqual([
      'completed',
      'current',
      'upcoming',
      'upcoming',
    ]);
  });

  it('draws the group refused while the second passenger has no passport', async () => {
    const { view } = tripView(trip, (await playUntil(refusal)).getState());
    expect(view).toMatchObject({ standing: 'people', refused: true });
  });

  it('ends when the trip is booked', async () => {
    const { view } = tripView(trip, (await playUntil(scenario.length - 1)).getState());
    expect(view).toMatchObject({ standing: 'payment', ended: true });
  });

  it('reads a trip Act 1 has only half written', async () => {
    const wizard = await playUntil(-1);
    const { active, view } = tripView(flowUpTo(['route', 'people']), wizard.getState());
    expect(active).toEqual(['route', 'people']);
    expect(view.standing).toBe('route');
  });
});
