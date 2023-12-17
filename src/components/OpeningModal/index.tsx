import React, { Dispatch, SetStateAction } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import contractInfo from "../../compiled_contract/RPS.json";

//import contract details
import {
  assignContId,
  assignPlayerMode,
} from "../../redux/saveContractDetails";
import { toast } from "react-toastify";

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
          onClick={async () => {
            let contractId = window.prompt("Enter the game contract ID");
            let contract = new web3Instance.eth.Contract(
              contractInfo.abi,
              contractId,
            );
            try {
              const [player1, player2] = await Promise.all([
                contract.methods.j1().call(),
                contract.methods.j2().call(),
              ]);
              if (player1 === userId) {
                console.log("ORGANIZER");
                dispatch(assignContId(contractId));
                dispatch(assignPlayerMode("ORGANIZER"));
                setGameMode("joinGame");
              } else if (player2 === userId) {
                dispatch(assignPlayerMode("OPPONENT"));
                dispatch(assignContId(contractId));
                setGameMode("joinGame");
              } else {
                window.alert("YOUR ARE NOT A PARTICIPANT OF THIS GAME.")
              }
            } catch (e) {
              toast.error("INVALID ETHEREUM ID")
            }
          }}
        >
          Join existing game
        </button>
        <p className={"warning_remember"}>
          * Remember the Contract ID created.
        </p>
        <p className={"warning_remember"}>
          Both players will require it to login back into the game.
        </p>
      </div>
    </div>
  );
};

export default OpeningModal;
