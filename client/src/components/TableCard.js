import React, { useEffect, useState } from "react";
import ColumnCard from "./ColumnCard";

function TableCard({tableId}) {
    const [columns, setColumns] = useState([])
    const [tableName, setName] = useState('')

    useEffect(() => {
        //TODO: Fix proxy
        fetch(`http://localhost:5555/tables/${tableId}`)
        .then(r => r.json())
        .then(t => {
            setColumns(t.columns)
            setName(t.name)
        })
        // .then(t => setTable(t))
    },[])

    const create_rows = columns.map(col => {
            return <ColumnCard key={col.id} column={col}/>
        });

    return (
        <div className="container">
            <div className="row">{tableName}</div>
            {create_rows}
        </div>
    )
}

export default TableCard