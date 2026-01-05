import { useState } from "react";
import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { WizardProvider, useWizard } from "../../wizards/docs-wizard";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import { StepperControls } from "../../components/StepperControls";
import { LocalStorageAdapter } from "wizzard-stepper-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";

const TutorialStep1 = () => {
  const { data, handleStepChange } = useWizard();
  const { language } = useTranslation();

  const text = {
    en: {
      title: "Step 1: The Context",
      desc: "First, we create a specialized context using createWizardFactory. This gives you typesafe hooks.",
      label: "What is your name?",
      placeholder: "Enter your name...",
      tip: 'Note how the UI is completely yours. The library is "headless" and doesn\'t force any specific components on you.',
    },
    ru: {
      title: "Шаг 1: Контекст",
      desc: "Сначала мы создаем специализированный контекст с помощью createWizardFactory. Это дает вам типизированные хуки.",
      label: "Как вас зовут?",
      placeholder: "Введите ваше имя...",
      tip: "Обратите внимание, что UI полностью ваш. Библиотека является «headless» и не навязывает никаких конкретных компонентов.",
    },
  };

  const t = text[language];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
        <p className="text-gray-600">
          {t.desc.split("createWizardFactory").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <code className="text-indigo-600">createWizardFactory</code>
              )}
            </span>
          ))}
        </p>
      </div>
      <Input
        label={t.label}
        value={data.userName || ""}
        onChange={(e) => handleStepChange("userName", e.target.value)}
        placeholder={t.placeholder}
      />
      <ProTip>{t.tip}</ProTip>
    </div>
  );
};

const TutorialStep2 = () => {
  const { data, handleStepChange } = useWizard();
  const { language } = useTranslation();

  const text = {
    en: {
      title: "Step 2: Handles Complexity",
      desc: "The factory manages state and transitions. You can handle checkboxes, nested objects, or even file uploads.",
      label: "Do you know React?",
    },
    ru: {
      title: "Шаг 2: Управление сложностью",
      desc: "Фабрика управляет состоянием и переходами. Вы можете работать с чекбоксами, вложенными объектами или даже загрузкой файлов.",
      label: "Вы знаете React?",
    },
  };

  const t = text[language];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
        <p className="text-gray-600">{t.desc}</p>
      </div>
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <input
          type="checkbox"
          id="react"
          className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={!!data.knowsReact}
          onChange={(e) => handleStepChange("knowsReact", e.target.checked)}
        />
        <label htmlFor="react" className="font-medium text-gray-900">
          {t.label}
        </label>
      </div>
    </div>
  );
};

const TutorialStep3 = () => {
  const { data } = useWizard();
  const { language } = useTranslation();

  const text = {
    en: {
      title: "Step 3: Review & Submit",
      desc: "All your data is centrally managed and ready to be sent to your API.",
    },
    ru: {
      title: "Шаг 3: Проверка и отправка",
      desc: "Все ваши данные управляются централизованно и готовы к отправке в ваш API.",
    },
  };

  const t = text[language];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
        <p className="text-gray-600">{t.desc}</p>
      </div>
      <div className="bg-gray-950 rounded-xl p-6 font-mono text-sm shadow-inner overflow-auto">
        <pre className="text-indigo-400">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

const TutorialContent = () => {
  const { currentStep, currentStepIndex, goToStep } = useWizard();
  const [showSuccess, setShowSuccess] = useState(false);
  const { language } = useTranslation();

  const text = {
    en: {
      successTitle: "Tutorial Complete!",
      successDesc:
        "You've mastered the basics of wizzard-stepper-react. Redirecting you back to start...",
      builtTitle: "Wait, how was this built?",
      builtDesc:
        "The window above is actually running wizzard-stepper-react! It uses LocalStorage to remember your name if you refresh, and it handles the active step state automatically.",
      readDocs: "Read the Docs Below ↓",
    },
    ru: {
      successTitle: "Обучение завершено!",
      successDesc:
        "Вы освоили основы wizzard-stepper-react. Перенаправляем вас в начало...",
      builtTitle: "Подождите, а как это сделано?",
      builtDesc:
        "Окно выше на самом деле работает на wizzard-stepper-react! Оно использует LocalStorage, чтобы помнить ваше имя после обновления страницы, и автоматически управляет активным шагом.",
      readDocs: "Читать документацию ниже ↓",
    },
  };

  const t = text[language];

  if (!currentStep) return null;

  const handleComplete = async () => {
    setShowSuccess(true);
    setTimeout(async () => {
      setShowSuccess(false);
      await goToStep("step1");
    }, 2500);
  };

  return (
    <div className="space-y-8 relative">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl flex flex-col items-center justify-center min-h-[400px]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mb-6"
            >
              🎉
            </motion.div>
            <h3 className="text-3xl font-bold mb-2">{t.successTitle}</h3>
            <p className="text-indigo-100 text-lg max-w-sm">{t.successDesc}</p>
          </motion.div>
        ) : (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-2 border-indigo-100 shadow-xl overflow-hidden bg-white">
              <div className="h-1 bg-indigo-100 w-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${(currentStepIndex + 1) * 33.33}%` }}
                />
              </div>
              <CardContent className="p-8">
                {currentStep.id === "step1" && <TutorialStep1 />}
                {currentStep.id === "step2" && <TutorialStep2 />}
                {currentStep.id === "step3" && <TutorialStep3 />}

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <StepperControls onComplete={handleComplete} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">{t.builtTitle}</h3>
        <p className="text-gray-600 leading-relaxed">
          {t.builtDesc.split("wizzard-stepper-react").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <code className="text-indigo-600">wizzard-stepper-react</code>
              )}
            </span>
          ))}
        </p>
        <Button
          variant="outline"
          onClick={() =>
            document
              .getElementById("basic-usage")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t.readDocs}
        </Button>
      </div>
    </div>
  );
};

export default function QuickStart() {
  const { language } = useTranslation();

  const config = {
    steps: [
      { id: "step1", label: language === "ru" ? "Интро" : "Intro" },
      { id: "step2", label: language === "ru" ? "Навыки" : "Skills" },
      { id: "step3", label: language === "ru" ? "Обзор" : "Review" },
    ],
    persistence: {
      mode: "onChange" as const,
      adapter: new LocalStorageAdapter("tutorial_"),
    },
  };

  const pageText = {
    en: {
      title: "Quick Start",
      subtitle:
        "Learn by doing. Try out this interactive example built using the library.",
      basicUsage: "Basic Usage",
      basicUsageDesc:
        "To get started, create a wizard context and wrap your application (or a part of it) in a provider.",
      prevLabel: "Installation",
      nextLabel: "Core Concepts",
    },
    ru: {
      title: "Быстрый старт",
      subtitle:
        "Учитесь на практике. Попробуйте этот интерактивный пример, созданный на основе библиотеки.",
      basicUsage: "Базовое использование",
      basicUsageDesc:
        "Для начала создайте контекст визарда и оберните ваше приложение (или его часть) в провайдер.",
      prevLabel: "Установка",
      nextLabel: "Основные концепции",
    },
  };

  const t = pageText[language];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">{t.subtitle}</p>
      </div>

      <WizardProvider config={config}>
        <TutorialContent />
      </WizardProvider>

      <section
        id="basic-usage"
        className="space-y-6 pt-10 border-t border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900">{t.basicUsage}</h2>
        <p className="text-gray-600">{t.basicUsageDesc}</p>
        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-4">
            <div>
              <span className="text-purple-400">import</span>{" "}
              <span className="text-emerald-400">{"{ "}</span>{" "}
              <span className="text-blue-400">createWizardFactory</span>{" "}
              <span className="text-emerald-400">{" }"}</span>{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-amber-400">'wizzard-stepper-react'</span>
              <span className="text-emerald-400">;</span>
            </div>

            <div className="space-y-1">
              <div className="text-gray-500">
                // 1. Create a schema for your data
              </div>
              <div>
                <span className="text-purple-400">interface</span>{" "}
                <span className="text-amber-400">MyData</span>{" "}
                <span className="text-emerald-400">{"{ "}</span>{" "}
                <span className="text-indigo-300">name</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-rose-400">string</span>
                <span className="text-emerald-400">; {"}"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-gray-500">// 2. Create the factory</div>
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-emerald-400">{"{ "}</span>{" "}
                <span className="text-indigo-400">WizardProvider</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-400">useWizard</span>{" "}
                <span className="text-emerald-400">{" }"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-blue-400">createWizardFactory</span>
                <span className="text-emerald-400">&lt;</span>
                <span className="text-amber-400">MyData</span>
                <span className="text-emerald-400">&gt;();</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-gray-500">
                // 3. Use it in your components
              </div>
              <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-amber-400">MyWizard</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-emerald-400">() =&gt; {"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-emerald-400">{"{ "}</span>{" "}
                <span className="text-indigo-300">wizardData</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">handleStepChange</span>{" "}
                <span className="text-emerald-400">{" }"}</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-blue-400">useWizard</span>
                <span className="text-emerald-400">();</span>
              </div>
              <div className="pl-4 text-purple-400">
                return <span className="text-emerald-400">(</span>
              </div>
              <div className="pl-8 text-emerald-400">
                &lt;<span className="text-amber-400">input</span>
              </div>
              <div className="pl-12 text-gray-300">
                <span className="text-indigo-400">value</span>
                <span className="text-emerald-400">=</span>
                <span className="text-emerald-400">{"{"}</span>
                <span className="text-indigo-300">wizardData</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">name</span>
                <span className="text-emerald-400">{"}"}</span>
              </div>
              <div className="pl-12 text-gray-300">
                <span className="text-indigo-400">onChange</span>
                <span className="text-emerald-400">=</span>
                <span className="text-emerald-400">{"{"}</span>
                <span className="text-indigo-300">e</span>{" "}
                <span className="text-purple-400">=&gt;</span>{" "}
                <span className="text-blue-400">handleStepChange</span>
                <span className="text-emerald-400">(</span>
                <span className="text-amber-400">'name'</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">e</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">target</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">value</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">{"}"}</span>
              </div>
              <div className="pl-8 text-emerald-400">/&gt;</div>
              <div className="pl-4 text-purple-400">
                <span className="text-emerald-400">);</span>
              </div>
              <div className="text-emerald-400">{"};"}</div>
            </div>

            <div className="space-y-1">
              <div className="text-gray-500">// 4. Wrap with Provider</div>
              <div>
                <span className="text-purple-400">export default function</span>{" "}
                <span className="text-amber-400">App</span>
                <span className="text-emerald-400">() {"{"}</span>
              </div>
              <div className="pl-4 text-purple-400">
                return <span className="text-emerald-400">(</span>
              </div>
              <div className="pl-8 text-emerald-400">
                &lt;<span className="text-amber-400">WizardProvider</span>{" "}
                <span className="text-indigo-400">config</span>
                <span className="text-emerald-400">=</span>
                <span className="text-emerald-400">{"{"}</span>
                <span className="text-emerald-400">{"{ "}</span>
                <span className="text-indigo-300">steps</span>
                <span className="text-emerald-400">: [</span>
                <span className="text-emerald-400">{"{ "}</span>
                <span className="text-indigo-300">id</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-400">'step1'</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">label</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-400">'Start'</span>
                <span className="text-emerald-400"> {"} ] }"}</span>
                <span className="text-emerald-400">{"}"}</span>&gt;
              </div>
              <div className="pl-12 text-gray-300">
                &lt;<span className="text-amber-400">MyWizard</span> /&gt;
              </div>
              <div className="pl-8 text-emerald-400">
                &lt;/<span className="text-amber-400">WizardProvider</span>&gt;
              </div>
              <div className="pl-4 text-purple-400">
                <span className="text-emerald-400">);</span>
              </div>
              <div className="text-emerald-400">{"}"}</div>
            </div>
          </pre>
        </div>
      </section>
      <DocsNavigation />
    </div>
  );
}
