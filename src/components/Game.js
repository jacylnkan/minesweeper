import React, {useEffect, useState} from "react";
import "../style/Game.css"
import NavBar from "./NavBar";
import Board from "./Board";

export default function Game() {
    const easy = {
        type: "easy",
        rows: 10,
        columns: 10,
        mines: 10
    }
    const hard = {
        type: "hard",
        rows: 16,
        columns: 16,
        mines: 40
    }

    const [difficulty, setDifficulty] = useState(easy)
    const [numFlagged, setNumFlagged] = useState(difficulty.mines)
    const [gameNum, setGameNum] = useState(0)
    const [paused, setPaused] = useState(true)

    const handleSizeChange = (level) => {
        if (level === "easy") {
            setDifficulty(easy)
        } else {
            setDifficulty(hard)
        }
        setPaused(true)
        setGameNum(prevState => prevState + 1)
    }

    const marked = (num) => {
        setNumFlagged(num)
    }

    const pausedFunc = (isPaused) => {
        setPaused(isPaused)
    }

    useEffect(() => {
        setNumFlagged(difficulty.mines)
    }, [difficulty])

    return(
        <div className={"game-div"}>
            <NavBar changeSize={handleSizeChange} numFlagged={numFlagged} gameNum={gameNum} paused={paused}/>
            <div className={"board-div"}>
                <Board boardDifficulty={difficulty} setMarked={marked} changeSize={handleSizeChange} gameNum={gameNum} paused={pausedFunc}/>
            </div>
        </div>
    )
}
