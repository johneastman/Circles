import React from "react";
import "./TurretMode.css"

export enum Mode {
    default = "Default",
    many = "Many"
}

interface TurretModeState {
    mode: Mode
}

export class TurretMode extends React.Component<{}, TurretModeState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            mode: Mode.default
        };
    }

    componentDidMount(): void {
        document.addEventListener("keydown", this.changeTurretMode.bind(this));
    }

    render(): JSX.Element {
        return (
            <ul key="turretModes" className="turretMode" data-testid="turretModes">
                {
                    Object.values(Mode).map((mode, index) =>
                        mode === this.state.mode.valueOf()
                        ? <li key={index}><strong>{mode}</strong></li>
                        : <li key={index}>{mode}</li>
                    )
                }
            </ul>
        )
    }

    changeTurretMode(keyboardEvent: KeyboardEvent): void {
        let modes: Map<string, Mode> = new Map([
            ["1", Mode.default],
            ["2", Mode.many]
        ]);
        this.setState({mode: modes.get(keyboardEvent.key) || Mode.default});
    }
}