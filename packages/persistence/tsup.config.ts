import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['@wizzard-packages/core'],
  tsconfig: resolve(__dirname, 'tsconfig.build.json'),
  treeshake: true,
});
