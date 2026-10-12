/**
 * The homepage's evidence, read from the repository when the site is built:
 * what each import costs, which versions the packages support, and the lines
 * of tested files the feature cards quote. DESIGN.md: no page claims a number
 * the repository cannot produce, so nothing here is typed by hand.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import core from '../../../packages/core/package.json';
import react from '../../../packages/react/package.json';
import vue from '../../../packages/vue/package.json';

/** The `.size-limit.js` entry every bar is measured against: an application calling `createWizard`. */
export const ENGINE = 'homepage createWizard';

/**
 * The bars after core's, by the name the card gives each and the `.size-limit.js`
 * entry that bundles `createWizard` with that one import. A bar is the
 * difference the import makes. Development tools - devtools, validate-flow,
 * graph, session, expr - are left out: they are not what an application ships.
 */
export const SHOWN: Readonly<Record<string, string>> = {
  react: 'homepage + react',
  vue: 'homepage + vue',
  validate: 'homepage + validate',
  groups: 'homepage + groups',
  snapshot: 'homepage + snapshot',
  persist: 'homepage + persist',
};

export interface Bar {
  name: string;
  /** Gzipped bytes: core's own, or what the import adds to it. */
  size: number;
  /** `size` as it is read: `893 B`, `7.17 kB`. */
  label: string;
  /** The bar's length, as a share of the largest bar's. */
  share: number;
}

/** Bytes the way size-limit prints them: decimal kilobytes, two places. */
export function formatBytes(bytes: number): string {
  return bytes < 1000 ? `${bytes} B` : `${(Math.round(bytes / 10) / 100).toFixed(2)} kB`;
}

/**
 * The bars, largest first, from what size-limit printed with `--json`: a list
 * of measurements, or `{ error }` when it could not measure. An entry the card
 * needs and the list lacks fails the build, so a renamed entry cannot quietly
 * drop its bar.
 */
export function bars(measured: unknown): Bar[] {
  if (!Array.isArray(measured)) {
    const reason = (measured as { error?: unknown } | null)?.error ?? 'it printed no list';
    throw new Error(
      `size-limit measured nothing for the homepage's size card: ${String(reason)}. The card draws its measurements. Fix what size-limit reports, then run pnpm exec size-limit --json from the repository root.`
    );
  }
  const sizes = new Map(
    (measured as { name?: unknown; size?: unknown }[]).map((entry) => [entry.name, entry.size])
  );
  const size = (entry: string): number => {
    const value = sizes.get(entry);
    if (typeof value !== 'number') {
      throw new Error(
        `size-limit has no size for "${entry}". The homepage's size card draws it, and the entry is gone from .size-limit.js or its files were not found. Restore it, or rename it in site/src/lib/evidence.ts along with .size-limit.js.`
      );
    }
    return value;
  };
  const engine = size(ENGINE);
  const rows = [
    { name: 'core', size: engine },
    ...Object.entries(SHOWN).map(([name, entry]) => ({ name, size: size(entry) - engine })),
  ];
  const largest = Math.max(...rows.map((row) => row.size));
  return rows
    .sort((a, b) => b.size - a.size)
    .map((row) => ({ ...row, label: formatBytes(row.size), share: row.size / largest }));
}

/**
 * The directory holding `.size-limit.js`, looked for upwards from this module,
 * so the build finds it whichever directory it was started from.
 */
function repoRoot(): string {
  const start = dirname(fileURLToPath(import.meta.url));
  for (let dir = start; ; dir = dirname(dir)) {
    if (existsSync(join(dir, '.size-limit.js'))) return dir;
    if (dirname(dir) === dir) {
      throw new Error(
        `no .size-limit.js above ${start}. The homepage measures the bundle with it. Build the site from a checkout of the repository.`
      );
    }
  }
}

/**
 * size-limit's `--json` output. Run through this Node with its own bin rather
 * than through `pnpm exec`, which needs pnpm on the PATH and a shell on Windows.
 */
function measure(): string {
  const root = repoRoot();
  const bin = join(
    dirname(createRequire(join(root, 'package.json')).resolve('size-limit/package.json')),
    'bin.js'
  );
  try {
    return execFileSync(process.execPath, [bin, '--json'], {
      cwd: root,
      encoding: 'utf8',
      timeout: 120_000,
    });
  } catch (error) {
    // Over a budget, or failing, size-limit still prints its JSON - every
    // measurement, or `{ error }` - and exits 1. bars() reads either; holding
    // the budgets is CI's job, not the page's.
    const { stdout } = error as { stdout?: string };
    if (stdout) return stdout;
    throw new Error(
      `size-limit did not run for the homepage's size card: ${(error as Error).message}. The card draws its measurements. Run pnpm install, then pnpm exec size-limit --json from the repository root.`
    );
  }
}

/** size-limit's stdout as JSON, or a failure that says what it printed instead. */
export function parseMeasurement(stdout: string): unknown {
  try {
    return JSON.parse(stdout);
  } catch {
    throw new Error(
      `size-limit printed something other than JSON for the homepage's size card: ${stdout.slice(0, 200)}. The card reads its --json output. Run pnpm exec size-limit --json from the repository root and fix what it prints.`
    );
  }
}

let measured: Bar[] | undefined;

/**
 * This build's bars. Measured once per process, because size-limit takes a few
 * seconds and the dev server renders the page on every request.
 */
export function bundleSizes(): Bar[] {
  measured ??= bars(parseMeasurement(measure()));
  return measured;
}

/**
 * The lowest version a range allows, as a reader says it: `>=18.0.0` and
 * `^18.0.0` are both `>= 18`. A caret's ceiling, the next major, is left
 * unsaid. A range of any other shape fails the build rather than being shown
 * as something it is not.
 */
export function lowest(range: string): string {
  const version = /^(?:>=|\^)\s*(\d+(?:\.\d+)*)$/.exec(range.trim())?.[1];
  if (version === undefined) {
    throw new Error(
      `"${range}" is not a range the homepage can state as one lowest version. It reads ">=x" and "^x". State the range in one of those or teach lowest() the new one.`
    );
  }
  return `>= ${version.replace(/(\.0)+$/, '')}`;
}

/** What the packages declare they run on, from their own package.json. */
export const supported: readonly { name: string; value: string }[] = [
  { name: 'React', value: lowest(react.peerDependencies.react) },
  { name: 'Vue', value: lowest(vue.peerDependencies.vue) },
  { name: 'Node', value: lowest(core.engines.node) },
];

/**
 * The lines of `source` from the one containing `first` through the next one
 * containing `last`, with their common indent removed. Missing either fails the
 * build, so a card cannot go on quoting code its tested file no longer has.
 */
export function excerpt(source: string, first: string, last = first): string {
  const lines = source.split('\n');
  const start = lines.findIndex((line) => line.includes(first));
  const end = start === -1 ? -1 : lines.findIndex((line, at) => at >= start && line.includes(last));
  if (end === -1) {
    throw new Error(
      `no lines from "${first}" to "${last}" in the file a homepage card quotes. The file changed under it. Point the card's excerpt at lines the file still has.`
    );
  }
  const picked = lines.slice(start, end + 1);
  const indent = Math.min(
    ...picked
      .filter((line) => line.trim() !== '')
      .map((line) => line.length - line.trimStart().length)
  );
  return picked.map((line) => line.slice(indent)).join('\n');
}
