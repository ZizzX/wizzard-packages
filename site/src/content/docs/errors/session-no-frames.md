---
title: session-no-frames
description: A recording has no frames to replay.
---

```
[wizzard] this recording has no frames. A replay draws frames, and there is nothing to draw. Record
the run again, or restore the recording from where it was saved. …/errors/session-no-frames
```

Returned by `checkSession` from `@wizzard-packages/core/session`, with `path: frames`. The site's inspector reads it to decide whether a recording may be replayed, and the devtools recorder runs it on an export whose `redact` hook changed the frames.

A replay steps through frames, and this recording has none: `frames` is empty, or is not a list at
all. The usual causes are a recorder that was stopped before the wizard changed state, and a file
that was cut short or written by hand without its frames.

No other check runs on a recording without frames. Record the run again, or restore the recording
from where it was saved.
