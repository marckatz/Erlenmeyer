import React from "react";

function ColumnCard({column}) {
    const {id, name, column_type, is_pk} = column

    return (
        <tr>
            <td>{name}</td>
            <td>{column_type}</td>
            <td>placeholder</td>
        </tr>
    )
}

export default ColumnCard