# Session Update + Project State (template)

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
