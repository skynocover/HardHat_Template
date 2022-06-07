import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./AppContext";

import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MoralisProvider
      appId="aHwNCdVyrnCc8TBWQbZg7MjCIxrgTVJBwtuG9VCY"
      serverUrl="https://mikkvj4grwed.usemoralis.com:2053/server"
    >
      <AppProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AppProvider>
    </MoralisProvider>
  </React.StrictMode>,
);
