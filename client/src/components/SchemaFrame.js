import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";

function SchemaFrame({schemaId}){

    const [tables, setTables] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5555/schemas/${schemaId}`)
        .then(r => r.json())
        .then(s => {
            setTables(s.tables)
            setName(s.name)
        })
    },[])

    const table_list = tables.map(table => {
        return <TableCard key={table.id} table={table} />
    })

    return (
        <div>
            <h1>{name}</h1>
            {table_list}
        </div>
    )
}

export default SchemaFrame