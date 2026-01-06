import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/Button";
import { useTranslation } from "./context/LanguageContext";

export default function Layout() {
  const location = useLocation();

  const { t, language, setLanguage } = useTranslation();

  const navItems = useMemo(
    () => [
      { path: "/", label: t("nav.overview") },
      { path: "/docs/introduction", label: t("nav.docs") },
      // { path: "/examples", label: t("nav.examples") },
      // { path: "/test", label: t("nav.test") },
    ],
    [t]
  );
  const exampleRoutes = [
    "/examples",
    "/simple",
    "/legacy",
    "/rhf-zod",
    "/formik-yup",
    "/conditional",
    "/complex",
    "/advanced",
    "/enterprise-wizard",
    "/middleware-demo",
    "/optimization",
  ];

  const getActiveNav = (currentPath: string) => {
    return navItems.find((item) => {
      if (item.path === "/") return currentPath === "/";
      if (item.path.startsWith("/docs")) return currentPath.startsWith("/docs");
      if (item.path === "/examples")
        return exampleRoutes.some((route) => currentPath.startsWith(route));
      return currentPath.startsWith(item.path);
    });
  };

  useEffect(() => {
    document.documentElement.lang = language;
    const currentNav = getActiveNav(location.pathname);
    const title = currentNav
      ? `${currentNav.label} | Wizzard Stepper`
      : "Wizzard Stepper";
    document.title = title;
  }, [language, location, navItems]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold group-hover:bg-indigo-700 transition-colors">
                  W
                </div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
                  Wizard Stepper
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive =
                    item.path === "/"
                      ? location.pathname === "/"
                      : item.path.startsWith("/docs")
                        ? location.pathname.startsWith("/docs")
                        : item.path === "/examples"
                          ? exampleRoutes.some((route) =>
                              location.pathname.startsWith(route)
                            )
                          : location.pathname.startsWith(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-indigo-50 text-indigo-700 font-semibold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button
                  onClick={() => setLanguage(language === "en" ? "ru" : "en")}
                  className="px-3 py-1 text-[10px] font-black uppercase cursor-pointer tracking-wider rounded-md transition-all hover:bg-white hover:shadow-sm text-gray-500 hover:text-indigo-600 flex items-center gap-2 min-w-[60px] justify-center"
                >
                  <span
                    className={
                      language === "en" ? "text-indigo-600" : "text-gray-400"
                    }
                  >
                    EN
                  </span>
                  <span className="text-gray-300">/</span>
                  <span
                    className={
                      language === "ru" ? "text-indigo-600" : "text-gray-400"
                    }
                  >
                    RU
                  </span>
                </button>
              </div>

              <a
                href="https://github.com/ZizzX/wizzard-stepper-react"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="sr-only">{t("nav.github")}</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://www.npmjs.com/package/wizzard-stepper-react",
                    "_blank"
                  )
                }
              >
                v{__APP_VERSION__}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-0 md:pt-10 pb-10">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">{t("ui.footer")}</p>
        </div>
      </footer>
    </div>
  );
}
