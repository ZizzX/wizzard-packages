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
  // Group and repeat traversal is behind `@wizzard-packages/core/groups`, its
  // own entry with its own budget below, so the machinery that pushes, advances
  // and prunes frames is not here. The seam that installs it is: phase 0.5 asks
  // the traversal which flow owns the current frame, phase 4 asks it for the
  // move, phase 8 asks it again when the data moved under an await, phase 9
  // commits the stack it returned, and `createWizard` refuses a group when
  // nothing is installed. That seam is in this entry and costs what the raise
  // below states. The flat path through all of it is unchanged.
  //
  // Raised from 3.9 kB to the roadmap's 4.0 kB on 2026-09-06 for `start`: a
  // fresh engine has an empty stack, so before it existed a binding rendered
  // nothing until the user pressed Next. Twenty-one bytes for the difference
  // between a wizard that shows its first step and one that shows nothing.
  //
  // Raised again the same day, 4.0 to 4.3 kB, for the plugin lifecycle. The
  // 4.0 came from a plan written before the contract existed, and persistence
  // is in 1.0.0: `init` and `onCommit` on every write path, with a throwing
  // plugin disabled rather than taking the write down with it, is what makes
  // a persist plugin possible at all. Two hundred bytes, once, for every
  // plugin the library will ever have.
  //
  // 4.3 to 4.5 kB on 2026-09-06 for `clearOnLeave`: an immutable delete on a
  // path and its application in the navigation commit, 133 bytes measured.
  // The 4.3 had 34 bytes of headroom, and the field was already promised by
  // the API behaviour table and the "clear abandoned branch data" task page.
  //
  // Held at 4.5 kB on 2026-09-06 while the back stack was made to behave like
  // one: history is pushed on a forward move and truncated to the record the
  // backward move actually lands on, and `canBack` is now `resolveBack`'s
  // answer rather than a count that disagreed with it. Forty bytes, measured
  // 4.47 kB, for a Back button that means what it says.
  //
  // 4.5 to 5.0 kB on 2026-09-06 for the group traversal seam. Measured, then
  // trimmed and measured again: 4.48 kB before, 4991 B on the first pass, 4938 B
  // after the trim. Where the 458 B sits, each figure taken by removing that
  // piece and re-measuring:
  //
  //   258 B  the seam itself - phase 0.5's `here`, phase 4's `step`, the flow
  //          and scope phases 5 to 7 read, the phase-8 recheck against a
  //          `set()` that landed under an await, phase 9's stack, and the
  //          active flow the store hands `validate`, `load` and the selector.
  //   156 B  the message a flow with a group and no traversal is refused with.
  //   44 B   the scan that finds the group and throws it.
  //
  // The message is the piece that will not move. `AGENTS.md` requires four
  // clauses and a documentation link, and the link alone is 101 characters. It
  // is the only such URL in this entry, so hoisting it into a shared `DOCS`
  // constant would have nothing to share it with. Dropping to 4.8 kB would mean
  // deleting seven eighths of that message or half the seam, and neither is a
  // size decision.
  //
  // The trim that paid was structural, not verbal: comparing the two stacks of
  // the phase-8 recheck by serializing them rather than walking them frame by
  // frame, and writing `groups`/`subFlows` onto the nav context as plain
  // properties instead of two conditional spreads, together 44 B. Shortening
  // the message bought 5 B. Hoisting `ctx.hooks ?? []` and inlining the `back`
  // intent were tried and reverted: both cost 3 B, because gzip already prices
  // a repeated literal lower than a new identifier.
  { name: 'core-v1', path: 'packages/core/src/v1/index.ts', limit: '5.0 kB', gzip: true },

  // The graph builder. Its own entry for the same reason validate-flow is:
  // structure-only drawing is a development and inspection concern, and a
  // wizard that never draws itself should not carry the code that would.
  { name: 'core-v1 graph', path: 'packages/core/src/v1/graph.ts', limit: '800 B', gzip: true },

  // Group and repeat traversal. Its own entry for the reason the budget note
  // above gives: it walks sub-flows, and a flat flow has none to walk. Two pure
  // functions - where the wizard is standing, and the whole of a move as a
  // stack the pipeline commits - plus the item keying, the pruning of dead
  // frames and the `END`-by-depth rule that the invariants in
  // `docs/designs/group-traversal.md` describe.
  //
  // Measured 2026-09-06 at 2917 B, and most of that is not its own: it calls
  // `resolveNext` and `resolveBack` for a single level rather than reimplementing
  // them, and evaluates `over` and `input` with the expression evaluator, so it
  // pulls `resolve`, `expr`, `path` and the step types in behind it. An
  // application that already imports the engine pays for those once.
  { name: 'core-v1 groups', path: 'packages/core/src/v1/groups.ts', limit: '3.0 kB', gzip: true },

  // The recorded-session checker. Its own entry because replay is a devtools and
  // documentation concern: an application that only runs a wizard never needs to
  // verify a recording of one.
  //
  // Measured 2026-09-06 at 1.03 kB, which is more than the checker's own logic:
  // it walks a stack against the flow, so it pulls `isGroup` and the step types
  // in with it. That is the cost of checking a recording against the definition
  // it claims to belong to, and it is paid only by a page that replays one.
  { name: 'core-v1 session', path: 'packages/core/src/v1/session.ts', limit: '1.1 kB', gzip: true },

  // The durable snapshot format. Its own entry because an application that
  // never persists a wizard should not carry the validator that decides whether
  // stored JSON can be trusted - and one that does persist wants it whether or
  // not it draws graphs.
  //
  // Most of it is that validator: a deep copy on the way out, and on the way in
  // a walk that refuses values JSON cannot round-trip, keys that reach a
  // prototype, cycles, and anything past its bounds. Refusing a bad snapshot
  // costs more than writing a good one, which is the right way round.
  {
    name: 'core-v1 snapshot',
    path: 'packages/core/src/v1/snapshot.ts',
    limit: '1.1 kB',
    gzip: true,
  },

  // The typed expression builder. Its own entry because it is an authoring
  // concern: `eq(get('data.plan'), 'pro')` compiles to the JSON the evaluator
  // reads, so a flow that arrives as JSON was built elsewhere and its runtime
  // pays nothing for the functions that would have written it.
  //
  // Measured 2026-09-06 at 147 B: thirteen one-line functions and a type.
  {
    name: 'core-v1 expr',
    path: 'packages/core/src/v1/expr-builder.ts',
    limit: '200 B',
    gzip: true,
  },

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
  //
  // Both moved on 2026-09-06, react 1 to 1.1 kB and vue 700 to 800 B, for two
  // things a binding does have to own: starting the engine when it mounts, and
  // destroying the one it created so a plugin's teardown runs. The React side
  // costs a little more because StrictMode mounts twice against one instance
  // and the provider has to notice an engine it already tore down. Both stay
  // far under the 1.5 kB the rewrite budgeted for them.
  {
    name: 'react-v1',
    path: 'packages/react/src/v1/index.tsx',
    limit: '1.1 kB',
    gzip: true,
    ignore: ['react', 'react-dom', '@wizzard-packages/core/v1'],
  },
  {
    name: 'vue-v1',
    path: 'packages/vue/src/v1/index.ts',
    limit: '800 B',
    gzip: true,
    ignore: ['vue', '@wizzard-packages/core/v1'],
  },

  // The persist plugin, measured from source like the rest of v1.
  //
  // The roadmap budgeted 0.8 kB per plugin before any of them existed. This one
  // is 1.18 kB, and the difference is entirely the failure paths: a browser
  // that refuses storage, a quota that fills, a value corrupted in place, a
  // pending write flushed when the page goes away, and four diagnostics that
  // name a cause and a fix rather than a symptom. Those are the reason a
  // persistence plugin is worth having rather than fifteen lines of
  // localStorage in an application.
  {
    name: 'plugins persist',
    path: 'packages/plugins/src/persist.ts',
    limit: '1.2 kB',
    gzip: true,
    ignore: ['@wizzard-packages/core/v1', '@wizzard-packages/core/snapshot'],
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
