import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { getPath, setPath, unsetPath } from './path';

const key = fc.stringMatching(/^[a-z]{1,4}$/);
const index = fc.nat({ max: 3 });
/** Dot paths mixing object keys and array indices, as a repeat group generates them. */
const path = fc
  .array(fc.oneof(key, index.map(String)), { minLength: 1, maxLength: 4 })
  .map((parts) => parts.join('.'));
const plain = fc
  .jsonValue({ maxDepth: 3 })
  .map((v) =>
    v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {}
  );

describe('unsetPath', () => {
  it('removes exactly what setPath put there, and nothing else', () => {
    fc.assert(
      fc.property(plain, path, fc.string(), (source, p, value) => {
        fc.pre(getPath(source, p) === undefined);
        const withValue = setPath(source, p, value);
        expect(getPath(withValue, p)).toBe(value);
        expect(getPath(unsetPath(withValue, p), p)).toBeUndefined();
      })
    );
  });

  it('keeps an array an array when the last segment is an index', () => {
    fc.assert(
      fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 5 }), index, (items, i) => {
        const out = unsetPath({ list: items }, `list[${i}]`);
        expect(Array.isArray(out.list)).toBe(true);
        expect(out.list).toEqual(items.filter((_, at) => at !== i));
      })
    );
  });

  it('returns the same reference when there is nothing at the path', () => {
    fc.assert(
      fc.property(plain, path, (source, p) => {
        fc.pre(getPath(source, p) === undefined);
        expect(unsetPath(source, p)).toBe(source);
      })
    );
  });
});
