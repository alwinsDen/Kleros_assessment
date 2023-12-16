import React from "react"
import "./index.scss"

const OpeningModal = () => {
    return <div className={"opening-modal"}>
        <div className={"join"}>
            <button className={"join-new"} onClick={SetupNewGame}>
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
const SetupNewGame = () => {

}

export default OpeningModal
