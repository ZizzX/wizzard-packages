/**
 * The one shape every failure the engine throws takes. A host catches one
 * class and reads the same five fields whichever part of the library threw:
 * the stable `code`, the public operation that failed, where in the flow, what
 * to change, and the page that explains it.
 *
 * The message is assembled here rather than at each site so it cannot drift
 * from the template in `AGENTS.md`: what went wrong, why, the fix, the page.
 */

/** The site's error pages. A code appended to it is the page for that code. */
export const DOCS = 'https://zizzx.github.io/wizzard-packages/errors/';

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
  new WizardError(
    'resolver-not-registered',
    op,
    `no resolver is registered as "${ref}"`,
    'The flow names it in a $ref, and the registry it is evaluated against has no entry by that name',
    `Add ${ref} to the registry, or correct the name in the flow`,
    path
  );
