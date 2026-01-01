import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    "nav.overview": "Overview",
    "nav.docs": "Documentation",
    "nav.examples": "Examples",
    "nav.github": "GitHub",
    // Sidebar Groups
    "sidebar.getting_started": "Getting Started",
    "sidebar.core_concepts": "Core Concepts",
    "sidebar.advanced": "Advanced",
    "sidebar.integrations": "Integrations",
    // Sidebar Items
    "item.introduction": "Introduction",
    "item.installation": "Installation",
    "item.migration": "Migration Guide 🚀",
    "item.quickstart": "Quick Start",
    "item.concepts": "Overview & Factory",
    "item.hooks": "Hooks API",
    "item.types": "Type Reference",
    "item.persistence": "Persistence",
    "item.validation": "Validation",
    "item.conditional": "Conditional Flow",
    "item.middleware": "Middleware & DevTools",
    "item.routing": "Routing & URL",
    "item.rendering": "Step Rendering",
    "item.deferred": "Deferred Rendering",
    "item.enterprise": "Enterprise Guide",
    "item.performance": "Performance",
    "item.security": "Security & Integrity",
    "item.rhf": "React Hook Form",
    "item.formik": "Formik",
    "item.mantine": "Mantine Form",
    "item.tanstack": "TanStack Form",
    "item.valibot": "Valibot",
    // Navigation
    "nav.prev": "Back",
    "nav.next": "Next",
    // UI
    "ui.version": "Documentation Version",
    "ui.menu": "Docs Menu",
    "ui.navigation": "Navigation",
    "ui.footer": "Built with ♥ using wizzard-stepper-react",
    // Migration Guide
    "migration.title": "Migration Guide (v1.x → v2.0.0) 🚀",
    "migration.subtitle":
      "Learn how to upgrade your wizards from the legacy Context-based architecture to the highly optimized Store-based engine.",
    "migration.why_upgrade": "Why Upgrade?",
    "migration.zero_rerenders": "Zero Re-renders",
    "migration.zero_rerenders_desc":
      "Update specific data points without re-rendering the entire wizard tree.",
    "migration.middleware": "Middleware Support",
    "migration.middleware_desc":
      "Perfect for logging, analytics, and complex side-effects.",
    "migration.devtools": "DevTools",
    "migration.devtools_desc": "Full Redux-style debugging in your browser.",
    "migration.universal_store": "Universal Store",
    "migration.universal_store_desc":
      "Access wizard state from outside the React tree if needed.",
    "migration.core_update": "1. The Core Update: Factory Pattern",
    "migration.factory_desc":
      "In v1, you used a generic generic WizardProvider. In v2, we use a Factory to generate typesafe hooks and providers.",
    "migration.legacy_v1": "Legacy (v1)",
    "migration.modern_v2": "Modern (v2)",
    "migration.optimized_selectors": "2. Optimized Selectors",
    "migration.selectors_desc":
      "Stop using useWizard() for everything! v2 introduces granular selectors to boost performance.",
    "migration.breaking_changes": "3. Breaking Changes Checklist",
    "migration.breadcrumb_status": "Breadcrumb Statuses",
    "migration.breadcrumb_desc":
      "'future' status renamed to 'upcoming'. Added 'completed' and 'error' statuses.",
    "migration.action_names": "Action Names",
    "migration.action_desc":
      "handleStepChange is now also available via setData in useWizardActions().",
    "migration.protip":
      "If you are starting a new project, always use the Factory Pattern. It ensures your app remains performant as it grows.",
    // V2 Banner
    "migration.banner.title": "Starting with v2.0.0",
    "migration.banner.description":
      "Version 2.0.0 introduces the Factory pattern. This is the recommended way to create wizards as it provides perfect type inference and superior performance.",
    "migration.banner.btn_quickstart": "Quick Start",
    "migration.banner.btn_architecture": "Architecture v2",
    // Home Page
    "home.title_prefix": "Build Perfect",
    "home.title_highlight": "Multi-Step",
    "home.title_suffix": "Experiences",
    "home.subtitle":
      "A flexible, headless wizard stepper for React. Persistence, validation, and complex flows made simple.",
    "home.get_started": "Get Started",
    "home.view_examples": "View Examples",
    "home.feature_fast": "Fast & Small",
    "home.feature_fast_desc":
      "Zero dependencies at core, less than 5kB gzipped. Perfect for any size of project.",
    "home.feature_types": "Type Safe",
    "home.feature_types_desc":
      "Built with TypeScript. Get full autocomplete for your data and step IDs.",
    "home.feature_headless": "Headless",
    "home.feature_headless_desc":
      "Use any UI library. We manage the state, you manage the look and feel.",
    "home.ready_title": "Ready to integrate?",
    "home.ready_desc":
      "Install the core package and start building your next user onboarding flow in minutes.",
    // Navigation
    "nav.prev": "Back",
    "nav.next": "Next",
    // UI
    "ui.version": "Documentation Version",
    "ui.menu": "Docs Menu",
    "ui.navigation": "Navigation",
    "ui.footer": "Built with ♥ using wizzard-stepper-react",
    // Migration Guide
    "migration.title": "Migration Guide (v1.x → v2.0.0) 🚀",
    "migration.subtitle":
      "Learn how to upgrade your wizards from the legacy Context-based architecture to the highly optimized Store-based engine.",
    "migration.why_upgrade": "Why Upgrade?",
    "migration.zero_rerenders": "Zero Re-renders",
    "migration.zero_rerenders_desc":
      "Update specific data points without re-rendering the entire wizard tree.",
    "migration.middleware": "Middleware Support",
    "migration.middleware_desc":
      "Perfect for logging, analytics, and complex side-effects.",
    "migration.devtools": "DevTools",
    "migration.devtools_desc": "Full Redux-style debugging in your browser.",
    "migration.universal_store": "Universal Store",
    "migration.universal_store_desc":
      "Access wizard state from outside the React tree if needed.",
    "migration.core_update": "1. The Core Update: Factory Pattern",
    "migration.factory_desc":
      "In v1, you used a generic generic WizardProvider. In v2, we use a Factory to generate typesafe hooks and providers.",
    "migration.legacy_v1": "Legacy (v1)",
    "migration.modern_v2": "Modern (v2)",
    "migration.optimized_selectors": "2. Optimized Selectors",
    "migration.selectors_desc":
      "Stop using useWizard() for everything! v2 introduces granular selectors to boost performance.",
    "migration.breaking_changes": "3. Breaking Changes Checklist",
    "migration.breadcrumb_status": "Breadcrumb Statuses",
    "migration.breadcrumb_desc":
      "'future' status renamed to 'upcoming'. Added 'completed' and 'error' statuses.",
    "migration.action_names": "Action Names",
    "migration.action_desc":
      "handleStepChange is now also available via setData in useWizardActions().",
    "migration.protip":
      "If you are starting a new project, always use the Factory Pattern. It ensures your app remains performant as it grows.",
    // V2 Banner
    "migration.banner.title": "Starting with v2.0.0",
    "migration.banner.description":
      "Version 2.0.0 introduces the Factory pattern. This is the recommended way to create wizards as it provides perfect type inference and superior performance.",
    "migration.banner.btn_quickstart": "Quick Start",
    "migration.banner.btn_architecture": "Architecture v2",
  },
  ru: {
    // Navbar
    "nav.overview": "Обзор",
    "nav.docs": "Документация",
    "nav.examples": "Примеры",
    "nav.github": "GitHub",
    // Sidebar Groups
    "sidebar.getting_started": "Начало работы",
    "sidebar.core_concepts": "Основные концепции",
    "sidebar.advanced": "Продвинутые темы",
    "sidebar.integrations": "Интеграции",
    // Sidebar Items
    "item.introduction": "Введение",
    "item.installation": "Установка",
    "item.migration": "Миграция 🚀",
    "item.quickstart": "Быстрый старт",
    "item.concepts": "Обзор и Фабрика",
    "item.hooks": "Hooks API",
    "item.types": "Типизация",
    "item.persistence": "Персистентность",
    "item.validation": "Валидация",
    "item.conditional": "Условная логика",
    "item.middleware": "Middleware и DevTools",
    "item.routing": "Роутинг и URL",
    "item.rendering": "Отрисовка шагов",
    "item.deferred": "Deferred Rendering",
    "item.enterprise": "Enterprise Сценарии",
    "item.performance": "Производительность",
    "item.security": "Безопасность",
    "item.rhf": "React Hook Form",
    "item.formik": "Formik",
    "item.mantine": "Mantine Form",
    "item.tanstack": "TanStack Form",
    "item.valibot": "Valibot",
    // Home Page
    "home.title_prefix": "Создавайте Идеальные",
    "home.title_highlight": "Многошаговые",
    "home.title_suffix": "Интерфейсы",
    "home.subtitle":
      "Гибкий, headless wizard stepper для React. Персистентность, валидация и сложные потоки — это просто.",
    "home.get_started": "Начать",
    "home.view_examples": "Примеры",
    "home.feature_fast": "Быстрый и Легкий",
    "home.feature_fast_desc":
      "Ноль зависимостей в ядре, менее 5кБ в gzip. Идеально для проектов любого размера.",
    "home.feature_types": "Типобезопасный",
    "home.feature_types_desc":
      "Написан на TypeScript. Полный автокомплит для ваших данных и шагов.",
    "home.feature_headless": "Headless",
    "home.feature_headless_desc":
      "Используйте любую UI библиотеку. Мы управляем состоянием, вы — внешним видом.",
    "home.ready_title": "Готовы к интеграции?",
    "home.ready_desc":
      "Установите пакет и начните создавать ваш следующий флоу онбординга за считанные минуты.",
    // Migration Guide
    "migration.title": "Руководство по миграции (v1.x → v2.0.0) 🚀",
    "migration.subtitle":
      "Узнайте, как обновить ваши визарды с устаревшей Context-архитектуры на высокопроизводительный движок Store.",
    "migration.why_upgrade": "Зачем обновляться?",
    "migration.zero_rerenders": "Ноль ре-рендеров",
    "migration.zero_rerenders_desc":
      "Обновляйте точечные данные без перерисовки всего дерева визарда.",
    "migration.middleware": "Поддержка Middleware",
    "migration.middleware_desc":
      "Идеально для логирования, аналитики и сложных сайд-эффектов.",
    "migration.devtools": "DevTools",
    "migration.devtools_desc":
      "Полноценная Redux-style отладка прямо в браузере.",
    "migration.universal_store": "Универсальное хранилище",
    "migration.universal_store_desc":
      "Доступ к состоянию визарда извне React-дерева при необходимости.",
    "migration.core_update": "1. Главное обновление: Фабричный паттерн",
    "migration.factory_desc":
      "В v1 вы использовали общий WizardProvider. В v2 мы используем Фабрику для генерации типобезопасных хуков и провайдеров.",
    "migration.legacy_v1": "Legacy (v1)",
    "migration.modern_v2": "Modern (v2)",
    "migration.optimized_selectors": "2. Оптимизированные селекторы",
    "migration.selectors_desc":
      "Перестаньте использовать useWizard() для всего! v2 вводит гранулярные селекторы для повышения производительности.",
    "migration.breaking_changes": "3. Чек-лист критических изменений",
    "migration.breadcrumb_status": "Статусы хлебных крошек",
    "migration.breadcrumb_desc":
      "Статус 'future' переименован в 'upcoming'. Добавлены статусы 'completed' и 'error'.",
    "migration.action_names": "Имена экшенов",
    "migration.action_desc":
      "handleStepChange теперь также доступен через setData в useWizardActions().",
    "migration.protip":
      "Если вы начинаете новый проект, всегда используйте Фабричный Паттерн. Это гарантирует производительность приложения по мере его роста.",
    // V2 Banner
    "migration.banner.title": "Начинаем работу с v2.0.0",
    "migration.banner.description":
      "Версия 2.0.0 вводит паттерн Factory. Это рекомендуемый способ создания визардов, так как он обеспечивает идеальный вывод типов и превосходную производительность.",
    "migration.banner.btn_quickstart": "Быстрый старт",
    "migration.banner.btn_architecture": "Архитектура v2",
    // Navigation
    "nav.prev": "Назад",
    "nav.next": "Далее",
    // UI
    "ui.version": "Версия документации",
    "ui.menu": "Меню документации",
    "ui.navigation": "Навигация",
    "ui.footer": "Создано с ♥ на wizzard-stepper-react",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app-language");
    return (saved === "ru" || saved === "en" ? saved : "ru") as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

//eslint-disable-next-line react-refresh/only-export-components
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
