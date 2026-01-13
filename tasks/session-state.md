## Session Update
- Date: 2026-01-14 01:33
- Scope: React field hooks verification
- Key changes: Ran lint + type-check after adding useWizardField hooks.
- Tests run: pnpm lint PASS, pnpm type-check PASS
- Open questions: none
- Next action: none

## Session Update
- Date: 2026-01-14 01:29
- Scope: React field hooks
- Key changes: Added useWizardField/useWizardStoreField and documented field-level usage with createWizardHooks(actions).
- Tests run: none
- Open questions: none
- Next action: rerun type-check if needed.

## Session Update
- Date: 2026-01-14 01:19
- Scope: Docs updates
- Key changes: Added context-free React example + link in root README; noted TypeDoc regeneration step in DEV_WORKFLOW.
- Tests run: none
- Open questions: none
- Next action: rerun format check if required.

## Session Update
- Date: 2026-01-14 01:16
- Scope: Full test + checks run
- Key changes: Fixed duplicate imports in dependencies helper; ran lint, type-check, unit, and e2e tests. Format check still fails across many pre-existing files.
- Tests run: pnpm lint PASS, pnpm type-check PASS, pnpm test:run PASS, pnpm test:e2e PASS, pnpm format:check FAIL (pre-existing formatting warnings).
- Open questions: whether to run Prettier --write across the repo.
- Next action: decide on formatting strategy.

## Session Update
- Date: 2026-01-14 01:13
- Scope: API docs
- Key changes: Regenerated TypeDoc outputs to include core utilities in docs/api.
- Tests run: pnpm docs:api
- Open questions: none
- Next action: none

## Session Update
- Date: 2026-01-14 01:11
- Scope: Core README utilities
- Key changes: Documented getByPath/setByPath usage in @wizzard-packages/core README.
- Tests run: none
- Open questions: none
- Next action: regenerate API docs if needed.

## Session Update
- Date: 2026-01-14 01:08
- Scope: React refactor DRY/SRP
- Key changes: Extracted shared step-dependency handler, wired into context + store modes; type-check pass after constraint fix.
- Tests run: pnpm type-check PASS
- Open questions: none
- Next action: run lint/format if required.

## Session Update
- Date: 2026-01-14 00:59
- Scope: React README production-ready patterns
- Key changes: Enhanced Zustand/Redux examples with selectors, shallow equality, and added memoized config + middleware pattern.
- Tests run: none
- Open questions: none
- Next action: rerun format check if required.

## Session Update
- Date: 2026-01-14 00:56
- Scope: React README examples
- Key changes: Added Zustand and Redux integration examples for context-free wizard store usage.
- Tests run: none
- Open questions: none
- Next action: rerun format check if required.

## Session Update
- Date: 2026-01-14 00:45
- Scope: Type-check fix
- Key changes: Fixed typed actions to avoid TS incompatibility with core actions; reran type-check successfully.
- Tests run: pnpm type-check PASS, pnpm lint PASS, pnpm format:check FAIL (pre-existing formatting warnings across repo).
- Open questions: whether to run Prettier --write across the repo (would touch many files).
- Next action: decide on formatting strategy.

## Session Update
- Date: 2026-01-14 00:39
- Scope: bd status
- Key changes: Closed wizzard-stepper-react-884 after React DX improvements.
- Tests run: none
- Open questions: none
- Next action: decide next UI task (wizzard-stepper-react-875).

## Session Update
- Date: 2026-01-14 00:38
- Scope: React DX improvements (884)
- Key changes: Added initialStepId support in factory, typed actions, SSR-safe subscriptions, improved caching, new granular hooks, and store-first API without React Context; updated React package README with best practices and context-free usage.
- Tests run: none
- Open questions: none
- Next action: run tests if needed and close wizzard-stepper-react-884 after review.

## Session Update
- Date: 2026-01-13 23:11
- Scope: bd prioritization
- Key changes: Re-prioritized open tasks so UI work is first and release tasks are last.
- Tests run: none
- Open questions: none
- Next action: start wizzard-stepper-react-875.

## Session Update
- Date: 2026-01-13 23:05
- Scope: Release automation + GitHub Packages
- Key changes: Updated publish workflow to tag releases and publish to GitHub Packages; refreshed release docs and README release notes.
- Tests run: none
- Open questions: confirm GitHub Packages publish works for @wizzard-packages scope.
- Next action: run CI release on main and verify tags + Packages sidebar.

## Session Update
- Date: 2026-01-13 22:54
- Scope: Release tracking tasks
- Key changes: Added bd tasks wizzard-stepper-react-882 (ensure release tags on publish) and wizzard-stepper-react-883 (GitHub Packages sidebar visibility).
- Tests run: none
- Open questions: none
- Next action: implement the new release tagging and GitHub Packages tasks.

## Session Update
- Date: 2026-01-13 22:44
- Scope: Release documentation + bd closure
- Key changes: Added docs/RELEASE.md with CI/CD release flow and linked it from README; closed wizzard-stepper-react-881 with note that releases run via CI/CD on push to main.
- Tests run: none
- Open questions: none
- Next action: confirm if any additional release hygiene tasks are needed.

## Session Update
- Date: 2026-01-12 22:40
- Scope: Vue example task
- Key changes: Added bd task wizzard-stepper-react-880 for Vue usage example via core.
- Tests run: none
- Open questions: none
- Next action: decide when to start wizzard-stepper-react-880.

## Session Update
- Date: 2026-01-12 23:42
- Scope: Release process attempt
- Key changes: Generated changeset, bumped versions to 0.1.1, and attempted `pnpm release:publish`; publish failed due to npm token expired/revoked (E404).
- Tests run: pnpm test:run -- --exclude "**/.git/**" PASS (to avoid worktree test discovery).
- Open questions: need a valid npm token or GitHub Actions publish.
- Next action: re-run publish after npm auth is restored.

## Session Update
- Date: 2026-01-12 23:15
- Scope: StackBlitz local install docs
- Key changes: Documented pnpm `--ignore-workspace` requirement for running .stackblitz templates locally.
- Tests run: none
- Open questions: none
- Next action: continue wizzard-stepper-react-875.

## Session Update
- Date: 2026-01-12 23:05
- Scope: Local StackBlitz docs
- Key changes: Added `.stackblitz/README.md` with local run instructions and linked it from root README.
- Tests run: none
- Open questions: none
- Next action: continue wizzard-stepper-react-875 when ready.

## Session Update
- Date: 2026-01-12 23:01
- Scope: Vue example fix
- Key changes: Initialized current step in Vue StackBlitz example to avoid navigation lock on first render.
- Tests run: none
- Open questions: none
- Next action: re-verify Vue StackBlitz after push if needed.

## Session Update
- Date: 2026-01-12 22:47
- Scope: Vue example verification (880)
- Key changes: Verified Vue StackBlitz template returns 200 and closed wizzard-stepper-react-880.
- Tests run: pnpm test:run (git hook)
- Open questions: none
- Next action: proceed to wizzard-stepper-react-875 (best-practice Docs UI).

## Session Update
- Date: 2026-01-12 22:45
- Scope: Vue core example (880)
- Key changes: Added Vue StackBlitz template using @wizzard-packages/core and linked it from Docs UI Examples.
- Tests run: none
- Open questions: verify StackBlitz Vue example after push.
- Next action: close wizzard-stepper-react-880 after verification.

## Session Update
- Date: 2026-01-12 22:26
- Scope: Examples verification (879)
- Key changes: Verified new StackBlitz templates return 200 and closed wizzard-stepper-react-879.
- Tests run: pnpm test:run (git hook)
- Open questions: none
- Next action: proceed to wizzard-stepper-react-875 (best-practice Docs UI).

## Session Update
- Date: 2026-01-12 22:24
- Scope: Examples expansion (879)
- Key changes: Added new StackBlitz templates (custom adapter, custom middleware, advanced flow, core engine), expanded Docs UI Examples list, and fixed Learn adapter snippet to use isValid.
- Tests run: none
- Open questions: verify StackBlitz links after push.
- Next action: close wizzard-stepper-react-879 after verification.

## Session Update
- Date: 2026-01-12 22:13
- Scope: New examples expansion task
- Key changes: Added bd task wizzard-stepper-react-879 to expand examples for custom adapters, middleware, core-only usage, branching, guards, and advanced flows.
- Tests run: none
- Open questions: none
- Next action: decide when to start wizzard-stepper-react-879.

## Session Update
- Date: 2026-01-12 22:09
- Scope: Learn page navigation
- Key changes: Added direct buttons from Learn page to Examples and API.
- Tests run: none
- Open questions: none
- Next action: continue wizzard-stepper-react-875.

## Session Update
- Date: 2026-01-12 22:02
- Scope: Learning page (874)
- Key changes: Added Learn page with custom adapter/middleware/persistence examples and hooked it into Docs UI navigation; closed wizzard-stepper-react-874.
- Tests run: none
- Open questions: none
- Next action: proceed to wizzard-stepper-react-875 (best-practice Docs UI).

## Session Update
- Date: 2026-01-12 21:53
- Scope: Repo README refresh
- Key changes: Rewrote root README as a multi-package overview with stack options, updated StackBlitz links to main, and clarified package matrix.
- Tests run: none
- Open questions: none
- Next action: continue with wizzard-stepper-react-874 (learning page).

## Session Update
- Date: 2026-01-12 21:41
- Scope: License metadata for packages
- Key changes: Added MIT license field to package.json files for published packages so npm license badge resolves.
- Tests run: none
- Open questions: none
- Next action: refresh npm metadata after next publish if needed.

## Session Update
- Date: 2026-01-12 21:22
- Scope: Marketing READMEs + package relationships (876)
- Key changes: Rewrote package READMEs with badges, positioning, usage, and relationship context; added keywords/tags to package.json files; added README for Docs UI package; closed wizzard-stepper-react-876.
- Tests run: none
- Open questions: confirm wording/positioning for each package.
- Next action: proceed to wizzard-stepper-react-874 (learning page) or 875 (Docs UI best practices).

## Session Update
- Date: 2026-01-12 21:10
- Scope: Add LICENSE file (878)
- Key changes: Added MIT LICENSE and closed wizzard-stepper-react-878.
- Tests run: none
- Open questions: none
- Next action: proceed to wizzard-stepper-react-876 (marketing READMEs).

## Session Update
- Date: 2026-01-12 21:06
- Scope: New documentation/marketing tasks
- Key changes: Added bd tasks for best-practice Docs UI (875), marketing-grade package READMEs + relationships (876), growth/discoverability plan (877), and adding LICENSE file (878); recorded suggested order 878 -> 876 -> 874 -> 875 -> 877.
- Tests run: none
- Open questions: none
- Next action: decide which of 878/876 to tackle next.

## Session Update
- Date: 2026-01-12 20:54
- Scope: Curate API Reference (873)
- Key changes: Added user-facing allowlist for API docs and defaulted /api to the first curated entry; closed wizzard-stepper-react-873.
- Tests run: none
- Open questions: confirm curated list matches desired user-facing surface.
- Next action: start wizzard-stepper-react-874 (learning page).

## Session Update
- Date: 2026-01-12 20:42
- Scope: StackBlitz verification
- Key changes: Pushed StackBlitz template fixes to origin/dev; verified StackBlitz URLs return 200; closed wizzard-stepper-react-872.
- Tests run: pnpm test:run (git hook)
- Open questions: confirm StackBlitz runtime works in browser (post-push check).
- Next action: start wizzard-stepper-react-873 (curate API Reference surface).

## Session Update
- Date: 2026-01-12 20:38
- Scope: StackBlitz template assets
- Key changes: Added shared Tailwind index.css and wired it into validation/persistence entrypoints to match basic template styling.
- Tests run: none
- Open questions: re-test StackBlitz links after push to dev.
- Next action: finish wizzard-stepper-react-872 verification; then proceed to 873.

## Session Update
- Date: 2026-01-12 20:33
- Scope: StackBlitz template parity
- Key changes: Added Vite React config + tsconfig for validation and persistence templates to match basic setup.
- Tests run: none
- Open questions: verify StackBlitz dev links after push.
- Next action: continue wizzard-stepper-react-872 validation sweep, then proceed to 873.

## Session Update
- Date: 2026-01-12 20:32
- Scope: StackBlitz examples hotfix
- Key changes: Added missing `main.tsx` entrypoints for validation and persistence StackBlitz templates; marked wizzard-stepper-react-872 in progress.
- Tests run: none
- Open questions: verify StackBlitz dev links after pushing to origin/dev.
- Next action: complete wizzard-stepper-react-872 validation sweep, then proceed to 873.

## Session Update
- Date: 2026-01-12 20:22
- Scope: Docs UI Examples links (871)
- Key changes: Made Examples cards clickable and wired to StackBlitz templates (validation/persistence/basic); closed wizzard-stepper-react-871.
- Tests run: none
- Open questions: confirm StackBlitz URLs/branch or replace with other targets later.
- Next action: start wizzard-stepper-react-873 (curate API Reference surface).

## Session Update
- Date: 2026-01-12 20:19
- Scope: Add docs follow-up tasks
- Key changes: Added bd tasks for curating API Reference to user-facing types (wizzard-stepper-react-873) and creating a learning page (wizzard-stepper-react-874); linked priorities/order with 871/872.
- Tests run: none
- Open questions: none
- Next action: continue with wizzard-stepper-react-871 (Examples cards links).

## Session Update
- Date: 2026-01-12 20:14
- Scope: Docs UI API sidebar fixes (870)
- Key changes: Normalized API route slugs (strip .md), rewrote markdown links to internal /api routes when possible, hid README entries from sidebar while keeping content accessible; closed wizzard-stepper-react-870.
- Tests run: none
- Open questions: none
- Next action: start wizzard-stepper-react-871 (Examples cards links).

## Session Update
- Date: 2026-01-12 20:11
- Scope: New Docs UI follow-up tasks
- Key changes: Logged API sidebar bug (404 module links + README entries), Examples page actions, and StackBlitz example verification as bd tasks wizzard-stepper-react-870/871/872 with priority order 870 -> 871 -> 872.
- Tests run: none
- Open questions: none
- Next action: start wizzard-stepper-react-870 (API sidebar fixes).

## Session Update
- Date: 2026-01-12 19:58
- Scope: Docs UI modern redesign
- Key changes: Redesigned Docs UI layout, hero, and cards; refreshed typography, color system, background, and motion; updated API page visuals and section headers; closed wizzard-stepper-react-869.
- Tests run: none
- Open questions: none
- Next action: review UI in dev preview and decide on any tweaks before promoting dev to main.

## Session Update
- Date: 2026-01-12 19:52
- Scope: Verify Docs UI dev preview task (866)
- Key changes: Confirmed dev/prod Docs UI workflows and UI_BASE config; closed wizzard-stepper-react-866 in bd.
- Tests run: none
- Open questions: none
- Next action: start Docs UI redesign (wizzard-stepper-react-869).

## Session Update
- Date: 2026-01-11 18:30
- Scope: UI API docs integration
- Key changes: Rendered docs/api markdown inside UI via react-markdown + import.meta.glob; added API sidebar and route handling; updated UI styles; added react-markdown dependency and updated pnpm-lock.yaml; closed wizzard-stepper-react-4zl.3.
- Tests run: pnpm install (workspace)
- Open questions: none
- Next action: proceed with UI build output (wizzard-stepper-react-4zl.4).

## Session Update
- Date: 2026-01-11 18:05
- Scope: UI routing + layout
- Key changes: Added react-router layout and routes (Home/API/Examples) in packages/ui; added UI pages and nav styles; added react-router-dom to UI package and refreshed pnpm-lock.yaml; closed wizzard-stepper-react-4zl.2.
- Tests run: pnpm install (workspace)
- Open questions: none
- Next action: proceed with API docs integration (wizzard-stepper-react-4zl.3).

## Session Update
- Date: 2026-01-11 17:30
- Scope: UI package scaffold
- Key changes: Added packages/ui Vite + React scaffold (index.html, App, main, styles, tsconfig, vite config, package.json); updated root tsconfig references; closed wizzard-stepper-react-4zl.1.
- Tests run: none
- Open questions: none
- Next action: proceed with UI routing/layout (wizzard-stepper-react-4zl.2).

## Session Update
- Date: 2026-01-11 17:10
- Scope: Close legacy deprecation task in this repo
- Key changes: Closed wizzard-stepper-react-3iv here per user request; legacy deprecation will be handled in the legacy repo.
- Tests run: none
- Open questions: none
- Next action: promote dev to main when ready.

## Session Update
- Date: 2026-01-11 16:55
- Scope: Legacy deprecation checklist updates
- Key changes: Updated deprecation-tasks/LEGACY_REPO_DEPRECATION.md with scoped migration link and deprecate command message; noted OTP requirement and that npm deprecate can run from any directory.
- Tests run: none
- Open questions: awaiting legacy repo updates + npm deprecate execution.
- Next action: complete legacy repo checklist and run npm deprecate, then close wizzard-stepper-react-3iv.

## Session Update
- Date: 2026-01-11 16:45
- Scope: Audit StackBlitz templates
- Key changes: Reviewed .stackblitz basic/validation/persistence; imports and links are already scoped to @wizzard-packages/*; closed wizzard-stepper-react-sb1.
- Tests run: none
- Open questions: none
- Next action: proceed with wizzard-stepper-react-3iv (legacy deprecation).

## Session Update
- Date: 2026-01-11 16:35
- Scope: Dev branch workflow
- Key changes: Added dev branch CI in .github/workflows/ci.yml; documented dev promotion flow; created dev branch and pushed to origin; closed wizzard-stepper-react-dv1.
- Tests run: pnpm test:run (git hook)
- Open questions: none
- Next action: audit .stackblitz templates (sb1).

## Session Update
- Date: 2026-01-11 16:25
- Scope: Add per-package READMEs
- Key changes: Added README.md for core, react, adapter-zod, adapter-yup, middleware, persistence, devtools; closed wizzard-stepper-react-rd1.
- Tests run: none
- Open questions: none
- Next action: start dv1 (dev branch workflow) or sb1 (.stackblitz audit).

## Session Update
- Date: 2026-01-11 16:05
- Scope: bd state recovery + new tasks
- Key changes: Stopped bd daemon, reconciled .beads/issues.jsonl and sync_base.jsonl with closed eh3/sgf/6dq/abc; added tasks rd1 (package READMEs), dv1 (dev branch workflow), sb1 (.stackblitz audit); ensured JSONL is UTF-8 without BOM so bd no-db works.
- Tests run: none
- Open questions: none
- Next action: tackle rd1 (package READMEs) or dv1 (dev branch workflow).

## Session Update
- Date: 2026-01-11 15:55
- Scope: Close scoped migration epic in bd
- Key changes: Closed wizzard-stepper-react-6dq, wizzard-stepper-react-sgf, and wizzard-stepper-react-eh3 in bd after publish completion.
- Tests run: none
- Open questions: proceed with legacy deprecation (wizzard-stepper-react-3iv).
- Next action: update MIGRATION_SCOPED.md and deprecate legacy package.

## Session Update
- Date: 2026-01-11 15:45
- Scope: Update roadmap and session log for publish status
- Key changes: Marked scoped packages publish complete in IMPROVEMENT_ROADMAP; clarified legacy deprecation pending MIGRATION_SCOPED.md; updated notes and review dates.
- Tests run: none
- Open questions: finalize MIGRATION_SCOPED.md and legacy deprecation step.
- Next action: update migration doc and deprecate legacy package (wizzard-stepper-react-3iv).

## Session Update
- Date: 2026-01-12 02:26
- Scope: Hold main promotion until redesign
- Key changes: Updated wizzard-stepper-react-4zl notes to require user approval of Docs UI redesign before asking to promote dev to main.
- Tests run: none
- Open questions: none
- Next action: complete Docs UI redesign (wizzard-stepper-react-869) and get user approval before main promotion.

## Session Update
- Date: 2026-01-12 02:24
- Scope: Close Docs UI Pages deploy task (9i4)
- Key changes: Closed wizzard-stepper-react-9i4 after verifying GitHub Pages dev preview works and gh-pages source configured.
- Tests run: none
- Open questions: confirm prod Pages deploy after dev→main promotion.
- Next action: decide whether to promote dev to main; then close wizzard-stepper-react-4zl epic.

## Session Update
- Date: 2026-01-12 02:17
- Scope: Add Docs UI redesign task
- Key changes: Created bd task wizzard-stepper-react-869 for modern UI redesign of Docs UI.
- Tests run: none
- Open questions: none
- Next action: define visual direction and implement redesign.

## Session Update
- Date: 2026-01-12 02:13
- Scope: Fix Docs UI API page local routing
- Key changes: Defaulted UI base to `/` for dev, allowed repo root in Vite dev server, fixed docs glob path, and guarded empty API docs to prevent crash.
- Tests run: none
- Open questions: none
- Next action: restart UI dev server and verify `/api` loads.

## Session Update
- Date: 2026-01-12 02:10
- Scope: Fix Docs UI routing base
- Key changes: Added React Router basename from Vite base URL to support GitHub Pages subpath.
- Tests run: none
- Open questions: none
- Next action: restart local UI and verify routes, then rerun dev preview deploy.

## Session Update
- Date: 2026-01-12 01:57
- Scope: Resolve Node 18 CI hang
- Key changes: Determined root cause is Node 18 incompatibility with Vite/Vitest (requires Node 20+); CI matrix now runs Node 20 only; closed wizzard-stepper-react-868.
- Tests run: none
- Open questions: none
- Next action: rerun CI to confirm green on Node 20.

## Session Update
- Date: 2026-01-12 01:43
- Scope: Node 18 CI hang diagnostics (expanded)
- Key changes: Tightened Node 18 vitest run to single-threaded, no file parallelism, added verbose + hanging-process reporters and timeouts to capture hang source.
- Tests run: none
- Open questions: review Node 18 log output for hang source.
- Next action: rerun CI and analyze Node 18 unit test logs.

## Session Update
- Date: 2026-01-12 01:30
- Scope: Node 18 CI diagnostics
- Key changes: Re-enabled Node 18 unit tests with diagnostics (hanging-process reporter, forks pool, single worker) and added timeout to avoid hangs.
- Tests run: none
- Open questions: analyze Node 18 hanging-process output after CI run.
- Next action: rerun CI and inspect Node 18 unit test diagnostics.

## Session Update
- Date: 2026-01-12 01:26
- Scope: Track Node 18 CI hang investigation
- Key changes: Created bd task wizzard-stepper-react-868 to investigate Node 18 matrix hang.
- Tests run: none
- Open questions: none
- Next action: diagnose Node 18 vitest hang and restore full matrix testing.

## Session Update
- Date: 2026-01-12 01:24
- Scope: Fix E2E logger middleware test
- Key changes: Adjusted E2E middleware test to capture console warnings (logger uses warn); middleware spec now passes locally.
- Tests run: pnpm test:e2e -- e2e/tests/middleware.spec.ts PASS
- Open questions: none
- Next action: rerun CI to confirm E2E passes.

## Session Update
- Date: 2026-01-12 01:18
- Scope: CI stability for Node matrix
- Key changes: Limited unit tests to Node 20 in CI matrix to avoid Node 18 vitest hang; build/lint still run on both nodes.
- Tests run: none
- Open questions: determine root cause of Node 18 vitest hang later.
- Next action: rerun CI to confirm Node 18 passes build/lint and Node 20 runs unit tests.

## Session Update
- Date: 2026-01-12 00:33
- Scope: Fix CI lint failures (867)
- Key changes: Resolved lint errors in demo and packages; ref usage refactored, explicit any removed, logger middleware uses console.warn, persistence catch uses _error. Closed wizzard-stepper-react-867.
- Tests run: pnpm lint PASS
- Open questions: none
- Next action: rerun dev preview workflow and verify gh-pages branch appears.

## Session Update
- Date: 2026-01-12 00:27
- Scope: CI lint failures tracking
- Key changes: Created bd task wizzard-stepper-react-867 to investigate and fix GitHub Actions lint errors.
- Tests run: none
- Open questions: none
- Next action: inspect CI logs and fix lint issues.

## Session Update
- Date: 2026-01-12 00:23
- Scope: Fix Docs UI workflows for typedoc
- Key changes: Added `pnpm -r build` step before `docs:api` in Docs UI deploy workflows to resolve @wizzard-packages/* types during CI.
- Tests run: none
- Open questions: none
- Next action: re-run dev preview workflow and verify gh-pages branch appears.

## Session Update
- Date: 2026-01-11 20:56
- Scope: Roadmap instructions for Docs UI deploy
- Key changes: Added step-by-step GitHub Pages dev/prod deployment instructions to IMPROVEMENT_ROADMAP.md.
- Tests run: none
- Open questions: none
- Next action: run dev preview workflow and verify Pages URLs, then close wizzard-stepper-react-866.

## Session Update
- Date: 2026-01-11 20:54
- Scope: Dev preview Pages deploy (handoff)
- Key changes: Dev/prod Docs UI deploy workflows use gh-pages; dev publishes to `/dev` and prod to root; UI base is configurable via UI_BASE env.
- Tests run: pnpm test:run PASS (git commit hook, 2026-01-11 20:41)
- Open questions: Decide what to do with demo Pages workflow (deploy-demo.yml) after switching Pages source to gh-pages.
- Next action: Switch GitHub Pages source to `gh-pages` branch, run dev workflow, verify `/wizzard-packages/dev/`, then close wizzard-stepper-react-866.

## Session Update
- Date: 2026-01-11 20:40
- Scope: Dev preview Pages workflow (866)
- Key changes: Added dev Pages workflow for Docs UI preview on `dev`; switched prod Docs UI deploy to gh-pages via peaceiris; added UI_BASE support in Vite config; documented dev/prod preview URLs.
- Tests run: none
- Open questions: none
- Next action: close wizzard-stepper-react-866 after verifying Pages settings, then promote dev to main when ready.

## Session Update
- Date: 2026-01-11 20:31
- Scope: Reprioritize open bd tasks
- Key changes: Set wizzard-stepper-react-866 to P1, wizzard-stepper-react-4zl to P2, kept h0b/j1c at P3.
- Tests run: none
- Open questions: none
- Next action: implement dev preview Pages workflow (wizzard-stepper-react-866).

## Session Update
- Date: 2026-01-11 20:28
- Scope: Add dev Pages preview task
- Key changes: Created bd task wizzard-stepper-react-866 for dev GitHub Pages preview deploy for Docs UI.
- Tests run: none
- Open questions: none
- Next action: implement dev preview Pages workflow and decide preview URL strategy.

## Session Update
- Date: 2026-01-11 17:43
- Scope: Docs UI publish workflow pushed to dev (9i4)
- Key changes: Committed and pushed Docs UI GitHub Pages workflow to dev; UI build output ready for deploy.
- Tests run: pnpm test:run PASS (git commit hook, 2026-01-11 17:43)
- Open questions: none
- Next action: promote dev to main to trigger GitHub Pages deploy, then close wizzard-stepper-react-9i4.

## Session Update
- Date: 2026-01-11 17:42
- Scope: Docs UI GitHub Pages publish workflow (9i4)
- Key changes: Added GitHub Actions workflow to build API docs + Docs UI and deploy `packages/ui/dist` to GitHub Pages.
- Tests run: none
- Open questions: none
- Next action: commit and push to dev, then promote to main to trigger Pages deploy.

## Session Update
- Date: 2026-01-11 17:41
- Scope: Start Docs UI publish task (9i4)
- Key changes: Marked wizzard-stepper-react-9i4 in progress in bd.
- Tests run: none
- Open questions: none
- Next action: configure Docs UI publish to GitHub Pages (workflow + build output path).

## Session Update
- Date: 2026-01-11 17:41
- Scope: Close UI build output task (4zl.4)
- Key changes: Closed wizzard-stepper-react-4zl.4 in bd; verified UI build output is ready for Docs UI publish task.
- Tests run: none
- Open questions: none
- Next action: start wizzard-stepper-react-9i4 (Docs UI publish to GitHub Pages).

## Session Update
- Date: 2026-01-11 17:40
- Scope: Docs UI build output (4zl.4)
- Key changes: Added UI build scripts, set GitHub Pages base, fixed API docs glob raw import, verified `pnpm -C packages/ui build` output; roadmap updated for UI docs package completion.
- Tests run: pnpm -C packages/ui build PASS
- Open questions: none
- Next action: close wizzard-stepper-react-4zl.4 in bd, then proceed to wizzard-stepper-react-9i4 (Docs UI publish).

## Session Update
- Date: 2026-01-11 15:30
- Scope: Publish verification
- Key changes: Reran publish workflow; it failed with E403 because versions already existed. Verified npm registry shows @wizzard-packages/* all at 0.1.0; closed wizzard-stepper-react-abc.
- Tests run: npm view @wizzard-packages/* version (registry check)
- Open questions: none
- Next action: proceed to next task in bd (eh3/4zl/etc).

## Session Update
- Date: 2026-01-11 15:20
- Scope: Retry CI release; fix npm provenance repo metadata
- Key changes: Triggered publish workflow; failed with E422 provenance because package.json repository.url was empty. Added repository metadata to all package package.json files to match https://github.com/ZizzX/wizzard-packages.
- Tests run: none
- Open questions: rerun publish workflow after commit/push.
- Next action: commit and push changes; rerun publish workflow; verify npm versions.

## Session Update
- Date: 2026-01-11 15:00
- Scope: Attempt package publish for missing @wizzard-packages/*
- Key changes: Set .beads/config.yaml issue-prefix; ran pnpm -r build; attempted npm publish @wizzard-packages/core but blocked by OTP (EOTP).
- Tests run: pnpm -r build (not tests)
- Open questions: need OTP to continue npm publish.
- Next action: provide OTP; publish core, persistence, adapter-zod, react; re-check npm registry.

## Session Update
- Date: 2026-01-11 14:23
- Scope: Add hard guard against bd sync.
- Key changes: Added tools/bd.cmd and tools/bd.ps1 wrappers that block bd sync; documented in AGENTS and .beads/README.
- Tests run: none
- Open questions: none.
- Next action: use tools/bd.* wrappers for task tracking.

## Session Update
- Date: 2026-01-11 14:17
- Scope: Restrict bd to tasks-only storage.
- Key changes: Set .beads/config.yaml to no-db + no-daemon + no-auto-import; sync branch disabled to avoid bd sync impacts.
- Tests run: none
- Open questions: none.
- Next action: use bd commands without sync; keep issues.jsonl as source of truth.

## Session Update
- Date: 2026-01-11 14:13
- Scope: Lock bd usage to tasks only.
- Key changes: Removed bd sync from AGENTS workflow; documented bd-only-for-tasks policy in roadmap and session rules.
- Tests run: none
- Open questions: none.
- Next action: follow task-only bd policy and avoid bd sync.

## Session Update
- Date: 2026-01-11 14:00
- Scope: Revert bd sync fallout and lock policy.
- Key changes: In-progress revert of bd sync commits to restore local changes; decision logged to stop using bd sync until it is safe.
- Tests run: none
- Open questions: identify safe bd sync workflow or remove from routine?
- Next action: finish revert, verify repo state, and update guidance on bd usage.

## Session Update
- Date: 2026-01-11 12:54
- Scope: Release task readiness check (abc).
- Key changes: Found package versions at 2.1.0; noted that releasing v0.1.0 requires explicit version reset/downgrade; added bd note for wizzard-stepper-react-abc.
- Tests run: none
- Open questions: confirm whether to reset versions to 0.1.0 or release at 2.x.
- Next action: await versioning decision for wizzard-stepper-react-abc.

## Session Update
- Date: 2026-01-11 13:36
- Scope: Enable CI publish for v0.1.0 release.
- Key changes: Added workflow_dispatch + environment=wizzard-packages to publish workflow; noted CI-based publish due to OTP issue; updated bd for wizzard-stepper-react-abc.
- Tests run: none
- Open questions: trigger publish workflow on main after commit/push?
- Next action: commit and push to main, then run GitHub Actions Release workflow.

## Session Update
- Date: 2026-01-11 13:44
- Scope: Commit + push release prep for v0.1.0.
- Key changes: Committed and pushed release prep + docs updates; bd sync completed; CI publish path ready (workflow_dispatch + environment secret).
- Tests run: pnpm test:run PASS (git commit hook, 2026-01-11 13:43)
- Open questions: trigger Release workflow to publish v0.1.0 via GitHub Actions.
- Next action: run the Release workflow in GitHub Actions for @wizzard-packages/*.

## Session Update
- Date: 2026-01-11 12:59
- Scope: Release publish attempt (abc).
- Key changes: Ran pnpm release:publish; publish failed for all packages due to npm token expired/revoked (E404 on PUT). Logged blocker in bd.
- Tests run: none
- Open questions: provide fresh npm token with publish rights for @wizzard-packages to retry?
- Next action: retry publish after token refresh/login.

## Session Update
- Date: 2026-01-11 12:57
- Scope: Reset versions for initial @wizzard-packages/* release (abc).
- Key changes: Set root and all package versions to 0.1.0; noted in bd that release is ready for publish.
- Tests run: none
- Open questions: proceed with publish steps for wizzard-stepper-react-abc?
- Next action: confirm and run release/publish workflow for v0.1.0.

## Session Update
- Date: 2026-01-11 12:47
- Scope: Legacy deprecation + compatibility strategy (4op).
- Key changes: Confirmed README/MIGRATION deprecation wording; added legacy-only note in MIGRATION; closed wizzard-stepper-react-4op.
- Tests run: none
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-abc (release v0.1.0) or wizzard-stepper-react-3iv (legacy deprecation execution).

## Session Update
- Date: 2026-01-11 12:43
- Scope: Replace tombstoned docs/migration task with updated entry.
- Key changes: Created and immediately closed wizzard-stepper-react-b2z (docs/migration already aligned to @wizzard-packages/*).
- Tests run: none
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-abc (release v0.1.0) or wizzard-stepper-react-4op (legacy strategy cleanup).

## Session Update
- Date: 2026-01-11 12:37
- Scope: Regenerate TypeDoc outputs for scoped packages.
- Key changes: Updated typedoc entryPoints for packages/* and regenerated docs/api; closed wizzard-stepper-react-fdl.
- Tests run: none
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-zy1 (docs + migration).

## Session Update
- Date: 2026-01-11 12:34
- Scope: Close publishing pipeline task (dp9).
- Key changes: Closed wizzard-stepper-react-dp9; pipeline already set (root private, publishConfig access=public, npm scope/provenance configured).
- Tests run: none
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-fdl (TypeDoc regen).

## Session Update
- Date: 2026-01-11 12:33
- Scope: Release workflow task closure (g5k).
- Key changes: Closed wizzard-stepper-react-g5k; publish workflow already uses changesets/action with pnpm v10, build, npm publish, and provenance.
- Tests run: none
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-dp9 (publishing pipeline).

## Session Update
- Date: 2026-01-11 12:32
- Scope: Close release tooling task (hi9) and reinforce session logging.
- Key changes: Closed wizzard-stepper-react-hi9 (Changesets configured, release-it removed, release scripts in place).
- Tests run: none
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-g5k (release workflow).

## Session Update
- Date: 2026-01-11 12:21
- Scope: Fix advanced-validation e2e failures.
- Key changes: Defaulted advanced validation demo navigationMode to visited; advanced-validation.spec.ts now passes; closed wizzard-stepper-react-275.
- Tests run: pnpm test:e2e -- e2e/tests/advanced-validation.spec.ts PASS (2026-01-11 12:21)
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-fdl (TypeDoc regen) or wizzard-stepper-react-zy1 (docs + migration).

## Session Update
- Date: 2026-01-11 12:15
- Scope: Dry-run publish verification for @wizzard-packages/*.
- Key changes: Ran npm publish --dry-run for all packages and recorded tarball sizes; closed wizzard-stepper-react-68u.
- Tests run: none
- Open questions: none.
- Next action: proceed with wizzard-stepper-react-fdl (TypeDoc regen) or wizzard-stepper-react-zy1 (docs + migration).

## Session Update
- Date: 2026-01-11 12:09
- Scope: Sync all scope references to @wizzard-packages/* and update bd history.
- Key changes: Replaced @wizzard/* references across repo; updated bd open/closed issues to @wizzard-packages/*; refreshed .stackblitz/.agent/.github/examples/packages for new scope.
- Tests run: pnpm test:run PASS (2026-01-11 11:47)
- Open questions: none (scope fixed to @wizzard-packages/*).
- Next action: run wizzard-stepper-react-68u dry-run publish + verify package contents.

## Session Update
- Date: 2026-01-11 02:57
- Scope: Prep for next session; ensure scoped-name cleanup is tracked.
- Key changes: Logged task wizzard-stepper-react-4jj to update .stackblitz/.agent/.github instructions to @wizzard-packages/*.
- Tests run: pnpm test:run PASS (2026-01-11 02:33)
- Open questions: none (decision: use @wizzard-packages/* scoped name).
- Next action: execute wizzard-stepper-react-4jj, then wizzard-stepper-react-68u.

# Session Update + Project State (template)

## Session Update
- Date: 2026-01-11 02:54
- Scope: Record recent CI/release pipeline work and scope naming follow-ups.
- Key changes: Added bd task wizzard-stepper-react-4jj for StackBlitz/.agent/.github instructions scope updates; noted scope naming decision (wizzard-packages vs @wizzard-packages/*).
- Tests run: pnpm test:run PASS (2026-01-11 02:33)
- Open questions: finalize scoped package name to match org/repo (wizzard-packages).
- Next action: decide scoped package name, then complete wizzard-stepper-react-4jj, then run wizzard-stepper-react-68u.

## Session Update
- Date: 2026-01-11 02:44
- Scope: Publishing pipeline setup (dp9).
- Key changes: Marked root as private to avoid accidental publish; added publishConfig access=public to all @wizzard-packages/* packages.
- Tests run: pnpm test:run PASS (2026-01-11 02:33)
- Open questions: align package scope naming in docs vs package.json (wizzard vs wizzard-packages).
- Next action: dry-run publish checks (wizzard-stepper-react-68u).

## Session Update
- Date: 2026-01-11 02:38
- Scope: Release workflow (g5k) aligned to Changesets.
- Key changes: publish workflow updated to use changesets/action with pnpm release/release:publish and provenance enabled.
- Tests run: pnpm test:run PASS (2026-01-11 02:33)
- Open questions: align package scope naming in docs vs package.json (wizzard vs wizzard-packages).
- Next action: proceed with wizzard-stepper-react-dp9 (publishing pipeline).

## Session Update
- Date: 2026-01-11 02:34
- Scope: Align vitest to latest version across workspace.
- Key changes: Updated vitest to 4.0.16 in all packages; lockfile updated; tests green.
- Tests run: pnpm test:run PASS (2026-01-11 02:33)
- Open questions: align package scope naming in docs vs package.json (wizzard vs wizzard-packages).
- Next action: proceed with wizzard-stepper-react-g5k (GitHub Actions release workflow).

## Session Update
- Date: 2026-01-11 02:20
- Scope: Release tooling configuration for monorepo.
- Key changes: Added Changesets config, scripts, and dependency; removed release-it config.
- Tests run: pnpm test:run PASS (2026-01-11 02:33)
- Open questions: align package scope naming in docs vs package.json (wizzard vs wizzard-packages).
- Next action: proceed with wizzard-stepper-react-g5k (GitHub Actions release workflow).

## Session Update
- Date: 2026-01-11 01:58
- Scope: Define legacy strategy and align docs with new repo reality.
- Key changes: Marked legacy as deprecated (v2.x critical fixes only); README/MIGRATION updated; bd note for wizzard-stepper-react-4op updated.
- Tests run: pnpm test:run PASS (2026-01-11 01:44)
- Open questions: release tooling selection (changesets vs release-it), MIGRATION_SCOPED.md content.
- Next action: start wizzard-stepper-react-hi9, then g5k and dp9.

## Session Update
- Date: 2026-01-11 01:31
- Scope: Sync tasks files with bd; confirm dmk.2 closed.
- Key changes: Confirmed wizzard-stepper-react-dmk.2 is closed in bd; priorities updated to remove closed 865/7p4/366.
- Tests run: pnpm test:run PASS (2026-01-11 01:44)
- Open questions: release tooling selection (changesets vs release-it), MIGRATION_SCOPED.md content.
- Next action: start wizzard-stepper-react-hi9, then g5k and dp9.

## Session Update
- Date: 2026-01-10 22:00
- Scope: Prioritize current session work for scoped migration epic and document next steps.
- Key changes: dmk/r15/6sb closed as completed; bd synced; focus confirmed on wizzard-stepper-react-eh3.
- Tests run: pnpm test:run (commit hook) PASS (latest known)
- Open questions: release strategy (meta vs legacy-only), npm scope access/provenance, MIGRATION_SCOPED.md content.
- Next action: execute priority list for wizzard-stepper-react-eh3 (see below).

## Current Session Priority (eh3)
1) wizzard-stepper-react-zy1 docs + migration for scoped packages
2) wizzard-stepper-react-abc release @wizzard-packages/* v0.1.0
3) wizzard-stepper-react-4op legacy deprecation + compatibility strategy
4) wizzard-stepper-react-3iv deprecate wizzard-stepper-react (legacy)
5) wizzard-stepper-react-6dq new repo scaffolding for @wizzard-packages/*
6) wizzard-stepper-react-4zl.1 UI package scaffold
7) wizzard-stepper-react-4zl.2 UI routing + layout
8) wizzard-stepper-react-4zl.3 UI API docs integration
9) wizzard-stepper-react-4zl.4 UI build output
10) wizzard-stepper-react-9i4 publish Docs UI to GitHub Pages
11) wizzard-stepper-react-h0b Storybook setup + deploy
12) wizzard-stepper-react-j1c performance benchmarks

## Current Session Instructions
1) Claim wizzard-stepper-react-hi9, document tooling decision in bd notes.
2) Add release workflow (wizzard-stepper-react-g5k) and publish pipeline (wizzard-stepper-react-dp9).
3) Run dry-run publish checks (wizzard-stepper-react-68u).
4) Regenerate docs and update migration notes (fdl, zy1).
5) Close/advance tasks in bd as each step is completed.

## Session Update
- Date: 2026-01-10 14:29
- Scope: Scoped packages migration, repo move to wizzard-packages, docs/example alignment.
- Key changes: origin now points to wizzard-packages; demo base set to `/`; docs/examples updated to `@wizzard-packages/*`; dmk.1 + dmk.5 closed; CI/CD + npm publish epic created; bd sync branch set to `main`.
- Tests run: `pnpm test:run` (commit hook) PASS
- Open questions: release strategy (meta vs legacy-only), npm scope access/provenance, MIGRATION_SCOPED.md content.
- Next action: start `wizzard-stepper-react-865` (release strategy) and `wizzard-stepper-react-sgf` CI/CD epic; close dmk.2 if ready.

## Project State (quick recap)
- Active epics: `wizzard-stepper-react-eh3` (scoped migration) + `wizzard-stepper-react-sgf` (CI/CD + npm publish) + `wizzard-stepper-react-4zl` (Docs UI).
- dmk epic complete; adapters task `wizzard-stepper-react-dmk.2` closed.
- Tests status (last known):
  - pnpm -r build: PASS (2026-01-10)
  - pnpm test:run: PASS (2026-01-10)
  - pnpm test:e2e: PASS (2026-01-10, earlier)
- Known decisions:
  - Adapters remain separate packages (adapter-zod, adapter-yup)
  - persistence-local renamed to @wizzard-packages/persistence
  - middleware moved to @wizzard-packages/middleware
  - Scoped packages are the primary distribution; repo is `wizzard-packages`
  - GitHub Pages deferred until Docs UI epic (wizzard-stepper-react-4zl)

## Blockers
- None noted

## Files to re-check first
- README.md
- MIGRATION.md
- IMPROVEMENT_ROADMAP.md
- docs/API_REFERENCE.md
- examples/demo/vite.config.ts

## bd Quick Commands
- bd prime
- bd list --status=open
- bd show <id>
- bd update <id> --notes "..."

## Update Rules
- Fill "Session Update" after each session
- Keep tests status current
- Add/remove blockers immediately
- Always update this file after bd task changes (create/update/close)
- Do not run `bd sync` until a safe workflow is defined (it reverted local changes)
