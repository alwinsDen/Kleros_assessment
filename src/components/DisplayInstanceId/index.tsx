import React, {useEffect, useState} from "react"
import "./index.scss"
import {useSelector} from "react-redux";
const DisplayInstanceId =()=> {
    //states
    const [accId, setAccId] = useState(null)
    // @ts-ignore
    const web3Instance = useSelector(state=>state.saveContractDetails.web3Instance)
    const setupAcc = async () => {
        let accIdd = await web3Instance.eth.getAccounts()
        setAccId(accIdd[0])
    }
    useEffect(() => {
        if (web3Instance) {
            setupAcc()
        }
    }, [web3Instance]);
    return <div className={"display-instance"}>{
        web3Instance!==null ? accId : 'Connect to metamask'
    }</div>
}
export default DisplayInstanceId;
