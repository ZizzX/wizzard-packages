import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function RHFDocs() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          React Hook Form
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "Интегрируйте индустриальный стандарт производительных форм в ваш визард с надежной оркестрацией состояния."
            : "Integrate the industry standard for performant forms into your wizard with robust state orchestration."}
        </p>
      </section>

      {/* 1. Orchestration Pattern */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Паттерн «Синхронизации» (Sync)"
              : "Sync Pattern"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru"
            ? "Распространенная ошибка — держать «источник истины» в двух местах. В визарде конкретный шаг владеет состоянием "
            : "A common mistake is keeping the 'source of truth' in two places. In the wizard, a specific step owns the "}
          <code className="text-rose-600 bg-rose-50 px-1 rounded font-bold italic mx-1">
            Draft
          </code>{" "}
          {language === "ru"
            ? "(черновик), в то время как Провайдер Визарда владеет состоянием "
            : "state (draft), while the Wizard Provider owns the "}
          <code className="text-indigo-600 bg-indigo-50 px-1 rounded font-bold italic mx-1">
            Committed
          </code>{" "}
          {language === "ru"
            ? "(сохраненные данные)."
            : "state (committed data)."}
        </p>

        <div className="bg-gray-900 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
          <div className="bg-gray-800/50 px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">
              StepComponent.tsx
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
            </div>
          </div>
          <div className="p-8 font-mono text-[13px] leading-relaxed">
            <div className="space-y-1">
              <div>
                <span className="text-purple-400">function</span>{" "}
                <span className="text-indigo-300">UserStep</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-4 text-gray-500 italic">
                {language === "ru"
                  ? "// 1. Инициализация RHF данными из Визарда"
                  : "// 1. Initialize RHF with data from Wizard"}
              </div>
              <div className="pl-4">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-emerald-400">{"{"}</span>{" "}
                <span className="text-indigo-300">register</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">handleSubmit</span>{" "}
                <span className="text-emerald-400">{"}"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-indigo-300">useForm</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-8">
                <span className="text-sky-300">defaultValues</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">useWizardValue</span>
                <span className="text-emerald-400">(</span>
                <span className="text-amber-300">'user'</span>
                <span className="text-emerald-400">)</span>
              </div>
              <div className="pl-4">
                <span className="text-emerald-400">{"});"}</span>
              </div>
              <div className="pt-2 pl-4">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-emerald-400">{"{"}</span>{" "}
                <span className="text-indigo-300">updateData</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">goToNextStep</span>{" "}
                <span className="text-emerald-400">{"}"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-indigo-300">useWizardActions</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pt-2 pl-4 text-gray-500 italic">
                {language === "ru"
                  ? "// 2. Сохранение в глобальное состояние при навигации"
                  : "// 2. Commit to global state on navigation"}
              </div>
              <div className="pl-4">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-indigo-300">onSubmit</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">data</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-purple-400">=&gt;</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-8">
                <span className="text-indigo-300">updateData</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">{"{"}</span>{" "}
                <span className="text-sky-300">user</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">data</span>{" "}
                <span className="text-emerald-400">{"}"}</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pl-8">
                <span className="text-indigo-300">goToNextStep</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pl-4">
                <span className="text-emerald-400">{"};"}</span>
              </div>
              <div className="pt-2 text-purple-400">{"  return ("}</div>
              <div className="pl-8">
                <span className="text-emerald-400">&lt;</span>
                <span className="text-indigo-300">form</span>{" "}
                <span className="text-sky-300">onSubmit</span>
                <span className="text-emerald-400">=</span>
                <span className="text-emerald-400">{"{"}</span>
                <span className="text-indigo-300">handleSubmit</span>
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">onSubmit</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">{"}"}</span>
                <span className="text-emerald-400">&gt;</span>
              </div>
              <div className="pl-12 text-gray-500 italic">...</div>
              <div className="pl-8">
                <span className="text-emerald-400">&lt;/</span>
                <span className="text-indigo-300">form</span>
                <span className="text-emerald-400">&gt;</span>
              </div>
              <div className="text-purple-400">{"  );"}</div>
              <div>
                <span className="text-emerald-400">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Validation Mapping */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Взаимодействие валидаций"
              : "Validation Interop"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru"
            ? "Вы можете использовать локальную валидацию RHF, но для сложных визардов мы рекомендуем дублировать ошибки в "
            : "You can use local RHF validation, but for complex wizards we recommend mirroring errors to "}
          <code className="text-indigo-600 font-mono font-bold mx-1">
            useWizardError
          </code>
          {language === "ru"
            ? ", чтобы работали индикаторы на сайдбаре и общие проверки."
            : " so sidebar indicators and global checks work."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-gray-100 p-8 rounded-2xl bg-gray-50/30">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800">
              {language === "ru" ? "Только локально" : "Local Only"}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              {language === "ru"
                ? "Самый быстрый способ разработки. Идеально для простых, изолированных шагов, где другим шагам не важно знать, валиден ли этот шаг в данный момент."
                : "Fastest way to develop. Ideal for simple, isolated steps where other steps don't care if this step is currently valid."}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-600">
              {language === "ru" ? "Глобальная синхронизация" : "Global Sync"}
            </h4>
            <div className="bg-indigo-900 rounded-xl p-4 font-mono text-[10px] text-indigo-100 shadow-lg">
              <span className="text-gray-400 italic">
                {language === "ru"
                  ? "// Синхронизация ошибок RHF с Визардом"
                  : "// Sync RHF errors to Wizard"}
              </span>
              <br />
              <span className="text-purple-400">useEffect</span>
              <span className="text-emerald-400">(</span>
              <span className="text-emerald-400">(</span>
              <span className="text-emerald-400">)</span>{" "}
              <span className="text-purple-400">=&gt;</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
              <br />
              &nbsp;&nbsp;<span className="text-indigo-300">setErrorState</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">stepId</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">rhfErrors</span>
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">;</span>
              <br />
              <span className="text-emerald-400">{"}"}</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-emerald-400">[</span>
              <span className="text-indigo-300">rhfErrors</span>
              <span className="text-emerald-400">]</span>
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">;</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {language === "ru"
                ? "Позволяет сайтбару показывать 🔴 красные точки, если ранее пройденный шаг стал невалидным из-за изменений в других частях формы."
                : "Allows sidebar to show 🔴 red dots if a previously completed step becomes invalid due to changes elsewhere."}
            </p>
          </div>
        </div>
      </section>

      <ProTip>
        {language === "ru"
          ? "При интеграции с RHF всегда используйте "
          : "When integrating RHF, always use "}
        <code className="text-blue-900 bg-blue-50 px-1 rounded font-bold">
          mode: 'onTouched'
        </code>
        {language === "ru" ? " или " : " or "}
        <code className="text-blue-900 bg-blue-50 px-1 rounded font-bold">
          mode: 'onBlur'
        </code>{" "}
        {language === "ru"
          ? "для валидации. Это предотвращает избыточные перерисовки в Провайдере Визарда и защищает адаптер персистентности от потока временных невалидных данных черновика."
          : "for validation. This prevents excessive re-renders in the Wizard Provider and protects the persistence adapter from a flood of temporary invalid draft data."}
      </ProTip>

      {/* Navigation */}
      <DocsNavigation
        prev={{
          label: language === "ru" ? "Производительность" : "Performance",
          href: "/docs/performance",
        }}
        next={{ label: "Formik", href: "/docs/formik" }}
      />
    </div>
  );
}
