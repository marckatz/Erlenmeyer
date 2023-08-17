import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Login() {
    const { setUser } = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleLogin(e) {
        e.preventDefault()
        try {
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            })
                .then(r => {
                    if (r.status === 200) {
                        return r.json()
                            .then(logged_in_user => {
                                setUser(logged_in_user)
                                handleClose()
                            })
                    }
                })
        }
        catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    return (
        <>
            <Button variant='outline-success' onClick={handleShow} className="me-2">
                Log In
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard="false"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id='loginForm' onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-success" type="submit" form="loginForm">Log In</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login