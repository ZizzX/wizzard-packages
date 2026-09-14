---
title: devtools-bundle-unsupported
description: A session bundle was written in a newer format than the reader that loaded it understands.
---

```
[wizzard] this bundle is version <n>. This reader understands version 1. Export it again with
a matching @wizzard-packages/devtools, or upgrade the reader. …/errors/devtools-bundle-unsupported
```

Reported by a reader of a `SessionBundle` - the docs site's replay mode, or a host that loads
a recording from a bug report. `version` is the format, not the package version: it is `1`
today and changes only when the shape changes in a way a reader cannot ignore.

A bundle carries the flow definition, the recorded frames and the outcomes, so it replays
structure and data. It does not carry resolver behaviour: a named resolver is not in the
bundle, and a replay of a flow that fetches its options shows the options it recorded.
