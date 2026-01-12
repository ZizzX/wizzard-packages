export default function Home() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="section-eyebrow">Getting started</p>
        <h2>Everything you need to ship guided flows</h2>
        <p className="section-lead">
          Build predictable multi-step journeys with adapters, persistence, and flexible navigation
          modes.
        </p>
      </div>
      <div className="card-grid">
        <article className="card card--accent">
          <h3>API Reference</h3>
          <p>Full TypeDoc output, searchable modules, and copy-ready snippets.</p>
        </article>
        <article className="card card--cool">
          <h3>Examples</h3>
          <p>Guided recipes for validation, persistence, and routing flows.</p>
        </article>
        <article className="card">
          <h3>Status</h3>
          <p>Docs UI is live on dev preview while the redesign ships.</p>
        </article>
      </div>
    </section>
  );
}
