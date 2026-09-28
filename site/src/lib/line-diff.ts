/**
 * The change between two versions of a file, as diff lines a code block can
 * mark: `+` added, `-` removed, a space for unchanged context.
 *
 * The tutorial keeps every step's files whole and computes what the reader
 * types from the step before, so the diff on the page cannot drift from the
 * code a test runs. Runs of unchanged lines longer than the context collapse to
 * one `// ...` line, which the code block highlights as the comment it is.
 */
export const GAP = ' // ...';

type Op = readonly [' ' | '+' | '-', string];

const linesOf = (text: string): string[] => {
  const normal = text.replace(/\r\n/g, '\n').replace(/\n$/, '');
  return normal === '' ? [] : normal.split('\n');
};

/**
 * Longest common subsequence, by table. A tutorial file is under a hundred
 * lines, so the quadratic table is a few thousand cells.
 */
const edits = (a: readonly string[], b: readonly string[]): Op[] => {
  const width = b.length + 1;
  const table = new Uint16Array((a.length + 1) * width);
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      table[i * width + j] =
        a[i] === b[j]
          ? (table[(i + 1) * width + j + 1] ?? 0) + 1
          : Math.max(table[(i + 1) * width + j] ?? 0, table[i * width + j + 1] ?? 0);
    }
  }

  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      ops.push([' ', a[i] as string]);
      i++;
      j++;
    } else if (
      i < a.length &&
      (j === b.length || (table[(i + 1) * width + j] ?? 0) >= (table[i * width + j + 1] ?? 0))
    ) {
      // A removal before the addition that replaces it, the way diffs read.
      ops.push(['-', a[i] as string]);
      i++;
    } else {
      ops.push(['+', b[j] as string]);
      j++;
    }
  }
  return ops;
};

export function lineDiff(before: string, after: string, context = 3): string {
  const ops = edits(linesOf(before), linesOf(after));
  const changed = ops.map(([op]) => op !== ' ');
  if (!changed.includes(true)) return '';
  const near = (at: number): boolean => {
    for (let k = Math.max(0, at - context); k <= Math.min(ops.length - 1, at + context); k++) {
      if (changed[k]) return true;
    }
    return false;
  };

  const out: string[] = [];
  let skipped = false;
  ops.forEach(([op, line], at) => {
    if (near(at)) {
      if (skipped) out.push(GAP);
      skipped = false;
      out.push(`${op}${line}`);
    } else {
      skipped = true;
    }
  });
  if (skipped) out.push(GAP);
  return out.join('\n');
}
