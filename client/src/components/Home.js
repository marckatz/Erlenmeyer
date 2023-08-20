import React, { useContext } from "react";
import { UserContext } from "../context/user";
import logo from "../erlogo.png"
import "../Home.css"

function Home(){
    const {user} = useContext(UserContext)

    return (
        <div>
            <img src={logo} alt="Erlenmeyer logo" className="home-logo" />
        </div>
    )
}

export default Home