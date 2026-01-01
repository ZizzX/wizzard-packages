import { useDocVersion } from "../../context/VersionContext";
import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";
import { type DocVersion } from "../../context/VersionContext";

export default function HooksApi() {
  const { version } = useDocVersion();
  const { language } = useTranslation();
  const isV2 = version === ("2.0.0" as DocVersion);
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. Header & Philosophy */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Hooks API
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru" ? (
            <>
              Спроектировано для максимальной типобезопасности и
              производительности. Наше API использует
              <strong> архитектурные возможности React 18</strong>, чтобы
              гарантировать отсутствие лишних ререндеров и превосходный
              Developer Experience.
            </>
          ) : (
            <>
              Designed for maximum type safety and performance. Our API
              leverages
              <strong> React 18 architectural features</strong> to guarantee no
              unnecessary re-renders and a superior Developer Experience.
            </>
          )}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {[
            "Type Safe",
            "Sub-Atomic Updates",
            "Context-Based",
            "TanStack Inspired",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-indigo-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 2. Primary Hook: useWizard */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">useWizard</h2>
        </div>
        <p className="text-gray-600 max-w-3xl leading-relaxed">
          {isV2
            ? language === "ru"
              ? "Основная точка входа в v2.0.0. Несмотря на то, что хук возвращает полный контекст, мы рекомендуем использовать более специализированные хуки (например, useWizardValue) для данных, чтобы максимизировать производительность."
              : "The primary entry point in v2.0.0. While it returns the full context, we recommend using more specialized hooks (e.g., useWizardValue) for data to maximize performance."
            : language === "ru"
              ? "Стандартный способ доступа к визарду в v1. Возвращает полный контекст. Учтите, что любое изменение состояния вызовет ререндер всех компонентов, использующих этот хук."
              : "The standard way to access the wizard in v1. Returns the full context. Note that any state change will cause a re-render of all components using this hook."}
        </p>

        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-1">
            <div className="text-purple-400">
              const <span className="text-emerald-400">{"{ "}</span>
            </div>
            <div className="pl-4 text-indigo-300">
              wizardData<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                //{" "}
                {language === "ru"
                  ? "Текущее глобальное состояние"
                  : "Current global state"}
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              currentStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                //{" "}
                {language === "ru"
                  ? "Конфигурация активного шага"
                  : "Active step config"}
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToNextStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                //{" "}
                {language === "ru" ? "Асинхронный переход" : "Async transition"}
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              setData{" "}
              <span className="text-gray-500">
                //{" "}
                {language === "ru"
                  ? "Атомарная функция обновления"
                  : "Atomic update function"}
              </span>
            </div>
            <div className="text-purple-400">
              <span className="text-emerald-400">{"}"}</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">useWizard</span>
              <span className="text-emerald-400">();</span>
            </div>
          </pre>
        </div>
      </section>

      {isV2 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "ru"
                ? "Атомарные подписки (Atomicity)"
                : "Atomic Subscriptions (Atomicity)"}
            </h2>
          </div>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            {language === "ru"
              ? "В v2 мы внедрили систему подписок, которая позволяет компонентам реагировать только на изменения конкретных данных. Это избавляет от проблемы «каскадных ререндеров»."
              : 'In v2, we introduced a subscription system that allows components to react only to changes in specific data. This eliminates the problem of "cascading re-renders".'}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-gray-900">
                <span className="text-emerald-600 text-lg">#</span>{" "}
                useWizardValue
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === "ru"
                  ? "Подписка на значение по глубокому пути. Компонент перерендерится только тогда, когда изменится конкретное значение по этому пути. Использует строки в dot-notation."
                  : "Subscribe to a value by a deep path. The component will re-render only when the specific value at this path changes. Uses dot-notation strings."}
              </p>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10 overflow-x-auto">
                <pre className="space-y-1">
                  <div className="text-gray-500">
                    //{" "}
                    {language === "ru"
                      ? "Подписка на конкретную часть данных"
                      : "Subscribe to specific data slice"}
                  </div>
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-indigo-300">name</span>{" "}
                    <span className="text-emerald-400">=</span>{" "}
                    <span className="text-blue-400">useWizardValue</span>
                    <span className="text-emerald-400">(</span>
                    <span className="text-amber-400">'user.name'</span>
                    <span className="text-emerald-400">);</span>
                  </div>
                </pre>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-gray-900">
                <span className="text-emerald-600 text-lg">#</span>{" "}
                useWizardSelector
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === "ru"
                  ? "Селектор в стиле Redux. Передайте чистую функцию для извлечения данных. Компонент обновится только в том случае, если результат выполнения функции изменится."
                  : "Redux-style selector. Pass a pure function to extract data. The component will update only if the result of the function execution changes."}
              </p>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10 overflow-x-auto">
                <pre className="space-y-1">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-indigo-300">count</span>{" "}
                    <span className="text-emerald-400">=</span>{" "}
                    <span className="text-blue-400">useWizardSelector</span>
                    <span className="text-emerald-400">(</span>
                    <span className="text-indigo-300">s</span>{" "}
                    <span className="text-emerald-400">=&gt;</span>{" "}
                    <span className="text-indigo-300">s</span>
                    <span className="text-emerald-400">.</span>
                    <span className="text-indigo-300">wizardData</span>
                    <span className="text-emerald-400">.</span>
                    <span className="text-indigo-300">items</span>
                    <span className="text-emerald-400">.</span>
                    <span className="text-indigo-300">length</span>
                    <span className="text-emerald-400">);</span>
                  </div>
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {isV2 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              useWizardActions
            </h2>
          </div>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            {language === "ru"
              ? "Чисто логический хук. Возвращает только методы для мутации состояния и навигации. Идеально подходит для создания переиспользуемых UI-контролов (кнопки «Далее», «Назад», хедеры), которым не нужно следить за изменениями данных. **Вызов методов этого хука не вызывает ререндер компонента.**"
              : "Purely logical hook. Returns only methods for state mutation and navigation. Ideal for creating reusable UI controls (Next, Back buttons, headers) that do not need to watch for data changes. **Calling methods from this hook does not trigger component re-render.**"}
          </p>
          <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
            <pre className="space-y-1">
              <div className="text-purple-400">
                const <span className="text-emerald-400">{"{ "}</span>
              </div>
              <div className="pl-4 text-indigo-300">
                goToNextStep<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Валидирует текущий шаг и переходит вперед"
                    : "Validates current step and moves forward"}
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                goToPrevStep<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Переходит на предыдущий активный шаг"
                    : "Moves to the previous active step"}
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                goToStep<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Переход к конкретному ID шага (async)"
                    : "Jump to a specific step ID (async)"}
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                setData<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Установить значение по dot-notation пути"
                    : "Set value by dot-notation path"}
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                updateData<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Массовое слияние (Bulk merge)"
                    : "Bulk merge"}{" "}
                  (options: {"{ replace: boolean, persist: boolean }"})
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                validateStep<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Запустить валидацию шага вручную"
                    : "Manually trigger step validation"}
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                reset<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Сброс к начальному состоянию"
                    : "Reset to initial state (wipe data/history)"}
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                save<span className="text-emerald-400">,</span>{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Синхронизация с хранилищем"
                    : "Sync to storage"}{" "}
                  (params: stepId | stepId[] | true)
                </span>
              </div>
              <div className="pl-4 text-indigo-300">
                clearStorage{" "}
                <span className="text-gray-500">
                  //{" "}
                  {language === "ru"
                    ? "Очистить данные из персистентности"
                    : "Wipe data from persistence"}
                </span>
              </div>
              <div className="text-purple-400">
                <span className="text-emerald-400">{"}"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-blue-400">useWizardActions</span>
                <span className="text-emerald-400">();</span>
              </div>
            </pre>
          </div>

          {/* Mutation Strategy Comparison */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Mutation Strategy
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-gray-50 text-[9px] font-black text-gray-400 uppercase border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2">Функция</th>
                    <th className="px-4 py-2">setData</th>
                    <th className="px-4 py-2">updateData</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-900 bg-gray-50/30 w-1/4">
                      Пути (Path)
                    </td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">
                      Глубокие (user.email)
                    </td>
                    <td className="px-4 py-3 text-amber-600 font-medium whitespace-nowrap">
                      Поверхностные (Root)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-900 bg-gray-50/30">
                      Валидация
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-600">
                      Триггер{" "}
                      <code className="text-rose-500 font-mono">onChange</code>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-400 italic">
                      Silent (Пропускает)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-900 bg-gray-50/30">
                      Применение
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-medium">
                      Синхронизация полей ввода
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-medium whitespace-nowrap">
                      Submit / Массовая загрузка
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 5. Metadata Hooks: useWizardState & useWizardError */}
      {isV2 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold">
              4
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Состояние и метаданные
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                useWizardState
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Доступ к текущему состоянию интерфейса визарда. Необходим для
                построения прогресс-баров, индикаторов шагов или лоадеров.
              </p>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10">
                <pre className="space-y-1 text-indigo-300">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-emerald-400">{"{ "}</span>
                  </div>
                  <div className="pl-4">
                    currentStepIndex<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">// 0-based index</span>
                  </div>
                  <div className="pl-4">
                    progress<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">// 0-100% calculation</span>
                  </div>
                  <div className="pl-4">
                    history<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">
                      // Array of visited step IDs
                    </span>
                  </div>
                  <div className="pl-4">
                    isFirstStep<span className="text-emerald-400">,</span>{" "}
                    isLastStep<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">// Boolean flags</span>
                  </div>
                  <div className="pl-4">
                    isBusy<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">
                      // 🆕 Global async state
                    </span>
                  </div>
                  <div className="pl-4">
                    busySteps<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">
                      // 🆕 Steps running async logic
                    </span>
                  </div>
                  <div className="pl-4">
                    isLoading<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">
                      // Wizard hydration from storage
                    </span>
                  </div>
                  <div className="pl-4">
                    activeSteps<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">
                      // Filtered visible steps
                    </span>
                  </div>
                  <div className="pl-4">
                    visitedSteps<span className="text-emerald-400">,</span>{" "}
                    <span className="text-gray-500">// Set of seen IDs</span>
                  </div>
                  <div className="pl-4">
                    completedSteps{" "}
                    <span className="text-gray-500">
                      // Set of validated IDs
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-400">{" }"}</span>{" "}
                    <span className="text-emerald-400">=</span>{" "}
                    <span className="text-blue-400">useWizardState</span>
                    <span className="text-emerald-400">();</span>
                  </div>
                </pre>
              </div>

              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <h4 className="flex items-center gap-2 font-bold text-amber-800 text-sm mb-2">
                  ⚠️ Когда НЕ использовать
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed mb-3">
                  Не используйте этот хук для доступа к данным форм (например,
                  вводу пользователя). Использование его для данных заставит
                  весь ваш слой UI перерендериваться целиком на каждое нажатие
                  клавиши.
                </p>
                <div className="text-[10px] font-mono bg-white p-2 rounded border border-amber-200 text-gray-500">
                  ❌ const {"{ activeSteps }"} = useWizardState(); // ПРАВИЛЬНО
                  <br />❌ const {"{ wizardData }"} = useWizardState(); //
                  ОШИБКА: Данных тут нет! Используйте селекторы.
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 text-gray-900">
                useWizardError
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === "ru"
                  ? "Самый простой способ отображения ошибок валидации. Подписывается только на ошибки, относящиеся к указанному пути. Возвращает `undefined`, если поле валидно."
                  : "The easiest way to display validation errors. Subscribes only to errors related to the specified path. Returns `undefined` if the field is valid."}
              </p>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10 overflow-x-auto">
                <pre className="space-y-4">
                  <div className="text-gray-500">
                    //{" "}
                    {language === "ru"
                      ? "Пример: Валидация email в реальном времени"
                      : "Example: Real-time email validation"}
                  </div>
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-indigo-300">emailError</span>{" "}
                    <span className="text-emerald-400">=</span>{" "}
                    <span className="text-blue-400">useWizardError</span>
                    <span className="text-emerald-400">(</span>
                    <span className="text-amber-400">'user.email'</span>
                    <span className="text-emerald-400">);</span>
                  </div>
                  <div className="text-gray-500">
                    //{" "}
                    {language === "ru"
                      ? "Возвращает: string | undefined"
                      : "Returns: string | undefined"}
                  </div>
                  <div className="pt-2 text-gray-400 text-[10px] uppercase font-bold tracking-tighter">
                    {language === "ru"
                      ? "Использование в JSX:"
                      : "Usage in JSX:"}
                  </div>
                  <div className="text-emerald-400">
                    {"{ "}
                    <br /> &nbsp;
                    <span className="text-indigo-300">
                      emailError
                    </span> &nbsp;{" "}
                    <div className="text-purple-400">
                      &nbsp;&nbsp;&nbsp;&nbsp;&&
                    </div>{" "}
                    <span className="text-emerald-400">&nbsp;&lt;</span>
                    <span className="text-amber-400">span</span>{" "}
                    <span className="text-indigo-400">className</span>
                    <span className="text-emerald-400">=</span>
                    <span className="text-amber-400">"error"</span>
                    <span className="text-emerald-400">&gt;</span>
                    {"{"}
                    <span className="text-indigo-300">emailError</span>
                    {"}"}
                    <span className="text-emerald-400">&lt;/</span>
                    <span className="text-amber-400">span</span>
                    <span className="text-emerald-400">&gt;</span>
                    <br />
                    {" }"}
                  </div>
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Performance & Selection Guide */}
      {isV2 && (
        <section className="space-y-8 pt-10 border-t border-gray-100">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === "ru"
                ? "Производительность и выбор"
                : "Performance & Selection Guide"}
            </h2>
            <p className="text-gray-500 uppercase tracking-widest text-[10px] font-black">
              {language === "ru"
                ? "Стратегии оптимизации для крупных приложений"
                : "Optimization strategies for large applications"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* A: Hook Selection Guide */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-black">
                  A
                </span>
                {language === "ru"
                  ? "Гайд по выбору хука"
                  : "Hook Selection Guide"}
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="text-[10px] font-black text-indigo-600 mb-1 uppercase tracking-widest">
                    useWizardValue / Selector
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {language === "ru" ? (
                      <>
                        <strong>Лучшее для:</strong> полей ввода,
                        статус-индикаторов и лейблов. Предотвращает перерендер
                        всей формы при вводе текста.
                      </>
                    ) : (
                      <>
                        <strong>Best for:</strong> input fields, status
                        indicators, and labels. Prevents form-wide re-renders
                        during text input.
                      </>
                    )}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="text-[10px] font-black text-indigo-600 mb-1 uppercase tracking-widest">
                    useWizardActions
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {language === "ru" ? (
                      <>
                        <strong>Лучшее для:</strong> кнопок «Далее», «Назад» и
                        «Отправить». Ноль перерендеров, так как возвращает
                        только стабильные методы.
                      </>
                    ) : (
                      <>
                        <strong>Best for:</strong> Next, Back, and Submit
                        buttons. Zero re-renders as it returns only stable
                        methods.
                      </>
                    )}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="text-[10px] font-black text-indigo-600 mb-1 uppercase tracking-widest">
                    useWizard
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {language === "ru" ? (
                      <>
                        <strong>Лучшее для:</strong> оркестрации на уровне шага
                        или маленьких форм. Подписывается на все изменения
                        стейта.
                      </>
                    ) : (
                      <>
                        <strong>Best for:</strong> step-level orchestration or
                        small forms. Subscribes to all state changes.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* B: Decision Matrix */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
                  B
                </span>
                {language === "ru"
                  ? "Матрица быстрых решений"
                  : "Quick Decision Matrix"}
              </h3>
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-gray-50 text-[9px] font-black uppercase text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2">
                        {language === "ru" ? "Нужно..." : "Need..."}
                      </th>
                      <th className="px-3 py-2">
                        {language === "ru" ? "Хук" : "Hook"}
                      </th>
                      <th className="px-3 py-2 text-center">
                        {language === "ru" ? "Ререндеры" : "Re-renders"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-3 py-2 text-gray-600 font-medium whitespace-nowrap">
                        {language === "ru" ? "Одно поле" : "Single field"}
                      </td>
                      <td className="px-3 py-2 text-indigo-600 font-bold">
                        useWizardValue
                      </td>
                      <td className="px-3 py-2 text-center text-emerald-600 font-bold">
                        Atomic
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-gray-600 font-medium whitespace-nowrap">
                        {language === "ru"
                          ? "Кнопки навигации"
                          : "Navigation buttons"}
                      </td>
                      <td className="px-3 py-2 text-indigo-600 font-bold">
                        useWizardActions
                      </td>
                      <td className="px-3 py-2 text-center text-blue-600 font-bold">
                        Zero
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-gray-600 font-medium whitespace-nowrap">
                        {language === "ru" ? "Логика шага" : "Step logic"}
                      </td>
                      <td className="px-3 py-2 text-indigo-600 font-bold">
                        useWizard
                      </td>
                      <td className="px-3 py-2 text-center text-rose-500 font-bold">
                        Full
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-gray-600 font-medium whitespace-nowrap">
                        {language === "ru" ? "Метаданные" : "Metadata"}
                      </td>
                      <td className="px-3 py-2 text-indigo-600 font-bold">
                        useWizardState
                      </td>
                      <td className="px-3 py-2 text-center text-amber-500 font-bold">
                        Minimal
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                  🔍{" "}
                  <strong>
                    {language === "ru" ? "Золотое правило:" : "Golden Rule:"}
                  </strong>{" "}
                  {language === "ru" ? (
                    <>
                      Если вашему компоненту не нужно отображать данные визарда,
                      всегда отдавайте предпочтение{" "}
                      <code className="bg-white/50 px-1 rounded">
                        useWizardActions
                      </code>{" "}
                      для достижения максимальной производительности.
                    </>
                  ) : (
                    <>
                      If your component doesn't need to display wizard data,
                      always prefer{" "}
                      <code className="bg-white/50 px-1 rounded">
                        useWizardActions
                      </code>{" "}
                      for maximum performance.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <ProTip>
            {language === "ru" ? (
              <>
                Если у вас форма с 50+ полями, избегайте использования{" "}
                <code className="text-blue-900 bg-blue-50 px-1 rounded font-mono">
                  useWizard()
                </code>{" "}
                в корне шага. Вместо этого оборачивайте каждое поле ввода в
                маленький компонент, использующий{" "}
                <code className="text-blue-900 bg-blue-50 px-1 rounded font-mono">
                  useWizardValue()
                </code>
                . Это изолирует обновления и сохранит плавность интерфейса.
              </>
            ) : (
              <>
                If you have a form with 50+ fields, avoid using{" "}
                <code className="text-blue-900 bg-blue-50 px-1 rounded font-mono">
                  useWizard()
                </code>{" "}
                at the step root. Instead, wrap each input field in a small
                component using{" "}
                <code className="text-blue-900 bg-blue-50 px-1 rounded font-mono">
                  useWizardValue()
                </code>
                . This isolates updates and maintains UI smoothness.
              </>
            )}
          </ProTip>
        </section>
      )}

      {/* Navigation */}
      <DocsNavigation
        prev={{
          label: language === "ru" ? "Основные концепции" : "Core Concepts",
          href: "/docs/core-concepts",
        }}
        next={{
          label: language === "ru" ? "Типизация" : "Type Reference",
          href: "/docs/types",
        }}
      />
    </div>
  );
}
