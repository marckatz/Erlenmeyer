import React from "react";

function ColumnCard({column}) {
    const {id, name, column_type, is_pk} = column

    return (
        <tr>
            <td className="name-col">{name}</td>
            <td className="type-col">{column_type}</td>
            <td className="button-col">TODO</td>
        </tr>
    )
}

export default ColumnCard