import { useState, useEffect } from "react";
import "./Stopwatch.css";

export function Stopwatch(): JSX.Element {

    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timer>();

    useEffect(() => {
        if (running) {
            let interval = setInterval(() => {
                setTime((prevTime: number) => prevTime + 10);
            }, 10);
            setTimer(interval);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [running]);

    return <>
        <div className="numbers">
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <button onClick={() => { setRunning(!running) }}>{ !running ? "Start" : "Stop"}</button>
        <button onClick={ () => { setRunning(false); setTime(0); } }>Reset</button>
    </>
}
