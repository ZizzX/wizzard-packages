import type { AsyncRegistry, Scope } from '@wizzard-packages/core/v1';

/**
 * A flow as it arrives from a backend: text, not a module.
 *
 * This is the whole server-driven contract in 1.0.0. The definition is JSON,
 * so it can be stored in a column, sent over a wire and diffed in a review;
 * everything it cannot carry - a validator, a predicate, a loader - is named
 * here and answered by a registry the client already has.
 */
export const FROM_SERVER = `{
  "id": "signup",
  "version": 1,
  "order": ["account", "billing", "done"],
  "steps": {
    "account": { "label": "Account", "validate": { "$ref": "account" } },
    "billing": {
      "label": "Billing",
      "when": { "$eq": [{ "$get": "data.account.plan" }, "team"] }
    },
    "done": { "label": "Done" }
  }
}`;

/**
 * The half that never travels. A `$ref` names a function the client holds, so
 * a definition from a server can ask for a check without being able to supply
 * the code that runs it - which is the property that makes accepting one
 * safe at all.
 */
export const registry: AsyncRegistry = {
  account: (_args, scope: Scope): Record<string, string> | null => {
    const { email } = (scope.data['account'] as { email?: string } | undefined) ?? {};
    return typeof email === 'string' && email.includes('@')
      ? null
      : { email: 'Enter your email address.' };
  },
};

/**
 * A later message from the same backend: one step replaced, one added. Steps
 * are merged by id, so a patch names only what changes.
 */
export const PATCH_FROM_SERVER = `{
  "order": ["account", "billing", "invoice", "done"],
  "steps": {
    "invoice": { "label": "Invoice details" }
  }
}`;
