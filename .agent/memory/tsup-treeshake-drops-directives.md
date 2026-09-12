---
name: tsup-treeshake-drops-directives
description: tsup's treeshake option runs rollup over esbuild output and rollup drops 'use client'; the react package builds on esbuild only, proven by examples/next-app.
metadata:
  type: project
---

`treeshake: true` in tsup re-bundles through rollup, and rollup discards module-level
directives with a warning that looks harmless ("was ignored"). Neither `banner` nor a
`renderChunk` plugin survives it: rollup parses the prepended string as a directive too.
`treeshake: false` on `packages/react` is the whole fix (PR #37, 2026-09-06).

**Why:** a React Server Components bundler reads `'use client'` from `dist`; without it a
Next.js server component importing `WizardProvider` fails at `next build`.

**How to apply:** never re-enable `treeshake` on `react`. `directive.test.ts` reads the built
files; `examples/next-app` fails to build without the directive and runs on every
`pnpm build` and in the Playwright `next` project (port 3100). Core and vue keep rollup:
they carry no directive. See [[wizzard-v1-flow-as-data]] for why the flow prop crosses the
RSC boundary as plain JSON.
