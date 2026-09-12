---
name: unlayered-css-beats-starlight
description: 'Starlight writes every rule inside @layer, the site stylesheet does not, and unlayered CSS wins regardless of specificity — the trap that made the current sidebar entry unreadable at 1.00:1.'
metadata:
  node_type: memory
  type: project
  originSessionId: bf7a74a5-07b3-402f-a66d-76e9e4965283
  modified: 2026-09-08T20:50:33.663Z
---

Found 2026-09-09. Starlight puts all of its own rules inside `@layer starlight.*`.
`site/src/styles/site.css` was unlayered. **The cascade compares layers before
it compares specificity**, so an unlayered rule beats every layered one whatever
its selector.

That made a zero-specificity base rule, `:where(a) { color: var(--accent) }`,
override Starlight's `[aria-current='page']` and its skip link — painting accent
text on top of the accent fill Starlight had already put behind them. The current
page in the sidebar measured **1.00:1** on all six documentation pages, in both
themes, and could not be read at all. A comment in the file claimed `:where` kept
the rule weak enough for Starlight to win; that reasoning is simply wrong.

The fix is one declaration at the top of the first `customCss` file:

```css
@layer site.base, starlight.reset, starlight.base, starlight.core,
  starlight.content, starlight.components, starlight.utils;
```

Element-level defaults go in `site.base` (the weakest layer). Everything else the
site writes stays unlayered, which is stronger than all of them, because the
custom pages own their appearance. `--sl-color-text-invert` must also be mapped
to `--on-accent`, or Starlight falls back to its own default for it — which the
site had redefined as a 12% wash of the accent.

**Why nothing caught it:** no end-to-end spec had ever loaded a `/docs/` route.
See [[docs-pages-had-no-e2e-coverage]].

**How to apply:** when a site rule and a Starlight rule disagree, check the layer
before the selector. Full reasoning lives in `site/DESIGN.md` under "Where a rule
sits in the cascade".
