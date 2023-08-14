import React, { useContext, useState } from "react";
import { TableIdContext } from "../context/table";

function NewColumn(){
    const [colName, setColName] = useState('')
    const [colType, setColType] = useState(0)
    const tableId = useContext(TableIdContext)

    function handleSubmit(e){
        e.preventDefault()
        const new_column = {
            name: colName,
            column_type:colType,
            is_pk:false,
            in_repr:false,
            table_id:tableId
        }
        // console.log(new_column)
        fetch('http://localhost:5555/columns', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_column)
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    return (
        <form className="row row-cols-lg-auto align-items-center" onSubmit={handleSubmit}>
            <div className="col-12">
                <label className="visually-hidden" htmlFor='col_name'>name</label>
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="col_name" 
                        placeholder="Column Name" 
                        onChange={e => setColName(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-12">
                <label className="visually-hidden" htmlFor='col_type'>type</label>
                <select className="form-select" id='col_type' onChange={e => setColType(e.target.value)}>
                    <option value='Integer'>Integer</option>
                    <option value='String'>String</option>
                    <option value='Text'>Text</option>
                    <option value='DateTime'>DateTime</option>
                    <option value='Float'>Float</option>
                    <option value='Boolean'>Boolean</option>
                    <option value='PickleType'>PickleType</option>
                    <option value='LargeBinary'>LargeBinary</option>
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default NewColumn