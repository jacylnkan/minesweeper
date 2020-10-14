import React, {useState, useEffect} from "react";
import "../style/Navbar.css"
import Button from "./Button";
import FlagsRemaining from "./FlagsRemaining";
import Timer from "./Timer";

export default function NavBar(props) {

    const [buttonStates, setButtonStates] = useState({
        easy: true,
        hard: false
    })

    const [frozenTime, setFrozenTime] = useState(0)
    const numFlagged = props.numFlagged

    const toggleLevel = () => {
        setButtonStates(prevState => ({
            easy: !prevState.easy,
            hard: !prevState.hard
        }))
    }

    const handleButtonClick = (level) => {
        props.changeSize(level)
    }

    const freezeTime = (time) => {
        setFrozenTime(time)
    }

    const startTimer = () => {
        if (props.paused) {
            return <p className={"inline-num"}>{frozenTime}</p>
        } else {
            return <Timer gameNum={props.gameNum} paused={props.paused} freezeTime={freezeTime}/>
        }
    }

    useEffect(() => {
        if (props.gameNum !== 0) {
            toggleLevel()
            setFrozenTime(0)
        }
    }, [props.gameNum])

    return(
        <div className={"navbar-div"}>
            <div className={"container"}>
                <div className={"timer-div"}>
                    <img className={"timer"} src={require("../assets/black-timer.png")} alt={"timer"}/>
                    {startTimer()}
                </div>
                <FlagsRemaining numFlagged={numFlagged}/>
            </div>

            <div className={"title-div"}>
                <p>MINESWEEPER</p>
            </div>

            <form className={"button-form"}>
                <Button level={"Easy"} active={buttonStates.easy} clicked={handleButtonClick}/>
                <Button level={"Hard"} active={buttonStates.hard} clicked={handleButtonClick}/>
            </form>
        </div>
    )
}


