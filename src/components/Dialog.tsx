import React, { ReactNode, useEffect } from "react";
import "./Dialog.css";

interface DialogProps {
    children: ReactNode;
    isOpen: boolean;

    positiveActionText: string;
    positiveAction: () => void;

    negativeActionText: string;
    negativeAction: () => void;
}

function Dialog(props: DialogProps) {
    const dialogElement: React.RefObject<HTMLDialogElement> =
        React.createRef<HTMLDialogElement>();

    useEffect(() => {
        if (!dialogElement.current) {
            // componentDidMount
        } else {
            // componentDidUpdate
            if (props.isOpen) {
                // Need to call "showModal" to make background inert (i.e, disable interaction with elements below dialog).
                dialogElement.current.showModal();
            } else {
                dialogElement.current.close();
            }
        }
    });

    return (
        <dialog ref={dialogElement} className="dialog">
            <div>
                {props.children}

                <div className="horizontalList" style={{ paddingTop: "1rem" }}>
                    <ul>
                        <li style={{ paddingRight: "0.5rem" }}>
                            <button
                                className="button"
                                onClick={props.positiveAction}
                            >
                                {props.positiveActionText}
                            </button>
                        </li>
                        <li style={{ paddingLeft: "0.5rem" }}>
                            <button
                                className="button"
                                onClick={props.negativeAction}
                            >
                                {props.negativeActionText}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </dialog>
    );
}

export default Dialog;
