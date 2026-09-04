// Ask the registry what actually landed.
//
// `changeset publish` lists a package under "packages published successfully"
// even when the registry never saved it, and the job still exits 0. Seen twice:
// canary attempt 5 dropped four packages behind an E409, attempt 6 dropped
// @wizzard-packages/vue with no error line at all. A green release is not
// evidence that anything shipped.
//
// Every publishable package's package.json version must exist on npm — true
// after a canary snapshot (all packages get a fresh version) and after a real
// release (bumped packages are new, untouched ones were already published).
// Run this only when a publish actually ran.
//
// `changeset publish` is idempotent, so the fix for a failure here is to re-run
// the workflow: it skips what landed and retries what didn't.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const REGISTRY = 'https://registry.npmjs.org';
// ponytail: fixed retry window, enough for replication lag. Widen if this flaps.
const ATTEMPTS = 3;
const DELAY_MS = 10_000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function publishablePackages() {
  return readdirSync('packages', { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => join('packages', e.name, 'package.json'))
    .map((p) => {
      try {
        return JSON.parse(readFileSync(p, 'utf8'));
      } catch {
        return null;
      }
    })
    .filter((p) => p && !p.private && p.name && p.version)
    .map(({ name, version }) => ({ name, version }));
}

async function isPublished(name, version) {
  const res = await fetch(`${REGISTRY}/${name.replace('/', '%2f')}`, {
    headers: { accept: 'application/json' },
  });
  if (res.status === 404) return false;
  if (!res.ok) throw new Error(`${name}: registry returned ${res.status}`);
  const packument = await res.json();
  return Boolean(packument.versions?.[version]);
}

const expected = publishablePackages();
if (expected.length === 0) {
  console.error('No publishable packages found under packages/ — check the layout.');
  process.exit(1);
}

let missing = expected;
for (let attempt = 1; attempt <= ATTEMPTS && missing.length > 0; attempt++) {
  if (attempt > 1) await sleep(DELAY_MS);
  const checked = await Promise.all(
    missing.map(async (pkg) => ({ ...pkg, found: await isPublished(pkg.name, pkg.version) }))
  );
  missing = checked.filter((p) => !p.found);
}

for (const { name, version } of expected) {
  const gone = missing.some((m) => m.name === name);
  console.log(`${gone ? 'MISSING' : 'ok     '}  ${name}@${version}`);
}

if (missing.length > 0) {
  console.error(
    `\n${missing.length} package(s) reported as published are not in the registry.` +
      `\nRe-run this workflow: changeset publish skips what landed and retries the rest.`
  );
  process.exit(1);
}
console.log(`\nAll ${expected.length} packages verified in the registry.`);
