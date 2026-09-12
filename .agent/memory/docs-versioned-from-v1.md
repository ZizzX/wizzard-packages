---
name: docs-versioned-from-v1
description: 'The docs site is versioned, and the first version is the new library (1.0.0) — 0.x gets no docs version at all, it is dropped rather than archived.'
metadata:
  node_type: memory
  type: project
  originSessionId: bf7a74a5-07b3-402f-a66d-76e9e4965283
  modified: 2026-09-08T20:08:35.770Z
---

Decided 2026-09-09. The documentation site serves docs per released version,
and versioning starts with the rewritten library: **1.0.0 is version one, and
0.x is not published as an older version.** Nothing archives the old docs.

**Why:** `TODOS.md` item 7 deferred versioned docs on the reasoning that "one
version is honest until 1.x and 2.x coexist". The owner overrode that on
2026-09-09 — the mechanism ships now, so the first release is already inside it
and nobody has to retrofit a version switcher onto a live site later. Keeping a
0.x version in the switcher would contradict
[[rewrite-from-scratch-mandate]]: 0.x is torn down, not supported.

**How to apply:** build the version switcher into the Starlight site as part of
Track S, seeded with a single entry for 1.0.0. Do not backfill 0.x. When a
release goes out, its docs snapshot is what that version's readers get; the
current docs always describe the newest release. This is what makes
[[docs-follow-every-change]] safe — a doc edit lands against the version it
belongs to instead of rewriting history for everyone.
