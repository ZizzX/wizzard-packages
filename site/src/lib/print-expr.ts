/**
 * Turning a stranger's JSON into something safe to put on the page.
 *
 * `formatExpr` is written for an `Expr`, and an `Expr` is a closed union that a
 * typed codebase cannot leave. A paste box can: `{"$and": 1}` reaches
 * `node[op].map` and throws, which on this page means the whole island — graph,
 * panel and the paste box the reader would fix it in — is replaced by nothing.
 *
 * Guarding the grammar here would mean writing a second copy of it, and the
 * copy would drift the first time `Expr` gained a member. Printing the raw JSON
 * instead is honest: the condition is shown as what it is, and the page stays.
 */
import { formatExpr } from '@wizzard-packages/devtools/headless';

import type { Expr } from '@wizzard-packages/core/v1';

const cut = (text: string, max: number): string =>
  text.length <= Math.max(max, 1) ? text : `${text.slice(0, Math.max(max - 1, 0))}…`;

/**
 * Anything, as text React will render.
 *
 * This is the end of a long line of the same bug. A pasted `label` that was an
 * object threw "Objects are not valid as a React child" and took the island
 * down; that was guarded, and then the same value arrived as a `to` inside
 * `on.next`, which `validateFlow` accepts because `in` stringifies its left
 * operand, and which `layoutGraph` turns into a placeholder node whose `id` is
 * that object. Guarding fields one at a time does not end, and neither does
 * proving the graph builds — building is not drawing.
 *
 * So the drawing coerces. Every value that came from the paste and reaches a
 * text node goes through here, and the class is closed at the one place all of
 * them pass rather than at each place one of them starts.
 */
export function asText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return '[unprintable]';
  }
}

export function printExpr(expr: unknown, max = 32): { short: string; full: string } {
  try {
    return formatExpr(expr as Expr, max);
  } catch {
    // The fallback needs its own net: `formatExpr` gives up on a deeply nested
    // condition with a stack overflow, and `JSON.stringify` is recursive to the
    // same depth, so the obvious fallback fails on exactly the input that
    // needed one.
    const raw = asText(expr);
    return { short: cut(raw, max), full: raw };
  }
}
