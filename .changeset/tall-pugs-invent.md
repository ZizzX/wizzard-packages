---
'@wizzard-packages/core': major
'@wizzard-packages/react': major
'@wizzard-packages/vue': major
---

The root export is the v1 engine. `.` and `./v1` name the same built module and the same
declarations, so an import written against either resolves to one copy, and `./v1` stays through
1.x. The 0.x surface these packages used to serve from `.` is gone, along with
`@wizzard-packages/middleware`, `@wizzard-packages/persistence`, `@wizzard-packages/adapter-zod`
and `@wizzard-packages/adapter-yup`; `docs/MIGRATION.md` is the way across.
