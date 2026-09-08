# Errors

Every failure the engine reports — thrown or returned — has one shape:

```
[wizzard] <what went wrong>. <why>. <the fix>. <this document>#<code>
```

The fragment at the end is the code, and it names a section below. A message
that only says what broke leaves the reader to work out the cause; the sections
here carry the part that does not fit in one line.

## groups-not-installed

```
[wizzard] step "<id>" is a group, but no traversal is installed. Without one the
engine walks flat flows only. Pass groups from @wizzard-packages/core/groups to
createWizard. …#groups-not-installed
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

## repeat-keys

```
[wizzard] repeat keys collide in group "<id>": "<key>" at <i> and <j>. …
[wizzard] item <i> of repeat group "<id>" has no key at "<keyBy>". …
```

Returned, not thrown: the move answers `{ ok: false, reason: 'invalid' }` with
the group as `by` and the message under the `keyBy` field, so a binding displays
it exactly where it displays a validation error.

A repeat frame stores the item's `key` and nothing else — never its index, which
moves when the list is reordered and dangles when an item is removed. So the key
has to identify one item, and two conditions stop it doing that:

- **Collision.** Keys are compared as strings, so `1` and `'1'` are one key, and
  every object without a distinguishing `keyBy` reads as `[object Object]`. A
  frame naming a duplicated key could mean either item.
- **No identity.** `undefined`, `null` and `''` name no item.

Both are data errors, and both are refused rather than resolved: falling back to
the position is exactly the stale-position bug that keying by identity exists to
remove. Selectors keep working while the data is wrong — a colliding key binds
to the first item that carries it — so the screen stays rendered and the move is
what refuses.

The fix is to make `keyBy` unique and present across the items, or to drop
`keyBy` and accept positional identity, where reordering the list moves the
answers with the position rather than with the item.

## devtools-export-failed

```
[wizzard] export stopped: the state holds a circular reference (<detail>). Recorded state
must be JSON. Fix the value; redact runs after the copy and cannot remove it. …#devtools-export-failed
[wizzard] export stopped: the state cannot be serialised as JSON (<detail>). Recorded state
must be JSON. Fix the value; redact runs after the copy and cannot remove it. …#devtools-export-failed
[wizzard] export stopped: redact threw <message>. Nothing was copied. The hook must return a
SessionBundle; fix it, or remove it to export unredacted development data. …#devtools-export-failed
[wizzard] export stopped: redact returned a session checkSession rejects (<path>: <message>).
Nothing was copied. The hook must keep every frame a state of the recorded flow; fix it, or
remove it to export unredacted development data. …#devtools-export-failed
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

## devtools-no-wizard

```
[wizzard] devtools has no wizard to watch. It reads WizardContext or the wizard prop, and
neither is set. Render <WizardDevtools/> inside <WizardProvider>, or pass wizard={wizard}.
…#devtools-no-wizard
```

Shown by `<WizardDevtools/>` in place of the panel. The panel watches one wizard and reads it
two ways: the React context a `<WizardProvider>` puts in place, or the `wizard` prop. With
neither there is nothing to draw, and drawing an empty panel would read as a wizard that
committed nothing.

The usual cause is placement: the panel is a sibling of the provider rather than a child of
it. A panel rendered beside the form, in a layout file or a portal, is outside the context
even though it looks adjacent on screen. Passing `wizard={wizard}` works from anywhere and is
what a host with several wizards does; the context is the convenience for the common one.

## devtools-no-plugin

```
[wizzard] refusals are not captured. The wizard was created without the devtools plugin, so a
refused next() never reaches this panel. const dt = devtools(); createWizard({ flow, plugins:
[dt] }); <WizardDevtools plugin={dt}/>. …#devtools-no-plugin
[wizzard] refusals are not captured. The plugin object passed to the panel is not the one
installed on this wizard, so its rings stay empty. Pass the same devtools() instance to
createWizard({ plugins: [dt] }) and to <WizardDevtools plugin={dt}/>. …#devtools-no-plugin
```

Shown in the Activity tab's header and as `refusals: not captured` in the export preview. The
panel still works: commits, the graph, the state and the diff need no plugin.

A refusal is not a commit. `next()` that a validator blocks changes no state, so `subscribe`
never fires and a panel built on state alone cannot see it — which is the case the plugin
exists for. It sits in `createWizard({ plugins: [dt] })`, receives the engine's attempt hook,
and keeps the rings the panel reads.

The second form fires when a plugin is passed but its `attached` is false, or its `lastRev`
stays behind the wizard's `rev` after a commit. Both mean two different `devtools()` objects:
one installed on the engine, another handed to the panel. One instance goes to both places.

## devtools-render-failed

```
[wizzard] the graph could not be drawn: <message>. A layout override or a flow shape the
renderer has not seen threw; the wizard, the strip, State and Activity are unaffected. Remove
the layout prop to use the built-in layout, or record a session and attach it to an issue.
…#devtools-render-failed
```

Shown by the Graph tab in place of the graph. It is an error boundary around the renderer
alone, so the diagnostic strip, the State tab, the Activity tab and the export keep working;
a graph that cannot be drawn is not a reason to lose the refusal that was being diagnosed.

Two causes, in order of likelihood. A `layout` prop that threw or returned something the
renderer cannot read: the built-in `layoutGraph` is the way to confirm it, since removing the
prop restores the drawing. Or a flow shape the renderer has not met — a node kind, an edge
target or a `when` expression from a newer core than the installed devtools.

## devtools-stopped

```
[wizzard] diagnostics stopped: <message>. A devtools listener threw; the wizard is unaffected
and this panel no longer updates. Reload the page, and record a session and attach it to an
issue if it happens again. …#devtools-stopped
```

Shown in the diagnostic strip. The panel keeps what it had; it stops subscribing.

The engine calls its subscribers bare, so a listener that throws surfaces inside the host's
own `set()` or navigation. Devtools registers several — the store subscription, the plugin's
subscription, `onRecord`, the legend's `sessionStorage` read — and each runs under its own
catch. When one throws, the panel unsubscribes rather than throwing into the host: the
diagnostic tool never becomes the fault. The plugin catches inside its hook bodies for the
same reason, so the engine's `fail()` never has to disable it for a devtools bug.

The wizard is unaffected in every case: it committed what it was going to commit before the
listener ran, and its next commit lands normally.

## devtools-bundle-unsupported

```
[wizzard] this bundle is version <n>; this reader understands version 1. Export it again with
a matching @wizzard-packages/devtools, or upgrade the reader. …#devtools-bundle-unsupported
```

Reported by a reader of a `SessionBundle` — the docs site's replay mode, or a host that loads
a recording from a bug report. `version` is the format, not the package version: it is `1`
today and changes only when the shape changes in a way a reader cannot ignore.

A bundle carries the flow definition, the recorded frames and the outcomes, so it replays
structure and data. It does not carry resolver behaviour: a named resolver is not in the
bundle, and a replay of a flow that fetches its options shows the options it recorded.

## inspector-paste

```
[wizzard] this is not JSON: <parser message> (line <l>, column <c>). A flow is a JSON object,
so the text has to parse before anything can read it. Fix the syntax at that position and draw
it again. …#inspector-paste

[wizzard] this is valid JSON but not a flow definition. A flow is an object with a string id
and a steps object, and both are read before anything else. Wrap the steps: { "id": "signup",
"steps": { … } }. …#inspector-paste

[wizzard] step "<id>" is <value>, not an object. Every entry in steps describes one step, and
the validator reads fields off it. Give it an object, empty if the step has nothing to say.
…#inspector-paste

[wizzard] this flow has <n> steps and the inspector draws up to 40. …#inspector-paste

[wizzard] this flow could not be checked: <message>. …#inspector-paste
```

Returned, never thrown: these come from the documentation site's inspector, where the flow is
a stranger's text pasted into a box. The page lists them under the box and keeps the graph it
already had, so a bad paste costs a reader the picture they were about to see and not the one
they were looking at.

**Why the shape is checked before `validateFlow`.** `validateFlow` is typed for a
`FlowDefinition` and reads `step.on`, `flow.order` and a group's `flow.steps` without guarding
them. That is the right trade for a flow arriving from a typed codebase, and the wrong one for
a paste box: a step that is `null`, a number or a string, an `order` that is not a list, and a
group whose `flow` is neither an object nor a string each throw a `TypeError` out of it. The
inspector checks those five before calling it, and wraps the call so a shape nobody has named
yet is still a sentence rather than a stack trace.

Making the validator total for untrusted input is the deeper fix, and it belongs to the
diagnostic pass over the engine rather than to a site route.

**Why the transitions are counted too.** The step count is half the bound and not the
interesting half. `on.next` takes a list, and nothing about the step count sees how long it
is: two steps whose `a.on.next` repeats a valid target a hundred thousand times is 400 kB of
legal JSON, passes the character gate and the step gate, and builds 100 001 edges. So the
declared transitions are counted as well, at two hundred. Both counts are taken across inline
sub-flows, because `buildGraph` walks into a group whose `flow` is a definition rather than a
name — a root with three steps can otherwise carry a thousand.

**Why a label has to be text.** `validateFlow` has no opinion on it, and rightly so: a label
is the host's business everywhere except here, where the host is a stranger with a paste box.
The builder copies it onto the node and the painter renders it as a React child, so an object
throws "Objects are not valid as a React child" and takes the island down — past the wrapped
validator call, which guards the check and not the render.

**Why forty steps.** Not a guess and not the text length. `buildGraph` emits a fall-through
edge from every conditional step to every later one it could reach, so edges grow as the
square of the step count: 200 steps is 20 100 edges and 800 steps is 320 400, which is a DOM
no browser draws. A megabyte of JSON holds thousands of steps, so a character cap does not
bound the work — the step count does. Forty is `--graph-max-nodes` from the site's design
tokens, and a graph past forty nodes has stopped being readable well before it stops
rendering. A flow larger than that is what the devtools panel is for: it docks beside a
running wizard instead of drawing the whole definition at once.
