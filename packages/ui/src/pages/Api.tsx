import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { apiDocs } from '../data/apiDocs';

const isReadme = (slug: string) => slug === 'README' || slug.endsWith('/README');

const normalizeSlug = (slug: string) => slug.replace(/\.md$/, '').replace(/\/$/, '') || 'README';

const docSlugs = new Set(apiDocs.map((entry) => entry.slug));
const userFacingDocs = apiDocs.filter((entry) => entry.isUserFacing);

const toDocSlug = (href: string) => normalizeSlug(href.replace(/^\.\//, '').replace(/^\//, ''));

export default function Api() {
  const params = useParams();
  const defaultSlug = userFacingDocs.find((entry) => !isReadme(entry.slug))?.slug || 'README';
  const slug = normalizeSlug(params['*'] || defaultSlug);
  const active = apiDocs.find((entry) => entry.slug === slug) || userFacingDocs[0] || apiDocs[0];
  const visibleDocs = userFacingDocs.filter((entry) => !isReadme(entry.slug));

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
        <p className="api-note">
          Generated from TypeDoc. Pick a module to explore the surface area.
        </p>
        <div className="api-list">
          {visibleDocs.map((entry) => (
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
      <article className="api-content markdown">
        <ReactMarkdown
          components={{
            a: ({ href, children, node, ...props }) => {
              if (!href) {
                return <a {...props}>{children}</a>;
              }
              if (href.startsWith('#')) {
                return (
                  <a href={href} {...props}>
                    {children}
                  </a>
                );
              }
              if (/^https?:\/\//.test(href)) {
                return (
                  <a href={href} rel="noreferrer" target="_blank" {...props}>
                    {children}
                  </a>
                );
              }
              let targetSlug = toDocSlug(href);
              if (!docSlugs.has(targetSlug) && docSlugs.has(`${targetSlug}/README`)) {
                targetSlug = `${targetSlug}/README`;
              }
              if (docSlugs.has(targetSlug)) {
                return (
                  <Link to={`/api/${targetSlug}`} {...props}>
                    {children}
                  </Link>
                );
              }
              return (
                <a href={href} {...props}>
                  {children}
                </a>
              );
            },
          }}
        >
          {active.content}
        </ReactMarkdown>
      </article>
    </section>
  );
}
