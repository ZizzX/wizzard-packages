# Scoped Packages Migration Guide

This guide covers moving from the legacy `wizzard-stepper-react` package to the
scoped packages in the `wizzard-packages` repo.

## Install

```bash
pnpm add @wizzard-packages/react @wizzard-packages/core
pnpm add @wizzard-packages/adapter-zod @wizzard-packages/adapter-yup
pnpm add @wizzard-packages/persistence @wizzard-packages/middleware
```

## Import Mapping

```diff
- import { createWizardFactory } from 'wizzard-stepper-react';
+ import { createWizardFactory } from '@wizzard-packages/react';

- import { WizardStore } from 'wizzard-stepper-react';
+ import { WizardStore } from '@wizzard-packages/core';

- import { ZodAdapter } from 'wizzard-stepper-react';
+ import { ZodAdapter } from '@wizzard-packages/adapter-zod';

- import { YupAdapter } from 'wizzard-stepper-react';
+ import { YupAdapter } from '@wizzard-packages/adapter-yup';

- import { LocalStorageAdapter } from 'wizzard-stepper-react';
+ import { LocalStorageAdapter } from '@wizzard-packages/persistence';

- import { loggerMiddleware, devToolsMiddleware } from 'wizzard-stepper-react';
+ import { loggerMiddleware, devToolsMiddleware } from '@wizzard-packages/middleware';
```

## What Moved Where

- Core store, types, utilities: `@wizzard-packages/core`
- React provider, hooks, factory: `@wizzard-packages/react`
- Validation adapters: `@wizzard-packages/adapter-zod`, `@wizzard-packages/adapter-yup`
- Persistence adapters: `@wizzard-packages/persistence`
- Middleware: `@wizzard-packages/middleware`
- Devtools UI: `@wizzard-packages/devtools`

## Checklist

- [ ] Replace legacy imports with scoped packages
- [ ] Ensure adapters/persistence/middleware are imported from their new packages
- [ ] Update any custom build aliases (if you had local package paths)
- [ ] Verify tests and demo flows

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Legacy package: https://www.npmjs.com/package/wizzard-stepper-react
