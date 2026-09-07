---
'@wizzard-packages/devtools': major
'@wizzard-packages/react': minor
---

devtools: the panel is rebuilt on the v1 engine

The panel now draws the flow graph, the state a commit produced, and one ordered list of what
the wizard did, including the moves it refused. A refusal changes no state, so it reaches no
subscriber; it reaches the panel through the `devtools()` plugin, and the diagnostic strip
shows it without a tab change.

`WizardDevTools` is gone and `WizardDevtools` replaces it. Seven changes, one line each:

| 0.x                                       | 3.0                                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `import { WizardDevTools }`               | `import { WizardDevtools }` — one identifier; TypeScript reports the missing export at build |
| `?devtools=true` in the URL               | removed; render the panel where you want it and gate it yourself                             |
| floating overlay, `position: fixed`       | docked; fills its container, so the container needs a height                                 |
| Actions tab (`subscribeToActions`)        | Activity: commits and refusals; refusals need `devtools()` in `plugins`                      |
| Jump (`RESTORE_SNAPSHOT`)                 | removed; rebuild a wizard from a state with `createWizard({ state })`                        |
| `@wizzard-packages/react` as a dependency | peer `^1.0.0`; install it beside devtools                                                    |
| no recording                              | `Record` → `Copy JSON`, or `recordSession()`; the file is a `SessionBundle` `version: 1`     |

There is no codemod and no alias: the migration is one renamed import and two deletions, and
the compile error names the fix.

`react` gains `useOptionalWizard`, which returns the wizard above or null. `useWizard` throws
outside a provider, which is right for a component that cannot work without one; the panel
can, and a diagnostic tool that crashes the application it is diagnosing is worse than one
that reports it has nothing to watch.
