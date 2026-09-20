---
title: Writing a plugin
description: The hooks a plugin may implement, where each one runs in a move, and what happens when one throws.
---

A plugin is an object with a `name` and any of six optional hooks. It is the engine's extension
point: persistence and devtools are both plugins, and nothing about them is privileged.

```ts
import type { Hooks } from '@wizzard-packages/core/v1';

export const trail = (): Hooks => ({
  name: 'trail',
  afterNavigate: ({ from, to }) => {
    console.info(`${from ?? 'start'} -> ${String(to)}`);
  },
});

createWizard({ flow, plugins: [trail()] });
```

## The hooks

| Hook                        | Runs                                            | May                                               |
| --------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| `init(host)`                | once, before the engine is handed out           | read state and flow, commit, return a teardown    |
| `beforeNavigate(e)`         | at the start of every move, before validation   | block or redirect the move                        |
| `loadStep(id, signal)`      | while entering a step marked `deferred`         | await work; see [Loading a step](../async-steps/) |
| `afterNavigate(e)`          | after the move has committed                    | observe only                                      |
| `onCommit(state, previous)` | after every commit, navigation or not           | observe only                                      |
| `onAttempt(attempt)`        | around a whole attempt: `start`, `end`, `error` | observe only                                      |

`init` receives a host with `getState`, `getFlow` and `commit`, and may return a teardown
function, which `destroy()` calls. A commit made during `init` is not reported back to the same
plugin's `onCommit`, so a plugin restoring state does not see its own restoration as a change.

`onCommit` fires on every commit, not only on navigation: `set`, `setCtx`, `patch`, `reset` and
`patchFlow` each produce one.

## Blocking and redirecting

`beforeNavigate` is the only hook that can change what happens. It is called on every plugin in
registration order, and the first one that refuses ends the move:

```ts
beforeNavigate: ({ state }) => (signedIn() ? undefined : { block: 'auth' });
```

`to` is the destination only when the move is an explicit `go(id)`. A `next()` or a `back()`
has not resolved its target yet when plugins run, so `to` is `null` there: a rule about a
particular step reads `from`, or the state, rather than `to`.

| Returned           | Effect                                                         |
| ------------------ | -------------------------------------------------------------- |
| nothing            | the move continues                                             |
| `false`            | refused, `{ ok: false, reason: 'blocked', by: <plugin name> }` |
| `{ block: name }`  | refused, with `by` set to that name                            |
| `{ redirect: to }` | the move becomes a `go` to that step and continues             |

It may be async. Everything after it - validation, guards, loading - runs against the intent it
left behind, so a redirect is honoured by the rest of the pipeline rather than corrected
afterwards.

## Where the hooks sit in one move

A move is one pipeline, and lands in exactly one commit - the one that changes where the wizard
is. It is not the only write: taking the navigation lock is a commit, and so is marking a step
busy before it loads, and `onCommit` sees each of them. A plugin counting moves, or recording
one entry per navigation, belongs in `onAttempt` or `afterNavigate` rather than in `onCommit`.

1. `beforeNavigate` on every plugin
2. the leaving step's `validate`, going forward
3. the leaving step's exit guard
4. the target is resolved, then checked for reachability and policy
5. `loadStep` for a `deferred` step, then the step's `load`
6. the target's enter guard
7. the commit
8. `afterNavigate` on every plugin

`afterNavigate` runs after that landing commit, so it cannot undo a move; a plugin that must prevent one
does it in `beforeNavigate`.

## When a plugin throws

The engine keeps running, and says what it dropped.

- `afterNavigate` throwing is logged as
  [`after-navigate-threw`](../../errors/after-navigate-threw/). The move stands: it had already
  committed.
- `init`, `onCommit` or `onAttempt` throwing disables that plugin entirely and logs
  [`plugin-disabled`](../../errors/plugin-disabled/). None of its hooks are called again, because
  a plugin that failed once has no state the engine can trust.
- A teardown throwing is logged as
  [`plugin-teardown-failed`](../../errors/plugin-teardown-failed/), and the other teardowns still
  run.
- `beforeNavigate` and `loadStep` throwing is not caught: the move is abandoned, the wizard
  returns to idle, and the exception reaches whoever called `next()`. The plugin stays enabled -
  a network failure in a loader is the caller's to handle, not a reason to switch persistence off.

A plugin that means to refuse should return a refusal rather than throw. [API
behaviour](../api-behaviour/) has the rule this follows: refusals are values, failures are
exceptions, and a failure with nobody to throw to is logged.

## The worked example

`@wizzard-packages/plugins/persist` is the plugin to read. It uses two hooks and no more:
`init` reads storage, decodes the snapshot and commits it through the host; `onCommit`
serialises the state and writes it behind a short debounce, so typing does not write on every
keystroke. Every failure inside it - storage unavailable, payload unreadable, version mismatch -
is reported through its own `onRestore` callback and a warning, never by throwing, which is what
keeps it from disabling itself. [Persistence](../persistence/) documents it as a user.
