import React from "react";

import contractData from "./contracts/Greeter.sol/Greeter.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export interface AppContextProps {
  contractData: any;
  contractAddress: string;
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
        contractAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
