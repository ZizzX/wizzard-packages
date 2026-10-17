import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { decodeSnapshot, toSnapshot } from './snapshot';
import { initialState, type WizardState, type WizardStatus } from './state';

import type { FlowDefinition } from './flow';

const flow: FlowDefinition = {
  id: 'signup',
  order: ['name', 'plan', 'review'],
  steps: { name: {}, plan: {}, review: {} },
};

const statuses: readonly WizardStatus[] = ['init', 'idle', 'busy', 'done'];
const stepId = fc.constantFrom('name', 'plan', 'review');
const frame = stepId.map((step) => ({ flow: 'signup', step }));
// Lower-case keys and JSON scalars only: a key such as `prototype` is refused
// on purpose (snapshot/unstorable), and that refusal is tested elsewhere. Integers,
// not doubles, so -0 cannot make a round trip look lossy.
const plain = fc.dictionary(
  fc.stringMatching(/^[a-z]{1,4}$/),
  fc.oneof(fc.string(), fc.integer(), fc.boolean(), fc.constant(null)),
  { maxKeys: 4 }
);

const state: fc.Arbitrary<WizardState> = fc
  .record({
    status: fc.constantFrom(...statuses),
    stack: fc.array(frame, { maxLength: 1 }),
    history: fc.array(fc.array(frame, { minLength: 1, maxLength: 1 }), { maxLength: 3 }),
    data: plain,
    completed: fc.uniqueArray(stepId, { maxLength: 3 }),
    nav: fc.nat({ max: 50 }),
  })
  .map(({ data, ...rest }) => ({ ...initialState(data, {}), ...rest }));

describe('the finished mark', () => {
  it('is written for a finished wizard and for no other status', () => {
    fc.assert(
      fc.property(state, (s) => {
        const snapshot = toSnapshot(s, flow);
        expect('done' in snapshot).toBe(s.status === 'done');
        if (s.status === 'done') expect(snapshot.done).toBe(true);
      })
    );
  });

  it('survives JSON and restores done for a finished wizard, idle for every other', () => {
    fc.assert(
      fc.property(state, (s) => {
        const stored = JSON.parse(JSON.stringify(toSnapshot(s, flow))) as unknown;
        const result = decodeSnapshot(flow, stored);
        expect(result).toMatchObject({ restored: true });
        if (!result.restored) return;
        expect(result.state.status).toBe(s.status === 'done' ? 'done' : 'idle');
      })
    );
  });
});
