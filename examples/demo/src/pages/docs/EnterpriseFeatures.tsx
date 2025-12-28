import { Link } from "react-router-dom";
import DocsNavigation from "../../components/DocsNavigation";

export default function EnterpriseFeatures() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Enterprise Features
        </h1>
        <p className="text-lg text-gray-600">
          Advanced capabilities designed for complex, high-reliability corporate
          applications.
        </p>
      </div>

      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-indigo-900">
            See it in action
          </h3>
          <p className="text-indigo-700 text-sm">
            Experience the full demo with branching, breadcrumbs, and dirty
            tracking.
          </p>
        </div>
        <Link
          to="/examples/enterprise"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md transition-colors whitespace-nowrap"
        >
          Open Live Demo →
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Dirty State Tracking
        </h2>
        <p className="text-gray-600">
          Prevent data loss by detecting unsaved changes. The library tracks
          modifications against <code>initialData</code> down to granular
          fields.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
          <pre>
            {`// 1. Provide initial data to establish a baseline
<WizardProvider initialData={{ name: "John" }}>

// 2. Use the hook to track changes
const { isDirty, dirtyFields } = useWizard();

// 3. Display warnings if needed
if (isDirty) {
  console.log("Changed fields:", [...dirtyFields]);
}`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Breadcrumbs</h2>
        <p className="text-gray-600">
          Automatically generate navigation indicators with correct status for
          each step.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
          <pre>
            {`const breadcrumbs = useBreadcrumbs();
            
// Returns array of:
// { 
//   id: string, 
//   label: string, 
//   status: 'visited' | 'current' | 'future' 
// }`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Auto-Invalidation</h2>
        <p className="text-gray-600">
          Maintain data integrity in complex flows. If a user changes a "parent"
          field (e.g., branching choice), dependent steps are automatically
          reset.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
          <pre>
            {`// In your step configuration:
createStep({
  id: "shipping",
  label: "Shipping Details",
  // If 'country' changes, this step's data is cleared
  dependsOn: ["address.country"], 
})`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Conflict Resolution
        </h2>
        <p className="text-gray-600">
          Handle synchronization issues between LocalStorage and server data
          during hydration.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
          <pre>
            {`<WizardProvider 
  config={{ 
    persistence: { 
      type: 'session', 
      onConflict: 'merge' // or 'replace' | 'keep-local' 
    } 
  }} 
/>`}
          </pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Adapter</h2>
        <p className="text-gray-600">
          Centralize event tracking for step transitions, errors, and
          completion.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-100">
          <pre>
            {`<WizardProvider 
  config={{ 
    analytics: { 
      onEvent: (name, payload) => sendToMixpanel(name, payload) 
    } 
  }} 
/>`}
          </pre>
        </div>
      </section>

      <DocsNavigation
        prev={{ label: "Deferred Rendering", href: "/docs/deferred-rendering" }}
        next={{ label: "Performance", href: "/docs/performance" }}
      />
    </div>
  );
}
