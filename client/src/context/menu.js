import React, { createContext, useState } from "react";

const MenuContext = createContext(null)

function MenuProvider({children}){
    const [showMenu, setShowMenu] = useState(false)
    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)
    return <MenuContext.Provider value={{showMenu,setShowMenu, xPos, setXPos, yPos, setYPos}}>{children}</MenuContext.Provider>
}

export {MenuContext, MenuProvider}