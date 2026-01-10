# PR Checklist + Next-Session Guide (dmk epic)

## Purpose
This file is the single source of truth for continuing work without session context. Update it at the end of each work session or whenever scope changes.

## Current Focus (dmk epic)
- Goal: monorepo regrouping for middleware/persistence/adapters with clean workspace wiring and docs/tests aligned.
- Status: code changes in progress; tests currently green after alias fix.

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
4) Finish docs alignment:
   - Replace any legacy imports in docs
   - Add short migration notes for new package names
5) Verify workspace wiring:
   - `tsconfig.json` references
   - `tsup.config.ts` externals
   - `package.json` deps/peerDeps
6) Update bd notes (do not close tasks):
   - `bd update <id> --notes "..."`
7) Prepare PR

## dmk Task Map (what remains)
- dmk.1 / dmk.1.1 / dmk.1.2 (middleware)
  - Ensure no old imports remain in code/docs
  - Confirm devtools package is UI-only

- dmk.3 / dmk.3.1 / dmk.3.2 (persistence)
  - Ensure all imports use `@wizzard/persistence`
  - Remove any docs references to persistence-local

- dmk.4 (workspace wiring)
  - Confirm builds/tsconfig/exports are consistent

- dmk.5 (docs/examples/tests)
  - Finish README/MIGRATION updates
  - Keep tests green

- dmk.2 (adapters)
  - Keep adapters separate; document this decision
  - Ensure docs/examples use `@wizzard/adapter-*`

## Update Rules for tasks files
- Always append a short "Session Update" block at the top with date/time and key changes.
- Keep checklists current; remove completed items.
- If new blockers appear, add a "Blockers" section.
- Never close bd tasks here; only via PR.
