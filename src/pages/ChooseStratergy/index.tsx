import React, { useEffect, useState } from "react";
import OpeningModal from "../../components/OpeningModal";
import { useDispatch } from "react-redux";
import { assignWeb3Instance } from "../../redux/saveContractDetails";
import { Web3 } from "web3";
import DisplayInstanceId from "../../components/DisplayInstanceId";
import CreateNewGame from "../CreateNewGame";
import JoinExisitngGame from "../JoinExistingGame";
import GlobalLoader from "../../components/GlobalLoader";

const ChooseStratergy = () => {
  //states
  const [gameMode, setGameMode] = useState<string | null>(null);
  const [playerMode, setPlayerMode] = useState("mode");
  //import redux state
  const dispatch = useDispatch();

  //call the initializer function
  const ethCompatCheck = async () => {
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      dispatch(assignWeb3Instance(web3));
    } else {
      window.alert("No ethereum wallet detected. Please install metamask.");
    }
  };

  useEffect(() => {
    ethCompatCheck();
  }, []);
  return (
    <>
      <DisplayInstanceId />
      <GlobalLoader />
      {gameMode == null && <OpeningModal setGameMode={setGameMode} />}
      {gameMode == "createNew" && <CreateNewGame />}
      {gameMode == "joinGame" && <JoinExisitngGame />}
    </>
  );
};

export default ChooseStratergy;
