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
 * repository's to keep. Fenced code (in a list or a quote too), code spans and
 * HTML comments are skipped, because `[a](b)` there is not a link. An indented
 * code block is not skipped, since telling one from an indented list paragraph
 * needs a Markdown parser, and a bare target holds parentheses one level deep.
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
 * find. A link below it is taken on trust until it has; CI runs this after the
 * build, where the pages are there to check.
 */
const GENERATED = '/docs/api/';

/** A target in `<angle brackets>` may hold spaces; a bare one may hold balanced parentheses. */
const TARGET = String.raw`(?:<([^<>\n]*)>|((?:[^()\s]|\([^()\s]*\))+))`;
const INLINE = new RegExp(String.raw`\]\(\s*${TARGET}`, 'g');
const DEFINITION = new RegExp(String.raw`^\s*\[[^\]]+\]:\s*${TARGET}`);

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

/** A code span opens on a whole run of backticks and closes on a run of the same length. */
const SPAN = /(?<!`)(`+)(?!`)(.*?[^`])\1(?!`)/g;

/** Inline links and reference definitions, with their line, outside code and comments. */
export const links = (text) => {
  const found = [];
  /**
   * The open fence and how deep in quotes it sits. It closes on the same
   * character, at least as long, at the same depth, with nothing after.
   */
  let fence = null;
  /** Inside a comment that started a line and has not closed yet. */
  let comment = false;
  text.split(/\r?\n/).forEach((raw, index) => {
    let line = raw;
    if (comment) {
      const end = line.indexOf('-->');
      if (end < 0) return;
      [comment, line] = [false, line.slice(end + 3)];
    }
    const marker = line.match(/^([\s>]*)(`{3,}|~{3,})(.*)$/);
    const depth = marker?.[1].split('>').length;
    // A backtick fence cannot carry a backtick after it: ```a``` is a code span.
    if (marker && !fence && !(marker[2][0] === '`' && marker[3].includes('`')))
      fence = { marker: marker[2], depth };
    else if (
      fence &&
      marker &&
      marker[2][0] === fence.marker[0] &&
      marker[2].length >= fence.marker.length &&
      depth === fence.depth &&
      !marker[3].trim()
    )
      fence = null;
    else if (!fence) {
      // Spans first: a `<!--` written in one is text, not the start of a comment.
      line = line.replace(SPAN, '').replace(/<!--.*?-->/g, '');
      if (/^ {0,3}<!--/.test(line)) {
        comment = true;
        return;
      }
      const add = (match) => found.push({ line: index + 1, target: match[1] ?? match[2] });
      for (const match of line.matchAll(INLINE)) add(match);
      const definition = line.match(DEFINITION);
      if (definition) add(definition);
    }
  });
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
