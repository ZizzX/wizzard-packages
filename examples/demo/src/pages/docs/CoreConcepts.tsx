import { useVersion } from "../../context/VersionContext";
import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function CoreConcepts() {
  const { version } = useVersion();
  const { language } = useTranslation();
  const isV2 = version === "2.0.0";
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      {language === "ru" ? (
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Основные концепции
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Архитектура, строительные блоки и философия работы
            <code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono ml-1">
              wizzard-stepper-react
            </code>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Core Concepts
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Architecture, building blocks, and the philosophy behind
            <code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono ml-1">
              wizzard-stepper-react
            </code>
            .
          </p>
        </div>
      )}

      {/* 1. The Factory Pattern */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Паттерн Factory (Фабрика)"
              : "The Factory Pattern"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru"
              ? isV2
                ? "В версии 2.0.0 библиотека использует паттерн Factory (Фабрика) для генерации полностью типизированных хуков. Это исключает необходимость ручного приведения типов и гарантирует, что ваш стор, экшены и селекторы всегда синхронизированы со схемой данных."
                : "В legacy-версии v1 используется стандартный WizardProvider и хук useWizard. Это проще для маленьких проектов, но лишено строгой типизации и оптимизаций производительности, доступных в v2."
              : isV2
                ? "In version 2.0.0, the library uses the Factory Pattern to generate fully typesafe hooks. This eliminates the need for manual type casting and ensures your store, actions, and selectors are always in sync with your data schema."
                : "In the legacy v1 version, a standard WizardProvider and useWizard hook are used. This is simpler for small projects but lacks the strict typing and performance optimizations available in v2."}
          </p>
        </div>
        {isV2 && (
          <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
            {/* V2 Code Example */}
            <pre className="space-y-1">
              <div className="text-purple-400">
                import <span className="text-emerald-400">{"{ "}</span>{" "}
                <span className="text-blue-400">createWizardFactory</span>{" "}
                <span className="text-emerald-400">{" }"}</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-amber-400">'wizzard-stepper-react'</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="mt-4 text-purple-400">
                interface <span className="text-amber-400">MySchema</span>{" "}
                <span className="text-emerald-400">{"{ "}</span>
                <span className="text-indigo-400">step1</span>
                <span className="text-emerald-400">: string; {"}"}</span>
              </div>
              <div className="mt-4 text-gray-500">
                // Generates perfectly typed hooks
              </div>
              <div className="text-purple-400">
                export const <span className="text-emerald-400">{"{ "}</span>{" "}
                <span className="text-indigo-400">
                  WizardProvider, useWizard, useWizardValue
                </span>{" "}
                <span className="text-emerald-400">{" }"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-blue-400">createWizardFactory</span>
                <span className="text-emerald-400">&lt;</span>
                <span className="text-amber-400">MySchema</span>
                <span className="text-emerald-400">&gt;();</span>
              </div>
            </pre>
          </div>
        )}
        {!isV2 && (
          <div className="bg-gray-100 rounded-2xl p-6 font-mono text-xs overflow-x-auto">
            {/* V1 Code Example */}
            <pre>
              {`import { WizardProvider, useWizard } from 'wizzard-stepper-react';

const App = () => (
  <WizardProvider>
    <MyWizard />
  </WizardProvider>
);`}
            </pre>
          </div>
        )}
      </section>

      {/* 2. Step Configuration */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Сложная логика шагов" : "Advanced Step Logic"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru" ? (
              <>
                Шаги — это не просто список. Они поддерживают{" "}
                <strong className="text-gray-900">условное ветвление</strong>,{" "}
                <strong className="text-gray-900">кастомную валидацию</strong> и{" "}
                <strong className="text-gray-900">
                  динамическое сопоставление компонентов
                </strong>
                .
              </>
            ) : (
              <>
                Steps are more than just a list. They support{" "}
                <strong className="text-gray-900">conditional branching</strong>
                , <strong className="text-gray-900">custom validation</strong>,
                and{" "}
                <strong className="text-gray-900">
                  dynamic component mapping
                </strong>
                .
              </>
            )}
          </p>
        </div>
        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-1">
            <div className="text-purple-400">
              const <span className="text-indigo-400">config</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-4 text-indigo-400">
              steps<span className="text-emerald-400">: [</span>
            </div>
            <div className="pl-8 text-gray-300">
              <span className="text-gray-500">// 1. Standard Step</span>
            </div>
            <div className="pl-8 text-gray-300">
              <span className="text-emerald-400">{"{ "}</span>{" "}
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">"intro"</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-400">label</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">"Welcome"</span>{" "}
              <span className="text-emerald-400">{" }"}</span>
              <span className="text-emerald-400">,</span>
            </div>

            <div className="pl-8 text-gray-300 mt-2">
              <span className="text-gray-500">
                // 2. Step with Dependencies
              </span>
            </div>
            <div className="pl-8 text-emerald-400">{"{"}</div>
            <div className="pl-12 text-gray-300">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">"payment"</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12 text-gray-300">
              <span className="text-indigo-300">dependsOn</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-emerald-400">[</span>
              <span className="text-amber-400">"plan"</span>
              <span className="text-emerald-400">],</span>{" "}
              <span className="text-gray-500">// Reset if plan changes</span>
            </div>
            <div className="pl-12 text-gray-300">
              <span className="text-indigo-300">clearData</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-emerald-400">[</span>
              <span className="text-amber-400">"cardInfo"</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-amber-400">"billingAddr"</span>
              <span className="text-emerald-400">],</span>
            </div>
            <div className="pl-12 text-gray-300">
              <span className="text-indigo-300">label</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">"Payment"</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12 text-gray-500">
              // Can be synchronous or ASYNC
            </div>
            <div className="pl-12 text-indigo-400">
              <span className="text-indigo-300">condition</span>
              <span className="text-emerald-400">: async (</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">) =&gt;</span>{" "}
              <span className="text-purple-400">await</span> checkPermission
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">),</span>
            </div>
            <div className="pl-12 text-gray-500">
              // Guard: prevent leaving if validation fails
            </div>
            <div className="pl-12 text-indigo-400">
              <span className="text-indigo-300">beforeLeave</span>
              <span className="text-emerald-400">: async (</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">dir</span>
              <span className="text-emerald-400">) =&gt;</span>{" "}
              <span className="text-indigo-300">dir</span>{" "}
              <span className="text-purple-400">===</span>{" "}
              <span className="text-amber-400">'next'</span>{" "}
              <span className="text-purple-400">?</span>{" "}
              <span className="text-purple-400">await</span> confirm
              <span className="text-emerald-400">() :</span>{" "}
              <span className="text-rose-400">true</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12 text-gray-300">
              <span className="text-indigo-300">validationAdapter</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-amber-400">ZodAdapter</span>
              <span className="text-emerald-400">(</span>paymentSchema
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-8 text-emerald-400">{"}"}</div>
            <div className="pl-4 text-emerald-400">
              ]<span className="text-emerald-400">,</span>
            </div>
            <div className="pl-4 text-gray-500">// Global config</div>
            <div className="pl-4 text-gray-300">
              <span className="text-indigo-300">validationMode</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'onChange'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-indigo-300">onStepChange</span>
              <span className="text-emerald-400">: (</span>
              <span className="text-indigo-300">from</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">to</span>
              <span className="text-emerald-400">) =&gt;</span>{" "}
              <span className="text-blue-400">console</span>.
              <span className="text-blue-400">log</span>
              <span className="text-emerald-400">(</span>
              <span className="text-amber-400">"Moved from "</span>{" "}
              <span className="text-purple-400">+</span>{" "}
              <span className="text-indigo-300">from</span>{" "}
              <span className="text-purple-400">+</span>{" "}
              <span className="text-amber-400">" to "</span>{" "}
              <span className="text-purple-400">+</span>{" "}
              <span className="text-indigo-300">to</span>
              <span className="text-emerald-400">)</span>
            </div>
            <div className="text-emerald-400">{"}"}</div>
            <span className="text-emerald-400">;</span>
          </pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors">
            <h4 className="font-bold text-gray-900 mb-2">
              {language === "ru" ? "Conditions (Условия)" : "Conditions"}
            </h4>
            <p className="text-sm text-gray-500">
              {language === "ru" ? (
                <>
                  Динамическая маршрутизация на основе данных. Поддерживает{" "}
                  <strong className="text-indigo-600">Async</strong> проверки
                  прав на стороне сервера или фича-флагов.
                </>
              ) : (
                <>
                  Data-driven dynamic routing. Supports{" "}
                  <strong className="text-indigo-600">Async</strong> server-side
                  permission checks or feature flags.
                </>
              )}
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors">
            <h4 className="font-bold text-gray-900 mb-2">
              {language === "ru" ? "Guards (Защита)" : "Guards"}
            </h4>
            <p className="text-sm text-gray-500">
              {language === "ru" ? (
                <>
                  Используйте{" "}
                  <code className="text-xs text-indigo-500 bg-indigo-50 px-1 rounded">
                    beforeLeave
                  </code>{" "}
                  для блокировки перехода. Идеально для предупреждений о
                  несохраненных данных.
                </>
              ) : (
                <>
                  Use{" "}
                  <code className="text-xs text-indigo-500 bg-indigo-50 px-1 rounded">
                    beforeLeave
                  </code>{" "}
                  to block transitions. Perfect for unsaved changes warnings.
                </>
              )}
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors">
            <h4 className="font-bold text-gray-900 mb-2">
              {language === "ru" ? "Lifecycle (Жизненный цикл)" : "Lifecycle"}
            </h4>
            <p className="text-sm text-gray-500">
              {language === "ru" ? (
                <>
                  Хук{" "}
                  <code className="text-xs text-indigo-500 bg-indigo-50 px-1 rounded">
                    onStepChange
                  </code>{" "}
                  для аналитики, настройки роутинга или запуска побочных
                  эффектов.
                </>
              ) : (
                <>
                  The{" "}
                  <code className="text-xs text-indigo-500 bg-indigo-50 px-1 rounded">
                    onStepChange
                  </code>{" "}
                  hook for analytics, routing adjustments, or triggering side
                  effects.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 2b. The Navigation Lifecycle */}
      <section className="space-y-8 bg-indigo-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            {language === "ru"
              ? "Жизненный цикл навигации"
              : "Navigation Lifecycle"}
          </h2>
          <p className="text-indigo-200 leading-relaxed max-w-2xl">
            {language === "ru" ? (
              <>
                Когда вы вызываете{" "}
                <code className="bg-white/10 px-1 rounded text-white font-mono">
                  goToNextStep()
                </code>
                , библиотека запускает строго упорядоченный «Протокол
                безопасности» для обеспечения целостности состояния и
                оптимизации сетевого трафика.
              </>
            ) : (
              <>
                When you call{" "}
                <code className="bg-white/10 px-1 rounded text-white font-mono">
                  goToNextStep()
                </code>
                , the library triggers a strictly ordered "Security Protocol" to
                ensure state integrity and optimize network traffic.
              </>
            )}
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              id: "01",
              title_ru: "Валидация",
              title_en: "Validation",
              desc_ru:
                "Запускается адаптер текущего шага. Навигация немедленно прерывается, если данные неверны.",
              desc_en:
                "Runs the current step's adapter. Navigation is immediately aborted if data is invalid.",
              color: "bg-rose-500",
            },
            {
              id: "02",
              title_ru: "Условия",
              title_en: "Conditions",
              desc_ru:
                "Видимость следующих шагов пересчитывается. Асинхронные условия ожидают завершения.",
              desc_en:
                "Re-calculates visibility for upcoming steps. Async conditions await completion.",
              color: "bg-amber-500",
            },
            {
              id: "03",
              title_ru: "Защита",
              title_en: "Guards",
              desc_ru:
                "Выполняются хуки beforeLeave, которые могут разрешить или заблокировать выход из шага.",
              desc_en:
                "Executes beforeLeave hooks, which can either permit or block leaving the step.",
              color: "bg-emerald-500",
            },
            {
              id: "04",
              title_ru: "Обновление",
              title_en: "Update",
              desc_ru:
                "Стейт обновляется, прогресс пересчитывается, и, если нужно, изменяется URL.",
              desc_en:
                "Updates state, recalculates progress, and updates the URL if necessary.",
              color: "bg-sky-500",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl space-y-4 shadow-lg"
            >
              <div
                className={`${item.color} w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black`}
              >
                {item.id}
              </div>
              <h4 className="font-bold text-lg">
                {language === "ru" ? item.title_ru : item.title_en}
              </h4>
              <p className="text-xs text-indigo-100/60 leading-relaxed">
                {language === "ru" ? item.desc_ru : item.desc_en}
              </p>
            </div>
          ))}
        </div>

        <div className="relative z-10 p-4 bg-indigo-950/50 rounded-xl border border-white/5">
          <p className="text-xs text-indigo-300 italic text-center leading-relaxed">
            {language === "ru" ? (
              <>
                💡 <strong>Почему такой порядок?</strong> Выполняя валидацию
                первой, мы предотвращаем ненужные API-вызовы в условиях или
                защитных хуках, если данные пользователя уже содержат ошибки.
              </>
            ) : (
              <>
                💡 <strong>Why this order?</strong> By running validation first,
                we prevent unnecessary API calls in conditions or guard hooks if
                the user data already contains errors.
              </>
            )}
          </p>
        </div>
      </section>

      {/* 3. Deep-Dive: Step Status */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Отслеживание прогресса" : "Progress Tracking"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          {language === "ru"
            ? "Визард автоматически отслеживает статус каждого шага в потоке. Эти данные можно использовать для создания продвинутых сайдбаров, индикаторов прогресса или чек-листов."
            : "The wizard automatically tracks the status of each step in the flow. This data can be used to create advanced sidebars, progress indicators, or checklists."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all">
            <code className="text-indigo-700 font-bold block mb-2">
              visitedSteps
            </code>
            <p className="text-xs text-indigo-600/80 leading-relaxed">
              {language === "ru"
                ? "Шаги, на которые пользователь физически переходил."
                : "Steps that the user has physically visited."}
            </p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all">
            <code className="text-emerald-700 font-bold block mb-2">
              completedSteps
            </code>
            <p className="text-xs text-emerald-600/80 leading-relaxed">
              {language === "ru" ? (
                <>
                  Шаги, успешно пройденные через{" "}
                  <code className="text-xs font-mono">goToNextStep</code>.
                </>
              ) : (
                <>
                  Steps successfully passed via{" "}
                  <code className="text-xs font-mono">goToNextStep</code>.
                </>
              )}
            </p>
          </div>
          <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 hover:shadow-lg transition-all">
            <code className="text-rose-700 font-bold block mb-2">
              errorSteps
            </code>
            <p className="text-xs text-rose-600/80 leading-relaxed">
              {language === "ru"
                ? "Шаги с активными ошибками валидации, требующие внимания."
                : "Steps with active validation errors requiring attention."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Global vs Step State */}
      <section className="space-y-6 bg-gray-50 -mx-6 px-6 py-12 md:rounded-3xl border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold">
            4
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Архитектура данных" : "Data Architecture"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              {language === "ru"
                ? "Визард поддерживает единое **Консолидированное состояние (Unified State)**. В отличие от традиционных форм, где каждая страница имеет свой стейт, `wizzard-stepper-react` хранит всё в одном месте."
                : "The wizard maintains a **Unified State**. Unlike traditional forms where each page has its own state, `wizzard-stepper-react` stores everything in one place."}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {language === "ru"
                  ? "Никакой потери данных при переходах"
                  : "No data loss during transitions"}
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {language === "ru"
                  ? "Поддержка кросс-шаговой валидации"
                  : "Cross-step validation support"}
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {language === "ru"
                  ? "Обновление через dot-notation:"
                  : "Updates via dot-notation:"}{" "}
                <code className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1 rounded">
                  setData('user.profile.bio', '...')
                </code>
              </li>
            </ul>
          </div>
          <div className="bg-gray-950 p-8 rounded-3xl font-mono text-xs shadow-2xl ring-1 ring-white/10 overflow-x-auto">
            <div className="text-gray-500 mb-4">
              // Atomic Updates & Deep Merging
            </div>
            <pre className="space-y-1">
              <div>
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-indigo-400">"personal"</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-emerald-400">{"{ "}</span>
                <span className="text-indigo-300">"name"</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-400">"John"</span>
                <span className="text-emerald-400">{" },"}</span>
              </div>
              <div className="pl-4">
                <span className="text-indigo-400">"plan"</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-400">"premium"</span>
                <span className="text-emerald-400">,</span>
              </div>
              <div className="pl-4">
                <span className="text-indigo-400">"payment"</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-emerald-400">{"{ "}</span>
                <span className="text-indigo-300">"status"</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-rose-400">true</span>
                <span className="text-emerald-400">{" }"}</span>
              </div>
              <div>
                <span className="text-emerald-400">{"}"}</span>
              </div>
            </pre>
          </div>
        </div>
      </section>

      {/* 5. Validation Deep-Dive */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold">
            5
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Адаптеры валидации" : "Validation Adapters"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru" ? (
              <>
                Мы придерживаемся политики библиотеки-агностика в вопросах
                валидации. Используете ли вы{" "}
                <strong className="text-gray-900">Zod</strong>,{" "}
                <strong className="text-gray-900">Yup</strong> или{" "}
                <strong className="text-gray-900">обычные функции</strong> — всё
                будет работать, пока соблюдается интерфейс{" "}
                <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded">
                  IValidatorAdapter
                </code>
                .
              </>
            ) : (
              <>
                We maintain a library-agnostic policy regarding validation.
                Whether you use <strong className="text-gray-900">Zod</strong>,{" "}
                <strong className="text-gray-900">Yup</strong>, or{" "}
                <strong className="text-gray-900">plain functions</strong> —
                everything will work as long as the{" "}
                <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded">
                  IValidatorAdapter
                </code>{" "}
                interface is implemented.
              </>
            )}
          </p>
        </div>
        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <div className="text-gray-500 mb-2">
            // The mandatory interface for all adapters
          </div>
          <pre className="space-y-1">
            <div className="text-purple-400">
              interface{" "}
              <span className="text-amber-400">IValidatorAdapter</span>
              <span className="text-emerald-400">&lt;</span>
              <span className="text-indigo-300">TData</span>
              <span className="text-emerald-400">&gt;</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-indigo-400">validate</span>
              <span className="text-emerald-400">: (</span>data
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-indigo-300">TData</span>
              <span className="text-emerald-400">) =&gt;</span>{" "}
              <span className="text-rose-400">Promise</span>
              <span className="text-emerald-400">&lt;</span>
              <span className="text-amber-400">ValidationResult</span>
              <span className="text-emerald-400">&gt;</span>{" "}
              <span className="text-emerald-400">|</span>{" "}
              <span className="text-amber-400">ValidationResult</span>
              <span className="text-emerald-400">;</span>
            </div>
            <div className="text-emerald-400">{"}"}</div>

            <div className="mt-4 text-purple-400">
              type <span className="text-amber-400">ValidationResult</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-indigo-400">isValid</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-rose-400">boolean</span>
              <span className="text-emerald-400">;</span>
            </div>
            <div className="pl-4 text-gray-300">
              <span className="text-indigo-400">errors</span>
              <span className="text-emerald-400">?:</span>{" "}
              <span className="text-rose-400">Record</span>
              <span className="text-emerald-400">&lt;</span>
              <span className="text-rose-400">string</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-rose-400">string</span>
              <span className="text-emerald-400">&gt;;</span>{" "}
              <span className="text-gray-500">
                // {'{ "field.path": "Message" }'}
              </span>
            </div>
            <div className="text-emerald-400">{"}"}</div>
          </pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2 text-gray-900">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-black uppercase tracking-tighter">
                Official
              </span>
              {language === "ru" ? "Стандартные адаптеры" : "Official Adapters"}
            </h4>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
              <pre className="space-y-3">
                <div className="text-gray-300">
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-amber-400">ZodAdapter</span>
                  <span className="text-gray-400">(</span>schema
                  <span className="text-gray-400">)</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-amber-400">YupAdapter</span>
                  <span className="text-gray-400">(</span>schema
                  <span className="text-gray-400">)</span>
                </div>
              </pre>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2 text-gray-900">
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-black uppercase tracking-tighter">
                Custom
              </span>
              {language === "ru" ? "Ручная валидация" : "Custom Validation"}
            </h4>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
              <pre className="space-y-1">
                <div className="text-purple-400">
                  const <span className="text-indigo-400">myAdapter</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-amber-400">IValidatorAdapter</span>
                  <span className="text-emerald-400">&lt;</span>
                  <span className="text-indigo-300">MyData</span>
                  <span className="text-emerald-400">&gt;</span>{" "}
                  <span className="text-emerald-400">=</span>{" "}
                  <span className="text-emerald-400">{"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">validate</span>
                  <span className="text-emerald-400">: (</span>
                  <span className="text-indigo-300">data</span>
                  <span className="text-emerald-400">)</span>{" "}
                  <span className="text-purple-400">=&gt;</span>{" "}
                  <span className="text-emerald-400">{"{"}</span>
                </div>
                <div className="pl-8 text-gray-300">
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-emerald-400">(</span>
                  <span className="text-emerald-400">!</span>
                  <span className="text-indigo-300">data</span>
                  <span className="text-emerald-400">.</span>
                  <span className="text-indigo-300">email</span>
                  <span className="text-emerald-400">?.</span>
                  <span className="text-indigo-400">includes</span>
                  <span className="text-emerald-400">(</span>
                  <span className="text-amber-400">'@'</span>
                  <span className="text-emerald-400">)</span>
                  <span className="text-emerald-400">)</span>{" "}
                  <span className="text-emerald-400">{"{"}</span>
                </div>
                <div className="pl-12">
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-emerald-400">{"{"}</span>
                </div>
                <div className="pl-16 text-gray-300">
                  <span className="text-indigo-400">isValid</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-rose-400">false</span>
                  <span className="text-emerald-400">,</span>
                </div>
                <div className="pl-16 text-gray-300">
                  <span className="text-indigo-400">errors</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-emerald-400">{"{"}</span>{" "}
                  <span className="text-indigo-300">email</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-amber-400">"Invalid email"</span>{" "}
                  <span className="text-emerald-400">{"}"}</span>
                </div>
                <div className="pl-12 text-emerald-400">{"};"}</div>
                <div className="pl-8 text-emerald-400">{"}"}</div>
                <div className="pl-8">
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-emerald-400">{"{"}</span>{" "}
                  <span className="text-indigo-400">isValid</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-rose-400">true</span>{" "}
                  <span className="text-emerald-400">{"}"}</span>
                  <span className="text-emerald-400">;</span>
                </div>
                <div className="pl-4 text-emerald-400">{"}"}</div>
                <div className="text-emerald-400">{"};"}</div>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Persistence Strategies */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold">
            6
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Сохранение состояния (Persistence)"
              : "Persistence Strategies"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru"
              ? "Выбирайте, когда и где сохранять ваши данные. Вы даже можете комбинировать адаптеры (например, сохранять черновики в Memory, а финальный шаг оплаты — в LocalStorage)."
              : "Choose when and where to save your data. You can even combine adapters (e.g., save drafts in Memory and the final payment step in LocalStorage)."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 hover:border-amber-100 transition-colors">
            <h4 className="font-bold text-gray-900">
              {language === "ru"
                ? "Режимы (Persistence Modes)"
                : "Persistence Modes"}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <code className="text-indigo-600 font-mono">onStepChange</code>
                <span className="text-gray-400">
                  {language === "ru" ? "После смены шага" : "After step change"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <code className="text-indigo-600 font-mono">onChange</code>
                <span className="text-gray-400">
                  {language === "ru"
                    ? "На каждое нажатие клавиши"
                    : "On every keystroke"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <code className="text-indigo-600 font-mono">manual</code>
                <span className="text-gray-400">
                  {language === "ru"
                    ? "Ручной вызов save()"
                    : "Manual save() call"}
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 hover:border-amber-100 transition-colors">
            <h4 className="font-bold text-gray-900">
              {language === "ru" ? "Адаптеры" : "Adapters"}
            </h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <strong>LocalStorageAdapter</strong>:{" "}
                {language === "ru"
                  ? "Сохранение между сессиями."
                  : "Persists between sessions."}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <strong>MemoryAdapter</strong>:{" "}
                {language === "ru"
                  ? "Временное, отлично для тестов."
                  : "Temporary, great for testing."}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <strong>CustomAdapter</strong>:{" "}
                {language === "ru"
                  ? "Привязка к API или БД."
                  : "Link to API or database."}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Persistence Adapter Implementation */}
        <div className="space-y-4 pt-4">
          <h4 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-black uppercase tracking-tighter">
              Custom
            </span>
            {language === "ru"
              ? "Создание адаптера персистентности"
              : "Creating a Persistence Adapter"}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {language === "ru" ? (
              <>
                Чтобы создать кастомный адаптер (например, для Firebase или
                Redis), реализуйте интерфейс
                <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded ml-1">
                  IPersistenceAdapter
                </code>
                .
              </>
            ) : (
              <>
                To create a custom adapter (e.g., for Firebase or Redis),
                implement the
                <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded ml-1">
                  IPersistenceAdapter
                </code>
                interface.
              </>
            )}
          </p>
          <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
            <pre className="space-y-1">
              <div className="text-purple-400">
                interface{" "}
                <span className="text-amber-400">IPersistenceAdapter</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-4 text-gray-300">
                <span className="text-indigo-400">saveStep</span>
                <span className="text-emerald-400">: &lt;</span>
                <span className="text-indigo-300">T</span>
                <span className="text-emerald-400">&gt;(</span>
                <span className="text-indigo-300">stepId</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-rose-400">string</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">data</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">T</span>
                <span className="text-emerald-400">) =&gt;</span>{" "}
                <span className="text-rose-400">void</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pl-4 text-gray-300">
                <span className="text-indigo-400">getStep</span>
                <span className="text-emerald-400">: &lt;</span>
                <span className="text-indigo-300">T</span>
                <span className="text-emerald-400">&gt;(</span>
                <span className="text-indigo-300">stepId</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-rose-400">string</span>
                <span className="text-emerald-400">) =&gt;</span>{" "}
                <span className="text-indigo-300">T</span>{" "}
                <span className="text-emerald-400">|</span>{" "}
                <span className="text-rose-400">undefined</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pl-4 text-gray-300">
                <span className="text-indigo-400">clear</span>
                <span className="text-emerald-400">: () =&gt;</span>{" "}
                <span className="text-rose-400">void</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="text-emerald-400">{"}"}</div>

              <div className="mt-6 text-purple-400">
                class <span className="text-amber-400">CloudAdapter</span>{" "}
                <span className="text-purple-400">implements</span>{" "}
                <span className="text-amber-400">IPersistenceAdapter</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-4 text-gray-300">
                <span className="text-indigo-400">saveStep</span>
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">stepId</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">data</span>
                <span className="text-emerald-400">) {"{"}</span>
              </div>
              <div className="pl-8 text-gray-500">
                // Sync with cloud database
              </div>
              <div className="pl-8 text-gray-300">
                <span className="text-blue-400">api</span>
                <span className="text-emerald-400">.</span>
                <span className="text-blue-400">post</span>
                <span className="text-emerald-400">(</span>
                <span className="text-amber-400">"/steps/"</span>{" "}
                <span className="text-purple-400">+</span>{" "}
                <span className="text-indigo-300">stepId</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">data</span>
                <span className="text-emerald-400">);</span>
              </div>
              <div className="pl-4 text-emerald-400">{"}"}</div>
              <div className="pl-4 text-gray-300">
                <span className="text-indigo-400">getStep</span>
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">stepId</span>
                <span className="text-emerald-400">) {"{"}</span>{" "}
                <span className="text-gray-500">/* ... */</span>{" "}
                <span className="text-emerald-400">{"}"}</span>
              </div>
              <div className="pl-4 text-gray-300">
                <span className="text-indigo-400">clear</span>
                <span className="text-emerald-400">() {"{"}</span>{" "}
                <span className="text-gray-500">/* ... */</span>{" "}
                <span className="text-emerald-400">{"}"}</span>
              </div>
              <div className="text-emerald-400">{"}"}</div>
            </pre>
          </div>
        </div>
      </section>

      {/* 7. Hydration & Entry Points */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">
            7
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Гидратация и входные точки"
              : "Hydration & Entry Points"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru"
              ? "Вы можете инициализировать визард данными из API или отправить пользователя сразу на конкретный шаг. Это критически важно для сценариев редактирования или функций «Продолжить позже»."
              : 'You can initialize the wizard with data from an API or send the user directly to a specific step. This is critical for edit scenarios or "Continue later" features.'}
          </p>
        </div>
        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-1">
            <div className="text-emerald-400">
              &lt;<span className="text-amber-400">WizardProvider</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">config</span>
              <span className="text-emerald-400">=</span>
              <span className="text-emerald-400">{"{"}</span>
              <span className="text-indigo-300">config</span>
              <span className="text-emerald-400">{"}"}</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">initialData</span>
              <span className="text-emerald-400">=</span>
              <span className="text-emerald-400">{"{ { "}</span>
              <span className="text-indigo-300">name</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">"Aziz"</span>
              <span className="text-emerald-400">,</span>
              <span className="text-indigo-300">email</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">"hi@aziz.com"</span>
              <span className="text-emerald-400">{" } }"}</span>
              <span className="text-gray-500 ml-4">// Prefill from API</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">initialStepId</span>
              <span className="text-emerald-400">=</span>
              <span className="text-amber-400">"payment"</span>
              <span className="text-gray-500 ml-4">// Deep-link directly</span>
            </div>
            <div className="text-emerald-400">&gt;</div>
            <div className="pl-4 text-gray-300">
              &lt;<span className="text-amber-400">MyWizard</span> /&gt;
            </div>
            <div className="text-emerald-400">
              &lt;/<span className="text-amber-400">WizardProvider</span>&gt;
            </div>
          </pre>
        </div>
        <ProTip>
          {language === "ru" ? (
            <>
              При использовании{" "}
              <code className="text-xs text-indigo-500 font-mono">
                initialStepId
              </code>{" "}
              визард достаточно умен, чтобы всё равно проверить условия для
              предыдущих шагов, гарантируя целостность состояния.
            </>
          ) : (
            <>
              When using{" "}
              <code className="text-xs text-indigo-500 font-mono">
                initialStepId
              </code>
              , the wizard is smart enough to still check conditions for
              previous steps, ensuring state integrity.
            </>
          )}
        </ProTip>
      </section>

      {/* Navigation */}
      <DocsNavigation
        prev={{
          label: language === "ru" ? "Быстрый старт" : "Quick Start",
          href: "/docs/quickstart",
        }}
        next={{
          label: language === "ru" ? "API Хуков" : "Hooks API",
          href: "/docs/hooks",
        }}
      />
    </div>
  );
}
