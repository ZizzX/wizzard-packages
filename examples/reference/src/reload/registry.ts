import type { AsyncRegistry, Scope } from '@wizzard-packages/core/v1';

/**
 * The validators. One is a plain function of the data; the other has to ask
 * somebody, so it is a promise.
 *
 * A resolver is not handed an abort signal, so `cancel()` does not stop the
 * lookup that is already in the air - it makes the answer irrelevant. The
 * navigation epoch moved on, so whatever comes back is discarded rather than
 * written over a wizard that has since gone somewhere else. That is the
 * property a reload in the middle of a check depends on.
 */
type Fields = Record<string, string> | null;

const slice = (scope: Scope, id: string): Record<string, unknown> =>
  (scope.data[id] as Record<string, unknown> | undefined) ?? {};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The names the imaginary service already has. */
export const TAKEN = ['acme', 'demo', 'test'];

/** How long the lookup pretends to take. */
export const LOOKUP_MS = 700;

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const registry: AsyncRegistry = {
  account: (_args, scope): Fields => {
    const { email } = slice(scope, 'account');
    if (typeof email !== 'string' || email === '') return { email: 'Enter your email address.' };
    if (!EMAIL.test(email)) return { email: 'That does not look like an email address.' };
    return null;
  },

  workspace: async (_args, scope): Promise<Fields> => {
    const { name } = slice(scope, 'workspace');
    const wanted = typeof name === 'string' ? name.trim() : '';
    // The shape is checked before anything is asked: there is no point paying
    // for a round trip to be told what a regular expression already knew.
    if (wanted === '') return { name: 'Choose a name for your workspace.' };
    if (!/^[a-z0-9-]{3,}$/.test(wanted)) {
      return { name: 'Lower case letters, digits and dashes, three or more.' };
    }

    await wait(LOOKUP_MS);

    if (TAKEN.includes(wanted)) return { name: `"${wanted}" is taken. Try another one.` };
    return null;
  },
};
