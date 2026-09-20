---
title: Loading a step
description: A step that fetches before it is shown, what the loader receives, and what happens when a newer move overtakes it.
---

Most steps are ready the moment the flow reaches them. A step that is not - one whose options
come from an API, or whose body the server sends - says so, and the engine waits on entry
instead of rendering something incomplete.

## `load`

`load` is a resolver run as the step is entered:

```ts
steps: {
  seats: { label: 'Pick a seat', load: { $ref: 'seatMap', args: { plane: 'a320' } } },
}
```

```ts
registry: {
  seatMap: async (args, scope) => {
    store.seats = await (await fetch(`/seats/${args.plane}`)).json();
  },
}
```

The resolver receives the `args` from the definition and the scope the target sits in - and
those two only: a `load` resolver is not handed the move's `AbortSignal`, so a request it starts
runs to completion even when the move it belongs to is cancelled. Only a plugin's `loadStep`
gets a signal. Inside a repeat group the scope is the target's own, so `loop.item` is the item
being entered, not the one being left.

What it returns is discarded. `load` is a gate, not a fetch that fills the step: the engine
waits for the promise and moves on. Where the data lands is yours to decide - a store, a cache,
`wizard.set` from inside the resolver. A resolver `load` names but the registry does not hold
throws [`resolver-not-registered`](../../errors/resolver-not-registered/) with `op: 'load'`.

`load` is one of the two places built for waiting, so a promise here is expected;
[`resolver-is-async`](../../errors/resolver-is-async/) is about the places that are not, such as
`when` and the guards.

## `deferred`

`deferred: true` marks a step whose body arrives from the host rather than from the definition.
Entering one calls `loadStep(stepId, signal)` on every plugin, in order, and waits for each.

```ts
steps: {
  offer: { label: 'Your offer', deferred: true },
}
```

Today that is all `deferred` does: the engine awaits the plugins and continues. The definition a
`loadStep` returns is not applied to the flow - a plugin that fetches a step body installs it
with [`patchFlow`](../server-driven/), which is also how a server-driven flow changes shape
while it runs.

## While it loads

The step being entered is in `busy`, and `isBusy` is true for as long as the move takes, which
is what disables a Next button without any state of your own.

A move that takes time can be overtaken. Every wait is followed by a check, and neither outcome
is an exception:

| Result                                           | Meaning                                                                            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [`nav-superseded`](../../errors/nav-superseded/) | a newer move started while this one waited; nothing was committed                  |
| [`nav-aborted`](../../errors/nav-aborted/)       | `cancel()` or `destroy()` stopped it; a plugin's `loadStep` signal was aborted too |

Both come back from `next()` as `{ ok: false, reason }`. Neither stops a `load` resolver that is
already running, since it has no signal to stop on; what they guarantee is that its result
changes nothing. A plugin's `loadStep` is handed the signal and can stop its own work on it.

A loader that throws is different: the exception is not a refusal. The wizard returns to idle on
the step it was on, and the promise from `next()` rejects with whatever the loader threw, for
the caller to catch and retry. [API behaviour](../api-behaviour/) sets out that division.
