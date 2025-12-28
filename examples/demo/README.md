# wizzard-stepper-react Demo

[**🔴 Live Demo**](https://ZizzX.github.io/wizzard-stepper-react-demo/) | [Source Code](https://github.com/ZizzX/wizzard-stepper-react)

This is the official demonstration application for the [wizzard-stepper-react](https://github.com/ZizzX/wizzard-stepper-react) library. It showcases various integration patterns, validation strategies, and a modern UI/UX implementation.

## 🎨 Features & Tech Stack

- **Interactive Documentation**: Dedicated portal with Core Concepts, Hooks API, and Type Reference.
- **Modern UI**: Full UI/UX overhaul using **Tailwind CSS v4**.
- **Responsive Design**: Mobile-friendly, card-based layouts.
- **Reusable Core Components**: Custom built `Button`, `Input`, and `Card` components for consistency.
- **React 19 & Vite**: Leveraging the latest performance improvements.

## 🧙 Wizard Examples

The demo includes four primary implementation patterns:

1. **Simple Wizard**: Basic state management using the built-in `LocalStorageAdapter` for persistence.
2. **React Hook Form + Zod**: Powerful schema-based validation using `ZodAdapter`.
3. **Formik + Yup**: Classic form management integration using `YupAdapter`.
4. **Conditional Steps**: Demonstrating dynamic step routing based on user input.
5. **Advanced Features (/advanced)**: 🆕 Showcasing `showWhilePending`, `isBusy` loading states, and prioritized validation logic.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository (if you haven't):
   ```bash
   git clone https://github.com/ZizzX/wizzard-stepper-react.git
   cd wizzard-stepper-react/examples/demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 🛠 Project Structure

- `src/components/ui/`: Reusable primitive components (Button, Input, Card).
- `src/pages/`: Individual wizard implementation examples.
- `src/lib/utils.ts`: Utility functions (e.g., `cn` for Tailwind class merging).

## 📄 License

MIT © [ZizzX](https://github.com/ZizzX)
