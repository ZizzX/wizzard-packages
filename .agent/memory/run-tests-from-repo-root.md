---
name: run-tests-from-repo-root
description: vitest must run from the monorepo root; a package-scoped run fails on a missing setupTests path.
metadata:
  type: project
---

`pnpm --filter <pkg> exec vitest run` fails every suite with "Cannot find module
.../packages/devtools/packages/react/src/setupTests.ts": the shared vitest config resolves
`setupFiles` relative to the root. Run `npx vitest run <path>` from the repo root instead;
`pnpm verify` (lint, type-check, all tests) and `pnpm size` are the pre-push gates, and the
pre-commit hook re-runs the whole test suite.

**Why:** one root config, per-package cwd breaks the relative setup path.
**How to apply:** always run vitest from the root, pass the directory as the filter.
Related: [[automated-review-on-every-pr]].
