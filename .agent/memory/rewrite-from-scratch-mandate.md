---
name: rewrite-from-scratch-mandate
description: Standing mandate from 2026-09-06 — the library, the README and the examples site are all rewritten from scratch to best standards; the old UI is torn down, 0.x support only where genuinely needed.
metadata:
  type: feedback
---

Given 2026-09-06 on resuming after T29, the owner's instruction was: remember that we are
writing a new application, a library — and only where truly necessary do we carry over
support for the old one; otherwise everything is written from scratch, correctly and to a
high standard.

Three deliverables, in this order of priority:

1. **The library** — wizard / multistepper / state management, written as a new
   product on the v1 foundation ([[wizzard-v1-flow-as-data]]), to the best
   standards the ecosystem has. Not an incremental clean-up of 0.x.
2. **`README.md`** — full rewrite. The user's verdict on the current one: it is
   not attractive, and it is obvious it was AI-written. It must read as a
   human-written, best-in-class library README (compare the reference READMEs of
   zustand, xstate, and other well-established libraries in the space). Diagnosis
   of what is wrong today lives in [[v1-readme-still-documents-0x]].
3. **The examples site** — tear the old UI down completely and build a new one.
   Not a restyle: a new app.

**Why:** the 0.x code and its docs were written before the user knew how to
write agent rules or judge library quality ([[wizzard-0x-duplication-diagnosis]]).
Keeping any of it as a base drags that quality floor into 1.0.

**How to apply:** when a task could be done as "patch the old thing" or "write
the new thing", write the new thing. Backwards support for 0.x is opt-in and
must be justified by a concrete need, never carried by default (compat was
already cut on measured downloads — [[v1-showcase-is-the-flow-graph]]).
Development runs through `/autoplan` and the gstack rules; see
[[work-autonomously-through-the-plan]] for the no-questions execution mode.
</content>
