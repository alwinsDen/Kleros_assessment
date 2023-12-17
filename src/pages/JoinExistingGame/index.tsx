import { useEffect, useState } from "react";
import SelectMove from "../../components/SelectMove";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Web3 } from "web3";
import contractInfo from "../../compiled_contract/RPS.json";
import ClockTimer from "../../components/ClockTimer";

const JoinExisitngGame = () => {
  //states
  const [optionState, setOptionState] = useState(1);
  const [gameDetailsState, setGameDetailsState] = useState({
    player: "",
    stake: "",
  });

  //redux
  const dispatch = useDispatch();

  //contract details
  const userId = useSelector(
    (state: any) => state.saveContractDetails.accountId,
  );
  const web3Instance = useSelector(
    (state: any) => state.saveContractDetails.web3Instance,
  );
  const contractId = useSelector(
    (state: any) => state.saveContractDetails.contractId,
  );

  const deterMineMove = useSelector(
    (state: any) => state.saveContractDetails.deterMineMove,
  );

  //timeout player 2
  const j1Timeout = async () => {
    const contract = new web3Instance.eth.Contract(
      contractInfo.abi,
      contractId,
    );
    try {
      await contract.methods.j1Timeout().send({
        from: userId,
        gas: "1000000",
      });
    } catch (e: any) {
      console.log("Error from J2 timeout", e.message);
    }
  };

  const gameDetails = async () => {
    const contract = new web3Instance.eth.Contract(
      contractInfo.abi,
      contractId,
    );
    try {
      const j2Address = await contract.methods.j2().call();
      setGameDetailsState((state) => {
        return { ...state, player: j2Address };
      });
    } catch (error) {
      console.error("Error calling j1 function:", error);
    }

    try {
      const stake = await contract.methods.stake().call();
      setGameDetailsState((state) => {
        return { ...state, stake: stake };
      });
    } catch (error) {
      console.error("Error calling Stake:", error);
    }
  };

  //useEffect to fetch past details
  useEffect(() => {
    gameDetails();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        className={"createNewGame"}
        autoComplete="off"
        onSubmit={async (e: any) => {
          e.preventDefault();
          let contract = new web3Instance.eth.Contract(
            contractInfo.abi,
            contractId,
          );
          try {
            await contract.methods.play(Number(optionState)).send({
              from: userId,
              value: gameDetailsState.stake,
              gas: "100000",
            });
          } catch (e) {}
        }}
      >
        <div className={"createNewGame-centerComp"}>
          <ClockTimer />
          <div className={"player2Key"}>
            <p>Your Public key:</p>
            <input
              placeholder={"e.g. 0x2293E084Ce76BD9F3345345K"}
              required={true}
              name={"player2"}
              disabled={true}
              value={gameDetailsState.player}
            />
          </div>
          <SelectMove
            optionState={optionState}
            setOptionState={setOptionState}
          />
          <div className={"player2Key"}>
            <p>Stake ETH Amount:[Set by Player 1] </p>
            <input
              placeholder={"ETH"}
              required={true}
              type={"number"}
              value={Web3.utils.fromWei(gameDetailsState.stake, "ether")}
              name={"ethamount"}
            />
          </div>
          <div className={"player2Key"}>
            <p>Selected Option: </p>
            <input
              style={{ width: "20px" }}
              disabled={true}
              required={true}
              value={optionState}
            />
          </div>
          {deterMineMove == 2 && (
            <button className={"startGameButton"} type={"submit"}>
              Your Move
            </button>
          )}
        </div>
      </form>
      {contractId && (
        <div className={"clickableFunctionsDiv"}>
          <button className={"clickableFunctions"} onClick={j1Timeout}>
            Timeout Player 1{" "}
          </button>
        </div>
      )}
    </div>
  );
};
export default JoinExisitngGame;