# @wizzard-packages/middleware

![npm](https://img.shields.io/npm/v/@wizzard-packages/middleware)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/middleware)
![license](https://img.shields.io/npm/l/@wizzard-packages/middleware)

Built-in middleware for Wizzard Stepper (logger + Redux DevTools).

## Install

```bash
pnpm add @wizzard-packages/middleware
```

## Usage with React

```ts
import { devToolsMiddleware, loggerMiddleware } from '@wizzard-packages/middleware';

const config = {
  steps,
  middlewares: [loggerMiddleware, devToolsMiddleware],
};
```

## Fits in the stack

- Core engine: @wizzard-packages/core
- React bindings: @wizzard-packages/react
- Optional persistence: @wizzard-packages/persistence

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs UI: https://zizzx.github.io/wizzard-packages/
