import { createWizardFactory } from '@wizzard-packages/react';

const { WizardProvider } = createWizardFactory<{ hello: string }>();

const config = {
  steps: [{ id: 'intro', label: 'Intro' }],
};

export default function App() {
  return (
    <WizardProvider config={config} initialData={{ hello: 'Docs UI' }}>
      <div className="page">
        <header className="hero">
          <p className="eyebrow">Wizzard Packages</p>
          <h1>Docs UI</h1>
          <p className="subtitle">
            Scaffold for the interactive documentation site.
          </p>
        </header>
        <section className="card-grid">
          <article className="card">
            <h2>API Reference</h2>
            <p>Coming next: render TypeDoc output inside the UI.</p>
          </article>
          <article className="card">
            <h2>Examples</h2>
            <p>Curated recipes and live demos for common flows.</p>
          </article>
          <article className="card">
            <h2>Status</h2>
            <p>UI package scaffold is live and ready for routing.</p>
          </article>
        </section>
      </div>
    </WizardProvider>
  );
}
