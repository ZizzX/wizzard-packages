---
title: Groups, repeat and sub-flows
description: A step that is another flow, run once or once per item, and what a group puts in scope while it runs.
---

A group is a step whose body is a flow of its own. It runs once - a section with its own steps -
or once per item in a list, which is how "three passengers, four steps each" is expressed without
writing twelve steps. The nested flow is an ordinary `FlowDefinition`, so everything that works
at the root works inside it.

This page builds one example in three files: the flow that runs per passenger, the trip that
repeats it, and the file that creates the wizard and walks it. The sections after them explain
each field the example uses.

## 1. The nested flow

<!-- example:groups-passenger -->

<!-- prettier-ignore -->
```ts
import { defineFlow, step } from '@wizzard-packages/core';
import { eq, get } from '@wizzard-packages/core/expr';

/**
 * The flow a group runs once per traveller. It is an ordinary definition and
 * does not know it is nested: whatever it needs from outside it reads from
 * `ctx`, which the group's `input` fills - `ctx.traveller`, `ctx.tier`.
 */
export const passenger = defineFlow({
  id: 'passenger',
  order: ['name', 'meal', 'lounge'],
  steps: {
    name: step({ label: 'Name' }),
    // Adults only. The branch is inside the repeat, so it is decided per item.
    meal: step({ label: 'Meal', when: eq(get('ctx.traveller.type'), 'adult') }),
    // A value from the root `ctx`, passed down by the group's `input`.
    lounge: step({ label: 'Lounge', when: eq(get('ctx.tier'), 'gold') }),
  },
});
```

<!-- /example -->

Nothing in this file says it is nested, and nothing has to. It reads the two values it needs from
outside - the traveller it is running for, and the account's tier - from `ctx`. The group in the
next file decides what goes there.

## 2. The flow that repeats it

<!-- example:groups-trip -->

<!-- prettier-ignore -->
```ts
import { defineFlow, group, step } from '@wizzard-packages/core';
import { empty, get, not } from '@wizzard-packages/core/expr';

export interface Traveller {
  id: string;
  type: 'adult' | 'child';
}

/**
 * The root flow. `party` collects the list, `people` runs `passenger` once per
 * item in it, and `review` comes after the last one.
 *
 * `flow: 'passenger'` is a name, not the definition, so this object stays JSON
 * on its own; `createWizard` is handed the definition under that name.
 */
export const trip = defineFlow({
  id: 'trip',
  // A flow holding a repeat needs a version: a restored snapshot names keys of
  // a list that may have changed shape since it was written.
  version: 1,
  order: ['party', 'people', 'review'],
  steps: {
    party: step<{ travellers: Traveller[] }>({ label: 'Who is travelling' }),
    people: group({
      label: 'Passengers',
      flow: 'passenger',
      // A repeat must be excluded while its list is empty.
      when: not(empty(get('data.party.travellers'))),
      repeat: { over: get('data.party.travellers'), keyBy: 'id' },
      input: { traveller: get('loop.item'), tier: get('ctx.user.tier') },
    }),
    review: step({ label: 'Review' }),
  },
});
```

<!-- /example -->

`people` is the group. `party` writes the list it repeats over, `data.party.travellers`, like any
other answer. [A group step](#a-group-step) below goes through its fields.

## 3. Creating and walking the wizard

<!-- example:groups-run -->

<!-- prettier-ignore -->
```ts
import { createWizard } from '@wizzard-packages/core';
import { groups } from '@wizzard-packages/core/groups';

import { passenger } from './passenger';
import { trip } from './trip';

/**
 * Where the pieces meet. `groups` is the traversal for group steps, a separate
 * entry so a flow without groups never carries it. `subFlows` hands over the
 * definition `flow: 'passenger'` names. `ctx` is what the application knows
 * before the user types anything; the group's `input` reads `ctx.user.tier`
 * from it.
 *
 * This file plays the part a component plays in an app: it starts the wizard,
 * writes the answers, moves, and destroys the wizard when it is done.
 */
const wizard = createWizard({
  flow: trip,
  groups,
  subFlows: { passenger },
  ctx: { user: { tier: 'gold' } },
});

/** Every frame of the stack, the group's with the item's key. */
const where = (): string =>
  wizard
    .getSnapshot()
    .stack.map((f) => (f.key === undefined ? f.step : `${f.step}[${f.key}]`))
    .join(' / ');

await wizard.start();
console.log(`at: ${where()}`);

// The list the group repeats over is ordinary data, written by the first step.
wizard.set('party.travellers', [
  { id: 'ada', type: 'adult' },
  { id: 'cy', type: 'child' },
]);

// Into the group, and through each item: Ada gets every step, Cy skips `meal`.
for (let i = 0; i < 6; i++) {
  await wizard.next();
  const { index, active } = wizard.getSnapshot();
  console.log(`at: ${where()} (${index + 1} of ${active.length})`);
}

// Back from the step after the group goes in where the last item stopped.
await wizard.back();
console.log(`back: ${where()}`);

wizard.destroy();
```

<!-- /example -->

Three options make a flow with groups run, and each one answers a question the definition leaves
open:

- `groups` is the code that walks into and out of a group. It is a separate entry point,
  `@wizzard-packages/core/groups`, so a flow without groups never pays for it. A flow holding a
  group step without it throws [`groups-not-installed`](../../errors/groups-not-installed/), at
  `createWizard` and at `patchFlow`.
- `subFlows` maps the names a `flow:` string uses to their definitions.
- `ctx` is what the application knows before anyone types. It is where `ctx.user.tier` comes from.

In an app, a binding's provider takes the same options - `<WizardProvider flow={trip} groups={groups}
subFlows={{ passenger }} ctx={ctx}>` in React, `provideWizard({ ... })` in Vue - calls `start()`
when it mounts and `destroy()` when it unmounts. Your components write the list with `set` and
move with `next` and `back`, exactly as this file does by hand.

To run it, put the three files in `src/groups/` of an app made as
[Getting started](../start/#in-a-new-app) describes, add `import './groups/run';` to `src/main.ts`
(`src/main.tsx` in React) and start `pnpm dev`. The script prints to the browser console:

<!-- example:groups-output -->

<!-- prettier-ignore -->
```txt
at: party
at: people[ada] / name (1 of 3)
at: people[ada] / meal (2 of 3)
at: people[ada] / lounge (3 of 3)
at: people[cy] / name (1 of 2)
at: people[cy] / lounge (2 of 2)
at: review (3 of 3)
back: people[cy] / lounge
```

<!-- /example -->

Ada is an adult, so her pass has three steps. Cy is a child, so `meal` is not part of hers, and the
count says "2 of 2" rather than skipping a number. `lounge` is there for both, because `tier`
came down from `ctx`. Back from `review` goes into the group where the last item stopped. A test
in the repository runs this script and compares its output with the block above.

## A group step

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

So `passenger.ts` could test the item directly, without `input`:

```ts
meal: step({ label: 'Meal', when: eq(get('loop.item.type'), 'adult') }),
```

It reads `ctx.traveller` instead because `loop` exists only inside a repeat, while `ctx` can be
filled by any group's `input`, or by `createWizard` when the same flow runs on its own.

A nested group that does not repeat keeps the `loop` of the one above it, so a section inside a
repeat still knows which item it is in.

`input` passes values down by name. In `trip.ts` it is
`{ traveller: get('loop.item'), tier: get('ctx.user.tier') }`. Each expression is evaluated
against the parent's scope, with the group's own `loop` already on it, and the results land in the
`ctx` the nested flow reads - `ctx.traveller`, `ctx.tier`. They are derived, not captured: every
read of the scope evaluates them again, so a value that changes upstream is visible inside the
group without leaving it and coming back. The parent's own `ctx` is untouched, and an expression
that fails leaves its name `undefined` rather than refusing the move.

## What the wizard reports inside a group

A group replaces what "where am I" means while it runs. `current`, `index`, `progress`,
`breadcrumbs` and `active` are computed against the nested flow, so a stepper drawn from them
reads "step 2 of 3" for this passenger rather than "step 2 of 3" for the trip - the counts in the
output above. `canBack` and `isLast` come from the traversal too: the last step of the third
passenger is not the last step of the trip.

The enclosing groups are in `stack`, one frame each - `{ flow, step, key }` - with the current
step last. That is what `where()` above prints, what a snapshot stores, and why a repeat needs a
`version`: the frames name keys of a list the next session may have changed.

`back()` follows the history across a group's edges. From the first step of an item it lands where
the previous item stopped, and from the first step of the first item it leaves the group. From the
step after the group it goes back in where the last item stopped, skipping items that have since
been removed. `go()` to the group step starts it over at its first item.

## Where to go next

[The flow](../flow/) has the field-by-field shape of a group step beside every other kind.
[Expressions](../expressions/) covers what `when`, `repeat.over` and `input` are written in.
[Persistence](../persistence/) explains what happens to those frames when a wizard is restored.
