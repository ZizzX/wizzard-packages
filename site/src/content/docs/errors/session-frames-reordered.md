---
title: session-frames-reordered
description: A recording's rev or nav counter moves backwards between two frames.
---

```
[wizzard] <rev or nav> moves backwards, from <before> to <after>. The engine only ever raises it, so the frames were
reordered or spliced. Replay the frames in the order they were recorded, or record the run again.
…/errors/session-frames-reordered
```

Returned by `checkSession` from `@wizzard-packages/core/session`, with `path` ending in `.rev` or `.nav`. The site's inspector reads it to decide whether a recording may be replayed, and the devtools recorder runs it on an export whose `redact` hook changed the frames.

`rev` counts every commit and `nav` every navigation, and the engine only ever raises them. Two
frames in which either one goes down cannot be neighbours in a real run: the frames were reordered,
or two recordings were spliced into one. A counter that stands still between frames is fine.

Replay the frames in the order they were recorded. If the recording was assembled from pieces,
record the run again as one.
