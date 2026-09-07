# @wizzard-packages/devtools

![npm](https://img.shields.io/npm/v/@wizzard-packages/devtools)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/devtools)
![license](https://img.shields.io/npm/l/@wizzard-packages/devtools)

A docked panel that answers one question: why is the wizard where it is. It draws the flow it
is standing in, the state it committed, and what it did to get there — including the moves it
refused, which change no state and are therefore invisible to everything else.

| devtools | core | react | React |
| -------- | ---- | ----- | ----- |
| 3.x      | 1.x  | 1.x   | ≥ 18  |

## Three steps

```bash
pnpm add -D @wizzard-packages/devtools
```

<!-- example:quickstart-devtools -->

<!-- prettier-ignore -->
```tsx
import { createWizard } from '@wizzard-packages/core/v1';
import { WizardProvider } from '@wizzard-packages/react/v1';
import { WizardDevtools, devtools } from '@wizzard-packages/devtools';

import { signup } from './flow';
import { Wizard } from './App';

/**
 * The panel, wired the way the README's three steps describe it.
 *
 * Two things are easy to get wrong and both are here: the same `devtools()`
 * object goes to `createWizard` and to the panel - two instances leave the
 * refusal rows empty - and the container has a height, because the panel is
 * docked and fills what it is given rather than floating over the page.
 */
const dt = devtools();
const wizard = createWizard({ flow: signup, plugins: [dt] });

export function App(): React.ReactNode {
  return (
    <WizardProvider wizard={wizard}>
      <Wizard />
      <div style={{ height: 360 }}>
        <WizardDevtools plugin={dt} />
      </div>
    </WizardProvider>
  );
}
```

<!-- /example -->

Click Next with the email field empty. The strip at the top reads
`✗ next invalid · email: required`; click it to open the refusal in Activity, with the intent
that was refused and the state it was refused in.

Two things are easy to get wrong. The same `devtools()` object goes to `createWizard` and to
the panel — two instances leave the refusal rows empty, and the panel says so. And the
container needs a height: the panel is docked and fills what it is given.

## Diagnosing a refusal

A refusal never commits, so `subscribe` never fires for it. The plugin is what sees it:

```tsx
const dt = devtools();
const wizard = createWizard({ flow, registry, plugins: [dt] });
<WizardDevtools plugin={dt} />;
```

The strip shows the latest outcome without a tab change. Activity lists commits and refusals
in one order; selecting a refusal pins the panel to the state it happened in, so the graph,
the diff and the inspector all answer as of that moment. The inspector prints each step's
`when` and whether it held — or `Not evaluated`, inside a repeat group, where the loop scope
it needs does not exist.

## Recording without React

`recordSession` is the same recorder the panel's Record button uses, and it needs no DOM. A
Node test, a Vue host or a CI run produces the same bundle a person would attach to an issue:

```ts
import { devtools, recordSession } from '@wizzard-packages/devtools/headless';
import { writeFileSync } from 'node:fs';

const dt = devtools();
const wizard = createWizard({ flow, registry, plugins: [dt] });
const recording = recordSession(wizard, { plugin: dt });

await wizard.start();
await wizard.next();

recording.stop();
writeFileSync('bundle.json', JSON.stringify(recording.bundle()));
```

A bundle replays structure and data: the flow definition, every settled state, and the
outcomes. It does not replay resolver behaviour — a named resolver is not in the bundle, so a
flow that fetches its options shows the options it recorded.

## Redaction

`redact` runs once, at export, on a copy of the whole bundle:

```tsx
<WizardDevtools
  plugin={dt}
  redact={(bundle) => ({
    ...bundle,
    session: {
      ...bundle.session,
      frames: bundle.session.frames.map((frame) => ({
        ...frame,
        data: { ...frame.data, card: '[redacted]' },
      })),
    },
  })}
/>
```

Frames are unredacted in memory until export: the hook shapes what leaves, not what is kept.
The export preview shows the counts, the size and whether the hook ran, before anything is
copied. A hook that throws stops the export and copies nothing.

## Placement

The panel is a client component and renders nothing on the server. Gate it yourself; there is
no URL flag and no floating button.

```tsx
// Next.js: a client component under the form, in a container with a height.
'use client';
{
  process.env.NODE_ENV !== 'production' && (
    <div style={{ height: 360 }}>
      <WizardDevtools plugin={dt} />
    </div>
  );
}
```

```tsx
// Vite
{
  import.meta.env.DEV && <WizardDevtools plugin={dt} />;
}
```

`examples/next-app` in the repository is the runnable one.

## Upgrading from 0.x

| 0.x                                       | 3.0                                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `import { WizardDevTools }`               | `import { WizardDevtools }` — one identifier; TypeScript reports the missing export at build |
| `?devtools=true` in the URL               | removed; render the panel where you want it and gate it yourself                             |
| floating overlay, `position: fixed`       | docked; fills its container, so the container needs a height                                 |
| Actions tab (`subscribeToActions`)        | Activity: commits and refusals; refusals need `devtools()` in `plugins`                      |
| Jump (`RESTORE_SNAPSHOT`)                 | removed; rebuild a wizard from a state with `createWizard({ state })`                        |
| `@wizzard-packages/react` as a dependency | peer `^1.0.0`; install it beside devtools                                                    |
| no recording                              | `Record` → `Copy JSON`, or `recordSession()`; the file is a `SessionBundle` `version: 1`     |

There is no codemod and no alias for the old name: the migration is one renamed import and two
deletions, and the compile error names the fix.

## Theme

Six custom properties, set on any ancestor: `--wz-bg`, `--wz-fg`, `--wz-muted`, `--wz-accent`,
`--wz-line`, `--wz-danger`. The defaults meet 4.5:1 for text and 3:1 for graph strokes.

## Errors

Every message names a section in [docs/errors.md](https://github.com/ZizzX/wizzard-packages/blob/main/docs/errors.md):
`devtools-no-wizard`, `devtools-no-plugin`, `devtools-render-failed`, `devtools-stopped`,
`devtools-export-failed`, `devtools-bundle-unsupported`.

## License

MIT
