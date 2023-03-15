import React from "react";
import "./TurretMode.css"

export class Mode {
    static DEFAULT: string = "Default";
    static ARRAY: string = "Array";
    static BURST: string = "Burst";

    static KEYBOARD_TO_MODE: Map<string, string> = new Map([
        ["1", this.DEFAULT],
        ["2", this.ARRAY],
        ["3", this.BURST]
    ]);
}

interface TurretModeProps {
    mode: Mode;
}

export function TurretMode(props: TurretModeProps): JSX.Element {
    let turretModeString: string = props.mode.toLocaleString();
        
    return (
        <ul key="turretModes" className="turretMode" data-testid="turretModes">
            {
                Array.from(Mode.KEYBOARD_TO_MODE).map((mode, index) => {
                    let keyboardKey: string = mode[0];
                    let modeName: string = mode[1];
                    return <li key={index} style={modeName === turretModeString ? {fontWeight: "bold"} : {}}>{`${modeName} (${keyboardKey})`}</li>
                })
            }
        </ul>
    )
}
