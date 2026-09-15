---
name: vue-plugin-takes-react-refresh
description: the site's dev server 500s on every Vue island because plugin-vue compiles TS with React's refresh setting; why the plugin in astro.config.mjs exists, and why only a dev-server test can see it.
metadata:
  type: project
---

On 2026-09-16 every page with a Vue island failed in `astro dev` with
`ReferenceError: $RefreshSig$ is not defined`, while the build, `astro check` and the whole site
e2e suite stayed green.

**Cause.** `@vitejs/plugin-vue` (6.0.8, unchanged in 6.0.9) compiles a `lang="ts"` script with
`transformWithOxc({ ...devServer.config.oxc })`. `@vitejs/plugin-react` has put
`jsx.refresh: true` in that object. Vite's own transform turns refresh off for the server
environment and honours `jsxRefreshInclude`/`jsxRefreshExclude`; the Vue plugin does neither.
So `react({ exclude: [/\.vue$/] })` changes nothing - the filter is set correctly and never
consulted. Passing `exclude` also replaces the React plugin's default `/node_modules/`, which
has to be restated.

**The fix** is `vueWithoutReactRefresh` in `site/astro.config.mjs`: it hands `vite:vue` a view
of the server whose `oxc` has refresh off. React keeps Fast Refresh. Delete it when plugin-vue
applies the filters itself.

**Why nothing caught it:** the site e2e project serves `site/dist`, and the build has no
refresh. `e2e/tests/site/dev-server.spec.ts` is the only thing that runs the dev server, and it
starts it through Astro's `dev()` API: the CLI detects an agent, backgrounds itself, refuses
`--ignore-lock`, and cannot be awaited.

**How to apply:** a dev-only failure needs a dev-server check; a green build proves nothing
about it. When a negative assertion guards a fetched body, assert the body is the real thing
first - the first version of that spec passed on a 404.
