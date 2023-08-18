import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function NewSchema({ forceReset, setCurrentId, setShowNewSchemaForm }) {
    const [newSchemaName, setNewSchemaName] = useState('')
    const { user } = useContext(UserContext)

    function handleNewSchema(e) {
        e.preventDefault()
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
            })
            .then(a => {
                setCurrentId(newSchema.id)
                setNewSchemaName('')
                setShowNewSchemaForm(false)
                forceReset()
            })
    }

    return (
        <Form className="mt-3" onSubmit={handleNewSchema}>
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
                                    onChange={e => setNewSchemaName(e.target.value)}
                                    isValid={!!newSchemaName}
                                    required />
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