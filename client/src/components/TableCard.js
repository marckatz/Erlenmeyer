import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import NewColumn from "./NewColumn";

function TableCard({table}) {
    const {id, name} = table
    const [columns, setColumns] = useState(table.columns)

    function handleSubmit(e,colName,colType,setColName){
        e.preventDefault()
        const new_column = {
            name: colName,
            column_type:colType,
            is_pk:false,
            in_repr:false,
            table_id:id
        }
        fetch('/columns', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_column)
        })
        .then(r => r.json())
        .then(data => {
            setColName('')
            setColumns(c => [...c, data])
        })
    }

    const create_rows = columns.map(col => {
            return <ColumnCard key={col.id} column={col}/>
        });

    return (
        <div className="container">
            <h2 className="row">Table: {name}</h2>
            {create_rows}
            <NewColumn handleSubmit={handleSubmit}/>
        </div>
    )
}

export default TableCard