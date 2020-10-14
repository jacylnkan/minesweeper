import React from "react";
import "../style/FlagsRemaining.css"

export default function FlagsRemaining(props) {

    const numFlagged = props.numFlagged

    return (
        <div className={"flags-remaining-div"}>
            <img className={"flag-img"} src={require("../assets/flag.png")} alt={"flag"}/>
            <p>{numFlagged}</p>
        </div>
    )
}
