import React, { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function RelationshipForm({ schemaId, setRelationships }) {
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)

    const [tables, setTables] = useState([])

    const [columnsFrom, setColumnsFrom] = useState([])
    const [columnsTo, setColumnsTo] = useState([])

    const [selectedTableFrom, setSelectedTableFrom] = useState(0)
    const [selectedColumnFrom, setSelectedColumnFrom] = useState(0)

    const [selectedTableTo, setSelectedTableTo] = useState(0)
    const [selectedColumnTo, setSelectedColumnTo] = useState(0)

    useEffect(() => {
        if (schemaId) {
            fetch(`/schemas/${schemaId}`)
                .then(r => r.json())
                .then(s => {
                    setTables(s.tables)
                })
        }
    }, [show, schemaId])

    useEffect(() => {
        const currentTable = tables.find(table => table.id === parseInt(selectedTableFrom))
        currentTable ? setColumnsFrom(currentTable.columns) : setColumnsFrom([])
    }, [selectedTableFrom, tables, show])

    useEffect(() => {
        const currentTable = tables.find(table => table.id === parseInt(selectedTableTo))
        currentTable ? setColumnsTo(currentTable.columns) : setColumnsTo([])
    }, [selectedTableTo, tables, show])

    const tableFromOptions = tables.filter(table => table.id !== parseInt(selectedTableTo)).map(table => <option key={table.id} value={table.id}>{table.name}</option>)

    const columnFromOptions = columnsFrom && columnsFrom.map(c => <option key={c.id} value={c.id}>{c.name}</option>)

    function handleTableFromChange(e) {
        setSelectedTableFrom(e.target.value)
        if (e.target.value === parseInt(selectedTableTo)) {
            setSelectedTableTo(0)
        }
        if (selectedColumnFrom !== 0) {
            document.getElementById('col' + selectedColumnFrom).classList.remove('beingSelected')
        }
        setSelectedColumnFrom(0)
        setError('')
    }

    function handleColumnFromChange(e) {
        if (selectedColumnFrom !== 0) {
            document.getElementById('col' + selectedColumnFrom).classList.remove('beingSelected')
        }
        if (e.target.value !== 0) {
            document.getElementById('col' + e.target.value).classList.add('beingSelected')
        }
        setSelectedColumnFrom(e.target.value)
        setError('')
    }

    const tableToOptions = tables.filter(table => table.id !== parseInt(selectedTableFrom)).map(table => <option key={table.id} value={table.id}>{table.name}</option>)

    const columnToOptions = columnsTo && columnsTo.map(c => <option key={c.id} value={c.id}>{c.name}</option>)

    function handleTableToChange(e) {
        setSelectedTableTo(e.target.value)
        setSelectedColumnTo(0)
        if (selectedColumnTo !== 0) {
            document.getElementById('col' + selectedColumnTo).classList.remove('beingSelected')
        }
        setError('')
    }

    function handleColumnToChange(e) {
        if (selectedColumnTo !== 0) {
            document.getElementById('col' + selectedColumnTo).classList.remove('beingSelected')
        }
        if (e.target.value !== 0) {
            document.getElementById('col' + e.target.value).classList.add('beingSelected')
        }
        setSelectedColumnTo(e.target.value)
        setError('')
    }

    function handleSubmit(e) {
        e.preventDefault()

        let new_relationship = {
            from_many_id: selectedColumnFrom,
            to_one_id: selectedColumnTo
        }
        fetch('/relationships', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_relationship)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(rel => {
                        if (selectedColumnTo !== 0) {
                            document.getElementById('col' + selectedColumnTo).classList.remove('beingSelected')
                        }
                        if (selectedColumnFrom !== 0) {
                            document.getElementById('col' + selectedColumnFrom).classList.remove('beingSelected')
                        }
                        setRelationships(rels => [...rels, rel])
                        setSelectedTableTo(0)
                        setSelectedColumnTo(0)
                        setSelectedTableFrom(0)
                        setSelectedColumnFrom(0)
                    })
                }
                else if (r.status === 400) {
                    setError('same table somehow')
                }
                else if (r.status === 409) {
                    setError('Relationship already exists')
                }
            })
    }


    return (
        <>
            <Collapse in={show}>
                <div id='relFormWrapper'>
                    <Form onSubmit={handleSubmit} id='relForm' className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex flex-column'>
                            <Form.Group controlId='tableFrom' className='my-2'>
                                <FloatingLabel label="Table">
                                    <Form.Select
                                        onChange={handleTableFromChange}
                                        value={selectedTableFrom}
                                        isInvalid={!!error}
                                        className={selectedTableFrom === 0 ? 'text-muted' : ''}>
                                        <option value={0} disabled>Select Table</option>
                                        {tableFromOptions}
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId='columnFrom' className='position-relative mb-2'>
                                <FloatingLabel label="Column">
                                    <Form.Select
                                        disabled={selectedTableFrom === 0}
                                        onChange={handleColumnFromChange}
                                        value={selectedColumnFrom}
                                        isInvalid={!!error}
                                        className={selectedColumnFrom === 0 ? 'text-muted' : ''}>
                                        <option value={0} disabled>Select Column</option>
                                        {columnFromOptions}
                                    </Form.Select>
                                </FloatingLabel>
                                <Form.Control.Feedback type='invalid' tooltip>
                                    {error}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faAngleRight} size='2xl' />
                        </div>
                        <div className='d-flex flex-column'>
                            <Form.Group controlId='tableTo' className='my-2'>
                                <FloatingLabel label="Table">
                                    <Form.Select
                                        onChange={handleTableToChange}
                                        value={selectedTableTo}
                                        isInvalid={!!error}
                                        className={selectedTableTo === 0 ? 'text-muted' : ''}>
                                        <option value={0} disabled>Select Table</option>
                                        {tableToOptions}
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId='columnTo' className='position-relative mb-2'>
                                <FloatingLabel label="Column">
                                    <Form.Select
                                        disabled={selectedTableTo === 0}
                                        onChange={handleColumnToChange}
                                        value={selectedColumnTo}
                                        isInvalid={!!error}
                                        className={selectedColumnTo === 0 ? 'text-muted' : ''}>
                                        <option value={0} disabled >Select Column</option>
                                        {columnToOptions}
                                    </Form.Select>
                                </FloatingLabel>
                                <Form.Control.Feedback type='invalid' tooltip>
                                    {error}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </Form>
                    <Button form='relForm' type='submit' variant='success' disabled={!(selectedColumnFrom && selectedTableFrom && selectedColumnTo && selectedTableTo)}><FontAwesomeIcon icon={faPlus} /> Add</Button>
                </div>
            </Collapse>
            <Button
                onClick={() => {
                    setShow(!show)
                    if (selectedColumnTo !== 0) {
                        document.getElementById('col' + selectedColumnTo).classList.remove('beingSelected')
                    }
                    if (selectedColumnFrom !== 0) {
                        document.getElementById('col' + selectedColumnFrom).classList.remove('beingSelected')
                    }
                    setSelectedTableTo(0)
                    setSelectedColumnTo(0)
                    setSelectedTableFrom(0)
                    setSelectedColumnFrom(0)
                }}
                aria-controls="relFormWrapper"
                aria-expanded={show}
                className="my-1 py-0 px-1"
                title={show ? 'Close' : 'New Relationship'}
                variant={show ? "warning" : "success"}>
                {show ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPlus} />}
            </Button>
        </>
    )
}

export default RelationshipForm