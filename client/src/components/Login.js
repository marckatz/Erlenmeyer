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
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

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
                    else if (r.status === 404) {
                        setUsernameError('Invalid username')
                    }
                    else if (r.status === 401) {
                        setPasswordError('Incorrect password')
                        setPassword('')
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
                    <Form id='loginForm' noValidate onSubmit={handleLogin}>
                        <Form.Group className="mb-3 position-relative" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    setUsernameError('')
                                }}
                                isInvalid={!!usernameError}
                                required />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {usernameError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 position-relative" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setPasswordError('')
                                }}
                                isInvalid={!!passwordError}
                                required />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {passwordError}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" type="submit" form="loginForm">Log In</Button>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login