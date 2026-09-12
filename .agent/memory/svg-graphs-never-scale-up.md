---
name: svg-graphs-never-scale-up
description: "The site's worst visual failure was a graph SVG stretched 3.24x, which silently voided every size in the design system."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 62836594-b292-4a7b-b2fa-1c3c70d9cb97
  modified: 2026-09-07T21:23:42.578Z
---

An SVG carrying a `viewBox` and stretched with `width: 100%` scales everything inside it by
the same factor. On 2026-09-08 the homepage shipped a 208x280 graph in a 686px column: a 13px
node label drew at 42px, a 1.5px edge at 4.9px, a 160x40 node at 518x129. Nothing written in
`site/DESIGN.md` applied inside that box, and the owner's reaction was that the whole page
looked broken — which it was.

**Why:** the failure is invisible to every check that passes. Lint, types, tests, the
accessibility contrast probes and the Impeccable detector were all green, and two rounds of
visual review described the page as "styled badly" rather than naming the cause. Only
measuring the rendered scale against the viewBox found it.

**How to apply:** give a graph SVG explicit `width` and `height` attributes and let CSS do
`max-width: 100%; height: auto` — never a bare `width: 100%`. Where it does not fit, the
container scrolls. When a rendered surface looks wrong and the review cannot say why, measure
`getBoundingClientRect().width / viewBox[2]` before touching anything else.

Scaling **down** has a floor, found the same way on 2026-09-08: the feature rows drew their
graphs at 0.79, which is a 13px node label at 10.3px and a 9px condition label at 7.1px. Below
about 0.95 the layout is wrong, not the scale — a graph gets the width it needs, or it
scrolls, but never a scale. Fixing it meant restacking the row (claim across the top, graph
full width beneath) and giving the frame `width: fit-content` so the border belongs to the
graph rather than the row.

The layout's direction is a second half of the same lesson: `layoutGraph` runs `column` for a
docked panel and `row` for a page, because giving the narrowest object the widest column is
what tempted the stretch in the first place.

Related: [[hero-island-is-the-static-frame]], [[stale-dist-fails-local-tests]].
