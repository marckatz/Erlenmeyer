import React, { useContext } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../context/user";
import Login from "./Login";
import Signup from "./Signup";

import logo from "../erlogo.png"
import '../Home.css'

import { Navbar as BNavbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'

function Navbar() {
    const { user, setUser } = useContext(UserContext)
    const history = useHistory()

    function handleLogout() {
        fetch('/logout', {
            method: "DELETE",
        }).then(() => {
            setUser(null);
            history.push('/')
        })
    }

    return (
        <BNavbar expand="lg" className='bg-body-tertiary'>
            <Container >
                <LinkContainer to='/'>
                    <BNavbar.Brand>
                        <img
                            src={logo}
                            alt="Erlenmeyer"
                            style={{ width: '40px' }}
                            className='nav-logo me-1' />
                        Erlenmeyer
                    </BNavbar.Brand>
                </LinkContainer>
                <BNavbar.Toggle aria-controls="navbar" />
                <BNavbar.Collapse id="navbar" className="justify-content-end">
                    <Nav>
                        {user ? (
                            <>
                                <Link to='/profile'><Button variant="primary" className="me-2">Profile</Button></Link>
                                <Button variant="danger" className="me-2" onClick={handleLogout}>Log Out</Button>
                            </>
                        ) : (
                            <>
                                <Signup />
                                <Login />
                            </>
                        )}
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    )
}

export default Navbar