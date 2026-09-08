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

That rules out a decorated site. No gradients, no glass, no cards stamped on every block, no
icon standing in for a word. The page is type, rules, and one accent colour that means "this
is where the flow is now".

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

Two families, self-hosted through `@fontsource`, and the split between them is the design:

| Role    | Family         | Weight | Size / line-height              | Tracking |
| ------- | -------------- | ------ | ------------------------------- | -------- |
| display | JetBrains Mono | 500    | `clamp(30px, 5vw, 52px)` / 1.06 | -0.025em |
| heading | JetBrains Mono | 500    | 20-30px / 1.2                   | -0.015em |
| body    | Inter Tight    | 400    | 17px / 1.6                      | 0        |
| code    | JetBrains Mono | 400    | 14px / 1.55                     | 0        |
| label   | JetBrains Mono | 500    | 11px / 1.4, uppercase           | 0.1em    |

**The monospace is the voice and the sans is the prose.** Headings, labels, controls, the
wordmark, code and every string the library produced are set in JetBrains Mono; running text
is set in Inter Tight and nothing else is. A site whose headings are monospace reads as an
instrument rather than as a landing page, which is the whole claim; a documentation page whose
paragraphs are monospace is read slower than it is admired, which is the whole cost. Both are
true, so the line is drawn between them rather than around them. Body text is never below
16px.

Inter Tight is a common choice, and a detector that flags overused typefaces flags it. That is
a fair reading of the family and the wrong reading of this pairing: the identity here is
carried by the monospace, and the prose face is asked to disappear. Swapping it for a less
familiar grotesque would move the distinctiveness to the one place the design does not want it.
Settled, not overlooked.

Type scale, in px: 11, 13, 15, 17, 20, 24, 30, 38, 48. Nothing between the steps.

### What mono is for

Mono carries the interface and the machine: headings, labels, controls, the wordmark, code,
identifiers, expressions and measurements - a step id, a `when` expression, a package name, a
bundle size, an install command, and any string the library itself produced. What it never
carries is a sentence. The site's own prose is set in sans even when it sits beside code, and
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
palettes, not an inversion. The neutral is cool - an ink ground biased toward the accent - so
the cyan reads as belonging to the page rather than as sitting on top of it.

| Token              | Dark        | Light       | Use                                          |
| ------------------ | ----------- | ----------- | -------------------------------------------- |
| `--bg`             | `#0B0E14`   | `#F4F6F9`   | page ground                                  |
| `--surface`        | `#10141C`   | `#FFFFFF`   | panels, form wells, code blocks              |
| `--surface-raised` | `#141926`   | `#EDF1F6`   | the one layer above surface; used sparingly  |
| `--line`           | `#1E2530`   | `#DCE3EC`   | hairlines, node borders at rest, table rules |
| `--line-strong`    | `#2C3648`   | `#B9C4D2`   | dividers that separate sections              |
| `--fg`             | `#E6EDF3`   | `#0B0E14`   | body and headings                            |
| `--fg-muted`       | `#93A1B4`   | `#4A5666`   | secondary text, captions, labels             |
| `--fg-faint`       | `#6E7C90`   | `#7A8798`   | non-text only: rules, disabled glyphs        |
| `--accent`         | `#35D6D0`   | `#0E6E6A`   | the active step, primary action, links       |
| `--accent-soft`    | `#35D6D01F` | `#0E6E6A14` | fill behind the active node                  |
| `--on-accent`      | `#06121A`   | `#FFFFFF`   | text on an accent fill                       |

`--fg-faint` must never carry text; it exists for rules and for glyphs that repeat a label
already present, and it clears the 3:1 a non-text mark needs and nothing more. Every other
pairing clears 4.5:1 in both themes, measured on the rendered page rather than assumed: the
accent carries text at 10.74 dark and 5.61 light, its solid fill under `--on-accent` at 10.53
and 6.07, and the lowest reading anywhere in the system is 4.78. `axe` in CI is what keeps it
that way.

The amber this replaced could not make that claim. White on the light `#B4640F` measured
4.40:1 under a 15px bold label. It shipped that way and no check caught it, because the check
was never run on that pair.

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
| active  | `--st-active`  | `#35D6D0` | `#0E6E6A` | the step the flow is on                         |
| visited | `--st-visited` | `#6E8FA8` | `#5A6B7D` | entered and left; history, not progress bar     |
| blocked | `--st-blocked` | `#F2716F` | `#B3261E` | a validator refused the move                    |
| skipped | `--st-skipped` | `#7E8AA0` | `#5F6B7A` | `when` evaluated false; drawn dashed            |
| group   | `--st-group`   | `#8FB4C8` | `#2F6B84` | a repeat group or a sub-flow                    |
| error   | `--st-error`   | `#F2716F` | `#B3261E` | a thrown error, distinct from a refusal in copy |

### One fill per viewport

`--accent` appears in three ways, and only one of them is a solid fill: a filled control, a
2px border with `--accent-soft` behind it, and a line or a word. **At most one solid accent
fill is visible at a time.** Everything else that wants the accent takes the border form.

The rule exists because the accent is also the colour that means "this is where the flow is
now". A second filled control competes with the graph for the same glance, and the graph is
what the page is for. The homepage spends its one fill on `Get started`, and the instrument's
`Next` takes the border form: an accent outline over `--accent-soft`, which outranks a neutral
border without spending the fill twice. Its label is `--fg` rather than the accent, because
the accent as text on that tint measures under the floor in the light theme.

`--st-skipped` is a step's colour, not a rule's: it carries the label of a node that is off
the route, so it clears 4.5:1 against `--surface-raised` in both themes. It deliberately does
not share `--fg-faint`'s value any more, which is the token that may never carry text.

`--st-group` is the single cool hue on the page. It marks a different class of object —
structure rather than position — and it is never used for emphasis, a button, or a link.
`blocked` and `error` share a colour because they share an urgency; the wording, not the
colour, says which one happened.

There is deliberately no token for a repeat group or a ghost node, though both have their own
shape below. Kind is carried by shape and state by colour; giving repeat a second cool hue
would break the rule directly above, and a ghost node draws in `--st-skipped` because both
mean the same thing — not on the route — with the struck-through outline saying which.

## Interaction states

The system has no shadows, so a control cannot rise on hover. It changes its line instead,
and only fills where a line would be wrong.

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

One border weight at rest (1px, `--line`), one at selection (2px, `--accent`). Radii: 4px on
controls and nodes, 6px on panels, nothing rounder. There are no shadows: separation comes
from the surface step and the hairline. Focus is a 2px `--accent` outline at 2px offset, on
every focusable element, never removed — including inside the SVG graph, where each node is a
focusable group.

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

| Where          | Direction | Why                                                                        |
| -------------- | --------- | -------------------------------------------------------------------------- |
| a page         | `row`     | a page has width and not height, and a route read left to right is a route |
| a docked panel | `column`  | a panel has height and not width                                           |

The layering is identical either way: the same topological order, the same cycle break, the
same sibling order. Only which coordinate the layer index drives changes, so the two
directions cannot disagree about the shape of a flow.

A `back` edge returns along a rail clear of the graph, to the right of a column and below a
row.

An incoming edge is routed to the border its target faces, so a node drawn smaller than its
box, the end node's circle, is placed against that border rather than centred in the box, or
the line stops short of the thing it points at.

Node shapes carry the node's kind, so shape survives greyscale and colour blindness:

| Kind   | Shape                                        |
| ------ | -------------------------------------------- |
| step   | rounded rect, 4px radius                     |
| group  | rect with a second border inset 3px          |
| repeat | rect with a second rect offset 4px behind it |
| end    | filled circle, radius 11                     |
| ghost  | rounded rect, dashed, struck through         |

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

Five motions exist. Anything else is a bug.

| Motion          | What it does                                  | Duration / easing                       | Reduced-motion equivalent            |
| --------------- | --------------------------------------------- | --------------------------------------- | ------------------------------------ |
| step transition | the form swaps to the next step's fields      | 180ms, `--ease-out`, opacity + 4px rise | opacity swap, 0ms                    |
| graph rebuild   | `when` flips, the route re-draws              | 380ms nodes, 550ms edge draw            | no edge draw; colours change at 0ms  |
| scrubber        | the replay handle moves and the graph follows | 120ms linear                            | no transition, position set directly |
| page transition | one documentation page becomes the next       | 220ms cross-fade, View Transitions      | no transition                        |
| route walk      | the homepage graph advances through its route | scroll-driven; the scroll is the clock  | settled end state, drawn at rest     |

Three of the five are shipped: the step transition, the graph rebuild, and the edge draw
inside the rebuild. The page transition and the route walk are specified here and built with
the surfaces that need them; their tokens exist so that work adds behaviour rather than
values.

`--ease-out` is `cubic-bezier(0.2, 0.7, 0.3, 1)`. Motion never moves the page: nothing slides
in on scroll, and every section is fully readable at rest. `prefers-reduced-motion: reduce`
selects the right-hand column everywhere, including the edge-drawing animation.

The route walk is the site's one authored moment and it exists once, on the homepage. It
drives the graph rather than decorating around it: as the reader moves down the first screen,
the flow advances through its own steps and the route redraws under a condition that resolves.
It is built on CSS scroll-driven animations and carries no JavaScript. It settles, and it does
not restart. Under reduced motion the graph is simply drawn at its end state, which is a
complete picture rather than a degraded one.

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

6. **instrument** — a bounded panel holding a live wizard: a row of controls, the line the
   engine last said, and the graph of the definition those controls are driving. One border
   around all three and none between them, because they are one object; a reader who takes the
   controls and the graph for two widgets has been told the wrong thing about the product.
7. **flow row** — a claim on the left and the flow that makes it true on the right, drawn by
   the engine from a reference definition rather than illustrated. It ships no JavaScript.
8. **page header** — the one top shared by custom pages and documentation: wordmark,
   navigation, the framework mode, the theme control. Sticky, one hairline beneath it, no
   shadow, and it never grows a second row on scroll.
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
17. **evidence strip** — where real numbers live: bundle sizes, test count, supported
    versions. A row of value-and-name pairs on one hairline, values in mono. Explicitly not a
    three-column feature grid, not cards, and never a number without the thing it measures.

Every component in both tiers ships its rest, hover, active, focus and disabled states, and
those states come from the table under **Interaction states** rather than from the component.

### What is built and what is specified

This list is a contract, and part of it is still ahead of the code. Built today: the graph node,
the node condition, the table mirror, the instrument, the flow row, and the parts of the page
header the homepage uses. Specified here and built with the surfaces that need them: the
scrubber and state-diff panel with the inspector, and the code block, install line, framework
mode, example frame, spec table, callout, docs rail, search and evidence strip with the
documentation and examples pages.

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
