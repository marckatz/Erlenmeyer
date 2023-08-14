import React, { useEffect } from "react";

function ColumnCard({column}) {
    const {id, name, column_type_string, is_pk} = column

    return (
        <div className="row">
            <div className="col">Column</div>
            <div className="col">{name}</div>
            <div className="col">{column_type_string}</div>
        </div>
    )
}

export default ColumnCard