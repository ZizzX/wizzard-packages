---
title: API behaviour
description: What each method does, what refuses it, and which switch changes that - on one page.
---

The guides explain one concept each. This page is the other view: every rule that decides what a
call does, in one table, so you can check a belief without reading four pages.

| Rule                                                                                               | Where to see it running                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `go(to)` moves only where `policy` allows. `force: true` skips that check and nothing else.        | [Navigation](../navigation/)                                   |
| Guards always run. `guards.enter` and `guards.exit` refuse with `reason: 'blocked'` and name who.  | [Navigation](../navigation/)                                   |
| Validation is its own switch: `validate: false` skips the step's validator for that move.          | [Block Next until valid](../block-next-until-valid/)           |
| `back()` follows the history stack - where the user came from, not what precedes in `order`.       | [Navigation](../navigation/)                                   |
| `set(path, value)` replaces the value at that path. `patch(partial)` merges shallowly into `data`. | [The flow](../flow/)                                           |
| `validate(step?)` runs one step's validator and resolves to a boolean.                             | [Validation](../validation/)                                   |
| Data is kept when a branch is abandoned, unless the step declares `clearOnLeave`.                  | [Clear abandoned branch data](../clear-abandoned-branch-data/) |
| `repeat` items are keyed by `keyBy`, and by position when it is absent.                            | [The flow](../flow/)                                           |
| The provider creates one engine and keeps it across rerenders. It never starts on the server.      | [Getting started](../start/)                                   |

## The three switches are not one switch

`force`, `validate` and guards are read as one idea - "let me through" - and they are three, with
three different answers.

`force: true` on `go()` skips the **navigation policy**: the rule that says a `sequential` flow
may not jump three steps ahead. That is all it skips. It is there for the cases a product
genuinely has, an admin opening a step to reproduce a bug among them.

`validate: false` skips **the step's own validator** for that one move. A "save and exit" that
must not be blocked by a half-filled field is what it is for.

**Guards have no switch.** `guards.enter` and `guards.exit` run on every move, `force` included,
and a refusal comes back as `{ ok: false, reason: 'blocked', by }`. This is deliberate: a guard
is where "this user may not see this step" is written, and an option that turned it off would
make it a suggestion. If a guard is refusing a move you want to allow, the condition is wrong -
change the condition.

## What is not here

There is no `validateAll()`. `validate(step?)` checks the current step or a named one, and
checking several means calling it for each. The engine validates a step when it is left, so a
whole-flow check is a question about steps nobody has reached yet, and the answer would go stale
before it was read.

## Refusals are values

None of the rules above throw. A refused move returns `{ ok: false, reason }` and the flow stays
where it was, because a refusal is an ordinary outcome of a wizard rather than a failure of the
program. [Navigation](../navigation/) lists every reason and what each one means.
