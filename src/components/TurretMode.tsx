import { TurretMode } from "../sprites/turret";
import "./TurretMode.css"

interface TurretModeProps {
    mode: string;
}

export function TurretModeComponent(props: TurretModeProps): JSX.Element {
    let turretMode: string = props.mode;

    return (
        <ul key="turretModes" className="turretMode" data-testid="turretModes">
            {
                Array.from(TurretMode.KEYBOARD_TO_MODE).map((mode, index) => {
                    let keyboardKey: string = mode[0];
                    let modeName: string = mode[1];
                    return <li key={index} style={keyboardKey === turretMode ? {fontWeight: "bold"} : {}}>{`(${keyboardKey}) ${modeName}`}</li>
                })
            }
        </ul>
    )
}
