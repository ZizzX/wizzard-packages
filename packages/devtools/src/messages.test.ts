import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import * as messages from './messages';

/**
 * The message contract, checked rather than reviewed. `groups.test.ts` does
 * this by hand for one message; a package that owns six of them needs the
 * general form, or the sixth is written in a different shape from the first
 * and the reader has to learn two.
 *
 * Two rules: every message matches the template, and its anchor is a heading
 * a reader actually lands on.
 */

const ROOT = join(__dirname, '..', '..', '..');
const TEMPLATE = /^\[wizzard] [^.]+\.(?: [^.]+\.)+ https:\/\/\S+#[a-z-]+$/;

const anchors = (): Set<string> => {
  const doc = readFileSync(join(ROOT, 'docs', 'errors.md'), 'utf8');
  return new Set([...doc.matchAll(/^## (.+)$/gm)].map((match) => match[1]?.trim() ?? ''));
};

/** Every exported message, called with the arguments its signature needs. */
const all = (): string[] => [
  messages.noWizard(),
  messages.noPlugin('absent'),
  messages.noPlugin('not-installed'),
  messages.renderFailed('a detail'),
  messages.stopped('a detail'),
  messages.bundleUnsupported(2),
];

/** Source files, so a message written inline rather than here is still caught. */
const sources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sources(path);
    return entry.isFile() && /\.(ts|tsx)$/.test(entry.name) && !entry.name.includes('.test.')
      ? [path]
      : [];
  });

describe('messages', () => {
  it('follows the template, one clause per sentence and an anchor at the end', () => {
    for (const message of all()) {
      expect(message, message).toMatch(TEMPLATE);
    }
  });

  it('names an anchor that exists as a heading in docs/errors.md', () => {
    const headings = anchors();
    for (const message of all()) {
      const anchor = message.slice(message.lastIndexOf('#') + 1);
      expect(headings, `${anchor} has no section`).toContain(anchor);
    }
  });

  it('has no message written outside this module', () => {
    const inline: string[] = [];
    for (const file of sources(join(ROOT, 'packages', 'devtools', 'src'))) {
      if (file.endsWith(join('src', 'messages.ts'))) continue;
      const text = readFileSync(file, 'utf8');
      for (const match of text.matchAll(/`\[wizzard][^`]*`/g)) {
        inline.push(`${file}: ${match[0]}`);
      }
    }
    /** `record.ts` owns the export failures; everything else routes through messages.ts. */
    expect(inline.filter((line) => !line.includes(join('headless', 'record.ts')))).toEqual([]);
  });
});
