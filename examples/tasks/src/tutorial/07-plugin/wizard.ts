import { createWizard } from '@wizzard-packages/core';
import { groups } from '@wizzard-packages/core/groups';
import { persist, type RestoreOutcome, type SyncStorage } from '@wizzard-packages/plugins/persist';

import { guest, registration } from './flow';
import { registry } from './registry';
import { trail } from './trail';

export interface OpenOptions {
  /** `localStorage` when left out. */
  storage?: SyncStorage;
  /** Told once, at start, whether a saved session came back and why not. */
  onRestore?: (outcome: RestoreOutcome) => void;
  /** Told every step the wizard lands on. */
  onStep?: (step: string) => void;
}

/**
 * Where the engine is built. Every later step adds to this one call - a
 * registry, group traversal, plugins - so it lives in a file of its own.
 *
 * Walking a group is a separate entry point, so a flow without one does not
 * carry it; `subFlows` answers the name the group's `flow` gives.
 */
export const openWizard = ({ storage, onRestore, onStep }: OpenOptions = {}) =>
  createWizard({
    flow: registration,
    registry,
    groups,
    subFlows: { guest },
    // Writes the session on every change and reads it back at start. `version`
    // is the app's own: bump it when stored answers stop meaning what they did.
    plugins: [
      persist({
        key: 'registration',
        version: 1,
        ...(storage === undefined ? {} : { storage }),
        ...(onRestore === undefined ? {} : { onRestore }),
      }),
      ...(onStep === undefined ? [] : [trail(onStep)]),
    ],
  });
