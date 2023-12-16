import React, {useEffect, useState} from "react"
import OpeningModal from "../../components/OpeningModal";
import {useDispatch, useSelector} from "react-redux";
import {assignContId, assignWeb3Instance} from "../../redux/saveContractDetails";
import {Web3} from "web3";
import DisplayInstanceId from "../../components/DisplayInstanceId";
import CreateNewGame from "../CreateNewGame";

const ChooseStratergy = () => {

    //states
    const [gameMode, setGameMode] = useState<string | null>(null)

    //import redux state
    const dispatch = useDispatch()

    //call the initializer function
    const ethCompatCheck = async () => {
        if (window.ethereum) {
            let web3 = new Web3(window.ethereum)
            await window.ethereum.request({method: 'eth_requestAccounts'})
            dispatch(assignWeb3Instance(web3))
        } else {
            window.alert("No ethereum wallet detected. Please install metamask.")
        }
    }

    useEffect(() => {
        ethCompatCheck()
    }, [])
    return <>
        <DisplayInstanceId/>
        {gameMode == null && <OpeningModal setGameMode={setGameMode}/>}
        {gameMode == "createNew" && <CreateNewGame/>}
    </>
}

export default ChooseStratergy;
