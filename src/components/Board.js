import React, {useState, useEffect} from "react";
import "../style/Board.css"
import Cell from "./Cell";
import Endscreen from "./Endscreen";

export default function Board(props) {

    const [uncovered, setUncovered] = useState(0)
    const [exploded, setExploded] = useState(false)
    const [numMarked, setNumMarked] = useState(0)
    const [numMines, setNumMines] = useState(props.boardDifficulty.mines)
    const [board, setBoard] = useState([])
    const [done, setDone] = useState(false)

    const numRows = props.boardDifficulty.rows
    const numCols = props.boardDifficulty.columns

    const createBoard = () => {
        let temp_board = []
        for (let i=0; i<numRows; i++) {
            let cell_row = []
            for (let j=0; j<numCols; j++) {
                cell_row.push({
                    row: i,
                    column: j,
                    mine: false,
                    state: "hidden",
                    count: 0
                })
            }
            temp_board.push(cell_row)
        }
        return temp_board
    }

    const countFunc = (row, column) => {
        const c = (r,c) => (validCoord(r,c) && board[r][c].mine ? 1 : 0)
        let res = 0
        for (let dr=-1; dr <= 1; dr++) {
            for (let dc=-1; dc <= 1; dc++) {
                res += c(row+dr, column+dc)
            }
        }
        return res
    }

    const rndInt = (min, max) => {
        [min,max] = [Math.ceil(min), Math.floor(max)]
        return  min + Math.floor(Math.random() * (max - min + 1))
    }

    const sprinkleMines = (row, column) => {
        let temp_board = board
        props.paused(false)
        let allowed = []
        for (let r=0; r<numRows; r++) {
            for (let c=0; c<numCols; c++) {
                if (Math.abs(row-r) > 2 || Math.abs(column-c) > 2) {
                    allowed.push([r,c])
                }
            }
        }

        setNumMines(Math.min(numMines, allowed.length))

        for (let i=0; i<numMines; i++) {
            let j = rndInt(i, allowed.length-1);
            [allowed[i], allowed[j]] = [allowed[j], allowed[i]]
            let [r,c] = allowed[i];
            temp_board[r][c].mine = true
        }

        for (let r=0; r<numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                if (temp_board[r][c].state === "marked") {
                    temp_board[r][c].state = "hidden"
                }
                temp_board[r][c].count = countFunc(r, c)
            }
        }
        setBoard(temp_board)
    }

    const validCoord = (row, column) => {
        return row >=0 && row < numRows && column >= 0 && column < numCols
    }

    const uncover = (row, column) => {
        let temp_board = board

        if (uncovered === 0) {
            sprinkleMines(row, column)
        }

        if (temp_board[row][column].state !== "hidden") {return false}

        const ff = (r, c) => {
            if (!validCoord(r, c)) {return}
            if (temp_board[r][c].state !== "hidden") {return}
            temp_board[r][c].state = "shown"
            setUncovered((prevState) => (prevState + 1))
            if (temp_board[r][c].count !== 0) {return}
            ff(r-1, c-1);ff(r-1,c);ff(r-1,c+1)
            ff(r,c-1);ff(r,c+1);
            ff(r+1, c-1);ff(r+1,c);ff(r+1,c+1)
        }
        ff(row, column)

        if (temp_board[row][column].mine) {
            setExploded(true)
        }
        setBoard(temp_board)
        return true
    }

    const mark = (row, column) => {
        let temp_board = board
        if (!validCoord(row, column)) {return false}
        if (temp_board[row][column].state === "shown") {return false}
        if (temp_board[row][column].state === "marked") {
            setNumMarked(prevState => (prevState-1))
        } else {
            setNumMarked(prevState => (prevState+1))
        }
        temp_board[row][column].state = temp_board[row][column].state === "marked" ? "hidden" : "marked"
        setBoard(temp_board)
        return true
    }

    useEffect(() => {
        props.setMarked(numMines-numMarked)
    },[numMarked])

    useEffect(() => {
        const status = exploded || uncovered === numRows * numCols - numMines
        if (status) {
            props.paused(true)
            setDone(status)
        }
    })

    useEffect(() => {
        if (exploded === true) {
            let temp_board = board
            for (let row=0; row < numRows; row++) {
                for (let col=0; col < numCols; col++) {
                    if (temp_board[row][col].mine === true) {
                        temp_board[row][col].state = "shown"
                    }
                }
            }
            setBoard(temp_board)
        }
    }, [exploded])

    useEffect(() => {
        setUncovered(0)
        setExploded(false)
        setNumMarked(0)
        setNumMines(props.boardDifficulty.mines)
        setBoard(createBoard())
        setDone(false)
    }, [props.gameNum])


    return(
        <div className={"board"}>
            {board.map(row =>
                <div className={"row"}>
                    {row.map(cell =>
                        <Cell cellData={cell} leftClick={uncover} rightClick={mark} difficulty={props.boardDifficulty.type}/>
                    )}
                </div>
            )}
            <Endscreen gameEnded={done} exploded={exploded} changeSize={props.changeSize}/>
        </div>
    )
}
