import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Relationships({tables}) {
    const [selectedTableFrom, setSelectedTableFrom] = useState(0)
    const [selectedColumnFrom, setSelectedColumnFrom] = useState(0)
    const [columnsFrom, setColumnsFrom] = useState([])

    const [selectedTableTo, setSelectedTableTo] = useState(0)
    const [selectedColumnTo, setSelectedColumnTo] = useState(0)
    const [columnsTo, setColumnsTo] = useState([])
    
    useEffect(() => {
        const currentTable = tables.find(table=>table.id==selectedTableFrom)
        currentTable ? setColumnsFrom(currentTable.columns) : setColumnsFrom([])
    }, [selectedTableFrom])

    const tableFromOptions = tables.filter(table=>table.id != selectedTableTo).map(table => <option key={table.id} value={table.id}>{table.name}</option>)

    const columnFromOptions = columnsFrom && columnsFrom.map(c => <option key={c.id} value={c.id}>{c.name}</option>)

    function handleTableFromChange(e){
        setSelectedTableFrom(e.target.value)
        setSelectedTableTo(0)
    }
    
    function handleColumnFromChange(e){
        setSelectedColumnFrom(e.target.value)
    }

    const tableToOptions = tables.filter(table=>table.id != selectedTableFrom).map(table => <option key={table.id} value={table.id}>{table.name}</option>)

    function handleTableToChange(e){
        setSelectedTableTo(e.target.value)
        setSelectedTableFrom(0)
    }

    function handleColumnToChange(e){
        setSelectedColumnTo(e.target.value)
    }

    return (
        <>
            <select onChange={handleTableFromChange} value={selectedTableFrom}>
                <option value='0' disabled>Select Table</option>
                {tableFromOptions}
            </select>
            <select disabled={selectedTableFrom == 0} onChange={handleColumnFromChange} value={selectedColumnFrom}>
                <option value='0' disabled>Select Column</option>
                {columnFromOptions}
            </select>
            
            <select onChange={handleTableToChange} value={selectedTableTo}>
                <option value='0' disabled>Select Table</option>
                {tableToOptions}
            </select>
            <select disabled={selectedTableTo == 0} onChange={handleColumnToChange} value={selectedColumnTo}>
                <option value='0' disabled>Select Column</option>
                {columnFromOptions}
            </select>
        </>
    )
}

export default Relationships