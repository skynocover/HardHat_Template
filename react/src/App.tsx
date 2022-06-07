import "./App.css";
import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, ButtonGroup } from "@chakra-ui/react";
import { useMoralis, useWeb3Contract } from "react-moralis";

import Func from "./components/Func";

import contractDate from "./contracts/Greeter.sol/Greeter.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const {
    authenticate,
    isAuthenticated,
    user,
    enableWeb3,
    logout,
    authError,
    userError,
    Moralis,
    web3,
  } = useMoralis();

  const init = async () => {
    await enableWeb3();
  };

  const [inputFuncs, setInputFuncs] = React.useState([]);
  const [outputFuncs, setOutputFuncs] = React.useState([]);

  React.useEffect(() => {
    init();

    const input = contractDate.abi.filter(
      (item) => item.stateMutability === "view" && item.type === "function",
    );
    console.table(input);

    setInputFuncs(input);

    const output = contractDate.abi.filter(
      (item) => item.stateMutability === "nonpayable" && item.type === "function",
    );
    console.table(output);

    setOutputFuncs(output);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <>
            <h1>Welcome {user?.get("username")}</h1>
            <h3>Address: {user?.get("ethAddress")}</h3>
            <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <Button onClick={() => authenticate()} colorScheme="blue">
            Connect
          </Button>
        )}

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Read</Tab>
            <Tab>Write</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {inputFuncs.map((item, index) => (
                <Func abi={item} key={index}></Func>
              ))}
            </TabPanel>
            <TabPanel>
              {outputFuncs.map((item, index) => (
                <Func abi={item} key={index}></Func>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
