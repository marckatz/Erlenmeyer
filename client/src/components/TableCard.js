import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import NewColumn from "./NewColumn";
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../TableCard.css'

function TableCard({table}) {
    const {id, name} = table
    const [columns, setColumns] = useState(table.columns)



    const create_rows = columns.map(col => {
        return <ColumnCard key={col.id} column={col}/>
    });

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Table bordered style={{width:'100%', tableLayout:'fixed', whiteSpace:'nowrap', }} >
                        <thead>
                            <tr>
                                <th className="name-col">Name</th>
                                <th className="type-col">Type</th>
                                <th className="button-col">TODO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {create_rows}
                        </tbody>
                    </Table>
                    <NewColumn setColumns={setColumns} tableId={id}/>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TableCard