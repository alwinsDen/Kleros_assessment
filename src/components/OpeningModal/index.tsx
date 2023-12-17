import React, { Dispatch, SetStateAction } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";

//import contract details
import { assignContId } from "../../redux/saveContractDetails";

const OpeningModal = ({
  setGameMode,
}: {
  setGameMode: Dispatch<SetStateAction<string | null>>;
}) => {
  //dispatch
  const dispatch = useDispatch();

  //current user id from redux
  const userId = useSelector(
    (state: any) => state.saveContractDetails.accountId,
  );
  const web3Instance = useSelector(
    (state: any) => state.saveContractDetails.web3Instance,
  );

  return (
    <div className={"opening-modal"}>
      <div className={"join"}>
        <button className={"join-new"} onClick={() => setGameMode("createNew")}>
          Start a new game
        </button>
        <div className={"spacer"}>
          <div className={"hline"}></div>
          <p>or</p>
          <div className={"hline"}></div>
        </div>
        <button
          className={"join-existing"}
          onClick={() => {
            let contractId = window.prompt("Enter the game contract ID");
            dispatch(assignContId(contractId));
            setGameMode("joinGame");
          }}
        >
          Join exiting game
        </button>
      </div>
    </div>
  );
};

export default OpeningModal;
