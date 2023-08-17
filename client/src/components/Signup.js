import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Signup() {
    const {setUser} = useContext(UserContext)
    const history = useHistory()
    const [usernameError, setUsernameError] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a name").min(2).max(25),
        password: yup.string().required("Must enter a password").min(6).max(15),
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
                if(r.ok){
                    r.json().then(data => {
                        setUser(data)
                        history.push('/')
                    })
                }
                else{
                    setUsernameError('Username already exists')
                }
            })
        }
    });



    return (
        <>
            <Button variant='outline-warning' onClick={handleShow}>
                Sign Up
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard="false">
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='signupForm' onSubmit={formik.handleSubmit}>
                            <Form.Group className='mb-3' controlId='formUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Username'
                                    value={formik.values.username}
                                    name='username'
                                    onChange={e=>{
                                        formik.handleChange(e)
                                        setUsernameError('')
                                    }}
                                    required />
                                    <p className='text-danger'>{formik.errors.username}</p>
                                    {usernameError && <p className='text-danger'>{usernameError}</p>}
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    value={formik.values.password}
                                    name='password'
                                    onChange={e=>{
                                        formik.handleChange(e)
                                    }}
                                    required />
                                    <p className='text-danger'>{formik.errors.password}</p>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-success" type="submit" form="signupForm">Sign Up</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Signup;
