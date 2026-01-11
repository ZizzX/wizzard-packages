type ApiDocEntry = {
  slug: string;
  title: string;
  content: string;
};

const docModules = import.meta.glob('../../docs/api/**/*.md', {
  eager: true,
  as: 'raw',
});

const entries = Object.entries(docModules).map(([path, content]) => {
  const slug = path
    .replace('../../docs/api/', '')
    .replace(/\.md$/, '');
  const title = slug
    .split('/')
    .slice(-1)[0]
    .replace(/[-_]/g, ' ');
  return { slug, title, content: String(content) };
});

const sorted = entries.sort((a, b) => a.slug.localeCompare(b.slug));

export type { ApiDocEntry };
export const apiDocs = sorted;
