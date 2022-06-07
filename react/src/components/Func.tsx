import React from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  ButtonGroup,
  Divider,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Input,
} from "@chakra-ui/react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { AppContext } from "../AppContext";
import { useFormik } from "formik";

import contractDate from "./contracts/Greeter.sol/Greeter.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface io {
  name: string;
  type: string;
}

interface func {
  name: string;
  inputs: io[];
  outputs: io[];
}

const Func = ({ abi }: { abi: func }) => {
  const appCtx = React.useContext(AppContext);

  const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract();

  React.useEffect(() => {
    if (error) {
      console.log("fetch data failed", error);
    }
  }, [error]);

  React.useEffect(() => {
    if (data) {
      console.log("fetch data", data);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values);
      const options = {
        abi: appCtx.contractData.abi,
        contractAddress: appCtx.contractAddress,
        functionName: abi.name,
        params: { ...values },
      };

      console.log(options);

      runContractFunction({ params: options });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {abi.inputs.map((item, index) => (
          <Input
            key={index}
            placeholder={item.name}
            id={item.name}
            name={item.name}
            onChange={formik.handleChange}
            value={formik.values[item.name]}
          />
        ))}

        <Button colorScheme="blue" type="submit">
          {abi.name}
        </Button>
      </form>

      <Divider />
      <UnorderedList>
        {!!data && typeof data === "string" && <p>{JSON.stringify(data)}</p>}
      </UnorderedList>
      <Divider />
    </div>
  );
};

export default Func;
