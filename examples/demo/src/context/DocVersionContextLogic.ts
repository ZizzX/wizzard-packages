import { createContext, useContext } from "react";

export type DocVersion = "2.0.0" | "1.x.x";

export interface VersionContextType {
  version: DocVersion;
  setVersion: (v: DocVersion) => void;
}

export const VersionContext = createContext<VersionContextType>({
  version: "2.0.0",
  setVersion: () => {},
});

export const useDocVersion = () => useContext(VersionContext);
