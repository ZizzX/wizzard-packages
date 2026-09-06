import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  // v1 ships as its own entry so it can be tried from canary without
  // touching the 0.x surface, and so validate-flow, graph, session and the
  // expression builder stay out of runtime bundles: a wizard that never draws,
  // replays or authors itself should not carry the code that would.
  entry: [
    'src/index.ts',
    'src/v1/index.ts',
    'src/v1/validate-flow.ts',
    'src/v1/graph.ts',
    'src/v1/session.ts',
    'src/v1/groups.ts',
    'src/v1/snapshot.ts',
    'src/v1/expr-builder.ts',
  ],
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
