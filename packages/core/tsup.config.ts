import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  // v1 ships as its own entry so it can be tried from canary without
  // touching the 0.x surface, and so validate-flow and graph stay out of
  // runtime bundles: a wizard that never draws itself should not carry the
  // code that would.
  entry: ['src/index.ts', 'src/v1/index.ts', 'src/v1/validate-flow.ts', 'src/v1/graph.ts'],
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
