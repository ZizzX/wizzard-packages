import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';

import { WizardError } from './diagnostic';
import { evaluate, evaluateAsync, type Expr, type Scope } from './expr';
import { createWizard } from './store';
import { assertFlow } from './validate-flow';

import type { FlowDefinition } from './flow';

/**
 * The diagnostic contract, one test per code: every failure the engine throws
 * is a `WizardError` that says which code, from which operation, what to change,
 * and where that is explained - and the page it points at exists.
 */

const ROOT = join(__dirname, '..', '..', '..', '..');
const SITE = 'https://zizzx.github.io/wizzard-packages/errors/';
const scope: Scope = { data: {}, ctx: {} };

const thrown = (run: () => unknown): WizardError => {
  try {
    run();
  } catch (error) {
    if (error instanceof WizardError) return error;
    throw error;
  }
  throw new Error('expected a WizardError, and nothing was thrown');
};

const rejected = async (run: () => Promise<unknown>): Promise<WizardError> => {
  try {
    await run();
  } catch (error) {
    if (error instanceof WizardError) return error;
    throw error;
  }
  throw new Error('expected a WizardError, and nothing was thrown');
};

/** What every code keeps, whichever site threw it. */
const keepsTheContract = (error: WizardError, code: string, op: string): void => {
  expect(error.code).toBe(code);
  expect(error.op).toBe(op);
  expect(error.url).toBe(SITE + code);
  expect(error.fix).not.toBe('');
  expect(error.name).toBe('WizardError');
  expect(error.message.startsWith('[wizzard] ')).toBe(true);
  expect(error.message).toContain(` ${error.fix}. `);
  expect(error.message.endsWith(` ${error.url}`)).toBe(true);
  const page = join(ROOT, 'site', 'src', 'content', 'docs', 'errors', `${code}.md`);
  expect(existsSync(page), `${code} has no page`).toBe(true);
};

const group: FlowDefinition = {
  id: 'trip',
  order: ['each'],
  steps: { each: { flow: { id: 'passenger', order: ['name'], steps: { name: {} } } } },
};

describe('resolver-not-registered', () => {
  it('is thrown by evaluate, naming the missing resolver in the fix', () => {
    const error = thrown(() => evaluate({ $ref: 'isVip' }, scope, {}));
    keepsTheContract(error, 'resolver-not-registered', 'evaluate');
    expect(error.fix).toContain('isVip');
  });

  it('is thrown by evaluateAsync', async () => {
    const error = await rejected(() => evaluateAsync({ $ref: 'isVip' }, scope, {}));
    keepsTheContract(error, 'resolver-not-registered', 'evaluateAsync');
  });

  it('is thrown out of a navigation whose validator names a missing resolver', async () => {
    const flow: FlowDefinition = {
      id: 'signup',
      order: ['account', 'done'],
      steps: { account: { validate: { $ref: 'checkEmail' } }, done: {} },
    };
    const wizard = createWizard({ flow, registry: {} });
    await wizard.start();
    const error = await rejected(() => wizard.next());
    keepsTheContract(error, 'resolver-not-registered', 'validate');
    expect(error.path).toBe('steps.account');
  });

  it('never carries the name it was given in its url', () => {
    const error = thrown(() => evaluate({ $ref: 'https://example.com/?q=secret' }, scope, {}));
    expect(error.url).toBe(`${SITE}resolver-not-registered`);
  });
});

describe('resolver-is-async', () => {
  it('is thrown when synchronous evaluation meets a promise', () => {
    const error = thrown(() => evaluate({ $ref: 'lookup' }, scope, { lookup: async () => true }));
    keepsTheContract(error, 'resolver-is-async', 'evaluate');
    expect(error.fix).toContain('lookup');
  });
});

describe('expr-unknown-operator', () => {
  const bad = { $between: [1, 3] } as unknown as Expr;

  it('is thrown by evaluate', () => {
    const error = thrown(() => evaluate(bad, scope));
    keepsTheContract(error, 'expr-unknown-operator', 'evaluate');
    expect(error.message).toContain('$between');
  });

  // `evaluateAsync` hands an expression with no `$ref` to `evaluate`, so only one
  // that holds a `$ref` reaches the asynchronous evaluator's own refusal.
  it('is thrown by evaluateAsync, for an expression that holds a $ref', async () => {
    const awaited = { $between: [{ $ref: 'seats' }, 3] } as unknown as Expr;
    const error = await rejected(() => evaluateAsync(awaited, scope, { seats: async () => 2 }));
    keepsTheContract(error, 'expr-unknown-operator', 'evaluateAsync');
  });

  it('is reported by evaluate when evaluateAsync delegates a synchronous expression', async () => {
    const error = await rejected(() => evaluateAsync(bad, scope));
    keepsTheContract(error, 'expr-unknown-operator', 'evaluate');
  });
});

describe('groups-not-installed', () => {
  it('is thrown by createWizard, at the group step', () => {
    const error = thrown(() => createWizard({ flow: group }));
    keepsTheContract(error, 'groups-not-installed', 'createWizard');
    expect(error.path).toBe('steps.each');
  });

  it('is thrown by patchFlow', () => {
    const wizard = createWizard({ flow: { id: 'flat', order: ['a'], steps: { a: {} } } });
    const error = thrown(() => wizard.patchFlow({ steps: group.steps }));
    keepsTheContract(error, 'groups-not-installed', 'patchFlow');
  });
});

describe('flow-invalid', () => {
  it('is thrown by assertFlow, with every problem in the message', () => {
    const error = thrown(() => assertFlow({ id: 'broken', order: ['a', 'b'], steps: { a: {} } }));
    keepsTheContract(error, 'flow-invalid', 'assertFlow');
    expect(error.message).toContain('order');
  });
});

/**
 * Each built entry inlines its own copy of the class, so an error from
 * `/validate-flow` is caught by the `WizardError` imported from `/v1`. A fresh
 * module graph gives the second copy the build does.
 */
describe('instanceof across copies of the class', () => {
  it('holds for an error thrown by another copy', async () => {
    vi.resetModules();
    const other = await import('./validate-flow');
    const error = (() => {
      try {
        other.assertFlow({ id: 'broken', order: ['a'], steps: {} });
      } catch (caught) {
        return caught;
      }
    })();
    const copy = (await import('./diagnostic')).WizardError;
    expect(copy).not.toBe(WizardError);
    expect(error).toBeInstanceOf(WizardError);
    expect(error).toBeInstanceOf(copy);
  });

  it('does not hold for an ordinary error', () => {
    expect(new Error('[wizzard] x')).not.toBeInstanceOf(WizardError);
    expect({ name: 'WizardError', code: 'flow-invalid' }).not.toBeInstanceOf(WizardError);
  });
});

/**
 * The format lint. A throw that bypasses the class is a message with no code,
 * no fix and no page, so the source of the engine and both bindings may not
 * contain one. Re-throwing a caught value is not a new failure and is allowed.
 */
describe('every throw in v1', () => {
  const sources = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return sources(path);
      return /\.tsx?$/.test(entry.name) && !entry.name.includes('.test.') ? [path] : [];
    });

  it('goes through WizardError', () => {
    const dirs = ['core', 'react', 'vue'].map((pkg) => join(ROOT, 'packages', pkg, 'src', 'v1'));
    const bare = dirs
      .flatMap(sources)
      .flatMap((file) =>
        Array.from(
          readFileSync(file, 'utf8').matchAll(/throw new (?!WizardError\()\w+\(/g),
          (m) => `${file}: ${m[0]}`
        )
      );
    expect(bare).toEqual([]);
  });
});
