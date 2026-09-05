# TODOS

Deferred work, with the context needed to pick it up cold. Written by the `/autoplan` review
of `docs/designs/v1-launch.md` on 2026-09-06; each item was considered for 1.0.0 and
deliberately left out.

## P2

### 1. `url-sync` plugin (`?step=payment`)

**What:** a plugin that mirrors the current step (and optionally a slice of `data`) into the
URL and restores from it.
**Why:** a step survives F5 and can be shared by link. In 0.x this was the most common
request; nothing in v1 replaces it yet.
**Pros:** one plugin, no engine change once L0 lands. **Cons:** history semantics (push vs
replace) and the interaction with `back()` need a decision.
**Context:** `/persist` is the model to copy — same `Hooks` lifecycle, different storage.
The engine already exposes everything needed through `onCommit`.
**Effort:** human M / CC ~30m. **Blocked by:** L0 (the hook lifecycle).

### 2. Accessibility contract in the bindings

**What:** the engine supplies ARIA props, moves focus on a step change and announces
validation errors, instead of every application doing it by hand.
**Why:** 1.0.0's three reference applications implement this manually; that hand-written
version is the specification for the contract.
**Pros:** accessible by default. **Cons:** the bindings gain DOM opinions they do not have
today; the size budgets move.
**Context:** see the reference applications and the Phase 2 a11y amendments (D-M5).
**Effort:** human M / CC ~45m. **Blocked by:** the three reference applications.

## P3

### 3. Inspector state in the URL

**What:** encode the pasted flow (or a reference to it) in the page URL.
**Why:** paste a link, see the same graph. Excluded from the first inspector version by
`flow-inspector.md`.
**Context:** a flow can exceed URL limits; needs a compression or a gist-style store.
**Effort:** human M / CC ~30m. **Blocked by:** S2.

### 4. `createTestWizard` test utilities

**What:** a small package that builds a wizard with a fake registry and drives it.
**Why:** every consumer writing tests re-implements the same harness.
**Context:** `contract/binding-suite.ts` already contains most of the shape.
**Effort:** human S / CC ~20m.

### 5. Persist `debounceMs`

**What:** an explicit knob over the internal write coalescing.
**Why:** the plugin coalesces to one write per frame; a host with a very large `data` may
want longer.
**Context:** measure before adding — the write is a `JSON.stringify` of a bounded object.
**Effort:** human S / CC ~10m. **Blocked by:** L4b.

### 6. Privacy-free page counter for the site

**What:** a self-hosted count of page views, no third party, no cookies.
**Why:** TTHW is measured once by hand; nothing shows whether visitors reach Getting started.
**Context:** GitHub Pages serves statics only, so this needs an external endpoint — that is
the reason it is deferred, not the effort.
**Effort:** human S / CC ~15m. **Blocked by:** S6.

### 7. Versioned documentation

**What:** the site serves docs per released version.
**Why:** needed once 1.x and 2.x coexist; one version is honest until then.
**Effort:** human M / CC ~30m.

### 8. Asynchronous storage in `/persist`

**What:** allow IndexedDB or a remote endpoint as the storage.
**Why:** 1.0 restricts storage to synchronous, because stale reads and out-of-order writes
need explicit handling and none of the 1.0 examples need them.
**Context:** the restriction is stated in L0 and in the persistence docs page; lifting it
means an ordering token per write.
**Effort:** human M / CC ~45m. **Blocked by:** L4b.
