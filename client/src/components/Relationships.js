import React, { useEffect, useState } from 'react'

import RelationshipForm from './RelationshipForm'

function Relationships({ schemaId, tables }) {
    const [relationships, setRelationships] = useState([])

    useEffect(() => {
        fetch(`/relationships/schema/${schemaId}`)
            .then(r => r.json())
            .then(rels => setRelationships(rels))
    }, [schemaId])

    function handleHover(e, i) {
        document.getElementById('col' + relationships[i].from_many.id).classList.add('lighten')
        document.getElementById('col' + relationships[i].to_one.id).classList.add('lighten')
    }

    function handleOut(e, i) {
        document.getElementById('col' + relationships[i].from_many.id).classList.remove('lighten')
        document.getElementById('col' + relationships[i].to_one.id).classList.remove('lighten')
    }

    const relationshipList = relationships.map((r, i) => <div onMouseOver={(e) => handleHover(e, i)} onMouseOut={(e) => handleOut(e, i)} key={i}>{r.from_many.table.name}.{r.from_many.name} ↣ {r.to_one.table.name}.{r.to_one.name}</div>)

    return (
        <>
            <div>{relationshipList}</div>
            <RelationshipForm schemaId={schemaId} setRelationships={setRelationships} />
        </>
    )
}

export default Relationships