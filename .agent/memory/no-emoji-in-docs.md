---
name: no-emoji-in-docs
description: Hard rule — no emoji, badges-as-decoration or icon bullets in READMEs and docs; they read as AI-written.
metadata:
  type: feedback
---

No emoji or decorative icons anywhere a reader sees: READMEs (root and per-package), docs
pages, the site, section headings, feature lists, tables. Stated 2026-09-07: "делать их
правильными, понятными, красивыми без иконок как сейчас, что сразу видно что это ИИ делал".

**Why:** the owner ships this as their own library. Emoji headings and icon bullets are the
tell of generated text, and they undercut the credibility of everything else on the page.

**How to apply:** plain prose and plain headings. Structure carries the meaning — headings,
short paragraphs, tables, code blocks — never a picture-glyph standing in for a word. This
extends [[no-assistant-attribution]] from authorship to voice: the docs must read as written
by a person who knows the library. Applies to the D3/D4 README rewrites and the whole Track S
site.
