import type { DocVersion } from "../context/VersionContext";

export interface SidebarItem {
  id: string;
  label: string;
  path: string;
  minVersion?: DocVersion;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export const getSidebarItems = (
  t: (key: string) => string,
  version: DocVersion
): SidebarGroup[] => {
  const allItems = [
    {
      title: t("sidebar.getting_started"),
      items: [
        {
          id: "introduction",
          label: t("item.introduction"),
          path: "/docs/introduction",
        },
        {
          id: "installation",
          label: t("item.installation"),
          path: "/docs/installation",
        },
        {
          id: "migration",
          label: t("item.migration"),
          path: "/docs/migration",
        },
        {
          id: "quickstart",
          label: t("item.quickstart"),
          path: "/docs/quickstart",
        },
      ],
    },
    {
      title: t("sidebar.core_concepts"),
      items: [
        { id: "concepts", label: t("item.concepts"), path: "/docs/concepts" },
        { id: "hooks", label: t("item.hooks"), path: "/docs/hooks" },
        { id: "types", label: t("item.types"), path: "/docs/types" },
      ],
    },
    {
      title: t("sidebar.advanced"),
      items: [
        {
          id: "persistence",
          label: t("item.persistence"),
          path: "/docs/persistence",
        },
        {
          id: "validation",
          label: t("item.validation"),
          path: "/docs/validation",
        },
        {
          id: "conditional",
          label: t("item.conditional"),
          path: "/docs/conditional-logic",
        },
        {
          id: "middleware",
          label: t("item.middleware"),
          path: "/docs/middleware",
          minVersion: "2.0.0", // Only for v2.0.0
        },
        { id: "routing", label: t("item.routing"), path: "/docs/routing" },
        {
          id: "rendering",
          label: t("item.rendering"),
          path: "/docs/rendering",
        },
        {
          id: "deferred",
          label: t("item.deferred"),
          path: "/docs/deferred-rendering",
          minVersion: "2.0.0", // Only for v2.0.0
        },
        {
          id: "enterprise",
          label: t("item.enterprise"),
          path: "/docs/enterprise",
          minVersion: "2.0.0", // Only for v2.0.0
        },
        {
          id: "performance",
          label: t("item.performance"),
          path: "/docs/performance",
        },
        { id: "security", label: t("item.security"), path: "/docs/security" },
      ],
    },
    {
      title: t("sidebar.integrations"),
      items: [
        {
          id: "rhf",
          label: t("item.rhf") || "React Hook Form",
          path: "/docs/rhf",
        },
        {
          id: "formik",
          label: t("item.formik") || "Formik",
          path: "/docs/formik",
        },
        {
          id: "mantine",
          label: t("item.mantine") || "Mantine Form",
          path: "/docs/mantine",
        },
        {
          id: "tanstack",
          label: t("item.tanstack") || "TanStack Form",
          path: "/docs/tanstack",
        },
        {
          id: "valibot",
          label: t("item.valibot") || "Valibot",
          path: "/docs/valibot",
        },
      ],
    },
  ] as SidebarGroup[];

  // Filter out items that don't match the current version
  return allItems.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      // If item requires 2.0.0 but we are on 1.7.2, hide it
      if (item.minVersion === "2.0.0" && version === "1.7.2") {
        return false;
      }
      return true;
    }),
  }));
};
