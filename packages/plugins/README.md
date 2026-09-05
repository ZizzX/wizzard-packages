# @wizzard-packages/plugins

Plugins for [Wizzard](https://github.com/ZizzX/wizzard-packages) flows. One entry per
concern, so a flow that persists nothing carries none of the code that would.

## `/persist`

Keeps a wizard across a reload.

```ts
import { createWizard } from '@wizzard-packages/core/v1';
import { persist } from '@wizzard-packages/plugins/persist';

const wizard = createWizard({
  flow: signup,
  plugins: [
    persist({
      key: 'signup',
      // sessionStorage for anything that should not outlive the tab. This
      // stores whatever the flow collects, so that choice is yours to make.
      storage: globalThis.sessionStorage,
      onRestore: (outcome) => {
        if (!outcome.restored) console.info('starting fresh:', outcome.reason);
      },
    }),
  ],
});
```

What is stored is the durable snapshot from `@wizzard-packages/core/snapshot`, never the
running state: a navigation in flight, a step that was loading and a validator's errors all
describe a moment, and restoring them is how a wizard comes back stuck.

What is read is validated before it is installed. A snapshot from another flow, from an
older version of it, or naming a step that no longer exists is refused with a reason rather
than restored into something that looks plausible and is not.

The plugin never throws. A browser that refuses storage, a quota that fills up, a value that
was corrupted in place: each means this session is not coming back, and none of them is a
reason to break the wizard someone is filling in right now. Every failure warns once, names
its cause, and reaches `onRestore`.

Writes are coalesced into one per frame, and whatever is pending is flushed when the wizard
is destroyed — closing a tab does not wait for a timer.

### Options

| Option      | What it does                                                              |
| ----------- | ------------------------------------------------------------------------- |
| `key`       | Storage key. One per flow, or one per flow per user.                      |
| `storage`   | Where to put it. `localStorage` by default; any synchronous store works.  |
| `version`   | Your application's version. Bump it when the meaning of the data changes. |
| `migrate`   | Upgrades a snapshot written by an older format, one hop at a time.        |
| `onRestore` | What happened at startup: `{ restored: true }` or a reason.               |

## Supported

Node 20.11+, TypeScript 5+. ESM and CJS, types for both.

## License

MIT © [ZizzX](https://github.com/ZizzX)
