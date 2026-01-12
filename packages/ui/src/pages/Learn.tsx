import { Link } from 'react-router-dom';

const adapterExample = `import type { IValidatorAdapter, ValidationResult } from '@wizzard-packages/core';

class CustomAdapter implements IValidatorAdapter {
  constructor(private schema: unknown) {}

  async validate(values: unknown): Promise<ValidationResult> {
    // return { valid: boolean, errors?: Record<string, string> }
    return { valid: true };
  }
}
`;

const middlewareExample = `import type { WizardMiddleware } from '@wizzard-packages/core';

const analyticsMiddleware: WizardMiddleware = (api) => (next) => (action) => {
  // api.getState(), api.getData(), api.getConfig()
  // track action here
  return next(action);
};
`;

const persistenceExample = `import type { IPersistenceAdapter } from '@wizzard-packages/core';

class ApiPersistence implements IPersistenceAdapter {
  constructor(private key: string) {}

  async load() {
    return null;
  }

  async save(data: unknown) {
    // persist to API
  }

  async clear() {
    // delete from API
  }
}
`;

export default function Learn() {
  return (
    <section className="section learn-section">
      <div className="section-header">
        <p className="section-eyebrow">Extend</p>
        <h2>Build your own adapters, middleware, and persistence</h2>
        <p className="section-lead">
          Wizzard Stepper is designed for extension. Bring your own validation, tracking, and
          storage without changing the core engine.
        </p>
      </div>

      <div className="learn-grid">
        <article className="card learn-panel">
          <h3>Custom validation adapter</h3>
          <p>
            Implement <code>IValidatorAdapter</code> to connect any schema or rules engine.
          </p>
          <pre className="learn-code">
            <code>{adapterExample}</code>
          </pre>
        </article>

        <article className="card learn-panel">
          <h3>Custom middleware</h3>
          <p>
            Implement <code>WizardMiddleware</code> for logging, analytics, or guardrails.
          </p>
          <pre className="learn-code">
            <code>{middlewareExample}</code>
          </pre>
        </article>

        <article className="card learn-panel">
          <h3>Custom persistence</h3>
          <p>
            Implement <code>IPersistenceAdapter</code> to save wizard state to any backend or
            storage.
          </p>
          <pre className="learn-code">
            <code>{persistenceExample}</code>
          </pre>
        </article>
      </div>

      <div className="learn-actions">
        <Link to="/examples" className="button button--primary">
          Open examples
        </Link>
        <Link to="/api" className="button button--ghost">
          Browse API
        </Link>
      </div>
    </section>
  );
}
