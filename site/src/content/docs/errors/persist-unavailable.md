---
title: persist-unavailable
description: The persist plugin has no storage to use, so the wizard runs but will not survive a reload.
---

```
[wizzard] The wizard cannot be saved. this browser did not allow localStorage, which private
windows commonly do. pass a storage of your own, or accept that this session will not survive a reload.
…/errors/persist-unavailable
[wizzard] The saved wizard could not be read. storage refused the read (<error>). pass a storage
of your own, or accept that this session starts fresh. …/errors/persist-unavailable
```

A warning from `persist()` in `@wizzard-packages/plugins/persist`, printed with `console.warn`
once for the life of the plugin. The wizard keeps working in memory; only the saving stops.

The first form fires when the browser storage `storage` names - `'local'`, the default, or
`'session'` - cannot be had: none exists, as during server rendering, or it throws when it is
touched. Private windows do that on the property rather than on a call, which is why merely
reading `globalThis.sessionStorage` counts, and why the plugin reads it rather than your code.
The message names the one it asked for (`localStorage` or `sessionStorage`). Asking for
`'session'` never falls back to `localStorage`: a store chosen because it dies with the tab is
not replaced by one that outlives it. The second form fires when a storage exists
but `getItem` throws: a browser that admits the object and then refuses to use it.

In both cases `onRestore` receives `{ restored: false, reason: 'persist/unavailable' }`, so the
host can say that this session will not come back rather than leaving an empty form after a
reload to look like a bug.

The fix is a storage the environment allows. `'session'` is sometimes allowed where `'local'` is
not, and anything with synchronous `getItem` and `setItem` works, including an object over a `Map`:

```ts
const memory = new Map<string, string>();

persist({
  key: 'signup',
  storage: {
    getItem: (key) => memory.get(key) ?? null,
    setItem: (key, value) => void memory.set(key, value),
  },
});
```
