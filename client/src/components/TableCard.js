import React, { useEffect, useState } from "react";
import ColumnCard from "./ColumnCard";
import NewColumn from "./NewColumn";
import { TableIdContext } from "../context/table";

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
    },[])

    const create_rows = columns.map(col => {
            return <ColumnCard key={col.id} column={col}/>
        });

    return (
        <TableIdContext.Provider value={tableId}>
            <div className="container">
                <div className="row">{tableName}</div>
                {create_rows}
                <NewColumn />
            </div>
        </TableIdContext.Provider>
    )
}

export default TableCard