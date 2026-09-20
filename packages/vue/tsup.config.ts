import { defineConfig } from 'tsup';

export default defineConfig({
  // One entry, served under both the root export and `./v1`.
  entry: ['src/v1/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['vue', '@wizzard-packages/core'],
});
