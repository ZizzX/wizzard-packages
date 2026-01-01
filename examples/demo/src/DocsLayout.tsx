import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "./lib/utils";
import { useDocVersion, type DocVersion } from "./context/VersionContext";
import { useTranslation } from "./context/LanguageContext";
import {
  getSidebarItems,
  type SidebarGroup,
  type SidebarItem,
} from "./config/docs";

export default function DocsLayout() {
  const { t } = useTranslation();
  const { version } = useDocVersion();
  const sidebarItems = getSidebarItems(t, version);

  return <DocsLayoutContent sidebarItems={sidebarItems} />;
}

function DocsLayoutContent({ sidebarItems }: { sidebarItems: SidebarGroup[] }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { version, setVersion } = useDocVersion();

  // Close sidebar when route changes on mobile
  // Uses state-during-render pattern to safely handle navigation resets
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setSidebarOpen(false);
  }

  // Find current item for mobile title
  const currentItem = sidebarItems
    .flatMap((g) => g.items)
    .find((i) => i.path === location.pathname);

  return (
    <div className="flex flex-col md:flex-row gap-10 relative">
      {/* Mobile Sub-Navigation Bar - Sticks below main header */}
      <div className="md:hidden sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2 flex items-center justify-between -mx-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-2 py-1.5 -ml-1 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-50"
            aria-label="Open documentation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider">
              {t("ui.menu")}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1 text-[12px] font-medium text-gray-400">
          <span className="truncate max-w-30">{currentItem?.label}</span>
        </div>
      </div>

      {/* Sidebar & Mobile Drawer */}
      <aside
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300 md:relative md:z-0 md:block md:w-64 shrink-0",
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100 md:block ",
          !isSidebarOpen && "pointer-events-none md:pointer-events-auto"
        )}
      >
        {/* Mobile Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gray-900/10 backdrop-blur-[2px] md:hidden transition-opacity duration-300",
            isSidebarOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar Content */}
        <nav className="relative h-full w-4/5 max-w-70 bg-white border-r border-gray-100 overflow-y-auto px-6 py-8 shadow-2xl md:shadow-none md:p-0 md:w-full md:bg-transparent md:border-none md:sticky md:top-24 space-y-8 no-scrollbar">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between md:hidden mb-8 border-b border-gray-50 pb-4">
            <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">
              {t("ui.navigation")}
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Version Selector */}
          <div className="mb-8 px-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              {t("ui.version")}
            </label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as DocVersion)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-sm font-medium text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
            >
              <option value="2.0.0">v2.0.0 (Modern)</option>
              <option value="1.7.2">v1.7.2 (Legacy)</option>
            </select>
            <p className="mt-2 text-[10px] text-gray-400 leading-relaxed italic">
              {version === "2.0.0"
                ? "Showing Store & Factory API (Recommended)"
                : "Showing Legacy Context API"}
            </p>
          </div>

          {sidebarItems.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-[10px] font-black text-gray-400 px-2 uppercase tracking-[0.2em]">
                {group.title}
              </h4>
              <div className="flex flex-col space-y-1">
                {group.items.map((item: SidebarItem) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={cn(
                        "px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent",
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 border-indigo-200 translate-x-1"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:translate-x-1"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 max-w-4xl pt-6 md:pt-0">
        <article className="prose prose-indigo prose-slate max-w-none">
          <Outlet />
        </article>
      </main>
    </div>
  );
}
