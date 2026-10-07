#!/usr/bin/env node
/**
 * Fails when a link in the repository's documents points at something that is
 * not there.
 *
 * A file gets deleted or a page renamed, and every document that linked to it
 * keeps pointing at nothing until a reader clicks. This walks every tracked
 * Markdown file and checks the links that can be checked without a network:
 *
 *   a relative path               the file exists, relative to the document
 *   a github.com link to this     the file exists in the checkout
 *   repository (blob or tree)
 *   a link to the docs site       the site builds a page at that path
 *   a link inside the site's      the site builds a page at the URL it
 *   own pages                     resolves to from the page it is on
 *
 * Other hosts, anchors and code blocks are not checked: an external page is not
 * this repository's to keep, and a fence holds code, where `[a](b)` is not a
 * link.
 *
 *   node scripts/check-links.mjs
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE = 'https://zizzx.github.io/wizzard-packages/';
const BASE = '/wizzard-packages';
const REPO = /^https:\/\/github\.com\/ZizzX\/wizzard-packages\/(?:blob|tree)\/[^/]+\/([^#?]*)/;
const CONTENT = 'site/src/content/docs';
const PAGES = 'site/src/pages';
/**
 * typedoc writes the API reference into the content on every site build and git
 * ignores it, so a checkout that has not built the site has no page there to
 * find. A link below it is taken on trust until it has.
 */
const GENERATED = '/docs/api/';

/** `docs/flow.md` is served at `/docs/flow/`, an `index` at its folder. */
const routeOf = (path) =>
  `/${path.replace(/\.(mdx?|astro)$/, '').replace(/(^|\/)index$/, '')}/`.replace(/\/+/g, '/');

/** Every page the site builds, as the path below the base it is served at. */
export const routes = (root) => {
  const found = new Set();
  for (const base of [CONTENT, PAGES]) {
    if (!existsSync(join(root, base))) continue;
    for (const path of readdirSync(join(root, base), { recursive: true }))
      // A `[slug].astro` page builds whatever its code says; nothing here links to one.
      if (/\.(mdx?|astro)$/.test(path) && !path.includes('['))
        found.add(routeOf(path.split(sep).join('/')));
  }
  return found;
};

/** Inline links and reference definitions, with their line, outside code. */
export const links = (text) => {
  const found = [];
  let fenced = false;
  text.split(/\r?\n/).forEach((raw, index) => {
    if (/^\s*(```|~~~)/.test(raw)) {
      fenced = !fenced;
      return;
    }
    if (fenced) return;
    const line = raw.replace(/`[^`]*`/g, '');
    for (const match of line.matchAll(/\]\(\s*<?([^)\s>]+)/g))
      found.push({ line: index + 1, target: match[1] });
    const definition = line.match(/^\s*\[[^\]]+\]:\s*<?([^\s>]+)/);
    if (definition) found.push({ line: index + 1, target: definition[1] });
  });
  return found;
};

/** Why `target`, written in `file`, leads nowhere - or `null` when it leads somewhere. */
const deadEnd = (root, pages, file, target) => {
  const page = (path) => {
    if (!path.startsWith(`${BASE}/`)) return 'is outside the site';
    const route = path.slice(BASE.length).replace(/\/?$/, '/');
    if (route.startsWith(GENERATED) && !existsSync(join(root, CONTENT, GENERATED))) return null;
    return pages.has(route) ? null : 'is not a page the site builds';
  };
  const missing = (path) => (existsSync(path) ? null : 'is not a file in the repository');

  if (target.startsWith('#')) return null;
  const repo = target.match(REPO);
  if (repo) return missing(join(root, decodeURIComponent(repo[1])));
  if (target.startsWith(SITE)) return page(new URL(target).pathname);
  if (/^[a-z][a-z\d+.-]*:/i.test(target)) return null;
  const path = decodeURIComponent(target.replace(/[#?].*$/, ''));
  // A page links to another page by URL; an image beside it is still a file.
  if (file.startsWith(`${CONTENT}/`) && !/\.\w+$/.test(path)) {
    const from = `https://site${BASE}${routeOf(file.slice(CONTENT.length + 1))}`;
    return page(new URL(target, from).pathname);
  }
  return missing(path.startsWith('/') ? join(root, path) : join(root, dirname(file), path));
};

/** Every dead link in `files`, paths relative to `root`. */
export const deadLinks = (root, files) => {
  const pages = routes(root);
  return files.flatMap((file) =>
    links(readFileSync(join(root, file), 'utf8')).flatMap(({ line, target }) => {
      const why = deadEnd(root, pages, file, target);
      return why ? [{ file, line, target, why }] : [];
    })
  );
};

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const files = execFileSync('git', ['ls-files', '-z', '*.md', '*.mdx'], {
    cwd: root,
    encoding: 'utf8',
  })
    .split('\0')
    .filter(Boolean);
  const dead = deadLinks(root, files);
  for (const { file, line, target, why } of dead)
    console.error(`${file}:${line}: ${target} ${why}`);
  if (dead.length) {
    console.error(
      `\n${dead.length} dead link${dead.length === 1 ? '' : 's'} in ${files.length} documents. Point each at the file or page that replaced what it named, or remove it.`
    );
    process.exit(1);
  }
  console.log(`links: ${files.length} documents, no dead links`);
}
