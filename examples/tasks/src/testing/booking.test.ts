import { createWizard, type Wizard } from '@wizzard-packages/core';
import { validateFlow } from '@wizzard-packages/core/validate-flow';
import { afterEach, describe, expect, it } from 'vitest';

import { booking, withGroups } from './flow';
import { registry } from './registry';

// One wizard per test, built the way the application builds it, and destroyed
// after: a plugin's teardown runs there, and no test inherits another's state.
let wizard: Wizard;
afterEach(() => {
  wizard.destroy();
});

describe('booking', () => {
  it('will not leave an incomplete step', async () => {
    wizard = createWizard({ flow: booking, registry });
    // What a binding does on mount. Without it the stack is empty, and the
    // first `next()` would enter the flow rather than leave a step.
    await wizard.start();

    // A refusal is a value: compared, not caught.
    expect(await wizard.next()).toMatchObject({ ok: false, reason: 'invalid', by: 'trip' });
    expect(wizard.getSnapshot().current).toBe('trip');

    wizard.set('trip.name', 'Lisbon');
    expect(await wizard.next()).toMatchObject({ ok: true, to: 'payment' });
  });

  it('rejects a move that needs a resolver the registry does not hold', async () => {
    // A mistake in the wiring throws. This one is found while moving, so the
    // promise `next()` returns rejects.
    wizard = createWizard({ flow: booking, registry: {} });
    await wizard.start();
    await expect(wizard.next()).rejects.toMatchObject({ code: 'resolver-not-registered' });
  });

  it('refuses to build a flow with a group and no traversal', () => {
    // Found before there is a wizard at all, so the assertion wraps the construction.
    expect(() => createWizard({ flow: withGroups })).toThrowError(/groups-not-installed/);
    wizard = createWizard({ flow: booking, registry });
  });

  it('is a valid flow', () => {
    // The definition checked without walking it: every `$ref` resolves, every
    // transition names a step that exists.
    expect(validateFlow(booking, registry)).toEqual([]);
    wizard = createWizard({ flow: booking, registry });
  });
});
