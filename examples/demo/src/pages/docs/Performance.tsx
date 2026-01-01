import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function PerformanceDocs() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === "ru"
            ? "Оптимизация производительности"
            : "Performance Optimization"}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "Узнайте, как создавать молниеносные визарды, которые масштабируются до сотен полей и сохраняют 60 FPS даже на слабых устройствах."
            : "Learn how to build lightning-fast wizards that scale to hundreds of fields and maintain 60 FPS even on low-end devices."}
        </p>
      </section>

      {/* 1. Stateless Architecture */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Модель «Stateless Provider»"
              : "Stateless Provider Model"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru" ? (
              <>
                По умолчанию <code>WizardProvider</code> является
                «безгосударственным» (stateless) по отношению к вашим данным.
                Изменение значения поля <strong>не вызывает</strong> перерисовку
                всего провайдера. Вместо этого уведомляются только компоненты,
                подписанные на конкретный путь данных.
              </>
            ) : (
              <>
                By default, <code>WizardProvider</code> is "stateless" regarding
                your data. Changing a field value{" "}
                <strong>does not trigger</strong> a re-render of the entire
                provider. Instead, only components subscribed to that specific
                data path are notified.
              </>
            )}
          </p>
          <p>
            {language === "ru"
              ? "Это гарантирует, что ввод текста в длинной форме остается мгновенным, так как перерисовывается только конкретный инпут."
              : "This ensures that typing in a long form remains instantaneous, as only the specific input re-renders."}
          </p>
        </div>
      </section>

      {/* 2. O(1) Lookups */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Поиск через Hash-Map" : "Hash-Map Lookups"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru" ? (
              <>
                Внутренняя логика поиска конфигураций шагов и их индексов
                использует <strong>Hash Maps</strong> (<code>O(1)</code>) вместо
                итерации по массиву (<code>O(n)</code>).
              </>
            ) : (
              <>
                Internal logic for looking up step configurations and indices
                uses <strong>Hash Maps</strong> (<code>O(1)</code>) instead of
                array iteration (<code>O(n)</code>).
              </>
            )}
          </p>
          <ul>
            <li>
              <strong>
                {language === "ru" ? "Мгновенный доступ" : "Instant Access"}
              </strong>
              :{" "}
              {language === "ru"
                ? "Получайте конфиг любого шага по ID без перебора массива."
                : "Retrieve any step config by ID without array traversal."}
            </li>
            <li>
              <strong>
                {language === "ru"
                  ? "Масштабируемая навигация"
                  : "Scalable Navigation"}
              </strong>
              :{" "}
              {language === "ru" ? (
                <>
                  Определение <code>isFirstStep</code> или{" "}
                  <code>isLastStep</code> происходит мгновенно, независимо от
                  количества шагов.
                </>
              ) : (
                <>
                  Determining <code>isFirstStep</code> or{" "}
                  <code>isLastStep</code> is instant, regardless of step count.
                </>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Mutation Performance */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Стратегии мутации данных"
              : "Data Mutation Strategies"}
          </h2>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
          <p>
            {language === "ru"
              ? "Библиотека предоставляет два способа обновления данных. Выбор правильного метода критичен для производительности:"
              : "The library provides two ways to update data. Choosing the right method is critical for performance:"}
          </p>
          <ul>
            <li>
              <strong>
                setData (
                {language === "ru" ? "с отслеживанием пути" : "path tracked"})
              </strong>
              :{" "}
              {language === "ru" ? (
                <>
                  Запускает автоматическую валидацию (если включен режим{" "}
                  <code>onChange</code>). Идеально для индивидуальных инпутов.
                </>
              ) : (
                <>
                  Triggers automatic validation (if <code>onChange</code> mode
                  is enabled). Ideal for individual inputs.
                </>
              )}
            </li>
            <li>
              <strong>
                updateData (
                {language === "ru" ? "поверхностное слияние" : "shallow merge"})
              </strong>
              :{" "}
              {language === "ru" ? (
                <>
                  «Тихое» массовое обновление, которое пропускает
                  авто-валидацию. Используйте это в обработчиках{" "}
                  <code>onSubmit</code> перед переходом к следующему шагу, чтобы
                  избежать лишних циклов проверки.
                </>
              ) : (
                <>
                  "Silent" bulk update that skips auto-validation. Use this in{" "}
                  <code>onSubmit</code> handlers before proceeding to the next
                  step to avoid unnecessary validation cycles.
                </>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Handling Large Lists */}
      <section className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold">
            4
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Работа с большими данными"
              : "Handling Large Data"}
          </h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            {language === "ru"
              ? "Восстановление и isLoading"
              : "Restoration & isLoading"}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {language === "ru" ? (
              <>
                При восстановлении данных из <code>LocalStorage</code>{" "}
                библиотека предоставляет состояние <code>isLoading</code>.
                Используйте его для отображения скелетона и предотвращения
                скачков верстки.
              </>
            ) : (
              <>
                When restoring data from <code>LocalStorage</code>, the library
                provides an <code>isLoading</code> state. Use it to display a
                skeleton and prevent layout shifts.
              </>
            )}
          </p>
          <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
            <pre className="text-gray-300">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-400">
                {"{ currentStep, isLoading }"}
              </span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">useWizardState</span>
              <span className="text-emerald-400">();</span>
              {"\n\n"}
              <span className="text-purple-400">if</span>{" "}
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-400">isLoading</span>
              <span className="text-emerald-400">)</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-purple-400">return</span>{" "}
              <span className="text-emerald-400">&lt;</span>
              <span className="text-blue-300">SkeletonLoader</span>{" "}
              <span className="text-emerald-400">/&gt;;</span>
              {"\n"}
              <span className="text-emerald-400">{"}"}</span>
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            {language === "ru"
              ? "Отложенный рендеринг (Deferred Rendering)"
              : "Deferred Rendering"}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {language === "ru" ? (
              <>
                Для шагов с сотнями элементов (например, повторяющиеся поля)
                производительность браузера может снизиться из-за одновременного
                монтирования огромного количества узлов. Используйте паттерн{" "}
                <strong>Deferred List</strong> для отрисовки элементов
                небольшими порциями.
              </>
            ) : (
              <>
                For steps with hundreds of elements (e.g., repeating fields),
                browser performance may drop due to simultaneous mounting of a
                huge number of nodes. Use the <strong>Deferred List</strong>{" "}
                pattern to render items in small chunks.
              </>
            )}
          </p>
          <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
            <pre className="text-gray-300 text-[11px]">
              <span className="text-gray-500">
                // Пример простой реализации DeferredList
              </span>
              {"\n"}
              <span className="text-purple-400">export</span>{" "}
              <span className="text-purple-400">function</span>{" "}
              <span className="text-blue-400">DeferredList</span>
              <span className="text-emerald-400">&lt;</span>
              <span className="text-amber-400">T</span>
              <span className="text-emerald-400">&gt;</span>
              <span className="text-emerald-400">{"({"}</span>{" "}
              <span className="text-indigo-300">items</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">renderItem</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">chunkSize</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-orange-400">10</span>{" "}
              <span className="text-emerald-400">{"}) {"}</span>
              {"\n"}
              {"  "}
              <span className="text-purple-400">const</span>{" "}
              <span className="text-emerald-400">[</span>
              <span className="text-indigo-300">visibleCount</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-blue-400">setVisibleCount</span>
              <span className="text-emerald-400">]</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">useState</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">chunkSize</span>
              <span className="text-emerald-400">);</span>
              {"\n\n"}
              {"  "}
              <span className="text-blue-400">useEffect</span>
              <span className="text-emerald-400">(()</span>{" "}
              <span className="text-purple-400">=&gt;</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
              {"\n"}
              {"    "}
              <span className="text-purple-400">if</span>{" "}
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">visibleCount</span>{" "}
              <span className="text-emerald-400">&lt;</span>{" "}
              <span className="text-indigo-300">items.length</span>
              <span className="text-emerald-400">)</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
              {"\n"}
              {"      "}
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">timer</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">setTimeout</span>
              <span className="text-emerald-400">(()</span>{" "}
              <span className="text-purple-400">=&gt;</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
              {"\n"}
              {"        "}
              <span className="text-blue-400">setVisibleCount</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">prev</span>{" "}
              <span className="text-purple-400">=&gt;</span>{" "}
              <span className="text-indigo-300">prev</span>{" "}
              <span className="text-emerald-400">+</span>{" "}
              <span className="text-indigo-300">chunkSize</span>
              <span className="text-emerald-400">);</span>
              {"\n"}
              {"      "}
              <span className="text-emerald-400">{"},"}</span>{" "}
              <span className="text-orange-400">16</span>
              <span className="text-emerald-400">);</span>{" "}
              <span className="text-gray-500">// ~1 frame</span>
              {"\n"}
              {"      "}
              <span className="text-purple-400">return</span>{" "}
              <span className="text-emerald-400">()</span>{" "}
              <span className="text-purple-400">=&gt;</span>{" "}
              <span className="text-blue-400">clearTimeout</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">timer</span>
              <span className="text-emerald-400">);</span>
              {"\n"}
              {"    "}
              <span className="text-emerald-400">{"}"}</span>
              {"\n"}
              {"  "}
              <span className="text-emerald-400">{"}, ["}</span>
              <span className="text-indigo-300">visibleCount</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">items.length</span>
              <span className="text-emerald-400">]);</span>
              {"\n\n"}
              {"  "}
              <span className="text-purple-400">return</span>{" "}
              <span className="text-emerald-400">&lt;&gt;{"{"}</span>
              <span className="text-indigo-300">items</span>
              <span className="text-emerald-400">.</span>
              <span className="text-blue-400">slice</span>
              <span className="text-emerald-400">(</span>
              <span className="text-orange-400">0</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">visibleCount</span>
              <span className="text-emerald-400">).</span>
              <span className="text-blue-400">map</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">renderItem</span>
              <span className="text-emerald-400">){"}&lt;/&gt;"};</span>
              {"\n"}
              <span className="text-emerald-400">{"}"}</span>
            </pre>
          </div>
        </div>
      </section>

      <ProTip>
        {language === "ru" ? (
          <>
            Всегда используйте <code>useWizardSelector</code> с{" "}
            <code>shallowEqual</code> (или аналогичной функцией сравнения) при
            возврате объектов или массивов. Это предотвратит избыточные
            перерисовки при обновлении других частей стора.
          </>
        ) : (
          <>
            Always use <code>useWizardSelector</code> with{" "}
            <code>shallowEqual</code> (or a similar comparison function) when
            returning objects or arrays. This prevents redundant re-renders when
            other parts of the store update.
          </>
        )}
      </ProTip>

      <DocsNavigation />
    </div>
  );
}
