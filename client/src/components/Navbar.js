import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";

function Navbar() {
    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        fetch('/logout', {
            method: "DELETE",
        }).then(() => {
            setUser(null);
        })
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                {user ? (
                    <>
                        <div className="col btn" onClick={handleLogout}>Log Out</div>
                    </>
                ) : (
                    <Link to='/login' className="btn">Log In</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar