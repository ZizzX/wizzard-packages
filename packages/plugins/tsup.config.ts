import { defineConfig } from 'tsup';

export default defineConfig({
  // One entry per plugin, never a barrel: a flow that persists nothing should
  // not carry the code that would.
  entry: ['src/persist.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['@wizzard-packages/core'],
});
