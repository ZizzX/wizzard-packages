import type { Hooks } from '@wizzard-packages/core';

/**
 * Refuses to leave the sign-in step until someone is signed in. `to` is `null`
 * for `next()` - its target is not resolved yet when plugins run - so the rule
 * reads `from`.
 */
export const requireSignIn = (signedIn: () => boolean): Hooks => ({
  name: 'auth',
  beforeNavigate: ({ from }) => (from === 'account' && !signedIn() ? { block: 'auth' } : undefined),
});
