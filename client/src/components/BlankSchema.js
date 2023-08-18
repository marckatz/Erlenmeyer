import React, { useState } from 'react'

function BlankSchema() {
    const [schemaName, setSchemaName] = useState('')
    const [tables, setTables] = useState([])
    return (
        <div>Blank Schema</div>
    )
}

export default BlankSchema