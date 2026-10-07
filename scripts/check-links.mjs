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
 * Other hosts and anchors are not checked: an external page is not this
 * repository's to keep. Links are read by markdown-it - already in the tree
 * through typedoc - so what counts as code, a comment or a link is what
 * CommonMark says. MDX differs in two places it follows: an indent is not code,
 * and Markdown inside a JSX element is still Markdown. A `{expression}` is read
 * as text, and front matter is skipped. A dead link is reported at the line its
 * paragraph, list item or table cell starts on.
 *
 *   node scripts/check-links.mjs
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import MarkdownIt from 'markdown-it';

const SITE = 'https://zizzx.github.io/wizzard-packages/';
const BASE = '/wizzard-packages';
const REPO = /^https:\/\/github\.com\/ZizzX\/wizzard-packages\/(?:blob|tree)\/[^/]+\/([^#?]*)/;
const CONTENT = 'site/src/content/docs';
const PAGES = 'site/src/pages';
/**
 * typedoc writes the API reference into the content on every site build and git
 * ignores it, so a checkout that has not built the site has no page there to
 * find. A link below it is taken on trust until it has; CI runs this after the
 * build, where the pages are there to check.
 */
const GENERATED = '/docs/api/';

const markdown = new MarkdownIt({ html: true });
const mdx = new MarkdownIt({ html: true }).disable(['code', 'html_block']);

/** Each run of escapes is decoded on its own, so a `%` that starts none stays part of the name. */
const decode = (path) =>
  path.replace(/(%[\da-f]{2})+/gi, (run) => {
    try {
      return decodeURIComponent(run);
    } catch {
      return run;
    }
  });

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

/** Every link and image in a document, with the line its block starts on. */
export const links = (text, isMdx = false) => {
  const found = [];
  // Front matter is YAML, not Markdown; blanking it keeps every line where it was.
  // The block closes on the first `---` line, which may come straight after the opener.
  const body = text.replace(/^---[ \t]*\r?\n(?:---|[\s\S]*?\r?\n---)[ \t]*(?:\r?\n|$)/, (yaml) =>
    yaml.replace(/[^\n]/g, '')
  );
  let line = 1;
  for (const block of (isMdx ? mdx : markdown).parse(body, {})) {
    // A table cell has no position of its own; its row, read just before it, does.
    if (block.map) line = block.map[0] + 1;
    for (const token of block.children ?? []) {
      const target =
        token.type === 'link_open'
          ? token.attrGet('href')
          : token.type === 'image'
            ? token.attrGet('src')
            : null;
      if (target !== null) found.push({ line, target });
    }
  }
  return found;
};

/** Why `target`, written in `file`, leads nowhere - or `null` when it leads somewhere. */
const deadEnd = (root, pages, file, target) => {
  const page = (url, base) => {
    let path;
    try {
      path = new URL(url, base).pathname;
    } catch {
      return 'is not a URL';
    }
    if (!path.startsWith(`${BASE}/`)) return 'is outside the site';
    const route = path.slice(BASE.length).replace(/\/?$/, '/');
    if (route.startsWith(GENERATED) && !existsSync(join(root, CONTENT, GENERATED))) return null;
    return pages.has(route) ? null : 'is not a page the site builds';
  };
  const missing = (path) => (existsSync(path) ? null : 'is not a file in the repository');

  const repo = target.match(REPO);
  if (repo) return missing(join(root, decode(repo[1])));
  if (target.startsWith(SITE)) return page(target);
  if (/^[a-z][a-z\d+.-]*:/i.test(target)) return null;
  const path = decode(target.replace(/[#?].*$/, ''));
  // A page links to another page by URL; an image beside it is still a file.
  if (file.startsWith(`${CONTENT}/`) && !/\.\w+$/.test(path)) {
    return page(target, `https://site${BASE}${routeOf(file.slice(CONTENT.length + 1))}`);
  }
  return missing(path.startsWith('/') ? join(root, path) : join(root, dirname(file), path));
};

/** Every dead link in `files`, paths relative to `root`. */
export const deadLinks = (root, files) => {
  const pages = routes(root);
  return files.flatMap((file) =>
    links(readFileSync(join(root, file), 'utf8'), file.endsWith('.mdx')).flatMap(
      ({ line, target }) => {
        const why = deadEnd(root, pages, file, target);
        return why ? [{ file, line, target: decode(target), why }] : [];
      }
    )
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
