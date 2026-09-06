# Errors

Every failure the engine reports — thrown or returned — has one shape:

```
[wizzard] <what went wrong>. <why>. <the fix>. <this document>#<code>
```

The fragment at the end is the code, and it names a section below. A message
that only says what broke leaves the reader to work out the cause; the sections
here carry the part that does not fit in one line.

## groups-not-installed

```
[wizzard] step "<id>" is a group, but no traversal is installed. Without one the
engine walks flat flows only. Pass groups from @wizzard-packages/core/groups to
createWizard. …#groups-not-installed
```

A `GroupStep` is a sub-flow, and walking one means pushing frames onto the
stack, evaluating `repeat.over`, keying its items and deciding what the end of a
child flow means at that depth. That is several hundred bytes of machinery, and
a flow with no sub-flows would carry it for nothing, so it ships as a separate
entry and is handed to the engine rather than imported by it.

```ts
import { createWizard } from '@wizzard-packages/core/v1';
import { groups } from '@wizzard-packages/core/groups';

const wizard = createWizard({ flow, groups, subFlows });
```

`subFlows` is only needed when a `GroupStep.flow` is a string: it maps that
string to the definition it names. A group whose `flow` is the definition itself
resolves without it.

The check runs in `createWizard` and again in `patchFlow`, which are the two
places a flow arrives, so it fails before the first render rather than on the
first `next()`. Without it the failure is silent and late: the step resolves,
reachability includes it, and the binding is asked to render a step type that
has no view.

## repeat-keys

```
[wizzard] repeat keys collide in group "<id>": "<key>" at <i> and <j>. …
[wizzard] item <i> of repeat group "<id>" has no key at "<keyBy>". …
```

Returned, not thrown: the move answers `{ ok: false, reason: 'invalid' }` with
the group as `by` and the message under the `keyBy` field, so a binding displays
it exactly where it displays a validation error.

A repeat frame stores the item's `key` and nothing else — never its index, which
moves when the list is reordered and dangles when an item is removed. So the key
has to identify one item, and two conditions stop it doing that:

- **Collision.** Keys are compared as strings, so `1` and `'1'` are one key, and
  every object without a distinguishing `keyBy` reads as `[object Object]`. A
  frame naming a duplicated key could mean either item.
- **No identity.** `undefined`, `null` and `''` name no item.

Both are data errors, and both are refused rather than resolved: falling back to
the position is exactly the stale-position bug that keying by identity exists to
remove. Selectors keep working while the data is wrong — a colliding key binds
to the first item that carries it — so the screen stays rendered and the move is
what refuses.

The fix is to make `keyBy` unique and present across the items, or to drop
`keyBy` and accept positional identity, where reordering the list moves the
answers with the position rather than with the item.
