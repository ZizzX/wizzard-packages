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
        '@fontsource-variable/ibm-plex-sans',
        '@fontsource/ibm-plex-mono/400.css',
        '@fontsource/ibm-plex-mono/500.css',
        './src/styles/tokens.css',
        './src/styles/site.css',
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [{ label: 'Getting started', link: '/docs/start/' }],
        },
      ],
      credits: false,
    }),
  ],
});
