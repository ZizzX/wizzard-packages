---
title: groups-not-installed
description: A flow has a group step, and the wizard was created without the traversal that walks one.
---

```
[wizzard] step "<id>" is a group, but no traversal is installed. Without one the
engine walks flat flows only. Pass groups from @wizzard-packages/core/groups to
createWizard. …/errors/groups-not-installed
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
