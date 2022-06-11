import React from "react";

import contractData from "./artifacts/contracts/DoBook.sol/DoBook.json";

export interface AppContextProps {
  contractData: any;
}

const AppContext = React.createContext<AppContextProps>(undefined!);

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  /// //////////////////////////////////////////////////

  return (
    <AppContext.Provider
      value={{
        contractData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
