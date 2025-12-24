import DocsNavigation from "../../components/DocsNavigation";

export default function HooksApi() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. Header & Philosophy */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Hooks & Types API
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          Designed for maximum type safety and performance. Our API leverages 
          <strong> React 18's architectural features</strong> to ensure zero 
          unnecessary re-renders and developer-friendly DX.
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {["Type Safe", "Sub-Atomic Updates", "Context-Based", "Extensible"].map(tag => (
            <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold ring-1 ring-indigo-100 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 2. Primary Hook: useWizard */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">1</div>
          <h2 className="text-2xl font-bold text-gray-900">useWizard</h2>
        </div>
        <p className="text-gray-600 max-w-3xl">
          The primary entry point. Returns the full <code className="text-indigo-600">IWizardContext</code>. 
          Use this for component composition where you need access to everything at once.
        </p>
        
        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-1">
            <div className="text-purple-400">const <span className="text-emerald-400">{"{ "}</span></div>
            <div className="pl-4 text-indigo-300">
              wizardData<span className="text-emerald-400">,</span> <span className="text-gray-500">// Current global state</span>
            </div>
            <div className="pl-4 text-indigo-300">
              currentStep<span className="text-emerald-400">,</span> <span className="text-gray-500">// Active step config</span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToNextStep<span className="text-emerald-400">,</span> <span className="text-gray-500">// Async transition</span>
            </div>
            <div className="pl-4 text-indigo-300">
              setData <span className="text-gray-500">// Atomic update function</span>
            </div>
            <div className="text-purple-400"><span className="text-emerald-400">{"}"}</span> <span className="text-emerald-400">=</span> <span className="text-blue-400">useWizard</span><span className="text-emerald-400">();</span></div>
          </pre>
        </div>
      </section>

      {/* 3. Performance Hooks: useWizardValue & useWizardSelector */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">2</div>
          <h2 className="text-2xl font-bold text-gray-900">Atomic Subscriptions</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-emerald-600 text-lg">#</span> useWizardValue
            </h3>
            <p className="text-sm text-gray-600">
              Subscribe to a deeply nested path. The component only re-renders when 
              the specific value at that path changes. Uses dot-notation strings.
            </p>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10 overflow-x-auto">
              <pre className="space-y-1">
                <div className="text-gray-500">// Subscribe to specific data slice</div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-indigo-300">name</span> <span className="text-emerald-400">=</span> <span className="text-blue-400">useWizardValue</span><span className="text-emerald-400">(</span><span className="text-amber-400">'profile.base.name'</span><span className="text-emerald-400">);</span>
                </div>
                <div className="text-gray-500">// Type-safe return based on schema path</div>
              </pre>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-emerald-600 text-lg">#</span> useWizardSelector
            </h3>
            <p className="text-sm text-gray-600">
              Redux-style selector. Provide a pure function to derive data. 
              Component re-renders only if the selector's return value changes.
            </p>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10 overflow-x-auto">
              <pre className="space-y-1">
                <div className="text-gray-500">// Derive and transform data</div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-indigo-300">total</span> <span className="text-emerald-400">=</span> <span className="text-blue-400">useWizardSelector</span><span className="text-emerald-400">(</span><span className="text-indigo-300">s</span> <span className="text-emerald-400">=&gt;</span> <span className="text-indigo-300">s</span><span className="text-emerald-400">.</span><span className="text-indigo-300">items</span><span className="text-emerald-400">.</span><span className="text-indigo-300">length</span><span className="text-emerald-400">);</span>
                </div>
                <div className="text-gray-500">// Smart memoization under the hood</div>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Logic Hooks: useWizardActions */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold">3</div>
          <h2 className="text-2xl font-bold text-gray-900">useWizardActions</h2>
        </div>
        <p className="text-gray-600 max-w-3xl">
          The pure "logic" hook. Returns only mutation and navigation methods. 
          Perfect for building reusable UI controls like generic Next/Back buttons 
          or Header controls that don't need to subscribe to data changes.
        </p>
        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
          <pre className="space-y-1">
            <div className="text-purple-400">const <span className="text-emerald-400">{"{ "}</span></div>
            <div className="pl-4 text-indigo-300">
              goToNextStep<span className="text-emerald-400">,</span> <span className="text-gray-500">// Validates current step and moves forward</span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToPrevStep<span className="text-emerald-400">,</span> <span className="text-gray-500">// Moves to the previous active step</span>
            </div>
            <div className="pl-4 text-indigo-300">
              goToStep<span className="text-emerald-400">,</span> <span className="text-gray-500">// Jump to a specific step ID (async)</span>
            </div>
            <div className="pl-4 text-indigo-300">
              setData<span className="text-emerald-400">,</span> <span className="text-gray-500">// Set value by dot-notation path</span>
            </div>
            <div className="pl-4 text-indigo-300">
              updateData<span className="text-emerald-400">,</span> <span className="text-gray-500">// Bulk merge partial data object</span>
            </div>
            <div className="pl-4 text-indigo-300">
              validateStep<span className="text-emerald-400">,</span> <span className="text-gray-500">// Manually trigger step validation</span>
            </div>
            <div className="pl-4 text-indigo-300">
              save<span className="text-emerald-400">,</span> <span className="text-gray-500">// Force trigger persistence adapter</span>
            </div>
            <div className="pl-4 text-indigo-300">
              clearStorage <span className="text-gray-500">// Wipe data from persistence</span>
            </div>
            <div className="text-purple-400"><span className="text-emerald-400">{"}"}</span> <span className="text-emerald-400">=</span> <span className="text-blue-400">useWizardActions</span><span className="text-emerald-400">();</span></div>
          </pre>
        </div>
      </section>

      {/* 5. Metadata Hooks: useWizardState & useWizardError */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold">4</div>
          <h2 className="text-2xl font-bold text-gray-900">State & Metadata</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">useWizardState</h3>
            <p className="text-sm text-gray-600">
              Access the current UI state of the wizard. Essential for building 
              progress bars, step indicators, or overlay loaders.
            </p>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10">
              <pre className="space-y-1 text-indigo-300">
                <div><span className="text-purple-400">const</span> <span className="text-emerald-400">{"{ "}</span></div>
                <div className="pl-4">currentStepIndex<span className="text-emerald-400">,</span> <span className="text-gray-500">// 0-based index</span></div>
                <div className="pl-4">isFirstStep<span className="text-emerald-400">,</span> isLastStep<span className="text-emerald-400">,</span> <span className="text-gray-500">// Boolean flags</span></div>
                <div className="pl-4">isLoading<span className="text-emerald-400">,</span> <span className="text-gray-500">// Async operation in progress</span></div>
                <div className="pl-4">activeSteps<span className="text-emerald-400">,</span> <span className="text-gray-500">// Filtered visible steps</span></div>
                <div className="pl-4">visitedSteps<span className="text-emerald-400">,</span> <span className="text-gray-500">// Set of seen IDs</span></div>
                <div className="pl-4">completedSteps <span className="text-gray-500">// Set of validated IDs</span></div>
                <div><span className="text-emerald-400">{" }"}</span> <span className="text-emerald-400">=</span> <span className="text-blue-400">useWizardState</span><span className="text-emerald-400">();</span></div>
              </pre>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">useWizardError</h3>
            <p className="text-sm text-gray-600">
              The easiest way to display validation feedback. Subscribes only 
              to errors related to the provided path.
            </p>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs shadow-lg ring-1 ring-white/10">
              <pre className="space-y-4">
                <div className="text-gray-500">// Example: Real-time email validation</div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-indigo-300">emailError</span> <span className="text-emerald-400">=</span> <span className="text-blue-400">useWizardError</span><span className="text-emerald-400">(</span><span className="text-amber-400">'user.email'</span><span className="text-emerald-400">);</span>
                </div>
                <div className="text-gray-500">// Returns: string | undefined</div>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core Type Reference */}
      <section className="space-y-8 pt-10 border-t border-gray-100">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Type Reference</h2>
          <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">The Backbone of Safety</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* IStepConfig */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              IStepConfig&lt;TStepData, TGlobalContext&gt;
            </h3>
            <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl">
              <pre className="space-y-2 text-gray-400">
                <div><span className="text-purple-400">interface</span> <span className="text-amber-400">IStepConfig</span> <span className="text-emerald-400">{"{"}</span></div>
                <div className="pl-4"><span className="text-indigo-400">id</span><span className="text-emerald-400">:</span> <span className="text-rose-400">string</span><span className="text-emerald-400">;</span> <span className="text-gray-500">// Unique identifier</span></div>
                <div className="pl-4"><span className="text-indigo-400">label</span><span className="text-emerald-400">:</span> <span className="text-rose-400">string</span><span className="text-emerald-400">;</span> <span className="text-gray-500">// Display name</span></div>
                <div className="pl-4"><span className="text-indigo-400">condition</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> <span className="text-emerald-400">(</span>ctx<span className="text-emerald-400">:</span> <span className="text-indigo-300">TGlobalContext</span><span className="text-emerald-400">) =&gt;</span> <span className="text-rose-400">boolean</span><span className="text-emerald-400">;</span></div>
                <div className="pl-4"><span className="text-indigo-400">validationAdapter</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> <span className="text-amber-400">IValidatorAdapter</span><span className="text-emerald-400">&lt;</span><span className="text-indigo-300">TStepData</span><span className="text-emerald-400">&gt;;</span></div>
                <div className="pl-4"><span className="text-indigo-400">autoValidate</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> <span className="text-rose-400">boolean</span><span className="text-emerald-400">;</span></div>
                <div className="pl-4"><span className="text-indigo-400">component</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> React.<span className="text-amber-400">ComponentType</span><span className="text-emerald-400">&lt;</span><span className="text-rose-400">any</span><span className="text-emerald-400">&gt;;</span></div>
                <div className="text-emerald-400">{"}"}</div>
              </pre>
            </div>
          </div>

          {/* IWizardConfig */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              IWizardConfig&lt;TSchema&gt;
            </h3>
            <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl">
              <pre className="space-y-2 text-gray-400">
                <div><span className="text-purple-400">interface</span> <span className="text-amber-400">IWizardConfig</span> <span className="text-emerald-400">{"{"}</span></div>
                <div className="pl-4"><span className="text-indigo-400">steps</span><span className="text-emerald-400">:</span> <span className="text-amber-400">IStepConfig</span><span className="text-emerald-400">[];</span></div>
                <div className="pl-4"><span className="text-indigo-400">autoValidate</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> <span className="text-rose-400">boolean</span><span className="text-emerald-400">;</span></div>
                <div className="pl-4"><span className="text-indigo-400">persistence</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> <span className="text-emerald-400">{"{"}</span></div>
                <div className="pl-8"><span className="text-indigo-400">mode</span><span className="text-emerald-400">:</span> <span className="text-amber-400">PersistenceMode</span><span className="text-emerald-400">;</span></div>
                <div className="pl-8"><span className="text-indigo-400">adapter</span><span className="text-emerald-400">:</span> <span className="text-amber-400">IPersistenceAdapter</span><span className="text-emerald-400">;</span></div>
                <div className="pl-4 text-emerald-400">{" }"}</div>
                <div className="pl-4"><span className="text-indigo-400">onStepChange</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> <span className="text-emerald-400">(</span>from<span className="text-emerald-400">,</span> to<span className="text-emerald-400">,</span> data<span className="text-emerald-400">) =&gt;</span> <span className="text-rose-400">void</span><span className="text-emerald-400">;</span></div>
                <div className="text-emerald-400">{"}"}</div>
              </pre>
            </div>
          </div>

          {/* IValidatorAdapter & ValidationResult */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                IValidatorAdapter&lt;TData&gt;
              </h3>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
                <pre className="space-y-2 text-gray-400">
                  <div><span className="text-purple-400">interface</span> <span className="text-amber-400">IValidatorAdapter</span> <span className="text-emerald-400">{"{"}</span></div>
                  <div className="pl-4">
                    <span className="text-indigo-400">validate</span><span className="text-emerald-400">:</span> <span className="text-emerald-400">(</span><span className="text-indigo-300">data</span><span className="text-emerald-400">:</span> <span className="text-indigo-300">TData</span><span className="text-emerald-400">) =&gt;</span> 
                  </div>
                  <div className="pl-4 text-amber-400">
                    ValidationResult <span className="text-emerald-400">|</span> <span className="text-purple-400">Promise</span><span className="text-emerald-400">&lt;</span>ValidationResult<span className="text-emerald-400">&gt;;</span>
                  </div>
                  <div className="text-emerald-400">{"}"}</div>
                </pre>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                ValidationResult
              </h3>
              <div className="bg-gray-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-xl ring-1 ring-white/10">
                <pre className="space-y-2 text-gray-400">
                  <div><span className="text-purple-400">type</span> <span className="text-rose-400">ValidationResult</span> <span className="text-emerald-400">=</span> <span className="text-emerald-400">{"{"}</span></div>
                  <div className="pl-4"><span className="text-indigo-400">isValid</span><span className="text-emerald-400">:</span> <span className="text-rose-400">boolean</span><span className="text-emerald-400">;</span></div>
                  <div className="pl-4"><span className="text-indigo-400">errors</span><span className="text-emerald-400">?</span><span className="text-emerald-400">:</span> <span className="text-amber-400">Record</span><span className="text-emerald-400">&lt;</span><span className="text-rose-400">string</span><span className="text-emerald-400">,</span> <span className="text-rose-400">string</span><span className="text-emerald-400">&gt;;</span></div>
                  <div className="text-emerald-400">{"}"}</div>
                </pre>
              </div>
            </div>
          </div>

          {/* IPersistenceAdapter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              IPersistenceAdapter
            </h3>
            <div className="bg-gray-950 rounded-2xl p-8 font-mono text-xs overflow-x-auto shadow-2xl">
              <pre className="space-y-2 text-gray-400">
                <div><span className="text-purple-400">interface</span> <span className="text-amber-400">IPersistenceAdapter</span> <span className="text-emerald-400">{"{"}</span></div>
                <div className="pl-4">
                  <span className="text-indigo-400">saveStep</span><span className="text-emerald-400">:</span> <span className="text-emerald-400">&lt;</span><span className="text-indigo-300">T</span><span className="text-emerald-400">&gt;(</span><span className="text-indigo-300">stepId</span><span className="text-emerald-400">:</span> <span className="text-rose-400">string</span><span className="text-emerald-400">,</span> <span className="text-indigo-300">data</span><span className="text-emerald-400">:</span> <span className="text-indigo-300">T</span><span className="text-emerald-400">) =&gt;</span> <span className="text-rose-400">void</span><span className="text-emerald-400">;</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">getStep</span><span className="text-emerald-400">:</span> <span className="text-emerald-400">&lt;</span><span className="text-indigo-300">T</span><span className="text-emerald-400">&gt;(</span><span className="text-indigo-300">stepId</span><span className="text-emerald-400">:</span> <span className="text-rose-400">string</span><span className="text-emerald-400">) =&gt;</span> <span className="text-indigo-300">T</span> <span className="text-emerald-400">|</span> <span className="text-rose-400">undefined</span><span className="text-emerald-400">;</span>
                </div>
                <div className="pl-4"><span className="text-indigo-400">clear</span><span className="text-emerald-400">: () =&gt;</span> <span className="text-rose-400">void</span><span className="text-emerald-400">;</span></div>
                <div className="text-emerald-400">{"}"}</div>
              </pre>
            </div>
          </div>

          {/* PersistenceMode */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              PersistenceMode
            </h3>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-[10px] font-black uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Value</th>
                    <th className="px-6 py-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { v: "onStepChange", d: "Saves only when navigating between steps." },
                    { v: "onChange", d: "Debounced save on every data modification." },
                    { v: "manual", d: "Save only when explicit save() action is called." }
                  ].map(row => (
                    <tr key={row.v}>
                      <td className="px-6 py-4 font-mono text-indigo-600 font-bold">{row.v}</td>
                      <td className="px-6 py-4 text-gray-600">{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <DocsNavigation 
        prev={{ label: "Core Concepts", href: "/docs/concepts" }}
      />
    </div>
  );
}
