# @wizzard-packages/persistence

Persistence adapters for Wizzard Stepper (localStorage and in-memory).

## Install

```bash
pnpm add @wizzard-packages/persistence
```

## Usage

```ts
import { LocalStorageAdapter } from '@wizzard-packages/persistence';

const config = {
  steps,
  persistence: {
    adapter: new LocalStorageAdapter('wizard_'),
    mode: 'onStepChange',
  },
};
```

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs: https://github.com/ZizzX/wizzard-packages#readme
