---
name: site-ground-is-a-solid-fill
description: 'DONE in PR #79 — the ground is flat, the list of what may take a surface is closed, and the nav deliberately stays on the ground; the standing part is that layout claims must be measured in a browser.'
metadata:
  node_type: memory
  type: feedback
  originSessionId: bf7a74a5-07b3-402f-a66d-76e9e4965283
  modified: 2026-09-08T20:09:01.201Z
---

Stated 2026-09-09: the site's background reads as "какая-то решётка" and must
become a solid fill; separation comes from blocks that carry their own fill.

The grid lives in `site/src/styles/site.css` (the `--grid-line` double
`linear-gradient` on the ground, ~line 16-26) with its tokens in
`tokens.css`. It was written as a drawing-sheet metaphor on the 32px step; the
owner's verdict is that it reads as noise behind content.

**Why:** documentation sites earn trust by being quiet. The named references
are TanStack, Stepperize and Next.js — all of them put a flat ground under the
page and let panels, code blocks and callouts carry the contrast. A patterned
ground competes with the one thing a docs page exists to show.

**Done in PR #79 (2026-09-09).** The grid and `--grid-line` are gone. The
surviving rule is the closed list in `site/DESIGN.md` under "Which things get a
surface": code blocks, tables, instrument panels and gallery cards take one;
the top bar, the sidebar, the table of contents, prose and the footer stay on
the ground. **The nav staying flat is deliberate** — every comparison site
paints its header in exactly the ground colour, one adds a hairline, none uses
a fill or a shadow, so a tinted header is the amateur tell rather than the fix.

The palette did not need changing: `--bg` to `--surface` measured 1.05 and to
`--surface-raised` 1.10, both inside the range those sites use. The panels read
as outlines because the grid ran _through_ them.

**What is still standing, and is the real lesson:** measure in a browser, never
declare from the CSS. Three "severe defects" reported from screenshots this
session were not real — see [[docs-pages-had-no-e2e-coverage]]. The remaining
work is #76 (a full browser pass at every breakpoint) and #61 (the home page's
scroll-driven animation), which only reads correctly when watched. Voice and
ornament rules stay [[no-emoji-in-docs]]; do not name the comparison sites in
the repository, per [[no-assistant-attribution]].
