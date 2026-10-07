# Contributing

The rules for working on this repository are in [`AGENTS.md`](AGENTS.md). It is written for
automated contributors and holds for people just the same: what the library is, where its code
lives, the hard rules a change must not break and what a finished pull request includes.
[`docs/DEV_WORKFLOW.md`](docs/DEV_WORKFLOW.md) covers branches, release channels, CI and where
work is tracked; a bug report goes through the issue template, which asks for a recorded session.

The gate is `pnpm verify` — lint, type-check and the unit tests — and it passes before a pull
request is opened. You need Node 20.11 or newer and pnpm 10; `pnpm install` sets up the
workspace. CI runs more than `verify` does: when a change can move formatting, the README
examples, a link, packaging, bundle size or the e2e suite, run that step too. "Quality gates" in
`AGENTS.md` lists each one.
