import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  // v1 ships as its own entry, so it can be tried from canary without
  // disturbing the 0.x surface.
  entry: ['src/index.ts', 'src/v1/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  // No rollup pass. tsup's `treeshake` re-bundles esbuild's output through
  // rollup, and rollup drops module-level directives, so the `'use client'`
  // at the top of `src/v1/index.tsx` never reached `dist`. A server component
  // importing the binding then failed at build time in Next.js. esbuild alone
  // keeps the directive, and the v1 entry has nothing left for rollup to shake.
  treeshake: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: [
    'react',
    'react-dom',
    '@wizzard-packages/core',
    '@wizzard-packages/middleware',
    '@wizzard-packages/persistence',
  ],
  tsconfig: resolve(__dirname, 'tsconfig.build.json'),
});
