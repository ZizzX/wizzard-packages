/**
 * The one shape every failure the engine throws takes. A host catches one
 * class and reads the same five fields whichever part of the library threw:
 * the stable `code`, the public operation that failed, where in the flow, what
 * to change, and the page that explains it.
 *
 * The message is assembled here rather than at each site so it cannot drift
 * from the template in `AGENTS.md`: what went wrong, why, the fix, the page.
 */

const DOCS = 'https://zizzx.github.io/wizzard-packages/errors/';

/** What went wrong, why, and the fix - the three sentences before the page. */
export type Explained = readonly [what: string, why: string, fix: string];

/**
 * The one message template, for a failure that is thrown and for a problem
 * that is returned alike: `[wizzard] <what>. <why>. <fix>. <page>`.
 */
export const explain = (code: string, [what, why, fix]: Explained): string =>
  `[wizzard] ${what}. ${why}. ${fix}. ${DOCS}${code}`;

/** The page for a code, built from the code alone. */
export const pageFor = (code: string): string => DOCS + code;

export class WizardError extends Error {
  /** Kebab-case, stable across releases, and the slug of the page that explains it. */
  readonly code: string;
  /** The public operation that failed: `evaluate`, `createWizard`, `useWizard`. */
  readonly op: string;
  /** Where in the flow, when there is a where: `steps.billing`. */
  readonly path: string | undefined;
  /** What to change. Also the third sentence of `message`. */
  readonly fix: string;
  /** Built from the code alone, so it never carries anything the host passed in. */
  readonly url: string;

  /**
   * Every core entry is bundled on its own, so `/v1`, `/groups` and
   * `/validate-flow` each carry a copy of this class, and so does a second
   * install of the package. Identity is the shape, not the constructor, so
   * `instanceof` holds across all of them.
   */
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      value instanceof Error &&
      value.name === 'WizardError' &&
      typeof (value as WizardError).code === 'string'
    );
  }

  constructor(code: string, op: string, what: string, why: string, fix: string, path?: string) {
    // Not `explain`: spelled out here, this is a few bytes smaller in every
    // runtime entry, which carries the class and never the helper.
    const url = DOCS + code;
    super(`[wizzard] ${what}. ${why}. ${fix}. ${url}`);
    this.name = 'WizardError';
    this.code = code;
    this.op = op;
    this.path = path;
    this.fix = fix;
    this.url = url;
  }
}

/**
 * A `$ref` the registry does not hold. Three sites throw it - both evaluators
 * and the store's `validate`/`load` lookup - and one wording keeps them one
 * failure with one page rather than three.
 */
export const notRegistered = (ref: string, op: string, path?: string): WizardError =>
  new WizardError('resolver-not-registered', op, ...notRegisteredText(ref), path);

/** The sentences of `resolver-not-registered`, shared with what `validateFlow` returns. */
export const notRegisteredText = (ref: string): Explained => [
  `no resolver is registered as "${ref}"`,
  'The flow names it in a $ref, and the registry it is evaluated against has no entry by that name',
  `Add ${ref} to the registry, or correct the name in the flow`,
];

/** The sentences of `expr-unknown-operator`, shared by both evaluators and `validateFlow`. */
// `{}` has no first key, and "undefined" would name nothing the author wrote.
export const unknownOperatorText = (first: string | undefined, key = first ?? '{}'): Explained => [
  `"${key}" is not an operator`,
  'An expression object names its operation with a key, and none of its keys is an operator',
  `Replace ${key} with an operator from the expressions guide, or check it for a typo`,
];
