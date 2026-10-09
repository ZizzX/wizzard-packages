# Homepage hero theater

Status: accepted 2026-10-09, task T-097, decision D-028.

The homepage hero stops being the `signup` instrument and becomes a theater: the code a developer
writes on the left, and on the right the form a visitor would see and the graph of the flow
underneath it. A scripted scenario plays once on load - the definition is typed, then a visitor
walks the form through a condition, a repeat group and a refused validation to the end - and
then the form is live. Every move in the scenario is a call to the real engine, so what the
console prints and what the graph draws are results, not illustrations.

The route walk on feature row A (`docs/designs/home-route-walk.md`) stays. The page now has two
authored moments: this one, on the first screen and on the clock, and the walk, below the fold
and on scroll (D-028).

## What the reader sees

Desktop, above 900px: two columns. Left, the code pane: the definition as it is being written,
and under it a console of the calls made and what they returned. Right, the form pane over the
graph pane. At 900px and under the three stack - code, form, graph - and the graph is laid out
as a column, as the feature rows are.

### The flow

A trip booking, in one file, `site/src/theater/trip.flow.ts`. It is the file the engine runs and
the text the code pane types; nothing is written twice.

```ts
import {
  defineFlow,
  getPath,
  group,
  step,
  type AsyncRegistry,
  type SubFlows,
} from '@wizzard-packages/core';
import { empty, eq, get, not, ref } from '@wizzard-packages/core/expr';

const passenger = defineFlow({
  id: 'passenger',
  order: ['details'],
  steps: { details: step({ label: 'Passenger', validate: ref('passport') }) },
});

export const trip = defineFlow({
  id: 'trip',
  version: 1,
  order: ['route', 'people', 'company', 'payment'],
  steps: {
    route: step({ label: 'Route' }),
    people: group({
      label: 'Passengers',
      flow: 'passenger',
      when: not(empty(get('data.passengers'))),
      repeat: { over: get('data.passengers'), keyBy: 'id' },
    }),
    company: step({ label: 'Company', when: eq(get('data.business'), true) }),
    payment: step({ label: 'Payment' }),
  },
});

export const subFlows: SubFlows = { passenger };

export const registry: AsyncRegistry = {
  passport: (_args, { data, loop }) =>
    getPath(data, `answers.${loop?.key}.passport`) ? null : { passport: 'required' },
};
```

The `passport` validator reads the current passenger's answers through `loop.key`, the way the
R-C reference app addresses an item's data: the engine leaves an item's data to the host, and the
host keeps it under `answers.<key>`. `validateFlow` asks two things of a flow with a repeat group,
and the file has both: a `when` on the group, so an empty list takes it off the route instead of
leaving an empty section on it, and a `version` on the flow, because a snapshot taken inside the
group stores an item key.

### Act 1 - writing, about 6 seconds

The definition is typed line by line - character by character would take too long to be worth
watching. At each step boundary the graph grows by that step: `route`, then the `people` group,
then `company`, drawn dashed at once because `data.business` is empty, then `payment` and the
end. Each graph is built with `buildGraph` from a subset of the same definition object, not
parsed from the typed text.

The form pane shows the `route` form through Act 1, inert and dimmed: there is no flow to run
until the definition is written. Taking over during Act 1 finishes the text at once and hands the
visitor the live form on `route`.

### Act 2 - running, about 14 seconds

| Beat | Form                                                  | Console, and the line lit in the code                                       | Graph                                       |
| ---- | ----------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| 1    | Route: "Almaty -> Tbilisi" typed, travellers set to 2 | -                                                                           | standing on `route`                         |
| 2    | "Business trip" ticked                                | `set('business', true)`; `company`'s `when` lit                             | scout: `true == true`, `company` heals      |
| 3    | Next                                                  | `repeat` lit; `next() -> { ok: true, to: 'details' }`                       | `people` active                             |
| 4    | Passenger 1: "Ada Lovelace", passport typed, Next     | `next() -> { ok: true, to: 'details' }`                                     | the group shows two items, the first walked |
| 5    | Passenger 2: "Alan Turing", passport left empty, Next | `next() -> { ok: false, errors: { passport: 'required' } }`; `validate` lit | the node is refused                         |
| 6    | The error under the field; passport typed, Next       | `next() -> { ok: true, to: 'company' }`                                     | on to `company`                             |
| 7    | Company: "Analytical Engines" typed, Next             | `next() -> { ok: true, to: 'payment' }`                                     | `payment` active                            |
| 8    | Payment: Book                                         | `next() -> { ok: true, to: '@end' }`                                        | the end fills, one ring                     |

Entering the group lands on the passenger's step, and `next()` names that step: `details`, not
`people`. The table is pinned by `site/src/theater/script.test.ts`, which plays the scenario on a
bare engine and compares the console line by line.

The scout on the graph (beat 2) is the model agreed for T-097 before it grew: a comet runs the
route from the step the form stands on, a step that changes sides is probed with its condition
filled in - `true == true`, `"personal" != "business"` - and breaks or heals, and the end sends
one ring without filling. Its last frame is always the engine's frame. It lands in its own task,
after the theater; until then the graph pane draws the engine's state with no choreography.

### The end, and taking over

The form ends on "Booked - Almaty -> Tbilisi, 2 passengers" with two buttons: "Play again"
restarts the scenario, "Try it yourself" resets the flow to `route` with the form live. The
scenario plays once per load and never loops.

A `pointerdown` or `keydown` inside the form, or the "Stop" button shown while the scenario runs,
stops it on the beat it reached. The engine is already in that state, so the form carries on from
there, live, and the console logs the visitor's own calls from then on.

## Why the scenario runs on the engine

Three ways were weighed:

1. **The scenario is data, played against the live engine** - chosen. A beat is "type this
   chunk", "type into this field", "call `next()`", "set travellers to 2". The player performs
   it through the same hooks the form uses. Taking over is free, because there is no recording
   to leave: the engine is where the scenario left it.
2. **Record at build time and replay as animation**, as `recordWalk` does for row A. Smooth and
   needs no JavaScript, but taking over mid-scenario would mean rebuilding the engine from a
   snapshot at every beat.
3. **A video or a Lottie file.** Taking over is impossible, and it is exactly the illustration
   in place of the engine that the site says it does not draw.

## How it is built

### Units

- `site/src/theater/trip.flow.ts` - the flow, the passenger sub-flow, the `passport` validator.
  Imported as a module by the engine and with `?raw` by the page for the text.
- `site/src/theater/script.ts` - the scenario as data: Act 1's chunks, each naming the step it
  introduces, and Act 2's beats, each with the action and the result the engine is expected to
  return. Pure; no DOM, no timers.
- `site/src/theater/usePlayer.ts` - plays a script: timers per beat, `stop()`, `replay()`, and a
  `playing` flag. It starts when the tab is visible and waits while it is hidden.
- `site/src/components/Theater.tsx` - the island: provider, the three panes, the stop, play
  again and try it yourself controls. It replaces `HeroFlow.tsx` in `index.astro`.
- Code pane: reveals pre-highlighted tokens, lights a line by a marker the script names, and
  keeps the console. Form pane: route, the passenger form for the current item, company,
  payment, booked. Graph pane: `FlowGraph`, both directions, one shown by the breakpoint, as
  `FlowRow` does.

### Highlighting without a runtime highlighter

`index.astro` tokenises `trip.flow.ts` at build time with the highlighter Astro already ships and
passes the tokens to the island. Typing reveals tokens; it never highlights. No dependency is
added.

### The first paint

Rendered on the server, the theater is its final frame: the whole definition, the whole graph,
the form on `route` and live once hydrated. That is what a reader gets with JavaScript off and
with reduced motion.

With JavaScript on and motion allowed, an inline script in the page head adds a `theater-pending`
class before the first paint, and the stylesheet shows the empty editor under it, so the final
frame never flashes before Act 1. The island removes the class when it starts. If it has not
started 4 seconds after load, the inline script removes the class itself and the final frame
shows.

### Accessibility

- A "Stop" button is visible while the scenario runs: motion that lasts more than five seconds
  needs a way to stop it (WCAG 2.2.2), and stopping is the same as taking over.
- The scenario never moves focus.
- The typing is `aria-hidden`. A visually hidden `<pre>` carries the whole definition for a
  screen reader.
- The console is silent during the scenario - ten announcements in fourteen seconds would drown
  the page - and becomes `role="log"` once the visitor has the form.
- With reduced motion there is no scenario: the final frame, the form live on `route`.

## What changes beside it

- `site/src/components/HeroFlow.tsx` and its test go; `signup-form.ts` stays, the inspector uses
  it.
- `site/DESIGN.md`: the hero component (instrument becomes theater) and Motion (two authored
  moments, the theater's beats and durations).
- The hero's prose in `index.astro`.
- `docs/designs/home-route-walk.md`: the line that names T-097 as the hero version of the walk.

README and the documentation pages do not describe the homepage, so neither changes.

## Checks

Unit:

- the whole script runs on a bare `createWizard` with the trip flow, and every beat's result is
  the one the script expects, so a change to the engine or the flow fails a test instead of
  quietly changing the hero;
- every Act 1 boundary builds a graph, and the last one equals `buildGraph(trip)`;
- `usePlayer` on fake timers: plays the beats in order, `stop()` holds the beat reached, `replay()`
  starts over, a hidden tab waits.

e2e, Chromium against the production build, at 1280 and 390:

- the scenario reaches the refusal - the console shows `passport: 'required'` and the field its
  error - and then the end;
- a click in a field stops it, and the form is live from that beat;
- the "Stop" button works from the keyboard;
- with reduced motion the final frame is there and nothing animates;
- the page does not scroll sideways.

Each claim gets a mutation check before its PR, as in T-021 and T-098.

## Tasks

One task, one PR:

1. **T-097** - the trip flow, the script as data and `usePlayer`, tested on the bare engine. No
   UI.
2. **The theater in the hero** - the three panes, both acts, taking over, the end, the phone
   layout, accessibility, e2e. The `signup` instrument leaves the hero.
3. **The scout on the graph pane** - `scoutBeats` and its keyframes.
