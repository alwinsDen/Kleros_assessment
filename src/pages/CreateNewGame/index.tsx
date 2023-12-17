import { useState } from "react";
import SelectMove from "../../components/SelectMove";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Web3 } from "web3";
import contractInfo from "../../compiled_contract/RPS.json";
import { assignContId } from "../../redux/saveContractDetails";
import ClockTimer from "../../components/ClockTimer";

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
        gas: "1000000",
      });
    } catch (e: any) {
      console.log("Error from J2 timeout", e.message);
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
            contract
              .deploy({
                data: contractInfo.bytecode,
                arguments: [generateHash, e.target.player2.value],
              })
              .send({
                from: userId,
                value: Web3.utils.toWei(e.target.ethamount.value, "ether"),
                gas: "1000000",
              })
              .on("error", (error: any) => {
                console.error("Error deploying contract:", error);
              })
              .then((newContractInstance: any) => {
                dispatch(assignContId(newContractInstance.options.address));
                console.log(
                  "Deployed Contract Address:",
                  newContractInstance.options.address,
                );
              });
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
              placeholder={"ETH"}
              required={true}
              type={"number"}
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
            &nbsp; &nbsp; &nbsp;
            <p style={{ background: "black", color: "white" }}>Secret salt: </p>
            <input required={true} autoComplete="off" name={"secretsalt"} />
          </div>
          <button
            className={"startGameButton"}
            type={"submit"}
            disabled={contractId !== null}
          >
            {contractId !== null ? "Player 2 move now" : "Start Game"}
          </button>
        </div>
      </form>
      {contractId && (
        <div className={"clickableFunctionsDiv"}>
          <button className={"clickableFunctions"} onClick={j2Timeout}>
            Timeout Player 2{" "}
          </button>
          <button className={"clickableFunctions"} onClick={j2Timeout}>
            Reveal move{" "}
          </button>
        </div>
      )}
    </div>
  );
};
export default CreateNewGame;
