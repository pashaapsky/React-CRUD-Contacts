import React, {useState} from 'react';

import {AlertContext} from './AlertContext'

function AlertState({children}) {
    const [isVisible, setIsVisible] = useState(false);

    const show = () => {
        setIsVisible(true)
    };

    const hide = () => {
        setIsVisible(false)
    };

    return (
       <AlertContext.Provider value={{
            isVisible, setIsVisible, hide, show
       }}>
           {children}
       </AlertContext.Provider>
    );
}

export default AlertState;