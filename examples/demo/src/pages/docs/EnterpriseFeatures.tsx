import { Link } from "react-router-dom";
import DocsNavigation from "../../components/DocsNavigation";
import { useTranslation } from "../../context/LanguageContext";
import { VersionGuard } from "../../components/VersionGuard";

export default function EnterpriseFeatures() {
  const { language } = useTranslation();

  return (
    <VersionGuard minVersion="2.0.0">
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === "ru"
              ? "Enterprise Возможности"
              : "Enterprise Features"}
          </h1>
          <p className="text-lg text-gray-600">
            {language === "ru"
              ? "Расширенные возможности, разработанные для сложных, высоконадежных корпоративных приложений."
              : "Advanced capabilities designed for complex, high-reliability corporate applications."}
          </p>
        </div>

        <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-900">
              {language === "ru" ? "Посмотрите в действии" : "See it in action"}
            </h3>
            <p className="text-indigo-700 text-sm">
              {language === "ru"
                ? "Оцените полное демо с ветвлением, хлебными крошками и отслеживанием изменений."
                : "Experience the full demo with branching, breadcrumbs, and dirty tracking."}
            </p>
          </div>
          <Link
            to="/examples/enterprise"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md transition-colors whitespace-nowrap"
          >
            {language === "ru" ? "Открыть демо →" : "Open Live Demo →"}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Отслеживание изменений (Dirty State)"
              : "Dirty State Tracking"}
          </h2>
          <p className="text-gray-600">
            {language === "ru"
              ? "Предотвратите потерю данных, обнаруживая несохраненные изменения. Библиотека отслеживает изменения относительно "
              : "Prevent data loss by detecting unsaved changes. The library tracks modifications against "}
            <code>initialData</code>
            {language === "ru"
              ? " вплоть до гранулярных полей."
              : " down to granular fields."}
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
            <pre>
              {`// 1. Provide initial data to establish a baseline
<WizardProvider initialData={{ name: "John" }}>

// 2. Use the hook to track changes
const { isDirty, dirtyFields } = useWizard();

// 3. Display warnings if needed
if (isDirty) {
  console.log("Changed fields:", [...dirtyFields]);
}`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Хлебные крошки (Breadcrumbs)" : "Breadcrumbs"}
          </h2>
          <p className="text-gray-600">
            {language === "ru"
              ? "Автоматически генерируйте индикаторы навигации с правильным статусом для каждого шага."
              : "Automatically generate navigation indicators with correct status for each step."}
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
            <pre>
              {`const breadcrumbs = useBreadcrumbs();
            
// Returns array of:
// { 
//   id: string, 
//   label: string, 
//   status: 'visited' | 'current' | 'future' 
// }`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Авто-инвалидация" : "Auto-Invalidation"}
          </h2>
          <p className="text-gray-600">
            {language === "ru"
              ? "Поддерживайте целостность данных в сложных потоках. Если пользователь изменяет «родительское» поле (например, выбор ветки), зависимые шаги автоматически сбрасываются."
              : 'Maintain data integrity in complex flows. If a user changes a "parent" field (e.g., branching choice), dependent steps are automatically reset.'}
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
            <pre>
              {`// In your step configuration:
createStep({
  id: "shipping",
  label: "Shipping Details",
  // If 'country' changes, this step's data is cleared
  dependsOn: ["address.country"], 
})`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Разрешение конфликтов"
              : "Conflict Resolution"}
          </h2>
          <p className="text-gray-600">
            {language === "ru"
              ? "Обрабатывайте проблемы синхронизации между LocalStorage и данными сервера во время гидратации."
              : "Handle synchronization issues between LocalStorage and server data during hydration."}
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
            <pre>
              {`<WizardProvider 
  config={{ 
    persistence: { 
      type: 'session', 
      onConflict: 'merge' // or 'replace' | 'keep-local' 
    } 
  }} 
/>`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Адаптер аналитики" : "Analytics Adapter"}
          </h2>
          <p className="text-gray-600">
            {language === "ru"
              ? "Централизуйте отслеживание событий для переходов между шагами, ошибок и завершения."
              : "Centralize event tracking for step transitions, errors, and completion."}
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
            <pre>
              {`<WizardProvider 
  config={{ 
    analytics: { 
      onEvent: (name, payload) => sendToMixpanel(name, payload) 
    } 
  }} 
/>`}
            </pre>
          </div>
        </section>

        <DocsNavigation
          prev={{
            label:
              language === "ru" ? "Отложная отрисовка" : "Deferred Rendering",
            path: "/docs/deferred-rendering",
          }}
          next={{
            label: language === "ru" ? "Производительность" : "Performance",
            path: "/docs/performance",
          }}
        />
      </div>
    </VersionGuard>
  );
}
