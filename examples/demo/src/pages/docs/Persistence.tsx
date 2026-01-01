import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function Persistence() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === "ru"
            ? "Стратегии сохранения"
            : "Persistence Strategies"}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "Узнайте, как сохранять данные между перезагрузками страницы и управлять безопасностью чувствительной информации с помощью нашей гибкой архитектуры адаптеров."
            : "Learn how to persist data between page reloads and manage sensitive information security using our flexible adapter architecture."}
        </p>
      </section>

      {/* 1. Persistence Modes */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Режимы сохранения (Modes)"
              : "Persistence Modes"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              Параметр{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">
                PersistenceMode
              </code>{" "}
              определяет, в какой момент данные будут записаны в выбранный
              адаптер хранения.
            </>
          ) : (
            <>
              The{" "}
              <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">
                PersistenceMode
              </code>{" "}
              parameter determines when data is written to the selected storage
              adapter.
            </>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-indigo-100 transition-colors">
            <h3 className="font-bold text-gray-900">Manual</h3>
            <p className="text-xs text-gray-400 font-black uppercase tracking-widest italic">
              {language === "ru" ? '"Полный контроль"' : '"Full Control"'}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {language === "ru" ? (
                <>
                  Данные сохраняются только при явном вызове экшена{" "}
                  <code className="text-indigo-500 font-mono bg-indigo-50 px-1 rounded">
                    save()
                  </code>
                  .
                </>
              ) : (
                <>
                  Data is saved only when you explicitly call the{" "}
                  <code className="text-indigo-500 font-mono bg-indigo-50 px-1 rounded">
                    save()
                  </code>{" "}
                  action.
                </>
              )}
            </p>
          </div>
          <div className="p-6 bg-indigo-600 rounded-2xl text-white space-y-3 shadow-xl shadow-indigo-200">
            <h3 className="font-bold">onStepChange</h3>
            <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest italic">
              {language === "ru" ? '"Золотая середина"' : '"Sweet Spot"'}
            </p>
            <p className="text-indigo-100 text-sm leading-relaxed">
              {language === "ru"
                ? "Сохраняет прогресс всякий раз, когда пользователь успешно переходит на новый шаг. Минимальные накладные расходы."
                : "Saves progress whenever the user successfully navigates to a new step. Minimal overhead."}
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-indigo-100 transition-colors">
            <h3 className="font-bold text-gray-900">onChange</h3>
            <p className="text-xs text-gray-400 font-black uppercase tracking-widest italic">
              "Google Docs Style"
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {language === "ru"
                ? "Запись происходит на каждое нажатие клавиши. Рекомендуется использовать встроенный дебаунс."
                : "Writes on every keystroke. Using built-in debounce is recommended."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hybrid Storage Strategy */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Гибридное хранение (Безопасность)"
              : "Hybrid Storage (Security)"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru"
            ? "В реальных приложениях часто требуется сохранять общую информацию (имя, email) в LocalStorage, но держать чувствительные данные (номер карты, ПИН-код) строго в памяти. Наша архитектура позволяет переопределять адаптер для каждого шага."
            : "In real apps, you often need to persist common info (name, email) in LocalStorage, but keep sensitive data (card number, PIN) strictly in memory. Our architecture allows overriding the adapter per step."}
        </p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">config</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">IWizardConfig</span>{" "}
              <span className="text-emerald-400">= {"{"}</span>
            </div>
            <div className="pl-4 text-gray-500">
              {language === "ru"
                ? "// Глобально: Сохраняем всё в LocalStorage"
                : "// Global: Persist everything to LocalStorage"}
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">persistence</span>
              <span className="text-emerald-400">: {"{"}</span>
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">mode</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'onStepChange'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">adapter</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-blue-400">LocalStorageAdapter</span>
              <span className="text-emerald-400">(</span>
              <span className="text-amber-400">'app_wizard'</span>
              <span className="text-emerald-400">),</span>
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">storageKey</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'registration_v1'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-8 text-gray-500">
              {language === "ru"
                ? "// Опционально: Ждем 500мс перед записью (Debounce)"
                : "// Optional: Wait 500ms before writing (Debounce)"}
            </div>
            <div className="pl-8">
              <span className="text-indigo-400">debounceTime</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-orange-400">500</span>
            </div>
            <div className="pl-4 text-emerald-400">{" },"}</div>
            <div className="pl-4">
              <span className="text-indigo-400">steps</span>
              <span className="text-emerald-400">: [</span>
            </div>
            <div className="pl-8 text-emerald-400">{"{"}</div>
            <div className="pl-12">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'billing'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12 text-gray-500">
              {language === "ru"
                ? "// Переопределение: Только память (Memory)"
                : "// Override: Memory only"}
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">persistenceAdapter</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-blue-400">MemoryAdapter</span>
              <span className="text-emerald-400">()</span>
            </div>
            <div className="pl-8 text-emerald-400">{" },"}</div>
            <div className="pl-8 text-emerald-400">{"{"}</div>
            <div className="pl-12">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'draft-step'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12 text-gray-500">
              {language === "ru"
                ? "// Переопределение режима: Сохранение на каждый ввод"
                : "// Override mode: Save on every keystroke"}
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">persistenceMode</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'onChange'</span>
            </div>
            <div className="pl-8 text-emerald-400">{" }"}</div>
            <div className="pl-4 text-emerald-400">]</div>
            <div className="text-emerald-400">{"}"}</div>
          </pre>
        </div>
      </section>

      {/* Data Isolation Visualization */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            !
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Важно: Изоляция данных"
              : "Important: Data Isolation"}
          </h2>
        </div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-6">
          <p className="text-gray-600 leading-relaxed">
            {language === "ru" ? (
              <>
                Если ваше приложение содержит несколько визардов (например,
                «Регистрация» и «Обновление профиля»), использующих один и тот
                же
                <code className="bg-white px-1 rounded mx-1">
                  LocalStorageAdapter
                </code>
                , вы **обязаны** изолировать их данные.
              </>
            ) : (
              <>
                If your app has multiple wizards (e.g., "Registration" and
                "Profile Update") communicating with the same
                <code className="bg-white px-1 rounded mx-1">
                  LocalStorageAdapter
                </code>
                , you **must** isolate their data.
              </>
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h4 className="font-bold text-rose-600 flex items-center gap-2">
                {language === "ru"
                  ? "❌ Коллизия данных (Опасно)"
                  : "❌ Data Collision (Dangerous)"}
              </h4>
              <div className="text-[10px] font-mono bg-gray-100 p-4 rounded-lg text-gray-400">
                LocalStorage (shared):
                <br />
                - wizard_step1: "Data A"
                <br />- wizard_step1: "Data B" // 💥{" "}
                {language === "ru" ? "Перезапишет" : "Overwrites"} Data A!
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-4">
              <h4 className="font-bold text-emerald-600 flex items-center gap-2">
                {language === "ru"
                  ? "✅ Изоляция (Безопасно)"
                  : "✅ Isolation (Safe)"}
              </h4>
              <div className="text-[10px] font-mono bg-gray-100 p-4 rounded-lg text-gray-900">
                LocalStorage:
                <br />- <span className="text-emerald-600">auth_</span>
                wizard_step1: "Data A"
                <br />- <span className="text-emerald-600">profile_</span>
                wizard_step1: "Data B"
              </div>
            </div>
          </div>

          <div className="bg-indigo-950 rounded-2xl p-6 font-mono text-xs text-white">
            <div className="text-indigo-400 mb-2">
              {language === "ru"
                ? "// Рекомендуемый подход для v2"
                : "// Recommended approach for v2"}
            </div>
            <code>
              const adapter = new LocalStorageAdapter(
              <span className="text-amber-400">'my_unique_prefix'</span>);
            </code>
          </div>
        </div>
      </section>

      {/* 3. Debouncing Saves */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Программное управление"
              : "Programmatic Control"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800">
              {language === "ru" ? "Очистка и сброс" : "Clear and Reset"}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {language === "ru"
                ? "Когда пользователь успешно отправляет форму, вам следует очистить персистентное состояние, чтобы старые данные не появились при следующем запуске."
                : "When a user successfully submits the form, you should clear the persistent state so old data doesn't appear on the next run."}
            </p>
            <div className="bg-gray-950 rounded-xl p-6 font-mono text-[10px] shadow-lg">
              <pre className="text-gray-400">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-emerald-400">{"{"}</span>{" "}
                <span className="text-indigo-300">reset</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">clearStorage</span>{" "}
                <span className="text-emerald-400">{"}"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-blue-400">useWizardActions</span>
                <span className="text-emerald-400">();</span>
                <br />
                <br />
                <span className="text-purple-300">
                  {language === "ru"
                    ? "// 🆕 Полная очистка данных, истории и хранилища"
                    : "// 🆕 Full wipe: data, history, and storage"}
                </span>
                <br />
                <span className="text-indigo-300">reset</span>
                <span className="text-emerald-400">();</span>
                <br />
                <br />
                <span className="text-purple-300">
                  {language === "ru"
                    ? "// Только очистка выбранного адаптера хранения"
                    : "// Only clear the persistent storage adapter"}
                </span>
                <br />
                <span className="text-indigo-300">clearStorage</span>
                <span className="text-emerald-400">();</span>
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800">
              {language === "ru" ? "Дебаунсинг ввода" : "Debouncing Input"}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {language === "ru" ? (
                <>
                  При использовании режима{" "}
                  <code className="text-indigo-500 font-mono">onChange</code>{" "}
                  используйте опцию
                  <code className="text-indigo-500 font-mono ml-1">
                    debounceValidation
                  </code>
                  , чтобы избежать слишком частых обращений к адаптеру хранения
                  на каждое нажатие клавиши.
                </>
              ) : (
                <>
                  When using{" "}
                  <code className="text-indigo-500 font-mono">onChange</code>{" "}
                  mode, use the
                  <code className="text-indigo-500 font-mono ml-1">
                    debounceValidation
                  </code>{" "}
                  option to avoid thrashing the storage adapter on every
                  keystroke.
                </>
              )}
            </p>
            <div className="bg-gray-950 rounded-xl p-6 font-mono text-[10px] shadow-lg">
              <pre className="text-gray-400">
                <span className="text-indigo-300">setData</span>
                <span className="text-emerald-400">(</span>
                <span className="text-amber-400">'description'</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">value</span>
                <span className="text-emerald-400">, {"{"}</span>
                <br />
                <span className="pl-4">
                  <span className="text-indigo-400">debounceValidation</span>
                  <span className="text-emerald-400">:</span>{" "}
                  <span className="text-orange-400">300</span>
                </span>
                <br />
                <span className="text-emerald-400">{"}"});</span>
              </pre>
            </div>
          </div>
        </div>

        <ProTip>
          {language === "ru" ? (
            <>
              Всегда вызывайте{" "}
              <code className="text-blue-900 font-black">reset()</code>, когда
              пользователь успешно завершает работу с визардом. Это предотвратит
              появление "призраков" старых данных при следующем визите.
            </>
          ) : (
            <>
              Always call{" "}
              <code className="text-blue-900 font-black">reset()</code> when the
              user successfully completes the wizard. This prevents "ghost" old
              data from appearing on their next visit.
            </>
          )}
        </ProTip>
      </section>

      {/* Navigation */}
      <DocsNavigation />
    </div>
  );
}
