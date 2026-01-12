type ApiDocEntry = {
  slug: string;
  title: string;
  content: string;
  isUserFacing: boolean;
};

const docModules = import.meta.glob('../../../../docs/api/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const userFacingPatterns = [
  /^react\/src\/README$/,
  /^react\/src\/functions\/(createWizardFactory|useWizard|useWizardActions|useWizardContext|useWizardError|useWizardSelector|useWizardState|useWizardValue|WizardProvider)$/,
  /^react\/src\/interfaces\/(IWizardConfig|IStepConfig|IWizardState|IWizardActions|IWizardContext|IValidatorAdapter|IWizardHandle|WizardProviderProps|WizardStepRendererProps)$/,
  /^react\/src\/type-aliases\/(PersistenceMode|ValidationResult|WizardMiddleware)$/,
  /^react\/src\/variables\/(WizardStepRenderer|loggerMiddleware)$/,
  /^adapter-zod\/src\/README$/,
  /^adapter-zod\/src\/classes\/ZodAdapter$/,
  /^adapter-yup\/src\/README$/,
  /^adapter-yup\/src\/classes\/YupAdapter$/,
  /^persistence\/src\/README$/,
  /^persistence\/src\/classes\/(LocalStorageAdapter|MemoryAdapter)$/,
  /^middleware\/src\/README$/,
  /^middleware\/src\/variables\/(loggerMiddleware|devToolsMiddleware)$/,
  /^devtools\/src\/README$/,
  /^devtools\/src\/functions\/WizardDevTools$/,
];

const isUserFacingSlug = (slug: string) => userFacingPatterns.some((pattern) => pattern.test(slug));

const entries = Object.entries(docModules).map(([path, content]) => {
  const slug = path.replace('../../../../docs/api/', '').replace(/\.md$/, '');
  const title = slug.split('/').slice(-1)[0].replace(/[-_]/g, ' ');
  return { slug, title, content: String(content), isUserFacing: isUserFacingSlug(slug) };
});

const sorted = entries.sort((a, b) => a.slug.localeCompare(b.slug));

export type { ApiDocEntry };
export const apiDocs = sorted;
