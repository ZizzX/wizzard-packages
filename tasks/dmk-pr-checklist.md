# PR Checklist + Next-Session Guide (dmk epic)

## Session Update (2026-01-10 14:29)
- Moved repo to `wizzard-packages` (origin updated).
- Scoped docs/examples aligned to `@wizzard/*`; demo base set to `/`.
- Closed dmk.1 + dmk.5; CI/CD + npm publish epic created.
- Tests: `pnpm test:run` PASS (commit hook).

## Purpose
This file is the single source of truth for continuing work without session context. Update it at the end of each work session or whenever scope changes.

## Current Focus (dmk epic)
- Goal: close out remaining dmk tasks (adapters) and confirm scoped migration notes are consistent.
- Status: dmk.1/3/4/5 closed; only adapters task remains before epic wrap-up.

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
   - No `@wizzard/persistence-local` anywhere
   - Middleware imported from `@wizzard/middleware`
   - DevTools UI only in `@wizzard/devtools`
   - Adapters remain separate packages (`@wizzard/adapter-zod`, `@wizzard/adapter-yup`)
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
2) Read this file, then review:
   - `IMPROVEMENT_ROADMAP.md`
   - `README.md` and `MIGRATION.md`
3) Confirm current build/test status:
   - `pnpm -r build`
   - `pnpm test:run`
   - `pnpm test:e2e`
4) Close remaining dmk adapters task if ready:
   - `wizzard-stepper-react-dmk.2`
5) Review CI/CD epic readiness:
   - `wizzard-stepper-react-sgf` tasks and dependencies
6) Update bd notes (do not close tasks here):
   - `bd update <id> --notes "..."`
7) Prepare PR

## dmk Task Map (what remains)
- dmk.2 (adapters)
  - Verify adapters remain separate; close task if no work left

## Update Rules for tasks files
- Always append a short "Session Update" block at the top with date/time and key changes.
- Keep checklists current; remove completed items.
- If new blockers appear, add a "Blockers" section.
- Never close bd tasks here; only via PR.
