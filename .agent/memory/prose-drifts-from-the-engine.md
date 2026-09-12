---
name: prose-drifts-from-the-engine
description: Eight claims across the documentation pages described an engine this repository does not have; each was found by checking the rule against the code or by an example failing, never by reading.
metadata:
  type: project
---

Writing the S4 pages turned up eight sentences that described behaviour the engine does not have.
Six were already published, two were mine, and not one of them was caught by reading.

- `back()` walks `order` backwards (`resolve.ts:78`); it never reads `state.history`. `'auto'` is
  that same walk, not a return to where the user came from.
- The default policy is `visited`, not `sequential` (`resolve.ts:122`), and `sequential` means an
  adjacent step, not "the next one and everything behind it".
- The policy refuses with `blocked` (`navigate.ts:362`), which is indistinguishable by reason
  from a guard refusing. `not-reachable` is about `when`, not about the policy.
- `force` skips the policy and nothing else. Guards run on every move, validation is its own
  option.
- `validateAll()` does not exist.
- `keyBy` identifies a repeat item; it does not move the answers written under a literal path.
- `clearOnLeave` runs on a move away from the step, so it protects no snapshot: a persistence
  plugin has already written what was typed, and completion clears nothing.
- A step cannot be deleted by a payload at all: removal is `undefined` and JSON has no
  `undefined`.

**Why:** prose about an engine is a claim nobody executes. A sentence that was true once survives
every rewrite of the code around it, and a sentence that was never true reads exactly the same.
Two of these were found only because a runnable example failed: the expected output disagreed with
what the engine printed, which no amount of re-reading would have produced.

**How to apply:** when a page states a rule, open the code that implements it and read the branch,
before the sentence is written. Where a page carries an example, let the example assert the rule -
a checked-in output file that a test compares against is what turns a claim into something that
can fail. Suspect any sentence that explains what a method "follows", "respects" or "protects";
those verbs are where the drift collects. See [[docs-follow-every-change]].
