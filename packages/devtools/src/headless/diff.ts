import type { WizardState } from '@wizzard-packages/core/v1';

/**
 * What one commit changed, as rows a person can read: `data` and `ctx` by
 * path, recursively through plain objects and arrays by index; every other
 * field of the state by value. `rev` and `nav` are left out because they move
 * on every commit and say nothing.
 *
 * Paths use the `getPath` syntax (`data.items[2].name`), so a row can be pasted
 * into `wizard.get()`.
 */
export interface Change {
  path: string;
  before: unknown;
  after: unknown;
  /**
   * Set only on the closing row, when the row cap stopped the list early: how
   * many changed paths are not shown. The renderer offers to lift the cap once.
   */
  hidden?: number;
}

/** Values the walk descends into. Anything else - a Date, a class instance - is a leaf. */
const isPlain = (v: unknown): v is Record<string, unknown> => {
  if (typeof v !== 'object' || v === null) return false;
  const proto: unknown = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};

/** The walk stops descending past this many visits and reports the subtree as one row. */
const WALK_CAP = 10_000;
const DEPTH_CAP = 32;

const BY_VALUE = [
  'status',
  'stack',
  'history',
  'errors',
  'visited',
  'completed',
  'dirty',
  'busy',
] as const;

export function diffState(previous: WizardState, next: WizardState, cap = 200): Change[] {
  const changes: Change[] = [];
  let total = 0;
  let visits = 0;

  const emit = (path: string, before: unknown, after: unknown): void => {
    total += 1;
    if (changes.length < cap) changes.push({ path, before, after });
  };

  const walk = (path: string, a: unknown, b: unknown, depth: number): void => {
    if (a === b) return;
    visits += 1;
    if (visits <= WALK_CAP && depth < DEPTH_CAP) {
      if (Array.isArray(a) && Array.isArray(b)) {
        const n = Math.max(a.length, b.length);
        for (let i = 0; i < n; i++) walk(`${path}[${i}]`, a[i], b[i], depth + 1);
        return;
      }
      if (isPlain(a) && isPlain(b)) {
        for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
          walk(`${path}.${key}`, a[key], b[key], depth + 1);
        }
        return;
      }
    }
    emit(path, a, b);
  };

  walk('data', previous.data, next.data, 0);
  walk('ctx', previous.ctx, next.ctx, 0);
  for (const key of BY_VALUE) {
    const a = previous[key];
    const b = next[key];
    if (a !== b && JSON.stringify(a) !== JSON.stringify(b)) emit(key, a, b);
  }

  if (total > changes.length) {
    changes.push({
      path: '…',
      before: undefined,
      after: undefined,
      hidden: total - changes.length,
    });
  }
  return changes;
}
