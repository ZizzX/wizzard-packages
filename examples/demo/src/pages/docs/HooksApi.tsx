import { useDocVersion } from "../../context/DocVersionContextLogic";
import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";

export default function HooksApi() {
  const { version } = useDocVersion();
  const isV2 = version === "2.0.0";
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. Header & Philosophy */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Hooks API
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          Designed for maximum type safety and performance. Our API leverages
          <strong> React 18's architectural features</strong> to ensure zero
          unnecessary re-renders and developer-friendly DX.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {[
            "Type Safe",
            "Sub-Atomic Updates",
            "Context-Based",
            "Extensible",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold ring-1 ring-indigo-100 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 2. Primary Hook: useWizard */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">useWizard</h2>
        </div>
        <p className="text-gray-600 max-w-3xl">
          {isV2
            ? "The primary entry point in v2.0.0. While it returns the full context, we recommend using more specific hooks like useWizardValue for data to maximize performance."
            : "The standard way to access the wizard in v1. Returns the full context. Note that every state change will trigger a re-render of components using this hook."}
        </p>

        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-1">
            <div className="text-purple-400">
              const <span className="text-emerald-400">{"{ "}</span>
            </div>
            <div className="pl-4 text-indigo-300">
              wizardData<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">// Current global state</span>
            </div>
            <div className="pl-4 text-indigo-300">
              currentStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">// Active step config</span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToNextStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">// Async transition</span>
            </div>
            <div className="pl-4 text-indigo-300">
              setData{" "}
              <span className="text-gray-500">// Atomic update function</span>
            </div>
            <div className="text-purple-400">
              <span className="text-emerald-400">{"}"}</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">useWizard</span>
              <span className="text-emerald-400">();</span>
            </div>
          </pre>
        </div>
      </section>

      {isV2 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Atomic Subscriptions (v2 Only)
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-emerald-600 text-lg">#</span>{" "}
                useWizardValue
              </h3>
              <p className="text-sm text-gray-600">
                Subscribe to a deeply nested path. The component only re-renders
                when the specific value at that path changes. Uses dot-notation
                strings.
              </p>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10 overflow-x-auto">
                <pre className="space-y-1">
                  <div className="text-gray-500">
                    // Subscribe to specific data slice
                  </div>
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-indigo-300">name</span>{" "}
                    <span className="text-emerald-400">=</span>{" "}
                    <span className="text-blue-400">useWizardValue</span>
                    <span className="text-emerald-400">(</span>
                    <span className="text-amber-400">'user.name'</span>
                    <span className="text-emerald-400">);</span>
                  </div>
                </pre>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-emerald-600 text-lg">#</span>{" "}
                useWizardSelector
              </h3>
              <p className="text-sm text-gray-600">
                Redux-style selector. Provide a pure function to derive data.
                Component re-renders only if the selector's return value
                changes.
              </p>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10 overflow-x-auto">
                <pre className="space-y-1">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-indigo-300">count</span>{" "}
                    <span className="text-emerald-400">=</span>{" "}
                    <span className="text-blue-400">useWizardSelector</span>
                    <span className="text-emerald-400">(</span>
                    <span className="text-indigo-300">s</span>{" "}
                    <span className="text-emerald-400">=&gt;</span>{" "}
                    <span className="text-indigo-300">s</span>
                    <span className="text-emerald-400">.</span>
                    <span className="text-indigo-300">wizardData</span>
                    <span className="text-emerald-400">.</span>
                    <span className="text-indigo-300">items</span>
                    <span className="text-emerald-400">.</span>
                    <span className="text-indigo-300">length</span>
                    <span className="text-emerald-400">);</span>
                  </div>
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Logic Hooks: useWizardActions */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">useWizardActions</h2>
        </div>
        <p className="text-gray-600 max-w-3xl">
          The pure "logic" hook. Returns only mutation and navigation methods.
          Perfect for building reusable UI controls like generic Next/Back
          buttons or Header controls that don't need to subscribe to data
          changes.
        </p>
        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-1">
            <div className="text-purple-400">
              const <span className="text-emerald-400">{"{ "}</span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToNextStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Validates current step and moves forward
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToPrevStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Moves to the previous active step
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Jump to a specific step ID (async)
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              setData<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Set value by dot-notation path
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              updateData<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Bulk merge (options:{" "}
                {"{ replace: boolean, persist: boolean }"})
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              validateStep<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Manually trigger step validation
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              reset<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Reset to initial state (wipe data/history)
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              save<span className="text-emerald-400">,</span>{" "}
              <span className="text-gray-500">
                // Sync to storage (params: stepId | stepId[] | true)
              </span>
            </div>
            <div className="pl-4 text-indigo-300">
              clearStorage{" "}
              <span className="text-gray-500">
                // Wipe data from persistence
              </span>
            </div>
            <div className="text-purple-400">
              <span className="text-emerald-400">{"}"}</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-blue-400">useWizardActions</span>
              <span className="text-emerald-400">();</span>
            </div>
          </pre>
        </div>

        {/* Mutation Strategy Comparison */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Mutation Strategy
          </h3>
          <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-gray-50 text-[9px] font-bold text-gray-400 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2">Feature</th>
                  <th className="px-4 py-2">setData</th>
                  <th className="px-4 py-2">updateData</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-bold text-gray-900 bg-gray-50/30 w-1/4">
                    Path Support
                  </td>
                  <td className="px-4 py-3 text-emerald-600 font-medium">
                    Deep (e.g. 'user.email')
                  </td>
                  <td className="px-4 py-3 text-amber-600 font-medium whitespace-nowrap">
                    Shallow Merge (Root only)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-gray-900 bg-gray-50/30">
                    Validation
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-600">
                    Triggers <code className="text-rose-500">onChange</code>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-400 italic">
                    Silent (Skip logic)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-gray-900 bg-gray-50/30">
                    Ideal For
                  </td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">
                    Field-level sync / UX bits
                  </td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">
                    Form Submit / Bulk Load
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Metadata Hooks: useWizardState & useWizardError */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold">
            4
          </div>
          <h2 className="text-2xl font-bold text-gray-900">State & Metadata</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              useWizardState
            </h3>
            <p className="text-sm text-gray-600">
              Access the current UI state of the wizard. Essential for building
              progress bars, step indicators, or overlay loaders.
            </p>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10">
              <pre className="space-y-1 text-indigo-300">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-emerald-400">{"{ "}</span>
                </div>
                <div className="pl-4">
                  currentStepIndex<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">// 0-based index</span>
                </div>
                <div className="pl-4">
                  progress<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">// 0-100% calculation</span>
                </div>
                <div className="pl-4">
                  history<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">
                    // Array of visited step IDs
                  </span>
                </div>
                <div className="pl-4">
                  isFirstStep<span className="text-emerald-400">,</span>{" "}
                  isLastStep<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">// Boolean flags</span>
                </div>
                <div className="pl-4">
                  isBusy<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">
                    // 🆕 Global async state
                  </span>
                </div>
                <div className="pl-4">
                  busySteps<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">
                    // 🆕 Steps running async logic
                  </span>
                </div>
                <div className="pl-4">
                  isLoading<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">
                    // Wizard hydration from storage
                  </span>
                </div>
                <div className="pl-4">
                  activeSteps<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">
                    // Filtered visible steps
                  </span>
                </div>
                <div className="pl-4">
                  visitedSteps<span className="text-emerald-400">,</span>{" "}
                  <span className="text-gray-500">// Set of seen IDs</span>
                </div>
                <div className="pl-4">
                  completedSteps{" "}
                  <span className="text-gray-500">// Set of validated IDs</span>
                </div>
                <div>
                  <span className="text-emerald-400">{" }"}</span>{" "}
                  <span className="text-emerald-400">=</span>{" "}
                  <span className="text-blue-400">useWizardState</span>
                  <span className="text-emerald-400">();</span>
                </div>
              </pre>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <h4 className="flex items-center gap-2 font-bold text-amber-800 text-sm mb-2">
                ⚠️ When NOT to use
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed mb-3">
                Do not use this hook to access form data (e.g. user input).
                Using it for data will cause your entire UI layer to re-render
                unnecessarily on every keystroke.
              </p>
              <div className="text-xs font-mono bg-white p-2 rounded border border-amber-200 text-gray-500">
                ❌ const {"{ activeSteps }"} = useWizardState(); // OK
                <br />❌ const {"{ wizardData }"} = useWizardState(); // ERROR:
                Does not exist! Use selector.
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              useWizardError
            </h3>
            <p className="text-sm text-gray-600">
              The easiest way to display validation feedback. Subscribes only to
              errors related to the provided path. Returns{" "}
              <code className="text-indigo-600 italic">undefined</code> if the
              field is valid.
            </p>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10">
              <pre className="space-y-4">
                <div className="text-gray-500">
                  // Example: Real-time email validation
                </div>
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-indigo-300">emailError</span>{" "}
                  <span className="text-emerald-400">=</span>{" "}
                  <span className="text-blue-400">useWizardError</span>
                  <span className="text-emerald-400">(</span>
                  <span className="text-amber-400">'user.email'</span>
                  <span className="text-emerald-400">);</span>
                </div>
                <div className="text-gray-500">
                  // Returns: string | undefined
                </div>
                <div className="pt-2 text-gray-400 text-[10px] uppercase font-bold tracking-tighter">
                  Usage in JSX:
                </div>
                <div className="text-emerald-400">
                  {"{ "}
                  <br /> &nbsp;
                  <span className="text-indigo-300">
                    emailError
                  </span> &nbsp;{" "}
                  <div className="text-purple-400">
                    &nbsp;&nbsp;&nbsp;&nbsp;&&
                  </div>{" "}
                  <span className="text-emerald-400">&nbsp;&lt;</span>
                  <span className="text-amber-400">span</span>{" "}
                  <span className="text-indigo-400">className</span>
                  <span className="text-emerald-400">=</span>
                  <span className="text-amber-400">"error"</span>
                  <span className="text-emerald-400">&gt;</span>
                  {"{"}
                  <span className="text-indigo-300">emailError</span>
                  {"}"}
                  <span className="text-emerald-400">&lt;/</span>
                  <span className="text-amber-400">span</span>
                  <span className="text-emerald-400">&gt;</span>
                  <br />
                  {" }"}
                </div>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Performance & Selection Guide */}
      <section className="space-y-8 pt-10 border-t border-gray-100">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Performance & Selection
          </h2>
          <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
            Optimization Strategies for Large Apps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* A: Hook Selection Guide */}
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                A
              </span>
              Hook Selection Guide
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xs font-bold text-indigo-600 mb-1">
                  useWizardValue / Selector
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Best for:</strong> Input fields, status indicators,
                  and labels. Prevents re-rendering the whole form when typing.
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xs font-bold text-indigo-600 mb-1">
                  useWizardActions
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Best for:</strong> "Next", "Back", and "Submit"
                  buttons. Zero re-renders because it only returns stable
                  methods.
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xs font-bold text-indigo-600 mb-1">
                  useWizard
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Best for:</strong> Step-level orchestration or small
                  forms. Subscribes to all state changes.
                </p>
              </div>
            </div>
          </div>

          {/* B: Decision Matrix */}
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
                B
              </span>
              Quick Decision Matrix
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-[11px] text-left">
                <thead className="bg-gray-50 text-[9px] font-black uppercase text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2">Need...</th>
                    <th className="px-3 py-2">Use Hook</th>
                    <th className="px-3 py-2 text-center">Renders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 text-gray-600 font-medium">
                      Single Field
                    </td>
                    <td className="px-3 py-2 text-indigo-600 font-bold">
                      useWizardValue / Selector
                    </td>
                    <td className="px-3 py-2 text-center text-emerald-600 font-bold">
                      Atomic
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 font-medium">
                      Nav Buttons
                    </td>
                    <td className="px-3 py-2 text-indigo-600 font-bold">
                      useWizardActions
                    </td>
                    <td className="px-3 py-2 text-center text-blue-600 font-bold">
                      Zero
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 font-medium">
                      Step Logic
                    </td>
                    <td className="px-3 py-2 text-indigo-600 font-bold">
                      useWizard
                    </td>
                    <td className="px-3 py-2 text-center text-rose-500 font-bold">
                      Full
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600 font-medium">
                      Metadata
                    </td>
                    <td className="px-3 py-2 text-indigo-600 font-bold">
                      useWizardState
                    </td>
                    <td className="px-3 py-2 text-center text-amber-500 font-bold">
                      Minimal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                🔍 <strong>Rule of Thumb:</strong> If your component doesn't
                display any wizard data, always prefer{" "}
                <code>useWizardActions</code> for maximum performance.
              </p>
            </div>
          </div>
        </div>

        <ProTip>
          If you have a form with 50+ fields, avoid using{" "}
          <code className="text-blue-900 bg-blue-50 px-1 rounded">
            useWizard()
          </code>{" "}
          at the root of the step. Instead, wrap individual inputs in small
          components that each use{" "}
          <code className="text-blue-900 bg-blue-50 px-1 rounded">
            useWizardValue()
          </code>
          . This isolates updates and keeps your UI buttery smooth.
        </ProTip>
      </section>

      {/* Navigation */}
      <DocsNavigation
        prev={{ label: "Core Concepts", href: "/docs/concepts" }}
        next={{ label: "Type Reference", href: "/docs/types" }}
      />
    </div>
  );
}
