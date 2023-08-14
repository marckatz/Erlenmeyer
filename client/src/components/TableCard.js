import React, { useEffect } from "react";

function TableCard({tableId}) {

    useEffect(() => {
        fetch(`http://localhost:5555/tables/${tableId}`)
        .then(r=>r.json())
        .then(table => console.log(table))
    },[])

    return (
        <div>
            Table
        </div>
    )
}

export default TableCard