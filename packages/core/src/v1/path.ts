/**
 * Dot-path access over plain objects.
 *
 * Deliberately not the 0.x helper, which memoizes every path string it is ever
 * handed. That is a fine trade for a fixed set of form fields and a leak for a
 * repeat group, where `passengers.0.name`, `passengers.1.name` and so on are
 * generated without bound. Splitting a short string is cheap; remembering every
 * string forever is not.
 */

const parse = (path: string): string[] =>
  path.includes('[')
    ? path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)
    : path.split('.').filter(Boolean);

export function getPath(source: unknown, path: string): unknown {
  if (!path) return source;
  let cur = source;
  for (const key of parse(path)) {
    if (cur === null || cur === undefined) return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

/**
 * Immutable set. Returns the same reference when the value has not changed, so
 * a no-op write does not invalidate every memoized selector downstream.
 */
export function setPath<T extends object>(target: T, path: string, value: unknown): T {
  const keys = parse(path);
  if (keys.length === 0) return value as T;
  if (getPath(target, path) === value) return target;

  const clone = (node: unknown): Record<string, unknown> | unknown[] => {
    if (Array.isArray(node)) return [...node];
    if (node !== null && typeof node === 'object') return { ...(node as Record<string, unknown>) };
    return {};
  };

  const root = clone(target);
  let cur: Record<string, unknown> | unknown[] = root;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i] as string;
    const next = clone((cur as Record<string, unknown>)[key]);
    (cur as Record<string, unknown>)[key] = next;
    cur = next;
  }

  (cur as Record<string, unknown>)[keys[keys.length - 1] as string] = value;
  return root as T;
}
