# @wizzard-packages/persistence

![npm](https://img.shields.io/npm/v/@wizzard-packages/persistence)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/persistence)
![license](https://img.shields.io/npm/l/@wizzard-packages/persistence)

Persistence adapters for Wizzard Stepper. Save wizard state to localStorage or memory.

## Install

```bash
pnpm add @wizzard-packages/persistence
```

## Usage with React

```ts
import { LocalStorageAdapter } from '@wizzard-packages/persistence';

const config = {
  steps,
  persistence: {
    adapter: new LocalStorageAdapter('wizard_'),
    mode: 'onStepChange',
    debounceTime: 300,
  },
};
```

## Adapters

- LocalStorageAdapter - persist to browser storage
- MemoryAdapter - in-memory store (useful for tests)

## Fits in the stack

- Core engine: @wizzard-packages/core
- React bindings: @wizzard-packages/react
- Optional middleware: @wizzard-packages/middleware

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs UI: https://zizzx.github.io/wizzard-packages/
