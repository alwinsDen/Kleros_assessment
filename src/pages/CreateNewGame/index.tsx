import react, {useState} from "react"
import SelectMove from "../../components/SelectMove";
import "./index.scss"
const CreateNewGame = () => {
    //states
    const [optionState, setOptionState] = useState(1)
    return <form className={"createNewGame"}>
        <div className={"createNewGame-centerComp"}>
            <div className={"player2Key"}>
                <p>Player 2 Public key:</p>
                <input placeholder={"e.g. 0x2293E084Ce76BD9F3345345K"} required={true}/>
            </div>
            <SelectMove optionState={optionState} setOptionState={setOptionState}/>
            <div className={"player2Key"}>
                <p>Stake ETH Amount: </p>
                <input placeholder={"ETH"} required={true} type={"number"}/>
            </div>
            <div className={"player2Key"}>
                <p>Selected Option: </p>
                <input style={{width:"20px"}} disabled={true} required={true} value={optionState}/>
                &nbsp;
                &nbsp;
                &nbsp;
                <p>Secret salt: </p>
                <input type={"password"} required={true}/>
            </div>
            <button className={"startGameButton"} type={"submit"}>
                Start Game
            </button>
        </div>
    </form>
}
export default CreateNewGame
