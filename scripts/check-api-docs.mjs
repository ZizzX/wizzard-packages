#!/usr/bin/env node
/**
 * Fails when a public export has no TSDoc.
 *
 * The API reference is typedoc's rendering of the packages' entry points, and
 * an export without a comment is a page that shows a bare signature - and an
 * editor hover that shows nothing either. This converts the entry points the
 * site renders, with the options it renders them with, and runs typedoc's own
 * `notDocumented` check over every function, class, interface, type alias,
 * variable and enum a user can import, and over every member called like a
 * function, such as `wizard.next`. An export marked `@internal` is left out of
 * the reference, and so out of this check: the tag marks plumbing the packages
 * share - exported from core's root so a binding can import it - and not API a
 * user should build on.
 *
 * A binding re-exports core's types from core's `dist`, so a name core defines
 * is checked as it was last built: run `pnpm build` first.
 *
 *   node scripts/check-api-docs.mjs
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Application } from 'typedoc';

import { entryPoints } from '../site/api-entry-points.mjs';

const site = fileURLToPath(new URL('../site/', import.meta.url));
const entries = entryPoints.map((entry) => resolve(site, entry));
/** typedoc checks only the packages it is told to, so name every package an entry point is in. */
const packages = [
  ...new Set(
    entries.map(
      (entry) => JSON.parse(readFileSync(entry.replace(/\/src\/.*$/, '/package.json'), 'utf8')).name
    )
  ),
];

const app = await Application.bootstrap({
  entryPoints: entries,
  tsconfig: resolve(site, 'tsconfig.typedoc.json'),
  // What starlight-typedoc sets, so what is checked is what the reference shows.
  excludeInternal: true,
  excludePrivate: true,
  excludeProtected: true,
  readme: 'none',
  requiredToBeDocumented: ['Enum', 'Variable', 'Function', 'Class', 'Interface', 'TypeAlias'],
  packagesRequiringDocumentation: packages,
  validation: {
    notDocumented: true,
    notExported: false,
    invalidLink: false,
    invalidPath: false,
    rewrittenLink: false,
    unusedMergeModuleWith: false,
  },
});

const project = await app.convert();
if (!project) process.exit(1);

// The only check left on is `notDocumented`, so every warning it raises is one undocumented export.
const missing = [];
app.logger.validationWarning = (message) => missing.push(message);
app.validate(project);

for (const message of missing) console.error(message);
if (missing.length) {
  const stale = missing.some((message) => message.includes('/dist/'))
    ? ' A name defined in a dist is documented in its source: write it there and rebuild.'
    : '';
  console.error(
    `\n${missing.length} public export${missing.length === 1 ? '' : 's'} with no TSDoc. Each one shows a bare signature in the API reference and an empty hover in the editor. Write a TSDoc comment above each, or mark it @internal if it is plumbing the packages share rather than API for users.${stale}`
  );
  process.exit(1);
}
console.log(`api docs: ${packages.length} packages, every export documented`);
