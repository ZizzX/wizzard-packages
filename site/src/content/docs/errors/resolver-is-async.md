---
title: resolver-is-async
description: A resolver returned a promise where the engine evaluates synchronously and cannot wait for it.
---

```
[wizzard] resolver "<name>" returned a promise. This expression is evaluated synchronously - a
when, a transition guard or a repeat source - and cannot wait for it. Make <name> synchronous, or
move the asynchronous work into the step's validate or load. …/errors/resolver-is-async
```

Thrown as a `WizardError` with `op: 'evaluate'`.

Some expressions are read while the engine works out which steps exist and where a move leads:
a step's `when`, the guards in `on.next`, a repeat group's `repeat.over` and its `ctx`. Those
answers feed the progress bar and the list of steps a binding renders, so they are computed
synchronously, and a resolver used there has to return its value rather than a promise of one.

`validate` and `load` are the places built for waiting. They run inside a navigation, the wizard
reports itself busy while they do, and a newer move supersedes them. A check that has to go to
the network belongs there. A condition that depends on something fetched reads a value that is
already present instead: fetch it before `createWizard` and pass it in `data` or `ctx`, or write it
with `set` once it arrives, and let the `when` compare it with `$get`.

`isSync(expr)` from `@wizzard-packages/core/v1` tells whether an expression contains any `$ref`
at all, which is the question to ask of a flow that arrives from a server before rendering it.
