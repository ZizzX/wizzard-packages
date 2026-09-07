---
name: Bug report
about: A wizard did something other than what you asked it to
labels: bug
---

## What happened

## What you expected

## A session bundle

The fastest way to get this fixed is a bundle, because it replays here without your
application: mount `<WizardDevtools />` from `@wizzard-packages/devtools`, press **Record**,
reproduce the problem, then **Copy JSON** and paste the result below. Outside React,
`recordSession(wizard, { plugin })` from `@wizzard-packages/devtools/headless` produces the
same file.

A bundle carries the flow and the states the wizard settled in, so redact anything you would
not post publicly — the panel takes a `redact` prop that runs over the whole bundle before it
leaves.

```json

```

## Versions

- `@wizzard-packages/core`:
- binding (`react` / `vue`) and version:
- node:
