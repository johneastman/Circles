import "./GameMode.css";

interface GameModeProps {
    gameMode: string;
    changeGameMode: (gameMode: string) => void;
}

export function GameMode(props: GameModeProps): JSX.Element {

    // Each label needs to be in a div to align the radio buttons vertically
    return <>
        <strong>Game Mode</strong>
        <div className="form-check">
            <label>
                Precision Shot
                <input
                    data-testid="radio-precision-shot"
                    className="radio-button"
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
                    data-testid="radio-quick-draw"
                    className="radio-button"
                    type="radio"
                    checked={props.gameMode === "quick-draw"}
                    onChange={() => { props.changeGameMode("quick-draw") }}
                />
            </label>
        </div>
    </>;
}