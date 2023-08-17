import React, { useContext } from "react";
import { UserContext } from "../context/user";
import logo from "../erlogo.png"
import Login from "./Login";
import Signup from "./Signup";
import { Navbar as BNavbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

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
        <BNavbar expand="lg" className='bg-body-tertiary'>
            <Container >
                <LinkContainer to='/'>
                    <BNavbar.Brand>
                        <img
                            src={logo}
                            alt="Erlenmeyer"
                            style={{ width: '40px' }}
                            className='rounded-3 me-1' />
                        Erlenmeyer
                    </BNavbar.Brand>
                </LinkContainer>
                <BNavbar.Toggle aria-controls="navbar" />
                <BNavbar.Collapse id="navbar" className="justify-content-end">
                    <Nav>
                        {user ? (
                            <Button variant="outline-danger" className="me-2" onClick={handleLogout}>Log Out</Button>
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