import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function Validation() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === "ru" ? "Мастерство валидации" : "Validation Mastery"}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "От простых синхронных проверок до сложных асинхронных API-запросов. Создавайте надежные формы без лишних усилий."
            : "From simple synchronous checks to complex async API requests. Build robust forms effortlessly."}
        </p>
      </section>

      {/* 1. Asynchronous Validation */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Асинхронная валидация"
              : "Asynchronous Validation"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Нужно проверить, занято ли имя пользователя? Наши адаптеры по
              своей природе <strong>async-native</strong>. Возврат
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                Promise
              </code>{" "}
              из адаптера автоматически переводит визард в состояние загрузки.
            </>
          ) : (
            <>
              Need to check if a username is taken? Our adapters are{" "}
              <strong>async-native</strong> by nature. Returning a
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                Promise
              </code>{" "}
              from an adapter automatically puts the wizard into a loading
              state.
            </>
          )}
        </p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">UsernameAdapter</span>{" "}
              <span className="text-emerald-400">= {"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">validate</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-purple-400">async</span>{" "}
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">) =&gt; {"{"}</span>
            </div>
            <div className="pl-8">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">isTaken</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-purple-400">await</span>{" "}
              <span className="text-blue-400">api</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">checkUser</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">username</span>
              <span className="text-emerald-400">);</span>
            </div>
            <div className="pl-8">
              <span className="text-purple-400">return</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">isValid</span>
              <span className="text-emerald-400">: !</span>
              <span className="text-indigo-300">isTaken</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">errors</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-indigo-300">isTaken</span>{" "}
              <span className="text-emerald-400">? {"{"}</span>{" "}
              <span className="text-indigo-400">username</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'Username already in use'</span>{" "}
              <span className="text-emerald-400">{"}"}</span>{" "}
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-emerald-400">undefined</span>
            </div>
            <div className="pl-8 text-emerald-400">{" };"}</div>
            <div className="pl-4 text-emerald-400">{" }"}</div>
            <div className="text-emerald-400">{"};"}</div>
          </pre>
        </div>

        <ProTip>
          {language === "ru" ? (
            <>
              Используйте флаг{" "}
              <code className="text-blue-900 font-black font-mono">
                isLoading
              </code>{" "}
              из
              <code className="text-blue-900 font-black font-mono ml-1">
                useWizard()
              </code>
              , чтобы отключать кнопку «Далее» на время выполнения асинхронных
              проверок.
            </>
          ) : (
            <>
              Use the{" "}
              <code className="text-blue-900 font-black font-mono">
                isLoading
              </code>{" "}
              flag from
              <code className="text-blue-900 font-black font-mono ml-1">
                useWizard()
              </code>{" "}
              to disable the "Next" button while async checks are running.
            </>
          )}
        </ProTip>
      </section>

      {/* 2. Validation Modes */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Режимы валидации" : "Validation Modes"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Контролируйте, <strong>когда</strong> должна запускаться логика
              валидации. Это критично для производительности и удобства
              пользователя. Используйте параметр{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                validationMode
              </code>{" "}
              глобально или для конкретного шага.
            </>
          ) : (
            <>
              Control <strong>when</strong> validation logic should run. This is
              critical for performance and UX. Use the{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                validationMode
              </code>{" "}
              parameter globally or per step.
            </>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:border-blue-200 transition-colors">
            <code className="text-blue-700 font-black block mb-2 uppercase tracking-widest text-[10px]">
              onChange
            </code>
            <p className="text-xs text-blue-600/80 leading-relaxed">
              {language === "ru"
                ? "Валидация при вводе (с дебаунсом). Лучшее для мгновенной обратной связи."
                : "Validation on input (with debounce). Best for instant feedback."}
            </p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-colors">
            <code className="text-emerald-700 font-black block mb-2 uppercase tracking-widest text-[10px]">
              onStepChange
            </code>
            <p className="text-xs text-emerald-600/80 leading-relaxed">
              {language === "ru"
                ? 'Проверка только при нажатии «Далее». Подходит для "тяжелых" форм.'
                : 'Validate only when "Next" is clicked. Good for "heavy" forms.'}
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
            <code className="text-gray-700 font-black block mb-2 uppercase tracking-widest text-[10px]">
              manual
            </code>
            <p className="text-xs text-gray-600/80 leading-relaxed">
              {language === "ru" ? (
                <>
                  Никакой автоматики. Запуск вручную через{" "}
                  <code className="text-xs font-mono">validateStep()</code>.
                </>
              ) : (
                <>
                  No automation. Manual trigger via{" "}
                  <code className="text-xs font-mono">validateStep()</code>.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">config</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">IWizardConfig</span>{" "}
              <span className="text-emerald-400">= {"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">steps</span>
              <span className="text-emerald-400">: [</span>
            </div>
            <div className="pl-8">
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'heavy-step'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12 text-gray-500">
              {language === "ru"
                ? "// Оптимизация: валидация только при клике на Next"
                : "// Optimization: validate only on Next click"}
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">validationMode</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'onStepChange'</span>
            </div>
            <div className="pl-8">
              <span className="text-emerald-400">{"}"}</span>
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">]</span>
            </div>
            <div className="text-emerald-400">{"};"}</div>
          </pre>
        </div>
      </section>

      {/* 3. Custom Adapters */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Создание кастомных адаптеров"
              : "Creating Custom Adapters"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Не используете Zod или Yup? Нет проблем. Просто реализуйте
              интерфейс
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                IValidatorAdapter
              </code>
              .
            </>
          ) : (
            <>
              Not using Zod or Yup? No problem. Just implement the
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                IValidatorAdapter
              </code>{" "}
              interface.
            </>
          )}
        </p>

        <div className="bg-white rounded-3xl p-8 border border-indigo-50 shadow-sm italic text-gray-500 font-medium text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
          {language === "ru"
            ? '"Библиотека работает в режиме headless. Ей не важно, как именно вы проводите валидацию, главное — вернуть объект ValidationResult."'
            : '"The library runs in headless mode. It doesn\'t care how you validate, as long as you return a ValidationResult object."'}
        </div>
      </section>

      {/* 4. UX & Performance */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            4
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "UX и производительность" : "UX & Performance"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {language === "ru"
                ? "Очистка ошибок при вводе"
                : "Clear errors on input"}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === "ru" ? (
                <>
                  При использовании режима{" "}
                  <code className="text-xs">onStepChange</code> ошибки обычно
                  остаются видимыми до следующей попытки перехода. Однако для
                  лучшего UX{" "}
                  <code className="text-indigo-600 font-bold">
                    wizzard-stepper-react
                  </code>{" "}
                  мгновенно скрывает ошибку поля, как только пользователь
                  начинает её исправлять (начинает печатать).
                </>
              ) : (
                <>
                  When using <code className="text-xs">onStepChange</code>,
                  errors usually persist until the next navigation attempt.
                  However, for better UX,{" "}
                  <code className="text-indigo-600 font-bold">
                    wizzard-stepper-react
                  </code>{" "}
                  instantly hides field errors as soon as the user starts fixing
                  them (starts typing).
                </>
              )}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              {language === "ru"
                ? "Структурный маппинг ошибок"
                : "Structural Error Mapping"}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === "ru" ? (
                <>
                  Если адаптер возвращает ошибку для <strong>всего шага</strong>{" "}
                  (например, результат <code className="font-mono">refine</code>{" "}
                  в Zod на корневом объекте), хук{" "}
                  <code className="text-indigo-600 font-bold">
                    useWizardError
                  </code>{" "}
                  автоматически сопоставляет её со всеми дочерними полями.
                  Больше никаких "молчаливых" блокировок!
                </>
              ) : (
                <>
                  If an adapter returns an error for the{" "}
                  <strong>entire step</strong> (e.g., Zod{" "}
                  <code className="font-mono">refine</code> on the root object),
                  the{" "}
                  <code className="text-indigo-600 font-bold">
                    useWizardError
                  </code>{" "}
                  hook automatically maps it to all child fields. No more
                  "silent" blockers!
                </>
              )}
            </p>
          </div>
        </div>

        <div className="bg-indigo-950 rounded-3xl p-8 shadow-2xl space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg
              className="w-6 h-6 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {language === "ru"
              ? "Жизненный цикл навигации и приоритеты"
              : "Navigation Lifecycle & Priorities"}
          </h3>
          <p className="text-indigo-200 text-sm leading-relaxed">
            {language === "ru"
              ? "Протокол безопасности: визард строго приоритизирует валидацию, чтобы гарантировать, что никакие побочные эффекты (асинхронные гарды или сетевые запросы) не будут выполнены, если текущее состояние формы невалидно."
              : "Security Protocol: The wizard strictly prioritizes validation to ensure no side effects (async guards or network requests) are executed if the current form state is invalid."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              {
                title: language === "ru" ? "1. Валидация" : "1. Validation",
                desc:
                  language === "ru"
                    ? "Проверка ограничений текущего шага"
                    : "Check current step constraints",
                color: "bg-rose-500",
              },
              {
                title: language === "ru" ? "2. Расчет" : "2. Calculation",
                desc:
                  language === "ru"
                    ? "Пересчет условий следующих шагов"
                    : "Recalculate next step conditions",
                color: "bg-indigo-500",
              },
              {
                title: language === "ru" ? "3. Guards" : "3. Guards",
                desc:
                  language === "ru"
                    ? "Выполнение beforeLeave предикатов"
                    : "Execute beforeLeave predicates",
                color: "bg-emerald-500",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div
                  className={`inline-block px-2 py-1 rounded text-[10px] font-bold text-white mb-2 ${step.color}`}
                >
                  {step.title}
                </div>
                <p className="text-[11px] text-white font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-indigo-300 italic text-center">
            {language === "ru"
              ? "* Если Шаг 1 не пройден, Шаги 2 и 3 полностью игнорируются."
              : "* If Step 1 fails, Steps 2 and 3 are ignored completely."}
          </p>
        </div>

        <ProTip>
          {language === "ru" ? (
            <>
              Используйте{" "}
              <code className="text-blue-900 font-black font-mono">
                debounceValidation
              </code>{" "}
              в
              <code className="text-blue-900 font-black font-mono ml-1">
                setData
              </code>
              , чтобы предотвратить блокировку UI-потока "тяжелыми" схемами при
              быстром вводе текста.
            </>
          ) : (
            <>
              Use{" "}
              <code className="text-blue-900 font-black font-mono">
                debounceValidation
              </code>{" "}
              in
              <code className="text-blue-900 font-black font-mono ml-1">
                setData
              </code>{" "}
              to prevent UI thread blocking by "heavy" schemas during rapid
              typing.
            </>
          )}
        </ProTip>
      </section>

      {/* Navigation */}
      <DocsNavigation />
    </div>
  );
}
