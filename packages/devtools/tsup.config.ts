import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  // Two entries: the React panel, and `/headless` for everything that needs
  // no React and no DOM - the plugin, the recorder, the layout, the printer
  // and the diff - so a Vue host or a Node test imports only those.
  entry: ['src/index.ts', 'src/headless/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  // No rollup pass, for the reason the react package gives: rollup drops
  // module-level directives, and the client entry has to keep `'use client'`.
  treeshake: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['react', 'react-dom', /^@wizzard-packages\//],
  tsconfig: resolve(__dirname, 'tsconfig.build.json'),
});
