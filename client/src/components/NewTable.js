import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function NewTable({handleNewTableSubmit}){
    const [newTableName, setNewTableName] = useState('')

    return (
        <Form className="d-flex mt-3" onSubmit={e=>handleNewTableSubmit(e,newTableName,setNewTableName)}>
            <Row className="align-items-center">
                <Col xs='auto'>
                    <Form.Group controlId="formTable">
                        <Form.Control
                            type="text" 
                            className="form-control" 
                            placeholder="Table Name" 
                            value={newTableName}
                            onChange={e => setNewTableName(e.target.value)} 
                            required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Button type="submit" variant="outline-primary">Submit</Button>
                </Col>
            </Row>
        </Form>
    )

}

export default NewTable