---
title: nav-blocked
description: A move was refused by a plugin, a guard, or the navigation policy.
---

```
{ ok: false, reason: 'blocked', code: 'nav-blocked', by: '<plugin or step>', url: '…/errors/nav-blocked' }
```

Returned, not thrown, by `next()`, `back()` and `go()`. Nothing is written.

Four things refuse with `blocked`, and `by` says which one it was:

| Refused by                      | `by` names                                         |
| ------------------------------- | -------------------------------------------------- |
| a plugin's `beforeNavigate`     | the plugin, or the name it returned in `{ block }` |
| the step's `guards.exit`        | the step being left                                |
| the navigation policy on `go()` | the target                                         |
| the target's `guards.enter`     | the target                                         |

The policy and an enter guard both name the target, so the result alone does not tell them apart.
`go(to, { force: true })` does: `force` skips the policy, and a move it still refuses was refused
by a guard. A flow without `policy` gets `visited`, which refuses a jump to a step that has not
been visited yet.

If the refusal is the rule working, show the user why they cannot go on. If it is not, the
condition is what is wrong: correct the guard, or the plugin, or set the flow's `policy`. Guards
run on every move, `force` included. [API behaviour](../../docs/api-behaviour/) has all three
switches side by side.
