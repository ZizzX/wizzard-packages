# @wizzard-packages/middleware

Built-in middlewares for Wizzard Stepper, including logger and Redux DevTools.

## Install

```bash
pnpm add @wizzard-packages/middleware
```

## Usage

```ts
import { loggerMiddleware, devToolsMiddleware } from '@wizzard-packages/middleware';

const config = {
  steps,
  middlewares: [loggerMiddleware, devToolsMiddleware],
};
```

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs: https://github.com/ZizzX/wizzard-packages#readme
