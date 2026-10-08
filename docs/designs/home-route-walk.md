# Homepage route walk

Status: accepted 2026-10-08, task T-021, issue #61.

The route walk is the motion `site/DESIGN.md` names as the site's one authored moment. This
document is how it is built. When it ships, the Motion section of `DESIGN.md` describes the
result and this file stays as the record of why it is shaped this way.

## What the reader sees

The first feature row on the homepage, "Change your answer. Keep the right data.", draws
`signup` with `payer = personal`. As that row scrolls into view, its graph walks the route:

1. `Details` lights up as the step the flow stands on, with a soft halo.
2. A comet leaves `Details` towards `Company` and stops short of it. The condition under
   `Company` is replaced, in place, by the condition with the data substituted:
   `"personal" != "business"`.
3. The comet falls back. `Company`'s outline breaks into the dashed, muted look of a step that
   is not on the route, and its condition label returns.
4. The comet runs the bypass to `Payment`, drawing the live edge behind it. `Details` settles
   to visited; `Payment` lights up.
5. The comet runs from `Payment` to the end. `Payment` settles to visited, the end marker
   fills, and one ring spreads from it and fades.

The walk runs while the graph's frame travels from `cover 14%` to `cover 52%` of its view
timeline - from just entered at the bottom of the viewport to a little above the middle.
After that the picture does not change. Scrolling back rewinds it: the scroll is the clock,
and holding the end frame on the way back would need JavaScript. It never replays or loops on
its own.

The end frame is "the route was walked": `Details` and `Payment` visited, `Company` dashed,
the end filled. It is what the row shows with reduced motion and in a browser without
`animation-timeline`. JavaScript plays no part: with it off the walk runs the same. The caption under the graph stays true as
written.

Rows B and C, the hero, and the inspector do not change. A version of this choreography in
the hero - once on load, and again on every change of payer - is T-097.

## Why the engine writes the walk

`FlowRow` already says its picture is not an illustration: the engine walks the fixture and
the row draws what came out. The walk keeps that. The engine decides what happens - which
steps are on the route, which one dropped out, which condition failed and with what data.
The choreography decides how it looks - durations, easing, the comet, the halo, the ring.

A hand-drawn walk would look the same and would drift the first time the fixture or the
engine changed, with nothing failing. A recorded one changes with them, and a unit test says
so.

## How it is built

### `site/src/lib/walk.ts`

Two pure functions, no DOM.

`recordWalk(flow, data, registry)` creates a wizard, calls `start()`, then `next()` until a
result says `to: '@end'`, and returns one `GraphView` per position - the same view type
`FlowGraph` already draws. It gives up with a clear error after as many moves as the flow
has steps, so a validator that refuses fails the build instead of hanging it.

`walkBeats(frames, graph)` turns the frames into beats. Each beat is a pair of unitless
numbers between 0 and 1, the share of the walk where it starts and ends:

- every step on the route gets an `on` beat (it becomes active) and an `off` beat (it becomes
  visited);
- every step that drops out between two frames gets a `probe` beat (comet out, condition
  evaluated) and a `break` beat (dashed, comet back);
- every live edge between two route steps gets a `draw` beat, which is also the comet's run;
- the end gets a `finish` beat and the ring a `ring` beat.

Beats are laid out in walk order with fixed relative weights, which are constants in the file
and tuned by eye against the prototype. The condition text comes from the step's `when`:
every `$get` is replaced by its value from the data, a top-level `$eq` that evaluated false
prints as `$ne`, and the result goes through the same printer as the node label, so it reads
like the condition it replaces.

The beats cover a flat route, on purpose. A group step would need beats for its children;
row A has none, and the walk is used nowhere else, so that is left until something needs it.

### `FlowGraph.tsx`

One optional prop, `walk`, the output of `walkBeats`. Without it the markup is byte for byte
what it is today. With it the SVG gets the class `walk` and these extra elements, all
`aria-hidden`:

- a blurred halo rect behind each step on the route;
- a hot copy of each live edge, drawn over a faint base;
- a comet: a copy of a travelled edge with a short round-capped dash and a blurred halo;
- the substituted condition text in a dropped step, over its normal label;
- a ring circle over the end marker.

Each element carries its beats as inline custom properties, for example
`style="--on0: 0.02; --on1: 0.09"`, and a comet carries its edge length as `--len`. No CSS is
generated: the keyframes are shared and live in `site.css`.

The mirror table for screen readers lists the end frame's states, which is what the picture
settles on.

### `FlowRow.tsx` and `index.astro`

`index.astro` records the walk in its frontmatter, where `await` is allowed:
`await recordWalk(flowA, { payer: 'personal', email: 'ada@example.com' }, registryA)`. Row A needs the
registry and an email now, because the engine actually moves past `Details`' validator.
`FlowRow` takes an optional `walk`, draws the last frame as its view, and passes the beats to
`FlowGraph`. Rows B and C pass nothing.

### `site.css` and `tokens.css`

Base styles are the end frame. Every decoration is invisible at rest except the hot edges,
which are fully drawn.

All motion sits inside `@supports (animation-timeline: view())` and
`@media (prefers-reduced-motion: no-preference)`:

- the graph's frame declares `view-timeline: --walk block`;
- every walked element uses `animation-timeline: --walk`, fill mode `both`, and an
  `animation-range` that maps its beats onto `cover 14%` to `cover 52%` with `calc()`;
- shared keyframes: `walk-on`, `walk-off`, `walk-break`, `walk-draw`, `walk-comet`,
  `walk-probe`, `walk-glow`, `walk-finish`, `walk-ring`;
- the page-load `wz-draw` animation is switched off for `.walk` edges, so the two never fight.

`tokens.css` gains `--ease-spring`, a `linear()` curve with one small overshoot, used only for
the halo's pulse. Nothing on the page moves, scales, or slides: colour, dash, opacity, and the
dash offset that runs the comet are the only properties animated.

The comet is a dash running along the edge, not a dot on `offset-path`. It looks the same and
needs no motion-path support on SVG elements, which browsers do not agree on.

### `site/DESIGN.md`

The Motion section stops calling the route walk "specified, not built". Its row and paragraph
name where it lives (feature row A, on its own view timeline, not the first screen), what it
shows, and `--ease-spring`. There are still five motions.

README and the documentation pages do not describe the homepage, so neither changes; the PR
says so.

## Checks

Unit, in `site/src/lib/walk.test.ts`:

- `recordWalk` on `flowA` with `personal` and an email gives three frames: standing on
  `details`, on `payment`, and ended. The last frame draws `details` and `payment` visited,
  `company` skipped, the end done.
- `walkBeats` puts `company`'s probe and break between `details`' beats and `payment`'s,
  prints `"personal" != "business"`, and keeps every beat inside 0..1 in walk order.
- With `payer: 'business'` there is no probe and `company` is on the route.
- Without an email `recordWalk` throws instead of looping.

`FlowGraph` tests: without `walk` there is no decoration and the existing tests pass
unchanged; with it every decoration is `aria-hidden` and the mirror table shows the end frame.

e2e, in `e2e/tests/site/home.spec.ts`, Chromium against the production build:

- at 1280 and 390 wide, with motion: while row A is below the viewport, `details` draws
  neutral and `company` solid; scrolled to the middle, `company` is dashed, the end is filled
  and the hot edge is drawn - read through `getComputedStyle`;
- with reduced motion emulated: the end frame is there at the top of the page, and the graph
  has no scroll-driven animations;
- at 390 the page does not scroll sideways; only the graph's frame does.

Each claim gets a mutation check before the PR: removing the `@supports` guard, the
reduced-motion block, or the email from the data turns the matching test red.

Screenshots of row A at 1280 and 390 - start, middle, and end of the walk, in both themes -
go in the PR. Gates: `pnpm verify`, `format:check`, `links:check`, `build`, `test:e2e` for the
site project, and `size`, which should not move.

## Prototype

The choreography was chosen from three variants rendered on row A's real geometry: recolouring
in place, a token running the route, and the decision staged. The third won. The prototype was
a throwaway file and is not in the repository.
