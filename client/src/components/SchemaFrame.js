import React, { useContext, useEffect, useState } from "react";
import TableCard from "./TableCard";
import { UserContext } from "../context/user";

function SchemaFrame(){
    const {user, setUser} = useContext(UserContext)
    const [currentId, setCurrentId] = useState(0)
    const [schema, setSchema] = useState({'name':'', 'tables':[]})

    useEffect(() => {
        if(currentId !== 0){
            fetch(`/schemas/${currentId}`)
            .then(r => {
                return r.ok ? r.json() : {'name':'Schema not found', 'tables':[]}
            })
            .then(s => {
                setSchema(s)
            })
        }
    },[currentId])

    const table_list = schema.tables.map(table => {
        return <TableCard key={table.id} table={table} />
    })

    return (
        <div>
            <form className="d-flex" onSubmit={e=>e.preventDefault()}>
                <select className="col form-select" id="schema" onChange={e=>setCurrentId(e.target.value)} value={currentId}>
                    <option value={0} disabled>Select Schema</option>
                    {user.schemas.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
            </form>
            <h1>{schema.name}</h1>
            {table_list}
        </div>
    )
}

export default SchemaFrame