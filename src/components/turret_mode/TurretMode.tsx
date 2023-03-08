import React from "react";
import "./TurretMode.css"

export class Mode {
    static DEFAULT: string = "Default";
    static MANY: string = "Many";
    static SPLIT: string = "Split";

    static KEYBOARD_TO_MODE: Map<string, string> = new Map([
        ["1", this.DEFAULT],
        ["2", this.MANY],
        ["3", this.SPLIT]
    ]);
}

interface TurretModeState {
    mode: string
}

export class TurretMode extends React.Component<{}, TurretModeState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            mode: Mode.DEFAULT
        };
    }

    componentDidMount(): void {
        document.addEventListener("keydown", this.changeTurretMode.bind(this));
    }

    render(): JSX.Element {
        return (
            <ul key="turretModes" className="turretMode" data-testid="turretModes">
                {
                    Array.from(Mode.KEYBOARD_TO_MODE).map((mode, index) => {
                        let keyboardKey: string = mode[0];
                        let modeName: string = mode[1];
                        return <li key={index} style={modeName === this.state.mode ? {fontWeight: "bold"} : {}}>{`${modeName} (${keyboardKey})`}</li>
                    })
                }
            </ul>
        )
    }

    changeTurretMode(keyboardEvent: KeyboardEvent): void {
        this.setState({mode: Mode.KEYBOARD_TO_MODE.get(keyboardEvent.key) || Mode.DEFAULT});
    }
}