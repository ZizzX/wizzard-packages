---
'@wizzard-packages/validate': minor
---

New package: one Standard Schema validation adapter, replacing two.

`schema(s, opts?)` turns any [Standard Schema](https://standardschema.dev) into a
resolver a flow's `validate: { $ref }` can name. Zod 3.24+, Zod 4, Valibot, ArkType,
Effect and Yup 1.5+ all expose the same `~standard` property, so one function covers
every one of them — and every library that adopts the spec later, with no release here.

317 bytes gzipped, against 384 for the two 0.x adapter packages it replaces, and the
schema library is never bundled. `opts.at` addresses a slice using the same vocabulary
the flow's expressions already use: `data`, `data.trip`, `ctx.user`.

The spec's types are declared in the package rather than imported, so the published
`.d.ts` is self-contained and there is no dependency for a consumer to resolve.
