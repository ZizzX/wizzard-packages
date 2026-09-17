import fc from 'fast-check';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';

import { WizardError } from './diagnostic';
import { evaluate, evaluateAsync, type Expr, type Scope } from './expr';
import { createWizard } from './store';
import { assertFlow, validateFlow } from './validate-flow';

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

describe('expr-invalid-operand', () => {
  // The shapes the expressions guide writes, stated here on their own so the
  // evaluators and validateFlow are held to the guide rather than to each other.
  const OPERATORS = [
    '$get',
    '$ref',
    '$not',
    '$and',
    '$or',
    '$eq',
    '$ne',
    '$gt',
    '$gte',
    '$lt',
    '$lte',
    '$in',
    '$empty',
  ];
  const takes = (op: string, v: unknown): boolean =>
    op === '$get' || op === '$ref'
      ? typeof v === 'string'
      : op === '$and' || op === '$or'
        ? Array.isArray(v)
        : op === '$not' || op === '$empty' || (Array.isArray(v) && v.length === 2);

  // An operand is a literal, a resolver call, or a list of those. A `$ref`
  // resolves asynchronously, so a list holding one sends `evaluateAsync` down
  // its asynchronous branches.
  const item = fc.oneof(
    fc.constantFrom(null, true, 'data.x', ''),
    fc.integer(),
    fc.constant({ $ref: 'r' })
  );
  const operand = fc.oneof(item, fc.array(item, { maxLength: 4 }), fc.constant(undefined));
  const registry = { r: async () => 1 };

  const code = (run: () => unknown): string | undefined => {
    try {
      run();
    } catch (error) {
      return (error as WizardError).code;
    }
    return undefined;
  };
  const codeAsync = async (run: () => Promise<unknown>): Promise<string | undefined> => {
    try {
      await run();
    } catch (error) {
      return (error as WizardError).code;
    }
    return undefined;
  };

  it('is thrown by both evaluators and reported by validateFlow for exactly the same operands', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...OPERATORS), operand, async (op, v) => {
        const e = { [op]: v } as unknown as Expr;
        const invalid = !takes(op, v);
        expect(code(() => evaluate(e, scope, registry as never)) === 'expr-invalid-operand').toBe(
          invalid
        );
        expect(
          (await codeAsync(() => evaluateAsync(e, scope, registry))) === 'expr-invalid-operand'
        ).toBe(invalid);
        const reported = validateFlow({ id: 'f', steps: { a: { when: e } } })
          .filter((p) => p.code === 'expr-invalid-operand')
          .map((p) => p.path);
        expect(reported).toEqual(invalid ? [`steps.a.when.${op}`] : []);
      })
    );
  });

  // Each operator with the one operand shape it cannot read.
  const bad: [Expr, string][] = [
    [{ $and: null }, '$and takes a list, not null'],
    [{ $or: 'abc' }, '$or takes a list, not a string'],
    [{ $eq: null }, '$eq takes a list of two operands, not null'],
    [{ $in: [1] }, '$in takes a list of two operands, not a list of 1'],
    [{ $get: 123 }, '$get takes a string, not a number'],
    [{ $ref: {} }, '$ref takes a string, not an object'],
  ] as unknown as [Expr, string][];

  it('is thrown by evaluate for each operator, instead of a TypeError', () => {
    for (const [e, what] of bad) {
      const error = thrown(() => evaluate(e, scope, {}));
      keepsTheContract(error, 'expr-invalid-operand', 'evaluate');
      expect(error.message).toContain(`[wizzard] ${what}. `);
    }
  });

  it('is thrown by evaluateAsync where it does not delegate', async () => {
    const pairs = [{ $eq: [{ $ref: 'r' }] }, { $in: [{ $ref: 'r' }, 1, 2] }];
    for (const e of [{ $and: null }, { $or: 1 }, { $ref: 5 }, ...pairs] as unknown as Expr[]) {
      keepsTheContract(
        await rejected(() => evaluateAsync(e, scope, {})),
        'expr-invalid-operand',
        'evaluateAsync'
      );
    }
  });

  it('is reported by evaluate when evaluateAsync delegates', async () => {
    const e = { $eq: 'ab' } as unknown as Expr;
    keepsTheContract(
      await rejected(() => evaluateAsync(e, scope)),
      'expr-invalid-operand',
      'evaluate'
    );
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

describe('expr-too-deep', () => {
  let deep: Expr = true;
  for (let i = 0; i < 1000; i++) deep = { $not: deep };

  it('is thrown by evaluate', () => {
    keepsTheContract(
      thrown(() => evaluate(deep, scope)),
      'expr-too-deep',
      'evaluate'
    );
  });

  it('is thrown by evaluateAsync', async () => {
    const error = await rejected(() => evaluateAsync(deep, scope));
    keepsTheContract(error, 'expr-too-deep', 'evaluateAsync');
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
