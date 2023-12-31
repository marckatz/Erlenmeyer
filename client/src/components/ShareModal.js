import React, { useContext, useState } from 'react'

import { UserContext } from '../context/user'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons'

function ShareModal({ schemaId, reset }) {
    const [show, setShow] = useState(false)
    const { user } = useContext(UserContext)
    const [shareUsername, setShareUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [variant, setVariant] = useState('primary')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function successClose() {
        setVariant('success')
        setTimeout(() => {
            setVariant('primary')
            setShow(false)
        }, 1000);
        reset()
    }

    function handleShare(e) {
        e.preventDefault()
        if (user.username === shareUsername) {
            setUsernameError("You can't share a schema with yourself")
            return
        }
        fetch(`/users/${shareUsername}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(shareUser => {
                        const newUserSchema = {
                            user_id: shareUser.id,
                            schema_id: schemaId
                        }
                        fetch('/userschemas', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(newUserSchema)
                        })
                            .then(r => {
                                if (r.ok) {
                                    successClose()
                                    setUsernameError('')
                                }
                                else if (r.status === 400) {
                                    setUsernameError('User already has that schema')
                                    return
                                }
                            })
                    })
                }
                else if (r.status === 404) {
                    setUsernameError('User not found')
                    return
                }
            })
    }

    return (
        <>
            <Button variant='primary' onClick={handleShow}>
                <FontAwesomeIcon icon={faShareFromSquare} /> Share
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard="false"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Share Schema</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate id="shareForm" onSubmit={handleShare}>
                        <Form.Group className='mb-3 position-relative' controlId='formUsername'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Username'
                                value={shareUsername}
                                onChange={e => {
                                    setShareUsername(e.target.value)
                                    setUsernameError('')
                                }}
                                isInvalid={!!usernameError}
                                required />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {usernameError}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-" + variant} type="submit" form="shareForm">Share{variant === 'primary' ? '' : 'd ✓'}</Button>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShareModal