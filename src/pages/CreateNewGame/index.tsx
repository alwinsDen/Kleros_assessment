import { useState } from "react";
import SelectMove from "../../components/SelectMove";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Web3 } from "web3";
import contractInfo from "../../compiled_contract/RPS.json";
import { assignContId, setGloading } from "../../redux/saveContractDetails";
import ClockTimer from "../../components/ClockTimer";
import { toast } from "react-toastify";

const CreateNewGame = () => {
  //states
  const [optionState, setOptionState] = useState(1);

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

  //timeout player 2
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
      toast.error(e.message)
    }
  };
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
        onSubmit={(e: any) => {
          e.preventDefault();

          let generateHash = Web3.utils.soliditySha3(
            { type: "uint8", value: Number(optionState) },
            {
              type: "uint256",
              value: Number(e.target.secretsalt.value),
            },
          );
          let contract = new web3Instance.eth.Contract(contractInfo.abi);

          //now we deploy the contract
          if (generateHash !== undefined) {
            dispatch(setGloading(true));
            try {
              contract
                .deploy({
                  data: contractInfo.bytecode,
                  arguments: [generateHash, e.target.player2.value],
                })
                .send({
                  from: userId,
                  value: Web3.utils.toWei(e.target.ethamount.value, "ether"),
                })
                .on("error", (error: any) => {
                  dispatch(setGloading(false));
                  console.error("Error deploying contract:", error);
                })
                .then((newContractInstance: any) => {
                  dispatch(assignContId(newContractInstance.options.address));
                  console.log(
                    "Deployed Contract Address:",
                    newContractInstance.options.address,
                  );
                  dispatch(setGloading(false));
                });
            } catch (error : any) {
              dispatch(setGloading(false));
              toast.error(error.message)
            }
          }
        }}
      >
        <div className={"createNewGame-centerComp"}>
          <ClockTimer />
          <div className={"player2Key"}>
            <p>Player 2 Public key:</p>
            <input
              placeholder={"e.g. 0x2293E084Ce76BD9F3345345K"}
              required={true}
              name={"player2"}
            />
          </div>
          <SelectMove
            optionState={optionState}
            setOptionState={setOptionState}
          />
          <div className={"player2Key"}>
            <p>Stake ETH Amount: </p>
            <input
              placeholder={"Minimum 0.0001 ETH"}
              required={true}
              type={"number"}
              name={"ethamount"}
              step="0.0001"
            />
          </div>
          <div className={"player2Key"}>
            <p>Selected Move: </p>
            <input
              style={{ width: "20px" }}
              disabled={true}
              required={true}
              value={optionState}
            />
            &nbsp; &nbsp; &nbsp;
            <p style={{ background: "black", color: "white" }}>Secret salt: </p>
            <input
              required={true}
              autoComplete="off"
              name={"secretsalt"}
              placeholder={"Remember this!"}
              type={"number"}
            />
          </div>
          {contractId === null && (
            <button className={"startGameButton"} type={"submit"}>
              Start Game
            </button>
          )}
        </div>
      </form>
      {contractId && (
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
                } catch (error: any) {
                  toast.error(error.message)
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
export default CreateNewGame;
