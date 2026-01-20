---
"@wizzard-packages/core": patch
"@wizzard-packages/react": patch
"@wizzard-packages/adapter-zod": patch
"@wizzard-packages/adapter-yup": patch
"@wizzard-packages/persistence": patch
"@wizzard-packages/middleware": patch
"@wizzard-packages/devtools": patch
---

Fix root build scripts to correctly support monorepo structure (switched to `pnpm -r build`).