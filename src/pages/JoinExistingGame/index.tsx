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

  const playerMode = useSelector(
    (state: any) => state.saveContractDetails.playerMode,
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
      });
    } catch (e: any) {
      console.log("Error from J2 timeout", e.message);
    }
  };

  const j2Timeout = async () => {
    const contract = new web3Instance.eth.Contract(
      contractInfo.abi,
      contractId,
    );
    try {
      await contract.methods.j2Timeout().send({
        from: userId,
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
            });
          } catch (e) {}
        }}
      >
        <div className={"createNewGame-centerComp"}>
          <ClockTimer />
          <div className={"player2Key"}>
            <p>Player 2 public key:</p>
            <input
              placeholder={"e.g. 0x2293E084Ce76BD9F3345345K"}
              required={true}
              name={"player2"}
              disabled={true}
              value={gameDetailsState.player}
            />
          </div>
          {playerMode !== "ORGANIZER" && (
            <SelectMove
              optionState={optionState}
              setOptionState={setOptionState}
            />
          )}
          {playerMode !== "ORGANIZER" && (
            <div className={"player2Key"}>
              <p>Stake ETH Amount:[Set by Player 1] </p>
              <input
                placeholder={"ETH"}
                required={true}
                type={"number"}
                value={Web3.utils.fromWei(gameDetailsState.stake, "ether")}
                name={"ethamount"}
                step="0.0001"
              />
            </div>
          )}
          {playerMode !== "ORGANIZER" && (
            <div className={"player2Key"}>
              <p>Selected Move: </p>
              <input
                style={{ width: "20px" }}
                disabled={true}
                required={true}
                value={optionState}
              />
            </div>
          )}
          {playerMode !== "ORGANIZER" && deterMineMove == 2 && (
            <button className={"startGameButton"} type={"submit"}>
              Your Move
            </button>
          )}
        </div>
      </form>
      {contractId && playerMode !== "ORGANIZER" && (
        <div className={"clickableFunctionsDiv"}>
          <button className={"clickableFunctions"} onClick={j1Timeout}>
            Timeout Player 1{" "}
          </button>
        </div>
      )}
      {contractId && playerMode === "ORGANIZER" && (
        <div className={"clickableFunctionsDiv"}>
          <button className={"clickableFunctions"} onClick={j2Timeout}>
            Timeout Player 2{" "}
          </button>
          <form
            className={"revealForm"}
            onSubmit={async (e: any) => {
              e.preventDefault();
              if (e.target.move.value && e.target.salt.value) {
                let contract = new web3Instance.eth.Contract(
                  contractInfo.abi,
                  contractId,
                );
                try {
                  await contract.methods
                    .solve(
                      Number(e.target.move.value),
                      Number(e.target.salt.value),
                    )
                    .send({
                      from: userId,
                    });
                } catch (e: any) {
                  console.log(e.message);
                }
              }
            }}
          >
            <input placeholder={"Your Move"} required={true} name={"move"} />
            <input placeholder={"Your Salt"} required={true} name={"salt"} />
            <button className={"clickableFunctions"} type={"submit"}>
              Reveal move{" "}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default JoinExisitngGame;
