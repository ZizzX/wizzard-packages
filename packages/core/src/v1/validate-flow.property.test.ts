import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import type { FlowDefinition } from './flow';
import { validateFlow } from './validate-flow';

/**
 * Host JSON that looks like expressions: objects keyed by operators and by
 * `args`, at any depth and inside lists, naming resolvers the registry does
 * not hold and paths with no root - a JSON Schema's `$ref: '#/definitions/x'`
 * is one such value. Read as an expression, nearly every draw is a problem.
 */
const { host } = fc.letrec<{ host: unknown; object: Record<string, unknown> }>((tie) => ({
  host: fc.oneof(
    { depthSize: 'small' },
    fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.string({ maxLength: 6 })),
    fc.array(tie('host'), { maxLength: 3 }),
    tie('object')
  ),
  object: fc.dictionary(
    fc.oneof(fc.constantFrom('$ref', '$get', '$and', '$not', 'args'), fc.string({ maxLength: 4 })),
    tie('host'),
    { maxKeys: 4 }
  ),
}));

describe('validateFlow and host data', () => {
  it("reports nothing in a step's ui or a $ref's args, and what is evaluated as before", () => {
    fc.assert(
      fc.property(host, host, (ui, args) => {
        const step = { ui, load: { $ref: 'fetch', args }, when: { $not: { $ref: 'isVip', args } } };
        const flow = {
          id: 'f',
          steps: {
            a: { ...step, guards: { enter: { $ref: 'missing' }, exit: { $get: 'zz' } } },
            b: { flow: { id: 'leg', steps: { s: step } } },
          },
        } as unknown as FlowDefinition;
        const found = validateFlow(flow, { fetch: () => null, isVip: () => true });
        expect(found.map((p) => `${p.code} ${p.path}`).sort()).toEqual([
          'get-unknown-root steps.a.guards.exit',
          'resolver-not-registered steps.a.guards.enter',
        ]);
      })
    );
  });
});
