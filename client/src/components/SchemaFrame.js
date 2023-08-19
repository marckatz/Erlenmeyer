import React, { useContext, useEffect, useState } from "react";
import TableCard from "./TableCard";
import { UserContext } from "../context/user";
import NewTable from "./NewTable";
import NewSchema from "./NewSchema";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Collapse from 'react-bootstrap/Collapse';
import ShareModal from "./ShareModal";
import { useLocation } from "react-router-dom";

function SchemaFrame() {
    const location = useLocation()
    const { user } = useContext(UserContext)
    const [currentId, setCurrentId] = useState(0)
    const [schema, setSchema] = useState(null)
    const [reset, setReset] = useState(false)
    const [showNewSchemaForm, setShowNewSchemaForm] = useState(false)
    const [schemaList, setSchemaList] = useState([])

    useEffect(() =>{
        setCurrentId(location.state?location.state.id:0)
    },[])

    useEffect(() => {
        if (currentId > 0) {
            fetch(`/schemas/${currentId}`)
                .then(r => {
                    if (r.ok) {
                        r.json().then(s => {
                            if(user && user.schemas.map(us=>us.id).includes(s.id)){
                                setSchema(s)
                            }
                        })
                    }
                })
        }
        if (user) {
            fetch(`/schemasByUserid/${user.id}`)
                .then(r => r.json())
                .then(schemas => setSchemaList(schemas.map(s => <option key={s.id} value={s.id}>{s.name}</option>)))
        }
    }, [currentId, reset, user])

    const table_list = schema && schema.tables.map(table => {
        return <TableCard key={table.id} table={table} />
    })

    function forceReset() {
        setReset(r => !r)
    }

    const displayUsers = () => {
        if (schema.users.length === 1) {
            return schema.users[0].username
        }
        else if (schema.users.length === 2) {
            return schema.users[0].username + " and " + schema.users[1].username
        }
        else {
            return schema.users.slice(0, -1).map(u => u.username).join(', ') + ', and ' + schema.users.at(-1).username
        }
    }

    function handleExport() {
        fetch(`/schema/${schema.id}/export`)
            .then(r => r.json())
            .then(data => {
                const exportString = data['model']
                const exportBlob = new Blob([exportString], { type: 'text/plain' })
                const temp_anchor = document.createElement("a");
                temp_anchor.href = URL.createObjectURL(exportBlob);
                temp_anchor.download = 'models.py'
                document.body.appendChild(temp_anchor)
                temp_anchor.click()
                temp_anchor.remove()
            })
    }

    function handleSchemaChange(e) {
        e.preventDefault()
        setCurrentId(e.target.value)
        setShowNewSchemaForm(false)
    }

    return (
        <div className="mx-5 my-2">
            <Row>
                <Col sm='10'>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Group as={Row} >
                            <Form.Label column sm="2" className="text-end">Select Schema:</Form.Label>
                            <Col sm='10'>
                                <Form.Select id="schema" onChange={handleSchemaChange} value={currentId}>
                                    <option disabled value='0'>Select Schema</option>
                                    {schemaList}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm='2'>
                    <Button
                        onClick={() => setShowNewSchemaForm(!showNewSchemaForm)}
                        aria-controls="schemaForm"
                        aria-expanded={showNewSchemaForm}>
                        New Schema
                    </Button>
                </Col>
            </Row>
            <Collapse in={showNewSchemaForm}>
                <div id='schemaForm'>
                    <NewSchema forceReset={forceReset} setCurrentId={setCurrentId} setShowNewSchemaForm={setShowNewSchemaForm} />
                </div>
            </Collapse>
            {schema ? (
                <>
                    <Row className="align-items-center">
                        <Col md='auto'><h1>{schema.name}</h1></Col>
                        <Col md='auto'><Button variant="outline-primary" onClick={handleExport}>Export</Button></Col>
                        <Col md='auto'><ShareModal schemaId={currentId} reset={forceReset}/></Col>
                    </Row>
                    <h4 className="ms-4 text-muted">By {displayUsers()}</h4>
                    <hr />
                    <Row md='3' className="gy-3">
                        {table_list}
                    </Row>
                    <NewTable currentId={currentId} forceReset={forceReset} />
                </>
            ) : null}
        </div>
    )
}

export default SchemaFrame