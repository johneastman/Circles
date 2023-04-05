import { useState, useEffect } from "react";
import "./Stopwatch.css";
import { GameMode } from "./GameMode";
import { getScore } from "../utils/util";

interface StopwatchProps {
    isRunning: boolean;
    time: number;
    updateScore: (score: number, gameMode: GameMode) => void;
}

export function Stopwatch(props: StopwatchProps): JSX.Element {

    const [timer, setTimer] = useState<NodeJS.Timer>();
    let isRunning: boolean = props.isRunning;

    useEffect(() => {
        if (isRunning) {
            let interval = setInterval(() => {
                props.updateScore(props.time + 10, GameMode.QUICK_DRAW);
            }, 10);
            setTimer(interval);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    // Adding recommended values to this list causes significant performance issues.
    // eslint-disable-next-line
    }, [isRunning]);

    return <>{getScore(props.time, GameMode.QUICK_DRAW)}</>
}
