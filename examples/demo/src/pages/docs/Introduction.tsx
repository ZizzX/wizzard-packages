import { useDocVersion } from "../../context/DocVersionContextLogic";
import { ProTip } from "../../components/ProTip";

export default function Introduction() {
  const { version } = useDocVersion();
  const isV2 = version === "2.0.0";
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Introduction
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed uppercase tracking-widest text-sm font-bold opacity-50">
          {isV2 ? "v2.0.0 (Latest)" : "v1.x.x (Legacy)"}
        </p>
        <p className="text-xl text-gray-600 leading-relaxed">
          A flexible, headless, and strictly typed multi-step wizard library for
          React.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Junior Corner */}
        <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-500 rounded-xl text-white">🌱</span>
            <h3 className="text-lg font-bold text-emerald-900 font-display">
              Junior Corner
            </h3>
          </div>
          <p className="text-emerald-800 text-sm leading-relaxed">
            Think of the library as a <strong>Brain</strong> (State) and your
            components as the <strong>Face</strong> (UI). The brain remembers
            which step you are on and what data you entered, while you decide
            how to draw the "Next" button or the input fields.
          </p>
        </div>

        {/* Senior Deep Dive */}
        <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-500 rounded-xl text-white">🧠</span>
            <h3 className="text-lg font-bold text-indigo-900 font-display">
              Senior Deep Dive
            </h3>
          </div>
          <p className="text-indigo-800 text-sm leading-relaxed">
            {isV2
              ? "v2 uses an external State Store with a subscription model. Selectors ensure O(1) re-render complexity by avoiding Context provider updates for every keystroke."
              : "v1 uses a standard React Context provider. While simple, it triggers a full sub-tree re-render on any state change. Recommended for simple wizards only."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-gray-900">
            Headless by Design
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We provide the logic, state management, and orchestration. You bring
            the UI. Works perfectly with Tailwind, Shadcn, or your own design
            system.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-gray-900">Strictly Typed</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Built with TypeScript first. Enjoy full autocomplete and type safety
            for your wizard data and step definitions.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-gray-900">Battle Tested</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Includes built-in support for Formik, React Hook Form, Zod, and Yup.
            Handle complex validation and persistent state with ease.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-gray-900">Extensible</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Customize everything from persistence adapters (LocalStorage, URL,
            RAM) to validation strategies and navigation logic.
          </p>
        </div>
      </div>

      <section className="space-y-4 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          {isV2 ? "Getting Started with v2" : "Using Legacy v1"}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {isV2
            ? "Version 2.0.0 introduces the Factory Pattern. This is the recommended way to build wizards as it provides perfect type inference and superior performance."
            : "If you are maintaining an older project, you might be using the legacy WizardProvider. Consider migrating to v2 for better performance and developer experience."}
        </p>
        <p className="text-gray-600 leading-relaxed">
          <code className="text-indigo-600 font-bold">
            wizzard-stepper-react
          </code>{" "}
          was built to solve these problems while remaining lightweight and
          unopinionated about your components.
        </p>
      </section>
      <ProTip>
        <strong>Multiple Wizards?</strong> If you have more than one wizard in
        your app using LocalStorage, you <strong>MUST</strong> provide a unique{" "}
        <code>storageKey</code> or <code>prefix</code> for each instance.
        Otherwise, their data will clash.
      </ProTip>
    </div>
  );
}
