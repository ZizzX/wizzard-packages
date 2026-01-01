import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function ValibotDocs() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Valibot
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "Будущее легковесной валидации. Узнайте, как внедрить адаптер Valibot, чтобы сохранить минимальный размер бандла вашего визарда."
            : "The future of lightweight validation. Learn how to implement the Valibot adapter to keep your wizard's bundle size minimal."}
        </p>
      </section>

      {/* 1. Custom Adapter Implementation */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Адаптер для Valibot" : "Valibot Adapter"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru"
            ? "Valibot — отличный выбор для визардов в мобильных приложениях, где важен каждый килобайт. Вот профессиональная реализация адаптера для Valibot:"
            : "Valibot is an excellent choice for wizards in mobile apps where every kilobyte counts. Here is a professional implementation of the Valibot adapter:"}
        </p>

        <ProTip>
          {language === "ru"
            ? "Valibot не включает встроенный адаптер, чтобы само ядро библиотеки оставалось крошечным. Используйте паттерн ниже, чтобы создать идеально подходящий адаптер для вашего проекта."
            : "Valibot doesn't include a built-in adapter to keep the core library tiny. Use the pattern below to create a perfectly tailored adapter for your project."}
        </ProTip>

        <div className="bg-gray-900 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
          <div className="p-8 font-mono text-[13px] leading-relaxed">
            <div className="space-y-1 text-gray-400">
              <div>
                <span className="text-purple-400">export class</span>{" "}
                <span className="text-indigo-300">ValibotAdapter</span>{" "}
                <span className="text-purple-400">implements</span>{" "}
                <span className="text-amber-400">IValidatorAdapter</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-indigo-300">constructor</span>
                <span className="text-emerald-400">(</span>
                <span className="text-purple-400">private</span>{" "}
                <span className="text-indigo-300">schema</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-400">any</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-emerald-400">{"{}"}</span>
              </div>
              <div className="pt-2 pl-4">
                <span className="text-purple-400">async</span>{" "}
                <span className="text-indigo-300">validate</span>
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">data</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-amber-400">any</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-8">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-indigo-300">result</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-indigo-300">safeParse</span>
                <span className="text-emerald-400">(</span>
                <span className="text-purple-400">this</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">schema</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">data</span>
                <span className="text-emerald-400">)</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pl-8">
                <span className="text-purple-400">return</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-12">
                <span className="text-sky-300">isValid</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">result</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">success</span>
                <span className="text-emerald-400">,</span>
              </div>
              <div className="pl-12">
                <span className="text-sky-300">errors</span>
                <span className="text-emerald-400">:</span>{" "}
                <span className="text-indigo-300">result</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">issues</span>
                <span className="text-emerald-400">?.</span>
                <span className="text-indigo-300">reduce</span>
                <span className="text-emerald-400">(</span>
                <span className="text-emerald-400">(</span>
                <span className="text-indigo-300">acc</span>
                <span className="text-emerald-400">,</span>{" "}
                <span className="text-indigo-300">issue</span>
                <span className="text-emerald-400">)</span>{" "}
                <span className="text-purple-400">=&gt;</span>{" "}
                <span className="text-emerald-400">{"{"}</span>
              </div>
              <div className="pl-16">
                <span className="text-indigo-300">acc</span>
                <span className="text-emerald-400">[</span>
                <span className="text-indigo-300">issue</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">path</span>
                <span className="text-emerald-400">[</span>
                <span className="text-amber-300">0</span>
                <span className="text-emerald-400">]</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">key</span>
                <span className="text-emerald-400">]</span>{" "}
                <span className="text-emerald-400">=</span>{" "}
                <span className="text-indigo-300">issue</span>
                <span className="text-emerald-400">.</span>
                <span className="text-indigo-300">message</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pl-16">
                <span className="text-purple-400">return</span>{" "}
                <span className="text-indigo-300">acc</span>
                <span className="text-emerald-400">;</span>
              </div>
              <div className="pl-12">
                <span className="text-emerald-400">{"}, {})"}</span>
              </div>
              <div className="pl-8">
                <span className="text-emerald-400">{"}"}</span>
              </div>
              <div className="pl-4">
                <span className="text-emerald-400">{"}"}</span>
              </div>
              <div>
                <span className="text-emerald-400">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bundle Comparison */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === "ru" ? "Почему Valibot?" : "Why Valibot?"}
        </h3>
        <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">
                  {language === "ru" ? "Библиотека" : "Library"}
                </th>
                <th className="px-6 py-5">
                  {language === "ru" ? "Размер (KB)" : "Size (KB)"}
                </th>
                <th className="px-6 py-5">Tree Shakeable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-5 font-bold text-indigo-600">Zod</td>
                <td className="px-6 py-5 text-gray-600 font-mono">~13kB</td>
                <td className="px-6 py-5 text-rose-500 font-medium italic">
                  Limited
                </td>
              </tr>
              <tr>
                <td className="px-6 py-5 font-bold text-orange-600">Valibot</td>
                <td className="px-6 py-5 text-gray-600 font-mono">&lt; 1kB</td>
                <td className="px-6 py-5 text-emerald-500 font-medium">
                  Full Support
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <DocsNavigation
        prev={{ label: "TanStack Form", href: "/docs/tanstack" }}
        next={{
          label: language === "ru" ? "Все примеры" : "All Examples",
          href: "/examples",
        }}
      />
    </div>
  );
}
