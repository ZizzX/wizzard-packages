import { defineConfig } from 'tsup';

export default defineConfig({
  // v1 ships as its own entry, so it can be tried from canary without
  // disturbing the 0.x surface.
  entry: ['src/index.ts', 'src/v1/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: [
    'vue',
    '@wizzard-packages/core',
    '@wizzard-packages/middleware',
    '@wizzard-packages/persistence',
  ],
});
