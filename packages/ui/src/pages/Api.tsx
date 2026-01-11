import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { apiDocs } from '../data/apiDocs';

export default function Api() {
  const params = useParams();
  const slug = params['*'] || 'README';
  const active = apiDocs.find((entry) => entry.slug === slug) || apiDocs[0];

  if (!active) {
    return (
      <section className="section api-layout">
        <article className="api-content">
          <h2>API Reference</h2>
          <p>
            API docs are not available. Run <code>pnpm docs:api</code> first.
          </p>
        </article>
      </section>
    );
  }

  return (
    <section className="section api-layout">
      <aside className="api-sidebar">
        <h2>API Reference</h2>
        <div className="api-list">
          {apiDocs.map((entry) => (
            <Link
              key={entry.slug}
              to={`/api/${entry.slug}`}
              className={`api-link${entry.slug === active.slug ? ' api-link--active' : ''}`}
            >
              {entry.title}
            </Link>
          ))}
        </div>
      </aside>
      <article className="api-content">
        <ReactMarkdown>{active.content}</ReactMarkdown>
      </article>
    </section>
  );
}
