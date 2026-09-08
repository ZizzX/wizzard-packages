/**
 * Where a flow goes when the data has just taken its current step off the
 * route. The engine does not move itself: it is the host that decides whether
 * an excluded step means walking on or refusing the edit, and both the hero and
 * the inspector decide the same way because they call this.
 */
import { describe, expect, it } from 'vitest';

import { rerouteTo } from './signup-form';

describe('rerouteTo', () => {
  it('stays put while the flow stands on a step the route still contains', () => {
    expect(rerouteTo('details', ['details', 'company', 'payment'])).toBeNull();
  });

  it('walks forward when a when has excluded the step underneath the flow', () => {
    expect(rerouteTo('company', ['details', 'payment'])).toBe('payment');
  });

  it('falls back to the end of the route when nothing follows', () => {
    expect(rerouteTo('payment', ['details'])).toBe('details');
  });

  it('has nothing to say before the engine has started', () => {
    expect(rerouteTo(null, ['details'])).toBeNull();
  });
});
