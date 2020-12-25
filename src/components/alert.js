import React, {useContext} from 'react';
import {AlertContext} from "../context/AlertContext";

function Alert({text}) {
    const {isVisible, show, hide} = useContext(AlertContext);

    return isVisible ? (
        <div className="">
            <strong>Внимание! </strong>
            {text}

            <button onClick={hide} type="button" className="close" aria-label="Close">
                <span >&times;</span>
            </button>
        </div>
        ) : null
}

export default Alert;