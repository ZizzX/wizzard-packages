import React from "react";
import { useDocVersion, type DocVersion } from "../context/VersionContext";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

interface VersionGuardProps {
  children: React.ReactNode;
  minVersion: DocVersion;
}

export const VersionGuard: React.FC<VersionGuardProps> = ({
  children,
  minVersion,
}) => {
  const { version, setVersion } = useDocVersion();
  const { language } = useTranslation();

  // Simple check: if we are in 1.7.2 and page requires 2.0.0, block it.
  // Ideally we'd use semver, but for 2 versions this is fine.
  const isBlocked = version === "1.7.2" && minVersion === "2.0.0";

  if (isBlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="space-y-2 max-w-lg">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === "ru"
              ? "Функция недоступна в v1.7.2"
              : "Feature Not Available in v1.7.2"}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {language === "ru"
              ? `Эта страница описывает функционал, появившийся в версии ${minVersion}. Вы просматриваете документацию для Legacy версии.`
              : `This page describes features introduced in version ${minVersion}. You are currently viewing the Legacy documentation.`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/docs/introduction"
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            {language === "ru" ? "На главную" : "Go Home"}
          </Link>
          <button
            onClick={() => setVersion("v2.0.0" as DocVersion)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm"
          >
            {language === "ru" ? "Переключиться на v2.0.0" : "Switch to v2.0.0"}
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
