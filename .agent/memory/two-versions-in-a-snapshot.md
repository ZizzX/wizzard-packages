# Two versions live in a snapshot

`v` is the snapshot envelope's format version, owned by this library and `1` today. `version` is
the flow's own, owned by the application. They are checked in different places and only one of
them `migrate` can help with:

- `decodeSnapshot` runs `options.migrate` in a loop while `candidate.v !== CURRENT`
  (`snapshot.ts:164-175`). It never looks at `flow.version` to decide whether to migrate.
- A `snapshot.version` that does not match `flow.version` fails with `snapshot/other-flow`
  (`snapshot.ts:184-189`), after migration, and no callback is consulted. Upgrading a stored
  session across a flow version is the application's job, before the payload reaches the decoder.
- A migration returning a non-numeric `v` fails with `snapshot/unreadable`, not
  `snapshot/version` (`snapshot.ts:174`).

The reasons table in `docs/persistence.md` said "the definition's `version` moved and no
`migrate` was supplied" for `snapshot/version` from the start, and a P2 guide repeated it: the
prose was wrong in the same way twice, and only the automated review on #131 caught it. When
writing about restore, read the loop, not the table.

Related: [[prose-drifts-from-the-engine]], [[docs-follow-every-change]].
