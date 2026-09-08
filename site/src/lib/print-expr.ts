/**
 * `formatExpr`, made safe for a stranger's JSON.
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
  text.length <= max ? text : `${text.slice(0, max - 1)}…`;

export function printExpr(expr: unknown, max = 32): { short: string; full: string } {
  try {
    return formatExpr(expr as Expr, max);
  } catch {
    const raw = JSON.stringify(expr) ?? String(expr);
    return { short: cut(raw, max), full: raw };
  }
}
