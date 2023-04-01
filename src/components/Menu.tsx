import "./Menu.css";

interface MenuProps {
    score: number;
    numCircles: number;
    resetGame: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    openDialog(): void;
}

export function Menu(props: MenuProps): JSX.Element {
    return <header>
        <div className="menu horizontalList">
            <h1>Circles</h1>
            <ul>
                <li><button className="menuButton" onClick={props.openDialog}>Clear All Data</button></li>
                <li>
                    <form action="https://github.com/johneastman/circles" method="get" target="_blank">
                        <button className="menuButton" type="submit">Source Code</button>
                    </form>
                </li>
            </ul>
        </div>

        <div className="horizontalList gameMenu">
            <ul>
                <li>Score: { props.score }</li>
                <li><button className="button" onClick={props.resetGame}>(R) { props.numCircles === 0 ? "Play Again" : "Reset Game" }</button></li>
            </ul>
        </div>
    </header>;
}