import type { AsyncRegistry, Scope } from '@wizzard-packages/core/v1';

/**
 * What the flow could not serialize. Each `$ref` in `flow.ts` is a key here,
 * and a validator answers with the field errors it found or `null`.
 *
 * They are ordinary functions of the data: no component, no engine, nothing to
 * mock. That is what makes the same four testable without a browser.
 */
type Fields = Record<string, string> | null;

const slice = (scope: Scope, id: string): Record<string, unknown> =>
  (scope.data[id] as Record<string, unknown> | undefined) ?? {};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registry: AsyncRegistry = {
  details: (_args, scope): Fields => {
    const { email, payer } = slice(scope, 'details');
    const errors: Record<string, string> = {};
    if (typeof email !== 'string' || email === '') errors['email'] = 'Enter your email address.';
    else if (!EMAIL.test(email)) errors['email'] = 'That does not look like an email address.';
    if (payer !== 'personal' && payer !== 'business') errors['payer'] = 'Choose who is paying.';
    return Object.keys(errors).length === 0 ? null : errors;
  },

  verify: (_args, scope): Fields => {
    const { code } = slice(scope, 'verify');
    // Six digits, and in a real application a call to the service that sent
    // them. The example keeps it local so the page works offline.
    if (typeof code !== 'string' || !/^\d{6}$/.test(code)) {
      return { code: 'The code is six digits.' };
    }
    return null;
  },

  company: (_args, scope): Fields => {
    const { name, vat } = slice(scope, 'company');
    const errors: Record<string, string> = {};
    if (typeof name !== 'string' || name.trim() === '') errors['name'] = 'Enter the company name.';
    if (typeof vat !== 'string' || vat.trim() === '') errors['vat'] = 'Enter the VAT number.';
    return Object.keys(errors).length === 0 ? null : errors;
  },

  payment: (_args, scope): Fields => {
    const { card } = slice(scope, 'payment');
    const digits = typeof card === 'string' ? card.replace(/\s/g, '') : '';
    if (!/^\d{16}$/.test(digits)) return { card: 'A card number is sixteen digits.' };
    return null;
  },
};
