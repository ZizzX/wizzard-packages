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
  // after the trim, 4958 B once the review's findings were fixed. Where the
  // 478 B sits, each figure taken by removing that piece and re-measuring:
  //
  //   278 B  the seam itself - phase 0.5's `here`, phase 4's `step`, the flow
  //          and scope phases 5 to 7 read, the scope phase 6 hands the loader,
  //          the phase-8 recheck against a `set()` that landed under an await,
  //          phase 9's stack, and the active flow and scope the store hands
  //          `validate`, `load` and the selector.
  //   156 B  the message a flow with a group and no traversal is refused with.
  //   44 B   the scan that finds the group and throws it.
  //
  // The message is the piece that will not move. `AGENTS.md` requires four
  // clauses and a documentation link, and the link alone is 68 characters (101
  // until the pages moved from `docs/errors.md` to the site's `/errors/`). Since
  // L6 that link is built once, in `WizardError`, from the code, and every
  // message in this entry shares it. Dropping to 4.8 kB would have meant
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
  //
  // 5.0 to 5.2 kB on 2026-09-07 for `onAttempt` (docs/designs/devtools.md
  // section 14.1): the navigation wrapper reports each attempt's start and its
  // end or error through the same dispatch `onCommit` uses, so a devtools
  // plugin can explain a refused move that never committed. Measured 5098 B;
  // the shared dispatch helper is where the bytes went, and it is also what
  // keeps the two hooks from drifting apart.
  //
  // 5.2 to 5.6 kB on 2026-09-15 for the diagnostic contract (L6,
  // docs/designs/v1-launch.md): every throw is a `WizardError` carrying code,
  // op, path, fix and url, and its message is four sentences rather than one
  // clause. Measured 5583 B. The class is the smaller part; the rest is the
  // why and the fix of `resolver-not-registered`, `resolver-is-async` and
  // `expr-unknown-operator`, which used to be `unknown resolver: x` - the
  // single-clause message `AGENTS.md` names as the thing the template replaces.
  //
  // 5.6 to 5.65 kB the same day, measured 5.62 kB: `WizardError` answers
  // `instanceof` by shape through `Symbol.hasInstance`. Each entry is bundled on
  // its own and inlines a copy of the class, so without it an error thrown by
  // `/validate-flow` or `/groups` is not an instance of the one imported here.
  // The same 21 to 34 B lands on those two entries.
  //
  // 5.65 to 5.7 kB on 2026-09-16, measured 5697 B: a refused move carries
  // `code` and `url` (D-007). Added once, where `runNav` returns, from the
  // reason, so no refusal site grows. The text is on the six `/errors/nav-*`
  // pages rather than in the result: a refusal is an ordinary outcome and
  // four sentences for each would cost every wizard several hundred bytes.
  //
  // 5.7 to 5.9 kB on 2026-09-16, measured 5858 B: the three messages this entry
  // prints to the console - a plugin disabled, a teardown that threw, an
  // afterNavigate that threw - take the template every failure takes, a why, a
  // fix and a page, instead of naming the symptom. The teardown message names
  // its plugin, which is what the list now carries beside each function. The
  // exit move now guards afterNavigate like a step move: a plugin that threw on
  // the last step used to reject next() and undo `done`.
  // 5.9 to 5.95 kB the same day, measured 5939 B: one `guard` calls every
  // plugin hook the engine does not await, so an async hook whose promise
  // rejects is reported, or disables the plugin, like one that throws.
  // The pipeline also asks before each hook whether its plugin is still
  // enabled, since one can be disabled under an await in the same move.
  // 5.95 to 6.2 kB on 2026-09-17, measured 6152 B: the evaluator stops at 256 levels of
  // nesting and throws `expr-too-deep` with its why and fix, instead of letting a
  // pasted or hostile document overflow the stack with a bare `RangeError`.
  // The sentences are the smaller part; the rest is the depth each evaluator
  // threads through its recursion. Taking the public wrappers out saved 5 B.
  // 6.2 to 6.4 kB on 2026-09-17, measured 6354 B: both evaluators refuse an
  // operand of the wrong shape - `{ $and: null }`, `{ $get: 123 }` - with
  // `expr-invalid-operand` and its why and fix, instead of failing inside with a
  // bare `TypeError`, and `isSync` reads the operator's operand rather than the
  // object's first value. Shortening the sentences saved 20 B; the rest is the
  // shape check and the operand lookup it goes through.
  // 6.4 to 6.6 kB on 2026-09-17, measured 6532 B: a `when` that throws is read
  // as false and logged once as `when-threw`, with its why and fix, instead of
  // stopping every move and throwing again on every snapshot - which in React
  // is a render that cannot recover.
  { name: 'core-v1', path: 'packages/core/src/v1/index.ts', limit: '6.6 kB', gzip: true },

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
  // Measured 2026-09-06 at 2981 B, and most of that is not its own: it calls
  // `resolveNext` and `resolveBack` for a single level rather than reimplementing
  // them, and evaluates `over` and `input` with the expression evaluator, so it
  // pulls `resolve`, `expr`, `path` and the step types in behind it. An
  // application that already imports the engine pays for those once.
  //
  // 3.0 to 3.4 kB on 2026-09-15, measured 3394 B, for the same reason as
  // `core-v1` above and by the same bytes: this entry evaluates expressions, so
  // it carries the evaluator's `WizardError` messages with it. 3.4 to 3.45 kB
  // the same day, measured 3.43 kB, for `Symbol.hasInstance` (see `core-v1`).
  // 3.45 to 3.65 kB on 2026-09-17, measured 3604 B: the evaluator stops at 256 levels of
  // nesting and throws `expr-too-deep` with its why and fix, instead of letting a
  // pasted or hostile document overflow the stack with a bare `RangeError`. The evaluator is
  // bundled into this entry, so the same bytes land here (see `core-v1`).
  // 3.65 to 3.9 kB on 2026-09-17, measured 3856 B: the evaluator refuses an operand
  // of the wrong shape with `expr-invalid-operand` (see `core-v1`), and is bundled
  // into this entry.
  // 3.9 to 4.15 kB on 2026-09-17, measured 4118 B: a `when` that throws is read as
  // false and logged as `when-threw` (see `core-v1`); reachability is bundled here.
  { name: 'core-v1 groups', path: 'packages/core/src/v1/groups.ts', limit: '4.15 kB', gzip: true },

  // The recorded-session checker. Its own entry because replay is a devtools and
  // documentation concern: an application that only runs a wizard never needs to
  // verify a recording of one.
  //
  // Measured 2026-09-06 at 1.03 kB, which is more than the checker's own logic:
  // it walks a stack against the flow, so it pulls `isGroup` and the step types
  // in with it. That is the cost of checking a recording against the definition
  // it claims to belong to, and it is paid only by a page that replays one.
  //
  // 1.1 to 1.2 kB the same day. The frame walk became `checkFrames` and the flow
  // registry `knownFlows`, both exported so `decodeSnapshot` runs the same two
  // rather than a second copy - and the four sentences a bad frame is reported
  // with moved here, out of the walk, because this is the entry that prints
  // them and the snapshot entry never does. Measured 1125 B, where the old
  // 1.1 kB left two bytes of headroom; two bytes is not a budget, so the
  // ratchet moves to where the next honest change can land. The frame walk also
  // resolves each frame from the group enclosing it rather than by name, so a
  // registry key colliding with another definition's id cannot make a correct
  // stack read as drift.

  //
  // 1.2 to 1.7 kB on 2026-09-16, measured 1684 B, for the returned half of
  // the diagnostic contract (L6-4): a problem `checkSession` returns carries a
  // code, a fix and a url, and its message takes the template every failure
  // does - what, why, the fix, the page. Six codes, one per distinct fix, so the
  // four ways a stack can disagree with the flow share one sentence of why and
  // one fix; the bytes are those sentences and the template helper this entry
  // now imports from `diagnostic.ts`.
  //
  // 1.7 to 1.8 kB on 2026-09-17, measured 1794 B: the evaluator stops at 256 levels of
  // nesting and throws `expr-too-deep` with its why and fix, instead of letting a
  // pasted or hostile document overflow the stack with a bare `RangeError`. The evaluator is
  // bundled into this entry, so the same bytes land here (see `core-v1`).
  {
    name: 'core-v1 session',
    path: 'packages/core/src/v1/session.ts',
    limit: '1.8 kB',
    gzip: true,
  },

  // The durable snapshot format. Its own entry because an application that
  // never persists a wizard should not carry the validator that decides whether
  // stored JSON can be trusted - and one that does persist wants it whether or
  // not it draws graphs.
  //
  // Most of it is that validator: a deep copy on the way out, and on the way in
  // a walk that refuses values JSON cannot round-trip, keys that reach a
  // prototype, cycles, and anything past its bounds. Refusing a bad snapshot
  // costs more than writing a good one, which is the right way round.
  //
  // 1.1 to 1.4 kB on 2026-09-06 for the group frames of `group-traversal.md`
  // 4.10. Measured 1.05 kB before, 1377 B after. The decoder now resolves
  // every frame against `knownFlows` and walks each stack with `checkFrames`,
  // both imported from `session.ts` rather than copied: L4a asks for one frame
  // checker, and two would drift the way 0.x's three navigation copies did.
  // `checkSession` is tree-shaken out, and so is every sentence it reports a
  // bad frame with: `checkFrames` yields a kind, a depth and the one fact a
  // caller cannot recover from the stack it passed in, and the recording
  // checker composes the prose. That is 120 B measured, and it is 120 B this
  // entry would have carried to print nothing - the decoder answers
  // `snapshot/unknown-step` and no new reason. What is left is the walk and the
  // flow registry, which is the whole of what a decoder needs.
  {
    name: 'core-v1 snapshot',
    path: 'packages/core/src/v1/snapshot.ts',
    limit: '1.4 kB',
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
  //
  // 1 to 1.3 kB on 2026-09-06 for the two repeat-group reports of
  // `group-traversal.md` 4.5 and 4.10. Measured 887 B before, 1210 B after, and
  // most of it is the two sentences: reachability reads `when` and never
  // `over`, so an unguarded repeat draws a breadcrumb for an empty section, and
  // an unversioned flow with a repeat group cannot refuse a snapshot written
  // before its `keyBy` changed. A report that names neither the cause nor the
  // fix is a report people learn to ignore, and this entry is the one place in
  // the tree where a sentence costs a reader nothing.
  //
  // The remaining ~90 B is the walk that finds them: a repeat inside an inline
  // sub-flow definition is still this flow's to stamp a version for, because
  // `toSnapshot` writes the root's version and no other, so the scan recurses
  // through inline definitions - depth-capped and cycle-guarded by identity,
  // like `graph.ts` and `session.ts`. A string reference names a definition
  // this entry was never handed, and is validated where it is written.
  {
    name: 'core-v1 validate-flow',
    path: 'packages/core/src/v1/validate-flow.ts',
    // 1.3 to 1.45 kB on 2026-09-15, measured 1425 B: `assertFlow` throws a
    // `WizardError` with the code `flow-invalid`, so the class and one sentence
    // of why and fix now ship here too. 1.45 to 1.5 kB the same day, measured
    // 1.47 kB, for `Symbol.hasInstance` (see `core-v1`).
    //
    // 1.5 to 1.9 kB on 2026-09-16, measured 1849 B, for the returned half of
    // the diagnostic contract (L6-3): every problem carries a `code` and the
    // `url` of its page, which is thirteen kebab-case slugs, and the check the
    // evaluator's `expr-unknown-operator` throw needed before a flow runs. That
    // check keeps its own list of the thirteen operators rather than importing
    // one from `expr.ts`, which would pull the evaluator in behind it, and it
    // walks only the fields the engine evaluates, so a `$`-key in `ui` or in a
    // `$ref`'s `args` is not reported.
    //
    // 1.9 to 2.65 kB the same day, measured 2630 B: a returned problem's message
    // takes the template a thrown one does - what, why, the fix, the page - as
    // `AGENTS.md` asks of every failure, so an inspector or an editor rendering
    // the list shows the fix without sending anyone to the site. Thirteen whys
    // and fixes are the bytes; `resolver-not-registered` and
    // `expr-unknown-operator` share their sentences with the evaluator through
    // `diagnostic.ts`, so the two wordings cannot drift apart.
    //
    // 2.65 to 2.7 kB on 2026-09-17, measured 2699 B: an inline sub-flow is
    // checked like the root - its steps and its `order`, and each step's
    // targets, `clearOnLeave` and `when` beside `on.next`, with targets read
    // against that sub-flow's steps - instead of the root alone.
    //
    // 2.7 to 2.85 kB the same day, measured 2830 B: `validateFlow` reports
    // `expr-too-deep` for an expression the evaluator could refuse, counting
    // objects and lists the same way, and both of its walks stop at the limit
    // rather than overflowing the stack on the document they exist to check.
    //
    // 2.85 to 3.05 kB the same day, measured 3043 B: the walk that finds a
    // function became iterative, because `ui` and a `$ref`'s `args` are host
    // data of any depth and a depth limit there let a deep function through. It
    // keeps parent links to build a path only for a report, and it reports a
    // cycle - the one input an unbounded walk would otherwise never leave.
    // 3.05 to 3.1 kB the same day, measured 3060 B: the operator walk skips an
    // object already above it, so a cycle inside an expression is reported once,
    // as `flow-not-serializable`, and not a second time as `expr-too-deep`.
    // 3.1 to 3.15 kB the same day, measured 3099 B: an operator's list of
    // operands is not counted as a value of its own, as the evaluator never
    // walks it, so a list of literals at the limit is not reported while it
    // still evaluates. One byte under 3.1 kB is not a budget.
    // 3.15 to 3.2 kB the same day, measured 3173 B: the serializability walk
    // keeps one frame per open object with the index of its next child, so
    // memory follows depth rather than width (a 500 000-item list used to
    // exhaust a 64 MB heap), a reported path keeps its last 512 characters (a
    // 320 kB document with a problem at every deep leaf used to exhaust 6 GB),
    // and an expression gets one `expr-too-deep` however many branches pass
    // the limit.
    //
    // 3.2 to 3.3 kB on 2026-09-17, measured 3261 B: the serializability walk
    // covers every field of the flow - `validate`, `policy`, a host's own -
    // not only `steps`, and a field pointing back at the flow is one cycle. It
    // is one walk that knows a flow from a step, so a `$ref` or `$get` beside
    // the `steps` of the root or of an inline sub-flow is read as host data
    // rather than checked as a resolver or a path.
    //
    // 3.3 to 3.5 kB the same day, measured 3455 B: every operator's operand is
    // checked for the shape the evaluator reads and reported as
    // `expr-invalid-operand`, with the sentences the evaluator throws.
    //
    // 3.5 to 3.65 kB on 2026-09-18, measured 3608 B: a getter that throws is
    // returned as `flow-unreadable` with what was found before it, rather than
    // thrown out of the function whose answer is a list of problems.
    limit: '3.65 kB',
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
  //
  // react 1.1 to 1.15 kB on 2026-09-15, measured 1119 B: `useWizard` outside a
  // provider throws a `WizardError` whose why and fix say where the provider
  // goes. The class itself is core's and is not counted here. Vue carries the
  // same message and still measures 797 B, under its 800 B.
  //
  // react 1.15 to 1.25 kB and vue 800 to 900 B on 2026-09-16, measured 1211 B and
  // 887 B: a wizard that cannot start says why, what to do and where the page
  // is, rather than "could not start". The message is one string literal in
  // each binding; shared through core it would be a public export for a
  // console line.
  //
  // react 1.25 to 1.45 kB on 2026-09-17, measured 1434 B: a WizardProvider given
  // both a wizard and options throws `provider-wizard-and-options` instead of
  // silently ignoring the options, in every build. It checks a list of the
  // option keys rather than every leftover prop, so `data-*` or a React 19
  // `ref` forwarded by a wrapper is not mistaken for an option.
  {
    name: 'react-v1',
    path: 'packages/react/src/v1/index.tsx',
    limit: '1.45 kB',
    gzip: true,
    ignore: ['react', 'react-dom', '@wizzard-packages/core/v1'],
  },
  {
    name: 'vue-v1',
    path: 'packages/vue/src/v1/index.ts',
    limit: '900 B',
    gzip: true,
    ignore: ['vue', '@wizzard-packages/core/v1'],
  },

  // Devtools without React: the plugin that hears every navigation attempt,
  // the recorder that turns a run into a replayable bundle, and the layout,
  // printer and diff the docs site draws with. Its own entry because a Vue
  // host or a Node test wants exactly this and none of the panel. A
  // development-time dependency, so the budget exists to catch accidental
  // growth, not to fight for bytes; the panel gets its own line when it lands.
  //
  // Measured 2026-09-07 at 3069 B, and again at 3379 B once the review rounds
  // on that PR had landed - the attempt-generation guard, the seen-set the
  // recorder starts from and the whole-shape bundle check. The limit is the
  // second number plus ten percent, so the next honest fix does not spend its
  // first minute on a budget line.
  {
    name: 'devtools headless',
    path: 'packages/devtools/src/headless/index.ts',
    limit: '3.7 kB',
    gzip: true,
    ignore: [
      '@wizzard-packages/core',
      '@wizzard-packages/core/v1',
      '@wizzard-packages/core/graph',
      '@wizzard-packages/core/session',
    ],
  },

  // The panel itself: the React entry, with the headless modules it consumes
  // and the stylesheet it injects. React, the binding and core are the host's,
  // so they are ignored here; what is measured is what devtools adds.
  //
  // Measured 2026-09-07 at 13 308 B; the limit is that plus ten percent.
  //
  // The note's honest expectation was 5-7 kB and the measurement is twice it,
  // so the number is written here with what it bought rather than quietly
  // rounded up. Roughly a third is the headless layer the panel re-exports
  // (3.4 kB on its own line), and the rest is five views over one snapshot -
  // graph, state, activity, inspector, export preview - plus the stylesheet
  // the panel injects, which is a string in the bundle because a .css file
  // would make every consumer configure a bundler for it and inline styles
  // cannot express a focus ring. It is a development-time dependency: the
  // budget catches accidental growth, it is not a fight for bytes.
  {
    name: 'devtools panel',
    path: 'packages/devtools/src/index.ts',
    limit: '14.6 kB',
    gzip: true,
    ignore: [
      'react',
      'react-dom',
      '@wizzard-packages/react',
      '@wizzard-packages/react/v1',
      '@wizzard-packages/core',
      '@wizzard-packages/core/v1',
      '@wizzard-packages/core/graph',
      '@wizzard-packages/core/session',
    ],
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
  //
  // 1.2 to 1.35 kB on 2026-09-16, measured 1323 B: `onRestore` is the host's
  // callback, and one that threw inside `init` disabled the whole plugin, so the
  // session silently stopped being saved. It is now caught and reported once,
  // and so is an async one whose promise rejects.
  {
    name: 'plugins persist',
    path: 'packages/plugins/src/persist.ts',
    limit: '1.35 kB',
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
