import DocsNavigation from "../../components/DocsNavigation";

export default function MantineDocs() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Mantine Form
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          Leverage the power of <code className="text-cyan-600 font-bold">@mantine/form</code> inside 
          your wizard steps for a seamless, beautifully styled experience.
        </p>
      </section>

      {/* 1. Integration Pattern */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">1</div>
          <h2 className="text-2xl font-bold text-gray-900">Hook Integration</h2>
        </div>
        <p className="text-gray-600">
          With <code className="text-cyan-600 font-mono">useForm</code> from Mantine, 
          you can easily initialize your form values from the wizard's state 
          and commit them on step completion.
        </p>

        <div className="bg-gray-900 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
          <div className="bg-gray-800/50 px-6 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">SettingsStep.tsx</span>
          </div>
          <div className="p-8 font-mono text-[13px] leading-relaxed">
            <div className="space-y-1 text-gray-300">
              <div><span className="text-purple-400">const</span> form <span className="text-emerald-400">=</span> <span className="text-blue-400">useForm</span>({"{"}</div>
              <div className="pl-4">initialValues: <span className="text-blue-400">useWizardValue</span>(<span className="text-emerald-400">'settings'</span>),</div>
              <div className="pl-4">validate: {"{"}</div>
              <div className="pl-8 text-gray-500">// Mantine validation logic</div>
              <div className="pl-8">email: (value) <span className="text-purple-400">=&gt;</span> (/^\S+@\S+$/.test(value) ? <span className="text-blue-400">null</span> : <span className="text-rose-400">'Invalid email'</span>),</div>
              <div className="pl-4">{"}"}</div>
              <div>{"});"}</div>
              <div className="pt-4"><span className="text-purple-400">return</span> (</div>
              <div className="pl-4 text-emerald-400">&lt;form <span className="text-indigo-400">onSubmit</span>={"{"}<span className="text-indigo-300">form.onSubmit</span>((v) <span className="text-purple-400">=&gt;</span> {"{"}</div>
              <div className="pl-8 text-indigo-300">updateWizardData(v);</div>
              <div className="pl-8 text-indigo-300">goToNextStep();</div>
              <div className="pl-4 text-emerald-400">{" })}"}&gt;</div>
              <div className="pl-8 text-emerald-400">&lt;TextInput <span className="text-indigo-400">{"{...form.getInputProps('email')}"}</span> /&gt;</div>
              <div className="pl-4 text-emerald-400">&lt;/form&gt;</div>
              <div>);</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pro Tip: Security & Integrity */}
      <section className="bg-teal-50 border border-teal-100 rounded-3xl p-8 space-y-4">
        <h3 className="text-lg font-bold text-teal-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Data Integrity Pattern
        </h3>
        <p className="text-teal-800 text-sm leading-relaxed">
            When working with Mantine Form, use the <code className="bg-teal-100 px-1 rounded">enhanceGetInputProps</code> pattern 
            to automatically sanitize data before it reaches the Wizard storage. This ensures that only 
            clean, validated data is persisted, preventing "stale" or "dirty" state from polluting 
            your LocalStorage or URL params.
        </p>
      </section>

      {/* Navigation */}
      <DocsNavigation 
        prev={{ label: "Formik", href: "/docs/formik" }}
        next={{ label: "TanStack Form", href: "/docs/tanstack" }}
      />
    </div>
  );
}
