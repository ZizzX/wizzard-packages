## Local StackBlitz Templates

Each folder under `.stackblitz/` is a standalone Vite project. You can run any
template locally without waiting for a dev deploy.

### Quick start

```bash
pnpm -C .stackblitz/basic dev
pnpm -C .stackblitz/validation dev
pnpm -C .stackblitz/persistence dev
pnpm -C .stackblitz/custom-adapter dev
pnpm -C .stackblitz/middleware dev
pnpm -C .stackblitz/advanced-flow dev
pnpm -C .stackblitz/core-engine dev
pnpm -C .stackblitz/vue-core dev
```

The dev server will print the local URL (usually `http://localhost:5173`).
