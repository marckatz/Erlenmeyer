import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import NewColumn from "./NewColumn";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button"
import Collapse from 'react-bootstrap/Collapse';
import '../TableCard.css'

function TableCard({ table }) {
    const { id, name } = table
    const [columns, setColumns] = useState(table.columns)
    const [show, setShow] = useState(false)

    function handleDelete(columnId) {
        fetch(`/columns/${columnId}`, {
            method: "DELETE"
        })
            .then(r => {
                if (r.ok) {
                    setColumns(cs => cs.filter(c => c.id !== columnId))
                }
            })
    }

    const create_rows = columns.map((col) => {
        return <ColumnCard key={col.id} column={col} handleDelete={handleDelete} />
    });

    return (
        <Col>
            <Card className="shadow">
                <Card.Body>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Row className="border mx-0">
                        <Col className="table-col border" style={{ flexBasis: '25%' }}>Name</Col>
                        <Col className="table-col border" style={{ flexBasis: '35%' }}>Type</Col>
                        <Col className="table-col border" style={{ flexBasis: '40%' }}></Col>
                    </Row>
                    {create_rows}
                    <Collapse in={show}>
                        <div id='columnForm'>
                            <NewColumn setColumns={setColumns} tableId={id} />
                        </div>
                    </Collapse>
                    <Button
                        onClick={() => setShow(!show)}
                        aria-controls="columnForm"
                        aria-expanded={show}
                        className="my-2">
                        {show ? 'Close ' : ''}New Column
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TableCard