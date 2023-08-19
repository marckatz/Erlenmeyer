import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Signup() {
    const { setUser } = useContext(UserContext)
    const history = useHistory()
    const [usernameError, setUsernameError] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const usernameMin = 2
    const usernameMax = 25
    const passwordMin = 6
    const passwordMax = 15
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a name").min(usernameMin,`Username must have at least ${usernameMin} characters`).max(usernameMax,`Username must have at most ${usernameMax} characters`),
        password: yup.string().required("Must enter a password").min(passwordMin,`Password must have at least ${passwordMin} characters`).max(passwordMax,`Password must have at most ${passwordMax} characters`),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
                .then(r => {
                    if (r.ok) {
                        r.json().then(data => {
                            setUser(data)
                            history.push('/')
                        })
                    }
                    else {
                        setUsernameError('Username already exists')
                    }
                })
        }
    });



    return (
        <>
            <Button variant='outline-warning' onClick={handleShow} className='me-2'>
                Sign Up
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard="false">
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id='signupForm' noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group className='mb-3 position-relative' controlId='formUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Username'
                                value={formik.values.username}
                                name='username'
                                onChange={e => {
                                    formik.handleChange(e)
                                    setUsernameError('')
                                }}
                                isInvalid={!!formik.errors.username || usernameError}
                                isValid={!formik.errors.username && formik.values.username}
                                required />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {usernameError?usernameError:formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3 position-relative' controlId='formPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                value={formik.values.password}
                                name='password'
                                onChange={e => {
                                    formik.handleChange(e)
                                }}
                                isInvalid={!!formik.errors.password}
                                isValid={!formik.errors.password && formik.values.password}
                                required />
                            <Form.Control.Feedback type='invalid' tooltip>
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" type="submit" form="signupForm">Sign Up</Button>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Signup;
