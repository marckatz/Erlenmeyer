import React, { useState } from "react";

function NewColumn(){
    const [colName, setColName] = useState('')
    const [colType, setColType] = useState(0)

    function handleSubmit(e){
        e.preventDefault()
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
                    <option value='0'>Integer</option>
                    <option value='1'>String</option>
                    <option value='2'>Text</option>
                    <option value='3'>DateTime</option>
                    <option value='4'>Float</option>
                    <option value='5'>Boolean</option>
                    <option value='6'>PickleType</option>
                    <option value='7'>LargeBinary</option>
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default NewColumn