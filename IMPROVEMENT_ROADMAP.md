# 🚀 Improvement Roadmap: wizzard-packages

## 📋 Как использовать этот документ
Этот документ является единственным источником истины для планов развития библиотеки `wizzard-packages`. Все новые идеи проходят валидацию здесь.
Приоритеты: P0 (Critical), P1 (High), P2 (Medium), P3 (Nice to Have).

---

## 🌎 Epic: Multi-Framework Expansion (P1)
**Цель:** Сделать библиотеку стандартом де-факто для визардов во всех популярных фреймворках, используя мощь `@wizzard-packages/core`.

### 1.1 Vue 3 Adapter (`@wizzard-packages/vue`) (P1) ✅
- Создать пакет с `useWizard` через Vue Reactivity API (`ref`, `computed`).
- Реализовать `WizardProvider` (provide/inject).
- Интеграция с Vue DevTools.

### 1.2 Svelte 5 Adapter (`@wizzard-packages/svelte`) (P2)
- Создать Svelte Store обертку вокруг core `subscribe`.
- Поддержка Svelte 5 Runes (если релиз будет стабильным) или Store API.

### 1.3 SolidJS Adapter (P3)
- Интеграция с Fine-grained reactivity SolidJS.

---

## 🧱 Epic: Headless + UI Integrations (P1)
**Цель:** Снизить порог входа для новичков, предоставив готовые примеры интеграции с популярными UI-библиотеками ("Copy-Paste" решения).

### 2.1 Shadcn/UI Connector Example (P1) ✅
- Создать демо-проект или пакет `@wizzard-packages/ui-shadcn`.
- Показать связку: `Wizard` + `Tabs` + `Form` + `Zod`.
- **KPI:** Самый частый запрос в React-комьюнити.

### 2.2 Mantine Integration (P2)
- Интеграция с `@mantine/core` Stepper компонентом.
- Пример использования Mantine Hooks для форм внутри шагов.

---

## ⚡ Epic: Modern React & Server Features (P2)
**Цель:** Поддержка современных трендов React (RSC, Next.js App Router).

### 3.1 URL Synchronization Middleware (P2)
- Создать `UrlSyncMiddleware` или хук для синхронизации шага с URL query params (`?step=payment`).
- Поддержка `pushState` и `replaceState`.
- Важно для shareable links.

### 3.2 React Server Components (RSC) Support (P3)
- Исследовать возможность пре-рендера начального шага на сервере.
- Server Actions интеграция для сабмита шагов (`nextStep()` -> `serverAction()`).

---

## 🧠 Epic: Enterprise Logic & DevTools 2.0 (P3)
**Цель:** Инструменты для сложных сценариев (банки, страхование, сложные опросники).

### 4.1 Declarative Branching Logic (P3)
- Возможность описывать переходы декларативно в JSON конфиге.
- Пример: `if: { field: 'role', eq: 'admin', then: 'admin-setup', else: 'user-setup' }`.

### 4.2 Visualizer (Graph View) (P3)
- Визуализация графа шагов в DevTools.
- Интеграция с Mermaid.js или React Flow.

---

## 🤖 Epic: AI-Powered Wizard Generation (P2)
**Цель:** Использовать структурированную природу конфига для AI-генерации форм.

### 5.1 AI Generator Core (Prompt to Config) (P2)
- Утилита для преобразования текстового промпта в JSON `IWizardConfig` + Zod схему.
- Промпт: "Сделай форму регистрации на конференцию с оплатой".

### 5.2 Playground AI Integration (Magic Wand) (P3)
- Кнопка "Generate with AI" в интерактивной документации.
- Авто-заполнение кода примера.

---

## 📊 Tracking Progress

### Overall Completion
- [ ] Multi-Framework Expansion
- [ ] Headless + UI Integrations
- [ ] Modern React Features
- [ ] Enterprise Logic
- [ ] AI-Powered Wizard Generation

---

## 📝 Notes & Decisions
### 2026-01-24: Shadcn/UI Connector Completed ✅
- **Achievement**: Delivered `examples/shadcn-ui-connector` with factory pattern.
- **Features**:
  - `createShadcnWizard` factory for type-safe, pre-styled components.
  - Native Tailwind v4 support.
  - Documentation updated with UI Integrations section.
  - Added "Headless Core" examples to READMEs.

### 2026-01-21: Vue 0.2.0 Released to npm ✅
- **Achievement**: Successfully published `@wizzard-packages/vue@0.2.0` to npmjs.com
- **Features**:
  - Full Vue 3 Composition API adapter with feature parity to React
  - Fixed conditional steps (isVisible) resolution on initialData load
  - Aligned reset() behavior with React adapter
  - Comprehensive documentation: README expanded from 129 to 835 lines
  - 12 advanced integration examples, best practices, testing guides
- **Testing**: 49/49 unit tests passing (10 Vue-specific tests added)
- **E2E Progress**: 4/11 Vue E2E specs ported
- **CI Improvements**: Added timeout guards (15min), Playwright stability config, E2E restricted to main branch
- **Git Tag**: `@wizzard-packages/vue@0.2.0` created
- **Known Issues**: GitHub Packages publish failed (non-blocking), npmjs.com successful
- **Next Steps**: Port remaining 7 E2E specs, add HTTP probe for CI stability, deploy Vue demo to GitHub Pages

### 2026-01-20: Roadmap 2.0 Adopted ✅
- Переход от стабилизации к экспансии.
- Основной фокус: Vue адаптер и готовые UI примеры (Shadcn).
- Отказ от GitHub Packages в пользу чистого npm.

### 2026-01-20: Monorepo Stabilized ✅
- Исправлены скрипты сборки.
- Проект полностью переведен на scoped packages.

### 2026-01-20: Added AI Generation Epic ✅
- Добавлен Epic по AI-генерации визардов (P2).
- Идея: WizardConfig как идеальный таргет для LLM output.