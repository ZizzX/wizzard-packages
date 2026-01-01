import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";

export default function SecurityDocs() {
  const { language } = useTranslation();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {language === "ru"
            ? "Безопасность и целостность"
            : "Security & Integrity"}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          {language === "ru"
            ? "Узнайте, как защитить сценарии вашего визарда от ручных манипуляций с состоянием, несанкционированных переходов между шагами и утечек конфиденциальных данных."
            : "Learn how to protect your wizard flows from manual state tampering, unauthorized step transitions, and sensitive data leaks."}
        </p>
      </section>

      {/* 1. Navigation Guarding */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Контроль доступа к шагам"
              : "Step Access Control"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              В реальных приложениях пользователи могут попытаться
              «перепрыгнуть» вперед, изменив URL или LocalStorage. Чтобы
              предотвратить это, внедрите <strong>Navigation Guard</strong>,
              используя интерцептор{" "}
              <code className="text-indigo-600 font-mono font-bold bg-indigo-50 px-1 rounded mx-1">
                onStepChange
              </code>
              .
            </>
          ) : (
            <>
              In real apps, users might try to "jump" ahead by modifying URL or
              LocalStorage. To prevent this, implement a{" "}
              <strong>Navigation Guard</strong> using the{" "}
              <code className="text-indigo-600 font-mono font-bold bg-indigo-50 px-1 rounded mx-1">
                onStepChange
              </code>{" "}
              interceptor.
            </>
          )}
        </p>

        <div className="bg-gray-950 rounded-3xl p-8 font-mono text-[13px] shadow-2xl ring-1 ring-white/10">
          <div className="space-y-2 text-gray-400">
            <div>
              <span className="text-gray-400 italic">
                // Предлагаемый паттерн "Expert": Последовательный Guard
              </span>
            </div>
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">onStepChange</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">from</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">string</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">to</span>
              <span className="text-emerald-400">:</span>{" "}
              <span className="text-amber-400">string</span>
              <span className="text-emerald-400">)</span>{" "}
              <span className="text-purple-400">=&gt;</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">isMovingForward</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-indigo-300">isAfter</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">to</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">from</span>
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">;</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">isTargetCompleted</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-indigo-300">completedSteps</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">has</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">to</span>
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">;</span>
            </div>
            <div className="pt-2 pl-4 text-gray-500 italic">
              // Блокируем переход вперед к непосещенным/незавершенным шагам
            </div>
            <div className="pl-4">
              <span className="text-purple-400">if</span>{" "}
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">isMovingForward</span>{" "}
              <span className="text-purple-400">&&</span>{" "}
              <span className="text-purple-400">!</span>
              <span className="text-indigo-300">isTargetCompleted</span>
              <span className="text-emerald-400">)</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
            </div>
            <div className="pl-8">
              <span className="text-purple-400">throw new</span>{" "}
              <span className="text-indigo-300">Error</span>
              <span className="text-emerald-400">(</span>
              <span className="text-amber-300">
                "Сначала завершите текущий шаг."
              </span>
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">;</span>
            </div>
            <div className="pl-4">
              <span className="text-emerald-400">{"}"}</span>
            </div>
            <div>
              <span className="text-emerald-400">{"}"}</span>
            </div>
          </div>
        </div>

        <ProTip>
          Мы планируем добавить параметр{" "}
          <code className="font-black text-blue-900">navigationPolicy</code> в
          конфиг:
          <code className="bg-blue-100 px-1 rounded italic text-xs mx-1">
            'strict' | 'loose' | 'sequential'
          </code>
          . Это позволит сделать логику гвардов декларативной и встроенной.
        </ProTip>
      </section>

      {/* 2. Data Integrity (Encryption) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Целостность данных (Integrity)"
              : "Data Integrity"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru"
            ? "Конфиденциальные данные в LocalStorage уязвимы. Профессиональное решение — использовать шифрующий адаптер с солью на основе сессии."
            : "Sensitive data in LocalStorage is vulnerable. The professional solution is to use an encryption adapter with session-based salt."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-gray-100 p-8 rounded-2xl bg-gray-50/30">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800">Риск ручных манипуляций</h4>
            <p className="text-sm text-gray-500 leading-relaxed italic">
              "Что если пользователь вручную изменит свой кредитный рейтинг в
              LocalStorage?"
            </p>
            <div className="text-[10px] space-y-2 opacity-60">
              <div className="flex items-center gap-2 text-rose-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Данные в LocalStorage легко редактируются через DevTools.
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 whitespace-nowrap">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Используйте HMAC подпись для проверки целостности при
                  гидратации.
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-emerald-700">
              Expert: EncryptedLocalStorage
            </h4>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-[10px] text-emerald-100 shadow-xl ring-1 ring-white/10">
              <span className="text-purple-400">class</span>{" "}
              <span className="text-indigo-300">SecureAdapter</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
              <br />
              &nbsp;&nbsp;<span className="text-indigo-300">saveStep</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">id</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">)</span>{" "}
              <span className="text-emerald-400">{"{"}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-purple-400">const</span>{" "}
              <span className="text-indigo-300">encrypted</span>{" "}
              <span className="text-emerald-400">=</span>{" "}
              <span className="text-indigo-300">AES</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">encrypt</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">data</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">key</span>
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-indigo-300">localStorage</span>
              <span className="text-emerald-400">.</span>
              <span className="text-indigo-300">setItem</span>
              <span className="text-emerald-400">(</span>
              <span className="text-indigo-300">id</span>
              <span className="text-emerald-400">,</span>{" "}
              <span className="text-indigo-300">encrypted</span>
              <span className="text-emerald-400">)</span>
              <span className="text-emerald-400">;</span>
              <br />
              &nbsp;&nbsp;<span className="text-emerald-400">{"}"}</span>
              <br />
              <span className="text-emerald-400">{"}"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. URL Safety */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Санитизация Deep Links"
              : "Deep Link Sanitization"}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {language === "ru" ? (
            <>
              При использовании{" "}
              <code className="text-amber-600 font-bold bg-amber-50 px-1 rounded mx-1 font-mono">
                initialStepId
              </code>{" "}
              из URL, всегда сверяйте его с вашим конфигом. Библиотека делает
              это автоматически, но вы также должны убедиться, что у
              пользователя есть права на просмотр этого шага.
            </>
          ) : (
            <>
              When using{" "}
              <code className="text-amber-600 font-bold bg-amber-50 px-1 rounded mx-1 font-mono">
                initialStepId
              </code>{" "}
              from URL, always validate it against your config. The library does
              this automatically, but you should also ensure the user has
              permission to view that step.
            </>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-gray-100 p-8 rounded-2xl bg-gray-50/30">
          <div className="space-y-2">
            <h5 className="font-bold text-gray-800 text-sm">❌ Уязвимо</h5>
            <div className="text-[10px] font-mono p-4 bg-white border border-rose-200 rounded-xl text-rose-600">
              &lt;Wizard initialStepId={"{params.id}"} config={"{cfg}"} /&gt;
              <br />
              <span className="text-[8px] italic opacity-60 text-gray-400">
                // Любой может ввести /wizard/admin-only в адресную строку
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-gray-800 text-sm">✅ Безопасно</h5>
            <div className="text-[10px] font-mono p-4 bg-white border border-emerald-200 rounded-xl text-emerald-700">
              &lt;Wizard <br />
              &nbsp;&nbsp;initialStepId={"{params.id}"} <br />
              &nbsp;&nbsp;config={"{cfg}"} <br />
              &nbsp;&nbsp;onAuth={"{checkPermissions}"}
              <br />
              /&gt;
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <DocsNavigation
        prev={{
          label: language === "ru" ? "Производительность" : "Performance",
          path: "/docs/performance",
        }}
        next={{
          label: language === "ru" ? "React Hook Form" : "React Hook Form",
          path: "/docs/rhf",
        }}
      />
    </div>
  );
}
