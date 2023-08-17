import React, { useContext } from "react";
import { UserContext } from "../context/user";
import logo from "../erlogo.png"

function Home(){
    const {user} = useContext(UserContext)

    return (
        <div>
            <img src={logo} alt='Erlenmeyer' />
            {user ? (
                'Logged In'
            ) : (
                'Not Logged In'
            )}
        </div>
    )
}

export default Home