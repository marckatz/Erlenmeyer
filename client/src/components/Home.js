import React from "react";

import logo from "../erlogo.png"

import "../Home.css"

function Home() {

    return (
        <div>
            <img src={logo} alt="Erlenmeyer logo" className="home-logo" />
        </div>
    )
}

export default Home