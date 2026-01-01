import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";

export default function MigrationGuide() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Migration Guide (v1.x → v2.0.0) 🚀
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          Learn how to upgrade your wizards from the legacy Context-based
          architecture to the highly optimized Store-based engine.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <h3 className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Why Upgrade?
        </h3>
        <ul className="text-amber-800 text-sm space-y-2 list-disc pl-5">
          <li>
            <strong>Zero Re-renders</strong>: Update specific data points
            without re-rendering the entire wizard tree.
          </li>
          <li>
            <strong>Middleware Support</strong>: Perfect for logging, analytics,
            and complex side-effects.
          </li>
          <li>
            <strong>DevTools</strong>: Full Redux-style debugging in your
            browser.
          </li>
          <li>
            <strong>Universal Store</strong>: Access wizard state from outside
            the React tree if needed.
          </li>
        </ul>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          1. The Core Update: Factory Pattern
        </h2>
        <p className="text-gray-600">
          In v1, you used a generic <code>WizardProvider</code>. In v2, we use a{" "}
          <strong>Factory</strong> to generate typesafe hooks and providers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest">
              Legacy (v1)
            </h4>
            <div className="bg-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <pre>
                {`import { WizardProvider, useWizard } from 'wizzard-stepper-react';

const App = () => (
  <WizardProvider>
    <MyComponent />
  </WizardProvider>
);`}
              </pre>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest">
              Modern (v2)
            </h4>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs overflow-x-auto text-gray-300">
              <pre>
                {`import { createWizardFactory } from 'wizzard-stepper-react';

const { WizardProvider, useWizard } = createWizardFactory<MyData>();

const App = () => (
  <WizardProvider>
    <MyComponent />
  </WizardProvider>
);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          2. Optimized Selectors
        </h2>
        <p className="text-gray-600">
          Stop using <code>useWizard()</code> for everything! v2 introduces
          granular selectors to boost performance.
        </p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-4 text-gray-300">
            {`// ❌ Low Performance (v1 approach)
const { wizardData } = useWizard(); // Re-renders on ANY change

// ✅ High Performance (v2 approach)
const name = useWizardValue('user.name'); // Only re-renders when name changes
const hasErrors = useWizardSelector(s => s.errorSteps.size > 0);`}
          </pre>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          3. Breaking Changes Checklist
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs mt-1">
              1
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Breadcrumb Statuses</h4>
              <p className="text-sm text-gray-600">
                <code>'future'</code> status renamed to <code>'upcoming'</code>.
                Added <code>'completed'</code> and <code>'error'</code>{" "}
                statuses.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs mt-1">
              2
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Action Names</h4>
              <p className="text-sm text-gray-600">
                <code>handleStepChange</code> is now also available via{" "}
                <code>setData</code> in <code>useWizardActions()</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProTip>
        If you are starting a new project, <strong>always</strong> use the
        Factory Pattern. It ensures your app remains performant as it grows.
      </ProTip>

      <DocsNavigation
        prev={{ label: "Installation", href: "/docs/installation" }}
        next={{ label: "Quick Start", href: "/docs/quickstart" }}
      />
    </div>
  );
}
