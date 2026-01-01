import DocsNavigation from "../../components/DocsNavigation";
import { ProTip } from "../../components/ProTip";
import { useTranslation } from "../../context/LanguageContext";
import { VersionGuard } from "../../components/VersionGuard";

export default function MiddlewareDevTools() {
  const { language } = useTranslation();
  return (
    <VersionGuard minVersion="2.0.0">
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            {language === "ru"
              ? "Middleware и DevTools"
              : "Middleware & DevTools"}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
            {language === "ru"
              ? "Расширяйте возможности вашего визарда с помощью гибкой системы Middleware и мощных инструментов отладки."
              : "Extend your wizard's capabilities with a flexible Middleware system and powerful debugging tools."}
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Middleware (Промежуточное ПО)" : "Middleware"}
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {language === "ru"
              ? "Middleware позволяет перехватывать каждое действие (action), отправляемое в стор. Вы можете использовать его для логирования, аналитики, синхронизации состояния или даже блокировки определенных действий."
              : "Middleware allows you to intercept every action dispatched to the store. You can use it for logging, analytics, state synchronization, or even blocking specific actions."}
          </p>

          <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-xl border border-gray-800 p-6">
            <pre className="text-indigo-300 font-mono text-sm leading-relaxed whitespace-pre">
              {`const loggerMiddleware: WizardMiddleware = ({ getState }) => (next) => (action) => {
  console.log('${language === "ru" ? "Действие" : "Action"}:', action.type);
  const result = next(action);
  console.log('${language === "ru" ? "Новое состояние" : "New State"}:', getState());
  return result;
};

// ${language === "ru" ? "Использование" : "Usage"}
<WizardProvider middlewares={[loggerMiddleware]}>
  <App />
</WizardProvider>`}
            </pre>
          </div>

          <h3 className="text-xl font-bold text-gray-800">
            {language === "ru"
              ? "Создание кастомных Middleware"
              : "Creating Custom Middleware"}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {language === "ru"
              ? "Middleware следует стандартной сигнатуре каррированной функции: "
              : "Middleware follows the standard curried function signature: "}
            <code className="text-indigo-600 font-mono font-bold">
              {"(api) => (next) => (action) => result"}
            </code>
            .
          </p>

          <ProTip>
            {language === "ru"
              ? "Используйте middleware для аналитики, чтобы ваши компоненты оставались чистыми и сфокусированными только на пользовательском интерфейсе."
              : "Use middleware for analytics to keep your components clean and focused purely on the user interface."}
          </ProTip>
        </section>

        <section className="space-y-6 pt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru" ? "Инструменты разработчика" : "Developer Tools"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Redux DevTools
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === "ru"
                  ? "Подключайтесь к официальному расширению Redux DevTools. Отслеживайте историю состояний, используйте time-travel и инспектируйте полезную нагрузку (payload) действий."
                  : "Connect to the official Redux DevTools extension. Track state history, use time-travel, and inspect action payloads."}
              </p>
              <div className="bg-gray-100 p-4 rounded-xl font-mono text-xs">
                {"middlewares={[devToolsMiddleware]}"}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Visual DevTools
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === "ru"
                  ? "Встроенный оверлей для инспекции состояния в реальном времени. Идеально подходит для сред, где нет возможности установить браузерные расширения."
                  : "Built-in overlay for real-time state inspection. Perfect for environments where browser extensions cannot be installed."}
              </p>
              <div className="bg-gray-100 p-4 rounded-xl font-mono text-xs">
                {"<WizardDevTools />"}
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-300/30 transition-colors" />
            <h4 className="flex items-center gap-2 text-indigo-900 font-bold mb-4 relative z-10">
              <span className="px-2 py-0.5 bg-indigo-600 rounded-full text-white text-[10px] uppercase font-black">
                NEW 2.0.0
              </span>
              {language === "ru"
                ? "Единый опыт отладки"
                : "Unified Debugging Experience"}
            </h4>
            <p className="text-indigo-700 text-sm leading-relaxed relative z-10 max-w-2xl">
              {language === "ru"
                ? "Комбинируйте оба инструмента для максимальной продуктивности. Visual DevTools бесшовно работает с действиями, перехваченными вашей системой middleware."
                : "Combine both tools for maximum productivity. Visual DevTools works seamlessly with actions intercepted by your middleware system."}
            </p>
          </div>
        </section>

        <DocsNavigation />
      </div>
    </VersionGuard>
  );
}
