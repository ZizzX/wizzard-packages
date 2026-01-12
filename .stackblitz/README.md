## Local StackBlitz Templates

Each folder under `.stackblitz/` is a standalone Vite project. You can run any
template locally without waiting for a dev deploy.

### Quick start

Because this repo is a pnpm workspace, you need to install with
`--ignore-workspace` to avoid pnpm installing only the workspace root.

```bash
pnpm -C .stackblitz/basic install --ignore-workspace
pnpm -C .stackblitz/basic dev
pnpm -C .stackblitz/validation install --ignore-workspace
pnpm -C .stackblitz/validation dev
pnpm -C .stackblitz/persistence install --ignore-workspace
pnpm -C .stackblitz/persistence dev
pnpm -C .stackblitz/custom-adapter install --ignore-workspace
pnpm -C .stackblitz/custom-adapter dev
pnpm -C .stackblitz/middleware install --ignore-workspace
pnpm -C .stackblitz/middleware dev
pnpm -C .stackblitz/advanced-flow install --ignore-workspace
pnpm -C .stackblitz/advanced-flow dev
pnpm -C .stackblitz/core-engine install --ignore-workspace
pnpm -C .stackblitz/core-engine dev
pnpm -C .stackblitz/vue-core install --ignore-workspace
pnpm -C .stackblitz/vue-core dev
```

The dev server will print the local URL (usually `http://localhost:5173`).
