const stackblitzBase = 'https://stackblitz.com/github/ZizzX/wizzard-packages/tree/dev/.stackblitz';

const exampleCards = [
  {
    title: 'Validation',
    description: 'Zod/Yup adapters with step-level validation.',
    href: `${stackblitzBase}/validation`,
  },
  {
    title: 'Persistence',
    description: 'LocalStorage + memory adapters with auto-save.',
    href: `${stackblitzBase}/persistence`,
  },
  {
    title: 'Navigation',
    description: 'Sequential, visited, and free navigation modes.',
    href: `${stackblitzBase}/basic`,
  },
  {
    title: 'Custom Adapter',
    description: 'Bring your own validation adapter.',
    href: `${stackblitzBase}/custom-adapter`,
  },
  {
    title: 'Custom Middleware',
    description: 'Analytics, logging, and guardrails.',
    href: `${stackblitzBase}/middleware`,
  },
  {
    title: 'Advanced Flow',
    description: 'Branching, guards, and async conditions.',
    href: `${stackblitzBase}/advanced-flow`,
  },
  {
    title: 'Core Engine',
    description: 'Use @wizzard-packages/core without React bindings.',
    href: `${stackblitzBase}/core-engine`,
  },
];

export default function Examples() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="section-eyebrow">Cookbook</p>
        <h2>Examples</h2>
        <p className="section-lead">
          Start from working recipes and customize the steps for your product.
        </p>
      </div>
      <div className="card-grid">
        {exampleCards.map((card) => (
          <a
            className="card card--link"
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noreferrer"
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span className="card-cta">Open StackBlitz</span>
          </a>
        ))}
      </div>
    </section>
  );
}
