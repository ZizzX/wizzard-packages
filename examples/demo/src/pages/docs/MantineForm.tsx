import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function MantineDocs() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Mantine Form
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru" ? "Используйте мощь " : "Leverage the power of "}
          <code className="text-cyan-600 font-bold bg-cyan-50 px-1 rounded mx-1">
            @mantine/form
          </code>{" "}
          {language === "ru"
            ? "внутри шагов вашего визарда для создания безупречного и красиво оформленного интерфейса."
            : "within your wizard steps to create a seamless and beautifully styled interface."}
        </p>
      </section>

      {/* 1. Integration Pattern */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Интеграция через Hook" : "Hook Integration"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? "С помощью хука " : "With the "}
          <code className="text-cyan-600 font-mono font-bold bg-cyan-50 px-1 rounded mx-1">
            useForm
          </code>{" "}
          {language === "ru"
            ? "от Mantine вы можете легко инициализировать значения формы из состояния визарда и сохранять их по завершении шага."
            : "hook from Mantine, you can easily initialize form values from the wizard state and persist them upon step completion."}
        </p>

        <div className="bg-gray-900 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
          <div className="bg-gray-800/50 px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">
              SettingsStep.tsx
            </span>
          </div>
          <div className="p-8 font-mono text-[13px] leading-relaxed">
            <div className="space-y-1 text-gray-300">
              <div>
                <span className="text-purple-400">import</span>{" "}
                <span className="text-emerald-400">{"{"}</span>{" "}
                <span className="text-indigo-300">useWizardActions</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">useWizardValue</span>{" "}
                <span className="text-emerald-400">{"}"}</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-amber-300">'wizzard-stepper-react'</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pt-2">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-emerald-400">{"{"}</span>{" "}
                <span className="text-indigo-300">updateData</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">goToNextStep</span>{" "}
                <span className="text-emerald-400">{"}"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-indigo-300">useWizardActions</span>
                <span className="text-emerald-400">();</span>
              </div>
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-indigo-300">form</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-indigo-300">useForm</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-sky-300">initialValues</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">useWizardValue</span>
                <span className="text-emerald-400">(</span>
                <span className="text-amber-300">'settings'</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">,</span>
              </div>
              <div className="pl-4">
                <span className="text-sky-300">validate</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-8 text-gray-500 italic">
                {language === "ru"
                  ? "// Логика валидации Mantine"
                  : "// Mantine validation logic"}
              </div>
              <div className="pl-8">
                <span className="text-sky-300">email</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">value</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-purple-400">=&gt;</span>{" "}
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">/</span>
                <span className="text-amber-300">^\S+@\S+$</span>
                <span className="text-emerald-400">/</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">test</span>
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">value</span>
                <span className="text-emerald-400">)</span> ?{" "}
                <span className="text-indigo-300">null</span>{" "}
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-300">
                  {language === "ru"
                    ? "'Некорректный email'"
                    : "'Invalid email'"}
                </span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">,</span>
              </div>
              <div className="pl-4">
                <span className="text-emerald-400">{"}"}</span>
              </div>
              <div>
                <span className="text-emerald-400">{"});"}</span>
              </div>
              <div className="pt-4">
                <span className="text-purple-400">return</span>{" "}
                <span className="text-emerald-400">(</span>
              </div>
              <div className="pl-4">
                <span className="text-emerald-400">&lt;</span>
                <span className="text-indigo-300">form</span>{" "}
                <span className="text-sky-300">onSubmit</span>
                <span className="text-emerald-400">=</span>
                <span className="text-emerald-400">{"{"}</span>
                <span className="text-indigo-300">form</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">onSubmit</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">v</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-purple-400">=&gt;</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-8">
                <span className="text-indigo-300">updateData</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">{"{"}</span>{" "}
                <span className="text-sky-300">settings</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">v</span>{" "}
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
                <span className="text-emerald-400">{" })}"}&gt;</span>
              </div>
              <div className="pl-8">
                <span className="text-emerald-400">&lt;</span>
                <span className="text-indigo-300">TextInput</span>{" "}
                <span className="text-sky-300">{"{..."}</span>
                <span className="text-indigo-300">form</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">getInputProps</span>
                <span className="text-emerald-400">(</span>
                <span className="text-amber-300">'email'</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">{"}"}</span>{" "}
                <span className="text-emerald-400">/&gt;</span>
              </div>
              <div className="pl-4">
                <span className="text-emerald-400">&lt;/</span>
                <span className="text-indigo-300">form</span>
                <span className="text-emerald-400">&gt;</span>
              </div>
              <div>
                <span className="text-emerald-400">);</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProTip>
        {language === "ru"
          ? "При работе с Mantine Form используйте паттерн "
          : "When working with Mantine Form, use the "}
        <code className="bg-blue-100 px-1 rounded font-bold mx-1">
          enhanceGetInputProps
        </code>{" "}
        {language === "ru"
          ? "для автоматической очистки данных перед тем, как они попадут в хранилище Визарда. Это гарантирует, что сохраняются только чистые, валидированные данные, предотвращая загрязнение LocalStorage или параметров URL «грязным» состоянием."
          : "pattern to automatically clean data before it reaches the Wizard storage. This ensures only clean, validated data is persisted, preventing pollution of LocalStorage or URL parameters with 'dirty' state."}
      </ProTip>

      {/* Navigation */}
      <DocsNavigation />
    </div>
  );
}
