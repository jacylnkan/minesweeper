import React from "react";
import "../style/Button.css"

export default function Button(props) {
    const level = props.level
    const active = props.active

    const setColor = () => {
        if (active) {
            return {backgroundColor: "var(--dark_purple)"}
        } else {
            return {backgroundColor: "var(--black)"}
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (!active) {
            setColor(active)
            props.clicked(level.toLowerCase())
        }
    }

    return (
        <div>
            <button className={"level-button"} style={setColor(active)} value={level.toLowerCase()} onClick={handleClick}>
                {level}
            </button>
        </div>
    )
}
