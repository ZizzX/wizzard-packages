import type { AsyncRegistry, Scope } from '@wizzard-packages/core/v1';

/**
 * A validator answers with one message per field, keyed by the field's name, or
 * `null` when there is nothing to say. The keys are what let the rendering put
 * each message beside the input it belongs to.
 */
type Fields = Record<string, string> | null;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registry: AsyncRegistry = {
  details: (_args, scope: Scope): Fields => {
    const { email, card } =
      (scope.data['details'] as { email?: string; card?: string } | undefined) ?? {};

    const errors: Record<string, string> = {};
    if (typeof email !== 'string' || email.trim() === '') {
      errors['email'] = 'Enter your email address.';
    } else if (!EMAIL.test(email)) {
      errors['email'] = 'That does not look like an email address.';
    }

    const digits = typeof card === 'string' ? card.replace(/\s/g, '') : '';
    if (!/^\d{16}$/.test(digits)) errors['card'] = 'A card number is sixteen digits.';

    return Object.keys(errors).length === 0 ? null : errors;
  },
};
