import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import NewColumn from "./NewColumn";

function TableCard({table}) {
    const {id, name} = table
    const [columns, setColumns] = useState(table.columns)



    const create_rows = columns.map(col => {
            return <ColumnCard key={col.id} column={col}/>
        });

    return (
        <div className="container">
            <h2 className="row">Table: {name}</h2>
            {create_rows}
            <NewColumn setColumns={setColumns} tableId={id}/>
        </div>
    )
}

export default TableCard