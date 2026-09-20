---
title: Groups, repeat and sub-flows
description: A step that is another flow, run once or once per item, and what a group puts in scope while it runs.
---

A group is a step whose body is a flow of its own. It runs once - a section with its own steps -
or once per item in a list, which is how "three passengers, four steps each" is expressed without
writing twelve steps. The nested flow is an ordinary `FlowDefinition`, so everything that works
at the root works inside it.

Traversing groups is optional code. The engine ships it as a separate entry point, so a flow
without groups never pays for it:

```ts
import { createWizard } from '@wizzard-packages/core/v1';
import { groups } from '@wizzard-packages/core/groups';

const wizard = createWizard({ flow: trip, groups, subFlows: { passenger } });
```

A flow holding a group step without `groups` throws
[`groups-not-installed`](../../errors/groups-not-installed/), at `createWizard` and at
`patchFlow`.

## A group step

```ts
import { defineFlow, group, step } from '@wizzard-packages/core';
import { empty, get, not } from '@wizzard-packages/core/expr';

const trip = defineFlow({
  id: 'trip',
  version: 1,
  order: ['party', 'people', 'review'],
  steps: {
    party: step({ label: 'Who is travelling' }),
    people: group({
      label: 'Passengers',
      flow: 'passenger',
      when: not(empty(get('data.passengers'))),
      repeat: { over: get('data.passengers'), keyBy: 'id' },
    }),
    review: step({ label: 'Review' }),
  },
  policy: 'free',
});
```

`flow` is the nested definition: an inline `FlowDefinition`, or a string naming one of
`subFlows`. A string keeps the parent serializable on its own, which is what a backend sending a
flow wants; an inline definition keeps everything in one object.

`repeat.over` is an expression producing the list. `keyBy` names the field that identifies an
item; without it the key is the item's position, which is enough only while the list never
reorders. A key that is missing, null or empty, or that two items share, refuses the move with
[`repeat-keys`](../../errors/repeat-keys/) - a value, not a throw, carrying the failing field in
`errors`.

Two rules `validateFlow` enforces, both about lists that change under a running wizard: a group
with `repeat` needs a `when` that excludes it when the list is empty
([`repeat-without-when`](../../errors/repeat-without-when/)), and a flow containing any repeat
needs a `version` ([`repeat-without-version`](../../errors/repeat-without-version/)), because a
restored snapshot has to be told the shape it was written against.

## What a group puts in scope

Inside a repeat, expressions of the nested flow see the current item under `loop`:

| Path         | Value                                                      |
| ------------ | ---------------------------------------------------------- |
| `loop.item`  | the element itself                                         |
| `loop.index` | its position in the list                                   |
| `loop.key`   | the key `keyBy` produced, or the position when it has none |

```ts
when: eq(get('loop.item.type'), 'adult');
```

A nested group that does not repeat keeps the `loop` of the one above it, so a section inside a
repeat still knows which item it is in.

`input` passes values down by name:

```ts
people: group({
  flow: 'passenger',
  repeat: { over: get('data.passengers'), keyBy: 'id' },
  input: { traveller: get('loop.item'), tier: get('ctx.user.tier') },
});
```

Each expression is evaluated against the parent's scope, with the group's own `loop` already on
it, and the results land in the `ctx` the nested flow reads - `ctx.traveller`, `ctx.tier`. They
are derived, not captured: every read of the scope evaluates them again, so a value that changes
upstream is visible inside the group without leaving it and coming back. The parent's own `ctx`
is untouched, and an expression that fails leaves its name `undefined` rather than refusing the
move.

## What the wizard reports inside a group

A group replaces what "where am I" means while it runs. `current`, `index`, `progress`,
`breadcrumbs` and `active` are computed against the nested flow, so a stepper drawn from them
reads "step 2 of 3" for this passenger rather than "step 2 of 3" for the trip. `canBack` and
`isLast` come from the traversal too: the last step of the third passenger is not the last step
of the trip.

The enclosing groups are in `stack`, one frame each - `{ flow, step, key }` - with the current
step last. That is also what a snapshot stores, and why a repeat needs a `version`: the frames
name keys of a list the next session may have changed.

## Where to go next

[The flow](../flow/) has the field-by-field shape of a group step beside every other kind.
[Expressions](../expressions/) covers what `when`, `repeat.over` and `input` are written in.
[Persistence](../persistence/) explains what happens to those frames when a wizard is restored.
