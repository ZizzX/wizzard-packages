<!-- /autoplan restore point: /c/Users/Aziz/.gstack/projects/ZizzX-wizzard-packages/ZizzX-main-autoplan-restore-20260906-011749.md -->

# Design: v1 launch — the library, the README and the site, written as one product

Date: 2026-09-06. Branch: `ZizzX/main` at `4078c1c`. Supersedes the "Next Steps" list in
[`flow-inspector.md`](flow-inspector.md), which this document absorbs; the inspector stays
the showcase, it is no longer the whole plan. Amended during the `/autoplan` review of the
same day; the review itself follows the plan in this file.

## Problem Statement

The repository holds two libraries under one name. `packages/core/src/v1`, the v1 bindings
in `packages/react/src/v1` and `packages/vue/src/v1`, and `packages/validate` are the
rewrite: flow as data, one engine, contract-tested bindings, 3.88 kB for core. Everything a
visitor can see is still the other library: `README.md` documents `WizardStore` and
`createWizardFactory` — neither exists in the v1 bindings — the site in `packages/ui`
renders 0.x examples, the StackBlitz templates install `adapter-zod` and `middleware`, and
`examples/demo` imports all of it.

`defineFlow` — the entry point of the v1 API — appears in no README, no example and no page.
Time-to-hello-world for v1 is not slow; it is undefined.

The owner's direction on 2026-09-06, verbatim in intent: **this is a new library.** Write it,
its README and its examples site from scratch, to the best standard the ecosystem has, tear the
old UI down completely, and carry 0.x forward only where a concrete need exists. The current
README "reads as machine-written"; the current site is a 0.x artefact. Neither is a base.

This document is the plan for that, plus the audit of `AGENTS.md` the owner asked for.

## What "done right" means here

Repository cleanliness — zero warnings, byte budgets, matching snippets — measures
discipline, not whether the abstraction holds. The release evidence for 1.0.0 is therefore
**three demanding reference applications**, built in this repository, run on both bindings,
and shown live on the site:

| Ref | Application                                                                                                                                                                               | What it proves                                                                                               |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| R-A | **Onboarding with conditional branches and backtracking** — payer type decides the route, the user goes back across a branch, data from the abandoned branch is cleared or kept by policy | `when`, `on.next[]`, `back()` across branches, the working back-stack, `dirty`/`completed` selectors         |
| R-B | **Reloadable application with async validation** — a form that survives F5 mid-way, validates a field against an async resolver, and is not corrupted by a reload during that validation  | the persist plugin's snapshot contract, `busy` and the navigation epoch, `hydrateMismatch` on a version bump |
| R-C | **Editable repeated section** — "one block of steps per passenger", add and remove passengers, edit the second one after finishing the third                                              | `GroupStep` with `repeat`, frame stack traversal, group entry and exit                                       |

Every workaround needed to build one of these is a finding against the engine, filed
before 1.0.0. The three applications replace the fifteen 0.x Playwright specs as the
behavioural coverage of the library, and they are the site's examples, so nothing is shown
that the engine cannot run.

## What is already true (do not rebuild)

| Sub-problem                                                                         | Exists today                                                                                                                                 | Reused?                                        |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Engine: expressions, resolver, 11-phase navigation, atomic commit, selectors, store | `packages/core/src/v1/{expr,resolve,navigate,commit,select,store,state,path}.ts`, 239 tests incl. property tests                             | yes — the library **is** this                  |
| Authoring + validation                                                              | `define.ts`, `validate-flow.ts` (own entry)                                                                                                  | yes                                            |
| Flow graph builder                                                                  | `graph.ts` (own entry, PR #23–#24): groups, repeat badges, `opaque` markers, `MAX_DEPTH = 32`, synthesized `END` edge                        | yes — the site renders it                      |
| Recorded session checker                                                            | `session.ts` + `checkSession` (PR #25–#26), no build entry yet                                                                               | yes — replay fixture guard                     |
| Bindings                                                                            | `react/src/v1/index.tsx`, `vue/src/v1/index.ts`, shared `contract/` suite, 906 B / 646 B                                                     | yes                                            |
| Validation adapter                                                                  | `packages/validate` — one Standard Schema adapter, 317 B                                                                                     | yes                                            |
| Plugin contract                                                                     | `store.ts:30` `plugins?: readonly Hooks[]`                                                                                                   | yes — the persist plugin is written against it |
| Quality gates                                                                       | eslint strict + `no-restricted-syntax` on state writes, prettier, tsc, publint, attw, size-limit ratchet, coverage, playwright, `check:pack` | yes, unchanged                                 |
| Contributor rules                                                                   | `AGENTS.md` (92 lines)                                                                                                                       | yes, amended — see audit                       |
| Publishing                                                                          | changesets, canary on merge, token rotated and verified, registry check (#19)                                                                | yes                                            |

**There will be no third rewrite.** "From scratch" applies to the README, the site and the
examples — and to deleting 0.x, not to `packages/core/src/v1`. The v1 engine passed its own
size spike, its race matrix and a four-phase review on 2026-09-03; rewriting it again would
be the 0.x mistake in reverse. What the engine still owes 1.0.0 is listed in track L, and R-C
decides the one open engine feature (group traversal) — see the gate.

## Premises

1. **1.0.0 ships one library.** After this plan, no 0.x source remains in any published
   package. `@wizzard-packages/compat` stays cut (decided 2026-09-03 on measured downloads:
   core 37/month, react 35, vue 7). Users on 0.x get a migration guide and `npm deprecate`
   notices, not a shim. D2 adds the check that downloads do not make: a GitHub code search
   for dependents, dated, in the guide.
2. **The site is a product surface, not a docs dump.** Its first screen is the flow inspector
   (design in `flow-inspector.md`) running a real flow; every example on it is real code from
   the repository rendered live. React and Vue are both first-class: the visitor picks one
   once, the choice is remembered across docs, examples and install lines, a page mounts one
   runtime at a time, and comparing the two is an explicit toggle, not the default.
3. **The README is written by hand, for a person skimming on npm.** It is short, specific,
   makes outcome claims the reference applications demonstrate, and never lists features that
   do not exist.
4. **Persistence is a 1.0.0 blocker, as a contract, not as a package.** Deleting
   `packages/persistence` while deferring the `/persist` plugin leaves 1.0.0 with no way to
   survive a reload — a regression from the version being deprecated. What ships is a
   **versioned durable snapshot contract** in core plus one plugin that stores it.
   The engine owes that plugin a lifecycle it does not have today (L0), which the review found
   by reading the code: `Hooks` (`navigate.ts:53-64`) has only `beforeNavigate`,
   `afterNavigate` and `loadStep`, and `store.ts:134` passes plugins to the navigation host
   alone, so a field edit through `set()` fires no plugin at all.
5. **The engine gaps that produce first-week bug reports close before the site is public:**
   typed generics through `createWizard` (`wizzard-13`), `"use client"` surviving the build
   (`wizzard-14`). Both are source-level fixes with no publish dependency (cross-phase Theme 1
   of the last review).
6. **The inspector draws only what the engine runs.** Whatever the gate decides about group
   traversal, a 1.0.0 `FlowDefinition` the engine cannot execute must fail `validateFlow` with
   a named problem, and the inspector must not present it as runnable.

## The `AGENTS.md` audit

Benchmarked against the agents.md convention (short, imperative, runnable commands, project
map, conventions, PR rules, pointers to deeper docs) and against what the last five PRs
actually needed.

**Verdict: keep it. It is good, not naive.** The hard rules are specific and checkable; rule 2
(all state mutation in `commit.ts`) is enforced by a real `no-restricted-syntax` selector in
`eslint.config.js` with a comment explaining it; the Scope and "every block ships with its
check" clauses are exactly the two things review bots keep re-discovering. Ninety-two lines
is the right length. What follows are amendments, not a rewrite.

| #   | Gap                                                     | Evidence                                                                                                                                                        | Amendment                                                                                                                                                                                                                                             |
| --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | No project map                                          | A new contributor cannot tell from the file that the engine is `packages/core/src/v1` and everything else in `core/src` is 0.x                                  | Add a ten-line "Where things live" section; delete it again when 0.x is gone and the tree is self-explanatory                                                                                                                                         |
| A2  | Only whole-repo commands                                | Every gate listed is `pnpm <gate>` for all packages; PRs #22–#26 needed single-package, single-file runs (`pnpm -F @wizzard-packages/core test:run -- session`) | Add per-package and single-file forms next to each gate                                                                                                                                                                                               |
| A3  | Budget boundaries are tribal knowledge                  | `validate-flow`, `graph`, `session` must never be re-exported from `v1/index.ts` (core-v1 sits at 3.88 kB of 3.9 kB). Learned twice, written nowhere            | New hard rule 6: every `core` sub-entry is its own budget; adding one means tsup entry + `exports` + `.size-limit.js` in the same PR. Budgets are ratchets set _after_ correctness, raised with a stated reason — never a target that trims semantics |
| A4  | Error messages have no template                         | DX review T22: every throw site is single-clause (three in core, two in the bindings today). The template needs a fourth clause: a link                         | `[wizzard] <problem>. <cause>. <fix>. <docs-url>#<code>` — added to Working agreement, checked by a grep in CI                                                                                                                                        |
| A5  | The automated PR review is undocumented                 | Codex reviews every PR and its comments are reachable only through `gh api …/pulls/<n>/comments`; 6-for-6 correct across #25–#26                                | One paragraph under Working agreement: green CI is necessary, the review is the second gate; fetch and verify each finding                                                                                                                            |
| A6  | "The 0.x line is in maintenance"                        | True today, false after this plan                                                                                                                               | Reword at teardown time                                                                                                                                                                                                                               |
| A7  | Issue tracker ids are undiscoverable                    | Reviewer concern in `flow-inspector.md`; `tasks/session-state.md` uses an older scheme                                                                          | Point at `.beads/issues.jsonl` and the `wizzard-N` scheme; retire `tasks/session-state.md`                                                                                                                                                            |
| A8  | No "definition of done" for a PR                        | Whether a changeset is required is decided per PR by memory (v1: none until 1.0.0)                                                                              | Three lines: tests, changeset rule, size ratchet reason in the PR body                                                                                                                                                                                |
| A10 | No single verification command or stated toolchain pins | Contributors run five commands from memory; Node/pnpm pins live only in `package.json`                                                                          | `pnpm verify` (= lint + type-check + test:run) named as the pre-PR command; the pins and the support matrix (Node >= 20.11, TS >= 5, React >= 18, Vue >= 3.3) stated once                                                                             |
| A9  | Binding naming asymmetry is unexplained                 | `WizardProvider` (React component) vs `provideWizard` (Vue function) is idiomatic per framework; a contributor writing D4 could "fix" it into false consistency | One line: per-framework idiom wins over cross-framework symmetry; hook names stay identical                                                                                                                                                           |

Everything else stands as written. The file stays the single source of truth; `CLAUDE.md`
keeps only skill routing.

## Approaches Considered

### Approach A: Finish the inspector chain, then polish docs

Run `flow-inspector.md` Next Steps 4–9 as written, rewrite the README last, keep `packages/ui`
and add the inspector as a route.

Effort: M. Risk: Med. Reuses everything.
Pros: shortest path to a public showcase; the previous review already scoped it.
Cons: keeps the 0.x site shell (react-router + react-markdown, 990 lines of 0.x examples)
under a v1 showcase — exactly the "front door onto a house with no hallway" the last review
named; the README stays last, so the npm page keeps teaching the deprecated API for the
whole build.

### Approach B: Teardown first, site second, docs last

Delete every 0.x source, package, example and template in one PR, then build the new site
against a clean tree, then write the README from the site's examples.

Effort: L. Risk: Med. Reuses the engine unchanged.
Pros: the site and README are written against one library, never against the mixture; the
ESLint quarantine block, four `.size-limit.js` entries and two deploy workflows die with the
code; every later PR is smaller.
Cons: the public site and the README go dark (or stay misleading) for the duration; the
teardown PR is large and touches CI; deletes fifteen behavioural specs before anything
replaces them.

### Approach C: Three parallel tracks with one integration order — **chosen**

Treat the library, the site and the docs as three tracks that each land in small PRs, with a
fixed integration order that makes the _visible_ surfaces flip together, and a release
candidate boundary before the switch:

```
 owner (day 0)       R3 branch protection + GH_PAT -- in parallel with everything below
 track L (library)   L1 wiring -> L2/L2b typing + builder -> L3 "use client" -> L0 hook lifecycle -> L4a snapshot decoder -> L4b persist -> L10 clearOnLeave -> L9 groups (gate, design note first) -> L5 devtools -> L6 diagnostics -> L7 tests -> L8 teardown + root-export flip
 track S (site)      S1 shell -> S2 inspector (live / replay / preview) -> S3 three reference apps -> S4 docs -> S5 API
 track D (docs)      D1 AGENTS.md -> D3 README (from examples/quickstart, early, @canary + /v1 imports) -> D2 MIGRATION -> D4 package READMEs
                                                                                       |
 RC boundary         R0: AFTER L8 -- the FINAL 1.0.0 artefacts, packed and published to `next`, installed into four clean consumer fixtures (root, root+alias mixed, ESM, CJS)
                                                                                       |
 integration         S6 deploy switch + D5/D6 within one day of R0
 release             R1 promotes the SAME version to `latest` (npm dist-tag add) -- no rebuild -> R2 npm deprecate
```

Effort: L. Risk: Low–Med. Reuses everything Approach A does.
Pros: every PR is reviewable; the engine gaps close first (Premise 5); the new site is built
in a fresh package (`site/`, not `packages/ui`) so the old one keeps serving until the switch;
the README is written from a tested example file, so the two never disagree; the old specs
are deleted only after the reference applications cover their behaviour.
Cons: three tracks need discipline about the integration order; the plan is longer to read.

### Alternatives considered and rejected on explicit grounds

- **Library release with task-oriented docs first, inspector later.** Rejected: the inspector
  is a route in the same static site and reads the same `FlowDefinition`; deferring it saves
  S2 only, and S2 is what makes the first ten seconds different from every competitor.
- **Inspector in the site only, no published devtools.** Held as a gate decision (see Open
  Questions); the owner scoped devtools into 1.0.0 on 2026-08-29.
- **A documentation shell (Starlight / VitePress default theme) instead of a designed site.**
  Partly accepted: the recommended stack _is_ a documentation shell (Astro + Starlight) with
  the inspector and examples as islands; what is rejected is the shell's default look.
- **Soft-launch on the existing `packages/ui`.** Rejected: 990 lines of react-router pages
  whose content is 0.x; keeping the shell keeps the content.

## Recommended Approach

**C.** The deciding argument is that the two failure modes of A and B are both sequencing
failures: A ships a v1 showcase over a 0.x shell, B goes dark and deletes coverage before
replacing it. C builds the new site beside the old one, proves the packed packages in clean
fixtures (R0), and flips README, site and teardown together. The engine track runs first
because Premise 5 is the highest-confidence finding of the last review and none of it depends
on the site.

### Track L — the library

| Id                | Task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Acceptance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **L0**            | **Plugin lifecycle in the engine.** Extend `Hooks` with `init(host)` and `onCommit(state, prev)`; invoke both from one place in `store.ts` so that every write path -- `set`, `patch`, `setCtx`, `reset`, `patchFlow` and the navigation commit -- reports exactly once. Ordering is registration order; a plugin that throws is disabled with a diagnostic and never breaks the write; `destroy()` disposes; a repeated mount re-runs `init` on a fresh instance; a commit made by a plugin during `init` does not re-enter `onCommit`. Storage is synchronous by contract for 1.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | contract test on both bindings: `set()` reaches a plugin; a throwing plugin does not break navigation; `destroy()` stops delivery; `core-v1` stays within budget                                                                                                                                                                                                                                                                                                                                   |
| L1 (= T28)        | Build wiring for `session.ts`: tsup entry, `exports["./session"]`, `.size-limit.js` ratchet (`graph` already has all three: entry, export, 800 B budget)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `pnpm build && pnpm size && pnpm publint && pnpm attw` green; `core/v1` still ≤ 3.9 kB                                                                                                                                                                                                                                                                                                                                                                                                             |
| L2 (= wizzard-13) | Thread `defineFlow` generics through `createWizard`: `go()` takes a step id, `get()` returns typed data; phantom `__slice`, inference depth 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `@ark/attest` fixture with 40 steps + one group under 1 s of check time; a wrong id fails to compile                                                                                                                                                                                                                                                                                                                                                                                               |
| L2b (= T20)       | Typed expression builder (`eq(get('data.plan'), 'pro')`) in `expr-builder.ts`, exported from a new `@wizzard-packages/core/expr` entry with its own budget; the evaluator stays in the main entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | property test: every builder output evaluates identically to the hand-written JSON; `core-v1` size unchanged                                                                                                                                                                                                                                                                                                                                                                                       |
| L3 (= wizzard-14) | `"use client"` survives the build in `react` (ESM and CJS); Next.js App Router fixture imports the binding from a server component; a docs note says the directive is inert for Vite, Remix and plain bundlers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | e2e fixture builds and renders; the directive is the first line of both `dist/v1/index.js` and `.cjs`                                                                                                                                                                                                                                                                                                                                                                                              |
| L4a               | **Durable snapshot contract in core.** `toSnapshot(state): Snapshot` returns a detached copy of `{ v: 1, flow, version?, stack, history, data, ctx, visited, completed, dirty, nav }` -- `status`, `busy`, `errors` and `rev` are transient and never stored. `decodeSnapshot(flow, snapshot, { migrate? })` is a **pure decoder** returning `{ state, diagnostics }` or `{ reset, reason }`; it validates the envelope, then migrates (chained, with source and target metadata), then validates fully: every frame in `stack`/`history` names a step of the flow -- reusing `session.ts`'s frame checker, not a second copy -- nesting is legal, repeat keys resolve, `data`/`ctx` contain no `undefined`, non-finite number, `Date` or cycle, no path segment is `__proto__`/`constructor`/`prototype`, the payload is under 1 MB and no deeper than 32. Installation goes through `commit.ts`, which is what bumps `rev` and invalidates selectors, and **bumps `nav`** so any operation begun before the restore resolves as superseded                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | unit tests for every branch above incl. a v1->v2->v3 migration chain, a malformed `migrate` result, and hostile JSON values; `JSON.parse(JSON.stringify(snapshot))` is identical                                                                                                                                                                                                                                                                                                                   |
| L4b               | **`@wizzard-packages/plugins` `/persist`** on top of L0 and L4a: `persist({ key, storage?, version?, migrate?, onRestore? })` reads on `init`, writes on `onCommit`, coalesces writes (one per frame or 50 ms) and flushes on `destroy()` and `pagehide`; a flow id or `version` mismatch calls `hydrateMismatch` (default: start clean, warn once) and every outcome -- `{ restored: true }`, `{ restored: false, reason }` -- is reported through `onRestore` so the host UI can say what happened; `SecurityError` and `QuotaExceededError` are caught, degrade to in-memory, warn once **per reason** and never turn a successful navigation into a failed one; restored state re-runs validation lazily                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | contract tests on both bindings: round-trip, mismatch, corrupt JSON, wrong shape, unknown step, storage throws, quota, a stored 0.x-shaped object, two tabs on one key, one warning per reason; R-B runs on it and shows the outcome; write cost measured against a 100-item R-C payload; budget set as a ratchet after the tests pass                                                                                                                                                             |
| L5                | `@wizzard-packages/devtools` rewritten on v1: the graph renderer + a state panel with a per-commit diff, a **built-in minimal layered layout** so a host never has to supply positions (`layout` option overrides it), version aligned with the family (T6). Whether devtools is published in 1.0.0 or lives in the site only is a gate decision                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | replaces the 416-line 0.x `WizardDevTools.tsx`; own budget; renders R-A/R-B/R-C fixtures in a unit test                                                                                                                                                                                                                                                                                                                                                                                            |
| L6                | **Diagnostic contract**, not a grep: every failure the library produces -- thrown or returned -- carries `{ code, op, path?, message, fix, url }` with `url = <site>/errors/<code>`; `NavResult` reasons (`invalid`, `blocked`, `no-target`, `superseded`, `aborted`, `not-reachable`) each documented with what the developer sees and which are results vs throws; `validateFlow` rejects unknown operators (T21); the nine current throw sites are enumerated and converted (`expr.ts` x5 through `ExprError`, `store.ts:120`, `validate-flow.ts:115`, `react/index.tsx:53`, `vue/index.ts:44`); a failing diagnostic callback is caught and never escapes; no diagnostic URL contains submitted data; `WizardProvider`/`provideWizard` throw in dev when both `wizard` and options are passed (today the options are silently ignored); a format lint remains as a guard                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | a test per code asserts `code`, `fix` and `url`; the site has one `/errors/<code>` page per code; a lint on message format                                                                                                                                                                                                                                                                                                                                                                         |
| L7                | Every GAP in the Phase 3 test diagram (46 paths, 19 of them E2E; T32's 25 was the 2026-09-03 figure for the inspector alone); no `waitForTimeout`; node-count ceiling in the graph builder emitted as `graph/too-many-nodes` above 500 nodes (T34)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | coverage on `core` ≥ 90 %                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| L8                | Teardown **and root-export flip**: delete `core/src/*` outside `v1`, `react/src/{context,components,hooks,internal,factory.tsx,store.ts,types.ts}`, `vue/src/index.ts` (0.x), `packages/{middleware,persistence,adapter-zod,adapter-yup}`, their size-limit entries, the ESLint legacy quarantine block, `examples/demo` (4 356 lines, 0 v1 imports), `examples/vue-demo`, `examples/shadcn-ui-connector`, the eight `.stackblitz/*` templates, `deploy-demo.yml`, `deploy-vue-demo.yml`, the 15 Playwright specs that drive the two demos, `react`/`vue` `dependencies` on `middleware`/`persistence`; edit `typedoc.json`, `turbo.json`, `vitest.config.ts`; promote `v1/` to each package's root export and keep `./v1` as an alias **through all of 1.x**, resolving to the _same_ built module and declaration files as the root under every export condition -- not a second build, which would give a consumer two React contexts and two nominal type identities. **Preconditions:** (a) a table mapping each deleted spec's **assertions** -- not its name -- to the reference application that now covers them, with those replacements already green in required CI; (b) `packages/ui` still builds and deploys until S6, so the live site never breaks mid-teardown; (c) an inventory pass over `pnpm-workspace.yaml` globs, the lockfile, root scripts, workflow path filters, CI caches, coverage config and `.changeset/config.json`. **Precedes R0** so the release candidate packs the final layout | `pnpm lint` reports 0 warnings (the 233 legacy warnings go with the code); every remaining `.size-limit.js` entry has a package; e2e targets only the new site; the mapping table is in the PR                                                                                                                                                                                                                                                                                                     |
| L10               | `clearOnLeave?: readonly string[] \| true` on `StepBase`, applied at exit inside the navigation commit; the default is documented as "kept". Verified absent today: `flow.ts` has no such field and nothing clears `data` on branch exit, while a task page and the API behaviour table both promise the behaviour                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | unit tests: cleared on exit, kept by default, `true` clears the whole slice; R-A demonstrates it; the task page's example runs                                                                                                                                                                                                                                                                                                                                                                     |
| L9                | Group and repeat traversal (`wizzard-12`) in `navigate.ts` phases 4 and 9. **A design note lands before any implementation** (`docs/designs/group-traversal.md`) fixing the invariants: stable item identity under `keyBy`, removal of the active item, reordering, nested groups, an empty `over`, `back()` across a group boundary, `go()` into a group, completion, pruning of dead frames, and what a snapshot containing group frames means for L4a. It also states the injection point that keeps group code out of the flat-flow bundle -- or the `.size-limit.js` comment at lines 24-26 is corrected and the budget raised deliberately, because `navigate.ts` phase 9 is one synchronous function inside the budgeted entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Gate decision.** Recommended: in 1.0.0, because R-C needs it and Premise 6 forbids drawing what cannot run. `resolve.property.test.ts` passes unchanged (the regression guard); new property tests cover structural change during a pending navigation; `navigate.ts`'s header comment is updated. If deferred instead: `validateFlow` rejects `GroupStep` with `flow/groups-unsupported`, the inspector labels group nodes "drawn, not executable", **and R-C is replaced as release evidence** |

### Track S — the site

New package `site/` (private, at the repository root, not `packages/ui`), static output,
deployed by the existing `deploy-docs-ui.yml` after the switch.

**Stack (gate decision — reverses the 2026-08-29 choice of Next.js + Vercel):** Astro with
Starlight for the docs shell, React and Vue islands for the examples and the inspector, MDX,
Shiki at build time, Pagefind for static search, static output to GitHub Pages. The reasons
are two facts that changed since August: the site already deploys to Pages with no Vercel
account in the loop, and the library ships **React and Vue** — Next.js cannot mount a Vue
component on the same page, so the side-by-side examples of Premise 2 would be iframes.
Alternatives: VitePress (Vue-native; React examples become iframes), Next.js static export
(React only; the owner's original choice). Nothing in this stack enters a published package.

| Id  | Task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Acceptance                                                                                                                                                                                       |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| S1  | Site shell. **Homepage composition (hero):** product name, one-line promise ("Headless multi-step flows for React and Vue -- the flow is JSON"), the R-A graph **running live** with a compact form beside it ("change the payer type and watch the route change"), primary action **Get started**, secondary **Explore this flow**, the install line as a copy button; no cards, no three-column grid. Below the fold: the three reference applications as three rows with task-oriented headlines -- "Change your answer. Keep the right data." / "Reload halfway through. Continue safely." / "Add passengers. Revisit any passenger." Nav: Docs / Examples / API / GitHub; a React/Vue selector in the header, remembered. `site/DESIGN.md` + `src/styles/tokens.css` written before the first page: typography roles (display, body, code) with two named typefaces, reading width, one accent, semantic colours (active, visited, blocked, error, group), borders and selected states, graph density rules, dark default + light theme following the visitor's preference, the three motions (step transition, graph rebuild, scrubber) and their reduced-motion equivalents. OG image per page at build                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `axe` reports 0 violations on every page; no default palette or system font stack in computed styles; `DESIGN.md` exists and the S1 PR links it                                                  |
| S2  | Inspector page, per `flow-inspector.md` and its review tasks T8-T16, with **three modes**: **Live** -- a built-in example (R-A by default) runs; the form is beside the graph; the active node and the taken branch are highlighted; selecting a node inspects it (state slice, `when`), never navigates. **Replay** -- a checked-in `RecordedSession`; scrubber; "back to live" always visible; if no recording matches the flow the scrubber is disabled with the reason and a link to how to record one. **Preview** -- a pasted flow: structure only, labelled "structure preview -- no registry, nothing runs"; paste box behind `validateFlow` with problems listed inline under the box and the previous graph kept and labelled "last valid flow"; empty box -> "Load example"; a 1 MB cap before parsing. Infix pretty-printer for `when` (from `core/expr`, truncate at 32 chars, full text on hover and in the table mirror); frozen positions per flow; pre-hydration: controls visibly disabled with a one-word status, the pre-rendered SVG shown. **Keyboard:** the graph is one focus stop; arrow keys move between nodes, Enter inspects, Esc returns; arrow keys on the scrubber; Tab never walks node by node. The table mirror is visually hidden and exposed to assistive technology. Labels render as text nodes only. **Responsive:** >= 1100 px graph 60 % + state panel 40 % + scrubber below; 640-1100 graph full width, state panel as a bottom sheet whose dismissal returns focus to its trigger; < 640 the form stays interactive, the route is a compact step list, "View graph" opens a full-screen pannable graph (drag to pan, buttons to zoom). Node shapes: rounded rect (step), double border (group), stacked (repeat), filled circle (END) -- the same four in devtools. Closing line with two links: "Run this yourself" -> Getting started, "See the three apps" -> Examples | the five success criteria in `flow-inspector.md`; `axe` 0 violations; a keyboard-only Playwright spec; Playwright at 1280 / 900 / 390 px                                                         |
| S3  | Live examples: `examples/quickstart` plus the three reference applications R-A, R-B, R-C, each a `FlowDefinition` file with a React and a Vue rendering; the page mounts the runtime the visitor selected (the other is not rendered), from the same source that the code block shows; static frame of step 1 before hydration with controls visibly disabled (no spinner); error boundary per island with the message and **Restart example**; "Open in StackBlitz" generated from the example directory, installing from the `next` tag (so the button appears after R0); R-B shows its restore outcome ("restored" / "reset: older version" / "saving unavailable"); pending async validation disables Next with an inline "checking..." and Back cancels it; each app implements a11y by hand -- visible labels, `aria-live` for validation results and step changes, focus to the new step's heading, 44 px targets; the framework toggle is a route change, not a client swap, and the SSR default is stated so a remembered preference cannot cause a hydration mismatch; a per-page test asserts **executed modules and network requests**, not only mounted components, so the Vue page pulls no React and vice versa (the inspector's own runtime is named in S2)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | zero examples whose displayed code differs from the running code (a CI test diffs them); every reference app has a Playwright spec on both bindings incl. keyboard-only; `axe` 0 violations      |
| S4  | Docs pages: **Getting started** (new app / existing app paths; React, Vue, headless tabs; the quickstart -- two steps, one field, Next, Back, the value survives; timed), four **task pages** titled by the phrase people search -- "Block Next until valid", "Restore after reload", "Clear abandoned branch data", "Render field errors" -- then Flow definition, Expressions (with the builder, imported as a namespace), Navigation and guards, **API behaviour** (one table: `go()` respects guards and validation unless `{ force }`; `back()` follows the history stack; `set()` replaces a path, `patch()` merges shallowly; `validate(step?)` / `validateAll()`; abandoned-branch data kept unless the step declares `clearOnLeave`; repeat items keyed by `keyBy`; the provider keeps one instance across rerenders and never runs on the server), Validation, Persistence (the snapshot contract, `migrate`, the restore outcome, the PII note: point `storage` at session storage or nothing for sensitive flows), Devtools, Errors (one page per code), **Server-driven** -- one page with two labelled halves: the JSON contract the engine accepts today, and the `http-flow` integration planned for 1.1; every snippet is a complete file with imports and registry; Pagefind search indexes the task phrases                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | each page has a runnable example; searching each task phrase returns its page first; TTHW from landing to a running wizard under five minutes, timed by a person who has not seen the repository |
| S5  | API reference from typedoc into the site, not a separate `docs/api` deploy; the four deleted packages leave `typedoc.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | one deploy target                                                                                                                                                                                |
| S6  | Deploy switch: `deploy-docs-ui.yml` builds `site/`, adds a post-deploy smoke step (fetch the public URL, assert the string `defineFlow`); `404.html` with one line and a link home; a "1.0.0 release candidate" badge in the header until R1 lands; `packages/ui` deleted in the same PR                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | the public URL serves the new site; the smoke step is green                                                                                                                                      |

### Track D — the docs

| Id  | Task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Acceptance                                                                                                                                          |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | `AGENTS.md` amendments A1–A9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | reviewed by an agent that has not seen this plan: can it run one test file from the instructions alone?                                             |
| D2  | `docs/MIGRATION.md` (T19): the 0.x → 1.0 map from `ROADMAP.md` "Compatibility", every deleted 0.x export in a row, what happens to already-stored 0.x data (same dot-path shape; slices become top-level keys), and a dated GitHub code search for `@wizzard-packages/` dependents                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | every deleted export has a row; the search date and count are in the file                                                                           |
| D3  | `README.md` rewritten by hand (T17), **early** -- step 2 of Next Steps. Shape: one paragraph; one example embedded from `examples/quickstart/` by `scripts/embed-examples.ts` (markers in both directions, CI fails on drift, missing or unreferenced files, CRLF-safe) -- a complete file, not a fragment: two steps, one field, Next, Back, the value survives; until the R0 pack it imports `@wizzard-packages/react/v1` and the install line says `@canary`; the switch to root imports and `@latest` lands **before R0 packs the tarballs**, because a README edited afterwards never reaches the published npm page; three **outcome** claims the reference apps demonstrate -- no stale async transitions (one atomic commit, epoch re-checked), one engine for React and Vue (906 B and 646 B bindings against 8.43 kB and 5.07 kB in 0.x), a flow that is JSON (draw it, ship it from a server, replay it); one paragraph on when it earns its dependency against `@stepperize/react`, XState and a hand-rolled `useReducer`; install; packages table (v1 only); support matrix; links. Two badges. No emoji headings, no feature bullets that restate the table. The `component: null` boilerplate of the 0.x quick start does not return | a reader who has never seen the repo can paste the example and run it; word count under 700; `node scripts/embed-examples.ts --check` exits 0 in CI |
| D4  | Per-package READMEs for core, react, vue, validate, plugins, devtools, each <= 60 lines, each with one example that also lives on the site, each with the support matrix and peer requirements                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `publint` sees a README in every published package                                                                                                  |
| D5  | `ROADMAP.md`: plugin table marked deferred except `/persist` (T26); compat section replaced by a pointer to MIGRATION; the group-traversal decision recorded either way                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | no roadmap row promises something 1.0.0 does not ship                                                                                               |
| D6  | `docs/DEV_WORKFLOW.md` names the tracker (T25); `CONTRIBUTING.md` (two paragraphs: `AGENTS.md` is the rulebook, `pnpm verify` is the gate); an issue template asking for the `FlowDefinition` JSON and a `RecordedSession` file; `docs/legacy/` deleted with the 0.x code, its two still-useful pages moved; `docs/API_REFERENCE.md` (1 210 lines of 0.x) deleted; link check in CI                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | no link in the repo points at a deleted file                                                                                                        |

### Release

| Id  | Task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R3  | **Day 0, owner-only, in parallel:** branch protection on `main` (require PR + green CI, no force-push), `GH_PAT` so the changesets release PR gets real CI                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| R0  | Release candidate, **after L8**: build the **final 1.0.0 artefacts**, `pnpm check:pack` them, install into four clean consumer fixtures -- Vite React (root imports), Vite Vue (root imports), Next.js App Router (root imports, server component), and a mixed fixture importing the provider from the package root and hooks from `./v1` to prove they are the same module and the same nominal types -- across ESM and CJS and every advertised subentry (`/persist`, `/expr`, `/session`, devtools); publish those exact artefacts to the `next` dist-tag; freeze checksums and internal dependency versions. Exit criterion: four fixtures green in CI, `"use client"` verified at the final root targets, TTHW timed |
| R1  | Promote the **same version** to `latest` with `npm dist-tag add` -- no rebuild, no second pack. StackBlitz templates pin that exact version, never a moving tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| R2  | `npm deprecate` for `middleware`, `persistence`, `adapter-zod`, `adapter-yup` pointing at MIGRATION.md (T23)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Open Questions (decided at the review gate)

- **Site stack** — recommended Astro + Starlight (above); reverses an owner decision.
- **Group traversal in 1.0.0** -- recommended yes (L9, design note first); R-C depends on it, so deferring it also means replacing the third reference application and revising the site's claims in the same decision.
- **Publish devtools in 1.0.0, or ship the inspector in the site only** — recommended keep
  (owner scope), with the built-in layout so hosts owe nothing.
- **Devtools "record" hook** emitting a `RecordedSession` — recommended yes; it turns a bug
  report into a replayable file.
- **`examples/shadcn-ui-connector`** — rewritten as a site page ("using a design system")
  rather than deleted outright. Recommended: page.

## Success Criteria

- The three reference applications run on both bindings with no workaround the engine does
  not document; every workaround found is an issue, filed and closed or recorded in ROADMAP.
- `pnpm lint` reports **0 warnings**, not 0 errors: the quarantine block is gone with the code.
- Every published package has one API surface; `grep -r WizardStore packages/*/src` is empty.
- The README's example runs unchanged against the published packages; the site's examples are
  the same files; CI diffs both.
- TTHW, timed by a person who has not seen the repo: landing page → running wizard in under
  five minutes, on both React and Vue paths.
- `core/v1` ≤ 3.9 kB; every other entry has a ratchet set after its tests pass; `pnpm size`
  is green.
- The public URL shows the inspector on first paint with the R-A flow and no paste.
- R0's three consumer fixtures are green against the packed tarballs before R1.
- 1.0.0 is on `latest`, the four removed packages carry deprecation notices, and
  `docs/MIGRATION.md` has a row for every 0.x export.

## Distribution Plan

- Site: static build of `site/`, published by `deploy-docs-ui.yml` to `gh-pages` on merge. No
  second `github-pages` environment (the collision documented in `deploy-demo.yml` must not
  return); the two demo deploy workflows are deleted, not left disabled.
- Packages: changesets; canary on every merge stays; `next` for the release candidate; 1.0.0
  goes through the release PR once R3 gives it CI.
- Docs: README on npm is the file in the repo; per-package READMEs travel with `publint`.

## NOT in scope

- A third engine rewrite. See "What is already true".
- `@wizzard-packages/compat`. Cut 2026-09-03 on download numbers; MIGRATION.md replaces it.
- Plugins other than `/persist` (`analytics`, `logger`, `autosave`, `url-sync`, `http-flow`):
  1.1, on demand. `url-sync` is the first candidate (TODOS).
- Server-driven flows as a feature, AI flow generation, MCP, CLI, Svelte/Solid bindings:
  roadmap phase 5. The JSON contract page (S4) is the only 1.0.0 surface.
- a11y contract in the bindings (ARIA props, focus management): TODOS.
- Inspector state in the URL: TODOS.
- A blog, a newsletter, comparison articles: roadmap phase 6.
- Changing the host away from GitHub Pages.

## Next Steps

0. R3 -- owner: branch protection and `GH_PAT`. Parallel with everything.
1. L1 -- build wiring (unblocks the inspector import).
2. D3 -- `examples/quickstart/` + embed script (runner pinned; CI compiles the extracted
   files) + the README, importing `/v1` and installing `@canary`. Ships before the site.
3. Gate decisions applied: site stack, L9, devtools, record hook. G1 (`DESIGN.md` + tokens),
   then S1.
4. L2, L2b, L3 -- the engine gaps, in parallel; D1 AGENTS.md; D2 MIGRATION.md.
5. **L0** plugin lifecycle, then L4a snapshot decoder, then L4b persist. L10 `clearOnLeave`.
6. L9 design note; L9 implementation if the gate accepts it.
7. S2 inspector (live / replay / preview), then S3 reference applications (both bindings,
   Playwright specs incl. keyboard-only), then S4/S5.
8. L5 devtools, L6 diagnostics, L7 test gaps; D4 package READMEs.
9. D3 switches to root imports and `@latest`; L8 teardown + root-export flip (preconditions
   (a), (b), (c) satisfied first).
10. R0: final artefacts packed, four fixtures green, published to `next`, TTHW timed,
    StackBlitz buttons pinned to that version.
11. S6 deploy switch + D5/D6 within one day of R0.
12. R1 promotes the same version to `latest`; R2 deprecates the four removed packages.

---

# GSTACK REVIEW — Phase 1: CEO (strategy & scope)

Reviewed by `/autoplan` on 2026-09-06 at `4078c1c`, mode SELECTIVE EXPANSION (autoplan
override). Every intermediate decision is auto-decided by the six principles and logged in
the Decision Audit Trail at the end of this document. Taste decisions and user challenges are
collected for the final gate.

## Pre-review system audit

- **Retrospective.** The last review cycle (2026-09-03, `flow-inspector.md`) produced T1–T36.
  Landed since: T27, T30, T31 (graph, #23–#24), T29 (session, #25–#26), T1/T4/T5/T34 in the
  form `graph.ts` took (`subFlows` resolver, `repeat` badge, `opaque` markers, `MAX_DEPTH`),
  T7 (token). Still open and absorbed here: T2 → Premise 5; T3/T28 → L1; T6 → L5; T8–T16 →
  S2; T17 → D3; T18 → L8+D4; T19 → D2; T20 → expansion E3 below; T21/T22 → L6; T23 → R2;
  T24 → S3/L3; T25 → D6; T26 → D5; T32 → L7; T33 → L5; T35 → L1; T36 → wording in S2.
  Areas that were problematic before and this plan re-touches: `graph.ts` (three holes found
  last time, all closed), `.size-limit.js` (four entries deleted, none added — Theme 5), the
  README (Theme 4). All three get explicit acceptance criteria in this plan.
- **Taste calibration.** Well-designed, to be copied: `packages/core/src/v1/navigate.ts`
  (one function, phases numbered, two writes and a header comment that says so),
  `contract/binding-suite.ts` (one suite, two bindings, no drift possible), `.size-limit.js`
  (every budget carries the reason it exists). Anti-patterns to avoid repeating:
  `packages/react/src/context/WizardContext.tsx` (785 lines, three responsibilities) and
  `README.md` (emoji headings, a feature list that restates the package table, three
  quick starts that teach the deprecated API).
- **Landscape check.** Web search is not used in this run; in-distribution knowledge, stated
  as such. Layer 1 (tried and true): a headless library documents itself with one runnable
  example on npm and a docs site whose examples are the library's own tests — zustand,
  TanStack, XState all do this. Layer 2 (current practice): `@stepperize/react` (131 k
  weekly) wins on "one hook, no concepts"; XState wins on "visualizer + statecharts". Layer 3
  (first principles): nobody in the stepper category ships a flow that is JSON, so nobody
  can draw it, patch it from a server, or replay it. That is the differentiation the README
  must state in its first three lines, and the inspector must show in its first ten seconds.
  No eureka beyond what `flow-inspector.md` already recorded.

## Step 0A. Premise Challenge

| Premise                                              | Stated or assumed                                             | Verdict                                                                                                                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1 one library, compat cut                           | stated, with numbers                                          | holds — the decision is dated and data-backed; the missing check is _dependents_, not downloads: a GitHub code search for `@wizzard-packages/react` imports is a ten-minute task and is added to D2's acceptance     |
| P2 site is a product surface, React + Vue live       | stated                                                        | holds, and it is the premise that forces the site-stack question; see 0C-bis and the gate                                                                                                                            |
| P3 README by hand, < 600 words                       | stated                                                        | holds; made measurable (word count, runnable example)                                                                                                                                                                |
| P4 persistence is a 1.0.0 blocker                    | stated, inherited from the 2026-09-03 consensus (both voices) | holds — a wizard that loses a half-filled form on reload is a regression from 0.x, and "regression from the version we deprecate" is the bar, not download counts                                                    |
| P5 typing + `"use client"` before the site is public | stated, Theme 1 of the last review                            | holds — `packages/react/src/v1/index.tsx` already starts with `'use client'`; what is unverified is whether tsup preserves it in `dist/` (L3 acceptance checks exactly that)                                         |
| (implicit) "from scratch" does not mean the engine   | assumed from the owner's history — v1 _is_ the rewrite        | **queued for the gate as a premise check**: the owner's words were "всё пишем с нуля"; this plan reads that as README + site + examples + teardown. If the owner meant the engine too, the plan is wrong at the root |
| (implicit) GitHub Pages stays the host               | assumed                                                       | holds — one deploy target already exists and works; changing hosts is a separate decision nobody asked for                                                                                                           |
| (implicit) no group traversal in 1.0.0               | stated (L9)                                                   | holds conditionally — reverses if any S3 example needs nesting                                                                                                                                                       |

Nothing here is clearly wrong. One premise is queued for the gate because only the owner can
confirm it.

## Step 0B. Existing Code Leverage

Beyond the table in "What is already true":

| Sub-problem in this plan          | Existing code                                                                                                         | Reused?                                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| persist plugin behaviour          | `packages/persistence/src/{LocalStorageAdapter,MemoryAdapter}.ts` (109 lines) — the storage shapes and the key scheme | as a behavioural reference only; the plugin is written against `WizardOptions.plugins: Hooks[]` in `store.ts:30` |
| plugin contract                   | `store.ts:30,134` already accepts `plugins?: readonly Hooks[]` and passes them as `hooks`                             | yes — L4 needs no engine change unless `hydrateMismatch` is missing from `Hooks` (checked in L4 hour 1)          |
| binding contract test for persist | `contract/binding-suite.ts` `Probe` interface                                                                         | yes — one new probe, runs on both bindings                                                                       |
| migration content                 | `ROADMAP.md` "Compatibility", `docs/legacy/MIGRATION_0.x.md`                                                          | yes — D2 is a rewrite of these, not new research                                                                 |
| API reference                     | `docs/api/*` (typedoc, 8 packages)                                                                                    | yes — S5 feeds it into the site; the four deleted packages drop out of `typedoc.json`                            |
| deploy                            | `deploy-docs-ui.yml` (Pages, `gh-pages` branch, `UI_BASE`)                                                            | yes — S6 changes the build directory, nothing else                                                               |
| e2e harness                       | `playwright.config.ts` (two web servers, readiness probes, CI settings)                                               | yes — L8 repoints it at the `site/` dev server                                                                   |
| design-system page                | `examples/shadcn-ui-connector` (556 lines)                                                                            | as source material for one site page; the package is deleted                                                     |
| README example                    | none — the v1 quickstart does not exist anywhere                                                                      | **new**, and it must be one file reused by README, site and a CI test                                            |

Nothing in the plan rebuilds something that exists. The one place a rebuild is chosen over
refactor is `packages/ui` → `site/`: 990 lines of react-router + react-markdown pages
whose only content is 0.x examples; refactoring them would mean keeping a router and a
markdown renderer that the new stack replaces.

## Step 0C. Dream State

```
  CURRENT (2026-09-06)                 THIS PLAN                         12-MONTH IDEAL
  ─────────────────────                ─────────────────────             ─────────────────────
  two libraries, one name              one library, 1.0.0 on latest      1.x on latest, 0.x forgotten
  README teaches 0.x                   README: 1 example, 3 numbers      README unchanged; site does the rest
  site renders 0.x examples            site: inspector first, live       site adds: server-driven guide,
  (packages/ui, Pages)                 React+Vue examples, docs, API     AI flow generation demo, MCP page
  no persistence story for v1          /persist plugin, contract-tested  plugins: analytics, url-sync, autosave
  go() untyped, "use client" unproven  both closed, both gated in CI     Svelte + Solid bindings on the same
  devtools = 416-line 0.x panel        devtools = graph + state panel    contract suite
  ESLint quarantine, 233 warnings      0 warnings, quarantine deleted    group/repeat traversal (1.1)
  4 dead packages still published      deprecated with a pointer        unpublish window long past
```

The plan moves toward the ideal on every row and away on none. The one row it does not
touch — group traversal — is the deliberate deferral (L9).

## Step 0C-bis. Implementation Alternatives

The plan's three approaches, scored for completeness:

```
APPROACH A: Finish the inspector chain, polish docs last     Effort M  Risk Med  Completeness 6/10
  Reuses everything; keeps packages/ui; README last.
  Cons: v1 showcase over a 0.x shell; npm page wrong for the whole build.

APPROACH B: Teardown first, site second, docs last           Effort L  Risk Med  Completeness 8/10
  Clean tree before any new surface; every later PR smaller.
  Cons: public site and README dark or misleading for weeks; one very large CI-touching PR.

APPROACH C: Three tracks, one integration order              Effort L  Risk Low-Med  Completeness 10/10
  New site beside the old; engine gaps first; README, site switch and teardown flip together.
  Cons: needs discipline about the order; longest document.
```

**Auto-decided: C** (P1 completeness; not close to B, so mechanical, not taste). Logged as
decision 1.

## Step 0D. SELECTIVE EXPANSION analysis

**Complexity check.** The plan touches every package and three top-level directories — far
more than eight files. That is the nature of a launch plan, not a smell in itself; the
mitigation is structural: each track lands in PRs of one task, and the only multi-package PR
is L8, whose whole point is deletion. Flagged, accepted.

**Minimum set that achieves the stated goal** (one library, honest README, new site):
L1, L2, L3, L4, L8 · S1, S2, S3, S4, S6 · D2, D3 · R1. Deferrable without blocking the
goal: L5 (devtools), L6 (error template), L7 (test gaps), S5 (API in site), D4, D5, D6, R2, R3.
None is deferred: the owner scoped 1.0.0 as "core + react + vue + validation + persist +
devtools with graph" on 2026-08-29 and P1 says ship the whole thing. Logged as decision 2.

**Expansion scan — candidates, each auto-decided** (in blast radius + < 1 day CC → approve;
outside → TODOS; borderline → taste):

| #   | Opportunity                                                                                                                                                                                                                         | Felt experience                                                                         | Effort                                           | Decision                                                                                                                                             |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| E1  | **Ship the README before anything else.** The outside voice and first principles agree: the README fix needs no code from tracks L or S. The quickstart is one file in the repo, tested in CI; the site later imports the same file | a visitor on npm sees the real library _this week_, while the site is still being built | S (CC ~1 h)                                      | **APPROVED — plan amended**: D3 moves to step 2 of Next Steps, gated only on an `examples/quickstart/` directory that CI runs; S3 reuses those files |
| E2  | Name the competitors in the README (`@stepperize/react`, XState) with one honest line each                                                                                                                                          | the reader who already knows those libraries learns in ten seconds why this one exists  | S (part of D3)                                   | **APPROVED** — folded into D3's acceptance                                                                                                           |
| E3  | Typed expression builder `eq(get('data.plan'), 'pro')` compiling to the same JSON (T20), as its own core entry `@wizzard-packages/core/expr` so `core-v1` does not grow                                                             | the README example stops looking like a JSON puzzle; typos die at compile time          | M (CC ~45 min), in L2's blast radius             | **APPROVED** as L2b, own budget entry                                                                                                                |
| E4  | "Record" hook in devtools that emits a `RecordedSession` file                                                                                                                                                                       | the replay demo can be regenerated from any real run instead of a hand-written fixture  | S (CC ~20 min), inside L5                        | **TASTE** — approve-by-default; surfaced at the gate because it widens L5                                                                            |
| E5  | "Open in StackBlitz" button on each site example, generated from the same example directory                                                                                                                                         | try it without cloning; the old README's one genuinely good idea, kept                  | S (CC ~30 min), inside S3                        | **APPROVED** — folded into S3                                                                                                                        |
| E6  | Social/OG image per page, generated at build                                                                                                                                                                                        | a shared link shows the graph, not a blank card                                         | S (CC ~20 min), inside S1                        | **APPROVED** — folded into S1                                                                                                                        |
| E7  | Link checker + example-diff test in CI                                                                                                                                                                                              | a deleted page or a drifted example fails the build, not a visitor                      | S, already in D6/S3                              | already in scope                                                                                                                                     |
| E8  | `url-sync` plugin (`?step=payment`)                                                                                                                                                                                                 | a step survives F5 and can be shared by link — the most-requested wizard feature        | M, **outside** blast radius (new plugin)         | **DEFER → TODOS**                                                                                                                                    |
| E9  | a11y contract in bindings (ARIA props, focus move on step change, error announcement)                                                                                                                                               | accessible by default, not by effort                                                    | M, outside blast radius (engine + both bindings) | **DEFER → TODOS**                                                                                                                                    |
| E10 | Share inspector state in the URL                                                                                                                                                                                                    | paste a link, see the same graph                                                        | M, explicitly excluded by `flow-inspector.md`    | **DEFER → TODOS**                                                                                                                                    |
| E11 | `npm create wizzard` scaffolder                                                                                                                                                                                                     | zero-config start                                                                       | L, roadmap phase 5                               | **SKIP** here (already on the roadmap)                                                                                                               |

Delight opportunities named: E2, E4, E5, E6, E7 (five). Platform potential: E3 is the one
expansion that becomes infrastructure — the same builder feeds the site's "pretty-print a
`when`" (T8) and any future AI-generated flow.

## Step 0E. Temporal Interrogation

```
HOUR 1 (foundations)  human ~1 day / CC ~1 h
  · Site stack decided (gate). `site/` added to pnpm-workspace.yaml; base path stays
    /wizzard-packages/ (UI_BASE); dark palette tokens written before any page.
  · L1: does `session.ts` import anything that drags `core-v1` code into its bundle? If
    yes, the budget is honest about it, not hidden.
  · L4 hour 1: confirm `Hooks` in core has `hydrateMismatch`; if not, that is a two-line
    engine addition and the ONLY engine change this plan makes.
HOUR 2-3 (core logic)  human ~2 days / CC ~2 h
  · How a page shows the code it runs: Vite `?raw` import of the same file the island
    mounts. One helper, used by every example. Decided here, not per page.
  · React and Vue in one static bundle: islands; no shared runtime; the Vue island must
    not pull React and vice versa (a size test per example page).
  · Persist plugin API: `persist({ key, storage?, version? })`; what is stored is the
    nine-field `WizardState` verbatim; restore goes through `commit`; mismatch on flow id
    or version → `hydrateMismatch` hook, default = start clean and warn once.
HOUR 4-5 (integration)  human ~2 days / CC ~1.5 h
  · Teardown and e2e must land in ONE PR: deleting the demos breaks 15 Playwright specs;
    the PR deletes them and adds the site specs, or CI is red between PRs.
  · Flipping `react`/`vue` root exports from 0.x to v1 is the actual breaking change of
    1.0.0. The `./v1` subpath stays for one minor as an alias (a re-export, zero bytes).
  · `docs/api` is regenerated after the four packages leave `typedoc.json`; stale pages
    would otherwise ship to the site.
HOUR 6+ (polish/tests)  human ~2 days / CC ~1.5 h
  · The README example is embedded from `examples/quickstart/` by a marker script
    (`scripts/embed-examples.ts`); CI fails if the README drifts from the file.
  · TTHW is timed by a person, once, before 1.0.0, and the number goes in the site's
    "Getting started" page as a promise ("under five minutes").
```

All eight decisions above are resolved in this document; none is left to "figure out
later".

## Step 0F. Mode Confirmation

SELECTIVE EXPANSION, by autoplan override; consistent with the context-dependent default
(iteration on an existing system). Approach C applies under it. Committed.

## Review Sections 1-10 (+11)

### Section 1: Architecture Review

Dependency graph after this plan (arrows point at what is depended on):

```
                     ┌──────────────────────────────────────────────┐
                     │  @wizzard-packages/core                      │
                     │  ./        (v1 engine, 3.9 kB ratchet)       │
                     │  ./validate-flow  ./graph  ./session  ./expr │  ← each its own budget
                     └───────▲──────────▲───────────▲───────────────┘
                             │          │           │
        ┌────────────────────┤          │           │
        │                    │          │           │
  @wizzard-packages/react  @wizzard-packages/vue   @wizzard-packages/validate
        ▲   (906 B)          ▲   (646 B)                 (317 B)
        │                    │
        ├────────────────────┤
        │                    │
  @wizzard-packages/plugins  (/persist; hooks only, no binding import)
        ▲
  @wizzard-packages/devtools (react; graph renderer + state panel; LayoutAdapter supplied by host)
        ▲
   ─────┼────────────────────────────── published / private boundary ──────────────────────────
        │
  site/ (private; React + Vue islands; imports every package above + examples/quickstart/*)
  examples/quickstart/ (private; one FlowDefinition, a React file, a Vue file, a vitest file)
        ▲                          ▲
  README.md (embeds by marker) ────┘ ── scripts/embed-examples.ts (CI check)
```

Deleted from the graph: `middleware`, `persistence`, `adapter-zod`, `adapter-yup`,
`packages/ui`, `examples/demo`, `examples/vue-demo`, `examples/shadcn-ui-connector`,
`.stackblitz/*`, the 0.x halves of `core`, `react`, `vue`, `devtools`.

**New data flow 1 — one example, three consumers.**

```
 examples/quickstart/{flow.ts, App.tsx, App.vue}
        │
        ├─► vitest (CI): mounts both, drives next/back, asserts the same snapshot   (test)
        ├─► site/ page: `?raw` import → Shiki code block; island mounts the same file (docs)
        └─► scripts/embed-examples.ts: replaces <!-- example:quickstart --> blocks   (README)

  happy:  file compiles, test passes, page renders, README block == file
  nil:    marker present, file missing → script exits 1 with the path; CI red, README unchanged
  empty:  file exists, zero bytes → test fails to import; page build fails at import
  error:  file compiles but the snapshot assertion fails → CI red before README or site change
```

**New data flow 2 — the persist plugin.**

```
 commit(state) ──hook: commit──► persist.write(key, JSON.stringify(state))
                                        │
 createWizard(...)  ──hook: init──► persist.read(key) ─► parse ─► isWizardState? ─► same flow id/version?
                                        │                 │            │                 │
                                        ▼                 ▼            ▼                 ▼
                                   nothing stored     SyntaxError  shape wrong     mismatch → hooks.hydrateMismatch
                                   → start clean      → warn once, → warn once,   → default: start clean, warn once
                                                        start clean  start clean

  restore = commit(stored with transient fields reset: status → 'idle', busy → [], nav kept)
```

**State machine — hydration inside the plugin.**

```
   ┌────────┐  read ok, valid, same flow   ┌──────────┐  commit  ┌────────┐
   │ init   │ ────────────────────────────►│ restoring│ ────────►│ live   │──commit──► write
   └───┬────┘                              └──────────┘          └────────┘
       │ nothing / parse error / shape error / mismatch (each warns once, with its own reason)
       ▼
   ┌────────┐
   │ clean  │ ──first commit──► write        (impossible: `live` → `restoring`; the init hook runs once)
   └────────┘
```

**Coupling.** New: README ↔ `examples/quickstart` (through the embed script; justified — it
is the only mechanism that keeps the npm page true), `site/` ↔ every package (a consumer, the
right direction), `devtools` ↔ host-supplied layout (an interface, not a package). Removed:
`react`/`vue` → `middleware`/`persistence` (`dependencies` today, gone with L8). Nothing new
points _into_ core.

**Scaling.** A library has no load; the site is static. At 10x examples the build time grows
linearly (Shiki at build time, ~50 ms per block); at 100x the inspector is the first thing to
hurt — a generated flow with thousands of nodes — and `MAX_DEPTH = 32` bounds depth but not
breadth. Node-count ceiling (T34) is _not_ in `graph.ts` today: the builder walks
`Object.keys(flow.steps)` without a cap. Finding, see Section 4.

**Single points of failure.** `deploy-docs-ui.yml` (one workflow, one `gh-pages` branch — a
failed build publishes nothing, so the old site stays up; acceptable), `NPM_TOKEN` (rotated,
verified, single owner), the embed script (if it silently succeeds on a missing marker, the
README drifts — the script must fail on _unmatched_ markers in both directions).

**Security architecture.** No backend, no auth, no endpoints. Two untrusted inputs: the
inspector paste box (JSON from the visitor, same browser) and `localStorage` (JSON from a
previous session, same origin). Both go through parse → shape check → commit; neither is
evaluated. See Section 3.

**Production failure scenarios.** (1) Pages deploy fails after S6 merges: `gh-pages` keeps
the previous publish; visitors see the old site until a re-run. Plan accounts for it (revert
or re-run). (2) 1.0.0 publish reports success for a package the registry never saved (this has
happened here — `changeset-publish-reports-false-success`): the post-publish registry check
from #19 catches it. (3) A visitor's browser blocks storage (Safari private mode throws on
`setItem`): the plugin must degrade to in-memory with one warning — Section 2 gap G1.

**Rollback.** Site: revert the S6 PR, ~3 minutes to republish. Packages: a published version
cannot be replaced; the rollback is `1.0.1` with a fix, or `npm deprecate 1.0.0` with a
message. Teardown: `git revert` of the L8 PR restores the tree; the deleted npm packages were
never unpublished, so nothing external is lost.

**What would make it beautiful.** The example pipeline: one directory that is
simultaneously a test, a page and the README. A new engineer sees that `README.md` cannot lie
because CI diffs it against a file that vitest ran. **Platform potential:** `core/expr`
(E3) — the builder that makes `when` readable on the site is the same builder an AI
generator or a form editor will emit later.

Findings: **1.1** T34 node ceiling is absent from `graph.ts` → add to L7 as a builder
problem, not a throw (auto-decided, P1). **1.2** the embed script must fail on unmatched
markers in either direction → written into D3 acceptance (auto-decided, P5).

### Section 2: Error & Rescue Map

```
  METHOD/CODEPATH                    | WHAT CAN GO WRONG                          | EXCEPTION CLASS / SIGNAL
  -----------------------------------|--------------------------------------------|---------------------------
  persist.read (init hook)           | storage API absent or throws (private mode)| DOMException SecurityError
                                     | stored JSON malformed                      | SyntaxError
                                     | stored JSON not a WizardState              | shape guard → WizardProblem 'persist/shape'
                                     | flow id / version differs                  | hooks.hydrateMismatch
  persist.write (commit hook)        | quota exceeded                             | DOMException QuotaExceededError
                                     | storage throws on write                    | DOMException SecurityError
  scripts/embed-examples.ts          | marker names a missing file                | ENOENT → exit 1 with path
                                     | file has no matching marker in README      | exit 1 "unreferenced example"
                                     | README block differs from file (CI mode)   | exit 1 with a unified diff
  site build (Astro/Vite)            | example import fails to compile            | build error (Vite)
                                     | Vue island pulls React or vice versa       | per-page size test fails
  inspector paste (S2)               | not JSON                                   | SyntaxError → inline message
                                     | JSON but not a flow                        | validateFlow → FlowProblem[] list
                                     | valid flow, > N nodes                      | builder problem 'graph/too-many-nodes'
                                     | > 1 MB pasted                              | rejected before parse (size cap)
  checkSession (S2 replay)           | fixture inconsistent with flow             | FlowProblem[] → scrubber disabled + reason
  scripts: link check (D6)           | dead link                                  | exit 1 listing links
  npm deprecate (R2)                 | network / auth error                       | npm E-code → rerun by owner
  deploy-docs-ui.yml                 | build step fails                           | workflow red, no publish

  EXCEPTION CLASS                    | RESCUED? | RESCUE ACTION                                   | USER SEES
  -----------------------------------|----------|-------------------------------------------------|----------------------------------
  SecurityError (read/write)         | Y (G1 → plan) | catch in plugin, degrade to memory, warn once | console: "[wizzard] persist disabled. Cause: storage unavailable. Fix: …"
  SyntaxError (stored)               | Y        | start clean, warn once, overwrite on next commit | wizard starts at step 1
  shape guard                        | Y (G2 → plan) | start clean, warn once                      | wizard starts at step 1
  hydrateMismatch                    | Y        | hook; default start clean + warn                | wizard starts at step 1 (or whatever the hook decides)
  QuotaExceededError                 | Y        | warn once, keep running without persistence     | nothing until reload
  embed ENOENT / unreferenced / diff | Y        | exit 1, message with path                        | CI red, README untouched
  Vite build error                   | Y        | build fails, no deploy                           | old site stays up
  paste SyntaxError                  | Y        | inline message, previous graph kept              | "Not JSON: line 4"
  FlowProblem[]                      | Y        | list rendered, graph not replaced                | problems list
  too-many-nodes                     | Y (1.1)  | problem row, graph truncated with a notice       | "showing 200 of 4 000 steps"
  1 MB cap                           | Y        | reject before parse                              | "too large to draw here"
  npm error                          | N (owner)| rerun                                            | —
```

Two gaps found and closed in the plan: **G1** storage exceptions must be caught inside the
plugin (a wizard must never throw because the browser is in private mode) — added to L4
acceptance; **G2** stored state passes a shape guard before `commit` — added to L4 acceptance.
Catch-alls: none proposed; each class above has its own branch and its own message.

### Section 3: Security & Threat Model

| Threat                                                     | Likelihood | Impact        | Mitigated?                                                                                                                                                                  |
| ---------------------------------------------------------- | ---------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XSS through pasted flow (labels, ids rendered on the page) | Med        | High          | Yes if labels render as text nodes only (T36, restated in S2 acceptance). A React/Vue island renders text by default; the one place to check is the SVG label               |
| Pasted flow with `$ref` names that hit a resolver          | Low        | Low           | The inspector has no registry; `validateFlow`'s `$ref` check is a no-op without one, and nothing is evaluated                                                               |
| Tampered `localStorage` state                              | Low        | Med           | Shape guard (G2), then `commit` treats it as data; `data` values are never evaluated; `stack`/`history` frames must reference existing steps or the guard rejects           |
| Denial of service by a huge paste                          | Med        | Low (one tab) | 1 MB cap before parse; node ceiling in the builder (1.1)                                                                                                                    |
| Supply chain: new site stack dependencies                  | Med        | Med           | Site deps never enter a published package (workspace boundary + `publint`); lockfile frozen in CI; versions pinned                                                          |
| Secrets                                                    | —          | —             | No new secrets. `NPM_TOKEN`, `GITHUB_TOKEN` unchanged                                                                                                                       |
| PII                                                        | —          | —             | The plugin stores whatever the app puts in `data`; document that `persist({ storage })` accepts a custom storage so sensitive flows can point at session storage or nothing |

Input validation for the paste box: nil → empty state; empty string → empty state, no
message; non-JSON → message with position; JSON but wrong shape → `FlowProblem[]`; too long →
rejected; unicode → JSON handles it; HTML in a label → text node. No injection vectors of the
SQL/command/template kind exist: there is no server.

Finding **3.1**: the PII note (custom storage) belongs in the persist docs page → S4
acceptance (auto-decided, P1).

### Section 4: Data Flow & Interaction Edge Cases

```
  INTERACTION / FLOW                 | EDGE CASE                                     | HANDLED? | HOW
  -----------------------------------|-----------------------------------------------|----------|--------------------------------
  persist plugin                     | two tabs on the same key                      | Y        | last commit wins; documented; a `version` bump invalidates
                                     | reload while status is 'busy' (load in flight)| G3 → Y   | transient reset on restore: status 'idle', busy [], errors kept
                                     | quota exceeded mid-session                    | Y        | warn once, continue (Section 2)
                                     | storage disabled                              | Y        | G1
                                     | stored `stack` names a step that no longer exists | G4 → Y | shape guard checks frames against the flow; mismatch → hydrateMismatch
                                     | `set()` per keystroke → one write per commit  | Y (ceiling) | write is synchronous JSON.stringify of a small object; `debounceMs` deferred to 1.1
  README embed                       | two markers with the same name                | Y        | script errors on duplicates
                                     | CRLF checkout on Windows                      | Y        | compare after normalising line endings
  site example page                  | JS disabled / island not yet hydrated         | Y        | code block is static HTML; the island area shows a static frame, not a spinner
                                     | example throws at runtime                     | Partial  | error boundary per island with the message; add to S3 acceptance
  inspector                          | (all rows in flow-inspector.md Section 4)     | Y        | unchanged; plus the 1 MB cap and node ceiling above
  teardown (L8)                      | `typedoc.json`, `turbo.json`, `vitest.config.ts` still list deleted packages | G5 → Y | added to L8's file list
                                     | `pnpm-workspace.yaml` `examples/*` glob        | Y        | keep the glob; `examples/quickstart` lives there
                                     | lockfile drift after deletion                 | Y        | `pnpm install` in the same PR; CI uses `--frozen-lockfile`
  deploy switch (S6)                 | old routes bookmarked                         | Y        | `404.html` with a link to the new landing; no redirect map (nothing to preserve)
```

Gaps G3, G4, G5 are closed by amendment. Finding **4.1** error boundary per island → S3
acceptance (auto-decided, P1).

### Section 5: Code Quality Review

- **Organisation.** `site/` at the repository root (not `packages/site`) keeps "everything
  in `packages/` is published" true; `pnpm-workspace.yaml` gains one line.
  `examples/quickstart` reuses the existing `examples/*` glob.
- **DRY.** The three consumers of one example is the anti-duplication device of this plan.
  The other DRY risk is the persist plugin re-implementing what `LocalStorageAdapter.ts`
  does in 60 lines — it will not: the 0.x adapter serialises a different shape and is
  deleted; the plugin is 40 lines against the hook contract.
- **Naming.** `@wizzard-packages/plugins` with subpath `/persist` matches the ROADMAP table;
  `core/expr` matches the file it re-exports (`expr.ts` holds the evaluator; the builder is
  a new `expr-builder.ts` exported from the `./expr` entry — the evaluator stays in `./`).
  `RecordedSession`, `checkSession`, `buildGraph` already follow verb-noun / noun patterns.
- **Error handling patterns.** One template (`[wizzard] problem. Cause. Fix.`), one place
  where it is enforced (a grep in CI, L6).
- **Missing edge cases** listed in Section 4 and closed.
- **Over-engineering check.** `LayoutAdapter` has two implementations (site, devtools) —
  an interface with two consumers is the minimum that keeps a layout library out of a
  published package. The embed script is ~80 lines; a docs framework would be heavier.
- **Under-engineering check.** L8's deletion list omitted three config files (G5, fixed).
  D3 said "runnable" without saying _how_ it is proven — now the embed script + vitest.
- **Cyclomatic complexity.** Nothing new branches more than five times; the persist init
  path has four outcomes and is written as a straight-line sequence of early returns.

Finding **5.1**: `core/expr` entry naming clarified as above → L2b acceptance (auto-decided, P5).

### Section 6: Test Review

```
  NEW UX FLOWS:
    inspector page (default example, paste, replay, responsive modes)   — flow-inspector.md T8-T16
    example pages (React island, Vue island, StackBlitz button)
    docs pages, API reference, 404
  NEW DATA FLOWS:
    example → test/page/README (embed)
    state → storage → restore → commit (persist)
  NEW CODEPATHS:
    persist: read/parse/guard/mismatch/write/quota/security
    expr-builder → JSON (E3)
    typed generics through createWizard (L2)
    "use client" preserved in dist (L3)
    devtools: graph renderer + LayoutAdapter + state panel (+ record hook if E4)
    teardown: root export flip, ./v1 alias
  NEW BACKGROUND / ASYNC:
    none in the library; site build; Pages deploy
  NEW INTEGRATIONS:
    Shiki (build-time), StackBlitz links (URL only), typedoc → site
  NEW ERROR PATHS:
    Section 2 table, every row
```

| Item                      | Test type                       | Exists in plan? | Happy                       | Failure                               | Edge                                              |
| ------------------------- | ------------------------------- | --------------- | --------------------------- | ------------------------------------- | ------------------------------------------------- |
| quickstart example        | unit (vitest, both bindings)    | yes (E1)        | next/back reaches END       | validation blocks next                | empty data                                        |
| embed script              | unit                            | **added**       | README == file              | missing file, unreferenced file, diff | CRLF, duplicate marker                            |
| persist round-trip        | unit + contract (both bindings) | yes (L4)        | reload restores step + data | mismatch → clean + hook called        | busy reset, quota, security error, tampered stack |
| expr-builder              | unit + property                 | **added**       | `eq(get(x), 1)` == JSON     | —                                     | nested and/or depth                               |
| typed generics            | type test (`@ark/attest`)       | yes (L2)        | wrong id fails              | —                                     | 40-step fixture time                              |
| `"use client"`            | build assertion                 | yes (L3)        | first line of dist          | —                                     | CJS output too                                    |
| devtools renderer         | unit + one e2e                  | yes (L5)        | renders fixture             | unresolved group draws stub           | 200-node flow                                     |
| inspector                 | unit + 5 e2e                    | yes (T32 → L7)  | default renders             | bad paste keeps old graph             | 1 MB cap                                          |
| example-diff              | CI script                       | yes (S3)        | equal                       | drifted                               | —                                                 |
| link check                | CI script                       | yes (D6)        | all 200                     | one 404                               | anchors                                           |
| per-page bundle isolation | size test                       | **added**       | Vue page has no React       | —                                     | shared island utils                               |
| teardown                  | lint 0 warnings; e2e green      | yes (L8)        | —                           | —                                     | —                                                 |
| post-deploy smoke         | workflow step                   | **added**       | page contains "defineFlow"  | —                                     | —                                                 |

2 a.m. Friday test: persist round-trip with a version bump (the one path where a user loses a
form). Hostile QA: paste 1 MB of nested groups → cap + ceiling. Chaos: storage that throws on
every third write → warn once, keep going, never throw.

Pyramid: many unit, a contract layer, ~8 e2e — upright. Flakiness: e2e depend on the site
dev server (readiness probe exists); Lighthouse numbers vary between runs → use `axe` for
the a11y gate and treat Lighthouse as informational (auto-decided, P5). No LLM changes.

Findings **6.1** embed-script tests, **6.2** expr-builder property test, **6.3** bundle
isolation test, **6.4** post-deploy smoke — all added (P1).

### Section 7: Performance Review

No queries, no indexes, no pools. Memory: `history` is bounded (state.ts documents a length
limit), so a persisted state is bounded too — the largest thing in storage is `data`, which
is the app's. Caching: Shiki at build time only; the inspector caches layout per flow id
(T10). Slow paths: (1) site build with N examples — linear, seconds; (2) inspector layout for
a 200-node flow — a layered layout is O(V·E) and stays under 100 ms; (3) persist write on
every commit — `JSON.stringify` of a nine-field object, microseconds; the ceiling is a
10 000-key `data` object, which is the app's decision, not the plugin's. Finding: none new;
`debounceMs` recorded as a 1.1 option in the persist docs (P3).

### Section 8: Observability & Debuggability Review

For a library, "logs" are its error messages and its devtools:

- Every throw site follows `[wizzard] problem. Cause. Fix.` (L6) and a CI grep proves it.
- The persist plugin warns **once** per reason, never per commit, and names the reason.
- Devtools shows the graph, the current frame, the state diff per commit (T15) — that is the
  dashboard. With E4, a bug report can attach a `RecordedSession` and be replayed in the
  inspector; this is the strongest argument for E4 and it is stated at the gate.
- Site: link check, example-diff and a11y gate run in CI; a post-deploy smoke step fetches
  the public URL and asserts a known string (6.4).
- Publish: the registry verification from #19 stays; the false-success failure mode is
  already documented.
- Runbooks: "deploy red" → re-run the workflow, old site stays up; "publish reported
  success but the registry disagrees" → memory `changeset-publish-reports-false-success`;
  "persist disabled" warning in a user's console → the message itself names the cause.

A bug reported three weeks after 1.0.0 can be reconstructed from: the version, the
`FlowDefinition` (JSON — pasteable into the inspector), and a `RecordedSession` if E4 ships.
Without E4 it needs a hand-written fixture. Finding: none beyond E4's justification.

### Section 9: Deployment & Rollout Review

Order: L1 → L2/L3 → S1 → L4/D1/D2 → S2/S3 → D3 (README, early per E1) → L5/L6/L7 → S4/S5 →
D4 → **L8 + S6 + D5/D6 within one day** → R1 → R2 → R3. No migrations. Feature flags: none;
the `./v1` alias is the compatibility shim for one minor. Deploy-time risk window: after S6
merges and before Pages publishes (~3 min) the old site is served — harmless. Old package
versions and new site coexist by design: the site documents 1.0.0 and says so in the header
until R1 lands ("canary" badge, removed at release).

Rollback: site — revert S6; packages — patch release; deprecations — `npm deprecate <pkg>@<range> ""`
clears a message. Post-deploy checklist (first five minutes): public URL returns 200 with the
inspector; the React and Vue example pages hydrate; `npm view @wizzard-packages/core@latest`
shows 1.0.0; `npm view @wizzard-packages/middleware` shows the deprecation. First hour: the
Canary workflow still green on the next merge.

Finding **9.1**: the smoke step (6.4) and the "canary" header badge → S6 acceptance
(auto-decided, P1).

### Section 10: Long-Term Trajectory Review

- **Debt introduced:** the `./v1` alias (remove in 1.1), group traversal deferred (L9,
  recorded in ROADMAP), `debounceMs` deferred, five plugins deferred. All written down.
- **Path dependency:** the site stack is the one decision that is expensive to reverse
  (rewrite of pages). Islands with two frameworks is also the shape Svelte/Solid bindings
  will need, so it points the right way.
- **Knowledge concentration:** AGENTS.md amendments A1–A8 plus this document and
  `flow-inspector.md`. A new engineer can run one test file from the instructions (D1's
  acceptance test).
- **Reversibility: 3/5.** Teardown and site are git-revertible; 1.0.0 on `latest` and the
  deprecation notices are one-way in practice.
- **Ecosystem fit:** ESM-first, Standard Schema, `"use client"` verified against App Router,
  static islands — the 2026 defaults.
- **The 1-year question:** a new engineer reads this plan in 12 months and finds a tree with
  one library, a site whose examples are tests, and a README that CI keeps honest. Obvious.
- **What comes after:** roadmap phase 5 (server-driven `http-flow`, AI generation, MCP) —
  the JSON flow and the `core/expr` builder are the platform they build on.
- **Retrospective on cherry-picks:** E1 and E3 are load-bearing for D3's quality; E8 (URL
  sync) was deferred and is _not_ needed by anything accepted.

Finding: none new.

### Section 11: Design & UX Review

Information architecture of the site (what the visitor sees first, second, third):

```
  /                 inspector, default example already drawn ── one sentence ── install line
  /docs/start       React | Vue | headless tabs, one example each, timed "under five minutes"
  /docs/*           flow · expressions · navigation · validation · persistence · devtools · server-driven (1.1)
  /examples/*       one page per example: code (Shiki) | live (island) | "open in StackBlitz"
  /api/*            typedoc
  404               one line + link home
```

Interaction state coverage (site-wide; the inspector's own table is T12):

```
  FEATURE            | LOADING                 | EMPTY                  | ERROR                       | SUCCESS         | PARTIAL
  -------------------|-------------------------|------------------------|-----------------------------|-----------------|------------------
  example island     | static frame, no spinner| n/a (always has a flow)| boundary with the message   | live wizard     | JS off: code only
  inspector paste    | none (sync)             | default example shown  | inline problems list        | graph replaced  | graph kept, list shown
  replay scrubber    | none                    | disabled + reason (T9) | fixture problems (checkSession) | scrubbing    | —
  docs search        | out of scope 1.0.0      | —                      | —                           | —               | —
  404                | —                       | one line + link        | —                           | —               | —
```

Journey: land → see a graph move (5 s, "this is different") → read one sentence → copy the
install line → open Getting started → run the example (5 min, "it worked") → come back with a
question → find the docs page whose example is the answer (reflective: "I trust this").
The arc breaks if the first screen is a hero with a headline and no graph — Premise 2 forbids
that.

AI-slop risk: the plan bans the default palette and default font stacks (S1), puts the
product (the graph) rather than a headline first, and has no three-column feature grid
anywhere. **No `DESIGN.md` exists** — finding **11.1**: S1's token file (`site/src/styles/tokens.css`)
is written first and a short `site/DESIGN.md` names the typefaces, the palette and the three
motions the site uses (step transition, graph rebuild, scrubber). Responsive: T14 covers the
inspector; docs pages are single-column below 900 px with the code block scrolling
horizontally inside its own container. Accessibility: T11 (table mirror), keyboard for the
scrubber (arrow keys) and the paste box, 44 px targets, body text ≥ 16 px, `axe` in CI.

Recommendation: the design phase of this pipeline (Phase 2) runs next and scores these.

## Required Outputs (Phase 1)

### NOT in scope

- A third engine rewrite — v1 is the rewrite.
- `@wizzard-packages/compat` — cut on downloads; MIGRATION.md instead.
- Plugins beyond `/persist` (E8 `url-sync` deferred to TODOS; analytics, logger, autosave,
  http-flow on the roadmap).
- Group/repeat traversal in the engine (L9 → 1.1, reversible if an example needs it).
- a11y contract in bindings (E9 → TODOS).
- Inspector state in the URL (E10 → TODOS).
- `npm create wizzard` (E11 → roadmap).
- Docs search — 1.0.0 ships without it; the site is small enough to scan.
- Changing the host (Vercel) — Pages works; not asked.

### What already exists

The two tables in "What is already true" and Step 0B. Everything but `examples/quickstart`,
`scripts/embed-examples.ts`, the persist plugin, `expr-builder.ts` and `site/` reuses code
that is in the tree today.

### Error & Rescue Registry

Section 2's second table, in full. Two gaps (G1, G2) found and closed by amendment.

### Failure Modes Registry

```
  CODEPATH                 | FAILURE MODE                         | RESCUED? | TEST? | USER SEES?               | LOGGED?
  -------------------------|--------------------------------------|----------|-------|--------------------------|--------
  persist.read             | storage throws                       | Y (G1)   | Y     | warning once             | Y
  persist.read             | malformed / wrong shape / mismatch   | Y (G2)   | Y     | clean start, warning     | Y
  persist.write            | quota exceeded                       | Y        | Y     | warning once             | Y
  persist restore          | transient status restored as busy    | Y (G3)   | Y     | —                        | —
  persist restore          | stack names a deleted step           | Y (G4)   | Y     | clean start, warning     | Y
  embed script             | drift / missing / unreferenced       | Y        | Y     | CI red with path         | Y
  site build               | example fails to compile             | Y        | Y     | CI red                   | Y
  site page                | island throws at runtime             | Y (4.1)  | Y     | boundary message         | Y
  inspector paste          | not JSON / not a flow / too big      | Y        | Y     | inline message           | n/a
  graph builder            | thousands of nodes                   | Y (1.1)  | Y     | truncated + notice       | n/a
  teardown                 | config file still lists a package    | Y (G5)   | Y     | CI red                   | Y
  deploy                   | build red                            | Y        | —     | old site stays           | Y
  publish                  | registry disagrees with changesets   | Y (#19)  | Y     | workflow red             | Y
  post-deploy              | page served but wrong                | Y (6.4)  | Y     | smoke step red           | Y
```

No row is RESCUED=N ∧ TEST=N ∧ silent. **0 critical gaps** after amendments.

### Dream state delta

This plan reaches every row of the 12-month ideal except: plugins beyond `/persist`, group
traversal, Svelte/Solid, server-driven and AI generation — all roadmap phase 5, all built on
the JSON flow and the expression builder this plan ships.

### Diagrams produced

System architecture (Section 1), data flow with shadow paths ×2 (Section 1), state machine
(Section 1), error flow (Section 2 table), deployment sequence (Section 9), rollback (Section
9 prose; trivial: revert / patch). Stale diagram audit: `ROADMAP.md`'s "defineFlow → JSON →
engine" diagram stays accurate; `README.md`'s two package trees are deleted with the README.

### Implementation Tasks (CEO phase)

- [ ] **C1 (P1, human ~4h / CC ~1h)** — docs — `examples/quickstart/` (flow, React, Vue, vitest) + `scripts/embed-examples.ts` with CI check; README rewritten from it (E1)
  - Files: `examples/quickstart/*`, `scripts/embed-examples.ts`, `README.md`, `.github/workflows/ci.yml`
  - Verify: `pnpm test:run -- quickstart` green; `node scripts/embed-examples.ts --check` exits 0; a deliberate edit to the README block exits 1
- [ ] **C2 (P1, human ~1h / CC ~10m)** — docs — one honest line each on `@stepperize/react` and XState in the README (E2)
  - Verify: present, under 40 words each, no adjectives
- [ ] **C3 (P2, human ~8h / CC ~45m)** — core — `expr-builder.ts` behind `@wizzard-packages/core/expr`, own `.size-limit.js` entry; property test that every builder output evaluates identically to the hand-written JSON (E3, 5.1, 6.2)
  - Verify: `pnpm size` shows the new entry; `core-v1` unchanged
- [ ] **C4 (P1, human ~4h / CC ~30m)** — plugins — persist: shape guard, frame check against the flow, transient reset on restore, storage exceptions caught, one warning per reason (G1–G4)
  - Verify: contract test rows for each of the five cases on both bindings
- [ ] **C5 (P1, human ~1h / CC ~10m)** — build — L8 also edits `typedoc.json`, `turbo.json`, `vitest.config.ts`; e2e specs deleted in the same PR (G5)
  - Verify: `pnpm build && pnpm docs:api && pnpm test:e2e` green on the teardown branch
- [ ] **C6 (P2, human ~2h / CC ~15m)** — core/site — inspector rejects pastes over 1 MB before parsing; builder emits `graph/too-many-nodes` as a problem above 500 nodes (T34, 1.1)
  - Verify: unit test for the ceiling; e2e for the cap
- [ ] **C7 (P2, human ~1h / CC ~10m)** — ci — post-deploy smoke step in `deploy-docs-ui.yml`; per-page bundle isolation test; `axe` a11y gate (6.3, 6.4, 9.1)
  - Verify: workflow green with the new steps; a Vue page importing React fails the size test
- [ ] **C8 (P2, human ~1h / CC ~10m)** — docs — D2 records a GitHub code search for `@wizzard-packages/` dependents; persist docs page carries the PII / custom-storage note (0A, 3.1)
  - Verify: MIGRATION.md cites the search date and count
- [ ] **C9 (P2, human ~2h / CC ~15m)** — site — `site/DESIGN.md` + `tokens.css` written before the first page; error boundary per example island (11.1, 4.1)
  - Verify: file exists and is referenced from S1's PR description; an island that throws shows its message

### Completion Summary

```
  +====================================================================+
  |            MEGA PLAN REVIEW — COMPLETION SUMMARY (Phase 1)        |
  +====================================================================+
  | Mode selected        | SELECTIVE EXPANSION (autoplan override)     |
  | System Audit         | 3 style refs, 2 anti-patterns, 36 prior     |
  |                      | tasks mapped, no eureka                     |
  | Step 0               | approach C; 11 expansions: 6 approved,      |
  |                      | 1 taste, 3 deferred, 1 skipped; 1 premise   |
  |                      | queued for the gate                         |
  | Section 1  (Arch)    | 2 issues found (node ceiling, embed markers)|
  | Section 2  (Errors)  | 17 error paths mapped, 2 GAPS closed        |
  | Section 3  (Security)| 1 issue found, 0 High severity              |
  | Section 4  (Data/UX) | 15 edge cases mapped, 3 gaps closed, 1 fix  |
  | Section 5  (Quality) | 1 issue found                               |
  | Section 6  (Tests)   | Diagram produced, 4 gaps closed             |
  | Section 7  (Perf)    | 0 issues found                              |
  | Section 8  (Observ)  | 0 gaps found (E4 justified)                 |
  | Section 9  (Deploy)  | 1 risk flagged, closed                      |
  | Section 10 (Future)  | Reversibility: 3/5, debt items: 4, all logged|
  | Section 11 (Design)  | 1 issue (no DESIGN.md) → C9                 |
  +--------------------------------------------------------------------+
  | NOT in scope         | written (9 items)                           |
  | What already exists  | written                                     |
  | Dream state delta    | written                                     |
  | Error/rescue registry| 13 methods, 0 CRITICAL GAPS after amendment |
  | Failure modes        | 14 total, 0 CRITICAL GAPS                   |
  | TODOS.md updates     | 3 items proposed (E8, E9, E10) — written by |
  |                      | Phase 3 (Eng collects all phases)           |
  | Scope proposals      | 11 proposed, 6 accepted, 1 taste            |
  | CEO plan             | this section (persisted in the plan file)   |
  | Outside voice        | see Step 0.5 below                          |
  | Lake Score           | 9/9 recommendations chose the complete option|
  | Diagrams produced    | 6 (arch, 2 data flows, state, error, deploy)|
  | Stale diagrams found | 0 (README trees deleted with the README)    |
  | Unresolved decisions | 0 in this phase; 1 premise + 1 taste + the  |
  |                      | site-stack question travel to the gate      |
  +====================================================================+
```

## Step 0.5. Dual Voices (CEO)

Both voices read the plan as it stood before the amendments below; the amendments are their
result. Codex ran with the plan inlined (its first run could not read the file: the Windows
sandbox refused to spawn the exec helper, error 1223) and was told this is a solo open-source
project whose owner has declined "earn the audience first" discipline. The Claude subagent
was told nothing beyond the plan, so its market framing is its own.

### CODEX SAYS (CEO — strategy challenge)

Eight blind spots, quoted in substance:

1. **"Done right" is measured as repository cleanliness.** Warnings, budgets and matching
   snippets measure discipline, not whether someone can build a difficult wizard without
   escaping the abstraction. Choose three demanding reference applications — conditional
   onboarding with backtracking, a reloadable application with async validation, an editable
   repeated section — and make them release evidence.
2. **The inspector may demonstrate a product the engine does not ship.** The graph draws
   groups while the engine walks one level. Deferring nesting "because no selected example
   needs it" is circular: the plan controls the examples. Decide whether groups belong to
   the 1.0 execution model; if not, unsupported definitions must fail clearly and the
   inspector must distinguish visualisation from executable behaviour.
3. **Persistence is framed as a package replacement, not a behavioural contract.** Which
   fields are durable? What happens to pending navigation, outdated validation, corrupted
   snapshots, sensitive data? A raw state round-trip makes internal layout a public format.
   Specify a versioned durable snapshot contract first.
4. **The alternatives explore sequencing, not scope.** Missing: docs-first then inspector;
   inspector in the site only with devtools deferred; a documentation shell; a release
   candidate period exercising the final exports before the switch.
5. **Devtools is a second product commitment** for a solo maintainer; host-supplied
   positions transfer the hardest integration work to users.
6. **Competitive risk is reduced to comparison with the deprecated 0.x.** Say which
   recurring failures the abstraction eliminates — stale async transitions, duplicated
   framework logic, inconsistent backtracking, non-portable definitions — and demonstrate
   them. Size supports the argument; it cannot carry it.
7. **Budgets can reward distortion.** 3.88 kB under a 3.9 kB ceiling leaves no room; an
   unexplained 0.8 kB persistence ceiling risks trimming semantics.
8. **The release choreography lacks a stabilisation boundary.** Move branch protection and
   credentials first; test packed artefacts with final root exports in clean consumer
   fixtures; delete old demos and their tests only after the replacement covers them.

Verdicts: premises CONCERN · right problem CONFIRMED · scope CONCERN · alternatives CONCERN ·
competitive CONCERN · trajectory CONCERN.

### CLAUDE SUBAGENT (CEO — strategic independence)

1. **Right problem, framed too narrowly:** three problems of different urgency (a decayed
   npm page, a 0.x deletion, a bespoke site) are bundled, so the highest-leverage fix (the
   README) is gated behind teardown and an undecided stack. Split D3 out and ship it now.
2. **Premises:** compat-cut uses downloads as a proxy for dependents (no dependents check);
   persistence-as-blocker asserted without user evidence; the site stack is an unresolved
   architecture decision inside a "chosen" plan.
3. **Six-month regret:** a polished site and six packages for a library that has not proven
   pull; `examples/demo` and the StackBlitz templates deleted with no interim replacement.
4. **Alternatives:** soft-launch docs on the existing `packages/ui`; a boring markdown
   README + default typedoc theme instead of a designed site.
5. **Competitive risk not analysed:** no competitor named; "flow as data + inspector" not
   positioned against XState's visualiser or `@stepperize/react`.

Verdicts: all six CONCERN. Note: this voice applied the "earn the audience first"
discipline the owner explicitly declined; its process findings (README first, dependents
check, name competitors, stack undecided) stand regardless of that framing.

### CEO DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════
  Dimension                             Claude    Codex     Consensus
  ──────────────────────────────────── ───────── ───────── ────────────────────
  1. Premises valid?                    CONCERN   CONCERN   CONFIRMED (concern) — persistence needs a contract, compat-cut needs a dependents check → amended
  2. Right problem to solve?            CONCERN   CONFIRMED DISAGREE → the disagreement is Claude's market framing; Codex's "right problem" stands with the reference-app reframing → amended
  3. Scope calibration correct?         CONCERN   CONCERN   CONFIRMED (concern) — in OPPOSITE directions (Claude: smaller; Codex: prove the contract). Resolved by adding evidence (R-A/B/C), not size → amended; devtools publish → TASTE
  4. Alternatives sufficiently explored? CONCERN  CONCERN   CONFIRMED (concern) — four scope alternatives added and rejected on grounds; RC period accepted → amended
  5. Competitive/market risks covered?  CONCERN   CONCERN   CONFIRMED (concern) — README makes outcome claims + names two competitors → amended (D3)
  6. 6-month trajectory sound?          CONCERN   CONCERN   CONFIRMED (concern) — group traversal / inspector honesty (Codex) is the durable one → Premise 6 added, L9 → gate
═══════════════════════════════════════════════════════════════════════════════
```

Five of six dimensions are shared concerns; one disagreement. Nothing rises to a User
Challenge from this phase alone: the two voices do not jointly recommend changing an
owner direction. The single-voice critical findings that are flagged regardless: Codex 2
(groups drawn but not executable) and Codex 5 (devtools as a product commitment) — both go
to the gate as taste decisions with a recommendation.

### Amendments applied to the plan body from this phase

| #   | Source                       | Amendment                                                                                                                                                                                                                    |
| --- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M1  | Codex 1, 6                   | New section "What 'done right' means here": three reference applications R-A/R-B/R-C as release evidence; they replace the fifteen deleted specs and are the site's examples (S3, L8 precondition)                           |
| M2  | Codex 2                      | Premise 6 (the inspector draws only what the engine runs); L9 becomes a gate decision with a recommendation to include group traversal in 1.0.0, and a defined fallback (`flow/groups-unsupported`, "drawn, not executable") |
| M3  | Codex 3                      | L4 is now a versioned durable `Snapshot` contract in core (`toSnapshot`/`fromSnapshot`, transient fields named, frames validated, lazy revalidation) plus the plugin                                                         |
| M4  | Codex 4, 8                   | Four rejected alternatives written out; R0 release candidate with packed tarballs in three clean consumer fixtures on the `next` tag; R3 moved to day 0                                                                      |
| M5  | Codex 5                      | L5 carries a built-in layered layout; "publish devtools or site-only" → gate                                                                                                                                                 |
| M6  | Codex 7                      | A3 restated: budgets are ratchets set after correctness; L4's budget is set after its tests pass                                                                                                                             |
| M7  | Claude 1                     | D3 moved to step 2 of Next Steps, gated on `examples/quickstart` + the embed script (E1)                                                                                                                                     |
| M8  | Claude 2                     | D2 records a dated dependents search (C8)                                                                                                                                                                                    |
| M9  | Claude 5, Codex 6            | D3 makes three outcome claims and names `@stepperize/react` and XState (E2)                                                                                                                                                  |
| M10 | Claude 2, design + DX voices | The site stack is decided in the plan (Astro + Starlight, reasons stated) and flagged at the gate as the reversal of an owner decision                                                                                       |

> **Phase 1 complete.** Codex: 8 concerns. Claude subagent: 5 issues.
> Consensus: 5/6 shared concerns, 1 disagreement; 2 single-voice criticals → gate as taste.
> 10 amendments applied to the plan body. Passing to Phase 2 (Design).

---

# GSTACK REVIEW — Phase 2: Design

UI scope detected in Phase 0 (14 matches; a new site, an inspector, example islands, a
devtools panel). Mode: all seven passes, auto-decided; aesthetic choices marked TASTE.

## Step 0: Design Scope Assessment

- **Initial rating of the plan as first drafted: 3/10.** First paint was specified (the
  inspector), nothing after it was: no homepage composition, no nav, no states beyond the
  happy path, "responsive modes" as two words, `Lighthouse ≥ 95` as the whole a11y spec.
- **DESIGN.md:** none in the repository. The 0.x site's `packages/ui/src/index.css` carries
  tokens for a brand that is being replaced; not reused.
- **Existing design leverage:** `flow-inspector.md` Phase 2 (2026-09-03) already scored the
  inspector page's seven passes and produced T8–T16; those remain the inspector's design
  spec and are referenced, not restated. Starlight's docs shell (sidebar, TOC, visited-link
  colours, reduced-motion) is reused and restyled through tokens.
- **Focus areas:** homepage composition, interaction states across the four surfaces
  (homepage graph, example islands, inspector, docs), responsive and a11y contracts, and
  the one contradiction the plan carried (Premise 2 "side by side" vs S3 "one runtime per page").

## Step 0.5: Dual Voices (design)

The Claude subagent read the first draft with no other context. Codex read the Phase 1
amended plan and the CEO consensus summary, inlined.

### CODEX SAYS (design — UX challenge)

1. **The hierarchy serves the author.** A graph demonstrates the architecture before
   explaining why to choose it. The first screen needs the product name and an explicit
   promise ("Headless multi-step flows for React and Vue"), a primary "Get started" and a
   secondary "Explore this flow"; the install line alone is not onboarding. "Nothing else
   above the fold" is arbitrary.
2. **The inspector must show cause and effect.** A graph already drawn is not evidence that
   anything runs. Put a compact usable form beside it — "Change payer type to see the route
   change" — and define the modes: live execution, node inspection, recorded replay; how
   selecting a node behaves, whether scrubbing replaces live state, how to return.
3. **Task-oriented headlines for the three applications:** "Change your answer. Keep the
   right data." / "Reload halfway through. Continue safely." / "Add passengers. Revisit any
   passenger." One job per page: show the outcome, then the implementation.
4. **Resolve the framework contradiction:** Premise 2 (both bindings side by side) vs S3
   (no cross-runtime on a page). Use a persistent React/Vue selector remembered across docs,
   examples, install and code; comparison is explicit, not the default.
5. **States are partial.** Missing: pre-hydration controls visibly unavailable; invalid
   input labelled as the last valid graph with recovery; empty → "Load example"; island
   failure → "Restart example"; persistence failure/reset explained to the person; pending
   validation → navigation availability and cancellation; replay mismatch → how to get a
   matching recording. Premise 6 and L9 need reconciliation: "drawn, not executable" is a
   separate preview mode, never the runnable showcase.
6. **Responsive is a capability cutoff.** Keep the form interactive on phones; show the
   route as a compact step list; the full graph available separately; specify sheet
   dismissal and focus return; breakpoints from content fit.
7. **Accessibility mostly unfinished.** Tabbing through 500 nodes is unusable: one graph
   entry point with directional navigation plus the list alternative; visible focus,
   non-colour state indicators, numeric contrast, touch targets, reduced motion, validation
   announcements, focus placement after a step change. Deferring the bindings' a11y contract
   does not excuse inaccessible reference applications.
8. **Visual specificity is uneven.** Two fonts and one accent are constraints, not a
   system: specify typography roles, reading width, graph density, semantic colours,
   borders, selected states; motion with a purpose and reduced-motion equivalents.

Litmus against the written plan: 1 NO · 2 YES · 3 NO · 4 NO · 5 NO (cards not necessary —
agrees with the plan's cardless default) · 6 NO · 7 NO.

### CLAUDE SUBAGENT (design — independent review)

1. **First paint is right, everything after is unspecified** — homepage content once the
   0.x hero-card grid is deleted, nav, the CTA out of the inspector.
2. **Missing states:** the paste rejection's visual, island hydration lag, the "coming in
   1.1" server-driven page's shape, a "you did it" moment on the docs path.
3. **Journey is stronger than average** (working artefact first, live examples from the
   same source, timed TTHW) but breaks at the handoff out of the inspector.
4. **Specific about code, generic about screen:** real budgets and paths, only negative
   visual constraints, "responsive modes" unexplained.
5. **What will haunt the implementer:** the site stack (blocking, unresolved in the first
   draft), `LayoutAdapter` criteria, devtools chrome, palette/typography.

Verdicts: hierarchy CONCERN · states CONCERN · journey CONFIRMED · specificity CONCERN ·
design system CONCERN · responsive CONCERN · accessibility CONCERN.

### DESIGN LITMUS SCORECARD — CONSENSUS

The two voices used different instruments (seven dimensions vs seven litmus checks); the
table aligns them by topic. Both read a plan whose visual system is deliberately a first
task (S1) rather than a paragraph in this document, so "NO" on visual items measures the
document, not the intent.

```
═══════════════════════════════════════════════════════════════════════════════
  Dimension                         Claude     Codex            Consensus
  ───────────────────────────────── ────────── ──────────────── ────────────────────────
  1. Hierarchy serves the user      CONCERN    NO (brand)       CONFIRMED concern → hero gets name, promise, two actions (D-M1)
  2. Interaction states specified   CONCERN    (8 gaps listed)  CONFIRMED concern → state table extended (D-M3)
  3. User journey coherent          CONFIRMED  NO (scan/jobs)   DISAGREE → task-oriented headlines + one job per page (D-M2); Codex's reading stands after amendment
  4. UI decisions specific          CONCERN    NO (motion)      CONFIRMED concern → DESIGN.md content list fixed (G1), motion purposes named
  5. Design system alignment        CONCERN    NO (premium)     CONFIRMED concern → tokens + DESIGN.md first (G1)
  6. Responsive intentional         CONCERN    (cutoff)         CONFIRMED concern → mobile keeps the form; step list; graph separate (D-M4)
  7. Accessibility specified        CONCERN    (unfinished)     CONFIRMED concern → graph entry point + directional nav; a11y in the reference apps (D-M5)
  Litmus 2 (one visual anchor)      —          YES              the graph — agreed
  Litmus 5 (cards necessary)        —          NO               agrees with the plan: no cards
═══════════════════════════════════════════════════════════════════════════════
```

6/7 confirmed concerns, 1 disagreement (resolved by amendment, not by choosing a side).
No User Challenge: neither voice asks to reverse "the inspector is the first screen"; both
ask it to explain itself.

### Amendments applied to the plan body from this phase

| #    | Source            | Amendment                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-M1 | Codex 1, Claude 1 | S1 hero: product name, one-line promise, the live R-A graph, primary "Get started", secondary "Explore this flow", install line as a copy button; the three applications as three rows below with task-oriented headlines                                                                                                                                                                                                                                                             |
| D-M2 | Codex 2, 3        | S2 defines three inspector modes — **Live** (the built-in example runs; a compact form beside the graph; "change the payer type and watch the route change"), **Replay** (a recording; scrubber; "back to live" always visible), **Preview** (a pasted flow: structure only, labelled "structure preview — no registry, nothing runs"). Selecting a node inspects, never navigates. Groups drawn in Preview; run in Live only if L9 ships                                             |
| D-M3 | Codex 5, Claude 2 | Interaction state table extended with pre-hydration, last-valid-graph labelling, "Load example", "Restart example", persistence restored/discarded message in R-B, pending validation (Next disabled + inline "checking…" + cancel on back), replay mismatch help                                                                                                                                                                                                                     |
| D-M4 | Codex 6           | Responsive rewritten: below 640 px the form stays interactive, the route is a compact step list, "View graph" opens a full-screen pannable graph; sheet dismissal returns focus to its trigger; breakpoints at 640 / 1100 chosen from content fit                                                                                                                                                                                                                                     |
| D-M5 | Codex 7, Claude 5 | A11y: the graph is one focus stop; arrow keys move between nodes, Enter inspects, Esc returns; the table mirror is visually hidden but exposed to assistive technology; `aria-live` announces validation results and step changes; focus moves to the new step's heading; non-colour indicators (shape + label) for active/visited/blocked; contrast ≥ 4.5:1 body, ≥ 3:1 UI; 44 px targets. R-A/R-B/R-C implement this by hand and become the basis of the 1.1 bindings contract (E9) |
| D-M6 | Codex 4           | Premise 2 reworded: React and Vue are both first-class, selected once and remembered; a page mounts one runtime at a time; comparison is an explicit toggle. S3's isolation test stands                                                                                                                                                                                                                                                                                               |
| D-M7 | Codex 8, Claude 4 | G1's `DESIGN.md` must contain: typography roles (display, body, code), reading width, graph density rules, semantic colours (active, visited, blocked, error, group), borders and selected states, the three motions and their reduced-motion equivalents. Fonts and accent are chosen there (TASTE, not in this plan)                                                                                                                                                                |

## Pass 1: Information Architecture — 8/10 (was 3/10 before the Phase 1 amendments)

What the visitor sees first, second, third, per page:

```
  /                      1 the R-A graph, already drawn, full-bleed     2 one sentence     3 install line
                         (below the fold: three reference apps as three rows — name, one line, "open")
  /docs/start            1 tabs React | Vue | headless   2 the quickstart code + live island   3 "under five minutes" promise
  /docs/<topic>          1 the example for the topic (code + live)   2 the prose   3 the API links
  /examples/<ref>        1 live app (island)   2 its FlowDefinition   3 React | Vue source tabs, StackBlitz
  /inspector             1 graph   2 state panel (diff)   3 scrubber; paste box collapsed until asked for
  /api/*                 typedoc, Starlight sidebar
  404                    one line, link home
```

Nav: Docs · Examples · API · GitHub — four items, no dropdowns. Constraint worship: if the
homepage could show three things they are the graph, the sentence, the install line, and
that is all it shows above the fold. The Claude design voice's concern — "everything after
first paint is unspecified" — was true of the first draft and is closed by S1's homepage
composition and this table. Remaining gap (why not 10): the docs sidebar order is not
written; auto-decided: it follows the Getting-started → Flow → Expressions → Navigation →
Validation → Persistence → Devtools → Errors → Server-driven order of S4 (P5).

## Pass 2: Interaction State Coverage — 7/10 (was 2/10)

```
  FEATURE                 | LOADING                              | EMPTY                              | ERROR                                       | SUCCESS                         | PARTIAL
  ------------------------|--------------------------------------|------------------------------------|---------------------------------------------|---------------------------------|-------------------------------
  homepage graph          | pre-rendered SVG in the HTML; island | never — R-A is baked in            | island fails → the static SVG stays, a one-  | graph animates the first        | JS off: the static SVG, no
                          | hydration adds interaction, no spinner|                                    | line note under it                          | transition on hover             | scrubber
  example island (S3)     | static frame of step 1 in the HTML   | never                              | boundary: message + "open the source"       | the app runs                    | JS off: code only
  inspector paste (S2)    | none (sync parse)                    | default example, box collapsed     | problems listed under the box; graph kept   | graph replaced, positions frozen| graph kept, list shown
  replay scrubber (S2)    | none                                 | disabled + "no recording for this  | fixture problems from checkSession, listed  | current node highlighted, state | —
                          |                                      | flow" (T9)                         |                                             | diff shown                      |
  paste over 1 MB         | —                                    | —                                  | "too large to draw here (1 MB)" before parse| —                               | —
  docs search (Pagefind)  | index loads on first focus           | "nothing for <query>" + 3 top pages| index missing → box hidden, not broken      | results                         | —
  StackBlitz button       | —                                    | —                                  | opens in a new tab; nothing to fail locally | —                               | —
  404                     | —                                    | one line + link home               | —                                           | —                               | —
  RC badge (S6)           | —                                    | —                                  | —                                           | "1.0.0 release candidate" until R1 | —
```

Each state names what the user sees. Gap (why not 10): the state panel's own loading/empty
(a step with no data yet) is not specified — auto-decided: an empty `data` slice renders the
slice name and "no data yet", never an empty box (P1). Added to S2 acceptance.

## Pass 3: User Journey & Emotional Arc — 8/10 (was 4/10)

```
  STEP | USER DOES                          | USER FEELS                       | PLAN SPECIFIES?
  -----|------------------------------------|----------------------------------|--------------------------------------------
  1    | lands on /                         | "that graph is moving — what is it?" (5 s) | S1: graph first, one sentence
  2    | reads the sentence, sees install   | "a wizard is JSON. ok."          | S1 copy; D3's outcome claims echo it
  3    | scrolls: three reference apps      | "these are real, not toys"       | "What done right means": R-A/B/C named
  4    | opens Getting started, picks React | "will this take an hour?"        | S4: timed promise, one file, static frame before hydration
  5    | pastes the quickstart, runs it     | "it worked" (5 min)              | D3/C1: the file CI runs is the file they pasted
  6    | comes back with a question         | "where is persistence?"          | S4 page order + Pagefind
  7    | hits an error                      | "what now?"                      | L6: cause, fix, link to /errors/<code>
  8    | files a bug                        | "will they understand me?"       | E4 record hook → a replayable session file (gate)
```

Where it breaks: the Claude design voice's point — there is no handoff _out_ of the
inspector. Auto-decided (P1): the inspector page ends with one line and two links — "Run
this yourself" → `/docs/start`, "See the three apps" → `/examples` — and the homepage's
install line is a copy button, not text. Added to S1/S2. Time horizons: 5-second (graph),
5-minute (quickstart), 5-year (the README's outcome claims are what they remember).

## Pass 4: AI Slop Risk — 8/10 (was 6/10)

Classifier: **HYBRID** — a landing hero (the inspector) over an app-like docs shell.
Hard-rejection scan against the plan text: no card grid as first impression (the graph is);
no image-with-weak-brand (no images); headline with action (install line); no busy imagery
behind text; no repeated mood sections (three reference apps are three different jobs); no
carousel; docs pages are layout, not stacked cards. Blacklist scan: default palette banned,
system font stacks banned, no three-column feature grid, no centred-everything rule, no
emoji, no coloured left borders, no "Welcome to" copy, no cookie-cutter rhythm — the
homepage is graph → sentence → install → three rows, then it ends.

Landing rules applied to the hero: brand is the graph itself (the product is the anchor);
typography is named in `DESIGN.md` (two typefaces, not system); the hero is full-bleed; one
headline, one sentence, one install line, one graph; motion: graph rebuild, step transition,
scrubber — three intentional motions, no decorative ones. Universal rules: CSS variables in
`tokens.css`; body ≥ 16 px; visible labels on the paste box; visited links distinct
(Starlight default, kept).

Litmus (plan-level): 1 brand unmistakable — YES (the graph _is_ the product) · 2 one visual
anchor — YES · 3 scannable by headlines — YES (one job per section) · 4 one job per section
— YES · 5 cards necessary — the three reference-app rows are rows, not cards: YES by
absence · 6 motion improves hierarchy — YES (the graph moving is the hierarchy) · 7 premium
without decorative shadows — YES (none planned).

Why not 10: the two typefaces and the accent are not yet named in the plan (they are
`DESIGN.md`'s job in S1, written before the first page). The Claude voice called the first
draft "specific about code, generic about screen"; the amended S1/S2 close that for
composition, states and keyboard; typography and colour are deliberately left to the token
file so the plan does not pretend to be a design system.

## Pass 5: Design System Alignment — 6/10 (was 2/10)

No `DESIGN.md` exists in the repository. The 0.x site's `packages/ui/src/index.css` has a
token set the previous review (T13) proposed to reuse; that site is deleted, and its tokens
were the 0.x brand. Auto-decided (P5, explicit): `site/DESIGN.md` + `tokens.css` are written
first in S1 and are the design system — the inspector's node and edge colours derive from
them (T13 restated against the new file, not `packages/ui`). The devtools panel (L5)
consumes the same tokens through CSS variables with a fallback, so a host app without the
site's styles still gets a readable panel. New components: graph node, edge label, scrubber,
state-diff panel, example island frame, problems list — six, each named here so D4 and the
site use the same vocabulary. Why not 10: the tokens do not exist yet; the score is for the
plan's intent and mechanism.

## Pass 6: Responsive & Accessibility — 7/10 (was 1/10)

Per viewport (intentional layout changes, not "stacked"):

```
  ≥ 1100 px   inspector: graph left 60 %, state panel right 40 %, scrubber full width below
              docs: Starlight sidebar + content + on-page TOC
  640–1100    inspector: graph full width, state panel as a bottom sheet (tablet mode, T14)
              docs: sidebar collapses to a menu button; TOC dropped
  < 640       inspector: read-only — graph pannable, no paste, no scrubber, a line saying so
              docs: single column; code blocks scroll inside their container, never the page
```

Accessibility: keyboard spec in S2 (arrow keys on the scrubber, Tab through nodes, Enter
opens a node's state), the hidden table mirror (T11) as the screen-reader path for the
graph, 44 px targets on the scrubber and nav, contrast ≥ 4.5:1 enforced by `axe` in CI, body
≥ 16 px, focus rings never removed, `prefers-reduced-motion` disables the three motions.
The Claude voice's point that a Lighthouse score is a proxy is accepted: the gate is `axe`

- a keyboard-only Playwright spec, Lighthouse is informational (Phase 1 §6). Why not 10:
  touch behaviour of the graph (pinch-zoom vs page scroll) is unspecified — auto-decided:
  the graph is pannable by drag and zoomable by buttons; pinch is left to the browser (P5).
  Added to S2.

## Pass 7: Unresolved Design Decisions

```
  DECISION NEEDED                                   | IF DEFERRED, WHAT HAPPENS                                  | DECIDED HERE?
  --------------------------------------------------|------------------------------------------------------------|---------------
  Typefaces and accent colour                       | the implementer picks Inter + indigo; slop                 | S1: named in DESIGN.md before page one; not chosen in this plan
  Devtools panel chrome (overlay / docked / window) | each host embeds it differently; screenshots never match   | auto-decided: a docked panel the host places; no floating overlay, no portal (P5)
  Graph node shape for atom / group / repeat / END  | drawn ad hoc, inconsistent with devtools                   | auto-decided: rounded rect / double-border rect / stacked rect / filled circle; the same four in site and devtools
  Edge label overflow for long `when` expressions   | labels overlap edges                                       | auto-decided: infix pretty-print, truncate at 32 chars with the full text on hover and in the table mirror (T8)
  Where the "Open in StackBlitz" button sits        | above the code, below the code, both                       | auto-decided: once, top-right of the code block, on every example page
  Light theme: full or "dark only"                  | dark-only sites are unreadable in daylight for docs readers | auto-decided: both; dark default; system preference honoured (P1)
  Docs page width                                   | Starlight default (62 ch)                                  | kept — Starlight default; code blocks may exceed and scroll
```

Nothing here waits for a person; the two taste-shaped ones (typefaces, colour) are named as
the first task of S1 rather than guessed in a planning document.

## Required Outputs (Design)

### NOT in scope (design)

- A visual mockup pass — the token file and DESIGN.md come first in S1; mockups follow the
  tokens, not a plan.
- Illustrations, hero imagery, a logo redesign — the graph is the brand.
- Docs search UI beyond Pagefind's default.
- Mobile editing in the inspector (read-only below 640 px by decision).

### What already exists (design)

- `packages/ui/src/index.css` — 0.x tokens; deleted, not reused (the brand changes with the
  library).
- `flow-inspector.md` Phase 2 (2026-09-03): the seven passes for the inspector page; T8–T16
  remain the inspector's design spec and are referenced, not restated.
- Starlight's docs shell: sidebar, TOC, visited-link colours, reduced-motion handling —
  reused, restyled through tokens.

### Implementation Tasks (Design phase)

- [ ] **G1 (P1, human ~4h / CC ~30m)** — site — `site/DESIGN.md` + `tokens.css`: two named typefaces, one accent, dark + light, the three motions, the six component names (Pass 5)
  - Files: `site/DESIGN.md`, `site/src/styles/tokens.css`
  - Verify: no `system-ui`/`Inter` default in computed styles; `axe` contrast pass
- [ ] **G2 (P1, human ~2h / CC ~15m)** — site — inspector exit: closing line with links to `/docs/start` and `/examples`; homepage install line is a copy button (Pass 3)
  - Files: `site/src/pages/index.astro`, `site/src/pages/inspector.astro`
  - Verify: e2e clicks both links; clipboard e2e
- [ ] **G3 (P1, human ~3h / CC ~20m)** — site — responsive spec per viewport (Pass 6 table) incl. graph pan/zoom buttons and reduced-motion (Pass 6)
  - Files: `site/src/components/Inspector/*`
  - Verify: Playwright at 1280 / 900 / 390 widths; `prefers-reduced-motion` test
- [ ] **G4 (P2, human ~2h / CC ~15m)** — site + devtools — node shapes and edge-label truncation identical in site and devtools; docked panel chrome (Pass 7)
  - Files: `site/src/components/Graph/*`, `packages/devtools/src/*`
  - Verify: one snapshot fixture rendered by both, compared
- [ ] **G5 (P2, human ~1h / CC ~10m)** — site — state panel empty state ("no data yet"), Pagefind empty state, static SVG fallback for the homepage graph (Pass 2)
  - Verify: e2e with JS disabled sees the SVG; unit test for the empty slice

## Phase 2 Completion Summary

```
  +====================================================================+
  |            DESIGN PLAN REVIEW — COMPLETION SUMMARY                 |
  +====================================================================+
  | Initial design rating  | 3/10 (first draft) → 8/10 after amendments|
  | Pass 1 (IA)            | 8/10 — homepage, nav, sidebar order fixed |
  | Pass 2 (States)        | 7/10 → 9/10 with D-M3                     |
  | Pass 3 (Journey)       | 8/10 — exit links, task headlines         |
  | Pass 4 (Slop risk)     | 8/10 — no blacklist pattern in the plan   |
  | Pass 5 (System)        | 6/10 — tokens + DESIGN.md are task G1     |
  | Pass 6 (Resp + a11y)   | 7/10 → 9/10 with D-M4/D-M5                |
  | Pass 7 (Unresolved)    | 7 decisions: 5 auto-decided, 2 TASTE → G1 |
  +--------------------------------------------------------------------+
  | Dual voices            | Codex 8 concerns, Claude 5; 6/7 confirmed |
  | Amendments             | 7 (D-M1..D-M7)                             |
  | NOT in scope           | written (4 items)                          |
  | What already exists    | written                                    |
  | Tasks                  | G1–G8                                      |
  | Unresolved decisions   | 0 (typefaces + accent are G1's first step) |
  +====================================================================+
```

> **Phase 2 complete.** Codex: 8 concerns. Claude subagent: 5 issues.
> Consensus: 6/7 confirmed concerns, 1 disagreement resolved by amendment; 0 → gate.
> Passing to Phase 2.5 (DX).

---

# GSTACK REVIEW — Phase 2.5: Developer Experience

DX scope detected in Phase 0 (64 matches; the product _is_ a library). Mode: DX POLISH, all
eight passes, auto-decided. Prior DX review on this project: 2026-09-03 (`flow-inspector.md`
Phase 2.5) scored Getting Started 0/10, API 4/10, Errors 2/10, Docs 1/10, Upgrade 1/10,
Environment 6/10, Community 3/10, Measurement 2/10. This review measures the amended plan
against those.

## Step 0: DX Scope Assessment

- **Product type:** a TypeScript library with two framework bindings, consumed through npm;
  secondary surface: a static docs site. No CLI, no service, no credentials.
- **Persona:** a front-end engineer with a multi-step form that has outgrown component state —
  branches, a back button that must not lose data, a reload that must not lose progress.
  They will compare against `@stepperize/react` (one hook), XState (a machine plus a
  visualiser) and a hand-rolled `useReducer`. They read the README on npm first, the site
  second, the source third.
- **TTHW today:** undefined — the README's imports do not exist in the v1 bindings.
  **TTHW after the plan:** target under five minutes, measured by a person (S4). The
  quickstart is specified as: two steps, a field, Next, Back, the value survives — the
  Codex bar, adopted.
- **Initial DX completeness of the plan as drafted: 4/10** (README early and CI-tested was
  already there; behaviour of the API, diagnostics beyond throws, and the release sequence
  were not).

## Step 0.5: Dual Voices (DX)

### CODEX SAYS (DX — developer experience challenge)

1. **Getting started: plausibly five minutes, underspecified.** Six steps from an empty
   directory; the 20-line README must not omit setup; hello world must show two steps, a
   value, navigation, and the value surviving Back. Add "new app" and "existing app" paths;
   remember the framework choice; a visible **Start building** beside the install line.
   **Release blocker:** R0 tests root imports before L8 promotes v1 to the root exports —
   the fixtures would test the old API or fail. Pack the final export layout before R0 and
   release exactly the artefacts that passed. The early README must point at an
   installable version or dist-tag, not teach unpublished APIs.
2. **Errors: good format, insufficient coverage.** A grep over `throw new` verifies wording,
   not usefulness; it misses returned `Problem` values, rejected navigation, resolver
   failures, persistence warnings. Define one diagnostic contract (stable code, operation,
   step or field path, explanation, recovery); specify what `next()` returns when blocked,
   guarded or superseded; document which failures throw and which are results; test
   representative diagnostics. Resolve `<docs-url>#<code>` vs `/errors/<code>`. Error
   islands need a recovery action.
3. **API: approachable names hide consequential ambiguity.** Whether `go()` respects guards;
   whether `back()` follows history or order; `set()` vs `patch()` depth; `get()` means both
   "read data" and "build an expression"; what `validate()` checks; what happens to
   abandoned-branch data; repeated-item identity after insert/remove; provider lifecycle on
   rerender and SSR. Add a compact behavioural table. No CLI needed.
4. **Docs: consistency strong, discoverability untested.** Snippets can still omit
   dependencies, resolver registration or surrounding components; StackBlitz exports must
   run without workspace aliases; test the two-minute target with concrete tasks ("block
   Next until valid", "restore after reload", "clear abandoned branch data", "render field
   errors") and make search recognise those phrases; the server-driven page's "planned for
   1.1" banner contradicts an already-supported JSON contract; say when the library earns
   its dependency against Stepperize, XState and `useReducer`.
5. **Upgrades: inventory necessary, not sufficient.** Removing `./v1` after one minor risks
   breaking within a major — keep it through 1.x; stored-data migration needs executable
   fixtures, supported snapshot versions, a migration hook and defined reset behaviour;
   "start clean, warn once" silently discards progress from the host UI's point of view;
   publish supported Node/TS/React/Vue versions, peer requirements and alignment rules;
   contributor setup needs pinned tooling and one verification command.

Verdicts: all six CONCERN.

### CLAUDE SUBAGENT (DX — independent review)

1. **Getting started:** today undefined (verified: `createWizardFactory`/`WizardStore` are
   not in the v1 bindings). After the plan: 4–5 concepts before a button works — more than
   `useStepper()`, more than `useMachine()` for the trivial case; the plan should pick the
   simplest possible headless hello world and let the `component: null` boilerplate die.
   **Finding (medium):** `WizardProvider` silently ignores options when `wizard` is also
   passed (`react/index.tsx:46-48`) — throw in dev.
2. **API ergonomics:** small, guessable, identical hook names across bindings — a strength
   against XState's actor vocabulary. **Finding (low):** the `WizardProvider` /
   `provideWizard` asymmetry is idiomatic but unstated; a contributor could "fix" it.
3. **Errors:** three throw sites in core, two in the bindings, all single-clause. **Finding
   (medium):** the template has no docs-link clause; a regex-checkable template without a
   URL passes CI and still leaves people searching.
4. **Docs:** diff-tested examples, 60-line package READMEs, API inside the site — beats most
   competitors' discipline. **Finding (high):** the site stack was undecided. **Finding
   (medium):** no docs search anywhere.
5. **Escape hatches:** registry, hooks, `patchFlow`, `ctx`, `batch`, passing a `wizard`
   instance — a strength. **Finding (low):** `"use client"` injected unconditionally with no
   note for non-Next consumers.

Verdicts: getting started CONCERN · naming CONFIRMED · errors CONCERN · docs CONCERN ·
upgrade CONFIRMED · environment CONFIRMED.

### DX DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════
  Dimension                        Claude      Codex     Consensus
  ──────────────────────────────── ─────────── ───────── ──────────────────────────────────
  1. Getting started < 5 min?      CONCERN     CONCERN   CONFIRMED concern → quickstart bar, two paths, selector, "Start building" (X-M1)
  2. API naming guessable?         CONFIRMED   CONCERN   DISAGREE → names are fine (Claude); behaviour is ambiguous (Codex). Both true; behavioural table added (X-M3). Not a taste decision: nothing to choose between
  3. Error messages actionable?    CONCERN     CONCERN   CONFIRMED concern → diagnostic contract replaces the grep (X-M2)
  4. Docs findable & complete?     CONCERN     CONCERN   CONFIRMED concern → search phrases, task tests, StackBlitz from published packages (X-M4)
  5. Upgrade path safe?            CONFIRMED   CONCERN   DISAGREE → Codex's points (alias through 1.x, executable stored-data fixtures, restore outcome surfaced) accepted as completeness (P1) (X-M5)
  6. Dev environment friction-free? CONFIRMED  CONCERN   DISAGREE → Codex asks for a support matrix + one verify command; accepted (P1) (X-M6)
═══════════════════════════════════════════════════════════════════════════════
```

3/6 confirmed concerns, 3 disagreements resolved by taking the more complete option each
time (P1). Single-voice criticals flagged regardless: Codex's release-sequencing blocker
(R0 before the export flip) — a real ordering bug, fixed (X-M7).

### Amendments applied to the plan body from this phase

| #    | Source            | Amendment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| X-M1 | Codex 1, Claude 1 | Quickstart defined: two steps, one field, Next, Back, the value survives; "new app" and "existing app" paths; framework choice remembered (D-M6); "Start building" beside the install line. The `component: null` boilerplate does not return                                                                                                                                                                                                                                                                                                                                                                                                                              |
| X-M2 | Codex 2, Claude 3 | L6 becomes a **diagnostic contract**, not a grep: every failure — thrown or returned — carries `{ code, op, path?, message, fix, url }`; `NavResult` reasons (`invalid`, `blocked`, `no-target`, `superseded`, `aborted`, `not-reachable`) each documented with what the developer sees; the URL is `/errors/<code>` (one form only); representative diagnostics are tested; error islands carry "Restart example"                                                                                                                                                                                                                                                         |
| X-M3 | Codex 3           | A behavioural table for the public API goes into `docs/api-behaviour` (S4): `go()` respects guards and validation unless `{ force }`; `back()` follows the history stack; `set()` replaces a path, `patch()` merges shallowly; `validate(step?)` checks one step or the current one, `validateAll()` the flow; abandoned-branch data is kept unless the step declares `clearOnLeave`; repeat items are keyed by `keyBy`; the provider keeps one instance across rerenders and never runs on the server. The expression builder is imported as a namespace (`import * as x from '@wizzard-packages/core/expr'`), so `wizard.get(path)` and `x.get(path)` cannot be confused |
| X-M4 | Codex 4, Claude 4 | S4: four task pages whose titles are the phrases people search ("block Next until valid", "restore after reload", "clear abandoned branch data", "render field errors"); Pagefind indexes them; every snippet is a complete file with imports and registry; StackBlitz templates install from the `next` tag (so they exist only after R0); the server-driven page labels the _supported_ JSON contract and the _deferred_ `http-flow` integration separately; D3 adds one paragraph "when this earns its dependency" against Stepperize, XState and `useReducer`                                                                                                          |
| X-M5 | Codex 5           | `./v1` alias kept through all of 1.x; L4: `Snapshot.v` is the format version, `fromSnapshot` accepts a `migrate` hook, and the restore outcome (`restored` / `reset: reason` / `unavailable: reason`) is returned to the host so R-B can tell the person what happened; executable fixtures for a stored 0.x-shaped object and a stale v1 snapshot                                                                                                                                                                                                                                                                                                                         |
| X-M6 | Codex 5           | README and every package README carry a support matrix (Node ≥ 20.11, TypeScript ≥ 5.x, React ≥ 18, Vue ≥ 3.3) and peer requirements; AGENTS.md A10: one verification command (`pnpm verify` = lint + type-check + test:run) and pinned tooling stated                                                                                                                                                                                                                                                                                                                                                                                                                     |
| X-M7 | Codex 1           | **Sequencing fix:** L8 (teardown + root-export flip) precedes R0; R0 packs the final layout and the fixtures import root paths; the same tarballs are what R1 publishes. D3's early README imports `@wizzard-packages/react/v1` and installs `@canary` until R1, when the embed script switches both (one edit in `examples/quickstart`)                                                                                                                                                                                                                                                                                                                                   |
| X-M8 | Claude 1, 5       | L6: provider throws in dev when `wizard` and options are both passed; L3: a docs note that the `"use client"` directive is inert outside React Server Components                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Pass 1: Getting Started Experience — 8/10 (prior review: 0/10)

The ideal sequence, written out (persona: existing Vite React app):

```
  1. pnpm add @wizzard-packages/core @wizzard-packages/react        (10 s)
  2. paste examples/quickstart/flow.ts and App.tsx from the README   (60 s)
  3. run the app: two steps, type a name, Next, Back — the name is still there   (30 s)
```

Three steps; under two minutes for an existing app; under five for a new one (`pnpm create
vite` first). Sandbox: StackBlitz from the `next` tag after R0; before that, the README
example runs locally. No credentials, no free tier — it is a library. Magical moment: the
value surviving Back, then (Getting started, step 4) the same flow pasted into the
inspector and drawn. Competitive gap: `@stepperize/react` is one hook and one step less;
XState is one machine more. Why not 10: until R1 the install line says `@canary`, which
is honest and slightly off-putting; unavoidable.

## Pass 2: API/CLI/SDK Design — 8/10 (prior: 4/10)

Naming: `defineFlow`/`step`/`group`, `createWizard`, `next/back/go`, `get/set/patch`,
`validate`, `useWizard/useNavigation/useStep/useField/useErrors` — guessable, consistent
grammar, identical across bindings. Defaults: `createWizard({ flow })` works with no
registry when the flow uses no `$ref`; `policy` defaults to `sequential`; validation on
`next`. Completeness: every escape hatch listed by the Claude voice exists. Reliability:
navigation returns a `NavResult`, never a boolean; superseded navigations resolve, never
hang. Progressive disclosure: core → binding hooks → plugins → devtools. Persona fit: the
form engineer sees `useField(path)` and understands it. What held the score: the six
behavioural ambiguities Codex listed — now a table (X-M3). Why not 10: the table is a
plan commitment; the score rises when it is in the docs.

## Pass 3: Error Messages & Debugging — 7/10 (prior: 2/10)

Three traced paths, current vs planned:

```
  PATH                        | TODAY                                    | AFTER X-M2
  ----------------------------|------------------------------------------|-----------------------------------------------------------
  go('billng') — unknown step | NavResult { ok:false, reason:'no-target' } silently | { ok:false, reason:'no-target', code:'nav/unknown-step',
                              |                                          |   message:'Cannot navigate to "billng": not a step of flow "signup".',
                              |                                          |   fix:'Add it to steps or use one of: account, billing, review.', url:'/errors/nav-unknown-step' }
  $ref not in registry        | throw '[wizzard] unknown resolver: x'    | throw with code 'registry/unknown-ref', the step and expression path, the fix ('register it in
                              |                                          |   createWizard({ registry })'), and the URL
  persist: storage throws     | (nothing — plugin does not exist)        | warn once: code 'persist/unavailable', cause (SecurityError), fix (pass a storage or accept in-memory);
                              |                                          |   restore outcome returned to the host
```

Tier reached: between Elm (exact location, suggested fix) and Stripe (structured object
with `code`, `message`, `url`). Blast radius is clear: nothing in the library touches the
network or the file system. Debug mode: devtools panel + `RecordedSession`. Why not 10: the
contract is written, not yet implemented; the grep survives as a lint on _format_, the
tests cover _usefulness_.

## Pass 4: Documentation & Learning — 8/10 (prior: 1/10)

IA: Getting started → task pages (the four search phrases) → concept pages → API behaviour
table → reference → errors. Progressive disclosure: the quickstart never mentions the
registry; the Expressions page does. Examples: complete files, CI-diffed, StackBlitz from
published packages. Interactive: the inspector, the islands, the copy button. Versioning:
the site documents the version in the header badge (RC until R1). Tutorials vs reference:
both. Why not 10: one site version only (no versioned docs) — acceptable for 1.0.0, noted
for 2.0.

## Pass 5: Upgrade & Migration Path — 8/10 (prior: 1/10)

Backward compatibility: 1.0.0 is a major; `./v1` stays through 1.x (X-M5); root exports
flip once, in L8. Deprecation: the four packages get `npm deprecate` messages pointing at
MIGRATION.md; 0.x exports are listed row by row in D2. Migration guides: D2, with
executable fixtures for stored data. Codemods: none — the 0.x → 1.0 change is a model
change, not a rename; stated honestly in D2. Versioning: fixed group, semver, alignment rule
in the support matrix (X-M6). Why not 10: no codemod, by decision.

## Pass 6: Developer Environment & Tooling — 8/10 (prior: 6/10)

Types included and gated (`attw`, `@ark/attest`); ESM + CJS; `"use client"` for App Router
with a note for the rest (X-M8); CI is GitHub Actions, non-interactive; Windows is a
first-class development platform here (the owner's machine) and the embed script is
CRLF-safe; `pnpm verify` as the one command (X-M6); fixtures: three reference apps, three
consumer fixtures, one recorded session. Why not 10: no dedicated test utilities package
(a `createTestWizard` helper) — deferred, noted in TODOS.

## Pass 7: Community & Ecosystem — 5/10 (prior: 3/10)

MIT, open. Channels: GitHub issues and discussions only; no chat, none planned — honest for
a solo project. Examples: three real applications, not hello worlds. Extension points:
plugins (hooks), registry, `patchFlow`. Contributing guide: `AGENTS.md` is written for
agents; a two-paragraph `CONTRIBUTING.md` that points at it and at `pnpm verify` is a
five-minute task — auto-decided in (P1), added to D6. Pricing: none. Why 5: community is
roadmap phase 6 by the owner's decision; the plan does what a launch can.

## Pass 8: DX Measurement & Feedback Loops — 6/10 (prior: 2/10)

TTHW is measured once by a person before R1 (S4) and the number is published. Journey
analytics: none — a static site on Pages with no analytics by choice; add a privacy-free
counter later if wanted (TODOS). Feedback: an issue template that asks for the
`FlowDefinition` JSON and, if E4 ships, the `RecordedSession` file — auto-decided (P1),
added to D6. Friction audits: `/devex-review` against the live site after S6 is the
boomerang; the plan gives it a URL, a timed TTHW and an error catalogue to measure against.

## DX Scorecard

```
  Dimension                         Prior (09-03)  Plan as drafted  After amendments
  ────────────────────────────────  ─────────────  ───────────────  ────────────────
  1. Getting started                0              6                8
  2. API / SDK design               4              6                8
  3. Errors & debugging             2              4                7
  4. Documentation & learning       1              6                8
  5. Upgrade & migration            1              6                8
  6. Environment & tooling          6              7                8
  7. Community & ecosystem          3              4                5
  8. Measurement & feedback         2              4                6
  ────────────────────────────────  ─────────────  ───────────────  ────────────────
  Overall                           2.4            5.4              7.3
  TTHW                              undefined      ~5 min (target)  < 2 min existing app, < 5 min new app
```

## Developer journey map

| Stage                  | Developer does                                   | Friction today                     | After the plan                                                |
| ---------------------- | ------------------------------------------------ | ---------------------------------- | ------------------------------------------------------------- |
| 1 Discover             | reads the npm README                             | teaches an API that does not exist | one paragraph, outcome claims, the quickstart                 |
| 2 Evaluate             | compares with Stepperize / XState / `useReducer` | no positioning                     | one paragraph on when it earns its dependency                 |
| 3 Install              | `pnpm add`                                       | which packages?                    | two packages; `@canary` until R1, then `latest`               |
| 4 Hello world          | pastes the example                               | nothing to paste                   | CI-tested file; value survives Back                           |
| 5 First real feature   | branch + back button                             | no docs                            | R-A page: "Change your answer. Keep the right data."          |
| 6 First error          | a typo in a step id                              | silent `ok:false`                  | `nav/unknown-step` with the list of valid ids and a URL       |
| 7 Persist              | survive reload                                   | no story                           | R-B page + the snapshot contract; restore outcome surfaced    |
| 8 Debug                | something is wrong in a branch                   | none                               | inspector: paste the flow; devtools: replay the session       |
| 9 Upgrade / contribute | 0.x → 1.0; a PR                                  | no guide; agent-only rules         | MIGRATION.md with fixtures; `CONTRIBUTING.md` → `pnpm verify` |

## Developer empathy narrative

I have a four-step signup where step three depends on step one, and the back button keeps
losing what people typed. I find this library on npm. The README shows me twenty lines: a
flow that is a plain object, a provider, a hook. I paste it, type a name, click Next, click
Back — the name is still there. That is the thing I came for. The install line says
`@canary`; I raise an eyebrow, then see the badge on the site saying release candidate and
a date. I open "Change your answer. Keep the right data." and it is my exact problem, with
the code. I mistype a step id; instead of nothing happening I get a message that lists the
ids I meant. I reload halfway through the example and it continues, and tells me it did.
By the time I look at the inspector I already trust the engine; the graph is a bonus.

## DX Implementation Checklist

- [ ] Quickstart: two steps, one field, Next, Back, value survives; complete file; imports from `/v1` until R1 (X-M1, X-M7)
- [ ] Two paths on Getting started: new app / existing app; framework remembered (X-M1, D-M6)
- [ ] Diagnostic contract `{ code, op, path?, message, fix, url }` for thrown and returned failures; `NavResult` reasons documented; representative tests (X-M2)
- [ ] `/errors/<code>` pages, one per code; error islands with "Restart example" (X-M2)
- [ ] API behaviour table in the docs (X-M3); builder imported as a namespace
- [ ] Four task pages titled by search phrase; Pagefind; complete-file snippets; StackBlitz from `next` (X-M4)
- [ ] Server-driven page: supported contract vs deferred integration, labelled separately (X-M4)
- [ ] "When it earns its dependency" paragraph in the README (X-M4)
- [ ] `./v1` alias through 1.x; snapshot `v`, `migrate` hook, restore outcome to the host; stored-data fixtures (X-M5)
- [ ] Support matrix + peer requirements in every README; `pnpm verify`; AGENTS.md A10 (X-M6)
- [ ] L8 before R0; R0 tarballs are R1's artefacts (X-M7)
- [ ] Provider throws on `wizard` + options; `"use client"` note (X-M8)
- [ ] `CONTRIBUTING.md`; issue template asking for the flow JSON and a session file (Passes 7, 8)

## Required Outputs (DX)

### NOT in scope (DX)

- A CLI or scaffolder (roadmap phase 5).
- Codemods for 0.x → 1.0 (a model change, not a rename).
- Versioned docs (one version until 2.0).
- Site analytics (privacy-free counter → TODOS).
- A `createTestWizard` test-utilities package → TODOS.

### What already exists (DX)

`packages/core/package.json` exports map and tsup entries (the pattern L1 extends);
`contract/binding-suite.ts` (the pattern the persist probe extends); `check:pack` script
(R0's tarballs); Codex PR review (the second gate A5 documents).

### Implementation Tasks (DX phase)

- [ ] **X1 (P1, human ~4h / CC ~40m)** — core+bindings — diagnostic contract + `NavResult` documentation + tests (X-M2)
  - Files: `packages/core/src/v1/{navigate,store,validate-flow,expr}.ts`, both bindings, `site/src/content/docs/errors/*`
  - Verify: a test per code asserts `code`, `fix`, `url`; a lint on format
- [ ] **X2 (P1, human ~2h / CC ~20m)** — docs — API behaviour table page (X-M3)
  - Verify: every public method has a row; the page is linked from the API reference
- [ ] **X3 (P1, human ~1h / CC ~10m)** — release — reorder: L8 → R0 → S6/D5/D6 → R1; quickstart imports `/v1` + `@canary` until R1 (X-M7)
  - Verify: Next Steps updated; `examples/quickstart` has the two-line switch documented
- [ ] **X4 (P1, human ~4h / CC ~30m)** — plugins/core — `Snapshot.v`, `migrate` hook, restore outcome returned to the host, stored-data fixtures (X-M5)
  - Verify: contract tests for 0.x-shaped and stale-v1 fixtures on both bindings; R-B shows the outcome
- [ ] **X5 (P2, human ~3h / CC ~25m)** — site — four task pages + Pagefind + StackBlitz from `next` + server-driven page split (X-M4)
  - Verify: searching each phrase returns its page first
- [ ] **X6 (P2, human ~1h / CC ~10m)** — docs — support matrix, `pnpm verify`, `CONTRIBUTING.md`, issue template (X-M6, Pass 7/8)
  - Verify: `pnpm verify` exists and is green; publint sees the READMEs
- [ ] **X7 (P2, human ~1h / CC ~10m)** — bindings — provider throws on `wizard` + options; `"use client"` note (X-M8)
  - Verify: unit test on both bindings; docs note present

## Phase 2.5 Completion Summary

```
  +====================================================================+
  |            DX PLAN REVIEW — COMPLETION SUMMARY                     |
  +====================================================================+
  | Product type          | library (npm) + static docs site          |
  | Persona               | front-end engineer with an outgrown form  |
  | Mode                  | DX POLISH                                 |
  | TTHW                  | undefined → < 2 min (existing) / < 5 (new)|
  | Initial → final score | 5.4 → 7.3 / 10                            |
  | Dual voices           | Codex 5 findings (1 blocker), Claude 7    |
  | Consensus             | 3/6 confirmed, 3 disagreements → P1       |
  | Amendments            | 8 (X-M1..X-M8)                            |
  | Tasks                 | X1–X7                                     |
  | Unresolved decisions  | 0                                         |
  +====================================================================+
```

> **Phase 2.5 complete.** DX overall: 7.3/10. TTHW: undefined → < 5 min.
> Codex: 5 concerns incl. one release blocker. Claude subagent: 7 issues.
> Consensus: 3/6 confirmed, 3 disagreements resolved toward completeness; 0 → gate.
> Passing to Phase 3 (Eng Review — the required gate reviews the final amended plan).

---

# GSTACK REVIEW — Phase 3: Engineering

The required gate. Reviews the plan as amended by Phases 1, 2 and 2.5 (the body above is the
amended text). Override: scope is never reduced (P2); every finding is auto-decided and
logged; the outside voices ran on the final body.

## Step 0: Scope Challenge

1. **Existing code per sub-problem** — the two leverage tables in the plan and Phase 1 §0B
   hold; verified against the tree at `4078c1c`: `store.ts:30` accepts `plugins?: readonly
Hooks[]` and passes them as `hooks` at `:134`; `state.ts:21-36` is the nine-field state
   the snapshot contract serialises; `graph.ts:82` has `MAX_DEPTH = 32` and no node
   ceiling; `packages/react/src/v1/index.tsx:1` is `'use client'` in source; `core`'s
   `exports` has `./v1`, `./validate-flow`, `./graph` and no `./session`; `.size-limit.js`
   has `core-v1 graph` at 800 B and nothing for session.
2. **Minimum set** — Phase 1 §0D named it; nothing is deferred (owner scope). Held.
3. **Complexity check** — triggers (every package, three top-level directories). In
   interactive mode this would be a STOP; under autoplan the answer is the plan's own
   structure: one task per PR, one multi-package PR (L8) whose content is deletion, and a
   release-candidate boundary. Logged as decision; not reduced (P2).
4. **Search check** — search unavailable in this run; in-distribution: **[Layer 1]** Astro
   islands are the built-in for "two UI runtimes on one static page" — nothing is
   hand-rolled; **[Layer 1]** `tsup` `banner` is the built-in for preserving `"use client"`
   (a known footgun: esbuild strips directives in CJS output unless the banner is set —
   L3's acceptance checks both files for that reason); **[Layer 1]** Pagefind is the
   built-in static search for Astro; **[Layer 2]** Standard Schema is current practice
   (already adopted); **[Layer 3]** the snapshot contract is first-principles — no library
   does "versioned durable state with a migrate hook" for a wizard, and the plan is right
   not to import one.
5. **TODOS cross-reference** — no `TODOS.md` exists. This phase writes it (collecting the
   deferrals from all phases) — see Required outputs.
6. **Completeness check** — the plan chooses the complete version at every fork this review
   can see: contract for persistence rather than a plugin, three consumer fixtures rather
   than one, diagnostics as a contract rather than a grep.
7. **Distribution check** — packages: changesets + canary + `next` + `latest`, publish
   verified against the registry (#19); site: `deploy-docs-ui.yml` + smoke step; no new
   artefact type. Complete.

## Step 0.5: Dual Voices (eng)

Both voices read the plan as amended by Phases 1, 2 and 2.5, and both were given the three
prior consensus summaries. The Claude subagent read the repository; Codex received the plan
inlined.

### CODEX SAYS (eng — architecture challenge)

1. **`./v1` as a "zero-byte alias" needs a precise implementation.** Both paths must resolve
   to the _same_ built module and declaration files under every export condition, or a
   consumer importing the provider from one path and hooks from the other gets two React
   contexts and two nominal type identities. R0's root-only fixtures miss exactly this: add
   mixed root/alias consumers, cover ESM and CJS and every advertised subentry, and re-check
   `"use client"` at the final root targets after L8.
2. **The snapshot API cannot deliver restored state.** `fromSnapshot` returns success or
   failure and no state. Define a pure decoder returning validated durable state plus
   diagnostics; install through `commit.ts`; say whether installation emits a commit,
   increments `rev`, runs hooks and invalidates selectors; **restore must invalidate
   outstanding navigation epochs** or a pre-restore async operation overwrites restored data.
   Step existence is insufficient: check frame nesting, history legality, repeat keys, data
   shape, and the meaning of persisted `nav`. Decide whether returned snapshots are detached
   copies — exposing mutable references undermines the single-mutation boundary.
3. **Migration is three compatibility problems.** Snapshot format `v`, flow identity and the
   application's `version` need separate policies; define the order of parse → envelope
   validation → migrate → full validation → install; specify future versions, migration
   exceptions, malformed migration output, synchronicity; `migrate(old)` needs source and
   target metadata, and the persist factory exposes no migration option at all.
   "JSON-serializable" needs enforcement or a documented restriction: `undefined`,
   non-finite numbers, dates and cycles are not covered by one round-trip fixture.
4. **An array of `Hooks` does not prove persistence is implementable.** Confirm the contract
   provides initialisation timing, committed-state access, restoration through commit,
   cleanup and failure isolation; `hydrateMismatch` appears with no owner or signature.
   Prevent initial-state writes before restoration and recursive writes caused by restore
   commits. Define plugin ordering, repeated mounts, disposal, key collisions, multiple
   tabs. If storage may be async, handle stale reads and out-of-order writes; otherwise
   restrict the interface to synchronous storage. A storage failure must never turn a
   successful navigation into an apparent failure. Stringifying the whole snapshot on every
   commit is an unresolved performance risk: measure, then specify coalescing and flushing.
5. **Groups are a release gate, not a local navigation patch.** Stable item identity,
   removal of the active passenger, reordering, nested groups, empty groups, backtracking,
   `go()`, completion, pruning and snapshot migration all interact. Define the invariants
   before freezing the snapshot format; add property tests for structural change during a
   pending navigation; explain how an optional entry installs traversal while preserving the
   single commit path. Deferring groups invalidates the third reference application — the
   gate must then revise the release evidence and the site's claims.
6. **Runtime isolation needs more than "not rendered."** Both bundles can be imported or
   preloaded while one island renders, and a React inspector could violate the Vue page's
   own requirement. Specify the inspector's runtime and the conditional loading
   architecture; assert executed modules and network requests, not only mounted components;
   switching must dispose stores, subscriptions and pending operations; define the SSR
   default so a remembered preference cannot cause a hydration mismatch.
7. **The embed script needs an executable contract.** `node scripts/embed-examples.ts` is not
   supported by the stated minimum Node without a runner or a compile step — pin the
   mechanism. Define a snippet manifest, duplicate and missing marker failures, deterministic
   newline handling, safe fences; scope "unreferenced" to declared snippets; CI should
   compile the extracted examples, because textual equality cannot prove they run.
8. **L8 can break the still-live site and CI.** It removes dependencies and examples before
   S6 removes `packages/ui`; make the old site's continued buildability an explicit
   precondition or change the deploy atomically. Inventory workspace globs, lockfile
   entries, scripts, workflow path filters, caches, coverage config and changesets config.
   Replacement tests must already run in required CI before deletion, and the mapping table
   must map **assertions**, not application names. (Also: L7 says 25 gaps and lists 31.)
9. **The release choreography is internally inconsistent.** An RC-version tarball cannot
   later become `1.0.0` unchanged: either publish final-version artefacts under `next` and
   promote the dist-tag, or rebuild and re-verify. Freeze checksums and internal dependency
   versions. README edits after artefact creation never reach the published npm README.
   StackBlitz pointing at a moving `next` tag is unsuitable for reproducible examples. The
   smoke test needs revision verification, asset loading, deep links and a documented site
   rollback.
10. **Security and diagnostics remain incomplete.** Bound snapshot size and depth and preview
    expression complexity; reject dangerous path segments; define redaction for persisted
    data and recorded sessions (session storage is not confidentiality); test failures inside
    diagnostic callbacks; never put submitted data in a URL.

Verdicts: all six CONCERN.

### CLAUDE SUBAGENT (eng — independent review)

Verified against the tree; the plan's factual claims about the current state all check out.

- **F1 (critical, 9/10) — the persist plugin depends on a `Hooks` contract that does not
  exist.** `navigate.ts:54-64` defines only `beforeNavigate`, `afterNavigate`, `loadStep`.
  `store.ts:192-249` (`set`, `patch`, `setCtx`, `reset`) call `commit()` directly and never
  touch `ctx.hooks`, which reaches only `navContext()` at `store.ts:134` — so a field edit,
  the most common write, fires zero plugin hooks. This is undisclosed **engine** work.
- **F2 (high, 9/10) — `clearOnLeave` is documented but does not exist.** `flow.ts:28-64` has
  no such field and nothing clears `data` on branch exit; S4's task page and the API
  behaviour table both assert it. It would fail S4's own acceptance bar.
- **F3 (high, 8/10) — L9's "own entry" framing understates the hot-path change.**
  `.size-limit.js:24-26` promises a flat flow "pays nothing" for group machinery, but
  `navigate.ts` phase 9 is one synchronous function inside the budgeted entry. Keeping the
  branch out of the main bundle needs a design (a lazily registered stack resolver), not a
  one-line acceptance criterion — and R-C depends on it.
- **F4 (medium, 6/10) — `fromSnapshot` reinvents frame validation.** `session.ts:57-83`
  already implements "every frame names a real step"; two validators will drift the way
  0.x's three navigation copies drifted.
- **F5 (medium, 7/10) — multi-hop `migrate` is untested.** v1→v2→v3 chains are the case
  that breaks when a second bump ships.
- **F6 (medium, 6/10) — the React/Vue toggle contradicts the isolation test** unless it is a
  route change; say which.
- **F7 (low-medium, 6/10) — `store.ts:120` throws a plain `Error`;** L6 must enumerate every
  throw site, and A4's count is low.
- No test for two tabs writing the same persist key.

Verdicts: architecture CONCERN · tests CONCERN · performance CONCERN · security CONFIRMED ·
error paths CONFIRMED · deployment CONFIRMED.

### ENG DUAL VOICES — CONSENSUS TABLE

```
═══════════════════════════════════════════════════════════════════════════════
  Dimension                        Claude    Codex    Consensus
  ──────────────────────────────── ───────── ──────── ────────────────────────────────
  1. Architecture sound?           CONCERN   CONCERN  CONFIRMED concern — the hook contract (F1 / Codex 4) is a blocker, verified in code → new L0 (E-M1)
  2. Test coverage sufficient?     CONCERN   CONCERN  CONFIRMED concern — migrate chains, two tabs, module-level isolation, assertion-level teardown mapping (E-M6)
  3. Performance risks addressed?  CONCERN   CONCERN  CONFIRMED concern — stringify-per-commit and L9's budget claim (E-M2, E-M4)
  4. Security threats covered?     CONFIRMED CONCERN  DISAGREE → Codex's additions accepted (P1): snapshot size/depth bounds, path-segment rejection, redaction for sessions (E-M7)
  5. Error paths handled?          CONFIRMED CONCERN  DISAGREE → Codex's additions accepted (P1): failures inside diagnostic callbacks, storage failure must not fail a navigation (E-M2)
  6. Deployment risk manageable?   CONFIRMED CONCERN  DISAGREE → Codex's version-identity finding is correct and accepted (E-M5); the rest of the deploy path stands
═══════════════════════════════════════════════════════════════════════════════
```

3/6 confirmed concerns, 3 disagreements resolved toward the more complete option. Two
findings are verified-in-code criticals and reshape the plan: F1/Codex-4 (the hook
contract) and F2 (`clearOnLeave` does not exist).

### Amendments applied to the plan body from this phase

| #     | Source           | Amendment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E-M1  | F1, Codex 4      | **New L0, before L4:** extend `Hooks` with `init(host)` and `onCommit(state, prev)`; invoke them from a single place in `store.ts` so every write path — `set`, `patch`, `setCtx`, `reset`, `patchFlow` and the navigation commit — reports exactly once; define ordering (registration order), failure isolation (a throwing plugin is disabled with a diagnostic, never breaks a write), disposal on `destroy()`, repeated mounts, and re-entrancy (a commit made _by_ a plugin during `init` does not re-enter `onCommit`). Contract test: `set()` triggers persistence on both bindings. Storage is synchronous by contract; async storage is out of scope for 1.0                                                                                                       |
| E-M2  | Codex 2, 4       | L4a is a **pure decoder**: `decodeSnapshot(flow, snapshot, { migrate? }) → { state, diagnostics } \| { reset, reason }`; the plugin installs it through `commit.ts`, which is what bumps `rev` and invalidates selectors; restore **bumps `nav`** so any pre-restore async operation resolves as superseded; snapshots handed out are detached copies. A storage failure is reported through `onRestore`/a diagnostic and never turns a successful navigation into a failed one. Writes coalesce: one write per animation frame or 50 ms, flushed on `destroy()` and on `pagehide`, measured against a 100-passenger R-C payload                                                                                                                                             |
| E-M3  | F4               | `decodeSnapshot` reuses `session.ts`'s frame checker; the shared predicate moves to one place and both call it                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| E-M4  | F3, Codex 5      | **L9 gets a design note before implementation**, listing the invariants: stable item identity under `keyBy`, removal of the active item, reordering, nested groups, empty `over`, `back()` across a boundary, `go()` into a group, completion, pruning of dead frames, and what a snapshot containing group frames means. It states the injection point that keeps group code out of the flat-flow bundle, or the `.size-limit.js` comment is corrected and the budget raised deliberately. Property tests cover structural change during a pending navigation; `resolve.property.test.ts` must pass unchanged                                                                                                                                                               |
| E-M5  | Codex 9          | **Release identity:** R0 builds the **final 1.0.0 artefacts** and publishes them to the `next` dist-tag; R1 promotes that exact version to `latest` (`npm dist-tag add`), it does not rebuild. Checksums and internal dependency versions are frozen at R0. The README shipped inside the tarball is the final one, so D3's `@latest` switch lands **before** R0, not after. StackBlitz templates pin the exact version, never a moving tag                                                                                                                                                                                                                                                                                                                                  |
| E-M6  | Codex 1, 6, 7, 8 | R0's fixtures include a **mixed root/alias consumer** (provider from the root, hooks from `./v1`) and cover ESM and CJS and every subentry; the alias is the same built files, not a second build. The isolation test asserts **executed modules and network requests**, not just mounted components; the framework toggle is a route change and the SSR default is stated. The embed script's runner is pinned (`tsx`, already a dev dependency of the repo's tooling, or a compiled step) and CI **compiles** the extracted examples. L8 gains an inventory checklist (workspace globs, lockfile, scripts, workflow path filters, caches, coverage, changesets config), a precondition that the old site still builds until S6, and a mapping table at **assertion** level |
| E-M7  | Codex 10         | Snapshot size and depth bounds (reject over 1 MB or depth > 32 with a diagnostic); path segments containing `__proto__`, `constructor` or `prototype` rejected at decode; a documented redaction hook for recorded sessions and a note that session storage is not confidentiality; diagnostics never embed submitted data in a URL; a failing diagnostic callback is caught                                                                                                                                                                                                                                                                                                                                                                                                 |
| E-M8  | F2               | **New L10:** `clearOnLeave?: string[] \| true` on `StepBase`, cleared at exit in `commit.ts` as part of the navigation commit, with the default documented as "kept" — or the claim is removed from S4 and the API table. Chosen: implement (a task page promises it and 0.x had `clearData`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| E-M9  | F7               | L6 enumerates all nine current throw sites (`expr.ts` ×5 via `ExprError`, `store.ts:120`, `validate-flow.ts:115`, `react/index.tsx:53`, `vue/index.ts:44`); `AGENTS.md` A4's count is corrected                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| E-M10 | Codex 8          | L7's count reconciled: the test diagram in this phase lists 46 paths; "25 gaps (T32)" was the 2026-09-03 figure for the inspector alone. L7 now reads "every GAP in the Phase 3 test diagram"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## Section 1: Architecture

Dependency graph after the plan (Phase 1 §1 diagram stands). Three architectural points
this phase adds, each verified in code:

**1.1 The root-export flip is a three-file change per package, not a rename.**
`packages/core/package.json` `exports["."]` points at `dist/index.*` (the 0.x layer);
`tsup.config.ts` lists `src/index.ts` first. L8 must (a) delete `src/index.ts` and
`src/types.ts`, (b) point `"."` at `dist/v1/index.*`, (c) keep `"./v1"` pointing at the
same files, and (d) do the same in `react` and `vue`, whose `"."` today is the 0.x
context/store code. `attw` will catch a broken `.d.cts`; `publint` a missing file; nothing
catches "the root export is still 0.x" except the R0 fixtures importing root paths — which
is exactly why R0 follows L8. (confidence 9/10; `packages/core/package.json` exports map,
`tsup.config.ts` entries.)

**1.2 The snapshot contract must not leak `nav` semantics.** `state.ts:36` `nav` is the
navigation epoch; restoring it verbatim is correct only if no navigation is in flight when
`init` runs — which is guaranteed, because `init` fires before the first `next()`. The
transient reset (status `idle`, busy `[]`) is enough; `nav` is carried so a stale
in-flight promise from _before_ the reload can never win (it cannot exist after a reload
anyway). Documented in L4; no change. (confidence 8/10; `state.ts:34-36`.)

**1.3 Two runtimes, one page, zero shared runtime.** Astro renders each island with its own
framework integration; a React island and a Vue island on the same page load both runtimes
only if both are present. D-M6's "one runtime per page, selected and remembered" is
implemented by rendering only the selected island (`client:only` on one, the other not
emitted), not by hiding one. The per-page size test (S3) is the guard. (confidence 8/10;
Astro islands model.)

**Production failure scenarios per new integration point:** persist → storage throws
(caught, G1); embed script → marker drift (CI red); Pages deploy → build red (old site
stays); StackBlitz → the `next` tag missing (button hidden until R0); Pagefind → index
missing (search hidden). All accounted for.

**Diagrams that belong in code comments:** `snapshot.ts` (the durable/transient field
split and the restore state machine — Phase 1 §1), `persist.ts` (read → guard → mismatch →
commit), `navigate.ts` already carries its phase table; `embed-examples.ts` (marker
pairing rules).

Findings: none that change the plan; 1.1 becomes an explicit checklist inside L8 (logged).

## Section 2: Code Quality

- **DRY:** the reference applications are the single source for the site's examples, the
  e2e specs and the README (C1) — the strongest anti-duplication device in the plan. The
  one duplication risk is the graph's node shapes and label truncation in `site/` and
  `devtools` (G5 makes them one component consumed twice — `devtools` is React, the site's
  graph island is React, so it _is_ one component; the Vue side never draws a graph).
- **Error handling patterns:** one diagnostic contract (X1); results vs throws documented.
- **Technical debt hotspots touched:** `packages/react/src/context/WizardContext.tsx`
  (785 lines) — deleted; `.size-limit.js` 0.x entries — deleted with their packages;
  `docs/API_REFERENCE.md` — deleted.
- **Over-engineered:** nothing; `LayoutAdapter` was reduced to an optional override in L5.
  **Under-engineered:** the embed script's marker grammar is unspecified — auto-decided:
  `<!-- example:<name> -->` … `<!-- /example -->`, one name per file under
  `examples/quickstart/`, language from the extension (P5).
- **Existing ASCII diagrams in touched files:** `navigate.ts` phase table — unchanged by
  L9 only if group traversal slots into phases 4 and 9 as its header comment already
  promises (`navigate.ts:23-25`); L9's acceptance adds "the header comment is updated".
  `.size-limit.js` header comment — rewritten at L8 (the 0.x paragraph goes).

Findings: 2.1 marker grammar (decided), 2.2 `navigate.ts` header maintenance in L9 (added).

## Section 3: Test Review

Framework: vitest 4 (unit, property via fast-check, contract), Playwright 1.57 (e2e),
`@ark/attest` (types), size-limit, publint, attw. `TESTFILES` today: 239 passing unit
tests in `core/v1`, contract suites in both bindings, 15 e2e specs against the demos.

```
CODE PATHS                                                        USER FLOWS
[+] packages/core/src/v1/snapshot.ts (L4)                         [+] R-A onboarding, both bindings
  ├── toSnapshot()                                                  ├── [GAP] [→E2E] branch, go back across it, data policy — R-A.spec (both)
  │   └── [GAP] drops status/busy/errors/rev — unit                 ├── [GAP] [→E2E] keyboard-only run — R-A.a11y.spec
  ├── fromSnapshot()                                                └── [GAP]        double-click Next — contract probe
  │   ├── [GAP] v mismatch → migrate() / reset — unit             [+] R-B reload, both bindings
  │   ├── [GAP] unknown step in stack/history → reset — unit        ├── [GAP] [→E2E] reload mid-flow, restored — R-B.spec
  │   ├── [GAP] flow id / version mismatch → hydrateMismatch — unit ├── [GAP] [→E2E] reload during async validation → busy reset — R-B.spec
  │   └── [GAP] transient reset on success — unit                   ├── [GAP] [→E2E] version bump → "reset: older version" shown — R-B.spec
[+] packages/plugins/src/persist.ts (L4)                            └── [GAP]        two tabs same key — contract probe
  ├── init hook: read → parse → fromSnapshot → commit             [+] R-C repeated section (only if L9)
  │   ├── [GAP] nothing stored — contract (both)                    ├── [GAP] [→E2E] add, remove, revisit a passenger — R-C.spec
  │   ├── [GAP] SyntaxError — contract                              └── [GAP]        remove the current passenger mid-edit — property
  │   ├── [GAP] SecurityError on read — contract                  [+] Quickstart
  │   └── [GAP] onRestore called with the outcome — contract        └── [GAP] [→E2E] type, Next, Back, value survives — quickstart.test (both)
  └── commit hook: write                                          [+] Inspector
      ├── [GAP] QuotaExceededError → warn once — contract           ├── [GAP] [→E2E] default R-A live; change payer → route changes
      └── [GAP] one warning per reason, not per commit — unit       ├── [GAP] [→E2E] paste invalid → last valid graph kept + problems
[+] packages/core/src/v1/expr-builder.ts (L2b)                      ├── [GAP] [→E2E] paste 1 MB → rejected before parse
  └── [GAP] property: builder(x) evaluates == JSON(x) — fast-check ├── [GAP] [→E2E] replay scrubber, keyboard
[+] packages/core/src/v1/navigate.ts (L9, if included)              └── [GAP] [→E2E] mobile: form + step list + View graph
  ├── phase 4: resolve into / out of a group frame                [+] Docs
  │   ├── [GAP] enter group → push frame — unit + property          ├── [GAP] [→E2E] each task page's example runs
  │   ├── [GAP] leave last step of group → pop, continue — unit     └── [GAP]        search phrase → its page first — Pagefind e2e
  │   ├── [GAP] repeat: next item / exhausted — property          [+] Site build
  │   └── [GAP] back() across a group boundary — property           ├── [GAP]        example-diff CI test
  └── phase 9: commit carries the stack — covered by existing race matrix + new cases   ├── [GAP]        per-page bundle isolation
[+] scripts/embed-examples.ts (C1)                                  ├── [GAP]        axe on every page
  ├── [GAP] drift / missing / unreferenced / duplicate / CRLF — unit └── [GAP]        post-deploy smoke
[+] diagnostics (X1)                                              [+] Release
  └── [GAP] one test per code asserts code/fix/url — unit           ├── [GAP] [→E2E] three consumer fixtures from tarballs, root imports
[+] build (L1, L3, L8)                                              └── [GAP]        registry check after publish (exists, #19)
  ├── [GAP] "use client" first line of .js and .cjs — build test
  ├── [GAP] session entry exists in dist + exports + size — publint/attw/size
  └── [GAP] root export is v1; ./v1 alias resolves — attw + R0 fixtures

COVERAGE: 0/46 planned paths exist yet (all new)  |  every path has a named test in the plan  |  GAPS: 46, 19 E2E, 0 eval
REGRESSIONS: the root-export flip changes what existing 0.x consumers get from "." — covered by D2 (documented breaking change) and R0; no silent regression path
```

Regression rule: the flip is a deliberate breaking change in a major, documented, not a
regression. Group traversal (L9) modifies `navigate.ts`, which existing tests cover for
the single-level case — the property tests over generated flows (`resolve.property.test.ts`)
must keep passing unchanged; that is the regression guard, stated in L9's acceptance.

2 a.m. Friday: R-B's "reload during async validation" — the one path where the epoch,
the transient reset and the plugin all meet. Hostile QA: paste a flow whose `stack` in a
crafted snapshot names a step from another flow. Chaos: storage that throws on every third
write.

**Test plan artifact** written to
`~/.gstack/projects/ZizzX-wizzard-packages/Aziz-ZizzX-main-eng-review-test-plan-20260906-014115.md`
(routes, interactions, edge cases, critical paths — for `/qa` after S6).

Findings: 3.1 every GAP above is named in the plan's acceptance columns; the two not yet
there — "remove the current passenger mid-edit" (R-C) and "one warning per reason, not per
commit" (persist) — are added (P1). 3.2 the `resolve.property.test.ts` regression guard is
added to L9.

## Section 4: Performance

- No queries, no N+1. Memory: `history` is bounded (`state.ts` documents the cap), so a
  snapshot is bounded; the site's largest asset is Shiki's output, generated at build.
- Caching: layout per flow id (T10) in the inspector; Pagefind's index is static.
- Slow paths: (1) group traversal adds one frame push/pop per group boundary — O(depth),
  depth capped at 32 by the same constant the graph uses; (2) `fromSnapshot` validates every
  frame against `flow.steps` — O(history × 1) with a `Record` lookup; (3) the embed script
  reads N files — seconds.
- Site: Lighthouse performance is informational; the a11y gate is `axe`.

Findings: none. `debounceMs` for persist stays a 1.1 option (Phase 1 §7).

## Required Outputs (Eng)

### NOT in scope (eng)

The plan's list plus: a `createTestWizard` test-utilities package (TODOS), persist
`debounceMs` (1.1), versioned docs, site analytics.

### What already exists (eng)

Phase 1 §0B; plus `resolve.property.test.ts` and the race matrix in `store.test.ts` as
the regression guards for L9, `contract/binding-suite.ts` as the persist probe's home,
`check:pack` as R0's tarball source, `deploy-docs-ui.yml` as S6's workflow.

### Failure modes (eng, new codepaths)

```
  CODEPATH                          | FAILURE MODE                                  | TEST? | HANDLED? | USER SEES
  ----------------------------------|-----------------------------------------------|-------|----------|---------------------------
  fromSnapshot                      | crafted stack names a foreign step             | Y     | Y        | reset + reason via onRestore
  persist init                      | storage throws                                 | Y     | Y        | one warning; app runs
  persist commit                    | quota                                          | Y     | Y        | one warning; app runs
  persist restore                   | reload during async validation                 | Y     | Y        | busy reset; validation re-runs
  navigate (L9)                     | back() at the first step of a group            | Y     | Y        | pops to the parent's previous step
  navigate (L9)                     | repeat over an empty list                      | Y     | Y        | group skipped, `when`-like
  root-export flip                  | a 0.x consumer upgrades to 1.0                 | Y(R0) | Y        | compile errors + MIGRATION.md
  ./v1 alias                        | attw flags the alias as a duplicate            | Y     | Y        | build red, fix before publish
  embed script                      | marker present, file renamed                   | Y     | Y        | CI red with the path
  site island                       | Vue page pulls React                           | Y     | Y        | size test red
  Pages deploy                      | build red after S6                             | —     | Y        | old site stays
  R0 fixtures                       | Next.js fixture fails on "use client"          | Y     | Y        | RC exit criterion fails
```

No row is untested ∧ unhandled ∧ silent. **0 critical gaps.**

### Worktree parallelization strategy

| Step       | Modules touched                                               | Depends on                                             |
| ---------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| L1         | packages/core (build), .size-limit.js                         | —                                                      |
| D3 + C1    | examples/quickstart, scripts/, README.md, ci.yml              | L1 (session entry not needed; independent in practice) |
| L2, L2b    | packages/core/src/v1 (types, expr-builder)                    | —                                                      |
| L3         | packages/react (build), e2e fixture                           | —                                                      |
| L4         | packages/core/src/v1/snapshot.ts, packages/plugins, contract/ | —                                                      |
| L9         | packages/core/src/v1/navigate.ts                              | L2 (types)                                             |
| G1 → S1    | site/                                                         | gate decisions                                         |
| S2         | site/                                                         | S1, L1, L2b                                            |
| S3         | site/, examples/                                              | S1, L4, L9 (for R-C)                                   |
| S4, S5     | site/                                                         | S3                                                     |
| L5         | packages/devtools                                             | L2b, S2's graph component                              |
| L6, X1     | packages/core/src/v1, both bindings, site errors pages        | —                                                      |
| L7         | tests everywhere                                              | L4, L9, S2                                             |
| D1, D2     | AGENTS.md, docs/                                              | —                                                      |
| L8         | every package, examples/, e2e/, workflows                     | S3 (coverage table)                                    |
| R0         | fixtures/, workflows                                          | L8                                                     |
| S6, D5, D6 | site/, workflows, docs/                                       | R0                                                     |

Lanes: **A** L1 → L2/L2b → L9 (sequential, core/src/v1) · **B** L4 (core snapshot.ts +
plugins; touches core/src/v1 for one new file — coordinate with A) · **C** L3 → L6/X1
(react + vue + core diagnostics; conflicts with A on `navigate.ts` messages — run after A's
L9) · **D** D3/C1 → D1 → D2 (docs; independent) · **E** G1 → S1 → S2 → S3 → S4/S5 (site;
S2 waits for A's L2b, S3 for B's L4) · **F** L5 (devtools; after E's S2). Then L7, L8, R0,
S6 sequentially.

Execution: launch A, B, D in parallel worktrees; E starts after the gate and joins B/A at
S2/S3; C after A; F after E's S2. Conflict flags: A and B both touch `packages/core/src/v1`
(B adds `snapshot.ts` only — low risk); A and C both touch `navigate.ts` (C rewrites
messages — run C after A's L9 lands).

## TODOS.md (collected from all phases)

Written to `TODOS.md` at the repository root by this phase. Every item deferred by any
phase, with the context needed to pick it up cold:

| #   | What                                                                                                     | Why                                                                                                                                            | Effort (human / CC) | Priority | Blocked by                                                        |
| --- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- | ----------------------------------------------------------------- |
| 1   | `url-sync` plugin (`?step=payment`)                                                                      | A step survives F5 and can be shared by link — the most requested wizard feature; deferred only because it is outside this plan's blast radius | M / 30m             | P2       | L0 (hook contract)                                                |
| 2   | a11y contract in the bindings: ARIA props from the engine, focus move on step change, error announcement | 1.0.0's reference applications do this by hand; moving it into the bindings makes it the default for everyone                                  | M / 45m             | P2       | the three reference apps (their hand-written version is the spec) |
| 3   | Inspector state in the URL                                                                               | Paste a link, see the same graph; explicitly excluded from the first inspector version                                                         | M / 30m             | P3       | S2                                                                |
| 4   | `createTestWizard` test utilities                                                                        | Every consumer writing tests re-implements a wizard harness                                                                                    | S / 20m             | P3       | —                                                                 |
| 5   | Persist `debounceMs` option                                                                              | E-M2 coalesces writes internally; an explicit knob is the next step if a host needs one                                                        | S / 10m             | P3       | L4b                                                               |
| 6   | Privacy-free page counter for the site                                                                   | TTHW is measured once by hand; a counter would show whether anyone reaches Getting started                                                     | S / 15m             | P3       | S6                                                                |
| 7   | Versioned documentation                                                                                  | One version until 2.0; needed when 1.x and 2.x coexist                                                                                         | M / 30m             | P3       | —                                                                 |
| 8   | Async storage support in `/persist`                                                                      | 1.0 restricts storage to synchronous; IndexedDB and remote storage need stale-read and out-of-order-write handling                             | M / 45m             | P3       | L4b                                                               |

## Completion summary (Eng)

```
  - Step 0: Scope Challenge     — scope accepted as-is (complexity check triggered,
                                  mitigated structurally, not reduced — P2)
  - Architecture Review         — 3 findings (root-export flip mechanics, snapshot/nav
                                  epoch, two-runtime isolation); 0 unresolved
  - Code Quality Review         — 2 findings (marker grammar, navigate.ts header in L9)
  - Test Review                 — diagram produced, 46 paths, 19 E2E, 0 eval; 5 gaps
                                  added that the plan did not name
  - Performance Review          — 2 findings (stringify per commit, L9 budget claim)
  - NOT in scope                — written
  - What already exists         — written
  - TODOS.md updates            — 8 items written
  - Failure modes               — 12 rows, 0 critical gaps
  - Outside voice               — ran (codex 0.153.0 + Claude subagent)
  - Parallelization             — 6 lanes, 3 parallel at the start, 2 conflict flags
  - Lake Score                  — 10/10 recommendations chose the complete option
```

> **Phase 3 complete.** Codex: 10 concerns. Claude subagent: 7 findings, 2 verified criticals.
> Consensus: 3/6 confirmed concerns, 3 disagreements resolved toward completeness;
> 10 amendments (E-M1..E-M10), 2 of which add engine work the plan had not disclosed.
> Passing to Phase 4 (Final Gate).

<!-- AUTONOMOUS DECISION LOG -->

## Decision Audit Trail

Every intermediate decision this review made in the user's place, with the principle that
decided it. P1 completeness · P2 boil lakes · P3 pragmatic · P4 DRY · P5 explicit over
clever · P6 bias toward action.

| #   | Phase        | Decision                                                                                                                                                 | Class            | Principle | Rationale                                                                                                                  | Rejected                    |
| --- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 1   | CEO 0C-bis   | Approach C (three tracks, one integration order)                                                                                                         | mechanical       | P1        | Completeness 10/10 vs 8 and 6; A ships a v1 showcase over a 0.x shell, B goes dark and deletes coverage first              | A, B                        |
| 2   | CEO 0D       | Ship the whole owner-scoped 1.0.0; defer nothing from the minimum set                                                                                    | mechanical       | P1        | The owner scoped core+react+vue+validate+persist+devtools on 2026-08-29                                                    | trimming L5–L7, S5, D4–D6   |
| 3   | CEO 0D       | E1 README first, from a CI-tested example                                                                                                                | taste→approved   | P2, P6    | Needs no code from L or S; both voices reached it independently                                                            | leaving D3 last             |
| 4   | CEO 0D       | E2 name two competitors in the README                                                                                                                    | approved         | P1        | Positioning by evidence, not by size                                                                                       | silence                     |
| 5   | CEO 0D       | E3 expression builder as its own core entry                                                                                                              | approved         | P2        | In L2's blast radius; feeds the site's pretty-printer and future generators                                                | deferring to 1.1            |
| 6   | CEO 0D       | E4 devtools record hook                                                                                                                                  | **taste → gate** | P1        | Widens L5; turns a bug report into a replayable file                                                                       | —                           |
| 7   | CEO 0D       | E5 StackBlitz per example, E6 OG images, E7 CI checks                                                                                                    | approved         | P2        | All inside existing tasks, under 1 day CC                                                                                  | —                           |
| 8   | CEO 0D       | E8 url-sync, E9 a11y contract, E10 inspector URL → TODOS                                                                                                 | mechanical       | P3        | Outside the blast radius                                                                                                   | building now                |
| 9   | CEO 0D       | E11 scaffolder → skip                                                                                                                                    | mechanical       | P4        | Already on the roadmap                                                                                                     | —                           |
| 10  | CEO §1       | Node-count ceiling in the graph builder                                                                                                                  | mechanical       | P1        | `MAX_DEPTH` bounds depth, nothing bounds breadth                                                                           | leaving it                  |
| 11  | CEO §1       | Embed script fails on unmatched markers in both directions                                                                                               | mechanical       | P5        | A one-way check lets the README drift silently                                                                             | one-way                     |
| 12  | CEO §2       | G1 storage exceptions caught inside the plugin                                                                                                           | mechanical       | P1        | A wizard must not throw because the browser is in private mode                                                             | letting it propagate        |
| 13  | CEO §2       | G2 shape guard before commit                                                                                                                             | mechanical       | P1        | Stored JSON is untrusted input                                                                                             | trusting it                 |
| 14  | CEO §3       | PII note on the persistence page                                                                                                                         | mechanical       | P1        | The plugin stores whatever the host puts in `data`                                                                         | omitting                    |
| 15  | CEO §4       | G3 transient reset, G4 frame check, G5 config files in L8                                                                                                | mechanical       | P1        | Each is a silent-failure path                                                                                              | —                           |
| 16  | CEO §6       | Add embed-script, builder-property, isolation and smoke tests                                                                                            | mechanical       | P1        | Named codepaths with no test                                                                                               | —                           |
| 17  | CEO §6       | `axe` is the a11y gate; Lighthouse informational                                                                                                         | mechanical       | P5        | A score is a proxy; `axe` is an assertion                                                                                  | Lighthouse ≥ 95 as the gate |
| 18  | CEO §11      | `site/DESIGN.md` + tokens before page one                                                                                                                | mechanical       | P5        | Otherwise the implementer invents a system ad hoc                                                                          | picking fonts in the plan   |
| 19  | Design P1    | Docs sidebar order = S4's order                                                                                                                          | mechanical       | P5        | One order, stated once                                                                                                     | leaving it open             |
| 20  | Design P2    | Empty state panel says "no data yet"                                                                                                                     | mechanical       | P1        | An empty box reads as broken                                                                                               | —                           |
| 21  | Design P3    | Inspector exit links + install as a copy button                                                                                                          | mechanical       | P1        | The journey had no handoff out of the showcase                                                                             | —                           |
| 22  | Design P6    | Graph pans by drag, zooms by buttons; pinch left to the browser                                                                                          | mechanical       | P5        | Hijacking pinch breaks page zoom for everyone                                                                              | custom pinch                |
| 23  | Design P7    | Devtools panel is docked, not a floating overlay                                                                                                         | mechanical       | P5        | Hosts place it; no portal surprises                                                                                        | overlay                     |
| 24  | Design P7    | Four node shapes shared by site and devtools                                                                                                             | mechanical       | P4        | One component, two consumers                                                                                               | two drawings                |
| 25  | Design P7    | Both themes, dark default, system preference honoured                                                                                                    | mechanical       | P1        | Dark-only docs are unreadable in daylight                                                                                  | dark only                   |
| 26  | Design M1–M7 | Hero gains name, promise, two actions; three inspector modes; state table extended; mobile keeps the form; graph is one focus stop; one runtime per page | mechanical       | P1        | Every item was a named gap from a voice                                                                                    | —                           |
| 27  | DX 0         | Quickstart bar = two steps, a value that survives Back                                                                                                   | mechanical       | P1        | "It compiles" is not hello world                                                                                           | a compiling flow            |
| 28  | DX X-M2      | Diagnostic contract replaces the throw-site grep                                                                                                         | mechanical       | P1        | A grep passes while returned failures stay silent                                                                          | format-only lint            |
| 29  | DX X-M3      | API behaviour table; builder imported as a namespace                                                                                                     | mechanical       | P5        | Two meanings of `get` in one API is the worst kind of guessable                                                            | leaving both bare           |
| 30  | DX X-M5      | `./v1` alias through all of 1.x                                                                                                                          | mechanical       | P1        | Removing it inside a major breaks imports                                                                                  | one minor                   |
| 31  | DX X-M6      | Support matrix + `pnpm verify` + CONTRIBUTING + issue template                                                                                           | mechanical       | P1        | Each is minutes and removes a real unknown                                                                                 | —                           |
| 32  | DX X-M7      | L8 before R0; the tested artefacts are the shipped ones                                                                                                  | mechanical       | P1        | The fixtures would otherwise test the old API                                                                              | R0 first                    |
| 33  | Eng 0        | Complexity check triggers; scope NOT reduced                                                                                                             | mechanical       | P2        | Mitigated structurally: one task per PR, one deletion PR, an RC boundary                                                   | reducing                    |
| 34  | Eng §2       | Marker grammar `<!-- example:name -->` … `<!-- /example -->`                                                                                             | mechanical       | P5        | Unspecified grammar is a bug generator                                                                                     | leaving it                  |
| 35  | Eng E-M1     | **New L0: plugin lifecycle in the engine**                                                                                                               | mechanical       | P1        | Verified: `Hooks` has no `init`/`onCommit` and `set()` fires no plugin — the persist plugin was unimplementable as written | shipping persist without it |
| 36  | Eng E-M2     | `decodeSnapshot` is a pure decoder; install through `commit.ts`; restore bumps `nav`; writes coalesce                                                    | mechanical       | P1        | A boolean cannot deliver state, and a pre-restore async operation would overwrite the restore                              | returning a boolean         |
| 37  | Eng E-M3     | Reuse `session.ts`'s frame checker                                                                                                                       | mechanical       | P4        | Two validators drift the way 0.x's three navigation copies drifted                                                         | a second copy               |
| 38  | Eng E-M4     | L9 gets a design note and an invariant list before code                                                                                                  | mechanical       | P5        | Phase 9 is one synchronous function inside a 3.9 kB budget; "own entry" was an assumption                                  | one-line acceptance         |
| 39  | Eng E-M5     | R0 builds the final 1.0.0 artefacts; R1 promotes the dist-tag                                                                                            | mechanical       | P1        | An RC-version tarball cannot become 1.0.0 unchanged                                                                        | rebuilding at R1            |
| 40  | Eng E-M6     | Mixed root/alias fixture; module-level isolation assertions; pinned embed runner; L8 inventory + assertion-level mapping                                 | mechanical       | P1        | Each closes a "we tested something else" hole                                                                              | —                           |
| 41  | Eng E-M7     | Snapshot bounds, prototype-pollution path rejection, redaction hook                                                                                      | mechanical       | P1        | Stored and pasted JSON are trust boundaries                                                                                | —                           |
| 42  | Eng E-M8     | **New L10: `clearOnLeave`**                                                                                                                              | mechanical       | P1        | Verified absent; a task page and the API table already promised it                                                         | dropping the claim          |
| 43  | Eng E-M9     | L6 enumerates all nine throw sites; A4's count corrected                                                                                                 | mechanical       | P1        | The count in the audit was wrong                                                                                           | —                           |
| 44  | Eng E-M10    | L7 reads "every GAP in the Phase 3 diagram" (46), not "25"                                                                                               | mechanical       | P1        | 25 was the inspector-only figure from 2026-09-03                                                                           | —                           |
| 45  | Eng TODOS    | Eight items written to `TODOS.md` with full context                                                                                                      | mechanical       | P6        | A TODO without context is worse than none                                                                                  | bullet points               |

45 decisions: 44 auto-decided, 1 taste (#6) at the gate. Lake Score: 45/45 chose the more
complete option where completeness applied.

## Cross-Phase Themes

Concerns that surfaced independently in two or more phases' outside voices. Eight model runs
with no sight of each other (four Codex, four Claude subagents), so repetition is signal.

**Theme 1: the plan measured discipline, not the contract.** Flagged in **Phase 1 (Codex)**
and again, concretely, in **Phase 3 (both voices)**. The CEO voice said "zero warnings and
byte budgets do not answer whether someone can build a difficult wizard"; the eng voices then
found the two places where the abstraction actually did not reach — no `init`/`onCommit` hook
for a plugin, and no `clearOnLeave` for the branch-data question a task page promises. The
three reference applications are the fix for exactly this class, and both engine gaps were
found _because_ the plan committed to building them.

**Theme 2: the inspector must not promise what the engine cannot run.** Flagged in **Phase 1
(Codex)**, **Phase 2 (Codex)** and **Phase 3 (both)**. It started as "the graph draws groups
while the engine walks one level", became Premise 6, and ended as the L9 design note with its
invariant list: if group traversal is deferred, the third reference application and the
site's claims must be revised in the same decision.

**Theme 3: artefact identity.** Flagged in **Phase 2.5 (Codex)** and **Phase 3 (Codex)**,
twice in different forms: R0 testing root imports before L8 created them, then an RC-version
tarball that cannot become 1.0.0 unchanged, and `./v1` as a second build that would duplicate
React contexts. All three are the same underlying question — _is the thing we tested the
thing we ship_ — and all three are now closed by ordering and by dist-tag promotion.

**Theme 4: the visible surface was specified as architecture.** Flagged in **Phase 2 (both)**
and **Phase 2.5 (both)**. The plan named files, budgets and stacks precisely and left the
screen and the first five minutes to the implementer. The homepage composition, the three
inspector modes, the interaction-state table, the keyboard contract and the quickstart's
exact shape all came from this theme.

**Theme 5: failures that are returned, not thrown, were invisible to the plan's checks.**
Flagged in **Phase 2.5 (both)** and **Phase 3 (Codex)**. A grep over `throw new` would have
passed while `NavResult` reasons, storage warnings and decode diagnostics stayed
unactionable. The diagnostic contract covers both kinds, and the failure of a diagnostic
callback is itself handled.

**Theme 6: what the review did _not_ contest.** All eight runs accepted the engine as the
foundation, the teardown of 0.x, the README-early sequencing and GitHub Pages. The only
strategic dissent came from the Phase 1 Claude subagent applying market discipline the owner
has explicitly declined; its process findings were kept, its framing was not.

## GSTACK REVIEW REPORT

| Review        | Trigger               | Why                             | Runs | Status                | Findings                                                                |
| ------------- | --------------------- | ------------------------------- | ---- | --------------------- | ----------------------------------------------------------------------- |
| CEO Review    | `/plan-ceo-review`    | Scope & strategy                | 1    | CLEAR (via /autoplan) | 11 proposals, 6 accepted, 3 deferred; 0 critical gaps                   |
| Design Review | `/plan-design-review` | UI/UX gaps                      | 1    | CLEAR (via /autoplan) | score 3/10 → 8/10, 7 amendments                                         |
| DX Review     | `/plan-devex-review`  | Developer experience gaps       | 1    | CLEAR (via /autoplan) | score 5.4/10 → 7.3/10, TTHW undefined → < 5 min, 8 amendments           |
| Eng Review    | `/plan-eng-review`    | Architecture & tests (required) | 1    | CLEAR (via /autoplan) | 12 issues, 0 critical gaps, 10 amendments, 2 verified-in-code criticals |
| Outside Voice | `codex exec`          | Independent 2nd opinion         | 4    | issues_found          | 8 + 8 + 5 + 10 concerns across the four phases                          |

**CODEX:** four passes (0.153.0). Its two highest-value findings were the release-identity
inconsistency (an RC-version tarball cannot become 1.0.0 unchanged) and the plugin-lifecycle
gap, which the Claude eng subagent independently verified in the source.

**CROSS-MODEL:** eight runs, no shared context. Agreement on: the plan measured discipline
rather than the contract (fixed by the three reference applications and by L0/L10); the
inspector must not draw what the engine cannot run (Premise 6, the L9 design note); artefact
identity (L8 before R0, dist-tag promotion, the alias resolving to one build); the visible
surface was specified as architecture (the homepage, the three inspector modes, the state
table, the keyboard contract). The single disagreement is recorded in Phase 1: one voice
applied "earn the audience first" market discipline the owner has explicitly declined — its
process findings were kept, its framing was not.

**VERDICT:** CEO + DESIGN + DX + ENG CLEARED — ready to implement once the four gate
decisions below are made.

**UNRESOLVED DECISIONS:**

- Premise check: does "written from scratch" include the v1 engine, or only the README, the
  site, the examples and the 0.x teardown (this plan's reading)?
- Site stack: Astro + Starlight with React and Vue islands (recommended) reverses the
  2026-08-29 choice of Next.js + Vercel.
- Group traversal (L9) in 1.0.0, which also decides whether R-C survives as release evidence.
- Devtools: published in 1.0.0, and whether it carries the session record hook (E4, the one
  taste decision of the review).
