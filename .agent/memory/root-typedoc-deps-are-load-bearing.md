# Root typedoc devDependencies are load-bearing

`typedoc` and `typedoc-plugin-markdown` sit in the ROOT `package.json` devDependencies and look
dead: nothing at the root runs typedoc since `docs:api` and the root `typedoc.json` were deleted
with 0.x, and `site/package.json` declares both itself. Removing them from the root breaks
`pnpm -F @wizzard-packages/site build`:

```
[error] The plugin typedoc-plugin-markdown could not be loaded
[error] Cannot find package 'typedoc-plugin-markdown' imported from
        node_modules/.pnpm/typedoc@0.28.15_typescript@5.9.3/node_modules/typedoc/dist/lib/utils/plugins.js
```

typedoc loads a plugin by a bare import from its own package directory, not from the workspace
that asked for it. Under pnpm's isolated layout that resolves only while the plugin is hoisted
into the root `node_modules`, which the root devDependency is what does. `site/node_modules/typedoc`
is a symlink into the same `.pnpm` store entry, so the site's own copy does not help.

The failure is a site build failure, not a type error, so `pnpm verify` stays green and only
`pnpm build` catches it. Two reviewers flagged the pair as a dead dependency; both were wrong.

Related: [[site-inspector-consumes-validate-flow]], [[stale-dist-fails-local-tests]].
