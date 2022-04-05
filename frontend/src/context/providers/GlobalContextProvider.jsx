import React, { useState } from 'react'
export const GlobalContext = React.createContext();
export default function GlobalContextProvider({ children }) {
    const [route, setRoute] = useState();
    const [history, setHistory] = useState(null);


    //ROUTING FUNCTIONS
    const routeSwitcher = (route) => {
        setRoute(route);
        if (history) {
            history.push(route);
        }
    }

    const contextValue = {
        route,
        routeSwitcher,
        history,
        setHistory
    }


    return (
        <>
            <GlobalContext.Provider value={contextValue}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}
