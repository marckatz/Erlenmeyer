import React, { useState } from "react";

function NewTable({handleNewTableSubmit}){
    const [newTableName, setNewTableName] = useState('')

    return (
        <form className="row" onSubmit={e=>handleNewTableSubmit(e,newTableName,setNewTableName)}>
            <div className="col">
                <label className="visually-hidden" htmlFor='new_table_name'>name</label>
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="new_table_name" 
                        placeholder="Table Name" 
                        value={newTableName}
                        onChange={e => setNewTableName(e.target.value)}
                    />
                </div>
            </div>
            <div className="col">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )

}

export default NewTable