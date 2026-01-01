import DocsNavigation from "../../components/DocsNavigation";
import { useTranslation } from "../../context/LanguageContext";

export default function StepRendering() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === "ru" ? "Отрисовка шагов" : "Step Rendering"}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru" ? (
            <>
              Сделайте ваш код чище, перейдя от ручных конструкций{" "}
              <code className="text-indigo-600 font-bold bg-indigo-50 px-1 rounded">
                switch
              </code>{" "}
              к декларативному рендереру шагов.
            </>
          ) : (
            <>
              Clean up your code by moving from manual{" "}
              <code className="text-indigo-600 font-bold bg-indigo-50 px-1 rounded">
                switch
              </code>{" "}
              statements to a declarative step renderer.
            </>
          )}
        </p>
      </section>

      {/* 1. Declarative UI */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Декларативный рендеринг"
              : "Declarative Rendering"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Вместо того чтобы вручную проверять{" "}
              <code className="text-indigo-600 font-mono font-bold bg-indigo-50 px-1 rounded">
                currentStep.id
              </code>
              , позвольте компоненту
              <code className="text-indigo-600 font-black ml-1">
                WizardStepRenderer
              </code>{" "}
              взять на себя оркестрацию UI.
            </>
          ) : (
            <>
              Instead of manually checking{" "}
              <code className="text-indigo-600 font-mono font-bold bg-indigo-50 px-1 rounded">
                currentStep.id
              </code>
              , let the
              <code className="text-indigo-600 font-black ml-1">
                WizardStepRenderer
              </code>{" "}
              component handle UI orchestration.
            </>
          )}
        </p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">steps</span>{" "}
              <span className="text-emerald-400">= [</span>
            </div>
            <div className="pl-4 text-emerald-400">{"{"}</div>
            <div className="pl-8">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'start'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">component</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-blue-400">StartComponent</span>
            </div>
            <div className="pl-4 text-emerald-400">{"},"}</div>
            <div className="pl-4 text-emerald-400">{"{"}</div>
            <div className="pl-8">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'end'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">component</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-blue-400">EndComponent</span>
            </div>
            <div className="pl-4 text-emerald-400">{"},"}</div>
            <div className="text-emerald-400">];</div>
            <br />
            <div>
              <span className="text-gray-500">
                {language === "ru"
                  ? "// В вашем приложении"
                  : "// In your application"}
              </span>
            </div>
            <div>
              <span className="text-emerald-400">&lt;</span>
              <span className="text-blue-400">WizardProvider</span>{" "}
              <span className="text-indigo-400">config</span>
              <span className="text-emerald-400">={"{"}</span>
              <span className="text-indigo-300">{"{"}</span>{" "}
              <span className="text-indigo-300">steps</span>{" "}
              <span className="text-indigo-300">{"}"}</span>
              <span className="text-emerald-400">{"}"}&gt;</span>
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">&lt;</span>
              <span className="text-blue-400">WizardStepRenderer</span>{" "}
              <span className="text-emerald-400">/&gt;</span>
            </div>
            <div>
              <span className="text-emerald-400">&lt;/</span>
              <span className="text-blue-400">WizardProvider</span>
              <span className="text-emerald-400">&gt;</span>
            </div>
          </pre>
        </div>
      </section>

      {/* 2. Shared Layout & Animations */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? (
              <>
                Сила пропса <code>wrapper</code>
              </>
            ) : (
              <>
                Power of the <code>wrapper</code> prop
              </>
            )}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Проп{" "}
              <code className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded mx-1 font-mono">
                wrapper
              </code>{" "}
              позволяет обернуть каждый шаг в общий макет или контейнер для
              анимации.
            </>
          ) : (
            <>
              The{" "}
              <code className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded mx-1 font-mono">
                wrapper
              </code>{" "}
              prop allows wrapping every step in a shared layout or animation
              container.
            </>
          )}
        </p>

        <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-white/10">
          {/* Decorative glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 bg-indigo-500/10 blur-3xl" />

          <div className="relative space-y-6">
            <h4 className="flex items-center gap-3 text-lg font-bold text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              {language === "ru"
                ? "Анимированные переходы"
                : "Animated Transitions"}
            </h4>

            <div className="rounded-2xl bg-black/60 p-8 font-mono text-[14px] leading-relaxed ring-1 ring-white/10 shadow-inner">
              <div className="space-y-2">
                <div>
                  <span className="text-emerald-400">&lt;</span>
                  <span className="text-blue-400">WizardStepRenderer</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">wrapper</span>
                  <span className="text-emerald-400">={"{"}</span>
                  <span className="text-emerald-400">
                    ({"{"} children {"}"})
                  </span>{" "}
                  <span className="text-purple-400">=&gt;</span>{" "}
                  <span className="text-emerald-400">(</span>
                </div>
                <div className="pl-8">
                  <span className="text-emerald-400">&lt;</span>
                  <span className="text-blue-400">motion.div</span>
                </div>
                <div className="pl-12">
                  <span className="text-indigo-400">initial</span>
                  <span className="text-emerald-400">={"{"}</span>
                  <span className="text-emerald-400">
                    {"{ opacity: 0, x: 20 }"}
                  </span>
                  <span className="text-emerald-400">{"}"}</span>
                </div>
                <div className="pl-12">
                  <span className="text-indigo-400">animate</span>
                  <span className="text-emerald-400">={"{"}</span>
                  <span className="text-emerald-400">
                    {"{ opacity: 1, x: 0 }"}
                  </span>
                  <span className="text-emerald-400">{"}"}</span>
                </div>
                <div className="pl-12">
                  <span className="text-indigo-400">exit</span>
                  <span className="text-emerald-400">={"{"}</span>
                  <span className="text-emerald-400">
                    {"{ opacity: 0, x: -20 }"}
                  </span>
                  <span className="text-emerald-400">{"}"}</span>
                </div>
                <div className="pl-8">
                  <span className="text-emerald-400">&gt;</span>
                </div>
                <div className="pl-12 text-gray-300">{"{ children }"}</div>
                <div className="pl-8">
                  <span className="text-emerald-400">&lt;/</span>
                  <span className="text-blue-400">motion.div</span>
                  <span className="text-emerald-400">&gt;</span>
                </div>
                <div className="pl-4">
                  <span className="text-emerald-400">{" )}"}</span>
                  <span className="text-emerald-400">{"}"}</span>
                </div>
                <div>
                  <span className="text-emerald-400">/&gt;</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 italic">
              {language === "ru" ? (
                <>
                  Используйте{" "}
                  <code className="text-indigo-300 font-mono">
                    framer-motion
                  </code>{" "}
                  для добавления плавных переходов между шагами всего
                  несколькими строками кода.
                </>
              ) : (
                <>
                  Use{" "}
                  <code className="text-indigo-300 font-mono">
                    framer-motion
                  </code>{" "}
                  to add smooth transitions between steps with just a few lines
                  of code.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Global Context Access */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Кастомные макеты" : "Custom Layouts"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                WizardStepRenderer
              </code>{" "}
              отрисовывает только <strong>активный</strong> компонент. Вам
              следует держать глобальные элементы управления (кнопки
              Назад/Далее) вне его, чтобы избежать их повторного монтирования
              (re-mount) на каждом шаге.
            </>
          ) : (
            <>
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                WizardStepRenderer
              </code>{" "}
              renders only the <strong>active</strong> component. You should
              keep global controls (Back/Next buttons) outside of it to avoid
              re-mounting them on each step.
            </>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-gray-100 p-8 rounded-2xl bg-gray-50/30">
          <div className="space-y-2">
            <h5 className="font-bold text-gray-800 text-sm">
              {language === "ru" ? "✅ Рекомендуемо" : "✅ Recommended"}
            </h5>
            <div className="text-[10px] font-mono p-4 bg-white border border-gray-200 rounded-xl space-y-1">
              <div>&lt;WizardProvider&gt;</div>
              <div className="pl-4 text-emerald-600">
                &lt;WizardStepRenderer /&gt;
              </div>
              <div className="pl-4 text-indigo-600">
                &lt;WizardControls /&gt;
              </div>
              <div>&lt;/WizardProvider&gt;</div>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-gray-800 text-sm italic opacity-60">
              {language === "ru" ? "❌ Не рекомендуется" : "❌ Not Recommended"}
            </h5>
            <div className="text-[10px] font-mono p-4 bg-white border border-gray-200 rounded-xl space-y-1 opacity-50">
              <div>&lt;WizardProvider&gt;</div>
              <div className="pl-4 text-emerald-600">
                &lt;WizardStepRenderer{" "}
              </div>
              <div className="pl-8">wrapper={"{ children => ("}</div>
              <div className="pl-12">{"<>"}</div>
              <div className="pl-16">{"{children}"}</div>
              <div className="pl-16">{"<WizardControls />"}</div>
              <div className="pl-12">{"</>"}</div>
              <div className="pl-8">{")}"}</div>
              <div className="pl-4">/&gt;</div>
              <div>&lt;/WizardProvider&gt;</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <DocsNavigation
        prev={{
          label: language === "ru" ? "Роутинг и URL" : "Routing & URL",
          path: "/docs/routing",
        }}
        next={{
          label:
            language === "ru" ? "Отложная отрисовка" : "Deferred Rendering",
          path: "/docs/deferred-rendering",
        }}
      />
    </div>
  );
}
