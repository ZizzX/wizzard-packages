---
title: repeat-keys
description: The items of a repeat group do not each have a unique key, so a frame cannot name one of them.
---

```
[wizzard] repeat keys collide in group "<id>": "<key>" at <i> and <j>. …
[wizzard] item <i> of repeat group "<id>" has no key at "<keyBy>". …
```

Returned, not thrown: the move answers `{ ok: false, reason: 'invalid' }` with
the group as `by` and the message under the `keyBy` field, so a binding displays
it exactly where it displays a validation error.

A repeat frame stores the item's `key` and nothing else - never its index, which
moves when the list is reordered and dangles when an item is removed. So the key
has to identify one item, and two conditions stop it doing that:

- **Collision.** Keys are compared as strings, so `1` and `'1'` are one key, and
  every object without a distinguishing `keyBy` reads as `[object Object]`. A
  frame naming a duplicated key could mean either item.
- **No identity.** `undefined`, `null` and `''` name no item.

Both are data errors, and both are refused rather than resolved: falling back to
the position is exactly the stale-position bug that keying by identity exists to
remove. Selectors keep working while the data is wrong - a colliding key binds
to the first item that carries it - so the screen stays rendered and the move is
what refuses.

The fix is to make `keyBy` unique and present across the items, or to drop
`keyBy` and accept positional identity, where reordering the list moves the
answers with the position rather than with the item.
