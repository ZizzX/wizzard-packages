#!/usr/bin/env node
/**
 * Keeps the documentation's code blocks identical to files that are tested.
 *
 * A README example nobody runs rots on the first refactor, and the reader is
 * the one who finds out. Every snippet below lives in `examples/quickstart`,
 * which vitest drives on both bindings, so a block that drifts fails CI rather
 * than a stranger's editor.
 *
 *   node scripts/embed-examples.mjs           rewrite the documents
 *   node scripts/embed-examples.mjs --check   fail if anything drifted
 *
 * Markers in a document, one pair per snippet:
 *
 *   <!-- example:quickstart-flow -->
 *   ```ts
 *   ...generated...
 *   ```
 *   <!-- /example -->
 *
 * Plain node, no TypeScript runner: a documentation check that needs its own
 * toolchain is one more thing to be broken on a fresh clone.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** The manifest. A snippet exists here or it does not exist. */
const SNIPPETS = {
  'quickstart-flow': { file: 'examples/quickstart/src/flow.ts', lang: 'ts' },
  'quickstart-react': { file: 'examples/quickstart/src/App.tsx', lang: 'tsx' },
  'quickstart-vue': { file: 'examples/quickstart/src/Wizard.vue', lang: 'vue' },
};

const DOCUMENTS = ['README.md'];

const check = process.argv.includes('--check');
/** Line endings differ between a Windows checkout and CI; the content does not. */
const lf = (s) => s.replace(/\r\n/g, '\n');

const problems = [];
const used = new Set();

for (const doc of DOCUMENTS) {
  const path = resolve(root, doc);
  const original = lf(await readFile(path, 'utf8'));
  const seen = new Set();

  // The `prettier-ignore` is load-bearing: prettier reformats code inside
  // fences, which would rewrite the block into something that no longer matches
  // the file it came from, and the two would fight forever.
  const pattern =
    /<!-- example:([\w-]+) -->\n+<!-- prettier-ignore -->\n```[\w]*\n[\s\S]*?\n```\n+<!-- \/example -->/g;
  let updated = original;
  const replacements = [];

  for (const match of original.matchAll(pattern)) {
    const [block, name] = match;
    if (seen.has(name)) {
      problems.push(`${doc}: marker "${name}" appears more than once`);
      continue;
    }
    seen.add(name);
    used.add(name);

    const snippet = SNIPPETS[name];
    if (!snippet) {
      problems.push(
        `${doc}: marker "${name}" is not in the manifest in ${'scripts/embed-examples.mjs'}`
      );
      continue;
    }

    let source;
    try {
      source = lf(await readFile(resolve(root, snippet.file), 'utf8')).trimEnd();
    } catch {
      problems.push(`${doc}: "${name}" points at ${snippet.file}, which does not exist`);
      continue;
    }

    const rebuilt = `<!-- example:${name} -->

<!-- prettier-ignore -->
\`\`\`${snippet.lang}
${source}
\`\`\`

<!-- /example -->`;
    if (rebuilt !== block) replacements.push([block, rebuilt, name, doc]);
  }

  for (const [block, rebuilt, name, where] of replacements) {
    if (check) problems.push(`${where}: "${name}" has drifted from ${SNIPPETS[name].file}`);
    updated = updated.replace(block, rebuilt);
  }

  if (!check && updated !== original) await writeFile(path, updated, 'utf8');
}

for (const name of Object.keys(SNIPPETS)) {
  if (!used.has(name)) problems.push(`"${name}" is in the manifest but no document embeds it`);
}

if (problems.length > 0) {
  for (const p of problems) console.error(`embed-examples: ${p}`);
  console.error(
    check
      ? '\nRun `node scripts/embed-examples.mjs` to update the documents.'
      : '\nFix the manifest and run again.'
  );
  process.exit(1);
}

console.log(
  check ? 'embed-examples: documents match their sources' : 'embed-examples: documents updated'
);
