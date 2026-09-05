/**
 * Bundle budgets, in gzipped bytes.
 *
 * The 0.x entries are a ratchet, not a target: each limit sits just above what
 * that package measures today, so any accidental growth fails the build. They
 * are deleted as their v1 replacements land.
 *
 * v1 targets, for reference while the new packages are built:
 *   @wizzard/core 4.0 kB · react 1.5 kB · vue 1.5 kB · validate 0.6 kB
 *   @wizzard/plugins 0.8 kB per entry
 *
 * Today core is 4.09 kB while react is 8.48 kB — the framework layer is twice
 * the size of the engine it wraps, which is the duplication v1 removes.
 */
export default [
  // The v1 engine, measured from source while it is built. A ratchet like the
  // rest: it sits just above what is there now, so growth has to be deliberate.
  //
  // Cumulative cost by module, measured 2026-08-29:
  //   path 279 B, expr 929 B, resolve 1.07 kB, navigate 2.44 kB, store 3.86 kB
  // The pipeline is the expensive part at roughly 1.4 kB of its own, which is
  // fair: it is the eleven phases everything else delegates to.
  //
  // Group and repeat traversal is not in this entry and never will be: it goes
  // behind its own export, so a flow that has no sub-flows pays nothing for the
  // machinery that walks them. That is what keeps the main entry inside 4 kB.
  //
  // Raised from 3.9 kB to the roadmap's 4.0 kB on 2026-09-06 for `start`: a
  // fresh engine has an empty stack, so before it existed a binding rendered
  // nothing until the user pressed Next. Twenty-one bytes for the difference
  // between a wizard that shows its first step and one that shows nothing.
  { name: 'core-v1', path: 'packages/core/src/v1/index.ts', limit: '4 kB', gzip: true },

  // The graph builder. Its own entry for the same reason validate-flow is:
  // structure-only drawing is a development and inspection concern, and a
  // wizard that never draws itself should not carry the code that would.
  { name: 'core-v1 graph', path: 'packages/core/src/v1/graph.ts', limit: '800 B', gzip: true },

  // The recorded-session checker. Its own entry because replay is a devtools and
  // documentation concern: an application that only runs a wizard never needs to
  // verify a recording of one.
  //
  // Measured 2026-09-06 at 1.03 kB, which is more than the checker's own logic:
  // it walks a stack against the flow, so it pulls `isGroup` and the step types
  // in with it. That is the cost of checking a recording against the definition
  // it claims to belong to, and it is paid only by a page that replays one.
  { name: 'core-v1 session', path: 'packages/core/src/v1/session.ts', limit: '1.1 kB', gzip: true },

  // Development and server-driven use only. Measured, but never counted against
  // the runtime budget, because shipping it to a browser is a mistake the
  // separate entry makes hard to commit by accident.
  {
    name: 'core-v1 validate-flow',
    path: 'packages/core/src/v1/validate-flow.ts',
    limit: '1 kB',
    gzip: true,
  },

  // The v1 bindings, measured from source. The budget is 1.5 kB each, and the
  // point of the whole rewrite is that they can be: navigation lives in the
  // engine, so a binding only bridges a store into a framework.
  //
  // Measured 2026-08-30: react 906 B against 8.43 kB for the 0.x layer, vue
  // 646 B against 5.07 kB. The limits below are the ratchet, not the target.
  {
    name: 'react-v1',
    path: 'packages/react/src/v1/index.tsx',
    limit: '1 kB',
    gzip: true,
    ignore: ['react', 'react-dom', '@wizzard-packages/core/v1'],
  },
  {
    name: 'vue-v1',
    path: 'packages/vue/src/v1/index.ts',
    limit: '700 B',
    gzip: true,
    ignore: ['vue', '@wizzard-packages/core/v1'],
  },

  // One adapter for every Standard Schema vendor, replacing the two 0.x
  // adapter packages below. Measured from source like the rest of v1; the
  // schema library itself is the consumer's, never bundled here.
  { name: 'validate', path: 'packages/validate/src/index.ts', limit: '400 B', gzip: true },

  { name: 'core', path: 'packages/core/dist/index.js', limit: '4.2 kB', gzip: true },
  {
    name: 'react',
    path: 'packages/react/dist/index.js',
    limit: '8.6 kB',
    gzip: true,
    ignore: ['react', 'react-dom'],
  },
  { name: 'vue', path: 'packages/vue/dist/index.js', limit: '5.2 kB', gzip: true, ignore: ['vue'] },
  { name: 'middleware', path: 'packages/middleware/dist/index.js', limit: '650 B', gzip: true },
  { name: 'persistence', path: 'packages/persistence/dist/index.js', limit: '500 B', gzip: true },
  {
    name: 'adapter-zod',
    path: 'packages/adapter-zod/dist/index.js',
    limit: '250 B',
    gzip: true,
    ignore: ['zod'],
  },
  {
    name: 'adapter-yup',
    path: 'packages/adapter-yup/dist/index.js',
    limit: '250 B',
    gzip: true,
    ignore: ['yup'],
  },
];
