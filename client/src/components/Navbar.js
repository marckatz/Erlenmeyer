import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";
import logo from "../erlogo.png"
import Login from "./Login";
import Signup from "./Signup";

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
        <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
            <div className="collapse navbar-collapse d-flex justify-content-between">
                <div className="d-flex align-items-center ms-2">
                    <Link to="/">
                        <img src={logo}
                            alt="Erlenmeyer" style={{ width: '40px' }} className='rounded-3 me-1' />
                    </Link>
                    <Link className="navbar-brand" to="/">Erlenmeyer</Link>
                </div>
                <div>
                    {user ? (
                        <>
                            <div className="btn btn-outline-danger me-2" onClick={handleLogout}>Log Out</div>
                        </>
                    ) : (
                        <>
                            {/* <Link to='/signup' className="btn btn-outline-warning me-2">Sign Up</Link> */}
                            {/* <Link to='/login' className="btn btn-outline-success me-2">Log In</Link> */}
                            <Signup />
                            <Login />
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar