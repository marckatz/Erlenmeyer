import React from "react";

function ColumnCard({column}) {
    const {id, name, column_type, is_pk} = column

    return (
        <div className="row">
            <div className="col">{name}</div>
            <div className="col">{column_type}</div>
            <div className="col"></div>
        </div>
    )
}

export default ColumnCard