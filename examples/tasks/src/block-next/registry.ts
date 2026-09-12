import type { AsyncRegistry, Scope } from '@wizzard-packages/core/v1';

/**
 * What the flow could not serialize. A validator is an ordinary function of the
 * data: it answers with the field messages it found, or `null` when the step is
 * fit to leave.
 *
 * Returning messages keyed by field is what lets the rendering put each one
 * beside the input it belongs to, rather than showing one sentence for the
 * whole form.
 */
type Fields = Record<string, string> | null;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registry: AsyncRegistry = {
  details: (_args, scope: Scope): Fields => {
    const { email } = (scope.data['details'] as { email?: string } | undefined) ?? {};
    if (typeof email !== 'string' || email.trim() === '') {
      return { email: 'Enter your email address.' };
    }
    if (!EMAIL.test(email)) return { email: 'That does not look like an email address.' };
    return null;
  },
};
