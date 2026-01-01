import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";

export default function MiddlewareDevTools() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Middleware & DevTools
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Enhance your wizard with cross-cutting concerns using our flexible
          middleware system and debugging tools.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          Middleware
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Middleware allows you to intercept every action dispatched to the
          store. You can use it for logging, analytics, state synchronization,
          or even blocking certain actions.
        </p>

        <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-xl border border-gray-800 p-6">
          <pre className="text-indigo-300 font-mono text-sm leading-relaxed whitespace-pre">
            {`const loggerMiddleware: WizardMiddleware = ({ getState }) => (next) => (action) => {
  console.log('Dispatching:', action.type);
  const result = next(action);
  console.log('Next State:', getState());
  return result;
};

// Usage
<WizardProvider middlewares={[loggerMiddleware]}>
  <App />
</WizardProvider>`}
          </pre>
        </div>

        <h3 className="text-xl font-bold text-gray-800">
          Writing Custom Middleware
        </h3>
        <p className="text-gray-600">
          Middleware follows the standard curried function signature:{" "}
          <code>{"(api) => (next) => (action) => result"}</code>.
        </p>

        <ProTip>
          Use middleware for analytics to keep your components clean and focused
          only on the UI.
        </ProTip>
      </section>

      <section className="space-y-6 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
          Developer Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Redux DevTools
            </h3>
            <p className="text-gray-600 text-sm">
              Connect to the official Redux DevTools browser extension. Monitor
              state history, time-travel, and inspect data payloads.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl font-mono text-xs">
              {"middlewares={[devToolsMiddleware]}"}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Visual DevTools
            </h3>
            <p className="text-gray-600 text-sm">
              An in-app overlay for real-time state inspection. Perfect for
              environments without browser extensions.
            </p>
            <div className="bg-gray-100 p-4 rounded-xl font-mono text-xs">
              {"<WizardDevTools />"}
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h4 className="flex items-center gap-2 text-indigo-900 font-bold mb-2">
            <span className="p-1 bg-indigo-600 rounded-md text-white text-[10px] uppercase">
              New in 1.8.0
            </span>
            Unified Debugging Experience
          </h4>
          <p className="text-indigo-700 text-sm">
            Combine both tools for the ultimate development experience. The
            Visual DevTools works seamlessly with actions intercepted by our
            middleware system.
          </p>
        </div>
      </section>

      <DocsNavigation
        prev={{ label: "Security", href: "/docs/security" }}
        next={{ label: "React Hook Form", href: "/docs/rhf" }}
      />
    </div>
  );
}
