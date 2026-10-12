/**
 * The homepage's evidence, read from the repository when the site is built:
 * what each entry measures, which versions the packages support, and the lines
 * of tested files the feature cards quote. DESIGN.md: no page claims a number
 * the repository cannot produce, so nothing here is typed by hand.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

import core from '../../../packages/core/package.json';
import react from '../../../packages/react/package.json';
import vue from '../../../packages/vue/package.json';

/**
 * The entries the size card draws, by their name in `.size-limit.js`, and the
 * name the card gives each. Development tools - devtools, validate-flow, expr -
 * are left out: they are not what an application ships.
 */
export const SHOWN: Readonly<Record<string, string>> = {
  'core-v1': 'core',
  'react-v1': 'react',
  'vue-v1': 'vue',
  validate: 'validate',
  'core-v1 groups': 'groups',
  'core-v1 session': 'session',
  'core-v1 snapshot': 'snapshot',
  'plugins persist': 'persist',
  'core-v1 graph': 'graph',
};

export interface Bar {
  name: string;
  /** Gzipped bytes, as size-limit measured them. */
  size: number;
  /** `size` as it is read: `893 B`, `7.17 kB`. */
  label: string;
  /** The bar's length, as a share of the largest entry's. */
  share: number;
}

/** Bytes the way size-limit prints them: decimal kilobytes, two places. */
export function formatBytes(bytes: number): string {
  return bytes < 1000 ? `${bytes} B` : `${(bytes / 1000).toFixed(2)} kB`;
}

/**
 * The bars, largest first, from size-limit's JSON. An entry that `SHOWN` names
 * and the measurement lacks fails the build: a renamed entry would otherwise
 * drop its bar without anyone noticing.
 */
export function bars(measured: readonly { name: string; size: number }[]): Bar[] {
  const sizes = new Map(measured.map((entry) => [entry.name, entry.size]));
  const rows = Object.entries(SHOWN).map(([entry, name]) => {
    const size = sizes.get(entry);
    if (size === undefined) {
      throw new Error(
        `size-limit measured no entry named "${entry}". The homepage's size card draws it. Rename it in SHOWN in site/src/lib/evidence.ts along with .size-limit.js.`
      );
    }
    return { name, size };
  });
  const largest = Math.max(...rows.map((row) => row.size));
  return rows
    .sort((a, b) => b.size - a.size)
    .map((row) => ({ ...row, label: formatBytes(row.size), share: row.size / largest }));
}

/** The directory holding `.size-limit.js`, looked for upwards from where the build runs. */
function repoRoot(): string {
  for (let dir = process.cwd(); ; dir = dirname(dir)) {
    if (existsSync(join(dir, '.size-limit.js'))) return dir;
    if (dirname(dir) === dir) {
      throw new Error(
        `no .size-limit.js above ${process.cwd()}. The homepage measures the bundle with it. Build the site from inside the repository.`
      );
    }
  }
}

function measure(): string {
  try {
    return execFileSync('pnpm', ['exec', 'size-limit', '--json'], {
      cwd: repoRoot(),
      encoding: 'utf8',
    });
  } catch (error) {
    // Over a budget, size-limit still prints every measurement and exits 1.
    // The page shows what the code measures; holding the budget is CI's job.
    const { stdout } = error as { stdout?: string };
    if (stdout) return stdout;
    throw error;
  }
}

let measured: Bar[] | undefined;

/** This build's bars. Measured once per process: size-limit takes about a second. */
export function bundleSizes(): Bar[] {
  measured ??= bars(JSON.parse(measure()) as { name: string; size: number }[]);
  return measured;
}

/**
 * The lowest version a range allows, as a reader says it: `>=18.0.0` and
 * `^18.0.0` are both `>= 18`. A range of any other shape fails the build
 * rather than being shown as something it is not.
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
