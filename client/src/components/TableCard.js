import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import NewColumn from "./NewColumn";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import '../TableCard.css'

function TableCard({ table }) {
    const { id, name } = table
    const [columns, setColumns] = useState(table.columns)



    const create_rows = columns.map(col => {
        return <ColumnCard key={col.id} column={col} />
    });

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Row >
                        <Col className="name-col">Name</Col>
                        <Col className="type-col">Type</Col>
                        <Col className="button-col">TODO</Col>
                    </Row>
                    {create_rows}
                    <NewColumn setColumns={setColumns} tableId={id} />
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TableCard