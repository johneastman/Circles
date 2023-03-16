import React from "react";
import "./TurretMode.css"

export class Mode {
    static DEFAULT: {key: string, displayName: string} = {key: "1", displayName: "Default"};
    static BOUNCE:  {key: string, displayName: string} = {key: "2", displayName: "Bounce"};
    static ARRAY:   {key: string, displayName: string} = {key: "3", displayName: "Array"};
    static BURST:   {key: string, displayName: string} = {key: "4", displayName: "Burst"};

    static KEYBOARD_TO_MODE: Map<string, string> = new Map([
        [this.DEFAULT.key, this.DEFAULT.displayName],
        [this.BOUNCE.key, this.BOUNCE.displayName],
        [this.ARRAY.key, this.ARRAY.displayName],
        [this.BURST.key, this.BURST.displayName],
    ]);
}

interface TurretModeProps {
    mode: {key: string, displayName: string};
}

export function TurretMode(props: TurretModeProps): JSX.Element {
    let turretMode: {key: string, displayName: string} = props.mode;

    return (
        <ul key="turretModes" className="turretMode" data-testid="turretModes">
            {
                Array.from(Mode.KEYBOARD_TO_MODE).map((mode, index) => {
                    let keyboardKey: string = mode[0];
                    let modeName: string = mode[1];
                    return <li key={index} style={keyboardKey === turretMode.key ? {fontWeight: "bold"} : {}}>{`(${keyboardKey}) ${modeName}`}</li>
                })
            }
        </ul>
    )
}
