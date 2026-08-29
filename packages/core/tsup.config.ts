import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  // v1 ships as its own entry so it can be tried from canary without
  // touching the 0.x surface, and so validate-flow stays out of runtime bundles.
  entry: ['src/index.ts', 'src/v1/index.ts', 'src/v1/validate-flow.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: [],
  tsconfig: resolve(__dirname, 'tsconfig.build.json'),
  treeshake: true,
});
