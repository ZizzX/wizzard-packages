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
  seatMap: async (args, scope, signal) => {
    store.seats = await (await fetch(`/seats/${args.plane}`, { signal })).json();
  },
}
```

The resolver receives the `args` from the definition, the scope the target sits in, and the
move's `AbortSignal`. `cancel()` aborts the latest move while it runs, and `destroy()` every move
still running, so a request handed the signal stops with them, and the move answers `aborted`
rather than throwing the request's `AbortError`. A loader that has not started when
the move is called off never starts: neither `load` nor any `loadStep`, whether the move had not
reached its load yet or was waiting on an earlier `loadStep`. A newer move that overtakes this
one does not abort it, and a later `cancel()` reaches only that newer move - nothing at all once
it has settled. Inside a repeat group the scope is the target's own, so `loop.item` is the item
being entered, not the one being left.

What it returns is discarded. `load` is a gate, not a fetch that fills the step: the engine
waits for the promise and moves on. Where the data lands is yours to decide - a store, a cache,
`wizard.set` from inside the resolver. A resolver `load` names but the registry does not hold
throws [`resolver-not-registered`](../../errors/resolver-not-registered/) with `op: 'load'`.

`load` is one of the places built for waiting, so a promise here is expected;
[`resolver-is-async`](../../errors/resolver-is-async/) is about the places that are not: `when`,
a transition's condition, `repeat.over` and a group's `input`, all of which are evaluated
synchronously. A step's guards are awaited, so a resolver behind `guards.enter` may be async.

A session restored before `start()` - by `persist`, or through `createWizard({ state })` - is on
its step without having entered it, so the loader has not run in this page. `start()` enters such
a step again, in place, and runs its `load`; [Persistence](../persistence/) has the details.

## `deferred`

`deferred: true` marks a step whose body arrives from the host rather than from the definition.
Entering one calls `loadStep(stepId, signal)` on every plugin, in order, and waits for each.

```ts
steps: {
  offer: { label: 'Your offer', deferred: true },
}
```

That is all `deferred` does: the engine awaits the plugins and continues. `loadStep` returns
`Promise<void>`, and the engine reads nothing back from it - a plugin that fetches a step body
installs it with [`patchFlow`](../server-driven/), which is also how a server-driven flow changes
shape while it runs.

## While it loads

The step being entered is added to `busy`, and `isBusy` is true while the move runs, which is
what disables a Next button without any state of your own.

The marker goes on every way out: with the commit that lands the move, and when a move never
commits - it is cancelled, refused, or its loader throws. A move a newer one overtakes loses its
marker the moment the newer move starts, and the newer move sets and clears its own. A button
bound to `isBusy` alone therefore comes back after a failed load as well as after a successful one.

A move that takes time can be overtaken. Every wait is followed by a check, and neither outcome
is an exception:

| Result                                           | Meaning                                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| [`nav-superseded`](../../errors/nav-superseded/) | a newer move started while this one waited; nothing was committed                           |
| [`nav-aborted`](../../errors/nav-aborted/)       | `cancel()` or `destroy()` stopped it; the signal `load` and `loadStep` hold was aborted too |

Both come back from `next()` as `{ ok: false, reason }`. What they guarantee is narrow: the move
is not committed, so the wizard does not land on the step. A `load` resolver or a plugin's
`loadStep` that was cancelled is handed an aborted signal and can stop its own work on it; one
that ignores the signal runs on, and whatever it writes to a store, a cache or through
`wizard.set` is written anyway. A superseded move aborts nothing: its loader finishes unless the
wizard is destroyed, and only its result is dropped.

A loader that throws is different: the exception is not a refusal. The wizard returns to idle on the
step it was on, and the promise from `next()` rejects with whatever the loader threw, for the caller
to catch and retry. A move that was overtaken or cancelled by then answers `superseded` or `aborted`
instead, and the failure, an `AbortError` included, is not rethrown. [API
behaviour](../api-behaviour/) sets out that division.
