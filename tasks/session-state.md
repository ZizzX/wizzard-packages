# Session Update + Project State (template)

## Session Update
- Date: 2026-01-10 22:00
- Scope: Prioritize current session work for scoped migration epic and document next steps.
- Key changes: dmk/r15/6sb closed as completed; bd synced; focus confirmed on wizzard-stepper-react-eh3.
- Tests run: pnpm test:run (commit hook) PASS (latest known)
- Open questions: release strategy (meta vs legacy-only), npm scope access/provenance, MIGRATION_SCOPED.md content.
- Next action: execute priority list for wizzard-stepper-react-eh3 (see below).

## Current Session Priority (eh3)
1) wizzard-stepper-react-865 define release strategy (tags/branches/versions)
2) wizzard-stepper-react-7p4 npm scope access + 2FA/provenance
3) wizzard-stepper-react-366 CI build/test matrix
4) wizzard-stepper-react-hi9 release tooling config (changesets/release-it)
5) wizzard-stepper-react-g5k GitHub Actions release workflow
6) wizzard-stepper-react-dp9 publish pipeline setup
7) wizzard-stepper-react-fdl TypeDoc regeneration
8) wizzard-stepper-react-zy1 docs + migration for scoped packages
9) wizzard-stepper-react-3iv + wizzard-stepper-react-4op legacy deprecation strategy
10) wizzard-stepper-react-abc release @wizzard/* v0.1.0

## Current Session Instructions
1) Claim wizzard-stepper-react-865, document release strategy decision in bd notes.
2) Confirm npm org access/provenance (wizzard-stepper-react-7p4).
3) Add CI matrix workflow (wizzard-stepper-react-366), then release tooling (hi9) and publish workflow (g5k).
4) Regenerate docs and update migration notes (dl, zy1).
5) Close/advance tasks in bd as each step is completed; bd sync at end of session.

## Session Update
- Date: 2026-01-10 14:29
- Scope: Scoped packages migration, repo move to wizzard-packages, docs/example alignment.
- Key changes: origin now points to wizzard-packages; demo base set to `/`; docs/examples updated to `@wizzard/*`; dmk.1 + dmk.5 closed; CI/CD + npm publish epic created; bd sync branch set to `main`.
- Tests run: `pnpm test:run` (commit hook) PASS
- Open questions: release strategy (meta vs legacy-only), npm scope access/provenance, MIGRATION_SCOPED.md content.
- Next action: start `wizzard-stepper-react-865` (release strategy) and `wizzard-stepper-react-sgf` CI/CD epic; close dmk.2 if ready.

## Project State (quick recap)
- Active epics: `wizzard-stepper-react-eh3` (scoped migration) + `wizzard-stepper-react-sgf` (CI/CD + npm publish). dmk epic mostly done; only adapters task remains.
- Tests status (last known):
  - pnpm -r build: PASS (2026-01-10)
  - pnpm test:run: PASS (2026-01-10)
  - pnpm test:e2e: PASS (2026-01-10, earlier)
- Known decisions:
  - Adapters remain separate packages (adapter-zod, adapter-yup)
  - persistence-local renamed to @wizzard/persistence
  - middleware moved to @wizzard/middleware
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

