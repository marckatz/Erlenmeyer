import React, { createContext, useState } from "react";

const MenuContext = createContext(null)

function MenuProvider({children}){
    const [showMenu, setShowMenu] = useState(false)
    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)
    const [handleUpdate, setHandleUpdate] = useState(()=>null)
    const [currentPK, setCurrentPK] = useState(false)
    const [currentRepr, setCurrentRepr] = useState(false)
    return <MenuContext.Provider value={{
        showMenu,setShowMenu, 
        xPos, setXPos, 
        yPos, setYPos, 
        handleUpdate, setHandleUpdate,
        currentPK, setCurrentPK,
        currentRepr, setCurrentRepr
    }}>{children}</MenuContext.Provider>
}

export {MenuContext, MenuProvider}