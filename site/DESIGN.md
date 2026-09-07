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

## Typefaces

Two families, both IBM Plex, self-hosted through `@fontsource`:

| Role    | Family        | Weight | Size / line-height              | Tracking |
| ------- | ------------- | ------ | ------------------------------- | -------- |
| display | IBM Plex Sans | 600    | `clamp(30px, 5vw, 52px)` / 1.06 | -0.025em |
| heading | IBM Plex Sans | 600    | 20-30px / 1.2                   | -0.015em |
| body    | IBM Plex Sans | 400    | 17px / 1.6                      | 0        |
| code    | IBM Plex Mono | 400    | 14px / 1.55                     | 0        |
| label   | IBM Plex Mono | 500    | 11px / 1.4, uppercase           | 0.1em    |

IBM Plex Sans is the reason the site does not read as a template: it is the typeface of
technical documentation rather than of landing pages, and it has a mono companion that shares
its skeleton, so a step id set in code sits beside its label without a seam. Body text is
never below 16px. `label` is the only uppercase style; use it for eyebrows and column heads,
never for a sentence.

Type scale, in px: 11, 13, 15, 17, 20, 24, 30, 38, 48. Nothing between the steps.

Reading width: documentation pages keep the Starlight default measure. Custom pages
(homepage, examples, inspector) cap running text at 68ch and let the graph and code blocks run
wider inside their own containers.

## Colour

Dark is the default and light follows the visitor's system preference; both are complete
palettes, not an inversion. The neutral is warm — a charcoal biased toward the accent — so the
amber reads as belonging to the page rather than sitting on top of it.

| Token              | Dark        | Light       | Use                                         |
| ------------------ | ----------- | ----------- | ------------------------------------------- |
| `--bg`             | `#12100E`   | `#FBF9F5`   | page ground                                 |
| `--surface`        | `#191612`   | `#FFFFFF`   | panels, form wells, code blocks             |
| `--surface-raised` | `#201C17`   | `#F4F0E9`   | the one layer above surface; used sparingly |
| `--line`           | `#2E2823`   | `#E4DCD1`   | hairlines, node borders at rest             |
| `--line-strong`    | `#3D362F`   | `#CFC3B4`   | dividers that separate sections             |
| `--fg`             | `#F3EEE7`   | `#1A1613`   | body and headings                           |
| `--fg-muted`       | `#A0958A`   | `#6B6058`   | secondary text, captions, labels            |
| `--fg-faint`       | `#7A7067`   | `#8B8078`   | non-text only: rules, disabled glyphs       |
| `--accent`         | `#E8912D`   | `#B4640F`   | the active step, primary action, links      |
| `--accent-soft`    | `#E8912D1F` | `#B4640F14` | fill behind the active node                 |
| `--on-accent`      | `#12100E`   | `#FFFFFF`   | text on an accent fill                      |

`--fg-faint` fails 4.5:1 against `--bg` by design and must never carry text; it exists for
rules and for glyphs that repeat a label already present. Every other pairing in the table
clears 4.5:1 in both themes, and `axe` in CI is what proves it.

### Semantic colours

These name flow state, not brand. They are the only colours allowed inside the graph, the
problems list and the state diff.

| State   | Token          | Dark      | Light     | Means                                           |
| ------- | -------------- | --------- | --------- | ----------------------------------------------- |
| active  | `--st-active`  | `#E8912D` | `#B4640F` | the step the flow is on                         |
| visited | `--st-visited` | `#B8A184` | `#8A7350` | entered and left; history, not progress bar     |
| blocked | `--st-blocked` | `#F2716F` | `#B3261E` | a validator refused the move                    |
| skipped | `--st-skipped` | `#7A7067` | `#8B8078` | `when` evaluated false; drawn dashed            |
| group   | `--st-group`   | `#7EA6B8` | `#2F6B84` | a repeat group or a sub-flow                    |
| error   | `--st-error`   | `#F2716F` | `#B3261E` | a thrown error, distinct from a refusal in copy |

`--st-group` is the single cool hue on the page. It marks a different class of object —
structure rather than position — and it is never used for emphasis, a button, or a link.
`blocked` and `error` share a colour because they share an urgency; the wording, not the
colour, says which one happened.

## Borders, radii, elevation

One border weight at rest (1px, `--line`), one at selection (2px, `--accent`). Radii: 4px on
controls and nodes, 6px on panels, nothing rounder. There are no shadows: separation comes
from the surface step and the hairline. Focus is a 2px `--accent` outline at 2px offset, on
every focusable element, never removed — including inside the SVG graph, where each node is a
focusable group.

Spacing is a 4px grid: 4, 8, 12, 16, 24, 32, 48, 64, 96. Sibling groups are laid out with
`gap`, not margins.

## The graph

Geometry comes from `layoutGraph` in `@wizzard-packages/devtools/headless` and is not
re-invented here: nodes are 160x40 user units, a repeat group is 160x48, and the SVG scales
them through its viewBox. The site and the panel therefore draw the same graph at the same
density, which is what makes a screenshot of one match the other.

Node shapes carry the node's kind, so shape survives greyscale and colour blindness:

| Kind   | Shape                                        |
| ------ | -------------------------------------------- |
| step   | rounded rect, 4px radius                     |
| group  | rect with a second border inset 3px          |
| repeat | rect with a second rect offset 4px behind it |
| end    | filled circle, radius 11                     |
| ghost  | rounded rect, dashed, struck through         |

Edges are 1.5px. An edge on the taken route uses `--st-active`; an edge into a skipped node
drops to 22% opacity. Edge labels are the `when` expression pretty-printed by `formatExpr`,
truncated at 32 characters, with the full text in the node's `title` and in the table mirror.
The table mirror — a visually hidden table of steps, conditions and edges — is the screen
reader's path through the graph and is mandatory wherever a graph is drawn.

Density rule: at most 40 nodes are drawn. Beyond that the graph renders the first 40 and a
line saying how many were omitted, because a wall of 200 nodes tells the reader nothing and
costs seconds of layout.

## Motion

Three motions exist. Anything else is a bug.

| Motion          | What it does                                  | Duration / easing                       | Reduced-motion equivalent            |
| --------------- | --------------------------------------------- | --------------------------------------- | ------------------------------------ |
| step transition | the form swaps to the next step's fields      | 180ms, `--ease-out`, opacity + 4px rise | opacity swap, 0ms                    |
| graph rebuild   | `when` flips, the route re-draws              | 380ms nodes, 550ms edge draw            | no edge draw; colours change at 0ms  |
| scrubber        | the replay handle moves and the graph follows | 120ms linear                            | no transition, position set directly |

`--ease-out` is `cubic-bezier(0.2, 0.7, 0.3, 1)`. Motion never moves the page: nothing slides
in on scroll, and every section is fully readable at rest. `prefers-reduced-motion: reduce`
selects the right-hand column everywhere, including the edge-drawing animation.

## Components

Six named components. The site and the package READMEs use these names for the same things.

1. **graph node** — a step in the graph: shape by kind, colour by state, focusable, with an
   accessible name of "label, state" and its `when` expression in the description.
2. **edge label** — the pretty-printed condition on an edge, truncated at 32 characters.
3. **scrubber** — the replay control: a slider over recorded attempts, arrow keys move one
   attempt, Home and End jump to the ends, 44px tall.
4. **state-diff panel** — added, removed and changed keys between two snapshots; a change is
   two lines, before struck and after in `--st-active`, never a colour-only difference.
5. **example island frame** — the border around a live example: the framework it runs, a link
   to its source, and a Restart control that survives an error boundary.
6. **problems list** — refusals and errors in order, each with the step id, the field and the
   message the library actually produced, never a paraphrase.

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
Body text at least 16px. Focus rings never removed. Step changes and validation results are
announced through `aria-live="polite"`. Colour never carries meaning alone: state is also a
shape in the graph, a word in the problems list, and a position in the diff.

## Writing

Plain prose, no emoji, no icon bullets, no exclamation marks. Headings say what the section
is, not what it will do for you. A control's label is the verb that happens: "Get started",
"Restart example", "Copy". An error says what the library refused and which field it named.
The library is "wizzard", lowercase, never "Wizzard.js" and never a mascot.
