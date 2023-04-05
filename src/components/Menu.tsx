import "./Menu.css";

interface MenuProps {
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
    </header>;
}
