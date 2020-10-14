import React, { useState, useEffect } from 'react';
import "../style/Timer.css"

export default function Timer(props) {
    const [time, setTime] = useState(0)

    useEffect(() => {
            const intervalId = setInterval(() => {
                setTime((prevState) => prevState + 1)
            }, 1000)

            return () => {
                clearInterval(intervalId)
            }
    }, [])

    useEffect(() => {
        props.freezeTime(time)
    }, [time])

    useEffect(() => {
        setTime(0)
    }, [props.gameNum])

    return (
        <div>
            <p>{time}</p>
        </div>
    )
}

