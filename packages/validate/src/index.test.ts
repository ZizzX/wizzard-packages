import { describe, expect, it } from 'vitest';
import * as yup from 'yup';
import { z } from 'zod';

import { issuesToErrors, schema } from './index';
import type { StandardSchemaV1 } from './standard';

const scope = (data: Record<string, unknown>, ctx: Record<string, unknown> = {}) => ({ data, ctx });

/** A schema with no vendor behind it, so path and ordering cases stay deterministic. */
const fake = (issues: readonly { message: string; path?: PropertyKey[] }[]): StandardSchemaV1 => ({
  '~standard': {
    version: 1,
    vendor: 'test',
    validate: () => (issues.length > 0 ? { issues } : { value: null }),
  },
});

describe('one adapter, every vendor', () => {
  const cases = [
    ['zod', z.object({ name: z.string().min(1), age: z.number().min(18) })],
    ['yup', yup.object({ name: yup.string().required(), age: yup.number().min(18) })],
  ] as const;

  for (const [vendor, s] of cases) {
    it(`${vendor}: reports one message per failing field`, async () => {
      const errors = await schema(s as StandardSchemaV1)(undefined, scope({ age: 5 }));

      expect(Object.keys(errors as object).sort()).toEqual(['age', 'name']);
    });

    it(`${vendor}: returns null when the data is good`, async () => {
      const errors = await schema(s as StandardSchemaV1)(
        undefined,
        scope({ name: 'Ann', age: 30 })
      );

      expect(errors).toBeNull();
    });
  }
});

describe('paths', () => {
  it('joins nested segments with dots, the way the engine keys fields', async () => {
    const s = z.object({ trip: z.object({ from: z.string() }) });
    const errors = await schema(s as StandardSchemaV1)(undefined, scope({ trip: {} }));

    expect(errors).toEqual({ 'trip.from': expect.any(String) });
  });

  it('reads array indices as segments', () => {
    expect(issuesToErrors([{ message: 'required', path: ['guests', 1, 'name'] }])).toEqual({
      'guests.1.name': 'required',
    });
  });

  it('accepts the object form of a path segment', () => {
    expect(issuesToErrors([{ message: 'bad', path: [{ key: 'a' }, { key: 0 }] }])).toEqual({
      'a.0': 'bad',
    });
  });

  it('keys a whole-value error under the empty string', () => {
    expect(issuesToErrors([{ message: 'dates overlap' }])).toEqual({ '': 'dates overlap' });
  });

  it('keeps the first message for a path, not the last', () => {
    expect(
      issuesToErrors([
        { message: 'required', path: ['name'] },
        { message: 'too short', path: ['name'] },
      ])
    ).toEqual({ name: 'required' });
  });
});

describe('at', () => {
  it('defaults to the whole data object', async () => {
    const errors = await schema(fake([{ message: 'nope', path: ['x'] }]))(undefined, scope({}));

    expect(errors).toEqual({ x: 'nope' });
  });

  it('addresses a slice with the same vocabulary the flow uses', async () => {
    let seen: unknown;
    const spy: StandardSchemaV1 = {
      '~standard': {
        version: 1,
        vendor: 'test',
        validate: (value) => {
          seen = value;
          return { value };
        },
      },
    };

    await schema(spy, { at: 'data.trip' })(undefined, scope({ trip: { from: 'Riga' } }));
    expect(seen).toEqual({ from: 'Riga' });

    await schema(spy, { at: 'ctx.user' })(undefined, scope({}, { user: { id: 7 } }));
    expect(seen).toEqual({ id: 7 });
  });

  it('hands the schema undefined rather than throwing when the path is missing', async () => {
    const errors = await schema(fake([{ message: 'absent' }]), { at: 'data.nope.deeper' })(
      undefined,
      scope({})
    );

    expect(errors).toEqual({ '': 'absent' });
  });
});

describe('empty issue lists', () => {
  it('treats a zero-issue result as valid', async () => {
    expect(await schema(fake([]))(undefined, scope({}))).toBeNull();
  });
});
