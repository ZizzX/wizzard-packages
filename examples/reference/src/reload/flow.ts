import { defineFlow, step } from '@wizzard-packages/core/v1';

/**
 * R-B: an application that survives a reload, and an asynchronous check that a
 * reload in the middle of must not corrupt.
 *
 * Three steps, because what this one has to demonstrate is not a route: it is
 * what is stored, what is refused, and what a person is told when the form they
 * half filled in comes back empty.
 */
export const reload = defineFlow({
  id: 'reload',
  version: 1,
  order: ['account', 'workspace', 'confirm'],
  steps: {
    account: step<{ email: string }>({
      label: 'Account',
      validate: { $ref: 'account' },
    }),

    workspace: step<{ name: string }>({
      label: 'Workspace',
      // The check is a lookup, so it is asynchronous, so `next()` is a promise
      // and the wizard is `busy` until it answers. That is what the buttons
      // above read, and what a reload has to be safe in the middle of.
      validate: { $ref: 'workspace' },
    }),

    confirm: step({ label: 'Confirm' }),
  },
  policy: 'free',
});

/**
 * The last step. A finished run is one that has this in `completed`, which is
 * the only durable way to know: `toSnapshot` does not carry `status`, so a
 * wizard that reached the end and was reloaded comes back `idle`. Keeping the
 * fact in the rendering instead would lose it on exactly the reload this
 * application exists to survive.
 */
export const LAST_STEP = 'confirm';

/** Where the session is kept. One key per flow. */
export const STORAGE_KEY = 'wizzard:example:reload';

/**
 * The application's own version, not the flow's. It is bumped when the meaning
 * of what was collected changes, and a session written under a different one is
 * refused rather than half-understood.
 */
export const APP_VERSION = 1;
