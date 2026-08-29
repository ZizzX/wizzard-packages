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
  // The 4 kB destination is now in question — group and repeat traversal is
  // still to come. That decision is tracked, not fudged: see the budget task.
  { name: 'core-v1', path: 'packages/core/src/v1/index.ts', limit: '3.9 kB', gzip: true },

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
