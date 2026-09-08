import { describe, expect, it } from 'vitest';

import { createWizard, defineFlow, step } from '../../packages/core/src/v1/index';

import { readLegacyWizard, type ReadableStorage } from './from-0x-storage';

/** A `Storage` that holds what a 0.x wizard actually left behind. */
const storage = (entries: Record<string, string>): ReadableStorage => ({
  getItem: (k) => entries[k] ?? null,
});

const wrap = (data: unknown, timestamp: number): string => JSON.stringify({ timestamp, data });

/** The step ids of the 0.x config, in its order — what `hydrate()` walked. */
const STEPS = ['name', 'review'];

/**
 * What 0.x wrote for a two-step wizard the user had filled in and walked into
 * the second step: one key per step, each a full copy of the data, and a meta
 * key with the position.
 */
const legacyDump = {
  wizard_name: wrap({ name: { full: 'Ada Lovelace' } }, 1_000),
  wizard_review: wrap({ name: { full: 'Ada Lovelace' }, review: { agreed: true } }, 2_000),
  wizard___wizzard_meta__: wrap(
    {
      currentStepId: 'review',
      visited: ['name', 'review'],
      completed: ['name'],
      history: ['name'],
    },
    2_000
  ),
};

const signup = defineFlow({
  id: 'signup',
  order: ['name', 'review'],
  steps: {
    name: step<{ full: string }>({ label: 'Your name' }),
    review: step<{ agreed: boolean }>({ label: 'Review' }),
  },
});

describe('reading a 0.x wizard out of storage', () => {
  it('takes the newest data across the step keys, the way 0.x hydrate did', () => {
    const legacy = readLegacyWizard(storage(legacyDump), STEPS);

    expect(legacy).not.toBeNull();
    expect(legacy?.data).toEqual({
      name: { full: 'Ada Lovelace' },
      review: { agreed: true },
    });
    expect(legacy?.currentStepId).toBe('review');
  });

  it('carries the values into a v1 wizard, addressed by the same paths', async () => {
    const legacy = readLegacyWizard(storage(legacyDump), STEPS);
    const wizard = createWizard({ flow: signup, data: legacy?.data });

    await wizard.start();
    if (legacy?.currentStepId) {
      const moved = await wizard.go(legacy.currentStepId, { force: true });
      // The restore can be refused — a guard on the step the user was standing
      // on is re-evaluated here. Failing loudly beats landing them on step one
      // with their answers apparently intact.
      expect(moved.ok).toBe(true);
    }

    // The whole claim of the migration guide, in one assertion: a dot path that
    // addressed a value in 0.x addresses the same value in v1.
    expect(wizard.get('name.full')).toBe('Ada Lovelace');
    expect(wizard.getSnapshot().current).toBe('review');
  });

  it('breaks a timestamp tie towards the later step, as 0.x did', () => {
    // 0.x compared with `>=` while walking the config in order, so on a tie the
    // step further down the config won. Two writes inside one millisecond is
    // not a hypothetical on a fast machine.
    const tie = {
      wizard_name: wrap({ who: 'first' }, 5_000),
      wizard_review: wrap({ who: 'second' }, 5_000),
    };

    expect(readLegacyWizard(storage(tie), ['name', 'review'])?.data).toEqual({ who: 'second' });
    // The same two keys, read against a config in the other order, answer the
    // other way. Which is why the ids are a parameter and not a prefix scan.
    expect(readLegacyWizard(storage(tie), ['review', 'name'])?.data).toEqual({ who: 'first' });
  });

  it('ignores a key left behind by a step the config no longer has', () => {
    // A step removed from the config in a later 0.x release leaves its key in
    // localStorage forever. `hydrate()` never read it, however fresh it was,
    // and a migration that does would restore data the application had dropped.
    const withOrphan = {
      wizard_name: wrap({ who: 'live' }, 1_000),
      wizard_deleted_step: wrap({ who: 'orphan' }, 9_999),
    };

    expect(readLegacyWizard(storage(withOrphan), ['name'])?.data).toEqual({ who: 'live' });
  });

  it('returns null when there is nothing to carry, rather than an empty wizard', () => {
    expect(readLegacyWizard(storage({}), STEPS)).toBeNull();
    expect(readLegacyWizard(storage({ other_thing: '{}' }), STEPS)).toBeNull();
  });

  it('survives a key that is not JSON, which 0.x also ignored', () => {
    const legacy = readLegacyWizard(
      storage({ wizard_name: 'not json{', wizard_review: wrap({ a: 1 }, 5) }),
      STEPS
    );

    expect(legacy?.data).toEqual({ a: 1 });
  });

  it('prefers a value stored without a timestamp over no value at all', () => {
    // An adapter without `getStepWithMeta` stored the bare object; 0.x read it
    // back as timestamp 0. It is still the only data there is.
    const legacy = readLegacyWizard(
      storage({ wizard_name: JSON.stringify({ name: 'bare' }) }),
      STEPS
    );

    expect(legacy?.data).toEqual({ name: 'bare' });
  });
});
