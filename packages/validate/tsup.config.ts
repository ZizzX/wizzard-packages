import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['@wizzard-packages/core'],
});
