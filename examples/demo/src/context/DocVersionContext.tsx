import { useState, type ReactNode } from "react";
import { VersionContext, type DocVersion } from "./DocVersionContextLogic";

export const VersionProvider = ({ children }: { children: ReactNode }) => {
  const [version, setVersion] = useState<DocVersion>("2.0.0");

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
};
