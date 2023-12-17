import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import contractD from "../../compiled_contract/RPS.json";
import { assignMove } from "../../redux/saveContractDetails";

const ClockTimer = () => {
  //states
  const [prevTime, setPrevTime] = useState(null);

  //dispatch
  const dispatch = useDispatch();

  //contract states
  const contractId = useSelector(
    (state: any) => state.saveContractDetails.contractId,
  );
  const web3Instance = useSelector(
    (state: any) => state.saveContractDetails.web3Instance,
  );

  const deterMineMove = useSelector(
    (state: any) => state.saveContractDetails.deterMineMove,
  );

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timer | undefined;

    async function RunInstanceCount() {
      if (contractId) {
        const contract = new web3Instance.eth.Contract(
          contractD.abi,
          contractId,
        );
        const currentime = await contract.methods.lastAction().call();
        const player2State = await contract.methods.c2().call();
        if (Number(player2State) !== 0) {
          dispatch(assignMove(1));
        } else if (Number(player2State) === 0) {
          dispatch(assignMove(2));
        }
        setPrevTime(currentime);
      }
    }

    if (contractId) {
      RunInstanceCount();
      console.log(typeof deterMineMove);
      intervalId = setInterval(() => {
        if (deterMineMove !== 1) {
          RunInstanceCount();
        }
      }, 10000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [contractId]);
  if (contractId === null) {
    return null;
  }
  return (
    prevTime && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div style={{ fontSize: "1.3rem", fontWeight: 600, color:"red"}}>
          <p>
            {deterMineMove === 2
              ? "Player 2 remaining"
              : deterMineMove === 1
                ? <span style={{fontSize: "1.3rem", color:"darkcyan"}}>Player 1 has to reveal in</span>
                : ""}
          </p>
          {<Countdown date={Number(prevTime) * 1000 + 300000} />}
        </div>
        <div className={"contractDiv"}>
          <p style={{ textAlign: "right" }}>
            CONTRACT ID <span>[Remember This!! && share]</span>
          </p>
          <p>{contractId}</p>
        </div>
      </div>
    )
  );
};
export default ClockTimer;
