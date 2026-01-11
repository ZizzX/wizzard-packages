const exampleCards = [
  {
    title: 'Validation',
    description: 'Zod/Yup adapters with step-level validation.',
  },
  {
    title: 'Persistence',
    description: 'LocalStorage + memory adapters with auto-save.',
  },
  {
    title: 'Navigation',
    description: 'Sequential, visited, and free navigation modes.',
  },
];

export default function Examples() {
  return (
    <section className="section">
      <h2>Examples</h2>
      <div className="card-grid">
        {exampleCards.map((card) => (
          <article className="card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
