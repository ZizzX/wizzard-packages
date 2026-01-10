# Session Update + Project State (template)

## Session Update
- Date:
- Scope:
- Key changes:
- Tests run:
- Open questions:
- Next action:

## Project State (quick recap)
- Active epic: dmk (middleware/persistence/adapters regrouping)
- Tests status (last known):
  - pnpm -r build: PASS
  - pnpm test:run: PASS
  - pnpm test:e2e: PASS
- Known decisions:
  - Adapters remain separate packages (adapter-zod, adapter-yup)
  - persistence-local renamed to @wizzard/persistence
  - middleware moved to @wizzard/middleware

## Blockers
- None noted

## Files to re-check first
- README.md
- MIGRATION.md
- IMPROVEMENT_ROADMAP.md
- tsconfig.json
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
