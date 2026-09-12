---
name: post-1-0-product-direction
description: "The seven things the library is meant to grow into after 1.0.0 — step builder first, because the owner's own company needs it — plus the constraint none of them may break."
metadata:
  node_type: memory
  type: project
  originSessionId: bf7a74a5-07b3-402f-a66d-76e9e4965283
  modified: 2026-09-08T20:08:49.969Z
---

Stated 2026-09-09, as the direction 1.0.0 is the foundation for. None of this
is 1.0.0 scope; all of it shapes what 1.0.0 must not make impossible.

1. **Step builder (highest value to the owner).** A visual constructor that
   defines steps, which components each renders, conditions and order, and
   emits the JSON graph the engine consumes. The owner's company needs exactly
   this and has no admin panel of its own to build it in. The backend then
   serves that graph and the stepper assembles the run from it.
2. **SDUI.** Server-driven UI as a supported approach, not just the JSON
   contract page S4 documents.
3. **Server rendering of steps** — created and maintained server-side.
4. **Prompt to graph.** Describe a multi-step flow in words, get the JSON graph.
5. **MCP server** and connections to AI agents.
6. **Agent rules and skills published on the site**, so an agent can read how to
   work with the library and its whole surface before writing a line.
7. Whatever else removes friction from building steps — the ambition is a
   library that covers every case of multi-step flow construction.

**The constraint that outranks all seven: the library never binds to our own UI
components.** It works with any design system. A builder that emits component
names is fine; a builder that only emits _our_ components is a different, worse
product. This is the same headless principle as [[wizzard-v1-flow-as-data]] —
the flow is data, the rendering is the host's.

**How to apply:** when a 1.0.0 design decision could close one of these doors,
say so and take the option that keeps it open. The flow JSON is the interface
all seven route through, so its shape is the thing to protect. Roadmap phase 5
in `docs/designs/v1-launch.md` already parks server-driven flows, MCP and AI
generation; this memory records that the step builder leads that list and why.
