import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";

export default function Validation() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Validation Mastery
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          From simple synchronous checks to complex, asynchronous API-based
          validation. Build bulletproof forms with zero sweat.
        </p>
      </section>

      {/* 1. Asynchronous Validation */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Asynchronous Validation
          </h2>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Need to check if a username is taken? Our adapters are
          <strong> async-native</strong>. Returning a{" "}
          <code className="text-indigo-600">Promise</code> from your adapter
          automatically puts the wizard into a loading state.
        </p>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">UsernameAdapter</span>{" "}
              <span className="text-emerald-400">= {"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">validate</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-purple-400">async</span>{" "}
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">) =&gt; {"{"}</span>
            </div>
            <div className="pl-8">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">isTaken</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-purple-400">await</span>{" "}
              <span className="text-blue-400">api</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">checkUser</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">username</span>
              <span className="text-emerald-400">);</span>
            </div>
            <div className="pl-8">
              <span className="text-purple-400">return</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">isValid</span>
              <span className="text-emerald-400">: !</span>
              <span className="text-indigo-300">isTaken</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">errors</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-indigo-300">isTaken</span>{" "}
              <span className="text-emerald-400">? {"{"}</span>{" "}
              <span className="text-indigo-400">username</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'Username already in use'</span>{" "}
              <span className="text-emerald-400">{"}"}</span>{" "}
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-emerald-400">undefined</span>
            </div>
            <div className="pl-8 text-emerald-400">{" };"}</div>
            <div className="pl-4 text-emerald-400">{" }"}</div>
            <div className="text-emerald-400">{"};"}</div>
          </pre>
        </div>

        <ProTip>
          Use{" "}
          <code className="text-blue-900 font-bold font-mono">isLoading</code>{" "}
          from
          <code className="text-blue-900 font-bold font-mono">
            useWizard()
          </code>{" "}
          to disable your "Next" button while async validation is in flight.
        </ProTip>
      </section>

      {/* 2. Validation Modes */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Validation Modes</h2>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Control <strong>when</strong> validation logic is executed. This is
          crucial for performance and user experience. Use{" "}
          <code className="text-indigo-600 font-mono">validationMode</code>{" "}
          either globally or per-step.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <code className="text-blue-700 font-bold block mb-2">onChange</code>
            <p className="text-xs text-blue-600/80">
              Validates as user types (debounced). Best for real-time feedback.
            </p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <code className="text-emerald-700 font-bold block mb-2">
              onStepChange
            </code>
            <p className="text-xs text-emerald-600/80">
              Validates only when navigating "Next". Best for heavy forms.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <code className="text-gray-700 font-bold block mb-2">manual</code>
            <p className="text-xs text-gray-600/80">
              No automatic validation. Trigger via{" "}
              <code className="text-xs">validateStep()</code>.
            </p>
          </div>
        </div>

        <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl ring-1 ring-white/10">
          <pre className="space-y-2 text-gray-400">
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">config</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">IWizardConfig</span>{" "}
              <span className="text-emerald-400">= {"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-400">steps</span>
              <span className="text-emerald-400">: [</span>
            </div>
            <div className="pl-8">
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">id</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'heavy-step'</span>
              <span className="text-emerald-400">,</span>
            </div>
            <div className="pl-12 text-gray-500">
              // Optimize: only validate on Next click
            </div>
            <div className="pl-12">
              <span className="text-indigo-400">validationMode</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">'onStepChange'</span>
            </div>
            <div className="pl-8">
              <span className="text-emerald-400">{"}"}</span>
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">]</span>
            </div>
            <div className="text-emerald-400">{"};"}</div>
          </pre>
        </div>
      </section>

      {/* 3. Custom Adapters */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Building Custom Adapters
          </h2>
        </div>
        <p className="text-gray-600 text-sm">
          Don't use Zod or Yup? No problem. Simply implement the
          <code className="text-indigo-600 font-mono">
            IValidatorAdapter
          </code>{" "}
          interface.
        </p>

        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 italic text-gray-500 font-medium text-center">
          "The library is headless. It doesn't care how you validate, only that
          you return a ValidationResult."
        </div>
      </section>

      {/* 4. UX & Performance */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            4
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            UX & Performance Improvements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Clear Error on Input
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              When using <code className="text-xs">onStepChange</code>, errors
              stay visible until the next attempt. However, for a better UX,{" "}
              <code className="text-indigo-600">wizzard-stepper-react</code>{" "}
              immediately clears a field's error as soon as the user starts
              typing to fix it.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Structural Error Matching
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              If an adapter returns an error for the{" "}
              <strong>entire step</strong> (e.g., from a Zod <code>refine</code>{" "}
              on the root object), the{" "}
              <code className="text-indigo-600">useWizardError</code> hook
              automatically maps it to all nested fields. No more "silent"
              validation blocks!
            </p>
          </div>
        </div>

        <div className="bg-indigo-950 rounded-3xl p-8 shadow-2xl space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg
              className="w-6 h-6 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Navigation Lifecycle & Priority
          </h3>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Safety protocol: The wizard strictly prioritizes validation to
            ensure no side-effects (like async guards or network conditions) are
            executed if the current form state is invalid.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              {
                title: "1. Validate",
                desc: "Check current step constraints",
                color: "bg-rose-500",
              },
              {
                title: "2. Resolve",
                desc: "Recalculate next step conditions",
                color: "bg-indigo-500",
              },
              {
                title: "3. Guard",
                desc: "Execute beforeLeave predicates",
                color: "bg-emerald-500",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div
                  className={`inline-block px-2 py-1 rounded text-[10px] font-bold text-white mb-2 ${step.color}`}
                >
                  {step.title}
                </div>
                <p className="text-[11px] text-white font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-indigo-300 italic text-center">
            * If Step 1 fails, Step 2 and 3 are completely skipped.
          </p>
        </div>

        <ProTip>
          Use{" "}
          <code className="text-blue-900 font-bold font-mono">
            debounceValidation
          </code>{" "}
          in
          <code className="text-blue-900 font-bold font-mono">setData</code> to
          prevent heavy schemas from blocking the UI thread during rapid typing.
        </ProTip>
      </section>

      {/* Navigation */}
      <DocsNavigation
        prev={{ label: "Persistence", href: "/docs/persistence" }}
        next={{ label: "Conditional Flow", href: "/docs/conditional-logic" }}
      />
    </div>
  );
}
