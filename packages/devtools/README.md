# @wizzard-packages/devtools

React DevTools panel for Wizzard Stepper (state, actions, and errors).

## Install

```bash
pnpm add @wizzard-packages/devtools
```

## Usage

```tsx
import { WizardDevTools } from '@wizzard-packages/devtools';

function App() {
  return (
    <>
      <WizardDevTools />
      {/* rest of your UI */}
    </>
  );
}
```

The panel is hidden by default. Open it with `?devtools=true` in the URL
or `#?devtools=true` for hash routing.

## Links

- Repo: https://github.com/ZizzX/wizzard-packages
- Docs: https://github.com/ZizzX/wizzard-packages#readme
