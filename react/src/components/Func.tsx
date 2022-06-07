import React from "react";

import { Button, Divider, Input } from "@chakra-ui/react";
import { useMoralis, useWeb3Contract, useWeb3ExecuteFunction } from "react-moralis";
import { AppContext } from "../AppContext";
import { useFormik } from "formik";

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

  // 兩種結果完全相同
  const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract({});
  // const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction();

  React.useEffect(() => {
    if (error) {
      console.log("fetch data failed", error);
    }
  }, [error]);

  React.useEffect(() => {
    if (data) {
      console.log(typeof data);
      console.log("fetch data", data);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values);
      const options = {
        abi: appCtx.contractData.abi,
        contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
        functionName: abi.name,
        params: { ...values },
      };

      runContractFunction({
        params: options,
        onSuccess: async (tx: any) => {
          const response = await tx.wait();
          console.log(response);
        },
      });
    },
  });

  return (
    <div className="w-screen my-2">
      <form className="mx-auto w-8/12" onSubmit={formik.handleSubmit}>
        {abi.inputs.length === 1 ? (
          <Input
            key={0}
            placeholder={abi.inputs[0].name}
            id={abi.inputs[0].name}
            name={abi.inputs[0].name}
            onChange={formik.handleChange}
            value={formik.values[abi.inputs[0].name]}
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
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
          </div>
        )}

        <Button colorScheme="blue" type="submit">
          {abi.name}
        </Button>
      </form>
      {!!data && <p>{JSON.stringify(data)}</p>}
      <Divider mt="2" />
    </div>
  );
};

export default Func;
