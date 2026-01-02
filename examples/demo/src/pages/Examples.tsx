import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { useTranslation } from "../context/LanguageContext";

export default function Examples() {
  const { language } = useTranslation();

  const examples = [
    {
      title: language === "ru" ? "Простой JS Визард" : "Simple JS Wizard",
      description:
        language === "ru"
          ? "Самый простой способ начать пользование без внешних библиотек."
          : "The easiest way to get started with no external form libraries.",
      path: "/simple",
      icon: "✨",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "RHF + Zod",
      description:
        language === "ru"
          ? "Полнофункциональные формы с React Hook Form и валидацией Zod."
          : "Full-featured forms with React Hook Form and Zod validation.",
      path: "/rhf-zod",
      icon: "🛡️",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Formik + Yup",
      description:
        language === "ru"
          ? "Классические формы уровня Enterprise с Formik и Yup."
          : "Classic enterprise-grade forms with Formik and Yup.",
      path: "/formik-yup",
      icon: "📦",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: language === "ru" ? "Условный поток" : "Conditional Flow",
      description:
        language === "ru"
          ? "Сложная многошаговая логика, основанная на действиях пользователя."
          : "Complex multi-step logic based on user interaction.",
      path: "/conditional",
      icon: "🔀",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title:
        language === "ru"
          ? "Сложные данные и Производительность"
          : "Complex Data & Performance",
      description:
        language === "ru"
          ? "Оптимизированные режимы валидации, глубокие пути и авто-сохранение."
          : "Optimized validation modes, deep paths, and auto-persistence.",
      path: "/complex",
      icon: "⚡", // Changed icon to lightning
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: language === "ru" ? "Продвинутые функции" : "Advanced Features",
      description:
        language === "ru"
          ? "Автозаполнение, декларативный рендеринг и смешанное хранилище."
          : "Autofill, Declarative Rendering, and Mixed Persistence.",
      path: "/advanced",
      icon: "🚀",
      color: "bg-rose-50 text-rose-600",
    },
    {
      title: language === "ru" ? "Legacy Интеграция" : "Legacy Integration",
      description:
        language === "ru"
          ? "Как использовать с классовыми компонентами или старыми версиями React."
          : "How to use with class components or older React versions.",
      path: "/legacy",
      icon: "🦖",
      color: "bg-gray-50 text-gray-600",
    },
    {
      title: "Middleware & DevTools",
      description:
        language === "ru"
          ? "Визуальный оверлей для отладки и перехват кастомных действий."
          : "Visual debugging overlay and custom action interception.",
      path: "/middleware-demo",
      icon: "🛠️",
      color: "bg-stone-50 text-stone-600",
    },
    {
      title:
        language === "ru"
          ? "Enterprise Cloud Визард"
          : "Enterprise Cloud Wizard",
      description:
        language === "ru"
          ? "Демо уровня Google с асинхронной валидацией, зависимостями и сложным роутингом."
          : "Google-quality demo with async validation, dependencies, and complex routing.",
      path: "/enterprise-wizard",
      icon: "🏢",
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      title:
        language === "ru"
          ? "Оптимизация и DevTools"
          : "Optimization & DevTools",
      description:
        language === "ru"
          ? "Демонстрация мемоизации условий, асинхронной инициализации и исправленного DevTools."
          : "Demo of memoized conditions, async initialization, and fixed DevTools.",
      path: "/optimization",
      icon: "⚡",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {language === "ru" ? "Галерея примеров" : "Examples Gallery"}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {language === "ru"
            ? "Посмотрите, как библиотека интегрируется с вашими любимыми инструментами и справляется со сложными сценариями."
            : "See how the library integrates with your favorite tools and handles complex scenarios."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Link
            key={example.path}
            to={example.path}
            className="group flex transition-transform hover:-translate-y-1"
          >
            <Card className="flex-1 border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${example.color}`}
                >
                  {example.icon}
                </div>
                <div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors text-lg">
                    {example.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {example.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
