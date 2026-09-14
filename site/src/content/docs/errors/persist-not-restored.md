---
title: persist-not-restored
description: A stored session was found and refused, so the wizard starts fresh instead of restoring it.
---

```
[wizzard] The saved wizard was not restored, so it starts fresh. the stored session was refused
(<reason>). this is expected after a flow or version change; clear the key to stop the warning.
…/errors/persist-not-restored
```

A warning from `persist()` in `@wizzard-packages/plugins/persist`, printed with `console.warn`
once for the life of the plugin. Something was stored under the key, and reading it back did not
produce a session this flow can continue.

`<reason>` is the one `onRestore` receives in `{ restored: false, reason }`:

| `reason`                | What was wrong                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `snapshot/unreadable`   | Not JSON, or JSON that is not an object, or not a snapshot at all.                                   |
| `snapshot/version`      | Written by a snapshot format this build does not know, and `migrate` did not upgrade it.             |
| `snapshot/other-flow`   | Taken against a different flow `id` or flow `version`, or stored under a different `version` option. |
| `snapshot/unknown-step` | Names a step this definition no longer has.                                                          |
| `snapshot/unstorable`   | Holds something that cannot survive the round trip.                                                  |
| `snapshot/too-large`    | Past the size or nesting limit.                                                                      |

Every one of them starts the person cleanly rather than dropping them into a step that no longer
exists, and that is the intended behaviour: the warning is there so a developer who changed the
flow sees why their own saved session vanished.

After a deliberate change to the flow or to the `version` option, nothing needs fixing; clearing
the key in the browser stops the warning. If it appears without such a change, the reason names
what the stored value got wrong, and the [persistence guide](../../docs/persistence/) explains
each one alongside `migrate`, the way to carry an older snapshot forward instead of refusing it.
