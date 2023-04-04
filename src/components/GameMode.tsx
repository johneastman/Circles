import "./GameMode.css";

interface GameModeProps {
    gameMode: string;
    changeGameMode: (gameMode: string) => void;
}

export function GameMode(props: GameModeProps): JSX.Element {
    return <>
        <strong>Game Mode</strong>
        <div className="form-check">
            <label>
                Precision Shot
                <input
                    type="radio"
                    checked={props.gameMode === "precision-shot"}
                    onChange={() => { props.changeGameMode("precision-shot") }}
                />
            </label>
        </div>
        <div className="form-check">
            <label>
                Quick Draw
                <input
                    type="radio"
                    checked={props.gameMode === "quick-draw"}
                    onChange={() => { props.changeGameMode("quick-draw") }}
                />
            </label>
        </div>
    </>;
}