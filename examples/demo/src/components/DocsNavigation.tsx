import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { useDocVersion } from "../context/VersionContext";
import { getSidebarItems } from "../config/docs";

interface NavItem {
  label: string;
  path?: string;
  href?: string;
}

interface DocsNavigationProps {
  prev?: NavItem;
  next?: NavItem;
}

const MotionLink = motion(Link);

export default function DocsNavigation({
  prev: manualPrev,
  next: manualNext,
}: DocsNavigationProps) {
  const { t } = useTranslation();
  const { version } = useDocVersion();
  const location = useLocation();

  const sidebarItems = getSidebarItems(t, version);
  const flattenedItems = sidebarItems.flatMap((group) => group.items);
  const currentIndex = flattenedItems.findIndex(
    (item) => item.path === location.pathname
  );

  let prevItem = null;
  let nextItem = null;

  if (currentIndex !== -1) {
    if (currentIndex > 0) {
      prevItem = flattenedItems[currentIndex - 1];
    }
    if (currentIndex < flattenedItems.length - 1) {
      nextItem = flattenedItems[currentIndex + 1];
    }
  }

  const prev =
    manualPrev ||
    (prevItem ? { label: prevItem.label, path: prevItem.path } : undefined);
  const next =
    manualNext ||
    (nextItem ? { label: nextItem.label, path: nextItem.path } : undefined);

  return (
    <div className="pt-10 mt-12 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
      <div>
        {prev && (
          <MotionLink
            to={prev.path || prev.href || "#"}
            whileHover={{ x: -5 }}
            className="group flex flex-col items-start gap-1 p-4 rounded-2xl hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t("nav.prev")}
            </span>
            <span className="text-lg font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
              {prev.label}
            </span>
          </MotionLink>
        )}
      </div>

      <div>
        {next && (
          <MotionLink
            to={next.path || next.href || "#"}
            whileHover={{ x: 5 }}
            className="group flex flex-col items-end gap-1 p-4 rounded-2xl hover:bg-gray-50 transition-colors w-full sm:w-auto text-right"
          >
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              {t("nav.next")}
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <span className="text-lg font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
              {next.label}
            </span>
          </MotionLink>
        )}
      </div>
    </div>
  );
}
