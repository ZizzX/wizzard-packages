import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";
import { VersionGuard } from "../../components/VersionGuard";

export default function DeferredRendering() {
  const { language } = useTranslation();

  return (
    <VersionGuard minVersion="2.0.0">
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        {/* Header */}
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Deferred Rendering
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
            {language === "ru"
              ? "Оптимизируйте масштабные визарды, откладывая тяжелые вычисления и монтирование компонентов. Узнайте, как сохранить отзывчивость UI во время сложных переходов."
              : "Optimize large-scale wizards by deferring heavy computations and component mounting. Learn how to keep your UI responsive during complex transitions."}
          </p>
        </section>

        {/* 1. Code Splitting & Lazy Loading */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Code Splitting</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {language === "ru" ? (
              <>
                Не заставляйте пользователей загружать весь визард сразу.
                Используйте{" "}
                <code className="text-indigo-600 font-bold">React.lazy</code>{" "}
                чтобы загружать компоненты шагов только тогда, когда они станут
                активными.
              </>
            ) : (
              <>
                Don't force users to download the entire wizard up front. Use{" "}
                <code className="text-indigo-600 font-bold">React.lazy</code> to
                load step components only when they are about to become active.
              </>
            )}
          </p>

          <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
            <pre className="space-y-2 text-gray-400">
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-indigo-300">HeavyStep</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-blue-400">React</span>.
                <span className="text-blue-400">lazy</span>
                <span className="text-emerald-400">(() =&gt;</span>{" "}
                <span className="text-purple-400">import</span>
                <span className="text-emerald-400">(</span>
                <span className="text-amber-400">'./HeavyStep'</span>
                <span className="text-emerald-400">));</span>
              </div>
              <br />
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-indigo-300">steps</span>{" "}
                <span className="text-emerald-400">= [</span>
              </div>
              <div className="pl-4 text-emerald-400">{"{"}</div>
              <div className="pl-8">
                <span className="text-indigo-400">id</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-400">'data-intensive'</span>
                <span className="text-emerald-400">,</span>
              </div>
              <div className="pl-8">
                <span className="text-indigo-400">component</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">HeavyStep</span>
              </div>
              <div className="pl-4 text-emerald-400">{"}"}</div>
              <div className="text-emerald-400">];</div>
              <br />
              <div className="text-gray-500">
                // Wrap the renderer in Suspense
              </div>
              <div className="text-emerald-400">
                &lt;<span className="text-blue-400">Suspense</span>{" "}
                <span className="text-indigo-400">fallback</span>
                <span className="text-emerald-400">={"{"}</span>&lt;
                <span className="text-blue-300">Skeleton</span> /&gt;
                <span className="text-emerald-400">{"}"}</span>&gt;
              </div>
              <div className="pl-4 text-emerald-400">
                &lt;<span className="text-blue-400">WizardStepRenderer</span>{" "}
                /&gt;
              </div>
              <div className="text-emerald-400">
                &lt;/<span className="text-blue-400">Suspense</span>&gt;
              </div>
            </pre>
          </div>
        </section>

        {/* 2. Skeleton Screens */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Skeleton Screens
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {language === "ru" ? (
              <>
                Используйте состояние{" "}
                <code className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">
                  isLoading
                </code>
                , чтобы показать заглушку во время восстановления данных из
                хранилища (например, LocalStorage). Это предотвращает сдвиги
                макета (layout shifts) и обеспечивает более плавный UX.
              </>
            ) : (
              <>
                Use the{" "}
                <code className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">
                  isLoading
                </code>{" "}
                state to show a placeholder while restoring data from
                persistence (e.g., LocalStorage). This prevents layout shifts
                and provides a smoother UX.
              </>
            )}
          </p>

          <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
            <pre className="space-y-2 text-gray-400">
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-emerald-400">
                  {"{ isLoading, currentStep }"}
                </span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-blue-400">useWizard</span>();
              </div>
              <br />
              <div>
                <span className="text-purple-400">if</span>{" "}
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">isLoading</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-4 text-purple-400">
                return <span className="text-emerald-400">&lt;</span>
                <span className="text-blue-300">ModernSkeletonLoader</span>{" "}
                <span className="text-emerald-400">/&gt;;</span>
              </div>
              <div className="text-emerald-400">{"}"}</div>
              <br />
              <div className="text-gray-500">// Otherwise render content</div>
              <div>
                <span className="text-purple-400">return</span>{" "}
                <span className="text-emerald-400">&lt;</span>
                <span className="text-indigo-300">FormContent</span>{" "}
                <span className="text-emerald-400">/&gt;;</span>
              </div>
            </pre>
          </div>
        </section>

        {/* 3. Handling Transitions (isPending) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "ru"
                ? "Конкурентные переходы"
                : "Concurrent Transitions"}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {language === "ru"
              ? "При переходе между шагами со сложной валидацией или тяжелыми ре-рендерами UI может «зависнуть» на долю секунды. Библиотека использует "
              : 'When moving between steps with complex validation or heavy re-renders, the UI might "freeze" for a split second. The library uses '}
            <code className="text-indigo-600 font-bold px-1.5 py-0.5">
              useTransition
            </code>
            {language === "ru"
              ? " внутри, чтобы пометить эти обновления как неблокирующие."
              : " internally to mark these updates as non-blocking."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-gray-100 p-8 rounded-2xl bg-gray-50/50">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">
                {language === "ru"
                  ? "Обнаружение фоновой работы"
                  : "Detecting Background Work"}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {language === "ru" ? (
                  <>
                    Исюпользуйте{" "}
                    <code className="text-indigo-600 font-bold underline">
                      isPending
                    </code>
                    , чтобы показать тонкий индикатор прогресса (например,
                    загрузчик в верхней панели), пока следующий сложный шаг
                    подготавливается в фоне.
                  </>
                ) : (
                  <>
                    Use{" "}
                    <code className="text-indigo-600 font-bold underline">
                      isPending
                    </code>{" "}
                    to show a subtle progress indicator (like a top bar loader)
                    while the next complex step is being prepared in the
                    background.
                  </>
                )}
              </p>
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-[10px] shadow-lg">
                <pre className="text-indigo-300">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-emerald-400">{"{ isPending }"}</span>{" "}
                  <span className="text-emerald-400">=</span>{" "}
                  <span className="text-blue-400">useWizardState</span>
                  <span className="text-emerald-400">();</span>
                  {"\n\n"}
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-emerald-400">{"("}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-emerald-400">&lt;</span>
                  <span className="text-amber-400">div</span>
                  <span className="text-emerald-400">&gt;</span>
                  {"\n"}
                  {"    "}
                  <span className="text-indigo-300">
                    {"{ isPending && <TopBarLoader /> }"}
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="text-emerald-400">&lt;</span>
                  <span className="text-blue-400">WizardStepRenderer</span>{" "}
                  <span className="text-emerald-400">/&gt;</span>
                  {"\n"}
                  {"  "}
                  <span className="text-emerald-400">&lt;/</span>
                  <span className="text-amber-400">div</span>
                  <span className="text-emerald-400">&gt;</span>
                  {"\n"}
                  <span className="text-emerald-400">{")"}</span>
                </pre>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6">
              <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="font-bold text-gray-800">
                    {language === "ru" ? "Зачем это нужно?" : "Why use it?"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === "ru" ? (
                    <>
                      <code>startTransition</code> в React гарантирует, что
                      текущий шаг останется интерактивным, даже если следующий
                      шаг тяжелый. Пользователь все еще может нажать «Отмена»
                      или редактировать поля во время фонового рендера.
                    </>
                  ) : (
                    <>
                      React's <code>startTransition</code> ensures the current
                      step stays interactive even if the next step is heavy. The
                      user can still click "Cancel" or edit fields while the
                      background render happens.
                    </>
                  )}
                </p>
              </div>

              <ProTip>
                {language === "ru" ? (
                  <>
                    Комбинируйте <code>isPending</code> с состоянием загрузки на
                    вашей кнопке «Далее», чтобы показать немедленную обратную
                    связь при клике.
                  </>
                ) : (
                  <>
                    Combine <code>isPending</code> with a loading state on your
                    "Next" button to show immediate feedback upon clicking.
                  </>
                )}
              </ProTip>
            </div>
          </div>
        </section>

        {/* 4. Progressive Mounting */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              4
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "ru"
                ? "Прогрессивное монтирование"
                : "Progressive Mounting"}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {language === "ru"
              ? "Если в вашей форме сотни полей (например, динамические списки), не рендерите их все сразу. Монтируйте их частями, чтобы основной поток оставался свободным."
              : "If your form has hundreds of fields (e.g., dynamic lists), don't render them all at once. Mount them in chunks to keep the main thread free."}
          </p>

          <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                Efficiency Pattern
              </span>
            </div>
            <pre className="text-gray-400 text-xs">
              {`function DeferredFormGroup({ fields }) {
  const [limit, setLimit] = useState(10);
  const [prevFields, setPrevFields] = useState(fields);

  if (fields !== prevFields) {
    setPrevFields(fields);
    setLimit(10);
  }
  
  useEffect(() => {
    if (limit < fields.length) {
      requestIdleCallback(() => setLimit(l => l + 10));
    }
  }, [limit, fields.length, fields]);

  return (
    <div className="space-y-4">
      {fields.slice(0, limit).map(f => <Field key={f.id} {...f} />)}
    </div>
  );
}`}
            </pre>
          </div>
        </section>

        {/* 5. Input Lag Optimization */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              5
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "ru" ? "Оптимизация ввода" : "Input Optimization"}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {language === "ru" ? "Используйте " : "Use "}
            <code className="text-indigo-600 font-bold px-1.5 py-0.5">
              useDeferredValue
            </code>
            {language === "ru"
              ? " для оптимизации отзывчивости при вводе данных, которые вызывают тяжелые вычисления или фильтрацию больших списков."
              : " to optimize responsiveness when typing, especially if the input triggers heavy calculations or large list filtering."}
          </p>

          <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
            <pre className="text-indigo-300">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">query</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">useDeferredValue</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">inputValue</span>
              <span className="text-emerald-400">);</span>
              {"\n\n"}
              <span className="text-purple-400">return</span>{" "}
              <span className="text-emerald-400">{"("}</span>
              {"\n"}
              {"  "}
              <span className="text-emerald-400">&lt;&gt;</span>
              {"\n"}
              {"    "}
              <span className="text-emerald-400">&lt;</span>
              <span className="text-amber-400">input</span>{" "}
              <span className="text-indigo-300">value</span>
              <span className="text-emerald-400">=</span>
              <span className="text-emerald-400">{"{"}</span>
              <span className="text-indigo-300">inputValue</span>
              <span className="text-emerald-400">{"}"}</span>{" "}
              <span className="text-indigo-300">onChange</span>
              <span className="text-emerald-400">... /&gt;</span>
              {"\n"}
              {"    "}
              <span className="text-emerald-400">&lt;</span>
              <span className="text-blue-400">HeavyList</span>{" "}
              <span className="text-indigo-300">query</span>
              <span className="text-emerald-400">=</span>
              <span className="text-emerald-400">{"{"}</span>
              <span className="text-indigo-300">query</span>
              <span className="text-emerald-400">{"}"}</span>{" "}
              <span className="text-emerald-400">/&gt;</span>
              {"\n"}
              {"  "}
              <span className="text-emerald-400">&lt;/&gt;</span>
              {"\n"}
              <span className="text-emerald-400">{")"}</span>
            </pre>
          </div>
        </section>

        {/* Navigation */}
        <DocsNavigation
          prev={{
            label: language === "ru" ? "Отрисовка шагов" : "Step Rendering",
            path: "/docs/rendering",
          }}
          next={{
            label:
              language === "ru" ? "Enterprise Сценарии" : "Enterprise Guide",
            path: "/docs/enterprise",
          }}
        />
      </div>
    </VersionGuard>
  );
}
