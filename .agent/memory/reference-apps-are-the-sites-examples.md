---
name: reference-apps-are-the-sites-examples
description: 'The three reference applications live in examples/reference and the site imports them; the page shows the very file the island mounts, and each page carries one runtime.'
metadata:
  node_type: memory
  type: project
  originSessionId: 4448c375-cda1-46af-adc4-28626b6f55b5
  modified: 2026-09-08T19:00:18.304Z
---

R-A, R-B and R-C landed as `examples/reference/src/{onboarding,reload,passengers}/`
in PRs #54, #55 and #56 (2026-09-08). Each directory holds one `flow.ts`, its
registry, a React `App.tsx` and a Vue `App.vue` + child, and the unit test that
drives both bindings. `site/` depends on `@examples/reference` and mounts them.

**The rules that hold the pages together, none of which is visible from the code:**

- One example, two routes: `/examples/<slug>/` is React and `/examples/<slug>/vue/`
  is Vue. The toggle is a **link**, never a client swap, so a remembered
  preference can only rewrite the links out of `/examples/` and can never
  disagree with what the server rendered. An e2e test downloads every script each
  page fetched and fails on `__reactContainer$` in the Vue page or `__vue_app__`
  in the React one.
- The code blocks are `?raw` imports of the files the island mounts, so drift is
  impossible by construction and nothing checks them. They are plain `<pre>`, not
  `<Code>`: Starlight owns the highlighter for the whole build and its bundle
  carries only the themes it needs, so a `<Code>` outside Starlight fails the
  build with `ShikiError: Theme 'github-dark' is not included in this bundle`.
- A page prints its own source, so **any Playwright text assertion must be scoped**
  (`page.locator('.app').getByText(...)`) or it matches the code block too.
- `site/src/islands/*` owns the error boundary and the remount key; the example
  owns the application. A reader copying `App.tsx` is copying an application, not
  a page that has to survive a stranger's browser.
- `site/src/layouts/Page.astro` carries the chrome for every hand-written page.
  The top bar wraps because four nav entries do not fit at 390px, and a bar that
  overflows takes the whole page with it — the inspector's phone test catches it.

Related: [[hero-island-is-the-static-frame]], [[two-signals-for-a-finished-wizard]],
[[svg-graphs-never-scale-up]].
