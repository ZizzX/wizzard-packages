---
title: Navigation
description: next, back, go and cancel - and the refusal each of them can return instead of moving.
---

Every move through a flow is asynchronous and every move can be refused. That pair is the whole
API surface of navigation, and it is deliberate: validation may need the network, a plugin may
veto, and a user who clicks twice must not end up two steps along.

```ts
const result = await wizard.next();
if (!result.ok) {
  // result.reason says why
}
```

## The methods

| Method          | Signature                                                                                   | Moves to                                                            |
| --------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `start()`       | `() => Promise<NavResult>`                                                                  | The first step the definition includes.                             |
| `next(opts?)`   | `(opts?: { validate?: boolean }) => Promise<NavResult>`                                     | Whatever `on.next` or `order` says is next.                         |
| `back()`        | `() => Promise<NavResult>`                                                                  | Whatever `on.back` says, or the previous reachable step in `order`. |
| `go(to, opts?)` | `(to: StepId \| END, opts?: { validate?: boolean; force?: boolean }) => Promise<NavResult>` | A named step, if policy allows.                                     |
| `cancel()`      | `() => void`                                                                                | Nowhere. It abandons the move in flight.                            |

`validate: false` skips the step's validator for that move. `force: true` on `go` skips the
navigation policy - the rule that decides which steps a jump may land on - and skips nothing
else. Both exist for the cases a product genuinely needs, a "save and exit" that must not be
blocked and an admin opening a step to reproduce a bug, and both are the wrong default, which is
why they are opt-in per call.

Guards are not among them. `guards.enter` and `guards.exit` run on every move, `force` included,
and refuse with `reason: 'blocked'`. A guard is where "this user may not see this step" lives,
and an option that switched it off would make it advice rather than a rule.

`start()` is `next()` from an empty stack. Once it has landed - a step is current, or a flow
with no reachable step has finished - calling it again is not a move: it answers where the wizard
already is. Until then it is not, so a first move that threw or was refused leaves the wizard
unstarted, and the next `start()` tries again. A `start()` called while a `next()` or `go()` from
the empty stack is still on its way does not step over it: it waits for that move, then answers
from wherever the move left the wizard, running the first move itself if it left it unstarted.

`back()` resolves its target from the definition rather than from where the user has been. A step
with `on.back` goes there. Otherwise the resolver walks `order` backwards and takes the first step
whose `when` still holds, so a branch that closed behind the user is skipped rather than
revisited. `'auto'` is that same walk, written out.

The history the wizard keeps is a different thing. It records the stack at each move, which is
what restores a position inside nested groups on the way back; it does not choose the target. The
distinction shows after a forced jump: `go('summary', { force: true })` from the first step and
then `back()` lands on whatever precedes `summary` in `order`, not on the step the jump came
from.

## The result

A move returns a discriminated union, and the failing half carries the reason rather than an
exception:

```ts
type NavResult =
  | { ok: true; from: string | null; to: string | typeof END }
  | {
      ok: false;
      reason: NavReason;
      code: `nav-${NavReason}`;
      url: string;
      by?: string;
      errors?: Record<string, string>;
    };
```

`code` is the reason with a `nav-` prefix, and `url` is the page that explains it: what causes the
refusal and what to do about it. Log the `url` beside an unexpected refusal and the reader lands on
the explanation.

| `reason`                                           | What happened                                                                          |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [`invalid`](../../errors/nav-invalid/)             | The step's validator refused. `errors` carries the field messages.                     |
| [`blocked`](../../errors/nav-blocked/)             | A guard, a plugin or the navigation policy refused. `by` names the step or the plugin. |
| [`no-target`](../../errors/nav-no-target/)         | There was no step to move to: `back()` on the first step, or `go()` to an unknown id.  |
| [`not-reachable`](../../errors/nav-not-reachable/) | The target's `when` is false, so it is not part of the flow right now.                 |
| [`superseded`](../../errors/nav-superseded/)       | Another move started before this one finished. The later move wins.                    |
| [`aborted`](../../errors/nav-aborted/)             | `cancel()` was called while this move was in flight.                                   |

`superseded` is the one worth designing for. Navigation carries an epoch: when a second `next()`
begins, the first is stamped stale, and whatever it was awaiting cannot commit when it
finally resolves. A double-clicked button produces one move and one refusal, never two moves.

## Refusals are values, not errors

Nothing here throws to signal a refused move. A refusal is a value with a reason, because a
refused move is an expected outcome of a wizard - the user has not filled the field yet - and
an exception would force every call site into a `try` block for the normal case.

Exceptions are still thrown for programming errors: an unknown resolver, a group step with no
traversal installed. Those are bugs in the wiring, not outcomes of a user's click.

## In a component

The bindings expose the same four methods plus the state a control needs to render itself:

```ts
const { next, back, canBack, isBusy, isLast } = useNavigation();
```

`isBusy` is true while a move is in flight, which is what a submit button should be disabled
by - not a local flag, which cannot know about a move started elsewhere.

`isLast` is true when `next()` from the current step would finish the wizard, which is where a
Next button usually turns into a Submit. It follows `on.next`, not the step's place in `order`:
a branch with no `on.next` finishes, and so does a step sent to `'@end'`
([Flow](../flow/) has the rules).
