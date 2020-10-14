import React, {useState, useEffect} from "react";
import "../style/Endscreen.css"
import Button from "./Button";

export default function Endscreen (props) {
    const [ended, setEnded] = useState(props.gameEnded)
    const [message, setMessage] = useState("YOU WON")

    const handleClick = (level) => {
        setEnded(false)
        props.changeSize(level)
    }

    const displayEndScreen = () => {
        if (ended) {
            return(
                <div className={"endscreen"}>
                    <p className={"title"}>{message}</p>
                    <p>Try Again?</p>
                    <div className={"button-div"}>
                        <Button level={"Easy"} active={false} clicked={handleClick}/>
                        <Button level={"Hard"} active={false} clicked={handleClick}/>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
      setEnded(props.gameEnded)
    }, [props.gameEnded])

    useEffect(() => {
        if (props.exploded) {
            setMessage("YOU LOST")
        } else {
            setMessage("YOU WON")
        }
    }, [props.exploded])

    return (
        <div>
            {displayEndScreen()}
        </div>
    )
}
