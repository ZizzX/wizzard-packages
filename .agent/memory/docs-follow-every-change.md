---
name: docs-follow-every-change
description: "Hard rule from 2026-09-09 — every feature, fix or behaviour change updates the README's matching section and the docs site in the same change, never in a follow-up."
metadata:
  node_type: memory
  type: feedback
  originSessionId: bf7a74a5-07b3-402f-a66d-76e9e4965283
  modified: 2026-09-08T20:08:24.881Z
---

Stated 2026-09-09: "если мы добавляем какую-то фичу, фикс и прочее, всегда
обновлять это в readme библиотеке в соответствующих разделах и документацию
обновлять!"

A change is not done when the code lands. It is done when the README section
that describes that surface and the docs page that teaches it both describe
what the code now does. Same PR, same commit range — never a follow-up issue.

**Why:** the owner ships this as their own library, and documentation that
trails the code by one release is how a library earns the reputation of being
undocumented. It is also the only defence against the 0.x failure mode, where
docs described a product that no longer existed
([[v1-readme-still-documents-0x]]).

**How to apply:** before opening a PR, ask which README section and which
`/docs/` page names the behaviour being changed, and edit both. New public
option or prop -> the API behaviour table plus the page that owns the concept.
New error -> its `/errors/<code>` page. Changed default -> every snippet that
relied on the old one. Where a snippet is generated (`scripts/embed-examples.mjs`)
or `?raw`-imported, change the source file and let the generation carry it —
that is why those mechanisms exist. Docs voice stays [[no-emoji-in-docs]].
The docs themselves are versioned per release: [[docs-versioned-from-v1]].
