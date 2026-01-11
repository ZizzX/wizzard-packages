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
  external: ['react', 'react-dom', '@wizzard-packages/core', '@wizzard-packages/middleware', '@wizzard-packages/persistence'],
  tsconfig: resolve(__dirname, 'tsconfig.build.json'),
});
