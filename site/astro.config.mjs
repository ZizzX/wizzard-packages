// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';
import { fileURLToPath } from 'node:url';

/**
 * Starlight's search and theme picker read its custom properties and utility
 * classes, which its own pages load and the site's hand-written pages do not.
 * The package exports neither stylesheet, so they are reached through the
 * package's resolved location - wherever the installer put it - rather than a
 * `node_modules` path. `Page.astro` imports `starlight-style/props.css` and
 * `starlight-style/util.css`; on a Starlight upgrade, check both still exist.
 */
const starlightStyle = fileURLToPath(
  new URL('./style/', import.meta.resolve('@astrojs/starlight'))
);

/**
 * `@vitejs/plugin-vue` (6.0.8 and 6.0.9) compiles a `lang="ts"` script with the
 * dev server's whole `oxc` config, and `@vitejs/plugin-react` has set
 * `jsx.refresh` there. The Vue plugin ignores the refresh include and exclude
 * filters and the server-environment check that Vite's own transform applies, so
 * every Vue component gets React Fast Refresh calls and server rendering throws
 * `$RefreshSig$ is not defined`. The build has no refresh, so only dev breaks.
 * This hands the Vue plugin a view of the server whose `oxc` has refresh off,
 * and leaves React's transform untouched. Delete it when plugin-vue applies the
 * filters itself.
 */
const vueWithoutReactRefresh = {
  name: 'site:vue-without-react-refresh',
  enforce: /** @type {const} */ ('post'),
  /** @param {import('vite').ViteDevServer} server */
  configureServer(server) {
    const vue = server.config.plugins.find((plugin) => plugin.name === 'vite:vue');
    const { oxc } = server.config;
    if (!vue?.api?.options || !oxc || typeof oxc.jsx !== 'object') return;
    const config = { ...server.config, oxc: { ...oxc, jsx: { ...oxc.jsx, refresh: false } } };
    vue.api.options.devServer = Object.assign(Object.create(server), { config });
  },
};

/**
 * The site is static and lives under the repository's Pages path. Starlight
 * injects a catch-all `[...slug]` route; a static `src/pages/*.astro` file
 * outsorts it in Astro's route priority, which is how the homepage stays fully
 * custom while the documentation is Starlight's. Starlight reads its content
 * from `src/content/docs/`, so the pages it owns are nested one level deeper
 * (`src/content/docs/docs/`) and resolve under `/docs/`.
 */
export default defineConfig({
  site: 'https://zizzx.github.io',
  base: '/wizzard-packages',
  output: 'static',
  // The reference flows live in the repository's `contract/` directory, outside
  // this package, so the dev server has to be allowed to read one level up.
  vite: {
    server: { fs: { allow: ['..'] } },
    plugins: [vueWithoutReactRefresh],
    resolve: { alias: { 'starlight-style': starlightStyle } },
  },
  integrations: [
    react(),
    vue(),
    starlight({
      title: 'wizzard',
      description: 'Headless multi-step flows for React and Vue. The flow is JSON.',
      // One top bar for the whole site (D-015): the pages outside Starlight
      // render the same component. GitHub is one of its links, so there is no
      // `social` entry to draw it a second time as an icon.
      components: {
        Header: './src/components/SiteHeader.astro',
        Sidebar: './src/components/DocsSidebar.astro',
      },
      customCss: [
        '@fontsource-variable/inter-tight',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/tokens.css',
        './src/styles/site.css',
      ],
      // The order is the reading order, not the alphabet: what a flow is, then
      // what decides its shape, then what happens when someone walks through
      // it. `site/src/content/sidebar.test.ts` fails if an entry here names a
      // page that does not exist, or if a page exists that nothing links to.
      sidebar: [
        {
          label: 'Start here',
          items: [{ label: 'Getting started', link: '/docs/start/' }],
        },
        {
          // Titled by the phrase a person would search for, because that is how
          // they arrive: with a task, not with a concept.
          label: 'Tasks',
          items: [
            { label: 'Block Next until valid', link: '/docs/block-next-until-valid/' },
            { label: 'Restore after reload', link: '/docs/restore-after-reload/' },
            { label: 'Clear abandoned branch data', link: '/docs/clear-abandoned-branch-data/' },
            { label: 'Render field errors', link: '/docs/render-field-errors/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'The flow', link: '/docs/flow/' },
            { label: 'Expressions', link: '/docs/expressions/' },
            { label: 'Navigation', link: '/docs/navigation/' },
            { label: 'API behaviour', link: '/docs/api-behaviour/' },
            { label: 'Validation', link: '/docs/validation/' },
            { label: 'Persistence', link: '/docs/persistence/' },
            { label: 'Devtools', link: '/docs/devtools/' },
            { label: 'Server-driven flows', link: '/docs/server-driven/' },
          ],
        },
        {
          // One page per code, and the code is the slug: every message the
          // library prints ends in the URL of the page that explains it.
          label: 'Errors',
          collapsed: true,
          items: [
            { label: 'resolver-not-registered', link: '/errors/resolver-not-registered/' },
            { label: 'resolver-is-async', link: '/errors/resolver-is-async/' },
            { label: 'expr-unknown-operator', link: '/errors/expr-unknown-operator/' },
            { label: 'expr-invalid-operand', link: '/errors/expr-invalid-operand/' },
            { label: 'when-threw', link: '/errors/when-threw/' },
            { label: 'expr-too-deep', link: '/errors/expr-too-deep/' },
            { label: 'flow-invalid', link: '/errors/flow-invalid/' },
            { label: 'flow-unreadable', link: '/errors/flow-unreadable/' },
            { label: 'flow-no-steps', link: '/errors/flow-no-steps/' },
            { label: 'order-unknown-step', link: '/errors/order-unknown-step/' },
            { label: 'step-not-in-order', link: '/errors/step-not-in-order/' },
            { label: 'order-duplicate', link: '/errors/order-duplicate/' },
            { label: 'get-unknown-root', link: '/errors/get-unknown-root/' },
            { label: 'flow-not-serializable', link: '/errors/flow-not-serializable/' },
            { label: 'target-unknown-step', link: '/errors/target-unknown-step/' },
            { label: 'clear-on-leave-invalid', link: '/errors/clear-on-leave-invalid/' },
            { label: 'when-with-next', link: '/errors/when-with-next/' },
            { label: 'repeat-without-when', link: '/errors/repeat-without-when/' },
            { label: 'repeat-without-version', link: '/errors/repeat-without-version/' },
            { label: 'session-flow-mismatch', link: '/errors/session-flow-mismatch/' },
            { label: 'session-no-frames', link: '/errors/session-no-frames/' },
            { label: 'session-frame-corrupt', link: '/errors/session-frame-corrupt/' },
            { label: 'session-frames-reordered', link: '/errors/session-frames-reordered/' },
            { label: 'session-unknown-flow', link: '/errors/session-unknown-flow/' },
            { label: 'session-frame-mismatch', link: '/errors/session-frame-mismatch/' },
            { label: 'groups-not-installed', link: '/errors/groups-not-installed/' },
            { label: 'repeat-keys', link: '/errors/repeat-keys/' },
            { label: 'provider-missing', link: '/errors/provider-missing/' },
            {
              label: 'provider-wizard-and-options',
              link: '/errors/provider-wizard-and-options/',
            },
            { label: 'start-failed', link: '/errors/start-failed/' },
            { label: 'plugin-disabled', link: '/errors/plugin-disabled/' },
            { label: 'after-navigate-threw', link: '/errors/after-navigate-threw/' },
            { label: 'plugin-teardown-failed', link: '/errors/plugin-teardown-failed/' },
            { label: 'nav-invalid', link: '/errors/nav-invalid/' },
            { label: 'nav-blocked', link: '/errors/nav-blocked/' },
            { label: 'nav-no-target', link: '/errors/nav-no-target/' },
            { label: 'nav-not-reachable', link: '/errors/nav-not-reachable/' },
            { label: 'nav-superseded', link: '/errors/nav-superseded/' },
            { label: 'nav-aborted', link: '/errors/nav-aborted/' },
            { label: 'devtools-no-wizard', link: '/errors/devtools-no-wizard/' },
            { label: 'devtools-no-plugin', link: '/errors/devtools-no-plugin/' },
            { label: 'devtools-render-failed', link: '/errors/devtools-render-failed/' },
            { label: 'devtools-stopped', link: '/errors/devtools-stopped/' },
            { label: 'devtools-export-failed', link: '/errors/devtools-export-failed/' },
            { label: 'devtools-bundle-unsupported', link: '/errors/devtools-bundle-unsupported/' },
            { label: 'persist-unavailable', link: '/errors/persist-unavailable/' },
            { label: 'persist-not-restored', link: '/errors/persist-not-restored/' },
            { label: 'persist-write-failed', link: '/errors/persist-write-failed/' },
            { label: 'persist-on-restore-threw', link: '/errors/persist-on-restore-threw/' },
            { label: 'inspector-paste', link: '/errors/inspector-paste/' },
          ],
        },
        typeDocSidebarGroup,
      ],
      // The API reference is typedoc's markdown, written into the content
      // collection before Starlight reads it, so it is one more section of this
      // site rather than a second deploy. One entry point per `exports` key a
      // user can import; each file's `@module` tag is the import path it shows.
      plugins: [
        starlightTypeDoc({
          entryPoints: [
            '../packages/core/src/v1/index.ts',
            '../packages/core/src/v1/validate-flow.ts',
            '../packages/core/src/v1/graph.ts',
            '../packages/core/src/v1/groups.ts',
            '../packages/core/src/v1/session.ts',
            '../packages/core/src/v1/snapshot.ts',
            '../packages/core/src/v1/expr-builder.ts',
            '../packages/react/src/v1/index.tsx',
            '../packages/vue/src/v1/index.ts',
            '../packages/validate/src/index.ts',
            '../packages/plugins/src/persist.ts',
            '../packages/devtools/src/index.ts',
            '../packages/devtools/src/headless/index.ts',
          ],
          tsconfig: './tsconfig.typedoc.json',
          // `index`, not typedoc's `README`: the plugin drops every module page
          // named README when no readme is configured, and the index it writes
          // still links to them. As `index` each lands on its folder's URL.
          typeDoc: { entryFileName: 'index' },
          output: 'docs/api',
          sidebar: { label: 'API reference', collapsed: true },
        }),
      ],
      credits: false,
    }),
  ],
});
