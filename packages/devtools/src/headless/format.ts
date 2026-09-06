import type { Expr } from '@wizzard-packages/core/v1';

/**
 * Prints an expression as infix text for a label: `{ $eq: [{ $get: 'data.plan' },
 * 'pro'] }` reads `data.plan == "pro"`. One operator per node, so the table
 * below is the whole grammar; anything it does not know is printed as JSON
 * rather than guessed at.
 *
 * `full` is the untruncated text for a `<title>` and the mirror table; `short`
 * is cut at `max` characters with an ellipsis for the label itself.
 */
export function formatExpr(expr: Expr, max = 32): { short: string; full: string } {
  const full = print(expr);
  const short = full.length > max ? `${full.slice(0, Math.max(0, max - 1))}…` : full;
  return { short, full };
}

const COMPARE: Readonly<Record<string, string>> = {
  $eq: '==',
  $ne: '!=',
  $gt: '>',
  $gte: '>=',
  $lt: '<',
  $lte: '<=',
  $in: 'in',
};

type Node = Record<string, unknown>;

const asNode = (e: Expr): Node | null =>
  typeof e === 'object' && e !== null && !Array.isArray(e) ? (e as unknown as Node) : null;

const opOf = (n: Node): string | undefined =>
  ['$get', '$ref', '$not', '$and', '$or', '$empty', ...Object.keys(COMPARE)].find((k) => k in n);

/** `$and`/`$or` inside another boolean, or anything compound under `$not`, gets parentheses. */
const wrap = (e: Expr, when: (op: string) => boolean): string => {
  const text = print(e);
  const node = asNode(e);
  if (node === null) return text;
  const op = opOf(node);
  return op !== undefined && when(op) ? `(${text})` : text;
};

const isBool = (op: string): boolean => op === '$and' || op === '$or';
const isCompound = (op: string): boolean => op !== '$get' && op !== '$ref' && op !== '$empty';

function print(e: Expr): string {
  if (e === null || typeof e !== 'object')
    return typeof e === 'string' ? JSON.stringify(e) : String(e);
  if (Array.isArray(e)) return `[${(e as readonly Expr[]).map(print).join(', ')}]`;
  const node = e as Node;
  const op = opOf(node);
  switch (op) {
    case '$get':
      return String(node.$get);
    case '$ref':
      return `${String(node.$ref)}(${node.args === undefined ? '' : JSON.stringify(node.args)})`;
    case '$not':
      return `!${wrap(node.$not as Expr, isCompound)}`;
    case '$and':
    case '$or':
      return (node[op] as readonly Expr[])
        .map((x) => wrap(x, isBool))
        .join(op === '$and' ? ' && ' : ' || ');
    case '$empty':
      return `empty(${print(node.$empty as Expr)})`;
    case undefined:
      return JSON.stringify(e);
    default: {
      const pair = node[op];
      if (!Array.isArray(pair) || pair.length !== 2) return JSON.stringify(e);
      const [a, b] = pair as unknown as readonly [Expr, Expr];
      return `${wrap(a, isBool)} ${COMPARE[op]} ${wrap(b, isBool)}`;
    }
  }
}
