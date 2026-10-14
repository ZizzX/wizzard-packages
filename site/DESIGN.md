# Design system

This file is the design system of the site. `src/styles/tokens.css` is its machine-readable
half: every value named here exists there as a custom property, and nothing on a page may use
a colour, a size or a duration that is not one of them. When the two disagree, the CSS file is
wrong.

The devtools panel (`@wizzard-packages/devtools`) reads the same variable names with a
fallback, so a host application without this stylesheet still renders a readable panel while
a host that ships the tokens gets the site's appearance.

## What the site has to look like

The library's argument is that a multi-step flow is data: order, conditions and validation
live in a definition you can read and diff. The site's job is to make that argument visible,
so the flow graph is the loudest thing on any page it appears on, and everything else stays
quiet enough for it to be loud.

The character is a night editor: a deep blue ground, a large light display face beside
compact code, and two colours that each mean one thing. A pale blue means "this is where the
flow is now"; one warm fill means "press this". It still rules out a decorated site. No
gradients, no glass, no cards stamped on every block, no icon standing in for a word. The one
licence beyond type and rules is a glow, in three places and in the dark theme only, described
under **Elevation**.

### One chassis, many readouts

The rule above says what the site refuses. This one says what it is made of.

The same reading grammar that draws the flow draws the page. A bounded field with a hairline,
a mono label naming it, and state carried by border weight and colour rather than by fill —
that is what a graph node is made of, and it is what a code block, an example frame, a
segmented control, a table row and a callout are made of. A reader who has learned to read the
graph has already learned the site's chrome.

This is the reason the component list below has two tiers and one vocabulary. It is also the
test for anything new: a component that needs a container style, a border weight or a
elevation the graph does not use is either wrong or is telling you the graph is wrong.

## Typefaces

Three families, self-hosted through `@fontsource`, one job each:

| Role    | Family                     | Weight | Size / line-height              | Tracking |
| ------- | -------------------------- | ------ | ------------------------------- | -------- |
| display | Jost                       | 300    | `clamp(40px, 6vw, 72px)` / 1.04 | -0.022em |
| heading | Jost                       | 400    | 20-30px / 1.2                   | -0.012em |
| body    | Atkinson Hyperlegible Next | 400    | 17px / 1.6                      | 0        |
| code    | JetBrains Mono             | 400    | 14px / 1.55                     | 0        |
| label   | JetBrains Mono             | 500    | 11px / 1.4, uppercase           | 0.1em    |

**A light display face beside compact code.** The contrast between a large, thin geometric
heading and a dense block of monospace is the page's signature: the heading says what the
library is in a few words, and the code under it is the thing itself. A page title on the
homepage and on every documentation page is the display weight; section headings are one step
heavier so they hold at 20px.

The body face is Atkinson Hyperlegible Next, drawn for legibility: distinct `I`, `l` and `1`,
open counters, and a documentation page is paragraphs that are read rather than admired. Buttons
and navigation are set in it too. Body text is never below 16px.

The reference this direction came from (D-031) sets its display in Raleway. Jost carries the same
light geometric voice without lifting the reference's own face, so the site reads as related
rather than copied.

Type scale, in px: 11, 13, 15, 17, 20, 24, 30, 38, 48. Nothing between the steps; the display
size is its own clamp and sits above the scale.

### What mono is for

Mono carries the machine: labels, the wordmark, code, identifiers, expressions and
measurements - a step id, a `when` expression, a package name, a bundle size, an install
command, what a visitor types into a field, and any string the library itself produced. What it
never carries is a sentence, a heading or a button. The site's own prose is set in sans even when it sits beside code, and
a caption explaining a graph is prose, not a readout.

### Where the label style may appear

`label` is the only uppercase style, and it has one licence: a column head, a caption that
carries data, or a tag on a control. Never a kicker above a heading. A heading carries its own
weight, and a small uppercase word introducing it adds a line the reader must skip. This is a
rule, not a preference — the earlier version of this document permitted eyebrows and the
homepage grew one.

`Flow signup, version 1` above a graph is a caption carrying data and is allowed. `Try it`
above a form is a kicker and is deleted.

### Measure

Documentation pages keep the Starlight default. Custom pages cap running text at
`--measure` (68ch). Code, tables and graphs are allowed out to `--measure-wide` (92ch)
inside their own scroll container, and never widen the page.

## Colour

Dark is the default and light follows the visitor's system preference; both are complete
palettes, not an inversion. The neutrals are cut from the ground's blue, so the pale accent
reads as belonging to the page rather than as sitting on top of it.

| Token              | Dark        | Light       | Use                                           |
| ------------------ | ----------- | ----------- | --------------------------------------------- |
| `--bg`             | `#070C18`   | `#F5F7FB`   | page ground                                   |
| `--surface`        | `#0D1527`   | `#FFFFFF`   | panels, form wells, code blocks               |
| `--surface-raised` | `#121C33`   | `#EDF2FA`   | the one layer above surface; used sparingly   |
| `--line`           | `#1A2A47`   | `#D9E2F0`   | hairlines, node borders at rest, table rules  |
| `--line-strong`    | `#26395E`   | `#B5C3DA`   | dividers that separate sections               |
| `--fg`             | `#E8EEF9`   | `#0A1222`   | body and headings                             |
| `--fg-muted`       | `#8E9FC2`   | `#4A5878`   | secondary text, captions, labels              |
| `--fg-faint`       | `#5E6F92`   | `#7888A6`   | non-text only: rules, disabled glyphs         |
| `--accent`         | `#A9D8FF`   | `#1F5FA8`   | the active step, links, the selected control  |
| `--accent-soft`    | `#A9D8FF1F` | `#1F5FA814` | fill behind the active node                   |
| `--on-accent`      | `#07101F`   | `#FFFFFF`   | text on an accent fill                        |
| `--action`         | `#F2C46B`   | `#ECB54F`   | the fill of the primary action, and only that |
| `--on-action`      | `#1B1405`   | `#1B1405`   | text on the action fill                       |

`--fg-faint` must never carry text; it exists for rules and for glyphs that repeat a label
already present, and it clears the 3:1 a non-text mark needs and nothing more. Every other
pairing clears 4.5:1 in both themes: the accent carries text at 12.98 dark and 6.01 light, its
fill under `--on-accent` at 12.65 and 6.44, the action fill under `--on-action` at 11.21 and
9.83, and the lowest reading anywhere in the system is 4.84, `--st-skipped` on a raised node in
the light theme. `axe` in CI is what keeps it that way.

`--action` is never text and never carries white. The amber an earlier palette used as its
accent did both, and white on the light `#B4640F` measured 4.40:1 under a 15px bold label. It
shipped that way and no check caught it, because the check was never run on that pair. The warm
here is a fill under near-black, which is the pairing that measures well in both themes.

### The ground is flat

The page ground is one fill and carries no pattern. Nothing on this site may add a background
pattern, gradient or texture to it.

It used to draw a hairline grid on the same 32px step the layout counts in, as a drawing-sheet
metaphor. The metaphor cost more than it earned. A pattern on `body` shows through every
element that has no fill of its own, so the reference table on `/docs/flow/` had grid lines
running behind its rows, and the demo panels read as outlines drawn over graph paper rather
than as panels sitting on a page. In light it was worse than in dark: a near-white ground
exposes more of it, and the large empty areas of a documentation page are exactly where it was
loudest.

Depth is the surface ladder's job instead. Every widely read documentation site this one was
measured against puts a flat ground under the page and lets blocks carry the contrast, and none
of them uses a shadow to do it.

### Which things get a surface

A surface is a fill, a hairline, and a radius. It is not free: a page where everything is a
card has no hierarchy at all, so the list is short and closed.

| Gets a surface                                        | Stays on the ground                           |
| ----------------------------------------------------- | --------------------------------------------- |
| Code blocks                                           | The top bar, apart from one hairline under it |
| Tables: filled header row, hairline rows, in a border | The documentation sidebar                     |
| Panels that hold an instrument, and their form wells  | The table of contents                         |
| Cards in a gallery of examples                        | Prose, headings, captions, the footer         |
| The homepage's feature cards                          | The evidence strip                            |

The nav is the case people get wrong. Every site in that comparison paints its header in
exactly the page ground colour; one of them draws a hairline under it, and none uses a fill or
a shadow. A tinted header is the tell of a site that reached for elevation where it needed
whitespace.

A block that scrolls keeps its own scrolling. A table or code block wider than the column
scrolls inside itself and never widens the page - `--measure-wide` exists for exactly this. Do
not give a table `display: table` or `overflow: hidden` to make a radius clip: `overflow` does
not apply to a table box, so the table keeps its intrinsic width and pushes the whole page
sideways on a phone. Starlight already makes wide tables `display: block; overflow-x: auto`,
which is what clips the radius correctly, so the rule here is to add the fill and the border
and leave the box alone.

### Semantic colours

These name flow state, not brand. They are the only colours allowed inside the graph, the
problems list and the state diff.

| State   | Token          | Dark      | Light     | Means                                           |
| ------- | -------------- | --------- | --------- | ----------------------------------------------- |
| active  | `--st-active`  | `#A9D8FF` | `#1F5FA8` | the step the flow is on                         |
| visited | `--st-visited` | `#7D93BD` | `#5A6B8D` | entered and left; history, not progress bar     |
| blocked | `--st-blocked` | `#F2716F` | `#B3261E` | a validator refused the move                    |
| skipped | `--st-skipped` | `#8A98B8` | `#5D6A84` | `when` evaluated false; drawn dashed            |
| error   | `--st-error`   | `#F2716F` | `#B3261E` | a thrown error, distinct from a refusal in copy |

### One fill per viewport

The solid fill of a control belongs to `--action`, and **at most one solid fill is visible at a
time**. `--accent` appears as a 2px border with `--accent-soft` behind it, or as a line or a
word, and is not a button's fill.

The rule exists because the accent is the colour that means "this is where the flow is now",
and a filled control competes with the graph for the same glance. Splitting the two colours by
meaning keeps them from competing: the warm fill says where to press, the pale blue says where
the flow stands. The homepage spends its one fill on `Get started`, and the theater form's
`Next` takes the border form: an accent outline over `--accent-soft`, which outranks a neutral
border without spending a fill. Its label is `--fg` rather than the accent, because a label
in the accent colour on its own tint is the pairing most likely to fall under the floor.

`--st-skipped` is a step's colour, not a rule's: it carries the label of a node that is off
the route, so it clears 4.5:1 against `--surface-raised` in both themes. It deliberately does
not share `--fg-faint`'s value any more, which is the token that may never carry text.

`blocked` and `error` share a colour because they share an urgency; the wording, not the
colour, says which one happened.

There is deliberately no token for a group, a repeat group or a ghost node. State is carried by
colour, and a group in a given state draws exactly as a step in that state does - a second,
violet border inside the group read as a second highlight beside the active one, and was
removed for that. A group is told apart by its height and its condition line; a ghost node
draws in `--st-skipped` because both mean the same thing - not on the route - with the
struck-through outline saying which.

## Interaction states

Nothing on the page rises on hover. A control changes its line instead, and only fills
where a line would be wrong; the glow is a resting state, not a hover effect.

| State    | How it is drawn                                                         |
| -------- | ----------------------------------------------------------------------- |
| rest     | `--line` hairline, `--surface` fill where the control has one           |
| hover    | border to `--line-hover`; a row or list item takes `--tint-hover`       |
| active   | `--tint-active`, no movement and no scale                               |
| selected | `--border-selected` in `--accent`, plus `--accent-soft` behind          |
| focus    | `--focus-ring` outline in `--accent` at `--focus-offset`, never removed |
| disabled | `--opacity-disabled`, and the control stays in the tab order's logic    |
| dim      | `--opacity-dim` for something present but off the route                 |

`--tint-hover` and `--tint-active` are mixed from `--fg` rather than written per theme, so one
definition composites correctly over the page ground, a panel and a raised surface alike.

Hover is never the only signal: a control that can be activated says so at rest, by its border
or its label, because a touch visitor never hovers anything.

## Borders, radii, elevation

One border weight at rest (1px, `--line`), one at selection (2px, `--accent`). Radii, by
what the thing is:

| Radius             | Value   | On                                                    |
| ------------------ | ------- | ----------------------------------------------------- |
| `--radius-pill`    | full    | what a visitor presses: buttons, segments             |
| `--radius-control` | 10px    | what a visitor types into: fields, selects            |
| `NODE_RX`          | 8 units | a graph node, an SVG attribute set in `FlowGraph.tsx` |
| `--radius-panel`   | 18px    | panels, code blocks, tables, the graph's frame        |

The install line is a pill only while it is one line. Its radius is half the control height, so
the command a phone wraps onto two or three lines becomes a rounded box rather than a lozenge
whose ends crowd the text.

Focus is a 2px `--accent` outline at 2px offset, on every focusable element, never removed —
including inside the SVG graph, where each node is a focusable group.

### Elevation

Separation comes from the surface step and the hairline, and there are no drop shadows. The
one exception is a glow, in exactly three places and in the dark theme only (D-032):

| Token           | On                    | Dark                                     |
| --------------- | --------------------- | ---------------------------------------- |
| `--glow-action` | the primary action    | a 1px ring and a 30px halo of `--action` |
| `--glow-quiet`  | a secondary button    | a 22px halo of `--accent`, inset by 6px  |
| `--glow-active` | the active graph node | a 7px `drop-shadow` of `--st-active`     |

The three are the two things a visitor acts on and the one place the flow is, so the glow
follows the same meanings as the colours rather than decorating a surface. On a light ground a
halo reads as a smudge, so the light theme sets `--glow-quiet` and `--glow-active` to `none`
and gives the action a ring only, because its fill measures 1.73:1 against the page and needs
an edge. Nothing else glows: not a panel, a card, a heading or a hover.

Spacing is a 4px grid: 4, 8, 12, 16, 24, 32, 48, 64, 96. Sibling groups are laid out with
`gap`, not margins.

Controls come in two heights and no others: `--control-h` (44px), which is everything a
visitor is meant to hit, and `--control-h-compact` (32px), for a control that sits inside
another component's frame and is not the reason the visitor is there — the copy button on a
code block, the Rebuild control on a graph. A compact control still carries a 44px hit area
through padding.

### Where a rule sits in the cascade

Half of this site is Starlight's and half is ours, and the two meet in the cascade rather than
in a file. Starlight writes everything it draws inside `@layer starlight.*`. We therefore
declare the order once, at the top of `tokens.css`:

```css
@layer site.base, starlight.reset, starlight.base, starlight.core, starlight.content,
  starlight.components, starlight.utils;
```

`site.base` holds element-level defaults — what a bare `a` or `table` gets — and is the
weakest layer on the page, so a default of ours can never beat a component rule of Starlight's.
Everything else the site writes stays **outside** a layer, which is stronger than all of them,
because the custom pages own their appearance completely.

Zero specificity does not substitute for this. The cascade compares layers before it compares
specificity, so an unlayered `:where(a)` beats a layered `[aria-current='page']` — which is
exactly what happened: the base link colour repainted Starlight's current sidebar entry and its
skip link in `--accent`, on top of the `--accent` fill Starlight had already put behind them.
Both measured 1.00:1 and neither could be read. Anything Starlight paints on a fill takes
`--on-accent` through `--sl-color-text-invert`, which is the pairing the palette measures.

## Browser surfaces

The parts of the page nobody draws still belong to the design, and left alone they ship the
browser's own. Text selection is a 28% mix of `--accent`, the caret is `--accent`, the
scrollbar is `--line-strong` on a transparent track, link underlines sit at 0.18em with the
font's own thickness, and everything read in a column — tables, code, the graph's counts —
uses tabular figures.

## The graph

Geometry comes from `layoutGraph` in `@wizzard-packages/devtools/headless` and is not
re-invented here: nodes are 160x40 user units, a repeat group is 160x48, and the SVG scales
them through its viewBox. The site and the panel therefore draw the same graph at the same
density, which is what makes a screenshot of one match the other.

### The graph is never scaled up

**An SVG of a graph carries its own width and height and is only ever allowed to scale down.**
This is the most expensive rule in this document, because breaking it costs every other rule
in it: a graph stretched to fill a column multiplies every line weight and type size inside it
by the same factor, and nothing written here applies any more. The homepage shipped at 3.24x
once, a 13px node label drawn at 42px, a 1.5px edge at 4.9px, a 160x40 node at 518x129, and it
read as a broken page rather than a large one, which is what it was.

In CSS that is `max-width: 100%; height: auto` on a graph carrying `width` and `height`
attributes, and never a bare `width: 100%`. Where the graph is wider than the space it has,
the space scrolls.

Scaling down is allowed and still has a floor: **below 12px a label stops being a label.** A
13px node label is legible down to 0.92, a 9px condition is not legible below 1.0, so a layout
that would draw a graph under about 0.95 has the wrong shape and the fix is the layout. The
feature rows were two columns, 24rem of text beside a 788-unit graph in 656px, which drew the
condition at 7.1px; the claim now reads across the top and the graph takes the whole row. **A
graph gets the width it needs, or it scrolls - it never gets a scale.**

### Direction

`layoutGraph` takes a `direction`, and the choice belongs to the surface rather than to the
flow.

| Where                             | Direction | Why                                                                                                                               |
| --------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| a page                            | `row`     | a page has width and not height, and a route read left to right is a route                                                        |
| a docked panel                    | `column`  | a panel has height and not width                                                                                                  |
| a feature row, at 900px and under | `column`  | a phone has height and not width; laid across, the widest route left half of itself, and the walk that ends there, past the frame |

A feature row ships no script, so it cannot measure itself and pick: it draws both and the
stylesheet displays the one the breakpoint asks for.

The layering is identical either way: the same topological order, the same cycle break, the
same sibling order. Only which coordinate the layer index drives changes, so the two
directions cannot disagree about the shape of a flow.

A `back` edge returns along a rail clear of the graph, to the right of a column and below a
row.

An incoming edge is routed to the border its target faces, so a node drawn smaller than its
box, the end node's circle, is placed against that border rather than centred in the box, or
the line stops short of the thing it points at.

Node shapes carry the node's kind, so shape survives greyscale and colour blindness:

| Kind  | Shape                                  |
| ----- | -------------------------------------- |
| step  | rounded rect, `NODE_RX`                |
| group | rounded rect, `NODE_RX`, 48 units tall |
| end   | filled circle, radius 11               |
| ghost | rounded rect, dashed, struck through   |

Edges are 1.5px. An edge on the taken route uses `--st-active`; an edge that is not the one
the flow would take next drops to `--opacity-dim`. A `back` edge is dashed and never lights,
because it is an override rather than a route.

Conditions are drawn under their node, not on an edge. A fall-through `order` edge carries no
`when` of its own — the condition belongs to the step — and a label hung on the edge runs off
the panel besides. The line is `formatExpr`'s output truncated at 26 characters, which is the
widest that stays inside a 160-unit node, with the full text in the node's `title` and in the
table mirror.

The table mirror — a visually hidden table of steps, conditions and states — is the screen
reader's path through the graph and is mandatory wherever a graph is drawn. It is also what a
visitor sees if an interactive graph never hydrates.

Density rule: at most 40 nodes are drawn. Beyond that the graph renders the first 40 and a
line saying how many were omitted, because a wall of 200 nodes tells the reader nothing and
costs seconds of layout.

## The framework mode

React and Vue are not a per-block choice. One control in the page header puts the whole site
in one binding, and every code block, install line, example frame and running island on every
page follows it. The choice survives the visit.

This is a design decision with a product reason. "One engine, two bindings" is a sentence a
page can only assert; a switch that changes the entire site while a running wizard keeps its
place is the same claim demonstrated. It also means a Vue developer never scrolls past React
they cannot use.

Rules that make it work:

- The mode resolves before first paint, from storage into an attribute on `<html>`, the way
  Starlight already stamps `data-theme`. A visitor with no JavaScript, or on a slow
  connection, sees one binding rather than both or neither.
- With no choice recorded, the site is in React, and the control shows that as a real state
  rather than as an empty one.
- The control is a segmented pair with a pressed state, not a dropdown: two options do not
  earn a menu.
- The change is announced through the same `aria-live="polite"` region the flow uses for step
  changes. The page visibly changing is the confirmation; there is no toast.
- Two places are allowed to show both bindings side by side — the homepage and `/examples/` —
  because there the comparison is the evidence rather than clutter.

## Motion

Six motions exist. Anything else is a bug.

| Motion          | What it does                                   | Duration / easing                       | Reduced-motion equivalent            |
| --------------- | ---------------------------------------------- | --------------------------------------- | ------------------------------------ |
| step transition | the form swaps to the next step's fields       | 180ms, `--ease-out`, opacity + 4px rise | opacity swap, 0ms                    |
| graph rebuild   | `when` flips, the route re-draws               | 380ms nodes, 550ms edge draw            | no edge draw; colours change at 0ms  |
| scrubber        | the replay handle moves and the graph follows  | 120ms linear                            | no transition, position set directly |
| page transition | one documentation page becomes the next        | 220ms cross-fade, View Transitions      | no transition                        |
| route walk      | feature row A walks its route as it scrolls in | scroll-driven; the scroll is the clock  | the end frame, drawn at rest         |
| hero theater    | the definition is written, then the form run   | about 6s writing, 16s running, once     | the final frame, the form live       |

Four of the six are shipped: the step transition, the graph rebuild with the edge draw
inside it, the route walk and the hero theater. The scrubber's motion and the page transition are specified
here and built with the surfaces that need them - the scrubber itself already exists on the
inspector, without its motion; their tokens exist so that work adds behaviour rather than
values.

`--ease-out` is `cubic-bezier(0.2, 0.7, 0.3, 1)`. Motion never moves the page: nothing slides
in on scroll, and every section is fully readable at rest. `prefers-reduced-motion: reduce`
selects the right-hand column everywhere, including the edge-drawing animation.

The site has two authored moments, both on the homepage (D-028): the hero theater, on the
first screen and on the clock, and the route walk, below the fold and on scroll.

The hero theater plays once per load. The definition is typed a line at a time over about six
seconds while the graph grows by a step at the line that defines it; then, over about sixteen,
a visitor fills the form - a route, a business trip that brings Company onto the route, two
passengers, the second refused for a missing passport, and the booking. Every move is a call to
the real engine, and the console prints what it answered. A keystroke is 50ms, a control 400ms,
a press 500ms, and 800ms of stillness opens each beat so one reads as done before the next
begins. When the data moves a step across the route - the business trip in the scenario, or the
visitor's own box or travellers later - the graph plays a scout over 2.6 seconds: a comet runs
the route from the step the form stands on, the step that moved shows its condition with the data
in it and heals or breaks, each step it reaches glows, and the end sends one ring without
filling; any move puts the graph back on the engine at once (D-030). A press or a key in the
form, or Stop, hands the visitor the form where it stands.
It never loops, and the scenario never moves focus. Under reduced motion it does not play: the page shows its
final frame, the whole file and the whole graph, with the form live on Route. How it is built is
in [`docs/designs/hero-theater.md`](../docs/designs/hero-theater.md).

The route walk exists once, on the homepage's first feature row. It drives the graph rather than decorating around it: as the row scrolls into
view, the flow walks its own route. Details lights; a comet probes Company and its condition is
shown with the data in it, `"personal" != "business"`; the branch breaks; the comet runs the
bypass to Payment and on to the end, which fills and sends out one ring. The engine records the
walk at build time and CSS scroll-driven animations play it, so it carries no JavaScript. It
plays between `cover 14%` and `cover 52%` of the row's view timeline and then holds; scrolling
back rewinds it, and it never replays on its own. Under reduced motion, or in a browser without
`animation-timeline`, the graph is drawn at its end frame, which is a complete picture rather
than a degraded one. The halo's pulse is the one use of `--ease-spring`. How it is built is in
[`docs/designs/home-route-walk.md`](../docs/designs/home-route-walk.md).

Edge drawing uses `pathLength="100"` so one dash length draws every polyline and no length is
measured at runtime.

## Components

Two tiers, one vocabulary. The site and the package READMEs use these names for the same
things.

### Flow components

What draws the library's own data. These appear on the site, in the devtools panel, and in a
host application that ships the tokens.

1. **graph node** — a step in the graph: shape by kind, colour by state, focusable, with an
   accessible name of "label, state" and its `when` expression in the description.
2. **node condition** — the pretty-printed `when` under its node, truncated at 26 characters,
   full text in `title` and in the mirror.
3. **scrubber** — the replay control: a slider over recorded attempts, arrow keys move one
   attempt, Home and End jump to the ends, `--control-h` tall.
4. **state-diff panel** — added, removed and changed keys between two snapshots; a change is
   two lines, before struck and after in `--st-active`, never a colour-only difference.
5. **problems list** — refusals and errors in order, each with the step id, the field and the
   message the library actually produced, never a paraphrase.

### Site components

What the site itself is built from. Every one of them is the chassis above: a bounded field, a
hairline, a mono label where something needs naming, state on the border.

6. **theater** — the homepage hero: the definition being written on the left; on the right the
   form a visitor fills in, the console of calls and what the engine returned, and the graph of
   the flow, drawn down at every width. Each is its own panel, because each is a different
   reader's view of one wizard - the developer's, the visitor's, the engine's - and the claim is
   that the three agree, not that they are one widget.
7. **flow row** — a claim on the left and the flow that makes it true on the right, drawn by
   the engine from a reference definition rather than illustrated. It ships no JavaScript.
8. **page header** — the one top shared by custom pages and documentation: wordmark,
   navigation, search, the framework mode, the theme control. One component,
   `SiteHeader.astro`, draws it in both. Sticky, one hairline beneath it, no shadow, and it
   never grows a second row on scroll. It spans the window with the documentation's insets, so
   the wordmark does not move between the two. On a phone the custom pages give the navigation
   a second row and let the bar scroll away, since two rows held on screen cost a sixth of it;
   the documentation's bar is fixed, so there the navigation opens with the menu.
9. **code block** — `--surface` ground, a hairline, a mono tag naming the language and, where
   it differs by binding, the binding. Scrolls horizontally inside itself and never widens the
   page. Carries a compact copy control that reports success by changing its own label, not by
   a toast. Line numbers only where prose refers to a line.
10. **install line** — one command, mono, with the same copy control. A tag reads `install`.
    It is one line and never a block of package-manager tabs: the site publishes to npm and
    says so once.
11. **framework mode** — the segmented React/Vue pair described above. `--control-h-compact`
    in the header, `--control-h` wherever it appears in the page body.
12. **example frame** — the border around a live example: which binding is running, a link to
    its source, and a Restart that survives an error boundary. When the island fails, the
    frame stays and says what failed; it never collapses to blank space.
13. **spec table** — supported versions, bundle sizes, API rows. Hairline rules between rows,
    no zebra fill, no vertical rules, tabular figures, and a header row in the `label` style.
    It scrolls inside itself below 640px.
14. **callout** — note, caution, and refused. One hairline in the semantic colour, a 1px left
    rule and no more, and a word naming the kind. A refused callout uses `--st-blocked` and
    reads the same as a refusal in the graph, so the two are recognisably one thing.
15. **docs rail** — Starlight's sidebar and on-page contents, mapped onto the tokens rather
    than restyled page by page. Current page marked by an accent rule at the line's start, not
    by a filled pill.
16. **search** — Starlight's pagefind dialog in the site's grammar: `--z-dialog`, the keyboard
    hint set in `label`, results as hairline-separated rows, and a real empty state naming
    what was searched.
17. **evidence strip** — where a short row of real numbers lives: the supported versions on
    the homepage. A row of value-and-name pairs on one hairline, values in mono, on the ground
    rather than in a card, and never a number without the thing it measures.
18. **feature card** — the homepage's cards under the flow rows (D-034): a heading, one
    sentence, and what makes the sentence true - an excerpt of a file a test runs, its recorded
    output, or a measurement taken when the site is built. Never an icon, a slogan or a number
    typed by hand. Two columns where the shell is wide, one on a phone; a card that quotes a
    whole file takes the row. Its code sits on the card's surface inside a hairline, without a
    copy control, because an excerpt is not meant to be pasted alone: the card's link, at its
    foot, goes to the page that has the whole thing. The code well takes `--radius-control`: a
    block nested in a panel takes the smaller radius, so it does not echo the card's corner from
    a few pixels inside it. Output is set apart by a rule at the start of its lines, the way the
    theater's console is. The size card draws one bar per runtime import on one scale, largest
    first: core as what calling `createWizard` costs, every other import as what it adds to
    that, never an entry measured alone, which counts the code it shares with core again. The
    name and the measured size print beside each bar in text colours; the bar is `--fg-muted`,
    neither the accent nor the warm fill.

Every component in both tiers ships its rest, hover, active, focus and disabled states, and
those states come from the table under **Interaction states** rather than from the component.

### What is built and what is specified

This list is a contract, and part of it is still ahead of the code. Built today: the graph node,
the node condition, the table mirror, the theater, the flow row, the evidence strip and the
feature card on the homepage, and the page header on every page, all but its framework mode.
Specified here and built with the surfaces that need them: the scrubber and state-diff panel
with the inspector, and the code block, install line, framework mode, example frame, spec
table, callout, docs rail and search with the documentation and examples pages.

A component in the second group is not a suggestion. It is written down first so that the
page which needs it inherits a decision rather than making a new one, which is the failure
this tier exists to end: the homepage hero was built before any of this existed and cost two
hundred lines of one-off CSS that no other page can use.

## Viewports

```
  >= 1100 px   inspector: graph left 60%, state panel right 40%, scrubber full width below
               docs: sidebar + content + on-page table of contents
  640-1100     inspector: graph full width, state panel as a bottom sheet
               docs: sidebar collapses to a menu button, table of contents dropped
  < 640        inspector: read-only - graph pans by drag, no paste, no scrubber, a line saying so
               docs: single column; code and graphs scroll inside their container, never the page
```

The graph zooms by buttons, not by pinch; pinch is left to the browser so a two-finger gesture
never traps the page.

## Accessibility

Contrast at least 4.5:1 for text and 3:1 for the borders that carry state, enforced by `axe`
in CI on every page. Targets at least 44px on the scrubber, navigation and example controls.
Body text at least 16px. Focus rings never removed. Step changes, validation results and a
change of framework mode are announced through `aria-live="polite"`. Colour never carries
meaning alone: state is also a shape in the graph, a word in the problems list, and a position
in the diff.

Every interactive component has a state that is visible without hovering, because a touch
visitor never hovers. Every component that can fail has a state that says so in words.

## Writing

Plain prose, no emoji, no icon bullets, no exclamation marks. Headings say what the section
is, not what it will do for you. A control's label is the verb that happens: "Get started",
"Restart example", "Copy". An error says what the library refused and which field it named.
The library is "wizzard", lowercase, never "Wizzard.js" and never a mascot.

No page claims a number the repository cannot produce. Bundle sizes, the test count and the
supported versions are real and may be shown; benchmarks, coverage percentages, testimonials
and adopter logos do not exist and are never invented to fill a section.
