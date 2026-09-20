import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  // Every entry is its own budget: validate-flow, graph, session and the
  // expression builder stay out of runtime bundles, because a wizard that
  // never draws, replays or authors itself should not carry the code that
  // would. The root export is an alias of `v1`, served from these same files.
  entry: [
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
