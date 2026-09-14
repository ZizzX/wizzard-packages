---
title: devtools-export-failed
description: A recorded session could not be exported, because its state is not JSON or the redact hook failed.
---

```
[wizzard] export stopped: the state holds a circular reference (<detail>). Recorded state
must be JSON. Fix the value; redact runs after the copy and cannot remove it. …/errors/devtools-export-failed
[wizzard] export stopped: the state cannot be serialised as JSON (<detail>). Recorded state
must be JSON. Fix the value; redact runs after the copy and cannot remove it. …/errors/devtools-export-failed
[wizzard] export stopped: redact threw <message>. Nothing was copied. The hook must return a
SessionBundle; fix it, or remove it to export unredacted development data. …/errors/devtools-export-failed
[wizzard] export stopped: redact returned a session checkSession rejects (<path>: <message>).
Nothing was copied. The hook must keep every frame a state of the recorded flow; fix it, or
remove it to export unredacted development data. …/errors/devtools-export-failed
```

Thrown by `Recorder.bundle()` from `@wizzard-packages/devtools/headless`, and shown by the
panel's export preview in place of the JSON. Nothing is copied to the clipboard in either
case.

A bundle is built from a copy of the recording, never from the live frames: the copy is a
JSON round-trip, because `WizardState` is JSON by contract, and the copy is what the `redact`
hook receives. That order is what the messages describe. The first two fire when the copy
itself fails: a cycle is the usual cause, a `BigInt` or a throwing `toJSON` the others, and
`<detail>` carries the engine's own words. No devtools setting works around either, because
the value has to be serialisable before anything can be redacted out of it. The others fire
when the hook throws, returns something that is not a bundle, or returns frames that
`checkSession` (the reader's own check) rejects; fixing the hook, or removing it, is the whole
fix.

```ts
import { recordSession } from '@wizzard-packages/devtools/headless';

const rec = recordSession(wizard, {
  plugin: dt,
  redact: (bundle) => {
    for (const frame of bundle.session.frames) delete (frame.data as { card?: unknown }).card;
    return bundle;
  },
});
```

The hook runs on every `bundle()` call, on a fresh copy each time, so it may mutate what it
is given. Until export, the frames in memory are unredacted: the recorder is a development
tool, and the panel says so where it offers the copy.
