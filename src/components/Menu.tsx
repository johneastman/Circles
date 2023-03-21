import "./Menu.css";

interface MenuProps {
    score: number;
    isGamePaused: boolean;
    numCircles: number;
    resetGame: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Menu(props: MenuProps): JSX.Element {
    return (
        <div className="menu">
            <ul>
                <li>Score: { props.score }</li>
                <li><button className="button" onClick={props.resetGame}>(R) { props.numCircles === 0 ? "Play Again" : "Reset Game" }</button></li>
            </ul>
        </div>
    );
}