# @wizzard-packages/devtools

![npm](https://img.shields.io/npm/v/@wizzard-packages/devtools)
![downloads](https://img.shields.io/npm/dm/@wizzard-packages/devtools)
![license](https://img.shields.io/npm/l/@wizzard-packages/devtools)

DevTools UI for Wizzard Stepper. Inspect state, actions, and errors while you build.

## Install

```bash
pnpm add @wizzard-packages/devtools
```

## Usage

```tsx
import { WizardDevTools } from '@wizzard-packages/devtools';

export function App() {
  return (
    <>
      <WizardDevTools />
      {/* rest of your UI */}
    </>
  );
}
```

The panel is hidden by default. Open it with `?devtools=true` in the URL or `#?devtools=true` for hash routing.

## Fits in the stack

- React bindings: @wizzard-packages/react
- Core engine: @wizzard-packages/core
- Optional middleware: @wizzard-packages/middleware

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs UI: https://zizzx.github.io/wizzard-packages/
