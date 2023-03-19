import "./Menu.css";

interface MenuProps {
    score: number;
    isGamePaused: boolean;
    numCircles: number;
    resetGame: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    pauseGame: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Menu(props: MenuProps): JSX.Element {
    return (
        <div className="menu">
            <ul>
                <li>Score: { props.score }</li>
                <li><button className="button" onClick={props.resetGame}>(R) { props.numCircles === 0 ? "Play Again" : "Reset Game" }</button></li>
                <li>
                    <button
                        className="button"
                        /*
                        The play/pause button needs to be disabled when the end-game state is reached because if
                        the user clicks play, the game will immediately unpause, but because there are no objects
                        in "this.state.circles", the game will immediately pause again and continually add the same
                        score to the high-score component.

                        If the player wants to play another round, they'll have to click "Reset Game".
                        */
                        disabled={props.numCircles === 0}
                        onClick={props.pauseGame}>(P) {props.isGamePaused ? "Play" : "Pause"}
                    </button>
                </li>
            </ul>
        </div>
    );
}