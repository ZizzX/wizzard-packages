/**
 * The trip flow is the file the homepage types and the engine runs, so it has
 * to be one the library itself has nothing to say about: the homepage cannot
 * show a definition `validateFlow` would warn a reader away from.
 */
import { createWizard } from '@wizzard-packages/core';
import { groups } from '@wizzard-packages/core/groups';
import { validateFlow } from '@wizzard-packages/core/validate-flow';
import { describe, expect, it } from 'vitest';

import { registry, subFlows, trip } from './trip.flow';

describe('the trip flow', () => {
  it('is one validateFlow has nothing to say about', () => {
    expect(validateFlow(trip, registry)).toEqual([]);
    for (const flow of Object.values(subFlows)) {
      expect(validateFlow(flow, registry)).toEqual([]);
    }
  });

  // After taking over, a visitor can set the travellers to none. The group must
  // leave the route then, not stay on it as an empty section.
  it('leaves the passenger group off the route when nobody travels', async () => {
    const wizard = createWizard({
      flow: trip,
      groups,
      subFlows,
      registry,
      data: { passengers: [] },
    });
    await wizard.start();
    expect(wizard.getSnapshot().active).toEqual(['route', 'payment']);
  });
});
