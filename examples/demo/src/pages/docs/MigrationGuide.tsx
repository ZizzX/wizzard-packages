import { useNavigate } from "react-router-dom";
import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";
import { useVersion } from "../../context/VersionContext";

export default function MigrationGuide() {
  const { t } = useTranslation();
  const { setVersion } = useVersion();
  const navigate = useNavigate();

  const handleV2Switch = (path: string) => {
    setVersion("2.0.0");
    navigate(path);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {t("migration.title")}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {t("migration.subtitle")}
        </p>
      </div>

      {/* V2 Banner - From Screenshot */}
      <div className="bg-gray-950 rounded-3xl p-8 md:p-10 shadow-2xl ring-1 ring-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl font-black text-white tracking-tight">
            {t("migration.banner.title")}
          </h3>
          <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl">
            {t("migration.banner.description")}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleV2Switch("/docs/quickstart")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95 flex items-center gap-2"
            >
              {t("migration.banner.btn_quickstart")}
            </button>
            <button
              onClick={() => handleV2Switch("/docs/concepts")}
              className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-bold transition-all backdrop-blur-md active:scale-95 border border-white/10"
            >
              {t("migration.banner.btn_architecture")}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <h3 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {t("migration.why_upgrade")}
        </h3>
        <ul className="text-amber-800 text-sm space-y-2 list-disc pl-5">
          <li>
            <strong>{t("migration.zero_rerenders")}</strong>:{" "}
            {t("migration.zero_rerenders_desc")}
          </li>
          <li>
            <strong>{t("migration.middleware")}</strong>:{" "}
            {t("migration.middleware_desc")}
          </li>
          <li>
            <strong>{t("migration.devtools")}</strong>:{" "}
            {t("migration.devtools_desc")}
          </li>
          <li>
            <strong>{t("migration.universal_store")}</strong>:{" "}
            {t("migration.universal_store_desc")}
          </li>
        </ul>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          {t("migration.core_update")}
        </h2>
        <p className="text-gray-600">
          <span
            dangerouslySetInnerHTML={{ __html: t("migration.factory_desc") }}
          />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest">
              {t("migration.legacy_v1")}
            </h4>
            <div className="bg-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <pre>
                {`import { WizardProvider, useWizard } from 'wizzard-stepper-react';

const App = () => (
  <WizardProvider>
    <MyComponent />
  </WizardProvider>
);`}
              </pre>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest">
              {t("migration.modern_v2")}
            </h4>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs overflow-x-auto text-gray-300">
              <pre>
                {`import { createWizardFactory } from 'wizzard-stepper-react';

const { WizardProvider, useWizard } = createWizardFactory<MyData>();

const App = () => (
  <WizardProvider>
    <MyComponent />
  </WizardProvider>
);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          {t("migration.optimized_selectors")}
        </h2>
        <p className="text-gray-600">{t("migration.selectors_desc")}</p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-4 text-gray-300">
            {`// ❌ Low Performance (v1 approach)
const { wizardData } = useWizard(); // Re-renders on ANY change

// ✅ High Performance (v2 approach)
const name = useWizardValue('user.name'); // Only re-renders when name changes
const hasErrors = useWizardSelector(s => s.errorSteps.size > 0);`}
          </pre>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          {t("migration.breaking_changes")}
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs mt-1">
              1
            </div>
            <div>
              <h4 className="font-bold text-gray-900">
                {t("migration.breadcrumb_status")}
              </h4>
              <p className="text-sm text-gray-600">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("migration.breadcrumb_desc"),
                  }}
                />
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs mt-1">
              2
            </div>
            <div>
              <h4 className="font-bold text-gray-900">
                {t("migration.action_names")}
              </h4>
              <p className="text-sm text-gray-600">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("migration.action_desc"),
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProTip>{t("migration.protip")}</ProTip>

      <DocsNavigation />
    </div>
  );
}
