---
name: auto-save-context-at-half-full
description: At 50% context, save the checkpoint and tell the user to clear and restore — never ask permission; also validate before every commit and push, and act on PR review comments.
metadata:
  type: feedback
---

Given 2026-09-06: "в будущем при заполнении контекста на 50% сам делай сохранение
контекста, очистка и продолжение. не спрашивай меня. делай все пока не закончишь все по
плану... перед коммитом и пушкой прогоняй валидацию скилл. и учитывай комментарии в PR".

Three standing rules:

1. **At ~50% context, save without being asked.** Write the `/context-save` checkpoint,
   name the file in one line, and tell the user to press `/clear` then `/context-restore`.
   Only the user can clear, so that hand-off sentence is the whole ask — no question, no
   waiting for approval to save.
2. **Validate before every commit and push.** Run the repository's gates (here:
   `pnpm lint && pnpm type-check && pnpm test:run && pnpm format:check && pnpm size`, plus
   `pnpm examples:check` since the README is generated) and only then commit. The husky
   pre-push hook runs the suite anyway; failing it wastes a round trip.
3. **Work the PR review before merging** — see [[automated-review-on-every-pr]].

**Why:** the context ceiling used to arrive mid-task and the work stalled on a question
whose answer was always yes. The user wants the plan run to the end, with the save as a
routine step rather than an interruption.

**How to apply:** together with [[work-autonomously-through-the-plan]] this means: pick the
next task, run it to merge, save at the halfway mark, continue. Still ask only for npm
publishes and repo-admin actions.
