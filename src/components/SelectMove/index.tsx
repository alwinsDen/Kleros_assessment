import React from "react"
import "./index.scss"
const SelectMove=()=>{
    let listNames = [
        {name: "Rock", icon:"🪨"},
        {name: "Paper", icon:"📄"},
        {name: "Scissors", icon:"✂️"},
        {name: "Spock", icon:"🖖"},
        {name: "Lizard", icon:"🦎"},
    ]
    return <div className={"selectmove"}>
        {
            listNames.map((vls)=> {
                return <button className={"indi-select"}>
                    <p className={"logo"}>{vls.icon}</p>
                    <p>{vls.name}</p>
                </button>
            })
        }
    </div>
}
export default SelectMove;
