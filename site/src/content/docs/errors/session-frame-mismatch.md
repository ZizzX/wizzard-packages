---
title: session-frame-mismatch
description: A frame of a recording describes a flow of a different shape from the one it is replayed against.
---

```
[wizzard] the frame names step "<step>", which flow "<flow>" does not have. The frames were recorded
against a flow of a different shape than the one they are replayed against. Replay against the flow
the recording was made with, or record the run again. …/errors/session-frame-mismatch
```

Returned by `checkSession` from `@wizzard-packages/core/session`, with `path` naming the stack entry. The site's inspector reads it to decide whether a recording may be replayed, and the devtools recorder runs it on an export whose `redact` hook changed the frames.

A frame's stack is the path from the root flow down to the current step, one entry per level. Each
entry has to fit the flow it names, and this one does not, in one of four ways:

- it names a step that flow does not have;
- it encloses another entry, but its step is not a group;
- its step is a group into one flow, and the entry below it is in another;
- it carries an item key, but its step is not a repeat group.

Each is a state the engine cannot reach with this definition, so the recording was made against a
different shape: a step renamed or removed, a group turned into a plain step, a repeat taken away.
The flow id and version may still match, which is why the frames are checked one by one rather than
trusted on their label.

Replay against the flow the recording was made with, or record the run again. A flow whose shape
changes should bump its `version`, so that the next recording of the old shape is refused as
[`session-flow-mismatch`](../session-flow-mismatch/) before any frame is read.
