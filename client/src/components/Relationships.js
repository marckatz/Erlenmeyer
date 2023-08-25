import React, { useEffect, useState } from 'react'
import RelationshipForm from './RelationshipForm'

function Relationships({schemaId, tables}) {
    const [relationships, setRelationships] = useState([])

    useEffect(() => {
        fetch(`/relationships/schema/${schemaId}`)
        .then(r=>r.json())
        .then(rels => setRelationships(rels))
    },[schemaId])

    const relationshipList = relationships.map((r,i)=><div key={i}>{r.from_many.table.name}.{r.from_many.name} &gt;--- {r.to_one.table.name}.{r.to_one.name}</div>)

    return (
        <>
        <div>{relationshipList}</div>
        <RelationshipForm tables={tables} setRelationships={setRelationships}/>
        </>
    )
}

export default Relationships