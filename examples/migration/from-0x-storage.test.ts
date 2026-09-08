import { describe, expect, it } from 'vitest';

import { createWizard, defineFlow, step } from '../../packages/core/src/v1/index';

import { readLegacyWizard, type ReadableStorage } from './from-0x-storage';

/** A `Storage` that holds what a 0.x wizard actually left behind. */
function storage(entries: Record<string, string>): ReadableStorage {
  const keys = Object.keys(entries);
  return {
    length: keys.length,
    key: (i) => keys[i] ?? null,
    getItem: (k) => entries[k] ?? null,
  };
}

const wrap = (data: unknown, timestamp: number): string => JSON.stringify({ timestamp, data });

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
    const legacy = readLegacyWizard(storage(legacyDump));

    expect(legacy).not.toBeNull();
    expect(legacy?.data).toEqual({
      name: { full: 'Ada Lovelace' },
      review: { agreed: true },
    });
    expect(legacy?.currentStepId).toBe('review');
    expect(legacy?.visited).toEqual(['name', 'review']);
  });

  it('carries the values into a v1 wizard, addressed by the same paths', async () => {
    const legacy = readLegacyWizard(storage(legacyDump));
    const wizard = createWizard({ flow: signup, data: legacy?.data });

    await wizard.start();
    if (legacy?.currentStepId) await wizard.go(legacy.currentStepId, { force: true });

    // The whole claim of the migration guide, in one assertion: a dot path that
    // addressed a value in 0.x addresses the same value in v1.
    expect(wizard.get('name.full')).toBe('Ada Lovelace');
    expect(wizard.getSnapshot().current).toBe('review');
  });

  it('returns null when there is nothing to carry, rather than an empty wizard', () => {
    expect(readLegacyWizard(storage({}))).toBeNull();
    expect(readLegacyWizard(storage({ other_thing: '{}' }))).toBeNull();
  });

  it('survives a key that is not JSON, which 0.x also ignored', () => {
    const legacy = readLegacyWizard(
      storage({ wizard_name: 'not json{', wizard_review: wrap({ a: 1 }, 5) })
    );

    expect(legacy?.data).toEqual({ a: 1 });
  });

  it('prefers a value stored without a timestamp over no value at all', () => {
    // An adapter without `getStepWithMeta` stored the bare object; 0.x read it
    // back as timestamp 0. It is still the only data there is.
    const legacy = readLegacyWizard(storage({ wizard_name: JSON.stringify({ name: 'bare' }) }));

    expect(legacy?.data).toEqual({ name: 'bare' });
  });
});
