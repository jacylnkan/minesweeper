import React, {useState, useEffect} from "react";
import "../style/Cell.css"

export default function Cell(props) {
    const location = {
        row: props.cellData.row,
        column: props.cellData.column
    }
    const state = props.cellData.state
    const mine = props.cellData.mine
    const count = props.cellData.count

    const [sizeClass, setSizeClass] = useState(props.difficulty)

    const handleLeftClick= () => {
        props.leftClick(location.row, location.column)
    }

    const handleRightClick = (e) => {
        e.preventDefault()
        props.rightClick(location.row, location.column)

    }

    const showCells = () => {
        if (state === "hidden") {
            return <div className={"cell hidden " + sizeClass} onClick={handleLeftClick} onContextMenu={handleRightClick}/>
        }
        else if (state === "shown") {
            if (count === 0) {
                return <div className={"cell shown-zero " + sizeClass}/>
            }
            else if (mine === true) {
                return (
                    <div className={"cell bomb " + sizeClass}>
                        <img className={"image"} src={require("../assets/bomb.png")} alt={"mine"}/>
                    </div>
                )
            }
            else { // count != 0 and not mine
                return (
                    <div className={"cell shown-number " + sizeClass}>
                        <p>{count}</p>
                    </div>
                )
            }
        }
        else if (state === "marked") {
            return (
                <div className={"cell hidden " + sizeClass} onContextMenu={handleRightClick}>
                    <img className={"image"} src={require("../assets/flag.png")} alt={"flag"}/>
                </div>
            )
        }
    }

    useEffect(() => {
        setSizeClass(props.difficulty)
    }, [props.difficulty])

    return (
        <div>
            {showCells()}
        </div>
    )
}
