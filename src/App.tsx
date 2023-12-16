import React, {useEffect, useState} from 'react';
import {Web3} from "web3";
import logo from './logo.svg';
import './App.css';
//access the abi and bytecode
import contractD from "./compiled_contract/RPS.json"
function App() {
  const [savedWeb3, setSavedWeb3] = useState<Web3 | null>()
  const [contractID, setContractID] = useState("")
  //request metaMask access
  let metaMeet=async ()=>{
    if (window.ethereum){
      let web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setSavedWeb3(web3)
    } else {
      window.alert("Please install MetaMask wallet.")
    }
  }

  //get player 1
  async function Getj1(){
    if (savedWeb3!==null){
      const c_address = contractID
      //find the contract
      // @ts-ignore
      const contract = new savedWeb3.eth.Contract(contractD.abi,c_address)
      try {
        const j1Address = await contract.methods.j1().call();
        console.log("Player J1's address:", j1Address);
      } catch (error) {
        console.error('Error calling j1 function:', error);
      }
    }
  }

  async function Getj2(){
    if (savedWeb3!==null){
      const c_address = contractID
      //find the contract
      // @ts-ignore
      const contract = new savedWeb3.eth.Contract(contractD.abi,c_address)
      try {
        const j1Address = await contract.methods.j2().call();
        console.log("Player J2's address:", j1Address);
      } catch (error) {
        console.error('Error calling j1 function:', error);
      }
    }
  }

  useEffect(()=>{
    metaMeet()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={async ()=>{
          let accountDetails = await savedWeb3?.eth.getAccounts()
          if (savedWeb3!=null) {
            let contract = new savedWeb3.eth.Contract(contractD.abi)
            let player2_acc = "0x2293E084Ce76BD9F359BA606F33CFf48E8bb0521"
            let generatedHash = Web3.utils.soliditySha3({type: 'uint8', value: 4}, {type: 'uint256', value: 1234});
            if (generatedHash!==undefined) {
              console.log(generatedHash, player2_acc)
              contract.deploy({
                data: contractD.bytecode,
                // @ts-ignore
                arguments: [generatedHash, player2_acc],
              })
              .send({
                // @ts-ignore
                from: accountDetails[0],
                value: "10",
                gas: '1000000',
              })
              .on('error', (error) => {
                console.error("Error deploying contract:", error);
              })
              .on('transactionHash', (transactionHash) => {
                console.log("Contract deployment transaction hash:", transactionHash);
              })
              .on('receipt', (receipt) => {
                console.log("Contract deployment receipt:", receipt);
              })
              .then((newContractInstance) => {
                setContractID(newContractInstance.options.address ? newContractInstance.options.address : "")
                console.log("Deployed Contract Address:", newContractInstance.options.address);
              });
            }
          }
        }}>
          Click here to link me!
        </button>
        <button onClick={Getj1}>
          Get Player 1
        </button>
        <button onClick={Getj2}>
          Get Player 2
        </button>
      </header>
    </div>
  );
}

export default App;
