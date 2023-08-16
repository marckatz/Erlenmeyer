import React, { useContext, useEffect, useState } from "react";
import TableCard from "./TableCard";
import { UserContext } from "../context/user";
import NewTable from "./NewTable";

function SchemaFrame(){
    const {user, setUser} = useContext(UserContext)
    const [currentId, setCurrentId] = useState(0)
    const [schema, setSchema] = useState(null)
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if(currentId !== 0){
            fetch(`/schemas/${currentId}`)
            .then(r => {
                return r.ok ? r.json() : {}
            })
            .then(s => {
                setSchema(s)
            })
        }
    },[currentId, reset])

    const table_list = schema && schema.tables.map(table => {
        return <TableCard key={table.id} table={table} />
    })

    function handleNewTableSubmit(e, newTableName, setNewTableName){
        e.preventDefault()
        const newTable = {
            name:newTableName,
            schema_id:currentId
        }
        fetch('/tables', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTable)
        })
        .then(r=>r.json())
        .then(t=>{
            setSchema(s=> {return {'name':s.name, 'tables':[...s.tables, t]}})
            setNewTableName('')
            setReset(!reset)
        })
    }

    function handleExport(){
        fetch(`/schema/${schema.id}/export`)
        .then(r=>r.json())
        .then(data=>{
            const exportString = data['model']
            const exportBlob = new Blob([exportString], {type:'text/plain'})
            const temp_anchor = document.createElement("a");
            temp_anchor.href = URL.createObjectURL(exportBlob);
            temp_anchor.download = 'models.py' 
            document.body.appendChild(temp_anchor)
            temp_anchor.click()
            temp_anchor.remove()
        })
    }

    return (
        <div>
            <form className="d-flex" onSubmit={e=>e.preventDefault()}>
                <select className="col form-select" id="schema" onChange={e=>setCurrentId(e.target.value)} value={currentId}>
                    <option value={0} disabled>Select Schema</option>
                    {user.schemas.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
            </form>
            <h1>{schema && schema.name}</h1>
            {schema && <div className="btn btn-outline-primary" onClick={handleExport}>Export</div>}
            {table_list}
            {schema && <NewTable handleNewTableSubmit={handleNewTableSubmit}/>}
        </div>
    )
}

export default SchemaFrame