---
name: impeccable-not-model-invocable
description: The impeccable design skill is installed but blocked for model invocation; only the owner can run it.
metadata:
  type: reference
---

The `impeccable` skill (v4.1.1) is installed and marked user-invocable, but a local override
setting disables it for automated invocation — calling it through the skill tool returns an
error saying it is disabled for that use.

**Why:** it looks available in the skill listing, so a session can lose a turn discovering the
block. The same is likely true of any other skill the owner has overridden the same way — not
invocable by an agent, only by the owner.

**How to apply:** when design work would benefit from it, do not attempt the call. Say plainly
that it needs the owner, and give them the exact line to type (`/impeccable shape ...`). Do the
design work in the meantime rather than blocking; the skill reads `DESIGN.md` when it runs, so
an existing one gives it a starting point instead of a blank page. See
[[no-emoji-in-docs]] for the voice constraint any design pass has to respect.
