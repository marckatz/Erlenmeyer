import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import SchemaCard from './SchemaCard'
import Row from "react-bootstrap/Row"

function Profile() {
    const { user } = useContext(UserContext)
    const [schemas, setSchemas] = useState([])

    useEffect(() => {
        if (user) {
            fetch(`/schemasByUserid/${user.id}`)
                .then(r => r.json())
                .then(schemas => setSchemas(schemas))
        }
    }, [user])

    const schemaCards = schemas.map(schema => {
        return <SchemaCard key={schema.id} schema={schema} />
    })

    return (user ? (
        <div className="mx-5 my-2">
            <h1>{user.username}'s Profile</h1>
            <hr />
            <h2>Schemas:</h2>
            <Row md='5'>
                {schemaCards}
            </Row>
        </div>
    ) : (
        <div className="mx-5 my-2">
            <h1>Profile</h1>
        </div>
    )
    )
}

export default Profile