import { createWizard } from '@wizzard-packages/core';
import { groups } from '@wizzard-packages/core/groups';

import { guest, registration } from './flow';
import { registry } from './registry';

/**
 * Where the engine is built. Every later step adds to this one call - a
 * registry, group traversal, plugins - so it lives in a file of its own.
 *
 * Walking a group is a separate entry point, so a flow without one does not
 * carry it; `subFlows` answers the name the group's `flow` gives.
 */
export const openWizard = () =>
  createWizard({ flow: registration, registry, groups, subFlows: { guest } });
