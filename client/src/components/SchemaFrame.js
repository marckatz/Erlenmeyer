import React, { useContext, useEffect, useState } from "react";
import TableCard from "./TableCard";
import { UserContext } from "../context/user";
import NewTable from "./NewTable";

function SchemaFrame() {
    const { user } = useContext(UserContext)
    const [currentId, setCurrentId] = useState(0)
    const [schema, setSchema] = useState(null)
    const [reset, setReset] = useState(false)
    const [newSchemaName, setNewSchemaName] = useState('')
    const [showNewSchemaForm, setShowNewSchemaForm] = useState(false)
    const [schemaList, setSchemaList] = useState(user.schemas.map(s => <option key={s.id} value={s.id}>{s.name}</option>))

    useEffect(() => {
        if (currentId > 0) {
            fetch(`/schemas/${currentId}`)
                .then(r => {
                    if (r.ok) {
                        r.json().then(s => setSchema(s))
                    }
                })
        }
    }, [currentId, reset])

    const table_list = schema && schema.tables.map(table => {
        return <TableCard key={table.id} table={table} />
    })

    function handleNewTableSubmit(e, newTableName, setNewTableName) {
        e.preventDefault()
        const newTable = {
            name: newTableName,
            schema_id: currentId
        }
        fetch('/tables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTable)
        })
            .then(r => r.json())
            .then(t => {
                setSchema(s => { return { 'name': s.name, 'tables': [...s.tables, t] } })
                setNewTableName('')
                setReset(!reset)
            })
    }

    function handleExport() {
        fetch(`/schema/${schema.id}/export`)
            .then(r => r.json())
            .then(data => {
                const exportString = data['model']
                const exportBlob = new Blob([exportString], { type: 'text/plain' })
                const temp_anchor = document.createElement("a");
                temp_anchor.href = URL.createObjectURL(exportBlob);
                temp_anchor.download = 'models.py'
                document.body.appendChild(temp_anchor)
                temp_anchor.click()
                temp_anchor.remove()
            })
    }

    function handleNewSchema(e){
        e.preventDefault()
        let newSchema = {
            name:newSchemaName
        }
        fetch('/schemas', {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(newSchema)
        })
        .then(r=>r.json())
        .then(s => {
            newSchema = s
            const newUS = {
                schema_id:newSchema.id,
                user_id:user.id
            }
            fetch('/userschemas', {
                method: 'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify(newUS)
            })
        })
        .then(a=>{
            setCurrentId(newSchema.id)
            setNewSchemaName('')
            setShowNewSchemaForm(false)
            setSchemaList(sl => [...sl, <option key={newSchema.id} value={newSchema.id}>{newSchema.name}</option>])
        })
    }

    function handleToggleForm(e){
        e.preventDefault()
        setShowNewSchemaForm(true)
    }

    return (
        <div>
            <form className="d-flex" onSubmit={e => e.preventDefault()}>
                <select className="col form-select" id="schema" onChange={e=>setCurrentId(e.target.value)} value={currentId}>
                    <option value={0} disabled>Select Schema</option>
                    {schemaList}
                    <option value={currentId} onClick={handleToggleForm}>New Schema</option>
                </select>
            </form>
            {showNewSchemaForm ? (
                <form className="row row-cols-sm-auto align-items-center" onSubmit={handleNewSchema}>
                    <div className="col-12">
                        <div className="input-group has-validation">
                            <label className="visually-hidden form-label" htmlFor="new-schema">new schema</label>
                                <input
                                    type="text"
                                    className={`form-control is-${newSchemaName===''?'in':''}valid`}
                                    id="new-schema-input"
                                    placeholder="New Schema"
                                    value={newSchemaName}
                                    onChange={e => setNewSchemaName(e.target.value)}
                                    required
                                    aria-describedby="new-schema-feedback"
                                />
                            <div className="invalid-feedback" id='new-schema-feedback'>Schema name required</div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Add Schema</button>
                    </div>
                </form>
            ) : null}
            {schema ? (
                <>
                    <h1>{schema.name}</h1>
                    <div className="btn btn-outline-primary" onClick={handleExport}>Export</div>
                    {table_list}
                    <NewTable handleNewTableSubmit={handleNewTableSubmit} />
                </>
            ) : null}
        </div>
    )
}

export default SchemaFrame