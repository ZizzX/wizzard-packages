# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary visitor is a frontend developer who has a multi-step flow that has outgrown
component state. The one recorded persona: a React developer with a five-step signup or
onboarding flow, currently on react-hook-form plus hand-rolled step state, evaluating
alternatives for an afternoon (`docs/designs/flow-inspector.md`). The README names the
moment they arrive: "when a `useReducer` and three `useEffect`s have started disagreeing
about which step you are on."

Two visitors reach the site, and the owner has confirmed that **the showcase leads**:

- **The evaluator** arrives from a link and is comparing against react-hook-form, XState,
  `@stepperize/react`, or a hand-rolled stepper. The homepage has to win them.
- **The implementer** has already decided to try it and needs a start path, recipes for
  React and Vue, and an accurate API reference.

The move from one to the other is a designed moment, not a "Docs" link in the header.

Not established, and not to be invented: solo developers versus teams, company size,
verticals beyond the fixture flows (signup, upgrade, trip booking), and whether the Vue
audience differs from the React one.

## Product Purpose

`wizzard` is a headless multi-step flow engine for React and Vue. A flow is data: a plain
JSON `FlowDefinition` holding order, conditions and validation, plus a registry of named
resolvers for the parts JSON cannot carry. One engine runs it for both frameworks.

Because the flow is data it can be drawn, sent from a server, diffed, and replayed.

The owner's four measures of a successful v1 launch, all four confirmed together:

1. A visitor understands the model without reading source.
2. Installs, and a first working wizard.
3. Trust that the library is built seriously.
4. It is good enough that people share it.

The launch plan adds one measurable target: time-to-hello-world under five minutes, from
the landing page to a working wizard, timed on a person who has not seen the repository,
on both the React and the Vue path (`docs/designs/v1-launch.md`). Whether that has been
measured yet is not recorded.

## Positioning

Three claims a neighbouring library could not copy without rewriting its architecture,
each stated in the README:

- **No stale async transitions.** One navigation is eleven phases of a single pipeline and
  state is written once at the end; every `await` rechecks the navigation epoch, so a slow
  validator that resolves after Back cannot move the visitor. `next()` and `back()` return
  a result (`{ ok: false, reason: 'blocked', by: 'age-check' }`), never a bare boolean.
- **One engine, two bindings.** `@wizzard-packages/react` is 906 B and
  `@wizzard-packages/vue` 646 B, against 8.43 kB and 5.07 kB for their 0.x equivalents. A
  shared contract suite in `contract/` is what stops the two drifting.
- **The flow is JSON.** Definition and state carry no functions, classes or `Set`s, so
  `JSON.stringify(flow)` always round-trips. That is what makes the graph, server-driven
  flows and session replay possible at all.

The README compares publicly against exactly two neighbours: `@stepperize/react` ("smaller
and simpler, and for a linear form it is the right answer") and XState ("a bigger idea than
a wizard, and its visualiser is excellent"). react-hook-form and Formik appear only in an
internal review document; there is no public comparison against them, and none should be
invented.

## Operating Context

Supported: Node 20.11+, TypeScript 5+, React 18+, Vue 3.3+. ESM and CJS, types for both.

Examples that exist: `examples/quickstart` (the reference example, embedded in the README,
run by CI on both bindings) and `examples/next-app` (the devtools panel in Next.js, plus a
headless route that proves the layer works without React). `examples/demo`,
`examples/vue-demo` and `examples/shadcn-ui-connector` are 0.x artifacts; the plan
rewrites the last as a site page about using a design system.

`@wizzard-packages/devtools` is a docked panel answering one question: why is the wizard
where it is. It draws the flow it is standing in, the state it committed, and what it did
to get there, including the moves it refused, which change no state and are therefore
invisible to everything else. It also ships a headless layer the site itself imports.

The site is Astro 7 with Starlight, plain CSS custom properties, no Tailwind and no
component library. React and Vue are present only as island runtimes. It deploys to GitHub
Pages under `/wizzard-packages`.

## Capabilities and Constraints

Terms the site and the packages use for the same things:

- **flow definition** — the JSON-serializable description of a wizard: `id`, `order`,
  `steps`, optionally `version` and `policy`.
- **step** — a node with a `label` and optional `when`, `validate`, `on`, `deferred`.
- **when** — a step's reachability predicate, an expression such as
  `{ $eq: [{ $get: 'data.payer' }, 'business'] }`.
- **on.next / on.back** — a per-step navigation override.
- **repeat group** — a sub-flow entered once per item of a collection, via
  `repeat: { over, keyBy }`, resolved through `subFlows`.
- **snapshot** — a versioned contract for restoring a session, with named transient fields.
- **plugin** — a hook into the navigation and commit pipeline.
- **registry** — the named resolvers for everything a flow cannot serialize.
- **navigation epoch** — what keeps a stale async result from moving the visitor.

Hard technical constraints:

- `@wizzard-packages/core` has no dependencies. Ever.
- Every `core` sub-entry carries its own size budget; adding an entry means a tsup entry, an
  `exports` key and a `.size-limit.js` line in the same change.
- Current budgets (gzip): `core` 3.92 kB, `react` 927 B, `vue` 660 B, `validate` 317 B,
  `core/graph` 754 B.
- Graph nesting stops at 32 levels.

Explicitly out of scope for 1.0.0: the `@wizzard-packages/compat` package (cut on measured
downloads), every plugin except `/persist`, server-driven flows as a feature, AI flow
generation, MCP, a CLI, Svelte and Solid bindings, an a11y contract inside the bindings,
inspector state in the URL, a blog, and a change of hosting. A third engine rewrite is
forbidden outright.

Two contradictions inside the repository that the site must not inherit: the root
`README.md` documents the v1 API while `packages/core/README.md` still documents the 0.x
`WizardStore` class API, and `docs/API_REFERENCE.md` is a 0.x document still present. The
v1 API is the product truth; the 0.x documents are pending teardown.

## Brand Commitments

The library is **wizzard**, lowercase. Never "Wizzard.js", never a mascot.

Writing is plain prose. No emoji, no icon bullets, no exclamation marks. A heading says
what the section is, not what it will do for you. A control's label is the verb that
happens. An error says what the library refused and which field it named.

Every error the library produces follows one shape:
`[wizzard] <what went wrong>. <why>. <the fix>. <docs url>#<code>`.

No assistant, model or vendor is ever named in code, comments, commit messages, pull
request descriptions, changesets, docs or release notes.

Conversation and planning happen in Russian; everything committed to the repository is in
English.

The owner's binding constraint on this surface, given in answer: **no decoration**. No
gradients, no glass, no shadows, no icon standing in for a word. This rules the borrowed
material too: a component or motion technique that arrives wearing decoration is refused,
however good it looks elsewhere.

The launch plan states the same rule as an anti-goal: no default palette, no default font
stacks, and no three-column feature grid anywhere on the site.

## Evidence on Hand

Real numbers that exist and may be shown:

- Bundle sizes, gzip: `core` 3.92 kB, `react` 927 B, `vue` 660 B, `validate` 317 B,
  `core/graph` 754 B. The 0.x comparison: react 8.43 kB, vue 5.07 kB.
- 239 engine tests, including property tests.
- Monthly npm downloads at the time the compat decision was made: core 37, react 35, vue 7.
- Contrast at least 4.5:1 for text and 3:1 for state-carrying borders, gated by `axe` in CI.

Real material that exists and can be shown working: the three reference flows R-A (a `when`
branch, a `back` override, a validator), R-B (a deferred step and a `when` the data leaves
false) and R-C (a repeat group over passengers with a colliding key), all in
`contract/fixtures.ts`; the devtools panel; the headless layout and printer the site
imports.

What does **not** exist and must not be fabricated: performance benchmarks, a test-coverage
percentage, user testimonials, case studies, logos of adopting companies, a bundle-size
comparison table against react-hook-form or Formik, and any confirmation that the
five-minute time-to-hello-world target has been met.

## Product Principles

1. **The flow is data.** Every product decision follows from a definition you can read,
   diff and send. A feature that only works when the flow is code is the wrong feature.
2. **Show the mechanism, do not describe it.** The library's argument is visible in a
   running graph; a page that claims it in prose has not made the argument.
3. **Refusals are results, not failures.** What the engine declined to do is information
   the product surfaces on purpose, in the site, the panel and the error text alike.
4. **One engine, no drift.** React and Vue get the same names and the same behaviour, and
   the contract suite is what proves it rather than good intentions.
5. **Nothing decorative earns its bytes.** Every element on a page and every byte in a
   package is there because it does work.

## Accessibility & Inclusion

Established and enforced for the site: `axe` gates every page in CI; contrast at least
4.5:1 for text and 3:1 for borders that carry state; touch targets at least 44px on the
scrubber, navigation and example controls; body text at least 16px; focus rings never
removed; step changes and validation results announced through `aria-live="polite"`; colour
never the only carrier of meaning; keyboard-only Playwright specs planned for the reference
applications.

Not established: an a11y contract inside the React and Vue bindings themselves. ARIA props
and focus management in the hooks are explicitly outside 1.0.0, so the site may not claim
the library makes a host's wizard accessible.
