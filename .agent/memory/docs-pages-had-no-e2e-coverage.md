---
name: docs-pages-had-no-e2e-coverage
description: 'Until 2026-09-09 no e2e spec ever loaded a /docs/ route, so "axe 0 violations on every page" only ever meant the example pages — and two page behaviours that look like defects are races, not bugs.'
metadata:
  node_type: memory
  type: project
  originSessionId: bf7a74a5-07b3-402f-a66d-76e9e4965283
  modified: 2026-09-08T20:50:45.912Z
---

The four specs under `e2e/tests/site/` visit the three reference applications and
the inspector. None had ever loaded a `/docs/` route, so S1's acceptance — "axe 0
violations on every page" — had quietly come to mean the example pages. That is
how [[unlayered-css-beats-starlight]] survived on six pages in two themes.

`e2e/tests/site/docs.spec.ts` now runs axe over every page the sidebar links to,
in both themes, plus two direct contrast assertions. The direct assertions are
not redundant: **axe skips a colour-contrast check whose background it cannot
resolve**, which is exactly the case for text on a Starlight fill.

**Two things that look like defects on these pages and are not:**

- **Wide code blocks reported as `scrollable-region-focusable`.** Expressive Code
  adds `tabindex="0"` and `role="region"` from a script — a `ResizeObserver`
  debounced 250ms and then deferred to `requestIdleCallback` — so a scan starting
  at `networkidle` reliably wins the race. Wait for the attribute before scanning,
  or the test measures the race rather than the page.
- **A floating pill of icons over the content.** That is the Astro dev toolbar. It
  is absent from the build; hide it with
  `page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' })`
  before taking a screenshot for review.

**How to apply:** a visual or accessibility claim about this site is worth nothing
until it is measured on the built page. Three separate "severe defects" reported
from screenshots this session were a dev-toolbar overlay, a script race, and a
scroll container that was working correctly. See
[[site-ground-is-a-solid-fill]] for the standing instruction to check in a browser.
