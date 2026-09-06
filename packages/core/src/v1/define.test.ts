import { describe, expect, expectTypeOf, it } from 'vitest';

import { defineFlow, group, step, type DataOf, type StepIdOf } from './define';
import { END, type FlowDefinition } from './flow';
import { createWizard, type Wizard } from './store';

const signup = defineFlow({
  id: 'signup',
  order: ['name', 'plan', 'review'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name' }),
    plan: step<{ tier: 'free' | 'pro' }>(),
    review: step(),
    extras: group<{ items: string[] }>({ flow: { id: 'extras', steps: {} } }),
  },
});

/**
 * Forty steps, the size at which a definition inferred from its own shape
 * makes tsserver stall. The slice types ride on a phantom instead, so this
 * file has to type-check as fast as a three-step one — `pnpm type-check` is
 * the gate.
 */
const forty = defineFlow({
  id: 'forty',
  order: [
    's01',
    's02',
    's03',
    's04',
    's05',
    's06',
    's07',
    's08',
    's09',
    's10',
    's11',
    's12',
    's13',
    's14',
    's15',
    's16',
    's17',
    's18',
    's19',
    's20',
    's21',
    's22',
    's23',
    's24',
    's25',
    's26',
    's27',
    's28',
    's29',
    's30',
    's31',
    's32',
    's33',
    's34',
    's35',
    's36',
    's37',
    's38',
    's39',
    's40',
  ],
  steps: {
    s01: step<{ v1: number }>(),
    s02: step<{ v2: number }>(),
    s03: step<{ v3: number }>(),
    s04: step<{ v4: number }>(),
    s05: step<{ v5: number }>(),
    s06: step<{ v6: number }>(),
    s07: step<{ v7: number }>(),
    s08: step<{ v8: number }>(),
    s09: step<{ v9: number }>(),
    s10: step<{ v10: number }>(),
    s11: step<{ v11: number }>(),
    s12: step<{ v12: number }>(),
    s13: step<{ v13: number }>(),
    s14: step<{ v14: number }>(),
    s15: step<{ v15: number }>(),
    s16: step<{ v16: number }>(),
    s17: step<{ v17: number }>(),
    s18: step<{ v18: number }>(),
    s19: step<{ v19: number }>(),
    s20: step<{ v20: number }>(),
    s21: step<{ v21: number }>(),
    s22: step<{ v22: number }>(),
    s23: step<{ v23: number }>(),
    s24: step<{ v24: number }>(),
    s25: step<{ v25: number }>(),
    s26: step<{ v26: number }>(),
    s27: step<{ v27: number }>(),
    s28: step<{ v28: number }>(),
    s29: step<{ v29: number }>(),
    s30: step<{ v30: number }>(),
    s31: step<{ v31: number }>(),
    s32: step<{ v32: number }>(),
    s33: step<{ v33: number }>(),
    s34: step<{ v34: number }>(),
    s35: step<{ v35: number }>(),
    s36: step<{ v36: number }>(),
    s37: step<{ v37: number }>(),
    s38: step<{ v38: number }>(),
    s39: step<{ v39: number }>(),
    s40: step<{ v40: number }>(),
  },
});

describe('typed wizard', () => {
  it('threads the flow through createWizard', async () => {
    const wizard = createWizard({ flow: signup });

    expectTypeOf<StepIdOf<typeof signup>>().toEqualTypeOf<'name' | 'plan' | 'review' | 'extras'>();
    expectTypeOf<DataOf<typeof signup>['plan']>().toEqualTypeOf<{ tier: 'free' | 'pro' }>();
    expectTypeOf<DataOf<typeof signup>['extras']>().toEqualTypeOf<{ items: string[] }>();
    expectTypeOf(wizard.get('name')).toEqualTypeOf<{ full: string }>();
    expectTypeOf(wizard.get('review')).toEqualTypeOf<unknown>();
    expectTypeOf(wizard.get('name.full')).toEqualTypeOf<unknown>();
    expectTypeOf(wizard.go)
      .parameter(0)
      .toEqualTypeOf<'name' | 'plan' | 'review' | 'extras' | typeof END>();

    // @ts-expect-error not a step of this flow
    void wizard.go('nope');
    // @ts-expect-error not the shape `plan` declared
    wizard.set('plan', { tier: 'gold' });
    // @ts-expect-error not a step of this flow
    await wizard.validate('nope');

    wizard.set('name', { full: 'Ada' });
    wizard.set('name.full', 'Grace');
    expect(wizard.get('name')).toEqual({ full: 'Grace' });
    expect(await wizard.go(END)).toMatchObject({ ok: true, to: END });
  });

  it('is still the untyped Wizard a binding stores', () => {
    const typed = createWizard({ flow: signup });
    const untyped: Wizard = typed;
    expect(untyped.get('name')).toBeUndefined();
    expectTypeOf(untyped.get('name')).toEqualTypeOf<unknown>();
    expectTypeOf(untyped.go).parameter(0).toEqualTypeOf<string>();
  });

  it('accepts a flow that arrived as JSON, with every string a step id', () => {
    const wizard = createWizard({ flow: JSON.parse(JSON.stringify(signup)) as FlowDefinition });
    expectTypeOf(wizard.go).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(wizard.get('anything')).toEqualTypeOf<unknown>();
  });

  it('stays at inference depth one on a forty-step flow', () => {
    const wizard = createWizard({ flow: forty });
    expectTypeOf(wizard.get('s40')).toEqualTypeOf<{ v40: number }>();
    wizard.set('s01', { v1: 1 });
    expect(wizard.get('s01')).toEqual({ v1: 1 });
  });
});
