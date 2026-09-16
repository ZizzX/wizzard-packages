---
title: session-frame-corrupt
description: A frame of a recording is not a state the engine could have produced.
---

```
[wizzard] frame <n> is not a wizard state. The recording is truncated or corrupt, and a replay would
draw a state the engine never produced. Record the run again, or restore the recording from where it
was saved. …/errors/session-frame-corrupt
[wizzard] frame <n> has an empty stack, but its status is <status>. Only a wizard that has not started
yet has no current step. Record the run again, or restore the recording from where it was saved.
…/errors/session-frame-corrupt
[wizzard] visited does not contain the current step "<step>". Breadcrumbs are coloured from visited, so
this frame and every one after it would be drawn wrong. Record the run again, or restore the
recording from where it was saved. …/errors/session-frame-corrupt
```

Returned by `checkSession` from `@wizzard-packages/core/session`, once per frame, with `path` naming the frame and the field. The site's inspector reads it to decide whether a recording may be replayed, and the devtools recorder runs it on an export whose `redact` hook changed the frames.

Every frame of a recording is a `WizardState` the engine committed. This one is not, in one of three
ways, and `path` says which:

| `path`                | What is wrong                                                        |
| --------------------- | -------------------------------------------------------------------- |
| `frames[<n>]`         | the frame is not a wizard state at all - truncated, or not an object |
| `frames[<n>].stack`   | the stack is empty, but the status says the wizard has started       |
| `frames[<n>].visited` | the current step is missing from `visited`                           |

None of them can come out of a running wizard, so the recording was damaged after it was made: cut
short on its way to disk, edited by hand, or rewritten by a `redact` hook that removed more than
data. A replay of such a frame would draw a state that never happened - breadcrumbs are coloured
from `visited`, so a gap there is wrong in this frame and every one after it.

Record the run again, or restore the recording from where it was saved. If a `redact` hook produced
it, the hook has to leave `stack`, `visited` and `status` as it found them.
