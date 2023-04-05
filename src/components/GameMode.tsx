import "./GameMode.css";

export enum GameMode {
    PRECISION_SHOT = "Precision Shot",
    QUICK_DRAW = "Quick Draw"
}

interface GameModeProps {
    gameMode: string;
    changeGameMode: (gameMode: GameMode) => void;
}

export function GameModeComponent(props: GameModeProps): JSX.Element {

    // Each label needs to be in a div to align the radio buttons vertically
    return <>
        <strong>Game Mode</strong>
        <div className="form-check">
            <label>
                { GameMode.PRECISION_SHOT }
                <input
                    data-testid="radio-precision-shot"
                    className="radio-button"
                    type="radio"
                    checked={props.gameMode === GameMode.PRECISION_SHOT}
                    onChange={() => { props.changeGameMode(GameMode.PRECISION_SHOT) }}
                />
            </label>
        </div>
        <div className="form-check">
            <label>
                { GameMode.QUICK_DRAW }
                <input
                    data-testid="radio-quick-draw"
                    className="radio-button"
                    type="radio"
                    checked={props.gameMode === GameMode.QUICK_DRAW}
                    onChange={() => { props.changeGameMode(GameMode.QUICK_DRAW) }}
                />
            </label>
        </div>
    </>;
}