---
title: session-flow-mismatch
description: A recording is replayed against a flow, or a version of it, other than the one it was made with.
---

```
[wizzard] this recording was made against flow "<recorded>", not "<flow>". A replay of another flow
still draws every frame, and nothing on screen says it is wrong. Replay it against the flow it was
recorded with. …/errors/session-flow-mismatch
[wizzard] this recording was made against version <recorded>, and the flow is version <current>. A replay of another
flow still draws every frame, and nothing on screen says it is wrong. Replay it against the version
it was recorded with, or record the run again. …/errors/session-flow-mismatch
```

Returned by `checkSession` from `@wizzard-packages/core/session`, with `path: flow` when the ids differ and `path: version` when the versions do. The site's inspector reads it to decide whether a recording may be replayed, and the devtools recorder runs it on an export whose `redact` hook changed the frames.

A recording names the flow it was made against and, when the producer stamped one, that flow's
version. A replay against anything else is the failure `checkSession` exists for: every frame still
draws, every breadcrumb still lights up, and nothing on screen says the recording belongs to another
flow.

The version is compared only when both the recording and the flow carry one. A missing version is a
gap in the recording, not evidence that it drifted.

Replay the recording against the flow it names, at the version it names. If that flow has moved on
and the old definition is gone, record the run again against the current one. A flow whose shape
changes should bump its `version`, which is what lets this check tell the two apart.
