import DocsNavigation from "../../components/DocsNavigation";
import { useDocVersion } from "../../context/VersionContext";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function ConditionalLogic() {
  const { version } = useDocVersion();
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === "ru" ? "Условная логика" : "Conditional Logic"}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "Создавайте динамичные пользовательские сценарии, которые адаптируются к ответам в реальном времени. Статичные формы — это прошлое; адаптивные пайплайны — будущее."
            : "Create dynamic user flows that adapt to answers in real-time. Static forms are the past; adaptive pipelines are the future."}
        </p>
      </section>

      {/* 1. The Condition Pattern */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? (
              <>
                Свойство <code>condition</code>
              </>
            ) : (
              <>
                The <code>condition</code> Property
              </>
            )}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Каждый шаг может иметь опциональный предикат{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                condition
              </code>
              . Если он возвращает{" "}
              <code className="text-rose-600 font-black">false</code>, шаг
              автоматически исключается из очереди навигации.
            </>
          ) : (
            <>
              Each step can have an optional{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                condition
              </code>{" "}
              predicate. If it returns{" "}
              <code className="text-rose-600 font-black">false</code>, the step
              is automatically excluded from the navigation queue.
            </>
          )}
        </p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">steps</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">IStepConfig</span>
              <span className="text-emerald-400">[] = [</span>
            </div>
            <div className="pl-4 text-emerald-400">{"{"}</div>
            <div className="pl-8">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'insurance'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">label</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'Insurance Details'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-8 text-gray-500">
              {language === "ru"
                ? "// Показываем только если пользователю 18+ и у него есть авто"
                : "// Show only if user is 18+ and has a car"}
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">condition</span>
              <span className="text-emerald-400">: (</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">) =&gt;</span>{" "}
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">age</span>{" "}
              <span className="text-emerald-400">&gt;=</span>{" "}
              <span className="text-orange-400">18</span>{" "}
              <span className="text-emerald-400">&amp;&amp;</span>{" "}
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">hasCar</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-4 text-emerald-400">{"},"}</div>
            <div className="text-emerald-400">];</div>
          </pre>
        </div>
      </section>

      {/* 2. Visualizing the Pipeline */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Динамические пайплайны" : "Dynamic Pipelines"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Визард пересчитывает все условия при каждом изменении состояния.
              Это означает, что ваш массив{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                activeSteps
              </code>{" "}
              всегда синхронизирован с глобальным стейтом.
            </>
          ) : (
            <>
              The wizard recalculates all conditions on every state change. This
              means your{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                activeSteps
              </code>{" "}
              array is always in sync with the global state.
            </>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:border-indigo-100 transition-colors">
            <h4 className="font-bold text-indigo-700">
              {language === "ru"
                ? "Реактивное продвижение"
                : "Reactive Progression"}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {language === "ru"
                ? "Если пользователь меняет ответ на Шаге 1, который делает Шаг 5 скрытым, общий процент прогресса и количество шагов мгновенно обновятся, отражая новую реальность."
                : "If a user changes an answer in Step 1 that makes Step 5 hidden, the overall progress percentage and step count update instantly to reflect the new reality."}
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:border-indigo-100 transition-colors">
            <h4 className="font-bold text-indigo-700">
              {language === "ru" ? "Глубокие зависимости" : "Deep Dependencies"}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {language === "ru" ? (
                <>
                  Условия могут зависеть от вложенных данных. Использование{" "}
                  <code className="text-indigo-500 font-mono">
                    getData('nested.field')
                  </code>{" "}
                  внутри условия является лучшей практикой для сложных деревьев
                  состояния.
                </>
              ) : (
                <>
                  Conditions can depend on nested data. Using{" "}
                  <code className="text-indigo-500 font-mono">
                    getData('nested.field')
                  </code>{" "}
                  inside a condition is best practice for complex state trees.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Async Conditions & Permissions - v2.0.0 Only */}
      {version === "2.0.0" && (
        <>
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === "ru"
                  ? "Асинхронные условия и Guards"
                  : "Async Conditions & Guards"}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              {language === "ru" ? (
                <>
                  Свойство{" "}
                  <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                    condition
                  </code>{" "}
                  поддерживает как <strong>синхронные</strong>, так и{" "}
                  <strong>асинхронные</strong> предикаты. Синхронные условия
                  вычисляются на каждое изменение для мгновенной реакции, тогда
                  как асинхронные позволяют бесшовно обрабатывать серверные
                  проверки.
                </>
              ) : (
                <>
                  The{" "}
                  <code className="text-indigo-600 font-mono bg-indigo-50 px-1 rounded mx-1">
                    condition
                  </code>{" "}
                  property supports both <strong>synchronous</strong> and{" "}
                  <strong>asynchronous</strong> predicates. Sync conditions
                  evaluate on every change for instant reaction, while async
                  ones handle server-side checks seamlessly.
                </>
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <span className="text-amber-600">A</span>
                  <span>
                    {language === "ru"
                      ? "Асинхронные условия"
                      : "Async Conditions"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === "ru" ? (
                    <>
                      Возвращают{" "}
                      <code className="text-indigo-600 font-mono">
                        Promise&lt;boolean&gt;
                      </code>
                      . Полезно для проверки прав доступа или пермиссий через
                      API без блокировки основного контекста.
                    </>
                  ) : (
                    <>
                      Return{" "}
                      <code className="text-indigo-600 font-mono">
                        Promise&lt;boolean&gt;
                      </code>
                      . Useful for checking access rights or permissions via API
                      without blocking the main context.
                    </>
                  )}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <span className="text-amber-600">B</span>
                  <span>Navigation Guards</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === "ru" ? (
                    <>
                      Используйте{" "}
                      <code className="text-indigo-600 font-mono">
                        beforeLeave
                      </code>{" "}
                      для выполнения асинхронных действий (например, диалоговых
                      окон «Вы уверены?») <strong>перед</strong> уходом с
                      текущего шага.
                    </>
                  ) : (
                    <>
                      Use{" "}
                      <code className="text-indigo-600 font-mono">
                        beforeLeave
                      </code>{" "}
                      to execute async actions (e.g., "Are you sure?" dialogs){" "}
                      <strong>before</strong> leaving the current step.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
              <pre className="space-y-2 text-gray-400">
                <div className="text-gray-500">
                  {language === "ru"
                    ? "// Пример: Асинхронное условие + Guard"
                    : "// Example: Async Condition + Guard"}
                </div>
                <div className="text-emerald-400">{"{"}</div>
                <div className="pl-4">
                  <span className="text-indigo-400">id</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-amber-400">'admin-only'</span>
                  <span className="text-emerald-400">,</span>
                </div>
                <div className="pl-4 text-gray-500">
                  {language === "ru"
                    ? "// 🆕 showWhilePending: true сохраняет видимость шага с лоадером"
                    : "// 🆕 showWhilePending: true keeps step visible with loader"}
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">showWhilePending</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-amber-400">true</span>
                  <span className="text-emerald-400">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">condition</span>
                  <span className="text-emerald-400">: async (</span>
                  <span className="text-indigo-300">data</span>
                  <span className="text-emerald-400">) =&gt; {"{"}</span>
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-indigo-300">res</span>{" "}
                  <span className="text-emerald-400">=</span>{" "}
                  <span className="text-purple-400">await</span> fetch
                  <span className="text-emerald-400">(</span>
                  <span className="text-amber-400">`/api/check?id=`</span>{" "}
                  <span className="text-purple-400">+</span>{" "}
                  <span className="text-indigo-300">data</span>.
                  <span className="text-indigo-300">id</span>
                  <span className="text-emerald-400">);</span>
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-indigo-300">res</span>.
                  <span className="text-indigo-300">ok</span>
                  <span className="text-emerald-400">;</span>
                </div>
                <div className="pl-4">
                  <span className="text-emerald-400">{" },"}</span>
                </div>
                <div className="pl-4 text-gray-500">
                  {language === "ru"
                    ? "// Запрещаем уход, если confirm вернул false"
                    : "// Forbid leaving if confirm returns false"}
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">beforeLeave</span>
                  <span className="text-emerald-400">: async (</span>
                  <span className="text-indigo-300">data</span>
                  <span className="text-emerald-400">) =&gt; {"{"}</span>
                </div>
                <div className="pl-8">
                  <span className="text-purple-400">return</span> confirm
                  <span className="text-emerald-400">(</span>
                  <span className="text-amber-400">
                    {language === "ru"
                      ? '"Сохранить изменения?"'
                      : '"Save changes?"'}
                  </span>
                  <span className="text-emerald-400">);</span>
                </div>
                <div className="pl-4 text-emerald-400">{"}"}</div>
                <div className="text-emerald-400">{"}"}</div>
              </pre>
            </div>
          </section>

          {/* 4. Pending States & Visibility */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {language === "ru"
                  ? "Состояния ожидания и видимость"
                  : "Pending States & Visibility"}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              {language === "ru"
                ? "Асинхронные условия вводят состояние «Ожидание» (Pending). Для обеспечения наилучшего пользовательского опыта библиотека реализует интеллектуальные правила видимости."
                : "Async conditions introduce a 'Pending' state. To ensure the best UX, the library implements intelligent visibility rules."}
            </p>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    {language === "ru"
                      ? "Скрыт по умолчанию"
                      : "Hidden by Default"}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {language === "ru" ? (
                      <>
                        По умолчанию любой шаг с{" "}
                        <strong>асинхронным условием</strong>{" "}
                        <span className="text-rose-600 font-semibold underline underline-offset-4">
                          скрыт
                        </span>{" "}
                        из списка прогресса до тех пор, пока условие не вернет{" "}
                        <code className="text-indigo-600 font-bold">true</code>.
                        Это предотвращает скачки верстки и временное появление
                        «пустых» шагов.
                      </>
                    ) : (
                      <>
                        By default, any step with an{" "}
                        <strong>async condition</strong> is{" "}
                        <span className="text-rose-600 font-semibold underline underline-offset-4">
                          hidden
                        </span>{" "}
                        from the progress list until the condition returns{" "}
                        <code className="text-indigo-600 font-bold">true</code>.
                        This prevents layout shifts and temporary 'empty' steps.
                      </>
                    )}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {language === "ru"
                      ? "Принудительная видимость"
                      : "Forced Visibility"}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {language === "ru" ? (
                      <>
                        Используйте параметр{" "}
                        <code className="text-emerald-600 font-black">
                          showWhilePending: true
                        </code>
                        , если хотите, чтобы шаг был виден в навигации даже во
                        время проверки на сервере. Визард предоставляет
                        состояние{" "}
                        <code className="text-indigo-600 font-mono font-bold">
                          isBusy
                        </code>
                        , которое можно использовать для отображения спиннера
                        или скелетона.
                      </>
                    ) : (
                      <>
                        Use{" "}
                        <code className="text-emerald-600 font-black">
                          showWhilePending: true
                        </code>{" "}
                        if you want the step to be visible in navigation even
                        during server checks. The wizard provides an{" "}
                        <code className="text-indigo-600 font-mono font-bold">
                          isBusy
                        </code>{" "}
                        state you can use to show a spinner or skeleton.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 divide-y divide-amber-100 space-y-4">
                <div className="pb-4">
                  <h5 className="font-bold text-amber-800 flex items-center gap-2 mb-2 text-sm">
                    <svg
                      className="w-4 h-4 text-amber-600"
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
                    {language === "ru"
                      ? "Обработка Race Conditions"
                      : "Handling Race Conditions"}
                  </h5>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    {language === "ru"
                      ? "Навигация автоматически блокируется, если вы пытаетесь перейти к шагу, условие которого всё ещё находится в состоянии <strong>ожидания</strong> или уже <strong>отклонено</strong>. Библиотека трактует «Pending» как «Доступ запрещен», пока не доказано обратное."
                      : "Navigation is automatically blocked if you attempt to go to a step whose condition is still in a **pending** state or already **rejected**. The library treats 'Pending' as 'Access Denied' until proven otherwise."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {version === "1.7.2" && (
        <section className="space-y-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
          <h3 className="text-lg font-bold text-amber-800">
            {language === "ru"
              ? "Ограничения версии 1.7.2"
              : "Version 1.7.2 Limitations"}
          </h3>
          <p className="text-sm text-amber-700">
            {language === "ru" ? (
              <>
                В версии 1.7.2 поддерживаются <strong>только синхронные</strong>{" "}
                условия. Асинхронные проверки (Promise) и guard-методы
                (beforeLeave) недоступны. Если вам требуется асинхронная
                валидация шагов, рекомендуется обновиться до версии 2.0.0.
              </>
            ) : (
              <>
                Version 1.7.2 supports <strong>only synchronous</strong>{" "}
                conditions. Async checks (Promise) and guard methods
                (beforeLeave) are unavailable. If you need async step
                validation, upgrading to v2.0.0 is recommended.
              </>
            )}
          </p>
          <p className="text-sm text-amber-700 underline">
            <a
              href="https://www.npmjs.com/package/wizzard-stepper-react/v/1.7.2"
              target="_blank"
              rel="noreferrer"
            >
              {language === "ru"
                ? "См. документацию версии 1.7.2 на NPM"
                : "See v1.7.2 documentation on NPM"}
            </a>
          </p>
        </section>
      )}

      <ProTip>
        {language === "ru"
          ? "Не помещайте сложную бизнес-логику внутрь условий шага. Если условие занимает более 3 строк кода, вынесите его в отдельную утилитарную функцию для удобства тестирования."
          : "Don't put complex business logic inside step conditions. If a condition takes more than 3 lines of code, extract it into a separate utility function for easier testing."}
      </ProTip>

      {/* Navigation */}
      <DocsNavigation
        prev={{
          label: language === "ru" ? "Валидация" : "Validation",
          path: "/docs/validation",
        }}
        next={
          version === "2.0.0"
            ? { label: "Middleware", path: "/docs/middleware" }
            : {
                label: language === "ru" ? "Маршрутизация" : "Routing",
                path: "/docs/routing",
              }
        }
      />
    </div>
  );
}
