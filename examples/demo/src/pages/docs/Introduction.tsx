import { useVersion } from "../../context/VersionContext";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const { version } = useVersion();
  const { language } = useTranslation();
  const navigate = useNavigate();
  const isV2 = version === "2.0.0";

  const content = {
    en: (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Introduction
          </h1>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                isV2
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {isV2 ? "v2.0.0 (Modern)" : "v1.7.2 (Legacy)"}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-500 text-sm font-medium">
              Headless Wizard Engine
            </span>
          </div>
          <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl">
            Flexible, lightweight, and strictly typed library for managing
            multi-step form states in React.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-200">
                🌱
              </div>
              <h3 className="text-xl font-bold text-emerald-900">
                For Beginners (Junior)
              </h3>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Think of the library as the <strong>"Brain"</strong> of your
              wizard, and your components as the <strong>"Face"</strong>. The
              library remembers which step you're on and what data you've
              entered, while you decide how to render input fields and "Next"
              buttons.
            </p>
            <ul className="space-y-2 text-sm text-emerald-700 pt-2">
              <li className="flex items-center gap-2">
                ✅ Pure Logic, No UI Boilerplate
              </li>
              <li className="flex items-center gap-2">
                ✅ Simple Transition Logic
              </li>
              <li className="flex items-center gap-2">
                ✅ Built-in Persistence
              </li>
            </ul>
          </div>

          <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-200">
                🧠
              </div>
              <h3 className="text-xl font-bold text-indigo-900">
                Senior Deep Dive
              </h3>
            </div>
            <p className="text-indigo-800 leading-relaxed">
              {isV2
                ? "v2 is built on an external Store with a subscription model. Selectors ensure O(1) render complexity, completely eliminating the Context Provider problem where the whole tree re-renders on every keystroke."
                : "v1 uses standard React Context. It's simple and fine for small forms, but causes full subtree re-renders on every state change. Recommended only for basic scenarios."}
            </p>
            <ul className="space-y-2 text-sm text-indigo-700 pt-2">
              <li className="flex items-center gap-2">
                ⚡ Atomic Subscriptions (v2)
              </li>
              <li className="flex items-center gap-2">🛠️ Middleware System</li>
              <li className="flex items-center gap-2">🏗️ Factory Pattern</li>
            </ul>
          </div>
        </div>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Why choose us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">01.</span> Headless
                by Design
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We provide the logic, state management, and orchestration. You
                bring the UI. Works perfectly with Tailwind, Radix UI, Shadcn,
                or your own design system.
              </p>
            </div>
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">02.</span> Strictly
                Typed
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Written in TypeScript from the ground up. Enjoy full
                autocompletion and type safety for your data and step
                definitions. Zero <code>any</code>.
              </p>
            </div>
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">03.</span> Battle
                Tested
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Native support for Formik, React Hook Form, Zod, and Yup. Easily
                handles complex validation and progress persistence across
                refreshes.
              </p>
            </div>
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">04.</span>{" "}
                Extensible
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Configure everything: from storage adapters (LocalStorage, URL,
                RAM) to validation strategies and navigation logic.
              </p>
            </div>
          </div>
        </section>

        <section className="p-10 bg-gray-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isV2 ? "Getting Started with v2.0.0" : "Using Legacy v1.7.2"}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            {isV2
              ? "v2.0.0 introduces the Factory pattern. This is the recommended way to build wizards as it provides perfect type inference and superior performance."
              : "If you're maintaining an older project, you're likely using WizardProvider. We've kept v1 support, but recommend considering migration to v2 for better DX."}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => navigate("/docs/quickstart")}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
            >
              Quick Start
            </button>
            <button
              onClick={() =>
                navigate(isV2 ? "/docs/concepts" : "/docs/migration")
              }
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all backdrop-blur-sm border border-white/10 active:scale-95"
            >
              {isV2 ? "v2 Architecture" : "Migrate to v2"}
            </button>
          </div>
        </section>

        <ProTip>
          <strong>Multiple Wizards?</strong> If your app has multiple wizards
          (e.g., Signup and Profile Update) using LocalStorage, you{" "}
          <strong>MUST</strong>
          provide a unique <code>storageKey</code> or <code>prefix</code> for
          each. Otherwise, their data will overwrite each other.
        </ProTip>
      </div>
    ),
    ru: (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Введение
          </h1>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                isV2
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {isV2 ? "v2.0.0 (Modern)" : "v1.7.2 (Legacy)"}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-500 text-sm font-medium">
              Headless Wizard Engine
            </span>
          </div>
          <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl">
            Гибкая, легкая и максимально типизированная библиотека для
            управления состоянием многошаговых форм в React.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-200">
                🌱
              </div>
              <h3 className="text-xl font-bold text-emerald-900">
                Для начинающих (Junior)
              </h3>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Представьте библиотеку как <strong>"Мозг"</strong> вашего визарда,
              а ваши компоненты — как <strong>"Лицо"</strong>. Библиотека
              помнит, на каком вы шаге и что ввели в поля, а вы решаете, как
              нарисовать кнопку "Далее" или поля ввода.
            </p>
            <ul className="space-y-2 text-sm text-emerald-700 pt-2">
              <li className="flex items-center gap-2">
                ✅ Никакой привязки к UI
              </li>
              <li className="flex items-center gap-2">
                ✅ Простая логика переходов
              </li>
              <li className="flex items-center gap-2">
                ✅ Автоматическое сохранение данных
              </li>
            </ul>
          </div>

          <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-200">
                🧠
              </div>
              <h3 className="text-xl font-bold text-indigo-900">
                Senior Deep Dive
              </h3>
            </div>
            <p className="text-indigo-800 leading-relaxed">
              {isV2
                ? "v2 базируется на внешнем Store с системой подписок. Селекторы обеспечивают сложность перерендера O(1), полностью исключая проблему Context Provider, который обновляет всё дерево при каждом нажатии клавиши."
                : "v1 использует стандартный React Context. Это просто и удобно для небольших форм, но вызывает полный ререндер поддерева при любом изменении стейта. Рекомендуется только для простых сценариев."}
            </p>
            <ul className="space-y-2 text-sm text-indigo-700 pt-2">
              <li className="flex items-center gap-2">
                ⚡ Атомарные подписки (v2)
              </li>
              <li className="flex items-center gap-2">
                🛠️ Система Middleware для аналитики
              </li>
              <li className="flex items-center gap-2">
                🏗️ Factory Pattern для идеальных типов
              </li>
            </ul>
          </div>
        </div>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Почему выбирают нас?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">01.</span> Headless
                по дизайну
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Мы предоставляем логику, управление состоянием и оркестрацию. Вы
                приносите UI. Идеально работает с Tailwind, Radix UI, Shadcn или
                вашей собственной дизайн-системой.
              </p>
            </div>
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">02.</span> Строгая
                типизация
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Написано на TypeScript с нуля. Наслаждайтесь полным
                автодополнением и типобезопасностью ваших данных и определений
                шагов. Никаких <code>any</code>.
              </p>
            </div>
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">03.</span> Проверен
                в боях
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Встроенная поддержка Formik, React Hook Form, Zod и Yup. Легко
                справляется со сложной валидацией и сохранением прогресса между
                перезагрузками.
              </p>
            </div>
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                <span className="text-indigo-500 font-mono">04.</span>{" "}
                Расширяемость
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Настраивайте всё: от адаптеров хранилища (LocalStorage, URL,
                RAM) до стратегий валидации и логики навигации.
              </p>
            </div>
          </div>
        </section>

        <section className="p-10 bg-gray-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isV2 ? "Начинаем работу с v2.0.0" : "Использование Legacy v1.7.2"}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            {isV2
              ? "Версия 2.0.0 вводит паттерн Factory. Это рекомендуемый способ создания визардов, так как он обеспечивает идеальный вывод типов и превосходную производительность."
              : "Если вы поддерживаете старый проект, скорее всего, вы используете WizardProvider. Мы сохранили поддержку v1, но рекомендуем рассмотреть миграцию на v2 для лучшего DX."}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => navigate("/docs/quickstart")}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
            >
              Быстрый старт
            </button>
            <button
              onClick={() =>
                navigate(isV2 ? "/docs/concepts" : "/docs/migration")
              }
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all backdrop-blur-sm border border-white/10 active:scale-95"
            >
              {isV2 ? "Архитектура v2" : "Миграция на v2"}
            </button>
          </div>
        </section>

        <ProTip>
          <strong>Несколько визардов?</strong> Если в вашем приложении несколько
          визардов (например, регистрация и обновление профиля), использующих
          LocalStorage, вы <strong>ОБЯЗАНЫ</strong> указать уникальный{" "}
          <code>storageKey</code> или <code>prefix</code> для каждого из них.
          Иначе их данные будут перезаписывать друг друга.
        </ProTip>
      </div>
    ),
  };

  return content[language];
}
