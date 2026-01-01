import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type DocVersion = "1.7.2" | "2.0.0" | string;

interface VersionContextType {
  version: DocVersion;
  setVersion: (v: DocVersion) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

//eslint-disable-next-line @typescript-eslint/no-require-imports
export const APP_VERSION = __APP_VERSION__;

export const VersionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [version, setVersionState] = useState<DocVersion>(() => {
    const saved = localStorage.getItem("docs-version");
    // Handle potential legacy values with 'v' prefix
    if (saved === "v2.0.0" || saved === "2.0.0") return APP_VERSION;
    if (saved === "v1.7.2" || saved === "1.7.2") return "1.7.2";
    return APP_VERSION;
  });

  const setVersion = (v: DocVersion) => {
    setVersionState(v);
    localStorage.setItem("docs-version", v);
  };

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

//eslint-disable-next-line react-refresh/only-export-components
export const useVersion = () => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
};

//eslint-disable-next-line react-refresh/only-export-components
export const useDocVersion = useVersion;
