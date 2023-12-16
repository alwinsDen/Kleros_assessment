import React, {Dispatch, SetStateAction} from "react"
import "./index.scss"
import {useSelector} from "react-redux";
import {Web3} from "web3";

//import contract details
import contractInfo from "../../compiled_contract/RPS.json"

const OpeningModal = ({setGameMode}:{setGameMode:Dispatch<SetStateAction<string | null>>}) => {

    //current user id from redux
    const userId = useSelector((state: any) => state.saveContractDetails.accountId);
    const web3Instance = useSelector((state: any) => state.saveContractDetails.web3Instance)

    return <div className={"opening-modal"}>
        <div className={"join"}>
            <button className={"join-new"} onClick={() => setGameMode("createNew")}>
                Start a new game
            </button>
            <div className={"spacer"}>
                <div className={"hline"}></div>
                <p>or</p>
                <div className={"hline"}></div>
            </div>
            <button className={"join-existing"}>
                Join exiting game
            </button>
        </div>
    </div>
}

//setup a new game
const SetupNewGame = (userId: string, web3Instance: any) => {
    // const move = 4
    // const secret = 1234
    // const player2 = "0x2293E084Ce76BD9F359BA606F33CFf48E8bb0521"
    //
    // let generateHash = Web3.utils.soliditySha3({type: 'uint8', value: Number(move)}, {
    //     type: 'uint256',
    //     value: Number(secret)
    // })
    // let contract = new web3Instance.eth.Contract(contractInfo.abi)
    //
    // //now we deploy the contract
    // if (generateHash !== undefined) {
    //     contract.deploy({
    //         data: contractInfo.bytecode,
    //         arguments: [generateHash, player2]
    //     })
    //         .send({
    //             from: userId,
    //             value: Web3.utils.toWei('10', 'ether'),
    //             gas: '1000000',
    //         })
    //         .on('error', (error: any) => {
    //             console.error("Error deploying contract:", error);
    //         })
    //         .then((newContractInstance: { options: { address: any; }; }) => {
    //             console.log("Deployed Contract Address:", newContractInstance.options.address);
    //         });
    // }
}

export default OpeningModal
