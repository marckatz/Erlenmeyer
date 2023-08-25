import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../context/user";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function NewSchema({ setShowNewSchemaForm }) {
    const history = useHistory()
    const [newSchemaName, setNewSchemaName] = useState('')
    const [isNotValid, setIsNotValid] = useState(false)
    const { user } = useContext(UserContext)

    function handleNewSchema(e) {
        e.preventDefault()
        if (!newSchemaName) {
            setIsNotValid(true)
            return null
        }
        let newSchema = {
            name: newSchemaName
        }
        fetch('/schemas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSchema)
        })
            .then(r => r.json())
            .then(s => {
                newSchema = s
                const newUS = {
                    schema_id: newSchema.id,
                    user_id: user.id
                }
                fetch('/userschemas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUS)
                })
                .then(a => {
                    setShowNewSchemaForm && setShowNewSchemaForm(false)
                    setNewSchemaName('')
                    history.push('/schema', {id:newSchema.id })
                })
            })
    }

    return (
        <Form noValidate onSubmit={handleNewSchema}>
            <Form.Group as={Row} className="align-items-center position-relative" controlId="formSchemaName">
                <Col sm='10'>
                    <Row>
                        <Col sm='2'></Col>
                        <Col sm='10'>
                            <FloatingLabel controlId="formSchemaName" label='New Schema'>
                                <Form.Control
                                    type="text"
                                    placeholder="Schema Name"
                                    value={newSchemaName}
                                    onChange={e => {
                                        setNewSchemaName(e.target.value)
                                        setIsNotValid(false)
                                    }}
                                    isInvalid={isNotValid} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Must enter a name for the schema
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Col>
                <Col sm='2'>
                    <Button type="submit" variant="outline-primary">Submit</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default NewSchema