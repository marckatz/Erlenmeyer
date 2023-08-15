import React, { useState } from "react";

function NewColumn({handleSubmit}){
    const [colName, setColName] = useState('')
    const [colType, setColType] = useState('Integer')

        return (
        <form className="row align-items-center" onSubmit={e=>handleSubmit(e,colName,colType)}>
            <div className="col">
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
            <div className="col">
                <label className="visually-hidden" htmlFor='col_type'>type</label>
                <select className="form-select" id='col_type' onChange={e => setColType(e.target.value)} value={colType}>
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
            <div className="col">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default NewColumn