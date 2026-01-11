# PR Checklist + Next-Session Guide (dmk epic)

## Session Update (2026-01-11 01:31)
- Confirmed `wizzard-stepper-react-dmk.2` closed in bd; dmk epic fully complete.
- No remaining dmk tasks; this file now serves as reference only.

## Session Update (2026-01-10 14:29)
- Moved repo to `wizzard-packages` (origin updated).
- Scoped docs/examples aligned to `@wizzard-packages/*`; demo base set to `/`.
- Closed dmk.1 + dmk.5; CI/CD + npm publish epic created.
- Tests: `pnpm test:run` PASS (commit hook).

## Purpose
This file is the single source of truth for continuing work without session context. Update it at the end of each work session or whenever scope changes.

## Current Focus (dmk epic)
- Goal: dmk epic completed; no remaining tasks.
- Status: dmk epic closed, including adapters task `wizzard-stepper-react-dmk.2`.

## PR Checklist (do in order)
1) Verify workspace builds
   - `pnpm -r build`
   - Expect: all packages + examples/demo build OK

2) Verify unit tests
   - `pnpm test:run`
   - Expect: all vitest suites green

3) Verify e2e tests
   - `pnpm test:e2e`
   - Expect: all Playwright tests green

4) Sanity check imports/docs
   - No `@wizzard-packages/persistence-local` anywhere
   - Middleware imported from `@wizzard-packages/middleware`
   - DevTools UI only in `@wizzard-packages/devtools`
   - Adapters remain separate packages (`@wizzard-packages/adapter-zod`, `@wizzard-packages/adapter-yup`)
   - Repo links point to `wizzard-packages`

5) Update docs/migration
   - `README.md` imports/snippets updated
   - `MIGRATION.md` reflects new package names
   - `IMPROVEMENT_ROADMAP.md` updated if decisions changed

6) Git status review
   - `git status -sb`
   - Ensure no accidental deletions or unrelated changes

7) Commit/PR prep (do not close bd tasks here)
   - Stage relevant files
   - Prepare commit(s) with clear scope (e.g. "dmk: middleware+persistence regrouping")
   - Open PR and only close bd tasks in PR flow

## Next-Session Step-by-Step (dmk)
1) Run `bd prime` and `bd list --status=open`
2) Focus on epics `wizzard-stepper-react-eh3` and `wizzard-stepper-react-sgf`
3) Update bd notes as work progresses:
   - `bd update <id> --notes "..."`

## dmk Task Map (what remains)
- None (dmk epic complete)

## Update Rules for tasks files
- Always append a short "Session Update" block at the top with date/time and key changes.
- Keep checklists current; remove completed items.
- If new blockers appear, add a "Blockers" section.
- Never close bd tasks here; only via PR.
