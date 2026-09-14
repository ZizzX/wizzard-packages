---
title: devtools-no-plugin
description: Refused moves do not reach the devtools panel, because its plugin is missing or is not the installed one.
---

```
[wizzard] refusals are not captured. The wizard was created without the devtools plugin, so a
refused next() never reaches this panel. const dt = devtools(); createWizard({ flow, plugins:
[dt] }); <WizardDevtools plugin={dt}/>. …/errors/devtools-no-plugin
[wizzard] refusals are not captured. The plugin object passed to the panel is not the one
installed on this wizard, so its rings stay empty. Pass the same devtools() instance to
createWizard({ plugins: [dt] }) and to <WizardDevtools plugin={dt}/>. …/errors/devtools-no-plugin
```

Shown in the Activity tab's header and as `refusals: not captured` in the export preview. The
panel still works: commits, the graph, the state and the diff need no plugin.

A refusal is not a commit. `next()` that a validator blocks changes no state, so `subscribe`
never fires and a panel built on state alone cannot see it - which is the case the plugin
exists for. It sits in `createWizard({ plugins: [dt] })`, receives the engine's attempt hook,
and keeps the rings the panel reads.

The second form fires when a plugin is passed but its `attached` is false, or its `lastRev`
stays behind the wizard's `rev` after a commit. Both mean two different `devtools()` objects:
one installed on the engine, another handed to the panel. One instance goes to both places.
