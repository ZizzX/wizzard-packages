---
title: session-unknown-flow
description: A frame of a recording names a flow the check was not given.
---

```
[wizzard] the frame names flow "<name>", which this check was not given. A sub-flow named by
reference is known only through the sub-flows passed to checkSession. Pass <name> in subFlows, or
replay against the flow the recording was made with. …/errors/session-unknown-flow
```

Returned by `checkSession` from `@wizzard-packages/core/session`, with `path` naming the stack entry. The site's inspector reads it to decide whether a recording may be replayed, and the devtools recorder runs it on an export whose `redact` hook changed the frames.

A frame inside a group names the sub-flow it is in. A sub-flow written inline in the definition is
found on its own, but one a group names by reference, `flow: 'passenger'`, is known only through
the `subFlows` passed to `checkSession`. Without it the check cannot tell a correct frame from one
recorded against something else, and says so rather than guessing.

```ts
import { checkSession } from '@wizzard-packages/core/session';

const problems = checkSession(recording, booking, { passenger });
```

Pass the flows the recording's groups refer to, keyed by the name they are referred to by. If the
flow is not one this definition refers to at all, the recording was made against a different flow;
see [`session-flow-mismatch`](../session-flow-mismatch/).
