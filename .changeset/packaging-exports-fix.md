---
'@wizzard-packages/adapter-yup': patch
'@wizzard-packages/adapter-zod': patch
'@wizzard-packages/persistence': patch
'@wizzard-packages/middleware': patch
'@wizzard-packages/devtools': patch
'@wizzard-packages/react': patch
'@wizzard-packages/core': patch
'@wizzard-packages/vue': patch
---

Fix type resolution for CommonJS consumers and declare packages side-effect free.

Every package declared a single `types` condition, which TypeScript resolves as ESM even
under `require` — CJS consumers got types that only worked with a dynamic import. The
condition is now split per format and points at the `.d.cts` output the build already
produced. `@wizzard-packages/react` had no `exports` map at all and now has one.

All packages also declare `sideEffects: false` and `engines.node`, so bundlers can tree-shake
them and installs warn on unsupported Node versions.
