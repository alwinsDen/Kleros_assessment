import React from "react";
import "./index.scss";
import { Blocks } from "react-loader-spinner";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const gloading = useSelector(
    (state: any) => state.saveContractDetails.gloading,
  );
  return (
    gloading && (
      <div className={"globalLoader"}>
        <Blocks
          visible={true}
          height="200"
          width="200"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    )
  );
};
export default GlobalLoader;
