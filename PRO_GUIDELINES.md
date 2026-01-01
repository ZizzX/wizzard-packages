# Professional Evolution Guide: wizzard-stepper-react 🧙‍♂️

## 1. Modularization (Monorepo Strategy)
To align with **Google/MAANG** best practices, the library should transition from a monolith to a **Monorepo** (using `pnpm workspaces` or `Turborepo`).

### Why?
- **Tree-shaking**: Users only download the core logic (10kb) and and pick only the adapters they need (Zod, Yup, etc).
- **Dependency Isolation**: The core remains dependency-free. Only `@wizzard/adapter-zod` depends on `zod`.
- **Scalability**: New community-driven adapters or middlewares won't bloat the main package.

### Recommended Structure:
```text
/packages
  /core         (State engine, base types, store)
  /react        (WizardProvider, useWizard, useWizardActions)
  /adapter-zod  (Zod validation adapter)
  /adapter-yup  (Yup validation adapter)
  /middleware-analytics (Pre-built analytics connector)
  /devtools     (WizardDevTools component & middleware)
```

---

## 2. Middleware vs. Adapters

### The Rule of Thumb:
- **Adapters**: Use for **Data Processing & External Logic**. (e.g., "How do I validate this object?", "How do I save string to storage?"). Adapters satisfy a specific interface.
- **Middleware**: Use for **Side Effects & Observation**. (e.g., "Log every action", "Sync state with Redux DevTools", "Block action based on global state").

### Custom Middleware (The Power of Extensibility)
Yes, users **can and should** write their own middleware. It uses a standard Curried Function pattern (like Redux).

**Example: Custom Analytics Middleware**
```typescript
import { WizardMiddleware, MiddlewareAPI } from 'wizzard-stepper-react';

export const segmentAnalytics = (options: { writeKey: string }): WizardMiddleware => 
  ({ getState }) => (next) => (action) => {
    // 1. Perform logic before the state update
    if (action.type === 'GO_TO_STEP') {
      console.log(`Navigating to ${action.payload.stepId}`);
    }

    // 2. Pass action to the next middleware or store
    const result = next(action);

    // 3. Perform logic after the state update
    if (action.type === 'SET_DATA') {
      const state = getState();
      // Track data changes...
    }

    return result;
  };
```

---

## 3. Documentation & Demo Versioning
For a professional library, never mix "New" and "Legacy" documentation in one long page.

### Recommendation:
1. **Docusaurus/Nextra**: Use a dedicated documentation engine that supports versioning (e.g., `/docs/v1` vs `/docs/v2`).
2. **The "Breaking Change" Banner**: Always highlight new features that require a different setup (like `WizardStore` based context).

### Demo Version Switcher:
In your demo app, implement a simple state-based version toggle to show users both approaches.

```tsx
const DemoRoot = () => {
  const [version, setVersion] = useState<'v1' | 'v2'>('v2');

  return (
    <div>
      <VersionSelect value={version} onChange={setVersion} />
      
      {version === 'v2' ? (
        <WizardProvider middlewares={[...]} config={...}>
          <NewModernWizard />
          <WizardDevTools />
        </WizardProvider>
      ) : (
        <WizardProvider steps={...}>
          <SimpleLegacyWizard />
        </WizardProvider>
      )}
    </div>
  );
}
```

---

## 4. MAANG Standard Checklist
How to reach the next level of engineering excellence:

1.  **Strict Semantic Versioning**: Never introduce a feature that requires `as any` or property renaming (like `wizardData`) without a Major version bump.
2.  **Stateless Core**: Your `WizardStore` is already great because it's detached from React. This allows it to work with Svelte, Vue, or Vanilla JS in the future.
3.  **Path-Based Optimization**: Continue using the path system (`user.details.name`). It's exactly how large-scale forms are handled at Google (e.g., internally developed form engines).
4.  **T-Shirt Sizing for Bundles**: Aim for `< 5kb` Gzipped core. This is why modularization is key.
