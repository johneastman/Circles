import { useRef } from "react";
import "./Dialog.css";

interface DialogProps {
    isOpen: boolean;
    positiveAction: () => void;
    negativeAction: () => void;
}

export function Dialog(props: DialogProps): JSX.Element {

    let dialogElement = useRef<HTMLDialogElement>(null);

    if (props.isOpen) {
        // Need to call "showModal" to make background inert (i.e, disable interaction with elements below dialog).
        dialogElement.current!.showModal();
    } else {
        dialogElement.current!.close();
    }

    return <dialog ref={dialogElement} className="dialog">
        <div>
            Are you sure you want to delete all your data? This will include:
            <br/>
            <ul>
                <li>High Scores</li>
                <li>Turret Mode</li>
            </ul>
            Once deleted, this data is gone forever and cannot be recovered.

            <div className="horizontalList" style={{paddingTop: "1rem"}}>
                <ul>
                    <li style={{paddingRight: "0.5rem"}}><button className="button" onClick={props.positiveAction}>Yes, delete my data</button></li>
                    <li style={{paddingLeft:  "0.5rem"}}><button className="button" onClick={props.negativeAction}>No, keep my data</button></li>
                </ul>
            </div>
        </div>
    </dialog>
}
