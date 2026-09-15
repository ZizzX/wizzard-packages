// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import vue from '@astrojs/vue';

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
  vite: { server: { fs: { allow: ['..'] } } },
  integrations: [
    react(),
    vue(),
    starlight({
      title: 'wizzard',
      description: 'Headless multi-step flows for React and Vue. The flow is JSON.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/ZizzX/wizzard-packages' },
      ],
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
            { label: 'flow-invalid', link: '/errors/flow-invalid/' },
            { label: 'groups-not-installed', link: '/errors/groups-not-installed/' },
            { label: 'repeat-keys', link: '/errors/repeat-keys/' },
            { label: 'provider-missing', link: '/errors/provider-missing/' },
            { label: 'devtools-no-wizard', link: '/errors/devtools-no-wizard/' },
            { label: 'devtools-no-plugin', link: '/errors/devtools-no-plugin/' },
            { label: 'devtools-render-failed', link: '/errors/devtools-render-failed/' },
            { label: 'devtools-stopped', link: '/errors/devtools-stopped/' },
            { label: 'devtools-export-failed', link: '/errors/devtools-export-failed/' },
            { label: 'devtools-bundle-unsupported', link: '/errors/devtools-bundle-unsupported/' },
            { label: 'persist-unavailable', link: '/errors/persist-unavailable/' },
            { label: 'persist-not-restored', link: '/errors/persist-not-restored/' },
            { label: 'persist-write-failed', link: '/errors/persist-write-failed/' },
            { label: 'inspector-paste', link: '/errors/inspector-paste/' },
          ],
        },
      ],
      credits: false,
    }),
  ],
});
