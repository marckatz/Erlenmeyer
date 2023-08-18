import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import NewColumn from "./NewColumn";
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card';

function TableCard({table}) {
    const {id, name} = table
    const [columns, setColumns] = useState(table.columns)



    const create_rows = columns.map(col => {
            return <ColumnCard key={col.id} column={col}/>
        });

    return (
        <Card style={{width:'50rem'}}>
            <Card.Body>
                <Card.Title>
                    {name}
                </Card.Title>
                <Table bordered style={{tableLayout:'fixed', width:'38rem'}}>
                    <thead>
                        <tr>
                            <th style={{width:'14rem'}}>Name</th>
                            <th style={{width:'10rem'}}>Type</th>
                            <th style={{width:'14rem'}}>placeholder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {create_rows}
                    </tbody>
                </Table>
                <NewColumn setColumns={setColumns} tableId={id}/>
            </Card.Body>
        </Card>
    )
}

export default TableCard