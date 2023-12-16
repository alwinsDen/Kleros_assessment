import React, {Dispatch, SetStateAction} from "react"
import "./index.scss"

const SelectMove = ({setOptionState, optionState}: {
    setOptionState: Dispatch<SetStateAction<number>>,
    optionState: number
}) => {
    let listNames = [
        {name: "Rock", icon: "🪨"},
        {name: "Paper", icon: "📄"},
        {name: "Scissors", icon: "✂️"},
        {name: "Spock", icon: "🖖"},
        {name: "Lizard", icon: "🦎"},
    ]
    return <div className={"selectmove"}>
        {
            listNames.map((vls, index) => {
                return <button className={"indi-select"} type={"button"} onClick={() => {
                    setOptionState(index + 1)
                }}
                               style={{
                                   background: optionState === index + 1 ? "skyblue" : ""
                               }}
                >
                    <p className={"logo"}>{vls.icon}</p>
                    <p>{vls.name}</p>
                </button>
            })
        }
    </div>
}
export default SelectMove;
