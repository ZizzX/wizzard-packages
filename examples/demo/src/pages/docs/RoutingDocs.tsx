import DocsNavigation from "../../components/DocsNavigation";
import { useTranslation } from "../../context/LanguageContext";

export default function RoutingDocs() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === "ru"
            ? "Роутинг и синхронизация URL"
            : "Routing & URL Sync"}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "Узнайте, как связать ваш визард с URL браузера, обеспечивая прямые ссылки (deep linking), работу кнопки «Назад» и SEO-оптимизацию."
            : "Learn how to sync your wizard with the browser URL to enable deep linking, back-button support, and SEO optimization."}
        </p>
      </section>

      {/* 1. URL Synchronization */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Синхронизация с URL" : "URL Synchronization"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Чтобы поддерживать URL в синхронизации с текущим шагом,
              используйте колбэк
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                onStepChange
              </code>
              в конфиге визарда.
            </>
          ) : (
            <>
              To keep the URL in sync with the current step, use the
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                onStepChange
              </code>
              callback in the wizard config.
            </>
          )}
        </p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-300">
                {language === "ru"
                  ? "// Пример с использованием react-router-dom"
                  : "// Example using react-router-dom"}
              </span>
            </div>
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">navigate</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">useNavigate</span>
              <span className="text-emerald-400">();</span>
            </div>
            <br />
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">config</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">IWizardConfig</span>{" "}
              <span className="text-emerald-400">= {"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">onStepChange</span>
              <span className="text-emerald-400">: (</span>
              <span className="text-indigo-300">prev</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">next</span>
              <span className="text-emerald-400">) =&gt; {"{"}</span>
            </div>
            <div className="pl-8">
              <span className="text-indigo-300">navigate</span>
              <span className="text-emerald-400">(</span>
              <span className="text-amber-400">{"`"}/wizard/</span>
              <span className="text-emerald-400">{"${"}</span>
              <span className="text-indigo-300">next</span>
              <span className="text-emerald-400">{"}"}</span>
              <span className="text-amber-400">{"`"}</span>
              <span className="text-emerald-400">);</span>
            </div>
            <div className="pl-4 text-emerald-400">{" },"}</div>
            <div className="pl-4">
              <span className="text-indigo-400">steps</span>
              <span className="text-emerald-400">: [ ... ]</span>
            </div>
            <div className="text-emerald-400">{"};"}</div>
          </pre>
        </div>
      </section>

      {/* 2. Best Practices for URL State */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Зачем хранить состояние в URL?"
              : "Why Store State in URL?"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-indigo-100 transition-colors">
            <h4 className="font-bold text-gray-900">Deep Linking</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {language === "ru"
                ? "Пользователи могут делиться ссылками на конкретные шаги. При загрузке страницы инициализируйте визард через "
                : "Users can share links to specific steps. On page load, initialize the wizard via "}
              <code className="text-indigo-500 font-mono">initialStepId</code>
              {language === "ru"
                ? ", взятый из параметров URL."
                : " extracted from URL params."}
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-indigo-100 transition-colors">
            <h4 className="font-bold text-gray-900">
              {language === "ru"
                ? "Нативная кнопка «Назад»"
                : "Native Back Button"}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {language === "ru"
                ? "Когда шаги привязаны к путям URL, кнопка «Назад» в браузере работает автоматически! Визард будет естественным образом следовать за изменениями URL."
                : "When steps are bound to URL paths, the browser's Back button works out of the box! The wizard will naturally follow URL changes."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Next.js (App Router) Integration */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-sm text-[10px]">
            NEXT
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Next.js App Router
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              В Next.js используйте <strong>Client Boundary</strong> для логики
              визарда, но при этом вы можете передавать начальные данные из
              ваших <strong>Server Components</strong>.
            </>
          ) : (
            <>
              In Next.js, use a <strong>Client Boundary</strong> for the wizard
              logic, but you can pass initial data props from your{" "}
              <strong>Server Components</strong>.
            </>
          )}
        </p>

        <div className="bg-gray-100 rounded-3xl p-6 border border-gray-200 space-y-4 shadow-inner">
          <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-500 px-2">
            {language === "ru"
              ? 'Паттерн "Client-Side Wrapper"'
              : '"Client-Side Wrapper" Pattern'}
          </h4>
          <div className="bg-gray-900 p-6 rounded-2xl font-mono text-[11px] text-gray-300 border border-white/5 shadow-2xl">
            <span className="text-purple-600 font-bold">'use client';</span>
            <br />
            <br />
            <span className="text-gray-500">
              {language === "ru"
                ? "// Оберните логику визарда в клиентский компонент"
                : "// Wrap wizard logic in a client component"}
            </span>
            <br />
            <span className="text-purple-600">
              export default function
            </span>{" "}
            <span className="text-blue-600 font-bold">WizardPortal</span>
            <span className="text-gray-900">
              ({"{"} initialData {"}"}) {"{"}
            </span>
            <br />
            <span className="pl-4">
              <span className="text-purple-600">return</span> (
            </span>
            <br />
            <span className="pl-8">
              <span className="text-indigo-600">&lt;WizardProvider</span>{" "}
              initialData
              <span className="text-gray-900">
                ={"{"}initialData{"}"}
              </span>{" "}
              <span className="text-indigo-600">/&gt;</span>
            </span>
            <br />
            <span className="pl-4">);</span>
            <br />
            <span className="text-gray-900">{"}"}</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <DocsNavigation
        prev={{
          label: language === "ru" ? "Middleware" : "Middleware",
          path: "/docs/middleware",
        }}
        next={{
          label: language === "ru" ? "Отрисовка шагов" : "Step Rendering",
          path: "/docs/rendering",
        }}
      />
    </div>
  );
}
