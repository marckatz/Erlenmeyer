import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function RelationshipForm({ tables }) {
    const [error, setError] = useState('')

    const [selectedTableFrom, setSelectedTableFrom] = useState(0)
    const [selectedColumnFrom, setSelectedColumnFrom] = useState(0)
    const [columnsFrom, setColumnsFrom] = useState([])

    const [selectedTableTo, setSelectedTableTo] = useState(0)
    const [selectedColumnTo, setSelectedColumnTo] = useState(0)
    const [columnsTo, setColumnsTo] = useState([])

    useEffect(() => {
        const currentTable = tables.find(table => table.id === parseInt(selectedTableFrom))
        currentTable ? setColumnsFrom(currentTable.columns) : setColumnsFrom([])
    }, [selectedTableFrom, tables])

    useEffect(() => {
        const currentTable = tables.find(table => table.id === parseInt(selectedTableTo))
        currentTable ? setColumnsTo(currentTable.columns) : setColumnsTo([])
    }, [selectedTableTo, tables])

    const tableFromOptions = tables.filter(table => table.id !== parseInt(selectedTableTo)).map(table => <option key={table.id} value={table.id}>{table.name}</option>)

    const columnFromOptions = columnsFrom && columnsFrom.map(c => <option key={c.id} value={c.id}>{c.name}</option>)

    function handleTableFromChange(e) {
        setSelectedTableFrom(e.target.value)
        if (e.target.value === parseInt(selectedTableTo)) {
            setSelectedTableTo(0)
        }
        setSelectedColumnFrom(0)
        setError('')
    }

    function handleColumnFromChange(e) {
        setSelectedColumnFrom(e.target.value)
        setError('')
    }

    const tableToOptions = tables.filter(table => table.id !== parseInt(selectedTableFrom)).map(table => <option key={table.id} value={table.id}>{table.name}</option>)

    const columnToOptions = columnsTo && columnsTo.map(c => <option key={c.id} value={c.id}>{c.name}</option>)

    function handleTableToChange(e) {
        setSelectedTableTo(e.target.value)
        setSelectedColumnTo(0)
        setError('')
    }

    function handleColumnToChange(e) {
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
                    r.json().then(rel => console.log(rel))
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
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col} controlId='tableFrom'>
                        <Form.Select onChange={handleTableFromChange} value={selectedTableFrom} isInvalid={!!error}>
                            <option value={0} disabled>Select Table</option>
                            {tableFromOptions}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' tooltip>
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='tableTo'>
                        <Form.Select onChange={handleTableToChange} value={selectedTableTo} isInvalid={!!error}>
                            <option value={0} disabled>Select Table</option>
                            {tableToOptions}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' tooltip>
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId='columnFrom' className='position-relative'>
                        <Form.Select disabled={selectedTableFrom === 0} onChange={handleColumnFromChange} value={selectedColumnFrom} isInvalid={!!error}> 
                            <option value={0} disabled>Select Column</option>
                            {columnFromOptions}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' tooltip>
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='columnTo' className='position-relative'>
                        <Form.Select disabled={selectedTableTo === 0} onChange={handleColumnToChange} value={selectedColumnTo} isInvalid={!!error}>
                            <option value={0} disabled>Select Column</option>
                            {columnToOptions}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' tooltip>
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type='submit' disabled={!(selectedColumnFrom && selectedTableFrom && selectedColumnTo && selectedTableTo)}>Submit</Button>
            </Form>
        </>
    )
}

export default RelationshipForm